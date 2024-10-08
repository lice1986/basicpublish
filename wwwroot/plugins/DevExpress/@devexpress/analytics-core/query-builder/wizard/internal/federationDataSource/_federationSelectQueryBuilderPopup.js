﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationSelectQueryBuilderPopup.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { findSurface } from '../../../../core/internal/_surfaceHelpers';
import { getLocalization } from '../../../../property-grid/localization/_localization';
import { getTemplate } from '../../../../property-grid/widgets/templateUtils';
import { ModelSerializer } from '../../../../serializer/serializer';
import { addDisposeCallback } from '../../../../serializer/_internal';
import { extend } from '../../../../serializer/_utils';
import { functionDisplay } from '../../../../widgets/expressioneditor/tools/_functions';
import { ResizeHelper } from '../../../../widgets/internal/_resizeHelper';
import { FederatedQueryExpressionType } from '../../../dataSource/federation/federatedQueryExpression';
import { AllColumnsViewModel } from '../../../elements/allColumnsModel';
import { ColumnExpression } from '../../../elements/columnExpression';
import { ColumnType } from '../../../elements/columnExpressionMeta';
import { FederationQueryViewModel } from '../../../elements/_federationQueryModel';
import { controlsFactory } from '../../../utils/controlsFactory';
import { ColumnExpressionCollectionHelper } from '../../../utils/_columnExpressionCollectionHelper';
import { FederationQueryBuilderPopupBase } from './_federationQueryBuilderPopupBase';
import { FederationTablesExpressionFieldListProvider } from './_federationTablesExpressionFieldListProvider';
export class FederationSelectQueryBuilderPopup extends FederationQueryBuilderPopupBase {
    constructor(onSaveCallback, dataSource, rtl = false, onCloseCallback) {
        super(onSaveCallback, dataSource, rtl, onCloseCallback);
        this.popupContentTemplate = 'dxrd-querybuilder-select-popup-content';
        this._querySource = ko.observable(null);
        this.designer = ko.observable(null);
        this.joinResultCollapsed = ko.observable(false);
        this.width = '90%';
        this.height = '90%';
        this.cssClass = 'dxrd-querybuilder-federation-popup-wrapper dxrd-querybuilder-select-federation-popup';
        this._qbOptions = {
            queryBuilderModel: this.designer,
            dataSource: dataSource,
            dbSchemaProvider: ko.observable(dataSource.dbSchemaProvider),
            showPropertyGridCondition: (model) => model.controlType === 'JoinCondition' || model.controlType === 'FTable' || model.controlType === 'Column',
            querySource: this._querySource,
        };
        this.queryBuilderSurfaceCreator = {
            options: this._qbOptions,
            creator: (options) => {
                return new FederationQueryViewModel(options.querySource(), options.dataSource, options.dbSchemaProvider(), options.parametersMode, new ModelSerializer());
            }
        };
        const rootItems = [{ name: 'DataSource', needPrefix: false, rootPath: 'Root' }];
        this.allColumns = ko.pureComputed(() => {
            const columns = [];
            if (this._getQuery()) {
                let tableName = '';
                columns.push({ column: AllColumnsViewModel.DisplayName(), table: tableName, key: FederatedQueryExpressionType[FederatedQueryExpressionType.SelectAllColumnsExpression] });
                const allColumns = this._getQuery().getAllColumns().map(x => {
                    const tableModel = x.parentModel();
                    return {
                        column: x.name(),
                        table: tableModel.actualName(),
                        key: this._generateKey(tableModel.actualName(), x.name(), x.actualName(), x.alias())
                    };
                });
                allColumns.forEach(column => {
                    if (column.table && tableName !== column.table) {
                        columns.push({ column: AllColumnsViewModel.DisplayName(), table: column.table, key: column.table + '_' + FederatedQueryExpressionType[FederatedQueryExpressionType.SelectAllNodeColumnsExpression] });
                    }
                    tableName = column.table;
                    columns.push(column);
                });
            }
            return columns;
        });
        this.columnsExpressions = ko.pureComputed(() => this._getQuery() && this._getQuery().columns().map((x, index) => {
            let key;
            let column;
            if (x.actualName()) {
                key = this._generateKey(x.table(), x.column(), x.actualName(), x.alias());
            }
            if (x.itemType() === ColumnType[ColumnType.Column]) {
                column = x.column();
            }
            else if (x.itemType() === ColumnType[ColumnType.Expression]) {
                column = x.expression();
            }
            else if (x.itemType() === ColumnType[ColumnType.AllColumns]) {
                key = x.table() + '_' + FederatedQueryExpressionType[FederatedQueryExpressionType.SelectAllNodeColumnsExpression];
                column = AllColumnsViewModel.DisplayName();
            }
            else if (x.itemType() === ColumnType[ColumnType.AllColumnsQuery]) {
                key = FederatedQueryExpressionType[FederatedQueryExpressionType.SelectAllColumnsExpression];
                column = AllColumnsViewModel.DisplayName();
            }
            return {
                alias: x.alias(),
                key: key,
                index: index,
                column: column,
                table: x.table(),
                isExpression: ko.observable(x.itemType() === ColumnType[ColumnType.Expression] ? true : false),
                expression: x.expression
            };
        }));
        this._disposables.push(this.columnsExpressions, this.allColumns);
        const cellTemplateMask = (container, options) => {
            if (options.data.key && this._isSelectAllItemByKey(options.data.key)) {
                return cellTemplate(container, options);
            }
            const templateHtml = getTemplate('dxrd-querybuilder-column-combobox-masked'), $element = $.fn.constructor(container).append(templateHtml);
            const model = {
                cellInfo: options.data,
                isExpression: options.data.isExpression || ko.observable(false),
                switchEditors: () => null
            };
            ko.applyBindings(model, $element[0]);
        };
        const cellTemplate = (container, options) => {
            let $container = $.fn.constructor(container);
            let childContext = this._bindingContext.createChildContext({
                allColumns: this.allColumns,
                itemsProvider: new FederationTablesExpressionFieldListProvider(this._dataSource.dbSchemaProvider, this._getQuery().tables),
                cellInfo: options.data,
                expression: { value: options.data.expression, onContentReady: this._onContentReady, path: ko.observable(rootItems[0].name), customizeCategories: () => { }, rootItems, functions: functionDisplay().filter(cat => cat.category != 'Aggregate') },
                isExpression: options.data.isExpression || ko.observable(false),
                changeColumn: (selectionChangedArgs) => {
                    this._changeColumn(selectionChangedArgs.selectedRowsData[0], selectionChangedArgs.model.cellInfo.index);
                },
                switchEditors: (e) => {
                    this._switchEditors(e.model.cellInfo);
                }
            });
            let child = document.createElement('div');
            $container = $container.append(child);
            ko.renderTemplate('dxrd-querybuilder-column-combobox', childContext, {}, child, 'replaceNode');
            addDisposeCallback(container, function () {
                $container = null;
                child = null;
                childContext = null;
            });
        };
        this._disposables.push(this.addRowDisabled = ko.pureComputed(() => {
            return !this._getQuery() || this._getQuery().tables().length === 0;
        }));
        this.columnsGrid = {
            rtlEnabled: rtl,
            dataSource: this.columnsExpressions,
            disabled: this.addRowDisabled,
            showRowLines: true,
            height: '100%',
            showBorders: true,
            editing: {
                allowUpdating: (grid) => {
                    return !(grid.row && grid.row.data.key &&
                        this._isSelectAllItemByKey(grid.row.data.key));
                },
                newRowPosition: 'last',
                mode: 'cell',
                texts: {
                    confirmDeleteMessage: '',
                }
            },
            paging: { enabled: false },
            columns: [{
                    dataField: 'column',
                    get caption() {
                        return getLocalization('Column Name', 'DataAccessUIStringId.QueryBuilderColumns_ColumnName');
                    },
                    cssClass: 'dx-editor-cell',
                    editCellTemplate: cellTemplate,
                    cellTemplate: cellTemplateMask
                }, {
                    dataField: 'table',
                    get caption() {
                        return getLocalization('Table Name', 'DataAccessUIStringId.QueryBuilderColumns_TableName');
                    },
                    allowEditing: false
                }, {
                    dataField: 'alias',
                    get caption() {
                        return getLocalization('Alias', 'DataAccessUIStringId.QueryBuilderColumns_Alias');
                    },
                    disabled: true,
                    validationRules: [this._aliasValidationRule, {
                            type: 'custom',
                            validationCallback: (options) => {
                                if (options.value === '' && options.data && options.data.key) {
                                    const existedColumn = ColumnExpressionCollectionHelper.findByName(this._getQuery().columns, options.data.key);
                                    if (existedColumn && existedColumn.itemType() === ColumnType[ColumnType.Expression])
                                        return false;
                                }
                                return true;
                            },
                            get message() { return getLocalization('The column name is not specified.', 'DataAccessStringId.UnnamedColumnValidationException'); }
                        }]
                },
                {
                    type: 'buttons',
                    width: 50,
                    buttons: [
                        {
                            icon: 'delete',
                            onClick: (e) => {
                                this._deleteRow(e.row.data.index != null ? e.row.data.index : this._getQuery().columns().length);
                            },
                            cssClass: 'dxrd-querybuilder-grid-actions dxd-icon-highlighted dxrd-image-recycle-bin',
                            template: getTemplate('dxrd-svg-operations-recycle_bin'),
                        }
                    ]
                }
            ],
            onInitialized: (e) => {
                this._bindingContext = ko.contextFor($.fn.constructor(e.element)[0]);
                this._gridComponent = e.component;
            },
            onRowUpdating: (event) => {
                this._onRowUpdating(event.oldData, event.newData);
            }
        };
        this.gridResizeHelper = new ResizeHelper({
            resultSize: this.resultGridHeight,
            disabled: this.joinResultCollapsed
        });
    }
    _onContentReady(e) {
        if (!e.component._isFirstLoad) {
            e.component._isFirstLoad = true;
            const element = $.fn.constructor(e.component.content())[0];
            const contentEl = element.parentElement;
            contentEl.className += '  dx-dropdowneditor-overlay';
        }
    }
    _getQuery() {
        return this.designer() && this.designer().model();
    }
    _afterChangeColumn(colIndex, notifyCallback) {
        this._gridComponent.saveEditData().then(() => {
            this._gridComponent.cancelEditData();
            const event = () => {
                const rows = this._gridComponent.getVisibleRows();
                const index = colIndex != null ? colIndex : rows.length - 1;
                this._gridComponent.editCell(index, 0);
                this._gridComponent.navigateToRow(this.columnsExpressions()[index]);
                this._gridComponent.off('contentReady', event);
            };
            this._gridComponent.on('contentReady', event);
            notifyCallback();
        });
    }
    _changeColumn(columnData, insertIndex) {
        if (columnData) {
            let query = ColumnExpressionCollectionHelper.createNew(this._getQuery(), this._getQuery().columns, columnData.table, columnData.column);
            if (this._isSelectAllItemByKey(columnData.key)) {
                query = columnData.table ?
                    new ColumnExpression({ '@Table': columnData.table, '@ItemType': ColumnType[ColumnType.AllColumns] }, this._getQuery()) :
                    new ColumnExpression({ '@ItemType': ColumnType[ColumnType.AllColumnsQuery] }, this._getQuery());
            }
            const callback = () => insertIndex != null ? this._getQuery().columns.splice(insertIndex, 1, query) : this._getQuery().columns.push(query);
            this._afterChangeColumn(insertIndex, callback);
        }
    }
    _switchEditors(model) {
        let column;
        let callback = () => this._getQuery().columns.notifySubscribers();
        if (model.index != null) {
            column = this._getQuery().columns()[model.index];
            if (model.isExpression()) {
                column.toTable();
            }
            else if (column.itemType() === ColumnType[ColumnType.AllColumns] || column.itemType() === ColumnType[ColumnType.AllColumnsQuery]) {
                column = new ColumnExpression({}, this._getQuery());
                ColumnExpressionCollectionHelper.toExpresson(column, this._getQuery().columns, '');
                this._getQuery().columns.splice(model.index, 1, column);
            }
            else {
                const epressionValue = column.column() ? '[' + column.table() + '.' + column.column() + ']' : '';
                ColumnExpressionCollectionHelper.toExpresson(column, this._getQuery().columns, epressionValue);
            }
        }
        else {
            column = new ColumnExpression({}, this._getQuery());
            ColumnExpressionCollectionHelper.toExpresson(column, this._getQuery().columns, '');
            callback = () => this._getQuery().columns.push(column);
        }
        this._afterChangeColumn(model.index, callback);
    }
    _deleteRow(deleteIndex) {
        this._gridComponent.deleteRow(deleteIndex);
        this._gridComponent.deselectAll();
        this._getQuery().columns.splice(deleteIndex, 1);
    }
    _onRowUpdating(oldData, newData) {
        const column = this._getQuery().columns()[oldData.index];
        if (column) {
            column.alias(newData.alias);
        }
        oldData.alias = newData.alias;
        this._gridComponent.saveEditData();
    }
    _aliasValidationCallback(alias, data) {
        if (alias === data.alias && alias === data.key)
            return true;
        return !ColumnExpressionCollectionHelper.findByName(this._getQuery().columns, alias);
    }
    dispose() {
        super.dispose();
        this._bindingContext = null;
        this._gridComponent = null;
        this._qbOptions = null;
        this.queryBuilderSurfaceCreator = null;
        this.columnsGrid = null;
    }
    _generateKey(tableName, columnName, actualName, alias) {
        return alias === actualName ? actualName : tableName + '_' + columnName;
    }
    _isSelectAllItemByKey(key) {
        return key === FederatedQueryExpressionType[FederatedQueryExpressionType.SelectAllColumnsExpression] ||
            key.indexOf(FederatedQueryExpressionType[FederatedQueryExpressionType.SelectAllNodeColumnsExpression]) !== -1;
    }
    save() {
        this.selectQuery.init(this._getQuery().serialize());
        this.onSaveCallback(this.selectQuery);
        this.close();
    }
    addRow() {
        this._gridComponent.addRow();
        this._gridComponent.deselectAll();
    }
    canSave() {
        return this._getQuery() && this._getQuery().isValid();
    }
    addDataMember(item, position) {
        const query = this._getQuery();
        if (query.tables().length > 1 && !query.validateRelations())
            return;
        const name = item.data.displayName || item.data.name;
        const newControl = query.createChild(extend({
            '@ControlType': 'FTable',
            '@Name': name
        }, controlsFactory.controlsMap['FTable'].defaultVal), undefined, item.path);
        const controlSurface = ko.unwrap(findSurface(newControl));
        if (!position) {
            const posX = Math.max.apply(null, query.tables.peek()
                .filter(t => t !== newControl)
                .map((t) => t.location.x.peek() + t.size.width.peek() * 1.25)
                .concat([30]));
            newControl.location.x(posX);
            newControl.location.y(20);
        }
        else {
            const _querySurface = ko.unwrap(findSurface(this.designer()));
            _querySurface.underCursor().x = position.left - _querySurface['absolutePosition'].x();
            _querySurface.underCursor().y = position.top - _querySurface['absolutePosition'].y();
            controlSurface.rect({ left: _querySurface.underCursor().x, top: _querySurface.underCursor().y, width: 199 });
        }
        this.designer().selection.initialize(controlSurface);
    }
    show(query) {
        this.selectQuery = query;
        this._querySource(new ModelSerializer().serialize(query));
        this.popupVisible(true);
    }
    popupTarget() {
        return '.dxrd-select-querybuilder-surface .dxqb-main';
    }
}
