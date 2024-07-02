﻿/**
* DevExpress Analytics (core\internal\_cssCalculator.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { PaddingModel } from '../elements/paddingModel';
export interface IStyleContainer {
    rtl: () => boolean | undefined;
}
export declare function patchPositionByRTL(position: string, rtl: boolean): string;
export declare class CssCalculator {
    private _rtlLayout;
    static DEFAULT_BORDER: string;
    private _control;
    private _getPixelValueFromUnit;
    private _patchPosition;
    private _getBorderWidth;
    createBorder(dashStyle: any, width: any, color: any, positions: any, position: any): {};
    createControlBorder(borderStyle: any, width: any, color: any, positions: any, position: any, defaultColor?: string): {};
    createBorders(borderStyle: any, width: any, color: any, positions: any, defaultColor?: string): any;
    createZipCodeFont(height: any): {};
    createFont(fontString: any): {};
    createVerticalAlignment(alignment: string): {};
    createHorizontalAlignment(alignment: string): {};
    createStrokeDashArray(style: any, width: any): string;
    createWordWrap(wordwrap: boolean, multiline: boolean): {};
    createAngle(angle: any): {
        '-webkit-transform': string;
        '-moz-transform': string;
        '-o-transform': string;
        '-ms-transform': string;
        transform: string;
    };
    constructor(control: IStyleContainer, _rtlLayout: ko.Observable<boolean> | ko.Computed<boolean> | boolean);
    borderCss: any;
    fontCss: any;
    zipCodeFontCss: any;
    textAlignmentCss: any;
    foreColorCss: any;
    paddingsCss: any;
    backGroundCss: any;
    stroke: any;
    strokeWidth: any;
    strokeWidthWithWidth: any;
    strokeDashArray: any;
    strokeDashArrayWithWidth: any;
    crossBandBorder: any;
    angle: any;
    wordWrapCss: any;
    cellBorder: any;
    zipCodeAlignment: any;
    contentSizeCss(controlSurfaceWidth: number, controlSurfaceHeight: number, zoom?: number, borders?: string, paddings?: PaddingModel): {
        top: number;
        left: number;
        right: number;
        bottom: number;
        width: number;
        height: number;
    };
}