﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\_groupEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createViewModelGenerator } from '@devexpress/analytics-core/analytics-serializer-native';
import { PropertyGridEditor } from '@devexpress/analytics-core/analytics-widgets-native';
export class ParametersGroupEditor extends PropertyGridEditor {
    constructor() {
        super(...arguments);
        this.isGroupLabel = true;
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('isGroupLabel', this.isGroupLabel)
            .generateProperty('hideBorder', this.editorOptions.borderVisible === false)
            .generateProperty('hideEditorHeader', !this.editorOptions.titleVisible)
            .generateProperty('showHorizontally', this.editorOptions.orientation === 'Horizontal')
            .getViewModel();
    }
    _setPadding(position, value) {
        const padding = super._setPadding(position, value);
        padding['padding-' + position] = 10;
        padding['padding-bottom'] = 6;
        return padding;
    }
    createObjectProperties() {
        const editorOptions = this.editorOptions;
        this._set('collapsed', !editorOptions.expanded && editorOptions.titleVisible);
        this.hideEditorHeader = !editorOptions.titleVisible;
        this._set('alwaysShow', !editorOptions.showExpandButton);
        this.hideBorder = editorOptions.borderVisible === false;
        this.showHorizontally = editorOptions.orientation === 'Horizontal';
        this.level = -1;
        this._set('editorCreated', true);
        return super.createObjectProperties();
    }
}
