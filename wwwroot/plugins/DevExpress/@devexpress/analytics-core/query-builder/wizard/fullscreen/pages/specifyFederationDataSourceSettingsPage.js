﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\pages\specifyFederationDataSourceSettingsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { extend } from '../../../../serializer/_utils';
import { wrapGetFederationdResultSchema } from '../../../utils/_requestwrapper';
import { _restoreFederationDataSourceFromState } from '../../dataSourceWizardState';
import { WizardSectionPosition } from '../../internal/_utils';
import { FullscreenDataSourceWizardPageId, FullscreenDataSourceWizardSectionId } from '../../pageId';
import { _registerFederatedMasterDetailRelationshipsPage } from '../../pages/federationDataSourceWizard/federatedMasterDetailRelationshipsPage';
import { _registerFederatedQueryConfigurePage } from '../../pages/federationDataSourceWizard/federatedQueryConfigurePage';
import { FullscreenWizardPage } from './fullscreenWizardPage';
export class SpecifyFederationDataSourceSettingsPage extends FullscreenWizardPage {
    constructor(_dataSourceWizardOptions) {
        super();
        this._dataSourceWizardOptions = _dataSourceWizardOptions;
    }
    getNextSectionId(sectionId) {
        if (!sectionId)
            return FullscreenDataSourceWizardSectionId.ConfigureFederatedQueriesPage;
        else if (sectionId === FullscreenDataSourceWizardSectionId.ConfigureFederatedQueriesPage) {
            const federationDataSourceWizard = _restoreFederationDataSourceFromState(this._stateManager.getCurrentState().federationDataSourceWizard, this._dataSourceWizardOptions.dataSources);
            if (federationDataSourceWizard.queries().length > 1) {
                return FullscreenDataSourceWizardSectionId.ConfigureFederatedMasterDetailRelationshipsPage;
            }
        }
    }
    _showPageDescription() {
        return true;
    }
    registerSections() {
        _registerFederatedQueryConfigurePage(this._factory, this._dataSourceWizardOptions);
        _registerFederatedMasterDetailRelationshipsPage(this._factory, wrapGetFederationdResultSchema(this._dataSourceWizardOptions.callbacks.federationDataSourceResultSchema), this._dataSourceWizardOptions);
        let meta = this._factory.getMetadata(FullscreenDataSourceWizardSectionId.ConfigureFederatedQueriesPage);
        meta.description = getLocalization('Create a federated query.', 'DataAccessUIStringId.WizardPageConfigureFederatedQueryPage');
        meta = this._factory.getMetadata(FullscreenDataSourceWizardSectionId.ConfigureFederatedMasterDetailRelationshipsPage);
        meta.description = getLocalization('Configure master-detail relationships.', 'AnalyticsCoreStringId.SqlDSWizard_PageConfigureMasterDetailRelations');
        meta['disabledText'] = getLocalization('To create a master-detail relationship, select two or more queries.', 'AnalyticsCoreStringId.Wizard_MasterDetailRelationship_Placeholder');
        this._setSectionPosition(FullscreenDataSourceWizardSectionId.ConfigureFederatedQueriesPage, WizardSectionPosition.Top);
        this._setSectionPosition(FullscreenDataSourceWizardSectionId.ConfigureFederatedMasterDetailRelationshipsPage, WizardSectionPosition.Bottom);
    }
}
export function _registerSpecifyFederationDataSourceSettingsPage(factory, dataSourceWizardOptions) {
    factory.registerMetadata(FullscreenDataSourceWizardPageId.SpecifyFederationDataSourceSettingsPage, {
        setState: (data, state) => {
            state.federationDataSourceWizard.federationDataSourceJSON = data.federationDataSourceWizard.federationDataSourceJSON;
            state.federationDataSourceWizard.federatedQueries = data.federationDataSourceWizard.federatedQueries;
            state.federationDataSourceWizard.relations = data.federationDataSourceWizard.relations;
            state.federationDataSourceWizard.name = data.federationDataSourceWizard.name;
        },
        getState: (state) => state,
        resetState: (state, defaulState) => {
            state.federationDataSourceWizard = extend(true, {}, defaulState);
        },
        create: () => {
            return new SpecifyFederationDataSourceSettingsPage(dataSourceWizardOptions);
        },
        navigationPanelText: getLocalization('Specify Data Source Settings', 'AnalyticsCoreStringId.Wizard_SpecifyDataSourceSettingsPage'),
        template: 'dx-wizard-fullscreen-page'
    });
}
