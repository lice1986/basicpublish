﻿/**
* DevExpress Analytics (property-grid\widgets\editor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IControlPropertiesViewModel, IModelAction } from './internal/_utils';
import { IPropertiesAccessibilityProvider } from '../_propertiesAccessibilityProvider';
import { ISerializationInfo } from '../../serializer/serializationInfo';
import { getLocalization } from '../localization/localization_utils';
import { BaseRenderingMultiplatformModel, EngineType } from '../../serializer/native/models/base.model';
import { IViewModel } from '../../serializer/native/models/interfaces.model';
import { getParentContainer } from '../../widgets/_utils';
import { IEditorAddon } from '../internal/_addon';
import { MultiPlatformComputed, MultiPlatformObservable } from '../../serializer/native/multiplatformEngine';
import { PopupService } from '../internal/_popupService';
import { PropertyChangedEventArgs, ArrayPropertyChangedEventArgs } from '../../serializer/propertyChangedEvents';
import { Popover } from '../../core/widgets/popover';
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
    editorDescriptionAddon: IEditorAddon;
    editorTemplate: string;
    createEditorAddOn: (editor: IEditorViewModel<T>) => IEditorAddon;
    createDescriptionAddOn: (editor: IEditorViewModel<T>) => IEditorAddon;
    validationRules: any;
    getLocalization: typeof getLocalization;
    getPopupContainer: typeof getParentContainer;
    editorInputId: string;
    padding: any;
    values: any[];
    validatorOptions: any;
    getValidatorOptions: (validatorOptions: any, validationRules?: any) => any;
    onCustomItemCreating: (e: any) => void;
    level: number;
    info: ISerializationInfo;
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
export declare function unwrapEditor(editor: IEditorViewModel | Editor): Editor;
export declare class Editor extends BaseRenderingMultiplatformModel<IEditorViewModel> {
    createViewModel(): IEditorViewModel;
    _setPadding(position: string, value: any): {};
    _model: MultiPlatformObservable<IControlPropertiesViewModel>;
    _parent: MultiPlatformObservable<Editor>;
    isSearchedProperty: MultiPlatformObservable<boolean> | MultiPlatformComputed<boolean>;
    isParentSearched: MultiPlatformObservable<boolean>;
    rtl: boolean;
    _accessibilityProvider: MultiPlatformObservable<IPropertiesAccessibilityProvider>;
    _editorOptions: MultiPlatformComputed<any>;
    private _validator;
    dispose(): void;
    constructor(modelPropertyInfo: ISerializationInfo, level: any, parentDisabled?: any, textToSearch?: any, popupService?: PopupService, popover?: Popover, engineType?: EngineType);
    protected _shouldSkipHighlighting(propertyName: string): boolean;
    private _cachedValue;
    private _assignValue;
    private _roundTwoDesemialsForUnitProperties;
    private _init;
    private _getInfoFromModel;
    onPropertyChanged(args: PropertyChangedEventArgs<any> | ArrayPropertyChangedEventArgs<any>): void;
    update(viewModel: IControlPropertiesViewModel): void;
    getOptions(templateOptions: any): object;
    _getExtendedOptions(): object;
    getValidatorOptions(templateValidatorOptions: any): any;
    registerAccessibilityProvider(accessibilityProvider: IPropertiesAccessibilityProvider): void;
    assignParent(parent: Editor): void;
    _getEditorValidationRules(): any[];
    getValidationRules(): any;
    setIsRendered(val: boolean): void;
    get validationRules(): any;
    get fullDisplayName(): string;
    padding: any;
    level: any;
    textToSearch: MultiPlatformObservable<string> | MultiPlatformComputed<string>;
    info: MultiPlatformObservable<ISerializationInfo>;
    name: string;
    displayName: MultiPlatformComputed<string>;
    description: MultiPlatformComputed<string>;
    editorDescriptionAddon: IEditorAddon;
    templateName: string;
    contentTemplateName: string;
    editorTemplate: string;
    viewmodel: any;
    values: MultiPlatformComputed<{
        displayValue: string;
        value: string;
    }[]>;
    value: MultiPlatformComputed<any>;
    isEditorSelected: MultiPlatformObservable<boolean>;
    isRequired: boolean;
    isPropertyModified: MultiPlatformComputed<boolean>;
    isPropertyHighlighted: MultiPlatformComputed<boolean>;
    disabled: MultiPlatformComputed<boolean>;
    visible: MultiPlatformComputed<boolean>;
    isRendered: MultiPlatformObservable<boolean>;
    headerId: string;
    contentId: string;
    editorInputId: string;
    parentName: string;
    editorCreated: boolean;
    getPopupServiceActions(): IModelAction[];
    get editorOptions(): any;
    validatorOptions: any;
    defaultValue: any;
    get isComplexEditor(): boolean;
    collapsed: MultiPlatformObservable<boolean>;
    alwaysShow: MultiPlatformObservable<boolean>;
    _isSearchedPropertySubscription: () => void;
}
export declare function createEditorDescriptionAddOn(editor: IEditorViewModel | Editor, popover: Popover): IEditorAddon;
