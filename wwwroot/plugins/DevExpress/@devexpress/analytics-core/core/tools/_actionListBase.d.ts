﻿/**
* DevExpress Analytics (core\tools\_actionListBase.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { Observable, Computed } from 'knockout';
import { IShortcutActionList } from './_keyboardHelper';
import { IAction, IActionViewModel, IHotKey } from '../../widgets/utils';
import { BaseRenderingModel } from '../../serializer/native/models/base.model';
import { PropertyChangedEventArgs, ArrayPropertyChangedEventArgs } from '../../serializer/propertyChangedEvents';
import { IActionListBaseViewModel } from './_actionListBase.viewModel';
export declare class ActionListsBase extends BaseRenderingModel<IActionListBaseViewModel> implements IShortcutActionList {
    createViewModel(): IActionListBaseViewModel;
    constructor(enabled?: () => boolean);
    subscribeOnChanges<T extends IAction = IAction>(action: T, viewModelAction: IActionViewModel, propertyNames: Array<keyof T>): void;
    subscribe<T extends IAction = IAction>(model: T, propertyName: keyof T, callback: (newValue?: any) => void): void;
    createActionViewModel(action: IAction, index: number): IActionViewModel;
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    updateViewModel(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    mapActionToViewModels(actions: IAction[]): IActionViewModel[];
    getActions(): IAction[];
    processShortcut(e: JQueryKeyEventObject): void;
    shouldIgnoreProcessing(e: JQueryKeyEventObject): boolean;
    enabled: () => boolean;
    toolbarItems: IAction[] | Observable<IAction[]> | Computed<IAction[]>;
}
export declare class BaseAction extends BaseRenderingModel<IActionViewModel> implements IAction {
    constructor(model?: IAction);
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    createViewModel(parent?: ActionListsBase, index?: number): IActionViewModel;
    getViewModel(parent?: ActionListsBase, index?: number): IActionViewModel;
    imageClassName: string;
    imageTemplateName: string;
    disabled: boolean;
    visible: boolean;
    selected: boolean;
    text: string;
    textId: string;
    id: string;
    templateName: string;
    hasSeparator: boolean;
    contentData: any;
    hotKey: IHotKey;
    clickAction: (model: any) => void;
    displayExpr: (value: any) => string;
    isVisible(): boolean;
    isDisabled(): boolean;
}