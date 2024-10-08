﻿/**
* DevExpress Analytics (query-builder\wizard\pageFactory.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IWizardPage } from './pages/IWizardPage';
import { IWizardPageMetadata } from './pages/wizardPageMetadata';
export declare class PageFactory {
    registerMetadata<T extends IWizardPage>(pageId: string, metadata: IWizardPageMetadata<T>): void;
    getMetadata(pageId: string): IWizardPageMetadata<IWizardPage>;
    unregisterMetadata(pageId: string): void;
    reset(): void;
    metadata: {
        [key: string]: IWizardPageMetadata<IWizardPage>;
    };
}
