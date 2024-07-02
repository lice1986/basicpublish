﻿/**
* DevExpress HTML/JS Reporting (viewer\documentMap\_documentMapModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityKeyboardHelperBase } from '@devexpress/analytics-core/analytics-internal-native';
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, IViewModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { IDataMemberInfo, TabInfo } from '@devexpress/analytics-core/analytics-utils-native';
import { ITreeListOptions } from '@devexpress/analytics-core/analytics-widgets-internal-native';
import { InitializedEvent } from 'devextreme/ui/scroll_view';
import { ReportPreview } from '../reportPreview';
import { DocumentMapTreeListController } from './_documentMapTreeListController';
export interface IBookmarkNode {
    text: string;
    pageIndex: number;
    indexes: string;
    nodes?: Array<IBookmarkNode>;
}
export interface IBookmarkDataMemberInfo extends IDataMemberInfo {
    bookmark: IBookmarkNode;
}
export interface IDocumentMapViewModel extends IViewModel {
    treeListOptions: ITreeListOptions;
    onInitialized: (event: InitializedEvent) => void;
    keyboardHelper: AccessibilityKeyboardHelperBase;
}
export declare class DocumentMapModel extends BaseRenderingModel<IDocumentMapViewModel> {
    private _selectedPathChangedEvent;
    private _treeListChangedEvent;
    private _setSelectedPathByNavigationNode;
    onPropertyChanged(args: PropertyChangedEventArgs | ArrayPropertyChangedEventArgs): void;
    getTreeListModel(documentMap: IBookmarkNode): ITreeListOptions;
    updateViewModel(args: PropertyChangedEventArgs | ArrayPropertyChangedEventArgs): void;
    createViewModel(): IDocumentMapViewModel;
    constructor(reportPreview: ReportPreview);
    dispose(): void;
    treeListController: DocumentMapTreeListController;
    tabInfo: TabInfo;
    selectedPath: string;
    treeListOptions: ITreeListOptions;
    isEmpty: boolean;
}