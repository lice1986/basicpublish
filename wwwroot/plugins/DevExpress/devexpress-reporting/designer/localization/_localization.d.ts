﻿/**
* DevExpress HTML/JS Reporting (designer\localization\_localization.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ILocalizedControl } from '../controls/utils/_localizationUtils';
export declare class LocalizationItem {
    culture: ko.Observable<string>;
    component: ko.Observable<ILocalizedControl>;
    propertyName: ko.Observable<string>;
    propertyValue: ko.Observable<any>;
    constructor(model?: any, serializer?: any);
    getInfo(): ISerializationInfo[];
}
export declare function searchInLocalizationArray(localizationArray: ILocalizationItemInfo[], controlPropertyName: string, component: ILocalizedControl): ILocalizationItemInfo;
export interface ILocalizationItemInfo {
    propertyName: string;
    component: ILocalizedControl;
    value: any;
    recalculate?: (coef: number) => any;
}
export declare class LocalizationDictionary {
    private cultures;
    add(code: string): LocalizationInfo;
    get(code: string): LocalizationInfo;
    count: () => number;
    keys(): string[];
    clear: (code?: string) => void;
}
export declare class LocalizationInfo {
    private code;
    properties: ILocalizationItemInfo[];
    parent: LocalizationInfo;
    isLocalized: ko.Observable<boolean>;
    constructor(code: string);
    getInheritedProperties(): ILocalizationItemInfo[];
    createNodes(code: string, list: LocalizationDictionary): void;
    private mergePropertiesWithChild;
    private _recalculateUnit;
    private _updateLocalizationInfoItem;
    setValue: (component: ILocalizedControl, propertyName: string, value: any) => void;
    private _createLocalizationItem;
    serialize(canSerialize: (contol: any) => boolean): LocalizationItem[];
    private findClosestProperty;
    private getParentCulture;
}