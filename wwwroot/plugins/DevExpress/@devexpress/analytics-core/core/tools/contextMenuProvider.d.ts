﻿/**
* DevExpress Analytics (core\tools\contextMenuProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
import { IGroupedItem } from '../utils/_utils';
import { IAction } from '../../widgets/utils';
declare type Options = {
    actions?: ko.Observable<(IAction | IGroupedItem<IAction>)[]>;
    target?: string;
    getClickActionParams?: () => any;
    contextMenusEnabled: ko.Observable<boolean>;
};
export declare class ContextMenuProvider extends Disposable {
    constructor({ actions, target, getClickActionParams, contextMenusEnabled }: Options);
    hide(): void;
    dataSource: ko.Observable<(IAction | IGroupedItem<IAction>)[]>;
    target: string;
    actions: ko.Observable<(IAction | IGroupedItem<IAction>)[]>;
    itemTemplate: (itemData: any, index: any, element: any) => void | string;
    onItemClick: (e: any, data: any) => void;
    cssClass: string;
    hideOnOutsideClick: boolean;
    disabled: ko.Observable;
    component: any;
    onInitialized: (e: any) => void;
    onOptionChanged: (e: any) => void;
}
export {};
