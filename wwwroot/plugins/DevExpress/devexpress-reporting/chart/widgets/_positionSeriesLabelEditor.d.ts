﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_positionSeriesLabelEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export declare class PositionSeriesLabelEditor extends Editor {
    private _positionChooser;
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    values: ko.Computed<{
        displayValue: string;
        value: string;
    }[]>;
}
