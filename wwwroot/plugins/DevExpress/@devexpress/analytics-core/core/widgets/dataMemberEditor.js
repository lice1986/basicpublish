﻿/**
* DevExpress Analytics (core\widgets\dataMemberEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListEditor } from './fieldListEditor';
import { DataMemberTreeListController } from './_dataMemberEditor';
export class DataMemberEditor extends FieldListEditor {
    constructor(modelPropertyInfo, level, parentDisabled, textToSearch) {
        super(modelPropertyInfo, level, parentDisabled, textToSearch);
        this.treeListController = new DataMemberTreeListController();
        this._disposables.push(this.treeListController);
    }
}