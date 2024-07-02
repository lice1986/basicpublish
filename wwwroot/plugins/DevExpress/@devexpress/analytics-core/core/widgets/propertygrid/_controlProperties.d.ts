﻿/**
* DevExpress Analytics (core\widgets\propertygrid\_controlProperties.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ObjectProperties } from '../../../property-grid/propertygrid';
import { GroupObject, Group } from './_group';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
import { IPropertiesAccessibilityProvider } from '../../../property-grid/_propertiesAccessibilityProvider';
export declare class ControlProperties extends ObjectProperties {
    getEditors(): import("../../../analytics-serializer-native").Unwrapped<this["_editors"]>;
    protected _update(target: any, editorsInfo: any, recreateEditors: any): void;
    cleanEditors(): void;
    dispose(): void;
    createGroups(groups: GroupObject): void;
    registerAccessibilityProvider(accessibilityProvider: IPropertiesAccessibilityProvider): void;
    constructor(target: ko.Observable<any>, editorsInfo?: {
        groups?: GroupObject;
        editors?: ISerializationInfoArray;
    }, level?: number, useAddons?: boolean, useLocalizableDescriptions?: boolean);
    focusedItem: ko.Observable | ko.Computed;
    focusedImageClassName: ko.Observable<string> | ko.Computed<string>;
    displayExpr: (value: any) => string;
    groups: Group[];
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
