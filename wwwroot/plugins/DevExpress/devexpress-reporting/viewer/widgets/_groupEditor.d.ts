﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\_groupEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IPropertyGridEditorViewModel, PropertyGridEditor } from '@devexpress/analytics-core/analytics-widgets-native';
export interface IParameterGroupEditorViewModel extends IPropertyGridEditorViewModel {
    isGroupLabel: boolean;
    hideEditorHeader: boolean;
    hideBorder: boolean;
    showHorizontally: boolean;
}
export declare class ParametersGroupEditor extends PropertyGridEditor {
    createViewModel(): IParameterGroupEditorViewModel;
    _setPadding(position: string, value: any): {};
    createObjectProperties(): import("@devexpress/analytics-core/analytics-widgets-native").ObjectProperties;
    hideEditorHeader: boolean;
    hideBorder: boolean;
    showHorizontally: boolean;
    isGroupLabel: boolean;
}
