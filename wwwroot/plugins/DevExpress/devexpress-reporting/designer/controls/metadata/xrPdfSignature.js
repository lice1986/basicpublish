﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrPdfSignature.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { accessibleDescription } from './properties/metadata';
import { commonControlProperties, fontGroup, navigationGroup, sizeLocation } from './properties/metadataGroups';
import { commonScripts } from './properties/scriptMetadata';
import { action } from './properties/action';
const showSignatureDate = {
    propertyName: 'showSignatureDate', modelName: '@ShowSignatureDate', defaultVal: 'true', from: parseBool,
    displayName: 'Show Signature Date', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.ShowSignatureDate',
    editor: editorTemplates.getEditor('bool')
};
const showCertificateName = {
    propertyName: 'showCertificateName', modelName: '@ShowCertificateName', defaultVal: 'true', from: parseBool,
    displayName: 'Show Certificate Name', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.ShowCertificateName',
    editor: editorTemplates.getEditor('bool')
};
const showLocation = {
    propertyName: 'showLocation', modelName: '@ShowLocation', defaultVal: 'true', from: parseBool,
    displayName: 'Show Location', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.ShowLocation',
    editor: editorTemplates.getEditor('bool')
};
const showSignatureReason = {
    propertyName: 'showSignatureReason', modelName: '@ShowSignatureReason', defaultVal: 'true', from: parseBool,
    displayName: 'Show Signature Reason', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.ShowSignatureReason',
    editor: editorTemplates.getEditor('bool')
};
const showDistinguishedName = {
    propertyName: 'showDistinguishedName', modelName: '@ShowDistinguishedName', defaultVal: 'true', from: parseBool,
    displayName: 'Show Distinguished Name', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.ShowDistinguishedName',
    editor: editorTemplates.getEditor('bool')
};
const showCaptions = {
    propertyName: 'showCaptions', modelName: '@ShowCaptions', defaultVal: 'true', from: parseBool,
    displayName: 'Show Captions', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.ShowCaptions',
    editor: editorTemplates.getEditor('bool')
};
const displayDocumentSignature = {
    propertyName: 'displayDocumentSignature', modelName: '@DisplayDocumentSignature', defaultVal: 'true', from: parseBool,
    displayName: 'Display Document Signature', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.DisplayDocumentSignature',
    editor: editorTemplates.getEditor('bool')
};
const imageDisplayMode = {
    propertyName: 'imageDisplayMode', modelName: '@ImageDisplayMode', defaultVal: 'Show',
    displayName: 'Image Display Mode', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.ImageDisplayMode',
    editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { displayValue: 'Show', localizationId: 'DevExpress.XtraPrinting.SignatureImageDisplayMode.Show', value: 'Show' },
        { displayValue: 'Hide', localizationId: 'DevExpress.XtraPrinting.SignatureImageDisplayMode.Hide', value: 'Hide' },
        { displayValue: 'Show Certificate Name As Image', localizationId: 'DevExpress.XtraPrinting.SignatureImageDisplayMode.ShowCertificateNameAsImage', value: 'ShowCertificateNameAsImage' }
    ]
};
const signatureOptionsInfo = [
    imageDisplayMode, displayDocumentSignature, showCaptions, showCertificateName, showDistinguishedName, showLocation, showSignatureDate, showSignatureReason
];
export const signatureOptions = {
    propertyName: 'signatureOptions', modelName: 'SignatureOptions',
    displayName: 'Signature Options', localizationId: 'DevExpress.XtraReports.UI.XRPdfSignature.SignatureOptions',
    editor: editorTemplates.getEditor('objecteditor'),
    from: (model = {}, serializer = new ModelSerializer()) => {
        const options = {
            getInfo: () => signatureOptionsInfo,
            isPropertyDisabled: function (propertyName) {
                return propertyName !== displayDocumentSignature.propertyName && !!this[displayDocumentSignature.propertyName]();
            }
        };
        serializer.deserialize(options, model);
        return options;
    },
    toJsonObject: (value, serializer, refs) => {
        return serializer.serialize(value, signatureOptionsInfo, refs);
    }
};
export const pdfSignatureInfo = [signatureOptions, commonScripts, action].concat(sizeLocation, commonControlProperties, fontGroup, navigationGroup).filter(x => x != accessibleDescription);
