﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_model.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { FontModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { CommandId, Interval, RichEdit } from 'devexpress-richedit';
import * as ko from 'knockout';
import { XRRichController } from './_controller';
import { InlineRichEditControl } from './_inlineControl';
import { RichEditLoadDispatcher } from './_loaddispatcher';
import { ToolbarSurface } from './_toolbar';
import { INativeRich, IRichLoadData } from './_utils';
export declare class XRRichEditControlModel extends Disposable {
    protected _richEdit: RichEdit;
    private disableCommands;
    _dispatcher: RichEditLoadDispatcher;
    _element: HTMLElement;
    _toolbar: ToolbarSurface;
    _verticalScrollOffset: number;
    _richHeight: number;
    setRichHeight(value: any): void;
    _elementExists(): boolean;
    className: ko.Computed;
    visible: ko.Subscribable<boolean>;
    getToolbar(): ToolbarSurface;
    getRealControl(): RichEdit;
    protected getRealControlNative(): INativeRich;
    updateCanvasScroll(): void;
    dispose(): void;
    constructor(element: HTMLElement, inlineControl: InlineRichEditControl, selected: ko.Subscribable<boolean>);
    executeCommand(commandId: CommandId, parameter?: any, setFocus?: boolean): void;
    insertHtml(html: any): void;
    createOptions(): any;
    private getFonts;
    private getRichEditFonts;
    protected createToolbar(): void;
    saveDocumentNative(documentFormat: number, onResultReady?: (result: any) => void): void;
    newDocumentNative(onResultReady?: () => void): void;
    openDocumentNative(base64: string, documentFormat: number, onResultReady?: () => void, onError?: () => void): void;
    saveDocument(documentFormat: number, onResultReady?: (result: any) => void): void;
    newDocument(onResultReady?: () => void): void;
    openDocument(base64: string, documentFormat: number, onResultReady?: () => void, onError?: () => void): void;
    changeSize(): void;
    focusChanged(inFocus: boolean): void;
    getText(interval?: Interval): string;
    documentIsEmpty(): boolean;
}
export declare class RichLoader extends Disposable {
    protected richEdit: XRRichEditControlModel;
    protected loadData: IRichLoadData;
    _textConverted: (text: string) => void;
    set textConverted(textConverted: (text: string) => void);
    constructor(richEdit: XRRichEditControlModel);
    load(loadData: IRichLoadData): void;
}
export declare class RichEditPaddingModelWrapper extends Disposable {
    private _richEdit;
    private _paddingModel;
    private _setPaddings;
    constructor(padding: ko.Subscribable<string>, _richEdit: XRRichEditControlModel);
}
export declare class RichEditFontModel extends FontModel {
    richEdit: XRRichEditControlModel;
    controller: XRRichController;
    constructor(value: ko.Observable<string> | ko.Computed<string>, richEdit: XRRichEditControlModel, foreColor: ko.Observable<string> | ko.Computed<string>, controller: XRRichController);
    protected applyCommand(commandId: CommandId, parameter?: any): void;
}
