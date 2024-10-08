﻿/**
* DevExpress Analytics (core\utils\parsers.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer } from '../../serializer/native/serializer';
export declare function floatFromModel(val: string, serializer?: IModelSerializer): import("../../serializer/native/multiplatformEngine").MultiPlatformObservable<number>;
export declare function fromEnum(value: string, serializer?: IModelSerializer): import("../../serializer/native/multiplatformEngine").MultiPlatformObservable<string>;
export declare function parseBool(val: any, serializer?: IModelSerializer): any;
export declare function colorFromString(val: string, serializer?: IModelSerializer): import("../../serializer/native/multiplatformEngine").MultiPlatformObservable<string>;
export declare function saveAsInt(val: number): string;
export declare function colorToInt(color: string): number;
export declare function colorToString(val: string): string;
