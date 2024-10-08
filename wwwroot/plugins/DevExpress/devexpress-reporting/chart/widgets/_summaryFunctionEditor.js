﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_summaryFunctionEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createViewModelGenerator } from '@devexpress/analytics-core/analytics-serializer-native';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { FieldListEditor } from '@devexpress/analytics-core/analytics-widgets';
import { propertiesGridEditorsPaddingLeft } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
export class SummaryFunctionModel {
    constructor(functionName, args) {
        this.functionName = ko.observable();
        this.args = ko.observableArray();
        this.functionName(functionName);
        this.args(args.map(x => { return { value: ko.observable(x) }; }));
        this.functionName.subscribe((newVal) => {
            this._updateArgs(newVal);
        });
    }
    static from(val) {
        let functionName = null, args = [];
        if (val) {
            functionName = val.split('(')[0];
            args = val.split('(')[1].split(')')[0].split(',');
            if (args[0] === '') {
                args = [];
            }
            else {
                args = args.map(x => x.split('[')[1].split(']')[0]);
            }
        }
        return new SummaryFunctionModel(functionName, args);
    }
    static toJson(value) {
        if (!value.functionName()) {
            return {};
        }
        return value.functionName() + '(' + value.args().map(x => '[' + x.value() + ']').join(',') + ')';
    }
    _updateArgs(functionName) {
        if (SummaryFunctionModel.availableItems.indexOf(functionName) !== -1) {
            if (functionName === 'COUNT' || !functionName) {
                this.args([]);
            }
            else if (this.args().length === 0) {
                this.args.push({ value: ko.observable('') });
            }
            else if (this.args().length > 1) {
                this.args.splice(1, this.args().length - 1);
            }
        }
    }
}
SummaryFunctionModel.availableItems = ['SUM', 'MIN', 'MAX', 'AVERAGE', 'COUNT'];
export class SummaryFunctionEditor extends FieldListEditor {
    constructor(modelPropertyInfo, level, parentDisabled) {
        super(modelPropertyInfo, level, parentDisabled);
        this.argumentTemplateName = ko.bindingHandlers['displayNameExtender'] ? 'dxrd-field' : 'dxcd-field';
        this.actionsAreAvailable = ko.observable(false);
        let subscription = null;
        this.memberPadding = { paddingLeft: (level + 1) * propertiesGridEditorsPaddingLeft() };
        this.subscribeProperty('_model', (newVal) => {
            subscription && subscription.dispose();
            subscription = ko.computed(() => {
                this.actionsAreAvailable(this.value().functionName() && SummaryFunctionModel.availableItems.indexOf(this.value() && this.value().functionName()) === -1);
            });
        });
    }
    createViewModel() {
        const viewmodel = createViewModelGenerator(super.createViewModel())
            .generateProperty('actionsAreAvailable', ko.unwrap(this.actionsAreAvailable))
            .generateProperty('add', () => this.add())
            .generateProperty('availableItems', this.getAvailableItems())
            .generateProperty('memberPadding', this.memberPadding)
            .generateProperty('argumentTemplateName', this.argumentTemplateName)
            .generateProperty('getLocalization', this.getLocalization)
            .generateProperty('remove', (index) => this.remove(index))
            .getViewModel();
        this.subscribeOnChanges(viewmodel, ['actionsAreAvailable']);
        return viewmodel;
    }
    getLocalization(displayName, localizationId) {
        return getLocalization(displayName, localizationId);
    }
    add() {
        this.value().args.push({ value: ko.observable('') });
    }
    remove(index) {
        this.value().args.splice(index, 1);
    }
    getAvailableItems() {
        return SummaryFunctionModel.availableItems;
    }
}
