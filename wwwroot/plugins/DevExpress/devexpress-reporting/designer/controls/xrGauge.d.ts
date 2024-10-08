﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrGauge.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { IDisplayedValue, ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ControlType } from './utils/_controlTypes';
import { XRControlViewModel } from './xrControl';
export declare const circularValues: Array<IDisplayedValue>;
export declare const linearValues: Array<IDisplayedValue>;
export declare class XRGaugeViewModel extends XRControlViewModel {
    static bindings: string[];
    constructor(model: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    viewType: ko.Observable<string> | ko.Computed<string>;
    viewStyle: ko.Observable<string> | ko.Computed<string>;
}
