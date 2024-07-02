﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\_summaryEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { XRControlViewModel } from '../controls/xrControl';
import { WrappedExpressionOptions } from '../dataObjects/expressions/_wrappedExpressionOptions';
export interface ISummaryOptions {
    ignoreNullValues: ko.Observable<boolean> | ko.Computed<boolean>;
    treatStringsAsNumerics: ko.Observable<boolean> | ko.Computed<boolean>;
    Running: ko.Observable<string> | ko.Computed<string>;
}
export declare class SummaryEditorPopup {
    dispose(): void;
    model: ko.Observable<SummaryEditorModel>;
    grid: ObjectProperties;
    visible: ko.Observable<boolean>;
    isValid: ko.Computed<boolean>;
    container: (element: HTMLElement) => any;
    buttons: ({
        toolbar: string;
        location: string;
        widget: string;
        options: {
            text: any;
            type: string;
            stylingMode: string;
            onClick: () => void;
            disabled: ko.Computed<boolean>;
        };
    } | {
        toolbar: string;
        location: string;
        widget: string;
        options: {
            text: any;
            type: string;
            stylingMode: string;
            onClick: () => void;
            disabled?: undefined;
        };
    })[];
}
export declare class SummaryEditorModel extends Disposable {
    private _control;
    dispose(): void;
    private _summary;
    private _order;
    private _summaryFunctionValues;
    private _info;
    private _initExpressionValues;
    getInfo(): ISerializationInfoArray;
    constructor(_control: XRControlViewModel);
    patchSerializationInfo(info: ISerializationInfo): void;
    applyChanges(): void;
    isPropertyDisabled(propertyName: string): boolean;
    isDisabled(): boolean;
    Func: ko.Observable<string>;
    calculate: WrappedExpressionOptions;
    weight: WrappedExpressionOptions;
    ignoreNullValues: ko.Observable<boolean> | ko.Computed<boolean>;
    treatStringsAsNumerics: ko.Observable<boolean> | ko.Computed<boolean>;
    Running: ko.Observable<string> | ko.Computed<string>;
}
