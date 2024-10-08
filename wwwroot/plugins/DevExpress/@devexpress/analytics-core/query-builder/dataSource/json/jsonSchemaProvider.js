﻿/**
* DevExpress Analytics (query-builder\dataSource\json\jsonSchemaProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { Disposable } from '../../../serializer/disposable';
import { RequestWrapper } from '../../utils/requestwrapper';
import { getJsonSchemaCallback } from './_jsonSchemaProvider';
export class JsonSchemaProvider extends Disposable {
    constructor(jsonDataSource, _requestWrapper = new RequestWrapper()) {
        super();
        this._requestWrapper = _requestWrapper;
        this._jsonDataSource = jsonDataSource;
        this._disposables.push(this._jsonDataSource.source.sourceType.subscribe(() => {
            this._jsonSchemaPromise = null;
        }));
        this.getItems = (pathRequest) => {
            const getItemsDeferred = $.Deferred();
            const loadSchemaPromise = !this._jsonSchema ? this.getJsonSchema() : $.Deferred().resolve(this._jsonSchema).promise();
            loadSchemaPromise
                .done((jsonSchema) => {
                this._jsonSchema = jsonSchema;
                const schemaByPath = this.getSchemaByPath(pathRequest, jsonSchema);
                getItemsDeferred.resolve(schemaByPath);
            })
                .fail(getItemsDeferred.reject);
            return getItemsDeferred.promise();
        };
    }
    reset() {
        this._jsonSchemaPromise = null;
    }
    mapToDataMemberContract(nodes) {
        return $.map((nodes || []), (node) => {
            const dataMemberInfo = {
                name: node.name(),
                displayName: node.displayName || node.name(),
                isSelected: node.selected(),
                isList: node.nodes && node.nodes.length > 0,
                specifics: 'table',
                dragData: { noDragable: false }
            };
            return dataMemberInfo;
        });
    }
    getSchemaByPath(pathRequest, jsonSchema) {
        if (!pathRequest.fullPath) {
            return this.mapToDataMemberContract(jsonSchema.nodes);
        }
        else {
            let currentNodes = jsonSchema.nodes;
            for (let i = 0; i < pathRequest.pathParts.length; i++) {
                const pathPart = (currentNodes || []).filter((node) => node.name() == pathRequest.pathParts[i])[0];
                if (!pathPart)
                    return [];
                currentNodes = pathPart.nodes;
            }
            return this.mapToDataMemberContract(currentNodes);
        }
    }
    getJsonSchema(parameters = []) {
        if (!this._jsonSchemaPromise || this._jsonSchemaPromise.state() === 'rejected')
            this._jsonSchemaPromise = getJsonSchemaCallback(this._requestWrapper, this._jsonDataSource, parameters);
        return this._jsonSchemaPromise;
    }
}
