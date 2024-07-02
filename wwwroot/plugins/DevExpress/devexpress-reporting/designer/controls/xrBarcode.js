﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrBarcode.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { barCodesMap, defaultCodeSerializationInfo } from './metadata/xrBarcode';
import { BarCodeSymbology } from './properties/symbology';
import { XRControlViewModel } from './xrControl';
import { XRReportElementViewModel } from './xrReportelement';
export class XRBarCodeViewModel extends XRControlViewModel {
    constructor(model, parent, serializer) {
        super(model, parent, serializer);
        this.symbology(this.createBarcode(this.symbology() || {}, serializer));
        this.barcodeFake = {
            type: ko.pureComputed({
                read: () => {
                    return this.symbology()['name']();
                },
                write: (val) => {
                    var _a;
                    (_a = this.symbology()) === null || _a === void 0 ? void 0 : _a.dispose();
                    this.symbology(this.createBarcode({ '@Name': val }, serializer));
                }
            }),
            content: this.symbology
        };
        this._disposables.push(this.barcodeFake.type);
    }
    createBarcode(model, serializer = null) {
        const name = model['@Name'] || 'Code1';
        model['@Name'] = name;
        const barcodeInfo = barCodesMap[name] || [defaultCodeSerializationInfo];
        return new BarCodeSymbology(model, serializer, barcodeInfo, this);
    }
    dispose() {
        var _a;
        super.dispose();
        (_a = this.symbology()) === null || _a === void 0 ? void 0 : _a.dispose();
    }
}
XRBarCodeViewModel.unitProperties = [].concat(['module'], XRReportElementViewModel.unitProperties);
