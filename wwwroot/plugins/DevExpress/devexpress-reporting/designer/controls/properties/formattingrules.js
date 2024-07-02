﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\formattingrules.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getFullPath } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, getLocalization, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { addVariablesToExpressionEditor } from '../../internal/_addVariablesToExpressionEditor';
import { reportFunctionDisplay } from '../../widgets/customFunctions';
import { formattingRuleLinkSerializationsInfo, formattingRuleSerializationsInfo } from '../metadata/properties/formattingrules';
export class FormattingRule extends Disposable {
    constructor(model, parent, serializer) {
        super();
        this.className = () => {
            return 'formattingrule';
        };
        this.controlType = 'XRFormattingRule';
        this.selected = ko.observable(false);
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
        this.parent = parent || null;
        const path = ko.pureComputed(() => {
            const dsPath = this.getPath('');
            if (!!dsPath) {
                return getFullPath(dsPath, this.dataMember() || parent.dataMember());
            }
            else {
                return dsPath;
            }
        });
        this._disposables.push(path);
        this['conditionObj'] = {
            value: this.condition,
            path,
            functions: reportFunctionDisplay,
            customizeCategories: (_, categories, __) => { addVariablesToExpressionEditor(categories); }
        };
    }
    static createNew(report) {
        return new FormattingRule({}, report);
    }
    getInfo() {
        return formattingRuleSerializationsInfo;
    }
    getPath(propertyName) {
        return this.parent && this.parent.dsHelperProvider() && this.parent.dsHelperProvider().getDataSourcePath(this['dataSource']() || this.parent.dataSource());
    }
    displayType() {
        return getLocalization('Formatting Rule', 'DevExpress.XtraReports.UI.FormattingRule');
    }
}
export class FormattingRuleLink {
    constructor(model, serializer) {
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model);
    }
    static createNew(rule) {
        const link = new FormattingRuleLink({});
        link.value = ko.observable(rule);
        return link;
    }
    getInfo() {
        return formattingRuleLinkSerializationsInfo;
    }
}
