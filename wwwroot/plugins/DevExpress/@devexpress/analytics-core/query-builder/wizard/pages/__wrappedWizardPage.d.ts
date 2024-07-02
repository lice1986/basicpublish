﻿/**
* DevExpress Analytics (query-builder\wizard\pages\__wrappedWizardPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { Disposable } from '../../../serializer/disposable';
import { IWizardPage } from './IWizardPage';
export declare class _WrappedWizardPage extends Disposable {
    pageId: string;
    page: IWizardPage;
    template: string;
    description?: string;
    dispose(): void;
    resetCommitedState(): void;
    private _lastCommitedState;
    private _isInitialized;
    private _initDef;
    isChanged: boolean;
    onChange: (callback: () => void) => void;
    constructor(pageId: string, page: IWizardPage, template: string, description?: string);
    commit(): JQueryPromise<any>;
    initialize(state: any, force?: boolean, stateChanged?: boolean): JQueryPromise<any>;
}