﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_chartDependencyEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
export class ChartDependencyEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
    }
    getDependencyOptions(templateOptions, propertyName, depPropertyName) {
        if (!this.bindableOptions) {
            const debObj = {};
            this.depProperty = ko.computed(() => {
                const model = this._get('_model');
                return model && model[depPropertyName]();
            });
            this._disposables.push(this.depProperty);
            debObj[propertyName] = this.depProperty;
            this.bindableOptions = $.extend({}, this.getOptions(templateOptions), debObj);
        }
        return this.bindableOptions;
    }
}
