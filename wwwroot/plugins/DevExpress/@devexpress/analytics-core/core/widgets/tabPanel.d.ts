﻿/**
* DevExpress Analytics (core\widgets\tabPanel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ITabPanelItemViewModel, TabInfo } from './tabInfo';
import { BaseRenderingModel } from '../../serializer/native/models/base.model';
import { IViewModel } from '../../serializer/native/models/interfaces.model';
import { PropertyChangedEventArgs, ArrayPropertyChangedEventArgs } from '../../serializer/propertyChangedEvents';
import { RightPanelKeyboardHelperNative } from '../../accessibility/_rightPanelKeyboardHelperNative';
export interface ITabPanelOptions {
    tabs: TabInfo[];
    autoSelectTab?: boolean;
    rtl?: boolean;
    width?: number;
}
export interface ITabPanelViewModel extends IViewModel {
    tabs: Array<ITabPanelItemViewModel>;
    width: number;
    class: string;
    keyboardHelper: any;
    getResizableOptions: ($element: Element, panelOffset: number, minWidth: number) => any;
    tabsElement: {
        class: string;
    };
    contentElement: {
        width: number;
        class: string;
    };
}
export declare class TabPanel extends BaseRenderingModel<ITabPanelViewModel> {
    private mapToTabsCollection;
    createViewModel(): ITabPanelViewModel;
    static Position: {
        Left: string;
        Right: string;
    };
    dispose(): void;
    updateViewModel(args: PropertyChangedEventArgs | ArrayPropertyChangedEventArgs): void;
    onPropertyChanged(args: PropertyChangedEventArgs | ArrayPropertyChangedEventArgs): void;
    private _onDisabledChanged;
    private _onVisibilityChanged;
    private _subscribeTab;
    constructor(options: ITabPanelOptions);
    getTabByName(tabName: string): TabInfo;
    removeTabs(): void;
    addTab(tab: TabInfo): void;
    private _resizableOptions;
    private _autoSelectTab;
    getResizableOptions: ($element: Element, panelOffset: number, minWidth: number) => any;
    tabs: TabInfo[];
    toggleTabVisibility: (e: any) => void;
    selectTab: (e: any) => void;
    isEmpty: boolean;
    collapsed: boolean;
    _width: number;
    width: number;
    zoomFactor: number;
    headerWidth: number;
    position: string;
    toggleCollapsedImage: {
        class: string;
        template: string;
    };
    toggleCollapsedText: string;
    cssClasses: (extendedClass?: string) => string;
    keyboardHelper: RightPanelKeyboardHelperNative;
}