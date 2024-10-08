﻿/**
* DevExpress Analytics (core\selection\_selection.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IArea } from '../elements/area';
import { IHoverInfo } from '../internal/_hoverInfo';
import { ElementViewModel } from '../elements/elementViewModel';
import { IDisposable, Disposable } from '../../serializer/disposable';
import { ITreeListItemViewModel } from '../../widgets/treelist/_treelistItem.viewModel';
export interface ISelectingEvent {
    control: ISelectionTarget;
    cancel: boolean;
    ctrlKey?: boolean;
}
export interface ISelectionTarget<T extends string = string> {
    rect: ko.Observable<IArea> | ko.Computed<IArea>;
    focused: ko.Observable<boolean> | ko.Computed<boolean>;
    selected: ko.Observable<boolean> | ko.Computed<boolean>;
    underCursor: ko.Observable<IHoverInfo> | ko.Computed<IHoverInfo>;
    allowMultiselect: boolean;
    locked: boolean;
    canDrop: () => boolean;
    getControlModel: () => ElementViewModel<T>;
    checkParent: (surfaceParent: ISelectionTarget<T>) => boolean;
    parent: ISelectionTarget<T>;
    getChildrenCollection: () => ko.ObservableArray<ISelectionTarget<T>>;
    dragCallback?: (item: ITreeListItemViewModel) => void;
    dropCallback?: (item: ITreeListItemViewModel) => void;
    findNextSelection?: () => ISelectionTarget<T>;
}
export interface ISelectionProvider<T extends string = string> extends IDisposable {
    focused: ko.Observable<ISelectionTarget<T>> | ko.Computed<ISelectionTarget<T>>;
    selectedItems: ISelectionTarget<T>[];
    initialize(surface?: ISelectionTarget<T>): any;
    selecting(event: ISelectingEvent): any;
    unselecting(surface: ISelectionTarget<T>): any;
    swapFocusedItem(surface: ISelectionTarget<T>): any;
    ignoreMultiSelectProperties?: string[];
    selectionWithCtrl(surface?: ISelectionTarget<T>): any;
    applySelection(): any;
}
export declare class SurfaceSelection extends Disposable implements ISelectionProvider {
    ignoreMultiSelectProperties: string[];
    dispose(): void;
    private _focused;
    private _firstSelected;
    private _selectedControls;
    private _selectedControlsInner;
    private _removeFromSelection;
    private _setFocused;
    private _resetTabPanelFocus;
    constructor(ignoreMultiSelectProperties?: string[]);
    focused: ko.PureComputed<ISelectionTarget<string>>;
    get selectedItems(): ISelectionTarget<string>[];
    clear(): void;
    reset(): void;
    applySelection(): void;
    selectItems(items: any): void;
    updateSelection(control: ISelectionTarget): void;
    swapFocusedItem(control: ISelectionTarget): void;
    initialize(control?: ISelectionTarget): void;
    clickHandler(control?: ISelectionTarget, event?: {
        ctrlKey: boolean;
        metaKey: boolean;
    }): void;
    selecting(event: ISelectingEvent): void;
    unselecting(control: ISelectionTarget): void;
    selectionWithCtrl(control: ISelectionTarget): void;
    dropTarget: ISelectionTarget;
    expectClick: boolean;
    disabled: ko.Observable<boolean>;
}
