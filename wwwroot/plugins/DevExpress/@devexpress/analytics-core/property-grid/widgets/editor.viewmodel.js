﻿/**
* DevExpress Analytics (property-grid\widgets\editor.viewmodel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createViewModelGenerator } from '../../serializer/native/viewModels/viewModelGenerator';
import { getParentContainer } from '../../widgets/_utils';
import { getLocalization } from '../localization/_localization';
export function createViewModel(viewModel) {
    let collapsedChangedEvent = undefined;
    const model = createViewModelGenerator(viewModel)
        .generateProperty('getOptions', (options) => {
        return this.getOptions(Object.assign({ onValueChanged: (e) => {
                this._set('value', e.value);
            } }, options));
    })
        .generateProperty('onValueChanged', (e) => {
        this._set('value', e.value);
    })
        .generateProperty('getPopupContainer', getParentContainer)
        .generateProperty('setCollapsed', (val) => {
        this._set('collapsed', val);
    })
        .generateProperty('editorOptions', this.unwrap(this.editorOptions))
        .generateProperty('extendedOptions', this._getExtendedOptions())
        .generateProperty('getCollapsed', () => this._get('collapsed'))
        .generateProperty('setCollapsedChangedEvent', (callback) => {
        collapsedChangedEvent = callback;
        return () => collapsedChangedEvent = undefined;
    })
        .generateProperty('editorCreated', this.unwrap(this.editorCreated))
        .generateProperty('getLocalization', getLocalization)
        .generateProperty('getValidatorOptions', (options) => this.getValidatorOptions(options))
        .generateProperty('onCustomItemCreating', (arg) => ({ value: arg.text, displayValue: arg.text }))
        .generateProperty('value', this.unwrap(this.value))
        .generateProperty('disabled', this.unwrap(this.disabled))
        .generateProperty('displayName', this.unwrap(this.displayName))
        .generateProperty('description', this.unwrap(this.description))
        .generateProperty('editorDescriptionAddon', this.editorDescriptionAddon)
        .generateProperty('validationRules', this.unwrap(this.validationRules))
        .generateProperty('validatorOptions', this.unwrap(this.validatorOptions))
        .generateProperty('level', this.unwrap(this.level))
        .generateProperty('padding', this.unwrap(this.padding))
        .generateProperty('editorInputId', this.editorInputId)
        .generateProperty('values', this.unwrap(this.values))
        .generateProperty('info', this.unwrap(this.info))
        .generateProperty('templateName', this.unwrap(this.templateName))
        .generateProperty('contentTemplateName', this.unwrap(this.contentTemplateName))
        .generateProperty('editorTemplate', this.unwrap(this.editorTemplate))
        .generateProperty('isPropertyHighlighted', this.unwrap(this.isPropertyHighlighted))
        .generateProperty('collapsed', this.unwrap(this.collapsed))
        .generateProperty('isComplexEditor', this.isComplexEditor)
        .generateProperty('headerId', this.headerId)
        .generateProperty('contentId', this.contentId)
        .generateProperty('alwaysShow', this.unwrap(this.alwaysShow))
        .generateProperty('textToSearch', this.unwrap(this.textToSearch))
        .generateProperty('isRequired', this.isRequired)
        .generateProperty('isPropertyModified', this.unwrap(this.isPropertyModified))
        .generateProperty('visible', this.unwrap(this.visible))
        .generateProperty('setIsRendered', (val) => this.setIsRendered(val))
        .getViewModel();
    this.subscribeOnChanges(model, [
        'value',
        'disabled',
        'displayName',
        'validationRules',
        'validatorOptions',
        'level',
        'padding',
        'values',
        'info',
        'templateName',
        'isPropertyHighlighted',
        'textToSearch',
        'collapsed',
        'alwaysShow',
        'isPropertyModified',
        'editorOptions',
        'editorCreated',
        'visible'
    ]);
    this.addDisposable(this.subscribeProperty('collapsed', (newVal) => {
        collapsedChangedEvent && collapsedChangedEvent();
    }));
    return model;
}
