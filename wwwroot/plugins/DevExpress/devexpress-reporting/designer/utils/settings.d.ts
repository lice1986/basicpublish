﻿/**
* DevExpress HTML/JS Reporting (designer\utils\settings.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ControlsFactory } from '../controls/utils/controlsFactory';
import { ControlType } from '../controls/utils/_controlTypes';
import { XRReportElementViewModel } from '../controls/xrReportelement';
import { ISmartTag } from '../tools/smartTags/smartTagContainer';
export declare type DataBindingModeValue = 'Bindings' | 'Expressions' | 'ExpressionsAdvanced';
export declare type DefaultCrossTabControlValue = 'XRCrossTab' | 'XRPivotGrid';
export declare type SmartTagFactory = {
    [key in ControlType]?: (element: XRReportElementViewModel) => ISmartTag[];
};
export declare const controlsFactory: import("@devexpress/analytics-core/analytics-internal").IGlobalSubscribableValue<ControlsFactory>;
export declare const smartTagFactory: import("@devexpress/analytics-core/analytics-internal").IGlobalSubscribableValue<SmartTagFactory>;
export declare const DataBindingMode: import("@devexpress/analytics-core/analytics-internal").IGlobalSubscribableValue<DataBindingModeValue>;
export declare const HandlerUri: import("@devexpress/analytics-core/analytics-internal").IGlobalSubscribableValue<string>;
export declare const formatStringEditorCustomSet: import("@devexpress/analytics-core/analytics-internal").IGlobalSubscribableValue<{
    [key: string]: string[];
}>;
export declare const DefaultCrossTabControl: import("@devexpress/analytics-core/analytics-internal").IGlobalSubscribableValue<DefaultCrossTabControlValue>;
