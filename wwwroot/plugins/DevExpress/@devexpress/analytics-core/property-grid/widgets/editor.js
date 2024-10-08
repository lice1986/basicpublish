﻿/**
* DevExpress Analytics (property-grid\widgets\editor.js)
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
import { findMatchesInString, compareEditorInfo } from './internal/_utils';
import { defaultAccessibilityProvider } from '../_propertiesAccessibilityProvider';
import { EditorValidator } from './editorValidator';
import { getLocalization } from '../localization/localization_utils';
import { propertiesGridEditorsPaddingLeft } from './internal/_internal';
import { editorTemplates } from './editorsInfo';
import config from 'devextreme/core/config';
import { extend } from '../../serializer/_utils';
import { roundingXDecimals } from '../../core/utils/_units.roundingXDecimals';
import { guid } from '../../undo-engine/_utils';
import { BaseRenderingMultiplatformModel, mutable } from '../../serializer/native/models/base.model';
import { currentMultiPlatformEngine, subscribableProperty, currentModelSerializer, nativeModelSerializer } from '../../serializer/native/multiplatformEngine';
import { createViewModel } from './editor.viewmodel';
export function unwrapEditor(editor) {
    if (editor instanceof Editor) {
        return editor;
    }
    return editor.getModel();
}
export class Editor extends BaseRenderingMultiplatformModel {
    constructor(modelPropertyInfo, level, parentDisabled, textToSearch = undefined, popupService, popover, engineType = 'multiplatform') {
        super(undefined, undefined, engineType);
        this.rtl = config().rtlEnabled;
        this._validator = new EditorValidator(this);
        this._cachedValue = undefined;
        this.isRequired = false;
        if (!parentDisabled)
            parentDisabled = this._getEngine().wrap(false);
        this.assignProperty('info', modelPropertyInfo);
        this.addDisposable(this.createComputedProperty('displayName', {
            read: () => {
                const info = this._get('info');
                return info && getLocalization(info.displayName, info['localizationId']);
            },
            write: (value) => { }
        }, [
            subscribableProperty(this, ['info'])
        ]));
        this.addDisposable(this.createComputedProperty('description', {
            read: () => {
                const info = this._get('info');
                return info && getLocalization('', info['descriptionLocalizationId'] || `${info['localizationId']}.Description`);
            },
            write: (value) => { }
        }, [
            subscribableProperty(this, ['info'])
        ]));
        if (popover && this.unwrap(this.description)) {
            this.editorDescriptionAddon = createEditorDescriptionAddOn(this, popover);
        }
        if (textToSearch) {
            this.textToSearch = textToSearch;
            this._isSearchedPropertySubscription = this.createComputedProperty('isSearchedProperty', () => {
                return this._get('isParentSearched') || !!findMatchesInString(this._get('displayName'), textToSearch());
            }, [
                subscribableProperty(this, [
                    'isParentSearched',
                    'displayName'
                ])
            ]);
        }
        this.padding = this._setPadding(this.rtl ? 'right' : 'left', level * propertiesGridEditorsPaddingLeft());
        this.assignProperty('defaultValue', null);
        const propertyName = modelPropertyInfo.propertyName;
        this.addDisposable(this.createComputedProperty('_editorOptions', () => this._get('info').editorOptions, [
            subscribableProperty(this, ['info'])
        ]));
        this.validatorOptions = modelPropertyInfo.validatorOptions;
        this.isRequired = modelPropertyInfo.isRequired;
        if (modelPropertyInfo.defaultVal !== undefined) {
            this.assignProperty('defaultValue', modelPropertyInfo.defaultVal);
        }
        if (modelPropertyInfo.from) {
            this.defaultValue = modelPropertyInfo.from(modelPropertyInfo.defaultVal, this._engineType === 'multiplatform' ? currentModelSerializer() : nativeModelSerializer());
        }
        if (modelPropertyInfo.array) {
            this.assignArrayProperty('defaultValue', []);
        }
        this.addDisposable(this.createComputedProperty('values', () => {
            const info = this._get('info');
            let _values = info.valueStore || info.valuesArray;
            if (_values) {
                return _values;
            }
            _values = this.unwrap(info.values);
            if (_values) {
                return Object.keys(_values).map(key => {
                    return { value: key, displayValue: _values[key] };
                });
            }
        }, [
            subscribableProperty(this, [{
                    propertyName: 'info',
                    subscribables: ['values', 'valueStore', 'valuesArray']
                }])
        ]));
        this.level = level;
        this._init(modelPropertyInfo.editor, propertyName);
        this.addDisposable(this.createComputedProperty('disabled', () => {
            const _accessibilityProvider = this._get('_accessibilityProvider');
            const parent = this._get('_parent');
            return parent && parent._get('disabled') || _accessibilityProvider && _accessibilityProvider.isPropertyDisabled(this);
        }, [
            subscribableProperty(this, [
                '_accessibilityProvider', {
                    propertyName: '_parent',
                    subscribables: ['disabled']
                }, {
                    propertyName: '_model',
                    subscribables: '*'
                }
            ]),
            subscribableProperty(this._get('_model'), '*')
        ]));
        this.addDisposable(this.createComputedProperty('visible', () => {
            const _accessibilityProvider = this._get('_accessibilityProvider');
            return this._get('isSearchedProperty') && _accessibilityProvider && _accessibilityProvider.isPropertyVisible(this);
        }, [
            subscribableProperty(this, ['_accessibilityProvider', {
                    propertyName: '_model',
                    subscribables: '*'
                }])
        ]));
        this.addDisposable(this.createComputedProperty('isPropertyModified', () => {
            const _model = this._get('_model');
            return !!(_model && _model.isPropertyModified && _model.isPropertyModified(this.name));
        }, [
            subscribableProperty(this, [{
                    propertyName: '_model',
                    subscribables: '*'
                }])
        ]));
        this.addDisposable(this.createComputedProperty('isPropertyHighlighted', () => {
            if (this._shouldSkipHighlighting(this.name))
                return false;
            const controlModel = this._get('_model');
            return !!(controlModel && controlModel.isPropertyHighlighted && controlModel.isPropertyHighlighted(this.name));
        }, this._shouldSkipHighlighting(this.name) ? [] : [
            subscribableProperty(this, [{
                    propertyName: '_model',
                    subscribables: '*'
                }])
        ]));
        this.headerId = `dxrd-accordion-trigger-${guid()}`;
        this.contentId = `dxrd-accordion-pannel-${guid()}`;
        this.editorInputId = `dxrd-editor-${guid()}`;
    }
    createViewModel() {
        return createViewModel.call(this, super.createViewModel());
    }
    _setPadding(position, value) {
        const obj = {};
        obj['padding-' + position] = value;
        return obj;
    }
    dispose() {
        this._validator && this._validator.dispose();
        this._validator = null;
        this._isSearchedPropertySubscription && this._isSearchedPropertySubscription();
        super.dispose();
        this._cachedValue = null;
        this._set('_model', null);
    }
    _shouldSkipHighlighting(propertyName) {
        return this.isComplexEditor;
    }
    _assignValue(modelValue, model, newValue, name) {
        currentMultiPlatformEngine.setPropertyValue(model, name, newValue, modelValue);
    }
    _roundTwoDesemialsForUnitProperties(value, model, propertyName) {
        const properties = model && model['constructor'] && model['constructor'].unitProperties;
        if (!properties || properties.indexOf(propertyName) === -1)
            return value;
        return roundingXDecimals(value);
    }
    _init(editorTemplate, name) {
        editorTemplate = editorTemplate || editorTemplates.getEditor('text');
        this.templateName = editorTemplate.header;
        this.contentTemplateName = editorTemplate.content;
        this._cachedValue = undefined;
        this.addDisposable(this.createComputedProperty('value', {
            read: () => {
                const model = this._get('_model');
                if (!model && this._cachedValue) {
                    return this._cachedValue;
                }
                const modelValue = model && model[name] !== undefined ? model[name] : this._get('defaultValue', 'wrapped');
                if (modelValue && typeof modelValue !== 'object' && !modelValue['push']) {
                    const unwrappedValue = this.unwrap(modelValue);
                    const hasValueInModel = unwrappedValue !== undefined && unwrappedValue !== null;
                    this._cachedValue = hasValueInModel ? this._roundTwoDesemialsForUnitProperties(unwrappedValue, model, name) : undefined;
                    return this._cachedValue;
                }
                else {
                    this._cachedValue = modelValue;
                    return this._cachedValue;
                }
            },
            write: (newValue) => {
                const model = this._get('_model');
                if (!model) {
                    return;
                }
                const modelValue = model[name];
                this._validator.assignWithValidation(newValue, () => {
                    this._assignValue(modelValue, model, newValue, name);
                });
            }
        }, [
            subscribableProperty(this, ['defaultValue', {
                    propertyName: '_model',
                    subscribables: [name]
                }])
        ]));
        this.name = name;
        this.editorTemplate = editorTemplate && editorTemplate.custom || 'dx-property-editor';
    }
    _getInfoFromModel(viewModel) {
        if (!viewModel)
            return null;
        const modelInfo = viewModel['getInfo'] && viewModel['getInfo']();
        if (modelInfo) {
            return modelInfo.filter(property => property.propertyName === this.name)[0];
        }
        return null;
    }
    onPropertyChanged(args) {
        const viewModel = this.__viewModel;
        if (viewModel && this.values && (args.propertyName == 'value' || args.propertyName == 'values')) {
            viewModel.values = this.unwrap(this.values);
        }
    }
    update(viewModel) {
        if (!!viewModel) {
            const propertyInfo = this._getInfoFromModel(viewModel);
            const isSameEditorType = propertyInfo && compareEditorInfo(propertyInfo.editor, this._get('info').editor);
            if (isSameEditorType && this._get('info') !== propertyInfo) {
                this._set('info', propertyInfo);
            }
            this._set('_model', this.name in viewModel && (isSameEditorType || !propertyInfo) ? viewModel : null);
        }
        else {
            this._set('_model', null);
        }
    }
    getOptions(templateOptions) {
        return extend(true, {}, templateOptions, this.editorOptions, this._getExtendedOptions());
    }
    _getExtendedOptions() {
        const extendedOptions = this._get('info', 'peek').editor.extendedOptions;
        return typeof extendedOptions === 'function' ? extendedOptions() : extendedOptions;
    }
    getValidatorOptions(templateValidatorOptions) {
        return this._validator && this._validator.getValidatorOptions(templateValidatorOptions);
    }
    registerAccessibilityProvider(accessibilityProvider) {
        if (this._get('_accessibilityProvider') != accessibilityProvider)
            this._set('_accessibilityProvider', accessibilityProvider);
    }
    assignParent(parent) {
        if (this._get('_parent') != parent)
            this._set('_parent', parent);
    }
    _getEditorValidationRules() {
        const info = this.unwrap(this.info);
        if (!info)
            return;
        const validationRules = info.validationRules;
        return validationRules || (validationRules === null ? null : []);
    }
    getValidationRules() {
        return this._validator && this._validator.getValidationRules();
    }
    setIsRendered(val) {
        this._set('isRendered', val);
    }
    get validationRules() {
        return this.getValidationRules();
    }
    get fullDisplayName() {
        var _a;
        return this._get('displayName') + ((_a = this.parentName) !== null && _a !== void 0 ? _a : '');
    }
    getPopupServiceActions() {
        const model = this._get('_model');
        if (!model) {
            return;
        }
        const actions = (model.actions || []).concat();
        (model.actionProviders || [])
            .forEach((provider) => {
            const additionalActions = provider && provider.getActions(this.name) || [];
            additionalActions.forEach((action) => actions.push(action));
        });
        return actions;
    }
    get editorOptions() { return this.unwrap(this._editorOptions); }
    get isComplexEditor() { return !!this.contentTemplateName; }
}
__decorate([
    mutable()
], Editor.prototype, "_model", void 0);
__decorate([
    mutable(null)
], Editor.prototype, "_parent", void 0);
__decorate([
    mutable(true)
], Editor.prototype, "isSearchedProperty", void 0);
__decorate([
    mutable(false)
], Editor.prototype, "isParentSearched", void 0);
__decorate([
    mutable(() => defaultAccessibilityProvider)
], Editor.prototype, "_accessibilityProvider", void 0);
__decorate([
    mutable(false)
], Editor.prototype, "isEditorSelected", void 0);
__decorate([
    mutable(false)
], Editor.prototype, "isRendered", void 0);
__decorate([
    mutable(true)
], Editor.prototype, "editorCreated", void 0);
__decorate([
    mutable(true)
], Editor.prototype, "collapsed", void 0);
__decorate([
    mutable(false)
], Editor.prototype, "alwaysShow", void 0);
export function createEditorDescriptionAddOn(editor, popover) {
    const _editor = unwrapEditor(editor);
    const onClick = (e) => {
        popover.data = _editor._get('description');
        popover.target = e.element;
        popover.visible = !popover.visible;
    };
    return {
        templateName: 'dx-property-grid-editor-description',
        data: { onClick }
    };
}
