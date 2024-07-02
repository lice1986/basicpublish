﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\_summaryEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FunctionOperator } from '@devexpress/analytics-core/analytics-criteria';
import { CriteriaOperatorStateMachine } from '@devexpress/analytics-core/analytics-criteria-utils';
import { getParentContainer, NotifyAboutWarning } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, getLocalization, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
import { FilterEditorSerializer } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { createSummarySerializationInfo, getSummaryFunctionValues } from '../controls/metadata/properties/metadata';
import { WrappedExpressionOptions } from '../dataObjects/expressions/_wrappedExpressionOptions';
import { designerEditorTemplates } from './editorTemplates';
export class SummaryEditorPopup {
    constructor() {
        this.model = ko.observable(null);
        this.grid = new ObjectProperties(this.model);
        this.visible = ko.observable(false);
        this.isValid = ko.computed(() => this.model() && (!this.model().calculate.isValid() || !this.model().weight.isValid()));
        this.container = (element) => getParentContainer(element);
        this.buttons = [
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: getLocalization('Apply', ''), type: 'default', stylingMode: 'contained', onClick: () => {
                        this.model().applyChanges();
                        this.visible(false);
                    },
                    disabled: this.isValid
                }
            },
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'), type: 'normal', stylingMode: 'contained', onClick: () => {
                        this.visible(false);
                    }
                }
            }
        ];
    }
    dispose() {
        this.buttons = [];
        this.grid.dispose();
        this.model(null);
        this.isValid.dispose();
    }
}
export class SummaryEditorModel extends Disposable {
    constructor(_control) {
        super();
        this._control = _control;
        this._order = ['Running', 'Func', 'calculate', 'weight', 'ignoreNullValues', 'treatStringsAsNumerics'];
        this._summaryFunctionValues = getSummaryFunctionValues().map(x => {
            return {
                value: 'sum' + x.value,
                displayValue: x.displayValue,
                localizationId: x.localizationId
            };
        }).concat([{ value: 'sumWAvg', displayValue: 'Weighted average', localizationId: 'ReportStringId.WAvgDisplayName' }]);
        this._info = createSummarySerializationInfo(this._summaryFunctionValues).concat([
            { propertyName: 'calculate', editor: designerEditorTemplates.getEditor('reportexpression'), displayName: 'Argument Expression', localizationId: 'ASPxReportsStringId.ReportDesigner_SummaryEditor_ArgumentExpression' },
            { propertyName: 'weight', editor: designerEditorTemplates.getEditor('reportexpression'), displayName: 'Weight', localizationId: 'ASPxReportsStringId.ReportDesigner_SummaryEditor_Weight' }
        ]).sort((a, b) => this._order.indexOf(a.propertyName) - this._order.indexOf(b.propertyName));
        this.Func = ko.observable('sumSum');
        this._disposables.push(this.calculate = new WrappedExpressionOptions({ value: ko.observable('') }));
        this._disposables.push(this.weight = new WrappedExpressionOptions({ value: ko.observable('') }));
        this._summary = this._control['Summary'];
        const ignoreNullValues = this._info.filter(info => info.propertyName === 'ignoreNullValues')[0];
        this.patchSerializationInfo(ignoreNullValues);
        ignoreNullValues.editorOptions.elementAttr = { class: 'dxrd-first-checkbox' };
        this.patchSerializationInfo(this._info.filter(info => info.propertyName === 'treatStringsAsNumerics')[0]);
        this._initExpressionValues();
        this.ignoreNullValues = ko.observable(this._summary.ignoreNullValues());
        this.treatStringsAsNumerics = ko.observable(this._summary.treatStringsAsNumerics());
        this.Running = ko.observable(this._summary.Running());
        this._disposables.push(this.calculate.path = ko.computed(() => this._control.getPath('expression')));
        this._disposables.push(this.weight.path = ko.computed(() => this._control.getPath('expression')));
    }
    dispose() {
        super.dispose();
        this._control = null;
        this._summary = null;
    }
    _initExpressionValues() {
        const textBinding = this._control.getExpressionBinding('Text');
        if (!textBinding)
            return;
        let leftPart = textBinding;
        try {
            const expression = CriteriaOperatorStateMachine.parse(textBinding);
            if (expression instanceof FunctionOperator && this._summaryFunctionValues.some(x => x.value === expression.displayType)) {
                const serializer = new FilterEditorSerializer();
                this.Func(expression.displayType);
                leftPart = expression.leftPart && serializer.serialize(expression.leftPart);
                this.weight.value(this.Func() === 'sumWAvg' ? expression.rightPart[0] && serializer.serialize(expression.rightPart[0]) : '');
            }
        }
        catch (e) {
            NotifyAboutWarning(e.message);
        }
        this.calculate.value(leftPart);
    }
    getInfo() {
        return this._info;
    }
    patchSerializationInfo(info) {
        const displayName = info.displayName;
        const localizationId = info.localizationId;
        info.editorOptions = {
            text: getLocalization(displayName, localizationId)
        };
        info.displayName = undefined;
        info.localizationId = undefined;
    }
    applyChanges() {
        const undoEngine = UndoEngine.tryGetUndoEngine(this._control);
        undoEngine && undoEngine.start();
        let result = '';
        this._summary.Running(this.Running());
        if (this.isDisabled()) {
            result = this.calculate.value();
        }
        else {
            this._summary.ignoreNullValues(this.ignoreNullValues());
            this._summary.treatStringsAsNumerics(this.treatStringsAsNumerics());
            result = this.Func() + '(' + this.calculate.value() + (this.weight.value() ? ', ' + this.weight.value() : '') + ')';
        }
        this._control.getDefaultBinding().value(result);
        undoEngine && undoEngine.end();
    }
    isPropertyDisabled(propertyName) {
        if (this.isDisabled()) {
            return propertyName !== 'Running';
        }
        return propertyName === 'weight' && this.Func() !== 'sumWAvg';
    }
    isDisabled() { return this.Running() === 'None'; }
}
