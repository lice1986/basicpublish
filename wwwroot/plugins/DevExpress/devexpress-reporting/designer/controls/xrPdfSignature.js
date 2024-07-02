﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPdfSignature.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { findFirstItemMatchesCondition } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { XRControlSurface, XRControlViewModel } from './xrControl';
export class XRPdfSignatureModel extends XRControlViewModel {
    constructor() {
        super(...arguments);
        this._displayDocumentSignatureSubscribed = false;
    }
    subscribeSignature(allControls) {
        if (!this._displayDocumentSignatureSubscribed) {
            this._displayDocumentSignatureSubscribed = true;
            this._disposables.push(this.signatureOptions.displayDocumentSignature.subscribe(newVal => {
                if (newVal) {
                    const control = findFirstItemMatchesCondition(allControls(), (item) => this !== item && item.signatureOptions.displayDocumentSignature());
                    control && control.signatureOptions.displayDocumentSignature(false);
                }
            }));
        }
    }
}
export class XRPdfSignatureSurface extends XRControlSurface {
    constructor(control, context) {
        super(control, context);
        this.contenttemplate = 'dxrd-pdfsignature-content';
        this['multiline'] = true;
        this.displayText = () => {
            if (control.signatureOptions.displayDocumentSignature())
                return this.getSignatureInformationString(control);
            else
                return getLocalization('Digital Signature', 'PreviewStringId.SignatureUnsignedCaption');
        };
        this._disposables.push(this.showSkeleton = ko.computed(() => {
            return !control.signatureOptions.displayDocumentSignature();
        }), this.visibleImage = ko.computed(() => {
            return control.signatureOptions.imageDisplayMode() == 'Show';
        }), this.hideImage = ko.computed(() => {
            return control.signatureOptions.imageDisplayMode() == 'Hide';
        }), this.visibleText = ko.computed(() => {
            return control.signatureOptions.showCertificateName() ||
                control.signatureOptions.showDistinguishedName() ||
                control.signatureOptions.showLocation() ||
                control.signatureOptions.showSignatureDate() ||
                control.signatureOptions.showSignatureReason();
        }));
    }
    getSignatureInformationString(control) {
        const viewInfo = {
            certificateName: this.certificateName,
            distinguishedName: getLocalization('your distinguished name here', 'PreviewStringId.SignatureFillerText_DistinguishedName'),
            reason: getLocalization('your signing reason here', 'PreviewStringId.SignatureFillerText_Reason'),
            location: getLocalization('your signing location here', 'PreviewStringId.SignatureFillerText_Location'),
            dateString: new Date(new Date().setHours(0, 0, 0, 0)).toLocaleString()
        };
        const parts = [];
        const showCaptions = control.signatureOptions.showCaptions();
        if (control.signatureOptions.showCertificateName())
            parts.push((showCaptions ? getLocalization('Digitally signed by', 'PreviewStringId.SignatureCaptions_CertificateName') + ' ' : '') + viewInfo.certificateName);
        if (control.signatureOptions.showDistinguishedName())
            parts.push((showCaptions ? getLocalization('DN:', 'PreviewStringId.SignatureCaptions_DistinguishedName') + ' ' : '') + viewInfo.distinguishedName);
        if (control.signatureOptions.showSignatureReason())
            parts.push((showCaptions ? getLocalization('Reason:', 'PreviewStringId.SignatureCaptions_Reason') + ' ' : '') + viewInfo.reason);
        if (control.signatureOptions.showLocation())
            parts.push((showCaptions ? getLocalization('Location:', 'PreviewStringId.SignatureCaptions_Location') + ' ' : '') + viewInfo.location);
        if (control.signatureOptions.showSignatureDate())
            parts.push((showCaptions ? getLocalization('Date:', 'PreviewStringId.SignatureCaptions_Date') + ' ' : '') + viewInfo.dateString);
        return parts.join('\r\n');
    }
    get certificateName() {
        return getLocalization('your common name here', 'PreviewStringId.SignatureFillerText_CertificateName');
    }
}
