﻿/**
* DevExpress HTML/JS Reporting (rich-edit\surface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { XRControlSurface } from '../designer/controls/xrControl';
import { XRRichViewModel } from '../designer/controls/xrRichText';
import { XRRichController } from './utils/_controller';
import { XRRichEditControlModel } from './utils/_model';
export declare class XRRichModernSurface extends XRControlSurface {
    private _convertReady;
    constructor(control: XRRichViewModel, context: ISurfaceContext);
    createController(richEdit: XRRichEditControlModel): void;
    isValid: ko.Observable<boolean>;
    defaultStyleunit: ko.Computed;
    controller: XRRichController;
    serializedRtf: ko.Observable<string>;
}
