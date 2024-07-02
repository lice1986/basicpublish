﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPdfSignature.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { XRControlSurface, XRControlViewModel } from './xrControl';
export interface ISignatureOptions {
    displayDocumentSignature: ko.Observable<boolean>;
    imageDisplayMode: ko.Observable<string>;
    showSignatureDate: ko.Observable<boolean>;
    showCertificateName: ko.Observable<boolean>;
    showLocation: ko.Observable<boolean>;
    showSignatureReason: ko.Observable<boolean>;
    showDistinguishedName: ko.Observable<boolean>;
    showCaptions: ko.Observable<boolean>;
    isPropertyDisabled: (propertyName: string) => boolean;
    getInfo: () => ISerializationInfoArray;
}
export declare class XRPdfSignatureModel extends XRControlViewModel {
    private _displayDocumentSignatureSubscribed;
    signatureOptions: ISignatureOptions;
    subscribeSignature(allControls: () => XRPdfSignatureModel[]): void;
}
export declare class XRPdfSignatureSurface extends XRControlSurface {
    getSignatureInformationString(control: XRPdfSignatureModel): string;
    constructor(control: XRPdfSignatureModel, context: ISurfaceContext);
    get certificateName(): any;
    showSkeleton: ko.Computed<boolean>;
    visibleText: ko.Computed<boolean>;
    visibleImage: ko.Computed<boolean>;
    hideImage: ko.Computed<boolean>;
}