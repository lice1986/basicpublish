﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\dataSourceEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { createViewModelGenerator } from '@devexpress/analytics-core/analytics-serializer-native';
export class DataSourceEditor extends Editor {
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('getEditorOptions', (dataSourceHelper, undoEngine, popupContaner) => this.getEditorOptions(dataSourceHelper, undoEngine, popupContaner))
            .getViewModel();
    }
    dispose() {
        super.dispose();
        this._getEditorOptions = null;
    }
    getEditorOptions(dataSourceHelper, undoEngine, popupContainer) {
        if (!this._getEditorOptions) {
            const _dataSourceHelper = ko.unwrap(dataSourceHelper);
            const items = ko.computed(() => _dataSourceHelper && _dataSourceHelper.usedDataSources());
            this._disposables.push(items);
            this._getEditorOptions = {
                items: items,
                value: _dataSourceHelper && _dataSourceHelper.dataSourceValue(this.value, undoEngine),
                valueExpr: 'name',
                displayExpr: _dataSourceHelper && _dataSourceHelper.dataSourceDisplayExpr,
                displayCustomValue: true,
                disabled: this.disabled,
                dropDownOptions: { container: popupContainer },
                popupPosition: { boundary: popupContainer },
                useItemTextAsTitle: true,
                inputAttr: { id: this.editorInputId }
            };
        }
        return this._getEditorOptions;
    }
}