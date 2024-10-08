﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\editingFieldBase.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { EditingField, IEditValueContainerViewModel } from '../editingField';
import { PreviewPage } from '../../internal/_page';
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, IViewModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
export interface IEditingFieldViewModelBase extends IViewModel {
    zoom: number;
    active: boolean;
    template: string;
    field: IEditValueContainerViewModel;
    activateEditor: (viewModel: IEditingFieldViewModelBase, event: Event) => void;
    canActivateEditor: boolean;
    onClick: (model: IEditingFieldViewModelBase, event: Event) => void;
    containerStyle: {
        [key: string]: string;
    };
}
export declare class EditingFieldBase<T extends IEditingFieldViewModelBase = IEditingFieldViewModelBase> extends BaseRenderingModel<T> {
    deferredUpdateViewModel(): boolean;
    protected _updateContainerStyle: () => void;
    constructor(page: PreviewPage);
    createViewModel(): T;
    updateViewModel(args: PropertyChangedEventArgs<EditingFieldBase> | ArrayPropertyChangedEventArgs<EditingFieldBase>): void;
    onPropertyChanged(args: PropertyChangedEventArgs<EditingFieldBase> | ArrayPropertyChangedEventArgs<EditingFieldBase>): void;
    canActivateEditor: boolean;
    activateEditor(model: EditingFieldBase, event: {
        target: EventTarget;
        currentTarget: EventTarget;
    }): void;
    onClick(model: EditingFieldBase, event: Event): void;
    template: string;
    field: EditingField;
    containerStyle: {
        [key: string]: string;
    };
    zoom: number;
    active: boolean;
}
