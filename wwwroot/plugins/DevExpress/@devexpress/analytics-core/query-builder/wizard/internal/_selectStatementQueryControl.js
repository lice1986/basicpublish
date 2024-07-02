﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_selectStatementQueryControl.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { SqlQueryType } from '../../dataSource/utils';
import { Disposable } from '../../../serializer/disposable';
import { createDefaultSQLAceOptions, createDefaultSQLAdditionalOptions, createDefaultSQLLanguageHelper } from '../../widgets/ace/_options';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { CustomSqlQuery } from '../../dataSource/sql/customSqlQuery';
import { ShowMessage } from '../../../core/utils/_infoMessageHelpers';
import { aceAvailable } from '../../../widgets/ace/_ace-available';
export class SelectStatementQueryControl extends Disposable {
    constructor(sqlTextProvider, disableCustomSql) {
        super();
        this._tableQueryString = ko.observable('');
        this._query = ko.observable();
        this._needToCustomizeParameters = ko.pureComputed(() => {
            return this._query() && (this._query().type() === SqlQueryType.customSqlQuery || this._query().parameters().length > 0);
        });
        this.template = 'dxrd-select-control';
        this.aceOptions = createDefaultSQLAceOptions();
        this.additionalOptions = createDefaultSQLAdditionalOptions((newVal) => { this.sqlString(newVal); });
        this.aceAvailable = aceAvailable();
        this.languageHelper = createDefaultSQLLanguageHelper();
        this.caption = () => getLocalization('SQL string:', 'DataAccessUIStringId.QueryControl_SqlString');
        this.sqlString = ko.pureComputed({
            read: () => {
                return this._query() && this._query().type() === SqlQueryType.customSqlQuery ? this._query().sqlString() : this._tableQueryString();
            },
            write: (val) => {
                if (this._query().type() !== SqlQueryType.customSqlQuery) {
                    const customQuery = new CustomSqlQuery({ '@Name': this._query().name() }, this._query().parent);
                    customQuery.parameters(this._query().parameters());
                    customQuery.sqlString(val);
                    this._query(customQuery);
                }
                else {
                    this._query().sqlString(val);
                }
            }
        });
        this.isNextDisabled = ko.pureComputed(() => {
            return !this.sqlString() || !this._needToCustomizeParameters();
        });
        this.isFinishDisabled = ko.pureComputed(() => {
            return !this.sqlString() || this._needToCustomizeParameters();
        });
        this._sqlTextProvider = sqlTextProvider;
        this.disableCustomSql = () => disableCustomSql;
        this.aceOptions.readOnly = this.disableCustomSql();
        this._disposables.push(this._needToCustomizeParameters, this.sqlString);
    }
    setQuery(query, isInProcess) {
        if (this._query() !== query && query.type() === SqlQueryType.tableQuery) {
            isInProcess && isInProcess(true);
            return this._sqlTextProvider.getQuerySqlText(query)
                .done((response) => {
                if (response.errorMessage)
                    ShowMessage(response.errorMessage);
                this._tableQueryString(response.sqlSelectStatement);
                this._query(query);
            })
                .always(() => { isInProcess && isInProcess(false); });
        }
        else {
            this._query(query);
            return $.Deferred().resolve().promise();
        }
    }
    getQuery() {
        return this._query();
    }
    get runQueryBuilderDisabled() {
        return false;
    }
}
