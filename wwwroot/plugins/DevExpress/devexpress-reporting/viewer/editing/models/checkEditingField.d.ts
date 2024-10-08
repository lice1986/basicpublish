﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\checkEditingField.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ImageSource } from '../../../common/imageSource';
import { IEditingFieldModel, EditingField } from '../editingField';
import { PreviewPage } from '../../internal/_page';
import { EditingFieldBase, IEditingFieldViewModelBase } from './editingFieldBase';
import { ArrayPropertyChangedEventArgs, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
export declare enum GlyphStyle {
    StandardBox1 = 0,
    StandardBox2 = 1,
    YesNoBox = 2,
    YesNoSolidBox = 3,
    YesNo = 4,
    RadioButton = 5,
    Smiley = 6,
    Thumb = 7,
    Toggle = 8,
    Star = 9,
    Heart = 10
}
export declare enum CheckState {
    Unchecked = 0,
    Checked = 1,
    Indeterminate = 2
}
export declare function createCustomGlyphStyleCss(imageSource: ImageSource): {
    [key: string]: string;
};
export declare function getCheckBoxTemplate(style: string, state: string, customGlyph: {}): string;
export interface ICheckEditingFieldViewModel extends IEditingFieldViewModelBase {
    onKeyDown: (event: KeyboardEvent) => void;
    onBlur: () => void;
    onFocus: () => void;
    checkStyle: {
        [key: string]: string;
    };
    checkStateStyleIcon: string;
    customGlyphStyleCss: {
        [key: string]: string;
    };
    checked: boolean;
}
export declare class CheckEditingFieldViewModel extends EditingFieldBase<ICheckEditingFieldViewModel> implements IEditingFieldModel {
    private _editingFieldsProvider;
    private _toggleCheckState;
    private _updateCustomGlyphStyleCss;
    private _updateCheckStateStyleIcon;
    private _updateCheckStyle;
    constructor(field: EditingField<number>, pageWidth: number, pageHeight: number, page: PreviewPage, editingFieldsProvider: () => EditingField[]);
    onPropertyChanged(args: PropertyChangedEventArgs<CheckEditingFieldViewModel> | ArrayPropertyChangedEventArgs<CheckEditingFieldViewModel>): void;
    updateViewModel(args: PropertyChangedEventArgs<CheckEditingFieldViewModel> | ArrayPropertyChangedEventArgs<CheckEditingFieldViewModel>): void;
    createViewModel(): ICheckEditingFieldViewModel;
    template: string;
    field: EditingField<number>;
    checkStyle: {
        [key: string]: string;
    };
    checkStateStyleIcon: string;
    customGlyphStyleCss: {
        [key: string]: string;
    };
    focused: boolean;
    checked: boolean;
    onKeyDown(event: KeyboardEvent): void;
    onBlur(): void;
    onFocus(): void;
    onClick(model: EditingFieldBase, event: UIEvent): void;
    private _updateCheckedState;
    toggleCheckState(): void;
}
