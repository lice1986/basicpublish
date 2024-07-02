﻿/**
* DevExpress HTML/JS Reporting (chart\internal\chartStructure\_provider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectStructureProvider } from '@devexpress/analytics-core/analytics-internal';
import { IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
export declare class ChartStructureObjectProvider extends ObjectStructureProvider {
    getClassName(instance: any): any;
    createArrayItem(currentTarget: Array<any>, result: IDataMemberInfo[], propertyName?: any): void;
    constructor(target: any, displayName?: string, localizationId?: string);
}