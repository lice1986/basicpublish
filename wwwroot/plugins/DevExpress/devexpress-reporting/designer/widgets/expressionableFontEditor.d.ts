﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressionableFontEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { FontEditor, ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export declare class ExpressionableFontEditor extends FontEditor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    createObjectProperties(): ObjectProperties;
}
