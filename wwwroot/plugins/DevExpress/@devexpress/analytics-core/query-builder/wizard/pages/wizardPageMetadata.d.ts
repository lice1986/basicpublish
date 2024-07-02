﻿/**
* DevExpress Analytics (query-builder\wizard\pages\wizardPageMetadata.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IWizardPage } from './IWizardPage';
export interface IWizardPageMetadata<T extends IWizardPage> {
    setState: (data: any, state: any) => void;
    getState: (state: any) => any;
    resetState: (state: any, defaultState?: any) => void;
    create: () => T;
    canNext?: (page: T) => boolean;
    canFinish?: (page: T) => boolean;
    template: string;
    description?: string;
    alwaysShowTitle?: boolean;
}