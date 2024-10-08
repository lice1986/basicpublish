﻿/**
* DevExpress Analytics (core\elements\elementViewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IModelAction, IModelActionProvider } from '../../property-grid/widgets/internal/_utils';
import { ISerializationInfo, ISerializationInfoArray } from '../../serializer/serializationInfo';
import { IModelSerializer } from '../../serializer/serializer';
import { Disposable } from '../../serializer/disposable';
import { ISelectionTarget } from '../selection/_selection';
import { ControlsFactory } from '../utils/controlsFactory';
export interface IElementMetadata {
    info: ISerializationInfoArray;
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
    canDrop?: (dropTarget: ISelectionTarget, dragFrom?: ElementViewModel) => boolean;
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
    actions: IModelAction[];
    actionProviders?: IModelActionProvider[];
}
export declare class ElementViewModel<T extends string = string> extends Disposable implements IElementViewModel<T>, IControlPropertiesViewModel<T> {
    protected _resetProperty(propertyName: string): void;
    getPropertyDefaultValue(propertyName: string): any;
    getPropertyInfo(propertyName: string): ISerializationInfo;
    getInfo(): ISerializationInfoArray;
    createControl(model: any, serializer?: IModelSerializer): IElementViewModel<string>;
    dispose(): void;
    preInitProperties(model: any, parent: ElementViewModel<T>, serializer?: IModelSerializer): void;
    constructor(model: any, parent: ElementViewModel<T>, serializer?: IModelSerializer);
    getNearestParent(target: IElementViewModel<T>): any;
    getControlInfo(): { [key in string | T]?: IElementMetadata; }[T | "Unknown"];
    getMetaData(): {
        isContainer: boolean;
        isCopyDeny: boolean;
        isDeleteDeny: boolean;
        canDrop: (dropTarget: ISelectionTarget<string>, dragFrom?: ElementViewModel<string>) => boolean;
        isPasteDeny: boolean;
    };
    _hasModifiedValue(name: any): any;
    name: ko.Observable<string> | ko.Computed<string>;
    controlType: T;
    createChild(info: {}): ElementViewModel<T>;
    removeChilds(controls: ElementViewModel<T>[]): void;
    addChilds(controls: ElementViewModel<T>[]): void;
    removeChild(control: ElementViewModel<T>): void;
    addChild(control: IElementViewModel<T>): void;
    isPropertyVisible(name: string): boolean;
    isPropertyDisabled(name: string): boolean;
    isPropertyModified(name: string): any;
    getControlFactory(): ControlsFactory<T>;
    resetValue: (propertyName: string) => void;
    isResettableProperty(propertyName: string): boolean;
    surface: any;
    parentModel: ko.Observable<ElementViewModel<T>>;
    _getRoot(): ElementViewModel<T>;
    get root(): ElementViewModel<T>;
    rtl(): boolean;
    onDelete(): void;
    actions: IModelAction[];
    actionProviders: any[];
    update: ko.Observable<boolean>;
}
