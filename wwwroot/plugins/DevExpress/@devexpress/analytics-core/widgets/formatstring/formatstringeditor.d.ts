﻿/**
* DevExpress Analytics (widgets\formatstring\formatstringeditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
import { IStandardPattern } from './_patterns';
import { PopupService } from '../../property-grid/internal/_popupService';
import { ILocalizationInfo } from '../../property-grid/widgets/internal/_utils';
export interface IPatternItem {
    name: string;
    canRemove: boolean;
}
export interface IFormatStringEditorActions {
    updatePreview?: (value: string, category: string, pattern: string) => JQueryPromise<_IFormatStringEditorPreviewResponse>;
    saveCustomPattern?: (category: string, pattern: string) => JQueryPromise<boolean>;
    removeCustomPattern?: (category: string, pattern: string) => JQueryPromise<boolean>;
}
export interface _IFormatStringEditorPreviewResponse {
    Result?: string;
    IsError?: boolean;
}
export declare class FormatStringEditor extends Disposable {
    private _standardPatternSource;
    private _customPatternSource;
    private _lastUpdatePreviewPromise;
    private _isDisabled;
    private _timeout;
    private okAction;
    private _createMainPopupButtons;
    private _convertArray;
    private _scrollToBottom;
    private _updateFormatList;
    private _updateSelection;
    private _setPreviewString;
    private _setErrorMessage;
    private _updatePreview;
    private _getGeneralPreview;
    private _wrapFormat;
    private _updateCanAddCustomFormat;
    private _initEditor;
    constructor(value: ko.Observable<string>, disabled?: ko.Observable<boolean>, defaultPatterns?: {
        [key: string]: IStandardPattern;
    }, customPatterns?: {
        [key: string]: Array<string>;
    }, actions?: IFormatStringEditorActions, rtl?: ko.Observable<boolean>, popupContainer?: string);
    updateInputText(propertyName: string, componentInstance: any): void;
    option(name: any, value?: any): any;
    updatePreview(value: string, category: string, pattern: string): JQueryPromise<_IFormatStringEditorPreviewResponse>;
    get customPatterns(): string[];
    get isGeneralType(): boolean;
    getDisplayText(key: any): any;
    getPopupContainer(el: any): any;
    currentType: ko.Observable<string>;
    setType: (e: {
        itemData: IPatternItem;
    }) => void;
    setFormat: (e: {
        itemData: IPatternItem;
    }) => void;
    types: Array<IPatternItem>;
    patternList: ko.ObservableArray<IPatternItem>;
    addCustomFormat: () => void;
    removeCustomFormat: (e: any) => void;
    canAddCustomFormat: ko.Observable<boolean>;
    formatPrefix: ko.Observable<string>;
    formatSuffix: ko.Observable<string>;
    previewString: ko.Observable<string>;
    formatResult: ko.Observable<string>;
    selectedFormats: ko.Observable<IPatternItem[]>;
    selectedTypes: ko.Observable<IPatternItem[]>;
    popupService: PopupService;
    popupVisible: ko.Observable<boolean>;
    buttonItems: Array<any>;
    localizationIdMap: {
        [key: string]: ILocalizationInfo;
    };
}