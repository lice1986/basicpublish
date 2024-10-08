﻿/**
* DevExpress Analytics (core\internal\_objectStructureProviders.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
import { IItemsProvider, IDataMemberInfo } from '../../widgets/utils';
import { IPathRequest } from '../../widgets/common/pathRequest';
export interface IRootItem {
    model: any;
    displayName?: string;
    name: string;
    className: string;
    data?: any;
    hasContextMenu?: boolean;
}
export declare class ObjectStructureProviderBase extends Disposable implements IItemsProvider {
    getClassName(instance: any): any;
    createItem(currentTarget: any, propertyName: string, propertyValue: any, result: IDataMemberInfo[]): void;
    getMemberByPath(target: any, path: string): any;
    getObjectPropertiesForPath(target: any, path: string, propertyName?: string): IDataMemberInfo[];
    createArrayItem(currentTarget: Array<any>, result: IDataMemberInfo[], propertyName?: any): void;
    getItems: (pathRequest: IPathRequest) => JQueryPromise<IDataMemberInfo[]>;
    selectedPath: ko.Observable<string> | ko.Computed<string>;
    selectedMember: ko.Observable | ko.Computed;
}
export declare class ObjectExplorerProvider extends ObjectStructureProviderBase {
    getPathByMember: (model: any) => string;
    createArrayItem(currentTarget: Array<any>, result: IDataMemberInfo[], propertyName?: any): void;
    createItem(currentTarget: any, propertyName: string, propertyValue: any, result: IDataMemberInfo[]): void;
    constructor(rootITems: IRootItem[], listPropertyNames?: string[], member?: ko.Observable | ko.Computed, getPathByMember?: any);
    path: ko.Observable<string> | ko.Computed<string>;
    listPropertyNames: string[];
}
export declare class ObjectStructureProvider extends ObjectStructureProviderBase {
    constructor(target: any, displayName?: string, localizationId?: string);
}
