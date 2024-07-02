﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrBarcode.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { BarCodeSymbology } from './properties/symbology';
import { ControlType } from './utils/_controlTypes';
import { XRControlViewModel } from './xrControl';
export declare class XRBarCodeViewModel extends XRControlViewModel {
    static unitProperties: any[];
    createBarcode(model: any, serializer?: any): BarCodeSymbology;
    constructor(model: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    dispose(): void;
    symbology: ko.Observable<BarCodeSymbology>;
    barcodeFake: any;
}