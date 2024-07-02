﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\propertyExpressionMapper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class PropertyExpressionMapper {
    static propertiesWithExpressions: string[];
    getExpressionPropertyName(propertyName: string): string;
    registerExpressionProperty(property: ISerializationInfo): ISerializationInfo;
    isPropertyVisible(propertyName: string, editingMode: boolean): boolean;
    getExpressionProperty(propertyName: string): {
        showExpression: ko.Observable<boolean>;
    };
    private _mapper;
}