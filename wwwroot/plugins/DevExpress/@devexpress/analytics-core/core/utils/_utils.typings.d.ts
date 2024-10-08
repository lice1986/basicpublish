﻿/**
* DevExpress Analytics (core\utils\_utils.typings.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as localization from 'devextreme/localization';
import { IAction } from '../../widgets/utils';
export interface _ICommonCallbacksHandler {
    customizeActions?: (actions: IAction[]) => void;
    customizeLocalization?: (callbacks?: JQueryPromise<any>[]) => void;
    onServerError?: (e: any) => void;
    onInitializing?: () => void;
    beforeRender?: (designerModel: any) => void;
}
export interface CustomizeMenuActionsCallbacksHandler<TSender> {
    CustomizeMenuActions?: (sender: TSender, args: {
        Actions: IAction[];
    }) => void;
}
export interface ICommonCallbacksHandler<TSender, TBeforeRenderSender> extends CustomizeMenuActionsCallbacksHandler<TSender>, _ICommonCallbacksHandler {
    OnInitializing?: (sender: TSender) => void;
    BeforeRender?: (sender: TSender, args: TBeforeRenderSender) => void;
    CustomizeLocalization?: (sender: TSender, args: ICustomizeLocalizationEventArgs) => void;
    OnServerError?: (sender: TSender, args: {
        Error: any;
    }) => void;
}
export interface ICustomizeLocalizationEventArgs {
    LoadMessages: (messages: JQueryPromise<any> | any | null) => void;
    SetAvailableCultures: (customCultures: any) => void;
    WidgetLocalization: typeof localization;
}
export interface ICommonBindingCustomizationHandler<T> {
    _eventSenderCreated?: (sender: T) => void;
}
