﻿/**
* DevExpress Analytics (dist\js\dx-analytics-core.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
declare module DevExpress.Analytics.Utils {
    import PropertyChangedEvents = DevExpress.Analytics.Serializer.Native.PropertyChangedEvents;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import IModelSerializerOptionsNative = DevExpress.Analytics.Serializer.Native.IModelSerializerOptionsNative;
    import NativeModelSerializer = DevExpress.Analytics.Serializer.Native.NativeModelSerializer;
    import IModelSerializerNative = DevExpress.Analytics.Serializer.Native.IModelSerializerNative;
    import IModelSerializerRefNative = DevExpress.Analytics.Serializer.Native.IModelSerializerRefNative;
    import IModel = DevExpress.Analytics.Serializer.Native.IModel;
    import EngineType = DevExpress.Analytics.Serializer.Native.EngineType;
    import IModelSerializer = DevExpress.Analytics.Utils.IModelSerializer;
    import IGlobalSubscribableValue = DevExpress.Analytics.Internal.IGlobalSubscribableValue;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import ElementViewModel = DevExpress.Analytics.Elements.ElementViewModel;
    import IElementMetadata = DevExpress.Analytics.Elements.IElementMetadata;
    import IElementViewModel = DevExpress.Analytics.Elements.IElementViewModel;
    import IPathRequest = DevExpress.Analytics.Utils.IPathRequest;
    import TreeListItemViewModel = DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
    import CustomItemCreatingInfo = DevExpress.ui.dxSelectBox.CustomItemCreatingInfo;
    import SimplifiedSearchMode = ;
    null.SimplifiedSearchMode;
    import IViewModel = DevExpress.Analytics.Serializer.Native.IViewModel;
    import ActionListsBase = DevExpress.Analytics.Internal.ActionListsBase;
    import IAjaxSetup = DevExpress.Analytics.Internal.IAjaxSetup;
    import IFetchSetup = DevExpress.Analytics.Internal.IFetchSetup;
    import IRequestManager = DevExpress.Analytics.Internal.IRequestManager;
    import IRequestManagerSettings = DevExpress.Analytics.Internal.IRequestManagerSettings;
    import AccessibilityKeyboardHelperBase = DevExpress.Analytics.Internal.AccessibilityKeyboardHelperBase;
    import BaseRenderingModel = DevExpress.Analytics.Serializer.Native.BaseRenderingModel;
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import IObjectPropertiesViewModel = DevExpress.Analytics.Widgets.IObjectPropertiesViewModel;
    import ObjectProperties = DevExpress.Analytics.Widgets.ObjectProperties;
    import ITabInfoOptions = DevExpress.Analytics.Utils.ITabInfoOptions;
    import ITabPanelItemViewModel = DevExpress.Analytics.Utils.ITabPanelItemViewModel;
    import TabInfo = DevExpress.Analytics.Utils.TabInfo;
    import RightPanelKeyboardHelperNative = DevExpress.Analytics.Internal.RightPanelKeyboardHelperNative;
    import IModelSerializer = DevExpress.Analytics.Serializer.Native.IModelSerializer;
    export type DisposableType = ko.Subscription | ko.ComputedFunctions | IDisposable;
    export interface IDisposable {
        dispose: () => void;
        _disposables?: Array<DisposableType>;
    }
    export class Disposable implements IDisposable {
        _disposables: Array<DisposableType>;
        isDisposing: boolean;
        constructor();
        disposeObservableArray(array: ko.ObservableArray<IDisposable>): void;
        resetObservableArray(array: ko.ObservableArray<any>): void;
        disposeArray(array: IDisposable[]): void;
        addDisposable(...disposables: Array<DisposableType | DisposeFunctionType>): void;
        dispose(): void;
        removeProperties(): void;
    }
    export {};
    export interface IPathRequest {
        fullPath: string;
        path: string;
        ref?: string;
        id?: string;
        dataSource?: any;
        state?: any;
        pathParts?: string[];
    }
    export class PathRequest implements IPathRequest {
        pathParts: string[];
        constructor(fullPath: string, pathParts?: string[]);
        fullPath: string;
        ref: string;
        id: string;
        path: string;
    }
    export class EventManager<Sender, EventType> extends Disposable {
        dispose(): void;
        private _handlers;
        call<K extends keyof EventType>(type: K, args?: EventType[K]): void;
        addHandler<K extends keyof EventType>(type: K, listener: (this: Sender, ev: EventType[K]) => any): void;
        removeHandler<K extends keyof EventType>(type: K, listener: (this: Sender, ev: EventType[K]) => any): void;
        on<K extends keyof EventType>(type: K, listener: (this: Sender, ev: EventType[K]) => any): () => void;
    }
    export class EventPropertyManager<Sender> extends EventManager<Sender, DevExpress.Analytics.Serializer.Native.PropertyChangedEvents> {
        call<K extends keyof DevExpress.Analytics.Serializer.Native.PropertyChangedEvents>(type: K, _args?: DevExpress.Analytics.Serializer.Native.PropertyChangedEvents[K]): void;
    }
    export function serializeDate(date: Date, dateDelimiter?: string): string;
    export function deserializeDate(dateTime: string): Date;
    export interface IModelSerializer extends IModelSerializerNative {
    }
    export interface IModelSerializerRef extends IModelSerializerRefNative {
    }
    export interface IModelSerializerOptions extends IModelSerializerOptionsNative {
    }
    export class ModelSerializer extends NativeModelSerializer {
        engineType: DevExpress.Analytics.Serializer.Native.EngineType;
        constructor(options?: IModelSerializerOptions);
        wrapPropertyArrayValue(value: unknown[]): unknown[];
        wrapPropertyValue(value: unknown): unknown;
        unwrapPropertyValue(value: unknown): unknown;
        setLinkProperty(viewModel: any, propertyName: string, newVal: any): any;
        getLinkProperty(viewModel: any, propertyName: string): any;
        generateProperty(model: DevExpress.Analytics.Serializer.Native.IModel, propertyName: string, value: unknown): void;
        generateArrayProperty(model: DevExpress.Analytics.Serializer.Native.IModel, propertyName: string, value: unknown[]): void;
    }
    export interface IEditorInfo {
        header?: string;
        content?: string;
        custom?: string;
        editorType?: any;
        extendedOptions?: any;
    }
    export interface ISerializationInfo {
        propertyName: string;
        modelName?: string;
        defaultVal?: any;
        type?: ISerializableModelConstructor;
        info?: DevExpress.Analytics.Utils.ISerializationInfoArray;
        from?: (val: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer) => any;
        toJsonObject?: any;
        array?: boolean;
        link?: boolean;
        editor?: IEditorInfo;
        displayName?: string;
        values?: {
            [key: string]: string;
        } | Observable<{
            [key: string]: string;
        }> | DevExpress.Analytics.Internal.IGlobalSubscribableValue<{
            [key: string]: string;
        }>;
        valuesArray?: Array<IDisplayedValue>;
        initialize?: (viewModel: any, serilizer?: DevExpress.Analytics.Serializer.Native.IModelSerializer) => void;
        validationRules?: Array<any>;
        validatorOptions?: any;
        editorOptions?: any;
        localizationId?: string;
        descriptionLocalizationId?: string;
        visible?: any;
        disabled?: any;
        valueStore?: any;
        addHandler?: () => any;
        alwaysSerialize?: boolean;
        template?: string;
        beforeSerialize?: (value: any) => any;
        isRequired?: boolean;
        localizable?: boolean;
        asRef?: boolean;
    }
    export interface IDisplayedValue {
        value: any;
        displayValue: string;
        localizationId?: string;
    }
    export interface ISerializationInfoArray extends Array<DevExpress.Analytics.Utils.ISerializationInfo> {
    }
    export interface ISerializableModel {
        _model?: any;
        getInfo?: () => DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export interface ISerializableModelConstructor extends ISerializableModel {
        new (model?: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer, info?: DevExpress.Analytics.Utils.ISerializationInfoArray): any;
    }
    export function addCultureInfo(json: {
        messages: any;
    }): void;
    export function getLocalization(text: string, id?: string, _removeWinSymblols?: boolean): any;
    export function _stringEndsWith(value: string, searchString: string): boolean;
    export function updateLocalization(object: {
        [key: string]: string;
    }): void;
    export class ControlsFactory<T extends string = string> {
        getControlInfo(controlType: T): DevExpress.Analytics.Elements.IElementMetadata;
        getControlType(model: any): string;
        createControl(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DevExpress.Analytics.Elements.IElementViewModel;
        controlsMap: {
            [key in T | string]?: DevExpress.Analytics.Elements.IElementMetadata;
        };
        registerControl(typeName: T, metadata: DevExpress.Analytics.Elements.IElementMetadata): void;
        _getPropertyInfoByDisplayName(info: DevExpress.Analytics.Utils.ISerializationInfoArray, path: string[], position: number): DevExpress.Analytics.Utils.ISerializationInfo;
        _getPropertyInfoByName(info: DevExpress.Analytics.Utils.ISerializationInfoArray, path: string[], position: number): DevExpress.Analytics.Utils.ISerializationInfo;
        _getPropertyInfo(info: DevExpress.Analytics.Utils.ISerializationInfoArray, path: string[], position: number): DevExpress.Analytics.Utils.ISerializationInfo;
        getPropertyInfo(controlType: T, path: any): DevExpress.Analytics.Utils.ISerializationInfo;
    }
    export interface IToolboxItemInfo {
        "@ControlType": string;
        index: number;
        canDrop?: any;
        group?: string;
        displayName?: string;
    }
    export class ToolboxItem {
        constructor(info: IToolboxItemInfo);
        disabled: ko.Observable<boolean>;
        info: IToolboxItemInfo;
        get type(): string;
        get imageClassName(): string;
        get imageTemplateName(): string;
        get index(): number;
        get displayName(): string;
    }
    export class _LatestChangeSet {
        changes: any;
        position: number;
        static Empty(): _LatestChangeSet;
        constructor(changes: any, position: number);
        equal(changeSet: _LatestChangeSet): boolean;
    }
    export interface IModelReady {
        isModelReady: ko.Computed<boolean>;
    }
    export class UndoEngine extends Disposable {
        private _ignoredProperties;
        private _getInfoMethodName?;
        private _alwaysSubscribeProperties;
        static _disposeUndoEngineSubscriptionsName: string;
        static tryGetUndoEngine(object: any): UndoEngine;
        private _groupObservers;
        private _groupPosition;
        private _observers;
        private _subscriptions;
        private _targetSubscription;
        private _visited;
        private _position;
        private _lockedPosition;
        private _inUndoRedo;
        private _model;
        private get _modelReady();
        private _disposeObserver;
        private _disposeRemovedRecord;
        private _disposeObservers;
        private properyChanged;
        private _currentEngineName;
        private visitProperties;
        private undoChangeSet;
        private redoChangeSet;
        private _disposeChilds;
        private _createDisposeFunction;
        private _callDisposeFunction;
        private _cleanSubscribtions;
        protected validatePropertyName(target: any, propertyName: string): string;
        subscribeProperty(property: any, subscribeChilds: any): ko.Subscription;
        subscribeProperties(properties: any): void;
        subscribe(target: any, info?: any): any[];
        getCurrentChangeSet(): _LatestChangeSet;
        private _removePropertiesSubscriptions;
        constructor(target: any, _ignoredProperties?: string[], _getInfoMethodName?: string, _alwaysSubscribeProperties?: any[]);
        redoEnabled: ko.Observable<boolean>;
        undoEnabled: ko.Observable<boolean>;
        dispose(): void;
        removeTargetSubscription(): void;
        undoAll(): void;
        reset(): void;
        clearHistory(): void;
        undo(removeNode?: boolean): void;
        redo(): void;
        _hasSessionChanges(): boolean;
        isIngroup: number;
        isDirty: ko.Computed<boolean>;
        start(): void;
        end(): void;
    }
    /// <reference types="jquery" />
    export interface IDataMemberInfo {
        name: string;
        displayName: string;
        actionsTemplate?: string;
        contenttemplate?: string;
        data?: any;
        isList?: boolean;
        specifics?: string;
        isSelected?: boolean;
        dataType?: string;
        templateName?: string;
        innerActions?: any;
        relationPath?: string;
        noDragable?: any;
        dragData?: any;
        icon?: string;
        items?: IDataMemberInfo[];
        isListType?: boolean;
        isSupportQueries?: boolean;
        cssRule?: {
            [key: string]: boolean;
        };
    }
    export interface IItemsProvider {
        getItems: (path: DevExpress.Analytics.Utils.IPathRequest) => JQueryPromise<IDataMemberInfo[]>;
        subscribeOnItemsChanged?: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel, callback: (promise: JQueryPromise<IDataMemberInfo[]>) => void) => () => void;
        getItemByPath?: (path: DevExpress.Analytics.Utils.IPathRequest) => JQueryPromise<IDataMemberInfo>;
        getValues?: (path: DevExpress.Analytics.Utils.IPathRequest) => JQueryPromise<any[]>;
    }
    export interface IHotKey {
        ctrlKey: boolean;
        keyCode: number;
    }
    export interface IActionViewModel extends IViewModel {
        ref?: string;
        displayText?: string;
        disabled?: boolean;
        hasSeparator?: boolean;
        visible?: boolean;
        selected?: boolean;
        templateName?: string;
        click: (e: any) => void;
        actionClass: string;
        block: {
            attr: {
                "aria-label": string;
                "aria-disabled": "true" | "false";
                "aria-pressed"?: "true" | "false";
            };
        };
        image: {
            templateName: string;
            class: string;
        };
    }
    export interface ISelectBoxActionViewModel extends IActionViewModel {
        getPopupContainer: (element: HTMLElement) => HTMLElement;
        widget: {
            value: any;
            onValueChanged: (newVal: any) => void;
            dataSource: any;
            opened?: boolean;
            displayExpr?: (val: number) => string;
            onCustomItemCreating?: (e: DevExpress.ui.dxSelectBox.CustomItemCreatingInfo) => void;
            onFocusOut?: (val: any) => void;
            onKeyUp?: (val: any) => void;
            itemTemplate?: any;
            placeholder?: string;
            searchMode?: SimplifiedSearchMode;
            width?: string;
            searchEnabled?: boolean;
            searchTimeout?: number;
            inputAttr: {
                "aria-label": string;
            };
            dropDownOptions?: {
                wrapperAttr?: {
                    class?: string;
                    "aria-label": string;
                };
            };
        };
    }
    export interface IContentActionViewModel extends IActionViewModel {
        contentData: any;
    }
    export interface IAction {
        id?: string;
        text?: string;
        textId?: string;
        container?: string;
        clickAction?: (model?: any) => void;
        hotKey?: IHotKey;
        hasSeparator?: boolean;
        isContextMenuAction?: boolean;
        templateName?: string;
        contentData?: any;
        position?: number;
        displayExpr?: (val: any) => string;
        onCustomItemCreating?: (e: DevExpress.ui.dxSelectBox.CustomItemCreatingInfo) => void;
        group?: () => string;
        displayText?: () => string;
        imageTemplateName?: Observable<string> | Computed<string> | string;
        imageClassName?: Observable<string> | Computed<string> | string;
        disabled?: Observable<boolean> | Computed<boolean> | boolean;
        visible?: Observable<boolean> | Computed<boolean> | boolean;
        selected?: Observable<boolean> | Computed<boolean> | boolean;
        zoom?: Subscribable<number> | number;
        zoomStep?: Subscribable<number>;
        zoomLevels?: Subscribable<number[]> | number[];
        getViewModel?: (parent: DevExpress.Analytics.Internal.ActionListsBase, index: number) => IActionViewModel;
    }
    export interface IActionKO extends IAction {
        disabled?: Observable<boolean> | Computed<boolean>;
    }
    export interface IActionGroup {
        groupName: string;
        actions: IAction;
    }
    interface IRequestManagerSetup {
        ajaxSetup?: DevExpress.Analytics.Internal.IAjaxSetup;
        fetchSetup?: DevExpress.Analytics.Internal.IFetchSetup;
    }
    export const requestManager: {
        getInstance: (requestManagerSetup?: IRequestManagerSetup) => DevExpress.Analytics.Internal.IRequestManager<JQueryAjaxSettings | IRequestManagerSettings>;
        _initialize: (requestManagerSetup?: IRequestManagerSetup) => void;
        initialize: (requestManagerInstance?: DevExpress.Analytics.Internal.IRequestManager<JQueryAjaxSettings | IRequestManagerSettings>) => void;
    };
    export function _isFetchConfigured(): boolean;
    export {};
    export const ajaxSetup: DevExpress.Analytics.Internal.IAjaxSetup;
    export const fetchSetup: DevExpress.Analytics.Internal.IFetchSetup;
    export interface ITabInfoOptions {
        text: string;
        template: string;
        model: any;
        keyboardHelper?: DevExpress.Analytics.Internal.AccessibilityKeyboardHelperBase;
        localizationId?: string;
        imageClassName?: string;
        imageTemplateName?: string;
        visible?: boolean;
        disabled?: boolean;
    }
    export interface ITabPanelItemViewModel<T = any> extends IViewModel {
        css: {
            class: string;
        };
        image: {
            class: string;
            templateName: string;
        };
        text: string;
        model: T;
        template: string;
        active: boolean;
        disabled: boolean;
        visible: boolean;
        click: (e: any) => void;
        keyboardHelper: DevExpress.Analytics.Internal.AccessibilityKeyboardHelperBase;
    }
    export class TabInfo<T = any> extends BaseRenderingModel<DevExpress.Analytics.Utils.ITabPanelItemViewModel<T>> {
        private _text;
        private _localizationId;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs): void;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs): void;
        createViewModel(): DevExpress.Analytics.Utils.ITabPanelItemViewModel<T>;
        constructor(options: DevExpress.Analytics.Utils.ITabInfoOptions);
        focus(): void;
        imageClassName: string;
        imageTemplateName: string;
        name: string;
        active: boolean;
        visible: boolean;
        disabled: boolean;
        template: string;
        model: any;
        keyboardHelper: DevExpress.Analytics.Internal.AccessibilityKeyboardHelperBase;
        get text(): string;
        collapsed: boolean;
    }
    export interface ITabPanelItemWithPropertyGridViewModel extends ITabPanelItemViewModel {
        propertyGrid: DevExpress.Analytics.Widgets.IObjectPropertiesViewModel;
        propertyGridModel: any;
    }
    export interface ITabInfoWithPropertyGridOptions extends ITabInfoOptions {
        propertyGridModel: any;
        engineType?: DevExpress.Analytics.Serializer.Native.EngineType;
    }
    export class TabInfoWithPropertyGrid extends TabInfo {
        createViewModel(): DevExpress.Analytics.Utils.ITabPanelItemViewModel<any>;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        constructor(options: ITabInfoWithPropertyGridOptions);
        propertyGridModel: any;
        propertyGrid: DevExpress.Analytics.Widgets.ObjectProperties;
    }
    export interface ITabPanelOptions {
        tabs: DevExpress.Analytics.Utils.TabInfo[];
        autoSelectTab?: boolean;
        rtl?: boolean;
        width?: number;
    }
    export interface ITabPanelViewModel extends IViewModel {
        tabs: Array<DevExpress.Analytics.Utils.ITabPanelItemViewModel>;
        width: number;
        class: string;
        keyboardHelper: any;
        getResizableOptions: ($element: Element, panelOffset: number, minWidth: number) => any;
        tabsElement: {
            class: string;
        };
        contentElement: {
            width: number;
            class: string;
        };
    }
    export class TabPanel extends BaseRenderingModel<ITabPanelViewModel> {
        private mapToTabsCollection;
        createViewModel(): ITabPanelViewModel;
        static Position: {
            Left: string;
            Right: string;
        };
        dispose(): void;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs): void;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs): void;
        private _onDisabledChanged;
        private _onVisibilityChanged;
        private _subscribeTab;
        constructor(options: ITabPanelOptions);
        getTabByName(tabName: string): DevExpress.Analytics.Utils.TabInfo;
        removeTabs(): void;
        addTab(tab: DevExpress.Analytics.Utils.TabInfo): void;
        private _resizableOptions;
        private _autoSelectTab;
        getResizableOptions: ($element: Element, panelOffset: number, minWidth: number) => any;
        tabs: DevExpress.Analytics.Utils.TabInfo[];
        toggleTabVisibility: (e: any) => void;
        selectTab: (e: any) => void;
        isEmpty: boolean;
        collapsed: boolean;
        _width: number;
        width: number;
        zoomFactor: number;
        headerWidth: number;
        position: string;
        toggleCollapsedImage: {
            class: string;
            template: string;
        };
        toggleCollapsedText: string;
        cssClasses: (extendedClass?: string) => string;
        keyboardHelper: DevExpress.Analytics.Internal.RightPanelKeyboardHelperNative;
    }
    export function floatFromModel(val: string, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>;
    export function parseBool(val: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): any;
    export function colorFromString(val: string, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
    export function saveAsInt(val: number): string;
    export function colorToInt(color: string): number;
    export function colorToString(val: string): string;
    export function registerBaseBinding(bindingName: string, optionsName?: string): void;
    export function addToBindingsCache(bindingText: string, value: ($context: any, $element: any) => any): void;
    /// <reference types="jquery" />
    export interface IDisplayExpressionConverter {
        toDisplayExpression(path: string, expression: string): JQueryPromise<string>;
        toRealExpression(path: string, expression: string): JQueryPromise<string>;
    }
    export interface IDisplayNameProvider {
        getDisplayNameByPath: (path: string, dataMember: string) => JQueryPromise<string>;
        getRealName: (path: string, displayDataMember: string) => JQueryPromise<string>;
    }
    export function deserializeArray<T>(model: any, creator: (item: any) => any): ko.ObservableArray<T>;
}
declare module DevExpress.Analytics.Internal {
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import IGlobalSubscribableValue = DevExpress.Analytics.Internal.IGlobalSubscribableValue;
    import IAction = DevExpress.Analytics.Utils.IAction;
    import IDesignerPart = DevExpress.Analytics.Internal.IDesignerPart;
    import IElementMetadata = DevExpress.Analytics.Elements.IElementMetadata;
    import ToolboxItem = DevExpress.Analytics.Utils.ToolboxItem;
    import IArea = DevExpress.Analytics.Elements.IArea;
    import IHoverInfo = DevExpress.Analytics.Internal.IHoverInfo;
    import ElementViewModel = DevExpress.Analytics.Elements.ElementViewModel;
    import IDisposable = DevExpress.Analytics.Utils.IDisposable;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import ITreeListItemViewModel = DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel;
    import INumericSize = DevExpress.Analytics.Elements.INumericSize;
    import MeasureUnit = DevExpress.Analytics.Internal.MeasureUnit;
    import PaddingModel = DevExpress.Analytics.Elements.PaddingModel;
    import ISnapLine = DevExpress.Analytics.Internal.ISnapLine;
    import ISurfaceContext = DevExpress.Analytics.Elements.ISurfaceContext;
    import SnapLinesCollector = DevExpress.Analytics.Internal.SnapLinesCollector;
    import SnapLineSurface = DevExpress.Analytics.Internal.SnapLineSurface;
    import Rectangle = DevExpress.Analytics.Elements.Rectangle;
    import ISelectionProvider = DevExpress.Analytics.Internal.ISelectionProvider;
    import SurfaceElementBase = DevExpress.Analytics.Elements.SurfaceElementBase;
    import IElementViewModel = DevExpress.Analytics.Elements.IElementViewModel;
    import ISelectionTarget = DevExpress.Analytics.Internal.ISelectionTarget;
    import SnapLinesHelper = DevExpress.Analytics.Internal.SnapLinesHelper;
    import SurfaceSelection = DevExpress.Analytics.Internal.SurfaceSelection;
    import DragHelperContent = DevExpress.Analytics.Internal.DragHelperContent;
    import Size = DevExpress.Analytics.Elements.Size;
    import UndoEngine = DevExpress.Analytics.Utils.UndoEngine;
    import IKeyboardCodesEnum = DevExpress.Analytics.Internal.IKeyboardCodesEnum;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    import IItemsProvider = DevExpress.Analytics.Utils.IItemsProvider;
    import IActionViewModel = DevExpress.Analytics.Utils.IActionViewModel;
    import ActionListsBase = DevExpress.Analytics.Internal.ActionListsBase;
    import IViewModel = DevExpress.Analytics.Serializer.Native.IViewModel;
    import IShortcutActionList = DevExpress.Analytics.Internal.IShortcutActionList;
    import IHotKey = DevExpress.Analytics.Utils.IHotKey;
    import BaseRenderingModel = DevExpress.Analytics.Serializer.Native.BaseRenderingModel;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import IActionListBaseViewModel = DevExpress.Analytics.Internal.IActionListBaseViewModel;
    import IActionsProvider = DevExpress.Analytics.Internal.IActionsProvider;
    import KeyboardHelperBase = DevExpress.Analytics.Internal.KeyboardHelperBase;
    import KeyDownHandlersManager = DevExpress.Analytics.Internal.KeyDownHandlersManager;
    import AccessibilityControlElementBase = DevExpress.Analytics.Internal.AccessibilityControlElementBase;
    import IMutationObserverArgs = DevExpress.Analytics.Internal.IMutationObserverArgs;
    import IJSDesignerBindingCommonOptions = DevExpress.Analytics.Internal.IJSDesignerBindingCommonOptions;
    import DragDropHandler = DevExpress.Analytics.Internal.DragDropHandler;
    import ControlsFactory = DevExpress.Analytics.Utils.ControlsFactory;
    import IRequestManager = DevExpress.Analytics.Internal.IRequestManager;
    import ArrayStore = DevExpress.data.ArrayStore;
    import CustomStore = DevExpress.data.CustomStore;
    import IEditorInfo = DevExpress.Analytics.Utils.IEditorInfo;
    import IRequestManagerSettings = DevExpress.Analytics.Internal.IRequestManagerSettings;
    import ComputedOptions = DevExpress.Analytics.Serializer.Native.ComputedOptions;
    import MultiPlatformObservable = DevExpress.Analytics.Serializer.Native.MultiPlatformObservable;
    import MultiplatformEngine = DevExpress.Analytics.Serializer.Native.MultiplatformEngine;
    import IMutableOptions = DevExpress.Analytics.Serializer.Native.IMutableOptions;
    import ITreeListController = DevExpress.Analytics.Widgets.Internal.ITreeListController;
    import TreeListItemViewModel = DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
    import IPathRequest = DevExpress.Analytics.Utils.IPathRequest;
    import DataSource = DevExpress.data.DataSource;
    import IPoint = DevExpress.Analytics.Elements.IPoint;
    import ModelSerializer = DevExpress.Analytics.Utils.ModelSerializer;
    import ICopyPasteStrategy = DevExpress.Analytics.Internal.ICopyPasteStrategy;
    import IModelAction = DevExpress.Analytics.Internal.IModelAction;
    import PopupService = DevExpress.Analytics.Internal.PopupService;
    import Editor = DevExpress.Analytics.Widgets.Editor;
    import BaseRenderingMultiplatformModel = DevExpress.Analytics.Serializer.Native.BaseRenderingMultiplatformModel;
    import EngineType = DevExpress.Analytics.Serializer.Native.EngineType;
    import MultiPlatformComputed = DevExpress.Analytics.Serializer.Native.MultiPlatformComputed;
    import IGroupedItem = DevExpress.Analytics.Internal.IGroupedItem;
    import IPropertiesAccessibilityProvider = DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider;
    import ObjectProperties = DevExpress.Analytics.Widgets.ObjectProperties;
    import GroupObject = DevExpress.Analytics.Internal.GroupObject;
    import Group = DevExpress.Analytics.Internal.Group;
    import TabPanel = DevExpress.Analytics.Utils.TabPanel;
    import AccessibilityKeyboardHelperBase = DevExpress.Analytics.Internal.AccessibilityKeyboardHelperBase;
    import DisposableType = DevExpress.Analytics.Utils.DisposableType;
    import SelectionDragDropHandler = DevExpress.Analytics.Internal.SelectionDragDropHandler;
    import ToolboxDragDropHandler = DevExpress.Analytics.Internal.ToolboxDragDropHandler;
    import DesignControlsHelper = DevExpress.Analytics.Internal.DesignControlsHelper;
    import IDesignControlsHelper = DevExpress.Analytics.Internal.IDesignControlsHelper;
    import InlineTextEdit = DevExpress.Analytics.Internal.InlineTextEdit;
    import ControlsStore = DevExpress.Analytics.Internal.ControlsStore;
    import ActionLists = DevExpress.Analytics.Internal.ActionLists;
    import ControlProperties = DevExpress.Analytics.Internal.ControlProperties;
    import TabInfo = DevExpress.Analytics.Utils.TabInfo;
    import ContextMenuProvider = DevExpress.Analytics.Internal.ContextMenuProvider;
    import ICombinedProperty = DevExpress.Analytics.Internal.ICombinedProperty;
    import IDesignerModel = DevExpress.Analytics.Internal.IDesignerModel;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import IAjaxSetup = DevExpress.Analytics.Internal.IAjaxSetup;
    import localization = DevExpress.localization;
    import dxButton = DevExpress.ui.dxButton;
    import Properties = DevExpress.ui.dxButton.Properties;
    import KeyboardHelperWithArrowButtonBase = DevExpress.Analytics.Internal.KeyboardHelperWithArrowButtonBase;
    import ICollapsedViewModel = DevExpress.Analytics.Widgets.ICollapsedViewModel;
    import IEditorViewModel = DevExpress.Analytics.Widgets.IEditorViewModel;
    import IDisplayExpressionConverter = DevExpress.Analytics.Utils.IDisplayExpressionConverter;
    import IDisplayNameProvider = DevExpress.Analytics.Utils.IDisplayNameProvider;
    import ISearchOptions = DevExpress.Analytics.Internal.ISearchOptions;
    import ControlElementWithParentHighlight = DevExpress.Analytics.Internal.ControlElementWithParentHighlight;
    import IAccessibilityLiveRegion = DevExpress.Analytics.Internal.IAccessibilityLiveRegion;
    import ListKeyboardHelper = DevExpress.Analytics.Internal.ListKeyboardHelper;
    export function checkModelReady(model: any): boolean;
    export function guid(): string;
    /// <reference types="jquery" />
    export interface ICodeResolverTask {
        $promise: JQueryPromise<any>;
        dispose: () => void;
        doNext: () => void;
        force: () => void;
    }
    export class CodeResolver {
        private _queue;
        private _queueObj;
        private _done;
        private _doneOnce;
        clear(): void;
        done(callback: any): void;
        doneOnce(callback: any): void;
        private _executeNext;
        execute(func: any, time?: number): ICodeResolverTask;
    }
    export const globalResolver: CodeResolver;
    export function isPlainObject(obj: any): boolean;
    export function isEmptyObject(obj: any): boolean;
    export function isFunction(obj: any): boolean;
    export function extend(_target: any, object1?: any, ...objectN: any[]): any;
    export function assignObj(obj: object, objectProps?: object): object;
    export function _defineProperty(legacyObject: any, realObject: any, propertyName: any, newPropertyName?: any): void;
    export function _definePropertyByString(rootObject: any, ...objectPathes: string[]): void;
    export function addDisposeCallback(element: Node, callback: () => any): void;
    export interface IGlobalSubscribableValue<T> {
        (newVal?: T): T;
        subscribe: (callback: (newVal: T) => void) => () => void;
        notifySubscribers: (newVal: T) => void;
    }
    export function createGlobalModuleVariableFunc<T>(defaultVal: T, onValueChanged?: (value: T) => void): DevExpress.Analytics.Internal.IGlobalSubscribableValue<T>;
    /// <reference types="jquery" />
    export function loadMessages(_messages: {
        [key: string]: string;
    }): void;
    export function getLocalization(text: string, id?: string, _removeWinSymbols?: boolean): any;
    export const removeWinSymbols = true;
    export const Globalize: any;
    export const messages: {};
    export const custom_localization_values: {};
    export function selectPlaceholder(): any;
    export function noDataText(): any;
    export function searchPlaceholder(): any;
    export function resolveFromPromises<T>(promises: JQueryPromise<any>[], createModel: () => T): JQueryDeferred<T>;
    export function isCustomizedWithUpdateLocalizationMethod(text: string): boolean;
    export function localizeWithUpdateLocalizationMethod(oldText: string): string | boolean;
    export function localize(val: string): any;
    export function formatDate(val: any): string;
    export function parseDate(val: any, useDefault?: boolean, format?: string): Date;
    export interface ILocalizationInfo {
        text: string;
        localizationId: string;
    }
    export interface IFileUploadOptions {
        accept?: string;
        type?: string;
        readMode?: string;
    }
    export enum SearchMode {
        contains = 0,
        startWith = 1
    }
    export interface ISearchOptions {
        globalMatch?: boolean;
        canUseRegex?: boolean;
        caseSensitive?: boolean;
        searchMode?: SearchMode;
    }
    export interface IFileUploadResult {
        content: string;
        format: string;
    }
    export function _getFileContent(content: string, readMode: string): string;
    export let uploadFile: (options: IFileUploadOptions) => JQuery.Promise<IFileUploadResult, any, any>;
    export const _replaceUploadFile: (newFunc: any) => any;
    export function setUploadFile(newFunc: any): void;
    export function compareEditorInfo(editor1: any, editor2: any): boolean;
    export function findMatchesInString(stringWhereSearch: string, searchPattern: string, options?: DevExpress.Analytics.Internal.ISearchOptions): RegExpMatchArray;
    export function escapeToRegExp(value: String): string;
    export function stringRemove(value: string, start: number, count?: number): string;
    export function stringReplace(value: string, start: number, count?: number, newChar?: string): string;
    export function stringInsert(value: string, pos: number, subStr: string): string;
    export function formatUnicorn(format: string, ...args: any[]): string;
    export interface IModelAction {
        id?: string;
        action: (propertyName: string) => void;
        title: string;
        visible: (propertyName: string) => boolean;
        hint?: ko.Observable<string> | ko.Computed<string>;
        weight?: number;
        itemTemplate?: string;
        innerTemplate?: {
            name: string;
            data: {
                popupVisible: ko.Observable<boolean>;
                value: any;
            };
        };
        items?: DevExpress.Analytics.Internal.IModelAction[];
    }
    export interface IControlPropertiesViewModel {
        isPropertyDisabled: (name: string) => boolean;
        isPropertyVisible: (name: string) => boolean;
        isPropertyModified: (name: string) => boolean;
        isPropertyHighlighted?: (name: string) => boolean;
        controlType?: string;
        actions: DevExpress.Analytics.Internal.IModelAction[];
        actionProviders?: IModelActionProvider[];
        getInfo?: () => DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export type IModelActionProvider = {
        getActions: (name: string) => DevExpress.Analytics.Internal.IModelAction[];
    };
    export interface IUndoEngine {
        start: () => void;
        end: () => void;
    }
    export enum KeyboardEnum {
        Plus = "+",
        Minus = "-",
        Equal = "=",
        Tab = "Tab",
        Delete = "Delete",
        Enter = "Enter",
        Esc = "Escape",
        Space = " ",
        End = "End",
        Home = "Home",
        PageUp = "PageUp",
        PageDown = "PageDown",
        ArrowLeft = "ArrowLeft",
        ArrowUp = "ArrowUp",
        ArrowRight = "ArrowRight",
        ArrowDown = "ArrowDown"
    }
    export enum KeyboardCodesEnum {
        Tab = 9,
        Enter = 13,
        Esc = 27,
        Space = 32,
        End = 35,
        Home = 36,
        Left = 37,
        Up = 38,
        Right = 39,
        Down = 40
    }
    export type IKeyboardCodesEnum = {
        [key in keyof typeof KeyboardCodesEnum]?: (e: any, index?: number) => boolean;
    };
    export interface IHoverInfo {
        isOver: boolean;
        x: number;
        y: number;
        offsetX?: number;
        offsetY?: number;
        isNotDropTarget?: boolean;
    }
    export class HoverInfo implements IHoverInfo {
        private _x;
        private _y;
        isOver: boolean;
        get x(): number;
        set x(newX: number);
        get y(): number;
        set y(newY: number);
    }
    export const koUtils: {
        isSubscribable: (value: MaybeSubscribable) => value is Subscribable<any>;
        isComputed: (value: MaybeSubscribable) => value is Computed<any>;
        unwrap: <T = any>(value: MaybeSubscribable<T> | DevExpress.Analytics.Internal.IGlobalSubscribableValue<T>) => T;
    };
    export function getTypeNameFromFullName<T extends string = string>(controlType: string): string;
    export function getShortTypeName(controlType: string): string;
    export function getControlTypeName(value: any): any;
    export function getControlFullName(value: any): string;
    export function getImageClassName(_controlType: string, isTemplate?: boolean): string;
    export function getUniqueNameForNamedObjectsArray(objects: any[], prefix: string, names?: string[]): string;
    export function getUniqueName(names: string[], prefix: string, inculdeFirst?: boolean): string;
    export function objectsVisitor(target: any, visitor: (target: any) => any, visited?: any[], skip?: Array<string>): void;
    export function collectionsVisitor(target: any, visitor: (target: any, owner?: any) => any, collectionsToProcess?: string[], visited?: any[]): void;
    export interface IDesignerPart {
        id: string;
        templateName: string;
        model: any;
        viewModel?: any;
    }
    export function copyObservables(from: any, to: any): void;
    export interface IGroupedItem<T> {
        group: string;
        items: T[];
    }
    export function collectGroupsFromFlatList<T>(list: T[], getGroupId: (item: T) => string): DevExpress.Analytics.Internal.IGroupedItem<T>[];
    export function compareObjects(a: any, b: any): boolean;
    export function getFullPath(path: string, dataMember: string): string;
    export function loadTemplates(): any;
    export interface INamedValue {
        displayName: string;
        value: any;
    }
    export function cutRefs(model: any): any;
    export const DesignerBaseElements: {
        MenuButton: string;
        Toolbar: string;
        Toolbox: string;
        GroupedToolbox: string;
        Surface: string;
        RightPanel: string;
    };
    export function generateDefaultParts(model: any): DevExpress.Analytics.Internal.IDesignerPart[];
    export function createActionWrappingFunction(wrapperName: string, func: (model: any, originalHandler: (model?: any) => any) => any): (actions: DevExpress.Analytics.Utils.IAction[]) => void;
    export function localizeNoneString(noneValue: any): any;
    export function getToolboxItems(controlsMap: {
        [key: string]: DevExpress.Analytics.Elements.IElementMetadata;
    }, defaultGroup?: string): DevExpress.Analytics.Utils.ToolboxItem[];
    export function blur(element: Element): void;
    export interface ISelectingEvent {
        control: DevExpress.Analytics.Internal.ISelectionTarget;
        cancel: boolean;
        ctrlKey?: boolean;
    }
    export interface ISelectionTarget<T extends string = string> {
        rect: ko.Observable<DevExpress.Analytics.Elements.IArea> | ko.Computed<DevExpress.Analytics.Elements.IArea>;
        focused: ko.Observable<boolean> | ko.Computed<boolean>;
        selected: ko.Observable<boolean> | ko.Computed<boolean>;
        underCursor: ko.Observable<DevExpress.Analytics.Internal.IHoverInfo> | ko.Computed<DevExpress.Analytics.Internal.IHoverInfo>;
        allowMultiselect: boolean;
        locked: boolean;
        canDrop: () => boolean;
        getControlModel: () => DevExpress.Analytics.Elements.ElementViewModel<T>;
        checkParent: (surfaceParent: DevExpress.Analytics.Internal.ISelectionTarget<T>) => boolean;
        parent: DevExpress.Analytics.Internal.ISelectionTarget<T>;
        getChildrenCollection: () => ko.ObservableArray<DevExpress.Analytics.Internal.ISelectionTarget<T>>;
        dragCallback?: (item: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel) => void;
        dropCallback?: (item: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel) => void;
        findNextSelection?: () => DevExpress.Analytics.Internal.ISelectionTarget<T>;
    }
    export interface ISelectionProvider<T extends string = string> extends IDisposable {
        focused: ko.Observable<DevExpress.Analytics.Internal.ISelectionTarget<T>> | ko.Computed<DevExpress.Analytics.Internal.ISelectionTarget<T>>;
        selectedItems: DevExpress.Analytics.Internal.ISelectionTarget<T>[];
        initialize(surface?: DevExpress.Analytics.Internal.ISelectionTarget<T>): any;
        selecting(event: ISelectingEvent): any;
        unselecting(surface: DevExpress.Analytics.Internal.ISelectionTarget<T>): any;
        swapFocusedItem(surface: DevExpress.Analytics.Internal.ISelectionTarget<T>): any;
        ignoreMultiSelectProperties?: string[];
        selectionWithCtrl(surface?: DevExpress.Analytics.Internal.ISelectionTarget<T>): any;
        applySelection(): any;
    }
    export class SurfaceSelection extends Disposable implements ISelectionProvider {
        ignoreMultiSelectProperties: string[];
        dispose(): void;
        private _focused;
        private _firstSelected;
        private _selectedControls;
        private _selectedControlsInner;
        private _removeFromSelection;
        private _setFocused;
        private _resetTabPanelFocus;
        constructor(ignoreMultiSelectProperties?: string[]);
        focused: ko.PureComputed<DevExpress.Analytics.Internal.ISelectionTarget<string>>;
        get selectedItems(): DevExpress.Analytics.Internal.ISelectionTarget<string>[];
        clear(): void;
        reset(): void;
        applySelection(): void;
        selectItems(items: any): void;
        updateSelection(control: DevExpress.Analytics.Internal.ISelectionTarget): void;
        swapFocusedItem(control: DevExpress.Analytics.Internal.ISelectionTarget): void;
        initialize(control?: DevExpress.Analytics.Internal.ISelectionTarget): void;
        clickHandler(control?: DevExpress.Analytics.Internal.ISelectionTarget, event?: {
            ctrlKey: boolean;
            metaKey: boolean;
        }): void;
        selecting(event: ISelectingEvent): void;
        unselecting(control: DevExpress.Analytics.Internal.ISelectionTarget): void;
        selectionWithCtrl(control: DevExpress.Analytics.Internal.ISelectionTarget): void;
        dropTarget: DevExpress.Analytics.Internal.ISelectionTarget;
        expectClick: boolean;
        disabled: ko.Observable<boolean>;
    }
    export function roundingXDecimals(value: number, useFloor?: boolean, x?: number): number;
    export type MeasureUnit = "HundredthsOfAnInch" | "TenthsOfAMillimeter" | "Pixels";
    export function getPaperSize(kind: string, precision?: number): DevExpress.Analytics.Elements.INumericSize;
    export function unitsToPixel(val: number, measureUnit: DevExpress.Analytics.Internal.MeasureUnit, zoom?: number): number;
    export function pixelToUnits(val: number, measureUnit: DevExpress.Analytics.Internal.MeasureUnit, zoom: number): number;
    export interface IUnitProperties<M> {
        [key: string]: (o: M) => ko.Observable<number> | ko.Computed<number>;
    }
    export function createUnitProperty<M>(model: M, target: object, propertyName: string, property: (o: M) => ko.Observable<number> | ko.Computed<number>, measureUnit: ko.Observable<DevExpress.Analytics.Internal.MeasureUnit> | ko.Computed<DevExpress.Analytics.Internal.MeasureUnit>, zoom: ko.Observable<number> | ko.Computed<number>, afterCreation?: (property: any) => void): void;
    export function createUnitProperties<M>(model: M, target: object, properties: IUnitProperties<M>, measureUnit: ko.Observable<DevExpress.Analytics.Internal.MeasureUnit> | ko.Computed<DevExpress.Analytics.Internal.MeasureUnit>, zoom: ko.Observable<number> | ko.Computed<number>, afterCreation?: (property: any) => void): void;
    export interface IStyleContainer {
        rtl: () => boolean | undefined;
    }
    export function patchPositionByRTL(position: string, rtl: boolean): string;
    export class CssCalculator {
        private _rtlLayout;
        static DEFAULT_BORDER: string;
        private _control;
        private _getPixelValueFromUnit;
        private _patchPosition;
        private _getBorderWidth;
        createBorder(dashStyle: any, width: any, color: any, positions: any, position: any): {};
        createControlBorder(borderStyle: any, width: any, color: any, positions: any, position: any, defaultColor?: string): {};
        createBorders(borderStyle: any, width: any, color: any, positions: any, defaultColor?: string): any;
        createZipCodeFont(height: any): {};
        createFont(fontString: any): {};
        createVerticalAlignment(alignment: string): {};
        createHorizontalAlignment(alignment: string): {};
        createStrokeDashArray(style: any, width: any): string;
        createWordWrap(wordwrap: boolean, multiline: boolean): {};
        createAngle(angle: any): {
            "-webkit-transform": string;
            "-moz-transform": string;
            "-o-transform": string;
            "-ms-transform": string;
            transform: string;
        };
        constructor(control: IStyleContainer, _rtlLayout: ko.Observable<boolean> | ko.Computed<boolean> | boolean);
        borderCss: any;
        fontCss: any;
        zipCodeFontCss: any;
        textAlignmentCss: any;
        foreColorCss: any;
        paddingsCss: any;
        backGroundCss: any;
        stroke: any;
        strokeWidth: any;
        strokeWidthWithWidth: any;
        strokeDashArray: any;
        strokeDashArrayWithWidth: any;
        crossBandBorder: any;
        angle: any;
        wordWrapCss: any;
        cellBorder: any;
        zipCodeAlignment: any;
        contentSizeCss(controlSurfaceWidth: number, controlSurfaceHeight: number, zoom?: number, borders?: string, paddings?: DevExpress.Analytics.Elements.PaddingModel): {
            top: number;
            left: number;
            right: number;
            bottom: number;
            width: number;
            height: number;
        };
    }
    export function createObservableReverseArrayMapCollection<T>(elementModels: any, target: ko.ObservableArray<T>, createItem: (item: any) => T): any;
    export function createObservableArrayMapCollection<T>(elementModels: any, target: ko.ObservableArray<T>, createItem: (item: any) => T): any;
    export function knockoutArrayWrapper<T>(items?: any, ...onChange: Array<(array: any[], event?: string) => void>): ko.ObservableArray<T>;
    export function deserializeChildArray<T>(model: any, parent: any, creator: any): ko.ObservableArray<T>;
    export function getFirstItemByPropertyValue<T>(array: T[], propertyName: string, propertyValue: any, _fromIndex?: number): T;
    export function findFirstItemMatchesCondition<T>(array: T[], predicate: (item: T) => boolean): T;
    export const find: typeof findFirstItemMatchesCondition;
    export function binaryIndexOf<T>(ar: T[], el: T, compare: (a: T, b: T) => number): number;
    export const sizeFake: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const locationFake: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export interface ISnapLine {
        position: number;
        limitInf: number;
        limSup: number;
    }
    export class SnapLineSurface {
        private static _blankPosition;
        private _position;
        transform(): string;
        updatePosition(position: {
            top: number;
            left: number;
            width: number;
            height: number;
        }): void;
        reset(): void;
    }
    export class SnapLinesCollector {
        private _verticalSnapLines;
        private _horizontalSnapLines;
        private _snapTargetToIgnore;
        private _appendSnapLine;
        private _collectSnaplines;
        _getCollection(parent: any): {
            rect: ko.Observable<DevExpress.Analytics.Elements.IArea>;
        }[];
        _enumerateCollection(parent: any, parentAbsoluteProsition: {
            top: number;
            left: number;
        }, callback: (item: any, itemAbsoluteRect: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        }) => void): void;
        collectSnaplines(root: any, snapTargetToIgnore: any): {
            vertical: DevExpress.Analytics.Internal.ISnapLine[];
            horizontal: DevExpress.Analytics.Internal.ISnapLine[];
        };
    }
    export class SnapLinesHelper {
        static snapTolerance: number;
        private _snapTolerance;
        private _surfaceContext;
        private _snapLinesCollector;
        private _findClosestSnapLine;
        _getActiveSnapLines(position1: number, position2: number, snapLines: DevExpress.Analytics.Internal.ISnapLine[]): {
            lines: any[];
            distance: number;
        };
        constructor(surface?: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext> | ko.Computed<DevExpress.Analytics.Elements.ISurfaceContext>, snapTolerance?: number, snapLinesCollector?: DevExpress.Analytics.Internal.SnapLinesCollector);
        updateSnapLines(snapTargetToIgnore?: any): void;
        deactivateSnapLines(): void;
        activateSnapLines(position: {
            left: number;
            top: number;
            right: number;
            bottom: number;
        }): {
            left: number;
            top: number;
        };
        snapPosition(position: number, horizontal: boolean): number;
        snapLineSurfaces: DevExpress.Analytics.Internal.SnapLineSurface[];
        verticalSnapLines: DevExpress.Analytics.Internal.ISnapLine[];
        horizontalSnapLines: DevExpress.Analytics.Internal.ISnapLine[];
    }
    export class DragHelperControlRectangle extends Rectangle {
        position: number;
        constructor(position: number, left?: number, top?: number, width?: number, height?: number);
    }
    export class DragHelperContent extends Rectangle {
        private _selectionProvider;
        private get _isEmpty();
        constructor(selectionProvider: DevExpress.Analytics.Internal.ISelectionProvider);
        reset(): void;
        controls: ko.ObservableArray<DevExpress.Analytics.Elements.Rectangle | DragHelperControlRectangle>;
        customData: ko.Observable<{}>;
        template: string;
        update(surface: DevExpress.Analytics.Elements.SurfaceElementBase<any>): void;
        setContent(area: DevExpress.Analytics.Elements.Rectangle, customData?: {
            template: string;
            data?: any;
        }): void;
        isLocked: ko.Observable<boolean>;
    }
    export function propertiesVisitor(target: any, visitor: (properties: any[]) => any, visited?: any[], skip?: Array<string>): void;
    export function findSurface<T extends string = string>(viewModel: DevExpress.Analytics.Elements.IElementViewModel): DevExpress.Analytics.Internal.ISelectionTarget<T>;
    export function getControlNewAbsolutePositionOnResize(snapHelper: DevExpress.Analytics.Internal.SnapLinesHelper, absolutePosition: {
        top: number;
        left: number;
    }, ui: {
        originalSize: DevExpress.Analytics.Elements.INumericSize;
        size: DevExpress.Analytics.Elements.INumericSize;
    }, delta: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): {
        top: number;
        left: number;
        bottom: number;
        right: number;
    };
    export function getControlRect(element: any, control: DevExpress.Analytics.Internal.ISelectionTarget, surface: DevExpress.Analytics.Elements.ISurfaceContext): {
        top: number;
        left: number;
        width: any;
        height: any;
    };
    export function minHeightWithoutScroll(element: HTMLElement): number;
    export function chooseBetterPositionOf(html: any, designer: any): any;
    export function updateSurfaceContentSize(surfaceSize: ko.Observable<number> | ko.Computed<number>, root: Element, rtl?: boolean): () => void;
    export const convertToCssPixelUnits: (value: number) => string;
    export const convertFromCssPixelUnits: (value: string) => number;
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export class DragDropHandler extends Disposable {
        dispose(): void;
        static started: ko.Observable<boolean>;
        protected getTarget(event: MouseEvent): HTMLElement;
        protected _snapDisabled: boolean;
        surface: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext> | ko.Computed<DevExpress.Analytics.Elements.ISurfaceContext>;
        selection: DevExpress.Analytics.Internal.SurfaceSelection;
        snapHelper: DevExpress.Analytics.Internal.SnapLinesHelper;
        dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent;
        _size: DevExpress.Analytics.Elements.Size;
        _getAbsoluteSurfacePosition(uiElement: any): {
            left: number;
            top: number;
        };
        constructor(surface: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext> | ko.Computed<DevExpress.Analytics.Elements.ISurfaceContext>, selection: DevExpress.Analytics.Internal.SurfaceSelection, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, snapHelper?: DevExpress.Analytics.Internal.SnapLinesHelper, dragHelperContent?: DevExpress.Analytics.Internal.DragHelperContent);
        addControl(control: any, dropTargetSurface: any, size: any): void;
        recalculateSize(size: any): void;
        helper(draggable: any, event?: any): void;
        canDrop(dropTarget: any, controlModel: any, metaData: any): boolean;
        startDrag(_: any): void;
        drag(event: MouseEvent, uiElement: any, draggableModel: any): void;
        stopDrag: (uiElement: any, draggableModel: any, event?: any) => void;
        doStopDrag(uiElement: any, draggableModel: any, event?: any): void;
        parent: () => JQuery<any>;
        cursor: string;
        containment: string;
        alwaysAlt: boolean;
    }
    /// <reference types="jquery" />
    export interface IShortcutActionList {
        processShortcut: (e: JQueryKeyEventObject) => void;
        toolbarItems: DevExpress.Analytics.Utils.IAction[] | Observable<DevExpress.Analytics.Utils.IAction[]> | Computed<DevExpress.Analytics.Utils.IAction[]>;
        enabled?: () => boolean;
    }
    export class KeyboardHelperBase extends Disposable {
        private _processShortcut;
        processShortcut(e: JQueryKeyEventObject, index?: number): boolean;
        processChildrenShortcut(e: JQueryKeyEventObject, index?: number): boolean;
        shortcutMap: DevExpress.Analytics.Internal.IKeyboardCodesEnum;
        childrenShortcutMap: DevExpress.Analytics.Internal.IKeyboardCodesEnum;
    }
    export class KeyboardHelper extends KeyboardHelperBase {
        private _selection;
        private _undoEngine;
        constructor(selection: DevExpress.Analytics.Internal.ISelectionProvider, undoEngine?: Observable<DevExpress.Analytics.Utils.UndoEngine> | Computed<DevExpress.Analytics.Utils.UndoEngine>);
        processEsc(): void;
        moveSelectedControls(leftUp: boolean, isHoriz: boolean, sign: number): void;
    }
    export class KeyDownHandlersManager {
        private _handlers;
        private _targetElement;
        private get _activeHandler();
        private _removeHandler;
        constructor(targetElement: HTMLElement | Window);
        bindHandler(handler: (e: JQueryKeyEventObject) => void, eventName?: string): () => void;
    }
    export function GetWindowKeyDownHandlersManager(): DevExpress.Analytics.Internal.KeyDownHandlersManager;
    /// <reference types="jquery" />
    export function integerValueConverter(val: any, defaultValue: any, type?: any): any;
    export function enumValueConverter(val: any, defaultValue: any, valuesList: any): any;
    export interface IValidateExpressionOptions {
        fieldListProvider: DevExpress.Analytics.Utils.IItemsProvider;
        expression: string;
        path: string;
        rootItems?: string[];
    }
    export function validateExpression(options: IValidateExpressionOptions): JQuery.Promise<any, any, any>;
    export function floatValueConverter(val: any, defaultValue: any, type?: any): any;
    export let isDarkTheme: (theme?: string) => boolean;
    export function _setIsDarkTheme(callback: any): void;
    export function setCursorInFunctionParameter(paramCount: any, editor: any, insertValue: any): void;
    export function isList(data: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
    export function getParentContainer(el: HTMLElement, container?: string): any;
    export function isNullOrEmptyString(str: string): boolean;
    /// <reference types="jquery" />
    export interface IActionListBaseViewModel extends IViewModel {
        toolbarItems: DevExpress.Analytics.Utils.IActionViewModel[];
        processShortcut: (e: JQueryKeyEventObject) => void;
    }
    export function createActionListBaseViewModel(this: DevExpress.Analytics.Internal.ActionListsBase, base: DevExpress.Analytics.Serializer.Native.IViewModel): DevExpress.Analytics.Internal.IActionListBaseViewModel;
    export function createBaseActionViewModel(this: DevExpress.Analytics.Internal.ActionListsBase, action: DevExpress.Analytics.Utils.IAction, index: number): DevExpress.Analytics.Utils.IActionViewModel;
    /// <reference types="jquery" />
    export class ActionListsBase extends BaseRenderingModel<DevExpress.Analytics.Internal.IActionListBaseViewModel> implements IShortcutActionList {
        createViewModel(): DevExpress.Analytics.Internal.IActionListBaseViewModel;
        constructor(enabled?: () => boolean);
        subscribeOnChanges<T extends DevExpress.Analytics.Utils.IAction = DevExpress.Analytics.Utils.IAction>(action: T, viewModelAction: DevExpress.Analytics.Utils.IActionViewModel, propertyNames: Array<keyof T>): void;
        subscribe<T extends DevExpress.Analytics.Utils.IAction = DevExpress.Analytics.Utils.IAction>(model: T, propertyName: keyof T, callback: (newValue?: any) => void): void;
        createActionViewModel(action: DevExpress.Analytics.Utils.IAction, index: number): DevExpress.Analytics.Utils.IActionViewModel;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        mapActionToViewModels(actions: DevExpress.Analytics.Utils.IAction[]): DevExpress.Analytics.Utils.IActionViewModel[];
        getActions(): DevExpress.Analytics.Utils.IAction[];
        processShortcut(e: JQueryKeyEventObject): void;
        shouldIgnoreProcessing(e: JQueryKeyEventObject): boolean;
        enabled: () => boolean;
        toolbarItems: DevExpress.Analytics.Utils.IAction[] | Observable<DevExpress.Analytics.Utils.IAction[]> | Computed<DevExpress.Analytics.Utils.IAction[]>;
    }
    export class BaseAction extends BaseRenderingModel<DevExpress.Analytics.Utils.IActionViewModel> implements IAction {
        constructor(model?: DevExpress.Analytics.Utils.IAction);
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        createViewModel(parent?: DevExpress.Analytics.Internal.ActionListsBase, index?: number): DevExpress.Analytics.Utils.IActionViewModel;
        getViewModel(parent?: DevExpress.Analytics.Internal.ActionListsBase, index?: number): DevExpress.Analytics.Utils.IActionViewModel;
        imageClassName: string;
        imageTemplateName: string;
        disabled: boolean;
        visible: boolean;
        selected: boolean;
        text: string;
        textId: string;
        id: string;
        templateName: string;
        hasSeparator: boolean;
        contentData: any;
        hotKey: DevExpress.Analytics.Utils.IHotKey;
        clickAction: (model: any) => void;
        displayExpr: (value: any) => string;
        isVisible(): boolean;
        isDisabled(): boolean;
    }
    export interface IActionsProvider {
        getActions: (context: any) => DevExpress.Analytics.Utils.IAction[];
    }
    export interface IDisposableActionsProvider extends IActionsProvider, IDisposable {
    }
    export class BaseActionsProvider extends Disposable implements IDisposableActionsProvider {
        actions: DevExpress.Analytics.Utils.IAction[];
        initActions(actions: DevExpress.Analytics.Utils.IAction[]): void;
        getActions(context: any): DevExpress.Analytics.Utils.IAction[];
        condition(context: any): boolean;
        setDisabled: (context: any) => void;
    }
    export class AccessibilityControlElementBase extends Disposable {
        element: HTMLElement;
        private _eventListeners;
        dispose(): void;
        constructor(element: HTMLElement);
        addListener(element: HTMLElement, eventType: string, handler: any): void;
        setTabIndex(index: string): void;
        setFocus(): void;
    }
    /// <reference types="jquery" />
    export interface IAccessibilityLiveRegion {
        element: HTMLElement;
        changeText: (text: string, timeout?: number) => ReturnType<typeof setTimeout>;
    }
    export interface IMutationObserverArgs {
        onInitialized: (element: HTMLElement, accessibilityCompliant: boolean) => void;
        onDomUpdated: () => void;
        onDispose: () => void;
        controlElementClassName?: string;
    }
    export class AccessibilityKeyboardHelperBase extends KeyboardHelperBase implements IMutationObserverArgs {
        childrenInitialized: boolean;
        accessibilityCompliantEnabled: boolean;
        focusFirstFocusableDescendant: boolean;
        controlElementClassName: string;
        controlElements: DevExpress.Analytics.Internal.AccessibilityControlElementBase[];
        startIndex: number;
        liveRegionId: string;
        private _prevActiveElement;
        private _eventListeners;
        private _elementContainer;
        private _liveRegion;
        private _disposeItems;
        constructor();
        getElements(predicate?: (elt: Element) => boolean): any;
        initialize(predicate?: (elt: Element) => boolean, elements?: any): void;
        getIndexByElement(htmlElement: any): number;
        createControlElement(element: HTMLElement, index?: number): DevExpress.Analytics.Internal.AccessibilityControlElementBase;
        setTabIndexes: (index: any) => void;
        getContainer(): HTMLElement;
        changeFocus(index: number, roundTrip?: boolean): number;
        bindHandler(elementContainer: HTMLElement): void;
        handleEscKey(e: any, index?: any): boolean;
        handleTabKey(e: any): boolean;
        handleShiftTabKey(e: any): boolean;
        handleEnterKey(e: any): boolean;
        handleSpaceKey(e: any): boolean;
        handleEndKey(e: any): boolean;
        handleHomeKey(e: any): boolean;
        handleUpArrowKey(e: any): boolean;
        handleDownArrowKey(e: any): boolean;
        handleLeftArrowKey(e: any): boolean;
        handleRightArrowKey(e: any): boolean;
        itemHandleHomeKey(e: any, index?: any): boolean;
        itemHandleEndKey(e: any, index?: any): boolean;
        itemHandleLeftArrowKey(e: any, index?: any): boolean;
        itemHandleRightArrowKey(e: any, index?: any): boolean;
        itemHandleEnterKey(e: any, index?: any): boolean;
        itemHandleSpaceKey(e: any, index?: any): boolean;
        itemHandleUpArrowKey(e: any, index?: any): boolean;
        itemHandleDownArrowKey(e: any, index?: any): boolean;
        itemHandleTabKey(e: any, index?: any): boolean;
        itemHandleShiftTabKey(e: any, index?: any): boolean;
        itemHandleEscKey(e: any, index?: any): boolean;
        setFocusToPrevious(currentIndex: number, roundTrip?: boolean): number;
        setFocusToNext(currentIndex: number, roundTrip?: boolean): number;
        clickHandler(e: any, index: any): void;
        dispose(): void;
        addListener(element: HTMLElement, index: number, eventType: string, handler: any): void;
        focus(prevActiveElement?: Element): void;
        liveRegion: () => DevExpress.Analytics.Internal.IAccessibilityLiveRegion;
        lastFocusItem(): HTMLElement;
        onInitialized: (element: HTMLElement, accessibilityCompliant: boolean) => void;
        onDomUpdated: () => void;
        onDispose: () => void;
        protected _handlersManager: DevExpress.Analytics.Internal.KeyDownHandlersManager;
        protected _keyDownHandler(e: JQueryKeyEventObject): void;
    }
    export interface IResizable {
        handles?: string;
        filter?: string;
        distance?: number;
        minimumHeight?: number;
        minimumWidth?: number;
        selecting?: (event: MouseEvent, element: Element) => void;
        start: (event: MouseEvent, ui?: any) => void;
        stop: () => void;
        resize: (event: MouseEvent, element: Element, boundsDiff: DevExpress.Analytics.Elements.IArea) => void;
    }
    export type IResizableOptions = IResizable & {
        starting?: (ev: any) => void;
        $element?: Element;
        stopped?: () => void;
        zoom?: number;
        disabled?: boolean | ko.Observable<boolean>;
        handles?: string | ko.Observable<string>;
        minimumWidth?: ko.Observable<number> | number;
        maximumWidth?: ko.Observable<number> | number;
        started?: boolean;
        $selectedNodes?: any;
        snapHelper?: DevExpress.Analytics.Internal.SnapLinesHelper;
    };
    export function initializeBaseResizableOptions(values: IResizableOptions): IResizableOptions;
    export function initializeResize(element: HTMLElement, options: IResizableOptions): () => void;
    export class Resizable extends Disposable {
        private _element;
        private _options;
        static inProcess: boolean;
        readonly handleClass: string;
        readonly handleClassSelector: string;
        readonly resizableElementClass = "ui-resizable";
        readonly _defaultMinSize = 1;
        private _bodyEvents;
        private _startResizeMousePosition;
        private _resizeDirection;
        private _resizeHandles;
        private _initResize;
        private _mouseMove;
        private _mouseUp;
        private _mouseDown;
        private _initResizeHandle;
        private _addClassToElement;
        private _removeClassFromElement;
        private _getBoundsDiff;
        constructor(_element: HTMLElement, _options: IResizable);
        initialize(): Resizable;
    }
    export function getResizeDirection(currentClassList: DOMTokenList): string;
    interface IDraggable {
        start: (event: MouseEvent, uiElement?: any) => void;
        stop: (event: any, uiElement: any) => void;
        drag: (event: MouseEvent, element: Element, boundsDiff?: DevExpress.Analytics.Elements.IArea) => void;
        containment: any;
        helper: any;
        initDrag: any;
        boundary: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
        disabled: () => boolean;
    }
    export class Draggable extends Disposable {
        private _element;
        private _options;
        static inProcess: boolean;
        private _bodyEvents;
        private _windowEvents;
        private _originalDragStartCoordinates;
        private _originalElementPosition;
        private _startRect;
        private _dragInitialized;
        private _scrollableContainer;
        private readonly _draggableElementClass;
        private readonly _minDragDistance;
        private _initScrollContainer;
        private _initDrag;
        private _addClassToElement;
        private _calculateElementPosition;
        private _mouseMove;
        private shouldStartDrag;
        private _mouseUp;
        private _ghostContainer;
        private _mouseDown;
        private _canDrag;
        constructor(_element: any, _options: IDraggable);
    }
    export {};
    interface ISelectableOptions {
        filter: string;
        distance: number;
        selecting: (event: MouseEvent, element: Element) => void;
        start: (event: MouseEvent) => void;
        stop: () => void;
        unselecting: (event: MouseEvent, element: Element) => void;
        disabled: boolean;
        zoom: number;
    }
    export class SelectableElement extends Disposable {
        private _element;
        private _options;
        updateSelection(currentRect: DevExpress.Analytics.Elements.IArea, event: MouseEvent): void;
        constructor(_element: Element, _options: ISelectableOptions);
        bounds: DevExpress.Analytics.Elements.IArea;
        isSelected: boolean;
    }
    export class Selectable extends Disposable {
        private _element;
        private _options;
        static inProcess: boolean;
        static disabled: boolean;
        private _elements;
        private _$window;
        private _$selectionContent;
        private _bodyEvents;
        private _clearElements;
        private _collectElements;
        private _startRect;
        readonly _minSelectDistance = 2;
        private _updateSelectionContent;
        private _initStartRect;
        private _mouseMove;
        private shouldStartSelect;
        private _mouseUp;
        private _mouseDown;
        constructor(_element: Element, _options: ISelectableOptions);
    }
    export {};
    export function initializeMutationObserver(element: HTMLElement, mutationObserverArgs: DevExpress.Analytics.Internal.IMutationObserverArgs, accessibilityCompliant: boolean): () => void;
    export interface IJQueryWrapper {
        isVisible: () => boolean;
        has: (target: HTMLElement) => boolean;
        is: (target: HTMLElement | string) => boolean;
        hasClass: (className: string) => boolean;
        outerWidth: () => number;
        outerHeight: () => number;
        width: () => number;
        height: () => number;
        empty: () => IJQueryWrapper;
        hide: () => IJQueryWrapper;
        show: () => IJQueryWrapper;
        find: (selector: string, filterVisible?: boolean) => IJQueryWrapper;
        css: (styles: object | string, value?: string) => string;
        children: (selector: string) => IJQueryWrapper;
        closest: (selector: string) => IJQueryWrapper;
        removeClass: (className: string) => IJQueryWrapper;
        addClass: (className: string) => IJQueryWrapper;
        offset: () => {
            left: number;
            top: number;
        };
        position: () => {
            left: number;
            top: number;
        };
        get: (index: number) => HTMLElement;
        append: (content: string) => void;
        parentElement: () => IJQueryWrapper;
        prepend: (topElement: HTMLElement) => void;
        element: HTMLElement;
        length: number;
        [index: number]: HTMLElement;
    }
    export function $unwrap(_element: HTMLElement | Array<HTMLElement>): HTMLElement;
    export const $dx: (_element: HTMLElement | HTMLElement[] | string) => IJQueryWrapper;
    export const cssTransform: string[];
    export function updateZoomBinding(element: HTMLElement, value: number): void;
    export {};
    export {};
    export let DEBUG: boolean;
    export function DebugMode(value: boolean): void;
    export const NotifyType: {
        info: string;
        warning: string;
        error: string;
        success: string;
    };
    export function NotifyAboutWarning(msg: any, showForUser?: boolean): void;
    export function getErrorMessage(deferredResult: any): any;
    export let ShowMessage: (msg: string, type?: string, displayTime?: number, debugInfo?: string, contentTemplate?: any, containerElement?: Element) => void;
    export const _setShowMessageFunc: (func: any) => any;
    export const _resetShowMessageFunc: () => (msg: string, type?: string, displayTime?: number, debugInfo?: string, contentTemplate?: any, containerElement?: Element) => void;
    export const _muteWarnings: () => boolean;
    export const _unmuteWarnings: () => boolean;
    /// <reference types="jquery" />
    export const _addErrorPrefix = true;
    export function _processError(errorThrown: string, deferred: JQueryDeferred<any>, jqXHR: any, textStatus: any, processErrorCallback?: (message: string, jqXHR: any, textStatus: any) => void): void;
    export const _errorProcessor: {
        handlers: any[];
        call: (e: any) => void;
    };
    export function processErrorEvent(func: any): DevExpress.Analytics.Utils.IDisposable;
    export interface IJSDesignerBindingCommonOptions {
        callbacks?: {};
        requestOptions?: {
            host?: string;
            getLocalizationAction?: string;
        };
        developmentMode?: boolean;
    }
    export class RequestHelper {
        static generateUri(host: string, uri: string): string;
    }
    export const showTroubleshootingMessage: () => void;
    export const assignTroubleshootingPage: (element: Element | JQuery) => void;
    export const troubleshootingPageWrapper: (target: () => any, showErrorPage: boolean, element: Element | JQuery) => any;
    export const getTroubleshootingPage: () => string;
    /// <reference types="jquery" />
    export class JSDesignerBindingCommon<TSender, TOptions extends DevExpress.Analytics.Internal.IJSDesignerBindingCommonOptions> extends Disposable {
        protected _options: TOptions;
        protected _customEventRaiser?: (eventName: string, args?: any) => void;
        sender: TSender;
        protected developmentMode: boolean;
        dispose(): void;
        protected _fireEvent(eventName: string, args?: unknown): void;
        private _warnForIncorrectCallbackName;
        protected _checkCallbackName(availableEvents: any[]): void;
        protected _getServerActionUrl(host: string, uri: string): string;
        protected _generateCallbackDictionary(eventsArray: any[], prefix?: string): any;
        protected _templateHtml: string;
        protected _getLocalizationRequest(): JQueryPromise<{
            messages: any;
        }>;
        protected _createDisposeFunction(element: HTMLElement): void;
        static convertCallbackArrayToDictionary(callbackArray: any[]): {};
        constructor(_options: TOptions, _customEventRaiser?: (eventName: string, args?: any) => void);
    }
    export class DxAnalyticsComponentCommon<TOptions extends DevExpress.Analytics.Internal.IJSDesignerBindingCommonOptions> {
        private _element;
        private _options;
        constructor(_element: HTMLElement, _options: TOptions);
        getBindingName(): string;
        render(): void;
        dispose(): void;
    }
    export class SelectionDragDropHandler extends DragDropHandler {
        adjustDropTarget(dropTargetSurface: DevExpress.Analytics.Internal.ISelectionTarget): DevExpress.Analytics.Internal.ISelectionTarget;
        constructor(surface: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext> | ko.Computed<DevExpress.Analytics.Elements.ISurfaceContext>, selection: DevExpress.Analytics.Internal.SurfaceSelection, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, snapHelper: DevExpress.Analytics.Internal.SnapLinesHelper, dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent);
        startDrag(control: DevExpress.Analytics.Internal.ISelectionTarget): void;
        drag(event: any, uiElement: any, draggable: any): void;
        getLocation(adjustedTarget: any, item: any): DevExpress.Analytics.Elements.IArea;
        ajustLocation(adjustedTarget: any, item: any): void;
        doStopDrag(uiElement: any, _: any): void;
    }
    export class ToolboxDragDropHandler extends DragDropHandler {
        private _controlsFactory;
        constructor(surface: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext> | ko.Computed<DevExpress.Analytics.Elements.ISurfaceContext>, selection: DevExpress.Analytics.Internal.SurfaceSelection, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, snapHelper: DevExpress.Analytics.Internal.SnapLinesHelper, dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent, controlsFactory: DevExpress.Analytics.Utils.ControlsFactory);
        helper(draggable: any): void;
        doStopDrag(uiElement: any, draggableModel: any): void;
    }
    export interface IWizardDragDropHandlerOptions {
        dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent;
        addHandler: (dropTarget: any, item: any, position?: {
            left: number;
            top: number;
        }) => void;
        parent: string;
        containment: string;
        target?: string;
    }
    export class WizardDragDropHandler extends DragDropHandler {
        protected _dropTarget: any;
        protected _addHandler: any;
        protected _target: any;
        constructor(options: IWizardDragDropHandlerOptions);
        helper(draggable: any, event: any): any;
        doStopDrag(uiElement: any, _: any): void;
        drag(event: MouseEvent, ui: any): void;
    }
    /// <reference types="jquery" />
    export interface IRequestManagerSettings {
        headers?: {
            [key: string]: any;
        };
        data?: {};
        type?: string;
        url?: string;
        abortController?: AbortController;
        beforeSend?: (settings: RequestInit) => void;
    }
    export interface IRequestManager<T = DevExpress.Analytics.Internal.IRequestManagerSettings> {
        sendRequest: (settings: T) => JQueryPromise<any>;
        useFetch?: boolean;
    }
    /// <reference types="jquery" />
    export class AjaxRequestManager implements IRequestManager<JQueryAjaxSettings> {
        getAjaxSettings: () => JQueryAjaxSettings;
        constructor(ajaxSttingsFn: () => JQueryAjaxSettings);
        sendRequest(settings: JQueryAjaxSettings): JQueryXHR;
        _prepareRequestSettings(settings: JQueryAjaxSettings): JQueryAjaxSettings;
    }
    /// <reference types="jquery" />
    export interface IAjaxSetup {
        ajaxSettings: JQueryAjaxSettings;
        sendRequest: (settings: JQueryAjaxSettings) => JQueryPromise<any>;
    }
    export class CustomSortedArrayStore extends CustomStore {
        static _sortItems(items: any[], sortPropertyName: string): any[];
        static _createOptions(items: any, sortPropertyName: any): {
            load: (options: any) => JQuery.Promise<any, any, any>;
            byKey: (key: any) => any;
        };
        constructor(items: any[], sortPropertyName?: string);
    }
    export class SortedArrayStore extends ArrayStore {
        constructor(options: any, sortPropertyName?: string);
    }
    export interface IDisplayedObject {
        name: ko.Observable<string> | ko.Computed<string>;
    }
    export interface IDesignControlsHelper extends IDisposable {
        getControls: (target: any) => ko.ObservableArray<IDisplayedObject>;
        allControls: ko.ObservableArray<IDisplayedObject>;
        getNameProperty?: (model: any) => ko.Observable<string> | ko.Computed<string>;
        getControlByName: (name: string) => IDisplayedObject;
    }
    export class DesignControlsHelper extends Disposable implements IDesignControlsHelper {
        protected target: any;
        private collectionNames?;
        private _handlers;
        private _setText;
        private _visitedCollections;
        private _subscriptions;
        getNameProperty(model: any): any;
        getControlByName(name: string): any;
        protected _setName(value: any): void;
        protected _setDefaultText(value: any): void;
        protected _getNamePrefix(value: any): string;
        dispose(): void;
        private added;
        private deleted;
        processCollection(collection: any): void;
        _collectControls(target: any): void;
        constructor(target: any, handlers?: Array<{
            added: (control: any) => void;
            deleted?: (control: any) => void;
        }>, collectionNames?: string[]);
        getControls(target: any): ko.ObservableArray<IDisplayedObject>;
        allControls: ko.ObservableArray<IDisplayedObject>;
    }
    export const ExpressionType = "DevExpress.DataAccess.Expression";
    export function IsDataAccessExpression(type: string): boolean;
    export const editorTypeMapper: {
        [key: string]: DevExpress.Analytics.Utils.IEditorInfo;
    };
    export function getEditorType(typeString: string): {
        header?: any;
        content?: any;
        custom?: any;
    };
    /// <reference types="jquery" />
    export class FetchRequestManager implements IRequestManager {
        getFetchSettings: () => DevExpress.Analytics.Internal.IRequestManagerSettings;
        constructor(fetchSettingsFn: () => DevExpress.Analytics.Internal.IRequestManagerSettings);
        sendRequest(settings: DevExpress.Analytics.Internal.IRequestManagerSettings): JQueryPromise<any>;
        _executeRequest: (method: string, url: string, body: FormData, params?: Object, abortControler?: AbortController) => JQueryPromise<any>;
        _fetch: (method: string, url: string, body: any, params?: any, abortControler?: AbortController) => Promise<Response>;
        _prepareParams(settings: DevExpress.Analytics.Internal.IRequestManagerSettings): {
            method: string;
            preparedUrl: string;
            body: FormData;
            params: {};
        };
        useFetch: boolean;
    }
    export interface IFetchSetup {
        fetchSettings: DevExpress.Analytics.Internal.IRequestManagerSettings;
    }
    export interface ILocalizationSettings extends IGlobalizeSettings {
        localization?: {
            [stringId: string]: string;
        };
    }
    export interface IGlobalizeSettings {
        currentCulture?: string;
        cldrData?: string;
        cldrSupplemental?: string;
    }
    export function initGlobalize(settings: IGlobalizeSettings): void;
    export function processTextEditorHotKeys(event: KeyboardEvent, delegates: any): void;
    export class InlineTextEdit extends Disposable {
        private _showInline;
        text: ko.Observable<string> | ko.Computed<string>;
        visible: ko.Observable<boolean> | ko.Computed<boolean>;
        element: HTMLElement;
        keypressAction: any;
        show: any;
        constructor(selection: DevExpress.Analytics.Internal.ISelectionProvider);
    }
    export function isDefined(object: any): boolean;
    export class KoEngine extends MultiplatformEngine {
        private _notifyModel;
        addDisposeCallback(element: Node, disposeCallback: () => void): void;
        removeDisposeCallback(element: Node, disposeCallback: () => void): void;
        peek(value: any): any;
        getPropertyValue(model: any, propertyName: any): any;
        setPropertyValue(model: any, propertyName: any, value: any, currentValue?: any): void;
        generateProperty(model: any, propertyName: any, value: any, options?: DevExpress.Analytics.Serializer.Native.IMutableOptions): void;
        generateArrayProperty(model: any, propertyName: any, value: any, options?: DevExpress.Analytics.Serializer.Native.IMutableOptions): void;
        createComputedProperty(configurableModel: any, configurablePropertyName: any, comOptions: DevExpress.Analytics.Serializer.Native.ComputedOptions<any>, properties: any, options?: DevExpress.Analytics.Serializer.Native.IMutableOptions, pure?: boolean): () => void;
        subscribeOnPropertyChanged(model: any, subscribablePropertyName: any, callback: (newVal: any) => void): () => void;
        subscribeValue(value: any, callback: (newVal: any) => void): () => void;
        unwrap(value: any): any;
        wrap<T>(value: T): DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<T>;
        applyBindings(value: unknown, element: Element): void;
        cleanNode(element: Element): void;
    }
    export function useKoIntegration(): void;
    export class ObjectStructureTreeListController extends Disposable implements ITreeListController {
        dispose(): void;
        constructor(propertyNames?: string[], listPropertyNames?: string[]);
        canSelect(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
        dragDropHandler: DevExpress.Analytics.Internal.DragDropHandler;
        selectedItem: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
        dblClickHandler: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void;
        select: (value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void;
        itemsFilter: (item: DevExpress.Analytics.Utils.IDataMemberInfo, path?: string) => boolean;
        hasItems: (item: DevExpress.Analytics.Utils.IDataMemberInfo) => boolean;
        getActions: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => DevExpress.Analytics.Utils.IAction[];
        showIconsForChildItems: (item?: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => boolean;
    }
    /// <reference types="jquery" />
    export interface IRootItem {
        model: any;
        displayName?: string;
        name: string;
        className: string;
        data?: any;
        hasContextMenu?: boolean;
    }
    export class ObjectStructureProviderBase extends Disposable implements IItemsProvider {
        getClassName(instance: any): any;
        createItem(currentTarget: any, propertyName: string, propertyValue: any, result: DevExpress.Analytics.Utils.IDataMemberInfo[]): void;
        getMemberByPath(target: any, path: string): any;
        getObjectPropertiesForPath(target: any, path: string, propertyName?: string): DevExpress.Analytics.Utils.IDataMemberInfo[];
        createArrayItem(currentTarget: Array<any>, result: DevExpress.Analytics.Utils.IDataMemberInfo[], propertyName?: any): void;
        getItems: (pathRequest: DevExpress.Analytics.Utils.IPathRequest) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
        selectedPath: ko.Observable<string> | ko.Computed<string>;
        selectedMember: ko.Observable | ko.Computed;
    }
    export class ObjectExplorerProvider extends ObjectStructureProviderBase {
        getPathByMember: (model: any) => string;
        createArrayItem(currentTarget: Array<any>, result: DevExpress.Analytics.Utils.IDataMemberInfo[], propertyName?: any): void;
        createItem(currentTarget: any, propertyName: string, propertyValue: any, result: DevExpress.Analytics.Utils.IDataMemberInfo[]): void;
        constructor(rootITems: IRootItem[], listPropertyNames?: string[], member?: ko.Observable | ko.Computed, getPathByMember?: any);
        path: ko.Observable<string> | ko.Computed<string>;
        listPropertyNames: string[];
    }
    export class ObjectStructureProvider extends ObjectStructureProviderBase {
        constructor(target: any, displayName?: string, localizationId?: string);
    }
    export {};
    export class dxScrollProcessor extends Disposable {
        private _container;
        private _updateTime;
        dispose(): void;
        private _currentOffsetY;
        private _currentOffsetX;
        private _scroll;
        private _updateInterval;
        private _startUpdateScrollPosition;
        private _calculateOffset;
        constructor(_container: Element, _updateTime?: number);
        getScrollOffset(): any;
        processOffset(screenPosition: {
            x: number;
            y: number;
        }): void;
    }
    export class ControlsStore extends Disposable {
        private _filter;
        dataSource: ko.Computed<DevExpress.data.DataSource>;
        constructor(allControls: ko.ObservableArray<any>);
        getFilter(): any;
        setFilter(filter: any): void;
        resetFilter(): void;
        visible: ko.Computed<boolean>;
    }
    type ValidationRule = {
        type: string;
        validationCallback?: (options: any) => boolean;
        readonly message: string;
    };
    export function validateName(nameCandidate: string): boolean;
    export function replaceInvalidSymbols(text: string): string;
    export const nameValidationRules: ValidationRule[];
    export {};
    export function dxtTemplate(): any;
    export const dxversions: {
        analytics: string;
        devextreme: any;
    };
    export interface ICombinedProperty {
        result: any;
        subscriptions: ko.Subscription[];
    }
    export class CombinedObject {
        private static getInfo;
        private static isPropertyDisabled;
        private static getPath;
        private static isPropertyVisible;
        private static mergeProperty;
        static _createProperty(result: any, propertyName: any, propertyValue: any): void;
        static _merge(controls: any[], undoEngine?: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, customMerge?: any, ignoreProperties?: any): {
            result: {};
            subscriptions: any[];
        };
        static mergeControls(controls: any[], undoEngine?: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, customMerge?: any, ignoreProperties?: string[]): {
            result: any;
            subscriptions: any[];
        };
        static getEditableObject(selectionProvider: DevExpress.Analytics.Internal.ISelectionProvider, undoEngine?: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, customMerge?: any): ko.Observable | ko.Computed;
    }
    export function deleteSelection(selection: DevExpress.Analytics.Internal.ISelectionProvider, selectedObject?: any): void;
    export interface ICopyPasteStrategy {
        createChild(pasteTarget: DevExpress.Analytics.Elements.ElementViewModel, info: {}): DevExpress.Analytics.Elements.ElementViewModel;
        calculateDelta(selection: DevExpress.Analytics.Internal.ISelectionTarget, pasteTargetSurface: DevExpress.Analytics.Internal.ISelectionTarget, minPoint: DevExpress.Analytics.Elements.IPoint): {
            x: number;
            y: number;
        };
        canPaste?(pasteTarget: DevExpress.Analytics.Elements.ElementViewModel, info: {}): boolean;
        createSelfRestoringItems?: (model: DevExpress.Analytics.Elements.ElementViewModel, seriazlizer: DevExpress.Analytics.Utils.ModelSerializer) => Array<{
            restore: () => void;
        }>;
    }
    export const copyPasteStrategy: DevExpress.Analytics.Internal.ICopyPasteStrategy;
    export class CopyPasteHandler {
        private _copyPasteStrategy;
        private _selectionProvider;
        private _copyInfo;
        constructor(selectionProvider: DevExpress.Analytics.Internal.ISelectionProvider, _copyPasteStrategy?: DevExpress.Analytics.Internal.ICopyPasteStrategy);
        hasPasteInfo: ko.PureComputed<boolean>;
        canCopy(): boolean;
        canPaste(): boolean;
        copy(): void;
        cut(): void;
        paste(): void;
    }
    export function parseZoom(val: string): number;
    /// <reference types="jquery" />
    export interface IActionListViewModel extends IActionListBaseViewModel {
        menuItems: DevExpress.Analytics.Utils.IActionViewModel[];
    }
    export class ActionLists extends ActionListsBase {
        createViewModel(): IActionListViewModel;
        _registerAction(container: Array<DevExpress.Analytics.Utils.IAction>, action: DevExpress.Analytics.Utils.IAction): void;
        private _keyboardHelper;
        constructor(surfaceContext: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext> | ko.Computed<DevExpress.Analytics.Elements.ISurfaceContext>, selection: DevExpress.Analytics.Internal.ISelectionProvider, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, customizeActions?: (actions: DevExpress.Analytics.Utils.IAction[]) => void, enabled?: ko.Observable<boolean> | ko.Computed<boolean>, copyPasteStrategy?: DevExpress.Analytics.Internal.ICopyPasteStrategy, zoomStep?: ko.Observable<number> | ko.Computed<number>, isLocked?: (item: any) => boolean);
        processShortcut(e: JQueryKeyEventObject): void;
        getActions(): DevExpress.Analytics.Utils.IAction[];
        menuItems: DevExpress.Analytics.Utils.IAction[];
    }
    export class PopupService {
        data: ko.Observable<any>;
        title: ko.Observable<string>;
        visible: ko.Observable<boolean>;
        disabled: ko.Observable<boolean>;
        actions: ko.ObservableArray<DevExpress.Analytics.Internal.IModelAction>;
        target: ko.Observable<any>;
    }
    export interface IEditorAddon {
        templateName: string;
        data: EditorAddOn[] | any;
    }
    export class EditorAddOn extends BaseRenderingMultiplatformModel<DevExpress.Analytics.Serializer.Native.IViewModel> {
        private _popupService;
        private _editor;
        private _imageTemplateName;
        private _updateActions;
        private _getTitles;
        private _wrapVisibleItems;
        private _wrapActionClick;
        constructor(editor: DevExpress.Analytics.Widgets.Editor, popupService: DevExpress.Analytics.Internal.PopupService, engineType?: DevExpress.Analytics.Serializer.Native.EngineType);
        showPopup(_: any, element: any): void;
        actionFilter(action: DevExpress.Analytics.Internal.IModelAction): boolean;
        visible: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<boolean>;
        _actions: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<IModelAction[]>;
        editorMenuButtonCss: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<string | {
            [key: string]: boolean;
        }>;
        imageTemplateName: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<string>;
        hint: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<string>;
        templateName: any;
    }
    export interface IPropertiesAccessibilityProvider {
        isPropertyVisible(editor: DevExpress.Analytics.Widgets.Editor): any;
        isPropertyDisabled(editor: DevExpress.Analytics.Widgets.Editor): any;
    }
    export class PropertiesAccessibilityProvider implements IPropertiesAccessibilityProvider {
        isPropertyVisible(editor: DevExpress.Analytics.Widgets.Editor): boolean;
        isPropertyDisabled(editor: DevExpress.Analytics.Widgets.Editor): any;
        private _calculateAccessibilityByPropertyInfo;
    }
    export const defaultAccessibilityProvider: PropertiesAccessibilityProvider;
    type Options = {
        actions?: ko.Observable<(DevExpress.Analytics.Utils.IAction | DevExpress.Analytics.Internal.IGroupedItem<IAction>)[]>;
        target?: string;
        getClickActionParams?: () => any;
        contextMenusEnabled: ko.Observable<boolean>;
    };
    export class ContextMenuProvider extends Disposable {
        constructor({ actions, target, getClickActionParams, contextMenusEnabled }: Options);
        hide(): void;
        dataSource: ko.Observable<(DevExpress.Analytics.Utils.IAction | DevExpress.Analytics.Internal.IGroupedItem<IAction>)[]>;
        target: string;
        actions: ko.Observable<(DevExpress.Analytics.Utils.IAction | DevExpress.Analytics.Internal.IGroupedItem<IAction>)[]>;
        itemTemplate: (itemData: any, index: any, element: any) => void | string;
        onItemClick: (e: any, data: any) => void;
        cssClass: string;
        hideOnOutsideClick: boolean;
        disabled: ko.Observable;
        component: any;
        onInitialized: (e: any) => void;
        onOptionChanged: (e: any) => void;
    }
    export {};
    export function compareArrays(array1: any[], array2: any[]): boolean;
    export type GroupObject = {
        [key: string]: {
            info: DevExpress.Analytics.Utils.ISerializationInfoArray;
            displayName?: () => string;
        };
    };
    export class Group extends Disposable {
        private _viewModel;
        private _serializationsInfo;
        private _displayName;
        private _localizationId;
        private _accessibilityProvider;
        constructor(name: string, serializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray, createEditors: (serializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray) => DevExpress.Analytics.Widgets.Editor[], collapsed?: boolean, displayName?: () => string);
        resetEditors(): void;
        dispose(): void;
        update(viewModel: DevExpress.Analytics.Elements.ElementViewModel): void;
        registerAccessibilityProvider(accessibilityProvider: DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider): void;
        displayName: () => string;
        editors: ko.ObservableArray<DevExpress.Analytics.Widgets.Editor>;
        context: any;
        recreate: () => void;
        collapsed: ko.Observable<boolean> | ko.Computed<boolean>;
        visible: ko.Computed<Boolean>;
        editorsCreated: ko.Observable<boolean>;
        editorsRendered: ko.Observable<boolean>;
    }
    export class ControlProperties extends ObjectProperties {
        getEditors(): .Unwrapped<this["_editors"]>;
        protected _update(target: any, editorsInfo: any, recreateEditors: any): void;
        cleanEditors(): void;
        dispose(): void;
        createGroups(groups: DevExpress.Analytics.Internal.GroupObject): void;
        registerAccessibilityProvider(accessibilityProvider: DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider): void;
        constructor(target: ko.Observable<any>, editorsInfo?: {
            groups?: DevExpress.Analytics.Internal.GroupObject;
            editors?: DevExpress.Analytics.Utils.ISerializationInfoArray;
        }, level?: number, useAddons?: boolean, useLocalizableDescriptions?: boolean);
        focusedItem: ko.Observable | ko.Computed;
        focusedImageClassName: ko.Observable<string> | ko.Computed<string>;
        displayExpr: (value: any) => string;
        groups: DevExpress.Analytics.Internal.Group[];
        editorsRendered: ko.Observable<boolean> | ko.Computed<boolean>;
        isSortingByGroups: ko.Observable<boolean> | ko.Computed<boolean>;
        isSearching: ko.Observable<boolean> | ko.Computed<boolean>;
        allEditorsCreated: ko.Observable<boolean> | ko.Computed<boolean>;
        textToSearch: ko.Observable<string>;
        _searchBox: any;
        searchBox($element: any): void;
        searchPlaceholder: () => any;
        switchSearchBox: () => void;
    }
    export function getResizableOptions($element: Element, panelOffset: number, minWidth: ko.Observable<number> | number, position: string, startPosition: string, width?: (newVal?: number) => number, disabled?: ko.MaybeSubscribable<boolean>): any;
    export const accessibilityFontSizeZoomFactor: DevExpress.Analytics.IGlobalSubscribableValue<number>;
    export const calculateWithZoomFactor: (value: number) => number;
    export class RightPanelKeyboardHelperNative extends AccessibilityKeyboardHelperBase {
        private _tabPanel;
        controlElementClassName: string;
        private _initTimeout;
        constructor(_tabPanel: DevExpress.Analytics.Utils.TabPanel);
        _initialize(): void;
        bindHandler(el: any): void;
        initialize(): void;
        createControlElement(element: HTMLElement, index?: number): DevExpress.Analytics.Internal.AccessibilityControlElementBase;
        itemHandleDownArrowKey(e: any, index?: any): boolean;
        itemHandleUpArrowKey(e: any, index?: any): boolean;
    }
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export interface IDesignerContext {
        model: ko.Observable | ko.Computed;
        surface?: ko.Observable | ko.Computed;
        undoEngine?: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>;
    }
    export interface IDesignerModel extends IDisposable {
        model: ko.Observable | ko.Computed;
        rtl: boolean;
        surface: ko.Observable | ko.Computed;
        undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>;
        selection: DevExpress.Analytics.Internal.SurfaceSelection;
        snapHelper: DevExpress.Analytics.Internal.SnapLinesHelper;
        editableObject: ko.Observable<any>;
        dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent;
        dragDropStarted: ko.Observable<boolean> | ko.Computed<boolean>;
        dragHandler: DevExpress.Analytics.Internal.SelectionDragDropHandler;
        toolboxDragHandler: DevExpress.Analytics.Internal.ToolboxDragDropHandler;
        resizeHandler: IResizeHandler;
        toolboxItems: DevExpress.Analytics.Utils.ToolboxItem[];
        groupedToolboxItems: DevExpress.Analytics.Internal.IGroupedItem<ToolboxItem>[];
        isLoading: ko.Observable<boolean> | ko.Computed<boolean>;
        propertyGrid: DevExpress.Analytics.Internal.ControlProperties;
        popularProperties: DevExpress.Analytics.Widgets.ObjectProperties;
        controlsHelper: DevExpress.Analytics.Internal.DesignControlsHelper;
        controlsStore: DevExpress.Analytics.Internal.ControlsStore;
        tabPanel: DevExpress.Analytics.Utils.TabPanel;
        contextActionProviders: DevExpress.Analytics.Internal.IActionsProvider[];
        contextActions: ko.Observable<DevExpress.Analytics.Utils.IAction[]> | ko.Computed<DevExpress.Analytics.Utils.IAction[]>;
        contextGroupActions: ko.Computed<DevExpress.Analytics.Internal.IGroupedItem<IAction>[]>;
        appMenuVisible: ko.Observable<boolean> | ko.Computed<boolean>;
        toggleAppMenu: () => void;
        getMenuPopupContainer: (el: HTMLElement) => JQuery;
        getMenuPopupTarget: (el: HTMLElement) => JQuery;
        inlineTextEdit: DevExpress.Analytics.Internal.InlineTextEdit;
        actionsGroupTitle: () => string;
        updateFont: (values: {
            [key: string]: string;
        }) => void;
        sortFont: () => void;
        surfaceSize: ko.Observable<number> | ko.Computed<number>;
        popularVisible: ko.Computed<boolean>;
        groupActionsVisible: ko.Computed<boolean>;
        actionLists: DevExpress.Analytics.Internal.ActionLists;
        parts: DevExpress.Analytics.Internal.IDesignerPart[];
        ContextMenusEnabled: ko.Observable<boolean>;
        surfaceClass: (elem: any) => string;
        disposableContainer: DevExpress.Analytics.Utils.Disposable;
        addDisposables: (...elem: DevExpress.Analytics.Utils.DisposableType[]) => void;
        containerClass: string;
    }
    export class DesignerContextGeneratorInternal<T extends IDesignerContext> {
        private _context;
        private _rtl?;
        constructor(_context: T, _rtl?: boolean);
        addElement(propertyName: string, model: object): DesignerContextGeneratorInternal<IDesignerContext>;
        addUndoEngine(undoEngine?: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>): DesignerContextGeneratorInternal<IDesignerContext>;
        addSurface(surface: ko.Observable | ko.Computed): DesignerContextGeneratorInternal<IDesignerContext>;
        getContext(): IDesignerContext;
    }
    export class DesignerContextGenerator<T extends IDesignerContext> {
        private _rtl?;
        constructor(_rtl?: boolean);
        addModel(model: object): DesignerContextGeneratorInternal<T>;
    }
    export interface IDesingerGeneratorSettings {
        generate(): any;
    }
    export interface IResizeHandler {
        starting: () => void;
        stopped: () => void;
        disabled?: ko.Observable<boolean> | ko.Computed<boolean>;
        snapHelper?: DevExpress.Analytics.Internal.SnapLinesHelper;
    }
    export class ResizeSettings extends Disposable implements IDesingerGeneratorSettings {
        private _handler;
        get handler(): IResizeHandler;
        set handler(newVal: IResizeHandler);
        generate(): object;
    }
    export class ContextActionsSettings extends Disposable implements IDesingerGeneratorSettings {
        private _actionProviders;
        private _actions;
        private _groupActions;
        private _actionUndoEngineWrappingFunction;
        private _collectActions;
        get actionProviders(): DevExpress.Analytics.Internal.IActionsProvider[];
        set actionProviders(val: DevExpress.Analytics.Internal.IActionsProvider[]);
        get actions(): ko.Observable<DevExpress.Analytics.Utils.IAction[]> | ko.Computed<DevExpress.Analytics.Utils.IAction[]>;
        set actions(val: ko.Observable<DevExpress.Analytics.Utils.IAction[]> | ko.Computed<DevExpress.Analytics.Utils.IAction[]>);
        get groupActions(): ko.Observable<DevExpress.Analytics.Internal.IGroupedItem<IAction>[]> | ko.Computed<DevExpress.Analytics.Internal.IGroupedItem<IAction>[]>;
        set groupActions(val: ko.Observable<DevExpress.Analytics.Internal.IGroupedItem<IAction>[]> | ko.Computed<DevExpress.Analytics.Internal.IGroupedItem<IAction>[]>);
        createDefaultActions(editableObj: ko.Observable<any> | ko.Computed<any>, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>): void;
        createDefaultGroupAction(editableObj: ko.Observable<any> | ko.Computed<any>, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>): void;
        createDefaultContextMenuActions(editableObj: ko.Observable<any> | ko.Computed<any>, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>): void;
        generate(): object;
        generateContextMenu(model: DevExpress.Analytics.Internal.IDesignerModel): {
            contextMenu: DevExpress.Analytics.Internal.ContextMenuProvider;
        };
    }
    export class DragDropSettings extends Disposable implements IDesingerGeneratorSettings {
        private _model;
        private _dragHelperContent;
        private _dragDropStarted;
        get dragHelperContent(): DevExpress.Analytics.Internal.DragHelperContent;
        set dragHelperContent(val: DevExpress.Analytics.Internal.DragHelperContent);
        get dragDropStarted(): boolean | ko.Observable<boolean>;
        set dragDropStarted(val: boolean | ko.Observable<boolean>);
        addDragDropHandler(propertyName: string, handler: DevExpress.Analytics.Internal.DragDropHandler): void;
        generate(): object;
    }
    export class ControlsHelperSettings extends Disposable implements IDesingerGeneratorSettings {
        private _selection;
        private _context;
        private _model;
        private controlsHelper;
        constructor(_selection: DevExpress.Analytics.Internal.SurfaceSelection, _context: IDesignerContext);
        generate(): object;
        addControlsHelper(helper?: DevExpress.Analytics.Internal.IDesignControlsHelper): ControlsHelperSettings;
        addControlsStore(store?: DevExpress.Analytics.Internal.ControlsStore): ControlsHelperSettings;
    }
    export class MenuSettings extends Disposable implements IDesingerGeneratorSettings {
        generate(): object;
        _appMenuVisible: ko.Observable<boolean> | ko.Computed<boolean>;
        toggleAppMenu: () => void;
        stopPropagation: boolean;
        getMenuPopupContainer: (el: HTMLElement) => JQuery<Element>;
        getMenuPopupTarget: (el: HTMLElement) => JQuery<Element>;
        get appMenuVisible(): ko.Observable<boolean> | ko.Computed<boolean>;
        set appMenuVisible(val: ko.Observable<boolean> | ko.Computed<boolean>);
    }
    export class SelectionSettings extends Disposable implements IDesingerGeneratorSettings {
        private _selection;
        private _snapHelper;
        private _editableObject;
        private _dragDropSettings;
        private _resizeSettings;
        dispose(): void;
        get selection(): DevExpress.Analytics.Internal.SurfaceSelection;
        set selection(val: DevExpress.Analytics.Internal.SurfaceSelection);
        get snapHelper(): DevExpress.Analytics.Internal.SnapLinesHelper;
        set snapHelper(val: DevExpress.Analytics.Internal.SnapLinesHelper);
        get editableObject(): ko.Observable<any> | ko.Computed<any>;
        set editableObject(val: ko.Observable<any> | ko.Computed<any>);
        addDragDrop(func: (settings: DragDropSettings) => void): void;
        addResize(func: (settings: ResizeSettings) => void): void;
        generate(): object;
    }
    export class CommonDesignerGenerator<T extends DevExpress.Analytics.Internal.IDesignerModel> extends Disposable {
        private _context?;
        private _rtl?;
        private _model;
        private _selectionSettings;
        private _createPopularProperties;
        private _resetModel;
        protected get rtl(): boolean;
        protected set rtl(newVal: boolean);
        dispose(): void;
        constructor(_context?: IDesignerContext, _rtl?: boolean);
        initializeContext(context: IDesignerContext): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        getPropertyByName<T>(propertyName: string): any;
        addElement(propertyName: string, elementFunc: () => any): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        mapOnContext(): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        addSelection(func: (settings: SelectionSettings) => void): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        addPropertyGrid(propertyGrid?: () => DevExpress.Analytics.Widgets.ObjectProperties, propertyName?: string): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        addContextMenu(contextMenu: DevExpress.Analytics.Internal.ContextMenuProvider): void;
        addDisposableContainer(): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        addControlProperties(editors: DevExpress.Analytics.Utils.ISerializationInfoArray, groups: DevExpress.Analytics.Internal.GroupObject, accessibilityProvider?: DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        createControlProperties(editors: DevExpress.Analytics.Utils.ISerializationInfoArray, groups: DevExpress.Analytics.Internal.GroupObject, accessibilityProvider?: DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider): DevExpress.Analytics.Internal.ControlProperties;
        addPopularProperties(controlsFactory: DevExpress.Analytics.Utils.ControlsFactory, accessibilityProvider?: DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        addToolboxItems(items?: () => DevExpress.Analytics.Utils.ToolboxItem[]): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        addGroupedToolboxItems(): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        addTabPanel(panel?: () => DevExpress.Analytics.Utils.TabPanel, addTabInfo?: () => DevExpress.Analytics.Utils.TabInfo[]): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        addIsLoading(isLoadingFunc?: () => ko.Observable<boolean>): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        addControlsHelper(func: (settings: ControlsHelperSettings) => void): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        addMenu(func: (settings: MenuSettings) => void): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        addContextActions(func: (contextActions: ContextActionsSettings) => void): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        addParts(func?: (parts: any) => DevExpress.Analytics.Internal.IDesignerPart[], useDefaults?: boolean): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
        getModel(): DevExpress.Analytics.Internal.IDesignerModel;
        addActionList(actionListsFunc?: () => DevExpress.Analytics.Internal.ActionLists): CommonDesignerGenerator<DevExpress.Analytics.Internal.IDesignerModel>;
    }
    export function createDesigner(model: ko.Observable | ko.Computed, surface: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext> | ko.Computed<DevExpress.Analytics.Elements.ISurfaceContext>, controlsFactory: DevExpress.Analytics.Utils.ControlsFactory, groups?: DevExpress.Analytics.Internal.GroupObject, editors?: DevExpress.Analytics.Utils.ISerializationInfoArray, parts?: DevExpress.Analytics.Internal.IDesignerPart[], rtl?: boolean, selection?: DevExpress.Analytics.Internal.SurfaceSelection, designControlsHelper?: DevExpress.Analytics.Internal.DesignControlsHelper, undoEngine?: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, customMerge?: (propertyName: any, controls: any, undoEngine: any) => DevExpress.Analytics.Internal.ICombinedProperty, snapLinesCollector?: DevExpress.Analytics.Internal.SnapLinesCollector, groupLocalizationIDs?: {
        [key: string]: string;
    }): DevExpress.Analytics.Internal.IDesignerModel;
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export interface IDataSourceInfo {
        name: string;
        specifics?: string;
        id?: string;
        ref?: string;
        data: any;
        hasErrors?: boolean;
        dataSerializer?: string;
        isSqlDataSource?: boolean;
        isJsonDataSource?: boolean;
        isObjectDataSource?: boolean;
        isFederationDataSource?: boolean;
        isListType?: boolean;
        isSupportQueries?: boolean;
    }
    export interface IItemsExtender {
        beforeItemsFilled: (request: DevExpress.Analytics.Utils.IPathRequest, items: DevExpress.Analytics.Utils.IDataMemberInfo[]) => boolean;
        afterItemsFilled?: (request: DevExpress.Analytics.Utils.IPathRequest, items: DevExpress.Analytics.Utils.IDataMemberInfo[]) => void;
    }
    export class FieldListProvider implements IItemsProvider {
        private _extenders;
        private _patchRequest;
        private _beforeFieldListCallback;
        private _afterFieldListCallBack;
        constructor(fieldListCallback: (pathRequest: DevExpress.Analytics.Utils.IPathRequest) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>, rootItems: ko.ObservableArray<IDataSourceInfo>, extenders?: IItemsExtender[], rootItemsNoDragable?: boolean);
        deferreds: JQuery.Deferred<DevExpress.Analytics.Utils.IDataMemberInfo[]>[];
        dispose: () => void;
        getItems: (IPathRequest: any) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
    }
    /// <reference types="jquery" />
    export function setAjax(newFunc: any): void;
    export interface IAjaxSettings {
        uri: string;
        action: string;
        arg: any;
        processErrorCallback?: (message: string, jqXHR: any, textStatus: any) => void;
        ignoreError?: () => boolean;
        customOptions?: any;
        isError?: (data: any) => boolean;
        getErrorMessage?: (jqXHR: any) => string;
        method?: "POST" | "GET";
    }
    export function _ajax(uri: any, action: any, arg: any, processErrorCallback?: (message: string, jqXHR: any, textStatus: any) => void, ignoreError?: () => boolean, customOptions?: any, isError?: (data: any) => boolean, getErrorMessage?: (deferredResult: any) => string, method?: string): JQuery.Promise<any, any, any>;
    export function _ajaxWithOptions(options: IAjaxSettings): JQuery.Promise<any, any, any>;
    export function encodeURIExtended(str: string): string;
    export let sendRequest: (...params: (IAjaxSettings | any)[]) => any;
    export function createPasswordSerializationInfo(info: DevExpress.Analytics.Utils.ISerializationInfo, isNew?: boolean): DevExpress.Analytics.Utils.ISerializationInfo;
    export type SizeFactorType = "xl" | "lg" | "md" | "sm" | "xs";
    export function getSizeFactor(width: any): SizeFactorType;
    export const staticContext: {
        _static: {
            searchPlaceholder: () => any;
            selectPlaceholder: () => any;
            noDataText: () => any;
            ajaxSetup: DevExpress.Analytics.Internal.IAjaxSetup;
        };
    };
    export const _defaultStaticContext: DevExpress.Analytics.Internal.IGlobalSubscribableValue<{}>;
    export function appendStaticContextToRootViewModel(root: any, dx?: any, className?: any): void;
    /// <reference types="jquery" />
    export interface _ICommonCallbacksHandler {
        customizeActions?: (actions: DevExpress.Analytics.Utils.IAction[]) => void;
        customizeLocalization?: (callbacks?: JQueryPromise<any>[]) => void;
        onServerError?: (e: any) => void;
        onInitializing?: () => void;
        beforeRender?: (designerModel: any) => void;
    }
    export interface CustomizeMenuActionsCallbacksHandler<TSender> {
        CustomizeMenuActions?: (sender: TSender, args: {
            Actions: DevExpress.Analytics.Utils.IAction[];
        }) => void;
    }
    export interface ICommonCallbacksHandler<TSender, TBeforeRenderSender> extends CustomizeMenuActionsCallbacksHandler<TSender>, _ICommonCallbacksHandler {
        OnInitializing?: (sender: TSender) => void;
        BeforeRender?: (sender: TSender, args: TBeforeRenderSender) => void;
        CustomizeLocalization?: (sender: TSender, args: ICustomizeLocalizationEventArgs) => void;
        OnServerError?: (sender: TSender, args: {
            Error: any;
        }) => void;
    }
    export interface ICustomizeLocalizationEventArgs {
        LoadMessages: (messages: JQueryPromise<any> | any | null) => void;
        SetAvailableCultures: (customCultures: any) => void;
        WidgetLocalization: typeof DevExpress.localization;
    }
    export interface ICommonBindingCustomizationHandler<T> {
        _eventSenderCreated?: (sender: T) => void;
    }
    export function _wrapModelInObservable<T>(model: T | ko.Observable<T> | ko.Computed<T>): ko.Observable<T>;
    export const generateIconTemplate: (iconClass: string) => {
        render: (options: any) => void;
    };
    export const editor_template: {
        render: (options: any) => void;
    };
    export type ButtonOptions = DevExpress.ui.dxButton.Properties & {
        template?: any;
    };
    export class dxButtonWithTemplate extends dxButton {
        constructor(element: Element, options?: ButtonOptions);
        _patchOptionValues(options: any): any;
    }
    export function InitButtonWithTemplate(element: Element, options?: ButtonOptions): () => void;
    export const StringId: {
        MasterDetailRelationsEditor: string;
        DataAccessBtnOK: string;
        DataAccessBtnCancel: string;
        DataSourceWizardTitle: string;
        WizardPageConfigureQuery: string;
    };
    export class BordersModel extends Disposable {
        private _setAllValues;
        setValue(name: any): void;
        setAll(): void;
        setNone(): void;
        updateModel(value: string): void;
        updateValue(): void;
        constructor(object: {
            value: ko.Observable<string>;
            disabled?: ko.Observable<boolean>;
        });
        value: ko.Observable<string> | ko.Computed<string>;
        left: ko.Observable<boolean>;
        right: ko.Observable<boolean>;
        top: ko.Observable<boolean>;
        bottom: ko.Observable<boolean>;
        disabled: ko.Observable<boolean> | ko.Computed<boolean>;
    }
    export {};
    export {};
    export class ControlElementWithParentHighlight extends AccessibilityControlElementBase {
        element: HTMLElement;
        protected _parentElement: Element;
        protected _borderCssClassName: string[];
        dispose(): void;
        toolbarItemHandleFocus: () => void;
        toolbarItemHandleBlur: () => void;
        constructor(element: HTMLElement, _parentElement: Element);
    }
    export class KeyboardHelperWithArrowButtonBase extends AccessibilityKeyboardHelperBase {
        resetTabIndexes(): void;
        initialize(): void;
        changeFocus(index: number, roundTrip?: boolean): number;
        startIndex: number;
    }
    export class ListKeyboardHelper extends KeyboardHelperWithArrowButtonBase {
        controlElementClassName: string;
        createControlElement(element: HTMLElement, index?: number): DevExpress.Analytics.Internal.AccessibilityControlElementBase;
        itemHandleUpArrowKey(e: any, index?: any): boolean;
        itemHandleDownArrowKey(e: any, index?: any): boolean;
    }
    export class AccordionKeyboardHelper extends AccessibilityKeyboardHelperBase {
        private _editorViewModelsAccessor;
        private _onToggleCollapsed;
        controlElementClassName: string;
        constructor(_editorViewModelsAccessor: () => DevExpress.Analytics.Widgets.ICollapsedViewModel, _onToggleCollapsed?: () => void);
        private _collapseItem;
        itemHandleEnterKey(e: any, index?: any): boolean;
        itemHandleSpaceKey(e: any, index?: any): boolean;
        clickHandler(e: any, index: any): void;
    }
    export class PropertyGridKeyboardHelper extends AccessibilityKeyboardHelperBase {
        private _editorsViewModelsAccessor;
        controlElementClassName: string;
        focusFirstFocusableDescendant: boolean;
        private _complexEditorMap;
        private _triggersParentToChildMap;
        constructor(_editorsViewModelsAccessor: () => DevExpress.Analytics.Widgets.IEditorViewModel[]);
        private _getElementsCount;
        private _defferedInit;
        private _getComplexEditors;
        private _getComplexEditorsHierarchy;
        private _filterPredicate;
        initialize(): void;
        itemHandleUpArrowKey(e: any, index?: any): boolean;
        itemHandleDownArrowKey(e: any, index?: any): boolean;
    }
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export class DisplayExpressionConverter implements IDisplayExpressionConverter {
        private displayNameProvider;
        private _replaceNames;
        constructor(displayNameProvider: DevExpress.Analytics.Utils.IDisplayNameProvider);
        toDisplayExpression(path: string, expression: string): JQueryPromise<string>;
        toRealExpression(path: string, expression: string): JQuery.Promise<any, any, any>;
    }
    export {};
    export {};
    export {};
    export interface ISearchHighlightOptions {
        text: string | Observable<string>;
        textToSearch: string | Observable<string> | Computed<string>;
        searchOptions?: DevExpress.Analytics.Internal.ISearchOptions;
    }
    export class HighlightEngine extends Disposable {
        private _$spanProtect;
        private _$spanSearch;
        private _options;
        private _update;
        content: string;
        update(options: ISearchHighlightOptions): void;
        private _getHighlightContent;
        constructor(options: ISearchHighlightOptions);
    }
    export function cloneHtmlBinding(data: {
        content: any;
        update: (options: any) => void;
    } & DevExpress.Analytics.Utils.Disposable, element: any, valueAccessor: any, allBindings: any, viewModel: any, bindingContext: any): void;
    export class ToolbarKeyboardHelper extends KeyboardHelperWithArrowButtonBase {
        private _buttonModels;
        controlElementClassName: string;
        liveRegionId: string;
        private _buttonsSubscriptions;
        private _initializationTimeout;
        private _subscribeButtonsAndInitialize;
        private _initialize;
        createControlElement(element: HTMLElement, index?: number): ToolbarItemElement;
        constructor(_buttonModels: DevExpress.Analytics.Utils.IAction[] | ko.Observable<DevExpress.Analytics.Utils.IAction[]> | ko.Computed<DevExpress.Analytics.Utils.IAction[]>);
        itemHandleEnterKey(e: any, index: any): boolean;
        itemHandleSpaceKey(e: any, index: any): boolean;
        itemHandleLeftArrowKey(e: any, index?: any): boolean;
        itemHandleRightArrowKey(e: any, index?: any): boolean;
        get buttonModels(): any;
    }
    class ToolbarItemElement extends ControlElementWithParentHighlight {
        element: HTMLElement;
        private _toolbarItemModel;
        private _liveRegion;
        private _selectBox;
        private _menu;
        private _complexItem;
        dispose(): void;
        constructor(element: HTMLElement, _toolbarElement: HTMLElement, _toolbarItemModel: DevExpress.Analytics.Utils.IAction, _liveRegion: () => DevExpress.Analytics.Internal.IAccessibilityLiveRegion);
        setFocus(): void;
        actionExecute(): void;
    }
    export {};
    export class TreeListKeyboardHelper extends ListKeyboardHelper {
        private _rootHolder;
        controlElementClassName: string;
        constructor(_rootHolder: {
            root: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
        });
        private _setFocusToParentNode;
        private _toggleCollapsed;
        private _toggleSelected;
        private _getItemModel;
        createControlElement(element: HTMLElement, index?: number): DevExpress.Analytics.Internal.AccessibilityControlElementBase;
        itemHandleLeftArrowKey(e: KeyboardEvent, index: number): boolean;
        itemHandleRightArrowKey(e: KeyboardEvent, index: number): boolean;
        itemHandleEnterKey(e: KeyboardEvent, index: number): boolean;
        itemHandleSpaceKey(e: KeyboardEvent, index: number): boolean;
        clickHandler(e: Event, index: number): void;
    }
}
declare module DevExpress.Analytics.Widgets.Internal {
    import ITreeListSearchOptions = DevExpress.Analytics.Widgets.Internal.ITreeListSearchOptions;
    import SearchMode = DevExpress.Analytics.Internal.SearchMode;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    import IAction = DevExpress.Analytics.Utils.IAction;
    import TreeListItemViewModel = DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
    import TreeListRootItemViewModel = DevExpress.Analytics.Widgets.Internal.TreeListRootItemViewModel;
    import TreeListSearchOptions = DevExpress.Analytics.Widgets.Internal.TreeListSearchOptions;
    import CodeResolver = DevExpress.Analytics.Internal.CodeResolver;
    import IViewModel = DevExpress.Analytics.Serializer.Native.IViewModel;
    import DragDropHandler = DevExpress.Analytics.Internal.DragDropHandler;
    import TreeListEllipsisButton = DevExpress.Analytics.Widgets.Internal.TreeListEllipsisButton;
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import ISearchOptions = DevExpress.Analytics.Internal.ISearchOptions;
    import IItemsProvider = DevExpress.Analytics.Utils.IItemsProvider;
    import ITreeListController = DevExpress.Analytics.Widgets.Internal.ITreeListController;
    import BaseModel = DevExpress.Analytics.Serializer.Native.BaseModel;
    import BaseRenderingModel = DevExpress.Analytics.Serializer.Native.BaseRenderingModel;
    import ITreeListItemViewModel = DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel;
    import DefaultTreeListItemFactory = DevExpress.Analytics.Widgets.Internal.DefaultTreeListItemFactory;
    import ITreeListItemFactory = DevExpress.Analytics.Widgets.Internal.ITreeListItemFactory;
    import ITreeListOptions = DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
    import dxDropDownBox = DevExpress.ui.dxDropDownBox;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import Editor = DevExpress.Analytics.Widgets.Editor;
    import IUndoEngine = DevExpress.Analytics.Internal.IUndoEngine;
    import ILocalizationInfo = DevExpress.Analytics.Internal.ILocalizationInfo;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ListKeyboardHelper = DevExpress.Analytics.Internal.ListKeyboardHelper;
    import ICollapsedViewModel = DevExpress.Analytics.Widgets.ICollapsedViewModel;
    import IEditorViewModel = DevExpress.Analytics.Widgets.IEditorViewModel;
    import IObjectPropertiesViewModel = DevExpress.Analytics.Widgets.IObjectPropertiesViewModel;
    import editor_template = DevExpress.Analytics.Internal.editor_template;
    import AccordionKeyboardHelper = DevExpress.Analytics.Internal.AccordionKeyboardHelper;
    import IKoCollectionEditorOptions = DevExpress.Analytics.Widgets.Internal.IKoCollectionEditorOptions;
    import CollectionEditorViewModel = DevExpress.Analytics.Widgets.Internal.CollectionEditorViewModel;
    import ICollectionEditorOptionsBase = DevExpress.Analytics.Widgets.Internal.ICollectionEditorOptionsBase;
    import dxTextBox = DevExpress.ui.dxTextBox;
    import Properties = DevExpress.ui.dxTextBox.Properties;
    import dxEllipsisEditor = DevExpress.Analytics.Widgets.Internal.dxEllipsisEditor;
    import IFileUploadResult = DevExpress.Analytics.Internal.IFileUploadResult;
    import IExpressionEditorItem = DevExpress.Analytics.Widgets.Internal.IExpressionEditorItem;
    import IDisposable = DevExpress.Analytics.Utils.IDisposable;
    import IExpressionOptions = DevExpress.Analytics.Widgets.IExpressionOptions;
    import DisposableType = DevExpress.Analytics.Utils.DisposableType;
    import IDisplayExpressionConverter = DevExpress.Analytics.Utils.IDisplayExpressionConverter;
    import IExpressionEditorCategory = DevExpress.Analytics.Widgets.Internal.IExpressionEditorCategory;
    import IExpressionEditorFunction = DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction;
    import IExpressionEditorFunctionItem = DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunctionItem;
    import GroupOperator = DevExpress.Analytics.Criteria.GroupOperator;
    import CriteriaOperator = DevExpress.Analytics.Criteria.CriteriaOperator;
    import AggregateOperand = DevExpress.Analytics.Criteria.AggregateOperand;
    import OperandProperty = DevExpress.Analytics.Criteria.OperandProperty;
    import OperandValue = DevExpress.Analytics.Criteria.OperandValue;
    import OperandParameter = DevExpress.Analytics.Criteria.OperandParameter;
    import BetweenOperator = DevExpress.Analytics.Criteria.BetweenOperator;
    import InOperator = DevExpress.Analytics.Criteria.InOperator;
    import BinaryOperator = DevExpress.Analytics.Criteria.BinaryOperator;
    import UnaryOperator = DevExpress.Analytics.Criteria.UnaryOperator;
    import FunctionOperator = DevExpress.Analytics.Criteria.FunctionOperator;
    import ISize = DevExpress.Analytics.Elements.ISize;
    import TreeListController = DevExpress.Analytics.Widgets.Internal.TreeListController;
    import PopupService = DevExpress.Analytics.Internal.PopupService;
    import CriteriaOperatorSurface = DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface;
    import CodeCompletor = DevExpress.Analytics.Widgets.Internal.CodeCompletor;
    import ICodeCompletorOptions = DevExpress.Analytics.Widgets.Internal.ICodeCompletorOptions;
    import dxPopup = DevExpress.ui.dxPopup;
    import ContentReadyEvent = DevExpress.ui.dxPopup.ContentReadyEvent;
    import Properties = DevExpress.ui.dxPopup.Properties;
    import DragHelperContent = DevExpress.Analytics.Internal.DragHelperContent;
    export class SvgTemplateSource implements ko.TemplateSource {
        private _data;
        private _templates;
        constructor(template: string, _data: {
            [key: string]: any;
        }, _templates: {
            [key: string]: any;
        });
        templateName: any;
        data(key: any, value?: any): any;
        text(value?: any): any;
    }
    export class SvgTemplatesEngine {
        private static _instance;
        private _data;
        private _templates;
        private _hasTemplate;
        constructor();
        private static get Instance();
        static get templates(): {
            [key: string]: string;
        };
        static addTemplate(templateName: string, templateMarkup: string): void;
        static addTemplates(templates: {
            [key: string]: string;
        }): void;
        static extendTemplates(templates: {
            [key: string]: string;
        }): void;
        static getExistingTemplate(name: string, findEverywhere?: boolean): string;
    }
    export class TreeListSearchOptions implements ITreeListSearchOptions {
        globalMatch: boolean;
        autoLoadItems: boolean;
        canUseRegex: boolean;
        caseSensitive: boolean;
        searchMode: DevExpress.Analytics.Internal.SearchMode;
        searchTimeout: number;
        searchExpr: string;
        searchBoxTemplate: string;
    }
    export interface ITreeListController {
        itemsFilter: (item: DevExpress.Analytics.Utils.IDataMemberInfo, path?: string, model?: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => boolean;
        hasItems: (item: DevExpress.Analytics.Utils.IDataMemberInfo) => boolean;
        canSelect: (value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => boolean;
        select: (value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void;
        canMultiSelect?: (value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => boolean;
        multiSelect?: (value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel, isShiftPressed: boolean, isCtrlPressed: boolean) => void;
        getActions?: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => DevExpress.Analytics.Utils.IAction[];
        subscribeOnActionsChanged?: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel, callback: (items: DevExpress.Analytics.Utils.IAction[]) => void) => () => void;
        subscribeOnVisibleChanged?: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel, callback: (isFiltred: boolean) => void) => () => void;
        isDraggable?: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => boolean;
        dblClickHandler?: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void;
        clickHandler?: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void;
        dragDropHandler?: any;
        root?: Observable<DevExpress.Analytics.Widgets.Internal.TreeListRootItemViewModel> | DevExpress.Analytics.Widgets.Internal.TreeListRootItemViewModel;
        selectedItems?: () => DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel[];
        showIconsForChildItems?: (item?: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => boolean;
        textToSearch?: Observable<string> | Computed<string>;
        searchEnabled?: boolean;
        searchOptions?: DevExpress.Analytics.Widgets.Internal.TreeListSearchOptions;
        dispose?: () => void;
    }
    export class TreeListController implements ITreeListController {
        dispose(): void;
        itemsFilter(item: DevExpress.Analytics.Utils.IDataMemberInfo, path?: string): boolean;
        hasItems(item: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
        canSelect(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
        select(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): void;
        isDraggable(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
        selectedItem: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
    }
    /// <reference types="jquery" />
    export const treeListEditAction: DevExpress.Analytics.Utils.IAction;
    export interface ITreeListItemViewModel extends IViewModel<DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel> {
        events: {
            dblclick?: () => void;
            click?: () => void;
            mouseenter?: () => void;
            mouseleave?: () => void;
        };
        toggleCollapsed: () => void;
        reverseCollapsed: () => void;
        setCollapsedChangedEvent: (callback: (newValue: boolean) => void) => () => void;
        toggleSelected: (_?: any, event?: JQueryEventObject) => void;
        getSelectedItems: () => DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel[];
        cssRules: {
            [key: string]: boolean;
        };
        padding: {
            [key: string]: number;
        };
        attr: {
            [key: string]: string | number;
        };
        hasItems: boolean;
        nodeImageClass: string;
        isDraggable: boolean;
        templates: {
            [key: string]: string;
        };
        parent: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel;
        items: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel[];
        data: DevExpress.Analytics.Utils.IDataMemberInfo;
        visible: boolean;
        imageClassName: string;
        imageTemplateName: string;
        searchModel: {
            textToSearch: ko.Observable<string> | ko.Computed<string>;
            searchEnabled: boolean;
            searchOptions: DevExpress.Analytics.Widgets.Internal.TreeListSearchOptions;
        };
        name: string;
        path: string;
        text: string;
        templateName: string;
        actions: DevExpress.Analytics.Utils.IAction[];
        actionsTemplate: string;
        treeListEditAction: DevExpress.Analytics.Utils.IAction;
        hasContent: boolean;
        collapsed: boolean;
        showIcon: boolean;
        isHovered: boolean;
        isSelected: boolean;
        isMultiSelected: boolean;
        resolver: DevExpress.Analytics.Internal.CodeResolver;
        dragDropHandler: DevExpress.Analytics.Internal.DragDropHandler;
    }
    export function updateTreeListItemViewModel(this: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel, args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<TreeListItemViewModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<TreeListItemViewModel>): void;
    export function createTreeListItemViewModel(this: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel, base: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel): DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel;
    export function createTreeListEllipsisButtonViewModel(this: DevExpress.Analytics.Widgets.Internal.TreeListEllipsisButton, base: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel): DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel;
    /// <reference types="jquery" />
    export const maxSearchLevel: DevExpress.Analytics.Internal.IGlobalSubscribableValue<number>;
    export interface ITreeListSearchOptions extends ISearchOptions {
        searchTimeout?: number;
        searchExpr?: string;
        searchBoxTemplate?: string;
    }
    export class TreeListItemStore {
        private _itemStore;
        storeItem(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): string;
        getItem(id: string): DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
        removeItem(id: string): void;
    }
    export class TreeListItemFactory extends BaseModel implements ITreeListItemFactory {
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        createRootItem(options: DevExpress.Analytics.Widgets.Internal.ITreeListOptions, path?: MaybeSubscribable<string[]>, onItemsVisibilityChanged?: () => void, rtl?: boolean): DevExpress.Analytics.Widgets.Internal.TreeListRootItemViewModel;
        createItem(options: DevExpress.Analytics.Widgets.Internal.ITreeListOptions, path?: string[], onItemsVisibilityChanged?: () => void, rtl?: boolean, resolver?: DevExpress.Analytics.Internal.CodeResolver): DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
    }
    export let DefaultTreeListItemFactory: typeof TreeListItemFactory;
    export function setDefaultTreeListItemFactory(type: typeof DevExpress.Analytics.Widgets.Internal.DefaultTreeListItemFactory): void;
    export interface ITreeListItemFactory {
        createRootItem: (options: DevExpress.Analytics.Widgets.Internal.ITreeListOptions, path?: MaybeSubscribable<string[] | string>, onItemsVisibilityChanged?: any, rtl?: any) => DevExpress.Analytics.Widgets.Internal.TreeListRootItemViewModel;
        createItem: (options: DevExpress.Analytics.Widgets.Internal.ITreeListOptions, path?: string[], onItemsVisibilityChanged?: any, rtl?: any, resolver?: any) => DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
    }
    export interface ITreeListOptions {
        itemsProvider: DevExpress.Analytics.Utils.IItemsProvider;
        selectedPath: Observable<string> | Computed<string> | string;
        subscribeOnDataPropertyChanged?: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel, propertyName: keyof DevExpress.Analytics.Utils.IDataMemberInfo, callback: () => void) => () => void;
        setTreeListChangedEvent?: (callback: (options: DevExpress.Analytics.Widgets.Internal.ITreeListOptions) => void) => () => void;
        setSelectedPathChangedEvent?: (callback: (newPath: string) => void) => () => void;
        setSelectedPath?: (newPath: string) => void;
        getSelectedPath?: () => string;
        treeListController: DevExpress.Analytics.Widgets.Internal.ITreeListController;
        templateName?: string;
        loadChildItemsForCollapsedNodes?: boolean;
        rtl?: boolean;
        path?: Observable<string> | Observable<string[]>;
        onItemsVisibilityChanged?: () => void;
        expandRootItems?: boolean;
        pageSize?: number;
        templateHtml?: string;
        factory?: DevExpress.Analytics.Widgets.Internal.ITreeListItemFactory;
        store?: TreeListItemStore;
        onItemsChanged?: (items: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel[]) => void;
    }
    export class TreeListEllipsisButton extends BaseRenderingModel<DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel> {
        private setMaxItemsCount;
        private getMaxItemsCount;
        padding: {
            [key: string]: number;
        };
        private pageSize;
        constructor(setMaxItemsCount: (value: number) => void, getMaxItemsCount: () => number, padding: {
            [key: string]: number;
        }, pageSize: number);
        createViewModel(): DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel;
        renderNext(): void;
    }
    export class TreeListItemViewModel extends BaseRenderingModel<DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel> {
        protected resolver: DevExpress.Analytics.Internal.CodeResolver;
        private _rtl;
        protected _factory: DevExpress.Analytics.Widgets.Internal.ITreeListItemFactory;
        private _pageSize;
        private _walkCallback;
        private _actionsSubscriptionDispose;
        private _itemsSubscriptionDispose;
        private _filtrationSubscriptionDispose;
        private _pathSubscriptionDispose;
        private _dataSubscriptionsDispose;
        private _subscriptions;
        private _templateName;
        private _loadChildItemsForCollapsedNodes;
        private _subscribeOnDataProperty;
        _collapsedChangedEvent: (newValue: boolean) => void;
        private _equal;
        private _treeListController;
        private _setSelectedPath;
        private _getIconName;
        _getImageClassName(): string;
        _getImageTemplateName(): string;
        _getNodeImageClassName(): string;
        _hasItems(): boolean;
        _getAttributes(): {
            [key: string]: string | number;
        };
        _getCssRules(): {
            [key: string]: boolean;
        };
        _isDraggable(): boolean;
        _isVisible(): boolean;
        private _createItemsObj;
        private _loadItems;
        private _nodeIsLocked;
        private _onItemsChangedCallback;
        protected _onItemsChanged(): void;
        protected _getTemplateName(): string;
        _selectItem(itemPath: string): void;
        private _find;
        _getItemsWithLock(): JQueryPromise<DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel[]>;
        _getPadding(level: number): {
            [key: string]: number;
        };
        private _getLoadChildItemsForCollapsedNodes;
        _getSelectedItems(): DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel[];
        private _getVisibleItems;
        private _updataParentItemsVisibilityCount;
        private _updateVisualProperties;
        private _updatePath;
        _getChildViewModels(): DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel[];
        _reverseCollapsed(): void;
        constructor(options: DevExpress.Analytics.Widgets.Internal.ITreeListOptions, path?: MaybeSubscribable<string[]>, onItemsVisibilityChanged?: () => any, rtl?: boolean, resolver?: DevExpress.Analytics.Internal.CodeResolver);
        itemsCollectionHasMutated(): void;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<TreeListItemViewModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<TreeListItemViewModel>): void;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<TreeListItemViewModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<TreeListItemViewModel>): void;
        createViewModel(): DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel;
        dragDropHandler: any;
        _path: string[];
        _onItemsVisibilityChanged: () => void;
        _showIcon: boolean;
        parent: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
        parentViewModel: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel;
        visibleItems: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel[];
        imageClassName: string;
        showIcon: boolean;
        imageTemplateName: string;
        items: Array<DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel>;
        actions: DevExpress.Analytics.Utils.IAction[];
        maxItemsCount: number;
        visibleItemsCount: number;
        collapsed: boolean;
        isLoaded: boolean;
        hasItems: boolean;
        isSelected: boolean;
        isMultiSelected: boolean;
        isHovered: boolean;
        data: DevExpress.Analytics.Utils.IDataMemberInfo;
        visible: boolean;
        isFiltred: boolean;
        path: string;
        level: number;
        text: string;
        id: string;
        store: TreeListItemStore;
        get name(): string;
        pathParts: string[];
        templateName: string;
        actionsTemplate: string;
        hasContent: boolean;
        get treeListController(): DevExpress.Analytics.Widgets.Internal.ITreeListController;
        itemsProvider: DevExpress.Analytics.Utils.IItemsProvider;
        toggleCollapsed: () => void;
        toggleSelected: (_?: any, event?: JQueryEventObject) => void;
        getItems: () => JQueryPromise<DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel[]>;
        dispose(): void;
        templates: {
            accordionItem: string;
            headerItem: string;
            headerItemContent: string;
            itemTextContent: string;
            actionsContainer: string;
        };
    }
    export class TreeListRootItemViewModel extends TreeListItemViewModel {
        private _options;
        private _resolver;
        dispose(): void;
        walkOnTree(walkCallBack: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void): {
            stop: () => void;
        };
        private _visitNextNode;
        private _selectedPathSubscription;
        constructor(_options: DevExpress.Analytics.Widgets.Internal.ITreeListOptions, path?: MaybeSubscribable<string[]>, onItemsVisibilityChanged?: () => any, rtl?: boolean);
        _onItemsChanged(): void;
    }
    export const propertiesGridEditorsPaddingLeft: DevExpress.Analytics.Internal.IGlobalSubscribableValue<number>;
    export const defaultFontSerialization: DevExpress.Analytics.Internal.IGlobalSubscribableValue<string>;
    export function validateGuid(guid: any): boolean;
    export function validateNullableGuid(guid: any): boolean;
    export const guidValidationRules: {
        type: string;
        validationCallback: (options: any) => boolean;
        readonly message: any;
    }[];
    export const guidRequiredValidationRules: {
        type: string;
        readonly message: any;
    }[];
    export const requiredValidationRules: {
        type: string;
        readonly message: any;
    }[];
    export class ValueEditorHelper {
        private static _getCharFromKeyCode;
        private static _getCaretPosition;
        static editors: {
            integer: {
                regExpEditing: RegExp;
            };
            float: {
                regExpEditing: RegExp;
            };
            "System.Byte": {
                regExpEditing: RegExp;
                minValue: any;
                maxValue: string;
            };
            "System.SByte": {
                regExpEditing: RegExp;
                minValue: string;
                maxValue: string;
            };
            "System.Int16": {
                regExpEditing: RegExp;
                minValue: string;
                maxValue: string;
            };
            "System.UInt16": {
                regExpEditing: RegExp;
                minValue: any;
                maxValue: string;
            };
            "System.Int32": {
                regExpEditing: RegExp;
                minValue: string;
                maxValue: string;
            };
            "System.UInt32": {
                regExpEditing: RegExp;
                minValue: any;
                maxValue: string;
            };
            "System.Int64": {
                regExpEditing: RegExp;
                minValue: string;
                maxValue: string;
            };
            "System.UInt64": {
                regExpEditing: RegExp;
                minValue: any;
                maxValue: string;
            };
            "System.Single": {
                regExpEditing: RegExp;
                minValue: string;
                maxValue: string;
            };
            "System.Double": {
                regExpEditing: RegExp;
                minValue: string;
                maxValue: string;
            };
            "System.Decimal": {
                regExpEditing: RegExp;
                minValue: string;
                maxValue: string;
            };
        };
        private static _validate;
        static validateWidgetValue(e: any, validate: (value: string) => boolean, defaultVal: string): void;
        static getNumberEditorOptions(id: string, specifics: string, extendOptions?: {}): any;
        static getValueEditorOptions(regExpEditing: RegExp, validate: (value: string) => boolean, defaultVal: string, extendOptions?: {}): any;
        static isValid(id: string, specifics: string, value: string): boolean;
        private static _invokeStandardHandler;
    }
    export function wrapTreeListOptionsWithKo(options: DevExpress.Analytics.Widgets.Internal.ITreeListOptions): DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
    export class KoTreeListItemFactory extends DefaultTreeListItemFactory implements ITreeListItemFactory {
        createRootItem(options: DevExpress.Analytics.Widgets.Internal.ITreeListOptions, path?: ko.MaybeSubscribable<string | string[]>, onItemsVisibilityChanged?: () => void, rtl?: boolean): DevExpress.Analytics.Widgets.Internal.TreeListRootItemViewModel;
        createItem(options: DevExpress.Analytics.Widgets.Internal.ITreeListOptions, path?: string[], onItemsVisibilityChanged?: () => void, rtl?: boolean, resolver?: DevExpress.Analytics.Internal.CodeResolver): DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
    }
    export const availableFonts: ko.Observable<{
        [key: string]: string;
    }>;
    export class DataMemberTreeListController implements ITreeListController {
        dispose(): void;
        itemsFilter(item: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
        hasItems(item: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
        canSelect(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
        select(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): void;
        isDraggable(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
        selectedItem: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
        suppressActions: boolean;
    }
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export class dxFieldListPicker extends dxDropDownBox {
        _path: ko.Observable<string>;
        _value: ko.Observable<string>;
        _parentViewport: JQuery<Element>;
        _itemsProvider: ko.Observable<any>;
        _hasDisplayNameOption: boolean;
        _defaultPosition: any;
        updateOptions(options: any): void;
        constructor($element: any, options: any);
        _showDropDown(): void;
        _getMaxHeight(): number;
        _closeOutsideDropDownHandler(e: any, ignoreContainerClicks: any): void;
        _hideOnBlur(): boolean;
        _popupConfig(): any;
        _setTitle(text: string): void;
        _renderDisplayText(newValue: any): void;
        _optionChanged(args: {
            name: string;
            value: any;
        }): void;
        _clearValueHandler(): void;
        _renderPopupContent(): void;
    }
    export class PopupEditorBase extends Disposable {
        protected _disableSaveButton: ko.PureComputed<boolean>;
        protected _createMainPopupButtons(): void;
        constructor();
        canSave(): boolean;
        save(sender?: any): void;
        close(): void;
        get cancelLocalization(): any;
        get saveLocalization(): any;
        popupVisible: ko.Observable<boolean>;
        buttonItems: any[];
    }
    export class RequiredNullableEditor extends Editor {
        _getEditorValidationRules(): any[];
    }
    export function createNumericEditor(dotNetTypeFullName: string, specifics: string): {
        header: string;
        editorType: any;
    };
    export class TextAlignmentModel extends Disposable {
        private _resetHorizontalValues;
        private _resetVerticalValues;
        setValue(name: any, type: any): void;
        updateModel(value: string): void;
        updateValue(): void;
        constructor(object: {
            value: ko.Observable<string>;
            disabled?: ko.Observable<boolean>;
        });
        value: ko.Observable<string> | ko.Computed<string>;
        top: ko.Observable<boolean>;
        middle: ko.Observable<boolean>;
        bottom: ko.Observable<boolean>;
        left: ko.Observable<boolean>;
        right: ko.Observable<boolean>;
        center: ko.Observable<boolean>;
        justify: ko.Observable<boolean>;
        disabled: ko.Observable<boolean> | ko.Computed<boolean>;
        horizontalString: ko.Observable<string>;
        verticalString: ko.Observable<string>;
    }
    export {};
    export function registerBaseBinding(bindingName: string, optionsName?: string): void;
    export function addToBindingsCache(key: string, value: ($context: any, $element: any) => any): void;
    export function getFromCache(key: string): Function;
    export const availableUnits: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    export class FontModel extends Disposable {
        private _toString;
        updateModel(value: string): void;
        updateValue(value: any): void;
        constructor(value: ko.Observable<string> | ko.Computed<string>);
        family: ko.Observable<any>;
        unit: ko.Observable<any>;
        isUpdateModel: boolean;
        size: ko.Observable<any>;
        modificators: {
            bold: ko.Observable<boolean>;
            italic: ko.Observable<boolean>;
            strikeout: ko.Observable<boolean>;
            underline: ko.Observable<boolean>;
        };
    }
    export function wrapOptions(editorViewModel: DevExpress.Analytics.Widgets.IEditorViewModel): ICollectionEditorOptions;
    export interface ICollectionItemWrapperViewModel extends IViewModel, ICollapsedViewModel {
        value: any;
        selected: boolean;
        index: number;
        level: number;
        padding: number;
        name: string;
        disabled: boolean;
        getProperties: (options: any) => DevExpress.Analytics.Widgets.IObjectPropertiesViewModel;
        select: (e: any, force: any) => void;
    }
    export interface ICollectionItemWrapper {
        disabled: Observable<boolean>;
    }
    export interface ICollectionEditorOptionsBase {
        addHandler: () => any;
        removeHandler?: (parameter: any, selectedIndex?: number) => any;
        onValueChanged?: (array: any[], args: DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>) => any;
        displayName?: string;
        displayPropertyName?: string;
        hideButtons?: any;
        showScroll?: boolean;
        selectedItem?: Observable<any>;
        collapsed?: boolean;
        alwaysShow?: boolean;
        level?: number;
        template?: string;
        editorTemplate?: string;
        textEmptyArray?: DevExpress.Analytics.Internal.ILocalizationInfo;
        isVisibleButton?: (index: any, buttonName: any) => boolean;
        isDisabledButton?: (index: any, buttonName: any) => boolean;
    }
    export interface ICollectionEditorOptions extends ICollectionEditorOptionsBase {
        values: any[];
        undoEngine?: DevExpress.Analytics.Internal.IUndoEngine;
        info?: DevExpress.Analytics.Utils.ISerializationInfo;
    }
    type CollectionEditorViewModelButtonType = {
        visible: boolean;
        disabled: boolean;
        action: (model: any) => void;
        text: string;
        template: typeof DevExpress.Analytics.Internal.editor_template;
    };
    export interface ICollectionEditorViewModel extends ICollapsedViewModel, IViewModel {
        alwaysShow: boolean;
        contentId: string;
        headerId: string;
        showButtons: boolean;
        buttons: {
            up: CollectionEditorViewModelButtonType;
            down: CollectionEditorViewModelButtonType;
            add: CollectionEditorViewModelButtonType;
            delete: CollectionEditorViewModelButtonType;
        };
        displayName: string;
        level: number;
        padding: number;
        disabled: boolean;
        showScroll: boolean;
        emptyAreaText: string;
        values: ICollectionItemWrapperViewModel[];
        keyboardHelper: DevExpress.Analytics.Internal.AccordionKeyboardHelper;
    }
    export class CollectionEditorViewModel extends BaseRenderingModel<ICollectionEditorViewModel> {
        deferredUpdateViewModel(): boolean;
        createViewModel(): ICollectionEditorViewModel;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs): void;
        dispose(): void;
        private _textEmptyArray;
        private _timeoutItemRendered;
        private _move;
        private _setSelectedIndex;
        options: ICollectionEditorOptions;
        displayPropertyName: string;
        showScroll: boolean;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs): void;
        constructor(options: ICollectionEditorOptions, disabled?: boolean);
        getDisplayTextButton(key: string): string;
        getDisplayTextEmptyArray(): string;
        buttonMap: {
            [keyname: string]: DevExpress.Analytics.Internal.ILocalizationInfo & {
                iconClass: string;
            };
        };
        headerId: string;
        contentId: string;
        isVisibleButton: (buttonName: any) => boolean;
        isDisabledButton: (buttonName: any) => boolean;
        listKeyboardHelper: DevExpress.Analytics.Internal.ListKeyboardHelper;
        level: number;
        padding: number;
        addHandler: () => any;
        keyboardHelper: DevExpress.Analytics.Internal.AccordionKeyboardHelper;
        removeHandler: (selectedItem: any, index?: number) => void;
        add(model: any): void;
        up(model: any): void;
        down(model: any): void;
        delete(model: any): void;
        select(model: {
            index: ICollectionItemWrapperViewModel["index"];
            value: ICollectionItemWrapperViewModel["value"];
        }, force?: boolean): void;
        selectedIndex: number;
        collapsed: boolean;
        alwaysShow: boolean;
        displayName: string;
        values: any[];
        showButtons: boolean;
        hideButtons: boolean;
        disabled: boolean;
    }
    export {};
    export const wrapModelWithKo: (options: DevExpress.Analytics.Widgets.Internal.IKoCollectionEditorOptions, viewModel?: DevExpress.Analytics.Widgets.Editor) => DevExpress.Analytics.Widgets.Internal.CollectionEditorViewModel;
    export interface IKoCollectionEditorOptions extends ICollectionEditorOptionsBase {
        values: ko.Observable<ko.ObservableArray<any>> | ko.Computed<ko.ObservableArray<any>>;
        undoEngine?: ko.Observable<DevExpress.Analytics.Internal.IUndoEngine> | ko.Computed<DevExpress.Analytics.Internal.IUndoEngine>;
        info?: ko.Observable<DevExpress.Analytics.Utils.ISerializationInfo> | ko.Computed<DevExpress.Analytics.Utils.ISerializationInfo>;
    }
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export type EllipsisEditorOptions = DevExpress.ui.dxPopup.Properties & {
        buttonAction?: () => void;
        openOnFieldClick?: boolean;
        value?: any;
    };
    export class dxEllipsisEditor extends dxTextBox<EllipsisEditorOptions> {
        _$button: JQuery<HTMLElement>;
        _$buttonIcon: JQuery<HTMLElement>;
        _$element: JQuery<HTMLElement>;
        _modelByElement: any;
        _$input: JQuery<HTMLElement>;
        constructor(element: Element, options?: EllipsisEditorOptions);
        _init(): void;
        _render(): void;
        _updateWarningState(value?: unknown): void;
        _updateButtonSize(): void;
        _renderButton(): void;
        _attachButtonEvents(): void;
        _removeCustomHoveredStyle(): void;
        _attachInputEvents(): void;
        _optionChanged(args: {
            name: string;
            value: any;
        }): void;
        buttonAction(e: any): void;
    }
    export class dxFileImagePicker extends dxEllipsisEditor {
        constructor(element: any, options?: any);
        _getDisplayValue(): any;
        _handleResult(result: DevExpress.Analytics.Internal.IFileUploadResult): void;
        _renderInput(inputContainer: any): void;
        _attachButtonEvents(): void;
        _renderValue(): void;
    }
    export {};
    export {};
    export {};
    export const aceAvailable: (newVal?: boolean) => any;
    export interface IExpressionEditorItem {
        text: string;
        description?: string;
        descriptionStringId?: string;
    }
    export interface IExpressionEditorOperatorItem extends IExpressionEditorItem {
        image?: string;
        hasSeparator?: boolean;
    }
    export const operatorNames: Array<IExpressionEditorOperatorItem>;
    export interface IExpressionEditorFunctionItem extends IExpressionEditorItem {
        paramCount: number;
        displayName?: string;
    }
    export interface IExpressionEditorFunction {
        display: string;
        localizationId?: string;
        items?: {
            [key: string]: Array<DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunctionItem>;
        };
        category?: string;
    }
    export const insertOrUpdateFunctions: (functions: any | Array<DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction>, addins: any | Array<DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction>) => any;
    export const functionDisplay: .IGlobalSubscribableValue<DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction[]>;
    export const resetFunctionDisplay: () => DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction[];
    export function combineFunctionDisplay(addins: any | Array<DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction>): Array<DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction>;
    export interface IExpressionEditorContent {
        data: {
            fields?: any;
            parameters?: any;
            availableItems?: ko.Observable<any> | ko.Computed<any>;
            textToSearch?: ko.Observable<string> | ko.Computed<string>;
            selectedItem?: ko.Observable<any>;
            items?: any;
        };
        name: string;
        isSelected: ko.Observable<boolean> | ko.Computed<boolean>;
        showDescription: boolean;
    }
    export interface IExpressionEditorCategory extends IDisposable {
        displayName: string;
        collapsed?: ko.Observable<boolean> | ko.Computed<boolean>;
        content?: IExpressionEditorContent;
        items?: ko.Observable<IExpressionEditorContent[]> | ko.Computed<IExpressionEditorContent[]>;
        templateName?: string;
    }
    export class Tools extends Disposable {
        private _defaultClick;
        searchPlaceholder: () => string;
        private _generateTab;
        private _localizedExpressionEditorItem;
        private _initDescription;
        private _createFieldsCategory;
        private _createConstantCategory;
        private _createOperatorsCategory;
        private _createFunctionsCategoryContent;
        private _createFunctionsCategoryItem;
        private _createFunctionsCategory;
        private _disposeCategories;
        constructor(onClick: (item: any, element: any) => void, parametersOptions: ko.PureComputed<DevExpress.Analytics.Widgets.Internal.ITreeListOptions>, options: ko.Observable<DevExpress.Analytics.Widgets.IExpressionOptions> | ko.Computed<DevExpress.Analytics.Widgets.IExpressionOptions>, fieldListOptions?: ko.Computed<DevExpress.Analytics.Widgets.Internal.ITreeListOptions>);
        dispose(): void;
        resetCategoriesSelection: () => void;
        private _categories;
        showDescription: ko.Observable<boolean> | ko.Computed<boolean>;
        toolBox: any[];
        description: ko.Observable<string> | ko.Computed<string>;
    }
    export const RangeSpecific = "range";
    export function createExpressionEditorCollectionToolOptions(collectionItems: DevExpress.Analytics.Widgets.Internal.IExpressionEditorItem[], toolName: string, displayToolName: string, showDescription: boolean): DevExpress.Analytics.Widgets.Internal.IExpressionEditorCategory;
    export function wrapExpressionValue(path: ko.Observable<string> | ko.Computed<string>, value: ko.Observable<string> | ko.Computed<string>, converter: DevExpress.Analytics.Utils.IDisplayExpressionConverter, subscriptions: DevExpress.Analytics.Utils.DisposableType[]): ko.Observable<string> | ko.Computed<string>;
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export interface ICompletionRootItem {
        name: string;
        needPrefix?: boolean;
        rootPath?: string;
    }
    export interface ICodeCompletorOptions {
        editor: any;
        bindingContext: any;
        fieldListProvider: DevExpress.Analytics.Utils.IItemsProvider;
        path: ko.Observable<string> | ko.Computed<string>;
        functions?: Array<DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction> | ko.ObservableArray<DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction>;
        rootItems?: Array<ICompletionRootItem>;
        getRealExpression?: (path: string, member: string) => JQueryPromise<string>;
    }
    export class CodeCompletor extends Disposable {
        private _options;
        private _fieldListProvider;
        private _path;
        private _editor;
        private _contextPath;
        private _functions;
        private _rootItems;
        private _isInContext;
        private _getPath;
        private _previousSymbol;
        beforeInsertMatch(editor: any, token: any, parentPrefix: any): void;
        insertMatch(editor: any, parentPrefix: any, fieldName: any): void;
        generateFieldDisplayName(parentPrefix: any, displayName: any): string;
        private _convertDataMemberInfoToCompletions;
        private _combinePath;
        private _getParentPrefix;
        private _getRealPath;
        private _getFields;
        private static _cleanupFields;
        private _processFields;
        getFunctionsCompletions(): any[];
        getAggregateCompletions(): any[];
        getOperatorCompletions(prefix: any): {
            caption: string;
            snippet: string;
            meta: any;
        }[];
        private _addFunctions;
        private _addAggregates;
        private _addOperators;
        private _addParameterOperators;
        private _getOperands;
        private _getOperandsOrOperators;
        private _findStartContextTokenPosition;
        private _findOpenedStartContext;
        private _findOpenedAggregates;
        private _getContextPath;
        private _getCompletions;
        defaultProcess(getToken: () => any, text: any, completions: any): JQuery.Promise<any, any, any>;
        constructor(_options: DevExpress.Analytics.Widgets.Internal.ICodeCompletorOptions);
        identifierRegexps: RegExp[];
        getCompletions(aceEditor: any, session: any, pos: any, prefix: any, callback: any): void;
        getDocTooltip(item: any): void;
    }
    export function createFunctionCompletion(fnInfo: DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunctionItem, name: string, insertValue?: string): {
        caption: string;
        snippet: string;
        meta: any;
        tooltip: any;
        score: number;
        completer: {
            insertMatch: (editor: any, data: any) => void;
        };
    };
    export function trimBrackets(value: string): string;
    export class FilterEditorSerializer {
        operatorTokens: {
            Plus: string;
            Minus: string;
            Equal: string;
            NotEqual: string;
            Greater: string;
            Less: string;
            LessOrEqual: string;
            GreaterOrEqual: string;
            Divide: string;
            BitwiseAnd: string;
            BitwiseOr: string;
            BitwiseXor: string;
            Modulo: string;
            Multiply: string;
        };
        custom?: (criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator, reverse: boolean) => string;
        serializeGroupOperand(groupOperator: DevExpress.Analytics.Criteria.GroupOperator, reverse: boolean): any;
        serializeAggregateOperand(aggregateOperand: DevExpress.Analytics.Criteria.AggregateOperand, reverse: boolean): any;
        serializeOperandProperty(operandProperty: DevExpress.Analytics.Criteria.OperandProperty): string;
        serializeOperandValue(operandValue: DevExpress.Analytics.Criteria.OperandValue): any;
        serializeOperandParameter(operandParameter: DevExpress.Analytics.Criteria.OperandParameter): string;
        serializeBetweenOperator(betweenOperator: DevExpress.Analytics.Criteria.BetweenOperator, reverse: boolean): any;
        serializeInOperator(inOperator: DevExpress.Analytics.Criteria.InOperator, reverse: boolean): any;
        serializeBinaryOperator(binaryOperator: DevExpress.Analytics.Criteria.BinaryOperator, reverse: boolean): any;
        serializeUnaryOperator(unaryOperator: DevExpress.Analytics.Criteria.UnaryOperator, reverse: boolean): any;
        serializeFunctionOperator(functionOperator: DevExpress.Analytics.Criteria.FunctionOperator, reverse: boolean): any;
        constructor(operatorTokens?: {
            Plus: string;
            Minus: string;
            Equal: string;
            NotEqual: string;
            Greater: string;
            Less: string;
            LessOrEqual: string;
            GreaterOrEqual: string;
            Divide: string;
            BitwiseAnd: string;
            BitwiseOr: string;
            BitwiseXor: string;
            Modulo: string;
            Multiply: string;
        }, custom?: (criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator, reverse: boolean) => string);
        serialize(criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator, reverse?: boolean): any;
        deserialize(stringCriteria: string): DevExpress.Analytics.Criteria.CriteriaOperator;
        deserializeOperand(operand: DevExpress.Analytics.Criteria.CriteriaOperator): DevExpress.Analytics.Criteria.CriteriaOperator;
    }
    export type ResizeHandlerOptions = {
        resultSize?: ko.Observable<number>;
        disabled?: ko.Observable<boolean>;
        onResize?: () => void;
    };
    export class ResizeHelper {
        options: ResizeHandlerOptions;
        private _resize;
        constructor(options?: ResizeHandlerOptions);
        resizable(resizeHandler: object, handles: string): any;
        stopResize: () => void;
        resize: (params: {
            size: DevExpress.Analytics.Elements.ISize;
            delta: {
                dx: number;
                dy: number;
                dw: number;
                dh: number;
            };
            element: HTMLDivElement;
        }) => void;
    }
    export class ExpressionEditorTreeListController extends TreeListController {
        fieldName: ko.Computed<string> | string;
        putSelectionHandler: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel, element: any) => void;
        selectionHandler?: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void;
        customFilter?: (path: string) => boolean;
        constructor(fieldName: ko.Computed<string> | string, putSelectionHandler: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel, element: any) => void, selectionHandler?: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void, customFilter?: (path: string) => boolean);
        itemsFilter(item: DevExpress.Analytics.Utils.IDataMemberInfo, path: string): boolean;
        select(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): void;
        getActions(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): DevExpress.Analytics.Utils.IAction[];
        canSelect(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
    }
    export class ExpressionEditorParametersTreeListController extends TreeListController {
        customFilter: (item: DevExpress.Analytics.Utils.IDataMemberInfo) => boolean;
        putSelectionHandler: (selectedItemPath: string, element: any) => void;
        selectionHandler?: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void;
        constructor(customFilter: (item: DevExpress.Analytics.Utils.IDataMemberInfo) => boolean, putSelectionHandler: (selectedItemPath: string, element: any) => void, selectionHandler?: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void);
        itemsFilter(item: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
        select(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): void;
        getActions(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): DevExpress.Analytics.Utils.IAction[];
        canSelect(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
    }
    export function initDisplayText(object: {
        name: string;
        localizationId?: string;
        displayText?: string;
    }): void;
    export class FilterEditorAddOn extends Disposable {
        private _filterPlaceHolder;
        private _popupService;
        private _action;
        private _updateActions;
        constructor(criteria: DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>, popupService: DevExpress.Analytics.Internal.PopupService, action: string, propertyName: any, templateName?: any);
        showPopup: (_: any, element: any) => void;
        popupContentTemplate: string;
        propertyName: string;
        target: DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>;
        filterString: ko.Observable<string>;
        isFiltered: ko.Observable<boolean>;
    }
    export class FilterEditorTreeListController implements ITreeListController {
        selectedItem: ko.Observable<DevExpress.Analytics.Utils.IDataMemberInfo>;
        constructor(selectedItem: ko.Observable<DevExpress.Analytics.Utils.IDataMemberInfo>);
        itemsFilter(item: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
        hasItems(item: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
        canSelect(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
        select(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): void;
        dispose(): void;
        isDraggable(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
    }
    export enum CriteriaSurfaceValidatorState {
        Left = 0,
        Right = 1,
        Unary = 2
    }
    export class CriteriaSurfaceValidator {
        customValidate(operator: any, from: CriteriaSurfaceValidatorState): boolean;
        checkLeftPart(leftPart: any): boolean;
        _checkRightPart(criteriaOperator: any): any;
        checkRightPart(rigthPart: any): any;
        aggregateIsValid(criteriaOperator: DevExpress.Analytics.Criteria.AggregateOperand): any;
        commonOperandValid(criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator): any;
        groupIsValid(criteriaOperator: DevExpress.Analytics.Criteria.GroupOperator): boolean;
        unaryIsValid(criteriaOperator: DevExpress.Analytics.Criteria.UnaryOperator): any;
        validateModel(criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator): any;
    }
    export class FilterEditorCodeCompletor extends CodeCompletor {
        filterEditorAvailable: {
            operators: Array<{
                name: string;
                insertVal: string;
                paramCount: number;
            }>;
            aggregate: Array<{
                name: string;
                insertVal: string;
            }>;
            functions: Array<{
                name: string;
                insertVal: string;
            }>;
        };
        constructor(options: DevExpress.Analytics.Widgets.Internal.ICodeCompletorOptions);
        getFunctionsCompletions(): any[];
        getAggregateCompletions(): any[];
        getOperatorCompletions(prefix: any): any[];
    }
    export interface IStandardPattern {
        type: string;
        value: any;
        patterns: Array<string>;
    }
    export const formatStringStandardPatterns: {
        [key: string]: IStandardPattern;
    };
    export class PopupComponentBase extends BaseModel {
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        private _component;
        getComponent(): DevExpress.ui.dxPopup<Properties>;
        onContentReady: (e: DevExpress.ui.dxPopup.ContentReadyEvent) => void;
        hideOnOutsideClick: (e: {
            target: HTMLElement;
        }) => boolean;
        dispose(): void;
    }
    export class dxPopupWithAutoHeight extends dxPopup {
        _setContentHeight(): void;
    }
    export interface ITreeListBindingOptions {
        element: HTMLElement;
        values: DevExpress.Analytics.Widgets.Internal.ITreeListOptions | Subscribable<DevExpress.Analytics.Widgets.Internal.ITreeListOptions>;
        dragDropHandler?: DevExpress.Analytics.Internal.DragDropHandler;
        createChildContext: (viewModel: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel) => void;
    }
    export function initTreeListBinding(bindingOptions: ITreeListBindingOptions): () => void;
    export class TreeListSearchViewModel extends Disposable {
        static createController(element: Element, controllers: DevExpress.Analytics.Widgets.Internal.ITreeListController[], modelType?: typeof TreeListSearchViewModel, templateName?: string): void;
        private _processedNodes;
        private _currentProcess;
        dispose(): void;
        clearProcess(): void;
        valueChanged(newValue: string): void;
        private _collapseTreeBranch;
        addController(root: DevExpress.Analytics.Widgets.Internal.TreeListRootItemViewModel): void;
        constructor();
        searchTimeout: number;
        value: ko.Computed;
        _roots: DevExpress.Analytics.Widgets.Internal.TreeListRootItemViewModel[];
        searchPlaceholder: () => string;
    }
    export {};
    export abstract class ReorderTreeListDragDropHelper extends Disposable {
        private dragHelperContent;
        protected _target: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
        protected _targetElement: HTMLElement;
        protected _draggable: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
        protected _draggableModel: any;
        protected _draggableParent: any;
        protected _targetModel: any;
        protected _getElementViewModel(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): any;
        protected droppableClassName: string;
        protected approveClassName: string;
        protected classDropBefore: string;
        protected classDropAfter: string;
        started: boolean;
        dispose(): void;
        constructor(dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent);
        protected isDragToBottom(): boolean;
        start(draggable: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel): void;
        canDrop(): boolean;
        abstract getSiblings(): ko.ObservableArray<any>;
        reorderSiblings(isDragToBottom?: boolean): void;
        clearDroppableClasses(): void;
        getDroppablePosition(): string;
        drag(elementModel: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel, element: HTMLElement): void;
        stop(): void;
        helper(draggable: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel, event: Event): void;
        addDroppableClass(): void;
        protected _removeClass(target: HTMLElement): void;
    }
}
declare module DevExpress.Analytics.Serializer.Native {
    import EventPropertyManager = DevExpress.Analytics.Utils.EventPropertyManager;
    import PropertyChangedEvents = DevExpress.Analytics.Serializer.Native.PropertyChangedEvents;
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import IModel = DevExpress.Analytics.Serializer.Native.IModel;
    import IMutableOptions = DevExpress.Analytics.Serializer.Native.IMutableOptions;
    import IModelSerializer = DevExpress.Analytics.Serializer.Native.IModelSerializer;
    import IModelSerializerOptions = DevExpress.Analytics.Serializer.Native.IModelSerializerOptions;
    import EventManager = DevExpress.Analytics.Utils.EventManager;
    import ISerializableModel = DevExpress.Analytics.Utils.ISerializableModel;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import ComputedOptions = DevExpress.Analytics.Serializer.Native.ComputedOptions;
    import SubscribableProperty = DevExpress.Analytics.Serializer.Native.SubscribableProperty;
    import Unwrapped = DevExpress.Analytics.Serializer.Native.Unwrapped;
    import MultiplatformEngine = DevExpress.Analytics.Serializer.Native.MultiplatformEngine;
    import IRenderingModel = DevExpress.Analytics.Serializer.Native.IRenderingModel;
    import IViewModel = DevExpress.Analytics.Serializer.Native.IViewModel;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import EngineType = DevExpress.Analytics.Serializer.Native.EngineType;
    import IObjectPropertiesViewModel = DevExpress.Analytics.Widgets.IObjectPropertiesViewModel;
    import IPropertyGridEditorViewModel = DevExpress.Analytics.Widgets.IPropertyGridEditorViewModel;
    import ICollectionEditorViewModel = DevExpress.Analytics.Widgets.Internal.ICollectionEditorViewModel;
    import ICollectionItemWrapperViewModel = DevExpress.Analytics.Widgets.Internal.ICollectionItemWrapperViewModel;
    import IEditorViewModel = DevExpress.Analytics.Widgets.IEditorViewModel;
    import IActionViewModel = DevExpress.Analytics.Utils.IActionViewModel;
    import ISelectBoxActionViewModel = DevExpress.Analytics.Utils.ISelectBoxActionViewModel;
    import IColorPickerEditorViewModel = DevExpress.Analytics.Widgets.IColorPickerEditorViewModel;
    import IFieldListEditorViewModel = DevExpress.Analytics.Widgets.IFieldListEditorViewModel;
    import ITabPanelViewModel = DevExpress.Analytics.Utils.ITabPanelViewModel;
    type AllPropertiesChangedEvents<T = any> = {
        propertyChanged: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<T> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<T>;
    };
    export type PropertyChangedEvents<T = any> = AllPropertiesChangedEvents<T> & SinglePropertyChangedEvents<T>;
    export type PropertyChangedEventArgs<T = any> = {
        propertyName: keyof T;
        oldValue: unknown;
        newValue: unknown;
    };
    export type ArrayPropertyChangedEventArgs<T = any> = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<T> & {
        added: {
            item: unknown;
            index: number;
        }[];
        removed: {
            item: unknown;
            index: number;
        }[];
    };
    export {};
    export interface IModel {
        events: DevExpress.Analytics.Utils.EventPropertyManager<this>;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEvents["propertyChanged"]): void;
    }
    export interface IViewModel<T = unknown> {
        getModel(): T;
    }
    export interface IRenderingModel {
        getViewModel(): DevExpress.Analytics.Serializer.Native.IViewModel;
        createViewModel(): void;
    }
    export function updateViewModel(model: DevExpress.Analytics.Serializer.Native.IModel, args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs): void;
    export function _updateViewModelWithChunks(model: DevExpress.Analytics.Serializer.Native.IModel, args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs): void;
    type ComplexSubscribableProperty<T> = {
        propertyName: T;
        subscribables: SubscribableProperties<DevExpress.Analytics.Serializer.Native.Unwrapped<T>>;
    };
    export type SubscribableProperty<T> = {
        model: T;
        properties: SubscribableProperties<T>;
    };
    export function subscribableProperty<T>(model: DevExpress.Analytics.Serializer.Native.SubscribableProperty<T>["model"], properties: DevExpress.Analytics.Serializer.Native.SubscribableProperty<T>["properties"]): DevExpress.Analytics.Serializer.Native.SubscribableProperty<T>;
    export type ComputedOptions<T> = (() => T) | ({
        read: () => T;
        write: (val: T) => void;
    });
    export type MultiPlatformObservable<T> = T | ko.Observable<T>;
    export type MultiPlatformComputed<T> = T | ko.Computed<T>;
    export type Unwrapped<T> = T extends ko.Subscribable<infer R> ? R : T;
    export class MultiplatformEngine {
        cleanNode(child: Element): void;
        addDisposeCallback(element: Node, disposeCallback: () => void): void;
        removeDisposeCallback(element: Node, disposeCallback: () => void): void;
        peek<T extends {}>(value: T): DevExpress.Analytics.Serializer.Native.Unwrapped<T>;
        getPropertyValue<T extends DevExpress.Analytics.Serializer.Native.IModel, Key extends keyof T>(model: T, propertyName: Key | string): T[Key];
        setPropertyValue<T extends DevExpress.Analytics.Serializer.Native.IModel, Key extends keyof T>(model: T, propertyName: Key | string, value: DevExpress.Analytics.Serializer.Native.Unwrapped<T[Key]>, currentValue?: T[Key]): void;
        generateProperty<T extends DevExpress.Analytics.Serializer.Native.IModel, Key extends keyof T>(model: T, propertyName: Key, value: T[Key], options?: DevExpress.Analytics.Serializer.Native.IMutableOptions): void;
        generateArrayProperty<T extends DevExpress.Analytics.Serializer.Native.IModel, Key extends keyof T>(model: T, propertyName: Key, value: T[Key], options?: DevExpress.Analytics.Serializer.Native.IMutableOptions): void;
        createComputedProperty<T extends DevExpress.Analytics.Serializer.Native.IModel, Key extends keyof T>(configurableModel: T, configurablePropertyName: Key, comOptions: DevExpress.Analytics.Serializer.Native.ComputedOptions<T[Key]>, properties: DevExpress.Analytics.Serializer.Native.SubscribableProperty<any>[], options?: DevExpress.Analytics.Serializer.Native.IMutableOptions, pure?: boolean): () => void;
        subscribeValue<T>(value: T, callback: (newVal: T) => void): () => void;
        subscribeOnPropertyChanged<T extends DevExpress.Analytics.Serializer.Native.IModel, Key extends keyof T>(model: T, subscribablePropertyName: Key, callback: (newVal: T[Key]) => void, onDispose?: () => void): () => void;
        unwrap<T>(value: T): DevExpress.Analytics.Serializer.Native.Unwrapped<T>;
        wrap<T>(value: T): MultiPlatformObservable<T>;
        applyBindings(value: unknown, element: Element): void;
    }
    export const nativeMultiPlatformEngine: DevExpress.Analytics.Serializer.Native.MultiplatformEngine;
    export const nativeModelSerializer: (options?: DevExpress.Analytics.Serializer.Native.IModelSerializerOptions) => DevExpress.Analytics.Serializer.Native.IModelSerializer;
    export let currentModelSerializer: (options?: DevExpress.Analytics.Serializer.Native.IModelSerializerOptions) => DevExpress.Analytics.Serializer.Native.IModelSerializer;
    export let currentMultiPlatformEngine: DevExpress.Analytics.Serializer.Native.MultiplatformEngine;
    export function setCurrentMultiplatfromEngine(engine: DevExpress.Analytics.Serializer.Native.MultiplatformEngine): void;
    export function setCurrentModelSerializer(serializerCallback: typeof currentModelSerializer): void;
    export {};
    export const ViewModelChangedEvent = "viewModelChanged";
    type ViewModelChangedEventArgs = {
        propertyName: string | number;
        oldValue: any;
        newValue: any;
    };
    type ViewModelEvents = {
        "viewModelChanged": ViewModelChangedEventArgs;
    };
    export type EventManagerHolder<T> = T & {
        _viewModelEvents: DevExpress.Analytics.Utils.EventManager<T, ViewModelEvents>;
    };
    export type ViewModelGenerator<T> = {
        createDefaultModel(model: DevExpress.Analytics.Serializer.Native.IModel): ViewModelGenerator<T>;
        generateProperty<K extends keyof T>(propertyName: K, value?: T[K], suppressViewModelNotification?: boolean): ViewModelGenerator<T>;
        configureProperty<K extends keyof T>(propertyName: K, configure: (property: T[K]) => void): ViewModelGenerator<T>;
        getViewModel(): T;
    };
    export type ValueStorageFactory = (initialValue: any) => {
        getValue: () => any;
        setValue: (value: any) => void;
        explicitNotifySubscribers: () => void;
    };
    export const viewModelGeneratorSettings: {
        customValueStorageFactory: ValueStorageFactory;
        ensureChangesImmutable: boolean;
        addTestFlag: boolean;
    };
    export const createViewModelGenerator: <T>(_viewModel?: Partial<T>) => ViewModelGenerator<T>;
    export {};
    export interface IMutableOptions {
        rateLimit?: {
            timeout?: number;
            method?: string;
        };
        deferred?: boolean;
        notify?: "always" | never;
    }
    export abstract class BaseModel extends Disposable implements ISerializableModel, IModel {
        deferredUpdateViewModel(): boolean;
        assignProperty<K extends keyof this = keyof this>(propertyName: K, value: this[K], options?: DevExpress.Analytics.Serializer.Native.IMutableOptions): void;
        assignArrayProperty<K extends keyof this = keyof this>(propertyName: K, value: this[K], options?: DevExpress.Analytics.Serializer.Native.IMutableOptions): void;
        deserialize(model: object, serializer: DevExpress.Analytics.Serializer.Native.IModelSerializer): void;
        dispose(): void;
        _needInitializeModel(): boolean;
        _initializeModel(model: object, serializer: DevExpress.Analytics.Serializer.Native.IModelSerializer): void;
        constructor(model?: object, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer);
        events: DevExpress.Analytics.Utils.EventPropertyManager<this>;
        _model?: any;
        __decorators?: Array<(model: this) => void>;
        abstract onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEvents["propertyChanged"]): void;
    }
    export function mutable(defaultVal?: (() => any) | any, options?: DevExpress.Analytics.Serializer.Native.IMutableOptions): (target: BaseModel, propertyKey: string) => any;
    export function mutableArray(defaultVal?: () => any[], options?: DevExpress.Analytics.Serializer.Native.IMutableOptions): (target: BaseModel, propertyKey: string) => any;
    export class BaseEmptyModel extends BaseModel {
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
    }
    export class BaseRenderingModel<TViewModel extends DevExpress.Analytics.Serializer.Native.IViewModel> extends BaseModel implements IRenderingModel, ISerializableModel {
        __viewModel: TViewModel | undefined;
        getViewModel(): TViewModel;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEvents["propertyChanged"]): void;
        initializeViewModel(): void;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEvents["propertyChanged"]): void;
        setProperty(propertyName: string, value: unknown): void;
        getProperty(propertyName: string): unknown;
        createViewModel(): TViewModel;
    }
    type GetType = "unwrap" | "peek" | "wrapped";
    type GetFunctionReturnType<Model, K extends keyof Model, Type extends GetType> = Type extends "unwrap" | "peek" ? DevExpress.Analytics.Serializer.Native.Unwrapped<Model[K]> : Model[K];
    export type EngineType = "multiplatform" | "native";
    export class BaseRenderingMultiplatformModel<TViewModel extends DevExpress.Analytics.Serializer.Native.IViewModel> extends BaseRenderingModel<TViewModel> {
        _engineType: DevExpress.Analytics.Serializer.Native.EngineType;
        constructor(model?: object, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer, _engineType?: DevExpress.Analytics.Serializer.Native.EngineType);
        private _propertiesSubscriptions;
        _needInitializeModel(): boolean;
        _getEngine(): DevExpress.Analytics.Serializer.Native.MultiplatformEngine;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        subscribeOnChanges<T>(viewModel: DevExpress.Analytics.Serializer.Native.IViewModel, propertyNames: Array<keyof T>): void;
        _get<K extends keyof this, Type extends GetType = "unwrap">(propertyName: K | string, unwrap?: GetType): GetFunctionReturnType<this, K, Type>;
        _set<K extends keyof this>(propertyName: K | string, value: DevExpress.Analytics.Serializer.Native.Unwrapped<this[K]> | any): void;
        assignProperty<K extends keyof this>(propertyName: K, value: this[K], options?: DevExpress.Analytics.Serializer.Native.IMutableOptions): void;
        assignArrayProperty<K extends keyof this>(propertyName: K, value: this[K], options?: DevExpress.Analytics.Serializer.Native.IMutableOptions): void;
        createComputedProperty<K extends keyof this>(propertyName: K, computedOptions: DevExpress.Analytics.Serializer.Native.ComputedOptions<this[K]>, properties: DevExpress.Analytics.Serializer.Native.SubscribableProperty<any>[], options?: DevExpress.Analytics.Serializer.Native.IMutableOptions, pure?: boolean): () => void;
        subscribeProperty<K extends keyof this>(propertyName: K, callback: (newVal: this[K]) => void, onDispose?: () => void): () => void;
        unwrap<T>(value: T): DevExpress.Analytics.Serializer.Native.Unwrapped<T>;
        peek<T>(value: T): DevExpress.Analytics.Serializer.Native.Unwrapped<T>;
        destroyPropertySubscription(propertyName: string): void;
        dispose(): void;
    }
    export {};
    export interface IPropertyDeserializationEngine {
        generateProperty: (model: DevExpress.Analytics.Serializer.Native.IModel, propertyName: string, value: unknown, options?: DevExpress.Analytics.Serializer.Native.IMutableOptions) => void;
        generateArrayProperty: (model: DevExpress.Analytics.Serializer.Native.IModel, propertyName: string, value: Array<unknown>) => void;
    }
    export function notifyPropertyChanged(model: DevExpress.Analytics.Serializer.Native.IModel, args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs): void;
    export const arrayModificationMapper: {
        push: (array: unknown[], callback: any) => void;
        splice: (array: any[], callback: any) => void;
        pop: (array: any[], callback: any) => void;
    };
    export class PropertyDeserializationEngine implements IPropertyDeserializationEngine {
        _defineProperty(model: DevExpress.Analytics.Serializer.Native.IModel, propertyName: string, createCurrentValue: () => unknown, onValueChanged?: (newVal: any) => void, options?: DevExpress.Analytics.Serializer.Native.IMutableOptions): void;
        generateArrayProperty(model: DevExpress.Analytics.Serializer.Native.IModel, propertyName: string, value: Array<unknown>, options?: DevExpress.Analytics.Serializer.Native.IMutableOptions): void;
        generateProperty(model: DevExpress.Analytics.Serializer.Native.IModel, propertyName: string, value: unknown, options?: DevExpress.Analytics.Serializer.Native.IMutableOptions): void;
    }
    export const defaultPropertyDeserializatonEngine: PropertyDeserializationEngine;
    export interface IModelSerializerOptions {
        useRefs: boolean;
        serializeDate?: (date: Date) => string;
    }
    export interface IModelSerializer {
        deserialize(viewModel: DevExpress.Analytics.Utils.ISerializableModel, model: any, serializationsInfo?: DevExpress.Analytics.Utils.ISerializationInfoArray): void;
        serialize(viewModel: DevExpress.Analytics.Utils.ISerializableModel, serializationsInfo?: DevExpress.Analytics.Utils.ISerializationInfoArray, refs?: any): any;
        engineType: DevExpress.Analytics.Serializer.Native.EngineType;
    }
    export interface IModelSerializerRef {
        linkObjTable: {
            setRef: (ref: number) => void;
            obj: any;
        }[];
        objects: any[];
    }
    export class NativeModelSerializer implements IModelSerializer {
        engineType: DevExpress.Analytics.Serializer.Native.EngineType;
        private _options;
        private _refTable;
        createObjectByInfo(info: DevExpress.Analytics.Utils.ISerializationInfoArray): DevExpress.Analytics.Utils.ISerializableModel;
        private _linkTable;
        private linkObjects;
        wrapPropertyValue(value: unknown): unknown;
        wrapPropertyArrayValue(value: unknown[]): unknown[];
        unwrapPropertyValue(value: unknown): unknown;
        private _getModel;
        private _collectLinks;
        private _enumRefs;
        _collectLinksAndEnumRefs(model: any, internalModel?: any, propertyPath?: any[]): void;
        constructor(options?: DevExpress.Analytics.Serializer.Native.IModelSerializerOptions);
        setLinks(refs: IModelSerializerRef): void;
        deserializeProperty(modelPropertyInfo: DevExpress.Analytics.Utils.ISerializationInfo, model: any): any;
        deserializeDefaultValue(modelPropertyInfo: DevExpress.Analytics.Utils.ISerializationInfo): any;
        deserializePropertyValue(modelPropertyInfo: DevExpress.Analytics.Utils.ISerializationInfo, modelValue: any, strict?: boolean): any;
        setLinkProperty(viewModel: any, propertyName: string, newVal: any): any;
        getLinkProperty(viewModel: any, propertyName: string): any;
        setReferencedProperty(viewModel: DevExpress.Analytics.Utils.ISerializableModel, model: any, refValue: string): void;
        generateProperty(model: DevExpress.Analytics.Serializer.Native.IModel, propertyName: string, value: unknown): void;
        generateArrayProperty(model: DevExpress.Analytics.Serializer.Native.IModel, propertyName: string, value: unknown[]): void;
        deserialize(viewModel: DevExpress.Analytics.Utils.ISerializableModel, model: any, serializationsInfo?: DevExpress.Analytics.Utils.ISerializationInfoArray): void;
        serialize(viewModel: DevExpress.Analytics.Utils.ISerializableModel, serializationsInfo?: DevExpress.Analytics.Utils.ISerializationInfoArray, refs?: IModelSerializerRef | null): any;
        private _isSerializableValue;
        protected serializeProperty(modelPropertyInfo: DevExpress.Analytics.Utils.ISerializationInfo, viewModel: DevExpress.Analytics.Utils.ISerializableModel, serializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray, refs: IModelSerializerRef, result: any): void;
        private _serialize;
    }
    export let modelAccessor: (element: Element) => any;
    export function setDefautModelAccessor(accessor: (element: Element) => any): void;
    export function deserializeArray<T>(model: any, creator: (item: any) => any): T[];
    export type TemplateEngineTypes = {
        "dx-right-panel-lightweight": DevExpress.Analytics.Utils.ITabPanelViewModel;
        "dxrd-right-panel-template-base": DevExpress.Analytics.Utils.ITabPanelViewModel;
        "dxrd-toolbar-tmplt": DevExpress.Analytics.Utils.IActionViewModel[];
        "dxrd-zoom-select-template": DevExpress.Analytics.Utils.ISelectBoxActionViewModel;
        "dx-propertieseditor": DevExpress.Analytics.Widgets.IObjectPropertiesViewModel;
        "dx-boolean": DevExpress.Analytics.Widgets.IEditorViewModel;
        "dx-boolean-select": DevExpress.Analytics.Widgets.IEditorViewModel;
        "dx-numeric": DevExpress.Analytics.Widgets.IEditorViewModel;
        "dx-combobox": DevExpress.Analytics.Widgets.IEditorViewModel;
        "dx-text": DevExpress.Analytics.Widgets.IEditorViewModel;
        "dx-commonCollection": DevExpress.Analytics.Widgets.IEditorViewModel;
        "dx-emptyHeader": undefined;
        "dx-objectEditorContent": DevExpress.Analytics.Widgets.IPropertyGridEditorViewModel;
        "dxrd-field": DevExpress.Analytics.Widgets.IFieldListEditorViewModel;
        "dx-number-editor": DevExpress.Analytics.Widgets.IEditorViewModel;
        "dx-collectioneditor": DevExpress.Analytics.Widgets.Internal.ICollectionEditorViewModel;
        "dxrd-commonCollectionItem": DevExpress.Analytics.Widgets.Internal.ICollectionItemWrapperViewModel;
        "dx-commonCollectionItem": DevExpress.Analytics.Widgets.Internal.ICollectionItemWrapperViewModel;
        "dxqb-collectioneditor-template": DevExpress.Analytics.Widgets.Internal.ICollectionItemWrapperViewModel;
        "dx-jsonwizard-parametercollection": DevExpress.Analytics.Widgets.Internal.ICollectionItemWrapperViewModel;
        "dxrd-colorpicker": DevExpress.Analytics.Widgets.IColorPickerEditorViewModel;
    };
    type SinglePropertyChangedEvents<T = any> = { [key: string]: string };
}
declare module DevExpress.Analytics.Widgets.TreeList {
    export const LoadChildItemsForCollapsedNodes: DevExpress.Analytics.Internal.IGlobalSubscribableValue<boolean>;
}
declare module DevExpress.Analytics.Widgets {
    import IEditorInfo = DevExpress.Analytics.Utils.IEditorInfo;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import Editor = DevExpress.Analytics.Widgets.Editor;
    import IViewModel = DevExpress.Analytics.Serializer.Native.IViewModel;
    import IEditorViewModel = DevExpress.Analytics.Widgets.IEditorViewModel;
    import IControlPropertiesViewModel = DevExpress.Analytics.Internal.IControlPropertiesViewModel;
    import IModelAction = DevExpress.Analytics.Internal.IModelAction;
    import IPropertiesAccessibilityProvider = DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import getLocalization = DevExpress.Analytics.Utils.getLocalization;
    import BaseRenderingMultiplatformModel = DevExpress.Analytics.Serializer.Native.BaseRenderingMultiplatformModel;
    import EngineType = DevExpress.Analytics.Serializer.Native.EngineType;
    import getParentContainer = DevExpress.Analytics.Internal.getParentContainer;
    import IEditorAddon = DevExpress.Analytics.Internal.IEditorAddon;
    import MultiPlatformComputed = DevExpress.Analytics.Serializer.Native.MultiPlatformComputed;
    import MultiPlatformObservable = DevExpress.Analytics.Serializer.Native.MultiPlatformObservable;
    import PopupService = DevExpress.Analytics.Internal.PopupService;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import Popover = DevExpress.Analytics.Utils.Native.Popover;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import IPopoverViewModel = DevExpress.Analytics.Utils.Native.IPopoverViewModel;
    import TreeListController = DevExpress.Analytics.Widgets.Internal.TreeListController;
    import FieldListEditor = DevExpress.Analytics.Widgets.FieldListEditor;
    import DataMemberTreeListController = DevExpress.Analytics.Widgets.Internal.DataMemberTreeListController;
    import AccordionOptions = DevExpress.Analytics.Widgets.AccordionOptions;
    import ObjectProperties = DevExpress.Analytics.Widgets.ObjectProperties;
    import PropertyGridEditor = DevExpress.Analytics.Widgets.PropertyGridEditor;
    import IDisplayNameProvider = DevExpress.Analytics.Utils.IDisplayNameProvider;
    import CodeCompletor = DevExpress.Analytics.Widgets.Internal.CodeCompletor;
    import ICompletionRootItem = DevExpress.Analytics.Widgets.Internal.ICompletionRootItem;
    import DisplayExpressionConverter = DevExpress.Analytics.Internal.DisplayExpressionConverter;
    import CriteriaOperator = DevExpress.Analytics.Criteria.CriteriaOperator;
    import ResizeHelper = DevExpress.Analytics.Widgets.Internal.ResizeHelper;
    import IItemsProvider = DevExpress.Analytics.Utils.IItemsProvider;
    import IExpressionEditorFunction = DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction;
    import Tools = DevExpress.Analytics.Widgets.Internal.Tools;
    import ExpressionEditorParametersTreeListController = DevExpress.Analytics.Widgets.Internal.ExpressionEditorParametersTreeListController;
    import ICriteriaChangeOperator = DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator;
    import AggregateOperandSurface = DevExpress.Analytics.Widgets.Filtering.AggregateOperandSurface;
    import BetweenOperandSurface = DevExpress.Analytics.Widgets.Filtering.BetweenOperandSurface;
    import BinaryOperandSurface = DevExpress.Analytics.Widgets.Filtering.BinaryOperandSurface;
    import CriteriaOperatorSurface = DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface;
    import FunctionOperandSurface = DevExpress.Analytics.Widgets.Filtering.FunctionOperandSurface;
    import GroupOperandSurface = DevExpress.Analytics.Widgets.Filtering.GroupOperandSurface;
    import InOperandSurface = DevExpress.Analytics.Widgets.Filtering.InOperandSurface;
    import OperandParameterSurface = DevExpress.Analytics.Widgets.Filtering.OperandParameterSurface;
    import OperandPropertySurface = DevExpress.Analytics.Widgets.Filtering.OperandPropertySurface;
    import OperandValueSurface = DevExpress.Analytics.Widgets.Filtering.OperandValueSurface;
    import UnaryOperandSurface = DevExpress.Analytics.Widgets.Filtering.UnaryOperandSurface;
    import FilterEditorAddOn = DevExpress.Analytics.Widgets.Internal.FilterEditorAddOn;
    import FilterEditorSerializer = DevExpress.Analytics.Widgets.Internal.FilterEditorSerializer;
    import CriteriaSurfaceValidator = DevExpress.Analytics.Widgets.Internal.CriteriaSurfaceValidator;
    import FilterEditorHelper = DevExpress.Analytics.Widgets.FilterEditorHelper;
    import IFilterEditorOptions = DevExpress.Analytics.Widgets.IFilterEditorOptions;
    import IFilterEditorPlainOptions = DevExpress.Analytics.Widgets.IFilterEditorPlainOptions;
    import AdvancedModePosition = DevExpress.Analytics.Widgets.AdvancedModePosition;
    import FilterEditorCodeCompletor = DevExpress.Analytics.Widgets.Internal.FilterEditorCodeCompletor;
    import PopupEditorBase = DevExpress.Analytics.Widgets.Internal.PopupEditorBase;
    import IStandardPattern = DevExpress.Analytics.Widgets.Internal.IStandardPattern;
    import ILocalizationInfo = DevExpress.Analytics.Internal.ILocalizationInfo;
    export type BaseEditors = "bool" | "boolSelect" | "numeric" | "modificators" | "combobox" | "comboboxEditable" | "text" | "image" | "file" | "commonCollection" | "font" | "stringArray" | "guid" | "date" | "borders" | "textAlignment" | "objecteditorCustom" | "objecteditor" | "inplaceObjectEditor" | "field" | "dataMember" | "filterEditor" | "formatEditor" | "expressionEditor" | "customColorEditor" | "sbyte" | "decimal" | "int64" | "int32" | "int16" | "single" | "double" | "byte" | "uint16" | "uint32" | "uint64";
    export class EditorTemplates<T extends string> {
        private _useDeferredRegistration;
        private _editorTemplates;
        constructor(_useDeferredRegistration?: boolean);
        register(name: T, editorInfo: DevExpress.Analytics.Utils.IEditorInfo): void;
        unregister(name: T): void;
        registerEditors(editors: {
            [K in T]?: DevExpress.Analytics.Utils.IEditorInfo;
        }): void;
        getEditor(name: T): DevExpress.Analytics.Utils.IEditorInfo;
    }
    export const editorTemplates: EditorTemplates<BaseEditors>;
    export function addTemplate(templateName: string, templateMarkup: string): void;
    export function getTemplate(_id: string): string;
    export class EditorValidator extends Disposable {
        private _editor;
        private _lastValidatorOptions;
        private _lastModelOverridableRules;
        private _validatorInstance;
        private _onValidatedHandler;
        dispose(): void;
        constructor(_editor: DevExpress.Analytics.Widgets.Editor);
        _isValid(validationRules: any, newValue: any): {
            brokenRule?: any;
            isValid?: boolean;
            validationRules?: Array<any>;
            value?: any;
        };
        get validatorInstance(): any;
        set validatorInstance(newValue: any);
        get onValidatedHandler(): any;
        set onValidatedHandler(newValue: any);
        getValidationRules(): any;
        getValidatorOptions(templateValidatorOptions?: any): any;
        areRulesChanged(overridableRuleSet: Array<{
            type: string;
            message: any;
            validationCallback?: any;
        }>): number | boolean;
        wrapOnValidatorInitialized(options: any): void;
        _onValidatorInitialized(e: any): void;
        _concatValidationRules(validatorOptions: any, validationRules: any): any;
        _wrapValidatorEvents(validatorOptions: any): any;
        assignWithValidation(newValue: any, assignValueFunc: () => void): void;
    }
    export function createViewModel(this: DevExpress.Analytics.Widgets.Editor, viewModel: DevExpress.Analytics.Serializer.Native.IViewModel): DevExpress.Analytics.Widgets.IEditorViewModel;
    export interface ICollapsedViewModel {
        collapsed: boolean;
        setCollapsedChangedEvent: (callback: () => void) => () => void;
        setCollapsed: (newVal: boolean) => void;
        getCollapsed: () => boolean;
        alwaysShow?: boolean;
    }
    export interface IEditorViewModel<T = any> extends IViewModel, ICollapsedViewModel {
        getOptions(options: any): any;
        value: T;
        onValueChanged: (e: any) => void;
        disabled: boolean;
        displayName: string;
        description: string;
        editorDescriptionAddon: DevExpress.Analytics.Internal.IEditorAddon;
        editorTemplate: string;
        createEditorAddOn: (editor: DevExpress.Analytics.Widgets.IEditorViewModel<T>) => DevExpress.Analytics.Internal.IEditorAddon;
        createDescriptionAddOn: (editor: DevExpress.Analytics.Widgets.IEditorViewModel<T>) => DevExpress.Analytics.Internal.IEditorAddon;
        validationRules: any;
        getLocalization: typeof DevExpress.Analytics.Utils.getLocalization;
        getPopupContainer: typeof DevExpress.Analytics.Internal.getParentContainer;
        editorInputId: string;
        padding: any;
        values: any[];
        validatorOptions: any;
        getValidatorOptions: (validatorOptions: any, validationRules?: any) => any;
        onCustomItemCreating: (e: any) => void;
        level: number;
        info: DevExpress.Analytics.Utils.ISerializationInfo;
        templateName: string;
        editorOptions: any;
        extendedOptions: any;
        contentTemplateName: string;
        isPropertyHighlighted: boolean;
        isComplexEditor: boolean;
        headerId: string;
        contentId: string;
        textToSearch: string;
        isRequired: boolean;
        isPropertyModified: boolean;
        editorCreated: boolean;
        visible: boolean;
        setIsRendered: (val: boolean) => void;
    }
    export function unwrapEditor(editor: DevExpress.Analytics.Widgets.IEditorViewModel | DevExpress.Analytics.Widgets.Editor): DevExpress.Analytics.Widgets.Editor;
    export class Editor extends BaseRenderingMultiplatformModel<DevExpress.Analytics.Widgets.IEditorViewModel> {
        createViewModel(): DevExpress.Analytics.Widgets.IEditorViewModel;
        _setPadding(position: string, value: any): {};
        _model: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<IControlPropertiesViewModel>;
        _parent: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<Editor>;
        isSearchedProperty: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<boolean> | DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<boolean>;
        isParentSearched: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<boolean>;
        rtl: boolean;
        _accessibilityProvider: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<IPropertiesAccessibilityProvider>;
        _editorOptions: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<any>;
        private _validator;
        dispose(): void;
        constructor(modelPropertyInfo: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: any, textToSearch?: any, popupService?: DevExpress.Analytics.Internal.PopupService, popover?: DevExpress.Analytics.Utils.Native.Popover, engineType?: DevExpress.Analytics.Serializer.Native.EngineType);
        protected _shouldSkipHighlighting(propertyName: string): boolean;
        private _cachedValue;
        private _assignValue;
        private _roundTwoDesemialsForUnitProperties;
        private _init;
        private _getInfoFromModel;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        update(viewModel: DevExpress.Analytics.Internal.IControlPropertiesViewModel): void;
        getOptions(templateOptions: any): object;
        _getExtendedOptions(): object;
        getValidatorOptions(templateValidatorOptions: any): any;
        registerAccessibilityProvider(accessibilityProvider: DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider): void;
        assignParent(parent: DevExpress.Analytics.Widgets.Editor): void;
        _getEditorValidationRules(): any[];
        getValidationRules(): any;
        setIsRendered(val: boolean): void;
        get validationRules(): any;
        get fullDisplayName(): string;
        padding: any;
        level: any;
        textToSearch: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string> | DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<string>;
        info: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<ISerializationInfo>;
        name: string;
        displayName: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<string>;
        description: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<string>;
        editorDescriptionAddon: DevExpress.Analytics.Internal.IEditorAddon;
        templateName: string;
        contentTemplateName: string;
        editorTemplate: string;
        viewmodel: any;
        values: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<{
            displayValue: string;
            value: string;
        }[]>;
        value: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<any>;
        isEditorSelected: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<boolean>;
        isRequired: boolean;
        isPropertyModified: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<boolean>;
        isPropertyHighlighted: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<boolean>;
        disabled: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<boolean>;
        visible: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<boolean>;
        isRendered: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<boolean>;
        headerId: string;
        contentId: string;
        editorInputId: string;
        parentName: string;
        editorCreated: boolean;
        getPopupServiceActions(): DevExpress.Analytics.Internal.IModelAction[];
        get editorOptions(): any;
        validatorOptions: any;
        defaultValue: any;
        get isComplexEditor(): boolean;
        collapsed: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<boolean>;
        alwaysShow: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<boolean>;
        _isSearchedPropertySubscription: () => void;
    }
    export function createEditorDescriptionAddOn(editor: DevExpress.Analytics.Widgets.IEditorViewModel | DevExpress.Analytics.Widgets.Editor, popover: DevExpress.Analytics.Utils.Native.Popover): DevExpress.Analytics.Internal.IEditorAddon;
    export interface IObjectPropertiesViewModel extends IViewModel {
        editors: DevExpress.Analytics.Widgets.IEditorViewModel[];
        popover: DevExpress.Analytics.Utils.Native.IPopoverViewModel;
        rtl: boolean;
    }
    export class ObjectProperties extends BaseRenderingMultiplatformModel<IObjectPropertiesViewModel> {
        private recreateEditors;
        popover?: DevExpress.Analytics.Utils.Native.Popover;
        private _viewModelSubscription;
        private _infoSubscription;
        updateModel: (model: any) => void;
        _getInfoComputed: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<ISerializationInfoArray>;
        protected _accessibilityProvider: DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider;
        protected _parent: DevExpress.Analytics.Widgets.Editor;
        createViewModel(): IObjectPropertiesViewModel;
        update(viewModel: DevExpress.Analytics.Internal.IControlPropertiesViewModel): void;
        private _cleanEditorsSubscriptions;
        dispose(): void;
        cleanSubscriptions(): void;
        cleanEditors(): void;
        findEditorByInfo(serializationInfo: DevExpress.Analytics.Utils.ISerializationInfo): DevExpress.Analytics.Widgets.Editor;
        createEditor(modelPropertyInfo: DevExpress.Analytics.Utils.ISerializationInfo): any;
        createEditors(serializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray): any[];
        registerAccessibilityProvider(accessibilityProvider: DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider): void;
        assignParent(parent: DevExpress.Analytics.Widgets.Editor): void;
        private _createEditors;
        updateEditorsInfo(model: any, info: any): void;
        protected _update(viewModel: DevExpress.Analytics.Internal.IControlPropertiesViewModel, editorsInfo: any, recreateEditors: any): void;
        private _recreateEditors;
        constructor(viewModel: ko.Observable<any> | ko.Computed<any> | any, editorsInfo?: {
            editors?: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<ISerializationInfoArray> | ko.Observable<DevExpress.Analytics.Utils.ISerializationInfoArray> | ko.Computed<DevExpress.Analytics.Utils.ISerializationInfoArray>;
        }, level?: number, parentDisabled?: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<boolean>, recreateEditors?: boolean, textToSearch?: any, popupService?: DevExpress.Analytics.Internal.PopupService, popover?: DevExpress.Analytics.Utils.Native.Popover, engineType?: DevExpress.Analytics.Serializer.Native.EngineType);
        level: number;
        popupService: DevExpress.Analytics.Internal.PopupService;
        createEditorAddOn: (editor: DevExpress.Analytics.Widgets.Editor) => DevExpress.Analytics.Internal.IEditorAddon;
        createEditorDescriptionAddOn: (editor: DevExpress.Analytics.Widgets.Editor) => DevExpress.Analytics.Internal.IEditorAddon;
        rtl: boolean;
        getEditors(): DevExpress.Analytics.Unwrapped<this["_editors"]>;
        get editors(): DevExpress.Analytics.Unwrapped<this["_editors"]>;
        _textToSearch: any;
        visible: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<boolean>;
        _editors: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<Editor[]>;
        private _parentDisabled;
    }
    export interface IPropertyGridEditorViewModel extends IEditorViewModel {
        viewmodel: IObjectPropertiesViewModel;
    }
    export class PropertyGridEditor extends Editor {
        private _popupService?;
        private _popover?;
        createViewModel(): DevExpress.Analytics.Widgets.IEditorViewModel;
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: number, parentDisabled?: ko.Computed<boolean>, textToSearch?: any, _popupService?: DevExpress.Analytics.Internal.PopupService, _popover?: DevExpress.Analytics.Utils.Native.Popover, engineType?: DevExpress.Analytics.Serializer.Native.EngineType);
        createObjectProperties(): DevExpress.Analytics.Widgets.ObjectProperties;
        _editorInfo: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<ISerializationInfoArray>;
        registerAccessibilityProvider(accessibilityProvider: DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider): void;
        visibleByName: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<boolean>;
        viewmodel: DevExpress.Analytics.Widgets.ObjectProperties;
    }
    export class PropertyGridEditorFlat extends PropertyGridEditor {
        createObjectProperties(): DevExpress.Analytics.Widgets.ObjectProperties;
    }
    export class BooleanEditor extends Editor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any, popupService?: DevExpress.Analytics.Internal.PopupService, popover?: DevExpress.Analytics.Utils.Native.Popover, engineType?: DevExpress.Analytics.Serializer.Native.EngineType);
        private _checkBoxInitializedHandler;
        getOptions(templateOptions: any): any;
    }
    export interface IColorPickerEditorViewModel extends IEditorViewModel<string> {
        displayValue: string;
    }
    export class ColorPickerEditor extends Editor {
        createViewModel(): IColorPickerEditorViewModel;
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any, popupService?: DevExpress.Analytics.Internal.PopupService, popover?: DevExpress.Analytics.Utils.Native.Popover, engineType?: DevExpress.Analytics.Serializer.Native.EngineType);
        displayValue: DevExpress.Analytics.Serializer.Native.MultiPlatformComputed<string>;
    }
    export interface IFieldListEditorViewModel extends IEditorViewModel {
        path: string;
        getPath: () => string;
        getDataMember: () => string;
        treeListController: DevExpress.Analytics.Widgets.Internal.TreeListController;
    }
    export class FieldListEditor extends Editor {
        createViewModel(): DevExpress.Analytics.Widgets.IEditorViewModel;
        constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        path: ko.PureComputed<any>;
        treeListController: DevExpress.Analytics.Widgets.Internal.TreeListController;
    }
    export class DataMemberEditor extends FieldListEditor {
        constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        treeListController: DevExpress.Analytics.Widgets.Internal.DataMemberTreeListController;
    }
    export class GuidEditor extends Editor {
        _getEditorValidationRules(): any[];
    }
    export function registerDesignerEditors(): void;
    export type AccordionOptions = {
        collapsed: ko.Observable<boolean> | ko.Computed<boolean> | boolean;
        setCollapsedChangedEvent?: (callback: () => void) => () => void;
        setCollapsed?: (val: boolean) => void;
        getCollapsed?: () => boolean;
        timeout?: number;
        alwaysShow?: ko.Observable<boolean> | ko.Computed<boolean> | boolean;
    };
    export function InitAccordion(element: HTMLElement, options: DevExpress.Analytics.Widgets.AccordionOptions): () => void;
    export class FontEditor extends PropertyGridEditor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        createObjectProperties(): DevExpress.Analytics.Widgets.ObjectProperties;
    }
    export function registerBaseEditors(): void;
    export interface IExpressionOptions {
        value: ko.Observable<string> | ko.Computed<string>;
        path?: ko.Observable<string> | ko.Computed<string>;
        fieldName?: ko.Observable<string> | ko.Computed<string>;
        theme?: string;
        patchFieldName?: (fieldName: string) => string;
        functions?: Array<DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction>;
        rootItems?: Array<DevExpress.Analytics.Widgets.Internal.ICompletionRootItem>;
        customizeCategories?: (sender: any, categories: any, dblclick?: any) => void;
        validate?: (criteria: DevExpress.Analytics.Criteria.CriteriaOperator) => boolean;
        isValid?: ko.Observable<boolean> | ko.Computed<boolean>;
        warningMessage?: ko.Observable<string> | ko.Computed<string>;
        onHiding?: (e: any) => void;
        onShowing?: (e: any) => void;
        onContentReady?: (e: any) => void;
    }
    export function getNotValidRange(value: string, errorMessage: string): {
        start: number;
        end: number;
    };
    export class ExpressionEditor extends Disposable {
        private options;
        private _displayNameProvider?;
        popupVisible: ko.Observable<boolean>;
        dispose(): void;
        private _createMainPopupButtons;
        private _getTextArea;
        private _updateTextAreaValue;
        private _updateAceValue;
        private _updateValue;
        private patchFieldName;
        private _parametersPutSelectionHandler;
        private _fieldsPutSelectionHandler;
        private _createToolsOptions;
        private _parametersCustomFilter;
        constructor(options: IExpressionOptions, fieldListProvider: ko.Observable<DevExpress.Analytics.Utils.IItemsProvider> | ko.Computed<DevExpress.Analytics.Utils.IItemsProvider>, disabled?: ko.Observable<boolean> | ko.Computed<boolean>, rtl?: boolean, _displayNameProvider?: DevExpress.Analytics.Utils.IDisplayNameProvider, popupVisible?: ko.Observable<boolean>, editorInputId?: string);
        displayExpressionConverter: DevExpress.Analytics.Internal.DisplayExpressionConverter;
        aceAvailable: any;
        tools: DevExpress.Analytics.Widgets.Internal.Tools;
        displayValue: ko.Observable<string> | ko.Computed<string>;
        title: () => string;
        value: ko.Observable<string> | ko.Computed<string>;
        textAreaValue: ko.Observable<string>;
        theme: string;
        languageHelper: {
            getLanguageMode: () => string;
            createCompleters: (editor: DevExpress.Analytics.Widgets.Editor, bindingContext: ko.BindingContext, viewModel: ExpressionEditor) => DevExpress.Analytics.Widgets.Internal.CodeCompletor[];
        };
        aceOptions: {
            showLineNumbers: boolean;
            showPrintMargin: boolean;
            enableBasicAutocompletion: boolean;
            enableLiveAutocompletion: boolean;
            showFoldWidgets: boolean;
            highlightActiveLine: boolean;
        };
        additionalOptions: {
            onChange: (session: {
                clearAnnotations: () => void;
                getValue: () => string;
                setAnnotations: (any: any) => void;
            }) => void;
        };
        callbacks: {
            focus: () => undefined;
        };
        resizeHelper: DevExpress.Analytics.Widgets.Internal.ResizeHelper;
        koOptions: ko.Observable<IExpressionOptions> | ko.Computed<IExpressionOptions>;
        editorContainer: ko.Observable<any> | ko.Computed<any>;
        editorInputId: string;
        fieldListProvider: ko.Observable<DevExpress.Analytics.Utils.IItemsProvider> | ko.Computed<DevExpress.Analytics.Utils.IItemsProvider>;
        parametersTreeListController: DevExpress.Analytics.Widgets.Internal.ExpressionEditorParametersTreeListController;
        save: (sender: any) => void;
        isValid: ko.Observable<boolean> | ko.Computed<boolean>;
        buttonItems: any[];
        rtl: boolean;
        modelValueValid: ko.Computed<boolean>;
        modelValueWarning: ko.Computed<string>;
        disabled: ko.Observable<boolean> | ko.Computed<boolean>;
        onShown(): void;
        onHiding(e: {
            component: any;
            element: HTMLElement;
        }): void;
        onShowing(e: {
            component: any;
            element: HTMLElement;
        }): void;
        onContentReady(e: {
            component: any;
            element: HTMLElement;
        }): void;
        resizeAceEditor(): void;
        initDisplayValue(): void;
        getValue(): string;
        validate: (value: any, sender?: any) => boolean;
        getPopupContainer: typeof DevExpress.Analytics.Internal.getParentContainer;
    }
    /// <reference types="jquery" />
    export class FilterEditorHelper {
        get _allFilterEditorOperators(): Array<DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator>;
        _getFilterEditorOperator(item: DevExpress.Analytics.Criteria.CriteriaOperator, items: DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator[], reverse: boolean): DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator;
        private _initDisplayText;
        constructor(serializer?: DevExpress.Analytics.Widgets.Internal.FilterEditorSerializer);
        registrateOperator(specific: string, targetEnum: any, value: string, name: string, opreatorType?: string, reverse?: boolean, localizationId?: string): void;
        rtl: boolean;
        parameters: ko.Observable<any[]> | ko.Computed<any[]>;
        canSelectLists: boolean;
        canCreateParameters: boolean;
        canChoiceParameters: boolean;
        canChoiceProperty: boolean;
        serializer: DevExpress.Analytics.Widgets.Internal.FilterEditorSerializer;
        criteriaTreeValidator: DevExpress.Analytics.Widgets.Internal.CriteriaSurfaceValidator;
        filterEditorOperators: {
            _common: DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator[];
            string: DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator[];
            guid: DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator[];
            integer: DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator[];
            float: DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator[];
            date: DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator[];
            list: DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator[];
            group: DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator[];
            bool: DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator[];
        };
        onChange: () => void;
        onEditorFocusOut: (criteria: DevExpress.Analytics.Criteria.CriteriaOperator) => void;
        onSave: (criteria: string) => void;
        onClosing: () => void;
        handlers: {
            create: (criteria: any, popupService: any) => {
                data: DevExpress.Analytics.Widgets.Internal.FilterEditorAddOn;
                templateName: string;
            };
            change: (criteria: any, popupService: any) => {
                data: DevExpress.Analytics.Widgets.Internal.FilterEditorAddOn;
                templateName: string;
            };
            changeProperty: (criteria: any, popupService: any) => {
                data: DevExpress.Analytics.Widgets.Internal.FilterEditorAddOn;
                templateName: string;
            };
            changeValueType: (criteria: any, popupService: any) => {
                data: DevExpress.Analytics.Widgets.Internal.FilterEditorAddOn;
                templateName: string;
            };
            changeParameter: (criteria: any, popupService: any) => {
                data: DevExpress.Analytics.Widgets.Internal.FilterEditorAddOn;
                templateName: string;
            };
        };
        generateTreelistOptions(fieldListProvider: any, path: any): any;
        mapper: {
            aggregate: typeof DevExpress.Analytics.Widgets.Filtering.AggregateOperandSurface;
            property: typeof DevExpress.Analytics.Widgets.Filtering.OperandPropertySurface;
            parameter: typeof DevExpress.Analytics.Widgets.Filtering.OperandParameterSurface;
            value: typeof DevExpress.Analytics.Widgets.Filtering.OperandValueSurface;
            group: typeof DevExpress.Analytics.Widgets.Filtering.GroupOperandSurface;
            between: typeof DevExpress.Analytics.Widgets.Filtering.BetweenOperandSurface;
            binary: typeof DevExpress.Analytics.Widgets.Filtering.BinaryOperandSurface;
            function: typeof DevExpress.Analytics.Widgets.Filtering.FunctionOperandSurface;
            in: typeof DevExpress.Analytics.Widgets.Filtering.InOperandSurface;
            unary: typeof DevExpress.Analytics.Widgets.Filtering.UnaryOperandSurface;
            default: typeof DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface;
        };
        aceTheme: string;
        getDisplayPropertyName: (path: string, name: string) => JQueryPromise<string>;
    }
    export const DefaultFilterEditorHelper: DevExpress.Analytics.Internal.IGlobalSubscribableValue<any>;
    export function _setDefaultFilterEditorHelper(helperType: any | DevExpress.Analytics.Widgets.FilterEditorHelper): void;
    export interface IFilterEditorOptions {
        value: ko.Observable<string> | ko.Computed<string>;
        path: ko.Observable<string> | ko.Computed<string>;
        helper?: DevExpress.Analytics.Widgets.FilterEditorHelper;
        disabled?: ko.Observable<boolean> | ko.Computed<boolean>;
    }
    export type AdvancedModePosition = "TopRight" | "TopLeft" | "BottomRight" | "BottomLeft";
    export interface IFilterEditorPlainOptions extends IFilterEditorOptions {
        advancedModePosition: DevExpress.Analytics.Widgets.AdvancedModePosition;
        realTimeUpdate: boolean;
    }
    export class FilterStringOptions implements IFilterEditorOptions {
        private _title;
        constructor(filterString: ko.Observable<string> | ko.Computed<string>, dataMember?: ko.Observable | ko.Computed, disabled?: ko.Observable<boolean> | ko.Computed<boolean>, title?: {
            text: string;
            localizationId?: string;
        });
        popupContainer: string;
        itemsProvider: any;
        disabled: ko.Observable<boolean> | ko.Computed<boolean>;
        resetValue: () => void;
        helper: DevExpress.Analytics.Widgets.FilterEditorHelper;
        value: ko.Observable<string> | ko.Computed<string>;
        path: ko.Observable<string> | ko.Computed<string>;
        title: ko.PureComputed<string>;
    }
    export class FilterStringPlainOptions extends FilterStringOptions implements IFilterEditorPlainOptions {
        realTimeUpdate: boolean;
        advancedModePosition: DevExpress.Analytics.Widgets.AdvancedModePosition;
    }
    export {};
    export {};
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export interface IFilterEditorAddon {
        data: DevExpress.Analytics.Widgets.Internal.FilterEditorAddOn;
        templateName: string;
    }
    export interface IAdvancedState {
        value: ko.Observable<boolean> | ko.Computed<boolean>;
        animated: boolean;
    }
    export class FilterEditor extends PopupEditorBase {
        options: ko.Observable<DevExpress.Analytics.Widgets.IFilterEditorOptions> | ko.Computed<DevExpress.Analytics.Widgets.IFilterEditorOptions>;
        private _displayNameProvider?;
        private _advancedMode;
        private _generateOperand;
        private _generateSurface;
        private _validateValue;
        constructor(options: ko.Observable<DevExpress.Analytics.Widgets.IFilterEditorOptions> | ko.Computed<DevExpress.Analytics.Widgets.IFilterEditorOptions>, fieldListProvider: ko.Observable<DevExpress.Analytics.Utils.IItemsProvider> | ko.Computed<DevExpress.Analytics.Utils.IItemsProvider>, rtl?: boolean, _displayNameProvider?: DevExpress.Analytics.Utils.IDisplayNameProvider, editorInputId?: string);
        canSave(): boolean;
        initializeInnerValue(): void;
        change(type: any, surface: any): void;
        get helper(): DevExpress.Analytics.Widgets.FilterEditorHelper;
        get path(): ko.Observable<string> | ko.Computed<string>;
        displayValue: ko.Observable<string> | ko.Computed<string>;
        modelDisplayValue: ko.Observable<string> | ko.Computed<string>;
        disabled: ko.Observable<boolean> | ko.Computed<boolean>;
        editorInputId: string;
        dispose(): void;
        onInput(s: any, e: any): void;
        onFocus(): void;
        onBlur(): void;
        cacheElement($element: JQuery): void;
        updateCriteria(): void;
        onValueChange(value: any): void;
        focusText(): void;
        resizeAceEditor(): void;
        textFocused: ko.Observable<boolean>;
        aceAvailable: any;
        languageHelper: {
            getLanguageMode: () => string;
            createCompleters: (editor: any, bindingContext: any, viewModel: any) => DevExpress.Analytics.Widgets.Internal.FilterEditorCodeCompletor[];
        };
        aceOptions: {
            showLineNumbers: boolean;
            showPrintMargin: boolean;
            enableBasicAutocompletion: boolean;
            enableLiveAutocompletion: boolean;
            showGutter: boolean;
        };
        additionalOptions: {
            onChange: (session: any) => void;
            changeTimeout: number;
            onFocus: (_: any) => void;
            onBlur: (_: any) => void;
        };
        editorContainer: ko.Observable<any>;
        textVisible: ko.Observable<boolean>;
        getPopupContainer: (el: any) => any;
        timeout: any;
        animationTimeout: any;
        advancedMode: ko.Computed<boolean>;
        invalidMessage: () => any;
        advancedModeText: ko.Observable<any>;
        modelValueIsValid: ko.Computed<boolean>;
        isSurfaceValid: ko.Computed<boolean>;
        showText: ko.Observable<boolean> | ko.Computed<boolean>;
        displayExpressionConverter: DevExpress.Analytics.Internal.DisplayExpressionConverter;
        isValid: ko.Computed<boolean>;
        fieldListProvider: any;
        createAddButton: (criteria: any) => IFilterEditorAddon;
        createChangeType: (criteria: any) => IFilterEditorAddon;
        createChangeProperty: (criteria: any) => IFilterEditorAddon;
        createChangeParameter: (criteria: any) => IFilterEditorAddon;
        createChangeValueType: (criteria: any) => IFilterEditorAddon;
        operandSurface: ko.Observable<any>;
        operand: any;
        save: () => void;
        popupService: DevExpress.Analytics.Internal.PopupService;
        value: ko.Observable<string> | ko.Computed<string>;
        rtl: boolean;
        get cancelLocalization(): any;
        get saveLocalization(): any;
    }
    export class FilterEditorPlain extends FilterEditor {
        private element;
        constructor(element: Element, options: ko.Observable<DevExpress.Analytics.Widgets.IFilterEditorPlainOptions>, fieldListProvider: ko.Observable<DevExpress.Analytics.Utils.IItemsProvider>, rtl?: boolean, _displayNameProvider?: DevExpress.Analytics.Utils.IDisplayNameProvider);
        initializeInnerValue(): void;
        getCheckBoxStyles(): {};
        getContentStyles(): {
            pointerEvents: string;
        };
        getTextCssClasses(): {
            advanced: boolean;
            "dx-filtereditor-text-container-bottom": boolean;
            "dx-filtereditor-text-container-top": boolean;
        };
        advancedModeTop: () => boolean;
        advancedModeLeft: () => boolean;
        advancedModePosition: DevExpress.Analytics.Widgets.AdvancedModePosition;
    }
    /// <reference types="jquery" />
    export interface IPatternItem {
        name: string;
        canRemove: boolean;
    }
    export interface IFormatStringEditorActions {
        updatePreview?: (value: string, category: string, pattern: string) => JQueryPromise<_IFormatStringEditorPreviewResponse>;
        saveCustomPattern?: (category: string, pattern: string) => JQueryPromise<boolean>;
        removeCustomPattern?: (category: string, pattern: string) => JQueryPromise<boolean>;
    }
    export interface _IFormatStringEditorPreviewResponse {
        Result?: string;
        IsError?: boolean;
    }
    export class FormatStringEditor extends Disposable {
        private _standardPatternSource;
        private _customPatternSource;
        private _lastUpdatePreviewPromise;
        private _isDisabled;
        private _timeout;
        private okAction;
        private _createMainPopupButtons;
        private _convertArray;
        private _scrollToBottom;
        private _updateFormatList;
        private _updateSelection;
        private _setPreviewString;
        private _setErrorMessage;
        private _updatePreview;
        private _getGeneralPreview;
        private _wrapFormat;
        private _updateCanAddCustomFormat;
        private _initEditor;
        constructor(value: ko.Observable<string>, disabled?: ko.Observable<boolean>, defaultPatterns?: {
            [key: string]: DevExpress.Analytics.Widgets.Internal.IStandardPattern;
        }, customPatterns?: {
            [key: string]: Array<string>;
        }, actions?: IFormatStringEditorActions, rtl?: ko.Observable<boolean>, popupContainer?: string);
        updateInputText(propertyName: string, componentInstance: any): void;
        option(name: any, value?: any): any;
        updatePreview(value: string, category: string, pattern: string): JQueryPromise<_IFormatStringEditorPreviewResponse>;
        get customPatterns(): string[];
        get isGeneralType(): boolean;
        getDisplayText(key: any): any;
        getPopupContainer(el: any): any;
        currentType: ko.Observable<string>;
        setType: (e: {
            itemData: IPatternItem;
        }) => void;
        setFormat: (e: {
            itemData: IPatternItem;
        }) => void;
        types: Array<IPatternItem>;
        patternList: ko.ObservableArray<IPatternItem>;
        addCustomFormat: () => void;
        removeCustomFormat: (e: any) => void;
        canAddCustomFormat: ko.Observable<boolean>;
        formatPrefix: ko.Observable<string>;
        formatSuffix: ko.Observable<string>;
        previewString: ko.Observable<string>;
        formatResult: ko.Observable<string>;
        selectedFormats: ko.Observable<IPatternItem[]>;
        selectedTypes: ko.Observable<IPatternItem[]>;
        popupService: DevExpress.Analytics.Internal.PopupService;
        popupVisible: ko.Observable<boolean>;
        buttonItems: Array<any>;
        localizationIdMap: {
            [key: string]: DevExpress.Analytics.Internal.ILocalizationInfo;
        };
    }
    export {};
}
declare module DevExpress.Analytics.Elements.Metadata {
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    export const left: DevExpress.Analytics.Utils.ISerializationInfo, right: DevExpress.Analytics.Utils.ISerializationInfo, top: DevExpress.Analytics.Utils.ISerializationInfo, bottom: DevExpress.Analytics.Utils.ISerializationInfo, all: DevExpress.Analytics.Utils.ISerializationInfo;
    export const paddingSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfo[];
}
declare module DevExpress.Analytics.Elements {
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import IModelAction = DevExpress.Analytics.Internal.IModelAction;
    import IModelActionProvider = DevExpress.Analytics.Internal.IModelActionProvider;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import IModelSerializer = DevExpress.Analytics.Utils.IModelSerializer;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import ISelectionTarget = DevExpress.Analytics.Internal.ISelectionTarget;
    import ControlsFactory = DevExpress.Analytics.Utils.ControlsFactory;
    import BaseRenderingMultiplatformModel = DevExpress.Analytics.Serializer.Native.BaseRenderingMultiplatformModel;
    import IViewModel = DevExpress.Analytics.Serializer.Native.IViewModel;
    import MultiPlatformObservable = DevExpress.Analytics.Serializer.Native.MultiPlatformObservable;
    import IMargins = DevExpress.Analytics.Elements.IMargins;
    import ElementViewModel = DevExpress.Analytics.Elements.ElementViewModel;
    import IUnitProperties = DevExpress.Analytics.Internal.IUnitProperties;
    import CssCalculator = DevExpress.Analytics.Internal.CssCalculator;
    import IHoverInfo = DevExpress.Analytics.Internal.IHoverInfo;
    import Point = DevExpress.Analytics.Elements.Point;
    import MeasureUnit = DevExpress.Analytics.Internal.MeasureUnit;
    import IArea = DevExpress.Analytics.Elements.IArea;
    export interface IMargins {
        bottom: ko.Observable<number> | ko.Computed<number>;
        left: ko.Observable<number> | ko.Computed<number>;
        right: ko.Observable<number> | ko.Computed<number>;
        top: ko.Observable<number> | ko.Computed<number>;
    }
    export class Margins implements IMargins {
        static defaultVal: string;
        static unitProperties: string[];
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(left: any, right: any, top: any, bottom: number);
        isEmpty(): boolean;
        static fromString(value?: string): Margins;
        toString(): string;
        bottom: ko.Observable<number> | ko.Computed<number>;
        left: ko.Observable<number> | ko.Computed<number>;
        right: ko.Observable<number> | ko.Computed<number>;
        top: ko.Observable<number> | ko.Computed<number>;
    }
    export interface IArea {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
        width?: number;
        height?: number;
    }
    export interface IElementMetadata {
        info: DevExpress.Analytics.Utils.ISerializationInfoArray;
        surfaceType: any;
        type?: any;
        nonToolboxItem?: boolean;
        isToolboxItem?: boolean;
        toolboxIndex?: number;
        defaultVal?: {};
        group?: string;
        size?: string;
        isContainer?: boolean;
        isCopyDeny?: boolean;
        isPasteDeny?: boolean;
        isDeleteDeny?: boolean;
        popularProperties?: string[];
        canDrop?: (dropTarget: DevExpress.Analytics.Internal.ISelectionTarget, dragFrom?: DevExpress.Analytics.Elements.ElementViewModel) => boolean;
        elementActionsTypes?: any;
        parentType?: string;
        displayName?: string;
    }
    export interface IElementViewModel<T extends string = string> {
        controlType: T;
        name: ko.Observable<string> | ko.Computed<string>;
        parentModel: ko.Observable<IElementViewModel<T>>;
        addChild: (element: IElementViewModel<T>) => void;
        addChilds: (array: IElementViewModel<T>[]) => void;
        removeChild: (element: IElementViewModel<T>) => void;
        removeChilds: (array: IElementViewModel<T>[]) => void;
        getNearestParent: (dropTarget: IElementViewModel<T>) => IElementViewModel<T>;
    }
    export interface IControlPropertiesViewModel<T extends string = string> {
        isPropertyDisabled: (name: string) => boolean;
        isPropertyVisible: (name: string, isPopularProperty?: boolean) => boolean;
        isPropertyModified: (name: string) => boolean;
        controlType?: T;
        actions: DevExpress.Analytics.Internal.IModelAction[];
        actionProviders?: DevExpress.Analytics.Internal.IModelActionProvider[];
    }
    export class ElementViewModel<T extends string = string> extends Disposable implements IElementViewModel<T>, IControlPropertiesViewModel<T> {
        protected _resetProperty(propertyName: string): void;
        getPropertyDefaultValue(propertyName: string): any;
        getPropertyInfo(propertyName: string): DevExpress.Analytics.Utils.ISerializationInfo;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        createControl(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): any;
        dispose(): void;
        preInitProperties(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel<T>, serializer?: DevExpress.Analytics.Utils.IModelSerializer): void;
        constructor(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel<T>, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getNearestParent(target: IElementViewModel<T>): IElementViewModel<T>;
        getControlInfo(): {
            [key in string | T]?: IElementMetadata;
        }["Unknown" | T];
        getMetaData(): {
            isContainer: boolean;
            isCopyDeny: boolean;
            isDeleteDeny: boolean;
            canDrop: (dropTarget: DevExpress.Analytics.Internal.ISelectionTarget<string>, dragFrom?: DevExpress.Analytics.Elements.ElementViewModel<string>) => boolean;
            isPasteDeny: boolean;
        };
        _hasModifiedValue(name: any): any;
        name: ko.Observable<string> | ko.Computed<string>;
        controlType: T;
        createChild(info: {}): DevExpress.Analytics.Elements.ElementViewModel<T>;
        removeChilds(controls: DevExpress.Analytics.Elements.ElementViewModel<T>[]): void;
        addChilds(controls: DevExpress.Analytics.Elements.ElementViewModel<T>[]): void;
        removeChild(control: DevExpress.Analytics.Elements.ElementViewModel<T>): void;
        addChild(control: IElementViewModel<T>): void;
        isPropertyVisible(name: string): boolean;
        isPropertyDisabled(name: string): boolean;
        isPropertyModified(name: string): any;
        getControlFactory(): DevExpress.Analytics.Utils.ControlsFactory<T>;
        resetValue: (propertyName: string) => void;
        isResettableProperty(propertyName: string): boolean;
        surface: any;
        parentModel: ko.Observable<DevExpress.Analytics.Elements.ElementViewModel<T>>;
        _getRoot(): DevExpress.Analytics.Elements.ElementViewModel<T>;
        get root(): DevExpress.Analytics.Elements.ElementViewModel<T>;
        rtl(): boolean;
        onDelete(): void;
        actions: DevExpress.Analytics.Internal.IModelAction[];
        actionProviders: any[];
        update: ko.Observable<boolean>;
    }
    export function compareSizes(firstSize: INumericSize, secondSize: INumericSize): boolean;
    export interface INumericSize {
        width: number;
        height: number;
    }
    export class PaddingModel extends BaseRenderingMultiplatformModel<DevExpress.Analytics.Serializer.Native.IViewModel> {
        left: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>;
        right: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>;
        top: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>;
        bottom: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>;
        dpi: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>;
        static defaultVal: string;
        static unitProperties: string[];
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        resetValue(): void;
        isEmpty(): boolean;
        applyFromString(value: string): this;
        static from(val: any): PaddingModel;
        toString(): string;
        _toString(inner?: boolean): string;
        constructor(left?: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>, right?: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>, top?: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>, bottom?: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>, dpi?: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>);
        _isUpdating: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<boolean>;
        _left: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>;
        _top: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>;
        _right: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>;
        _bottom: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>;
        all: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<number>;
    }
    export interface IPoint {
        x: ko.Observable<number> | ko.Computed<number>;
        y: ko.Observable<number> | ko.Computed<number>;
    }
    export class Point implements IPoint {
        static unitProperties: string[];
        constructor(x: any, y: number);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        static fromString(value?: string): DevExpress.Analytics.Elements.Point;
        toString(): string;
        x: ko.Observable<number> | ko.Computed<number>;
        y: ko.Observable<number> | ko.Computed<number>;
    }
    export interface ISurfaceContext {
        measureUnit: ko.Observable<DevExpress.Analytics.Internal.MeasureUnit> | ko.Computed<DevExpress.Analytics.Internal.MeasureUnit>;
        pageWidth?: ko.Observable<number> | ko.Computed<number>;
        pageHeight?: ko.Observable<number> | ko.Computed<number>;
        snapGridSize?: ko.Observable<number> | ko.Computed<number>;
        margins?: DevExpress.Analytics.Elements.IMargins;
        zoom?: ko.Observable<number> | ko.Computed<number>;
        dpi?: ko.Observable<number> | ko.Computed<number>;
        isFit?: (dropTarget: DevExpress.Analytics.Internal.ISelectionTarget) => boolean;
        rtl?: ko.Observable<boolean> | ko.Computed<boolean>;
    }
    export class SurfaceElementArea<M extends DevExpress.Analytics.Elements.ElementViewModel<T>, T extends string = string> extends Disposable {
        _control: M;
        _width: ko.Observable<number> | ko.Computed<number>;
        _height: ko.Observable<number> | ko.Computed<number>;
        _x: ko.Observable<number> | ko.Computed<number>;
        _y: ko.Observable<number> | ko.Computed<number>;
        _context: ISurfaceContext;
        _createSurface: (item: DevExpress.Analytics.Elements.ElementViewModel) => any;
        private _container;
        private _getX;
        private _setX;
        getRoot(): ISurfaceContext;
        preInitProperties(control: M, context: ISurfaceContext, unitProperties: DevExpress.Analytics.Internal.IUnitProperties<M>): void;
        constructor(control: M, context: ISurfaceContext, unitProperties: DevExpress.Analytics.Internal.IUnitProperties<M>);
        rect: ko.Observable<DevExpress.Analytics.Elements.IArea> | ko.Computed<DevExpress.Analytics.Elements.IArea>;
        container(): SurfaceElementArea<DevExpress.Analytics.Elements.ElementViewModel>;
        beforeRectUpdated(rect: any): any;
        rtlLayout(): boolean;
        getControlModel(): M;
    }
    export class SurfaceElementBase<M extends DevExpress.Analytics.Elements.ElementViewModel<T>, T extends string = string> extends SurfaceElementArea<M> implements ISelectionTarget<T> {
        private _countSelectedChildren;
        context: ISurfaceContext;
        constructor(control: M, context: ISurfaceContext, unitProperties: DevExpress.Analytics.Internal.IUnitProperties<M>);
        focused: ko.Observable<boolean> | ko.Computed<boolean>;
        selected: ko.Observable<boolean> | ko.Computed<boolean>;
        isSelected: ko.Observable<boolean> | ko.Computed<boolean>;
        cssCalculator: DevExpress.Analytics.Internal.CssCalculator;
        underCursor: ko.Observable<DevExpress.Analytics.Internal.IHoverInfo> | ko.Computed<DevExpress.Analytics.Internal.IHoverInfo>;
        _getParent(): any;
        get parent(): any;
        checkParent(surfaceParent: DevExpress.Analytics.Internal.ISelectionTarget<T>): boolean;
        allowMultiselect: boolean;
        css: ko.Observable<any> | ko.Computed<any>;
        contentCss: ko.Observable<any> | ko.Computed<any>;
        _getChildrenHolderName(): string;
        getChildrenCollection(): ko.ObservableArray<any>;
        absolutePosition: DevExpress.Analytics.Elements.Point;
        updateAbsolutePosition(): void;
        canDrop(): boolean;
        afterUpdateAbsolutePosition(): void;
        findNextSelection(): DevExpress.Analytics.Internal.ISelectionTarget<T>;
        absoluteRect: ko.Computed<DevExpress.Analytics.Elements.IArea>;
        getUsefulRect: () => DevExpress.Analytics.Elements.IArea;
        locked: boolean;
    }
    export class Rectangle {
        constructor(left?: number, top?: number, width?: number, height?: number);
        left: ko.Observable<number>;
        top: ko.Observable<number>;
        width: ko.Observable<number>;
        height: ko.Observable<number>;
        className: string;
    }
    export interface ISize {
        width: ko.Observable<number> | ko.Computed<number>;
        height: ko.Observable<number> | ko.Computed<number>;
        isPropertyDisabled: (name: string) => void;
    }
    export class Size implements ISize {
        static unitProperties: string[];
        constructor(width: any, height: number);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        static fromString(value?: string): Size;
        toString(): string;
        isPropertyDisabled: (name: string) => any;
        isPropertyVisible: (name: string) => boolean;
        width: ko.Observable<number> | ko.Computed<number>;
        height: ko.Observable<number> | ko.Computed<number>;
    }
    export class SerializableModel extends Disposable {
        preInitProperties(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer, info?: DevExpress.Analytics.Utils.ISerializationInfoArray): void;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer, info?: DevExpress.Analytics.Utils.ISerializationInfoArray);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
}
declare module DevExpress.Analytics.Criteria {
    import CriteriaOperator = DevExpress.Analytics.Criteria.CriteriaOperator;
    import CriteriaProcessType = DevExpress.Analytics.Criteria.Utils.CriteriaProcessType;
    import ICriteriaChangeOperator = DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator;
    import UnaryOperatorType = DevExpress.Analytics.Criteria.UnaryOperatorType;
    import ICriteriaOperatorVisitor = DevExpress.Analytics.Criteria.Utils.ICriteriaOperatorVisitor;
    import BinaryOperatorType = DevExpress.Analytics.Criteria.BinaryOperatorType;
    import OperandValue = DevExpress.Analytics.Criteria.OperandValue;
    import FunctionOperatorType = DevExpress.Analytics.Criteria.FunctionOperatorType;
    import GroupOperatorType = DevExpress.Analytics.Criteria.GroupOperatorType;
    import OperandProperty = DevExpress.Analytics.Criteria.OperandProperty;
    import IPropertyLocation = DevExpress.Analytics.Criteria.Utils.IPropertyLocation;
    export enum UnaryOperatorType {
        Minus = 0,
        Plus = 1,
        BitwiseNot = 2,
        Not = 3,
        IsNull = 4
    }
    export interface IUnaryOperatorOptions {
        operatorType: DevExpress.Analytics.Criteria.UnaryOperatorType;
        operator: DevExpress.Analytics.Criteria.CriteriaOperator;
    }
    export interface IAggregateOperandOptions {
        property: DevExpress.Analytics.Criteria.CriteriaOperator;
        aggregatedExpression: DevExpress.Analytics.Criteria.CriteriaOperator[];
        aggregateType: string;
        condition: any;
    }
    export interface IBetweenOperatorOptions {
        property: DevExpress.Analytics.Criteria.CriteriaOperator;
        begin: DevExpress.Analytics.Criteria.CriteriaOperator;
        end: DevExpress.Analytics.Criteria.CriteriaOperator;
    }
    export enum BinaryOperatorType {
        Equal = 0,
        NotEqual = 1,
        Greater = 2,
        Less = 3,
        LessOrEqual = 4,
        GreaterOrEqual = 5,
        Like = 6,
        BitwiseAnd = 7,
        BitwiseOr = 8,
        BitwiseXor = 9,
        Divide = 10,
        Modulo = 11,
        Multiply = 12,
        Plus = 13,
        Minus = 14
    }
    export interface IBinaryOperatorOptions {
        left: DevExpress.Analytics.Criteria.CriteriaOperator;
        right: DevExpress.Analytics.Criteria.CriteriaOperator;
        operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType;
    }
    export enum FunctionOperatorType {
        None = 0,
        Custom = 1,
        CustomNonDeterministic = 2,
        Iif = 3,
        InRange = 4,
        IsNull = 5,
        IsNullOrEmpty = 6,
        Trim = 7,
        Len = 8,
        Substring = 9,
        Upper = 10,
        Lower = 11,
        Concat = 12,
        Ascii = 13,
        Char = 14,
        ToStr = 15,
        Replace = 16,
        Reverse = 17,
        Insert = 18,
        CharIndex = 19,
        Remove = 20,
        Abs = 21,
        Sqr = 22,
        Cos = 23,
        Sin = 24,
        Atn = 25,
        Exp = 26,
        Log = 27,
        Rnd = 28,
        Tan = 29,
        Power = 30,
        Sign = 31,
        Round = 32,
        Ceiling = 33,
        Floor = 34,
        Max = 35,
        Min = 36,
        Acos = 37,
        Asin = 38,
        Atn2 = 39,
        BigMul = 40,
        Cosh = 41,
        Log10 = 42,
        Sinh = 43,
        Tanh = 44,
        PadLeft = 45,
        PadRight = 46,
        StartsWith = 47,
        EndsWith = 48,
        Contains = 49,
        ToInt = 50,
        ToLong = 51,
        ToFloat = 52,
        ToDouble = 53,
        ToDecimal = 54,
        LocalDateTimeThisYear = 55,
        LocalDateTimeThisMonth = 56,
        LocalDateTimeLastWeek = 57,
        LocalDateTimeThisWeek = 58,
        LocalDateTimeYesterday = 59,
        LocalDateTimeToday = 60,
        LocalDateTimeNow = 61,
        LocalDateTimeTomorrow = 62,
        LocalDateTimeDayAfterTomorrow = 63,
        LocalDateTimeNextWeek = 64,
        LocalDateTimeTwoWeeksAway = 65,
        LocalDateTimeNextMonth = 66,
        LocalDateTimeNextYear = 67,
        InDateRange = 68,
        IsOutlookIntervalBeyondThisYear = 69,
        IsOutlookIntervalLaterThisYear = 70,
        IsOutlookIntervalLaterThisMonth = 71,
        IsOutlookIntervalNextWeek = 72,
        IsOutlookIntervalLaterThisWeek = 73,
        IsOutlookIntervalTomorrow = 74,
        IsOutlookIntervalToday = 75,
        IsOutlookIntervalYesterday = 76,
        IsOutlookIntervalEarlierThisWeek = 77,
        IsOutlookIntervalLastWeek = 78,
        IsOutlookIntervalEarlierThisMonth = 79,
        IsOutlookIntervalEarlierThisYear = 80,
        IsOutlookIntervalPriorThisYear = 81,
        IsLastMonth = 82,
        IsLastYear = 83,
        IsNextMonth = 84,
        IsNextYear = 85,
        IsThisWeek = 86,
        IsThisMonth = 87,
        IsThisYear = 88,
        IsJanuary = 89,
        IsFebruary = 90,
        IsMarch = 91,
        IsApril = 92,
        IsMay = 93,
        IsJune = 94,
        IsJuly = 95,
        IsAugust = 96,
        IsSeptember = 97,
        IsOctober = 98,
        IsNovember = 99,
        IsDecember = 100,
        IsSameDay = 101,
        IsYearToDate = 102,
        DateDiffTick = 103,
        DateDiffSecond = 104,
        DateDiffMilliSecond = 105,
        DateDiffMinute = 106,
        DateDiffHour = 107,
        DateDiffDay = 108,
        DateDiffMonth = 109,
        DateDiffYear = 110,
        DateTimeFromParts = 111,
        GetDate = 112,
        GetMilliSecond = 113,
        GetSecond = 114,
        GetMinute = 115,
        GetHour = 116,
        GetDay = 117,
        GetMonth = 118,
        GetYear = 119,
        GetDayOfWeek = 120,
        GetDayOfYear = 121,
        GetTimeOfDay = 122,
        Now = 123,
        UtcNow = 124,
        Today = 125,
        AddTimeSpan = 126,
        AddTicks = 127,
        AddMilliSeconds = 128,
        AddSeconds = 129,
        AddMinutes = 130,
        AddHours = 131,
        AddDays = 132,
        AddMonths = 133,
        AddYears = 134,
        OrderDescToken = 135
    }
    export interface IFunctionOperatorProperties {
        operatorType: DevExpress.Analytics.Criteria.FunctionOperatorType;
        operands: any[];
    }
    export enum GroupOperatorType {
        And = 0,
        Or = 1
    }
    export interface IGroupOperatorOptions {
        operation: DevExpress.Analytics.Criteria.GroupOperatorType;
        operands: Array<DevExpress.Analytics.Criteria.CriteriaOperator>;
    }
    export interface IInOperatorOptions {
        criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator;
        operands: any[];
    }
    export interface IJoinOperandOptions {
        joinTypeName: string;
        condition: DevExpress.Analytics.Criteria.CriteriaOperator;
        type: string;
        aggregated: DevExpress.Analytics.Criteria.CriteriaOperator;
    }
    export interface IOperandParameterOptions {
        parameterName?: string;
        value?: string;
    }
    export interface IOperandPropertyOptions {
        propertyName: string;
        startColumn: any;
        startLine: any;
        originalPropertyLength: any;
        circumflex: boolean;
    }
    export interface IOperandValueOptions {
        value: any;
        isSomeType?: boolean;
    }
    type CriteriaFactory = {
        [k in keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType]?: (options?: DevExpress.Analytics.Criteria.Utils.CriteriaProcessType[k]) => DevExpress.Analytics.Criteria.CriteriaOperator;
    };
    type CriteriaChangeFactory = {
        [k in keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType]?: (options?: DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator) => DevExpress.Analytics.Criteria.CriteriaOperator;
    };
    export class CriteriaOperatorPreprocessor {
        _factory: CriteriaFactory;
        _changeTypeFactory: CriteriaChangeFactory;
        _func: Array<(currentOperand: DevExpress.Analytics.Criteria.CriteriaOperator, options: {
            operatorType: string;
            options: any;
        }) => DevExpress.Analytics.Criteria.CriteriaOperator>;
        constructor();
        addListener(func: (currentOperand: DevExpress.Analytics.Criteria.CriteriaOperator, options: {
            operatorType: string;
            options: any;
        }) => DevExpress.Analytics.Criteria.CriteriaOperator): void;
        removeListener(func: (currentOperand: DevExpress.Analytics.Criteria.CriteriaOperator, options: {
            operatorType: string;
            options: any;
        }) => DevExpress.Analytics.Criteria.CriteriaOperator): void;
        register<K extends keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType>(operatorType: K, create: (options: DevExpress.Analytics.Criteria.Utils.CriteriaProcessType[K]) => DevExpress.Analytics.Criteria.CriteriaOperator, changeType?: (changeOperator: DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator) => DevExpress.Analytics.Criteria.CriteriaOperator): void;
        process<K extends keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType>(operatorType: K, options?: DevExpress.Analytics.Criteria.Utils.CriteriaProcessType[K]): DevExpress.Analytics.Criteria.CriteriaOperator;
        changeByType(value: DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator): DevExpress.Analytics.Criteria.CriteriaOperator;
    }
    export const criteriaCreator: CriteriaOperatorPreprocessor;
    export {};
    export class UnaryOperator extends CriteriaOperator {
        constructor(operatorType: DevExpress.Analytics.Criteria.UnaryOperatorType, operand: DevExpress.Analytics.Criteria.CriteriaOperator);
        get leftPart(): DevExpress.Analytics.Criteria.CriteriaOperator;
        operand: DevExpress.Analytics.Criteria.CriteriaOperator;
        operatorType: DevExpress.Analytics.Criteria.UnaryOperatorType;
        assignFrom(criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator): void;
        get displayType(): string;
        get enumType(): typeof DevExpress.Analytics.Criteria.UnaryOperatorType;
        type: keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType;
        accept(visitor: DevExpress.Analytics.Criteria.Utils.ICriteriaOperatorVisitor): any;
    }
    export class AggregateOperand extends CriteriaOperator {
        constructor(property: DevExpress.Analytics.Criteria.CriteriaOperator, aggregatedExpression: DevExpress.Analytics.Criteria.CriteriaOperator[], aggregateType: string, condition: DevExpress.Analytics.Criteria.CriteriaOperator);
        get displayType(): string;
        get enumType(): typeof AggregateOperand;
        get leftPart(): DevExpress.Analytics.Criteria.CriteriaOperator;
        children(): DevExpress.Analytics.Criteria.CriteriaOperator[];
        change: (operationType: any, item: DevExpress.Analytics.Criteria.CriteriaOperator) => DevExpress.Analytics.Criteria.CriteriaOperator;
        assignLeftPart: (criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator) => void;
        accept(visitor: DevExpress.Analytics.Criteria.Utils.ICriteriaOperatorVisitor): DevExpress.Analytics.Criteria.CriteriaOperator;
        property: DevExpress.Analytics.Criteria.CriteriaOperator;
        condition: DevExpress.Analytics.Criteria.CriteriaOperator;
        operatorType: string;
        aggregatedExpression: DevExpress.Analytics.Criteria.CriteriaOperator;
        customAggregatedExpression: DevExpress.Analytics.Criteria.CriteriaOperator[];
        type: keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType;
    }
    export class BetweenOperator extends CriteriaOperator {
        constructor(property: DevExpress.Analytics.Criteria.CriteriaOperator, begin: DevExpress.Analytics.Criteria.CriteriaOperator, end: DevExpress.Analytics.Criteria.CriteriaOperator);
        property: DevExpress.Analytics.Criteria.CriteriaOperator;
        begin: DevExpress.Analytics.Criteria.CriteriaOperator;
        end: DevExpress.Analytics.Criteria.CriteriaOperator;
        get leftPart(): DevExpress.Analytics.Criteria.CriteriaOperator;
        get rightPart(): DevExpress.Analytics.Criteria.CriteriaOperator[];
        assignLeftPart: (criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator) => void;
        assignRightPart: (criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator) => void;
        get displayType(): string;
        operatorType: string;
        get enumType(): typeof BetweenOperator;
        type: keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType;
        accept(visitor: DevExpress.Analytics.Criteria.Utils.ICriteriaOperatorVisitor): any;
    }
    export class BinaryOperator extends CriteriaOperator {
        constructor(left: DevExpress.Analytics.Criteria.CriteriaOperator, right: DevExpress.Analytics.Criteria.CriteriaOperator, operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType);
        get leftPart(): DevExpress.Analytics.Criteria.CriteriaOperator;
        get rightPart(): DevExpress.Analytics.Criteria.CriteriaOperator;
        assignLeftPart: (criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator) => void;
        assignRightPart: (criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator) => void;
        leftOperand: DevExpress.Analytics.Criteria.CriteriaOperator;
        rightOperand: DevExpress.Analytics.Criteria.CriteriaOperator;
        operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType;
        get displayType(): string;
        get enumType(): typeof DevExpress.Analytics.Criteria.BinaryOperatorType;
        type: keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType;
        accept(visitor: DevExpress.Analytics.Criteria.Utils.ICriteriaOperatorVisitor): any;
    }
    export class ConstantValue extends OperandValue {
        constructor(value: any, specifics?: string);
        type: keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType;
        accept(visitor: DevExpress.Analytics.Criteria.Utils.ICriteriaOperatorVisitor): DevExpress.Analytics.Criteria.CriteriaOperator;
    }
    export class FunctionOperator extends CriteriaOperator {
        constructor(operatorType: DevExpress.Analytics.Criteria.FunctionOperatorType, operands: DevExpress.Analytics.Criteria.CriteriaOperator[]);
        toString: (reverse: boolean) => string;
        operatorType: DevExpress.Analytics.Criteria.FunctionOperatorType;
        assignLeftPart: (criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator) => void;
        assignRightPart: (criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator) => void;
        get leftPart(): DevExpress.Analytics.Criteria.CriteriaOperator;
        get rightPart(): DevExpress.Analytics.Criteria.CriteriaOperator[];
        get displayType(): string;
        get enumType(): typeof DevExpress.Analytics.Criteria.FunctionOperatorType;
        operands: any[];
        type: keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType;
        accept(visitor: DevExpress.Analytics.Criteria.Utils.ICriteriaOperatorVisitor): any;
    }
    export class GroupOperator extends CriteriaOperator {
        constructor(operation: DevExpress.Analytics.Criteria.GroupOperatorType, operands: Array<DevExpress.Analytics.Criteria.CriteriaOperator>);
        static combine(operation: DevExpress.Analytics.Criteria.GroupOperatorType, operands: Array<DevExpress.Analytics.Criteria.CriteriaOperator>): DevExpress.Analytics.Criteria.CriteriaOperator;
        create: (isGroup: boolean, property: DevExpress.Analytics.Criteria.CriteriaOperator, specifics?: string) => DevExpress.Analytics.Criteria.CriteriaOperator;
        change: (operationType: any, item: any, incorrectSpecificsForAggregate?: boolean) => DevExpress.Analytics.Criteria.CriteriaOperator;
        remove: (operator: DevExpress.Analytics.Criteria.CriteriaOperator) => void;
        operatorType: DevExpress.Analytics.Criteria.GroupOperatorType;
        assignLeftPart: (operator: DevExpress.Analytics.Criteria.CriteriaOperator) => void;
        children(): DevExpress.Analytics.Criteria.CriteriaOperator[];
        get displayType(): string;
        get enumType(): typeof DevExpress.Analytics.Criteria.GroupOperatorType;
        operands: any[];
        type: keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType;
        accept(visitor: DevExpress.Analytics.Criteria.Utils.ICriteriaOperatorVisitor): DevExpress.Analytics.Criteria.CriteriaOperator | GroupOperator;
    }
    export class InOperator extends CriteriaOperator {
        constructor(criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator, operands: DevExpress.Analytics.Criteria.CriteriaOperator[]);
        get leftPart(): DevExpress.Analytics.Criteria.CriteriaOperator;
        get rightPart(): DevExpress.Analytics.Criteria.CriteriaOperator[];
        assignLeftPart: (criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator) => void;
        assignRightPart: (criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator) => void;
        criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator;
        get displayType(): string;
        operatorType: string;
        get enumType(): typeof InOperator;
        type: keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType;
        operands: any[];
        accept(visitor: DevExpress.Analytics.Criteria.Utils.ICriteriaOperatorVisitor): any;
    }
    export class OperandProperty extends CriteriaOperator {
        constructor(propertyName?: string, startColumn?: number, startLine?: number, originalPropertyLength?: number, circumflex?: boolean);
        get displayType(): string;
        propertyName: string;
        originalPropertyLength: number;
        type: keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType;
        circumflex: boolean;
        startPosition: {
            line: number;
            column: number;
        };
        accept(visitor: DevExpress.Analytics.Criteria.Utils.ICriteriaOperatorVisitor): DevExpress.Analytics.Criteria.CriteriaOperator;
    }
    export class JoinOperand extends CriteriaOperator {
        constructor(joinTypeName: string, condition: DevExpress.Analytics.Criteria.CriteriaOperator, type: string, aggregated: DevExpress.Analytics.Criteria.CriteriaOperator);
        static joinOrAggregate(collectionProperty: DevExpress.Analytics.Criteria.OperandProperty, condition: DevExpress.Analytics.Criteria.CriteriaOperator, type: string, aggregated: DevExpress.Analytics.Criteria.CriteriaOperator[]): DevExpress.Analytics.Criteria.CriteriaOperator;
        joinTypeName: string;
        condition: DevExpress.Analytics.Criteria.CriteriaOperator;
        operatorType: string;
        aggregatedExpression: DevExpress.Analytics.Criteria.CriteriaOperator;
        type: keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType;
        accept(visitor: DevExpress.Analytics.Criteria.Utils.ICriteriaOperatorVisitor): any;
    }
    export class CriteriaOperator {
        get displayType(): string;
        get enumType(): any;
        operatorType: any;
        type: keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType | string;
        operands: any;
        create: (operatorType: any, field: DevExpress.Analytics.Criteria.CriteriaOperator) => DevExpress.Analytics.Criteria.CriteriaOperator;
        remove: (operand: DevExpress.Analytics.Criteria.CriteriaOperator) => void;
        change: (operandType: any, operand: DevExpress.Analytics.Criteria.CriteriaOperator, incorrectSpecificsForAggregate: boolean) => DevExpress.Analytics.Criteria.CriteriaOperator;
        changeValue: (operand: DevExpress.Analytics.Criteria.CriteriaOperator, reverse: boolean, location: DevExpress.Analytics.Criteria.Utils.IPropertyLocation) => DevExpress.Analytics.Criteria.CriteriaOperator;
        changeValueType: (type: any, location: DevExpress.Analytics.Criteria.Utils.IPropertyLocation) => DevExpress.Analytics.Criteria.CriteriaOperator;
        assignLeftPart: (criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator | DevExpress.Analytics.Criteria.CriteriaOperator[]) => void;
        assignRightPart: (criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator | DevExpress.Analytics.Criteria.CriteriaOperator[]) => void;
        assignType: (type: string) => void;
        get leftPart(): DevExpress.Analytics.Criteria.CriteriaOperator | DevExpress.Analytics.Criteria.CriteriaOperator[];
        get rightPart(): DevExpress.Analytics.Criteria.CriteriaOperator | DevExpress.Analytics.Criteria.CriteriaOperator[];
        assignFrom(criteriaOperator: DevExpress.Analytics.Criteria.CriteriaOperator, incorrectSpecificsForAggregate?: boolean, needAssignRightPart?: boolean): void;
        children(): DevExpress.Analytics.Criteria.CriteriaOperator[];
        accept(visitor: DevExpress.Analytics.Criteria.Utils.ICriteriaOperatorVisitor): DevExpress.Analytics.Criteria.CriteriaOperator;
    }
    export class OperandValue extends CriteriaOperator {
        private _processStringValue;
        constructor(value?: any, isSomeType?: boolean);
        get displayType(): string;
        accept(visitor: DevExpress.Analytics.Criteria.Utils.ICriteriaOperatorVisitor): DevExpress.Analytics.Criteria.CriteriaOperator;
        value: any;
        type: keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType;
        specifics: string;
    }
    export class OperandParameter extends OperandValue {
        constructor(parameterName?: string, value?: string);
        get displayType(): string;
        parameterName: string;
        type: keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType;
        accept(visitor: DevExpress.Analytics.Criteria.Utils.ICriteriaOperatorVisitor): any;
    }
    export function parse(criteria: string): any;
    export const criteriaparser: {
        parse: (criteria: string) => any;
    };
}
declare module DevExpress.Analytics.Criteria.Utils {
    import IAggregateOperandOptions = DevExpress.Analytics.Criteria.IAggregateOperandOptions;
    import IBetweenOperatorOptions = DevExpress.Analytics.Criteria.IBetweenOperatorOptions;
    import IBinaryOperatorOptions = DevExpress.Analytics.Criteria.IBinaryOperatorOptions;
    import IFunctionOperatorProperties = DevExpress.Analytics.Criteria.IFunctionOperatorProperties;
    import IGroupOperatorOptions = DevExpress.Analytics.Criteria.IGroupOperatorOptions;
    import IInOperatorOptions = DevExpress.Analytics.Criteria.IInOperatorOptions;
    import IJoinOperandOptions = DevExpress.Analytics.Criteria.IJoinOperandOptions;
    import IOperandParameterOptions = DevExpress.Analytics.Criteria.IOperandParameterOptions;
    import IOperandPropertyOptions = DevExpress.Analytics.Criteria.IOperandPropertyOptions;
    import IUnaryOperatorOptions = DevExpress.Analytics.Criteria.IUnaryOperatorOptions;
    import IOperandValueOptions = DevExpress.Analytics.Criteria.IOperandValueOptions;
    import CriteriaProcessType = DevExpress.Analytics.Criteria.Utils.CriteriaProcessType;
    import AggregateOperand = DevExpress.Analytics.Criteria.AggregateOperand;
    import BetweenOperator = DevExpress.Analytics.Criteria.BetweenOperator;
    import BinaryOperator = DevExpress.Analytics.Criteria.BinaryOperator;
    import ConstantValue = DevExpress.Analytics.Criteria.ConstantValue;
    import CriteriaOperator = DevExpress.Analytics.Criteria.CriteriaOperator;
    import FunctionOperator = DevExpress.Analytics.Criteria.FunctionOperator;
    import GroupOperator = DevExpress.Analytics.Criteria.GroupOperator;
    import InOperator = DevExpress.Analytics.Criteria.InOperator;
    import JoinOperand = DevExpress.Analytics.Criteria.JoinOperand;
    import OperandParameter = DevExpress.Analytics.Criteria.OperandParameter;
    import OperandProperty = DevExpress.Analytics.Criteria.OperandProperty;
    import UnaryOperator = DevExpress.Analytics.Criteria.UnaryOperator;
    import OperandValue = DevExpress.Analytics.Criteria.OperandValue;
    export type CriteriaProcessType = {
        "join": Partial<DevExpress.Analytics.Criteria.IJoinOperandOptions>;
        "between": Partial<DevExpress.Analytics.Criteria.IBetweenOperatorOptions>;
        "property": Partial<DevExpress.Analytics.Criteria.IOperandPropertyOptions>;
        "parameter": Partial<DevExpress.Analytics.Criteria.IOperandParameterOptions>;
        "value": Partial<DevExpress.Analytics.Criteria.IOperandValueOptions>;
        "in": Partial<DevExpress.Analytics.Criteria.IInOperatorOptions>;
        "function": Partial<DevExpress.Analytics.Criteria.IFunctionOperatorProperties>;
        "unary": Partial<DevExpress.Analytics.Criteria.IUnaryOperatorOptions>;
        "group": Partial<DevExpress.Analytics.Criteria.IGroupOperatorOptions>;
        "binary": Partial<DevExpress.Analytics.Criteria.IBinaryOperatorOptions>;
        "const": Partial<DevExpress.Analytics.Criteria.IOperandValueOptions>;
        "aggregate": Partial<DevExpress.Analytics.Criteria.IAggregateOperandOptions>;
        "default": any;
    };
    export interface ICriteriaChangeOperator {
        name: string;
        value: any;
        type: any;
        _type: keyof DevExpress.Analytics.Criteria.Utils.CriteriaProcessType;
        hidden?: boolean;
        reverse?: boolean;
        localizationId?: string;
        insertVal?: string;
        displayText?: string;
        paramCount?: number;
        emptyRightPart?: boolean;
    }
    export const operatorTokens: {
        Plus: string;
        Minus: string;
        Equal: string;
        NotEqual: string;
        Greater: string;
        Less: string;
        LessOrEqual: string;
        GreaterOrEqual: string;
        Divide: string;
        BitwiseAnd: string;
        BitwiseOr: string;
        BitwiseXor: string;
        Modulo: string;
        Multiply: string;
    };
    export interface ICriteriaOperatorVisitor {
        visitGroupOperator?: (element: DevExpress.Analytics.Criteria.GroupOperator) => DevExpress.Analytics.Criteria.CriteriaOperator;
        visitOperandProperty?: (element: DevExpress.Analytics.Criteria.OperandProperty) => DevExpress.Analytics.Criteria.CriteriaOperator;
        visitConstantValue?: (element: DevExpress.Analytics.Criteria.ConstantValue) => DevExpress.Analytics.Criteria.CriteriaOperator;
        visitOperandParameter?: (element: DevExpress.Analytics.Criteria.OperandParameter) => DevExpress.Analytics.Criteria.CriteriaOperator;
        visitOperandValue?: (element: DevExpress.Analytics.Criteria.OperandValue) => DevExpress.Analytics.Criteria.CriteriaOperator;
        visitAggregateOperand?: (element: DevExpress.Analytics.Criteria.AggregateOperand) => DevExpress.Analytics.Criteria.CriteriaOperator;
        visitJoinOperand?: (element: DevExpress.Analytics.Criteria.JoinOperand) => DevExpress.Analytics.Criteria.CriteriaOperator;
        visitBetweenOperator?: (element: DevExpress.Analytics.Criteria.BetweenOperator) => DevExpress.Analytics.Criteria.CriteriaOperator;
        visitInOperator?: (element: DevExpress.Analytics.Criteria.InOperator) => DevExpress.Analytics.Criteria.CriteriaOperator;
        visitBinaryOperator?: (element: DevExpress.Analytics.Criteria.BinaryOperator) => DevExpress.Analytics.Criteria.CriteriaOperator;
        visitUnaryOperator?: (element: DevExpress.Analytics.Criteria.UnaryOperator) => DevExpress.Analytics.Criteria.CriteriaOperator;
        visitFunctionOperator?: (element: DevExpress.Analytics.Criteria.FunctionOperator) => DevExpress.Analytics.Criteria.CriteriaOperator;
    }
    export interface IPropertyLocation {
        index?: number;
        name?: string;
    }
    export function criteriaForEach(operator: DevExpress.Analytics.Criteria.CriteriaOperator, callback: (operator: DevExpress.Analytics.Criteria.CriteriaOperator, path?: any) => void, path?: string): void;
    export interface _IToken {
        type: string;
        val?: string;
        start: number;
        end: number;
    }
    export class MachineState {
        private tokenName;
        private alphabet;
        private startTerm;
        private endTerm;
        private tokenLength;
        isActiveState: boolean;
        tokens: _IToken[];
        constructor(tokenName: "comment" | "field" | "value", alphabet: string, startTerm: string, endTerm: string);
        private _isSubline;
        private _getToken;
        processTransitionFunction(pos: number): number;
    }
    export class CriteriaOperatorStateMachine {
        private stringCriteria;
        static parse(stringCriteria: string, saveOriginalStringLength?: boolean): DevExpress.Analytics.Criteria.CriteriaOperator;
        private machineStates;
        private _inputStringCriteria;
        constructor(stringCriteria: string);
        _tokenize(): _IToken[];
        _replaceTokenToAnotherToken(tokens: _IToken[], newTokenChar: string, tokenName: string): string;
        replaceCommentsToChar(char?: string): CriteriaOperatorStateMachine;
        getCriteria(): DevExpress.Analytics.Criteria.CriteriaOperator;
    }
}
declare module DevExpress.Analytics {
    export const version = "%VERSION%";
}
declare module DevExpress.Analytics.Tools {
    export const ActionId: {
        Cut: string;
        Copy: string;
        Paste: string;
        Delete: string;
        Undo: string;
        Redo: string;
        ZoomOut: string;
        ZoomSelector: string;
        ZoomIn: string;
    };
}
declare module DevExpress.Analytics.Utils.Native {
    import BaseRenderingModel = DevExpress.Analytics.Serializer.Native.BaseRenderingModel;
    import IViewModel = DevExpress.Analytics.Serializer.Native.IViewModel;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import getParentContainer = DevExpress.Analytics.Internal.getParentContainer;
    export interface IPopoverViewModel extends IViewModel {
        data: string;
        target: HTMLElement;
        visible: boolean;
        onHiding: () => void;
        getPopupContainer: typeof DevExpress.Analytics.Internal.getParentContainer;
    }
    export class Popover extends BaseRenderingModel<IPopoverViewModel> {
        createViewModel(): IPopoverViewModel;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        onHiding(): void;
        visible: boolean;
        target: HTMLElement;
        data: string;
        getPopupContainer: typeof DevExpress.Analytics.Internal.getParentContainer;
    }
}
declare module DevExpress.Analytics.Widgets.Native {
    export function registerNativeDesignerEditors(): void;
    export function registerBaseEditorsNative(): void;
}
declare module DevExpress.Analytics.Localization {
    export function loadMessages(messages: {
        [key: string]: string;
    }): void;
}
declare module DevExpress.Analytics.Widgets.Metadata {
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const fontName: DevExpress.Analytics.Utils.ISerializationInfo;
    export const fontSize: DevExpress.Analytics.Utils.ISerializationInfo;
    export const fontSizeUnit: DevExpress.Analytics.Utils.ISerializationInfo;
    export const fontInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
}
declare module DevExpress.Analytics.Data {
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import ISerializableModel = DevExpress.Analytics.Utils.ISerializableModel;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import IModelSerializer = DevExpress.Analytics.Utils.IModelSerializer;
    import DBColumn = DevExpress.Analytics.Data.DBColumn;
    import DBForeignKey = DevExpress.Analytics.Data.DBForeignKey;
    import DBColumnType = DevExpress.Analytics.Data.DBColumnType;
    import DBTable = DevExpress.Analytics.Data.DBTable;
    import DBStoredProcedure = DevExpress.Analytics.Data.DBStoredProcedure;
    import ConnectionOptions = DevExpress.Analytics.Data.ConnectionOptions;
    import ResultTable = DevExpress.Analytics.Data.ResultTable;
    import ISqlQueryViewModel = DevExpress.QueryBuilder.Utils.ISqlQueryViewModel;
    import SqlDataSource = DevExpress.Analytics.Data.SqlDataSource;
    import DataSourceParameter = DevExpress.Analytics.Data.DataSourceParameter;
    import SqlDataConnection = DevExpress.Analytics.Data.SqlDataConnection;
    import ResultSet = DevExpress.Analytics.Data.ResultSet;
    import RequestWrapper = DevExpress.QueryBuilder.Utils.RequestWrapper;
    import MasterDetailRelation = DevExpress.Analytics.Data.MasterDetailRelation;
    import DBSchemaProvider = DevExpress.Analytics.Data.DBSchemaProvider;
    import IDBSchemaProvider = DevExpress.Analytics.Data.IDBSchemaProvider;
    import IPathRequest = DevExpress.Analytics.Utils.IPathRequest;
    import IFederationQuery = DevExpress.QueryBuilder.Utils.IFederationQuery;
    import FederatedQueryExpression = DevExpress.Analytics.Data.FederatedQueryExpression;
    import SourceQuery = DevExpress.Analytics.Data.SourceQuery;
    import FederationSource = DevExpress.Analytics.Data.FederationSource;
    import QueryViewModelBase = DevExpress.QueryBuilder.Elements.QueryViewModelBase;
    import RelationViewModel = DevExpress.QueryBuilder.Elements.RelationViewModel;
    import FederationTableViewModel = DevExpress.QueryBuilder.Internal.FederationTableViewModel;
    import SubNode = DevExpress.Analytics.Data.SubNode;
    import IDataSourceInfo = DevExpress.Analytics.Internal.IDataSourceInfo;
    import SelectQuery = DevExpress.Analytics.Data.SelectQuery;
    import FederatedQueriesContainer = DevExpress.Analytics.Data.FederatedQueriesContainer;
    import IFederationDataSource = DevExpress.Analytics.Data.IFederationDataSource;
    import IItemsProvider = DevExpress.Analytics.Utils.IItemsProvider;
    import IDataSourceBase = DevExpress.Analytics.Data.IDataSourceBase;
    import IDataSourceDBSchema = DevExpress.Analytics.Data.IDataSourceDBSchema;
    import FederationMasterDetailRelation = DevExpress.Analytics.Data.FederationMasterDetailRelation;
    import SerializableDataFederationDataSource = DevExpress.Analytics.Data.SerializableDataFederationDataSource;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    import IObjectDataSourceWizardState = DevExpress.Analytics.Wizard.IObjectDataSourceWizardState;
    import ObjectCtor = DevExpress.Analytics.Data.ObjectCtor;
    import ObjectDataMember = DevExpress.Analytics.Data.ObjectDataMember;
    import IExpressionOptions = DevExpress.Analytics.Widgets.IExpressionOptions;
    import JsonSchemaRootNode = DevExpress.Analytics.Data.JsonSchemaRootNode;
    import JsonSchemaNode = DevExpress.Analytics.Data.JsonSchemaNode;
    import JsonNode = DevExpress.Analytics.Data.JsonNode;
    import JsonDataSource = DevExpress.Analytics.Data.JsonDataSource;
    import IParameter = DevExpress.Analytics.Wizard.Internal.IParameter;
    import JsonParameter = DevExpress.Analytics.Data.JsonParameter;
    import JsonAuthenticationInfo = DevExpress.Analytics.Data.JsonAuthenticationInfo;
    import JsonSchemaProvider = DevExpress.Analytics.Data.JsonSchemaProvider;
    import JsonSource = DevExpress.Analytics.Data.JsonSource;
    import DBSchema = DevExpress.Analytics.Data.DBSchema;
    export enum DBColumnType {
        Unknown = 0,
        Boolean = 1,
        Byte = 2,
        SByte = 3,
        Char = 4,
        Decimal = 5,
        Double = 6,
        Single = 7,
        Int32 = 8,
        UInt32 = 9,
        Int16 = 10,
        UInt16 = 11,
        Int64 = 12,
        UInt64 = 13,
        String = 14,
        DateTime = 15,
        Guid = 16,
        TimeSpan = 17,
        ByteArray = 18
    }
    export class DBColumn {
        name: string;
        type: DevExpress.Analytics.Data.DBColumnType;
        size: string;
        constructor(model: any);
        static GetType(dbColumnType: DevExpress.Analytics.Data.DBColumnType): "System.String" | "System.Guid" | "System.SByte" | "System.Decimal" | "System.Int64" | "System.Int32" | "System.Int16" | "System.Single" | "System.Double" | "System.Byte" | "System.UInt16" | "System.UInt32" | "System.UInt64" | "System.Boolean" | "System.DateTime" | "System.Char" | "System.TimeSpan" | "System.Byte[]" | "System.Object";
        static GetSpecific(type: string): "String" | "Date" | "Bool" | "Integer" | "Float";
    }
    export class DataSourceParameter extends Disposable implements ISerializableModel {
        private _serializationsInfo;
        private _name;
        static _typeValues: any[];
        static _getTypeValue(typeName: string, resultType?: string): any;
        private _getTypeValue;
        private _tryConvertValue;
        private static _isValueValid;
        getEditorType(type: any): {
            header?: any;
            content?: any;
            custom?: any;
        };
        private _updateValueInfo;
        private _valueInfo;
        private _value;
        private _expressionValue;
        private _previousResultType;
        private _parametersFunctions;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer, _serializationsInfo?: DevExpress.Analytics.Utils.ISerializationInfoArray);
        get specifics(): any;
        isValid: ko.Observable<boolean> | ko.Computed<boolean>;
        name: ko.Computed<string>;
        value: ko.Observable | ko.Computed;
        type: ko.Observable<string> | ko.Computed<string>;
        resultType: ko.Observable<string> | ko.Computed<string>;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyVisible(propName: string): boolean;
    }
    export class DBForeignKey {
        name: string;
        primaryKeyTable: string;
        columns: string[];
        primaryKeyColumns: string[];
        constructor(model: any);
    }
    export class DBTable {
        name: string;
        columns: DevExpress.Analytics.Data.DBColumn[];
        isView: boolean;
        foreignKeys: DevExpress.Analytics.Data.DBForeignKey[];
        constructor(model: any);
    }
    export class DBStoredProcedure {
        name: string;
        arguments: DBStoredProcedureArgument[];
        constructor(model: any);
    }
    export enum DBStoredProcedureArgumentDirection {
        In = 0,
        Out = 1,
        InOut = 2
    }
    export class DBStoredProcedureArgument {
        name: string;
        type: DevExpress.Analytics.Data.DBColumnType;
        direction: DBStoredProcedureArgumentDirection;
        constructor(model: any);
    }
    export class DBSchema {
        tables: DevExpress.Analytics.Data.DBTable[];
        procedures: DevExpress.Analytics.Data.DBStoredProcedure[];
        constructor(model: any);
        assignTablesAndViews(tables: DevExpress.Analytics.Data.DBTable[], views: DevExpress.Analytics.Data.DBTable[]): void;
    }
    export class ConnectionOptions {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        closeConnection: ko.Observable<boolean>;
        commandTimeout: ko.Observable<number>;
    }
    export class SqlDataConnection {
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Analytics.Data.SqlDataConnection;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        name: ko.Observable<string>;
        parameteres: ko.Observable<string>;
        fromAppConfig: ko.Observable<boolean>;
        options: DevExpress.Analytics.Data.ConnectionOptions;
    }
    export class ResultTable {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        tableName: ko.Observable<string> | ko.Computed<string>;
        columns: ko.ObservableArray<{
            name: ko.Observable<string> | ko.Computed<string>;
            propertyType: ko.Observable<string>;
        }>;
    }
    export class ResultSet {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Analytics.Data.ResultSet;
        static toJson(value: any, serializer: any, refs: any): {
            DataSet: any;
        };
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        tables: ko.ObservableArray<DevExpress.Analytics.Data.ResultTable>;
    }
    export const expressionSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export enum FederatedQueryExpressionType {
        SelectColumnExpression = 0,
        SelectExpression = 1,
        SelectAllColumnsExpression = 2,
        SelectAllNodeColumnsExpression = 3,
        SelectRowCountExpression = 4
    }
    export class FederatedQueryExpression {
        constructor(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        name: ko.Observable<string> | ko.Computed<string>;
        alias: ko.Observable<string> | ko.Computed<string>;
        table: ko.Observable<string> | ko.Computed<string>;
        propertyName: ko.Observable<string> | ko.Computed<string>;
    }
    export class FederationSource extends Disposable {
        constructor(model: any, serializer?: any, path?: string, sourceName?: string);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        getDataSourceName(): string;
        getPath(): string;
        hasDataMember(): boolean;
        sourceName: ko.Observable<string> | ko.Computed<string>;
        dataMember: ko.Observable<string> | ko.Computed<string>;
    }
    export class CustomSqlQuery implements ISqlQueryViewModel {
        parent: DevExpress.Analytics.Data.SqlDataSource;
        constructor(model: any, parent: DevExpress.Analytics.Data.SqlDataSource, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        sqlString: ko.Observable<string> | ko.Computed<string>;
        name: ko.Observable<string> | ko.Computed<string>;
        type: ko.Observable<string> | ko.Computed<string>;
        parameters: ko.ObservableArray<DevExpress.Analytics.Data.DataSourceParameter>;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        generateName(): string;
    }
    export class TableQuery implements ISqlQueryViewModel {
        parent: DevExpress.Analytics.Data.SqlDataSource;
        constructor(model: any, parent: DevExpress.Analytics.Data.SqlDataSource, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        name: ko.Observable<string> | ko.Computed<string>;
        type: ko.Observable<string> | ko.Computed<string>;
        filterString: ko.Observable<string> | ko.Computed<string>;
        parameters: ko.ObservableArray<DevExpress.Analytics.Data.DataSourceParameter>;
        tables(): {
            name: ko.Observable<string> | ko.Computed<string>;
            alias: ko.Observable<string>;
        }[];
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        generateName(): string;
    }
    export class StoredProcQuery implements ISqlQueryViewModel {
        parent: DevExpress.Analytics.Data.SqlDataSource;
        constructor(model: any, parent: DevExpress.Analytics.Data.SqlDataSource, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        procName: ko.Observable<string> | ko.Computed<string>;
        name: ko.Observable<string> | ko.Computed<string>;
        type: ko.Observable<string> | ko.Computed<string>;
        parameters: ko.ObservableArray<DevExpress.Analytics.Data.DataSourceParameter>;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        generateName(): string;
    }
    export class MasterDetailRelation extends Disposable {
        dispose(): void;
        private _customName;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        name: ko.PureComputed<string>;
        masterQuery: ko.Observable<string> | ko.Computed<string>;
        detailQuery: ko.Observable<string> | ko.Computed<string>;
        keyColumns: ko.ObservableArray<{
            masterColumn: ko.Observable<string> | ko.Computed<string>;
            detailColumn: ko.Observable<string> | ko.Computed<string>;
        }>;
        createKeyColumn(): void;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export interface IDataSourceBase {
        name: ko.Observable<string> | ko.Computed<string>;
        id: string;
    }
    export interface IDataSourceDBSchema extends IDataSourceBase {
        dbSchemaProvider: DevExpress.Analytics.Data.IDBSchemaProvider;
    }
    export class SqlDataSource extends Disposable implements IDataSourceDBSchema {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        createQuery(item: any, serializer: any): DevExpress.QueryBuilder.Utils.ISqlQueryViewModel;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer, requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper);
        name: ko.Observable<string> | ko.Computed<string>;
        id: string;
        queries: ko.ObservableArray<DevExpress.QueryBuilder.Utils.ISqlQueryViewModel>;
        relations: ko.ObservableArray<DevExpress.Analytics.Data.MasterDetailRelation>;
        connection: DevExpress.Analytics.Data.SqlDataConnection;
        dbSchemaProvider: DevExpress.Analytics.Data.DBSchemaProvider;
        resultSet: DevExpress.Analytics.Data.ResultSet;
    }
    export enum JsonNodeType {
        Object = 0,
        Array = 1,
        Property = 2
    }
    export class JsonNode {
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Analytics.Data.JsonNode;
        static toJsonNodes(value: DevExpress.Analytics.Data.JsonNode[], serializer: any, refs: any): any[];
        static toJsonNode(value: DevExpress.Analytics.Data.JsonNode, serializer: any, refs: any, recoursive?: boolean): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        name: ko.Observable<string> | ko.Computed<string>;
        nodes: DevExpress.Analytics.Data.JsonNode[];
        selected: ko.Observable<boolean> | ko.Computed<boolean>;
        value: any;
        nodeType: string;
        valueType: string;
        displayName: string;
    }
    export class JsonSchemaNode extends JsonNode {
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Analytics.Data.JsonSchemaNode;
        static toJson(value: DevExpress.Analytics.Data.JsonSchemaNode, serializer: any, refs: any): {};
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        nodeType: string;
        valueType: string;
        displayName: any;
        selected: ko.Observable<boolean>;
    }
    export class JsonSchemaRootNode extends JsonNode {
        private _rootElementList;
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Analytics.Data.JsonSchemaRootNode;
        static toJson(value: DevExpress.Analytics.Data.JsonSchemaRootNode, serializer: any, refs: any): {};
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getRootElementPartList(allowObjectRootElements?: boolean): DevExpress.Analytics.Utils.IPathRequest[];
        private _fillRootElementList;
        private _getNextPath;
    }
    export const sourceQuerySerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class SourceQuery extends Disposable {
        private _sourcePath?;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer, sourceName?: string, _sourcePath?: string);
        sourceName: ko.Observable<string> | ko.Computed<string>;
        queryType: ko.Observable<string> | ko.Computed<string>;
        alias: ko.Observable<string> | ko.Computed<string>;
        name: ko.Observable<string> | ko.Computed<string>;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        getPath(): string;
    }
    export const transformQuerySerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const transformationRuleSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class TransformQuery extends Disposable implements IFederationQuery {
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        alias: ko.Observable<string> | ko.Computed<string>;
        queryType: ko.Observable<string> | ko.Computed<string>;
        transformationRules: ko.ObservableArray<FederationTransformationRule>;
        expressions: ko.ObservableArray<DevExpress.Analytics.Data.FederatedQueryExpression>;
        root: ko.Observable<DevExpress.Analytics.Data.SourceQuery>;
        get sources(): ko.ObservableArray<DevExpress.Analytics.Data.FederationSource>;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        generateName(): string;
    }
    export class FederationTransformationRule {
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        name: ko.Observable<string> | ko.Computed<string>;
        alias: ko.Observable<string> | ko.Computed<string>;
        unfold: ko.Observable<false>;
        flatten: ko.Observable<false>;
    }
    export const subNodeSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class SubNode {
        constructor(model: any, serializer?: any);
        static deserializeRelationModel(subNodeQuery: DevExpress.QueryBuilder.Internal.FederationTableViewModel, relation: DevExpress.QueryBuilder.Elements.RelationViewModel): DevExpress.Analytics.Data.SubNode;
        private _parsePath;
        private _createCondition;
        private _conditionBinary;
        createRelationModel(query: DevExpress.QueryBuilder.Elements.QueryViewModelBase): DevExpress.QueryBuilder.Elements.RelationViewModel;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        query: ko.Observable<DevExpress.Analytics.Data.SourceQuery>;
        condition: ko.Observable<string>;
        joinType: ko.Observable<string>;
    }
    export const selectQuerySerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class SelectQuery extends Disposable implements IFederationQuery {
        private _path?;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer, _path?: string);
        alias: ko.Observable<string> | ko.Computed<string>;
        queryType: ko.Observable<string> | ko.Computed<string>;
        subNodes: ko.ObservableArray<DevExpress.Analytics.Data.SubNode>;
        expressions: ko.ObservableArray<DevExpress.Analytics.Data.FederatedQueryExpression>;
        root: ko.Observable<DevExpress.Analytics.Data.SourceQuery>;
        get sources(): ko.ObservableArray<DevExpress.Analytics.Data.FederationSource>;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        generateName(): string;
        init(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer, rootPath?: string): void;
    }
    export class FederatedQueriesContainer extends Disposable {
        dataSources: ko.ObservableArray<DevExpress.Analytics.Internal.IDataSourceInfo> | ko.Computed<DevExpress.Analytics.Internal.IDataSourceInfo[]>;
        protected _serializer?: DevExpress.Analytics.Utils.IModelSerializer;
        constructor(model: object, dataSources: ko.ObservableArray<DevExpress.Analytics.Internal.IDataSourceInfo> | ko.Computed<DevExpress.Analytics.Internal.IDataSourceInfo[]>, _serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        protected _dataSourceName(dataSource: DevExpress.Analytics.Internal.IDataSourceInfo): any;
        getQueryNameFromPath(path: string): string;
        getPathFromQueryName(sourceName: string): string;
        createQuery(item: object, dataSource?: DevExpress.Analytics.Data.FederatedQueriesContainer): DevExpress.QueryBuilder.Utils.IFederationQuery;
        addSource(source: string | DevExpress.Analytics.Data.FederationSource, queryPath?: string): void;
        removeSource(sourceName: string): void;
        addSelectQuery(queryPath: string, columnName?: string): void;
        removeQuery(queryName: string): void;
        removeExpression(columnName: string, queryPath: string): void;
        dispose(): void;
        name: ko.Observable<string> | ko.Computed<string>;
        id: string;
        queries: ko.ObservableArray<DevExpress.QueryBuilder.Utils.IFederationQuery>;
        sources: ko.ObservableArray<DevExpress.Analytics.Data.FederationSource>;
    }
    export const unionQuerySerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export enum UnionTypes {
        Union = 0,
        UnionAll = 1
    }
    export class UnionQuery extends FederatedQueriesContainer implements IFederationQuery {
        constructor(model: any, dataSources: ko.ObservableArray<DevExpress.Analytics.Internal.IDataSourceInfo> | ko.Computed<DevExpress.Analytics.Internal.IDataSourceInfo[]>, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        alias: ko.Observable<string> | ko.Computed<string>;
        queryType: ko.Observable<string> | ko.Computed<string>;
        unionType: ko.Observable<string> | ko.Computed<string>;
        unionElements: ko.ObservableArray<DevExpress.Analytics.Data.SelectQuery>;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        generateName(): string;
    }
    export class FederationMasterDetailRelation extends MasterDetailRelation {
        static create(_relation: DevExpress.Analytics.Data.MasterDetailRelation): DevExpress.Analytics.Data.FederationMasterDetailRelation;
        constructor(model: any, serializer?: any);
    }
    export interface ISerializableDataFederationDataSourceInfo {
        dataSource: any;
        dataSources: any;
    }
    export class SerializableDataFederationDataSource extends Disposable implements ISerializableDataFederationDataSourceInfo {
        private get _currentDataSources();
        private _collectDependentDataSources;
        constructor(dataSource: DevExpress.Analytics.Data.IFederationDataSource, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        dispose(): void;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        collectDependentDataSources(): any[];
        serialize(): ISerializableDataFederationDataSourceInfo;
        getSerializableFederationDataSourceInfo(): ISerializableDataFederationDataSourceInfo;
        serializer: DevExpress.Analytics.Utils.IModelSerializer;
        dataSources: ko.ObservableArray<any>;
        dataSource: DevExpress.Analytics.Data.IFederationDataSource;
    }
    export interface ISerializableSourceMapItem {
        dataSource: ko.Observable<any>;
        name: ko.Observable<string>;
    }
    export interface IFederationDataSource {
        name: ko.Observable<string> | ko.Computed<string>;
        serializableSourceMap: ko.ObservableArray<ISerializableSourceMapItem>;
        getSerializableModel: () => DevExpress.Analytics.Data.SerializableDataFederationDataSource;
    }
    export class FederationDataSource extends FederatedQueriesContainer implements IDataSourceBase, IFederationDataSource, IDataSourceDBSchema {
        dataSources: ko.ObservableArray<DevExpress.Analytics.Internal.IDataSourceInfo> | ko.Computed<DevExpress.Analytics.Internal.IDataSourceInfo[]>;
        fielListProvider?: DevExpress.Analytics.Utils.IItemsProvider;
        private _serializableModel;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        getSerializableModel(): DevExpress.Analytics.Data.SerializableDataFederationDataSource;
        createQuery(item: object): DevExpress.QueryBuilder.Utils.IFederationQuery;
        updateSerializableModel(): void;
        constructor(model: object, dataSources: ko.ObservableArray<DevExpress.Analytics.Internal.IDataSourceInfo> | ko.Computed<DevExpress.Analytics.Internal.IDataSourceInfo[]>, fielListProvider?: DevExpress.Analytics.Utils.IItemsProvider, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        dispose(): void;
        get dependentDataSources(): string[];
        relations: ko.ObservableArray<DevExpress.Analytics.Data.FederationMasterDetailRelation>;
        resultSet: DevExpress.Analytics.Data.ResultSet;
        dbSchemaProvider: DevExpress.Analytics.Data.IDBSchemaProvider;
        serializableSourceMap: ko.ObservableArray<ISerializableSourceMapItem>;
    }
    export class ObjectDataMemberBase implements IDataMemberInfo {
        name: string;
        displayName: string;
        dataMember: string;
        constructor(model?: ObjectDataMemberBase);
    }
    export class ObjectParameter extends ObjectDataMemberBase {
        type: string;
        value: any;
        resultType: string;
        constructor(model?: ObjectParameter);
    }
    export abstract class ObjectDataSourceMethodBase extends ObjectDataMemberBase {
        parameters: ObjectParameter[];
        constructor(model: ObjectDataSourceMethodBase);
    }
    export class ObjectDataMember extends ObjectDataSourceMethodBase {
        static entireObject: () => any;
        isStatic: boolean;
        memberType: string;
        disabled: ko.Observable<boolean>;
        constructor(model: DevExpress.Analytics.Data.ObjectDataMember);
        static empty(): DevExpress.Analytics.Data.ObjectDataMember;
        isEntireObject(): boolean;
        isAvailable(): boolean;
    }
    export class ObjectCtor extends ObjectDataSourceMethodBase {
    }
    export class ObjectType extends ObjectDataMemberBase {
        ctors: DevExpress.Analytics.Data.ObjectCtor[];
        members: DevExpress.Analytics.Data.ObjectDataMember[];
        constructor(model: ObjectType);
        updateMembers(selectedCtor: DevExpress.Analytics.Data.ObjectCtor): void;
    }
    export class ObjectDataSource extends Disposable implements IDataSourceBase {
        setState(state: DevExpress.Analytics.Wizard.IObjectDataSourceWizardState): void;
        name: ko.Observable<string>;
        id: string;
        selectedType: string;
        ctor: DevExpress.Analytics.Data.ObjectCtor;
        dataMember: DevExpress.Analytics.Data.ObjectDataMember;
    }
    export class JsonAuthenticationInfo {
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Analytics.Data.JsonAuthenticationInfo;
        static toJson(value: DevExpress.Analytics.Data.JsonAuthenticationInfo, serializer: any, refs: any): any;
        getInfo(): {
            propertyName: string;
            modelName: string;
            defaultVal: string;
        }[];
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        password: ko.Observable<string> | ko.Computed<string>;
        userName: ko.Observable<string> | ko.Computed<string>;
    }
    export enum JsonParameterType {
        PathParameter = 0,
        QueryParameter = 1,
        Header = 2
    }
    export class JsonParameter extends Disposable {
        expression_Prefix: string;
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Analytics.Data.JsonParameter;
        static toJson(value: DevExpress.Analytics.Data.JsonParameter, serializer: any, refs: any): any;
        _initEditingProperties(): void;
        switchEditors(): void;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        itemType: ko.Observable<string>;
        name: ko.Observable<string> | ko.Computed<string>;
        namePlaceholder: () => any;
        valuePlaceholder: () => any;
        value: ko.Observable<string> | ko.Computed<string>;
        _editingValue: ko.Observable<string>;
        _expression: DevExpress.Analytics.Widgets.IExpressionOptions;
        isExpression: ko.Observable<boolean>;
        itemsProvider: DevExpress.Analytics.Utils.IItemsProvider;
        _parameterTypes: {
            value: string;
            displayValue: string;
            localizationId: string;
        }[];
        nameValidationRules: Array<{
            type: string;
            message: string;
        }>;
    }
    /// <reference types="jquery" />
    export interface IJsonSchemaProvider extends IItemsProvider {
        getJsonSchema: () => JQueryPromise<DevExpress.Analytics.Data.JsonSchemaRootNode>;
    }
    export class JsonSchemaProvider extends Disposable implements IJsonSchemaProvider {
        private _requestWrapper;
        private _jsonSchemaPromise;
        private _jsonDataSource;
        private _jsonSchema;
        constructor(jsonDataSource: DevExpress.Analytics.Data.JsonDataSource, _requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper);
        reset(): void;
        mapToDataMemberContract(nodes: DevExpress.Analytics.Data.JsonNode[]): DevExpress.Analytics.Utils.IDataMemberInfo[];
        getSchemaByPath(pathRequest: DevExpress.Analytics.Utils.IPathRequest, jsonSchema: DevExpress.Analytics.Data.JsonSchemaNode): DevExpress.Analytics.Utils.IDataMemberInfo[];
        getItems: (IPathRequest: any) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
        getJsonSchema(parameters?: DevExpress.Analytics.Wizard.Internal.IParameter[]): JQueryPromise<DevExpress.Analytics.Data.JsonSchemaRootNode>;
    }
    export class JsonSource extends Disposable {
        private static _URIJSONSOURCE_TYPE;
        private static _CUSTOMJSONSOURCE_TYPE;
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Analytics.Data.JsonSource;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model?: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        sourceType: ko.Observable<string>;
        uri: ko.Observable<string>;
        json: ko.Observable<string>;
        authenticationInfo: DevExpress.Analytics.Data.JsonAuthenticationInfo;
        headers: ko.ObservableArray<DevExpress.Analytics.Data.JsonParameter>;
        queryParameters: ko.ObservableArray<DevExpress.Analytics.Data.JsonParameter>;
        pathParameters: ko.ObservableArray<DevExpress.Analytics.Data.JsonParameter>;
        serialize(includeRootTag?: boolean): any;
        resetSource(): void;
    }
    /// <reference types="jquery" />
    export class JsonDataSource extends Disposable implements IDataSourceBase {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        clone(_serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Analytics.Data.JsonDataSource;
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Analytics.Data.JsonDataSource;
        static toJson(value: any, serializer: any, refs: any): any;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer, requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper);
        getSchema(parameters?: DevExpress.Analytics.Wizard.Internal.IParameter[]): JQueryPromise<DevExpress.Analytics.Data.JsonSchemaRootNode>;
        name: ko.Observable<string> | ko.Computed<string>;
        id: string;
        connectionName: ko.Observable<string> | ko.Computed<string>;
        jsonSchemaProvider: DevExpress.Analytics.Data.JsonSchemaProvider;
        schema: DevExpress.Analytics.Data.JsonSchemaRootNode;
        rootElement: ko.Observable<string> | ko.Computed<string>;
        source: DevExpress.Analytics.Data.JsonSource;
    }
    /// <reference types="jquery" />
    export interface IDBSchemaProvider extends IItemsProvider {
        getDbTable: (tableName: string, path?: string) => JQueryPromise<DevExpress.Analytics.Data.DBTable>;
        getDbSchema: () => JQueryPromise<any>;
        getDbTables?: () => JQueryPromise<any>;
        getDbViews?: () => JQueryPromise<any>;
        getDbStoredProcedures?: () => JQueryPromise<DevExpress.Analytics.Data.DBStoredProcedure[]>;
    }
    export class DBSchemaProvider extends Disposable implements IDBSchemaProvider {
        private _requestWrapper;
        private _dbSchema;
        private _dbTablesSchema;
        private _dbViewsSchema;
        private _dbStoredProceduresSchema;
        private _tables;
        private _tableRequests;
        connection: DevExpress.Analytics.Data.SqlDataConnection;
        private _getDBSchema;
        private _getDBStoredProcedures;
        constructor(connection: DevExpress.Analytics.Data.SqlDataConnection, _requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper);
        getDbViews(): JQueryPromise<DevExpress.Analytics.Data.DBSchema>;
        getDbTables(): JQueryPromise<DevExpress.Analytics.Data.DBSchema>;
        getItemByPath?: (path: DevExpress.Analytics.Utils.IPathRequest) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo>;
        getValues?: (path: DevExpress.Analytics.Utils.IPathRequest) => JQueryPromise<any[]>;
        getItems: (IPathRequest: any) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
        getDbSchema(): JQueryPromise<DevExpress.Analytics.Data.DBSchema>;
        getDbStoredProcedures(): JQueryPromise<DevExpress.Analytics.Data.DBStoredProcedure[]>;
        getDbTable(tableName: string, fullPath?: string): JQueryPromise<DevExpress.Analytics.Data.DBTable>;
    }
}
declare module DevExpress.Analytics.Data.Metadata {
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    export function validateName(nameCandidate: string): boolean;
    export const dsParameterNameValidationRules: Array<any>;
    export const parameterValueSerializationsInfo: {
        propertyName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
    };
    export const dsParameterSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export function storedProcParameterSerializationsInfo(type: string): any[];
    export const federationDataSourceSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const sourceSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const customQuerySerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const tableQuerySerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const storedProcQuerySerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const masterDetailRelationSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
}
declare module DevExpress.QueryBuilder.Widgets {
    import IExpressionEditorFunction = DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction;
    export const expressionFunctions: DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction[];
}
declare module DevExpress.QueryBuilder.Elements {
    import DataSourceParameter = DevExpress.Analytics.Data.DataSourceParameter;
    import ElementViewModel = DevExpress.Analytics.Elements.ElementViewModel;
    import IModelSerializer = DevExpress.Analytics.Utils.IModelSerializer;
    import Size = DevExpress.Analytics.Elements.Size;
    import Point = DevExpress.Analytics.Elements.Point;
    import ControlsFactory = DevExpress.Analytics.Utils.ControlsFactory;
    import QueryViewModelBase = DevExpress.QueryBuilder.Elements.QueryViewModelBase;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import QueryElementBaseViewModel = DevExpress.QueryBuilder.Elements.QueryElementBaseViewModel;
    import TableViewModel = DevExpress.QueryBuilder.Elements.TableViewModel;
    import ColumnViewModel = DevExpress.QueryBuilder.Elements.ColumnViewModel;
    import ModelSerializer = DevExpress.Analytics.Utils.ModelSerializer;
    import AllColumnsViewModel = DevExpress.QueryBuilder.Elements.AllColumnsViewModel;
    import IPoint = DevExpress.Analytics.Elements.IPoint;
    import DBColumn = DevExpress.Analytics.Data.DBColumn;
    import DBTable = DevExpress.Analytics.Data.DBTable;
    import DBColumnType = DevExpress.Analytics.Data.DBColumnType;
    import IConnectingPoint = DevExpress.Analytics.Diagram.IConnectingPoint;
    import RoutedConnectorViewModel = DevExpress.Analytics.Diagram.RoutedConnectorViewModel;
    import RelationViewModel = DevExpress.QueryBuilder.Elements.RelationViewModel;
    import JoinConditionViewModel = DevExpress.QueryBuilder.Elements.JoinConditionViewModel;
    import IElementViewModel = DevExpress.Analytics.Elements.IElementViewModel;
    import SurfaceElementBase = DevExpress.Analytics.Elements.SurfaceElementBase;
    import ISurfaceContext = DevExpress.Analytics.Elements.ISurfaceContext;
    import IUnitProperties = DevExpress.Analytics.Internal.IUnitProperties;
    import QuerySurface = DevExpress.QueryBuilder.Elements.QuerySurface;
    import TableSurface = DevExpress.QueryBuilder.Elements.TableSurface;
    import QueryElementBaseSurface = DevExpress.QueryBuilder.Elements.QueryElementBaseSurface;
    import ColumnSurface = DevExpress.QueryBuilder.Elements.ColumnSurface;
    import AllColumnsSurface = DevExpress.QueryBuilder.Elements.AllColumnsSurface;
    import CodeResolver = DevExpress.Analytics.Internal.CodeResolver;
    import RoutedConnectorSurface = DevExpress.Analytics.Diagram.RoutedConnectorSurface;
    import JoinConditionSurface = DevExpress.QueryBuilder.Elements.JoinConditionSurface;
    import QueryViewModel = DevExpress.QueryBuilder.Elements.QueryViewModel;
    import ISelectionTarget = DevExpress.Analytics.Internal.ISelectionTarget;
    import RelationSurface = DevExpress.QueryBuilder.Elements.RelationSurface;
    import IHoverInfo = DevExpress.Analytics.Internal.IHoverInfo;
    import IMargins = DevExpress.Analytics.Elements.IMargins;
    import MeasureUnit = DevExpress.Analytics.Internal.MeasureUnit;
    import Margins = DevExpress.Analytics.Elements.Margins;
    import IDBSchemaProvider = DevExpress.Analytics.Data.IDBSchemaProvider;
    import QBFilterStringOptions = DevExpress.QueryBuilder.Widgets.Internal.QBFilterStringOptions;
    import ColumnExpression = DevExpress.QueryBuilder.Elements.ColumnExpression;
    import ParameterViewModel = DevExpress.QueryBuilder.Elements.ParameterViewModel;
    export class ParameterViewModel extends DataSourceParameter {
        getEditorType(type: any): {
            header?: any;
            content?: any;
            custom?: any;
        };
    }
    export class QueryElementBaseViewModel extends ElementViewModel {
        getControlFactory(): DevExpress.Analytics.Utils.ControlsFactory;
        constructor(control: any, parent: DevExpress.Analytics.Elements.ElementViewModel, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        size: DevExpress.Analytics.Elements.Size;
        location: DevExpress.Analytics.Elements.Point;
    }
    export class ColumnExpression {
        private _criteria;
        private _dependedTables;
        private __table;
        private __column;
        private __expression;
        constructor(model: any, query: DevExpress.QueryBuilder.Elements.QueryViewModelBase, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        table: ko.Observable<string> | ko.Computed<string>;
        column: ko.Observable<string> | ko.Computed<string>;
        expression: ko.Observable<string> | ko.Computed<string>;
        aggregate: ko.Observable<string> | ko.Computed<string>;
        alias: ko.Observable<string> | ko.Computed<string>;
        descending: ko.Observable<boolean> | ko.Computed<boolean>;
        itemType: ko.Observable<string> | ko.Computed<string>;
        isRemoved: ko.Observable<boolean>;
        actualName(): string;
        initialize(model: any, query: DevExpress.QueryBuilder.Elements.QueryViewModelBase, serializer?: DevExpress.Analytics.Utils.IModelSerializer): void;
        toTable(): void;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isDepended(tableActualName: string): boolean;
    }
    export class AllColumnsViewModel extends QueryElementBaseViewModel {
        static DisplayName: () => any;
        constructor(parent: DevExpress.QueryBuilder.Elements.TableViewModel, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        selected: ko.Observable<boolean> | ko.Computed<boolean>;
        name: ko.Computed<string>;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class TableViewModel extends QueryElementBaseViewModel {
        protected serializer?: DevExpress.Analytics.Utils.ModelSerializer;
        static COLUMNS_OFFSET: number;
        static COLUMN_HEIGHT: number;
        static COLUMN_MARGIN: number;
        static TABLE_MIN_WIDTH: number;
        static TABLE_DEFAULT_HEIGHT: number;
        private _columnsConnectionPointLeftX;
        private _columnsConnectionPointRightX;
        protected _columns: ko.ObservableArray<DevExpress.QueryBuilder.Elements.ColumnViewModel>;
        protected _initialized: ko.Observable<boolean>;
        protected tableOffset: ko.Observable<number>;
        constructor(model: any, parent: DevExpress.QueryBuilder.Elements.QueryViewModelBase, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        size: DevExpress.Analytics.Elements.Size;
        location: DevExpress.Analytics.Elements.Point;
        name: ko.Observable<string> | ko.Computed<string>;
        alias: ko.Observable<string> | ko.Computed<string>;
        actualName: ko.Observable<string> | ko.Computed<string>;
        isReady: ko.Observable<boolean>;
        columns(): DevExpress.QueryBuilder.Elements.ColumnViewModel[];
        asterisk: DevExpress.QueryBuilder.Elements.AllColumnsViewModel;
        allColumnsSelected: ko.Computed<boolean>;
        toggleSelectedColumns(): void;
        isInitialized: ko.PureComputed<boolean>;
        getColumnConnectionPoints(column: DevExpress.QueryBuilder.Elements.ColumnViewModel): {
            left: DevExpress.Analytics.Elements.IPoint;
            right: DevExpress.Analytics.Elements.IPoint;
        };
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        getInvalidColumns(): DevExpress.QueryBuilder.Elements.ColumnViewModel[];
        getColumn(name: string): DevExpress.QueryBuilder.Elements.ColumnViewModel;
        _initColumns(columns: DevExpress.Analytics.Data.DBColumn[], update?: boolean): void;
        createChildColumn(item: DevExpress.Analytics.Data.DBColumn): DevExpress.QueryBuilder.Elements.ColumnViewModel;
        createColumns(dbTable: DevExpress.Analytics.Data.DBTable): void;
        itemType: string;
    }
    export class ColumnViewModel extends QueryElementBaseViewModel {
        private _isAliasAutoGenerated;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, dbColumn: DevExpress.Analytics.Data.DBColumn, parent: DevExpress.QueryBuilder.Elements.TableViewModel, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        isPropertyDisabled(name: string): boolean;
        isNotAvailable: ko.Observable<boolean>;
        name: ko.Observable<string> | ko.Computed<string>;
        alias: ko.Observable<string> | ko.Computed<string>;
        selected: ko.Observable<boolean> | ko.Computed<boolean>;
        actualName: ko.Computed<string>;
        displayType: ko.Computed<string>;
        _type: ko.Observable<DevExpress.Analytics.Data.DBColumnType>;
        _size: ko.Observable<string>;
        dataType: ko.Computed<string>;
        rightConnectionPoint: DevExpress.Analytics.Diagram.IConnectingPoint;
        leftConnectionPoint: DevExpress.Analytics.Diagram.IConnectingPoint;
        sortingType: ko.Computed<string>;
        sortOrder: ko.Computed<number>;
        groupBy: ko.Computed<boolean>;
        aggregate: ko.Observable<string> | ko.Computed<string>;
        toggleSelected: (val: boolean, lazy?: boolean) => void;
        get specifics(): "String" | "Date" | "Bool" | "Integer" | "Float";
    }
    export class JoinConditionViewModel extends RoutedConnectorViewModel {
        getControlFactory(): DevExpress.Analytics.Utils.ControlsFactory;
        preInitProperties(): void;
        constructor(control: any, relation: DevExpress.QueryBuilder.Elements.RelationViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        parentColumn: ko.Computed<DevExpress.QueryBuilder.Elements.ColumnViewModel>;
        nestedColumn: ko.Computed<DevExpress.QueryBuilder.Elements.ColumnViewModel>;
        parentColumnName: ko.Observable<string> | ko.Computed<string>;
        nestedColumnName: ko.Observable<string> | ko.Computed<string>;
        operator: ko.Observable<string> | ko.Computed<string>;
        joinType: ko.Observable<string> | ko.Computed<string>;
        left: ko.Computed<string>;
        right: ko.Computed<string>;
    }
    export class RelationViewModel extends QueryElementBaseViewModel {
        private _getConditionNumber;
        constructor(model: any, query: DevExpress.QueryBuilder.Elements.QueryViewModelBase, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        parentTableName: ko.Observable<string> | ko.Computed<string>;
        nestedTableName: ko.Observable<string> | ko.Computed<string>;
        parentTable: ko.Observable<DevExpress.QueryBuilder.Elements.TableViewModel>;
        nestedTable: ko.Observable<DevExpress.QueryBuilder.Elements.TableViewModel>;
        joinType: ko.Observable<string> | ko.Computed<string>;
        conditions: ko.ObservableArray<DevExpress.QueryBuilder.Elements.JoinConditionViewModel>;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        addChild(control: DevExpress.Analytics.Elements.IElementViewModel): void;
        removeChild(control: DevExpress.Analytics.Elements.ElementViewModel): void;
    }
    export class QueryElementBaseSurface<M extends DevExpress.QueryBuilder.Elements.QueryElementBaseViewModel> extends SurfaceElementBase<M> {
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<QueryElementBaseViewModel>;
        constructor(control: M, context: DevExpress.Analytics.Elements.ISurfaceContext, unitProperties: DevExpress.Analytics.Internal.IUnitProperties<M>);
        template: string;
        selectiontemplate: string;
        contenttemplate: string;
        margin: ko.Observable<number>;
    }
    export class ColumnSurface extends SurfaceElementBase<DevExpress.QueryBuilder.Elements.ColumnViewModel> {
        private _isJoined;
        private _isHovered;
        constructor(control: DevExpress.QueryBuilder.Elements.ColumnViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        template: string;
        toggleSelected: () => void;
        selectedWrapper: ko.PureComputed<boolean>;
        isNotAvailable: ko.PureComputed<boolean>;
        isAggregate: ko.PureComputed<boolean>;
        isAscending: ko.PureComputed<boolean>;
        isDescending: ko.PureComputed<boolean>;
        cssClasses: (query: DevExpress.QueryBuilder.Elements.QuerySurface, columnDragHandler: {
            getDragColumn: () => DevExpress.QueryBuilder.Elements.ColumnViewModel;
        }, parent: DevExpress.QueryBuilder.Elements.TableSurface) => {
            "dxd-state-invalid": ko.PureComputed<boolean>;
            "dxd-state-active": boolean;
            "dxd-state-joined": ko.Computed<boolean>;
            "dxd-state-hovered": ko.Computed<boolean>;
        };
    }
    export class AllColumnsSurface extends SurfaceElementBase<DevExpress.QueryBuilder.Elements.AllColumnsViewModel> {
        constructor(control: DevExpress.QueryBuilder.Elements.AllColumnsViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        template: string;
        toggleSelected: () => void;
        selectedWrapper: ko.PureComputed<boolean>;
        isOverAsterisk: ko.PureComputed<boolean>;
        cssClasses: () => {
            "dxd-state-active": ko.Observable<boolean> | ko.Computed<boolean>;
            "dxd-state-hovered": boolean;
        };
    }
    export class TableSurface extends QueryElementBaseSurface<DevExpress.QueryBuilder.Elements.TableViewModel> {
        constructor(control: DevExpress.QueryBuilder.Elements.TableViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        showSourceName: boolean;
        columnsAsyncResolver: DevExpress.Analytics.Internal.CodeResolver;
        asterisk: DevExpress.QueryBuilder.Elements.AllColumnsSurface;
        columns: ko.Computed<DevExpress.QueryBuilder.Elements.ColumnSurface[]>;
        contenttemplate: string;
        titletemplate: string;
        template: string;
        isInitialized: ko.Computed<boolean>;
        toggleSelected: () => void;
        selectedWrapper: ko.PureComputed<boolean>;
        resizable(resizeHandler: any, element: any): any;
    }
    export class JoinConditionSurface extends RoutedConnectorSurface {
        constructor(control: DevExpress.QueryBuilder.Elements.JoinConditionViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        container(): DevExpress.QueryBuilder.Elements.QuerySurface;
    }
    export class RelationSurface extends SurfaceElementBase<DevExpress.QueryBuilder.Elements.RelationViewModel> {
        constructor(control: DevExpress.QueryBuilder.Elements.RelationViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        conditions: ko.ObservableArray<DevExpress.QueryBuilder.Elements.JoinConditionSurface>;
        template: string;
        _getChildrenHolderName(): string;
    }
    export class QuerySurface extends SurfaceElementBase<DevExpress.QueryBuilder.Elements.QueryViewModelBase> implements ISelectionTarget, ISurfaceContext {
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<QueryViewModel>;
        private _joinedColumns;
        constructor(query: DevExpress.QueryBuilder.Elements.QueryViewModelBase, zoom?: ko.Observable<number>);
        measureUnit: ko.Observable<DevExpress.Analytics.Internal.MeasureUnit> | ko.Computed<DevExpress.Analytics.Internal.MeasureUnit>;
        dpi: ko.Observable<number> | ko.Computed<number>;
        zoom: ko.Observable<number> | ko.Computed<number>;
        placeholder: () => any;
        tables: ko.ObservableArray<DevExpress.QueryBuilder.Elements.TableSurface>;
        relations: ko.ObservableArray<DevExpress.QueryBuilder.Elements.RelationSurface>;
        allowMultiselect: boolean;
        focused: ko.Observable<boolean>;
        selected: ko.Observable<boolean>;
        underCursor: ko.Observable<DevExpress.Analytics.Internal.IHoverInfo>;
        checkParent(surfaceParent: DevExpress.Analytics.Internal.ISelectionTarget): boolean;
        pageWidth: ko.Observable<number> | ko.Computed<number>;
        templateName: string;
        getChildrenCollection(): ko.ObservableArray<DevExpress.QueryBuilder.Elements.TableSurface>;
        margins: DevExpress.Analytics.Elements.IMargins;
        rtl: ko.Observable<boolean>;
        isJoined(column: DevExpress.QueryBuilder.Elements.ColumnSurface): boolean;
    }
    export class QueryViewModelBase extends QueryElementBaseViewModel {
        private static pageMargin;
        protected topOffset: number;
        protected _initializeTable(table: DevExpress.QueryBuilder.Elements.TableViewModel): void;
        private _addColumnsToTable;
        constructor(querySource: any, dbSchemaProvider?: DevExpress.Analytics.Data.IDBSchemaProvider, parametersMode?: string, beforeSaveCallback?: (data: any) => void, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        tables: ko.ObservableArray<DevExpress.QueryBuilder.Elements.TableViewModel>;
        columns: ko.ObservableArray<DevExpress.QueryBuilder.Elements.ColumnExpression>;
        isValid: ko.Computed<boolean>;
        editableName: ko.Observable<string> | ko.Computed<string>;
        pageWidth: ko.Observable<number> | ko.Computed<number>;
        pageHeight: ko.Observable<number> | ko.Computed<number>;
        margins: DevExpress.Analytics.Elements.Margins;
        dbSchemaProvider: DevExpress.Analytics.Data.IDBSchemaProvider;
        allColumnsInTablesSelected: ko.Observable<boolean> | ko.Computed<boolean>;
        relations: ko.ObservableArray<DevExpress.QueryBuilder.Elements.RelationViewModel>;
        sorting: ko.ObservableArray<DevExpress.QueryBuilder.Elements.ColumnExpression>;
        grouping: ko.ObservableArray<DevExpress.QueryBuilder.Elements.ColumnExpression>;
        dispose(): void;
        addChild(control: DevExpress.Analytics.Elements.ElementViewModel): void;
        removeChild(control: DevExpress.Analytics.Elements.ElementViewModel): void;
        validateRelations(): boolean;
        private _validate;
        private _validateTable;
        createChild(info: any, tableViewModel?: DevExpress.QueryBuilder.Elements.TableViewModel, path?: string): DevExpress.Analytics.Elements.ElementViewModel;
        init(): void;
        getTable(name: string): DevExpress.QueryBuilder.Elements.TableViewModel;
        canSave(showMessage?: boolean): boolean;
        save(): any;
        serialize(includeRootTag?: boolean): any;
        onSave: (data: any) => void;
        private _findTableInAncestors;
        private _findHead;
        private _isHead;
        private _findAncestorsRelations;
        private _reverseRelations;
        aggregatedColumnsCount: ko.Observable<number>;
        defaultPageHeight: number;
        defaultPageWidth: number;
        getAllColumns(): DevExpress.QueryBuilder.Elements.ColumnViewModel[];
        cerateJoinCondition(parentColumn: DevExpress.QueryBuilder.Elements.ColumnViewModel, nestedColumn: DevExpress.QueryBuilder.Elements.ColumnViewModel): DevExpress.QueryBuilder.Elements.JoinConditionViewModel;
        tryToCreateRelationsByFK(sourceTable: DevExpress.QueryBuilder.Elements.TableViewModel): void;
    }
    export class QueryViewModel extends QueryViewModelBase {
        private static emptyModel;
        constructor(querySource: any, dbSchemaProvider?: DevExpress.Analytics.Data.IDBSchemaProvider, parametersMode?: string, beforeSaveCallback?: (data: any) => void, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        isPropertyDisabled(name: string): boolean;
        filterString: DevExpress.QueryBuilder.Widgets.Internal.QBFilterStringOptions;
        _filterString: ko.Observable<string> | ko.Computed<string>;
        groupFilterString: DevExpress.QueryBuilder.Widgets.Internal.QBFilterStringOptions;
        _groupFilterString: ko.Observable<string> | ko.Computed<string>;
        top: ko.Observable<number> | ko.Computed<number>;
        skip: ko.Observable<number> | ko.Computed<number>;
        filter: ko.Observable<string> | ko.Computed<string>;
        parameters: ko.ObservableArray<DevExpress.QueryBuilder.Elements.ParameterViewModel> | ko.Computed<DevExpress.QueryBuilder.Elements.ParameterViewModel[]>;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        createChild(info: any): DevExpress.Analytics.Elements.ElementViewModel;
        tryToCreateRelationsByFK(sourceTable: DevExpress.QueryBuilder.Elements.TableViewModel): void;
        controlType: string;
    }
}
declare module DevExpress.Analytics.Data.Internal {
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import IPathRequest = DevExpress.Analytics.Utils.IPathRequest;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    import IItemsProvider = DevExpress.Analytics.Utils.IItemsProvider;
    import IDBSchemaProvider = DevExpress.Analytics.Data.IDBSchemaProvider;
    import DBTable = DevExpress.Analytics.Data.DBTable;
    import INamedQueryViewModel = DevExpress.QueryBuilder.Utils.INamedQueryViewModel;
    import RequestWrapper = DevExpress.QueryBuilder.Utils.RequestWrapper;
    import JsonDataSource = DevExpress.Analytics.Data.JsonDataSource;
    import IParameter = DevExpress.Analytics.Wizard.Internal.IParameter;
    import JsonSchemaRootNode = DevExpress.Analytics.Data.JsonSchemaRootNode;
    import SqlDataConnection = DevExpress.Analytics.Data.SqlDataConnection;
    import DBSchema = DevExpress.Analytics.Data.DBSchema;
    import DBStoredProcedure = DevExpress.Analytics.Data.DBStoredProcedure;
    export function deserializeToCollection<T>(model: any[], createItem: (itemModel: any) => T, _collection?: T[]): T[];
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export class DBSchemaFederationDataSourceProvider extends Disposable implements IDBSchemaProvider {
        private _rootItems;
        getDbSchema(): JQuery.Promise<DevExpress.Analytics.Utils.IDataMemberInfo[], any, any>;
        getItems: (path: DevExpress.Analytics.Utils.IPathRequest) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
        getDbTable(tableName: string, path: string): JQueryPromise<DevExpress.Analytics.Data.DBTable>;
        dispose(): void;
        constructor(itemsProvider: DevExpress.Analytics.Utils.IItemsProvider);
    }
    export function generateQueryUniqueName(queries: DevExpress.QueryBuilder.Utils.INamedQueryViewModel[], query: DevExpress.QueryBuilder.Utils.INamedQueryViewModel, nameProperty?: string): any;
    export let getJsonSchemaCallback: (requestWrapper: DevExpress.QueryBuilder.Utils.RequestWrapper, jsonDataSource: DevExpress.Analytics.Data.JsonDataSource, parameters?: DevExpress.Analytics.Wizard.Internal.IParameter[]) => JQueryPromise<DevExpress.Analytics.Data.JsonSchemaRootNode>;
    export function _setGetJsonSchemaCallback(func: any): void;
    export function _resetGetJsonSchemaCallback(): void;
    /// <reference types="jquery" />
    export function getDBSchemaCallback({ requestWrapper, connection, tables, getTables, getViews }: {
        requestWrapper: DevExpress.QueryBuilder.Utils.RequestWrapper;
        connection: DevExpress.Analytics.Data.SqlDataConnection;
        tables: DevExpress.Analytics.Data.DBTable[];
        getViews?: boolean;
        getTables?: boolean;
    }): JQueryPromise<DevExpress.Analytics.Data.DBSchema>;
    export function getDBStoredProceduresCallback(requestWrapper: DevExpress.QueryBuilder.Utils.RequestWrapper, connection: DevExpress.Analytics.Data.SqlDataConnection): JQueryPromise<DevExpress.Analytics.Data.DBStoredProcedure[]>;
}
declare module DevExpress.QueryBuilder.Utils {
    import ISerializableModel = DevExpress.Analytics.Utils.ISerializableModel;
    import DataSourceParameter = DevExpress.Analytics.Data.DataSourceParameter;
    import FederatedQueryExpression = DevExpress.Analytics.Data.FederatedQueryExpression;
    import FederationSource = DevExpress.Analytics.Data.FederationSource;
    import SqlDataSource = DevExpress.Analytics.Data.SqlDataSource;
    import ControlsFactory = DevExpress.Analytics.Utils.ControlsFactory;
    import IAjaxSettings = DevExpress.Analytics.Internal.IAjaxSettings;
    import SqlDataConnection = DevExpress.Analytics.Data.SqlDataConnection;
    import DBTable = DevExpress.Analytics.Data.DBTable;
    import JsonDataSource = DevExpress.Analytics.Data.JsonDataSource;
    import IParameter = DevExpress.Analytics.Wizard.Internal.IParameter;
    import FederationDataSource = DevExpress.Analytics.Data.FederationDataSource;
    export const ActionId: {
        Save: string;
        DataPreview: string;
        SelectStatementPreview: string;
    };
    export const HandlerUri: DevExpress.Analytics.Internal.IGlobalSubscribableValue<string>;
    export const SqlQueryType: {
        customSqlQuery: string;
        tableQuery: string;
        storedProcQuery: string;
    };
    export const JsonSourceType: {
        fileJsonSource: string;
        customJsonSource: string;
        uriJsonSource: string;
    };
    export enum FederationQueryType {
        SelectNode = 0,
        UnionNode = 1,
        SourceNode = 2,
        TransformationNode = 3
    }
    export interface INamedQueryViewModel extends ISerializableModel {
        generateName: () => string;
    }
    export interface IFederationQuery extends INamedQueryViewModel {
        queryType: ko.Observable<string> | ko.Computed<string>;
        alias?: ko.Observable<string> | ko.Computed<string>;
        expressions?: ko.ObservableArray<DevExpress.Analytics.Data.FederatedQueryExpression>;
        sources?: ko.ObservableArray<DevExpress.Analytics.Data.FederationSource> | ko.Computed<DevExpress.Analytics.Data.FederationSource[]>;
    }
    export interface ISqlQueryViewModel extends INamedQueryViewModel {
        name: ko.Observable<string> | ko.Computed<string>;
        parameters: ko.ObservableArray<DevExpress.Analytics.Data.DataSourceParameter>;
        type: ko.Observable<string> | ko.Computed<string>;
        parent: DevExpress.Analytics.Data.SqlDataSource;
    }
    export const controlsFactory: DevExpress.Analytics.Utils.ControlsFactory<string>;
    /// <reference types="jquery" />
    export interface ISelectStatementResponse {
        sqlSelectStatement: string;
        errorMessage: string;
    }
    export interface IUriJsonSourceValidationResult {
        isUriValid: boolean;
        faultMessage?: string;
    }
    export interface IRebuildSchemaResponse {
        resultSchemaJSON: string;
        connectionParameters?: string;
    }
    export class RequestWrapper {
        sendRequest<T = any>(action: string, arg: string): JQueryPromise<T>;
        _sendRequest<T = any>(settings: DevExpress.Analytics.Internal.IAjaxSettings): JQueryPromise<T>;
        getDbSchema({ connection, tables, getViews, getTables }: {
            connection: DevExpress.Analytics.Data.SqlDataConnection;
            tables?: DevExpress.Analytics.Data.DBTable[];
            getViews?: boolean;
            getTables?: boolean;
        }): JQueryPromise<{
            dbSchemaJSON: string;
        }>;
        getDbStoredProcedures(connection: DevExpress.Analytics.Data.SqlDataConnection): JQueryPromise<{
            dbSchemaJSON: string;
        }>;
        getSelectStatement(connection: DevExpress.Analytics.Data.SqlDataConnection, queryJSON: string): JQueryPromise<ISelectStatementResponse>;
        getDataPreview(connection: DevExpress.Analytics.Data.SqlDataConnection, queryJSON: string): JQueryPromise<{
            dataPreviewJSON: string;
        }>;
        rebuildResultSchema(dataSource: DevExpress.Analytics.Data.SqlDataSource, queryName?: string, relationsEditing?: boolean, parameters?: DevExpress.Analytics.Wizard.Internal.IParameter[]): JQueryPromise<IRebuildSchemaResponse>;
        getFederationResultSchema(dataSource: DevExpress.Analytics.Data.FederationDataSource): JQueryPromise<{
            resultSchemaJSON: string;
        }>;
        validateJsonUri(jsonDataSource: DevExpress.Analytics.Data.JsonDataSource): JQueryPromise<IUriJsonSourceValidationResult>;
        saveJsonSource(connectionName: string, jsonDataSource: DevExpress.Analytics.Data.JsonDataSource): JQueryPromise<string>;
        getJsonSchema(jsonDataSource: DevExpress.Analytics.Data.JsonDataSource, parameters: DevExpress.Analytics.Wizard.Internal.IParameter[]): JQueryPromise<{
            jsonSchemaJSON: string;
        }>;
        getObjectTypeDescriptions(context: string): JQueryPromise<{
            objectDataSourceInfoJson: string;
        }>;
    }
}
declare module DevExpress.QueryBuilder.Widgets.Internal {
    import EditorTemplates = DevExpress.Analytics.Widgets.EditorTemplates;
    import TableViewModel = DevExpress.QueryBuilder.Elements.TableViewModel;
    import ColumnViewModel = DevExpress.QueryBuilder.Elements.ColumnViewModel;
    import IItemsProvider = DevExpress.Analytics.Utils.IItemsProvider;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    import QueryViewModel = DevExpress.QueryBuilder.Elements.QueryViewModel;
    import FilterEditorSerializer = DevExpress.Analytics.Widgets.Internal.FilterEditorSerializer;
    import ColumnExpression = DevExpress.QueryBuilder.Elements.ColumnExpression;
    import OperandProperty = DevExpress.Analytics.Criteria.OperandProperty;
    import CriteriaOperator = DevExpress.Analytics.Criteria.CriteriaOperator;
    import OperandParameterSurface = DevExpress.Analytics.Widgets.Filtering.OperandParameterSurface;
    import OperandParameter = DevExpress.Analytics.Criteria.OperandParameter;
    import QueryBuilderObjectsProvider = DevExpress.QueryBuilder.Widgets.Internal.QueryBuilderObjectsProvider;
    import QBFilterEditorHelper = DevExpress.QueryBuilder.Widgets.Internal.QBFilterEditorHelper;
    import OperandPropertySurface = DevExpress.Analytics.Widgets.Filtering.OperandPropertySurface;
    import FilterEditorHelper = DevExpress.Analytics.Widgets.FilterEditorHelper;
    import DataSourceParameter = DevExpress.Analytics.Data.DataSourceParameter;
    import FilterStringOptions = DevExpress.Analytics.Widgets.FilterStringOptions;
    import ParameterViewModel = DevExpress.QueryBuilder.Elements.ParameterViewModel;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import FederationDataSource = DevExpress.Analytics.Data.FederationDataSource;
    import FederationQueryType = DevExpress.QueryBuilder.Utils.FederationQueryType;
    import IFederationQuery = DevExpress.QueryBuilder.Utils.IFederationQuery;
    import IFederationQueryBuilderCallbacks = DevExpress.Analytics.Wizard.Internal.IFederationQueryBuilderCallbacks;
    import PopupEditorBase = DevExpress.Analytics.Widgets.Internal.PopupEditorBase;
    import FederatedQueriesHelper = DevExpress.QueryBuilder.Widgets.Internal.FederatedQueriesHelper;
    import Editor = DevExpress.Analytics.Widgets.Editor;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import UndoEngine = DevExpress.Analytics.Utils.UndoEngine;
    import PopupService = DevExpress.Analytics.Internal.PopupService;
    import MasterDetailRelation = DevExpress.Analytics.Data.MasterDetailRelation;
    import MasterQuerySurface = DevExpress.QueryBuilder.Widgets.Internal.MasterQuerySurface;
    import KeyColumnSurface = DevExpress.QueryBuilder.Widgets.Internal.KeyColumnSurface;
    import MasterDetailRelationSurface = DevExpress.QueryBuilder.Widgets.Internal.MasterDetailRelationSurface;
    import ResultSet = DevExpress.Analytics.Data.ResultSet;
    export const editorTemplates: DevExpress.Analytics.Widgets.EditorTemplates<QueryBuilderEditors>;
    export {};
    /// <reference types="jquery" />
    export function isAggregatedExpression(object: {
        aggregate: ko.Observable<string> | ko.Computed<string>;
    }): boolean;
    export interface IQueryBuilderObjectProviderFilter {
        filterTables(tables: DevExpress.QueryBuilder.Elements.TableViewModel[]): DevExpress.QueryBuilder.Elements.TableViewModel[];
        filterColumns(columns: DevExpress.QueryBuilder.Elements.ColumnViewModel[]): DevExpress.QueryBuilder.Elements.ColumnViewModel[];
        getColumnName(column: DevExpress.QueryBuilder.Elements.ColumnViewModel): string;
        getSpecifics(column: DevExpress.QueryBuilder.Elements.ColumnViewModel): string;
        getDataType(column: DevExpress.QueryBuilder.Elements.ColumnViewModel): string;
    }
    export class QueryBuilderObjectsProvider implements IItemsProvider {
        constructor(query: ko.Observable<DevExpress.QueryBuilder.Elements.QueryViewModel>, objectFilter: IQueryBuilderObjectProviderFilter);
        hasParameter: (name: string) => boolean;
        createParameter: (name: any, dataType: any) => void;
        getItems: (IPathRequest: any) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
        getColumnInfo: (propertyName: string) => DevExpress.Analytics.Utils.IDataMemberInfo;
        private static _createTableInfo;
        private static _createColumnInfo;
        static whereClauseObjectsFilter: IQueryBuilderObjectProviderFilter;
        static groupByObjectsFilter: IQueryBuilderObjectProviderFilter;
    }
    export {};
    export function createDefaultSQLAceOptions(readOnly?: boolean): {
        showLineNumbers: boolean;
        showPrintMargin: boolean;
        enableBasicAutocompletion: boolean;
        enableLiveAutocompletion: boolean;
        readOnly: boolean;
        highlightSelectedWord: boolean;
        showGutter: boolean;
        highlightActiveLine: boolean;
    };
    export function createDefaultSQLAdditionalOptions(value: any): {
        onChange: (session: any) => void;
        onValueChange: (editor: any) => void;
        changeTimeout: number;
        overrideEditorFocus: boolean;
        setUseWrapMode: boolean;
    };
    export function createDefaultSQLLanguageHelper(): {
        getLanguageMode: () => string;
        createCompleters: () => any[];
    };
    export class GroupFilterEditorSerializer extends FilterEditorSerializer {
        private _columns;
        private _columnDisplayName;
        private _findAggregatedColumn;
        private _aggregatePropertyName;
        constructor(_columns: () => DevExpress.QueryBuilder.Elements.ColumnExpression[]);
        serializeOperandProperty(operand: DevExpress.Analytics.Criteria.OperandProperty): string;
        deserialize(stringCriteria: string): DevExpress.Analytics.Criteria.CriteriaOperator;
    }
    export class OperandParameterQBSurface extends OperandParameterSurface {
        static defaultDisplay: () => any;
        private get _parameterType();
        constructor(operator: DevExpress.Analytics.Criteria.OperandParameter, parent: any, fieldListProvider?: any, path?: any);
        _createParameter(name: string, dataType: string): void;
        createParameter: () => void;
        fieldListProvider: ko.Observable<DevExpress.QueryBuilder.Widgets.Internal.QueryBuilderObjectsProvider>;
        _parameterName: ko.Observable<string>;
        isEditable: ko.Observable<boolean> | ko.Computed<boolean>;
        fieldsOptions: any;
        helper: DevExpress.QueryBuilder.Widgets.Internal.QBFilterEditorHelper;
        canCreateParameters: boolean;
        isDefaultTextDisplayed(): boolean;
        defaultDisplay: () => any;
    }
    export class OperandPropertyQBSurface extends OperandPropertySurface {
        _updateSpecifics(): void;
        constructor(operator: DevExpress.Analytics.Criteria.OperandProperty, parent: any, fieldListProvider?: DevExpress.QueryBuilder.Widgets.Internal.QueryBuilderObjectsProvider, path?: any);
        fieldListProvider: ko.Observable<DevExpress.QueryBuilder.Widgets.Internal.QueryBuilderObjectsProvider>;
        static updateSpecifics(propertySurface: {
            fieldListProvider: ko.Observable<{
                getColumnInfo: (path: string) => DevExpress.Analytics.Utils.IDataMemberInfo;
            }>;
            propertyName: ko.Observable<string>;
            specifics: ko.Observable<string>;
            dataType: ko.Observable<string>;
            fieldsOptions?: ko.Observable<{
                selected: ko.Observable<any>;
            }>;
        }): void;
    }
    export class QBFilterEditorHelper extends FilterEditorHelper {
        constructor(parametersMode: string);
        newParameters: ko.ObservableArray<DevExpress.Analytics.Data.DataSourceParameter>;
    }
    export let QBFilterEditorHelperDefault: typeof DevExpress.QueryBuilder.Widgets.Internal.QBFilterEditorHelper;
    export function _setQBFilterEditorHelperDefault(helperType: any): void;
    export class QBFilterStringOptions extends FilterStringOptions {
        constructor(filterString: ko.Observable<string> | ko.Computed<string>, dataMember?: ko.Observable | ko.Computed, disabled?: ko.Observable<boolean> | ko.Computed<boolean>, title?: {
            text: string;
            localizationId?: string;
        });
        initializeFilterStringHelper(parameters: ko.ObservableArray<DevExpress.QueryBuilder.Elements.ParameterViewModel> | ko.Computed<DevExpress.QueryBuilder.Elements.ParameterViewModel[]>, parametersMode: string, serializer?: DevExpress.Analytics.Widgets.Internal.FilterEditorSerializer): void;
        helper: DevExpress.QueryBuilder.Widgets.Internal.QBFilterEditorHelper;
    }
    interface IRightPanelSwitcher {
        visible: ko.PureComputed<boolean>;
        toogle: () => void;
        title: string;
        disabled: ko.Subscribable<boolean>;
    }
    export class RightPanelSwitcher extends Disposable implements IRightPanelSwitcher {
        private editableObj;
        private getDisplayName;
        private _collapsed;
        constructor(collapsed: ko.Subscribable<boolean>, editableObj: ko.Observable<any>, visibleCondition: (model: any) => boolean, getDisplayName: (editableObj: ko.Observable<any>) => string);
        visible: ko.PureComputed<boolean>;
        dispose(): void;
        toogle(): void;
        get title(): string;
        disabled: ko.Subscribable<boolean>;
    }
    export {};
    export interface IFederatedQueriesCallbacks {
        afterAddQuery?: (query: DevExpress.QueryBuilder.Utils.IFederationQuery) => void;
        onSave?: () => void;
        onClose?: () => void;
    }
    export class FederatedQueriesHelper extends Disposable {
        private _dataSource;
        private queries;
        private _getQuery;
        private _showSelectQbCallBack;
        private _showUnionQbCallBack;
        private _showTransformQbCallBack;
        private _setQuery;
        private _popupSelectQueryBuilder;
        private _popupUnionQueryBuilder;
        private _popupTransformQueryBuilder;
        private _afterAddQuery;
        constructor(_dataSource: DevExpress.Analytics.Data.FederationDataSource, queries: ko.ObservableArray<DevExpress.QueryBuilder.Utils.IFederationQuery>, callbacks: IFederatedQueriesCallbacks, rtl?: boolean);
        editQuery(type: DevExpress.QueryBuilder.Utils.FederationQueryType, name: string): void;
        dispose(): void;
        template: string;
        callBacks: DevExpress.Analytics.Wizard.Internal.IFederationQueryBuilderCallbacks;
        popupItems: {
            template: string;
            model: any;
        }[];
    }
    export class ManageFederatedQueriesEditor extends PopupEditorBase {
        private _dataSource;
        private _callBack;
        rtl: boolean;
        private _createAddQueryButton;
        constructor(_dataSource: DevExpress.Analytics.Data.FederationDataSource, _callBack: () => void, rtl?: boolean);
        queriesGrid: any;
        queriesStoreData: ko.PureComputed<{
            "id": string;
            "name": string;
            "type": DevExpress.QueryBuilder.Utils.FederationQueryType;
        }[]>;
        save(): void;
        canSave(): boolean;
        close(): void;
        dispose(): void;
        className: string;
        _queriesPopupHelper: DevExpress.QueryBuilder.Widgets.Internal.FederatedQueriesHelper;
        title(): string;
    }
    export class UndoEditor extends Editor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        generateValue(undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>): ko.Observable<any> | ko.Computed<any>;
        undoValue: ko.Observable | ko.Computed;
    }
    export function registerEditorTemplates(): void;
    export class KeyColumnSurface {
        private _isMaster;
        constructor(column: ko.Observable<string> | ko.Computed<string>, queryName: string, _isMaster?: boolean);
        getTitle: () => string;
        isSelected: ko.Observable<boolean> | ko.Computed<boolean>;
        _setColumn: (resultColumn: {
            name: string;
        }) => void;
        queryName: string;
        column: ko.Observable<string> | ko.Computed<string>;
        selectColumnText: () => string;
    }
    export class MasterDetailEditorPopupManager {
        private _popupService;
        private _action;
        private _popupItems;
        private _updateActions;
        constructor(target: any, popupService: DevExpress.Analytics.Internal.PopupService, action: string, popupItems: {
            name: any;
        }[]);
        target: any;
        showPopup: (_: any, element: any) => void;
    }
    export class MasterDetailRelationSurface {
        constructor(relation: DevExpress.Analytics.Data.MasterDetailRelation, parent: DevExpress.QueryBuilder.Widgets.Internal.MasterQuerySurface);
        relationName: ko.Observable<string> | ko.Computed<string>;
        keyColumns: ko.Computed<{
            master: DevExpress.QueryBuilder.Widgets.Internal.KeyColumnSurface;
            detail: DevExpress.QueryBuilder.Widgets.Internal.KeyColumnSurface;
        }[]>;
        isEditable: ko.Observable<boolean> | ko.Computed<boolean>;
        create: () => void;
        remove: (data: {
            master: DevExpress.QueryBuilder.Widgets.Internal.KeyColumnSurface;
            detail: DevExpress.QueryBuilder.Widgets.Internal.KeyColumnSurface;
        }) => void;
    }
    export class MasterQuerySurface {
        constructor(masterQueryName: string, relations: ko.ObservableArray<DevExpress.Analytics.Data.MasterDetailRelation>);
        queryName: string;
        relations: ko.ObservableArray<DevExpress.QueryBuilder.Widgets.Internal.MasterDetailRelationSurface>;
        create: (detailQueryItem: {
            name: string;
        }) => void;
        add: (relation: DevExpress.Analytics.Data.MasterDetailRelation) => void;
        remove: (relationSurface: DevExpress.QueryBuilder.Widgets.Internal.MasterDetailRelationSurface) => void;
    }
    /// <reference types="jquery" />
    export class MasterDetailEditor extends PopupEditorBase {
        constructor(relations: ko.ObservableArray<DevExpress.Analytics.Data.MasterDetailRelation>, resultSet: DevExpress.Analytics.Data.ResultSet, saveCallBack: () => JQueryPromise<{}>);
        isValid: ko.Observable<boolean>;
        save: () => void;
        loadPanelVisible: ko.Observable<boolean>;
        popupService: DevExpress.Analytics.Internal.PopupService;
        masterQueries: ko.ObservableArray<DevExpress.QueryBuilder.Widgets.Internal.MasterQuerySurface>;
        createRelation: (target: DevExpress.QueryBuilder.Widgets.Internal.MasterQuerySurface) => any;
        setColumn: (target: DevExpress.QueryBuilder.Widgets.Internal.KeyColumnSurface) => any;
        title(): any;
    }
}
declare module DevExpress.QueryBuilder.Metadata {
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const name: DevExpress.Analytics.Utils.ISerializationInfo;
    export const alias: DevExpress.Analytics.Utils.ISerializationInfo;
    export const text: DevExpress.Analytics.Utils.ISerializationInfo;
    export const selected: DevExpress.Analytics.Utils.ISerializationInfo;
    export const size: DevExpress.Analytics.Utils.ISerializationInfo;
    export const location: DevExpress.Analytics.Utils.ISerializationInfo;
    export const sizeLocation: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const unknownSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
}
declare module DevExpress.Analytics.Diagram {
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import ControlsFactory = DevExpress.Analytics.Utils.ControlsFactory;
    import ElementViewModel = DevExpress.Analytics.Elements.ElementViewModel;
    import ModelSerializer = DevExpress.Analytics.Utils.ModelSerializer;
    import Size = DevExpress.Analytics.Elements.Size;
    import Point = DevExpress.Analytics.Elements.Point;
    import IConnectingPoint = DevExpress.Analytics.Diagram.IConnectingPoint;
    import IPoint = DevExpress.Analytics.Elements.IPoint;
    import PointSide = DevExpress.Analytics.Diagram.PointSide;
    import DiagramElementBaseViewModel = DevExpress.Analytics.Diagram.DiagramElementBaseViewModel;
    import ConnectorViewModel = DevExpress.Analytics.Diagram.ConnectorViewModel;
    import ConnectionPointViewModel = DevExpress.Analytics.Diagram.ConnectionPointViewModel;
    import SurfaceElementBase = DevExpress.Analytics.Elements.SurfaceElementBase;
    import ISurfaceContext = DevExpress.Analytics.Elements.ISurfaceContext;
    import IUnitProperties = DevExpress.Analytics.Internal.IUnitProperties;
    import Margins = DevExpress.Analytics.Elements.Margins;
    import DiagramViewModel = DevExpress.Analytics.Diagram.DiagramViewModel;
    import ISelectionTarget = DevExpress.Analytics.Internal.ISelectionTarget;
    import IHoverInfo = DevExpress.Analytics.Internal.IHoverInfo;
    import IMargins = DevExpress.Analytics.Elements.IMargins;
    import DiagramElementBaseSurface = DevExpress.Analytics.Diagram.DiagramElementBaseSurface;
    import MeasureUnit = DevExpress.Analytics.Internal.MeasureUnit;
    import DiagramSurface = DevExpress.Analytics.Diagram.DiagramSurface;
    import RoutedConnectorViewModel = DevExpress.Analytics.Diagram.RoutedConnectorViewModel;
    import ConnectionPointSurface = DevExpress.Analytics.Diagram.ConnectionPointSurface;
    import ConnectingPointViewModel = DevExpress.Analytics.Diagram.ConnectingPointViewModel;
    import DiagramElementViewModel = DevExpress.Analytics.Diagram.DiagramElementViewModel;
    import DragDropHandler = DevExpress.Analytics.Internal.DragDropHandler;
    import SurfaceSelection = DevExpress.Analytics.Internal.SurfaceSelection;
    import UndoEngine = DevExpress.Analytics.Utils.UndoEngine;
    import SnapLinesHelper = DevExpress.Analytics.Internal.SnapLinesHelper;
    import DragHelperContent = DevExpress.Analytics.Internal.DragHelperContent;
    import ConnectingPointSurface = DevExpress.Analytics.Diagram.ConnectingPointSurface;
    import ConnectorSurface = DevExpress.Analytics.Diagram.ConnectorSurface;
    import GroupObject = DevExpress.Analytics.Internal.GroupObject;
    export const name: DevExpress.Analytics.Utils.ISerializationInfo;
    export const text: DevExpress.Analytics.Utils.ISerializationInfo;
    export const size: DevExpress.Analytics.Utils.ISerializationInfo;
    export const location: DevExpress.Analytics.Utils.ISerializationInfo;
    export const sizeLocation: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const unknownSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const diagramControlsFactory: DevExpress.Analytics.Utils.ControlsFactory<string>;
    export class DiagramElementBaseViewModel extends ElementViewModel {
        getControlFactory(): DevExpress.Analytics.Utils.ControlsFactory;
        constructor(control: any, parent: DevExpress.Analytics.Elements.ElementViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        size: DevExpress.Analytics.Elements.Size;
        location: DevExpress.Analytics.Elements.Point;
    }
    export const diagramElementSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export enum PointSide {
        East = 0,
        South = 1,
        North = 2,
        West = 3
    }
    export const GRID_SIZE = 10;
    export function determineConnectingPoints<T extends {
        rightConnectionPoint: DevExpress.Analytics.Diagram.IConnectingPoint;
        leftConnectionPoint: DevExpress.Analytics.Diagram.IConnectingPoint;
    }>(startObject: T, endObject: T): {
        start: DevExpress.Analytics.Diagram.IConnectingPoint;
        end: DevExpress.Analytics.Diagram.IConnectingPoint;
    };
    export interface IConnectingPoint {
        location: DevExpress.Analytics.Elements.IPoint;
        side: ko.Observable<DevExpress.Analytics.Diagram.PointSide> | ko.Computed<DevExpress.Analytics.Diagram.PointSide>;
    }
    export class ConnectingPointViewModel extends DiagramElementBaseViewModel implements IConnectingPoint {
        constructor(control: any, parent: DevExpress.Analytics.Diagram.DiagramElementBaseViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        percentOffsetX: ko.Observable<number> | ko.Computed<number>;
        percentOffsetY: ko.Observable<number> | ko.Computed<number>;
        side: ko.PureComputed<DevExpress.Analytics.Diagram.PointSide>;
    }
    export const connectingPointSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class ConnectionPointViewModel extends DiagramElementBaseViewModel {
        constructor(control: any, parent: DevExpress.Analytics.Diagram.ConnectorViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        location: DevExpress.Analytics.Elements.Point;
        connectingPoint: ko.Observable<DevExpress.Analytics.Diagram.IConnectingPoint>;
    }
    export const connectionPointSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class ConnectorViewModel extends DiagramElementBaseViewModel {
        static MIN_LINE_THICKNESS: number;
        getX(): number;
        getY(): number;
        getWidth(): number;
        getHeight(): number;
        constructor(control: any, parent: DevExpress.Analytics.Elements.ElementViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        startPoint: ko.Observable<DevExpress.Analytics.Diagram.ConnectionPointViewModel> | ko.Computed<DevExpress.Analytics.Diagram.ConnectionPointViewModel>;
        endPoint: ko.Observable<DevExpress.Analytics.Diagram.ConnectionPointViewModel> | ko.Computed<DevExpress.Analytics.Diagram.ConnectionPointViewModel>;
    }
    export class RoutedConnectorViewModel extends ConnectorViewModel {
        private _isUpdating;
        getX(): number;
        getY(): number;
        getWidth(): number;
        getHeight(): number;
        _fixPoint(point: DevExpress.Analytics.Elements.IPoint, side: DevExpress.Analytics.Diagram.PointSide): void;
        _getStartPointSide(): DevExpress.Analytics.Diagram.PointSide;
        _getEndPointSide(): DevExpress.Analytics.Diagram.PointSide;
        private _getPower;
        private _getRatio;
        constructor(control: any, parent: DevExpress.Analytics.Elements.ElementViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        seriesNumber: ko.Observable<number>;
        routePoints: ko.Observable<DevExpress.Analytics.Elements.IPoint[]>;
        freezeRoute: ko.Observable<boolean>;
        beginUpdate(): void;
        endUpdate(): void;
    }
    export class DiagramElementBaseSurface<M extends DevExpress.Analytics.Diagram.DiagramElementBaseViewModel = DevExpress.Analytics.Diagram.DiagramElementBaseViewModel> extends SurfaceElementBase<M> {
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<DiagramElementBaseViewModel>;
        constructor(control: M, context: DevExpress.Analytics.Elements.ISurfaceContext, unitProperties: DevExpress.Analytics.Internal.IUnitProperties<M>);
        template: string;
        selectiontemplate: string;
        contenttemplate: string;
        margin: ko.Observable<number>;
        positionWidthWithoutMargins: ko.Computed<number>;
        positionLineHeightWithoutMargins: ko.Computed<number>;
    }
    export class DiagramViewModel extends DiagramElementBaseViewModel {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(diagramSource: any);
        controls: ko.ObservableArray<DevExpress.Analytics.Diagram.DiagramElementBaseViewModel>;
        name: ko.Observable<string> | ko.Computed<string>;
        pageWidth: ko.Observable<number> | ko.Computed<number>;
        pageHeight: ko.Observable<number> | ko.Computed<number>;
        margins: DevExpress.Analytics.Elements.Margins;
    }
    export const margins: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pageWidth: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pageHeight: DevExpress.Analytics.Utils.ISerializationInfo;
    export const diagramSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class DiagramSurface extends SurfaceElementBase<DevExpress.Analytics.Diagram.DiagramViewModel> implements ISelectionTarget, ISurfaceContext {
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<DiagramViewModel>;
        constructor(diagram: DevExpress.Analytics.Diagram.DiagramViewModel, zoom?: ko.Observable<number>);
        measureUnit: ko.Observable<DevExpress.Analytics.Internal.MeasureUnit>;
        dpi: ko.Observable<number>;
        zoom: ko.Observable<number> | ko.Computed<number>;
        controls: ko.ObservableArray<DevExpress.Analytics.Diagram.DiagramElementBaseSurface<DevExpress.Analytics.DiagramElementBaseViewModel>>;
        allowMultiselect: boolean;
        focused: ko.Observable<boolean>;
        selected: ko.Observable<boolean>;
        underCursor: ko.Observable<DevExpress.Analytics.Internal.IHoverInfo>;
        checkParent(surfaceParent: DevExpress.Analytics.Internal.ISelectionTarget): boolean;
        _parent: DevExpress.Analytics.Internal.ISelectionTarget;
        get parent(): DevExpress.Analytics.Internal.ISelectionTarget;
        set parent(newVal: DevExpress.Analytics.Internal.ISelectionTarget);
        templateName: string;
        getChildrenCollection(): ko.ObservableArray<any>;
        margins: DevExpress.Analytics.Elements.IMargins;
    }
    export class ConnectionPointSurface extends SurfaceElementBase<DevExpress.Analytics.Diagram.ConnectionPointViewModel> {
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<ConnectionPointViewModel>;
        constructor(control: DevExpress.Analytics.Diagram.ConnectionPointViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        template: string;
        selectiontemplate: string;
        relativeX: ko.Observable<number> | ko.Computed<number>;
        relativeY: ko.Observable<number> | ko.Computed<number>;
        container(): DevExpress.Analytics.Diagram.DiagramSurface;
    }
    export interface IRoutePoint {
        x: ko.Observable<number> | ko.Computed<number>;
        y: ko.Observable<number> | ko.Computed<number>;
        modelPoint: DevExpress.Analytics.Elements.IPoint;
    }
    export class RoutedConnectorSurface extends DiagramElementBaseSurface<DevExpress.Analytics.Diagram.RoutedConnectorViewModel> {
        private static _connectorsCount;
        private _connectorID;
        private _createRoutePoint;
        private _createRouteLineWrapper;
        private _updateRoutePoints;
        constructor(control: DevExpress.Analytics.Diagram.RoutedConnectorViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        template: string;
        selectiontemplate: string;
        startPoint: ko.Observable<DevExpress.Analytics.Diagram.ConnectionPointSurface> | ko.Computed<DevExpress.Analytics.Diagram.ConnectionPointSurface>;
        endPoint: ko.Observable<DevExpress.Analytics.Diagram.ConnectionPointSurface> | ko.Computed<DevExpress.Analytics.Diagram.ConnectionPointSurface>;
        showArrow: ko.Observable<boolean> | ko.Computed<boolean>;
        showRightArrow: ko.Observable<boolean> | ko.Computed<boolean>;
        isVisible: ko.Observable<boolean> | ko.Computed<boolean>;
        routePoints: ko.ObservableArray<IRoutePoint>;
        routePointsSet: ko.PureComputed<string>;
        routeLineWrappers: ko.PureComputed<any[]>;
        connectorID: () => number;
    }
    export class ConnectorSurface extends DiagramElementBaseSurface<DevExpress.Analytics.Diagram.ConnectorViewModel> {
        constructor(control: DevExpress.Analytics.Diagram.ConnectorViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        template: string;
        selectiontemplate: string;
        startPoint: ko.Observable<DevExpress.Analytics.Diagram.ConnectionPointSurface> | ko.Computed<DevExpress.Analytics.Diagram.ConnectionPointSurface>;
        endPoint: ko.Observable<DevExpress.Analytics.Diagram.ConnectionPointSurface> | ko.Computed<DevExpress.Analytics.Diagram.ConnectionPointSurface>;
    }
    export class DiagramElementViewModel extends DiagramElementBaseViewModel {
        constructor(control: any, parent: DevExpress.Analytics.Elements.ElementViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        connectingPoints: ko.ObservableArray<DevExpress.Analytics.Diagram.ConnectingPointViewModel>;
        text: ko.Observable<string> | ko.Computed<string>;
        type: ko.Observable<string> | ko.Computed<string>;
    }
    export class ConnectingPointSurface extends DiagramElementBaseSurface<DevExpress.Analytics.Diagram.ConnectingPointViewModel> {
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<ConnectingPointViewModel>;
        constructor(control: DevExpress.Analytics.Diagram.ConnectingPointViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        template: string;
        selectiontemplate: string;
        contenttemplate: string;
    }
    export class DiagramElementSurface extends DiagramElementBaseSurface<DevExpress.Analytics.Diagram.DiagramElementViewModel> {
        constructor(control: DevExpress.Analytics.Diagram.DiagramElementViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        _getChildrenHolderName(): string;
        contenttemplate: string;
    }
    export function registerControls(): void;
    export {};
    export {};
    export class ConnectionPointDragHandler extends DragDropHandler {
        constructor(surface: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext> | ko.Computed<DevExpress.Analytics.Elements.ISurfaceContext>, selection: DevExpress.Analytics.Internal.SurfaceSelection, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, snapHelper: DevExpress.Analytics.Internal.SnapLinesHelper, dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent);
        startDrag(control: DevExpress.Analytics.Internal.ISelectionTarget): void;
        drag(event: MouseEvent, uiElement: any): void;
        doStopDrag(): void;
        currentConnectionPoint: DevExpress.Analytics.Diagram.ConnectionPointSurface;
    }
    export class ConnectingPointDragHandler extends DragDropHandler {
        constructor(surface: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext> | ko.Computed<DevExpress.Analytics.Elements.ISurfaceContext>, selection: DevExpress.Analytics.Internal.SurfaceSelection, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, snapHelper: DevExpress.Analytics.Internal.SnapLinesHelper, dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent);
        startDrag(control: DevExpress.Analytics.Internal.ISelectionTarget): void;
        drag(event: MouseEvent, uiElement: any): void;
        doStopDrag(): void;
        startConnectingPoint: DevExpress.Analytics.Diagram.ConnectingPointSurface;
        newConnector: DevExpress.Analytics.Diagram.ConnectorViewModel;
        get newConnectorSurface(): DevExpress.Analytics.Diagram.ConnectorSurface;
    }
    export const groups: DevExpress.Analytics.Internal.GroupObject;
    export function createDiagramDesigner(element: Element, diagramSource: ko.Observable<any>, localization?: any, rtl?: boolean): any;
}
declare module DevExpress.QueryBuilder.Elements.Metadata {
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const AggregationType: {
        None: string;
        Count: string;
        Max: string;
        Min: string;
        Avg: string;
        Sum: string;
        CountDistinct: string;
        AvgDistinct: string;
        SumDistinct: string;
    };
    export const columnSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const ColumnType: {
        RecordsCount: string;
        Column: string;
        Expression: string;
        AllColumns: string;
        AllColumnsQuery: string;
    };
    export const columnExpressionSerializationsInfo: ({
        propertyName: string;
        modelName: string;
        defaultVal?: undefined;
    } | {
        propertyName: string;
        modelName: string;
        defaultVal: string;
    } | {
        propertyName: string;
        modelName: string;
        defaultVal: boolean;
    })[];
    export const allColumnsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const tableSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const relationSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const ParametersMode: {
        ReadWrite: string;
        Read: string;
        Disabled: string;
    };
    export const querySerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const ConditionType: {
        Equal: string;
        NotEqual: string;
        Greater: string;
        GreaterOrEqual: string;
        Less: string;
        LessOrEqual: string;
    };
    export const joinConditionSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
}
declare module DevExpress.QueryBuilder.Internal {
    import ColumnExpression = DevExpress.QueryBuilder.Elements.ColumnExpression;
    import QueryViewModelBase = DevExpress.QueryBuilder.Elements.QueryViewModelBase;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import IModelSerializer = DevExpress.Analytics.Utils.IModelSerializer;
    import DBColumn = DevExpress.Analytics.Data.DBColumn;
    import AllColumnsViewModel = DevExpress.QueryBuilder.Elements.AllColumnsViewModel;
    import ColumnViewModel = DevExpress.QueryBuilder.Elements.ColumnViewModel;
    import TableViewModel = DevExpress.QueryBuilder.Elements.TableViewModel;
    import ElementViewModel = DevExpress.Analytics.Elements.ElementViewModel;
    import ModelSerializer = DevExpress.Analytics.Utils.ModelSerializer;
    import IDBSchemaProvider = DevExpress.Analytics.Data.IDBSchemaProvider;
    import SubNode = DevExpress.Analytics.Data.SubNode;
    import FederatedQueryExpression = DevExpress.Analytics.Data.FederatedQueryExpression;
    import FederationDataSource = DevExpress.Analytics.Data.FederationDataSource;
    import IDataSourceBase = DevExpress.Analytics.Data.IDataSourceBase;
    import JoinConditionViewModel = DevExpress.QueryBuilder.Elements.JoinConditionViewModel;
    import QuerySurface = DevExpress.QueryBuilder.Elements.QuerySurface;
    import TableSurface = DevExpress.QueryBuilder.Elements.TableSurface;
    import FederationColumnViewModel = DevExpress.QueryBuilder.Internal.FederationColumnViewModel;
    import SqlDataConnection = DevExpress.Analytics.Data.SqlDataConnection;
    import IRebuildSchemaResponse = DevExpress.QueryBuilder.Utils.IRebuildSchemaResponse;
    import ISelectStatementResponse = DevExpress.QueryBuilder.Utils.ISelectStatementResponse;
    import SqlDataSource = DevExpress.Analytics.Data.SqlDataSource;
    import DragDropHandler = DevExpress.Analytics.Internal.DragDropHandler;
    import SurfaceSelection = DevExpress.Analytics.Internal.SurfaceSelection;
    import ISelectionTarget = DevExpress.Analytics.Internal.ISelectionTarget;
    import UndoEngine = DevExpress.Analytics.Utils.UndoEngine;
    import SnapLinesHelper = DevExpress.Analytics.Internal.SnapLinesHelper;
    import DragHelperContent = DevExpress.Analytics.Internal.DragHelperContent;
    import RoutedConnectorSurface = DevExpress.Analytics.Diagram.RoutedConnectorSurface;
    import TreeListItemViewModel = DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
    import IDisposable = DevExpress.Analytics.Utils.IDisposable;
    import ColumnDragHandler = DevExpress.QueryBuilder.Internal.ColumnDragHandler;
    import IDesignerModel = DevExpress.Analytics.Internal.IDesignerModel;
    import DbObjectDragDropHandler = DevExpress.QueryBuilder.Internal.DbObjectDragDropHandler;
    import QueryBuilderObjectsProvider = DevExpress.QueryBuilder.Widgets.Internal.QueryBuilderObjectsProvider;
    import IItemsProvider = DevExpress.Analytics.Utils.IItemsProvider;
    import ICommonBindingCustomizationHandler = DevExpress.Analytics.Internal.ICommonBindingCustomizationHandler;
    import ICommonCallbacksHandler = DevExpress.Analytics.Internal.ICommonCallbacksHandler;
    import IQueryBuilderModel = DevExpress.QueryBuilder.Internal.IQueryBuilderModel;
    import JSQueryBuilder = DevExpress.Querybuilder.JSQueryBuilder;
    import IQueryBuilderPublicCallback = DevExpress.QueryBuilder.Internal.IQueryBuilderPublicCallback;
    import ObjectProperties = DevExpress.Analytics.Widgets.ObjectProperties;
    import ITreeListOptions = DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
    import GroupObject = DevExpress.Analytics.Internal.GroupObject;
    import QueryViewModel = DevExpress.QueryBuilder.Elements.QueryViewModel;
    import ControlProperties = DevExpress.Analytics.Internal.ControlProperties;
    import TabInfo = DevExpress.Analytics.Utils.TabInfo;
    import TreeListController = DevExpress.Analytics.Widgets.Internal.TreeListController;
    import IQueryBuilderOptions = DevExpress.Querybuilder.IQueryBuilderOptions;
    import IQueryBuilderCustomizationHandler = DevExpress.QueryBuilder.Internal.IQueryBuilderCustomizationHandler;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    export class ColumnExpressionCollectionHelper {
        private static columnCache;
        static addToColumnCache(collection: DevExpress.QueryBuilder.Elements.ColumnExpression[]): void;
        static clearCache(): void;
        static find(collection: ko.ObservableArray<DevExpress.QueryBuilder.Elements.ColumnExpression>, tableName: string, columnName: string): DevExpress.QueryBuilder.Elements.ColumnExpression;
        static findByName(collection: ko.ObservableArray<DevExpress.QueryBuilder.Elements.ColumnExpression>, actualName: string): DevExpress.QueryBuilder.Elements.ColumnExpression;
        static removeDependend(collection: ko.ObservableArray<DevExpress.QueryBuilder.Elements.ColumnExpression>, tableName: string): void;
        static toExpresson(column: DevExpress.QueryBuilder.Elements.ColumnExpression, columns: ko.ObservableArray<DevExpress.QueryBuilder.Elements.ColumnExpression>, value: any): void;
        static setUniqueAlias(collection: any, alias: any): string;
        static createNew(query: DevExpress.QueryBuilder.Elements.QueryViewModelBase, collection: ko.ObservableArray<DevExpress.QueryBuilder.Elements.ColumnExpression>, tableName: string, columnName: string): DevExpress.QueryBuilder.Elements.ColumnExpression;
        static addNew(query: DevExpress.QueryBuilder.Elements.QueryViewModelBase, collection: ko.ObservableArray<DevExpress.QueryBuilder.Elements.ColumnExpression>, table: string, column: string, lazy?: boolean): DevExpress.QueryBuilder.Elements.ColumnExpression;
        static remove(collection: ko.ObservableArray<DevExpress.QueryBuilder.Elements.ColumnExpression>, tableName: string, columnName: string, lazy?: boolean): void;
        static columnTypeToFederated(type: any): string;
        static federatedTypeToColumn(type: any): string;
    }
    export class FederationColumnViewModel extends ColumnViewModel {
        constructor(model: any, dbColumn: DevExpress.Analytics.Data.DBColumn, parent: DevExpress.QueryBuilder.Elements.TableViewModel, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class FederationAllColumnsViewModel extends AllColumnsViewModel {
        constructor(parent: DevExpress.QueryBuilder.Elements.TableViewModel, serializer?: any);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export const federationQuerySerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class FederationQueryViewModel extends QueryViewModelBase {
        private _dbSchemaProvider?;
        private serializer?;
        private static emptyModel;
        protected _initializeTable(table: FederationTableViewModel): void;
        private _createTableViewModel;
        constructor(querySource: any, dataSource: DevExpress.Analytics.Data.IDataSourceBase, _dbSchemaProvider?: DevExpress.Analytics.Data.IDBSchemaProvider, parametersMode?: string, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        dispose(): void;
        serialize(includeRootTag?: boolean): any;
        createChild(info: any, model?: any, path?: string): DevExpress.Analytics.Elements.ElementViewModel;
        cerateJoinCondition(parentColumn: DevExpress.QueryBuilder.Elements.ColumnViewModel, nestedColumn: DevExpress.QueryBuilder.Elements.ColumnViewModel): DevExpress.QueryBuilder.Elements.JoinConditionViewModel;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        tables: ko.ObservableArray<FederationTableViewModel>;
        expressions: ko.ObservableArray<DevExpress.Analytics.Data.FederatedQueryExpression>;
        subNodes: ko.ObservableArray<DevExpress.Analytics.Data.SubNode>;
        rootModel: ko.Observable<FederationTableViewModel>;
        dataSource: DevExpress.Analytics.Data.FederationDataSource;
        controlType: string;
        defaultPageHeight: number;
        topOffset: number;
    }
    export class FederationQuerySurface extends QuerySurface {
    }
    export class FederationTableViewModel extends TableViewModel {
        constructor(model: any, parent: FederationQueryViewModel, path: string, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        queryType: ko.Observable<string> | ko.Computed<string>;
        path: string;
        sourceName: ko.Observable<string> | ko.Computed<string>;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        getPath(): string;
        createChildColumn(item: DevExpress.Analytics.Data.DBColumn): DevExpress.QueryBuilder.Internal.FederationColumnViewModel;
        displaySourceName: ko.Observable<string>;
    }
    export class FederationTableSurface extends TableSurface {
        titletemplate: string;
    }
    /// <reference types="jquery" />
    export function wrapGetSelectStatement(callback?: (connection: DevExpress.Analytics.Data.SqlDataConnection, queryJSON: string) => JQueryPromise<DevExpress.QueryBuilder.Utils.ISelectStatementResponse>): (connection: DevExpress.Analytics.Data.SqlDataConnection, queryJSON: string) => JQueryPromise<DevExpress.QueryBuilder.Utils.ISelectStatementResponse>;
    export function wrapRebuildResultSchema(callback?: (dataSource: DevExpress.Analytics.Data.SqlDataSource, queryName?: string, relationsEditing?: boolean) => JQueryPromise<DevExpress.QueryBuilder.Utils.IRebuildSchemaResponse>): (dataSource: DevExpress.Analytics.Data.SqlDataSource, queryName?: string, relationsEditing?: boolean) => JQueryPromise<DevExpress.QueryBuilder.Utils.IRebuildSchemaResponse>;
    export function wrapGetFederationdResultSchema(callback?: (dataSource: DevExpress.Analytics.Data.FederationDataSource) => JQueryPromise<{
        resultSchemaJSON: string;
    }>): (dataSource: DevExpress.Analytics.Data.FederationDataSource) => JQueryPromise<{
        resultSchemaJSON: string;
    }>;
    export class ColumnDragHandler extends DragDropHandler {
        private querySurface;
        private undoEngine;
        private _dragColumn;
        private _dragConditionSurface;
        private _scrollProcessor;
        private _needToCreateRelation;
        constructor(querySurface: ko.Observable<DevExpress.QueryBuilder.Elements.QuerySurface>, selection: DevExpress.Analytics.Internal.SurfaceSelection, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, snapHelper: DevExpress.Analytics.Internal.SnapLinesHelper, dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent);
        startDrag(control: DevExpress.Analytics.Internal.ISelectionTarget): void;
        setConnectorPoints(cursorPosition: {
            top: number;
            left: number;
        }): void;
        drag(event: MouseEvent, uiElement: any): void;
        doStopDrag(): void;
        dragDropConnector: ko.Observable<DevExpress.Analytics.Diagram.RoutedConnectorSurface>;
        getDragColumn(): DevExpress.QueryBuilder.Elements.ColumnViewModel;
    }
    export class DbObjectDragDropHandler extends DragDropHandler {
        private _undoEngine;
        private _querySurface;
        protected _query: () => DevExpress.QueryBuilder.Elements.QueryViewModelBase;
        protected suggestLocation(newControl: DevExpress.QueryBuilder.Elements.TableViewModel, query: DevExpress.QueryBuilder.Elements.QueryViewModelBase): void;
        getDropCallback: (undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, suggestLocation: boolean) => (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel, query: DevExpress.QueryBuilder.Elements.QueryViewModelBase) => DevExpress.QueryBuilder.Elements.TableViewModel;
        constructor(surface: ko.Observable<DevExpress.QueryBuilder.Elements.QuerySurface>, selection: DevExpress.Analytics.Internal.SurfaceSelection, _undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, snapHelper: DevExpress.Analytics.Internal.SnapLinesHelper, dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent);
        startDrag(draggable: any): void;
        doStopDrag(uiElement: any, _: any): void;
        addControl(control: any, dropTargetSurface: any, size: any): void;
    }
    /// <reference types="jquery" />
    export interface IQueryBuilderModel extends IDesignerModel, IDisposable {
        rootStyle: string;
        columnDragHandler: DevExpress.QueryBuilder.Internal.ColumnDragHandler;
        connectionPointDragHandler: DevExpress.QueryBuilder.Internal.ColumnDragHandler;
        fieldDragHandler: DevExpress.QueryBuilder.Internal.DbObjectDragDropHandler;
        fieldListProvider: DevExpress.QueryBuilder.Widgets.Internal.QueryBuilderObjectsProvider;
        dataBindingsProvider: DevExpress.QueryBuilder.Widgets.Internal.QueryBuilderObjectsProvider;
        parametersBindingsProvider: DevExpress.Analytics.Utils.IItemsProvider;
        dataBindingsGroupProvider: DevExpress.QueryBuilder.Widgets.Internal.QueryBuilderObjectsProvider;
        selectStatmentPreview: IQueryBuilderDialog;
        dataPreview: IQueryBuilderDialog;
        findControl: (s: any, e: JQueryEventObject) => void;
        showPreview: () => void;
        showStatement: () => void;
        columnsLoadingMsg?: () => string;
        updateSurfaceSize: () => void;
        updateSurface: () => void;
    }
    export interface IQueryBuilderDialog {
        isLoading: ko.Observable<boolean> | ko.Computed<boolean>;
        isVisible: ko.Observable<boolean> | ko.Computed<boolean>;
        template: string;
        title: () => string;
        data: any;
        okButtonText: () => string;
        okButtonHandler: (e: any) => void;
        container: any;
    }
    export function serializeDataConnection(connection: DevExpress.Analytics.Data.SqlDataConnection): string;
    export interface IQueryBuilderPublicCallback<T> {
        SaveQueryRequested?: (sender: T, serializedData: any) => void;
    }
    export interface IQueryBuilderCustomizationHandler extends ICommonCallbacksHandler<DevExpress.Querybuilder.JSQueryBuilder, DevExpress.QueryBuilder.Internal.IQueryBuilderModel> {
        saveQueryRequested?: (serializedData: any) => void;
    }
    export interface IJSQueryBuilderCallbacks extends IQueryBuilderCustomizationHandler, IQueryBuilderPublicCallback<DevExpress.Querybuilder.JSQueryBuilder>, ICommonBindingCustomizationHandler<DevExpress.Querybuilder.JSQueryBuilder> {
    }
    export interface ITabModel {
        editableObject: any;
        properties: DevExpress.Analytics.Widgets.ObjectProperties;
    }
    export interface IItemPropertiesTabModel extends ITabModel {
        fieldListModel: {
            treeListOptions: ko.Observable<DevExpress.Analytics.Widgets.Internal.ITreeListOptions> | ko.Computed<DevExpress.Analytics.Widgets.Internal.ITreeListOptions>;
        };
        tablesTop: ko.Observable<number> | ko.Computed<number>;
        searchPlaceholder: () => string;
    }
    export class AccordionTabInfo extends TabInfo {
        static _getSelectedItemPropertyName(model: any): string;
        static _createWrappedObject(query: any, commonModel: any, undoEngine: any, showParameters: boolean): {
            selectedItem: any;
            query: {
                editableObject: any;
                properties: DevExpress.Analytics.Widgets.ObjectProperties;
            };
            fields: any;
            isPropertyVisible: (propertyName: string) => boolean;
        };
        static _createGroups(editableObject: ko.Observable<any>, showParameters: boolean): DevExpress.Analytics.Internal.GroupObject;
        static _createQBPropertyGrid(query: ko.Observable<DevExpress.QueryBuilder.Elements.QueryViewModel> | ko.Computed<DevExpress.QueryBuilder.Elements.QueryViewModel>, commonModel: IItemPropertiesTabModel, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, showParameters: boolean): DevExpress.Analytics.Internal.ControlProperties;
        private _getGroupByName;
        constructor(query: ko.Observable<DevExpress.QueryBuilder.Elements.QueryViewModel> | ko.Computed<DevExpress.QueryBuilder.Elements.QueryViewModel>, itemPropertiesTabInfoModel: IItemPropertiesTabModel, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, focused: ko.Observable | ko.Computed, showParameters: boolean);
        model: DevExpress.Analytics.Internal.ControlProperties;
    }
    export class SelectedTabInfo extends TabInfo {
        model: DevExpress.Analytics.Widgets.ObjectProperties;
        constructor(model: DevExpress.Analytics.Widgets.ObjectProperties);
    }
    export {};
    export function registerControls(): void;
    export class QueryBuilderTreeListController extends TreeListController {
        private undoEngine;
        private query;
        private _dragDropHandler;
        constructor(undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, query: ko.Subscribable<DevExpress.QueryBuilder.Elements.QueryViewModel>, dragDropHandler: DevExpress.QueryBuilder.Internal.DbObjectDragDropHandler);
        dblClickHandler(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): void;
    }
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export interface IQueryBuilderSurfaceCreator {
        options: DevExpress.Querybuilder.IQueryBuilderOptions;
        creator: (options: DevExpress.Querybuilder.IQueryBuilderOptions) => DevExpress.QueryBuilder.Elements.QueryViewModelBase;
    }
    export function updateQueryBuilderSurfaceContentSize(getRoot: () => JQuery<HTMLElement>, surfaceSize: ko.Observable<number> | ko.Computed<number>, surface: ko.Observable<DevExpress.QueryBuilder.Elements.QuerySurface>, updateLayoutCallbacks?: Array<() => void>): () => void;
    export function createIsLoadingFlag(model: ko.Observable<DevExpress.QueryBuilder.Elements.QueryViewModel> | ko.Computed<DevExpress.QueryBuilder.Elements.QueryViewModel>, dbSchemaProvider: ko.Observable<DevExpress.Analytics.Data.IDBSchemaProvider> | ko.Computed<DevExpress.Analytics.Data.IDBSchemaProvider>): ko.PureComputed<boolean>;
    export function createQueryBuilder(element: Element, options: DevExpress.Querybuilder.IQueryBuilderOptions, callbacks: DevExpress.QueryBuilder.Internal.IQueryBuilderCustomizationHandler, applyBindings?: boolean): JQueryDeferred<DevExpress.QueryBuilder.Internal.IQueryBuilderModel>;
    export function createQueryBuilderSurface(element: Element, options: DevExpress.Querybuilder.IQueryBuilderOptions, queryCreator: (options: DevExpress.Querybuilder.IQueryBuilderOptions) => DevExpress.QueryBuilder.Elements.QueryViewModelBase): DevExpress.QueryBuilder.Internal.IQueryBuilderModel;
    export {};
    export class FederatedUnionQueryBuilderTreeListController extends TreeListController {
        dragDropHandler: DevExpress.Analytics.Internal.DragDropHandler;
        dblClickHandler: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void;
        itemsFilter(item: DevExpress.Analytics.Utils.IDataMemberInfo, path?: string, model?: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
        isDraggable(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
        constructor(dragDropHandler: DevExpress.Analytics.Internal.DragDropHandler, dblClickHandler: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void);
    }
    export class FederatedTransformQueryBuilderTreeListController extends FederatedUnionQueryBuilderTreeListController {
        itemsFilter(item: DevExpress.Analytics.Utils.IDataMemberInfo, path: string, model: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
        hasItems(item: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
    }
}
declare module DevExpress.Analytics.Wizard {
    import IDisposable = DevExpress.Analytics.Utils.IDisposable;
    import IWizardPage = DevExpress.Analytics.Wizard.IWizardPage;
    import IWizardPageMetadata = DevExpress.Analytics.Wizard.IWizardPageMetadata;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import _DataSourceWizardOptions = DevExpress.Analytics.Wizard._DataSourceWizardOptions;
    import IDataSourceWizardState = DevExpress.Analytics.Wizard.IDataSourceWizardState;
    import PageFactory = DevExpress.Analytics.Wizard.PageFactory;
    import WizardPageBase = DevExpress.Analytics.Wizard.WizardPageBase;
    import SqlDataSource = DevExpress.Analytics.Data.SqlDataSource;
    import ISqlQueryViewModel = DevExpress.QueryBuilder.Utils.ISqlQueryViewModel;
    import RequestWrapper = DevExpress.QueryBuilder.Utils.RequestWrapper;
    import IDataSourceInfo = DevExpress.Analytics.Internal.IDataSourceInfo;
    import FederationDataSource = DevExpress.Analytics.Data.FederationDataSource;
    import JsonDataSource = DevExpress.Analytics.Data.JsonDataSource;
    import ObjectDataSource = DevExpress.Analytics.Data.ObjectDataSource;
    import ObjectCtor = DevExpress.Analytics.Data.ObjectCtor;
    import ObjectDataMember = DevExpress.Analytics.Data.ObjectDataMember;
    import ObjectType = DevExpress.Analytics.Data.ObjectType;
    import DataSourceType = DevExpress.Analytics.Wizard.DataSourceType;
    import _SqlDataSourceWrapper = DevExpress.Analytics.Wizard._SqlDataSourceWrapper;
    import _WrappedWizardPage = DevExpress.Analytics.Wizard._WrappedWizardPage;
    import StateManager = DevExpress.Analytics.Wizard.StateManager;
    import ISqlDataSourceWizardState = DevExpress.Analytics.Wizard.ISqlDataSourceWizardState;
    import IConnectionStringDefinition = DevExpress.Analytics.Wizard.IConnectionStringDefinition;
    import ChooseAvailableItemPage = DevExpress.Analytics.Wizard.ChooseAvailableItemPage;
    import IJsonDataSourceWizardState = DevExpress.Analytics.Wizard.IJsonDataSourceWizardState;
    import IPathRequest = DevExpress.Analytics.Utils.IPathRequest;
    import JsonSchemaRootNode = DevExpress.Analytics.Data.JsonSchemaRootNode;
    import IJsonDataSourceWizardCallbacks = DevExpress.Analytics.Wizard.Internal.IJsonDataSourceWizardCallbacks;
    import ITreeListOptions = DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
    import ObjectProperties = DevExpress.Analytics.Widgets.ObjectProperties;
    import IItemsProvider = DevExpress.Analytics.Utils.IItemsProvider;
    import IJsonDataSourceType = DevExpress.Analytics.Wizard.IJsonDataSourceType;
    import IObjectDataSourceWizardState = DevExpress.Analytics.Wizard.IObjectDataSourceWizardState;
    import ChooseObjectMemberParameters = DevExpress.Analytics.Wizard.Internal.ChooseObjectMemberParameters;
    import IParametersViewModelConverter = DevExpress.Analytics.Wizard.Internal.IParametersViewModelConverter;
    import IKoCollectionEditorOptions = DevExpress.Analytics.Widgets.Internal.IKoCollectionEditorOptions;
    import QueryBuilderPopup = DevExpress.Analytics.Wizard.Internal.QueryBuilderPopup;
    import ISqlQueryControl = DevExpress.Analytics.Wizard.Internal.ISqlQueryControl;
    import PageIterator = DevExpress.Analytics.Wizard.PageIterator;
    import EventManager = DevExpress.Analytics.Utils.EventManager;
    import IWizardEvents = DevExpress.Analytics.Wizard.IWizardEvents;
    import BaseWizard = DevExpress.Analytics.Wizard.BaseWizard;
    import TableQuery = DevExpress.Analytics.Data.TableQuery;
    import ISelectStatementResponse = DevExpress.QueryBuilder.Utils.ISelectStatementResponse;
    import IDataSourceWizardConnectionStrings = DevExpress.Analytics.Wizard.IDataSourceWizardConnectionStrings;
    import IDataSourceWizardCallbacks = DevExpress.Analytics.Wizard.Internal.IDataSourceWizardCallbacks;
    import PopupWizard = DevExpress.Analytics.Wizard.PopupWizard;
    import _MultiQueryDataSourceWizardOptions = DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions;
    import FullscreenWizardPageFactory = DevExpress.Analytics.Wizard.FullscreenWizardPageFactory;
    import MasterDetailRelation = DevExpress.Analytics.Data.MasterDetailRelation;
    import ResultSet = DevExpress.Analytics.Data.ResultSet;
    import IDataSourceBase = DevExpress.Analytics.Data.IDataSourceBase;
    import MasterDetailEditor = DevExpress.QueryBuilder.Widgets.Internal.MasterDetailEditor;
    import IRebuildSchemaResponse = DevExpress.QueryBuilder.Utils.IRebuildSchemaResponse;
    import IFederationDataSourceWizardState = DevExpress.Analytics.Wizard.IFederationDataSourceWizardState;
    import MasterDetailRelationshipsPageBase = DevExpress.Analytics.Wizard.MasterDetailRelationshipsPageBase;
    import FieldListProvider = DevExpress.Analytics.Internal.FieldListProvider;
    import IAction = DevExpress.Analytics.Utils.IAction;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    import FederatedQueriesHelper = DevExpress.QueryBuilder.Widgets.Internal.FederatedQueriesHelper;
    import TreeNode = DevExpress.Analytics.Wizard.Internal.TreeNode;
    import MultiQueryTreeListItemFactory = DevExpress.Analytics.Wizard.Internal.MultiQueryTreeListItemFactory;
    import TreeLeafNode = DevExpress.Analytics.Wizard.Internal.TreeLeafNode;
    import CustomSqlQuery = DevExpress.Analytics.Data.CustomSqlQuery;
    import ChooseObjectDataMembers = DevExpress.Analytics.Wizard.Internal.ChooseObjectDataMembers;
    import ChooseObjectTypes = DevExpress.Analytics.Wizard.Internal.ChooseObjectTypes;
    import _DataSourceWizardOptionsBase = DevExpress.Analytics.Wizard._DataSourceWizardOptionsBase;
    import IMultiQueryDataSourceWizardCallbacks = DevExpress.Analytics.Wizard.Internal.IMultiQueryDataSourceWizardCallbacks;
    import FullscreenWizard = DevExpress.Analytics.Wizard.FullscreenWizard;
    import IWizardPageStyle = DevExpress.Analytics.Wizard.Internal.IWizardPageStyle;
    import WizardSectionPosition = DevExpress.Analytics.Wizard.Internal.WizardSectionPosition;
    import WizardPageSectionFactory = DevExpress.Analytics.Wizard.Internal.WizardPageSectionFactory;
    import WizardPageProcessor = DevExpress.Analytics.Wizard.Internal.WizardPageProcessor;
    import WizardPageSection = DevExpress.Analytics.Wizard.Internal.WizardPageSection;
    import WizardNavigationPanel = DevExpress.Analytics.Wizard.WizardNavigationPanel;
    import FullscreenWizardPage = DevExpress.Analytics.Wizard.FullscreenWizardPage;
    import ChooseJsonConnectionPage = DevExpress.Analytics.Wizard.ChooseJsonConnectionPage;
    import ChooseJsonSourcePage = DevExpress.Analytics.Wizard.ChooseJsonSourcePage;
    export const __loadingStateFunctionName = "__loadingState";
    export const __nextActionFunctionName = "__nextAction";
    /// <reference types="jquery" />
    export interface IWizardPage extends IDisposable {
        commit: () => JQueryPromise<any>;
        initialize: (state: any, stateChanged?: boolean) => JQueryPromise<any>;
        canFinish: () => boolean;
        canNext: () => boolean;
        onChange?: (callback: () => void) => void;
        changeAlways?: boolean;
    }
    export interface IWizardPageMetadata<T extends DevExpress.Analytics.Wizard.IWizardPage> {
        setState: (data: any, state: any) => void;
        getState: (state: any) => any;
        resetState: (state: any, defaultState?: any) => void;
        create: () => T;
        canNext?: (page: T) => boolean;
        canFinish?: (page: T) => boolean;
        template: string;
        description?: string;
        alwaysShowTitle?: boolean;
    }
    export class PageFactory {
        registerMetadata<T extends DevExpress.Analytics.Wizard.IWizardPage>(pageId: string, metadata: DevExpress.Analytics.Wizard.IWizardPageMetadata<T>): void;
        getMetadata(pageId: string): DevExpress.Analytics.Wizard.IWizardPageMetadata<IWizardPage>;
        unregisterMetadata(pageId: string): void;
        reset(): void;
        metadata: {
            [key: string]: DevExpress.Analytics.Wizard.IWizardPageMetadata<IWizardPage>;
        };
    }
    export const DataSourceWizardPageId: {
        ChoosePredefinedDataSourcePage: string;
        ChooseDataSourceTypePage: string;
        ConfigureMasterDetailRelationshipsPage: string;
    };
    export const SqlDataSourceWizardPageId: {
        ChooseConnectionPage: string;
        ConfigureQueryPage: string;
        ConfigureParametersPage: string;
        MultiQueryConfigurePage: string;
        MultiQueryConfigureParametersPage: string;
        FederatedQueryConfigurePage: string;
    };
    export const FederationDataSourceWizardPageId: {
        FederatedQueryConfigurePage: string;
        FederatedMasterDetailRelationshipsPage: string;
    };
    export const JsonDataSourceWizardPageId: {
        ChooseJsonSourcePage: string;
        ChooseJsonSchemaPage: string;
        ChooseConnectionPage: string;
        SpecifyJsonConnectionPage: string;
    };
    export const ObjectDataSourceWizardPageId: {
        ChooseTypesPage: string;
        ChooseDataMembersPage: string;
        ConfigureParametersPage: string;
    };
    export const FullscreenDataSourceWizardPageId: {
        ChooseDataSourceTypePage: string;
        SpecifySqlDataSourceSettingsPage: string;
        SpecifyJsonDataSourceSettingsPage: string;
        SpecifyObjectDataSourceSettingsPage: string;
        SpecifyFederationDataSourceSettingsPage: string;
        SelectDataSourcePage: string;
    };
    export const FullscreenDataSourceWizardSectionId: {
        SpecifyJsonConnectionPage: string;
        ChooseJsonSchemaPage: string;
        ChooseJsonSourcePage: string;
        ChooseSqlConnectionPage: string;
        ConfigureFederatedQueriesPage: string;
        ConfigureFederatedMasterDetailRelationshipsPage: string;
        ConfigureQueryPage: string;
        ConfigureQueryParametersPage: string;
        ConfigureMasterDetailRelationshipsPage: string;
    };
    /// <reference types="jquery" />
    export class WizardPageBase<TState = any, TResult = any> extends Disposable implements IWizardPage {
        changeAlways: boolean;
        dispose(): void;
        commit(): JQueryPromise<any>;
        protected _onChange: () => void;
        onChange(callback: any): void;
        initialize(state: TState, stateChanged?: boolean): JQueryPromise<any>;
        canNext(): boolean;
        canFinish(): boolean;
    }
    /// <reference types="jquery" />
    export interface ITypeItem {
        text: string;
        imageClassName: string;
        imageTemplateName: string;
        type?: number;
    }
    export enum DataSourceType {
        NoData = 0,
        Sql = 1,
        Json = 2,
        Object = 3,
        Federation = 4
    }
    export class TypeItem implements ITypeItem {
        constructor(textDefault: string, textID: string, imageClassName: string, imageTemplateName: string, type: number);
        text: string;
        imageClassName: string;
        imageTemplateName: string;
        type: number;
    }
    export class ChooseDataSourceTypePage extends WizardPageBase<DevExpress.Analytics.Wizard.IDataSourceWizardState, DevExpress.Analytics.Wizard.IDataSourceWizardState> {
        protected _dataSourceTypeOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions;
        constructor(_dataSourceTypeOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions);
        canNext(): boolean;
        canFinish(): boolean;
        _itemClick: (item: ITypeItem) => void;
        _IsSelected: (item: ITypeItem) => boolean;
        _goToNextPage(): void;
        commit(): JQueryPromise<DevExpress.Analytics.Wizard.IDataSourceWizardState>;
        protected _createTypeItems(): ITypeItem[];
        initialize(state: DevExpress.Analytics.Wizard.IDataSourceWizardState): JQueryPromise<any>;
        typeItems: ITypeItem[];
        selectedItem: ko.Observable<ITypeItem>;
        _extendCssClass: (rightPath: string) => string;
    }
    export function _registerChooseDataSourceTypePage(factory: DevExpress.Analytics.Wizard.PageFactory, dataSourceTypeOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions): void;
    export class _SqlDataSourceWrapper {
        sqlDataSourceJSON?: string;
        sqlDataSource: DevExpress.Analytics.Data.SqlDataSource;
        private _queryIndex;
        get sqlQuery(): DevExpress.QueryBuilder.Utils.ISqlQueryViewModel;
        set sqlQuery(val: DevExpress.QueryBuilder.Utils.ISqlQueryViewModel);
        saveCustomQueries(): any[];
        save(): string;
        customQueries: DevExpress.QueryBuilder.Utils.ISqlQueryViewModel[];
        constructor(sqlDataSourceJSON?: string, queryName?: string, requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper);
    }
    export interface ISqlDataSourceWizardState {
        name?: string;
        queryName?: string;
        sqlDataSourceJSON?: string;
        relations?: string[];
        customQueries?: string[];
    }
    export interface IJsonDataSourceWizardState {
        dataSourceName?: string;
        jsonScheme?: string;
        rootElement?: string;
        jsonSource?: string;
        newConnectionName?: string;
        connectionName?: string;
    }
    export interface IObjectDataSourceWizardState {
        dataSourceName?: string;
        selectedType?: string;
        dataMember?: DevExpress.Analytics.Data.ObjectDataMember;
        ctor?: DevExpress.Analytics.Data.ObjectCtor;
        context?: string;
        selectedObjectType?: DevExpress.Analytics.Data.ObjectType;
    }
    export interface IFederationDataSourceWizardState {
        name?: string;
        federationDataSourceJSON?: string;
        relations?: string[];
        federatedQueries?: string[];
    }
    export interface IDataSourceWizardState {
        dataSourceType?: DevExpress.Analytics.Wizard.DataSourceType;
        sqlDataSourceWizard?: DevExpress.Analytics.Wizard.ISqlDataSourceWizardState;
        jsonDataSourceWizard?: DevExpress.Analytics.Wizard.IJsonDataSourceWizardState;
        objectDataSourceWizard?: DevExpress.Analytics.Wizard.IObjectDataSourceWizardState;
        federationDataSourceWizard?: DevExpress.Analytics.Wizard.IFederationDataSourceWizardState;
        dataSourceId?: string;
        predefinedDataSourceName?: string;
    }
    export let _restoreSqlDataSourceFromState: (state?: DevExpress.Analytics.Wizard.ISqlDataSourceWizardState, requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper, dataSourceId?: string) => DevExpress.Analytics.Wizard._SqlDataSourceWrapper;
    export const _setRestoreSqlDataSourceFromState: (func: (state?: DevExpress.Analytics.Wizard.ISqlDataSourceWizardState, requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper, dataSourceId?: string) => DevExpress.Analytics.Wizard._SqlDataSourceWrapper) => void;
    export const _resetRestoreSqlDataSourceFromState: () => void;
    export const _restoreFederationDataSourceFromState: (state: DevExpress.Analytics.Wizard.IFederationDataSourceWizardState, usedDataSources: ko.ObservableArray<DevExpress.Analytics.Internal.IDataSourceInfo> | ko.Computed<DevExpress.Analytics.Internal.IDataSourceInfo[]>, dataSourceId?: string) => DevExpress.Analytics.Data.FederationDataSource;
    export let _restoreJsonDataSourceFromState: (state: DevExpress.Analytics.Wizard.IJsonDataSourceWizardState, requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper, dataSourceId?: string) => DevExpress.Analytics.Data.JsonDataSource;
    export function _setRestoreJsonDataSourceFromState(func: (state: DevExpress.Analytics.Wizard.IJsonDataSourceWizardState, requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper, dataSourceId?: string) => DevExpress.Analytics.Data.JsonDataSource): void;
    export function _resetRestoreJsonDataSourceFromState(): void;
    export function _restoreObjectDataSourceFromState(state: DevExpress.Analytics.Wizard.IObjectDataSourceWizardState, requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper, dataSourceId?: string): DevExpress.Analytics.Data.ObjectDataSource;
    export function _createDefaultDataSourceWizardState(sqlDataSourceWizardState?: DevExpress.Analytics.Wizard.ISqlDataSourceWizardState, jsonDataSourceWizardState?: DevExpress.Analytics.Wizard.IJsonDataSourceWizardState, objectDataSourceWizardState?: DevExpress.Analytics.Wizard.IObjectDataSourceWizardState, federationDataSourceWizardState?: DevExpress.Analytics.Wizard.IFederationDataSourceWizardState): DevExpress.Analytics.Wizard.IDataSourceWizardState;
    export interface IConnectionStringDefinition {
        name: string;
        description?: string;
    }
    export interface IDataSourceWizardConnectionStrings {
        sql: ko.ObservableArray<DevExpress.Analytics.Wizard.IConnectionStringDefinition>;
        json?: ko.ObservableArray<DevExpress.Analytics.Wizard.IConnectionStringDefinition>;
    }
    /// <reference types="jquery" />
    export class _WrappedWizardPage extends Disposable {
        pageId: string;
        page: DevExpress.Analytics.Wizard.IWizardPage;
        template: string;
        description?: string;
        dispose(): void;
        resetCommitedState(): void;
        private _lastCommitedState;
        private _isInitialized;
        private _initDef;
        isChanged: boolean;
        onChange: (callback: () => void) => void;
        constructor(pageId: string, page: DevExpress.Analytics.Wizard.IWizardPage, template: string, description?: string);
        commit(): JQueryPromise<any>;
        initialize(state: any, force?: boolean, stateChanged?: boolean): JQueryPromise<any>;
    }
    export class StateManager {
        private globalState;
        private pageFactory;
        private defaultState;
        private _getPageState;
        constructor(globalState: any, pageFactory: DevExpress.Analytics.Wizard.PageFactory);
        setPageState(pageId: string, data: any): void;
        getPageState(pageId: string): any;
        resetPageState(pageId: string): void;
        getCurrentState(): any;
        reset(): void;
    }
    /// <reference types="jquery" />
    export class PageIterator<T = any> extends Disposable {
        pageFactory: DevExpress.Analytics.Wizard.PageFactory;
        stateManager: DevExpress.Analytics.Wizard.StateManager;
        private _onResetPage;
        dispose(): void;
        private _pages;
        private _currentIndex;
        private __resetPages;
        private _nextPage;
        private _getNextExistingPage;
        _resetPages(): void;
        private _getNextNewPage;
        constructor(pageFactory: DevExpress.Analytics.Wizard.PageFactory, stateManager: DevExpress.Analytics.Wizard.StateManager, _onResetPage?: (page: DevExpress.Analytics.Wizard._WrappedWizardPage) => void);
        _getStartPage(pageId?: string): DevExpress.Analytics.Wizard._WrappedWizardPage;
        _getNextPage(): JQueryPromise<DevExpress.Analytics.Wizard._WrappedWizardPage>;
        _getPreviousPage(): JQueryPromise<DevExpress.Analytics.Wizard._WrappedWizardPage>;
        _goToPage(pageId: string): JQueryPromise<DevExpress.Analytics.Wizard._WrappedWizardPage>;
        _getCurrentPage(): DevExpress.Analytics.Wizard._WrappedWizardPage;
        _getCurrentState(): T;
        getNextPageId(pageId?: string): string;
    }
    /// <reference types="jquery" />
    export class ChooseSqlConnectionPage extends WizardPageBase<DevExpress.Analytics.Wizard.ISqlDataSourceWizardState, DevExpress.Analytics.Wizard.ISqlDataSourceWizardState> {
        private _getSqlConnectionsCallback?;
        constructor(connectionStrings: ko.ObservableArray<DevExpress.Analytics.Wizard.IConnectionStringDefinition>, _getSqlConnectionsCallback?: () => JQueryPromise<DevExpress.Analytics.Wizard.IConnectionStringDefinition[]>);
        initialize(state: DevExpress.Analytics.Wizard.ISqlDataSourceWizardState): JQueryPromise<any>;
        canNext(): boolean;
        commit(): JQueryPromise<DevExpress.Analytics.Wizard.ISqlDataSourceWizardState>;
        _connectionStrings: ko.ObservableArray<DevExpress.Analytics.Wizard.IConnectionStringDefinition>;
        _selectedConnectionString: ko.ObservableArray<DevExpress.Analytics.Wizard.IConnectionStringDefinition>;
    }
    export function _registerChooseSqlConnectionPage(factory: DevExpress.Analytics.Wizard.PageFactory, connectionStrings: ko.ObservableArray<DevExpress.Analytics.Wizard.IConnectionStringDefinition>, getSqlConnectionsCallback?: () => JQueryPromise<DevExpress.Analytics.Wizard.IConnectionStringDefinition[]>): void;
    /// <reference types="jquery" />
    export interface IChooseAvailableItemPageOperation {
        text: string;
        createNew: boolean;
    }
    export class ChooseAvailableItemPage extends WizardPageBase {
        items: ko.Subscribable<any[]>;
        private _getJsonConnectionsCallback?;
        constructor(items: ko.Subscribable<any[]>, canCreateNew?: boolean, _getJsonConnectionsCallback?: () => JQueryPromise<DevExpress.Analytics.Wizard.IConnectionStringDefinition[]>);
        canNext(): boolean;
        canCreateNew: ko.Observable<boolean>;
        selectedItems: ko.ObservableArray<DevExpress.Analytics.Internal.IDataSourceInfo>;
        operations: IChooseAvailableItemPageOperation[];
        selectedOperation: ko.Observable<IChooseAvailableItemPageOperation>;
        _createNew: ko.PureComputed<boolean>;
        initialize(state: any): JQueryPromise<DevExpress.Analytics.Wizard.IWizardPage>;
        _displayExpr(item: any): string;
        _getSelectedItem(state?: any): DevExpress.Analytics.Internal.IDataSourceInfo;
        onDblClick(): void;
        get createNewOperationText(): string;
        get existingOperationText(): string;
    }
    /// <reference types="jquery" />
    export class ChooseJsonConnectionPage extends ChooseAvailableItemPage {
        commit(): JQuery.Promise<DevExpress.Analytics.Wizard.IJsonDataSourceWizardState, any, any>;
        _getSelectedItem(data: DevExpress.Analytics.Wizard.IJsonDataSourceWizardState): DevExpress.Analytics.Internal.IDataSourceInfo;
        get createNewOperationText(): any;
        get existingOperationText(): any;
    }
    export function _registerChooseJsonConnectionPage(factory: DevExpress.Analytics.Wizard.PageFactory, wizardOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions): void;
    /// <reference types="jquery" />
    export class ChooseJsonSchemaPage extends WizardPageBase<DevExpress.Analytics.Wizard.IJsonDataSourceWizardState, DevExpress.Analytics.Wizard.IJsonDataSourceWizardState> {
        private _requestWrapper;
        private _allowObjectRootElements;
        private _callbacks?;
        private _rootItems;
        private _fieldListItemsProvider;
        private _fieldSelectedPath;
        private _dataSource;
        private _cachedState;
        private _clear;
        private _createFieldListCallback;
        private _getSchemaToDataMemberInfo;
        private _mapJsonNodesToTreelistItems;
        private _getNodesByPath;
        private _getInnerItemsByPath;
        private _beginInternal;
        private _updatePage;
        private _createTreeNode;
        private _createLeafTreeNode;
        private _resetSelectionRecursive;
        private _mapJsonSchema;
        protected _filterRootElementList(rootElementList: DevExpress.Analytics.Utils.IPathRequest[], jsonSchema: DevExpress.Analytics.Data.JsonSchemaRootNode): DevExpress.Analytics.Utils.IPathRequest[];
        canNext(): boolean;
        canFinish(): boolean;
        constructor(_requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper, _allowObjectRootElements?: boolean, _callbacks?: DevExpress.Analytics.Wizard.Internal.IJsonDataSourceWizardCallbacks);
        commit(): JQuery.Promise<DevExpress.Analytics.Wizard.IJsonDataSourceWizardState, any, any>;
        initialize(state: DevExpress.Analytics.Wizard.IJsonDataSourceWizardState): JQuery.Promise<any, any, any>;
        reset(): void;
        _rootElementTitle: any;
        _rootElementList: ko.Observable<DevExpress.Analytics.Utils.IPathRequest[]>;
        _selectedRootElement: ko.Observable<DevExpress.Analytics.Utils.IPathRequest>;
        _fieldListModel: DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
    }
    export function _registerChooseJsonSchemaPage(factory: DevExpress.Analytics.Wizard.PageFactory, requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper, callbacks?: DevExpress.Analytics.Wizard.Internal.IJsonDataSourceWizardCallbacks): void;
    export interface IJsonDataSourceJsonSourcePageSettings extends IJsonDataSourceJsonSourceValidatable {
        isValid(): boolean;
        reset(): void;
        setValue(dataSource: DevExpress.Analytics.Data.JsonDataSource): void;
        isEmpty(): boolean;
        applySettings(dataSource: DevExpress.Analytics.Data.JsonDataSource): void;
        cssClass?: string | any;
        grid?: DevExpress.Analytics.Widgets.ObjectProperties;
    }
    export interface IJsonDataSourceJsonSourceValidatable {
        validationGroup?: {
            onInitialized: (args: any) => void;
            validate: () => any;
            onDisposing: (args: any) => void;
        };
        validationSummary?: {
            onInitialized: (args: any) => void;
            onDisposing: (args: any) => void;
        };
        _validatorsReady?: ko.Observable<boolean> | ko.Computed<boolean>;
        _validate?: () => void;
    }
    export interface IJsonDataSourceType {
        value: IJsonDataSourceJsonSourcePageSettings;
        displayValue: string;
        localizationId: string;
    }
    export const parameterTypeToPropertyMap: {
        [key: string]: string;
    };
    /// <reference types="jquery" />
    export class ChooseJsonSourcePage extends WizardPageBase<DevExpress.Analytics.Wizard.IJsonDataSourceWizardState, DevExpress.Analytics.Wizard.IJsonDataSourceWizardState> {
        private _requestWrapper;
        private _jsonStringSettings;
        private _jsonUriSetting;
        private __validationGroup;
        private __validationSummary;
        private _onValidationGroupInitialized;
        private _onValidationGroupDisposing;
        private _onValidationSummaryInitialized;
        private _onValidationSummaryDisposing;
        constructor(_requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper, itemsProvider?: DevExpress.Analytics.Utils.IItemsProvider);
        canNext(): boolean;
        commit(): JQuery.Promise<DevExpress.Analytics.Wizard.IJsonDataSourceWizardState, any, any>;
        initialize(state: DevExpress.Analytics.Wizard.IJsonDataSourceWizardState): JQuery.Promise<any, any, any>;
        _jsonSourceTitle: any;
        _jsonConnectionTitle: any;
        _connectionNameValidationRules: {
            type: string;
            readonly message: any;
        }[];
        _connectionName: ko.Observable<string>;
        _validationGroup: {
            onInitialized: (args: any) => void;
            onDisposing: (args: any) => void;
        };
        _validationSummary: {
            onInitialized: (args: any) => void;
            onDisposing: (args: any) => void;
        };
        _sources: Array<DevExpress.Analytics.Wizard.IJsonDataSourceType>;
        _selectedSource: ko.PureComputed;
    }
    export function _registerChooseJsonSourcePage(factory: DevExpress.Analytics.Wizard.PageFactory, requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper, getItemsProviderCallback?: any): void;
    /// <reference types="jquery" />
    export class ConfigureObjectDataSourceParametersPage extends WizardPageBase<DevExpress.Analytics.Wizard.IObjectDataSourceWizardState, DevExpress.Analytics.Wizard.IObjectDataSourceWizardState> {
        private _objectDataSource;
        _chooseObjectParameters: DevExpress.Analytics.Wizard.Internal.ChooseObjectMemberParameters;
        constructor(itemsProvider: DevExpress.Analytics.Utils.IItemsProvider);
        canNext(): boolean;
        canFinish(): boolean;
        commit(): JQueryPromise<DevExpress.Analytics.Wizard.IObjectDataSourceWizardState>;
        initialize(state: DevExpress.Analytics.Wizard.IObjectDataSourceWizardState): JQueryPromise<any>;
    }
    export function _registerConfigureObjectDataSourceParametersPage(factory: DevExpress.Analytics.Wizard.PageFactory, getItemsProviderCallback: () => DevExpress.Analytics.Utils.IItemsProvider): void;
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export class ConfigureQueryParametersPage extends WizardPageBase<DevExpress.Analytics.Wizard.ISqlDataSourceWizardState, DevExpress.Analytics.Wizard.ISqlDataSourceWizardState> {
        private parametersConverter;
        private _requestWrapper;
        private _sqlDataSourceWrapper;
        private _isParametersValid;
        constructor(parametersConverter: DevExpress.Analytics.Wizard.Internal.IParametersViewModelConverter, _requestWrapper: DevExpress.QueryBuilder.Utils.RequestWrapper);
        canNext(): boolean;
        canFinish(): boolean;
        getParameters(): any[];
        initialize(data: DevExpress.Analytics.Wizard.ISqlDataSourceWizardState): JQueryPromise<any>;
        commit(): JQuery.Promise<DevExpress.Analytics.Wizard.ISqlDataSourceWizardState, any, any>;
        removeButtonTitle: any;
        parametersEditorOptions: DevExpress.Analytics.Widgets.Internal.IKoCollectionEditorOptions;
    }
    export function _registerConfigureParametersPage(factory: DevExpress.Analytics.Wizard.PageFactory, requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper, parametersConverter?: DevExpress.Analytics.Wizard.Internal.IParametersViewModelConverter): void;
    /// <reference types="jquery" />
    export class ConfigureQueryPage extends WizardPageBase<DevExpress.Analytics.Wizard.ISqlDataSourceWizardState, DevExpress.Analytics.Wizard.ISqlDataSourceWizardState> {
        private _options;
        static QUERY_TEXT: string;
        static SP_TEXT: string;
        private _proceduresList;
        private _selectStatementControl;
        private _dataSourceWrapper;
        private _connection;
        private _dataSource;
        constructor(_options: DevExpress.Analytics.Wizard._DataSourceWizardOptions);
        canNext(): boolean;
        canFinish(): boolean;
        runQueryBuilder(): void;
        localizeQueryType(queryTypeString: string): string;
        initialize(state: DevExpress.Analytics.Wizard.ISqlDataSourceWizardState): JQueryPromise<any>;
        commit(): JQueryPromise<DevExpress.Analytics.Wizard.ISqlDataSourceWizardState>;
        queryNameCaption: () => string;
        queryControl: ko.Observable<DevExpress.Analytics.Wizard.Internal.ISqlQueryControl>;
        runQueryBuilderBtnText: ko.PureComputed<any>;
        placeholder: () => string;
        popupQueryBuilder: DevExpress.Analytics.Wizard.Internal.QueryBuilderPopup;
        queryName: ko.Observable<string>;
        queryTypeItems: string[];
        selectedQueryType: ko.Observable<string>;
        initialName: string;
    }
    export function _registerConfigureQueryPage(factory: DevExpress.Analytics.Wizard.PageFactory, dataSourceWizardOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions): void;
    export interface IWizardEventArgs<Sender> {
        wizard: Sender;
    }
    export interface IWizardPageEventArgs<Sender> extends IWizardEventArgs<Sender> {
        page: DevExpress.Analytics.Wizard.IWizardPage;
        pageId: string;
    }
    export interface IBeforeWizardPageInitializeEventArgs<Sender> extends IWizardPageEventArgs<Sender>, IBeforeWizardInitializeEventArgs<Sender> {
    }
    export interface IBeforeWizardInitializeEventArgs<Sender> extends IWizardEventArgs<Sender> {
        state: any;
    }
    export interface IBeforeWizardFinishEventArgs {
        state: any;
        wizardModel?: any;
    }
    export interface IAfterWizardFinishEventArgs {
        state: any;
        wizardResult?: any;
    }
    export interface IWizardEvents<Sender> {
        "afterInitialize": IWizardEventArgs<Sender>;
        "beforeInitialize": IBeforeWizardInitializeEventArgs<Sender>;
        "beforeStart": IWizardEventArgs<Sender>;
        "beforePageInitialize": IBeforeWizardPageInitializeEventArgs<Sender>;
        "afterPageInitialize": IWizardPageEventArgs<Sender>;
        "beforeFinish": IBeforeWizardFinishEventArgs;
        "afterFinish": IAfterWizardFinishEventArgs;
    }
    /// <reference types="jquery" />
    export class BaseWizard extends Disposable {
        pageFactory: DevExpress.Analytics.Wizard.PageFactory;
        stateManager: DevExpress.Analytics.Wizard.StateManager;
        iterator: DevExpress.Analytics.Wizard.PageIterator;
        events: DevExpress.Analytics.Utils.EventManager<BaseWizard, IWizardEvents<BaseWizard>>;
        private _finishCallback;
        protected _createLoadingState(page: DevExpress.Analytics.Wizard.IWizardPage): void;
        protected _createNextAction(page: DevExpress.Analytics.Wizard.IWizardPage): void;
        private _loadingTimeout;
        private _currentActivateCount;
        protected _loadingState(active: boolean): void;
        protected _callBeforeFinishHandler(state: any, wizardModel?: any): void;
        protected _callAfterFinishHandler(state: any, result: any): void;
        onFinish(): void;
        constructor(pageFactory: DevExpress.Analytics.Wizard.PageFactory, finishCallback?: (model: DevExpress.Analytics.Wizard.IDataSourceWizardState) => JQueryPromise<boolean>);
        initialize(state?: any, createIterator?: (pageFactory: DevExpress.Analytics.Wizard.PageFactory, stateManager: DevExpress.Analytics.Wizard.StateManager) => DevExpress.Analytics.Wizard.PageIterator): void;
        isFirstPage(): boolean;
        canNext(): boolean;
        canFinish(): boolean;
        _initPage(page: DevExpress.Analytics.Wizard._WrappedWizardPage): JQueryPromise<any>;
        start(): void;
        canRunWizard(): boolean;
        nextAction(): void;
        previousAction(): void;
        goToPage(pageId: string): void;
        finishAction(): void;
        isLoading: ko.Observable<boolean>;
        _currentPage: ko.Observable<DevExpress.Analytics.Wizard._WrappedWizardPage>;
        isVisible: ko.Observable<boolean>;
    }
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export class PopupWizard extends BaseWizard {
        static _getLoadPanelViewModel(element: HTMLElement, observableVisible: ko.Observable<boolean>): {
            animation: {
                show: {
                    type: string;
                    from: number;
                    to: number;
                    duration: number;
                };
                hide: {
                    type: string;
                    from: number;
                    to: number;
                    duration: number;
                };
            };
            deferRendering: boolean;
            message: any;
            visible: ko.Observable<boolean>;
            shading: boolean;
            shadingColor: string;
            position: {
                of: any;
            };
            container: any;
        };
        constructor(pageFactory: any, finishCallback?: any);
        start(): void;
        height: ko.Observable<number>;
        width: ko.Observable<number>;
        _extendCssClass: string;
        _container: (el: HTMLElement) => JQuery<HTMLElement>;
        itemsProvider: ko.Observable<DevExpress.Analytics.Utils.IItemsProvider>;
        nextButton: {
            text: any;
            disabled: ko.Computed<boolean>;
            onClick: () => void;
        };
        cancelButton: {
            text: any;
            onClick: () => void;
        };
        previousButton: {
            text: any;
            disabled: ko.Computed<boolean>;
            onClick: () => void;
        };
        finishButton: {
            text: any;
            type: string;
            disabled: ko.Computed<boolean>;
            onClick: () => void;
        };
        _wizardPopupPosition(element: HTMLElement): {
            of: any;
        };
        _loadPanelViewModel(element: HTMLElement): {
            animation: {
                show: {
                    type: string;
                    from: number;
                    to: number;
                    duration: number;
                };
                hide: {
                    type: string;
                    from: number;
                    to: number;
                    duration: number;
                };
            };
            deferRendering: boolean;
            message: any;
            visible: ko.Observable<boolean>;
            shading: boolean;
            shadingColor: string;
            position: {
                of: any;
            };
            container: any;
        };
        _getLoadPanelViewModel(element: HTMLElement, observableVisible: ko.Observable<boolean>): {
            animation: {
                show: {
                    type: string;
                    from: number;
                    to: number;
                    duration: number;
                };
                hide: {
                    type: string;
                    from: number;
                    to: number;
                    duration: number;
                };
            };
            deferRendering: boolean;
            message: any;
            visible: ko.Observable<boolean>;
            shading: boolean;
            shadingColor: string;
            position: {
                of: any;
            };
            container: any;
        };
        _titleTemplate: string;
        title: string;
    }
    /// <reference types="jquery" />
    export class _DataSourceWizardOptionsBase<T extends DevExpress.Analytics.Wizard.Internal.IDataSourceWizardCallbacks> {
        get jsonDataSourceAvailable(): boolean;
        get sqlDataSourceAvailable(): boolean;
        get objectDataSourceAvailable(): boolean;
        get canCreateDataSource(): boolean;
        get canRunWizard(): boolean;
        get federationDataSourceAvailable(): boolean;
        connectionStrings: DevExpress.Analytics.Wizard.IDataSourceWizardConnectionStrings;
        callbacks: T;
        rtl: boolean;
        requestWrapper: DevExpress.QueryBuilder.Utils.RequestWrapper;
        disableCustomSql: boolean;
        wizardSettings: IDataSourceWizardSettings;
        queryName: string;
        allowCreateNewJsonConnection: boolean;
        dataSources: ko.PureComputed<DevExpress.Analytics.Internal.IDataSourceInfo[]>;
        predefinedDataSources: ko.PureComputed<DevExpress.Analytics.Internal.IDataSourceInfo[]> | ko.Observable<DevExpress.Analytics.Internal.IDataSourceInfo[]>;
        getSqlConnectionStrings?: () => JQueryPromise<DevExpress.Analytics.Wizard.IConnectionStringDefinition[]>;
        getJsonConnectionStrings?: () => JQueryPromise<DevExpress.Analytics.Wizard.IConnectionStringDefinition[]>;
    }
    export class _DataSourceWizardOptions extends _DataSourceWizardOptionsBase<DevExpress.Analytics.Wizard.Internal.IDataSourceWizardCallbacks> {
    }
    export interface IDataSourceWizardSettings {
        enableJsonDataSource?: boolean;
        enableSqlDataSource?: boolean;
        enableObjectDataSource?: boolean;
        enableFederationDataSource?: boolean;
    }
    export class DataSourceWizardSettings implements IDataSourceWizardSettings {
        createDefault(settings?: IDataSourceWizardSettings): IDataSourceWizardSettings;
        enableJsonDataSource?: boolean;
        enableSqlDataSource?: boolean;
        enableObjectDataSource?: boolean;
        enableFederationDataSource?: boolean;
    }
    export interface IRetrieveQuerySqlCallback {
        (query: DevExpress.Analytics.Data.TableQuery, isInProcess: ko.Observable<boolean>): JQueryPromise<DevExpress.QueryBuilder.Utils.ISelectStatementResponse>;
    }
    export class DataSourceWizardPageIterator extends PageIterator {
        private _dataSourceWizardOptions;
        constructor(pageFactory: DevExpress.Analytics.Wizard.PageFactory, stateManager: DevExpress.Analytics.Wizard.StateManager, _dataSourceWizardOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions);
        getNextPageId(pageId: string): string;
    }
    export class DataSourceWizard extends PopupWizard {
        private _wizardOptions;
        constructor(pageFactory: DevExpress.Analytics.Wizard.PageFactory, _wizardOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions);
        initialize(state: DevExpress.Analytics.Wizard.IDataSourceWizardState, createIterator?: (pageFactory: DevExpress.Analytics.Wizard.PageFactory, stateManager: DevExpress.Analytics.Wizard.StateManager) => DevExpress.Analytics.Wizard.PageIterator): void;
        canRunWizard(): boolean;
        _extendCssClass: string;
        title: any;
    }
    export function _registerDataSourceWizardPages(factory: DevExpress.Analytics.Wizard.PageFactory, dataSourceWizardOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions): DevExpress.Analytics.Wizard.PageFactory;
    export function _createDataSourceWizard(factory: DevExpress.Analytics.Wizard.PageFactory, dataSourceWizardOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions): DataSourceWizard;
    export interface IWizardPageSectionMetadata<T extends DevExpress.Analytics.Wizard.IWizardPage> extends IWizardPageMetadata<T> {
        position?: number;
        disabledText?: string;
        recreate?: boolean;
        onChange?: () => void;
        required?: boolean;
    }
    /// <reference types="jquery" />
    export class ChooseAvailableDataSourcePage extends ChooseAvailableItemPage {
        commit(): JQuery.Promise<DevExpress.Analytics.Wizard.IDataSourceWizardState>;
        _getSelectedItem(state: DevExpress.Analytics.Wizard.IDataSourceWizardState): DevExpress.Analytics.Internal.IDataSourceInfo;
        canNext(): boolean;
        canFinish(): boolean;
    }
    export function _registerChooseAvailableDataSourcePage(factory: DevExpress.Analytics.Wizard.PageFactory, wizardOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions): void;
    export interface IFullscreenWizardPageMetadata<T extends DevExpress.Analytics.Wizard.IWizardPage> extends IWizardPageMetadata<T> {
        navigationPanelText?: string;
    }
    export class FullscreenWizardPageFactory extends PageFactory {
        registerMetadata<T extends DevExpress.Analytics.Wizard.IWizardPage>(pageId: string, metadata: IFullscreenWizardPageMetadata<T>): void;
        getMetadata(key: string): IFullscreenWizardPageMetadata<DevExpress.Analytics.Wizard.IWizardPage>;
        metadata: {
            [key: string]: IFullscreenWizardPageMetadata<DevExpress.Analytics.Wizard.IWizardPage>;
        };
    }
    /// <reference types="jquery" />
    export class SpecifyObjectDataSourceSettingsPage extends WizardPageBase<DevExpress.Analytics.Wizard.IDataSourceWizardState, DevExpress.Analytics.Wizard.IObjectDataSourceWizardState> {
        private _dataSourceWizardOptions;
        private _types;
        private _sections;
        private _objectDataSource;
        private _provider;
        private _chooseObjectType;
        private _chooseObjectDataMember;
        private _chooseObjectParameters;
        private _context;
        private _initSections;
        private showDescription;
        constructor(_dataSourceWizardOptions: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions);
        canNext(): boolean;
        canFinish(): boolean;
        commit(): JQuery.Promise<DevExpress.Analytics.Wizard.IObjectDataSourceWizardState, any, any>;
        initialize(state: DevExpress.Analytics.Wizard.IDataSourceWizardState): JQuery.Promise<any, any, any>;
    }
    export function _registerSpecifyObjectDataSourceSettingsPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, dataSourceWizardOptions: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions): void;
    /// <reference types="jquery" />
    export class MasterDetailRelationshipsPageBase<TState = any, TResult = any> extends WizardPageBase<TState, TResult> {
        private _getResultSchema;
        private _getResultSet;
        protected _resultSet: DevExpress.Analytics.Data.ResultSet;
        protected relationsSubscription: ko.Subscription;
        protected _relations: ko.ObservableArray<DevExpress.Analytics.Data.MasterDetailRelation>;
        protected _dataSource(): DevExpress.Analytics.Data.IDataSourceBase;
        protected _restoreDataSource(state: TState): void;
        protected _updateRelations(): void;
        constructor(_getResultSchema: (dataSource: DevExpress.Analytics.Data.IDataSourceBase, queryName?: string, relationsEditing?: boolean) => JQueryPromise<DevExpress.QueryBuilder.Utils.IRebuildSchemaResponse>);
        canNext(): boolean;
        canFinish(): boolean;
        initialize(state: TState): JQueryPromise<DevExpress.Analytics.Data.ResultSet>;
        dispose(): void;
        _customResetOptions: () => undefined;
        _relationsEditor: ko.Observable<DevExpress.QueryBuilder.Widgets.Internal.MasterDetailEditor>;
    }
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export class FederatedMasterDetailRelationshipsPage extends MasterDetailRelationshipsPageBase<DevExpress.Analytics.Wizard.IFederationDataSourceWizardState, DevExpress.Analytics.Wizard.IFederationDataSourceWizardState> {
        private _options;
        private _federationDataSource;
        protected _restoreDataSource(state: DevExpress.Analytics.Wizard.IFederationDataSourceWizardState): void;
        protected _dataSource(): DevExpress.Analytics.Data.IDataSourceBase;
        constructor(federationDataSourceResultSchema: (dataSource: DevExpress.Analytics.Data.FederationDataSource) => JQueryPromise<{
            resultSchemaJSON: string;
        }>, _options: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions);
        commit(): JQuery.Promise<DevExpress.Analytics.Wizard.IFederationDataSourceWizardState, any, any>;
        _customResetOptions: () => undefined;
        _relationsEditor: ko.Observable<DevExpress.QueryBuilder.Widgets.Internal.MasterDetailEditor>;
    }
    export function _registerFederatedMasterDetailRelationshipsPage(factory: DevExpress.Analytics.Wizard.PageFactory, federationDataSourceResultSchema: (dataSource: DevExpress.Analytics.Data.FederationDataSource) => JQueryPromise<{
        resultSchemaJSON: string;
    }>, wizardOptions: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions): void;
    /// <reference types="jquery" />
    export class FederatedQueryConfigurePage extends WizardPageBase<DevExpress.Analytics.Wizard.IFederationDataSourceWizardState, DevExpress.Analytics.Wizard.IFederationDataSourceWizardState> {
        private _options;
        private _selectedPath;
        private _itemsProvider;
        private _customQueries;
        private _setQueryChecked;
        private _wrapFieldListCallback;
        constructor(_options: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions);
        canNext(): boolean;
        canFinish(): boolean;
        _createTreeListFactory(): DevExpress.Analytics.Wizard.Internal.MultiQueryTreeListItemFactory;
        _loadPanelViewModel(element: HTMLElement): {
            animation: any;
            message: any;
            visible: any;
            shading: any;
            shadingColor: any;
            position: any;
            container: any;
        };
        commit(): JQuery.Promise<DevExpress.Analytics.Wizard.IFederationDataSourceWizardState>;
        initialize(state: DevExpress.Analytics.Wizard.ISqlDataSourceWizardState): JQuery.Promise<DevExpress.QueryBuilder.Utils.ISqlQueryViewModel>;
        _queriesPopupHelper: DevExpress.QueryBuilder.Widgets.Internal.FederatedQueriesHelper;
        _fieldListProvider: DevExpress.Analytics.Internal.FieldListProvider;
        _getItemsAfterCheck: (node: DevExpress.Analytics.Wizard.Internal.TreeNode) => any;
        _dataSources: ko.ObservableArray<DevExpress.Analytics.Internal.IDataSourceInfo>;
        _dataSource: DevExpress.Analytics.Data.FederationDataSource;
        _scrollViewHeight: string;
        _fieldListModel: ko.Observable<DevExpress.Analytics.Widgets.Internal.ITreeListOptions>;
        _isDataLoadingInProcess: ko.Observable<boolean>;
        _customizeDBSchemaTreeListActions: (item: DevExpress.Analytics.Utils.IDataMemberInfo, actions: DevExpress.Analytics.Utils.IAction[]) => void;
    }
    export function _registerFederatedQueryConfigurePage(factory: DevExpress.Analytics.Wizard.PageFactory, wizardOptions: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions): void;
    /// <reference types="jquery" />
    export class ConfigureMasterDetailRelationshipsPage extends MasterDetailRelationshipsPageBase<DevExpress.Analytics.Wizard.ISqlDataSourceWizardState, DevExpress.Analytics.Wizard.ISqlDataSourceWizardState> {
        private _sqlDataSourceWrapper;
        protected _restoreDataSource(state: DevExpress.Analytics.Wizard.ISqlDataSourceWizardState): void;
        protected _dataSource(): DevExpress.Analytics.Data.IDataSourceBase;
        commit(): JQueryPromise<DevExpress.Analytics.Wizard.ISqlDataSourceWizardState>;
        _customResetOptions: () => undefined;
        _relationsEditor: ko.Observable<DevExpress.QueryBuilder.Widgets.Internal.MasterDetailEditor>;
    }
    export function _registerConfigureMasterDetailRelationshipsPage(factory: DevExpress.Analytics.Wizard.PageFactory, sqlDataSourceResultSchema: (dataSource: DevExpress.Analytics.Data.SqlDataSource, queryName?: string, relationsEditing?: boolean) => JQueryPromise<DevExpress.QueryBuilder.Utils.IRebuildSchemaResponse>): void;
    export const AutoQueryPreload: DevExpress.Analytics.IGlobalSubscribableValue<boolean>;
    /// <reference types="jquery" />
    export class MultiQueryConfigurePage extends WizardPageBase<DevExpress.Analytics.Wizard.ISqlDataSourceWizardState, DevExpress.Analytics.Wizard.ISqlDataSourceWizardState> {
        private _options;
        private _callbacks;
        private _selectedPath;
        private _itemsProvider;
        private _customQueries;
        private _checkedQueries;
        private _sqlTextProvider;
        private _sqlDataSourceWrapper;
        private _dataSource;
        private _dataConnection;
        private _addQueryAlgorithm;
        private _addQueryFromTables;
        private _addQueryFromStoredProcedures;
        private _addQueryFromCustomQueries;
        private _getItemsPromise;
        private _resetDataSourceResult;
        private _setQueryCore;
        static _pushQuery(newQuery: DevExpress.QueryBuilder.Utils.ISqlQueryViewModel, node: DevExpress.Analytics.Wizard.Internal.TreeLeafNode, queries: ko.ObservableArray<DevExpress.QueryBuilder.Utils.ISqlQueryViewModel>): void;
        static _removeQuery(queries: ko.ObservableArray<DevExpress.QueryBuilder.Utils.ISqlQueryViewModel>, node: any): void;
        constructor(_options: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions);
        canNext(): boolean;
        canFinish(): boolean;
        _showStatementPopup: (query: any) => void;
        _AddQueryWithBuilder(): void;
        _runQueryBuilder(): void;
        _loadPanelViewModel(element: HTMLElement): {
            animation: {
                show: {
                    type: string;
                    from: number;
                    to: number;
                    duration: number;
                };
                hide: {
                    type: string;
                    from: number;
                    to: number;
                    duration: number;
                };
            };
            deferRendering: boolean;
            message: any;
            visible: ko.Observable<boolean>;
            shading: boolean;
            shadingColor: string;
            position: {
                of: any;
            };
            container: any;
        };
        _setTableQuery(query: DevExpress.Analytics.Data.TableQuery, isInProcess?: ko.Observable<boolean>): JQueryPromise<DevExpress.QueryBuilder.Utils.ISelectStatementResponse>;
        _setCustomSqlQuery(query: DevExpress.Analytics.Data.CustomSqlQuery): void;
        _createTreeListFactory(): DevExpress.Analytics.Wizard.Internal.MultiQueryTreeListItemFactory;
        _showQbCallBack: (name?: any, isCustomQuery?: boolean) => void;
        commit(): JQueryPromise<DevExpress.Analytics.Wizard.ISqlDataSourceWizardState>;
        initialize(state: DevExpress.Analytics.Wizard.ISqlDataSourceWizardState): JQueryPromise<any>;
        _popupSelectStatement: {
            isVisible: ko.Observable<boolean>;
            title: () => string;
            query: any;
            data: ko.Observable<any>;
            okButtonText: () => string;
            okButtonHandler: (e: any) => void;
            aceOptions: {
                showLineNumbers: boolean;
                showPrintMargin: boolean;
                enableBasicAutocompletion: boolean;
                enableLiveAutocompletion: boolean;
                readOnly: boolean;
                highlightSelectedWord: boolean;
                showGutter: boolean;
                highlightActiveLine: boolean;
            };
            aceAvailable: any;
            additionalOptions: {
                onChange: (session: any) => void;
                onValueChange: (editor: any) => void;
                changeTimeout: number;
                overrideEditorFocus: boolean;
                setUseWrapMode: boolean;
            };
            languageHelper: {
                getLanguageMode: () => string;
                createCompleters: () => any[];
            };
            closest(element: HTMLElement, parentSelector: string): JQuery;
        };
        _customResetOptions: () => undefined;
        _queryEditIndex: ko.Observable<number>;
        disableCustomSql: boolean;
        _scrollViewHeight: string;
        _getItemsAfterCheck: (node: DevExpress.Analytics.Wizard.Internal.TreeNode) => any;
        _fieldListModel: ko.Observable<DevExpress.Analytics.Widgets.Internal.ITreeListOptions>;
        _popupQueryBuilder: DevExpress.Analytics.Wizard.Internal.QueryBuilderPopup;
        _customizeDBSchemaTreeListActions: (item: DevExpress.Analytics.Utils.IDataMemberInfo, actions: DevExpress.Analytics.Utils.IAction[]) => void;
        _hasParametersToEdit: ko.Computed<boolean>;
        _isDataLoadingInProcess: ko.Observable<boolean>;
    }
    export function _registerMultiQueryConfigurePage(factory: DevExpress.Analytics.Wizard.PageFactory, wizardOptions: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions): void;
    /// <reference types="jquery" />
    export function _canEditQueryParameters(query: DevExpress.QueryBuilder.Utils.ISqlQueryViewModel, customQueries: DevExpress.QueryBuilder.Utils.ISqlQueryViewModel[]): boolean;
    export class MultiQueryConfigureParametersPage extends WizardPageBase<DevExpress.Analytics.Wizard.ISqlDataSourceWizardState, DevExpress.Analytics.Wizard.ISqlDataSourceWizardState> {
        private parametersConverter;
        private _requestWrapper;
        private _sqlDataSourceWrapper;
        private _selectedPath;
        private _isParametersValid;
        private _rootItems;
        private _createNewParameter;
        canNext(): boolean;
        canFinish(): boolean;
        constructor(parametersConverter: DevExpress.Analytics.Wizard.Internal.IParametersViewModelConverter, _requestWrapper: DevExpress.QueryBuilder.Utils.RequestWrapper);
        _getParameters(): any;
        initialize(state: DevExpress.Analytics.Wizard.ISqlDataSourceWizardState): JQueryPromise<any>;
        commit(): JQueryPromise<DevExpress.Analytics.Wizard.ISqlDataSourceWizardState>;
        _scrollViewHeight: string;
        _fieldListModel: ko.Observable<DevExpress.Analytics.Widgets.Internal.ITreeListOptions>;
        _removeButtonTitle: any;
        _parametersEditorOptions: DevExpress.Analytics.Widgets.Internal.IKoCollectionEditorOptions;
    }
    export function _registerMultiQueryConfigureParametersPage(factory: DevExpress.Analytics.Wizard.PageFactory, requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper, parametersConverter?: DevExpress.Analytics.Wizard.Internal.IParametersViewModelConverter): void;
    /// <reference types="jquery" />
    export class ChooseObjectDataSourceDataMembersPage extends WizardPageBase<DevExpress.Analytics.Wizard.IObjectDataSourceWizardState, DevExpress.Analytics.Wizard.IObjectDataSourceWizardState> {
        private _requestWrapper;
        constructor(_requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper);
        private _objectDataSource;
        private _type;
        private _ctor;
        _chooseObjectDataMember: DevExpress.Analytics.Wizard.Internal.ChooseObjectDataMembers;
        initialize(state: DevExpress.Analytics.Wizard.IObjectDataSourceWizardState): JQueryPromise<any>;
        canNext(): boolean;
        canFinish(): boolean;
        commit(): JQueryPromise<DevExpress.Analytics.Wizard.IObjectDataSourceWizardState>;
        private get _selectedDataMember();
        private get _needParametersPage();
    }
    export function _registerChooseObjectDataSourceDataMembersPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, dataSourceWizardOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions): void;
    /// <reference types="jquery" />
    export class ChooseObjectDataSourceTypesPage extends WizardPageBase<DevExpress.Analytics.Wizard.IObjectDataSourceWizardState, DevExpress.Analytics.Wizard.IObjectDataSourceWizardState> {
        private _requestWrapper;
        constructor(_requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper);
        private _objectDataSource;
        private _types;
        private _provider;
        _chooseObjectType: DevExpress.Analytics.Wizard.Internal.ChooseObjectTypes;
        canNext(): boolean;
        canFinish(): boolean;
        commit(): JQueryPromise<DevExpress.Analytics.Wizard.IObjectDataSourceWizardState>;
        initialize(state: DevExpress.Analytics.Wizard.IObjectDataSourceWizardState): JQueryPromise<any>;
        private get _selectedTypeName();
    }
    export function _registerChooseObjectDataSourceTypesPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, dataSourceWizardOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions): void;
    export class _MultiQueryDataSourceWizardOptions extends _DataSourceWizardOptionsBase<DevExpress.Analytics.Wizard.Internal.IMultiQueryDataSourceWizardCallbacks> {
    }
    export class MultiQueryDataSourceWizard extends PopupWizard {
        private _wizardOptions;
        constructor(pageFactory: DevExpress.Analytics.Wizard.PageFactory, _wizardOptions: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions);
        canRunWizard(): boolean;
        initialize(state: DevExpress.Analytics.Wizard.IDataSourceWizardState, createIterator?: (pageFactory: DevExpress.Analytics.Wizard.PageFactory, stateManager: DevExpress.Analytics.Wizard.StateManager) => DevExpress.Analytics.Wizard.PageIterator): void;
        title: any;
        _extendCssClass: string;
    }
    export class MultiQueryDataSourceWizardPageIterator<T extends DevExpress.Analytics.Wizard.IDataSourceWizardState = DevExpress.Analytics.Wizard.IDataSourceWizardState> extends PageIterator<T> {
        private _wizardOptions;
        constructor(pagesFactory: DevExpress.Analytics.Wizard.PageFactory, stateManager: DevExpress.Analytics.Wizard.StateManager, _wizardOptions: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions);
        getNextPageId(pageId?: string): string;
    }
    export function _registerMultiQueryDataSourcePages(factory: DevExpress.Analytics.Wizard.PageFactory, dataSourceWizardOptions: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions): DevExpress.Analytics.Wizard.PageFactory;
    export function _createMultiQueryDataSourceWizard(factory: DevExpress.Analytics.Wizard.PageFactory, dataSourceWizardOptions: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions): MultiQueryDataSourceWizard;
    export interface IWizardNavigationStep {
        pageIds: string[];
        currentPageId: string;
        clickAction: () => void;
        text: string;
        stepIndex: number;
        isActive: ko.Observable<boolean> | ko.Computed<boolean>;
        disabled: ko.Observable<boolean> | ko.Computed<boolean>;
        visible: ko.Observable<boolean> | ko.Computed<boolean>;
    }
    export class WizardNavigationPanel extends Disposable {
        constructor(wizard: DevExpress.Analytics.Wizard.FullscreenWizard);
        resetAll(): void;
        _currentStep(pageId: string): IWizardNavigationStep;
        _reset(pageId: string): void;
        _resetNextPages(pageId: string): void;
        _setStepVisible(currentPageIndex: number): void;
        _steps: Array<IWizardNavigationStep>;
        isVisible: ko.Computed<boolean>;
    }
    /// <reference types="jquery" />
    export interface IBeforeWizardSectionInitializeEventArgs<Sender> extends IWizardSectionEventArgs<Sender> {
        state: any;
    }
    export interface IWizardSectionEventArgs<Sender> {
        section: DevExpress.Analytics.Wizard.IWizardPage;
        sectionId: string;
        page: Sender;
    }
    export interface IWizardFullscreenPageEvents<Sender> {
        "beforeSectionInitialize": IBeforeWizardSectionInitializeEventArgs<Sender>;
        "afterSectionInitialize": IWizardSectionEventArgs<Sender>;
    }
    export class FullscreenWizardPage extends WizardPageBase {
        dispose(): void;
        private _patchOnChange;
        private _getPageStyle;
        private _sectionsToUnregister;
        private _sectionsToRegister;
        private _sectionPositions;
        private _applyCustomizations;
        protected _setSectionPosition(pageId: string, position?: DevExpress.Analytics.Wizard.Internal.WizardSectionPosition): void;
        constructor();
        registerSections(): void;
        canNext(): boolean;
        private _sectionCondition;
        canFinish(): boolean;
        setSectionPosition(sectionId: string, position?: DevExpress.Analytics.Wizard.Internal.WizardSectionPosition): void;
        registerSection(sectionId: string, metadata: DevExpress.Analytics.Wizard.IWizardPageMetadata<IWizardPage>): void;
        unregisterSection(sectionId: string): void;
        _loadPanelViewModel(element: HTMLElement): boolean;
        getNextSectionId(sectionId: string): any;
        initialize(state: DevExpress.Analytics.Wizard.IDataSourceWizardState, stateChanged?: boolean): JQuery.Promise<any>;
        _beforeStart(): void;
        commit(): JQuery.Promise<any>;
        _getPageDescription(index: number, page: DevExpress.Analytics.Wizard.Internal.WizardPageSection): string;
        _showPageDescription(page?: DevExpress.Analytics.Wizard.Internal.WizardPageSection): boolean;
        _initInProgress: ko.Observable<boolean>;
        _defaultMargin: number;
        _parentMarginOffset: number;
        _className: string;
        _sections: DevExpress.Analytics.Wizard.Internal.WizardPageSection[];
        _pageCss: {
            [key: string]: ko.Observable<DevExpress.Analytics.Wizard.Internal.IWizardPageStyle>;
        };
        _factory: DevExpress.Analytics.Wizard.Internal.WizardPageSectionFactory;
        _stateManager: DevExpress.Analytics.Wizard.StateManager;
        _sectionsProcessor: DevExpress.Analytics.Wizard.Internal.WizardPageProcessor;
        events: DevExpress.Analytics.Utils.EventManager<FullscreenWizardPage, IWizardFullscreenPageEvents<FullscreenWizardPage>>;
    }
    /// <reference types="jquery" />
    export class FullscreenWizard extends PopupWizard {
        private _onCloseCallback;
        constructor(pageFactory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, finishCallback?: any);
        _onClose(callback: any): void;
        onFinish(): void;
        _initPage(page: any): JQueryPromise<any>;
        _onResetPage(page: DevExpress.Analytics.Wizard._WrappedWizardPage): void;
        start(finishCallback?: (model: any) => JQueryPromise<boolean>): void;
        _pageDescription(): string;
        _description(): string;
        navigationPanel: ko.Observable<DevExpress.Analytics.Wizard.WizardNavigationPanel>;
        _steps: DevExpress.Analytics.Wizard.FullscreenWizardPage[];
        _extendCssClass: string;
        pageFactory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory;
    }
    export class SelectDataSourcePage extends FullscreenWizardPage {
        private wizardOptions;
        private dataSources;
        constructor(wizardOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions, dataSources: DevExpress.Analytics.Internal.IDataSourceInfo[]);
        registerSections(): void;
        showPredefinedDataSourceSection(): boolean;
        showChooseDataSourceTypeSection(): boolean;
        getNextSectionId(sectionId: string): string;
        disabledSectionText: any;
    }
    export function _registerSelectDataSourcePage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, wizardOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions): void;
    export class SpecifyFederationDataSourceSettingsPage extends FullscreenWizardPage {
        protected _dataSourceWizardOptions: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions;
        constructor(_dataSourceWizardOptions: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions);
        getNextSectionId(sectionId: string): string;
        _showPageDescription(): boolean;
        registerSections(): void;
    }
    export function _registerSpecifyFederationDataSourceSettingsPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, dataSourceWizardOptions: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions): void;
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export class SpecifyJsonConnectionPage extends ChooseJsonConnectionPage {
        private _requestWrapper;
        constructor(connections: any, allowCreateNewJsonConnection: any, itemsProvider?: DevExpress.Analytics.Utils.IItemsProvider, _requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper, _getJsonConnectionsCallback?: () => JQueryPromise<DevExpress.Analytics.Wizard.IConnectionStringDefinition[]>);
        commit(): JQuery.Promise<DevExpress.Analytics.Wizard.IJsonDataSourceWizardState, any, any>;
        canNext(): boolean;
        initialize(state: any): JQuery.Promise<DevExpress.Analytics.Wizard.IWizardPage, any, any>;
        _specifySourceData: DevExpress.Analytics.Wizard.ChooseJsonSourcePage;
    }
    export function _registerSpecifyJsonConnectionPage(factory: DevExpress.Analytics.Wizard.PageFactory, connections: ko.ObservableArray<any>, allowCreateNewJsonConnection: boolean, getItemsProviderCallBack: () => DevExpress.Analytics.Utils.IItemsProvider, getJsonConnectionsCallback?: () => JQueryPromise<DevExpress.Analytics.Wizard.IConnectionStringDefinition[]>): void;
    export class SpecifyJsonDataSourceSettingsPage extends FullscreenWizardPage {
        private _dataSourceWizardOptions;
        constructor(_dataSourceWizardOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions);
        registerSections(): void;
        getNextSectionId(sectionId: string): string;
        canNext(): boolean;
    }
    export function _registerSpecifyJsonDataSourceSettingsPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, dataSourceWizardOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions): void;
    export class SpecifySqlDataSourceSettingsPage extends FullscreenWizardPage {
        private _dataSourceWizardOptions;
        constructor(_dataSourceWizardOptions: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions);
        getNextSectionId(sectionId: string): string | any[];
        registerSections(): void;
    }
    export function _registerSpecifySqlDataSourceSettingsPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, dataSourceWizardOptions: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions): void;
    export class FullscreenDataSourceWizard extends FullscreenWizard {
        private _dataSourceWizardOptions;
        constructor(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, _dataSourceWizardOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions);
        initialize(state: DevExpress.Analytics.Wizard.IDataSourceWizardState, createIterator?: (pageFactory: DevExpress.Analytics.Wizard.PageFactory, stateManager: DevExpress.Analytics.Wizard.StateManager) => DevExpress.Analytics.Wizard.PageIterator): void;
        canRunWizard(): boolean;
        _description(): string;
    }
    export class FullscreenDataSourceWizardPageIterator extends PageIterator {
        private _dataSourceOptions;
        constructor(factory: DevExpress.Analytics.Wizard.PageFactory, stateManager: DevExpress.Analytics.Wizard.StateManager, _dataSourceOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions, onResetPage: (page: DevExpress.Analytics.Wizard._WrappedWizardPage) => void);
        private _shouldSelectDataSource;
        getNextPageId(pageId?: string): string;
    }
    export function _createDataSourceFullscreenWizard(dataSourceWizardOptions: DevExpress.Analytics.Wizard._MultiQueryDataSourceWizardOptions): FullscreenDataSourceWizard;
}
declare module DevExpress.Analytics.Wizard.Internal {
    import SqlDataConnection = DevExpress.Analytics.Data.SqlDataConnection;
    import ISelectStatementResponse = DevExpress.QueryBuilder.Utils.ISelectStatementResponse;
    import TableQuery = DevExpress.Analytics.Data.TableQuery;
    import ISqlQueryViewModel = DevExpress.QueryBuilder.Utils.ISqlQueryViewModel;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import SelectQuerySqlTextProvider = DevExpress.Analytics.Wizard.Internal.SelectQuerySqlTextProvider;
    import ISqlQueryControl = DevExpress.Analytics.Wizard.Internal.ISqlQueryControl;
    import StoredProcQuery = DevExpress.Analytics.Data.StoredProcQuery;
    import DBStoredProcedure = DevExpress.Analytics.Data.DBStoredProcedure;
    import IItemsProvider = DevExpress.Analytics.Utils.IItemsProvider;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    import TreeNode = DevExpress.Analytics.Wizard.Internal.TreeNode;
    import ParameterTreeNode = DevExpress.Analytics.Wizard.Internal.ParameterTreeNode;
    import QueriesTreeNode = DevExpress.Analytics.Wizard.Internal.QueriesTreeNode;
    import TreeNodeBase = DevExpress.Analytics.Wizard.Internal.TreeNodeBase;
    import IDBSchemaProvider = DevExpress.Analytics.Data.IDBSchemaProvider;
    import IPathRequest = DevExpress.Analytics.Utils.IPathRequest;
    import IAction = DevExpress.Analytics.Utils.IAction;
    import DataSourceParameter = DevExpress.Analytics.Data.DataSourceParameter;
    import DBStoredProcedureArgument = DevExpress.Analytics.Data.DBStoredProcedureArgument;
    import IAddQueriesTreeListCallbacks = DevExpress.Analytics.Wizard.Internal.IAddQueriesTreeListCallbacks;
    import IPopoverListOptions = DevExpress.Analytics.Wizard.Internal.IPopoverListOptions;
    import DataMemberTreeNode = DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode;
    import FieldTreeNode = DevExpress.Analytics.Wizard.Internal.FieldTreeNode;
    import FieldListProvider = DevExpress.Analytics.Internal.FieldListProvider;
    import TreeNodeItemsProvider = DevExpress.Analytics.Wizard.Internal.TreeNodeItemsProvider;
    import Editor = DevExpress.Analytics.Widgets.Editor;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import IJsonDataSourceJsonSourceValidatable = DevExpress.Analytics.Wizard.IJsonDataSourceJsonSourceValidatable;
    import IJsonDataSourceJsonSourcePageSettings = DevExpress.Analytics.Wizard.IJsonDataSourceJsonSourcePageSettings;
    import ObjectProperties = DevExpress.Analytics.Widgets.ObjectProperties;
    import JsonDataSource = DevExpress.Analytics.Data.JsonDataSource;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import RequestWrapper = DevExpress.QueryBuilder.Utils.RequestWrapper;
    import JsonParameter = DevExpress.Analytics.Data.JsonParameter;
    import IModelAction = DevExpress.Analytics.Internal.IModelAction;
    import IModelActionProvider = DevExpress.Analytics.Internal.IModelActionProvider;
    import IExpressionOptions = DevExpress.Analytics.Widgets.IExpressionOptions;
    import ObjectCtor = DevExpress.Analytics.Data.ObjectCtor;
    import ObjectDataMember = DevExpress.Analytics.Data.ObjectDataMember;
    import ObjectDataSourceMethodBase = DevExpress.Analytics.Data.ObjectDataSourceMethodBase;
    import ObjectParameter = DevExpress.Analytics.Data.ObjectParameter;
    import ILocalizationInfo = DevExpress.Analytics.Internal.ILocalizationInfo;
    import ISerializableModel = DevExpress.Analytics.Utils.ISerializableModel;
    import UndoEngine = DevExpress.Analytics.Utils.UndoEngine;
    import IQueryBuilderOptions = DevExpress.Querybuilder.IQueryBuilderOptions;
    import IDataSourceBase = DevExpress.Analytics.Data.IDataSourceBase;
    import IDataSourceDBSchema = DevExpress.Analytics.Data.IDataSourceDBSchema;
    import SqlDataSource = DevExpress.Analytics.Data.SqlDataSource;
    import DbObjectDragDropHandler = DevExpress.QueryBuilder.Internal.DbObjectDragDropHandler;
    import QueryViewModel = DevExpress.QueryBuilder.Elements.QueryViewModel;
    import IRetrieveQuerySqlCallback = DevExpress.Analytics.Wizard.IRetrieveQuerySqlCallback;
    import IWizardPage = DevExpress.Analytics.Wizard.IWizardPage;
    import _WrappedWizardPage = DevExpress.Analytics.Wizard._WrappedWizardPage;
    import IWizardPageSectionMetadata = DevExpress.Analytics.Wizard.IWizardPageSectionMetadata;
    import PageFactory = DevExpress.Analytics.Wizard.PageFactory;
    import WrappedWizardPageSection = DevExpress.Analytics.Wizard.Internal.WrappedWizardPageSection;
    import WizardPageSectionFactory = DevExpress.Analytics.Wizard.Internal.WizardPageSectionFactory;
    import StateManager = DevExpress.Analytics.Wizard.StateManager;
    import WizardPageSectionIterator = DevExpress.Analytics.Wizard.Internal.WizardPageSectionIterator;
    import WizardPageSection = DevExpress.Analytics.Wizard.Internal.WizardPageSection;
    import EventManager = DevExpress.Analytics.Utils.EventManager;
    import IWizardEvents = DevExpress.Analytics.Wizard.IWizardEvents;
    import IDataSourceWizardState = DevExpress.Analytics.Wizard.IDataSourceWizardState;
    import ValueChangedEvent = DevExpress.ui.dxTextBox.ValueChangedEvent;
    import IDataSourceInfo = DevExpress.Analytics.Internal.IDataSourceInfo;
    import CodeResolver = DevExpress.Analytics.Internal.CodeResolver;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import KoTreeListItemFactory = DevExpress.Analytics.Widgets.Internal.KoTreeListItemFactory;
    import ITreeListOptions = DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
    import TreeListItemViewModel = DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
    import ITreeListItemViewModel = DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel;
    import FederationDataSource = DevExpress.Analytics.Data.FederationDataSource;
    import IRebuildSchemaResponse = DevExpress.QueryBuilder.Utils.IRebuildSchemaResponse;
    import _DataSourceWizardOptions = DevExpress.Analytics.Wizard._DataSourceWizardOptions;
    import BaseWizard = DevExpress.Analytics.Wizard.BaseWizard;
    import IBeforeWizardPageInitializeEventArgs = DevExpress.Analytics.Wizard.IBeforeWizardPageInitializeEventArgs;
    import IWizardPageEventArgs = DevExpress.Analytics.Wizard.IWizardPageEventArgs;
    import WizardPageProcessor = DevExpress.Analytics.Wizard.Internal.WizardPageProcessor;
    import WizardDragDropHandler = DevExpress.Analytics.Internal.WizardDragDropHandler;
    import PopupEditorBase = DevExpress.Analytics.Widgets.Internal.PopupEditorBase;
    import ResizeHelper = DevExpress.Analytics.Widgets.Internal.ResizeHelper;
    import getParentContainer = DevExpress.Analytics.Internal.getParentContainer;
    import IFederationQuery = DevExpress.QueryBuilder.Utils.IFederationQuery;
    import FederationTableViewModel = DevExpress.QueryBuilder.Internal.FederationTableViewModel;
    import SelectQuery = DevExpress.Analytics.Data.SelectQuery;
    import IQueryBuilderSurfaceCreator = DevExpress.QueryBuilder.Internal.IQueryBuilderSurfaceCreator;
    import FederationQueryBuilderPopupBase = DevExpress.Analytics.Wizard.Internal.FederationQueryBuilderPopupBase;
    import TransformQuery = DevExpress.Analytics.Data.TransformQuery;
    import UnionQuery = DevExpress.Analytics.Data.UnionQuery;
    import ObjectType = DevExpress.Analytics.Data.ObjectType;
    import TreeListController = DevExpress.Analytics.Widgets.Internal.TreeListController;
    import ObjectSchemaProvider = DevExpress.Analytics.Wizard.Internal.ObjectSchemaProvider;
    import IItemsExtender = DevExpress.Analytics.Internal.IItemsExtender;
    import PathRequest = DevExpress.Analytics.Utils.PathRequest;
    import IFederationQueryBuilderCallbacks = DevExpress.Analytics.Wizard.Internal.IFederationQueryBuilderCallbacks;
    import TreeListSearchOptions = DevExpress.Analytics.Widgets.Internal.TreeListSearchOptions;
    /// <reference types="jquery" />
    export class SelectQuerySqlTextProvider {
        private _selectStatementCallback;
        private _connection;
        constructor(_selectStatementCallback: (connection: DevExpress.Analytics.Data.SqlDataConnection, queryJSON: string) => JQueryPromise<DevExpress.QueryBuilder.Utils.ISelectStatementResponse>, _connection: () => DevExpress.Analytics.Data.SqlDataConnection);
        getQuerySqlText(newQuery: DevExpress.Analytics.Data.TableQuery): JQueryPromise<DevExpress.QueryBuilder.Utils.ISelectStatementResponse>;
    }
    /// <reference types="jquery" />
    export interface ISqlQueryControl {
        isNextDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
        isFinishDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
        setQuery: (query: DevExpress.QueryBuilder.Utils.ISqlQueryViewModel, isInProcess?: ko.Observable<boolean>) => JQueryPromise<any>;
        getQuery: () => DevExpress.QueryBuilder.Utils.ISqlQueryViewModel;
        runQueryBuilderDisabled: boolean;
    }
    export class SelectStatementQueryControl extends Disposable implements ISqlQueryControl {
        private _tableQueryString;
        private _query;
        private _needToCustomizeParameters;
        private _sqlTextProvider;
        constructor(sqlTextProvider: DevExpress.Analytics.Wizard.Internal.SelectQuerySqlTextProvider, disableCustomSql: any);
        template: string;
        aceOptions: {
            showLineNumbers: boolean;
            showPrintMargin: boolean;
            enableBasicAutocompletion: boolean;
            enableLiveAutocompletion: boolean;
            readOnly: boolean;
            highlightSelectedWord: boolean;
            showGutter: boolean;
            highlightActiveLine: boolean;
        };
        additionalOptions: {
            onChange: (session: any) => void;
            onValueChange: (editor: any) => void;
            changeTimeout: number;
            overrideEditorFocus: boolean;
            setUseWrapMode: boolean;
        };
        aceAvailable: any;
        languageHelper: {
            getLanguageMode: () => string;
            createCompleters: () => any[];
        };
        caption: () => any;
        sqlString: ko.PureComputed<string>;
        setQuery(query: DevExpress.QueryBuilder.Utils.ISqlQueryViewModel, isInProcess?: ko.Observable<boolean>): JQueryPromise<DevExpress.QueryBuilder.Utils.ISelectStatementResponse>;
        getQuery(): DevExpress.QueryBuilder.Utils.ISqlQueryViewModel;
        isNextDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
        isFinishDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
        get runQueryBuilderDisabled(): boolean;
        disableCustomSql: () => boolean;
    }
    /// <reference types="jquery" />
    export class StoredProceduresQueryControl extends Disposable implements ISqlQueryControl {
        private _query;
        private _needToProcessParameters;
        private static _availableConvertToParameter;
        private get _selectedProcedure();
        private set _selectedProcedure(value);
        constructor();
        template: string;
        storedProcedures: ko.ObservableArray<DevExpress.Analytics.Data.DBStoredProcedure>;
        selectedProcedure: ko.ObservableArray<DevExpress.Analytics.Data.DBStoredProcedure>;
        caption: () => any;
        generateStoredProcedureDisplayName: (procedure: any) => string;
        scrollActiveItem(e: any): void;
        static generateStoredProcedureDisplayName(procedure: DevExpress.Analytics.Data.DBStoredProcedure): string;
        setQuery(query: DevExpress.Analytics.Data.StoredProcQuery): JQuery.Promise<any, any, any>;
        getQuery(): DevExpress.Analytics.Data.StoredProcQuery;
        isNextDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
        isFinishDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
        get runQueryBuilderDisabled(): boolean;
    }
    /// <reference types="jquery" />
    export interface IAddQueriesTreeListCallbacks {
        deleteAction?: (name: string) => any;
        showQbCallBack?: (name?: string, isCustomQuery?: boolean) => any;
        disableCustomSql?: boolean;
    }
    export class DBSchemaItemsProvider extends Disposable implements IItemsProvider {
        private _callBack;
        private _tables;
        private _views;
        private _procedures;
        private _queries;
        private _customQueries;
        private _rootItems;
        constructor(dbSchemaProvider: DevExpress.Analytics.Data.IDBSchemaProvider, customQueries: ko.ObservableArray<DevExpress.Analytics.Data.TableQuery>, showQbCallBack: any, disableCustomSql: any, afterCheckToggled: (node: DevExpress.Analytics.Wizard.Internal.TreeNodeBase) => void);
        private _checkedRootNodesCount;
        getItems: (path: DevExpress.Analytics.Utils.IPathRequest) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
        hasCheckedItems: ko.PureComputed<boolean>;
        nextButtonDisabled: ko.PureComputed<boolean>;
        hasParametersToEdit: ko.PureComputed<boolean>;
        tables: () => DevExpress.Analytics.Wizard.Internal.TreeNode;
        views: () => DevExpress.Analytics.Wizard.Internal.TreeNode;
        procedures: () => DevExpress.Analytics.Wizard.Internal.ParameterTreeNode;
        queries: () => DevExpress.Analytics.Wizard.Internal.QueriesTreeNode;
        customQueries: () => ko.ObservableArray<DevExpress.QueryBuilder.Utils.ISqlQueryViewModel>;
    }
    export const defaultObjectDataSourceItemSpecifics: string;
    export class TreeNodeBase extends Disposable implements IDataMemberInfo {
        name: string;
        displayName: string;
        specifics: string;
        private _afterCheckToggled;
        constructor(name: string, displayName: string, specifics: string, isChecked?: boolean, afterCheckToggled?: (node: DevExpress.Analytics.Wizard.Internal.TreeNodeBase) => void);
        checked: ko.PureComputed<boolean>;
        unChecked(): boolean;
        toggleChecked(): void;
        setChecked(value: boolean): void;
        isList: boolean;
        path: string;
        _checked: ko.Observable<boolean> | ko.Computed<boolean>;
    }
    export class TreeLeafNode extends TreeNodeBase {
        name: string;
        displayName: string;
        specifics: string;
        constructor(name: string, displayName: string, specifics: string, isChecked?: boolean, nodeArguments?: any, afterCheckToggled?: (node: DevExpress.Analytics.Wizard.Internal.TreeNodeBase) => void);
        arguments: DevExpress.Analytics.Data.DBStoredProcedureArgument[];
        hasQuery: boolean;
    }
    export class TreeNode extends TreeNodeBase {
        constructor(name: string, displayName: string, specifics: string, isChecked: boolean, afterCheckToggled?: (node: DevExpress.Analytics.Wizard.Internal.TreeNodeBase) => void);
        initialized(): boolean;
        setChecked(value: boolean): void;
        initializeChildren(children: DevExpress.Analytics.Wizard.Internal.TreeNodeBase[]): void;
        countChecked: ko.PureComputed<number>;
        isList: boolean;
        children: ko.ObservableArray<DevExpress.Analytics.Wizard.Internal.TreeNodeBase>;
    }
    export class ParameterTreeNode extends TreeNode {
        constructor(name: string, displayName: string, specifics: string, isChecked: boolean, afterCheckToggled?: (node: DevExpress.Analytics.Wizard.Internal.TreeNodeBase) => void);
        countChecked: ko.PureComputed<number>;
        hasParamsToEdit: ko.Observable<boolean>;
    }
    export class QueriesTreeNode extends ParameterTreeNode implements IPopoverListOptions {
        constructor(name: string, displayName: string, specifics: string, isChecked: boolean, callbacks?: ko.Observable<DevExpress.Analytics.Wizard.Internal.IAddQueriesTreeListCallbacks>, afterCheckToggled?: (node: DevExpress.Analytics.Wizard.Internal.TreeNodeBase) => void);
        addAction: {
            clickAction: (item: any) => any;
            imageClassName: string;
            imageTemplateName: string;
            templateName: string;
            text: any;
        };
        getActions(context: any): DevExpress.Analytics.Utils.IAction[];
        popoverListItems(): any;
        showPopover(): void;
        itemClickAction: (e: {
            itemData: {
                addAction: any;
            };
        }) => void;
        addQuery: any;
        addCustomQuery: any;
        target: any;
        className: string;
        popoverVisible: ko.Observable<boolean>;
        disableCustomSql: () => boolean;
        selectionDisabled: ko.PureComputed<boolean>;
    }
    export class TreeQueryNode extends TreeLeafNode {
        private query?;
        constructor(name: string, displayName: string, specifics: string, isChecked: boolean, parameters: ko.Observable<DevExpress.Analytics.Data.DataSourceParameter[]>, callbacks: ko.Observable<DevExpress.Analytics.Wizard.Internal.IAddQueriesTreeListCallbacks>, afterCheckToggled?: (node: TreeLeafNode) => void, query?: any);
        setObservableName(getter: () => string, setter: (value: string) => void): void;
        editAction: {
            clickAction: (item: any) => any;
            imageClassName: string;
            imageTemplateName: string;
            text: any;
        };
        removeAction: {
            clickAction: (item: any) => void;
            imageClassName: string;
            imageTemplateName: string;
            text: any;
        };
        getActions(context: any): DevExpress.Analytics.Utils.IAction[];
        editQuery: any;
        removeQuery: any;
        parameters: ko.Observable<DevExpress.Analytics.Data.DataSourceParameter[]>;
    }
    export class FieldTreeNode extends TreeNodeBase {
        constructor(name: string, displayName: string, specifics: string, isChecked: boolean, path: string, afterCheckToggled?: (node: DevExpress.Analytics.Wizard.Internal.TreeNodeBase) => void, isDraggable?: boolean);
        visible: ko.Observable<boolean>;
        isComplex: boolean;
        dragData: any;
        disabled: ko.Observable<boolean>;
    }
    export class DataMemberTreeNode extends TreeNode {
        constructor(name: string, displayName: string, specifics: string, isChecked: boolean, path: string, afterCheckToggled?: (node: DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode) => void);
        setChecked(value: boolean): void;
        visible: ko.Observable<boolean>;
        children: ko.ObservableArray<DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode | DevExpress.Analytics.Wizard.Internal.FieldTreeNode>;
        isComplex: boolean;
    }
    export class SingleCheckedDataMemberTreeNode extends DataMemberTreeNode {
        constructor(name: string, displayName: string, specifics: string, isChecked: boolean, path: string, afterCheckToggled?: (node: DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode) => void);
        _checked: ko.Observable<boolean>;
        children: ko.ObservableArray<DevExpress.Analytics.Wizard.Internal.FieldTreeNode>;
    }
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export class TreeNodeItemsProvider extends Disposable implements IItemsProvider {
        private _fullTreeLoaded;
        protected _rootItems: ko.ObservableArray<DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode>;
        private _checkedRootNodesCount;
        private _createTree;
        private _createTreePart;
        private _setChecked;
        selectAllItems(onlyRoot?: boolean): JQuery.Promise<any, any, any>;
        selectItemsByPath(path: string): JQuery.Promise<any, any, any>;
        selectItemByPath(path: string): JQuery.Promise<any, any, any>;
        protected _getParentNode(pathRequest: DevExpress.Analytics.Utils.IPathRequest): DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode;
        protected _getDefaultTreeNodeCheckState(item: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
        constructor(fieldListProvider: DevExpress.Analytics.Internal.FieldListProvider, rootItems: ko.ObservableArray<DevExpress.Analytics.Utils.IDataMemberInfo>, generateTreeNode: (item: DevExpress.Analytics.Utils.IDataMemberInfo, isChecked: boolean, path: string) => DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode, generateTreeLeafNode: (item: DevExpress.Analytics.Utils.IDataMemberInfo, isChecked: boolean, path: string) => DevExpress.Analytics.Wizard.Internal.FieldTreeNode);
        hasCheckedItems: ko.Computed<boolean>;
        getItems: (path: DevExpress.Analytics.Utils.IPathRequest, collectChilds?: boolean) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
        getRootItems: () => DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode[];
        isList(dataMember: DevExpress.Analytics.Utils.IDataMemberInfo, parentNode: DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode): boolean;
    }
    export class JsonTreeNodeItemsProvider extends TreeNodeItemsProvider implements IItemsProvider {
        constructor(fieldListProvider: DevExpress.Analytics.Internal.FieldListProvider, rootItems: ko.ObservableArray<DevExpress.Analytics.Utils.IDataMemberInfo>, generateTreeNode: (item: DevExpress.Analytics.Utils.IDataMemberInfo, isChecked: boolean, path: string) => DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode, generateTreeLeafNode: (item: DevExpress.Analytics.Utils.IDataMemberInfo, isChecked: boolean, path: string) => DevExpress.Analytics.Wizard.Internal.FieldTreeNode);
        protected _getDefaultTreeNodeCheckState(item: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
        getNodeByPath(pathRequest: DevExpress.Analytics.Utils.IPathRequest): DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode;
    }
    export function getLocalizedValidationErrorMessage(emptyValueErrorMessage: string, localizedPropertyName?: string, subProperty?: string): any;
    export class JsonStringEditor extends Editor {
        constructor(modelPropertyInfo: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled: any, textToSearch: any);
        b64DecodeUnicode(base64string: any): string;
        uploadFile(e: any): void;
        getUploadTitle(): any;
        aceEditorHasErrors: ko.Observable<boolean>;
        aceAvailable: any;
        editorContainer: ko.Observable<any>;
        _model: ko.Observable<any>;
        languageHelper: {
            getLanguageMode: () => string;
            createCompleters: () => any[];
        };
        aceOptions: {
            showLineNumbers: boolean;
            highlightActiveLine: boolean;
            showPrintMargin: boolean;
            enableBasicAutocompletion: boolean;
            enableLiveAutocompletion: boolean;
        };
        isValid: ko.Computed<any>;
        additionalOptions: {
            onChangeAnnotation: (session: any) => void;
            onBlur: () => void;
        };
        jsonStringValidationRules: Array<any>;
    }
    export interface IJSONSourcePagePropertyDescriptor {
        value: ko.Observable<any>;
        displayName: () => string;
    }
    export abstract class JsonDataSourceJsonSourcePageSettingsBase extends Disposable implements IJsonDataSourceJsonSourceValidatable {
        dispose(): void;
        protected _validationGroup: any;
        protected _validationSummary: any;
        private _onValidationGroupInitialized;
        private _onValidationGroupDisposing;
        protected _onValidationSummaryInitialized(args: any): void;
        private _onValidationSummaryDisposing;
        protected _repaintSummary(): void;
        abstract _validatorsReady: ko.Observable<boolean> | ko.Computed<boolean>;
        _validate(): void;
        constructor();
        validationGroup: {
            onInitialized: (args: any) => void;
            onDisposing: (args: any) => void;
            validate: () => void;
        };
        validationSummary: {
            onInitialized: (args: any) => void;
            onDisposing: (args: any) => void;
        };
        isValid: ko.Observable<boolean> | ko.Computed<boolean>;
        grid: DevExpress.Analytics.Widgets.ObjectProperties;
    }
    export class JsonDataSourceJsonSourcePageStringSettings extends JsonDataSourceJsonSourcePageSettingsBase implements IJsonDataSourceJsonSourcePageSettings {
        onChange(_onChange: () => void): any;
        _validatorsReady: ko.Observable<boolean>;
        private _isJsonSourceValid;
        isEmpty(): boolean;
        reset(): void;
        setValue(dataSource: DevExpress.Analytics.Data.JsonDataSource): void;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        applySettings(jsonDataSource: DevExpress.Analytics.Data.JsonDataSource): void;
        constructor();
        isValid: ko.Observable<boolean> | ko.Computed<boolean>;
        validationGroup: any;
        validationSummary: any;
        stringSource: ko.Observable<string> | ko.Computed<string>;
        aceEditorHasErrors: ko.Observable<boolean>;
        grid: DevExpress.Analytics.Widgets.ObjectProperties;
        cssClass: {
            "dxrd-wizard-json-string-source-grid": boolean;
        };
    }
    export class JsonDataSourceJsonSourcePageUriSettings extends JsonDataSourceJsonSourcePageSettingsBase implements IJsonDataSourceJsonSourcePageSettings {
        private _requestWrapper;
        private _itemsProvider?;
        private _isUriValid;
        private _lastValidatedJsonSourceJSON;
        private _authNameValidatorInstance;
        private _isInitUri;
        private _collectionItemNamePlaceholder;
        private _lastValidateDeferred;
        private _sourceUriValidatorsReady;
        private _basicAuthValidatorsReady;
        private _validationRequested;
        private _getPatchedParameter;
        private _validateUriSource;
        private _isCollectionValid;
        private _isParametersValid;
        private _isBasicHttpAuthValid;
        private _noEmptyProperties;
        private _lastValidationMessage;
        private _getSerializedUriSource;
        _sourceUriValidationCallback: (params: any) => boolean;
        private _getSourceUriInfo;
        private _getBasicHttpAuthInfo;
        private _getParametersInfo;
        private _getResultUriInfo;
        private _getResultUri;
        private _appendPathSegmentsToUri;
        private _appendQuerySegmentsToUri;
        constructor(_requestWrapper: DevExpress.QueryBuilder.Utils.RequestWrapper, _itemsProvider?: DevExpress.Analytics.Utils.IItemsProvider);
        protected _onValidationSummaryInitialized(args: any): void;
        _applyParametersToSource(jsonDataSource: DevExpress.Analytics.Data.JsonDataSource): void;
        applySettings(jsonDataSource: DevExpress.Analytics.Data.JsonDataSource): void;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        reset(): void;
        setValue(dataSource: DevExpress.Analytics.Data.JsonDataSource): void;
        dispose(): void;
        onChange(_onChange: () => void): any;
        isEmpty(): boolean;
        isValid: ko.PureComputed<boolean>;
        _validate(): void;
        _validatorsReady: ko.PureComputed<boolean>;
        sourceUri: ko.Observable<string>;
        basicHttpAuth: {
            password: ko.Observable<string>;
            userName: ko.Observable<string>;
        };
        parameters: ko.ObservableArray<DevExpress.Analytics.Data.JsonParameter>;
        resultUri: ko.Computed<string>;
    }
    export class ObjectDataSourceParameterProperty extends Disposable {
        private _parameter;
        private _itemsProvider;
        switchPropertyType(): void;
        isExpression(): boolean;
        private _generateInfo;
        private _initGetInfo;
        private _isDateTimeParamerterType;
        private _patchOriginalParameterValue;
        private _afterInitialize;
        private _subscribeProperties;
        isPropertyVisible(propertyName: string): boolean;
        constructor(_parameter: DevExpress.Analytics.Data.ObjectParameter, _itemsProvider: DevExpress.Analytics.Utils.IItemsProvider);
        actions: DevExpress.Analytics.Internal.IModelAction[];
        actionProviders: DevExpress.Analytics.Internal.IModelActionProvider[];
        reset: () => void;
        getInfo: () => DevExpress.Analytics.Utils.ISerializationInfoArray;
        type: ko.Observable<string>;
        value: ko.Observable<any>;
        expression: DevExpress.Analytics.Widgets.IExpressionOptions;
    }
    class ObjectDataSourceParameterGrid extends ObjectProperties {
        constructor(x: ObjectDataSourceParameterProperty);
    }
    export class ObjectDataSourceParametersModel extends Disposable {
        _grids: ObjectDataSourceParameterGrid[];
        displayName: string;
        constructor(parametersMethod: DevExpress.Analytics.Data.ObjectDataSourceMethodBase, itemsProvider: DevExpress.Analytics.Utils.IItemsProvider);
    }
    export class ChooseObjectMemberParameters extends Disposable {
        private _itemsProvider;
        private _ctorParametersObject;
        private _dataMemberParametersObject;
        private _updateParameters;
        constructor(_itemsProvider: DevExpress.Analytics.Utils.IItemsProvider);
        updateCtorParameters(method: DevExpress.Analytics.Data.ObjectDataSourceMethodBase): void;
        updateMethodParameters(method: DevExpress.Analytics.Data.ObjectDataSourceMethodBase): void;
        hasParameters: () => ObjectDataSourceParametersModel;
    }
    export class ChooseObjectParameters extends ChooseObjectMemberParameters {
        constructor(selectedCtor: ko.Observable<DevExpress.Analytics.Data.ObjectCtor>, selectedDataMembers: ko.ObservableArray<DevExpress.Analytics.Data.ObjectDataMember>, itemsProvider: DevExpress.Analytics.Utils.IItemsProvider);
    }
    export {};
    export abstract class QueryBuilderPopupBase extends Disposable {
        customizeQBInitializationData: (options: DevExpress.Querybuilder.IQueryBuilderOptions) => DevExpress.Querybuilder.IQueryBuilderOptions;
        protected _rtl: boolean;
        protected _querySource: ko.Observable | ko.Computed;
        protected _dbSchemaProvider: ko.Observable<DevExpress.Analytics.Data.IDBSchemaProvider> | ko.Computed<DevExpress.Analytics.Data.IDBSchemaProvider>;
        protected _dataSource: DevExpress.Analytics.Data.IDataSourceDBSchema;
        protected _applyQuery: any;
        constructor(applyNewQuery: any, rtl?: boolean, customizeQBInitializationData?: (options: DevExpress.Querybuilder.IQueryBuilderOptions) => DevExpress.Querybuilder.IQueryBuilderOptions);
        designer: ko.Observable<{
            model: ko.Observable<DevExpress.QueryBuilder.Elements.QueryViewModel> | ko.Computed<DevExpress.QueryBuilder.Elements.QueryViewModel>;
            updateSurface: () => void;
            showPreview: () => void;
            dataPreview: any;
            fieldDragHandler: DevExpress.QueryBuilder.Internal.DbObjectDragDropHandler;
            undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>;
        }>;
        qbOptions: ko.Observable<DevExpress.Querybuilder.IQueryBuilderOptions>;
        okButtonDisabled: ko.PureComputed<boolean>;
        isVisible: ko.Observable<boolean>;
        showLoadIndicator: ko.Observable<boolean>;
        static customizeQueryBuilderActions: (sender: any, args: {
            Actions: DevExpress.Analytics.Utils.IAction[];
        }) => void;
        show(query: any, dataSource: DevExpress.Analytics.Data.IDataSourceDBSchema): void;
        cancelHandler(): void;
        previewHandler(): void;
        okHandler(): void;
        abstract createQuery(): DevExpress.Analytics.Utils.ISerializableModel;
        abstract getDataSource(): DevExpress.Analytics.Data.IDataSourceBase;
        onHiddingHandler(): void;
        popupViewModel(element: HTMLElement): {
            visible: ko.Observable<boolean>;
            title: any;
            showTitle: boolean;
            shading: boolean;
            fullScreen: boolean;
            width: string;
            height: string;
            container: any;
            wrapperAttr: {
                class: string;
            };
            position: {
                of: any;
            };
            onHidding: () => void;
        };
        getDisplayText(key: any): any;
        localizationIdMap: {
            [key: string]: DevExpress.Analytics.Internal.ILocalizationInfo;
        };
    }
    export class QueryBuilderPopup extends QueryBuilderPopupBase {
        customizeQBInitializationData: (options: DevExpress.Querybuilder.IQueryBuilderOptions) => DevExpress.Querybuilder.IQueryBuilderOptions;
        protected _applyQuery: DevExpress.Analytics.Wizard.IRetrieveQuerySqlCallback;
        constructor(applyNewQuery: DevExpress.Analytics.Wizard.IRetrieveQuerySqlCallback, rtl?: boolean, customizeQBInitializationData?: (options: DevExpress.Querybuilder.IQueryBuilderOptions) => DevExpress.Querybuilder.IQueryBuilderOptions);
        getDataSource(): DevExpress.Analytics.Data.SqlDataSource;
        createQuery(): DevExpress.Analytics.Data.TableQuery;
    }
    export class WrappedWizardPageSection extends _WrappedWizardPage {
        pageId: string;
        page: DevExpress.Analytics.Wizard.IWizardPage;
        onChange: (callback: () => void) => void;
        constructor(pageId: string, page: DevExpress.Analytics.Wizard.IWizardPage, metadata: DevExpress.Analytics.Wizard.IWizardPageSectionMetadata<IWizardPage>);
    }
    export class WizardPageSectionFactory extends PageFactory {
        registerMetadata<T extends DevExpress.Analytics.Wizard.IWizardPage>(pageId: string, metadata: DevExpress.Analytics.Wizard.IWizardPageSectionMetadata<T>): void;
        metadata: {
            [key: string]: DevExpress.Analytics.Wizard.IWizardPageSectionMetadata<IWizardPage>;
        };
    }
    /// <reference types="jquery" />
    export class WizardPageSection {
        pageId: string;
        metadata: DevExpress.Analytics.Wizard.IWizardPageSectionMetadata<IWizardPage>;
        resetPage(): void;
        setPage(page: DevExpress.Analytics.Wizard._WrappedWizardPage): void;
        constructor(pageId: string, metadata: DevExpress.Analytics.Wizard.IWizardPageSectionMetadata<IWizardPage>);
        page: ko.Observable<DevExpress.Analytics.Wizard._WrappedWizardPage>;
    }
    export class WizardPageSectionIterator {
        pageFactory: DevExpress.Analytics.Wizard.Internal.WizardPageSectionFactory;
        stateManager: DevExpress.Analytics.Wizard.StateManager;
        private _resetPageCallback;
        private _pagesIds;
        private _pages;
        private _resetPages;
        private _tryResetPageByMetadata;
        private _resetPage;
        private _createNewPage;
        private _getPage;
        private _getNextPage;
        private _getPageIndex;
        resetNextPages(pageId: string): void;
        constructor(pageFactory: DevExpress.Analytics.Wizard.Internal.WizardPageSectionFactory, stateManager: DevExpress.Analytics.Wizard.StateManager, _resetPageCallback: (pageId: string) => void);
        getStartPage(): DevExpress.Analytics.Wizard.Internal.WrappedWizardPageSection;
        getNextPage(currentPageId: string): JQuery.Promise<DevExpress.Analytics.Wizard.Internal.WrappedWizardPageSection[], any, any>;
        getCurrentState(): any;
        getNextPageId(pageId?: string): string | string[];
    }
    /// <reference types="jquery" />
    export class WizardPageProcessor extends Disposable {
        pageFactory: DevExpress.Analytics.Wizard.Internal.WizardPageSectionFactory;
        dispose(): void;
        static __loadingStateFunctionName: string;
        stateManager: DevExpress.Analytics.Wizard.StateManager;
        iterator: DevExpress.Analytics.Wizard.Internal.WizardPageSectionIterator;
        events: DevExpress.Analytics.Utils.EventManager<WizardPageProcessor, IWizardEvents<WizardPageProcessor>>;
        protected _createLoadingState(page: DevExpress.Analytics.Wizard.IWizardPage): void;
        protected _createNextAction(page: DevExpress.Analytics.Wizard.IWizardPage): void;
        private _loadingTimeout;
        private _changeTimeout;
        protected _loadingState(active: any): void;
        protected _extendedNextAction(): void;
        constructor(pageFactory: DevExpress.Analytics.Wizard.Internal.WizardPageSectionFactory, _loadingState?: (boolean: any) => void, _nextAction?: () => void);
        private _resetPageById;
        initialize(state: DevExpress.Analytics.Wizard.IDataSourceWizardState, createIterator?: (pageFactory: DevExpress.Analytics.Wizard.Internal.WizardPageSectionFactory, stateManager: DevExpress.Analytics.Wizard.StateManager) => DevExpress.Analytics.Wizard.Internal.WizardPageSectionIterator): void;
        private _canNext;
        private _canFinish;
        private _initPage;
        getPageById(pageId: any): DevExpress.Analytics.Wizard.Internal.WizardPageSection;
        start(): void;
        finishAction(): JQuery.Promise<any, any, any>;
        private _nextAction;
        sections: DevExpress.Analytics.Wizard.Internal.WizardPageSection[];
        isLoading: ko.Observable<boolean>;
    }
    /// <reference types="jquery" />
    export interface IParameter {
        name: string;
        value: any;
        type?: string;
    }
    export enum WizardSectionPosition {
        Left = 1,
        TopLeft = 2,
        BottomLeft = 3,
        Right = 4,
        TopRight = 5,
        BottomRight = 6,
        Top = 7,
        Bottom = 8
    }
    export interface IJsonDataSourceWizardCallbacks {
        getParameters?: () => IParameter[];
    }
    export interface IDataSourceWizardCallbacks extends IJsonDataSourceWizardCallbacks {
        selectStatement?: (connection: DevExpress.Analytics.Data.SqlDataConnection, queryJSON: string) => JQueryPromise<DevExpress.QueryBuilder.Utils.ISelectStatementResponse>;
        finishCallback?: (wizardModel: any) => JQueryPromise<any>;
        customQueriesPreset?: (dataSource: DevExpress.Analytics.Data.SqlDataSource) => JQueryPromise<DevExpress.QueryBuilder.Utils.ISqlQueryViewModel[]>;
        customizeQBInitData?: (data: any) => any;
        validateJsonUri?: (data: any) => any;
        getItemsProviderCallback?: () => DevExpress.Analytics.Utils.IItemsProvider;
        fieldListsCallback?: (request: DevExpress.Analytics.Utils.IPathRequest, dataSource?: DevExpress.Analytics.Internal.IDataSourceInfo, useCache?: boolean) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
    }
    export interface IPopoverListOptions {
        showPopover: () => void;
        target?: string;
        popoverListItems: () => any[];
        className?: string;
        popoverVisible: ko.Observable<boolean> | ko.Computed<boolean>;
        position?: any;
        popupContainer?: string;
    }
    export interface ICustomQueryTreeListItemViewModel extends ITreeListItemViewModel {
        queryName: string;
        queryNameHasChanged: (event: DevExpress.ui.dxTextBox.ValueChangedEvent) => void;
    }
    export class CustomQueryTreeListItem extends TreeListItemViewModel {
        protected _getTemplateName(): string;
        protected _getCustomizedTemplateName(isEditable: boolean): string;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<TreeListItemViewModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<TreeListItemViewModel>): void;
        createViewModel(): DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<CustomQueryTreeListItem> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<CustomQueryTreeListItem>): void;
        queryName: string;
    }
    export class MultiQueryTreeListItemFactory extends KoTreeListItemFactory {
        createItem(options: DevExpress.Analytics.Widgets.Internal.ITreeListOptions, path?: string[], onItemsVisibilityChanged?: () => void, rtl?: boolean, resolver?: DevExpress.Analytics.Internal.CodeResolver): DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
    }
    export interface IMultiQueryDataSourceWizardCallbacks extends IDataSourceWizardCallbacks {
        sqlDataSourceResultSchema?: (dataSource: DevExpress.Analytics.Data.SqlDataSource) => JQueryPromise<DevExpress.QueryBuilder.Utils.IRebuildSchemaResponse>;
        federationDataSourceResultSchema?: (dataSource: DevExpress.Analytics.Data.FederationDataSource) => JQueryPromise<{
            resultSchemaJSON: string;
        }>;
    }
    export interface IParametersViewModelConverter {
        createParameterViewModel(parameter: DevExpress.Analytics.Data.DataSourceParameter): any;
        getParameterFromViewModel(parameterViewModel: any): DevExpress.Analytics.Data.DataSourceParameter;
    }
    export interface IWizardPageStyle {
        top?: any;
        bottom?: any;
        left?: any;
        right?: any;
        width?: any;
        height?: any;
        display?: any;
    }
    export function getSectionStyle(position: WizardSectionPosition, defaultMargin?: number, isVisible?: boolean): IWizardPageStyle;
    export function subscribeArray<T>(array: ko.ObservableArray<T>, subscribeItem: (value: T, onChange: () => void) => void, onChange: () => void): ko.Subscription;
    export function subscribeProperties(properties: Array<ko.Observable<any> | ko.Computed<any>>, onChange: (val?: any) => void): ko.Subscription[];
    export function subscribeObject<T>(object: ko.Observable<T> | ko.Computed<T>, subscribeProperties: (value: T, onChange: () => void) => void, onChange: () => void): ko.Subscription;
    export function _createBeforeInitializePageEventArgs<TWizard extends DevExpress.Analytics.Wizard.BaseWizard | DevExpress.Analytics.Wizard.Internal.WizardPageProcessor>(page: DevExpress.Analytics.Wizard._WrappedWizardPage, self: TWizard): DevExpress.Analytics.Wizard.IBeforeWizardPageInitializeEventArgs<TWizard>;
    export function _createPageEventArgs<TWizard extends DevExpress.Analytics.Wizard.BaseWizard | DevExpress.Analytics.Wizard.Internal.WizardPageProcessor>(page: DevExpress.Analytics.Wizard._WrappedWizardPage, self: TWizard): DevExpress.Analytics.Wizard.IWizardPageEventArgs<TWizard>;
    export function _isMoreThanOneDataSourceTypeAvailable(dataSourceOptions: DevExpress.Analytics.Wizard._DataSourceWizardOptions): boolean;
    export interface IFederationQueryBuilderCallbacks {
        joinCallBack?: (name?: string) => any;
        unionCallBack?: (name?: string) => any;
        transformCallBack?: (name?: string) => any;
    }
    export interface IFederationAddQueriesTreeListCallbacks extends IAddQueriesTreeListCallbacks {
        showQbCallBacks: DevExpress.Analytics.Wizard.Internal.IFederationQueryBuilderCallbacks;
    }
    export class FederatedQueriesTreeNode extends QueriesTreeNode {
        callbacks?: ko.Observable<IFederationAddQueriesTreeListCallbacks>;
        constructor(name: string, displayName: string, specifics: string, isChecked: boolean, callbacks?: ko.Observable<IFederationAddQueriesTreeListCallbacks>, afterCheckToggled?: (node: DevExpress.Analytics.Wizard.Internal.TreeNodeBase) => void);
        addAction: {
            clickAction: () => void;
            imageClassName: string;
            imageTemplateName: string;
            templateName: string;
            text: any;
        };
        getActions(context: {
            path: string;
        }): Array<any>;
        popoverListItems(): Array<any>;
        className: string;
    }
    export class FederationQueryBuilderPopupBase extends PopupEditorBase {
        onSaveCallback: (query: DevExpress.QueryBuilder.Utils.IFederationQuery) => void;
        protected _dataSource: DevExpress.Analytics.Data.FederationDataSource;
        rtl: boolean;
        onCloseCallback?: () => void;
        protected _aliasValidationRule: {
            type: string;
            validationCallback: (options: any) => void;
            readonly message: any;
        };
        protected _aliasValidationCallback(alias: string, data: {
            key: string;
            alias: string;
        }): boolean;
        constructor(onSaveCallback: (query: DevExpress.QueryBuilder.Utils.IFederationQuery) => void, _dataSource: DevExpress.Analytics.Data.FederationDataSource, rtl?: boolean, onCloseCallback?: () => void);
        dispose(): void;
        addDataMember(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel, position?: {
            left: number;
            top: number;
        }): void;
        save(): void;
        close(): void;
        popupTarget(): string;
        onHiding(): void;
        selectedPath: ko.Observable<string>;
        dragDropHandler: DevExpress.Analytics.Internal.WizardDragDropHandler;
        fieldListModel: DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
        title: () => string;
        getPopupContainer: typeof DevExpress.Analytics.Internal.getParentContainer;
        loaded: ko.Observable<boolean>;
        maxHeight: string;
        width: string;
        height: string;
        cssClass: string;
        resultGridHeight: ko.Observable<number>;
        resizeHelper: DevExpress.Analytics.Widgets.Internal.ResizeHelper;
    }
    /// <reference types="jquery" />
    export class FederationTablesExpressionFieldListProvider implements IItemsProvider {
        private provider;
        private tables;
        getItems(pathRequest: any): JQuery.Promise<DevExpress.Analytics.Utils.IDataMemberInfo[], any, any>;
        constructor(provider: DevExpress.Analytics.Utils.IItemsProvider, tables: ko.ObservableArray<DevExpress.QueryBuilder.Internal.FederationTableViewModel>);
    }
    export interface IFederationSelectQBGridAllColumns {
        column: string;
        table: string;
        key: string;
    }
    export interface IFederationSelectQBGridColumnsExpressions extends IFederationSelectQBGridAllColumns {
        alias: string;
        index: number;
        isExpression: ko.Observable<boolean>;
        expression: ko.Observable<string> | ko.Computed<string>;
    }
    export class FederationSelectQueryBuilderPopup extends FederationQueryBuilderPopupBase {
        private _qbOptions;
        private _bindingContext;
        private _gridComponent;
        private _onContentReady;
        private _getQuery;
        private _afterChangeColumn;
        private _changeColumn;
        private _switchEditors;
        private _deleteRow;
        private _onRowUpdating;
        protected _aliasValidationCallback(alias: string, data: {
            key: string;
            alias: string;
        }): boolean;
        dispose(): void;
        private _generateKey;
        private _isSelectAllItemByKey;
        constructor(onSaveCallback: (query: DevExpress.Analytics.Data.SelectQuery) => void, dataSource: DevExpress.Analytics.Data.FederationDataSource, rtl?: boolean, onCloseCallback?: () => void);
        save(): void;
        addRow(): void;
        canSave(): boolean;
        addDataMember(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel, position?: {
            left: number;
            top: number;
        }): void;
        show(query: DevExpress.Analytics.Data.SelectQuery): void;
        popupTarget(): string;
        gridResizeHelper: DevExpress.Analytics.Widgets.Internal.ResizeHelper;
        columnsGrid: any;
        addRowDisabled: ko.PureComputed<boolean>;
        popupContentTemplate: string;
        columnsExpressions: ko.PureComputed<IFederationSelectQBGridColumnsExpressions[]>;
        allColumns: ko.PureComputed<IFederationSelectQBGridAllColumns[]>;
        queryBuilderSurfaceCreator: DevExpress.QueryBuilder.Internal.IQueryBuilderSurfaceCreator;
        _querySource: ko.Observable<any>;
        designer: ko.Observable<any>;
        joinResultCollapsed: ko.Observable<boolean>;
        selectQuery: DevExpress.Analytics.Data.SelectQuery;
        width: string;
        height: string;
        cssClass: string;
    }
    /// <reference types="jquery" />
    export class TransformResultSchemaProvider implements IItemsProvider {
        constructor(itemsProvider: DevExpress.Analytics.Utils.IItemsProvider, transformData: ko.Observable<any[]>, currentPath: ko.Observable<string>);
        dispose: () => void;
        getItems: (path: DevExpress.Analytics.Utils.IPathRequest) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
    }
    export class FederationTransformQueryBuilderPopup extends FederationQueryBuilderPopupBase {
        private _updateColumns;
        protected _aliasValidationCallback(alias: string, data: {
            alias: string;
            key: string;
        }): boolean;
        constructor(onSaveCallback: (query: DevExpress.Analytics.Data.TransformQuery) => void, dataSource: DevExpress.Analytics.Data.FederationDataSource, rtl?: boolean, onCloseCallback?: () => void);
        dispose(): void;
        addDataMember(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): void;
        updateColumns(): void;
        canSave(): boolean;
        save(): void;
        onHiding(): void;
        show(query: DevExpress.Analytics.Data.TransformQuery): void;
        transformGrid: any;
        transformGridTitle: ko.Observable<string>;
        transformResultGridTitle: ko.Observable<string>;
        transformResultCollapsed: ko.Observable<boolean>;
        transformSources: ko.Observable<any[]>;
        resultFieldListModel: ko.Observable<DevExpress.Analytics.Widgets.Internal.ITreeListOptions>;
        currentPath: ko.Observable<string>;
        transformQuery: ko.Observable<DevExpress.Analytics.Data.TransformQuery>;
        popupContentTemplate: string;
    }
    export class FederationUnionQueryBuilderPopup extends FederationQueryBuilderPopupBase {
        protected _aliasValidationCallback(alias: string, data: {
            alias: string;
            key: string;
        }): boolean;
        constructor(onSaveCallback: (query: DevExpress.Analytics.Data.UnionQuery) => void, dataSource: DevExpress.Analytics.Data.FederationDataSource, rtl?: boolean, onCloseCallback?: () => void);
        dispose(): void;
        addDataMember(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): void;
        canSave(): boolean;
        save(): void;
        onHiding(): void;
        show(query: DevExpress.Analytics.Data.UnionQuery): void;
        aliasGrid: any;
        sourcesGrid: any;
        unionQuery: ko.Observable<DevExpress.Analytics.Data.UnionQuery>;
        unionAll: ko.Observable<boolean>;
        columns: ko.ObservableArray<any>;
        popupContentTemplate: string;
    }
    /// <reference types="jquery" />
    export class ObjectTypeDescriptions {
        types: DevExpress.Analytics.Data.ObjectType[];
        constructor(model: any);
    }
    export interface IObjectSchemaProvider extends IItemsProvider {
        getObjectTypeDescriptions: () => JQueryPromise<ObjectTypeDescriptions>;
    }
    export function getObjectTypeDescriptionsCallback(requestWrapper: DevExpress.QueryBuilder.Utils.RequestWrapper, context: string): JQueryPromise<ObjectTypeDescriptions>;
    export class ObjectSchemaProvider extends Disposable implements IObjectSchemaProvider {
        private _requestWrapper;
        private _objectTypeDescriptionsPromise;
        constructor(_requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper);
        dispose(): void;
        getItems: (IPathRequest: any) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
        getSchemaByPath(pathRequest: DevExpress.Analytics.Utils.IPathRequest, objectSchema: ObjectTypeDescriptions): DevExpress.Analytics.Utils.IDataMemberInfo[];
        getObjectTypeDescriptions(context?: string): JQueryPromise<ObjectTypeDescriptions>;
    }
    export class ChooseObjectTypesTreelistController extends TreeListController {
        canSelect(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
    }
    export class ChooseObjectTypes extends Disposable {
        types: ko.ObservableArray<DevExpress.Analytics.Data.ObjectType>;
        constructor(types: ko.ObservableArray<DevExpress.Analytics.Data.ObjectType>, provider: DevExpress.Analytics.Wizard.Internal.ObjectSchemaProvider);
        availableTypesTreelistModel: DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
        selectedType: ko.Observable<DevExpress.Analytics.Data.ObjectType>;
        selectedCtor: ko.Observable<DevExpress.Analytics.Data.ObjectCtor>;
        selectedPath: ko.Observable<string>;
        _scrollViewHeight: string;
    }
    export class ChooseObjectDataMembers extends Disposable {
        constructor(type: ko.Observable<DevExpress.Analytics.Data.ObjectType>, ctor: ko.Observable<DevExpress.Analytics.Data.ObjectCtor>);
        private coerceSelection;
        dataMembers: ko.ObservableArray<DevExpress.Analytics.Data.ObjectDataMember>;
        selectedDataMembers: ko.ObservableArray<DevExpress.Analytics.Data.ObjectDataMember>;
    }
    export class FederationDataSourceItemsExtender implements IItemsExtender {
        private _rootItems;
        constructor(_rootItems: ko.ObservableArray<DevExpress.Analytics.Internal.IDataSourceInfo>);
        afterItemsFilled(request: DevExpress.Analytics.Utils.PathRequest, items: DevExpress.Analytics.Utils.IDataMemberInfo[]): void;
        beforeItemsFilled(request: DevExpress.Analytics.Utils.PathRequest, items: DevExpress.Analytics.Utils.IDataMemberInfo[]): boolean;
    }
    export class FederationTreeNodeProvider extends TreeNodeItemsProvider {
        constructor(fieldListProvider: DevExpress.Analytics.Internal.FieldListProvider, rootItems: ko.ObservableArray<DevExpress.Analytics.Utils.IDataMemberInfo>, callBacks: DevExpress.Analytics.Wizard.Internal.IFederationQueryBuilderCallbacks, customQueries: ko.ObservableArray<DevExpress.QueryBuilder.Utils.IFederationQuery>, afterCheckToggled: (node: DevExpress.Analytics.Wizard.Internal.TreeNodeBase) => void);
        private _queries;
        private _customQueries;
        private _callBack;
        isList(dataMember: DevExpress.Analytics.Utils.IDataMemberInfo, parentNode: FederationDataMemberTreeNode): boolean;
    }
    class FederationDataMemberTreeNode extends DataMemberTreeNode {
        constructor(name: string, displayName: string, specifics: string, isListType: boolean, isChecked: boolean, path: string, afterCheckToggled?: (node: DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode) => void);
        isListType: boolean;
    }
    export {};
    export class DBSchemaTreeListController extends TreeListController {
        private _customizeDBSchemaTreeListActions;
        searchOptions: DevExpress.Analytics.Widgets.Internal.TreeListSearchOptions;
        constructor(_customizeDBSchemaTreeListActions: (item: DevExpress.Analytics.Utils.IDataMemberInfo, actions: DevExpress.Analytics.Utils.IAction[]) => void, searchOptions?: DevExpress.Analytics.Widgets.Internal.TreeListSearchOptions);
        getActions(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): DevExpress.Analytics.Utils.IAction[];
        canSelect(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
    }
    export class ParametersTreeListItemBase extends Disposable implements IDataMemberInfo {
        private _displayName;
        private _name;
        constructor(parameter: {
            name: ko.Observable<string> | ko.Computed<string>;
            displayName?: any;
        });
        dataSourceParameter: ko.Observable<{
            name: ko.Observable<string> | ko.Computed<string>;
        }> | ko.Computed<{
            name: ko.Observable<string> | ko.Computed<string>;
        }>;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        isList: boolean;
        contenttemplate: string;
        actionsTemplate: string;
        get name(): string;
        get displayName(): string;
    }
    export class ParametersTreeListItem extends ParametersTreeListItemBase {
        parent: ParametersTreeListRootItem;
        constructor(parameter: {
            name: ko.Observable<string> | ko.Computed<string>;
        }, parent: ParametersTreeListRootItem);
        query(): DevExpress.QueryBuilder.Utils.ISqlQueryViewModel;
    }
    export class ParametersTreeListRootItemBase implements IDataMemberInfo {
        constructor(name: string);
        name: string;
        displayName: string;
        isList: boolean;
        specifics: string;
        parameters: ko.ObservableArray<ParametersTreeListItemBase>;
        visible: ko.Observable<boolean>;
        removeChild(parameter: any): void;
    }
    export class ParametersTreeListRootItem extends ParametersTreeListRootItemBase {
        private _query;
        constructor(query: DevExpress.QueryBuilder.Utils.ISqlQueryViewModel);
        query(): DevExpress.QueryBuilder.Utils.ISqlQueryViewModel;
    }
    export class ParametersTreeListController extends TreeListController {
        private _createNewParameter;
        private _rootItems;
        constructor(rootItems: ParametersTreeListRootItemBase[], createNewParameter: (queryName: string, parameters: {
            name: string;
        }[]) => any);
        hasItems(item: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
        getActions(treeListItem: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel & {
            data: ParametersTreeListRootItem | ParametersTreeListItem;
        }): DevExpress.Analytics.Utils.IAction[];
        canSelect(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
    }
    export class WizardAction {
        constructor(handler: () => void, text: string);
        isVisible: ko.Observable<boolean> | ko.Computed<boolean>;
        isDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
        handler: () => void;
        text: string;
    }
}
declare module DevExpress.Querybuilder {
    import IQueryBuilderModel = DevExpress.QueryBuilder.Internal.IQueryBuilderModel;
    import IDBSchemaProvider = DevExpress.Analytics.Data.IDBSchemaProvider;
    import IItemsProvider = DevExpress.Analytics.Utils.IItemsProvider;
    import RequestWrapper = DevExpress.QueryBuilder.Utils.RequestWrapper;
    import IJSQueryBuilderCallbacks = DevExpress.QueryBuilder.Internal.IJSQueryBuilderCallbacks;
    import IJSDesignerBindingCommonOptions = DevExpress.Analytics.Internal.IJSDesignerBindingCommonOptions;
    import IDataSourceBase = DevExpress.Analytics.Data.IDataSourceBase;
    import DxAnalyticsComponentCommon = DevExpress.Analytics.Internal.DxAnalyticsComponentCommon;
    import JSDesignerBindingCommon = DevExpress.Analytics.Internal.JSDesignerBindingCommon;
    import JSQueryBuilder = DevExpress.Querybuilder.JSQueryBuilder;
    import IQueryBuilderOptions = DevExpress.Querybuilder.IQueryBuilderOptions;
    export class JSQueryBuilder {
        private _queryBuilderModel;
        get queryBuilderModel(): DevExpress.QueryBuilder.Internal.IQueryBuilderModel;
        set queryBuilderModel(newVal: DevExpress.QueryBuilder.Internal.IQueryBuilderModel);
        constructor(_queryBuilderModel: ko.Observable<DevExpress.QueryBuilder.Internal.IQueryBuilderModel>);
        UpdateLocalization(localization: any): void;
        GetQueryBuilderModel(): DevExpress.QueryBuilder.Internal.IQueryBuilderModel;
        GetJsonQueryModel(): {
            Query: any;
        };
        GetSaveQueryModel(): {
            queryLayout: string;
            connection: string;
        };
        SerializeDataConnection(): string;
        AdjustControlCore(): void;
        Save(): void;
        ShowPreview(): void;
        IsQueryValid(): any;
        OnCallback(result: any): void;
    }
    export interface IQueryBuilderOptions extends IJSDesignerBindingCommonOptions {
        queryBuilderModel?: ko.Observable<any>;
        dataSourceJson?: string;
        queryModelJson?: string;
        querySource: ko.Observable<{}> | ko.Computed<{}>;
        dbSchemaProvider?: ko.Observable<DevExpress.Analytics.Data.IDBSchemaProvider> | ko.Computed<DevExpress.Analytics.Data.IDBSchemaProvider>;
        parametersItemsProvider?: DevExpress.Analytics.Utils.IItemsProvider;
        requestWrapper?: DevExpress.QueryBuilder.Utils.RequestWrapper;
        parametersMode?: string;
        callbacks?: DevExpress.QueryBuilder.Internal.IJSQueryBuilderCallbacks;
        localization?: any;
        rtl?: boolean;
        requestOptions?: {
            host?: string;
            invokeAction: string;
            getLocalizationAction?: string;
        };
        handlerUri?: string;
        dataSource?: DevExpress.Analytics.Data.IDataSourceBase;
        showPropertyGridCondition?: (editableObj: any) => boolean;
    }
    export class EventGenerator {
        static generateQueryBuilderEvents(fireEvent: (eventName: any, args?: any) => void): {
            publicName: string;
            privateName: string;
        }[];
    }
    /// <reference types="jquery" />
    export class JSQueryBuilderBinding extends JSDesignerBindingCommon<DevExpress.Querybuilder.JSQueryBuilder, DevExpress.Querybuilder.IQueryBuilderOptions> {
        private options;
        private _deferreds;
        private _callbacks;
        _templateHtml: string;
        private _applyBindings;
        private _initializeCallbacks;
        _createModel(element: any): JQueryDeferred<DevExpress.QueryBuilder.Internal.IQueryBuilderModel>;
        constructor(options: DevExpress.Querybuilder.IQueryBuilderOptions, customEventRaiser?: any);
        dispose(): void;
        applyBindings(element: HTMLElement): void;
    }
    export class DxQueryBuilder extends DxAnalyticsComponentCommon<DevExpress.Querybuilder.IQueryBuilderOptions> {
        getBindingName(): string;
    }
}
declare module DevExpress.Analytics.Widgets.Filtering {
    import CriteriaOperator = DevExpress.Analytics.Criteria.CriteriaOperator;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import FilterEditorHelper = DevExpress.Analytics.Widgets.FilterEditorHelper;
    import IItemsProvider = DevExpress.Analytics.Utils.IItemsProvider;
    import ICriteriaChangeOperator = DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator;
    import CriteriaOperatorSurface = DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface;
    import UnaryOperator = DevExpress.Analytics.Criteria.UnaryOperator;
    import AggregateOperand = DevExpress.Analytics.Criteria.AggregateOperand;
    import BetweenOperator = DevExpress.Analytics.Criteria.BetweenOperator;
    import BinaryOperator = DevExpress.Analytics.Criteria.BinaryOperator;
    import IPropertyLocation = DevExpress.Analytics.Criteria.Utils.IPropertyLocation;
    import OperandSurfaceBase = DevExpress.Analytics.Widgets.Filtering.OperandSurfaceBase;
    import FunctionOperator = DevExpress.Analytics.Criteria.FunctionOperator;
    import GroupOperator = DevExpress.Analytics.Criteria.GroupOperator;
    import InOperator = DevExpress.Analytics.Criteria.InOperator;
    import OperandParameter = DevExpress.Analytics.Criteria.OperandParameter;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    import OperandProperty = DevExpress.Analytics.Criteria.OperandProperty;
    import DataSource = DevExpress.data.DataSource;
    import OperandValue = DevExpress.Analytics.Criteria.OperandValue;
    export class CriteriaOperatorSurface<T extends DevExpress.Analytics.Criteria.CriteriaOperator = DevExpress.Analytics.Criteria.CriteriaOperator> extends Disposable {
        _createLeftPartProperty(value: any): DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>;
        createChildSurface(item: any, path?: any, actions?: any): DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>;
        protected getDisplayType(): string;
        constructor(operator: T, parent: any, fieldListProvider: any, path: any);
        specifics: ko.Observable<string> | ko.Computed<string>;
        dataType: ko.Observable<string> | ko.Computed<string>;
        get items(): Array<DevExpress.Analytics.Criteria.Utils.ICriteriaChangeOperator>;
        get displayType(): string;
        get leftPart(): DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>;
        get rightPart(): any;
        get css(): string;
        change(type: any, surface: any): void;
        remove(surface: any): void;
        isUpdated: ko.Observable<boolean>;
        popupService: any;
        canRemove: boolean;
        operatorType: ko.Observable<any>;
        parent: any;
        templateName: string;
        isSelected: ko.Observable<boolean> | ko.Computed<boolean>;
        operatorClass: string;
        helper: DevExpress.Analytics.Widgets.FilterEditorHelper;
        reverse: any;
        path: ko.Observable<string> | ko.Computed<string>;
        fieldListProvider: ko.Observable<DevExpress.Analytics.Utils.IItemsProvider>;
        model: T;
    }
    export class UnaryOperandSurface extends CriteriaOperatorSurface<DevExpress.Analytics.Criteria.UnaryOperator> {
        constructor(operator: DevExpress.Analytics.Criteria.UnaryOperator, parent: any, fieldListProvider?: any, path?: any);
        get leftPart(): any;
        get rightPart(): any;
        createChildSurface(item: DevExpress.Analytics.Criteria.CriteriaOperator, path?: any, actions?: any): DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>;
        dispose(): void;
        contentTemplateName: string;
        operand: ko.Observable<any>;
    }
    export class AggregateOperandSurface extends CriteriaOperatorSurface<DevExpress.Analytics.Criteria.AggregateOperand> {
        constructor(operator: DevExpress.Analytics.Criteria.AggregateOperand, parent: DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>, fieldListProvider: any, path: any);
        get leftPart(): any;
        get rightPart(): any;
        dispose(): void;
        contentTemplateName: string;
        property: ko.Observable<any>;
        aggregatedExpression: ko.Observable<any>;
        condition: ko.Observable<any>;
    }
    export class BetweenOperandSurface extends CriteriaOperatorSurface<DevExpress.Analytics.Criteria.BetweenOperator> {
        constructor(operator: DevExpress.Analytics.Criteria.BetweenOperator, parent: DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>, fieldListProvider: any, path: any);
        get leftPart(): any;
        get rightPart(): any[];
        dispose(): void;
        property: ko.Observable<any>;
        end: ko.Observable<any>;
        begin: ko.Observable<any>;
        contentTemplateName: string;
    }
    export class BinaryOperandSurface extends CriteriaOperatorSurface<DevExpress.Analytics.Criteria.BinaryOperator> {
        constructor(operator: DevExpress.Analytics.Criteria.BinaryOperator, parent: any, fieldListProvider: any, path: any);
        get leftPart(): DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>;
        get rightPart(): any;
        dispose(): void;
        contentTemplateName: string;
        leftOperand: ko.Observable<any>;
        rightOperand: ko.Observable<any>;
    }
    export class OperandSurfaceBase<T extends DevExpress.Analytics.Criteria.CriteriaOperator> extends CriteriaOperatorSurface<T> {
        getRealParent(parent: any): any;
        getRealProperty(property: any): any;
        getPropertyName(parent: any, searchProperty: any): DevExpress.Analytics.Criteria.Utils.IPropertyLocation;
        getConvertableParameters(destinationSpecifics: string): any[];
        constructor(operator: T, parent: DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>, fieldListProvider: any, path: any);
        get changeTypeItems(): {
            name: string;
            instance: any;
            localizationId: string;
        }[];
        canChange: boolean;
        canRemove: boolean;
        changeValueType: (type: any) => void;
    }
    export class FunctionOperandSurface extends OperandSurfaceBase<DevExpress.Analytics.Criteria.FunctionOperator> {
        constructor(operator: DevExpress.Analytics.Criteria.FunctionOperator, parent: DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>, fieldListProvider: any, path: any);
        get leftPart(): DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>;
        get rightPart(): any[];
        get displayType(): string;
        dispose(): void;
        canRemove: boolean;
        contentTemplateName: string;
        operands: ko.ObservableArray<any>;
    }
    export class GroupOperandSurface extends CriteriaOperatorSurface<DevExpress.Analytics.Criteria.GroupOperator> {
        constructor(operator: DevExpress.Analytics.Criteria.GroupOperator, parent: any, fieldListProvider: any, path: any);
        change(type: any, surface: any): void;
        remove(surface: DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>): void;
        create(type: any): void;
        get rightPart(): DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>[];
        dispose(): void;
        templateName: string;
        operatorClass: string;
        operands: ko.ObservableArray<DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>>;
        createItems: any;
    }
    export class InOperandSurface extends CriteriaOperatorSurface<DevExpress.Analytics.Criteria.InOperator> {
        constructor(operator: DevExpress.Analytics.Criteria.InOperator, parent: any, fieldListProvider: any, path: any);
        get leftPart(): any;
        get rightPart(): any[];
        dispose(): void;
        addValue: () => void;
        contentTemplateName: string;
        operands: ko.ObservableArray<any>;
        criteriaOperator: ko.Observable<any>;
    }
    export class OperandParameterSurface extends OperandSurfaceBase<DevExpress.Analytics.Criteria.OperandParameter> {
        constructor(operator: DevExpress.Analytics.Criteria.OperandParameter, parent: DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>, fieldListProvider?: any, path?: any);
        changeParameter: (item: DevExpress.Analytics.Utils.IDataMemberInfo) => void;
        get items(): any;
        get displayType(): any;
        operatorClass: string;
        parameterName: ko.Observable<string> | ko.Computed<string>;
        templateName: string;
    }
    export class OperandPropertySurface extends OperandSurfaceBase<DevExpress.Analytics.Criteria.OperandProperty> {
        private _displayName;
        _updateDisplayName(path: any, propertyName: any, displayName: any): void;
        _updateSpecifics(): void;
        constructor(operator: DevExpress.Analytics.Criteria.OperandProperty, parent: DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>, fieldListProvider?: any, path?: any);
        fieldsOptions: ko.Observable<any>;
        displayName: ko.Computed<string>;
        propertyName: ko.Observable<string>;
        specifics: ko.Observable<string>;
        dataType: ko.Observable<string>;
        get items(): any;
        get displayType(): any;
        valueType: ko.Observable<string>;
        changeProperty: (item: DevExpress.Analytics.Utils.IDataMemberInfo) => void;
        templateName: string;
        operatorClass: string;
    }
    export class OperandValueSurface extends OperandSurfaceBase<DevExpress.Analytics.Criteria.OperandValue> {
        private static _defaultValue;
        private _value;
        private _scroll;
        private _updateDate;
        get items(): any[];
        constructor(operator: DevExpress.Analytics.Criteria.OperandValue, parent: DevExpress.Analytics.Widgets.Filtering.CriteriaOperatorSurface<CriteriaOperator>, fieldListProvider: DevExpress.Analytics.Utils.IItemsProvider, path: any);
        get displayType(): any;
        changeValue: () => void;
        isDefaultDisplay(): boolean;
        getDefaultValue(): any;
        scrollTo(element: HTMLElement): void;
        dataType: ko.Observable<string> | ko.Computed<string>;
        values: ko.Observable<any[]>;
        value: ko.Observable<string> | ko.Computed<string>;
        dataSource: ko.Observable<DevExpress.data.DataSource> | ko.Computed<DevExpress.data.DataSource>;
        isEditable: ko.Observable<boolean> | ko.Computed<boolean>;
        templateName: string;
        _getBaseOptions: (element: HTMLElement) => {
            value: ko.Observable<any>;
            onFocusOut: () => any;
            onFocusIn: () => void;
        };
        getNumberEditorOptions: (element: HTMLElement) => any;
        getStringEditorOptions: (element: HTMLElement) => {
            value: ko.Observable<any>;
            onFocusOut: () => any;
            onFocusIn: () => void;
        };
        getBoolEditorOptions: (element: HTMLElement, $root: any) => {
            value: ko.Observable<any>;
            onFocusOut: () => any;
            onFocusIn: () => void;
            dataSource: {
                val: string;
                text: string;
                localizationId: string;
            }[];
            valueExpr: string;
            displayExpr: string;
            dropDownOptions: {
                container: any;
            };
        };
        getDateEditorOptions: (element: HTMLElement, $root: any) => {
            value: ko.Observable<any>;
            onFocusOut: () => any;
            onFocusIn: () => void;
            closeOnValueChange: boolean;
            type: string;
            dropDownOptions: {
                container: any;
            };
        };
        getListEditOptions: (element: HTMLElement, $root: any) => {
            value: ko.Observable<any>;
            onFocusOut: () => any;
            onFocusIn: () => void;
            dataSource: ko.Computed<DevExpress.data.DataSource<any, any>> | ko.Observable<DevExpress.data.DataSource<any, any>>;
            acceptCustomValue: boolean;
            valueExpr: string;
            displayExpr: string;
            useItemTextAsTitle: boolean;
            searchEnabled: boolean;
            dropDownOptions: {
                container: any;
            };
        };
    }
}
declare module DevExpress.Analytics.Widgets.Ace {
    export function defineAceCriteria(ace: any): void;
    export function defineAceDocComments(ace: any): void;
    export function defineAceThemes(ace: any): void;
    export function getAceThemeName(theme?: string): string;
    export interface IAceEditor {
        require(module: string): any;
        edit(element: HTMLElement): any;
    }
    export function defineAce(ace: any): void;
}
