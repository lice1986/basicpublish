﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrRichTextSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { XRControlSurface } from './xrControl';
import { XRRichViewModel } from './xrRichText';
export declare class XRRichSurface extends XRControlSurface {
    private _lastRequest;
    private _innerUpdate;
    private _sendCallback;
    constructor(control: XRRichViewModel, context: ISurfaceContext);
    imageSrc: ko.Observable<string>;
    isLoading: ko.Observable<boolean>;
}
