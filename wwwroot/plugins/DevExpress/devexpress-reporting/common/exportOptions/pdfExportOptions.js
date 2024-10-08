﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\pdfExportOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { pdfACompatibility, pdfACompatibilityValues, pdfExportOptionsSerializationInfo, pdfUACompatibility, pdfUACompatibilityValues, showPrintDialogOnOpen } from './pdfMetaData';
import { BaseRenderingMultiplatformModel } from '@devexpress/analytics-core/analytics-serializer-native';
export class PdfExportOptions extends BaseRenderingMultiplatformModel {
    static from(model, serializer) {
        return new PdfExportOptions(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, pdfExportOptionsSerializationInfo, refs);
    }
    isPropertyDisabled(propertyName) {
        const _pdfACompatibility = this.pdfACompatibility ? this._get('pdfACompatibility') : pdfACompatibility.defaultVal;
        const _pdfUACompatibility = this.pdfUACompatibility ? this._get('pdfUACompatibility') : pdfUACompatibility.defaultVal;
        const _showDialogOnOpen = this.showPrintDialogOnOpen ? this._get('showPrintDialogOnOpen') : showPrintDialogOnOpen.defaultVal;
        if (propertyName === 'exportEditingFieldsToAcroForms')
            return _pdfACompatibility === pdfACompatibilityValues.PdfA1b || _pdfACompatibility === pdfACompatibilityValues.PdfA1a;
        else if (propertyName === 'neverEmbeddedFonts')
            return _pdfACompatibility != pdfACompatibilityValues.None || _pdfUACompatibility != pdfUACompatibilityValues.None;
        else if (propertyName === 'pdfPasswordSecurityOptions' || propertyName === 'showPrintDialogOnOpen')
            return _pdfACompatibility != pdfACompatibilityValues.None;
        else if (propertyName === 'pdfACompatibility')
            return _showDialogOnOpen;
    }
    getInfo() {
        return pdfExportOptionsSerializationInfo;
    }
    hasSensitiveData() {
        return this.pdfPasswordSecurityOptions && this.pdfPasswordSecurityOptions.hasSensitiveData();
    }
}
