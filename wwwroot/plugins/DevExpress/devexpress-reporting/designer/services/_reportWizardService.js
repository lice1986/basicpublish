﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportWizardService.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { sendRequest } from '@devexpress/analytics-core/analytics-internal';
import { DataSourceType, _restoreJsonDataSourceFromState } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import { createNewObjectItem } from '../dataObjects/objectItemCreation';
import { QBRequestWrapper } from '../tools/generator/_qBRequestWrapper';
import { HandlerUri } from '../utils/settings';
import { _convertToStateDataSource } from '../wizard/pages/chooseAvailableDataSourcePage';
import { ReportStorageWeb } from './reportStorageWeb';
export class ReportWizardService {
    static createNewWizardRequest(reportWizardState, requestType, state, customizeWizardModelAction, oldReportInfo) {
        let dataSourceJSON = null;
        let dataSources = [];
        reportWizardState.dataSource = reportWizardState.dataSource || reportWizardState.newDataSource;
        if (reportWizardState.dataSource) {
            if (reportWizardState.dataSourceType === DataSourceType.Federation) {
                const federationModel = (JSON.parse(JSON.parse(reportWizardState.dataSource).data));
                dataSourceJSON = JSON.stringify(federationModel.dataSource);
                dataSources = Object.keys(federationModel.dataSources).map(key => JSON.stringify(federationModel.dataSources[key]));
            }
            else {
                dataSourceJSON = JSON.parse(reportWizardState.dataSource).data;
            }
        }
        const wizardModel = new requestType(reportWizardState);
        customizeWizardModelAction && customizeWizardModelAction(wizardModel);
        const requestJson = JSON.stringify({
            reportModel: wizardModel,
            dataSource: dataSourceJSON,
            dataSources: dataSources,
            oldReport: oldReportInfo === null || oldReportInfo === void 0 ? void 0 : oldReportInfo.json,
            useInitialDataSource: oldReportInfo === null || oldReportInfo === void 0 ? void 0 : oldReportInfo.useInitialDataSource,
            state: state,
            colorScheme: reportWizardState.colorScheme && (reportWizardState.colorScheme.name === 'Custom' ? reportWizardState.colorScheme.baseColor : reportWizardState.colorScheme.name),
            customData: {
                data: reportWizardState.customData,
                reportTemplateID: reportWizardState.reportTemplateID
            }
        });
        return requestJson;
    }
    static generateReportFromWizardState(reportWizardState, requestType, state, customizeWizardModelAction, oldReportInfo) {
        return sendRequest(HandlerUri(), 'generateReportFromWizardModel', this.createNewWizardRequest(reportWizardState, requestType, state, customizeWizardModelAction, oldReportInfo), ReportStorageWeb.getErrorMessageHandler());
    }
    static getLabelReportWizardData() {
        return sendRequest(HandlerUri(), 'labelReportWizardData', '');
    }
    static createNewJsonDataSource(state, createJsonCallback) {
        const jsonDataSource = _restoreJsonDataSourceFromState(state);
        const deferred = $.Deferred();
        QBRequestWrapper().saveJsonSource(state.newConnectionName, jsonDataSource).done((connectionName) => {
            state.jsonSource = null;
            state.connectionName = connectionName;
            createJsonCallback(_restoreJsonDataSourceFromState(state))
                .done(result => {
                result.data = createNewObjectItem(result.data);
                deferred.resolve(_convertToStateDataSource(result));
            })
                .fail(() => deferred.reject());
        }).fail(() => deferred.reject());
        return deferred.promise();
    }
}
