﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_scriptsEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ActionListsBase } from '@devexpress/analytics-core/analytics-internal';
import { IActionViewModel } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportViewModel } from '../../controls/xrReport';
import { XRReportElementViewModel } from '../../controls/xrReportelement';
import { LanguageHelper } from './_languageHelper';
export interface ICursorPosition {
    row: number;
    column: number;
}
export interface IScriptingControl {
    scripts: any;
    lockedInUserDesigner: () => boolean;
}
export interface IAceEditor {
    setValue: (text: string) => void;
    getValue: () => string;
    getSession: () => any;
    getSelection: () => any;
    getCopyText: () => string;
    getCursorPosition: () => ICursorPosition;
    onPaste: (text: string) => void;
    execCommand: (cmd: string) => void;
    undo: (select: boolean) => void;
    redo: (select: boolean) => void;
    on: (event: string, handler: any) => void;
    resize: () => void;
    find: (needle: string, options: any, animate: boolean) => void;
    findNext: () => void;
    findPrevious: () => void;
    focus: () => any;
    guid: string;
}
export declare class ScriptsEditor extends ActionListsBase {
    private _selectionNotEmpty;
    private _canUndo;
    private _canRedo;
    private _cursorPosition;
    private _changeSelection;
    private _updateEditorState;
    createActionViewModel(action: any, index: number): IActionViewModel;
    private _initializeToolbar;
    private _getValidIndex;
    private _setScriptsText;
    private _getFunctionName;
    private _getEventByFunction;
    static generateFunctionName(control: XRReportElementViewModel, eventName: string, functionName?: string, allFunctionNames?: any[]): string;
    static getEventArgsType(eventName: string): string;
    initialize(): void;
    constructor(report: ko.Observable<ReportViewModel>, allControls: ko.ObservableArray<XRReportElementViewModel>);
    get allFunctionNames(): any[];
    guid: ko.Observable<any>;
    ensureEvent: (eventName: string, functionName?: string, model?: any) => void;
    private _ensureFunction;
    selectionChanged: (editor: IAceEditor) => void;
    report: ko.Observable<ReportViewModel>;
    scriptsText: ko.Observable<string> | ko.Computed<string>;
    editorContainer: ko.Observable<IAceEditor>;
    editorVisible: ko.Observable<boolean>;
    toolbarItems: any[];
    controls: ko.ObservableArray<XRReportElementViewModel>;
    selectedControl: ko.Observable<XRReportElementViewModel>;
    eventsCollection: ko.Observable<string[]>;
    selectedEvent: ko.Observable<string>;
    languageHelper: LanguageHelper;
    validateDisabled: ko.Observable<boolean>;
    aceOptions: {
        enableBasicAutocompletion: boolean;
        enableSnippets: boolean;
        enableLiveAutocompletion: boolean;
        showPrintMargin: boolean;
    };
}