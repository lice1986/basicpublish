﻿/**
* DevExpress Analytics (core\utils\_visitors.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare function objectsVisitor(target: any, visitor: (target: any) => any, visited?: any[], skip?: Array<string>): void;
export declare function collectionsVisitor(target: any, visitor: (target: any, owner?: any) => any, collectionsToProcess?: string[], visited?: any[]): void;