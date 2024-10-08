﻿/**
* DevExpress Analytics (query-builder\wizard\wizardEventManager.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IWizardPage } from './pages/IWizardPage';
export interface IWizardEventArgs<Sender> {
    wizard: Sender;
}
export interface IWizardPageEventArgs<Sender> extends IWizardEventArgs<Sender> {
    page: IWizardPage;
    pageId: string;
}
export interface IBeforeWizardPageInitializeEventArgs<Sender> extends IWizardPageEventArgs<Sender>, IBeforeWizardInitializeEventArgs<Sender> {
}
export interface IBeforeWizardInitializeEventArgs<Sender> extends IWizardEventArgs<Sender> {
    state: any;
}
export interface IBeforeWizardFinishEventArgs {
    state: any;
    wizardModel?: any;
}
export interface IAfterWizardFinishEventArgs {
    state: any;
    wizardResult?: any;
}
export interface IWizardEvents<Sender> {
    'afterInitialize': IWizardEventArgs<Sender>;
    'beforeInitialize': IBeforeWizardInitializeEventArgs<Sender>;
    'beforeStart': IWizardEventArgs<Sender>;
    'beforePageInitialize': IBeforeWizardPageInitializeEventArgs<Sender>;
    'afterPageInitialize': IWizardPageEventArgs<Sender>;
    'beforeFinish': IBeforeWizardFinishEventArgs;
    'afterFinish': IAfterWizardFinishEventArgs;
}
