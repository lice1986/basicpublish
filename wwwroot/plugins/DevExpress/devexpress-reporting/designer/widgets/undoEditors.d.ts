﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\undoEditors.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export declare class ComboboxUndoEditor extends Editor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    generateValue(undoEngine: ko.Observable<UndoEngine>): ko.Observable<any> | ko.Computed<any>;
    undoValue: ko.Observable | ko.Computed;
}
