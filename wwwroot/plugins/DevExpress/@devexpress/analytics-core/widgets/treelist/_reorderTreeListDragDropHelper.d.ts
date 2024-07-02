﻿/**
* DevExpress Analytics (widgets\treelist\_reorderTreeListDragDropHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragHelperContent } from '../../core/dragDrop/_dragHelperContent';
import { Disposable } from '../../serializer/disposable';
import { TreeListItemViewModel } from './_treelistItem';
import { ITreeListItemViewModel } from './_treelistItem.viewModel';
export declare abstract class ReorderTreeListDragDropHelper extends Disposable {
    private dragHelperContent;
    protected _target: TreeListItemViewModel;
    protected _targetElement: HTMLElement;
    protected _draggable: TreeListItemViewModel;
    protected _draggableModel: any;
    protected _draggableParent: any;
    protected _targetModel: any;
    protected _getElementViewModel(item: TreeListItemViewModel): any;
    protected droppableClassName: string;
    protected approveClassName: string;
    protected classDropBefore: string;
    protected classDropAfter: string;
    started: boolean;
    dispose(): void;
    constructor(dragHelperContent: DragHelperContent);
    protected isDragToBottom(): boolean;
    start(draggable: ITreeListItemViewModel): void;
    canDrop(): boolean;
    abstract getSiblings(): ko.ObservableArray<any>;
    reorderSiblings(isDragToBottom?: boolean): void;
    clearDroppableClasses(): void;
    getDroppablePosition(): string;
    drag(elementModel: ITreeListItemViewModel, element: HTMLElement): void;
    stop(): void;
    helper(draggable: ITreeListItemViewModel, event: Event): void;
    addDroppableClass(): void;
    protected _removeClass(target: HTMLElement): void;
}