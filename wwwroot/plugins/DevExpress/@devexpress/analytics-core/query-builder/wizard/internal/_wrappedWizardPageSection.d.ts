﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_wrappedWizardPageSection.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IWizardPage } from '../pages/IWizardPage';
import { _WrappedWizardPage } from '../pages/__wrappedWizardPage';
import { IWizardPageSectionMetadata } from './wizardPageSectionMetadata';
export declare class WrappedWizardPageSection extends _WrappedWizardPage {
    pageId: string;
    page: IWizardPage;
    onChange: (callback: () => void) => void;
    constructor(pageId: string, page: IWizardPage, metadata: IWizardPageSectionMetadata<IWizardPage>);
}