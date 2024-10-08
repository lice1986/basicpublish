﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federatedQueries\transformQuery.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { FederationQueryType } from '../../utils';
import { ModelSerializer } from '../../../../serializer/serializer';
import { extend } from '../../../../serializer/_utils';
import { SourceQuery } from './sourceQuery';
import { deserializeArray } from '../../../../serializer/utils';
import { Disposable } from '../../../../serializer/disposable';
import { FederationSource } from '../federationSource';
export const transformQuerySerializationsInfo = [
    { propertyName: 'queryType', modelName: '@QueryType' },
    { propertyName: 'alias', modelName: '@Alias' },
    { propertyName: 'transformationRules', modelName: 'TransformationRules', array: true },
    { propertyName: 'root', modelName: 'Root' },
    { propertyName: 'itemType', modelName: '@ItemType' }
];
export const transformationRuleSerializationsInfo = [
    { propertyName: 'name', modelName: '@Name' },
    { propertyName: 'alias', modelName: '@Alias' },
    { propertyName: 'unfold', modelName: '@Unfold' },
    { propertyName: 'flatten', modelName: '@Flatten' },
    { propertyName: 'itemType', modelName: '@ItemType' }
];
export class TransformQuery extends Disposable {
    constructor(model, serializer) {
        super();
        (serializer || new ModelSerializer()).deserialize(this, extend(model, { '@ItemType': 'Query' }));
        this._disposables.push(this.queryType = ko.pureComputed(() => { return FederationQueryType[FederationQueryType.TransformationNode]; }));
        this.transformationRules = deserializeArray(model['TransformationRules'], (item) => {
            return new FederationTransformationRule(item, serializer);
        });
        if (model['Root'])
            this.root = ko.observable(new SourceQuery(model['Root'], serializer));
    }
    get sources() {
        return ko.observableArray([new FederationSource({}, new ModelSerializer(), this.root().getPath(), this.root().sourceName())]);
    }
    getInfo() {
        return transformQuerySerializationsInfo;
    }
    generateName() {
        return this.root() && this.root().sourceName().split('_').pop();
    }
}
export class FederationTransformationRule {
    constructor(model, serializer) {
        (serializer || new ModelSerializer()).deserialize(this, extend(model, { '@ItemType': 'TransformationRule' }));
    }
    getInfo() {
        return transformationRuleSerializationsInfo;
    }
}
