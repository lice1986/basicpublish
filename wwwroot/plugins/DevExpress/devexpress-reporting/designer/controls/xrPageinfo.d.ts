﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPageinfo.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ControlType } from './utils/_controlTypes';
import { XRControlSurface, XRControlViewModel } from './xrControl';
export declare class XRPageInfoSurface extends XRControlSurface {
    constructor(control: XRPageInfoViewModel, context: ISurfaceContext);
}
export declare class XRPageInfoViewModel extends XRControlViewModel {
    constructor(model: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
}
export declare const pageInfoValuesMap: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
