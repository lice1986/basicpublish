﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\fullscreenWizardNavigation.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { FullscreenWizard } from './fullscreenWizard';
export interface IWizardNavigationStep {
    pageIds: string[];
    currentPageId: string;
    clickAction: () => void;
    text: string;
    stepIndex: number;
    isActive: ko.Observable<boolean> | ko.Computed<boolean>;
    disabled: ko.Observable<boolean> | ko.Computed<boolean>;
    visible: ko.Observable<boolean> | ko.Computed<boolean>;
}
export declare class WizardNavigationPanel extends Disposable {
    constructor(wizard: FullscreenWizard);
    resetAll(): void;
    _currentStep(pageId: string): IWizardNavigationStep;
    _reset(pageId: string): void;
    _resetNextPages(pageId: string): void;
    _setStepVisible(currentPageIndex: number): void;
    _steps: Array<IWizardNavigationStep>;
    isVisible: ko.Computed<boolean>;
}
