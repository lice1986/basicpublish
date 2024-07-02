﻿/**
* DevExpress Analytics (query-builder\wizard\pages\wizardPageBase.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { Disposable } from '../../../serializer/disposable';
import { IWizardPage } from './IWizardPage';
export declare class WizardPageBase<TState = any, TResult = any> extends Disposable implements IWizardPage {
    changeAlways: boolean;
    dispose(): void;
    commit(): JQueryPromise<any>;
    protected _onChange: () => void;
    onChange(callback: any): void;
    initialize(state: TState, stateChanged?: boolean): JQueryPromise<any>;
    canNext(): boolean;
    canFinish(): boolean;
}