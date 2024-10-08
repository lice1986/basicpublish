﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_localizationUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, ISerializableModel, ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { ILocalizationItemInfo } from '../../localization/_localization';
import { XRChartViewModel } from '../xrChart';
import { ReportViewModel } from '../xrReport';
import { XRTableOfContentsViewModel } from '../xrTableOfContents';
export declare function __createLocalizationProperties(target: ISerializableModel, format?: string): LocalizedProperty[];
export declare class DefaultLocalizationProvider<T extends ILocalizedControl> extends Disposable {
    _model: T;
    dispose(): void;
    _localizationInfo: LocalizedProperty[];
    constructor(_model: T);
    getLocalizationProperty(propertyName: string): LocalizedProperty;
    getLocalizationProperties(): LocalizedProperty[];
    applyLocalization(propertyName: string, propertyValue: ILocalizationItemInfo): void;
}
export declare class TableOfContentLocalizationProvider extends DefaultLocalizationProvider<XRTableOfContentsViewModel> {
    getLocalizationProperties(): LocalizedProperty[];
}
export declare class ReportLocalizationProvider extends DefaultLocalizationProvider<ReportViewModel> {
    getLocalizationProperties(): LocalizedProperty[];
}
export declare class ChartLocalizationProvider extends DefaultLocalizationProvider<XRChartViewModel> {
    getLocalizationProperties(): LocalizedProperty[];
}
export declare class LocalizedProperty {
    propertyName: string;
    value: any;
    info: ISerializationInfo;
    constructor(propertyName: string, value: any, info: ISerializationInfo);
    applyLocalization(value: ILocalizationItemInfo): void;
}
export interface ILocalizedControl extends ISerializableModel {
    getLocalizationProperties(): LocalizedProperty[];
    applyLocalization(propertyName: string, value: any): void;
    getLocalizationProperty(propertyName: string): LocalizedProperty;
}
