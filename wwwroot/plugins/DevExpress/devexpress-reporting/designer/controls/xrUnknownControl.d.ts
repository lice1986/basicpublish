﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrUnknownControl.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { XRControlSurface, XRControlViewModel } from './xrControl';
export declare class XRUnknownControlSurface extends XRControlSurface {
    constructor(control: XRControlViewModel, context: ISurfaceContext);
    isLoading: ko.Observable<boolean>;
    imageSrc: ko.Observable<string>;
    error: ko.Observable<string>;
    private getValue;
    private _getParentStyles;
    private _applyParentStyles;
}
