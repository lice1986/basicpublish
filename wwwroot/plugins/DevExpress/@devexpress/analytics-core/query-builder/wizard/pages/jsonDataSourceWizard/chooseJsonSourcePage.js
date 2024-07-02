﻿/**
* DevExpress Analytics (query-builder\wizard\pages\jsonDataSourceWizard\chooseJsonSourcePage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { _restoreJsonDataSourceFromState } from '../../dataSourceWizardState';
import { JsonDataSourceJsonSourcePageStringSettings, JsonDataSourceJsonSourcePageUriSettings } from '../../internal/_jsonSourceSettings';
import { RequestWrapper } from '../../../utils/requestwrapper';
import { JsonDataSource } from '../../../dataSource/json/jsonDataSource';
import { ModelSerializer } from '../../../../serializer/serializer';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { JsonDataSourceWizardPageId } from '../../pageId';
import { getLocalizedValidationErrorMessage } from '../../internal/_jsonDataSourceWidgets';
import { WizardPageBase } from '../wizardPageBase';
export class ChooseJsonSourcePage extends WizardPageBase {
    constructor(_requestWrapper = new RequestWrapper(), itemsProvider) {
        super();
        this._requestWrapper = _requestWrapper;
        this.__validationGroup = null;
        this.__validationSummary = null;
        this._jsonSourceTitle = getLocalization('JSON Source:', 'DataAccessUIStringId.WizardPageChooseJsonSource_SourceType');
        this._jsonConnectionTitle = getLocalization('Connection Name:', 'AnalyticsCoreStringId.ReportDesigner_Wizard_Json_ConnectionName');
        this._connectionNameValidationRules = [{
                type: 'required',
                get message() {
                    return getLocalizedValidationErrorMessage(null, this._jsonConnectionTitle);
                }
            }];
        this._connectionName = ko.observable('');
        this._validationGroup = {
            onInitialized: (args) => this._onValidationGroupInitialized(args),
            onDisposing: (args) => this._onValidationGroupDisposing(args)
        };
        this._validationSummary = {
            onInitialized: (args) => this._onValidationSummaryInitialized(args),
            onDisposing: (args) => this._onValidationSummaryDisposing(args)
        };
        this._sources = [];
        this._disposables.push(this._jsonStringSettings = new JsonDataSourceJsonSourcePageStringSettings());
        this._jsonStringSettings.onChange(() => this._onChange());
        this._disposables.push(this._jsonUriSetting = new JsonDataSourceJsonSourcePageUriSettings(this._requestWrapper, itemsProvider));
        this._jsonUriSetting.onChange(() => this._onChange());
        this._sources = [
            { value: this._jsonUriSetting, displayValue: 'Web Service Endpoint (URI)', localizationId: 'DataAccessUIStringId.WizardPageChooseJsonSource_SourceType_Uri' },
            { value: this._jsonStringSettings, displayValue: 'JSON String', localizationId: 'DataAccessUIStringId.WizardPageChooseJsonSource_SourceType_Custom' }
        ];
        const selectedSource = ko.observable();
        this._selectedSource = ko.pureComputed({
            read: () => selectedSource(),
            write: (newVal) => {
                if (selectedSource() === newVal)
                    return;
                selectedSource(newVal);
                newVal._validatorsReady && newVal._validatorsReady(false);
                setTimeout(() => {
                    newVal._validate && newVal._validate();
                }, 1);
                this._onChange();
            }
        });
        this._selectedSource(this._sources[0].value);
        this._disposables.push(this._selectedSource);
        this._disposables.push(this._connectionName.subscribe(() => this._onChange()));
    }
    _onValidationGroupInitialized(e) {
        this.__validationGroup = e.component;
    }
    _onValidationGroupDisposing(e) {
        this.__validationGroup = null;
    }
    _onValidationSummaryInitialized(e) {
        this.__validationSummary = e.component;
        this.__validationGroup && this.__validationSummary && this._connectionName && this._connectionName() && setTimeout(() => {
            this.__validationGroup && this.__validationGroup.validate();
        }, 1);
    }
    _onValidationSummaryDisposing(e) {
        this.__validationSummary = null;
    }
    canNext() {
        const connectionNameNotEmpty = !!this._connectionName();
        const isCurrentSourceValid = this._selectedSource().isValid();
        const isCurrentSourceEmpty = this._selectedSource().isEmpty();
        return connectionNameNotEmpty && isCurrentSourceValid && !isCurrentSourceEmpty;
    }
    commit() {
        const jsonDataSource = new JsonDataSource({});
        this._selectedSource().applySettings(jsonDataSource);
        const serialized = new ModelSerializer().serialize(jsonDataSource);
        return $.Deferred().resolve({
            jsonSource: JSON.stringify(serialized.Source),
            newConnectionName: this._connectionName()
        }).promise();
    }
    initialize(state) {
        this.__validationGroup = null;
        this.__validationSummary = null;
        const jsonDataSource = _restoreJsonDataSourceFromState(state);
        if (jsonDataSource.source.uri()) {
            this._selectedSource(this._jsonUriSetting);
        }
        else if (jsonDataSource.source.json()) {
            this._selectedSource(this._jsonStringSettings);
        }
        this._selectedSource().setValue(jsonDataSource);
        return $.Deferred().resolve().promise();
    }
}
export function _registerChooseJsonSourcePage(factory, requestWrapper, getItemsProviderCallback) {
    factory.registerMetadata(JsonDataSourceWizardPageId.ChooseJsonSourcePage, {
        setState: (data, state) => {
            state.jsonSource = data.jsonSource;
            state.newConnectionName = data.newConnectionName;
        },
        getState: (state) => {
            return state.jsonDataSourceWizard;
        },
        resetState: (state, defaultState) => {
            state.jsonSource = defaultState.jsonSource;
        },
        create: () => {
            return new ChooseJsonSourcePage(requestWrapper, getItemsProviderCallback && getItemsProviderCallback());
        },
        description: getLocalization('Create a data connection.', 'AnalyticsCoreStringId.JsonDSWizard_CreateNewConnectionPage_Description'),
        template: 'dxrd-page-jsonsource'
    });
}
