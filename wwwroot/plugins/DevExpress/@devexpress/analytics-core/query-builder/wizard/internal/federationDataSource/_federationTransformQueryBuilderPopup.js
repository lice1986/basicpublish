﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationTransformQueryBuilderPopup.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { findFirstItemMatchesCondition } from '../../../../core/utils/_arrayutils';
import { getLocalization } from '../../../../property-grid/localization/_localization';
import { formatUnicorn } from '../../../../property-grid/widgets/internal/_utils';
import { ModelSerializer } from '../../../../serializer/serializer';
import { PathRequest } from '../../../../widgets/common/pathRequest';
import { SourceQuery } from '../../../dataSource/federation/federatedQueries/sourceQuery';
import { FederationTransformationRule } from '../../../dataSource/federation/federatedQueries/transformQuery';
import { FederatedTransformQueryBuilderTreeListController } from '../../../utils/_federationUnionQueryBuilderTreeListController';
import { FederationQueryBuilderPopupBase } from './_federationQueryBuilderPopupBase';
import { TransformResultSchemaProvider } from './_federationTransformResultSchemaProvider';
export class FederationTransformQueryBuilderPopup extends FederationQueryBuilderPopupBase {
    constructor(onSaveCallback, dataSource, rtl = false, onCloseCallback) {
        super(onSaveCallback, dataSource, rtl, onCloseCallback);
        this.transformGridTitle = ko.observable();
        this.transformResultGridTitle = ko.observable();
        this.transformResultCollapsed = ko.observable(false);
        this.transformSources = ko.observable([]);
        this.currentPath = ko.observable();
        this.transformQuery = ko.observable();
        this.popupContentTemplate = 'dxrd-querybuilder-transform-popup-content';
        this.transformGrid = {
            rtlEnabled: rtl,
            noDataText: () => '',
            dataSource: this.transformSources,
            showRowLines: true,
            paging: { enabled: false },
            scrolling: { mode: 'infinite' },
            editing: {
                allowUpdating: true,
                mode: 'cell',
            },
            height: '100%',
            columns: [{
                    dataField: 'column',
                    get caption() {
                        return getLocalization('Column Name', 'DataAccessUIStringId.QueryBuilderColumns_ColumnName');
                    },
                    allowEditing: false
                }, {
                    dataField: 'alias',
                    get caption() {
                        return getLocalization('Alias', 'DataAccessUIStringId.QueryBuilderColumns_Alias');
                    },
                    validationRules: [this._aliasValidationRule]
                }, {
                    type: 'buttons',
                    get caption() {
                        return getLocalization('Transform', 'DataAccessUIStringId.FederationDataSourceQueryBuilder_NodeType_Transform');
                    },
                    buttons: [{
                            template: function (element, object) {
                                const child = document.createElement('div');
                                element.append(child);
                                ko.renderTemplate('dxrd-querybuilder-transform-checkbox', object.data, {}, child, 'replaceNode');
                            },
                        }]
                }
            ],
            onRowUpdating: (event) => {
                event.oldData.alias = event.newData.alias;
                this.resultFieldListModel.valueHasMutated();
                this.transformSources.valueHasMutated();
            }
        };
        const transformResultSchemaProvider = new TransformResultSchemaProvider(this._dataSource.dbSchemaProvider, this.transformSources, this.currentPath);
        this.resultFieldListModel = ko.observable({
            itemsProvider: transformResultSchemaProvider,
            path: this.currentPath,
            selectedPath: ko.observable(),
            treeListController: null
        });
        const treeListController = new FederatedTransformQueryBuilderTreeListController(this.dragDropHandler, (item) => treeListController.isDraggable(item) && this.addDataMember(item));
        this.fieldListModel = {
            itemsProvider: this._dataSource.dbSchemaProvider,
            treeListController: treeListController,
            selectedPath: this.selectedPath,
            pageSize: 100,
            expandRootItems: true
        };
        this._disposables.push(this.currentPath.subscribe(path => {
            this.selectedPath(path);
            this.transformGridTitle(formatUnicorn(getLocalization('Transformation node root: {0}', 'DataAccessUIStringId.FederationDataSourceQueryBuilder_TransformationNodeRoot'), this._dataSource.getQueryNameFromPath(path)));
        }), treeListController, transformResultSchemaProvider, treeListController);
        this.transformResultGridTitle(getLocalization('Transformation result', 'DataAccessUIStringId.FederationDataSourceQueryBuilder_TransformationResult'));
    }
    _updateColumns(columns, path) {
        this.transformSources(columns.map(x => {
            const disabled = !x.isList;
            return {
                columns: columns,
                column: x.displayName,
                name: x.name,
                key: path + '.' + x.name,
                alias: undefined,
                transform: {
                    value: ko.observable(disabled ? undefined : false),
                    disabled: disabled,
                    onValueChanged: () => { this.resultFieldListModel.valueHasMutated(); }
                }
            };
        }));
    }
    _aliasValidationCallback(alias, data) {
        const existedColumn = findFirstItemMatchesCondition(this.transformSources(), source => source.alias === alias);
        if (existedColumn && existedColumn.key === data.key)
            return true;
        return !existedColumn;
    }
    dispose() {
        super.dispose();
        this.resultFieldListModel = null;
        this.transformGrid = null;
    }
    addDataMember(item) {
        this.currentPath(item.path);
        this.updateColumns();
        this.transformSources.valueHasMutated();
    }
    updateColumns() {
        const path = this.currentPath();
        this._dataSource.fielListProvider.getItems(new PathRequest(this.currentPath())).done((result) => {
            this._updateColumns(result, path);
        });
    }
    canSave() {
        return this.transformSources().some(source => source.transform.value() || source.alias);
    }
    save() {
        const query = this.transformQuery();
        query.root(new SourceQuery({}, new ModelSerializer(), this._dataSource.getQueryNameFromPath(this.currentPath()), this.currentPath()));
        query.transformationRules([]);
        this.transformSources().forEach(source => {
            if (source.transform.value() || source.alias) {
                query.transformationRules.push(new FederationTransformationRule({
                    '@Name': source.name,
                    '@Alias': source.alias,
                    '@Unfold': source.transform.value(),
                    '@Flatten': source.transform.value()
                }));
            }
        });
        this.onSaveCallback(this.transformQuery());
        this.close();
    }
    onHiding() {
        this.transformQuery(null);
        this.transformResultCollapsed(false);
        this.transformSources([]);
    }
    show(query) {
        this.transformQuery(query);
        if (query.root && query.root()) {
            const path = this._dataSource.getPathFromQueryName(query.root().sourceName());
            this.currentPath(path);
            this._dataSource.fielListProvider.getItems(new PathRequest(path)).done((result) => {
                this._updateColumns(result, path);
                query.transformationRules().forEach(rule => {
                    const column = this.transformSources().filter(x => x.name === rule.name())[0];
                    column.alias = rule.alias();
                    column.transform.value(rule.unfold());
                });
            });
        }
        if (!this.currentPath()) {
            const firstDataSource = this._dataSource.dataSources()[0];
            const firstDataSourceName = firstDataSource.ref || firstDataSource.id;
            if (firstDataSource.isListType) {
                this.currentPath(firstDataSourceName);
                this.updateColumns();
            }
            else {
                this._dataSource.fielListProvider.getItems(new PathRequest(firstDataSourceName)).done(items => {
                    this.currentPath(items[0] && items[0].isListType ? firstDataSourceName + '.' + items[0].name : firstDataSourceName);
                    this.updateColumns();
                });
            }
        }
        this.popupVisible(true);
    }
}
