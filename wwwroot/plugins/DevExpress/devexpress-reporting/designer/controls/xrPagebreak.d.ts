﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPagebreak.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { IUnitProperties } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { XRControlSurfaceBase, XRControlViewModel } from './xrControl';
export declare class XRPageBreakSurface extends XRControlSurfaceBase<XRControlViewModel> {
    static _unitProperties: IUnitProperties<XRControlViewModel>;
    preInitProperties(control: any, context: any): void;
    constructor(control: XRControlViewModel, context: ISurfaceContext);
    get isIntersectionDeny(): boolean;
    linePosition: any;
    lineHeight: ko.Computed<number>;
}