﻿/**
* DevExpress Analytics (widgets\expressioneditor\tools\_tools.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable, IDisposable } from '../../../serializer/disposable';
import { ITreeListOptions } from '../../treelist/_treelistItem';
import { IExpressionOptions } from '../expressioneditor';
export interface IExpressionEditorContent {
    data: {
        fields?: any;
        parameters?: any;
        availableItems?: ko.Observable<any> | ko.Computed<any>;
        textToSearch?: ko.Observable<string> | ko.Computed<string>;
        selectedItem?: ko.Observable<any>;
        items?: any;
    };
    name: string;
    isSelected: ko.Observable<boolean> | ko.Computed<boolean>;
    showDescription: boolean;
}
export interface IExpressionEditorCategory extends IDisposable {
    displayName: string;
    collapsed?: ko.Observable<boolean> | ko.Computed<boolean>;
    content?: IExpressionEditorContent;
    items?: ko.Observable<IExpressionEditorContent[]> | ko.Computed<IExpressionEditorContent[]>;
    templateName?: string;
}
export declare class Tools extends Disposable {
    private _defaultClick;
    searchPlaceholder: () => string;
    private _generateTab;
    private _localizedExpressionEditorItem;
    private _initDescription;
    private _createFieldsCategory;
    private _createConstantCategory;
    private _createOperatorsCategory;
    private _createFunctionsCategoryContent;
    private _createFunctionsCategoryItem;
    private _createFunctionsCategory;
    private _disposeCategories;
    constructor(onClick: (item: any, element: any) => void, parametersOptions: ko.PureComputed<ITreeListOptions>, options: ko.Observable<IExpressionOptions> | ko.Computed<IExpressionOptions>, fieldListOptions?: ko.Computed<ITreeListOptions>);
    dispose(): void;
    resetCategoriesSelection: () => void;
    private _categories;
    showDescription: ko.Observable<boolean> | ko.Computed<boolean>;
    toolBox: any[];
    description: ko.Observable<string> | ko.Computed<string>;
}
