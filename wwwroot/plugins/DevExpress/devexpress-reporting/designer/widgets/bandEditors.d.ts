﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\bandEditors.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { BandViewModel } from '../bands/xrBand';
export declare class BandEditorBase extends Editor {
    generateValue: (bands: (filter?: any, noneNeaded?: any) => ko.Computed<any>) => any;
    bands: any;
    filter: (item: BandViewModel) => boolean;
    noneNeaded: boolean;
}
export declare class RunningBandEditor extends BandEditorBase {
    filter: (item: BandViewModel) => boolean;
    noneNeaded: boolean;
}
export declare class BandsEditor extends BandEditorBase {
    filter: (item: BandViewModel) => boolean;
    noneNeaded: boolean;
}
export declare class SortingBandEditor extends BandEditorBase {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    filter: (item: BandViewModel) => boolean;
    noneNeaded: boolean;
}
export declare class PageBreakBandEditor extends Editor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    values: ko.Computed<{
        displayValue: string;
        value: string;
    }[]>;
}
