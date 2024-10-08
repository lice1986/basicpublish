﻿/**
* DevExpress Analytics (widgets\filtereditor\filtereditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jquery" />
import * as ko from 'knockout';
import { FilterEditorAddOn } from './helpers/_addon';
import { IFilterEditorOptions, IFilterEditorPlainOptions, AdvancedModePosition } from './filtereditoroptions';
import { IItemsProvider } from '../utils';
import { IDisplayNameProvider } from '../common/displayNameProvider';
import { PopupService } from '../../property-grid/internal/_popupService';
import { DisplayExpressionConverter } from '../common/_displayNameProvider';
import { FilterEditorHelper } from './helpers/helper';
import { FilterEditorCodeCompletor } from './helpers/_codeCompletor';
import { PopupEditorBase } from '../../core/widgets/_popupEditorBase';
export interface IFilterEditorAddon {
    data: FilterEditorAddOn;
    templateName: string;
}
export interface IAdvancedState {
    value: ko.Observable<boolean> | ko.Computed<boolean>;
    animated: boolean;
}
export declare class FilterEditor extends PopupEditorBase {
    options: ko.Observable<IFilterEditorOptions> | ko.Computed<IFilterEditorOptions>;
    private _displayNameProvider?;
    private _advancedMode;
    private _generateOperand;
    private _generateSurface;
    private _validateValue;
    constructor(options: ko.Observable<IFilterEditorOptions> | ko.Computed<IFilterEditorOptions>, fieldListProvider: ko.Observable<IItemsProvider> | ko.Computed<IItemsProvider>, rtl?: boolean, _displayNameProvider?: IDisplayNameProvider, editorInputId?: string);
    canSave(): boolean;
    initializeInnerValue(): void;
    change(type: any, surface: any): void;
    get helper(): FilterEditorHelper;
    get path(): ko.Observable<string> | ko.Computed<string>;
    displayValue: ko.Observable<string> | ko.Computed<string>;
    modelDisplayValue: ko.Observable<string> | ko.Computed<string>;
    disabled: ko.Observable<boolean> | ko.Computed<boolean>;
    editorInputId: string;
    dispose(): void;
    onInput(s: any, e: any): void;
    onFocus(): void;
    onBlur(): void;
    cacheElement($element: JQuery): void;
    updateCriteria(): void;
    onValueChange(value: any): void;
    focusText(): void;
    resizeAceEditor(): void;
    textFocused: ko.Observable<boolean>;
    aceAvailable: any;
    languageHelper: {
        getLanguageMode: () => string;
        createCompleters: (editor: any, bindingContext: any, viewModel: any) => FilterEditorCodeCompletor[];
    };
    aceOptions: {
        showLineNumbers: boolean;
        showPrintMargin: boolean;
        enableBasicAutocompletion: boolean;
        enableLiveAutocompletion: boolean;
        showGutter: boolean;
    };
    additionalOptions: {
        onChange: (session: any) => void;
        changeTimeout: number;
        onFocus: (_: any) => void;
        onBlur: (_: any) => void;
    };
    editorContainer: ko.Observable<any>;
    textVisible: ko.Observable<boolean>;
    getPopupContainer: (el: any) => any;
    timeout: any;
    animationTimeout: any;
    advancedMode: ko.Computed<boolean>;
    invalidMessage: () => any;
    advancedModeText: ko.Observable<any>;
    modelValueIsValid: ko.Computed<boolean>;
    isSurfaceValid: ko.Computed<boolean>;
    showText: ko.Observable<boolean> | ko.Computed<boolean>;
    displayExpressionConverter: DisplayExpressionConverter;
    isValid: ko.Computed<boolean>;
    fieldListProvider: any;
    createAddButton: (criteria: any) => IFilterEditorAddon;
    createChangeType: (criteria: any) => IFilterEditorAddon;
    createChangeProperty: (criteria: any) => IFilterEditorAddon;
    createChangeParameter: (criteria: any) => IFilterEditorAddon;
    createChangeValueType: (criteria: any) => IFilterEditorAddon;
    operandSurface: ko.Observable<any>;
    operand: any;
    save: () => void;
    popupService: PopupService;
    value: ko.Observable<string> | ko.Computed<string>;
    rtl: boolean;
    get cancelLocalization(): any;
    get saveLocalization(): any;
}
export declare class FilterEditorPlain extends FilterEditor {
    private element;
    constructor(element: Element, options: ko.Observable<IFilterEditorPlainOptions>, fieldListProvider: ko.Observable<IItemsProvider>, rtl?: boolean, _displayNameProvider?: IDisplayNameProvider);
    initializeInnerValue(): void;
    getCheckBoxStyles(): {};
    getContentStyles(): {
        pointerEvents: string;
    };
    getTextCssClasses(): {
        advanced: boolean;
        'dx-filtereditor-text-container-bottom': boolean;
        'dx-filtereditor-text-container-top': boolean;
    };
    advancedModeTop: () => boolean;
    advancedModeLeft: () => boolean;
    advancedModePosition: AdvancedModePosition;
}
