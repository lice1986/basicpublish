﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\fullscreenWizard.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { PopupWizard } from '../popupWizard';
import { FullscreenWizardPageFactory } from './fullscreenWizardPageFactory';
import { _WrappedWizardPage } from '../pages/__wrappedWizardPage';
import { WizardNavigationPanel } from './fullscreenWizardNavigation';
import { FullscreenWizardPage } from './pages/fullscreenWizardPage';
export declare class FullscreenWizard extends PopupWizard {
    private _onCloseCallback;
    constructor(pageFactory: FullscreenWizardPageFactory, finishCallback?: any);
    _onClose(callback: any): void;
    onFinish(): void;
    _initPage(page: any): JQueryPromise<any>;
    _onResetPage(page: _WrappedWizardPage): void;
    start(finishCallback?: (model: any) => JQueryPromise<boolean>): void;
    _pageDescription(): string;
    _description(): string;
    navigationPanel: ko.Observable<WizardNavigationPanel>;
    _steps: FullscreenWizardPage[];
    _extendCssClass: string;
    pageFactory: FullscreenWizardPageFactory;
}
