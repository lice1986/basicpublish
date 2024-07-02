﻿/**
* DevExpress Analytics (core\widgets\propertygrid\_controlProperties.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ObjectProperties } from '../../../property-grid/propertygrid';
import { Group } from './_group';
import { PopupService } from '../../../property-grid/internal/_popupService';
import { getImageClassName, getControlFullName } from '../../internal/_getNameHelpers';
import { searchPlaceholder } from '../../../property-grid/localization/_localization';
import dxTextBox from 'devextreme/ui/text_box';
import { Popover } from '../popover';
export class ControlProperties extends ObjectProperties {
    constructor(target, editorsInfo, level = 0, useAddons = true, useLocalizableDescriptions = true) {
        super(target, editorsInfo, level, undefined, undefined, ko.observable(''), useAddons && new PopupService(), useLocalizableDescriptions && new Popover());
        this.focusedItem = ko.observable();
        this.editorsRendered = ko.observable(false);
        this.isSortingByGroups = ko.observable(true);
        this.isSearching = ko.observable(false);
        this.allEditorsCreated = ko.observable(false);
        this.textToSearch = ko.observable('');
        this._searchBox = null;
        this.searchPlaceholder = () => searchPlaceholder();
        this.switchSearchBox = () => {
            if (this.isSearching()) {
                this.isSearching(false);
                this.textToSearch('');
            }
            else {
                this.isSearching(true);
                this._searchBox && this._searchBox.focus();
            }
        };
        this.createGroups(editorsInfo.groups);
        this.update(target());
        this._disposables.push(this.focusedImageClassName = ko.pureComputed(() => {
            return getImageClassName(target() && target().controlType);
        }));
        const subscription = this.isSortingByGroups.subscribe((newVal) => {
            if (!newVal) {
                this.editorsRendered(true);
                subscription.dispose();
            }
        });
        this._disposables.push(subscription);
        this.focusedItem = target;
        this._disposables.push(target.subscribe((newValue) => {
            if (this.isSearching() && !this.textToSearch())
                this.switchSearchBox();
        }));
        this.displayExpr = (value) => getControlFullName(value);
        let timeout = null;
        this._disposables.push(this.textToSearch.subscribe((newValue) => {
            timeout && clearTimeout(timeout);
            timeout = setTimeout(() => {
                this._textToSearch(newValue);
                newValue && this.groups.forEach(group => group.collapsed() && group.editors().some(editor => editor._get('isSearchedProperty')) && group.collapsed(false));
            }, 200);
        }));
    }
    getEditors() {
        const editors = super.getEditors();
        const editorNames = editors.map((editor) => { return editor._get('displayName'); }).sort();
        editors.sort((a, b) => {
            return editorNames.indexOf(a._get('displayName')) - editorNames.indexOf(b._get('displayName'));
        });
        return editors;
    }
    _update(target, editorsInfo, recreateEditors) {
        this.groups && this.groups.forEach((group) => {
            if (group.editors().length === 0)
                group.recreate();
        });
        return super._update(target, editorsInfo, recreateEditors);
    }
    cleanEditors() {
        super.cleanEditors();
        this.groups.forEach(x => x.resetEditors());
    }
    dispose() {
        super.dispose();
        this.disposeArray(this.groups);
        this.disposeObservableArray(this._get('_editors', 'wrapped'));
        this.resetObservableArray(this._get('_editors', 'wrapped'));
        this.cleanSubscriptions();
        this._searchBox = null;
        this.focusedItem = null;
    }
    createGroups(groups) {
        this.groups = Object.keys(groups).map((name) => {
            return new Group(name, groups[name].info, (serializationInfo) => {
                return serializationInfo
                    .filter(info => !!info.editor)
                    .map(info => {
                    let editor = this.findEditorByInfo(info);
                    if (editor)
                        return editor;
                    editor = this.createEditor(info);
                    this._get('_editors', 'wrapped').push(editor);
                    return editor;
                });
            }, true, groups[name].displayName);
        });
        this._disposables.push.apply(this._disposables, this.groups);
    }
    registerAccessibilityProvider(accessibilityProvider) {
        super.registerAccessibilityProvider(accessibilityProvider);
        this.groups.forEach((group) => {
            group.registerAccessibilityProvider(accessibilityProvider);
        });
    }
    searchBox($element) {
        this._searchBox = dxTextBox.getInstance($element.get(0));
    }
}
