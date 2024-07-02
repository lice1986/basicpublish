﻿/**
* DevExpress Analytics (query-builder\wizard\internal\objectDataSource\_objectSchemaProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { ObjectType } from '../../../dataSource/object/objectSchema';
import { IItemsProvider, IDataMemberInfo } from '../../../../widgets/utils';
import { RequestWrapper } from '../../../utils/requestwrapper';
import { Disposable } from '../../../../serializer/disposable';
import { IPathRequest } from '../../../../widgets/common/pathRequest';
export declare class ObjectTypeDescriptions {
    types: ObjectType[];
    constructor(model: any);
}
export interface IObjectSchemaProvider extends IItemsProvider {
    getObjectTypeDescriptions: () => JQueryPromise<ObjectTypeDescriptions>;
}
export declare function getObjectTypeDescriptionsCallback(requestWrapper: RequestWrapper, context: string): JQueryPromise<ObjectTypeDescriptions>;
export declare class ObjectSchemaProvider extends Disposable implements IObjectSchemaProvider {
    private _requestWrapper;
    private _objectTypeDescriptionsPromise;
    constructor(_requestWrapper?: RequestWrapper);
    dispose(): void;
    getItems: (IPathRequest: any) => JQueryPromise<IDataMemberInfo[]>;
    getSchemaByPath(pathRequest: IPathRequest, objectSchema: ObjectTypeDescriptions): IDataMemberInfo[];
    getObjectTypeDescriptions(context?: string): JQueryPromise<ObjectTypeDescriptions>;
}