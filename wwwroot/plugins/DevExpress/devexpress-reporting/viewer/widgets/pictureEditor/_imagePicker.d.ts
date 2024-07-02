﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_imagePicker.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { INumericSize } from '@devexpress/analytics-core/analytics-elements-native';
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, IViewModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { ValueChangedEvent } from 'devextreme/ui/text_box';
import { IImageEditorItem } from './_pictureEditorTypes';
export interface IImagePickerActionViewModel extends IViewModel {
    images: IImageEditorItemViewModel[];
    filterEnabled: boolean;
    filter: string;
    width: number;
    contentWidth: number;
    height: number;
    onFilterChanged: (event: ValueChangedEvent) => void;
    searchPlaceholder: string;
}
export interface IImageEditorItemViewModel extends IViewModel, IImageEditorItem {
    action: () => void;
    width: number;
    height: number;
    filter: string;
    filterEnabled: boolean;
}
export declare class ImagePickerAction extends BaseRenderingModel<IImagePickerActionViewModel> {
    constructor(images: IImageEditorItem[], filterEnabled: boolean, action: (base64: string) => void, initialSize: INumericSize);
    onPropertyChanged(args: PropertyChangedEventArgs<ImagePickerAction> | ArrayPropertyChangedEventArgs<ImagePickerAction>): void;
    createViewModel(): IImagePickerActionViewModel;
    filterString: string;
    filterEnabled: boolean;
    images: IImageEditorItemViewModel[];
    contentTemplate: string;
    width: number;
    height: number;
    contentWidth: number;
}
