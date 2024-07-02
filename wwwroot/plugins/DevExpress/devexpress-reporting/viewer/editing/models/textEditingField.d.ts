﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\textEditingField.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IEditingFieldModel, EditingField, IBounds } from '../editingField';
import { getParentContainer } from '@devexpress/analytics-core/analytics-internal-native';
import { PreviewPage } from '../../internal/_page';
import { ArrayPropertyChangedEventArgs, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { IEditingFieldViewModelBase, EditingFieldBase } from './editingFieldBase';
export interface ITextEditingFieldViewModelBase extends IEditingFieldViewModelBase {
    textStyle: {
        [key: string]: string;
    };
    hideEditor: (shouldCommit: boolean) => void;
    keypressAction: (data: any, event: any) => void;
}
export declare class TextEditingFieldViewModelBase<T extends ITextEditingFieldViewModelBase> extends EditingFieldBase<T> {
    keypressAction(data: ITextEditingFieldData, event: KeyboardEvent): void;
    createViewModel(): T;
    canActivateEditor: boolean;
    activateEditor(model: EditingFieldBase<IEditingFieldViewModelBase>, event: {
        target: EventTarget;
        currentTarget: EventTarget;
    }, elementFocused?: boolean): void;
    hideEditor: (shouldCommit: boolean) => void;
    textStyle: {
        [key: string]: string;
    };
}
export interface ITextEditingFieldData {
    value: string | Date;
    textStyle: {
        [key: string]: string;
    };
    hideEditor: (shouldCommit: boolean) => void;
    keypressAction: (data: ITextEditingFieldData, event: KeyboardEvent) => void;
    options: any;
    getOptions: (options: any) => any;
    getPopupContainer: typeof getParentContainer;
}
export interface ITextEditingFieldViewModel extends ITextEditingFieldViewModelBase {
    borderStyle: {
        [key: string]: string;
    };
    breakOffsetStyle: {
        [key: string]: string;
    };
    wordWrap: boolean;
    editorTemplate: string;
    data: ITextEditingFieldData;
}
export declare class TextEditingFieldViewModel extends TextEditingFieldViewModelBase<ITextEditingFieldViewModel> implements IEditingFieldModel {
    constructor(field: EditingField<string>, pageWidth: number, pageHeight: number, page: PreviewPage, bounds: IBounds);
    onPropertyChanged(args: PropertyChangedEventArgs<EditingFieldBase> | ArrayPropertyChangedEventArgs<EditingFieldBase>): void;
    createViewModel(): ITextEditingFieldViewModel;
    dispose: () => void;
    template: string;
    editorTemplate: string;
    field: EditingField;
    data: ITextEditingFieldData;
    breakOffsetStyle: {
        [key: string]: string;
    };
    borderStyle: {
        [key: string]: string;
    };
    wordWrap: boolean;
    canActivateEditor: boolean;
    activateEditor(viewModel: TextEditingFieldViewModel, e: MouseEvent): void;
}
export declare function focusTextElement(target: HTMLElement): void;