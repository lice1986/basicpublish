﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\fullscreenWizardNavigation.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
export class WizardNavigationPanel extends Disposable {
    constructor(wizard) {
        super();
        this._steps = [];
        this._disposables.push(wizard._currentPage.subscribe((newPage) => {
            const currentStep = this._steps.filter(step => step.pageIds.some(x => x === newPage.pageId))[0];
            if (currentStep) {
                currentStep.currentPageId = newPage.pageId;
                currentStep.disabled(false);
                this._setStepVisible(currentStep.stepIndex);
            }
        }));
        Object.keys(wizard.pageFactory.metadata).forEach((pageId) => {
            const item = wizard.pageFactory.metadata[pageId];
            const navigationItem = this._steps.filter(x => x.text === item.navigationPanelText)[0];
            if (navigationItem) {
                navigationItem.pageIds.push(pageId);
            }
            else {
                const navigationStep = {
                    text: item.navigationPanelText,
                    pageIds: [pageId],
                    currentPageId: null,
                    stepIndex: this._steps.length,
                    disabled: ko.observable(true),
                    visible: ko.observable(true)
                };
                this._disposables.push(navigationStep.isActive = ko.computed(() => {
                    return wizard._currentPage() && navigationStep.currentPageId === wizard._currentPage().pageId;
                }));
                navigationStep.clickAction = () => {
                    if (!navigationStep.isActive())
                        wizard.goToPage(navigationStep.currentPageId);
                };
                this._steps.push(navigationStep);
            }
        });
        this._disposables.push(this.isVisible = ko.computed(() => {
            return this._steps.filter(step => step.visible()).length > 1;
        }));
    }
    resetAll() {
        this._steps.forEach(step => {
            step.disabled(true);
        });
    }
    _currentStep(pageId) {
        return this._steps.filter(x => x.currentPageId === pageId)[0];
    }
    _reset(pageId) {
        const currentStep = this._currentStep(pageId);
        currentStep && currentStep.disabled(true);
    }
    _resetNextPages(pageId) {
        const currentStep = this._currentStep(pageId);
        if (!currentStep)
            return;
        for (let i = currentStep.stepIndex + 1; i < this._steps.length; i++) {
            this._steps[i].disabled(true);
        }
    }
    _setStepVisible(currentPageIndex) {
        const previousSteps = this._steps.filter((_, index) => index < currentPageIndex);
        if (previousSteps.length > 0 && !previousSteps.some(step => !step.disabled())) {
            previousSteps.forEach(step => step.visible(false));
        }
    }
}
