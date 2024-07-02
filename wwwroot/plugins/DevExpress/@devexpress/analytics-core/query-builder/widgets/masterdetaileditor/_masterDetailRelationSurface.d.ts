﻿/**
* DevExpress Analytics (query-builder\widgets\masterdetaileditor\_masterDetailRelationSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { MasterDetailRelation } from '../../dataSource/sql/masterDetailRelation';
import { MasterQuerySurface } from './_masterQuerySurface';
import { KeyColumnSurface } from './_keyColumnSurface';
export declare class MasterDetailRelationSurface {
    constructor(relation: MasterDetailRelation, parent: MasterQuerySurface);
    relationName: ko.Observable<string> | ko.Computed<string>;
    keyColumns: ko.Computed<{
        master: KeyColumnSurface;
        detail: KeyColumnSurface;
    }[]>;
    isEditable: ko.Observable<boolean> | ko.Computed<boolean>;
    create: () => void;
    remove: (data: {
        master: KeyColumnSurface;
        detail: KeyColumnSurface;
    }) => void;
}
