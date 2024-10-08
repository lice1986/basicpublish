﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrDetailBand.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { GroupFieldModel } from './groupfield';
import { MultiColumn } from './multiColumn';
import { BandSurface, BandViewModel } from './xrBand';
interface IHierarchyPrintOptions {
    keyFieldName: ko.Observable<string>;
    childListFieldName: ko.Observable<string>;
    parentFieldName: ko.Observable<string>;
    indent: ko.Observable<number>;
    keepTogetherWithFirstChild: ko.Observable<boolean>;
    isPropertyDisabled: (propertyName: string) => boolean;
    getPath: (propertyName?: string) => string;
}
export declare class DetailBand extends BandViewModel {
    static unitProperties: any[];
    dispose(): void;
    preInit(band: any, parent: ElementViewModel, serializer?: ModelSerializer): void;
    hasHierarchyPrintOptions(): boolean;
    constructor(band: any, parent: any, serializer: any);
    isPropertyDisabled(name: string): any;
    multiColumn: MultiColumn;
    hierarchyPrintOptions: IHierarchyPrintOptions;
    sortFields: ko.ObservableArray<GroupFieldModel>;
}
export declare class DetailBandSurface extends BandSurface {
    protected _initMultiColumn(): void;
    _control: DetailBand;
}
export {};
