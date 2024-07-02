﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\summaryEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PropertyGridEditor } from '@devexpress/analytics-core/analytics-widgets';
import { DataBindingMode } from '../internal/_dataBindingMode';
import { SummaryEditorModel, SummaryEditorPopup } from './_summaryEditor';
export class SummaryEditor extends PropertyGridEditor {
    constructor() {
        super(...arguments);
        this.popup = new SummaryEditorPopup();
    }
    dispose() {
        super.dispose();
        this.popup.dispose();
        this.summaryModel && this.summaryModel.dispose();
    }
    getPopupServiceActions() {
        let actions = super.getPopupServiceActions();
        actions = actions && actions.length > 0 ? [].concat([{
                action: () => {
                    this.summaryModel && this.summaryModel.dispose();
                    const model = this._get('_model');
                    this.summaryModel = new SummaryEditorModel(model['getModel'] && model['getModel']() || model);
                    this.popup.model(this.summaryModel);
                    this.popup.visible(true);
                },
                title: 'Run Editor',
                visible: (propertyName) => {
                    const _model = this._get('_model');
                    const model = _model && _model['getModel'] && _model['getModel']() || _model;
                    return this._get('visible') && model && model['dataBindingMode'] !== DataBindingMode.Bindings;
                }
            }], actions) : [];
        return actions;
    }
}