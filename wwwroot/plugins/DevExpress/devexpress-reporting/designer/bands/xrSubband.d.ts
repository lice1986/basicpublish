﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrSubband.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, IElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ControlType } from '../controls/utils/_controlTypes';
import { BandSurface, BandViewModel } from './xrBand';
export declare class SubBandViewModel extends BandViewModel {
    constructor(band: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    isPropertyDisabled(name: string): any;
    isAllowedParent(target: IElementViewModel): boolean;
}
export declare class SubBandSurface extends BandSurface {
    getAbsolutePositionY(): number;
    getBackgroundRect(): {
        top: number;
        bottom: number;
        height: number;
    };
    protected _initMultiColumn(): void;
    get parent(): BandSurface;
    leftMarginTemplate: string;
}
