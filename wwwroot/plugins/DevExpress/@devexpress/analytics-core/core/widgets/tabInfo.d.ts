﻿/**
* DevExpress Analytics (core\widgets\tabInfo.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityKeyboardHelperBase } from '../../accessibility/_keyboardHelperBase';
import { BaseRenderingModel } from '../../serializer/native/models/base.model';
import { IViewModel } from '../../serializer/native/models/interfaces.model';
import { ArrayPropertyChangedEventArgs, PropertyChangedEventArgs } from '../../serializer/propertyChangedEvents';
export interface ITabInfoOptions {
    text: string;
    template: string;
    model: any;
    keyboardHelper?: AccessibilityKeyboardHelperBase;
    localizationId?: string;
    imageClassName?: string;
    imageTemplateName?: string;
    visible?: boolean;
    disabled?: boolean;
}
export interface ITabPanelItemViewModel<T = any> extends IViewModel {
    css: {
        class: string;
    };
    image: {
        class: string;
        templateName: string;
    };
    text: string;
    model: T;
    template: string;
    active: boolean;
    disabled: boolean;
    visible: boolean;
    click: (e: any) => void;
    keyboardHelper: AccessibilityKeyboardHelperBase;
}
export declare class TabInfo<T = any> extends BaseRenderingModel<ITabPanelItemViewModel<T>> {
    private _text;
    private _localizationId;
    updateViewModel(args: PropertyChangedEventArgs | ArrayPropertyChangedEventArgs): void;
    onPropertyChanged(args: PropertyChangedEventArgs | ArrayPropertyChangedEventArgs): void;
    createViewModel(): ITabPanelItemViewModel<T>;
    constructor(options: ITabInfoOptions);
    focus(): void;
    imageClassName: string;
    imageTemplateName: string;
    name: string;
    active: boolean;
    visible: boolean;
    disabled: boolean;
    template: string;
    model: any;
    keyboardHelper: AccessibilityKeyboardHelperBase;
    get text(): string;
    collapsed: boolean;
}