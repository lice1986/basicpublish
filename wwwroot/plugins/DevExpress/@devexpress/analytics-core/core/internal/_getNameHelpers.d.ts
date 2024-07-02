﻿/**
* DevExpress Analytics (core\internal\_getNameHelpers.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare function getTypeNameFromFullName<T extends string = string>(controlType: string): string;
export declare function getShortTypeName(controlType: string): string;
export declare function getControlTypeName(value: any): any;
export declare function getControlFullName(value: any): string;
export declare function getImageClassName(_controlType: string, isTemplate?: boolean): string;
export declare function getUniqueNameForNamedObjectsArray(objects: any[], prefix: string, names?: string[]): string;
export declare function getUniqueName(names: string[], prefix: string, inculdeFirst?: boolean): string;