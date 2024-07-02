﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\pdfExportOptionsPreview.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { PdfExportOptions } from '../../common/exportOptions/pdfExportOptions';
import { viewerEditorTemplates } from '../widgets/editorTemplates';
import { mutable } from '@devexpress/analytics-core/analytics-serializer-native';
export class PdfExportOptionsPreview extends PdfExportOptions {
    constructor(model, serializer, _signatures) {
        super(model, serializer);
        this._signatures = _signatures;
    }
    getInfo() {
        return [
            { propertyName: 'signature', defaultVal: null, editor: viewerEditorTemplates.signatures, displayName: 'Signature', localizationId: 'PreviewStringId.EditingFieldEditors_Signature', valueStore: this._signatures },
            ...super.getInfo()
        ];
    }
    isPropertyVisible(name) {
        return name !== 'signature' || !!this._signatures.length;
    }
}
__decorate([
    mutable(undefined)
], PdfExportOptionsPreview.prototype, "signature", void 0);
