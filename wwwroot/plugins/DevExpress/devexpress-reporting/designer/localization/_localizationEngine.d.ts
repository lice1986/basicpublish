﻿/**
* DevExpress HTML/JS Reporting (designer\localization\_localizationEngine.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { ILocalizedControl } from '../controls/utils/_localizationUtils';
import { ReportViewModel } from '../controls/xrReport';
import { LocalizationDictionary, LocalizationItem } from './_localization';
export declare class ReportLocalizationEngine extends Disposable {
    report: ReportViewModel;
    items: LocalizationDictionary;
    constructor(report: ReportViewModel);
    recalculateUnits(coef: any): void;
    hasCulture(cultureCode: string): boolean;
    add: (cultureCode: string, component: ILocalizedControl, propertyName: string, value: any) => void;
    isLocalized(): boolean;
    save: (cultureCode?: string) => void;
    apply: (cultureCode: string) => void;
    serialize: () => LocalizationItem[];
}
