﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrRichText.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { IFileUploadResult } from '@devexpress/analytics-core/analytics-internal';
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ControlType } from './utils/_controlTypes';
import { XRControlViewModel } from './xrControl';
export declare enum XRRichTextStreamType {
    RtfText = 0,
    PlainText = 1,
    HtmlText = 2,
    XmlText = 3
}
export declare class XRRichViewModel extends XRControlViewModel {
    private static _hiddenProperties;
    private _toStreamType;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    get textEditableProperty(): ko.Observable<string>;
    format: ko.Observable<XRRichTextStreamType>;
    foreColor: ko.Observable<string> | ko.Computed<string>;
    serializableRtfString: ko.Observable<string> | ko.Computed<string>;
    _newDocumentData: ko.Observable<IFileUploadResult>;
    font: ko.Observable<string> | ko.Computed<string>;
    textRtf: ko.Observable<string>;
    _rtf: ko.Observable<string>;
}
