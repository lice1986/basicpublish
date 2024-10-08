﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_pageSetupUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { pixelToUnits, unitsToPixel } from '@devexpress/analytics-core/analytics-internal';
import { GraphicsUnit } from '../reportWizardState';
import { CONVERSION_COEEFICIENT } from './_labelWizardUtils';
export class PageSetupHelper {
    static mm2px(val) { return unitsToPixel(10 * val, 'TenthsOfAMillimeter'); }
    static in2px(val) { return unitsToPixel(100 * val, 'HundredthsOfAnInch'); }
    static px2mm(val) { return pixelToUnits(val, 'TenthsOfAMillimeter', 1) / 10; }
    static px2in(val) { return pixelToUnits(val, 'HundredthsOfAnInch', 1) / 100; }
    static mm2in(val) { return val * CONVERSION_COEEFICIENT; }
    static in2mm(val) { return val / CONVERSION_COEEFICIENT; }
    static getConverter(from, to) {
        if (from === to)
            return x => x;
        const unitCode = (unit) => {
            switch (unit) {
                case GraphicsUnit.Inch:
                    return 'in';
                case GraphicsUnit.Millimeter:
                    return 'mm';
                case GraphicsUnit.Pixel:
                    return 'px';
            }
        };
        const fnName = unitCode(from) + '2' + unitCode(to);
        return PageSetupHelper[fnName];
    }
}
