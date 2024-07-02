﻿/**
* DevExpress Analytics (query-builder\dataSource\_dbSchemaProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { DBSchema } from './dbSchema';
import { ShowMessage, getErrorMessage } from '../../core/utils/_infoMessageHelpers';
import { formatUnicorn } from '../../property-grid/widgets/internal/_utils';
import { getLocalization } from '../../property-grid/localization/localization_utils';
export function getDBSchemaCallback({ requestWrapper, connection, tables, getTables, getViews }) {
    const deferred = $.Deferred();
    requestWrapper.getDbSchema({ connection, tables, getTables, getViews })
        .done(data => {
        deferred.resolve(new DBSchema(JSON.parse(data.dbSchemaJSON)));
    })
        .fail(data => {
        ShowMessage(formatUnicorn(getLocalization('Schema loading failed. {0}', 'DxDesignerStringId.Error_SchemaLoadingFailed'), getErrorMessage(data)));
        deferred.reject();
    });
    return deferred.promise();
}
export function getDBStoredProceduresCallback(requestWrapper, connection) {
    const deferred = $.Deferred();
    requestWrapper.getDbStoredProcedures(connection)
        .done(data => {
        deferred.resolve(new DBSchema(JSON.parse(data.dbSchemaJSON)).procedures);
    })
        .fail(data => {
        ShowMessage(formatUnicorn(getLocalization('Stored procedures loading failed. {0}', 'DxDesignerStringId.Error_SchemaLoadingFailed'), getErrorMessage(data)));
        deferred.reject();
    });
    return deferred.promise();
}