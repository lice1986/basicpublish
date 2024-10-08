﻿/**
* DevExpress Analytics (core\tools\_keyboardHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { Observable, Computed } from 'knockout';
import { IAction } from '../../widgets/utils';
import { ISelectionProvider } from '../selection/_selection';
import { UndoEngine } from '../../undo-engine/undoengine';
import { Disposable } from '../../serializer/disposable';
import { IKeyboardCodesEnum } from '../../property-grid/widgets/internal/_utils';
export interface IShortcutActionList {
    processShortcut: (e: JQueryKeyEventObject) => void;
    toolbarItems: IAction[] | Observable<IAction[]> | Computed<IAction[]>;
    enabled?: () => boolean;
}
export declare class KeyboardHelperBase extends Disposable {
    private _processShortcut;
    processShortcut(e: JQueryKeyEventObject, index?: number): boolean;
    processChildrenShortcut(e: JQueryKeyEventObject, index?: number): boolean;
    shortcutMap: IKeyboardCodesEnum;
    childrenShortcutMap: IKeyboardCodesEnum;
}
export declare class KeyboardHelper extends KeyboardHelperBase {
    private _selection;
    private _undoEngine;
    constructor(selection: ISelectionProvider, undoEngine?: Observable<UndoEngine> | Computed<UndoEngine>);
    processEsc(): void;
    moveSelectedControls(leftUp: boolean, isHoriz: boolean, sign: number): void;
}
export declare class KeyDownHandlersManager {
    private _handlers;
    private _targetElement;
    private get _activeHandler();
    private _removeHandler;
    constructor(targetElement: HTMLElement | Window);
    bindHandler(handler: (e: JQueryKeyEventObject) => void, eventName?: string): () => void;
}
export declare function GetWindowKeyDownHandlersManager(): KeyDownHandlersManager;
