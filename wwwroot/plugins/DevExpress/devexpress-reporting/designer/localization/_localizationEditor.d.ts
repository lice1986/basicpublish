﻿/**
* DevExpress HTML/JS Reporting (designer\localization\_localizationEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getResizableOptions, SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { XRControlViewModel } from '../controls/xrControl';
import { ReportViewModel } from '../controls/xrReport';
import { ControlScrollingTool } from '../internal/_controlScrollingTool';
import { TranslateHelper } from '../internal/_translateHelper';
export interface ILocalizationItem {
    component: XRControlViewModel;
    defaultText: ko.Observable<string> | ko.Computed<string>;
    localizedText: ko.Observable<string>;
    isDefaultLanguage: () => boolean;
    visible: () => boolean;
    dispose: () => void;
    displayName: string;
    multiline?: ko.Observable<boolean> | ko.Computed<any>;
}
export interface ILocalizationEditorOptions {
    controlScrollingTool: ControlScrollingTool;
    selection: SurfaceSelection;
    report: () => ReportViewModel;
}
export declare class LocalizationEditor extends Disposable {
    private _options;
    private _allowedPropertyNames;
    private _selectionDisabled;
    private _autoScrollingSubscription;
    private _uncollapseParent;
    private _subscribeFocused;
    private _getDefaultLanguageItems;
    dispose(): void;
    private _isLocalizableControl;
    private _shouldLocalizeReportControl;
    private _createLocalizationItem;
    private _updateLocalizationItems;
    applyLocalization(serviceName: string): void;
    clearLocalization(): void;
    getRegisteredService(): string;
    isDefaultLanguage(): boolean;
    constructor(_options: ILocalizationEditorOptions);
    start(): void;
    finish(): void;
    onSelectionChanged(e: {
        addedItems: ILocalizationItem[];
    }): void;
    onItemGotFocus(e: {
        model: ILocalizationItem;
    }): void;
    switchSearchBox(): void;
    defaultLanguageText: () => string;
    currentLanguageText: () => string;
    propertiesHeaderText: () => string;
    localizationItems: ko.ObservableArray<ILocalizationItem>;
    textToSearch: ko.Observable<string>;
    language: ko.Observable<string>;
    searchPlaceholder: () => string;
    searchBox: ko.Observable<any>;
    availableCultures: any;
    isSearching: ko.Observable<boolean>;
    getResizableOptions: typeof getResizableOptions;
    translateHelper: TranslateHelper;
    isVisible: ko.Observable<boolean>;
    width: ko.Observable<number>;
    showLoadIndicator: ko.Observable<boolean>;
    getLoadPanelPosition: (element: HTMLElement) => JQuery<HTMLElement>;
}