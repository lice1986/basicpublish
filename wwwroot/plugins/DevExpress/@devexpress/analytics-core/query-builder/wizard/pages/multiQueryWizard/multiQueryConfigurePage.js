﻿/**
* DevExpress Analytics (query-builder\wizard\pages\multiQueryWizard\multiQueryConfigurePage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { _restoreSqlDataSourceFromState } from '../../dataSourceWizardState';
import { MultiQueryTreeListItemFactory } from '../../internal/_utils';
import { DBSchemaItemsProvider } from '../../internal/_dbSchemaItemsProvider';
import { TableQuery } from '../../../dataSource/sql/tableQuery';
import { SqlQueryType } from '../../../dataSource/utils';
import { SelectQuerySqlTextProvider } from '../../internal/_selectQuerySqlTextProvider';
import { _SqlDataSourceWrapper } from '../sqlDataSourceWizard/_sqlDataSourceWrapper';
import { PathRequest } from '../../../../widgets/common/pathRequest';
import { StoredProcQuery } from '../../../dataSource/sql/storedProcQuery';
import { DataSourceParameter } from '../../../dataSource/dataSourceParameter';
import { DBColumn } from '../../../dataSource/dbColumn';
import { storedProcParameterSerializationsInfo } from '../../../dataSource/dataSourceParameterMeta';
import { findFirstItemMatchesCondition } from '../../../../core/utils/_arrayutils';
import { generateQueryUniqueName } from '../../../dataSource/_utils';
import { wrapGetSelectStatement } from '../../../utils/_requestwrapper';
import { QueryBuilderPopup } from '../../internal/_queryBuilderPopup';
import { PopupWizard } from '../../popupWizard';
import { CustomSqlQuery } from '../../../dataSource/sql/customSqlQuery';
import { ModelSerializer } from '../../../../serializer/serializer';
import { DBSchemaTreeListController } from '../../internal/_dbSchemaTreeListController';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { createDefaultSQLAceOptions, createDefaultSQLAdditionalOptions, createDefaultSQLLanguageHelper } from '../../../widgets/ace/_options';
import { SqlDataSourceWizardPageId } from '../../pageId';
import { aceAvailable } from '../../../../widgets/ace/_ace-available';
import { WizardPageBase } from '../wizardPageBase';
import { __loadingStateFunctionName } from '../../internal/_constants';
import { TreeListSearchOptions } from '../../../../widgets/treelist/_treeListSearchOptions';
import { AutoQueryPreload } from '../../settings';
export class MultiQueryConfigurePage extends WizardPageBase {
    constructor(_options) {
        super();
        this._options = _options;
        this._selectedPath = ko.observable(null);
        this._itemsProvider = ko.observable();
        this._customQueries = ko.observableArray([]);
        this._checkedQueries = ko.observableArray([]);
        this._sqlDataSourceWrapper = new _SqlDataSourceWrapper(undefined, undefined, undefined);
        this._dataSource = () => {
            return this._sqlDataSourceWrapper && this._sqlDataSourceWrapper.sqlDataSource;
        };
        this._dataConnection = () => {
            return this._dataSource() && this._dataSource().connection;
        };
        this._showStatementPopup = (query) => {
            this._popupSelectStatement.isVisible(true);
            this._popupSelectStatement.query = query;
            this._popupSelectStatement.data(query.sqlString());
        };
        this._showQbCallBack = (name = null, isCustomQuery = false) => {
            if (name !== null) {
                const query = findFirstItemMatchesCondition(this._customQueries(), item => name === (item.name() || item.generateName()));
                this._queryEditIndex(this._customQueries().indexOf(query));
                if (query.type() === SqlQueryType.customSqlQuery) {
                    this._showStatementPopup(query);
                }
                else {
                    this._popupQueryBuilder.show(query, this._dataSource());
                }
            }
            else {
                this._queryEditIndex(-1);
                if (isCustomQuery) {
                    this._showStatementPopup(new CustomSqlQuery({ '@Name': null }, this._dataSource()));
                }
                else {
                    const queryNew = new TableQuery({ '@Name': null }, this._dataSource());
                    this._popupQueryBuilder.show(queryNew, this._dataSource());
                }
            }
        };
        this._popupSelectStatement = ({
            isVisible: ko.observable(false),
            title: () => getLocalization('Custom SQL Editor', 'AnalyticsCoreStringId.SqlDSWizard_CustomSqlEditor'),
            query: null,
            data: ko.observable(),
            okButtonText: () => getLocalization('OK', 'DataAccessUIStringId.Button_OK'),
            okButtonHandler: (e) => {
                this._popupSelectStatement.query.sqlString(e.model.data());
                this._setCustomSqlQuery(this._popupSelectStatement.query);
                e.model.isVisible(false);
            },
            aceOptions: createDefaultSQLAceOptions(),
            aceAvailable: aceAvailable(),
            additionalOptions: createDefaultSQLAdditionalOptions((newVal) => { this._popupSelectStatement.data(newVal); }),
            languageHelper: createDefaultSQLLanguageHelper(),
            closest(element, parentSelector) {
                return $.fn.constructor(element).closest(parentSelector);
            }
        });
        this._customResetOptions = $.noop;
        this._queryEditIndex = ko.observable(-1);
        this.disableCustomSql = true;
        this._scrollViewHeight = 'calc(100% - 37px)';
        this._customizeDBSchemaTreeListActions = null;
        this._isDataLoadingInProcess = ko.observable(false);
        this._callbacks = this._options.callbacks;
        this._sqlTextProvider = new SelectQuerySqlTextProvider(wrapGetSelectStatement(this._callbacks.selectStatement), this._dataConnection);
        this._popupQueryBuilder = new QueryBuilderPopup((newQuery, isInProcess) => this._setTableQuery(newQuery, isInProcess), _options.rtl, _options.callbacks.customizeQBInitData);
        this._fieldListModel = ko.observable(null);
        this._disposables.push(this._hasParametersToEdit = ko.pureComputed(() => this._itemsProvider().hasParametersToEdit()));
        this._disposables.push(this._isDataLoadingInProcess.subscribe((newVal) => {
            if (!newVal)
                this._onChange();
            this[__loadingStateFunctionName] && this[__loadingStateFunctionName](newVal);
        }));
        this.disableCustomSql = this._options.disableCustomSql;
        this._getItemsAfterCheck = (node) => {
            this._resetDataSourceResult();
            this._isDataLoadingInProcess(true);
            if (node.checked.peek() && node.isList) {
                if (node.name === 'tables' || node.name === 'views') {
                    this._itemsProvider().getItems(new PathRequest(node.name)).done(() => {
                        if (node.isList && node.children.peek().length > 0) {
                            $.when(...node.children.peek().map(item => this._getItemsPromise(new PathRequest(node.name + '.' + item.name)))).always(() => this._isDataLoadingInProcess(false));
                        }
                        else {
                            this._isDataLoadingInProcess(false);
                        }
                    });
                }
                else if (node.specifics === 'table' || node.specifics === 'view') {
                    this['_itemsProvider']().getItems(new PathRequest(node.specifics + '.' + node.name))
                        .always(() => this._isDataLoadingInProcess(false));
                }
                else if (node.name === 'procedures') {
                    this['_itemsProvider']().getItems(new PathRequest(node.name))
                        .always(() => this._isDataLoadingInProcess(false));
                }
                else {
                    this._isDataLoadingInProcess(false);
                }
            }
            else {
                this._isDataLoadingInProcess(false);
            }
        };
    }
    _addQueryAlgorithm(elements, specifics, dataSource, customQueries) {
        if (!elements.unChecked() || specifics === 'queries') {
            if (elements.children().length === 0) {
                this._itemsProvider().getItems(new PathRequest(specifics));
            }
            if (specifics === 'tables' || specifics === 'views') {
                this._addQueryFromTables(elements, dataSource);
            }
            else if (specifics === 'procedures') {
                this._addQueryFromStoredProcedures(elements, dataSource);
            }
            else {
                this._addQueryFromCustomQueries(elements, customQueries, dataSource.queries);
            }
        }
        else {
            elements.children().forEach(node => {
                MultiQueryConfigurePage._removeQuery(dataSource.queries, node);
            });
        }
    }
    _addQueryFromTables(elements, dataSource) {
        for (let i = 0; i < elements.children().length; i++) {
            const table = elements.children()[i];
            if (!table.unChecked()) {
                const columns = {};
                const queryJSON = {
                    'Columns': columns,
                    'Tables': {
                        'SelectedTables': {
                            'Item1': {
                                '@Name': table.name,
                                '@ControlType': 'Table',
                                '@ItemType': 'Table'
                            }
                        },
                    }
                };
                if (table.children().length === 0) {
                    this._itemsProvider().getItems(new PathRequest('tables.' + table.name)).done(() => {
                        table.initializeChildren(table.children());
                    });
                }
                for (let j = 0; j < table.children().length; j++) {
                    const column = table.children()[j];
                    if (column.checked()) {
                        columns['Item' + (j + 1)] = {
                            '@Table': table.name,
                            '@Name': column.name,
                            '@ItemType': 'Column'
                        };
                    }
                }
                MultiQueryConfigurePage._pushQuery(new TableQuery(queryJSON, dataSource), table, dataSource.queries);
            }
            else {
                MultiQueryConfigurePage._removeQuery(dataSource.queries, table);
            }
        }
    }
    _addQueryFromStoredProcedures(elements, dataSource) {
        for (let i = 0; i < elements.children().length; i++) {
            const procedure = elements.children()[i];
            if (procedure.checked()) {
                const newQuery = new StoredProcQuery({ '@Name': procedure.name, 'ProcName': procedure.name }, dataSource);
                procedure.arguments.forEach((arg) => {
                    newQuery.parameters.push(new DataSourceParameter({ '@Name': arg.name, '@Type': DBColumn.GetType(arg.type) }, null, storedProcParameterSerializationsInfo(DBColumn.GetType(arg.type))));
                });
                MultiQueryConfigurePage._pushQuery(newQuery, procedure, dataSource.queries);
            }
            else {
                MultiQueryConfigurePage._removeQuery(dataSource.queries, procedure);
            }
        }
    }
    _addQueryFromCustomQueries(elements, queries, allQueries) {
        for (let i = 0; i < elements.children().length; i++) {
            const queryNode = elements.children()[i];
            const query = findFirstItemMatchesCondition(queries.peek(), item => queryNode.name === (item.name() || item.generateName()));
            if (queryNode.checked()) {
                query.name(generateQueryUniqueName(allQueries.peek(), query));
                this._checkedQueries.push(query);
            }
        }
    }
    _getItemsPromise(pathRequest) {
        return this._itemsProvider().getItems(pathRequest);
    }
    _resetDataSourceResult() {
        this._customResetOptions();
        this._dataSource().relations([]);
        this._dataSource().resultSet = null;
        this._onChange();
    }
    _setQueryCore(query) {
        const provider = this._fieldListModel().itemsProvider;
        const queryEditIndex = this._queryEditIndex();
        if (queryEditIndex >= 0) {
            this._itemsProvider().queries().children()[queryEditIndex].name = query.name();
            provider.customQueries().splice(queryEditIndex, 1, query);
        }
        else {
            query.name(generateQueryUniqueName(provider.customQueries().peek(), query));
            provider.customQueries().push(query);
            this._selectedPath('queries.' + query.name());
            const childrens = this._itemsProvider().queries().children();
            const children = childrens[childrens.length - 1];
            children.setChecked(true);
            children['_afterCheckToggled'] && children['_afterCheckToggled'](children);
        }
        this._resetDataSourceResult();
    }
    static _pushQuery(newQuery, node, queries) {
        if (!findFirstItemMatchesCondition(queries.peek(), item => item.name() === (newQuery.name() || newQuery.generateName()))) {
            newQuery.name(generateQueryUniqueName(queries.peek(), newQuery));
            queries.push(newQuery);
        }
        node.hasQuery = true;
    }
    static _removeQuery(queries, node) {
        if (node.hasQuery) {
            let queryIndex = -1;
            const existUncheck = queries.peek().some((value, index) => {
                if (value.name() === node.name || value.generateName() === node.name) {
                    queryIndex = index;
                    return true;
                }
                return false;
            });
            if (existUncheck) {
                queries.splice(queryIndex, 1);
            }
            node.hasQuery = false;
        }
    }
    canNext() {
        return !this._itemsProvider().nextButtonDisabled() && this.canFinish();
    }
    canFinish() {
        return this._itemsProvider() && this._itemsProvider().hasCheckedItems() && !this._isDataLoadingInProcess();
    }
    _AddQueryWithBuilder() {
    }
    _runQueryBuilder() {
    }
    _loadPanelViewModel(element) {
        return PopupWizard._getLoadPanelViewModel(element, this._isDataLoadingInProcess);
    }
    _setTableQuery(query, isInProcess) {
        isInProcess && isInProcess(true);
        return this._sqlTextProvider.getQuerySqlText(query)
            .done(() => this._setQueryCore(query))
            .always(() => {
            isInProcess && isInProcess(false);
        });
    }
    _setCustomSqlQuery(query) {
        this._setQueryCore(query);
    }
    _createTreeListFactory() {
        return new MultiQueryTreeListItemFactory();
    }
    commit() {
        this._dataSource().queries.removeAll();
        this._checkedQueries.removeAll();
        this._addQueryAlgorithm(this._itemsProvider().tables(), 'tables', this._dataSource());
        this._addQueryAlgorithm(this._itemsProvider().views(), 'views', this._dataSource());
        this._addQueryAlgorithm(this._itemsProvider().procedures(), 'procedures', this._dataSource());
        this._addQueryAlgorithm(this._itemsProvider().queries(), 'queries', this._dataSource(), this._customQueries);
        ko.utils.arrayPushAll(this._dataSource().queries(), this._checkedQueries());
        this._dataSource().queries.valueHasMutated();
        const checkedCustomQueries = this._itemsProvider().queries().children().filter((x) => x.checked()).map(query => query.name);
        const customQueries = this._sqlDataSourceWrapper.sqlDataSource.queries().filter(x => checkedCustomQueries.some(queryName => queryName === x.name()) || x instanceof StoredProcQuery);
        customQueries.forEach((item) => this._sqlDataSourceWrapper.sqlDataSource.queries.remove(item));
        const serializer = new ModelSerializer();
        return $.Deferred().resolve({
            sqlDataSourceJSON: this._sqlDataSourceWrapper.save(),
            customQueries: customQueries.map(x => JSON.stringify(serializer.serialize(x)))
        }).promise();
    }
    initialize(state) {
        this._sqlDataSourceWrapper = _restoreSqlDataSourceFromState(state, this._options.requestWrapper);
        const customQueriesPromise = this._callbacks.customQueriesPreset
            ? this._callbacks.customQueriesPreset(this._dataSource())
            : $.Deferred().resolve([]).promise();
        const deferred = $.Deferred();
        customQueriesPromise.done((queries) => {
            this._customQueries(queries);
            this._selectedPath('');
            const itemsProvider = new DBSchemaItemsProvider(this._dataSource().dbSchemaProvider, this._customQueries, this._showQbCallBack, this.disableCustomSql, this._getItemsAfterCheck);
            this._disposables.push(itemsProvider);
            this._itemsProvider(itemsProvider);
            this._getItemsPromise(new PathRequest('queries'));
            const searchOptions = new TreeListSearchOptions();
            searchOptions.autoLoadItems = AutoQueryPreload();
            this._fieldListModel({
                factory: this._createTreeListFactory(),
                itemsProvider: this._itemsProvider(),
                loadChildItemsForCollapsedNodes: AutoQueryPreload(),
                selectedPath: this._selectedPath,
                treeListController: new DBSchemaTreeListController(this._customizeDBSchemaTreeListActions, searchOptions),
                templateName: 'dxrd-treelist-with-checkbox'
            });
            this._popupQueryBuilder.isVisible(false);
            deferred.resolve();
        })
            .fail(deferred.reject);
        return deferred.promise();
    }
}
export function _registerMultiQueryConfigurePage(factory, wizardOptions) {
    factory.registerMetadata(SqlDataSourceWizardPageId.MultiQueryConfigurePage, {
        create: () => {
            return new MultiQueryConfigurePage(wizardOptions);
        },
        setState: (data, state) => {
            state.sqlDataSourceJSON = data.sqlDataSourceJSON;
            state.customQueries = data.customQueries;
        },
        getState: (state) => {
            return state.sqlDataSourceWizard;
        },
        resetState: (state, defaultState) => {
            state.sqlDataSourceJSON = defaultState.sqlDataSourceJSON;
            state.customQueries = defaultState.customQueries;
        },
        description: getLocalization('Columns selected from specific tables and/or views will be automatically included into a separate query.', 'AnalyticsCoreStringId.SqlDSWizard_PageConfigureMultiQuery'),
        template: 'dxrd-wizard-add-queries-page'
    });
}
