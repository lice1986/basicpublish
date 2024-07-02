﻿/**
* DevExpress HTML/JS Reporting (rich-edit\surface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { XRControlSurface } from '../designer/controls/xrControl';
import { base64UTF16LEtobase64UTF8 } from '../designer/utils/utils';
import { XRRichController } from './utils/_controller';
export class XRRichModernSurface extends XRControlSurface {
    constructor(control, context) {
        super(control, context);
        this.isValid = ko.observable(true);
        this.serializedRtf = ko.observable('');
        this.template = 'dxrd-richedit';
        this.contenttemplate = 'dxrd-richedit-content';
        this.selectiontemplate = 'dxrd-richedit-selection';
        this._convertReady = $.Deferred();
        base64UTF16LEtobase64UTF8(control.serializableRtfString(), (val) => {
            this.serializedRtf(val);
            this._convertReady.resolve(true);
        });
        this._disposables.push(this.serializedRtf.subscribe((newValue) => {
            control.serializableRtfString(newValue);
        }));
        this.defaultStyleunit = ko.computed(() => ({
            top: this.contentSizes().top + (this.isIntersect() ? 1 : 0),
            left: this.contentSizes().left + (this.isIntersect() ? 1 : 0),
            lineHeight: this.contentSizes().height,
            height: this.contentSizes().height,
            width: this.contentSizes().width
        })).extend({ deferred: true });
        this._disposables.push(this.defaultStyleunit);
    }
    createController(richEdit) {
        this._convertReady.done(() => {
            this.controller = new XRRichController(richEdit, this);
            this._disposables.push(this.controller);
        });
    }
}
