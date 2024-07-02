﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_selectQuerySqlTextProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '../../../serializer/serializer';
import { getErrorMessage, ShowMessage } from '../../../core/utils/_infoMessageHelpers';
export class SelectQuerySqlTextProvider {
    constructor(_selectStatementCallback, _connection) {
        this._selectStatementCallback = _selectStatementCallback;
        this._connection = _connection;
    }
    getQuerySqlText(newQuery) {
        const queryJSON = JSON.stringify({ 'Query': new ModelSerializer().serialize(newQuery) });
        return this._selectStatementCallback(this._connection(), queryJSON)
            .fail((data) => {
            const error = getErrorMessage(data);
            ShowMessage('Unable to build a SQL string' + (error ? ': ' + error : '.'));
        });
    }
}
