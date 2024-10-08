﻿/**
* DevExpress Analytics (widgets\common\_codeCompletor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IItemsProvider } from '../utils';
import { IExpressionEditorFunction, IExpressionEditorFunctionItem } from '../expressioneditor/tools/_functions';
import { Disposable } from '../../serializer/disposable';
export interface ICompletionRootItem {
    name: string;
    needPrefix?: boolean;
    rootPath?: string;
}
export interface ICodeCompletorOptions {
    editor: any;
    bindingContext: any;
    fieldListProvider: IItemsProvider;
    path: ko.Observable<string> | ko.Computed<string>;
    functions?: Array<IExpressionEditorFunction> | ko.ObservableArray<IExpressionEditorFunction>;
    rootItems?: Array<ICompletionRootItem>;
    getRealExpression?: (path: string, member: string) => JQueryPromise<string>;
}
export declare class CodeCompletor extends Disposable {
    private _options;
    private _fieldListProvider;
    private _path;
    private _editor;
    private _contextPath;
    private _functions;
    private _rootItems;
    private _isInContext;
    private _getPath;
    private _previousSymbol;
    beforeInsertMatch(editor: any, token: any, parentPrefix: any): void;
    insertMatch(editor: any, parentPrefix: any, fieldName: any): void;
    generateFieldDisplayName(parentPrefix: any, displayName: any): string;
    private _convertDataMemberInfoToCompletions;
    private _combinePath;
    private _getParentPrefix;
    private _getRealPath;
    private _getFields;
    private static _cleanupFields;
    private _processFields;
    getFunctionsCompletions(): any[];
    getAggregateCompletions(): any[];
    getOperatorCompletions(prefix: any): {
        caption: string;
        snippet: string;
        meta: any;
    }[];
    private _addFunctions;
    private _addAggregates;
    private _addOperators;
    private _addParameterOperators;
    private _getOperands;
    private _getOperandsOrOperators;
    private _findStartContextTokenPosition;
    private _findOpenedStartContext;
    private _findOpenedAggregates;
    private _getContextPath;
    private _getCompletions;
    defaultProcess(getToken: () => any, text: any, completions: any): JQuery.Promise<any, any, any>;
    constructor(_options: ICodeCompletorOptions);
    identifierRegexps: RegExp[];
    getCompletions(aceEditor: any, session: any, pos: any, prefix: any, callback: any): void;
    getDocTooltip(item: any): void;
}
export declare function createFunctionCompletion(fnInfo: IExpressionEditorFunctionItem, name: string, insertValue?: string): {
    caption: string;
    snippet: string;
    meta: any;
    tooltip: any;
    score: number;
    completer: {
        insertMatch: (editor: any, data: any) => void;
    };
};
export declare function trimBrackets(value: string): string;
