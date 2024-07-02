﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\nameEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDisplayedObject } from '@devexpress/analytics-core/analytics-internal';
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { Editor, IEditorViewModel } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export interface INameEditorViewModel extends IEditorViewModel {
    generateRules: (rules: any) => any;
}
export declare class NameEditor extends Editor {
    createViewModel(): IEditorViewModel;
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    _getEditorValidationRules(): any[];
    _filterControls(controls: IDisplayedObject[]): IDisplayedObject[];
    generateRules(allControls: ko.ObservableArray<IDisplayedObject>): any[];
    currentValidationRules: ko.Observable<any[]>;
}
