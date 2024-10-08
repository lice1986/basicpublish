﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\watermarkIdEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { NameEditor } from './nameEditor';
export declare class WatermarkIdEditor extends NameEditor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    _filterControls(allControls: any): any;
}
