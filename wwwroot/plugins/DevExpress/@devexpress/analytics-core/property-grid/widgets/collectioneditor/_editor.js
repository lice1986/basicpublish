﻿/**
* DevExpress Analytics (property-grid\widgets\collectioneditor\_editor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { propertiesGridEditorsPaddingLeft } from '../internal/_internal';
import { getLocalization } from '../../localization/localization_utils';
import { ListKeyboardHelper } from '../../../accessibility/_listKeyboardHelper';
import { guid } from '../../../undo-engine/_utils';
import { BaseRenderingModel, mutable, mutableArray } from '../../../serializer/native/models/base.model';
import { createViewModelGenerator } from '../../../serializer/native/viewModels/viewModelGenerator';
import { ObjectProperties } from '../../propertygrid';
import { generateIconTemplate } from '../../../core/widgets/_generateIconTemplate';
import { AccordionKeyboardHelper } from '../../../accessibility/_accordionKeyboardHelper';
import { koUtils } from '../../../core/utils/_koUtils';
import { currentMultiPlatformEngine } from '../../../serializer/native/multiplatformEngine';
export function wrapOptions(editorViewModel) {
    const editor = editorViewModel.getModel();
    const getOptionsInfoProperty = (propertyName) => !propertyName ? editorViewModel.info
        : editorViewModel.info && editorViewModel.info[propertyName];
    const addHandler = () => (getOptionsInfoProperty('addHandler')).call(this);
    return {
        values: [...editor.value],
        addHandler: () => {
            return addHandler();
        },
        onValueChanged: (array, args) => {
            editor._set('value', [...array]);
        },
        info: editorViewModel.info,
        level: editorViewModel.level, displayName: getLocalization(editorViewModel.displayName)
    };
}
function createCollectionEditorViewModelItem(x, i, editor) {
    let collapsedChangedEvent = undefined;
    const disabled = currentMultiPlatformEngine.wrap(editor.disabled);
    let objectProperties = null;
    new ObjectProperties(x, undefined, editor.level + 1, disabled);
    const viewModel = createViewModelGenerator()
        .createDefaultModel({
        disabled
    })
        .generateProperty('index', i)
        .generateProperty('disabled', editor.disabled)
        .generateProperty('level', editor.level)
        .generateProperty('name', editor.displayPropertyName && x[editor.displayPropertyName] ? koUtils.unwrap(x[editor.displayPropertyName]) : i)
        .generateProperty('select', (e, f) => editor.select(e, f))
        .generateProperty('padding', editor.padding)
        .generateProperty('selected', i === editor.selectedIndex)
        .generateProperty('collapsed', true)
        .generateProperty('setCollapsed', (val) => {
        viewModel.collapsed = val;
        collapsedChangedEvent();
    })
        .generateProperty('getProperties', (options) => {
        var _a, _b, _c;
        if (!objectProperties) {
            objectProperties = new ObjectProperties(x, (_a = options === null || options === void 0 ? void 0 : options.editorsInfo) !== null && _a !== void 0 ? _a : undefined, (_b = options === null || options === void 0 ? void 0 : options.level) !== null && _b !== void 0 ? _b : editor.level + 1, (_c = options === null || options === void 0 ? void 0 : options.disabled) !== null && _c !== void 0 ? _c : disabled);
            editor._disposables.push(objectProperties);
        }
        return objectProperties.getViewModel();
    })
        .generateProperty('getCollapsed', () => viewModel.collapsed)
        .generateProperty('setCollapsedChangedEvent', (callback) => {
        collapsedChangedEvent = callback;
        return () => collapsedChangedEvent = undefined;
    })
        .generateProperty('value', x)
        .getViewModel();
    if (koUtils.isSubscribable(x[editor.displayPropertyName])) {
        editor._disposables.push(x[editor.displayPropertyName].subscribe(() => {
            viewModel.name = koUtils.unwrap(x[editor.displayPropertyName]);
        }));
    }
    else if (typeof x === 'object' && 'events' in x) {
        const model = x;
        editor.addDisposable(model.events.on(`${editor.displayPropertyName}Changed`, (args) => {
            if (args.propertyName === editor.displayPropertyName)
                viewModel.name = x[editor.displayPropertyName];
        }));
    }
    return viewModel;
}
export class CollectionEditorViewModel extends BaseRenderingModel {
    constructor(options, disabled = false) {
        super();
        this.buttonMap = {
            'delete': { text: 'Delete', iconClass: 'dx-image-remove', localizationId: 'AnalyticsCoreStringId.Cmd_Delete' },
            'add': { text: 'Add', iconClass: 'dx-image-add', localizationId: 'DataAccessUIStringId.Button_Add' },
            'down': { text: 'Move Down', iconClass: 'dx-image-movedown', localizationId: 'AnalyticsCoreStringId.Cmd_MoveDown' },
            'up': { text: 'Move Up', iconClass: 'dx-image-moveup', localizationId: 'AnalyticsCoreStringId.Cmd_MoveUp' }
        };
        const getOptionsInfoProperty = (propertyName) => !propertyName ? options.info
            : options.info && options.info[propertyName];
        const info = getOptionsInfoProperty();
        this.collapsed = options.collapsed !== false;
        this.addHandler = () => (options.addHandler || getOptionsInfoProperty('addHandler')).call(this);
        this.removeHandler = (item, index) => {
            if (options.removeHandler)
                options.removeHandler(item, index);
            else
                this.values.splice(index, 1);
        };
        this.values = options.values;
        this.hideButtons = options.hideButtons || getOptionsInfoProperty('hideButtons');
        this.showButtons = !koUtils.unwrap(this.hideButtons) && !this.collapsed;
        if (koUtils.isSubscribable((this.hideButtons))) {
            this._disposables.push(this.hideButtons.subscribe((newVal) => {
                this.showButtons = !koUtils.unwrap(this.hideButtons) && !this.collapsed;
            }));
        }
        this._textEmptyArray = options.textEmptyArray || { text: 'To create an item click the Add button.', localizationId: 'AnalyticsCoreStringId.SqlDSWizard_PageConfigureParametersEmpty' };
        this.displayPropertyName = getOptionsInfoProperty('displayPropertyName');
        this.showScroll = !!options.showScroll;
        const _isDisabled = (selectedIndex, name) => {
            if (options.isDisabledButton) {
                return options.isDisabledButton(selectedIndex, name);
            }
            else if (name === 'delete') {
                return selectedIndex === null;
            }
            else if (name === 'add') {
                return false;
            }
            else if (name === 'up') {
                return selectedIndex === null || selectedIndex === 0;
            }
            else if (name === 'down') {
                return selectedIndex === null || selectedIndex === (this.values.length - 1);
            }
        };
        this.isDisabledButton = (name) => {
            return this.disabled || _isDisabled(this.selectedIndex, name);
        };
        this.isVisibleButton = (name) => {
            if (!this.showButtons) {
                return false;
            }
            else
                return options.isVisibleButton ? options.isVisibleButton(this.selectedIndex, name) : true;
        };
        this.level = options.level !== void 0 ? options.level : 0;
        this.padding = this.level * propertiesGridEditorsPaddingLeft();
        this.displayName = info ? getLocalization(info.displayName, info.localizationId) : options.displayName;
        this.options = options;
        if (!options.displayName) {
            this.collapsed = false;
            this.alwaysShow = true;
        }
        if (options.alwaysShow)
            this.alwaysShow = true;
        const selectedItem = koUtils.unwrap(options.selectedItem);
        if (selectedItem) {
            this._setSelectedIndex(selectedItem);
            this._disposables.push(options.selectedItem.subscribe((newVal) => {
                this._setSelectedIndex(newVal);
            }));
        }
        this.disabled = disabled;
        this.listKeyboardHelper = new ListKeyboardHelper();
        this.keyboardHelper = new AccordionKeyboardHelper(() => this.getViewModel());
        this.headerId = `dxrd-ce-trigger-${guid()}`;
        this.contentId = `dxrd-ce-pannel-${guid()}`;
    }
    deferredUpdateViewModel() { return false; }
    createViewModel() {
        let collapsedChangedEvent = undefined;
        const generateButtonViewModel = (buttonName) => {
            return createViewModelGenerator()
                .generateProperty('action', (e) => this[buttonName](e))
                .generateProperty('disabled', this.isDisabledButton(buttonName))
                .generateProperty('text', this.getDisplayTextButton(buttonName))
                .generateProperty('visible', this.isVisibleButton(buttonName))
                .generateProperty('template', generateIconTemplate(this.buttonMap[buttonName].iconClass))
                .getViewModel();
        };
        const viewModel = createViewModelGenerator(super.createViewModel())
            .generateProperty('alwaysShow', this.alwaysShow)
            .generateProperty('showButtons', this.showButtons)
            .generateProperty('collapsed', this.collapsed)
            .generateProperty('setCollapsed', (val) => {
            this.collapsed = val;
        })
            .generateProperty('keyboardHelper', this.keyboardHelper)
            .generateProperty('buttons', createViewModelGenerator()
            .generateProperty('add', generateButtonViewModel('add'))
            .generateProperty('down', generateButtonViewModel('down'))
            .generateProperty('delete', generateButtonViewModel('delete'))
            .generateProperty('up', generateButtonViewModel('up'))
            .getViewModel())
            .generateProperty('emptyAreaText', this.getDisplayTextEmptyArray())
            .generateProperty('disabled', this.disabled)
            .generateProperty('getCollapsed', () => this.collapsed)
            .generateProperty('setCollapsedChangedEvent', (callback) => {
            collapsedChangedEvent = callback;
            return () => collapsedChangedEvent = undefined;
        })
            .generateProperty('contentId', this.contentId)
            .generateProperty('headerId', this.headerId)
            .generateProperty('displayName', this.displayName)
            .generateProperty('padding', this.padding)
            .generateProperty('level', this.level)
            .generateProperty('showScroll', this.showScroll)
            .generateProperty('values', this.values.map((x, i) => {
            return createCollectionEditorViewModelItem(x, i, this);
        }))
            .getViewModel();
        this.addDisposable(this.events.on('collapsedChanged', args => {
            collapsedChangedEvent && collapsedChangedEvent();
        }));
        return viewModel;
    }
    updateViewModel(args) {
        const viewModel = this.getViewModel();
        viewModel.collapsed = this.collapsed;
        viewModel.alwaysShow = this.alwaysShow;
        viewModel.showButtons = this.showButtons;
        if (args.propertyName === 'selectedIndex') {
            args = args;
            const oldIndex = args.oldValue;
            const newIndex = args.newValue;
            if (viewModel.values[oldIndex])
                viewModel.values[oldIndex].selected = false;
            if (viewModel.values[newIndex])
                viewModel.values[newIndex].selected = true;
        }
        if (args.propertyName === 'values') {
            if ('added' in args) {
                const arrayArgs = args;
                arrayArgs.added.forEach((x) => {
                    for (let i = x.index; i < viewModel.values.length; i++) {
                        viewModel.values[i].index++;
                    }
                    viewModel.values.splice(x.index, 0, createCollectionEditorViewModelItem(x.item, x.index, this));
                });
                arrayArgs.removed.forEach((x) => {
                    for (let i = x.index; i < viewModel.values.length; i++) {
                        viewModel.values[i].index--;
                    }
                    viewModel.values.splice(x.index, 1);
                });
                this._timeoutItemRendered && clearTimeout(this._timeoutItemRendered);
                this._timeoutItemRendered = setTimeout(() => {
                    this.listKeyboardHelper && this.listKeyboardHelper.initialize();
                }, 100);
            }
            else {
                viewModel.values = this.values.map((x, i) => {
                    return createCollectionEditorViewModelItem(x, i, this);
                });
            }
        }
        if (args.propertyName === 'values' || args.propertyName === 'selectedIndex' || args.propertyName === 'disabled') {
            Object.keys(viewModel.buttons).forEach((propertyName) => {
                viewModel.buttons[propertyName].disabled = this.isDisabledButton(propertyName);
            });
        }
        if (args.propertyName === 'disabled') {
            viewModel.disabled = this.disabled;
            viewModel.values.forEach(x => {
                x.disabled = this.disabled;
                x.getModel().disabled(this.disabled);
            });
        }
        if (args.propertyName === 'showButtons') {
            Object.keys(viewModel.buttons).forEach((propertyName) => {
                viewModel.buttons[propertyName].visible = this.isVisibleButton(propertyName);
            });
        }
    }
    dispose() {
        super.dispose();
        this.removeProperties();
    }
    _move(array, offset) {
        if (this.selectedIndex >= 0) {
            const old_index = this.selectedIndex, new_index = old_index + offset;
            if ((new_index >= array.length) || (new_index < 0)) {
                return;
            }
            this.values.splice(new_index, 0, this.values.splice(old_index, 1)[0]);
            this.selectedIndex = new_index;
        }
    }
    _setSelectedIndex(selectedItem) {
        const index = this.values.indexOf(selectedItem);
        this.selectedIndex = index === -1 ? null : index;
    }
    onPropertyChanged(args) {
        var _a;
        if (args.propertyName === 'collapsed') {
            this.showButtons = !koUtils.unwrap(this.hideButtons) && !this.collapsed;
        }
        else if (args.propertyName === 'values') {
            (_a = this.options) === null || _a === void 0 ? void 0 : _a.onValueChanged(this.values, args);
        }
    }
    getDisplayTextButton(key) {
        return getLocalization(this.buttonMap[key].text, this.buttonMap[key].localizationId);
    }
    getDisplayTextEmptyArray() {
        return getLocalization(this._textEmptyArray.text, this._textEmptyArray.localizationId);
    }
    add(model) {
        model.event.stopPropagation();
        this.options.undoEngine && this.options.undoEngine.start();
        const item = this.addHandler();
        if (!item)
            return;
        const index = this.values.push(item);
        this.options.undoEngine && this.options.undoEngine.end();
        if (this.options.selectedItem) {
            this.select(this.getViewModel().values[index - 1]);
        }
    }
    up(model) {
        this._move(this.values, -1);
        model.event.stopPropagation();
    }
    down(model) {
        this._move(this.values, 1);
        model.event.stopPropagation();
    }
    delete(model) {
        model.event.stopPropagation();
        if (this.selectedIndex < 0)
            return;
        this.options.undoEngine && this.options.undoEngine.start();
        const selectedItem = this.values[this.selectedIndex];
        this.removeHandler(selectedItem, this.selectedIndex);
        this.options.undoEngine && this.options.undoEngine.end();
        const valuesCount = this.values.length;
        if (valuesCount > 0) {
            this.select(this.selectedIndex >= valuesCount ?
                this.getViewModel().values[valuesCount - 1] :
                this.getViewModel().values[this.selectedIndex], true);
        }
        else {
            this.select({ index: null, value: null }, true);
        }
    }
    select(model, force = false) {
        if (this.selectedIndex === model.index && !force)
            return;
        if (force && this.selectedIndex === model.index) {
            const args = {
                propertyName: 'selectedIndex',
                newValue: this.selectedIndex,
                oldValue: this.selectedIndex
            };
            this.onPropertyChanged(args);
            this.updateViewModel(args);
        }
        this.selectedIndex = model.index;
        if (this.options.selectedItem) {
            this.options.selectedItem(model.value);
        }
    }
}
__decorate([
    mutable(null)
], CollectionEditorViewModel.prototype, "selectedIndex", void 0);
__decorate([
    mutable(true)
], CollectionEditorViewModel.prototype, "collapsed", void 0);
__decorate([
    mutable(false)
], CollectionEditorViewModel.prototype, "alwaysShow", void 0);
__decorate([
    mutableArray(() => [])
], CollectionEditorViewModel.prototype, "values", void 0);
__decorate([
    mutable(false)
], CollectionEditorViewModel.prototype, "showButtons", void 0);
__decorate([
    mutable(() => false)
], CollectionEditorViewModel.prototype, "disabled", void 0);