﻿/**
* DevExpress Analytics (query-builder\widgets\masterdetaileditor\_masterQuerySurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { MasterDetailRelation } from '../../dataSource/sql/masterDetailRelation';
import { MasterDetailRelationSurface } from './_masterDetailRelationSurface';
export declare class MasterQuerySurface {
    constructor(masterQueryName: string, relations: ko.ObservableArray<MasterDetailRelation>);
    queryName: string;
    relations: ko.ObservableArray<MasterDetailRelationSurface>;
    create: (detailQueryItem: {
        name: string;
    }) => void;
    add: (relation: MasterDetailRelation) => void;
    remove: (relationSurface: MasterDetailRelationSurface) => void;
}
