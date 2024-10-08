﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\_multiValueEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDisplayedValue } from '@devexpress/analytics-core/analytics-utils-native';
import { Editor, IEditorViewModel } from '@devexpress/analytics-core/analytics-widgets-native';
export interface IMultiValueEditorViewModel {
    value: any[];
    onValueChanged: (e: any) => void;
    dataSource: Array<IDisplayedValue>;
    items: Array<IDisplayedValue>;
    maxDisplayedTags: number;
    placeholder: string;
    selectAllText: string;
    searchExpr: string[];
    displayExpr: string;
    valueExpr: string;
    getOptions: (options: any) => any;
    displayName: string;
    editorInputId: string;
    disabled: boolean;
    getPopupContainer: (element: Element) => Element;
    validationRules: any[];
}
export declare class MultiValueEditor extends Editor {
    private _multiValueEditorSubscriptions;
    private _createMultiValueEditorValueViewModel;
    createViewModel(): IEditorViewModel;
    dispose(): void;
}
