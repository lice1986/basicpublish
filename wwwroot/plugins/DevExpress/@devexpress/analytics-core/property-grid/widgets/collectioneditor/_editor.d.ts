﻿/**
* DevExpress Analytics (property-grid\widgets\collectioneditor\_editor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Observable } from 'knockout';
import { IUndoEngine, ILocalizationInfo } from '../internal/_utils';
import { ISerializationInfo } from '../../../serializer/serializationInfo';
import { ListKeyboardHelper } from '../../../accessibility/_listKeyboardHelper';
import { BaseRenderingModel } from '../../../serializer/native/models/base.model';
import { IViewModel } from '../../../serializer/native/models/interfaces.model';
import { ICollapsedViewModel, IEditorViewModel } from '../editor';
import { PropertyChangedEventArgs, ArrayPropertyChangedEventArgs } from '../../../serializer/propertyChangedEvents';
import { IObjectPropertiesViewModel } from '../../propertygrid';
import { editor_template } from '../../../core/widgets/_generateIconTemplate';
import { AccordionKeyboardHelper } from '../../../accessibility/_accordionKeyboardHelper';
export declare function wrapOptions(editorViewModel: IEditorViewModel): ICollectionEditorOptions;
export interface ICollectionItemWrapperViewModel extends IViewModel, ICollapsedViewModel {
    value: any;
    selected: boolean;
    index: number;
    level: number;
    padding: number;
    name: string;
    disabled: boolean;
    getProperties: (options: any) => IObjectPropertiesViewModel;
    select: (e: any, force: any) => void;
}
export interface ICollectionItemWrapper {
    disabled: Observable<boolean>;
}
export interface ICollectionEditorOptionsBase {
    addHandler: () => any;
    removeHandler?: (parameter: any, selectedIndex?: number) => any;
    onValueChanged?: (array: any[], args: ArrayPropertyChangedEventArgs<any>) => any;
    displayName?: string;
    displayPropertyName?: string;
    hideButtons?: any;
    showScroll?: boolean;
    selectedItem?: Observable<any>;
    collapsed?: boolean;
    alwaysShow?: boolean;
    level?: number;
    template?: string;
    editorTemplate?: string;
    textEmptyArray?: ILocalizationInfo;
    isVisibleButton?: (index: any, buttonName: any) => boolean;
    isDisabledButton?: (index: any, buttonName: any) => boolean;
}
export interface ICollectionEditorOptions extends ICollectionEditorOptionsBase {
    values: any[];
    undoEngine?: IUndoEngine;
    info?: ISerializationInfo;
}
declare type CollectionEditorViewModelButtonType = {
    visible: boolean;
    disabled: boolean;
    action: (model: any) => void;
    text: string;
    template: typeof editor_template;
};
export interface ICollectionEditorViewModel extends ICollapsedViewModel, IViewModel {
    alwaysShow: boolean;
    contentId: string;
    headerId: string;
    showButtons: boolean;
    buttons: {
        up: CollectionEditorViewModelButtonType;
        down: CollectionEditorViewModelButtonType;
        add: CollectionEditorViewModelButtonType;
        delete: CollectionEditorViewModelButtonType;
    };
    displayName: string;
    level: number;
    padding: number;
    disabled: boolean;
    showScroll: boolean;
    emptyAreaText: string;
    values: ICollectionItemWrapperViewModel[];
    keyboardHelper: AccordionKeyboardHelper;
}
export declare class CollectionEditorViewModel extends BaseRenderingModel<ICollectionEditorViewModel> {
    deferredUpdateViewModel(): boolean;
    createViewModel(): ICollectionEditorViewModel;
    updateViewModel(args: PropertyChangedEventArgs | ArrayPropertyChangedEventArgs): void;
    dispose(): void;
    private _textEmptyArray;
    private _timeoutItemRendered;
    private _move;
    private _setSelectedIndex;
    options: ICollectionEditorOptions;
    displayPropertyName: string;
    showScroll: boolean;
    onPropertyChanged(args: PropertyChangedEventArgs | ArrayPropertyChangedEventArgs): void;
    constructor(options: ICollectionEditorOptions, disabled?: boolean);
    getDisplayTextButton(key: string): string;
    getDisplayTextEmptyArray(): string;
    buttonMap: {
        [keyname: string]: ILocalizationInfo & {
            iconClass: string;
        };
    };
    headerId: string;
    contentId: string;
    isVisibleButton: (buttonName: any) => boolean;
    isDisabledButton: (buttonName: any) => boolean;
    listKeyboardHelper: ListKeyboardHelper;
    level: number;
    padding: number;
    addHandler: () => any;
    keyboardHelper: AccordionKeyboardHelper;
    removeHandler: (selectedItem: any, index?: number) => void;
    add(model: any): void;
    up(model: any): void;
    down(model: any): void;
    delete(model: any): void;
    select(model: {
        index: ICollectionItemWrapperViewModel['index'];
        value: ICollectionItemWrapperViewModel['value'];
    }, force?: boolean): void;
    selectedIndex: number;
    collapsed: boolean;
    alwaysShow: boolean;
    displayName: string;
    values: any[];
    showButtons: boolean;
    hideButtons: boolean;
    disabled: boolean;
}
export {};
