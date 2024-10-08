﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_reportConverter.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { OperandProperty } from '@devexpress/analytics-core/analytics-criteria';
import { criteriaForEach, CriteriaOperatorStateMachine } from '@devexpress/analytics-core/analytics-criteria-utils';
import { PaddingModel } from '@devexpress/analytics-core/analytics-elements';
import { formatUnicorn } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { FilterEditorSerializer, FontModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { ExpressionWrapper } from '../dataObjects/expressions/_expressionWrapper';
import { BaseConverter } from './_baseConverter';
import { DataBindingMode } from './_dataBindingMode';
import { isControl, PromptBoolean } from './_utils';
export class ReportConverter extends BaseConverter {
    constructor(_controlsHelper, _undoEngine, _dataBindingMode = DataBindingMode.Expressions) {
        super();
        this._controlsHelper = _controlsHelper;
        this._undoEngine = _undoEngine;
        this._dataBindingMode = _dataBindingMode;
        this.convertChoiceEnum = {
            'Convert': 'Convert',
            'Cancel': 'Cancel'
        };
        this._formattingMapper = {
            '@BackColor': '@BackColor',
            '@Sides': '@Borders',
            '@BorderColor': '@BorderColor',
            '@BorderDashStyle': '@BorderDashStyle',
            '@BorderWidthSerializable': '@BorderWidth',
            '@ForeColor': '@ForeColor',
            '@Font': '@Font',
            '@Padding': '@Padding',
            '@TextAlignment': '@TextAlignment',
            '@Visible': '@Visible'
        };
        this._expressionsToControlMap = {};
        this._lastChoice = null;
        this._defaultFormatting = {};
        this._notShowAgain = ko.observable(false);
        this._detailLink = 'https://devexpress.github.io/dotnet-eud/interface-elements-for-web/articles/report-designer/bind-to-data/data-binding-modes.html';
        this._model = null;
        this._mapFontObj(this._defaultFormatting, new FontModel(ko.observable('')));
        this._mapPaddingObj(this._defaultFormatting, PaddingModel.from('0,0,0,0'));
        this.popupOptions.linkUrl = this._detailLink;
        this.popupOptions.confirmMessage = formatUnicorn(getLocalization('The {0} contains bindings. Do you want to convert them to expressions?', 'ReportStringId.UD_Msg_ConvertBindings'), getLocalization('Report', 'DevExpress.XtraReports.UI.XtraReport'));
        this.popupOptions.linkText = getLocalization('Learn more about the expressions...', 'ReportStringId.UD_Msg_ConvertBindings_LinkText');
        this.popupOptions.buttons.push({ toolbar: 'bottom', location: 'before', widget: 'dxCheckBox', options: { value: this._notShowAgain, text: getLocalization("Remember my choice and don't ask me again.", 'ReportStringId.UD_Msg_ConvertBindings_RememberMyChoice') } });
    }
    _mapRulesProperties(formatting) {
        const newFormatting = {};
        Object.keys(formatting).forEach((name) => {
            if (this._formattingMapper[name]) {
                newFormatting[this._formattingMapper[name]] = formatting[name];
            }
        });
        return newFormatting;
    }
    _hasBindings() {
        const allcontrols = this._controlsHelper.allControls();
        return allcontrols.map(x => ko.unwrap(x['dataBindings'])).filter(x => !!x).some(x => x.some(db => !!db.dataMember() || !!db.parameter()));
    }
    _hasFormattingRules() {
        return this._model.formattingRuleSheet().length > 0;
    }
    convert(model, convertBindingsToExpressions = PromptBoolean.Prompt) {
        if (!model.dataBindingMode) {
            this._model = model;
            model._dataBindingMode(this._dataBindingMode);
            if (this._dataBindingMode !== DataBindingMode.Bindings && this._controlsHelper) {
                const needConvert = this._hasBindings() || this._hasFormattingRules();
                if (convertBindingsToExpressions === PromptBoolean.False)
                    return this._cancel(needConvert ? DataBindingMode.Bindings : this._dataBindingMode);
                const canConvert = needConvert ? this._canConvertReport() : true;
                if (!canConvert)
                    return this._cancel();
                if (convertBindingsToExpressions === PromptBoolean.True || this._notShowAgain()) {
                    if (needConvert && this._lastChoice !== this.convertChoiceEnum.Cancel)
                        this._applyChanges();
                }
                else {
                    if (!needConvert) {
                        this._model = null;
                        this._expressionsToControlMap = {};
                    }
                    this.popupOptions.visible(needConvert);
                }
            }
        }
    }
    _generateStyleName(ruleName) {
        return ruleName;
    }
    _createBindingExpression(dataBinding, sumformat, condition) {
        if (dataBinding.propertyName() === 'Text' && sumformat) {
            condition = formatUnicorn(sumformat, condition);
        }
        if (dataBinding.propertyName() !== 'Text' && dataBinding.formatString()) {
            condition = formatUnicorn("FormatString('{0}', {1})", dataBinding.formatString(), condition);
        }
        return ExpressionWrapper.createExpression(dataBinding.propertyName(), 'BeforePrint', condition);
    }
    _tryToGenerateBindingExpressions(control, expressions, controlDataInfo) {
        const dataBindings = ko.unwrap(control['dataBindings']);
        let canConvertDataBindings = true;
        let sumformat = null;
        if (control['Summary'] && ko.unwrap(control['Summary']['Running']) !== 'None') {
            const summaryFunc = ko.unwrap(control['Summary']['Func']);
            if (summaryFunc === 'Custom')
                return false;
            sumformat = 'sum' + summaryFunc + '({0})';
        }
        if (!!dataBindings) {
            canConvertDataBindings = dataBindings.every(dataBinding => {
                let condition = '';
                if (dataBinding.dataSource() && controlDataInfo.dataSource !== dataBinding.dataSource()) {
                    return false;
                }
                else if (dataBinding.parameter()) {
                    condition = '[Parameters.' + dataBinding.parameter().name + ']';
                }
                else if (dataBinding.dataMember()) {
                    condition = dataBinding.dataMember();
                    if (controlDataInfo.dataMember) {
                        const prefix = controlDataInfo.dataMember + '.';
                        if (dataBinding.dataMember().indexOf(prefix) === 0) {
                            condition = dataBinding.dataMember().substring(prefix.length);
                        }
                    }
                    condition = '[' + condition + ']';
                }
                if (condition) {
                    expressions.push(this._createBindingExpression(dataBinding, sumformat, condition));
                }
                return true;
            });
        }
        return canConvertDataBindings;
    }
    _resetDataBindings(control) {
        const dataBindings = ko.unwrap(control['dataBindings']);
        if (!!dataBindings) {
            dataBindings.forEach(dataBinding => {
                let formatString = null;
                if (dataBinding.propertyName() === 'Text') {
                    formatString = control['textFormatString'] && control['textFormatString']();
                }
                dataBinding.resetValue();
                formatString && control['textFormatString'](formatString);
            });
        }
    }
    _mapPaddingObj(obj, padding) {
        obj['@Padding.Left'] = padding._get('left');
        obj['@Padding.Right'] = padding._get('right');
        obj['@Padding.Top'] = padding._get('top');
        obj['@Padding.Bottom'] = padding._get('bottom');
    }
    _mapFontObj(obj, font) {
        obj['@Font.Name'] = font.family();
        obj['@Font.Size'] = font.size();
        obj['@Font.Italic'] = font.modificators.italic();
        obj['@Font.Strikeout'] = font.modificators.strikeout();
        obj['@Font.Bold'] = font.modificators.bold();
        obj['@Font.Underline'] = font.modificators.underline();
    }
    _splitFontPropertyValue(formatting) {
        if (formatting['@Font']) {
            const font = new FontModel(ko.observable(formatting['@Font']));
            this._mapFontObj(formatting, font);
            delete formatting['@Font'];
        }
    }
    _splitPaddingPropertyValue(formatting) {
        if (formatting['@Padding']) {
            const padding = PaddingModel.from(formatting['@Padding']);
            this._mapPaddingObj(formatting, padding);
            delete formatting['@Padding'];
        }
    }
    _patchRuleCondition(condition, dataMember, controlDataMember) {
        if (!condition)
            return condition;
        const expression = CriteriaOperatorStateMachine.parse(condition);
        const processNames = [];
        criteriaForEach(expression, (operator, path) => {
            if (operator instanceof OperandProperty && path === dataMember) {
                processNames.push(() => {
                    let propertyName = [dataMember, operator.propertyName].join('.');
                    if (propertyName.indexOf(controlDataMember) === 0 && (propertyName.length === controlDataMember.length || propertyName[controlDataMember.length] === '.')) {
                        propertyName = propertyName.substr(controlDataMember.length + 1, propertyName.length);
                    }
                    operator.propertyName = propertyName;
                });
            }
        }, dataMember);
        processNames.forEach(x => x());
        return new FilterEditorSerializer().serialize(expression);
    }
    _tryToGenerateFormattingRulesExpressions(control, expressions, rules, controlDataInfo) {
        if (!control.formattingRuleLinks)
            return true;
        const conditions = {};
        const currentRules = $.extend(true, [], control.formattingRuleLinks().map(x => rules[x.value().name()]));
        const changedPropertiesWithDot = [];
        const canConvertFormattingRules = currentRules.every(rule => {
            if (controlDataInfo.dataSource !== rule.dataSource) {
                return false;
            }
            Object.keys(rule.formatting).forEach((name) => {
                if (name.indexOf('.') !== -1 && this._defaultFormatting[name] !== rule.formatting[name]) {
                    changedPropertiesWithDot.push(name);
                }
            });
            return true;
        });
        if (!canConvertFormattingRules) {
            return false;
        }
        currentRules.forEach((rule) => {
            if (rule.dataMember !== controlDataInfo.dataMember) {
                rule.condition = this._patchRuleCondition(rule.condition, rule.dataMember, controlDataInfo.dataMember);
            }
            Object.keys(rule.formatting).forEach((propertyName) => {
                const hasPoint = propertyName.indexOf('.') !== -1;
                if (!hasPoint || (hasPoint && changedPropertiesWithDot.indexOf(propertyName) !== -1)) {
                    if (!conditions[propertyName]) {
                        conditions[propertyName] = [];
                    }
                    conditions[propertyName].unshift(rule.condition, "'" + rule.formatting[propertyName] + "'");
                }
            });
            return true;
        });
        Object.keys(conditions).forEach((propertyName) => {
            expressions.push(this._createRuleExpression(conditions[propertyName], '?', propertyName.substring(1)));
        });
        return true;
    }
    _getControlDataSourceDataMember(control) {
        let dataSource = null, dataMember = null;
        while (!dataSource && control) {
            dataSource = dataSource || control['dataSource'] && control['dataSource']();
            dataMember = dataMember || control['dataMember'] && control['dataMember']();
            control = control.parentModel();
        }
        return { dataSource, dataMember };
    }
    _generateFormattingRulesDictionary() {
        const rules = {};
        this._model.formattingRuleSheet().forEach(rule => {
            const newRule = {
                condition: rule.condition(),
                formatting: this._mapRulesProperties(new ModelSerializer().serialize(rule['formatting'])),
                dataSource: rule.dataSource() || this._model.dataSource(),
                dataMember: rule.dataMember() || this._model.dataMember()
            };
            this._splitFontPropertyValue(newRule.formatting);
            this._splitPaddingPropertyValue(newRule.formatting);
            rules[rule.name()] = newRule;
        });
        return rules;
    }
    _createRuleExpression(collection, defaultVal, propertyName) {
        collection.push(defaultVal);
        return ExpressionWrapper.createExpression(propertyName, 'BeforePrint', 'iif(' + collection.join(',') + ')');
    }
    _canConvertReport() {
        const controls = this._controlsHelper.allControls()
            .filter(isControl);
        const rules = this._generateFormattingRulesDictionary();
        this._expressionsToControlMap = {};
        return controls.every((control) => {
            const controlName = ko.unwrap(control.name);
            this._expressionsToControlMap[controlName] = [];
            const controlDataInfo = this._getControlDataSourceDataMember(control.parentModel && control.parentModel() || control);
            return this._tryToGenerateBindingExpressions(control, this._expressionsToControlMap[controlName], controlDataInfo) &&
                this._tryToGenerateFormattingRulesExpressions(control, this._expressionsToControlMap[controlName], rules, controlDataInfo);
        });
    }
    _applyChanges() {
        this._lastChoice = this.convertChoiceEnum.Convert;
        const controls = this._controlsHelper.allControls()
            .filter(isControl);
        this._model.formattingRuleSheet.removeAll();
        controls.forEach((control) => {
            control.formattingRuleLinks && control.formattingRuleLinks.removeAll();
            const controlName = ko.unwrap(control.name);
            this._resetDataBindings(control);
            const expressions = this._expressionsToControlMap[controlName];
            if (expressions.length > 0) {
                control.expressionBindings(expressions);
            }
        });
        this.popupOptions.visible(false);
        this._undoEngine().clearHistory();
        this._undoEngine().isDirty(true);
        this._expressionsToControlMap = null;
        this._model = null;
    }
    _cancel(mode = DataBindingMode.Bindings) {
        this._lastChoice = this.convertChoiceEnum.Cancel;
        this._model._dataBindingMode(mode);
        this._model = null;
        this._expressionsToControlMap = {};
        this.popupOptions.visible(false);
    }
}
