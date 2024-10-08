﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\imageEditingField.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PropertyChangedEventArgs, ArrayPropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { PreviewPage } from '../../internal/_page';
import { PictureEditMode } from '../../widgets/pictureEditor/pictureEditMode';
import { IImageEditValue, IPictureEditorCallbacks, IPictureEditorFieldModel, IPictureEditorPopupTargetOptions, PictureEditorModel } from '../../widgets/pictureEditor/_pictureEditorModel';
import { EditingField, IBounds, IEditingFieldModel, ImageAlignment, ImageSizeMode } from '../editingField';
import { EditingFieldBase, IEditingFieldViewModelBase } from './editingFieldBase';
export declare class ImageEditingFieldViewModel<T extends IEditingFieldViewModelBase = IEditingFieldViewModelBase> extends EditingFieldBase<T> implements IEditingFieldModel, IPictureEditorFieldModel {
    field: EditingField<IImageEditValue>;
    protected bounds: IBounds;
    static __DefaultImageType: string;
    protected popupTarget: string;
    protected _onZoomChanged: (newZoom: number) => void;
    constructor(field: EditingField<IImageEditValue>, pageWidth: number, pageHeight: number, page: PreviewPage, bounds: IBounds);
    onPropertyChanged(args: PropertyChangedEventArgs<ImageEditingFieldViewModel> | ArrayPropertyChangedEventArgs<ImageEditingFieldViewModel>): void;
    getImage(): string;
    getImageType(): string;
    alignment: ImageAlignment;
    sizeMode: ImageSizeMode;
    editMode: PictureEditMode;
    popupOptions: IPictureEditorPopupTargetOptions;
    template: string;
    shadingEnabled: boolean;
    callbacks: IPictureEditorCallbacks;
    onKeyDown(event: KeyboardEvent): void;
    onFocusIn(s: PictureEditorModel): void;
    onDraw(s: PictureEditorModel): void;
    onBlur(s: PictureEditorModel): void;
}
