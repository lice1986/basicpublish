﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_wrappedWizardPageSection.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _WrappedWizardPage } from '../pages/__wrappedWizardPage';
export class WrappedWizardPageSection extends _WrappedWizardPage {
    constructor(pageId, page, metadata) {
        super(pageId, page, metadata.template, metadata.description);
        this.pageId = pageId;
        this.page = page;
        if (page.onChange) {
            this.onChange = (callback) => {
                page.onChange(() => {
                    callback();
                    metadata.onChange && metadata.onChange();
                });
            };
        }
    }
}
