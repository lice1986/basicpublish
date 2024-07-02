﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_bandLevelEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { UndoEditor } from '@devexpress/analytics-core/queryBuilder-widgets-internal';
import * as ko from 'knockout';
export class BandLevelEditor extends UndoEditor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
        this.min = 0;
        this._disposables.push(this.max = ko.pureComputed(() => {
            const model = this._get('_model');
            if (model && model.maxLevel)
                return model.maxLevel;
            return model && model.getModel && model.getModel() && model.getModel().maxLevel;
        }));
    }
}