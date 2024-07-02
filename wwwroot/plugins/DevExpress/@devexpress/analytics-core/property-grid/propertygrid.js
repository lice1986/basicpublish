﻿/**
* DevExpress Analytics (property-grid\propertygrid.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { defaultAccessibilityProvider } from './_propertiesAccessibilityProvider';
import { Editor, createEditorDescriptionAddOn, unwrapEditor } from './widgets/editor';
import { compareEditorInfo, findMatchesInString } from './widgets/internal/_utils';
import { EditorAddOn } from './internal/_addon';
import config from 'devextreme/core/config';
import { isEmptyObject } from '../serializer/_utils';
import { BaseRenderingMultiplatformModel } from '../serializer/native/models/base.model';
import { createViewModelGenerator } from '../serializer/native/viewModels/viewModelGenerator';
import { currentMultiPlatformEngine, subscribableProperty } from '../serializer/native/multiplatformEngine';
export class ObjectProperties extends BaseRenderingMultiplatformModel {
    constructor(viewModel, editorsInfo, level = 0, parentDisabled = currentMultiPlatformEngine.wrap(false), recreateEditors = false, textToSearch, popupService, popover, engineType = 'multiplatform') {
        super(undefined, undefined, engineType);
        this.recreateEditors = recreateEditors;
        this.popover = popover;
        this._viewModelSubscription = null;
        this._infoSubscription = null;
        this._getInfoComputed = null;
        this._accessibilityProvider = defaultAccessibilityProvider;
        this.level = 0;
        this.rtl = config()['rtlEnabled'];
        if (popupService) {
            this.createEditorAddOn = (_editor) => {
                const editor = unwrapEditor(_editor);
                const editorAddOn = new EditorAddOn(editor, this.popupService, engineType);
                editor._disposables.push(editorAddOn);
                return {
                    templateName: 'dx-editor-addons',
                    data: [editorAddOn]
                };
            };
            this.popupService = popupService;
        }
        if (popover) {
            this.createEditorDescriptionAddOn = (editor) => {
                return createEditorDescriptionAddOn(editor, this.popover);
            };
        }
        this.assignArrayProperty('_editors', [], { deferred: true });
        this.level = level;
        this._parentDisabled = parentDisabled;
        this._textToSearch = textToSearch;
        this.addDisposable(this.createComputedProperty('visible', () => {
            return this._get('_editors').some(editor => editor._get('visible'));
        }, [
            subscribableProperty(this, [{
                    propertyName: '_editors',
                    subscribables: ['visible']
                }
            ])
        ]));
        this.updateModel = (model) => {
            this._infoSubscription && this._infoSubscription();
            this._update(model, editorsInfo, recreateEditors);
        };
        this._viewModelSubscription = currentMultiPlatformEngine.subscribeValue(viewModel, (newVal) => {
            this.updateModel(newVal);
        });
        this.updateModel(this.unwrap(viewModel));
    }
    createViewModel() {
        var _a;
        const initEditors = () => {
            return this.editors.map(editorModel => {
                const editor = editorModel.getViewModel();
                if (this.createEditorAddOn) {
                    editor.createEditorAddOn = (viewModel) => this.createEditorAddOn && this.createEditorAddOn(viewModel.getModel());
                }
                return editor;
            });
        };
        const viewModel = createViewModelGenerator(super.createViewModel())
            .generateProperty('editors', initEditors())
            .generateProperty('rtl', this.rtl)
            .generateProperty('popover', (_a = this.popover) === null || _a === void 0 ? void 0 : _a.getViewModel())
            .getViewModel();
        this.addDisposable(this.subscribeProperty('_editors', (newVal) => {
            viewModel.editors = initEditors();
        }));
        return viewModel;
    }
    update(viewModel) {
        if (viewModel) {
            this._get('_editors').forEach((editor) => {
                editor.update(viewModel);
            });
        }
    }
    _cleanEditorsSubscriptions() {
        this._get('_editors').forEach((editor) => {
            editor.dispose();
        });
    }
    dispose() {
        super.dispose();
        this._get('_editors').forEach((x => x.dispose()));
        this._set('_editors', []);
        this.cleanSubscriptions();
    }
    cleanSubscriptions() {
        this._infoSubscription && this._infoSubscription();
        this._viewModelSubscription && this._viewModelSubscription();
        this._cleanEditorsSubscriptions();
    }
    cleanEditors() {
        this._cleanEditorsSubscriptions();
        this._set('_editors', []);
    }
    findEditorByInfo(serializationInfo) {
        return this._get('_editors').filter(editor => editor.name === serializationInfo.propertyName && compareEditorInfo(editor._get('info').editor, serializationInfo.editor))[0];
    }
    createEditor(modelPropertyInfo) {
        const editorType = modelPropertyInfo.editor && modelPropertyInfo.editor.editorType || Editor;
        const editor = new editorType(modelPropertyInfo, this.level, this._parentDisabled, this._textToSearch, this.popupService, this.popover, this._engineType);
        editor.assignParent(this._parent);
        editor.registerAccessibilityProvider(this._accessibilityProvider);
        return editor;
    }
    createEditors(serializationInfo) {
        return (serializationInfo || [])
            .filter(info => { return !!info.editor && !this.findEditorByInfo(info); })
            .map(info => { return this.createEditor(info); });
    }
    registerAccessibilityProvider(accessibilityProvider) {
        this._accessibilityProvider = accessibilityProvider;
        this._get('_editors').forEach((editor) => {
            editor.registerAccessibilityProvider(accessibilityProvider);
        });
    }
    assignParent(parent) {
        this._parent = parent;
        this._get('_editors').forEach((editor) => {
            editor.assignParent(parent);
        });
    }
    _createEditors(serializationInfo) {
        if (!serializationInfo || serializationInfo.length === 0)
            return false;
        const newEditors = this.createEditors(serializationInfo);
        if (!newEditors.length)
            return;
        let currentEditors = this._get('_editors');
        if (currentEditors.length === 0) {
            currentEditors = newEditors;
        }
        else {
            newEditors.forEach((editor) => {
                const existEditorIndex = currentEditors.map(_editor => _editor.name).indexOf(editor.name);
                if (existEditorIndex !== -1)
                    currentEditors.splice(existEditorIndex, 0, editor);
                else
                    currentEditors.push(editor);
            });
        }
        this._set('_editors', currentEditors);
    }
    updateEditorsInfo(model, info) {
        if (this.recreateEditors) {
            this.cleanEditors();
        }
        this._recreateEditors(model, info);
    }
    _update(viewModel, editorsInfo, recreateEditors) {
        if (recreateEditors) {
            this.cleanEditors();
        }
        const computed = this.createComputedProperty('_getInfoComputed', () => {
            return (editorsInfo && editorsInfo.editors && this.unwrap(editorsInfo.editors))
                || (viewModel && viewModel['getInfo'] && viewModel['getInfo']());
        }, [
            subscribableProperty(viewModel, ['getInfo'])
        ]);
        const recreateEditorsFunc = (info) => {
            if (recreateEditors) {
                this.cleanEditors();
            }
            this._recreateEditors(viewModel, info);
        };
        const subscription = this.subscribeProperty('_getInfoComputed', (newInfo) => {
            recreateEditorsFunc(newInfo);
        });
        this._infoSubscription = () => {
            computed();
            subscription();
        };
        this._recreateEditors(viewModel, this._get('_getInfoComputed'));
    }
    _recreateEditors(viewModel, serializationInfo) {
        this._createEditors(serializationInfo);
        this.update(viewModel);
    }
    getEditors() {
        return this._get('_editors');
    }
    get editors() {
        return this.getEditors();
    }
}
export class PropertyGridEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch, _popupService, _popover, engineType) {
        super(info, level, parentDisabled, textToSearch, _popupService, _popover, engineType);
        this._popupService = _popupService;
        this._popover = _popover;
        this.addDisposable(this.createComputedProperty('_editorInfo', () => {
            const value = this._get('value');
            return value && value.getInfo && value.getInfo() || this._get('info').info;
        }, [
            subscribableProperty(this, [{
                    propertyName: 'value',
                    subscribables: ['getInfo']
                }, 'info'])
        ]));
        this._set('editorCreated', false);
        this.viewmodel = this.createObjectProperties();
        if (!isEmptyObject(this.viewmodel)) {
            this.viewmodel.assignParent(this);
        }
        this._disposables.push(this.viewmodel);
        const collapsedSubscription = this.subscribeProperty('collapsed', (newVal) => {
            if (!newVal) {
                collapsedSubscription();
                this._set('editorCreated', true);
            }
        });
        this.addDisposable(collapsedSubscription);
        if (textToSearch) {
            this.addDisposable(this.createComputedProperty('visibleByName', () => {
                const visible = !!findMatchesInString(this._get('displayName'), textToSearch());
                if (!isEmptyObject(this.viewmodel)) {
                    this.viewmodel._get('_editors').forEach((editor) => editor._set('isParentSearched', visible));
                }
                return visible;
            }, [
                subscribableProperty(this, [
                    'displayName',
                    {
                        propertyName: 'viewModel',
                        subscribables: ['_editors']
                    }
                ])
            ]));
            this._isSearchedPropertySubscription && this._isSearchedPropertySubscription();
            this._isSearchedPropertySubscription = this.createComputedProperty('isSearchedProperty', () => {
                if (this._get('visibleByName'))
                    return true;
                const visibleByEditors = this.viewmodel._get('visible');
                visibleByEditors && this._set('collapsed', false);
                return visibleByEditors;
            }, [
                subscribableProperty(this, ['visibleByName', {
                        propertyName: 'viewmodel',
                        subscribables: ['visible']
                    }])
            ]);
        }
    }
    createViewModel() {
        const viewModel = createViewModelGenerator(super.createViewModel())
            .generateProperty('viewmodel', this.viewmodel && this.viewmodel.getViewModel())
            .getViewModel();
        return viewModel;
    }
    createObjectProperties() {
        this.addDisposable(this.subscribeProperty('value', () => {
            this.viewmodel.updateModel(this._get('value'));
        }));
        return new ObjectProperties(this._get('value'), {
            editors: this._get('_editorInfo', 'wrapped'),
        }, this.level + 1, this._get('disabled', 'wrapped'), undefined, this.textToSearch, this._popupService, this._popover, this._engineType);
    }
    registerAccessibilityProvider(accessibilityProvider) {
        super.registerAccessibilityProvider(accessibilityProvider);
        this.viewmodel.registerAccessibilityProvider(accessibilityProvider);
    }
}
export class PropertyGridEditorFlat extends PropertyGridEditor {
    createObjectProperties() {
        this._set('collapsed', false);
        this._set('editorCreated', true);
        this.level = -1;
        return super.createObjectProperties();
    }
}