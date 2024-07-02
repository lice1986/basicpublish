﻿/**
* DevExpress Analytics (core\utils\_units.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { MeasureUnit } from '../internal/_papperKindMapper';
export interface IUnitProperties<M> {
    [key: string]: (o: M) => ko.Observable<number> | ko.Computed<number>;
}
export declare function createUnitProperty<M>(model: M, target: object, propertyName: string, property: (o: M) => ko.Observable<number> | ko.Computed<number>, measureUnit: ko.Observable<MeasureUnit> | ko.Computed<MeasureUnit>, zoom: ko.Observable<number> | ko.Computed<number>, afterCreation?: (property: any) => void): void;
export declare function createUnitProperties<M>(model: M, target: object, properties: IUnitProperties<M>, measureUnit: ko.Observable<MeasureUnit> | ko.Computed<MeasureUnit>, zoom: ko.Observable<number> | ko.Computed<number>, afterCreation?: (property: any) => void): void;