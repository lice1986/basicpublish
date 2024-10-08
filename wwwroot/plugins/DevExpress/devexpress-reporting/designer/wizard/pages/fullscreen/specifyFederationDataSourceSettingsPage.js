﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifyFederationDataSourceSettingsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { FullscreenDataSourceWizardPageId, SpecifyFederationDataSourceSettingsPage as AnalyticSpecifyFederationDataSourceSettingsPage, _registerSpecifyFederationDataSourceSettingsPage as _analyticregisterSpecifyFederationDataSourceSettingsPage, _restoreFederationDataSourceFromState } from '@devexpress/analytics-core/analytics-wizard';
import { FederationDataSourceEditor } from '../../../actions/_federationDataSourceEditor';
import { DataFederationDataSource } from '../../../dataObjects/dataFederation';
import { overrideFullscreenDataSourceWizardPageMetadata } from '../../internal/_utils';
import { _convertToStateDataSource } from '../chooseAvailableDataSourcePage';
export class SpecifyFederationDataSourceSettingsPage extends AnalyticSpecifyFederationDataSourceSettingsPage {
    canNext() {
        return super.canFinish();
    }
    initialize(state) {
        return super.initialize(state);
    }
    commit() {
        const deferred = $.Deferred();
        super.commit().done((state) => {
            const federationDataSource = _restoreFederationDataSourceFromState(state.federationDataSourceWizard, this._dataSourceWizardOptions.dataSources, state.dataSourceId);
            const infoPromise = FederationDataSourceEditor.createFederationDataSourceInfo(federationDataSource);
            infoPromise.done((result) => {
                result.data = new DataFederationDataSource(result.data, this._dataSourceWizardOptions.dataSources, new ModelSerializer());
                result.data.serializableSourceMap(federationDataSource.serializableSourceMap());
                deferred.resolve({
                    federationDataSourceWizard: state.federationDataSourceWizard,
                    newDataSource: _convertToStateDataSource(result)
                });
            }).fail(deferred.reject);
        });
        return deferred.promise();
    }
}
export function _registerSpecifyFederationDataSourceSettingsPage(factory, wizardOptions) {
    _analyticregisterSpecifyFederationDataSourceSettingsPage(factory, wizardOptions);
    overrideFullscreenDataSourceWizardPageMetadata(factory, FullscreenDataSourceWizardPageId.SpecifyFederationDataSourceSettingsPage, () => new SpecifyFederationDataSourceSettingsPage(wizardOptions));
}
