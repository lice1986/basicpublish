﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\dateRange\dateRangeEditor.ranges.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ArrayPropertyChangedEventArgs, BaseModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
export interface IDateRangeEditorItem {
    displayName: string;
    range: () => Date[];
}
declare class PredefinedDateRangeModel extends BaseModel {
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    ranges: IDateRangeEditorItem[];
}
export declare const predefinedDateRangesModel: PredefinedDateRangeModel;
export declare const predefinedDateRanges: IDateRangeEditorItem[];
export {};
