﻿/**
* DevExpress Analytics (query-builder\wizard\pages\multiQueryWizard\configureMasterDetailRelationshipsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { _restoreSqlDataSourceFromState } from '../../dataSourceWizardState';
import { ModelSerializer } from '../../../../serializer/serializer';
import { DataSourceWizardPageId } from '../../pageId';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { MasterDetailRelationshipsPageBase } from './masterDetailRelationshipsPageBase';
export class ConfigureMasterDetailRelationshipsPage extends MasterDetailRelationshipsPageBase {
    constructor() {
        super(...arguments);
        this._customResetOptions = $.noop;
        this._relationsEditor = ko.observable(null);
    }
    _restoreDataSource(state) {
        this._sqlDataSourceWrapper = _restoreSqlDataSourceFromState(state);
    }
    _dataSource() {
        return this._sqlDataSourceWrapper.sqlDataSource;
    }
    commit() {
        this.relationsSubscription.dispose();
        this._sqlDataSourceWrapper.sqlDataSource.relations(this._relations());
        this._sqlDataSourceWrapper.sqlDataSource.resultSet = this._resultSet;
        const serializer = new ModelSerializer();
        return $.Deferred().resolve({
            sqlDataSourceJSON: this._sqlDataSourceWrapper.sqlDataSourceJSON,
            customQueries: this._sqlDataSourceWrapper.saveCustomQueries(),
            relations: this._relations().map(x => JSON.stringify(serializer.serialize(x))),
        }).promise();
    }
}
export function _registerConfigureMasterDetailRelationshipsPage(factory, sqlDataSourceResultSchema) {
    factory.registerMetadata(DataSourceWizardPageId.ConfigureMasterDetailRelationshipsPage, {
        create: () => {
            return new ConfigureMasterDetailRelationshipsPage(sqlDataSourceResultSchema);
        },
        setState: (data, state) => {
            state.relations = data.relations;
        },
        getState: (state) => {
            return state.sqlDataSourceWizard;
        },
        resetState: (state, defaultState) => {
            state.relations = defaultState.relations;
        },
        description: getLocalization('Configure master-detail relationships.', 'AnalyticsCoreStringId.SqlDSWizard_PageConfigureMasterDetailRelations'),
        template: 'dxrd-wizard-configure-relations-page'
    });
}
