﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\fullscreenWizard.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { PopupWizard } from '../popupWizard';
import { WizardNavigationPanel } from './fullscreenWizardNavigation';
export class FullscreenWizard extends PopupWizard {
    constructor(pageFactory, finishCallback) {
        super(pageFactory, finishCallback);
        this._extendCssClass = 'dx-wizard-fullscreen';
        this.navigationPanel = ko.observable(null);
        this.isVisible.subscribe(newValue => {
            if (!newValue) {
                this.navigationPanel() && this.navigationPanel().resetAll();
                this.navigationPanel() && this.navigationPanel().dispose();
                this._onCloseCallback && this._onCloseCallback();
            }
        });
    }
    _onClose(callback) {
        this._onCloseCallback = callback;
    }
    onFinish() {
        this.navigationPanel().dispose();
        super.onFinish();
    }
    _initPage(page) {
        if (page.onChange)
            page.onChange(() => this.navigationPanel()._resetNextPages(page.pageId));
        return super._initPage(page);
    }
    _onResetPage(page) {
        this.navigationPanel()._reset(page.pageId);
    }
    start(finishCallback) {
        if (finishCallback)
            this['_finishCallback'] = finishCallback;
        this.navigationPanel() && this.navigationPanel().resetAll();
        this.navigationPanel() && this.navigationPanel().dispose();
        this.navigationPanel(new WizardNavigationPanel(this));
        super.start();
    }
    _pageDescription() {
        const currentStep = this.navigationPanel()._steps.filter(x => x.isActive())[0];
        if (currentStep) {
            return currentStep.text;
        }
        else {
            return this.pageFactory.getMetadata(this._currentPage().pageId).description;
        }
    }
    _description() {
        return '';
    }
}
