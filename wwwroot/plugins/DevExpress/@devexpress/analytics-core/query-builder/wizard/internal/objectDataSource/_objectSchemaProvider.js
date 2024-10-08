﻿/**
* DevExpress Analytics (query-builder\wizard\internal\objectDataSource\_objectSchemaProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { ObjectType } from '../../../dataSource/object/objectSchema';
import { deserializeToCollection } from '../../../dataSource/_dbSchema';
import { RequestWrapper } from '../../../utils/requestwrapper';
import { ShowMessage, getErrorMessage } from '../../../../core/utils/_infoMessageHelpers';
import { formatUnicorn } from '../../../../property-grid/widgets/internal/_utils';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { Disposable } from '../../../../serializer/disposable';
import { extend } from '../../../../serializer/_utils';
export class ObjectTypeDescriptions {
    constructor(model) {
        const types = deserializeToCollection(model, (key) => new ObjectType(key));
        this.types = types.sort((a, b) => { return a.displayName.localeCompare(b.displayName); });
    }
}
export function getObjectTypeDescriptionsCallback(requestWrapper, context) {
    const deferred = $.Deferred();
    requestWrapper.getObjectTypeDescriptions(context)
        .done(data => {
        try {
            const objectTypeDescriptionsModel = new ObjectTypeDescriptions(data.objectDataSourceInfoJson);
            deferred.resolve(objectTypeDescriptionsModel);
        }
        finally {
            if (deferred.state() === 'pending')
                deferred.reject();
        }
    })
        .fail(data => {
        ShowMessage(formatUnicorn(getLocalization('Schema loading failed. {0}', 'DxDesignerStringId.Error_SchemaLoadingFailed'), getErrorMessage(data)));
        deferred.reject();
    });
    return deferred.promise();
}
export class ObjectSchemaProvider extends Disposable {
    constructor(_requestWrapper = new RequestWrapper()) {
        super();
        this._requestWrapper = _requestWrapper;
        this.getItems = (pathRequest) => {
            const getItemsDeferred = $.Deferred();
            const loadSchemaPromise = this.getObjectTypeDescriptions();
            loadSchemaPromise
                .done((objectSchema) => {
                getItemsDeferred.resolve(this.getSchemaByPath(pathRequest, objectSchema));
            })
                .fail(getItemsDeferred.reject);
            return getItemsDeferred.promise();
        };
    }
    dispose() {
        this._objectTypeDescriptionsPromise = null;
    }
    getSchemaByPath(pathRequest, objectSchema) {
        if (!pathRequest.fullPath) {
            return objectSchema.types.map(type => extend({}, type, { isList: true, specifics: 'List' }));
        }
        else {
            let currentCtros = [];
            for (let i = 0; i < pathRequest.pathParts.length; i++) {
                const pathPart = (objectSchema.types || []).filter((type) => type.name == pathRequest.pathParts[i])[0];
                if (!pathPart)
                    return [];
                currentCtros = pathPart.ctors;
            }
            return currentCtros.map(ctor => extend({}, ctor, { isList: false, specifics: 'default' }));
        }
    }
    getObjectTypeDescriptions(context = '') {
        if (!this._objectTypeDescriptionsPromise || this._objectTypeDescriptionsPromise.state() === 'rejected')
            this._objectTypeDescriptionsPromise = getObjectTypeDescriptionsCallback(this._requestWrapper, context);
        return this._objectTypeDescriptionsPromise;
    }
}
