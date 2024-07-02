﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federationMasterDetailRelation.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { MasterDetailRelation } from '../sql/masterDetailRelation';
export declare class FederationMasterDetailRelation extends MasterDetailRelation {
    static create(_relation: MasterDetailRelation): FederationMasterDetailRelation;
    constructor(model: any, serializer?: any);
}