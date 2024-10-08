﻿/**
* DevExpress Analytics (core\_actionProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, IDisposable } from '../serializer/disposable';
import { IAction } from '../widgets/utils';
import { IActionsProvider } from './_actionsProvider.interface';
export interface IDisposableActionsProvider extends IActionsProvider, IDisposable {
}
export declare class BaseActionsProvider extends Disposable implements IDisposableActionsProvider {
    actions: IAction[];
    initActions(actions: IAction[]): void;
    getActions(context: any): IAction[];
    condition(context: any): boolean;
    setDisabled: (context: any) => void;
}
