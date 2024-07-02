﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\editOptionsEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IItemsProvider, ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export declare class EditOptionsEditorNameEditorModel extends Editor {
    constructor(modelPropertyInfo: ISerializationInfo, level: any, parentDisabled?: ko.Observable<boolean>, textToSearch?: any);
    itemsProvider: IItemsProvider;
    displayValue: ko.Observable<string>;
}
