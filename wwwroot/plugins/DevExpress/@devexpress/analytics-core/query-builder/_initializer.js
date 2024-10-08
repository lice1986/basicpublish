﻿/**
* DevExpress Analytics (query-builder\_initializer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import config from 'devextreme/core/config';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { calculateWithZoomFactor } from '../accessibility/_internal';
import { processErrorEvent } from '../core/internal/_processError';
import { SurfaceSelection } from '../core/selection/_selection';
import { ActionLists } from '../core/tools/_actionList';
import { findFirstItemMatchesCondition } from '../core/utils/_arrayutils';
import { createDesigner } from '../core/utils/_designerInitializer';
import { getErrorMessage, ShowMessage } from '../core/utils/_infoMessageHelpers';
import { troubleshootingPageWrapper } from '../core/utils/_troubleshootingHelpers';
import { _wrapModelInObservable } from '../core/utils/_utils.wrapModelInObservable';
import { appendStaticContextToRootViewModel } from '../core/utils/_utils.staticContext';
import { addCultureInfo, getLocalization } from '../property-grid/localization/localization_utils';
import { resolveFromPromises, searchPlaceholder } from '../property-grid/localization/_localization';
import { ObjectProperties } from '../property-grid/propertygrid';
import { addDisposeCallback } from '../serializer/_internal';
import { aceAvailable } from '../widgets/ace/_ace-available';
import { getParentContainer } from '../widgets/_utils';
import { DBSchemaProvider } from './dataSource/dbSchemaProvider';
import { SqlDataSource } from './dataSource/sql/sqlDataSource';
import { ColumnDragHandler } from './dragDrop/_columnDragHandler';
import { DbObjectDragDropHandler } from './dragDrop/_dbObjectDragDropHandler';
import { ParametersMode } from './elements/parameterModelMeta';
import { QueryViewModel } from './elements/queryModel';
import { QuerySurface } from './elements/querySurface';
import { ActionId, HandlerUri } from './initializer';
import { controlsFactory } from './utils/controlsFactory';
import { RequestWrapper } from './utils/requestwrapper';
import { registerControls } from './utils/_controlsFactory';
import { serializeDataConnection } from './utils/_dataConnection';
import { QueryBuilderTreeListController } from './utils/_queryBuilderTreeListController';
import { createDefaultSQLAceOptions, createDefaultSQLAdditionalOptions, createDefaultSQLLanguageHelper } from './widgets/ace/_options';
import { QueryBuilderObjectsProvider } from './widgets/filterEditor/_queryBuilderObjectsProvider';
import { RightPanelSwitcher } from './widgets/_rightPanelSwitcher';
import { AccordionTabInfo, SelectedTabInfo } from './_accordionTabInfo';
const QueryBuilderElements = {
    Surface: 'dxrd-surface-template-base',
    Toolbar: 'dxqb-toolbar',
    RightPanel: 'dx-right-panel-lightweight',
    RightPanelSwitcher: 'dx-right-panel-switcher',
    DataPreview: 'dxqb-popup#data',
    SqlPreview: 'dxqb-popup#sql'
};
function customizeDesignerActions(designerModel, nextCustomizer) {
    const query = designerModel.model;
    return ((actions) => {
        const del = findFirstItemMatchesCondition(actions, action => action.text === 'Delete');
        del.imageClassName = 'dx-icon-dxrd-image-recycle-bin';
        del.imageTemplateName = 'dxrd-svg-operations-recycle_bin_xl';
        const undo = findFirstItemMatchesCondition(actions, action => action.text === 'Undo');
        undo.disabled = ko.pureComputed(() => designerModel.isLoading() || !designerModel.undoEngine().undoEnabled());
        const redo = findFirstItemMatchesCondition(actions, action => action.text === 'Redo');
        actions.splice(0, actions.length, del, undo, redo);
        actions.push({
            id: ActionId.Save,
            text: 'Save',
            displayText: () => getLocalization('Save', 'AnalyticsCoreStringId.MenuButtons_Save'),
            imageClassName: 'dxqb-image-save',
            imageTemplateName: 'dxrd-svg-menu-save',
            disabled: designerModel.isLoading,
            visible: true,
            hotKey: { ctrlKey: true, keyCode: 'S'.charCodeAt(0) },
            clickAction: () => {
                query().save();
            },
            hasSeparator: true
        });
        actions.push({
            id: ActionId.DataPreview,
            text: 'Preview Results',
            displayText: () => getLocalization('Preview Results', 'DataAccessUIStringId.QueryBuilderButtons_PreviewResults'),
            imageClassName: 'dxrd-image-data-preview',
            imageTemplateName: 'dxrd-svg-queryBuilder-data_preview',
            disabled: designerModel.isLoading,
            visible: true,
            hotKey: { ctrlKey: true, keyCode: 'P'.charCodeAt(0) },
            clickAction: () => {
                if (!query().canSave())
                    return;
                designerModel.showPreview();
            },
            hasSeparator: true
        });
        actions.push({
            id: ActionId.SelectStatementPreview,
            text: 'Preview Select Statement',
            displayText: () => getLocalization('Preview Select Statement', 'AnalyticsCoreStringId.QueryBuilder_PreviewSelectStatement_Tooltip'),
            imageClassName: 'dxrd-image-selectstatement-preview',
            imageTemplateName: 'dxrd-svg-queryBuilder-select_statment',
            disabled: designerModel.isLoading,
            visible: true,
            hotKey: { ctrlKey: true, keyCode: 'E'.charCodeAt(0) },
            clickAction: () => {
                if (!query().canSave())
                    return;
                designerModel.showStatement();
            },
            hasSeparator: true
        });
        nextCustomizer && nextCustomizer(actions);
    });
}
export function updateQueryBuilderSurfaceContentSize(getRoot, surfaceSize, surface, updateLayoutCallbacks) {
    return () => {
        const $root = getRoot();
        const rightAreaWidth = $root.find('.dxrd-right-panel:visible').outerWidth() || 0;
        const surfaceWidth = $root.width() - (rightAreaWidth + 5);
        $root.find('.dxrd-surface-wrapper').css(surface().rtl() ?
            { 'left': rightAreaWidth, 'right': 0, 'width': surfaceWidth } :
            { 'left': 0, 'right': rightAreaWidth, 'width': surfaceWidth });
        surfaceSize(surfaceWidth);
        surface().pageWidth(surfaceWidth);
    };
}
export function createIsLoadingFlag(model, dbSchemaProvider) {
    const isDbSchemaLoaded = ko.observable(false);
    model()._disposables.push(dbSchemaProvider.subscribe(() => { isDbSchemaLoaded(false); }));
    return ko.pureComputed(function () {
        dbSchemaProvider.peek().getDbSchema().done(() => {
            isDbSchemaLoaded(true);
        });
        if (isDbSchemaLoaded()) {
            return model().tables.peek().some(function (table) {
                return !table.isInitialized();
            });
        }
        else {
            return true;
        }
    });
}
function _createDesignerModel(query, surface, options) {
    const querySubscription = query.subscribe((newValue) => {
        surface(new QuerySurface(newValue));
        surface().rtl(!!options.rtl);
    });
    const selection = new SurfaceSelection(['alias', 'name', 'sortOrder']);
    const designer = createDesigner(query, surface, controlsFactory, undefined, undefined, undefined, !!options.rtl, selection);
    designer.addDisposables(querySubscription);
    designer.findControl = (s, e) => {
        const $childs = $.fn.constructor('.dxqb-main').children('.dxrd-control');
        $childs.each((_, child) => {
            const $child = $.fn.constructor(child);
            if ($child.offset().top <= e.clientY && $child.offset().left <= e.clientX) {
                designer.selection.focused(ko.dataFor($child[0]));
                return;
            }
        });
    };
    designer.addDisposables({ dispose: () => designer.findControl = null });
    return designer;
}
function _updateSurfaceContentSizeSubscription(element, designerModel, surface, callback) {
    const updateSurfaceContentSize_ = updateQueryBuilderSurfaceContentSize(() => $.fn.constructor(element).find('.dxqb-designer'), designerModel.surfaceSize, surface);
    designerModel.addDisposables(surface.subscribe(() => { updateSurfaceContentSize_(); }));
    const onResize = () => {
        setTimeout(() => updateSurfaceContentSize_());
    };
    window.addEventListener('resize', onResize);
    addDisposeCallback(element, function () {
        window.removeEventListener('resize', onResize);
        designerModel.disposableContainer.dispose();
    });
    designerModel.addDisposables({
        dispose: designerModel.tabPanel.events.on('widthChanged', (args) => {
            updateSurfaceContentSize_();
        })
    });
    designerModel.updateSurfaceSize = () => {
        updateSurfaceContentSize_();
    };
    designerModel.updateSurface = () => {
        updateSurfaceContentSize_();
        callback && callback();
    };
}
function _createQueryBuilder(element, options, callbacks, applyBindings = true) {
    const disposableCallback = callbacks && callbacks.onServerError && processErrorEvent(callbacks.onServerError);
    const wrapper = options.requestWrapper || new RequestWrapper();
    const parametersMode = options.parametersMode || ParametersMode.ReadWrite;
    HandlerUri(options.handlerUri);
    if (options.queryModelJson) {
        const dataSource = new SqlDataSource(JSON.parse(options.dataSourceJson));
        options.dbSchemaProvider = _wrapModelInObservable(options.dbSchemaProvider);
        options.dbSchemaProvider(new DBSchemaProvider(dataSource.connection));
        options.querySource = _wrapModelInObservable(options.querySource);
        options.querySource(JSON.parse(options.queryModelJson));
    }
    const dataConnection = options.dbSchemaProvider().connection;
    const query = ko.observable(), surface = ko.observable(), treeListOptions = ko.observable();
    const beforeSaveCallback = (data) => {
        callbacks.saveQueryRequested({
            queryLayout: encodeURIComponent(JSON.stringify(data)),
            connection: encodeURIComponent(serializeDataConnection(dataConnection))
        });
    };
    const initQuery = (querySource) => {
        query(new QueryViewModel(querySource, options.dbSchemaProvider(), parametersMode, (data) => beforeSaveCallback(data)));
    };
    initQuery(options.querySource());
    const designerModel = _createDesignerModel(query, surface, options);
    disposableCallback && designerModel.addDisposables(disposableCallback);
    designerModel.rootStyle = 'dxqb-designer dxd-back-primary-invariant';
    const previewPopupContainer = getParentContainer;
    designerModel.dataPreview = {
        isLoading: ko.observable(false),
        isVisible: ko.observable(false),
        title: () => getLocalization('Data Preview (First 100 Rows Displayed)', 'AnalyticsCoreStringId.DataPreview_Title'),
        template: 'dxqb-data-preview',
        data: {
            value: ko.observable()
        },
        okButtonText: () => getLocalization('OK', 'DataAccessUIStringId.Button_OK'),
        okButtonHandler: (e) => {
            e.model.isVisible(false);
        },
        container: previewPopupContainer
    };
    designerModel.selectStatmentPreview = {
        isLoading: ko.observable(false),
        isVisible: ko.observable(false),
        template: 'dxqb-selectstatment-preview',
        title: () => getLocalization('Select Statement Preview', 'AnalyticsCoreStringId.QueryBuilder_SelectStatementPreview_Title'),
        data: {
            value: ko.observable(),
            aceOptions: createDefaultSQLAceOptions(true),
            aceAvailable: aceAvailable(),
            additionalOptions: createDefaultSQLAdditionalOptions((newVal) => { designerModel.selectStatmentPreview.data.value(newVal); }),
            languageHelper: createDefaultSQLLanguageHelper()
        },
        okButtonText: () => getLocalization('OK', 'DataAccessUIStringId.Button_OK'),
        okButtonHandler: (e) => {
            e.model.isVisible(false);
        },
        container: previewPopupContainer
    };
    designerModel.parts = [
        { id: QueryBuilderElements.Surface, templateName: QueryBuilderElements.Surface, model: designerModel },
        { id: QueryBuilderElements.Toolbar, templateName: QueryBuilderElements.Toolbar, model: designerModel },
        { id: QueryBuilderElements.RightPanel, templateName: QueryBuilderElements.RightPanel, model: designerModel },
        { id: QueryBuilderElements.DataPreview, templateName: QueryBuilderElements.DataPreview.split('#')[0], model: designerModel.dataPreview },
        { id: QueryBuilderElements.SqlPreview, templateName: QueryBuilderElements.SqlPreview.split('#')[0], model: designerModel.selectStatmentPreview }
    ];
    designerModel.columnDragHandler = new ColumnDragHandler(surface, designerModel.selection, designerModel.undoEngine, designerModel.snapHelper, designerModel.dragHelperContent);
    designerModel.fieldDragHandler = new DbObjectDragDropHandler(surface, designerModel.selection, designerModel.undoEngine, designerModel.snapHelper, designerModel.dragHelperContent);
    designerModel.connectionPointDragHandler = designerModel.columnDragHandler;
    designerModel.resizeHandler['handles'] = 'e,w';
    designerModel.columnsLoadingMsg = () => getLocalization('Loading...', 'DataAccessWebStringId.QueryBuilder_ColumnsLoading');
    const init = (querySource) => {
        initQuery(querySource);
        treeListOptions({
            itemsProvider: options.dbSchemaProvider(),
            treeListController: new QueryBuilderTreeListController(designerModel.undoEngine, query, designerModel.fieldDragHandler),
            selectedPath: ko.observable(),
            pageSize: 100,
            templateName: 'dxqb-treelist-item-with-search'
        });
    };
    designerModel.addDisposables(options.querySource.subscribe((newValue) => {
        init(newValue);
    }));
    init(options.querySource());
    const tablesTop = ko.observable(calculateWithZoomFactor(355)), itemPropertiesTabInfoModel = {
        editableObject: designerModel.editableObject,
        properties: new ObjectProperties(designerModel.editableObject, null, 1),
        fieldListModel: { treeListOptions: treeListOptions },
        tablesTop: tablesTop,
        searchPlaceholder: () => searchPlaceholder()
    };
    const tabPanelItem = new AccordionTabInfo(query, itemPropertiesTabInfoModel, designerModel.undoEngine, designerModel.selection.focused, parametersMode === ParametersMode.ReadWrite);
    const tabPanel = designerModel.tabPanel;
    tabPanel.removeTabs();
    tabPanel.addTab(tabPanelItem);
    tabPanel.width = calculateWithZoomFactor(375);
    designerModel.fieldDragHandler = new DbObjectDragDropHandler(surface, designerModel.selection, designerModel.undoEngine, designerModel.snapHelper, designerModel.dragHelperContent);
    designerModel.fieldListProvider = new QueryBuilderObjectsProvider(query, QueryBuilderObjectsProvider.whereClauseObjectsFilter);
    designerModel.dataBindingsProvider = designerModel.fieldListProvider;
    designerModel.parametersBindingsProvider = options.parametersItemsProvider || designerModel.dataBindingsProvider;
    designerModel.dataBindingsGroupProvider = new QueryBuilderObjectsProvider(query, QueryBuilderObjectsProvider.groupByObjectsFilter);
    designerModel.isLoading = createIsLoadingFlag(designerModel.model, options.dbSchemaProvider);
    designerModel.actionLists = new ActionLists(surface, designerModel.selection, designerModel.undoEngine, customizeDesignerActions(designerModel, callbacks && callbacks.customizeActions));
    if (!designerModel.isLoading()) {
        designerModel.undoEngine && designerModel.undoEngine().clearHistory();
    }
    designerModel.addDisposables(designerModel.isLoading.subscribe((value) => {
        designerModel.undoEngine && designerModel.undoEngine().clearHistory();
    }));
    designerModel.selection.focused(surface());
    const subscribe = surface.subscribe((newValue) => {
        designerModel.selection.focused(newValue);
    });
    designerModel.addDisposables({ dispose: () => subscribe.dispose() });
    designerModel.addDisposables(designerModel.editableObject.subscribe((newValue) => {
        tablesTop.notifySubscribers(null);
    }));
    appendStaticContextToRootViewModel(designerModel);
    if (applyBindings) {
        callbacks && callbacks.beforeRender && callbacks.beforeRender(designerModel);
        $.fn.constructor(element).empty();
        ko.cleanNode(element);
        ko.applyBindings(designerModel, element);
    }
    _updateSurfaceContentSizeSubscription(element, designerModel, surface, () => tablesTop(355));
    if (applyBindings) {
        designerModel.updateSurface();
    }
    designerModel.showPreview = () => {
        designerModel.dataPreview.isLoading(true);
        designerModel.dataPreview.isVisible(true);
        wrapper.getDataPreview(dataConnection, JSON.stringify(query().serialize(true)))
            .done((data) => {
            designerModel.dataPreview.data.value(JSON.parse(data.dataPreviewJSON));
            designerModel.dataPreview.isLoading(false);
        }).fail((data) => {
            designerModel.dataPreview.isVisible(false);
            ShowMessage(getErrorMessage(data));
        });
    };
    designerModel.showStatement = () => {
        designerModel.selectStatmentPreview.isLoading(true);
        designerModel.selectStatmentPreview.isVisible(true);
        wrapper.getSelectStatement(dataConnection, JSON.stringify(query().serialize(true)))
            .done((data) => {
            if (data.errorMessage)
                ShowMessage(data.errorMessage);
            designerModel.selectStatmentPreview.data.value(data.sqlSelectStatement);
            designerModel.selectStatmentPreview.isLoading(false);
        }).fail((data) => {
            designerModel.selectStatmentPreview.isVisible(false);
            ShowMessage(getErrorMessage(data));
        });
    };
    return designerModel;
}
export function createQueryBuilder(element, options, callbacks, applyBindings = true) {
    if (options.localization) {
        addCultureInfo({
            messages: options.localization
        });
    }
    config({ rtlEnabled: !!options.rtl });
    registerControls();
    const promises = [];
    callbacks && callbacks.customizeLocalization && callbacks.customizeLocalization(promises);
    return resolveFromPromises(promises, () => {
        return troubleshootingPageWrapper(() => _createQueryBuilder(element, options, callbacks, applyBindings), options.developmentMode, element);
    });
}
export function createQueryBuilderSurface(element, options, queryCreator) {
    const query = ko.observable(), surface = ko.observable();
    registerControls();
    const designerModel = _createDesignerModel(query, surface, options);
    const selectedTabPanel = new SelectedTabInfo(new ObjectProperties(designerModel.editableObject, null, 1));
    const tabPanel = designerModel.tabPanel;
    const collased = ko.observable(tabPanel.collapsed);
    let isUpdate = false;
    const lock = (callback) => {
        if (!isUpdate) {
            isUpdate = true;
            callback();
            isUpdate = false;
        }
    };
    designerModel.addDisposables({
        dispose: tabPanel.events.on('collapsedChanged', (args) => {
            lock(() => collased(tabPanel.collapsed));
        })
    });
    designerModel.addDisposables(collased.subscribe((newVal) => {
        lock(() => tabPanel.collapsed = newVal);
    }));
    const switcher = new RightPanelSwitcher(collased, designerModel.editableObject, options.showPropertyGridCondition, AccordionTabInfo._getSelectedItemPropertyName);
    designerModel.addDisposables(selectedTabPanel, tabPanel, switcher);
    tabPanel.removeTabs();
    tabPanel.addTab(selectedTabPanel);
    tabPanel.width = calculateWithZoomFactor(325);
    designerModel.parts = [
        { id: QueryBuilderElements.Surface, templateName: QueryBuilderElements.Surface, model: designerModel },
        { id: QueryBuilderElements.RightPanel, templateName: QueryBuilderElements.RightPanel, model: designerModel },
        { id: QueryBuilderElements.RightPanelSwitcher, templateName: QueryBuilderElements.RightPanelSwitcher, model: switcher },
    ];
    designerModel.columnDragHandler = new ColumnDragHandler(surface, designerModel.selection, designerModel.undoEngine, designerModel.snapHelper, designerModel.dragHelperContent);
    designerModel.connectionPointDragHandler = designerModel.columnDragHandler;
    designerModel.selection.focused(surface());
    designerModel.addDisposables(surface.subscribe((newValue) => {
        designerModel.selection.focused(newValue);
    }));
    designerModel.rootStyle = 'dxqb-designer dxd-back-primary-invariant';
    designerModel.resizeHandler['handles'] = 'e,w';
    designerModel.columnsLoadingMsg = () => getLocalization('Loading...', 'DataAccessWebStringId.QueryBuilder_ColumnsLoading');
    appendStaticContextToRootViewModel(designerModel);
    query(queryCreator(options));
    $.fn.constructor(element).empty();
    ko.cleanNode(element);
    ko.applyBindings(designerModel, element);
    _updateSurfaceContentSizeSubscription(element, designerModel, surface);
    designerModel.isLoading(false);
    designerModel.updateSurface();
    addDisposeCallback(element, function () {
        query() && query().dispose();
        surface() && surface().dispose();
        queryCreator = null;
        designerModel.disposableContainer.dispose();
        designerModel.dispose();
    });
    return designerModel;
}
