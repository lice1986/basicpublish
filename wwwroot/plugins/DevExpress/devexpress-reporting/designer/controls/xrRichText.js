﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrRichText.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { getRichEditSurface } from './richEdit';
import { XRControlViewModel } from './xrControl';
import { XRRichSurface } from './xrRichTextSurface';
export var XRRichTextStreamType;
(function (XRRichTextStreamType) {
    XRRichTextStreamType[XRRichTextStreamType["RtfText"] = 0] = "RtfText";
    XRRichTextStreamType[XRRichTextStreamType["PlainText"] = 1] = "PlainText";
    XRRichTextStreamType[XRRichTextStreamType["HtmlText"] = 2] = "HtmlText";
    XRRichTextStreamType[XRRichTextStreamType["XmlText"] = 3] = "XmlText";
})(XRRichTextStreamType || (XRRichTextStreamType = {}));
export class XRRichViewModel extends XRControlViewModel {
    constructor(model, parent, serializer) {
        super(model, parent, serializer);
        this.format = ko.observable(XRRichTextStreamType.RtfText);
        this._newDocumentData = ko.observable(null);
        this.textRtf = ko.observable('');
        this._rtf = ko.observable('');
        let nameSubscribe = null;
        nameSubscribe = ko.computed(() => {
            const newVal = this.name();
            if (!this.textRtf() && newVal) {
                this.textRtf(newVal);
                nameSubscribe && nameSubscribe.dispose();
            }
        }).extend({ rateLimit: { method: 'notifyWhenChangesStop', timeout: 1 } });
        this._disposables.push(this._newDocumentData.subscribe((newVal) => {
            if (newVal)
                this.format(this._toStreamType(newVal.format));
            else
                this.format(XRRichTextStreamType.RtfText);
        }));
        this._disposables.push(nameSubscribe);
    }
    _toStreamType(extension) {
        switch (extension.toLowerCase()) {
            case 'txt':
                return XRRichTextStreamType.PlainText;
            case 'htm':
            case 'html':
                return XRRichTextStreamType.HtmlText;
            case 'docx':
                return XRRichTextStreamType.XmlText;
        }
        return XRRichTextStreamType.RtfText;
    }
    getInfo() {
        const serializationInfo = $.extend(true, [], super.getInfo());
        if (!(getRichEditSurface()() instanceof XRRichSurface)) {
            serializationInfo.filter(x => XRRichViewModel._hiddenProperties.some(propertyName => propertyName === x.propertyName))
                .forEach(x => x.visible = false);
        }
        return serializationInfo;
    }
    get textEditableProperty() { return this.textRtf; }
}
XRRichViewModel._hiddenProperties = ['_rtf', 'textRtf'];
