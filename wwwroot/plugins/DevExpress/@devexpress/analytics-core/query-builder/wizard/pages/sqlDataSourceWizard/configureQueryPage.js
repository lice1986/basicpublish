﻿/**
* DevExpress Analytics (query-builder\wizard\pages\sqlDataSourceWizard\configureQueryPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { localizeWithUpdateLocalizationMethod } from '../../../../property-grid/localization/_localization';
import { StringId } from '../../../../property-grid/localization/_localizationStringIds';
import { formatUnicorn } from '../../../../property-grid/widgets/internal/_utils';
import { CustomSqlQuery } from '../../../dataSource/sql/customSqlQuery';
import { StoredProcQuery } from '../../../dataSource/sql/storedProcQuery';
import { TableQuery } from '../../../dataSource/sql/tableQuery';
import { SqlQueryType } from '../../../dataSource/utils';
import { generateQueryUniqueName } from '../../../dataSource/_utils';
import { wrapGetSelectStatement } from '../../../utils/_requestwrapper';
import { _restoreSqlDataSourceFromState } from '../../dataSourceWizardState';
import { __loadingStateFunctionName } from '../../internal/_constants';
import { QueryBuilderPopup } from '../../internal/_queryBuilderPopup';
import { SelectQuerySqlTextProvider } from '../../internal/_selectQuerySqlTextProvider';
import { SelectStatementQueryControl } from '../../internal/_selectStatementQueryControl';
import { StoredProceduresQueryControl } from '../../internal/_storedProceduresQueryControl';
import { SqlDataSourceWizardPageId } from '../../pageId';
import { WizardPageBase } from '../wizardPageBase';
export class ConfigureQueryPage extends WizardPageBase {
    constructor(_options) {
        super();
        this._options = _options;
        this._connection = () => {
            return this._dataSource().connection;
        };
        this._dataSource = () => {
            return this._dataSourceWrapper && this._dataSourceWrapper.sqlDataSource;
        };
        this.queryNameCaption = () => getLocalization('Query Name', 'AnalyticsCoreStringId.SqlDSWizard_QueryName') + ':';
        this.queryControl = ko.observable();
        this.runQueryBuilderBtnText = ko.pureComputed(() => {
            return (!this._selectStatementControl.sqlString() || this._selectStatementControl.getQuery().type() === SqlQueryType.tableQuery) ?
                getLocalization('Run Query Builder...', 'DataAccessUIStringId.Button_QueryBuilder') :
                getLocalization('Create New Query...', 'AnalyticsCoreStringId.SqlDSWizard_CreateNewQuery');
        }).extend({ deferred: true });
        this.placeholder = () => {
            const queryControl = this.queryControl();
            const query = queryControl && queryControl.getQuery();
            const queryName = this.initialName || (query && query.generateName());
            return queryName ? formatUnicorn(getLocalization('Type custom query name (current name: {0})', 'AnalyticsCoreStringId.SqlDSWizard_QueryNamePlaceholder'), queryName) : queryName;
        };
        this.queryName = ko.observable('');
        this.queryTypeItems = [ConfigureQueryPage.QUERY_TEXT, ConfigureQueryPage.SP_TEXT];
        this.selectedQueryType = ko.observable();
        this.initialName = '';
        this._proceduresList = new StoredProceduresQueryControl();
        this._disposables.push(this._selectStatementControl = new SelectStatementQueryControl(new SelectQuerySqlTextProvider(wrapGetSelectStatement(this._options.callbacks.selectStatement), this._connection), this._options.disableCustomSql));
        this._disposables.push(this.selectedQueryType.subscribe((value) => {
            if (value === ConfigureQueryPage.SP_TEXT) {
                this[__loadingStateFunctionName] && this[__loadingStateFunctionName](true);
                this._dataSource().dbSchemaProvider.getDbStoredProcedures().done((procedures) => {
                    this._proceduresList.storedProcedures([]);
                    this._proceduresList.storedProcedures(procedures);
                }).always((x) => this[__loadingStateFunctionName] && this[__loadingStateFunctionName](false));
                this.queryControl(this._proceduresList);
            }
            else {
                this.queryControl(this._selectStatementControl);
            }
        }));
        this.selectedQueryType(ConfigureQueryPage.QUERY_TEXT);
        this.popupQueryBuilder = new QueryBuilderPopup((newQuery, isInProcess) => {
            this.queryName(newQuery.name() || newQuery.generateName());
            return this._selectStatementControl.setQuery(newQuery, isInProcess);
        }, this._options.rtl, this._options.callbacks.customizeQBInitData);
    }
    canNext() {
        return !this.queryControl().isNextDisabled();
    }
    canFinish() {
        return !this.queryControl().isFinishDisabled() || !this.queryControl().isNextDisabled();
    }
    runQueryBuilder() {
        const query = this.queryControl().getQuery();
        if (query && query.type() === SqlQueryType.tableQuery) {
            query.name(this.queryName());
            this.popupQueryBuilder.show(query, this._dataSource());
        }
        else {
            this.popupQueryBuilder.show(new TableQuery({ '@Name': this.queryName() }, this._dataSource()), this._dataSource());
        }
    }
    localizeQueryType(queryTypeString) {
        return ConfigureQueryPage.QUERY_TEXT === queryTypeString ?
            getLocalization(ConfigureQueryPage.QUERY_TEXT, 'DataAccessUIStringId.WizardPageConfigureQuery_Query') :
            getLocalization(ConfigureQueryPage.SP_TEXT, 'DataAccessUIStringId.WizardPageConfigureQuery_StoredProcedure');
    }
    initialize(state) {
        this._dataSourceWrapper = _restoreSqlDataSourceFromState(state, this._options.requestWrapper);
        this._proceduresList.setQuery(new StoredProcQuery({}, this._dataSource()));
        this._selectStatementControl.setQuery(new CustomSqlQuery({}, this._dataSource()));
        this.popupQueryBuilder.isVisible(false);
        if (this._dataSourceWrapper.sqlQuery) {
            this.initialName = this._dataSourceWrapper.sqlQuery.name();
            this.queryName(this.initialName);
            this.selectedQueryType(this._dataSourceWrapper.sqlQuery.type() === SqlQueryType.storedProcQuery ? ConfigureQueryPage.SP_TEXT : ConfigureQueryPage.QUERY_TEXT);
            return this.queryControl().setQuery(this._dataSourceWrapper.sqlQuery);
        }
        else {
            this.selectedQueryType(ConfigureQueryPage.QUERY_TEXT);
        }
        return $.Deferred().resolve().promise();
    }
    commit() {
        const query = this.queryControl().getQuery();
        if (query) {
            const newQueryName = this.queryName() || this.initialName;
            newQueryName && query.name(newQueryName);
            if (!query.name() || !this._dataSourceWrapper.sqlQuery || this._dataSourceWrapper.sqlQuery.name() !== query.name())
                query.name(generateQueryUniqueName(this._dataSource().queries(), query));
            this._dataSourceWrapper.sqlQuery = query;
        }
        return $.Deferred().resolve({
            queryName: this._dataSourceWrapper.sqlQuery.name(),
            sqlDataSourceJSON: this._dataSourceWrapper.save()
        }).promise();
    }
}
ConfigureQueryPage.QUERY_TEXT = 'Query';
ConfigureQueryPage.SP_TEXT = 'Stored Procedure';
export function _registerConfigureQueryPage(factory, dataSourceWizardOptions) {
    factory.registerMetadata(SqlDataSourceWizardPageId.ConfigureQueryPage, {
        create: () => {
            return new ConfigureQueryPage(dataSourceWizardOptions);
        },
        setState: (data, state) => {
            state.queryName = data.queryName;
            state.sqlDataSourceJSON = data.sqlDataSourceJSON;
        },
        getState: (state) => {
            return state.sqlDataSourceWizard;
        },
        resetState: (state, defaultState) => {
            state.sqlDataSourceJSON = defaultState.sqlDataSourceJSON;
            state.queryName = defaultState.queryName;
        },
        template: 'dxrd-wizard-create-query-page',
        description: localizeWithUpdateLocalizationMethod('Create a query or select a stored procedure') || getLocalization('Create a query or select a stored procedure.', StringId.WizardPageConfigureQuery)
    });
}
