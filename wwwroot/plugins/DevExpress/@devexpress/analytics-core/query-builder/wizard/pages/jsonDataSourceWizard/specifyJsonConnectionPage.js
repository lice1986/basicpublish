﻿/**
* DevExpress Analytics (query-builder\wizard\pages\jsonDataSourceWizard\specifyJsonConnectionPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { RequestWrapper } from '../../../utils/requestwrapper';
import { JsonDataSourceWizardPageId } from '../../pageId';
import { ChooseJsonConnectionPage } from './chooseJsonConnectionPage';
import { ChooseJsonSourcePage } from './chooseJsonSourcePage';
export class SpecifyJsonConnectionPage extends ChooseJsonConnectionPage {
    constructor(connections, allowCreateNewJsonConnection, itemsProvider, _requestWrapper = new RequestWrapper(), _getJsonConnectionsCallback) {
        super(connections, allowCreateNewJsonConnection, _getJsonConnectionsCallback);
        this._requestWrapper = _requestWrapper;
        this._disposables.push(this._specifySourceData = new ChooseJsonSourcePage(_requestWrapper, itemsProvider));
        this._specifySourceData.onChange(() => this._onChange());
    }
    commit() {
        const deffered = $.Deferred();
        let _promise;
        if (this._createNew()) {
            _promise = this._specifySourceData.commit();
        }
        else {
            _promise = super.commit();
        }
        _promise.done(state => {
            deffered.resolve(state);
        });
        return deffered.promise();
    }
    canNext() {
        if (this._createNew()) {
            return this._specifySourceData.canNext();
        }
        else {
            return super.canNext();
        }
    }
    initialize(state) {
        const deffered = $.Deferred();
        super.initialize(state).done(() => {
            this._specifySourceData.initialize(state).done(() => {
                deffered.resolve(this);
            });
        });
        return deffered.promise();
    }
}
export function _registerSpecifyJsonConnectionPage(factory, connections, allowCreateNewJsonConnection, getItemsProviderCallBack, getJsonConnectionsCallback) {
    factory.registerMetadata(JsonDataSourceWizardPageId.SpecifyJsonConnectionPage, {
        create: () => new SpecifyJsonConnectionPage(connections, allowCreateNewJsonConnection, getItemsProviderCallBack && getItemsProviderCallBack(), undefined, getJsonConnectionsCallback),
        description: allowCreateNewJsonConnection ?
            getLocalization('Do you want to use an existing data connection?', 'AnalyticsCoreStringId.JsonDSWizard_ChooseConnection_Description') :
            getLocalization('Choose a data connection.', 'AnalyticsCoreStringId.SqlDSWizard_PageChooseConnection'),
        getState: (state) => state.jsonDataSourceWizard,
        setState: (data, state) => {
            state.connectionName = data.connectionName;
            state.jsonSource = data.jsonSource;
            state.newConnectionName = data.newConnectionName;
        },
        resetState: (state, defaultState) => {
            state.connectionName = defaultState.connectionName;
            state.jsonSource = defaultState.jsonSource;
            state.newConnectionName = defaultState.newConnectionName;
        },
        template: 'dxrd-page-specify-connection'
    });
}
