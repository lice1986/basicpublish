﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifySqlDataSourceSettingsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FullscreenDataSourceWizardPageId, SpecifySqlDataSourceSettingsPage as SpecifyAnalyticSqlDataSourceSettingsPage, _registerSpecifySqlDataSourceSettingsPage as _registerSpecifyAnalyticsSqlDataSourceSettingsPage, _restoreSqlDataSourceFromState } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import { createNewObjectItem } from '../../../dataObjects/objectItemCreation';
import { overrideFullscreenDataSourceWizardPageMetadata } from '../../internal/_utils';
import { FullscreenReportWizardSectionId } from '../../pageId';
import { _convertToStateDataSource } from '../chooseAvailableDataSourcePage';
export class SpecifySqlDataSourceSettingsPage extends SpecifyAnalyticSqlDataSourceSettingsPage {
    registerSections() {
        super.registerSections();
        [
            this._factory.getMetadata(FullscreenReportWizardSectionId.ConfigureMasterDetailRelationshipsPage),
            this._factory.getMetadata(FullscreenReportWizardSectionId.ConfigureQueryParametersPage)
        ].forEach(meta => {
            meta.canFinish = () => false;
            meta.canNext = (page) => page.canNext() || page.canFinish();
        });
    }
    commit() {
        const deferred = $.Deferred();
        super.commit().done((commitResult) => {
            const dataSourcePromise = this['_dataSourceWizardOptions'].callbacks.createSqlDataSourceInfo(_restoreSqlDataSourceFromState(commitResult.sqlDataSourceWizard, undefined, commitResult.dataSourceId).sqlDataSource);
            dataSourcePromise.done((result) => {
                result.data = createNewObjectItem(result.data);
                deferred.resolve({
                    sqlDataSourceWizard: commitResult,
                    newDataSource: _convertToStateDataSource(result)
                });
            }).fail(deferred.reject);
        });
        return deferred.promise();
    }
}
export function _registerSpecifySqlDataSourceSettingsPage(factory, wizardOptions) {
    _registerSpecifyAnalyticsSqlDataSourceSettingsPage(factory, wizardOptions);
    overrideFullscreenDataSourceWizardPageMetadata(factory, FullscreenDataSourceWizardPageId.SpecifySqlDataSourceSettingsPage, () => new SpecifySqlDataSourceSettingsPage(wizardOptions));
}