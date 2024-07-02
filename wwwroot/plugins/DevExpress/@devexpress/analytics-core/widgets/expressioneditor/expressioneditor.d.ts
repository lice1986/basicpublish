﻿/**
* DevExpress Analytics (widgets\expressioneditor\expressioneditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Editor } from '../../property-grid/widgets/editor';
import { Disposable } from '../../serializer/disposable';
import { IDisplayNameProvider } from '../common/displayNameProvider';
import { CodeCompletor, ICompletionRootItem } from '../common/_codeCompletor';
import { DisplayExpressionConverter } from '../common/_displayNameProvider';
import { CriteriaOperator } from '../criteria/operators/criteriaOperator';
import { ResizeHelper } from '../internal/_resizeHelper';
import { IItemsProvider } from '../utils';
import { getParentContainer } from '../_utils';
import { IExpressionEditorFunction } from './tools/_functions';
import { Tools } from './tools/_tools';
import { ExpressionEditorParametersTreeListController } from './tools/_treeListControllers';
export interface IExpressionOptions {
    value: ko.Observable<string> | ko.Computed<string>;
    path?: ko.Observable<string> | ko.Computed<string>;
    fieldName?: ko.Observable<string> | ko.Computed<string>;
    theme?: string;
    patchFieldName?: (fieldName: string) => string;
    functions?: Array<IExpressionEditorFunction>;
    rootItems?: Array<ICompletionRootItem>;
    customizeCategories?: (sender: any, categories: any, dblclick?: any) => void;
    validate?: (criteria: CriteriaOperator) => boolean;
    isValid?: ko.Observable<boolean> | ko.Computed<boolean>;
    warningMessage?: ko.Observable<string> | ko.Computed<string>;
    onHiding?: (e: any) => void;
    onShowing?: (e: any) => void;
    onContentReady?: (e: any) => void;
}
export declare function getNotValidRange(value: string, errorMessage: string): {
    start: number;
    end: number;
};
export declare class ExpressionEditor extends Disposable {
    private options;
    private _displayNameProvider?;
    popupVisible: ko.Observable<boolean>;
    dispose(): void;
    private _createMainPopupButtons;
    private _getTextArea;
    private _updateTextAreaValue;
    private _updateAceValue;
    private _updateValue;
    private patchFieldName;
    private _parametersPutSelectionHandler;
    private _fieldsPutSelectionHandler;
    private _createToolsOptions;
    private _parametersCustomFilter;
    constructor(options: IExpressionOptions, fieldListProvider: ko.Observable<IItemsProvider> | ko.Computed<IItemsProvider>, disabled?: ko.Observable<boolean> | ko.Computed<boolean>, rtl?: boolean, _displayNameProvider?: IDisplayNameProvider, popupVisible?: ko.Observable<boolean>, editorInputId?: string);
    displayExpressionConverter: DisplayExpressionConverter;
    aceAvailable: any;
    tools: Tools;
    displayValue: ko.Observable<string> | ko.Computed<string>;
    title: () => string;
    value: ko.Observable<string> | ko.Computed<string>;
    textAreaValue: ko.Observable<string>;
    theme: string;
    languageHelper: {
        getLanguageMode: () => string;
        createCompleters: (editor: Editor, bindingContext: ko.BindingContext, viewModel: ExpressionEditor) => CodeCompletor[];
    };
    aceOptions: {
        showLineNumbers: boolean;
        showPrintMargin: boolean;
        enableBasicAutocompletion: boolean;
        enableLiveAutocompletion: boolean;
        showFoldWidgets: boolean;
        highlightActiveLine: boolean;
    };
    additionalOptions: {
        onChange: (session: {
            clearAnnotations: () => void;
            getValue: () => string;
            setAnnotations: (any: any) => void;
        }) => void;
    };
    callbacks: {
        focus: () => undefined;
    };
    resizeHelper: ResizeHelper;
    koOptions: ko.Observable<IExpressionOptions> | ko.Computed<IExpressionOptions>;
    editorContainer: ko.Observable<any> | ko.Computed<any>;
    editorInputId: string;
    fieldListProvider: ko.Observable<IItemsProvider> | ko.Computed<IItemsProvider>;
    parametersTreeListController: ExpressionEditorParametersTreeListController;
    save: (sender: any) => void;
    isValid: ko.Observable<boolean> | ko.Computed<boolean>;
    buttonItems: any[];
    rtl: boolean;
    modelValueValid: ko.Computed<boolean>;
    modelValueWarning: ko.Computed<string>;
    disabled: ko.Observable<boolean> | ko.Computed<boolean>;
    onShown(): void;
    onHiding(e: {
        component: any;
        element: HTMLElement;
    }): void;
    onShowing(e: {
        component: any;
        element: HTMLElement;
    }): void;
    onContentReady(e: {
        component: any;
        element: HTMLElement;
    }): void;
    resizeAceEditor(): void;
    initDisplayValue(): void;
    getValue(): string;
    validate: (value: any, sender?: any) => boolean;
    getPopupContainer: typeof getParentContainer;
}