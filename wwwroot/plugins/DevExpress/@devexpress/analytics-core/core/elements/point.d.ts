﻿/**
* DevExpress Analytics (core\elements\point.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
export interface IPoint {
    x: ko.Observable<number> | ko.Computed<number>;
    y: ko.Observable<number> | ko.Computed<number>;
}
export declare class Point implements IPoint {
    static unitProperties: string[];
    constructor(x: any, y: number);
    getInfo(): ISerializationInfoArray;
    static fromString(value?: string): Point;
    toString(): string;
    x: ko.Observable<number> | ko.Computed<number>;
    y: ko.Observable<number> | ko.Computed<number>;
}