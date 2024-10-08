﻿/**
* DevExpress Analytics (query-builder\wizard\pages\IWizardPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDisposable } from '../../../serializer/disposable';
export interface IWizardPage extends IDisposable {
    commit: () => JQueryPromise<any>;
    initialize: (state: any, stateChanged?: boolean) => JQueryPromise<any>;
    canFinish: () => boolean;
    canNext: () => boolean;
    onChange?: (callback: () => void) => void;
    changeAlways?: boolean;
}
