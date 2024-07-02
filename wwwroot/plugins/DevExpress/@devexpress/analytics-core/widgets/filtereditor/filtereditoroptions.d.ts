﻿/**
* DevExpress Analytics (widgets\filtereditor\filtereditoroptions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { FilterEditorHelper } from './helpers/helper';
export interface IFilterEditorOptions {
    value: ko.Observable<string> | ko.Computed<string>;
    path: ko.Observable<string> | ko.Computed<string>;
    helper?: FilterEditorHelper;
    disabled?: ko.Observable<boolean> | ko.Computed<boolean>;
}
export declare type AdvancedModePosition = 'TopRight' | 'TopLeft' | 'BottomRight' | 'BottomLeft';
export interface IFilterEditorPlainOptions extends IFilterEditorOptions {
    advancedModePosition: AdvancedModePosition;
    realTimeUpdate: boolean;
}
export declare class FilterStringOptions implements IFilterEditorOptions {
    private _title;
    constructor(filterString: ko.Observable<string> | ko.Computed<string>, dataMember?: ko.Observable | ko.Computed, disabled?: ko.Observable<boolean> | ko.Computed<boolean>, title?: {
        text: string;
        localizationId?: string;
    });
    popupContainer: string;
    itemsProvider: any;
    disabled: ko.Observable<boolean> | ko.Computed<boolean>;
    resetValue: () => void;
    helper: FilterEditorHelper;
    value: ko.Observable<string> | ko.Computed<string>;
    path: ko.Observable<string> | ko.Computed<string>;
    title: ko.PureComputed<string>;
}
export declare class FilterStringPlainOptions extends FilterStringOptions implements IFilterEditorPlainOptions {
    realTimeUpdate: boolean;
    advancedModePosition: AdvancedModePosition;
}
