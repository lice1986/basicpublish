﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationUnionQueryBuilderPopup.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { findFirstItemMatchesCondition } from '../../../../core/utils/_arrayutils';
import { getLocalization } from '../../../../property-grid/localization/_localization';
import { getTemplate } from '../../../../property-grid/widgets/templateUtils';
import { PathRequest } from '../../../../widgets/common/pathRequest';
import { UnionTypes } from '../../../dataSource/federation/federatedQueries/unionQuery';
import { FederationQueryBuilderPopupBase } from './_federationQueryBuilderPopupBase';
export class FederationUnionQueryBuilderPopup extends FederationQueryBuilderPopupBase {
    constructor(onSaveCallback, dataSource, rtl = false, onCloseCallback) {
        super(onSaveCallback, dataSource, rtl, onCloseCallback);
        this.unionQuery = ko.observable();
        this.unionAll = ko.observable(false);
        this.columns = ko.observableArray();
        this.popupContentTemplate = 'dxrd-querybuilder-union-popup-content';
        this.buttonItems.push({
            toolbar: 'bottom', location: 'before', widget: 'dxCheckBox', options: { text: getLocalization('Union All', 'DataAccessUIStringId.FederationDataSourceQueryBuilder_NodeType_UnionAll'), value: this.unionAll }
        });
        const sources = ko.pureComputed(() => this.unionQuery() && this.unionQuery().queries().map(x => {
            const alias = x.alias.peek();
            return {
                source: alias.split('_').join(' - '),
                name: alias
            };
        }));
        this._disposables.push(sources);
        this.sourcesGrid = {
            rtlEnabled: rtl,
            noDataText: () => getLocalization('Drop a table or view here to create a query.', 'AnalyticsCoreStringId.QueryBuilder_SurfacePlaceholder'),
            dataSource: sources,
            showRowLines: true,
            paging: { enabled: false },
            scrolling: { mode: 'infinite' },
            columns: [{
                    dataField: 'source',
                    get caption() {
                        return getLocalization('Source', 'DataAccessUIStringId.QueryBuilderColumns_Source');
                    },
                }, {
                    type: 'buttons',
                    width: 30,
                    buttons: [{
                            icon: 'delete',
                            onClick: (e) => {
                                this.unionQuery().removeQuery(e.row.data.name);
                                this.unionQuery.valueHasMutated();
                            },
                            cssClass: 'dxrd-image-recycle-bin',
                            template: getTemplate('dxrd-svg-operations-recycle_bin'),
                        }]
                }
            ]
        };
        this._disposables.push(this.unionQuery.subscribe((unionQuery) => {
            const expressionArrays = [];
            const resultExpressions = [];
            this.columns([]);
            if (!unionQuery || unionQuery.queries().length === 0) {
                return;
            }
            unionQuery.queries().forEach(query => expressionArrays.push(query.expressions()));
            expressionArrays[0] && expressionArrays[0].forEach(expression => {
                if (expressionArrays.every(array => !!array.filter(x => x.name() === expression.name())[0])) {
                    resultExpressions.push({
                        name: expression.name(),
                        alias: expression.alias(),
                        key: expression.table() + '.' + expression.name()
                    });
                }
            });
            this.columns(resultExpressions);
        }));
        this._disposables.push(this.unionAll.subscribe((value) => {
            if (!this.unionQuery())
                return;
            if (value) {
                this.unionQuery().unionType(UnionTypes[UnionTypes.UnionAll]);
            }
            else {
                this.unionQuery().unionType(UnionTypes[UnionTypes.Union]);
            }
        }));
        this.aliasGrid = {
            rtlEnabled: rtl,
            dataSource: this.columns,
            showRowLines: true,
            editing: {
                allowUpdating: true,
                mode: 'cell',
            },
            paging: { enabled: false },
            scrolling: { mode: 'infinite' },
            height: '100%',
            columns: [{
                    dataField: 'name',
                    caption: 'Column Name',
                    allowEditing: false
                }, {
                    dataField: 'alias',
                    get caption() {
                        return getLocalization('Alias', 'DataAccessUIStringId.QueryBuilderColumns_Alias');
                    },
                    validationRules: [this._aliasValidationRule]
                }],
            onRowUpdating: (event) => {
                event.oldData.alias = event.newData.alias;
            }
        };
    }
    _aliasValidationCallback(alias, data) {
        const existedColumn = findFirstItemMatchesCondition(this.columns(), source => source.alias === alias);
        if (existedColumn && existedColumn.key === data.key)
            return true;
        return !existedColumn;
    }
    dispose() {
        super.dispose();
        this.sourcesGrid = null;
        this.aliasGrid = null;
    }
    addDataMember(item) {
        this._dataSource.fielListProvider.getItems(new PathRequest(item.path)).done((result) => {
            result.forEach(x => this.unionQuery().addSelectQuery(item.path, x.name));
            this.unionQuery.valueHasMutated();
        });
    }
    canSave() {
        return this.unionQuery() && this.unionQuery().queries().length > 0;
    }
    save() {
        this.unionQuery().queries().forEach(query => {
            query.expressions(query.expressions().filter(expression => {
                const column = this.columns().filter(column => column.name === expression.name())[0];
                if (column) {
                    expression.alias(column.alias);
                    return true;
                }
                return false;
            }));
        });
        this.onSaveCallback(this.unionQuery());
        this.close();
    }
    onHiding() {
        this.unionQuery(null);
        this.unionAll(false);
    }
    show(query) {
        this.unionQuery(query);
        this.popupVisible(true);
        this.unionAll(query.unionType() === UnionTypes[UnionTypes.UnionAll]);
    }
}
