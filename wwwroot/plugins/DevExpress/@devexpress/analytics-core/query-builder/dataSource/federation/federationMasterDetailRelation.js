﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federationMasterDetailRelation.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '../../../serializer/serializer';
import { extend } from '../../../serializer/_utils';
import { MasterDetailRelation } from '../sql/masterDetailRelation';
const keyColumnInfoArray = [
    { propertyName: 'masterColumn', modelName: '@Parent' },
    { propertyName: 'detailColumn', modelName: '@Nested' },
    { propertyName: 'itemType', modelName: '@ItemType' }
];
const masterDetailRelationSerializationInfoArray = [
    { propertyName: 'masterQuery', modelName: '@MasterQueryName' },
    { propertyName: 'detailQuery', modelName: '@DetailQueryName' },
    { propertyName: '_customName', modelName: '@RelationName' },
    { propertyName: 'keyColumns', modelName: 'KeyColumns', array: true, info: keyColumnInfoArray },
    { propertyName: 'itemType', modelName: '@ItemType' }
];
export class FederationMasterDetailRelation extends MasterDetailRelation {
    static create(_relation) {
        const serializer = new ModelSerializer();
        const relation = new FederationMasterDetailRelation(serializer.serialize(_relation), serializer);
        relation.keyColumns().forEach(x => x['getInfo'] = () => keyColumnInfoArray);
        return relation;
    }
    constructor(model, serializer) {
        super(model, serializer);
        this.getInfo = () => masterDetailRelationSerializationInfoArray;
        if (model['@MasterQueryName'] && model['@DetailQueryName']) {
            (serializer || new ModelSerializer()).deserialize(this, extend(model, { '@ItemType': 'Relation' }));
        }
    }
}
