﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_wizardPageSectionFactory.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PageFactory } from '../pageFactory';
import { IWizardPage } from '../pages/IWizardPage';
import { IWizardPageSectionMetadata } from './wizardPageSectionMetadata';
export declare class WizardPageSectionFactory extends PageFactory {
    registerMetadata<T extends IWizardPage>(pageId: string, metadata: IWizardPageSectionMetadata<T>): void;
    metadata: {
        [key: string]: IWizardPageSectionMetadata<IWizardPage>;
    };
}
