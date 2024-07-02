﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\options\pdfPasswordSecurityOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createPasswordSerializationInfo } from '@devexpress/analytics-core/analytics-internal-native';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets-native';
import { PdfPermissionsOptions } from './pdfPermissionsOptions';
import { BaseRenderingMultiplatformModel } from '@devexpress/analytics-core/analytics-serializer-native';
export class PdfPasswordSecurityOptions extends BaseRenderingMultiplatformModel {
    static from(model, serializer) {
        return new PdfPasswordSecurityOptions(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, pdfExportPasswordSecurityOptionsSerializationInfo, refs);
    }
    getInfo() {
        return pdfExportPasswordSecurityOptionsSerializationInfo;
    }
    isPropertyDisabled(name) {
        if (!(this.permissionsPassword && this._get('permissionsPassword'))) {
            if (name === 'permissionsOptions')
                return true;
            if (name === pdfEncryptionLevel.propertyName)
                return !(this.openPassword && this._get('openPassword'));
            return false;
        }
    }
    hasSensitiveData() {
        return !!(this.openPassword && this._get('openPassword') || this.permissionsPassword && this._get('permissionsPassword'));
    }
}
export const pdfEncryptionLevel = {
    propertyName: 'encryptionLevel', modelName: '@EncryptionLevel', displayName: 'Encryption Level', localizationId: 'DevExpress.XtraPrinting.PdfPasswordSecurityOptions.EncryptionLevel', defaultVal: 'AES128', editor: editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'ARC4', displayValue: 'ARC4', localizationId: 'DevExpress.XtraPrinting.PdfEncryptionLevel.ARC4' },
        { value: 'AES128', displayValue: 'AES128', localizationId: 'DevExpress.XtraPrinting.PdfEncryptionLevel.AES128' },
        { value: 'AES256', displayValue: 'AES256', localizationId: 'DevExpress.XtraPrinting.PdfEncryptionLevel.AES256' },
    ]
};
export const pdfExportPasswordSecurityOptionsSerializationInfo = [
    createPasswordSerializationInfo({ propertyName: 'openPassword', modelName: '@OpenPassword', displayName: 'Open Password', localizationId: 'DevExpress.XtraPrinting.PdfPasswordSecurityOptions.OpenPassword', defaultVal: '' }),
    pdfEncryptionLevel,
    createPasswordSerializationInfo({ propertyName: 'permissionsPassword', modelName: '@PermissionsPassword', displayName: 'Permissions Password', localizationId: 'DevExpress.XtraPrinting.PdfPasswordSecurityOptions.PermissionsPassword', defaultVal: '' }),
    { propertyName: 'permissionsOptions', modelName: 'PermissionsOptions', displayName: 'Pdf Permissions Options', localizationId: 'DevExpress.XtraPrinting.PdfPermissionsOptions', from: PdfPermissionsOptions.from, toJsonObject: PdfPermissionsOptions.toJson, editor: editorTemplates.getEditor('objecteditor') }
];
