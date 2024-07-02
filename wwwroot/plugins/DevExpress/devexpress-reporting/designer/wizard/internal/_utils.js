﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization, getParentContainer, selectPlaceholder } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export const _masterDetailWizardHeight = '600';
export const _masterDetailWizardWidth = '840';
export const _masterDetailScrollViewHeight = '100%';
export function overrideFullscreenDataSourceWizardPageMetadata(factory, pageId, create) {
    const meta = factory.getMetadata(pageId);
    meta.canNext = (page) => { return page.canFinish() || page.canNext(); };
    meta.canFinish = (page) => page.canFinish();
    meta.create = create;
    const oldSetState = meta.setState;
    meta.setState = (data, state) => {
        oldSetState(data, state);
        state.newDataSource = data.newDataSource;
    };
    const oldResetState = meta.resetState;
    meta.resetState = (state, defaultState) => {
        oldResetState(state, defaultState);
        state.newDataSource = defaultState.newDataSource;
    };
}
export class FieldInfo extends Disposable {
    constructor(data) {
        super();
        this.field = ko.observable(null);
        this.selectedItems = ko.observableArray([]);
        this.functionValue = ko.observable();
        this.visible = ko.observable(true);
        this.value = {
            value: this.functionValue,
            dataSource: data,
            placeholder: selectPlaceholder(),
            selectAllText: getLocalization('Select All', 'AnalyticsCoreStringId.SelectAll'),
            getPopupContainer: getParentContainer,
            getOptions: (options) => this.getOptions(options),
            showDropDownButton: true,
            selectedItems: this.selectedItems,
            displayExpr: function (value) {
                if (!value)
                    return value;
                return getLocalization(value.displayValue, value.localizationId);
            }
        };
    }
    getOptions(options) { return options; }
}