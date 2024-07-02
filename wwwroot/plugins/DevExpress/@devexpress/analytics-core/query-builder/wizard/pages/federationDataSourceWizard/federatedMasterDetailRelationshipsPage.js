﻿/**
* DevExpress Analytics (query-builder\wizard\pages\federationDataSourceWizard\federatedMasterDetailRelationshipsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { _restoreFederationDataSourceFromState } from '../../dataSourceWizardState';
import { ModelSerializer } from '../../../../serializer/serializer';
import { FederationDataSourceWizardPageId } from '../../pageId';
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { MasterDetailRelationshipsPageBase } from '../multiQueryWizard/masterDetailRelationshipsPageBase';
import { FederationMasterDetailRelation } from '../../../dataSource/federation/federationMasterDetailRelation';
export class FederatedMasterDetailRelationshipsPage extends MasterDetailRelationshipsPageBase {
    constructor(federationDataSourceResultSchema, _options) {
        super(federationDataSourceResultSchema);
        this._options = _options;
        this._customResetOptions = $.noop;
        this._relationsEditor = ko.observable(null);
    }
    _restoreDataSource(state) {
        this._federationDataSource = _restoreFederationDataSourceFromState(state, this._options.dataSources);
    }
    _dataSource() {
        return this._federationDataSource;
    }
    commit() {
        this.relationsSubscription.dispose();
        const relations = this._relations().map(x => FederationMasterDetailRelation.create(x));
        this._federationDataSource.relations(relations);
        this._federationDataSource.resultSet = this._resultSet;
        const serializer = new ModelSerializer();
        return $.Deferred().resolve({
            federationDataSourceJSON: JSON.stringify(new ModelSerializer().serialize(this._federationDataSource)),
            relations: relations.map(x => JSON.stringify(serializer.serialize(x))),
        }).promise();
    }
}
export function _registerFederatedMasterDetailRelationshipsPage(factory, federationDataSourceResultSchema, wizardOptions) {
    factory.registerMetadata(FederationDataSourceWizardPageId.FederatedMasterDetailRelationshipsPage, {
        create: () => {
            return new FederatedMasterDetailRelationshipsPage(federationDataSourceResultSchema, wizardOptions);
        },
        setState: (data, state) => {
            state.relations = data.relations;
        },
        getState: (state) => {
            return state.federationDataSourceWizard;
        },
        resetState: (state, defaultState) => {
            state.relations = defaultState.relations;
        },
        description: getLocalization('Configure master-detail relationships.', 'AnalyticsCoreStringId.SqlDSWizard_PageConfigureMasterDetailRelations'),
        template: 'dxrd-wizard-configure-relations-page'
    });
}