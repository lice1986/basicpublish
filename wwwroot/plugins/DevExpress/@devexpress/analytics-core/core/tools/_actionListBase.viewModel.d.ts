﻿/**
* DevExpress Analytics (core\tools\_actionListBase.viewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IAction, IActionViewModel } from '../../widgets/utils';
import { ActionListsBase } from './_actionListBase';
import { IViewModel } from '../../serializer/native/models/interfaces.model';
export interface IActionListBaseViewModel extends IViewModel {
    toolbarItems: IActionViewModel[];
    processShortcut: (e: JQueryKeyEventObject) => void;
}
export declare function createActionListBaseViewModel(this: ActionListsBase, base: IViewModel): IActionListBaseViewModel;
export declare function createBaseActionViewModel(this: ActionListsBase, action: IAction, index: number): IActionViewModel;
