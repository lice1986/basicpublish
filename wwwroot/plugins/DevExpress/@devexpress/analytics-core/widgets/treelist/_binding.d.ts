﻿/**
* DevExpress Analytics (widgets\treelist\_binding.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Subscribable } from 'knockout';
import { ITreeListOptions } from './_treelistItem';
import { DragDropHandler } from '../../core/dragDrop/_dragDropHandler';
import { ITreeListItemViewModel } from './_treelistItem.viewModel';
export interface ITreeListBindingOptions {
    element: HTMLElement;
    values: ITreeListOptions | Subscribable<ITreeListOptions>;
    dragDropHandler?: DragDropHandler;
    createChildContext: (viewModel: ITreeListItemViewModel) => void;
}
export declare function initTreeListBinding(bindingOptions: ITreeListBindingOptions): () => void;
