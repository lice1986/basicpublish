﻿/**
* DevExpress Analytics (query-builder\elements\_federationColumnModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
import { IModelSerializer } from '../../serializer/serializer';
import { DBColumn } from '../dataSource/dbColumn';
import { AllColumnsViewModel } from './allColumnsModel';
import { ColumnViewModel } from './columnModel';
import { TableViewModel } from './tableModel';
export declare class FederationColumnViewModel extends ColumnViewModel {
    constructor(model: any, dbColumn: DBColumn, parent: TableViewModel, serializer?: IModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class FederationAllColumnsViewModel extends AllColumnsViewModel {
    constructor(parent: TableViewModel, serializer?: any);
    getInfo(): ISerializationInfoArray;
}
