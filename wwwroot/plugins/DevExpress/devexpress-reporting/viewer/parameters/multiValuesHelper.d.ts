﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\multiValuesHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ArrayPropertyChangedEventArgs, BaseModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { IDisplayedValue } from '@devexpress/analytics-core/analytics-utils-native';
import { PreviewParameter } from './previewParameter';
export declare class MultiValuesHelper extends BaseModel {
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    static maxDisplayedTags: number;
    constructor(parameter: PreviewParameter);
    selectedItems: any[];
    items: Array<IDisplayedValue>;
    isSelectedAll: boolean;
    maxDisplayedTags: number;
    dataSource: any;
    value: any[];
}