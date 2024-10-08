﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\propertyGridEditors.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { FieldListEditor, ObjectProperties, PropertyGridEditor } from '@devexpress/analytics-core/analytics-widgets';
import { FontModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { fontInfo } from '@devexpress/analytics-core/analytics-widgets-metadata';
import * as ko from 'knockout';
import { dataBindingsSerializationInfo } from '../controls/metadata/properties/dataBindings';
import { FormatStringService } from '../services/_formatStringService';
import { formatStringEditorCustomSet } from '../utils/settings';
import './editorTemplates';
export class ContentByTypeEditor extends PropertyGridEditor {
    createObjectProperties() {
        return new ObjectProperties(this._getViewModel(), undefined, this.level + 1, this._get('disabled', 'wrapped'), undefined, this.textToSearch);
    }
    _getViewModel() {
        this.hideCollapsingButton = ko.observable();
        const value = ko.computed(() => {
            const content = this.value() && this.value().content();
            const visibleItems = (content === null || content === void 0 ? void 0 : content.getInfo) && (content === null || content === void 0 ? void 0 : content.getInfo().filter(x => !!x.editor));
            this.hideCollapsingButton(!(visibleItems === null || visibleItems === void 0 ? void 0 : visibleItems.length));
            return this.value() && this.value().content();
        });
        this._disposables.push(value);
        return value;
    }
}
export class DataBindingsEditor extends PropertyGridEditor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
    }
    createObjectProperties() {
        const model = ko.pureComputed(() => {
            const obj = {};
            obj.isPropertyModified = (name) => {
                return !obj[name].isEmpty();
            };
            obj.actions = [{
                    action: (propertyName) => { obj[propertyName].resetValue(); },
                    title: getLocalization('Reset', 'AnalyticsCoreStringId.PropertyGrid_PopupMenu_Reset'),
                    visible: () => { return true; }
                }];
            const databindings = this.value()();
            (databindings || []).map((value) => { obj[value.propertyName()] = value; });
            return obj;
        });
        this._disposables.push(model);
        return new ObjectProperties(model, { editors: dataBindingsSerializationInfo }, this.level + 1, this._get('disabled', 'wrapped'), undefined, this.textToSearch);
    }
}
export class DataBindingEditor extends FieldListEditor {
    get actions() { return FormatStringService.actions; }
    get customPatterns() { return formatStringEditorCustomSet(); }
}
export class FontEditorUndo extends PropertyGridEditor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
    }
    generateValue(undoEngine) {
        this.undoEngine = undoEngine;
        return this.viewmodel;
    }
    createObjectProperties() {
        const undoValue = ko.computed({
            read: () => {
                return this.value();
            },
            write: (val) => {
                this.undoEngine && this.undoEngine().start();
                this.value(val);
                this.undoEngine && this.undoEngine().end();
            }
        });
        this._disposables.push(undoValue);
        const model = new FontModel(undoValue);
        this._disposables.push(model);
        return new ObjectProperties(ko.observable(model), { editors: fontInfo }, this.level + 1, this._get('disabled', 'wrapped'), undefined, this.textToSearch);
    }
}
