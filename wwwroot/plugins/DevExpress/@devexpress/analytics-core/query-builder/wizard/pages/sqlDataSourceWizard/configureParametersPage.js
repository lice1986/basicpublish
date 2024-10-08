﻿/**
* DevExpress Analytics (query-builder\wizard\pages\sqlDataSourceWizard\configureParametersPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { _restoreSqlDataSourceFromState } from '../../dataSourceWizardState';
import { _SqlDataSourceWrapper } from './_sqlDataSourceWrapper';
import { DataSourceParameter } from '../../../dataSource/dataSourceParameter';
import { getUniqueNameForNamedObjectsArray } from '../../../../core/internal/_getNameHelpers';
import { editorTemplates } from '../../../../property-grid/widgets/editorsInfo';
import { SqlQueryType } from '../../../dataSource/utils';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { SqlDataSourceWizardPageId } from '../../pageId';
import { WizardPageBase } from '../wizardPageBase';
export class ConfigureQueryParametersPage extends WizardPageBase {
    constructor(parametersConverter = {
        createParameterViewModel: parameter => parameter,
        getParameterFromViewModel: parameterViewModel => parameterViewModel
    }, _requestWrapper) {
        super();
        this.parametersConverter = parametersConverter;
        this._requestWrapper = _requestWrapper;
        this._sqlDataSourceWrapper = new _SqlDataSourceWrapper(undefined, undefined, this._requestWrapper);
        this.removeButtonTitle = getLocalization('Remove', 'DataAccessUIStringId.Button_Remove');
        this.parametersEditorOptions = {
            addHandler: () => {
                return this.parametersConverter.createParameterViewModel(new DataSourceParameter({
                    '@Name': getUniqueNameForNamedObjectsArray(this.parametersEditorOptions.values.peek().peek(), 'parameter'),
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
        return this.getParameters().every(x => x.isValid());
    }
    canNext() {
        return false;
    }
    canFinish() {
        return this._isParametersValid();
    }
    getParameters() {
        return this.parametersEditorOptions.values()();
    }
    initialize(data) {
        this._sqlDataSourceWrapper = _restoreSqlDataSourceFromState(data, this._requestWrapper);
        this.parametersEditorOptions.hideButtons(this._sqlDataSourceWrapper.sqlQuery.type() === SqlQueryType.storedProcQuery);
        setTimeout(() => {
            this.parametersEditorOptions.values(ko.observableArray(this._sqlDataSourceWrapper.sqlQuery.parameters().map(item => this.parametersConverter.createParameterViewModel(item))));
        }, 100);
        return $.Deferred().resolve().promise();
    }
    commit() {
        this._sqlDataSourceWrapper.sqlQuery.parameters(this.parametersEditorOptions.values()().map(item => this.parametersConverter.getParameterFromViewModel(item)));
        return $.Deferred().resolve({
            sqlDataSourceJSON: this._sqlDataSourceWrapper.save()
        }).promise();
    }
}
export function _registerConfigureParametersPage(factory, requestWrapper, parametersConverter) {
    factory.registerMetadata(SqlDataSourceWizardPageId.ConfigureParametersPage, {
        create: () => new ConfigureQueryParametersPage(parametersConverter, requestWrapper),
        getState: (state) => state.sqlDataSourceWizard,
        setState: (result, state) => state.sqlDataSourceJSON = result.sqlDataSourceJSON,
        resetState: () => void 0,
        template: 'dxrd-page-configure-parameters',
        description: getLocalization('Configure query parameters.', 'AnalyticsCoreStringId.SqlDSWizard_PageConfigureParameters')
    });
}
