﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\reportFieldListEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListEditor } from '@devexpress/analytics-core/analytics-widgets';
import { TreeListController } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
export class ReportFieldListEditor extends FieldListEditor {
    constructor(modelPropertyInfo, level, parentDisabled, textToSearch) {
        super(modelPropertyInfo, level, parentDisabled, textToSearch);
        this.treeListController = new ReportTreeListController();
        this._disposables.push(this.treeListController.selectedItemData.subscribe(newValue => {
            const model = this._get('_model');
            if (model['setDataMemberInfo'])
                model['setDataMemberInfo'](newValue);
        }));
    }
}
class ReportTreeListController extends TreeListController {
    constructor() {
        super(...arguments);
        this.selectedItemData = ko.observable();
    }
    select(value) {
        super.select(value);
        this.selectedItemData(this.selectedItem && this.selectedItem.data);
    }
}
