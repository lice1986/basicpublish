﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\fieldsComboboxEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListEditor } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
export class FieldsComboboxEditor extends FieldListEditor {
    constructor() {
        super(...arguments);
        this.wrappedValues = null;
    }
    _createItem(displayNameProvider, item) {
        const deferred = $.Deferred();
        displayNameProvider.getDisplayNameByPath(this.path(), item).done((result) => {
            deferred.resolve({ value: item, displayValue: result });
        }).fail(() => {
            deferred.resolve({ value: item, displayValue: item });
        });
        return deferred;
    }
    _updateValues(values, displayNameProvider) {
        this.wrappedValues(values);
        $.when.apply($, values.map(x => this._createItem(displayNameProvider, x.value))).done((...results) => {
            this.wrappedValues(results);
        });
    }
    wrapValues(displayNameProvider) {
        if (!this.wrappedValues) {
            this.wrappedValues = ko.observableArray();
            this.addDisposable(this.subscribeProperty('values', (newVal) => {
                this._updateValues(newVal, displayNameProvider());
            }));
            this._updateValues(this._get('values'), displayNameProvider());
        }
        return this.wrappedValues;
    }
}
