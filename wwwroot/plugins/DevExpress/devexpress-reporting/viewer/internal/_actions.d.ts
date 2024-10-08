﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_actions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { ReportPreview } from '../reportPreview';
import { ExportOptionsEventHandlers } from '../exportOptions/exportOptionsModel';
import { Disposable, IAction } from '@devexpress/analytics-core/analytics-utils-native';
import { IActionsProvider, IGlobalSubscribableValue, ActionListsBase, BaseAction } from '@devexpress/analytics-core/analytics-internal-native';
import { ArrayPropertyChangedEventArgs, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { SimplifiedSearchMode } from 'devextreme/common';
interface IPageItem {
    index: number;
    text: number;
}
interface IPageItemsStore {
    store: Array<IPageItem>;
    paginate: boolean;
    pageSize: number;
}
export interface IPaginationAction extends IAction {
    selectedItem: IPageItem;
    selectItem: (item: IPageItem) => void;
    setSelectedItemChangedEvent: (callback: (selectedItem: IPageItem) => void) => () => void;
    pageItems: IPageItemsStore;
    setPageItemsChangedEvent: (callback: (pageItems: IPageItemsStore) => void) => () => void;
    _isPageChanged: (page: string) => boolean;
    itemTemplate: (value: any) => any;
    searchMode: SimplifiedSearchMode;
    searchTimeout: number;
}
export interface IExportActionItem {
    text: string;
    textId?: string;
    imageClassName?: string;
    items?: IExportActionItem[];
    imageTemplateName?: string;
    format?: string;
}
export interface IExportAction extends IAction {
    eventHandlers: ExportOptionsEventHandlers;
    items: IExportActionItem[];
    setItemsChangedEvent: (callback: (newItems: IExportActionItem[]) => void) => () => void;
}
export declare class PreviewDesignerActions extends Disposable implements IActionsProvider {
    actions: IAction[];
    dispose(): void;
    constructor(reportPreview: ReportPreview, fullscreen: IGlobalSubscribableValue<boolean>);
    getActions(context: ReportPreview): IAction[];
}
export declare class ActionLists extends ActionListsBase {
    updateToolbarItems: () => void;
    constructor(reportPreview: ReportPreview, globalActionProviders: Array<IActionsProvider>, customizeActions?: (actions: IAction[]) => void, enabled?: () => boolean);
    onPropertyChanged(args: PropertyChangedEventArgs<ActionLists> | ArrayPropertyChangedEventArgs<ActionLists>): void;
    processShortcut(e: JQueryKeyEventObject): void;
    dispose(): void;
    globalActionProviders: Array<IActionsProvider>;
}
export declare class PreviewActions extends Disposable implements IActionsProvider {
    actions: IAction[];
    wrapDisposable<T>(object: T): T;
    constructor(reportPreview: ReportPreview);
    dispose(): void;
    getActions(context: ReportPreview): IAction[];
}
export declare class ViewerAction extends BaseAction {
    reportPreview: ReportPreview;
    constructor(reportPreview: ReportPreview, visibilityDependencies?: Array<keyof ReportPreview>, disabilityDependencies?: Array<keyof ReportPreview>, model?: IAction);
}
export declare class FullScreenActionBase extends BaseAction {
    fullscreen: IGlobalSubscribableValue<boolean>;
    constructor(fullscreen: IGlobalSubscribableValue<boolean>, model?: IAction);
    getFullScreenImageTemplateName(): "dxrd-svg-toolbar-fullscreen-exit" | "dxrd-svg-toolbar-fullscreen";
}
export declare class ExportActionBase extends ViewerAction {
    constructor(reportPreview: ReportPreview);
    isDisabled(): boolean;
}
export {};
