﻿/**
* DevExpress Analytics (query-builder\wizard\internal\objectDataSource\_chooseObjectDataMembers.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../../serializer/disposable';
import { ObjectType, ObjectCtor, ObjectDataMember } from '../../../dataSource/object/objectSchema';
export declare class ChooseObjectDataMembers extends Disposable {
    constructor(type: ko.Observable<ObjectType>, ctor: ko.Observable<ObjectCtor>);
    private coerceSelection;
    dataMembers: ko.ObservableArray<ObjectDataMember>;
    selectedDataMembers: ko.ObservableArray<ObjectDataMember>;
}
