﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\formattingRuleEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { FormattingRule, FormattingRuleLink } from '../controls/properties/formattingrules';
export class FormattingRuleEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
        const rules = ko.pureComputed(() => {
            const model = this._get('_model');
            const formattingRuleSheet = model && model['root'] && model['root'].formattingRuleSheet || ko.observableArray();
            formattingRuleSheet().forEach((rule) => {
                this._disposables.push(rule.selected = ko.pureComputed({
                    read: () => {
                        return this.value()().filter((link) => { return link.value() === rule; }).length > 0;
                    },
                    write: (val) => {
                        if (val) {
                            this.value().push(FormattingRuleLink.createNew(rule));
                        }
                        else {
                            const link = this.value()().filter((itemLink) => { return itemLink.value() === rule; })[0];
                            this.value().remove(link);
                        }
                    }
                }));
            });
            return formattingRuleSheet;
        });
        this._disposables.push(rules);
        this.options = {
            addHandler: () => { return FormattingRule.createNew(this._get('_model')['root']); },
            values: rules,
            displayName: this._get('displayName'),
            level: this.level,
            info: this._get('info', 'wrapped')
        };
    }
}