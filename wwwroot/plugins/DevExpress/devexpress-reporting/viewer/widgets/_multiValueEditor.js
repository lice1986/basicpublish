﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\_multiValueEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createViewModelGenerator } from '@devexpress/analytics-core/analytics-serializer-native';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils-native';
import { Editor } from '@devexpress/analytics-core/analytics-widgets-native';
import { formatUnicorn, getParentContainer, selectPlaceholder } from '@devexpress/analytics-core/analytics-internal-native';
export class MultiValueEditor extends Editor {
    constructor() {
        super(...arguments);
        this._multiValueEditorSubscriptions = [];
    }
    _createMultiValueEditorValueViewModel(currentValue) {
        this._multiValueEditorSubscriptions.forEach(x => x());
        const viewModel = createViewModelGenerator()
            .createDefaultModel(currentValue)
            .generateProperty('value', currentValue.value)
            .generateProperty('disabled', this._get('disabled'))
            .generateProperty('displayName', this._get('displayName'))
            .generateProperty('dataSource', currentValue.dataSource)
            .generateProperty('items', currentValue.items)
            .generateProperty('displayExpr', 'displayValue')
            .generateProperty('editorInputId', this.editorInputId)
            .generateProperty('getOptions', (options) => {
            return Object.assign(Object.assign({}, this.getOptions(options)), { onValueChanged: (e) => {
                    currentValue.value = e.value;
                }, onMultiTagPreparing: (args) => {
                    const selectedItemsLength = args.selectedItems.length, totalCount = currentValue.items.length;
                    if (selectedItemsLength === totalCount) {
                        const stringFormat = getLocalization('All selected ({0})', 'ASPxReportsStringId.WebDocumentViewer_MultiValueEditor_AllSelected');
                        args.text = formatUnicorn(stringFormat, selectedItemsLength);
                    }
                } });
        })
            .generateProperty('getPopupContainer', getParentContainer)
            .generateProperty('maxDisplayedTags', currentValue.maxDisplayedTags)
            .generateProperty('placeholder', selectPlaceholder())
            .generateProperty('searchExpr', ['displayValue'])
            .generateProperty('selectAllText', getLocalization('Select All', 'AnalyticsCoreStringId.SelectAll'))
            .generateProperty('validationRules', this.validationRules)
            .generateProperty('valueExpr', 'value')
            .getViewModel();
        this._multiValueEditorSubscriptions.push(currentValue.events.on('valueChanged', x => viewModel.value = currentValue.value), this.subscribeProperty('disabled', (x) => viewModel.disabled = x), this.subscribeProperty('displayName', (x) => viewModel.displayName = x));
        return viewModel;
    }
    createViewModel() {
        const currentValue = this._get('value');
        const viewModel = createViewModelGenerator(super.createViewModel())
            .generateProperty('value', this._createMultiValueEditorValueViewModel(currentValue))
            .getViewModel();
        this.destroyPropertySubscription('value');
        this.addDisposable(this.subscribeProperty('value', (x) => {
            const viewModel = this.getViewModel();
            viewModel.value = this._createMultiValueEditorValueViewModel(this._get('value'));
        }));
        return viewModel;
    }
    dispose() {
        super.dispose();
        this._multiValueEditorSubscriptions.forEach(x => x());
        this._multiValueEditorSubscriptions = [];
    }
}
