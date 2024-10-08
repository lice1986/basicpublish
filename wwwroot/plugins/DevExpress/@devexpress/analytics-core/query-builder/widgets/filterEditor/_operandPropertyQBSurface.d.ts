﻿/**
* DevExpress Analytics (query-builder\widgets\filterEditor\_operandPropertyQBSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { OperandPropertySurface } from '../../../widgets/filtereditor/operators/operandPropertySurface';
import { OperandProperty } from '../../../widgets/criteria/operators/property';
import { QueryBuilderObjectsProvider } from './_queryBuilderObjectsProvider';
import { IDataMemberInfo } from '../../../widgets/utils';
export declare class OperandPropertyQBSurface extends OperandPropertySurface {
    _updateSpecifics(): void;
    constructor(operator: OperandProperty, parent: any, fieldListProvider?: QueryBuilderObjectsProvider, path?: any);
    fieldListProvider: ko.Observable<QueryBuilderObjectsProvider>;
    static updateSpecifics(propertySurface: {
        fieldListProvider: ko.Observable<{
            getColumnInfo: (path: string) => IDataMemberInfo;
        }>;
        propertyName: ko.Observable<string>;
        specifics: ko.Observable<string>;
        dataType: ko.Observable<string>;
        fieldsOptions?: ko.Observable<{
            selected: ko.Observable<any>;
        }>;
    }): void;
}
