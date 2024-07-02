﻿/**
* DevExpress Analytics (query-builder\wizard\chooseAvailablePage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { __nextActionFunctionName } from './internal/_constants';
import { subscribeProperties } from './internal/_utils';
import { WizardPageBase } from './pages/wizardPageBase';
export class ChooseAvailableItemPage extends WizardPageBase {
    constructor(items, canCreateNew = true, _getJsonConnectionsCallback) {
        super();
        this.items = items;
        this._getJsonConnectionsCallback = _getJsonConnectionsCallback;
        this.selectedItems = ko.observableArray([]);
        this.operations = [
            { text: this.existingOperationText, createNew: false },
            { text: this.createNewOperationText, createNew: true }
        ];
        this.selectedOperation = ko.observable(this.operations[0]);
        this._createNew = ko.pureComputed(() => this.selectedOperation().createNew);
        this.canCreateNew = ko.observable(canCreateNew);
        this._disposables.push(...subscribeProperties([this.selectedOperation, this.selectedItems], () => this._onChange()));
    }
    canNext() {
        return this.selectedItems().length !== 0 || this.selectedOperation().createNew;
    }
    initialize(state) {
        if (this._getJsonConnectionsCallback) {
            const deferred = $.Deferred();
            this._getJsonConnectionsCallback().done(connections => {
                this.items(connections);
                const item = this._getSelectedItem(state);
                this.selectedItems(item ? [item] : []);
                deferred.resolve(connections);
            }).fail(() => {
                deferred.reject();
            });
            return deferred.promise();
        }
        const item = this._getSelectedItem(state);
        this.selectedItems(item ? [item] : []);
        return $.Deferred().resolve(this).promise();
    }
    _displayExpr(item) {
        return item.description || item.name;
    }
    _getSelectedItem(state) {
        return this.items()[0];
    }
    onDblClick() {
        this[__nextActionFunctionName] && this[__nextActionFunctionName]();
    }
    get createNewOperationText() {
        return getLocalization("No, I'd like to create a new data source", 'AnalyticsCoreStringId.Wizard_CreateNewDataSource');
    }
    get existingOperationText() {
        return getLocalization('Yes, let me choose an existing data source from the list', 'AnalyticsCoreStringId.Wizard_ChooseDataSourceFromList');
    }
}