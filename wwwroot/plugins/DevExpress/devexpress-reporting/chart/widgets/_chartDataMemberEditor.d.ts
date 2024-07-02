﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_chartDataMemberEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { FieldListEditor } from '@devexpress/analytics-core/analytics-widgets';
export declare class ChartDataMemberEditor extends FieldListEditor {
    private _isNumber;
    private _isDate;
    private _getArgumentDataMemberFilter;
    private _getValueDataMemberFilter;
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>);
}
