﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrRichTextSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { NotifyAboutWarning } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { ReportRenderingService } from '../services/_reportRenderingService';
import { XRControlSurface } from './xrControl';
export class XRRichSurface extends XRControlSurface {
    constructor(control, context) {
        super(control, context);
        this._lastRequest = ko.observable(null);
        this._innerUpdate = ko.observable(false);
        this.imageSrc = ko.observable('');
        this.isLoading = ko.observable(false);
        this.template = 'dxrd-shape';
        this.contenttemplate = 'dxrd-server-rendered-control-content';
        this._sendCallback();
        this._disposables.push(control._newDocumentData.subscribe((newVal) => {
            control.serializableRtfString(newVal && newVal.content);
        }));
        this._disposables.push(control.textRtf.subscribe((newVal) => { this._sendCallback('textRtf'); }));
        this._disposables.push(control._rtf.subscribe(() => { this._sendCallback('rtf'); }));
        this._disposables.push(control.font.subscribe(() => { this._sendCallback('font'); }));
        this._disposables.push(control.foreColor.subscribe(() => { this._sendCallback('foreColor'); }));
        this._disposables.push(this['position']['width'].subscribe((newValue) => { this._sendCallback('width'); }));
        this._disposables.push(this['position']['height'].subscribe((newValue) => { this._sendCallback('height'); }));
        this._disposables.push(control.serializableRtfString.subscribe((newVal) => { this._sendCallback(newVal ? 'base64rtf' : undefined); }));
    }
    _sendCallback(propertyName = null) {
        if (!this._innerUpdate()) {
            this._lastRequest(propertyName);
            const self = this;
            const selfControl = this._control;
            this.isLoading(true);
            ReportRenderingService.getRichImage(this, propertyName).done(function (result) {
                self.isLoading(false);
                if (propertyName === self._lastRequest()) {
                    selfControl.root && selfControl.root['_update'] && selfControl.root['_update'](true);
                    if (propertyName !== 'height' && propertyName !== 'width') {
                        self._innerUpdate(true);
                        if (propertyName !== 'textRtf') {
                            selfControl.textRtf(result.Text);
                        }
                        selfControl._rtf(result.Rtf);
                        selfControl.serializableRtfString(result.SerializableRtfString);
                        self._innerUpdate(false);
                    }
                    self.imageSrc('data:image/x;base64,' + result.Img);
                    selfControl.root && selfControl.root['_update'] && selfControl.root['_update'](false);
                }
            }).fail(function (jqXHR) {
                self.isLoading(false);
                NotifyAboutWarning('It is impossible to get richText');
            });
        }
    }
}