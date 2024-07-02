﻿/**
* DevExpress Analytics (widgets\treelist\_treeListSearchViewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { TreeListRootItemViewModel } from './_treelistItem';
import { Disposable } from '../../serializer/disposable';
import { ITreeListController } from './_treelistController';
export declare class TreeListSearchViewModel extends Disposable {
    static createController(element: Element, controllers: ITreeListController[], modelType?: typeof TreeListSearchViewModel, templateName?: string): void;
    private _processedNodes;
    private _currentProcess;
    dispose(): void;
    clearProcess(): void;
    valueChanged(newValue: string): void;
    private _collapseTreeBranch;
    addController(root: TreeListRootItemViewModel): void;
    constructor();
    searchTimeout: number;
    value: ko.Computed;
    _roots: TreeListRootItemViewModel[];
    searchPlaceholder: () => string;
}