﻿/**
* DevExpress Analytics (core\utils\_designerCreator.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jquery" />
import * as ko from 'knockout';
import { ObjectProperties } from '../../property-grid/propertygrid';
import { IPropertiesAccessibilityProvider } from '../../property-grid/_propertiesAccessibilityProvider';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
import { Disposable, DisposableType, IDisposable } from '../../serializer/disposable';
import { UndoEngine } from '../../undo-engine/undoengine';
import { IAction } from '../../widgets/utils';
import { DragDropHandler } from '../dragDrop/_dragDropHandler';
import { DragHelperContent } from '../dragDrop/_dragHelperContent';
import { SelectionDragDropHandler } from '../dragDrop/_selectionDragDropHandler';
import { ToolboxDragDropHandler } from '../dragDrop/_toolboxDragDropHandler';
import { DesignControlsHelper, IDesignControlsHelper } from '../internal/_controlsHelper';
import { InlineTextEdit } from '../internal/_inlineTextEdit';
import { ControlsStore } from '../internal/_stores';
import { SurfaceSelection } from '../selection/_selection';
import { SnapLinesHelper } from '../snapLines/_snapLinesHelper';
import { ToolboxItem } from '../tools/toolbox';
import { ActionLists } from '../tools/_actionList';
import { ControlProperties } from '../widgets/propertygrid/_controlProperties';
import { GroupObject } from '../widgets/propertygrid/_group';
import { IActionsProvider } from '../_actionsProvider.interface';
import { ControlsFactory } from './controlsFactory';
import { IGroupedItem } from './_utils';
import { IDesignerPart } from './_utils.designerPart';
import { TabPanel } from '../widgets/tabPanel';
import { TabInfo } from '../widgets/tabInfo';
import { ContextMenuProvider } from '../tools/contextMenuProvider';
export interface IDesignerContext {
    model: ko.Observable | ko.Computed;
    surface?: ko.Observable | ko.Computed;
    undoEngine?: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>;
}
export interface IDesignerModel extends IDisposable {
    model: ko.Observable | ko.Computed;
    rtl: boolean;
    surface: ko.Observable | ko.Computed;
    undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>;
    selection: SurfaceSelection;
    snapHelper: SnapLinesHelper;
    editableObject: ko.Observable<any>;
    dragHelperContent: DragHelperContent;
    dragDropStarted: ko.Observable<boolean> | ko.Computed<boolean>;
    dragHandler: SelectionDragDropHandler;
    toolboxDragHandler: ToolboxDragDropHandler;
    resizeHandler: IResizeHandler;
    toolboxItems: ToolboxItem[];
    groupedToolboxItems: IGroupedItem<ToolboxItem>[];
    isLoading: ko.Observable<boolean> | ko.Computed<boolean>;
    propertyGrid: ControlProperties;
    popularProperties: ObjectProperties;
    controlsHelper: DesignControlsHelper;
    controlsStore: ControlsStore;
    tabPanel: TabPanel;
    contextActionProviders: IActionsProvider[];
    contextActions: ko.Observable<IAction[]> | ko.Computed<IAction[]>;
    contextGroupActions: ko.Computed<IGroupedItem<IAction>[]>;
    appMenuVisible: ko.Observable<boolean> | ko.Computed<boolean>;
    toggleAppMenu: () => void;
    getMenuPopupContainer: (el: HTMLElement) => JQuery;
    getMenuPopupTarget: (el: HTMLElement) => JQuery;
    inlineTextEdit: InlineTextEdit;
    actionsGroupTitle: () => string;
    updateFont: (values: {
        [key: string]: string;
    }) => void;
    sortFont: () => void;
    surfaceSize: ko.Observable<number> | ko.Computed<number>;
    popularVisible: ko.Computed<boolean>;
    groupActionsVisible: ko.Computed<boolean>;
    actionLists: ActionLists;
    parts: IDesignerPart[];
    ContextMenusEnabled: ko.Observable<boolean>;
    surfaceClass: (elem: any) => string;
    disposableContainer: Disposable;
    addDisposables: (...elem: DisposableType[]) => void;
    containerClass: string;
}
export declare class DesignerContextGeneratorInternal<T extends IDesignerContext> {
    private _context;
    private _rtl?;
    constructor(_context: T, _rtl?: boolean);
    addElement(propertyName: string, model: object): DesignerContextGeneratorInternal<IDesignerContext>;
    addUndoEngine(undoEngine?: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>): DesignerContextGeneratorInternal<IDesignerContext>;
    addSurface(surface: ko.Observable | ko.Computed): DesignerContextGeneratorInternal<IDesignerContext>;
    getContext(): IDesignerContext;
}
export declare class DesignerContextGenerator<T extends IDesignerContext> {
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
    snapHelper?: SnapLinesHelper;
}
export declare class ResizeSettings extends Disposable implements IDesingerGeneratorSettings {
    private _handler;
    get handler(): IResizeHandler;
    set handler(newVal: IResizeHandler);
    generate(): object;
}
export declare class ContextActionsSettings extends Disposable implements IDesingerGeneratorSettings {
    private _actionProviders;
    private _actions;
    private _groupActions;
    private _actionUndoEngineWrappingFunction;
    private _collectActions;
    get actionProviders(): IActionsProvider[];
    set actionProviders(val: IActionsProvider[]);
    get actions(): ko.Observable<IAction[]> | ko.Computed<IAction[]>;
    set actions(val: ko.Observable<IAction[]> | ko.Computed<IAction[]>);
    get groupActions(): ko.Observable<IGroupedItem<IAction>[]> | ko.Computed<IGroupedItem<IAction>[]>;
    set groupActions(val: ko.Observable<IGroupedItem<IAction>[]> | ko.Computed<IGroupedItem<IAction>[]>);
    createDefaultActions(editableObj: ko.Observable<any> | ko.Computed<any>, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>): void;
    createDefaultGroupAction(editableObj: ko.Observable<any> | ko.Computed<any>, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>): void;
    createDefaultContextMenuActions(editableObj: ko.Observable<any> | ko.Computed<any>, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>): void;
    generate(): object;
    generateContextMenu(model: IDesignerModel): {
        contextMenu: ContextMenuProvider;
    };
}
export declare class DragDropSettings extends Disposable implements IDesingerGeneratorSettings {
    private _model;
    private _dragHelperContent;
    private _dragDropStarted;
    get dragHelperContent(): DragHelperContent;
    set dragHelperContent(val: DragHelperContent);
    get dragDropStarted(): boolean | ko.Observable<boolean>;
    set dragDropStarted(val: boolean | ko.Observable<boolean>);
    addDragDropHandler(propertyName: string, handler: DragDropHandler): void;
    generate(): object;
}
export declare class ControlsHelperSettings extends Disposable implements IDesingerGeneratorSettings {
    private _selection;
    private _context;
    private _model;
    private controlsHelper;
    constructor(_selection: SurfaceSelection, _context: IDesignerContext);
    generate(): object;
    addControlsHelper(helper?: IDesignControlsHelper): ControlsHelperSettings;
    addControlsStore(store?: ControlsStore): ControlsHelperSettings;
}
export declare class MenuSettings extends Disposable implements IDesingerGeneratorSettings {
    generate(): object;
    _appMenuVisible: ko.Observable<boolean> | ko.Computed<boolean>;
    toggleAppMenu: () => void;
    stopPropagation: boolean;
    getMenuPopupContainer: (el: HTMLElement) => JQuery<Element>;
    getMenuPopupTarget: (el: HTMLElement) => JQuery<Element>;
    get appMenuVisible(): ko.Observable<boolean> | ko.Computed<boolean>;
    set appMenuVisible(val: ko.Observable<boolean> | ko.Computed<boolean>);
}
export declare class SelectionSettings extends Disposable implements IDesingerGeneratorSettings {
    private _selection;
    private _snapHelper;
    private _editableObject;
    private _dragDropSettings;
    private _resizeSettings;
    dispose(): void;
    get selection(): SurfaceSelection;
    set selection(val: SurfaceSelection);
    get snapHelper(): SnapLinesHelper;
    set snapHelper(val: SnapLinesHelper);
    get editableObject(): ko.Observable<any> | ko.Computed<any>;
    set editableObject(val: ko.Observable<any> | ko.Computed<any>);
    addDragDrop(func: (settings: DragDropSettings) => void): void;
    addResize(func: (settings: ResizeSettings) => void): void;
    generate(): object;
}
export declare class CommonDesignerGenerator<T extends IDesignerModel> extends Disposable {
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
    initializeContext(context: IDesignerContext): CommonDesignerGenerator<IDesignerModel>;
    getPropertyByName<T>(propertyName: string): any;
    addElement(propertyName: string, elementFunc: () => any): CommonDesignerGenerator<IDesignerModel>;
    mapOnContext(): CommonDesignerGenerator<IDesignerModel>;
    addSelection(func: (settings: SelectionSettings) => void): CommonDesignerGenerator<IDesignerModel>;
    addPropertyGrid(propertyGrid?: () => ObjectProperties, propertyName?: string): CommonDesignerGenerator<IDesignerModel>;
    addContextMenu(contextMenu: ContextMenuProvider): void;
    addDisposableContainer(): CommonDesignerGenerator<IDesignerModel>;
    addControlProperties(editors: ISerializationInfoArray, groups: GroupObject, accessibilityProvider?: IPropertiesAccessibilityProvider): CommonDesignerGenerator<IDesignerModel>;
    createControlProperties(editors: ISerializationInfoArray, groups: GroupObject, accessibilityProvider?: IPropertiesAccessibilityProvider): ControlProperties;
    addPopularProperties(controlsFactory: ControlsFactory, accessibilityProvider?: IPropertiesAccessibilityProvider): CommonDesignerGenerator<IDesignerModel>;
    addToolboxItems(items?: () => ToolboxItem[]): CommonDesignerGenerator<IDesignerModel>;
    addGroupedToolboxItems(): CommonDesignerGenerator<IDesignerModel>;
    addTabPanel(panel?: () => TabPanel, addTabInfo?: () => TabInfo[]): CommonDesignerGenerator<IDesignerModel>;
    addIsLoading(isLoadingFunc?: () => ko.Observable<boolean>): CommonDesignerGenerator<IDesignerModel>;
    addControlsHelper(func: (settings: ControlsHelperSettings) => void): CommonDesignerGenerator<IDesignerModel>;
    addMenu(func: (settings: MenuSettings) => void): CommonDesignerGenerator<IDesignerModel>;
    addContextActions(func: (contextActions: ContextActionsSettings) => void): CommonDesignerGenerator<IDesignerModel>;
    addParts(func?: (parts: any) => IDesignerPart[], useDefaults?: boolean): CommonDesignerGenerator<IDesignerModel>;
    getModel(): IDesignerModel;
    addActionList(actionListsFunc?: () => ActionLists): CommonDesignerGenerator<IDesignerModel>;
}