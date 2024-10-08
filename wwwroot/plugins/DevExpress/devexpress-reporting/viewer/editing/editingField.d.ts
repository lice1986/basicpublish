﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\editingField.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, IViewModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils-native';
import { PreviewPage } from '../internal/_page';
import { IBrickNode } from '../utils/utils';
import { GlyphStyle } from './models/checkEditingField';
import { EditingFieldBase } from './models/editingFieldBase';
export interface IBounds {
    left: number;
    top: number;
    width: number;
    height: number;
    offset: {
        x: number;
        y: number;
    };
}
export declare enum ImageAlignment {
    TopLeft = 1,
    TopCenter = 2,
    TopRight = 3,
    MiddleLeft = 4,
    MiddleCenter = 5,
    MiddleRight = 6,
    BottomLeft = 7,
    BottomCenter = 8,
    BottomRight = 9
}
export declare enum ImageSizeMode {
    Normal = 0,
    StretchImage = 1,
    ZoomImage = 4,
    Squeeze = 5,
    Cover = 7
}
export interface IImageSourceBrickData {
    image: string;
    imageType: string;
}
export interface IImageBrickData extends IImageSourceBrickData {
    alignment: ImageAlignment;
    sizeMode: ImageSizeMode;
}
export interface IEditingFieldSerializedModel {
    id: string;
    groupID: string;
    readOnly: boolean;
    editorName: string;
    editValue: any | IImageBrickData;
    htmlValue: string;
    pageIndex: number;
    brickIndeces: string;
    type: string;
    bounds: IBounds;
    brickOptions: {
        rtl: boolean;
        rtlLayout: boolean;
        formatString: string;
        wordWrap: boolean;
        style: string;
        checkBoxBounds?: IBounds;
        characterCombBounds?: IBounds[];
        checkBoxGlyphOptions?: {
            customGlyphs: {
                key: number;
                value: IImageSourceBrickData;
            }[];
            glyphStyle: GlyphStyle;
        };
    };
}
export interface IEditingFieldModel {
    template: string;
    field: EditingField;
    canActivateEditor: boolean;
    activateEditor: (viewModel: any, e: any) => void;
    hideEditor?: (shouldCommit: boolean) => void;
    active?: boolean;
    onClick?: (viewModel: any, e: any) => void;
    dispose?: () => void;
}
export interface IEditingFieldHtmlProvider {
    getEditingFieldHtml: (value: unknown, editingFieldIndex: number) => JQueryPromise<string>;
}
export declare const sizing: ISerializationInfo;
export declare const imageAlignment: ISerializationInfo;
export interface IEditValueContainerViewModel<T = unknown> extends IViewModel {
    readOnly: boolean;
    editValue: T;
    editorValue: T;
    htmlValue: string;
}
export declare class EditingField<T = unknown> extends BaseRenderingModel<IEditValueContainerViewModel<T>> {
    protected _fieldModel: IEditingFieldSerializedModel;
    private _needToUseHtml;
    private _index;
    private _htmlProvider;
    constructor(model: IEditingFieldSerializedModel, index: number, htmlProvider: IEditingFieldHtmlProvider);
    private _refreshHtmlValue;
    setEditValue(newVal: T): void;
    getEditValue(): T;
    onPropertyChanged(args: PropertyChangedEventArgs<EditingField> | ArrayPropertyChangedEventArgs<EditingField>): void;
    editingFieldChanged(field: EditingField, oldVal: T, newVal: T): T;
    createViewModel(): IEditValueContainerViewModel<T>;
    updateViewModel(args: PropertyChangedEventArgs<EditingField<T>> | ArrayPropertyChangedEventArgs<EditingField<T>>): void;
    readOnly: boolean;
    editValue: T;
    brick: IBrickNode;
    _editorValue: T;
    htmlValue: string;
    editorName(): string;
    id(): string;
    groupID(): string;
    pageIndex(): number;
    type(): string;
    model(): IEditingFieldSerializedModel;
    createModel(page: PreviewPage, pageWidth: number, pageHeight: number, editingFieldsProvider: () => EditingField[], bounds: IBounds): EditingFieldBase;
}
