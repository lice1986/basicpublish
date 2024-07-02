﻿/**
* DevExpress Analytics (core\tools\_actionList.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IAction, IActionViewModel } from '../../widgets/utils';
import { ISurfaceContext } from '../elements/baseSurface';
import { ISelectionProvider } from '../selection/_selection';
import { UndoEngine } from '../../undo-engine/undoengine';
import { ICopyPasteStrategy } from './_copyPaste';
import { ActionListsBase } from './_actionListBase';
import { IActionListBaseViewModel } from './_actionListBase.viewModel';
export interface IActionListViewModel extends IActionListBaseViewModel {
    menuItems: IActionViewModel[];
}
export declare class ActionLists extends ActionListsBase {
    createViewModel(): IActionListViewModel;
    _registerAction(container: Array<IAction>, action: IAction): void;
    private _keyboardHelper;
    constructor(surfaceContext: ko.Observable<ISurfaceContext> | ko.Computed<ISurfaceContext>, selection: ISelectionProvider, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, customizeActions?: (actions: IAction[]) => void, enabled?: ko.Observable<boolean> | ko.Computed<boolean>, copyPasteStrategy?: ICopyPasteStrategy, zoomStep?: ko.Observable<number> | ko.Computed<number>, isLocked?: (item: any) => boolean);
    processShortcut(e: JQueryKeyEventObject): void;
    getActions(): IAction[];
    menuItems: IAction[];
}