﻿/**
* DevExpress Analytics (core\elements\size.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
export interface ISize {
    width: ko.Observable<number> | ko.Computed<number>;
    height: ko.Observable<number> | ko.Computed<number>;
    isPropertyDisabled: (name: string) => void;
}
export declare class Size implements ISize {
    static unitProperties: string[];
    constructor(width: any, height: number);
    getInfo(): ISerializationInfoArray;
    static fromString(value?: string): Size;
    toString(): string;
    isPropertyDisabled: (name: string) => any;
    isPropertyVisible: (name: string) => boolean;
    width: ko.Observable<number> | ko.Computed<number>;
    height: ko.Observable<number> | ko.Computed<number>;
}