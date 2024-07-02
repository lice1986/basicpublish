﻿/**
* DevExpress Analytics (query-builder\wizard\pages\chooseSqlConnectionPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { getFirstItemByPropertyValue } from '../../../core/utils/_arrayutils';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { localizeWithUpdateLocalizationMethod } from '../../../property-grid/localization/_localization';
import { SqlDataSourceWizardPageId } from '../pageId';
import { WizardPageBase } from './wizardPageBase';
export class ChooseSqlConnectionPage extends WizardPageBase {
    constructor(connectionStrings, _getSqlConnectionsCallback) {
        super();
        this._getSqlConnectionsCallback = _getSqlConnectionsCallback;
        this._connectionStrings = ko.observableArray([]);
        this._selectedConnectionString = ko.observableArray([]);
        this._connectionStrings = connectionStrings;
        this._disposables.push(this._selectedConnectionString.subscribe(() => this._onChange()));
    }
    initialize(state) {
        const selectConnection = (connections) => {
            if (connections.length === 1) {
                this._selectedConnectionString([connections[0]]);
            }
            else {
                const selectedString = getFirstItemByPropertyValue(connections, 'name', state.name) || connections[0];
                this._selectedConnectionString(selectedString ? [selectedString] : []);
            }
        };
        if (this._getSqlConnectionsCallback) {
            const deferred = $.Deferred();
            this._getSqlConnectionsCallback().done(connections => {
                this._connectionStrings(connections);
                selectConnection(connections);
                deferred.resolve(connections);
            }).fail(() => {
                deferred.reject();
            });
            return deferred.promise();
        }
        const connectionStrings = this._connectionStrings();
        selectConnection(connectionStrings);
        return $.Deferred().resolve().promise();
    }
    canNext() {
        return this._selectedConnectionString().length !== 0;
    }
    commit() {
        const deferred = $.Deferred();
        if (this._selectedConnectionString()[0]) {
            deferred.resolve({
                name: this._selectedConnectionString()[0].name
            });
        }
        else {
            deferred.resolve();
        }
        return deferred.promise();
    }
}
export function _registerChooseSqlConnectionPage(factory, connectionStrings, getSqlConnectionsCallback) {
    factory.registerMetadata(SqlDataSourceWizardPageId.ChooseConnectionPage, {
        create: () => {
            return new ChooseSqlConnectionPage(connectionStrings, getSqlConnectionsCallback);
        },
        setState: (data, state) => {
            state.name = data.name;
        },
        getState: (state) => {
            return state.sqlDataSourceWizard;
        },
        resetState: (state, defaultState) => {
            state.name = defaultState.name;
        },
        template: 'dxrd-page-connectionstring',
        description: localizeWithUpdateLocalizationMethod('Choose a data connection') || getLocalization('Choose a data connection.', 'AnalyticsCoreStringId.SqlDSWizard_PageChooseConnection')
    });
}
