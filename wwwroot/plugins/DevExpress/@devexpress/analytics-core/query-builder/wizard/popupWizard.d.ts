﻿/**
* DevExpress Analytics (query-builder\wizard\popupWizard.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jquery" />
import * as ko from 'knockout';
import { BaseWizard } from './wizard';
import { IItemsProvider } from '../../widgets/utils';
export declare class PopupWizard extends BaseWizard {
    static _getLoadPanelViewModel(element: HTMLElement, observableVisible: ko.Observable<boolean>): {
        animation: {
            show: {
                type: string;
                from: number;
                to: number;
                duration: number;
            };
            hide: {
                type: string;
                from: number;
                to: number;
                duration: number;
            };
        };
        deferRendering: boolean;
        message: any;
        visible: ko.Observable<boolean>;
        shading: boolean;
        shadingColor: string;
        position: {
            of: any;
        };
        container: any;
    };
    constructor(pageFactory: any, finishCallback?: any);
    start(): void;
    height: ko.Observable<number>;
    width: ko.Observable<number>;
    _extendCssClass: string;
    _container: (el: HTMLElement) => JQuery<HTMLElement>;
    itemsProvider: ko.Observable<IItemsProvider>;
    nextButton: {
        text: any;
        disabled: ko.Computed<boolean>;
        onClick: () => void;
    };
    cancelButton: {
        text: any;
        onClick: () => void;
    };
    previousButton: {
        text: any;
        disabled: ko.Computed<boolean>;
        onClick: () => void;
    };
    finishButton: {
        text: any;
        type: string;
        disabled: ko.Computed<boolean>;
        onClick: () => void;
    };
    _wizardPopupPosition(element: HTMLElement): {
        of: any;
    };
    _loadPanelViewModel(element: HTMLElement): {
        animation: {
            show: {
                type: string;
                from: number;
                to: number;
                duration: number;
            };
            hide: {
                type: string;
                from: number;
                to: number;
                duration: number;
            };
        };
        deferRendering: boolean;
        message: any;
        visible: ko.Observable<boolean>;
        shading: boolean;
        shadingColor: string;
        position: {
            of: any;
        };
        container: any;
    };
    _getLoadPanelViewModel(element: HTMLElement, observableVisible: ko.Observable<boolean>): {
        animation: {
            show: {
                type: string;
                from: number;
                to: number;
                duration: number;
            };
            hide: {
                type: string;
                from: number;
                to: number;
                duration: number;
            };
        };
        deferRendering: boolean;
        message: any;
        visible: ko.Observable<boolean>;
        shading: boolean;
        shadingColor: string;
        position: {
            of: any;
        };
        container: any;
    };
    _titleTemplate: string;
    title: string;
}
