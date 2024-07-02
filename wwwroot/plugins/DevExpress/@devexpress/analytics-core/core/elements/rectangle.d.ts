﻿/**
* DevExpress Analytics (core\elements\rectangle.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare class Rectangle {
    constructor(left?: number, top?: number, width?: number, height?: number);
    left: ko.Observable<number>;
    top: ko.Observable<number>;
    width: ko.Observable<number>;
    height: ko.Observable<number>;
    className: string;
}
