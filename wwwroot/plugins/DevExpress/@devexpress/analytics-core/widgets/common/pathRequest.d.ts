﻿/**
* DevExpress Analytics (widgets\common\pathRequest.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface IPathRequest {
    fullPath: string;
    path: string;
    ref?: string;
    id?: string;
    dataSource?: any;
    state?: any;
    pathParts?: string[];
}
export declare class PathRequest implements IPathRequest {
    pathParts: string[];
    constructor(fullPath: string, pathParts?: string[]);
    fullPath: string;
    ref: string;
    id: string;
    path: string;
}
