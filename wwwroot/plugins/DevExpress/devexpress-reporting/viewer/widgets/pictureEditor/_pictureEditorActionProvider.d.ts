﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_pictureEditorActionProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils-native';
import { PictureEditorModel } from './_pictureEditorModel';
import { IPictureEditorActionPopupOptions, PictureEditorToolbarItem, PictureEditorToolbarItemWithPopup } from './_pictureEditorToolbarItem';
import { IImageEditorItem } from './_pictureEditorTypes';
export declare class PictureEditorActionProvider extends Disposable {
    private _editorModel;
    private _popupOptions;
    static colors: string[];
    private _initPopupOptions;
    createOpenFileAction(action: (e: any) => void): PictureEditorToolbarItem;
    createImagePickerAction(images: IImageEditorItem[], filterEnabled: boolean, action: (base64: string) => void): PictureEditorToolbarItemWithPopup;
    createSizingAction(): PictureEditorToolbarItemWithPopup;
    createBrushAction(): PictureEditorToolbarItemWithPopup;
    createResetItem(action: () => void): PictureEditorToolbarItem;
    createClearItem(action: () => void): PictureEditorToolbarItem;
    constructor(_editorModel: PictureEditorModel, _popupOptions: IPictureEditorActionPopupOptions);
}
