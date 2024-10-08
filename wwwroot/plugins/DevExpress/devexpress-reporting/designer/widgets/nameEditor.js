﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\nameEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { formatUnicorn } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import { requiredValidationRules } from '@devexpress/analytics-core/analytics-widgets-internal';
import { createViewModelGenerator } from '@devexpress/analytics-core/analytics-serializer-native';
import * as ko from 'knockout';
import * as $ from 'jquery';
import { WatermarkModel } from '../controls/properties/watermark';
export class NameEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
        this.currentValidationRules = ko.observable(super._getEditorValidationRules());
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('generateRules', (controls) => this.generateRules(controls))
            .getViewModel();
    }
    _getEditorValidationRules() {
        return this.currentValidationRules();
    }
    _filterControls(controls) {
        return controls.filter(x => !(x instanceof WatermarkModel));
    }
    generateRules(allControls) {
        const self = this;
        if (self._get('disabled'))
            return [];
        const notUniqueMessageTemplate = getLocalization('{0} is not unique', 'ASPxReportsStringId.ReportDesigner_NameUniqueError');
        const validationMessage = formatUnicorn(notUniqueMessageTemplate, ko.unwrap(self.displayName));
        this.currentValidationRules([
            {
                type: 'custom',
                message: validationMessage,
                validationCallback: (options) => {
                    if (options.value == null)
                        return false;
                    const model = self._get('_model');
                    const controls = this._filterControls(allControls());
                    return controls.filter(x => {
                        if (ko.unwrap(x.name).toLowerCase() !== options.value.toLowerCase())
                            return false;
                        if (!model || x === model)
                            return false;
                        const same = model['isSame'];
                        if (same && $.isFunction(same) && same(x))
                            return false;
                        return true;
                    }).length === 0;
                }
            },
            ...super._getEditorValidationRules(),
            ...requiredValidationRules
        ]);
        return this.currentValidationRules();
    }
}
