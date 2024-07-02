﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\fullscreenWizardPageFactory.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IWizardPageMetadata } from '../pages/wizardPageMetadata';
import { PageFactory } from '../pageFactory';
import { IWizardPage } from '../pages/IWizardPage';
export interface IFullscreenWizardPageMetadata<T extends IWizardPage> extends IWizardPageMetadata<T> {
    navigationPanelText?: string;
}
export declare class FullscreenWizardPageFactory extends PageFactory {
    registerMetadata<T extends IWizardPage>(pageId: string, metadata: IFullscreenWizardPageMetadata<T>): void;
    getMetadata(key: string): IFullscreenWizardPageMetadata<IWizardPage>;
    metadata: {
        [key: string]: IFullscreenWizardPageMetadata<IWizardPage>;
    };
}
