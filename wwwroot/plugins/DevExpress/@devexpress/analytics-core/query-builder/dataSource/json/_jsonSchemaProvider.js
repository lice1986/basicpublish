﻿/**
* DevExpress Analytics (query-builder\dataSource\json\_jsonSchemaProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { JsonSchemaRootNode } from './jsonSchemaNode';
import { ShowMessage, getErrorMessage } from '../../../core/utils/_infoMessageHelpers';
import { formatUnicorn } from '../../../property-grid/widgets/internal/_utils';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
const _getJsonSchemaCallback = (requestWrapper, jsonDataSource, parameters = []) => {
    const deferred = $.Deferred();
    requestWrapper.getJsonSchema(jsonDataSource, parameters)
        .done(data => {
        try {
            const jsonSchema = JSON.parse(data.jsonSchemaJSON);
            const jsonSchemaModel = new JsonSchemaRootNode(jsonSchema);
            deferred.resolve(jsonSchemaModel);
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
};
export let getJsonSchemaCallback = _getJsonSchemaCallback;
export function _setGetJsonSchemaCallback(func) { getJsonSchemaCallback = func; }
export function _resetGetJsonSchemaCallback() { getJsonSchemaCallback = _getJsonSchemaCallback; }