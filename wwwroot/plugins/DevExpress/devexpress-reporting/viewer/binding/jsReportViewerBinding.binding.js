﻿/**
* DevExpress HTML/JS Reporting (viewer\binding\jsReportViewerBinding.binding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DxAnalyticsComponentCommon } from '@devexpress/analytics-core/analytics-internal-native';
import { registerBaseBinding } from '@devexpress/analytics-core/analytics-widgets-internal-native';
import '@devexpress/analytics-core/analytics-internal';
import '@devexpress/analytics-core/analytics-widgets-internal';
import '@devexpress/analytics-core/analytics-utils';
import '@devexpress/analytics-core/analytics-elements';
import '@devexpress/analytics-core/analytics-widgets';
import { JSReportViewerBinding } from './jsReportViewerBinding';
import { useKoIntegration } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
const dxReportViewerBindingName = 'dxReportViewer';
export class DxReportViewer extends DxAnalyticsComponentCommon {
    constructor(_element, _options) {
        super(_element, _options);
        useKoIntegration();
    }
    getBindingName() {
        return dxReportViewerBindingName;
    }
}
registerBaseBinding(dxReportViewerBindingName, '$data');
ko.bindingHandlers[dxReportViewerBindingName] = {
    init: function (element, valueAccessor) {
        new JSReportViewerBinding(ko.unwrap(valueAccessor()) || {}).applyBindings(element);
        return { controlsDescendantBindings: true };
    }
};
