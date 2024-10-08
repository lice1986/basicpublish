﻿/**
* DevExpress Analytics (property-grid\propertygrid.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IPropertiesAccessibilityProvider } from './_propertiesAccessibilityProvider';
import { Editor, IEditorViewModel } from './widgets/editor';
import { IControlPropertiesViewModel } from './widgets/internal/_utils';
import { ISerializationInfo, ISerializationInfoArray } from '../serializer/serializationInfo';
import { PopupService } from './internal/_popupService';
import { IEditorAddon } from './internal/_addon';
import { BaseRenderingMultiplatformModel, EngineType } from '../serializer/native/models/base.model';
import { IViewModel } from '../serializer/native/models/interfaces.model';
import { MultiPlatformComputed, MultiPlatformObservable } from '../serializer/native/multiplatformEngine';
import { IPopoverViewModel, Popover } from '../core/widgets/popover';
export interface IObjectPropertiesViewModel extends IViewModel {
    editors: IEditorViewModel[];
    popover: IPopoverViewModel;
    rtl: boolean;
}
export declare class ObjectProperties extends BaseRenderingMultiplatformModel<IObjectPropertiesViewModel> {
    private recreateEditors;
    popover?: Popover;
    private _viewModelSubscription;
    private _infoSubscription;
    updateModel: (model: any) => void;
    _getInfoComputed: MultiPlatformComputed<ISerializationInfoArray>;
    protected _accessibilityProvider: IPropertiesAccessibilityProvider;
    protected _parent: Editor;
    createViewModel(): IObjectPropertiesViewModel;
    update(viewModel: IControlPropertiesViewModel): void;
    private _cleanEditorsSubscriptions;
    dispose(): void;
    cleanSubscriptions(): void;
    cleanEditors(): void;
    findEditorByInfo(serializationInfo: ISerializationInfo): Editor;
    createEditor(modelPropertyInfo: ISerializationInfo): any;
    createEditors(serializationInfo: ISerializationInfoArray): any[];
    registerAccessibilityProvider(accessibilityProvider: IPropertiesAccessibilityProvider): void;
    assignParent(parent: Editor): void;
    private _createEditors;
    updateEditorsInfo(model: any, info: any): void;
    protected _update(viewModel: IControlPropertiesViewModel, editorsInfo: any, recreateEditors: any): void;
    private _recreateEditors;
    constructor(viewModel: ko.Observable<any> | ko.Computed<any> | any, editorsInfo?: {
        editors?: MultiPlatformObservable<ISerializationInfoArray> | ko.Observable<ISerializationInfoArray> | ko.Computed<ISerializationInfoArray>;
    }, level?: number, parentDisabled?: MultiPlatformObservable<boolean>, recreateEditors?: boolean, textToSearch?: any, popupService?: PopupService, popover?: Popover, engineType?: EngineType);
    level: number;
    popupService: PopupService;
    createEditorAddOn: (editor: Editor) => IEditorAddon;
    createEditorDescriptionAddOn: (editor: Editor) => IEditorAddon;
    rtl: boolean;
    getEditors(): import("../serializer/native/multiplatformEngine").Unwrapped<this["_editors"]>;
    get editors(): import("../serializer/native/multiplatformEngine").Unwrapped<this["_editors"]>;
    _textToSearch: any;
    visible: MultiPlatformObservable<boolean>;
    _editors: MultiPlatformObservable<Editor[]>;
    private _parentDisabled;
}
export interface IPropertyGridEditorViewModel extends IEditorViewModel {
    viewmodel: IObjectPropertiesViewModel;
}
export declare class PropertyGridEditor extends Editor {
    private _popupService?;
    private _popover?;
    createViewModel(): IEditorViewModel;
    constructor(info: ISerializationInfo, level: number, parentDisabled?: ko.Computed<boolean>, textToSearch?: any, _popupService?: PopupService, _popover?: Popover, engineType?: EngineType);
    createObjectProperties(): ObjectProperties;
    _editorInfo: MultiPlatformComputed<ISerializationInfoArray>;
    registerAccessibilityProvider(accessibilityProvider: IPropertiesAccessibilityProvider): void;
    visibleByName: MultiPlatformComputed<boolean>;
    viewmodel: ObjectProperties;
}
export declare class PropertyGridEditorFlat extends PropertyGridEditor {
    createObjectProperties(): ObjectProperties;
}
