﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\_utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { IDataSourceRefInfo, IReportWizardSettings } from '../utils/inititalizer';
import { GraphicsUnit } from './reportWizardState';
export declare function getFormattedValueInUnits(value: number, unit: GraphicsUnit): string;
export interface IReportWizardData {
    report: ko.Observable | ko.Computed;
    availableDataSources: IDataSourceInfo[];
    dataSourceRefs: IDataSourceRefInfo[];
    isReportServer?: boolean;
    disableCustomSql?: boolean;
    wizardSettings?: IReportWizardSettings;
}
export declare class ListViewModel<T> {
    caption?: string;
    private _items;
    private _refreshActiveItem;
    activeItemArray: ko.ObservableArray<T>;
    constructor(caption?: string);
    get items(): T[];
    get activeItem(): T;
    set activeItem(value: T);
    add(item: T): void;
    addRange(items: T[]): void;
    removeActiveItem(): void;
    removeAll(): void;
    setItems(items: T[]): void;
    moveUp(): void;
    moveDown(): void;
    get isEmpty(): boolean;
    isMoveUpEnabled(): boolean;
    isMoveDownEnabled(): boolean;
}
