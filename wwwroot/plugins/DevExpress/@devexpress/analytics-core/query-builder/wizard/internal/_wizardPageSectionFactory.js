﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_wizardPageSectionFactory.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PageFactory } from '../pageFactory';
export class WizardPageSectionFactory extends PageFactory {
    registerMetadata(pageId, metadata) {
        super.registerMetadata(pageId, metadata);
        if (metadata.position === undefined)
            metadata.position = Object.keys(this.metadata).length - 1;
        if (metadata.recreate === undefined)
            metadata.recreate = false;
        if (metadata.disabledText === undefined)
            metadata.disabledText = '';
    }
}