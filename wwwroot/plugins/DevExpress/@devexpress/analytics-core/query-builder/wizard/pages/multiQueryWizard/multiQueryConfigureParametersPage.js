﻿/**
* DevExpress Analytics (query-builder\wizard\pages\multiQueryWizard\multiQueryConfigureParametersPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { SqlQueryType } from '../../../dataSource/utils';
import { _restoreSqlDataSourceFromState } from '../../dataSourceWizardState';
import { _SqlDataSourceWrapper } from '../sqlDataSourceWizard/_sqlDataSourceWrapper';
import { ParametersTreeListRootItem, ParametersTreeListItem, ParametersTreeListController } from '../../internal/_configureParametersUtils';
import { DataSourceParameter } from '../../../dataSource/dataSourceParameter';
import { getUniqueNameForNamedObjectsArray } from '../../../../core/internal/_getNameHelpers';
import { subscribeArray, subscribeObject, subscribeProperties } from '../../internal/_utils';
import { editorTemplates } from '../../../../property-grid/widgets/editorsInfo';
import { findFirstItemMatchesCondition } from '../../../../core/utils/_arrayutils';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { SqlDataSourceWizardPageId } from '../../pageId';
import { WizardPageBase } from '../wizardPageBase';
export function _canEditQueryParameters(query, customQueries) {
    if (query.type() === SqlQueryType.tableQuery || query.type() === SqlQueryType.customSqlQuery) {
        return customQueries.indexOf(query) > -1;
    }
    return query.type() === SqlQueryType.storedProcQuery && query.parameters().length > 0;
}
export class MultiQueryConfigureParametersPage extends WizardPageBase {
    constructor(parametersConverter = {
        createParameterViewModel: parameter => parameter,
        getParameterFromViewModel: parameterViewModel => parameterViewModel
    }, _requestWrapper) {
        super();
        this.parametersConverter = parametersConverter;
        this._requestWrapper = _requestWrapper;
        this._sqlDataSourceWrapper = new _SqlDataSourceWrapper(undefined, undefined, this._requestWrapper);
        this._selectedPath = ko.observable(null);
        this._rootItems = ko.observableArray();
        this._createNewParameter = (queryName, parameters) => {
            const newParameter = new DataSourceParameter({
                '@Name': getUniqueNameForNamedObjectsArray(parameters, 'parameter'),
                '@Type': 'System.Int32'
            });
            this._selectedPath(queryName + '.' + newParameter.name());
            return this.parametersConverter.createParameterViewModel(newParameter);
        };
        this._scrollViewHeight = '100%';
        this._fieldListModel = ko.observable(null);
        this._removeButtonTitle = getLocalization('Remove', 'DataAccessUIStringId.Button_Remove');
        const callback = () => this._onChange();
        this._disposables.push(subscribeArray(this._rootItems, (item) => {
            this._disposables.push(subscribeArray(item.parameters, (parameter) => {
                this._disposables.push(subscribeObject(parameter.dataSourceParameter, (value) => {
                    this._disposables.push(...subscribeProperties([value.name, value['value'], value['type']], callback));
                }, callback));
            }, callback));
        }, callback));
        this._parametersEditorOptions = {
            addHandler: () => {
                return this.parametersConverter.createParameterViewModel(new DataSourceParameter({
                    '@Name': getUniqueNameForNamedObjectsArray(this._parametersEditorOptions.values.peek().peek(), 'parameter'),
                    '@Type': 'System.Int32'
                }));
            },
            values: ko.observable(ko.observableArray([])),
            displayName: 'Parameters',
            level: 0,
            info: ko.observable({
                displayName: 'Parameters', localizationId: 'DevExpress.DataAccess.Sql.SqlQuery.Parameters',
                propertyName: 'parameters',
                modelName: 'Parameter',
                array: true,
                editor: editorTemplates.getEditor('commonCollection'),
                template: '#dxrd-parameter-collection-item'
            }),
            editorTemplate: '#dxrd-wizard-datasource-parameters',
            hideButtons: ko.observable(false),
            collapsed: false
        };
    }
    _isParametersValid() {
        return this._getParameters().every(x => x.isValid());
    }
    canNext() {
        return this._isParametersValid() && this._sqlDataSourceWrapper.sqlDataSource.queries().length > 1;
    }
    canFinish() {
        return this._isParametersValid() && this._sqlDataSourceWrapper.sqlDataSource.queries().length >= 1;
    }
    _getParameters() {
        return [].concat.apply([], (this._rootItems() || []).map((x) => {
            return x.parameters().map((param) => {
                return param.dataSourceParameter();
            });
        }));
    }
    initialize(state) {
        const newRootItemsWithParameters = [];
        const rootItems = this._rootItems();
        this._sqlDataSourceWrapper = _restoreSqlDataSourceFromState(state, this._requestWrapper);
        this._sqlDataSourceWrapper.sqlDataSource.queries().forEach(query => {
            if (_canEditQueryParameters(query, this._sqlDataSourceWrapper.customQueries)) {
                const parent = new ParametersTreeListRootItem(query);
                parent.parameters(query.parameters().map(parameterModel => {
                    return new ParametersTreeListItem(this.parametersConverter.createParameterViewModel(parameterModel), parent);
                }));
                newRootItemsWithParameters.push(parent);
            }
        });
        rootItems.filter(x => newRootItemsWithParameters.every(newItem => newItem.name !== x.name)).forEach((removedItem) => {
            rootItems.splice(this._rootItems().indexOf(removedItem), 1);
        });
        newRootItemsWithParameters.forEach((newItem) => {
            const currentItem = rootItems.filter(x => x.name === newItem.name)[0];
            if (currentItem) {
                newItem.parameters().filter(newParam => currentItem.parameters().every(x => x.name !== newParam.name)).forEach((param) => {
                    currentItem.parameters.push(param);
                });
            }
            else {
                rootItems.push(newItem);
            }
        });
        this._rootItems.valueHasMutated();
        this._fieldListModel({
            itemsProvider: {
                getItems: pathRequest => {
                    const result = $.Deferred();
                    if (!pathRequest.fullPath) {
                        result.resolve(this._rootItems());
                    }
                    else {
                        const parent = findFirstItemMatchesCondition(this._rootItems(), item => item.name === pathRequest.ref);
                        result.resolve(parent.parameters());
                    }
                    return result.promise();
                }
            },
            templateName: 'dx-treelist-item-with-hover',
            selectedPath: this._selectedPath,
            treeListController: new ParametersTreeListController(this._rootItems(), this._createNewParameter),
        });
        return $.Deferred().resolve().promise();
    }
    commit() {
        this._rootItems().forEach(item => {
            const customQuery = findFirstItemMatchesCondition(this._sqlDataSourceWrapper.customQueries, (query) => query.name() === item.query().name());
            customQuery.parameters(item.parameters().map(parameterViewModel => {
                return this.parametersConverter.getParameterFromViewModel(parameterViewModel.dataSourceParameter());
            }));
        });
        return $.Deferred().resolve({
            sqlDataSourceJSON: this._sqlDataSourceWrapper.sqlDataSourceJSON,
            customQueries: this._sqlDataSourceWrapper.saveCustomQueries()
        }).promise();
    }
}
export function _registerMultiQueryConfigureParametersPage(factory, requestWrapper, parametersConverter) {
    factory.registerMetadata(SqlDataSourceWizardPageId.MultiQueryConfigureParametersPage, {
        create: () => new MultiQueryConfigureParametersPage(parametersConverter, requestWrapper),
        getState: (state) => state.sqlDataSourceWizard,
        setState: (result, state) => state.customQueries = result.customQueries,
        resetState: () => void 0,
        description: getLocalization('Configure query parameters.', 'AnalyticsCoreStringId.SqlDSWizard_PageConfigureParameters'),
        template: 'dxrd-configure-query-parameters-page'
    });
}
