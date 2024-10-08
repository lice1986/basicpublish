﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\fullscreenMultiQueryDataSourceWizard.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { isEmptyObject } from '../../../serializer/_utils';
import { _isMoreThanOneDataSourceTypeAvailable } from '../internal/_utils';
import { FullscreenDataSourceWizardPageId } from '../pageId';
import { PageIterator } from '../pageIterator';
import { DataSourceType } from '../pages/chooseDataSourceTypePage';
import { FullscreenWizard } from './fullscreenWizard';
import { FullscreenWizardPageFactory } from './fullscreenWizardPageFactory';
import { _registerSelectDataSourcePage } from './pages/selectDataSourcePage';
import { _registerSpecifyFederationDataSourceSettingsPage } from './pages/specifyFederationDataSourceSettingsPage';
import { _registerSpecifyJsonDataSourceSettingsPage } from './pages/specifyJsonDataSourceSettingsPage';
import { _registerSpecifyObjectDataSourceSettingsPage } from './pages/specifyObjectDataSourceSettingsPage';
import { _registerSpecifySqlDataSourceSettingsPage } from './pages/specifySqlDataSourceSettingsPage';
export class FullscreenDataSourceWizard extends FullscreenWizard {
    constructor(factory, _dataSourceWizardOptions) {
        super(factory, _dataSourceWizardOptions.callbacks.finishCallback);
        this._dataSourceWizardOptions = _dataSourceWizardOptions;
    }
    initialize(state, createIterator = (pageFactory, stateManager) => new FullscreenDataSourceWizardPageIterator(pageFactory, stateManager, this._dataSourceWizardOptions, (page) => this._onResetPage(page))) {
        if (this._dataSourceWizardOptions.sqlDataSourceAvailable || !isEmptyObject(state.sqlDataSourceWizard)) {
            state.dataSourceType = DataSourceType.Sql;
        }
        else if (this._dataSourceWizardOptions.jsonDataSourceAvailable || state.jsonDataSourceWizard.jsonSource) {
            state.dataSourceType = DataSourceType.Json;
        }
        else if (this._dataSourceWizardOptions.objectDataSourceAvailable || !isEmptyObject(state.objectDataSourceWizard)) {
            state.dataSourceType = DataSourceType.Object;
        }
        super.initialize(state, createIterator);
    }
    canRunWizard() {
        return this._dataSourceWizardOptions.canRunWizard;
    }
    _description() {
        return getLocalization('Data Source Wizard', 'AnalyticsCoreStringId.DSWizard_Title');
    }
}
export class FullscreenDataSourceWizardPageIterator extends PageIterator {
    constructor(factory, stateManager, _dataSourceOptions, onResetPage) {
        super(factory, stateManager, onResetPage);
        this._dataSourceOptions = _dataSourceOptions;
    }
    _shouldSelectDataSource() {
        return _isMoreThanOneDataSourceTypeAvailable(this._dataSourceOptions) || this._dataSourceOptions.predefinedDataSources().length > 0;
    }
    getNextPageId(pageId) {
        if (!pageId && this._shouldSelectDataSource()) {
            return FullscreenDataSourceWizardPageId.SelectDataSourcePage;
        }
        else if (!pageId && this._dataSourceOptions.sqlDataSourceAvailable) {
            return FullscreenDataSourceWizardPageId.SpecifySqlDataSourceSettingsPage;
        }
        else if (!pageId && this._dataSourceOptions.jsonDataSourceAvailable) {
            return FullscreenDataSourceWizardPageId.SpecifyJsonDataSourceSettingsPage;
        }
        else if (!pageId && this._dataSourceOptions.objectDataSourceAvailable) {
            return FullscreenDataSourceWizardPageId.SpecifyObjectDataSourceSettingsPage;
        }
        else if (pageId === FullscreenDataSourceWizardPageId.SelectDataSourcePage && this._getCurrentState().dataSourceType === DataSourceType.Json) {
            return FullscreenDataSourceWizardPageId.SpecifyJsonDataSourceSettingsPage;
        }
        else if (pageId === FullscreenDataSourceWizardPageId.SelectDataSourcePage && this._getCurrentState().dataSourceType === DataSourceType.Sql) {
            return FullscreenDataSourceWizardPageId.SpecifySqlDataSourceSettingsPage;
        }
        else if (pageId === FullscreenDataSourceWizardPageId.SelectDataSourcePage && this._getCurrentState().dataSourceType === DataSourceType.Object) {
            return FullscreenDataSourceWizardPageId.SpecifyObjectDataSourceSettingsPage;
        }
        else if (pageId === FullscreenDataSourceWizardPageId.SelectDataSourcePage && this._getCurrentState().dataSourceType === DataSourceType.Federation) {
            return FullscreenDataSourceWizardPageId.SpecifyFederationDataSourceSettingsPage;
        }
    }
}
export function _createDataSourceFullscreenWizard(dataSourceWizardOptions) {
    const factory = new FullscreenWizardPageFactory();
    const wizard = new FullscreenDataSourceWizard(factory, dataSourceWizardOptions);
    _registerSelectDataSourcePage(factory, dataSourceWizardOptions);
    _registerSpecifySqlDataSourceSettingsPage(factory, dataSourceWizardOptions);
    _registerSpecifyFederationDataSourceSettingsPage(factory, dataSourceWizardOptions);
    _registerSpecifyJsonDataSourceSettingsPage(factory, dataSourceWizardOptions);
    _registerSpecifyObjectDataSourceSettingsPage(factory, dataSourceWizardOptions);
    return wizard;
}
