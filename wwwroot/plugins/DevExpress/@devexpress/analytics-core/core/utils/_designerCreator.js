﻿/**
* DevExpress Analytics (core\utils\_designerCreator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ObjectProperties } from '../../property-grid/propertygrid';
import { Disposable } from '../../serializer/disposable';
import { extend } from '../../serializer/_utils';
import { UndoEngine } from '../../undo-engine/undoengine';
import { DesignControlsHelper } from '../internal/_controlsHelper';
import { ControlsStore } from '../internal/_stores';
import { ActionLists } from '../tools/_actionList';
import { ControlProperties } from '../widgets/propertygrid/_controlProperties';
import { collectGroupsFromFlatList, createActionWrappingFunction, generateDefaultParts } from './_utils';
import { TabPanel } from '../widgets/tabPanel';
import { getLocalization } from '../../property-grid/localization/_localization';
import { ContextMenuProvider } from '../tools/contextMenuProvider';
export class DesignerContextGeneratorInternal {
    constructor(_context, _rtl) {
        this._context = _context;
        this._rtl = _rtl;
    }
    addElement(propertyName, model) {
        this._context[propertyName] = model;
        return this;
    }
    addUndoEngine(undoEngine = ko.observable(new UndoEngine(this._context.model))) {
        this._context.undoEngine = undoEngine;
        return this;
    }
    addSurface(surface) {
        this._context.surface = surface;
        return this;
    }
    getContext() {
        return this._context;
    }
}
export class DesignerContextGenerator {
    constructor(_rtl) {
        this._rtl = _rtl;
    }
    addModel(model) {
        return new DesignerContextGeneratorInternal({ model: model }, this._rtl);
    }
}
export class ResizeSettings extends Disposable {
    get handler() { return this._handler; }
    set handler(newVal) {
        this._disposables.push(newVal);
        this._handler = newVal;
    }
    generate() {
        const result = {};
        if (this.handler)
            result['resizeHandler'] = this.handler;
        return result;
    }
}
export class ContextActionsSettings extends Disposable {
    _actionUndoEngineWrappingFunction(contextActions, undoEngine) {
        return createActionWrappingFunction('WrapWithUndoEngine', (model, handler) => {
            undoEngine().start();
            handler(model);
            undoEngine().end();
        })(contextActions);
    }
    _collectActions(editableObj, undoEngine, condition) {
        const editable = editableObj(), contextActions = [];
        this.actionProviders.forEach(actionProvider => {
            let actions = actionProvider.getActions(editable);
            if (condition)
                actions = actions.filter(action => condition(action));
            contextActions.push.apply(contextActions, actions);
        });
        this._actionUndoEngineWrappingFunction(contextActions, undoEngine);
        return contextActions;
    }
    get actionProviders() {
        return this._actionProviders;
    }
    set actionProviders(val) {
        this._disposables.push.apply(this._disposables, val);
        this._actionProviders = val;
    }
    get actions() {
        return this._actions;
    }
    set actions(val) {
        this._disposables.push(val);
        this._actions = val;
    }
    get groupActions() {
        return this._groupActions;
    }
    set groupActions(val) {
        this._disposables.push(val);
        this._groupActions = val;
    }
    createDefaultActions(editableObj, undoEngine) {
        this.actions = ko.computed(() => {
            return this._collectActions(editableObj, undoEngine, (action) => !(action.isContextMenuAction || action.group));
        });
    }
    createDefaultGroupAction(editableObj, undoEngine) {
        this.groupActions = ko.computed(() => {
            return collectGroupsFromFlatList(this._collectActions(editableObj, undoEngine), (x) => x.group && x.group());
        });
    }
    createDefaultContextMenuActions(editableObj, undoEngine) {
        this.actions = ko.computed(() => {
            return this._collectActions(editableObj, undoEngine, (action) => action.isContextMenuAction && !action.group);
        });
    }
    generate() {
        const result = {};
        if (this.actionProviders)
            result['contextActionProviders'] = this.actionProviders;
        if (this.actions)
            result['contextActions'] = this.actions;
        if (this.groupActions)
            result['contextGroupActions'] = this.groupActions;
        return result;
    }
    generateContextMenu(model) {
        const _model = model;
        const propertyAction = {
            text: getLocalization('Properties', 'AnalyticsCoreStringId.Cmd_Properties'),
            clickAction: () => {
                const propertiesTab = _model.tabPanel.getTabByName('Properties');
                model.tabPanel.selectTab({ model: propertiesTab });
            },
            imageTemplateName: 'dxrd-svg-properties-propertiesmenu',
            disabled: ko.observable(false),
            visible: true,
            hasSeparator: true
        };
        const collectAtions = () => {
            var _a, _b, _c, _d;
            return [
                ...(_a = (this.groupActions && this.groupActions())) !== null && _a !== void 0 ? _a : [],
                ...(_b = (this.actions && this.actions())) !== null && _b !== void 0 ? _b : [],
                ...ko.unwrap((_d = (_c = _model.actionLists) === null || _c === void 0 ? void 0 : _c.toolbarItems) !== null && _d !== void 0 ? _d : []),
                propertyAction
            ];
        };
        const actions = ko.observable(collectAtions());
        if (this.groupActions)
            this.addDisposable(this.groupActions.subscribe((newVal) => {
                actions(collectAtions());
            }));
        if (this.actions)
            this.addDisposable(this.actions.subscribe((newVal) => {
                actions(collectAtions());
            }));
        if (!model.ContextMenusEnabled)
            model.ContextMenusEnabled = ko.observable(true);
        const getSelectedItem = () => {
            var _a;
            return (_a = model.selection.focused()) === null || _a === void 0 ? void 0 : _a.getControlModel();
        };
        const contextMenuProvider = new ContextMenuProvider({
            actions,
            target: '.' + _model.containerClass + ' .dxrd-context-menu-container',
            contextMenusEnabled: model.ContextMenusEnabled,
            getClickActionParams: getSelectedItem
        });
        this._disposables.push(contextMenuProvider);
        return { contextMenu: contextMenuProvider };
    }
}
export class DragDropSettings extends Disposable {
    constructor() {
        super(...arguments);
        this._model = {};
    }
    get dragHelperContent() {
        return this._dragHelperContent;
    }
    set dragHelperContent(val) {
        this._disposables.push(val);
        this._dragHelperContent = val;
    }
    get dragDropStarted() {
        return this._dragDropStarted;
    }
    set dragDropStarted(val) {
        this._disposables.push(val);
        this._dragDropStarted = val;
    }
    addDragDropHandler(propertyName, handler) {
        this._disposables.push(handler);
        this._model[propertyName] = handler;
    }
    generate() {
        const result = this._model;
        if (this.dragHelperContent)
            result['dragHelperContent'] = this.dragHelperContent;
        if (this.dragDropStarted)
            result['dragDropStarted'] = this.dragDropStarted;
        return result;
    }
}
export class ControlsHelperSettings extends Disposable {
    constructor(_selection, _context) {
        super();
        this._selection = _selection;
        this._context = _context;
        this._model = {};
    }
    generate() {
        const result = this._model;
        if (this.controlsHelper)
            result['controlsHelper'] = this.controlsHelper;
        return result;
    }
    addControlsHelper(helper) {
        this.controlsHelper = helper || new DesignControlsHelper(this._context.model, [{
                added: (control) => { },
                deleted: (control) => { control.surface === this._selection.focused() && this._selection.focused(control.surface.findNextSelection()); }
            }]);
        this._disposables.push(this.controlsHelper);
        return this;
    }
    addControlsStore(store) {
        store = store || new ControlsStore(this.controlsHelper.allControls);
        this._disposables.push(store);
        this._model['controlsStore'] = store;
        return this;
    }
}
export class MenuSettings extends Disposable {
    constructor() {
        super(...arguments);
        this.stopPropagation = false;
    }
    generate() {
        const result = {};
        if (this.appMenuVisible)
            result['appMenuVisible'] = this.appMenuVisible;
        if (this.toggleAppMenu)
            result['toggleAppMenu'] = this.toggleAppMenu;
        if (this.getMenuPopupContainer)
            result['getMenuPopupContainer'] = this.getMenuPopupContainer;
        if (this.getMenuPopupTarget)
            result['getMenuPopupTarget'] = this.getMenuPopupTarget;
        result['stopPropagation'] = this.stopPropagation;
        return result;
    }
    get appMenuVisible() {
        return this._appMenuVisible;
    }
    set appMenuVisible(val) {
        this._disposables.push(val);
        this._appMenuVisible = val;
    }
}
export class SelectionSettings extends Disposable {
    constructor() {
        super(...arguments);
        this._dragDropSettings = new DragDropSettings();
        this._resizeSettings = new ResizeSettings();
    }
    dispose() {
        this._editableObject(null);
        super.dispose();
        this.removeProperties();
    }
    get selection() {
        return this._selection;
    }
    set selection(val) {
        this._disposables.push(val);
        this._selection = val;
    }
    get snapHelper() {
        return this._snapHelper;
    }
    set snapHelper(val) {
        this._disposables.push(val);
        this._snapHelper = val;
    }
    get editableObject() {
        return this._editableObject;
    }
    set editableObject(val) {
        this._disposables.push(val);
        this._editableObject = val;
    }
    addDragDrop(func) {
        func(this._dragDropSettings);
        this._disposables.push(this._dragDropSettings);
    }
    addResize(func) {
        func(this._resizeSettings);
        this._disposables.push(this._resizeSettings);
    }
    generate() {
        const result = {};
        if (this.selection)
            result['selection'] = this.selection;
        if (this.snapHelper)
            result['snapHelper'] = this.snapHelper;
        if (this.editableObject)
            result['editableObject'] = this.editableObject;
        return extend(result, this._dragDropSettings.generate(), this._resizeSettings.generate());
    }
}
export class CommonDesignerGenerator extends Disposable {
    constructor(_context, _rtl) {
        super();
        this._context = _context;
        this._rtl = _rtl;
        this._model = {};
        this._selectionSettings = new SelectionSettings();
        this._model.rtl = this._rtl;
        this._model.dispose = () => {
            this.dispose();
        };
    }
    _createPopularProperties(info, popularProperties) {
        const properties = [];
        popularProperties.forEach((name) => {
            const property = info.filter((propertyInfo) => { return propertyInfo.propertyName === name; })[0];
            if (property) {
                properties.push(property);
            }
        });
        return properties;
    }
    _resetModel() {
        Object.keys(this._model).forEach((propertyName) => {
            if (propertyName !== 'dispose')
                delete this._model[propertyName];
        });
    }
    get rtl() {
        return this._rtl;
    }
    set rtl(newVal) {
        this._rtl = newVal;
        this._model.rtl = newVal;
    }
    dispose() {
        super.dispose();
        this._resetModel();
    }
    initializeContext(context) {
        this._context = context;
        return this;
    }
    getPropertyByName(propertyName) {
        return this._model[propertyName];
    }
    addElement(propertyName, elementFunc) {
        this._model[propertyName] = elementFunc();
        this._disposables.push(this._model[propertyName]);
        return this;
    }
    mapOnContext() {
        this._model.model = this._context.model;
        this._model.surface = this._context.surface;
        this._model.undoEngine = this._context.undoEngine;
        return this;
    }
    addSelection(func) {
        func(this._selectionSettings);
        this._disposables.push(this._selectionSettings);
        extend(this._model, this._selectionSettings.generate());
        return this;
    }
    addPropertyGrid(propertyGrid, propertyName = 'propertyGrid') {
        this._model[propertyName] = propertyGrid && propertyGrid();
        this._disposables.push(this._model[propertyName]);
        return this;
    }
    addContextMenu(contextMenu) {
        if (!this._model['contextMenus'])
            this._model['contextMenus'] = [];
        this._model['contextMenus'].push(contextMenu);
    }
    addDisposableContainer() {
        this._model.disposableContainer = new Disposable();
        this._model.addDisposables = (...elem) => this._model.disposableContainer._disposables.push(...elem);
        return this;
    }
    addControlProperties(editors, groups, accessibilityProvider) {
        return this.addPropertyGrid(() => this.createControlProperties(editors, groups, accessibilityProvider));
    }
    createControlProperties(editors, groups, accessibilityProvider) {
        const properties = new ControlProperties(this._model.editableObject, { groups: groups, editors: editors }, null);
        if (accessibilityProvider)
            properties.registerAccessibilityProvider(accessibilityProvider);
        return properties;
    }
    addPopularProperties(controlsFactory, accessibilityProvider) {
        return this.addPropertyGrid(() => {
            const properties = new ObjectProperties(ko.pureComputed(() => {
                const popularPropertiesObject = { getInfo: () => { return []; } }, editable = this._model.editableObject();
                if (editable) {
                    const controlInfo = controlsFactory.controlsMap[editable.controlType], propertiesInfo = this._createPopularProperties(controlInfo && controlInfo.info || [], controlInfo && controlInfo.popularProperties || []);
                    (propertiesInfo).forEach(item => {
                        if (item.propertyName in editable)
                            popularPropertiesObject[item.propertyName] = editable[item.propertyName];
                    });
                    popularPropertiesObject.getInfo = () => {
                        return propertiesInfo;
                    };
                    popularPropertiesObject['root'] = editable.root;
                    popularPropertiesObject['actions'] = editable.actions;
                    popularPropertiesObject['actionProviders'] = editable.actionProviders;
                    popularPropertiesObject['getPath'] = (propertyName) => { return editable.getPath && editable.getPath(propertyName) || ''; };
                    popularPropertiesObject['getModel'] = () => editable;
                    popularPropertiesObject['isPropertyModified'] = (name) => {
                        return editable.isPropertyModified ? editable.isPropertyModified(name) : false;
                    };
                    popularPropertiesObject['getActionClassName'] = (name) => {
                        return editable['getActionClassName'] ? editable['getActionClassName'](name) : '';
                    };
                    popularPropertiesObject['getMenuBoxTemplate'] = (name) => {
                        return editable['getMenuBoxTemplate'] ? editable['getMenuBoxTemplate'](name) : '';
                    };
                    popularPropertiesObject['isPropertyVisible'] = (propertyName) => {
                        return propertiesInfo.some(x => x.propertyName === propertyName) && (editable['isPropertyVisible'] ? editable['isPropertyVisible'](propertyName, true) : true);
                    };
                    popularPropertiesObject['isPropertyHighlighted'] = (propertyName) => {
                        return editable['isPropertyHighlighted'] ? editable['isPropertyHighlighted'](propertyName) : false;
                    };
                    popularPropertiesObject['isPropertyDisabled'] = (name) => {
                        return editable.isPropertyDisabled ? editable.isPropertyDisabled(name) : false;
                    };
                    popularPropertiesObject['isSame'] = x => x === editable;
                    ['name', 'displayName'].forEach((propertyName) => {
                        if (propertyName in editable) {
                            popularPropertiesObject[propertyName] = editable[propertyName];
                        }
                    });
                }
                return popularPropertiesObject;
            }), undefined, undefined, undefined);
            if (accessibilityProvider)
                properties.registerAccessibilityProvider(accessibilityProvider);
            return properties;
        }, 'popularProperties');
    }
    addToolboxItems(items) {
        this._model.toolboxItems = items && items();
        return this;
    }
    addGroupedToolboxItems() {
        this._model.groupedToolboxItems = collectGroupsFromFlatList(this._model.toolboxItems, (item) => item.info.group);
        return this;
    }
    addTabPanel(panel, addTabInfo = () => []) {
        const panelModel = panel && panel() || new TabPanel({ tabs: addTabInfo(), rtl: this._rtl, width: 396 });
        this._model.tabPanel = panelModel;
        this._disposables.push(panelModel);
        return this;
    }
    addIsLoading(isLoadingFunc = () => ko.observable(true)) {
        this._model.isLoading = isLoadingFunc();
        this._disposables.push(this._model.isLoading);
        return this;
    }
    addControlsHelper(func) {
        const settings = new ControlsHelperSettings(this._selectionSettings.selection, this._context);
        func(settings);
        this._disposables.push(settings);
        extend(this._model, settings.generate());
        return this;
    }
    addMenu(func) {
        const settings = new MenuSettings();
        func(settings);
        this._disposables.push(settings);
        extend(this._model, settings.generate());
        return this;
    }
    addContextActions(func) {
        const settings = new ContextActionsSettings();
        func(settings);
        this._disposables.push(settings);
        extend(this._model, settings.generate());
        const contextMenu = settings.generateContextMenu(this._model);
        extend(this._model, contextMenu);
        this.addContextMenu(contextMenu.contextMenu);
        this.addElement('hideContextMenu', () => () => this._model['contextMenus'].forEach(contextMenu => contextMenu.hide()));
        return this;
    }
    addParts(func = (parts) => parts, useDefaults = true) {
        let parts = [];
        if (useDefaults)
            parts = generateDefaultParts(this._model);
        this._model.parts = func(parts);
        return this;
    }
    getModel() {
        return this._model;
    }
    addActionList(actionListsFunc) {
        const actionLists = actionListsFunc && actionListsFunc() || new ActionLists(this._context.surface, this._selectionSettings.selection, this._context.undoEngine, () => { });
        this._disposables.push(actionLists);
        this._model.actionLists = actionLists;
        return this;
    }
}
