﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_collectionLookupEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export class CollectionLookupEditorModel extends Editor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
        this.array = ko.computed(() => { return this.value() || []; });
        this.selectedItem = ko.observable();
        this._disposables.push(this.array);
    }
    get editors() {
        const selectedItem = this.selectedItem();
        return selectedItem && selectedItem['getInfo'] && selectedItem['getInfo']();
    }
}