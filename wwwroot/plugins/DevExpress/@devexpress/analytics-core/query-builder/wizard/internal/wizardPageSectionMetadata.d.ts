﻿/**
* DevExpress Analytics (query-builder\wizard\internal\wizardPageSectionMetadata.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IWizardPage } from '../pages/IWizardPage';
import { IWizardPageMetadata } from '../pages/wizardPageMetadata';
export interface IWizardPageSectionMetadata<T extends IWizardPage> extends IWizardPageMetadata<T> {
    position?: number;
    disabledText?: string;
    recreate?: boolean;
    onChange?: () => void;
    required?: boolean;
}
