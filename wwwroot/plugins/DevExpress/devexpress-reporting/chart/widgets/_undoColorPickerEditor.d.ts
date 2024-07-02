﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_undoColorPickerEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { ColorPickerEditor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export declare class UndoColorPickerEditor extends ColorPickerEditor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>);
    generateValue(undoEngine: ko.Observable<UndoEngine>): ko.Computed<any>;
    generatedValue: ko.Computed<any>;
}