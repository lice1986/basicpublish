﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_pageSetupUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { GraphicsUnit } from '../reportWizardState';
export declare class PageSetupHelper {
    static mm2px(val: number): number;
    static in2px(val: number): number;
    static px2mm(val: number): number;
    static px2in(val: number): number;
    static mm2in(val: number): number;
    static in2mm(val: number): number;
    static getConverter(from: GraphicsUnit, to: GraphicsUnit): (val: number) => number;
}
