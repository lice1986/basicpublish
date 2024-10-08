﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_pictureEditorModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getParentContainer } from '@devexpress/analytics-core/analytics-internal-native';
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, IModel, IViewModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { ContentReadyEvent } from 'devextreme/ui/popup';
import { ImageAlignment, ImageSizeMode } from '../../editing/editingField';
import { PictureEditMode } from './pictureEditMode';
import { IPainterViewModel, Painter } from './_painter';
import { PictureEditorActionProvider } from './_pictureEditorActionProvider';
import { IPictureEditorToolbarItem, IPictureEditorToolbarItemWithTemplateOptions } from './_pictureEditorToolbarItem';
export interface IPictureEditorViewModel extends IViewModel {
    shadingEnabled: boolean;
    getPopupContainer: typeof getParentContainer;
    onContentReady: (event: ContentReadyEvent) => void;
    actions: IPictureEditorToolbarItemWithTemplateOptions[];
    painter: IPainterViewModel;
    element: HTMLElement;
}
export declare class PictureEditorModel extends BaseRenderingModel<IPictureEditorViewModel> {
    editingFieldModel: IPictureEditorFieldModel;
    private $element;
    private _initialImage;
    private _initialAlignment;
    private _initialSizeMode;
    private _initialImageType;
    private _pointerDownHandler;
    private _pointerUpHandler;
    private _pointerCancelHandler;
    private _canDrawChanged;
    private _callbacks;
    private GESTURE_COVER_CLASS;
    private ACTIVE_POPUP_CLASS;
    private _getPopupContent;
    private _takeFocus;
    private _releaseFocus;
    private _wrapButtonAction;
    private _initActions;
    private _loadImage;
    private _addEvents;
    constructor(editingFieldModel: IPictureEditorFieldModel, element: HTMLElement, onResize?: () => void);
    createViewModel(): IPictureEditorViewModel;
    onPropertyChanged(args: PropertyChangedEventArgs<PictureEditorModel> | ArrayPropertyChangedEventArgs<PictureEditorModel>): void;
    changeActiveButton(selectedItem: IPictureEditorToolbarItem): void;
    dispose(): void;
    getImage(): string;
    reset(image: string, alignment: ImageAlignment, sizeMode: ImageSizeMode, imageType: string): void;
    getCurrentOptions(): IImageEditValue;
    actionsProvider: PictureEditorActionProvider;
    editMode: PictureEditMode;
    actions: Array<IPictureEditorToolbarItem>;
    painter: Painter;
    active: boolean;
    canDraw: boolean;
    shadingEnabled: boolean;
}
export interface IPictureEditorCallbacks {
    onFocusOut: (s: any) => void;
    onFocusIn?: (s: any) => void;
    onDraw: (s: any) => void;
    customizeActions?: (s: PictureEditorModel, actions: Array<IPictureEditorToolbarItem>) => void;
}
export interface IImageEditValue {
    sizeMode: ImageSizeMode;
    alignment: ImageAlignment;
    imageType: string;
    image: string;
}
export interface IPictureEditorFieldModel extends IModel {
    editMode: PictureEditMode;
    sizeMode: ImageSizeMode;
    alignment: ImageAlignment;
    callbacks: IPictureEditorCallbacks;
    popupOptions: IPictureEditorPopupTargetOptions;
    shadingEnabled: boolean;
    active: boolean;
    zoom: number;
    getImage: () => string;
    getImageType: () => string;
    _setPictureEditor?: (editor: PictureEditorModel) => void;
    _renderedHandler?: () => void;
}
export interface IPictureEditorPopupTargetOptions {
    target?: string;
    container?: string;
    boundary?: string;
}
export interface IClickEvent {
    target: HTMLElement;
}
