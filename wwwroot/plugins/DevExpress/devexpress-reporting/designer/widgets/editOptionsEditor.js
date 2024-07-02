﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\editOptionsEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { EditingFieldExtensions } from '../../common/utils/editingFieldExtensions';
export class EditOptionsEditorNameEditorModel extends Editor {
    constructor(modelPropertyInfo, level, parentDisabled, textToSearch) {
        super(modelPropertyInfo, level, parentDisabled, textToSearch);
        this.displayValue = ko.observable('');
        const extesions = EditingFieldExtensions.instance();
        const editorOptions = modelPropertyInfo.editorOptions;
        let categoriesToFilter = [];
        if (editorOptions) {
            categoriesToFilter = editorOptions.categories || extesions.categories(editorOptions.excludeCategories);
        }
        this.itemsProvider = {
            getItems: (path) => {
                const editorSet = extesions.editors();
                const filteredEditorSet = !categoriesToFilter
                    ? editorSet
                    : editorSet.filter(e => categoriesToFilter.indexOf(e.category) !== -1);
                const editorMembers = filteredEditorSet.map(item => {
                    const mask = item.options && item.options['mask'];
                    return {
                        name: item.name,
                        displayName: item.displayName,
                        specifics: '_none_',
                        templateName: 'dxrd-editingField-editor-treelist-item',
                        title: item.displayName + (mask ? ' [' + mask + ']' : '')
                    };
                });
                return $.Deferred().resolve(editorMembers).promise();
            }
        };
        const editor = extesions.editor(this.value());
        if (editor) {
            this.value(editor.name);
            this.displayValue(editor.displayName);
        }
        this.value.subscribe(newValue => {
            const editor = extesions.editor(newValue);
            if (editor) {
                this.value(editor.name);
                this.displayValue(editor.displayName);
                return;
            }
            this.displayValue('');
            this.value('');
        });
    }
}