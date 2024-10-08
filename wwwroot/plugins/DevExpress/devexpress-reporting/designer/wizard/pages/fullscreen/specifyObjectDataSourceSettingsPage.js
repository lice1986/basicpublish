﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifyObjectDataSourceSettingsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FullscreenDataSourceWizardPageId, SpecifyObjectDataSourceSettingsPage as AnalyticSpecifyObjectDataSourceSettingsPage, _registerSpecifyObjectDataSourceSettingsPage as _registerAnalyticSpecifyObjectDataSourceSettingsPage, _restoreObjectDataSourceFromState } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import { ObjectDataSourceEditor } from '../../../actions/_objectDataSourceEditor';
import { createNewObjectItem } from '../../../dataObjects/objectItemCreation';
import { overrideFullscreenDataSourceWizardPageMetadata } from '../../internal/_utils';
import { _convertToStateDataSource } from '../chooseAvailableDataSourcePage';
export class SpecifyObjectDataSourceSettingsPage extends AnalyticSpecifyObjectDataSourceSettingsPage {
    canNext() {
        return super.canFinish();
    }
    initialize(state) {
        this._dataSourceId = state.dataSourceId;
        return super.initialize(state);
    }
    commit() {
        const deferred = $.Deferred();
        super.commit().done((state) => {
            const infoPromise = ObjectDataSourceEditor.createObjectDataSourceInfo(state, _restoreObjectDataSourceFromState(state, undefined, this._dataSourceId));
            infoPromise.done((result) => {
                result.data = createNewObjectItem(result.data);
                deferred.resolve({
                    objectDataSourceWizard: state,
                    newDataSource: _convertToStateDataSource(result)
                });
            });
        });
        return deferred.promise();
    }
}
export function _registerSpecifyObjectDataSourceSettingsPage(factory, wizardOptions) {
    _registerAnalyticSpecifyObjectDataSourceSettingsPage(factory, wizardOptions);
    overrideFullscreenDataSourceWizardPageMetadata(factory, FullscreenDataSourceWizardPageId.SpecifyObjectDataSourceSettingsPage, () => new SpecifyObjectDataSourceSettingsPage(wizardOptions));
}
