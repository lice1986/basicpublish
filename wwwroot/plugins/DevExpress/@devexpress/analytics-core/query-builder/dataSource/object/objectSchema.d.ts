﻿/**
* DevExpress Analytics (query-builder\dataSource\object\objectSchema.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IDataMemberInfo } from '../../../widgets/utils';
export declare class ObjectDataMemberBase implements IDataMemberInfo {
    name: string;
    displayName: string;
    dataMember: string;
    constructor(model?: ObjectDataMemberBase);
}
export declare class ObjectParameter extends ObjectDataMemberBase {
    type: string;
    value: any;
    resultType: string;
    constructor(model?: ObjectParameter);
}
export declare abstract class ObjectDataSourceMethodBase extends ObjectDataMemberBase {
    parameters: ObjectParameter[];
    constructor(model: ObjectDataSourceMethodBase);
}
export declare class ObjectDataMember extends ObjectDataSourceMethodBase {
    static entireObject: () => any;
    isStatic: boolean;
    memberType: string;
    disabled: ko.Observable<boolean>;
    constructor(model: ObjectDataMember);
    static empty(): ObjectDataMember;
    isEntireObject(): boolean;
    isAvailable(): boolean;
}
export declare class ObjectCtor extends ObjectDataSourceMethodBase {
}
export declare class ObjectType extends ObjectDataMemberBase {
    ctors: ObjectCtor[];
    members: ObjectDataMember[];
    constructor(model: ObjectType);
    updateMembers(selectedCtor: ObjectCtor): void;
}
