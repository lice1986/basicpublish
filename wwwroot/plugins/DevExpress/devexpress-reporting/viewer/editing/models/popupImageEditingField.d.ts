﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\popupImageEditingField.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getParentContainer } from '@devexpress/analytics-core/analytics-internal-native';
import { ArrayPropertyChangedEventArgs, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { ContentReadyEvent } from 'devextreme/ui/popup';
import { IPainterOptions, Painter } from '../../widgets/pictureEditor/_painter';
import { IPictureEditorFieldModel, PictureEditorModel } from '../../widgets/pictureEditor/_pictureEditorModel';
import { IEditingFieldModel } from '../editingField';
import { ImageEditingFieldViewModel } from './imageEditingField';
import { IEditingFieldViewModelBase } from './editingFieldBase';
export interface IImageEditingFieldPopupData {
    contentData: PopupImageEditingFieldViewModel;
    paintData: IPainterOptions;
    contentTemplate: string;
    visible: boolean;
    getPositionTarget: (element: HTMLElement) => HTMLElement;
    showContent: boolean;
    onShown: (e: {
        element: any;
        component: any;
    }) => void;
    onHiding: (e: {
        element: any;
        component: any;
    }) => void;
    onContentReady: (event: ContentReadyEvent) => void;
    renderedHandler: () => void;
    shading: boolean;
    getPopupContainer: typeof getParentContainer;
}
export interface IPopupImageEditingFieldViewModel extends IEditingFieldViewModelBase {
    popupData: IImageEditingFieldPopupData;
    parentPopupClass: string;
    getPainterOptions: () => IPainterOptions;
}
export declare class PopupImageEditingFieldViewModel extends ImageEditingFieldViewModel<IPopupImageEditingFieldViewModel> implements IEditingFieldModel, IPictureEditorFieldModel {
    private _parentPopupClass;
    private _popupInitializedClass;
    private _getPopupContainer;
    private _resetPictureEditor;
    private _resetPainter;
    private _getPainterOptions;
    createViewModel(): IPopupImageEditingFieldViewModel;
    _renderedHandler(): void;
    _setPictureEditor(editor: PictureEditorModel): void;
    updateViewModel(args: PropertyChangedEventArgs<PopupImageEditingFieldViewModel> | ArrayPropertyChangedEventArgs<PopupImageEditingFieldViewModel>): void;
    canActivateEditor: boolean;
    activateEditor(viewModel: PopupImageEditingFieldViewModel, e: MouseEvent): void;
    _showContent: boolean;
    painterData: IPainterOptions;
    painter: Painter;
    pictureEditor: PictureEditorModel;
    template: string;
    deferredUpdateViewModel(): boolean;
}
export declare const DefaultImageEditingFieldViewModel: typeof PopupImageEditingFieldViewModel;