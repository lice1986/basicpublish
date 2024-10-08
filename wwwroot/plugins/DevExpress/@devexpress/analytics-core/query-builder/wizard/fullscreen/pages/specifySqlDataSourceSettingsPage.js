﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\pages\specifySqlDataSourceSettingsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '../../../../property-grid/localization/localization_utils';
import { extend } from '../../../../serializer/_utils';
import { wrapRebuildResultSchema } from '../../../utils/_requestwrapper';
import { _restoreSqlDataSourceFromState } from '../../dataSourceWizardState';
import { WizardSectionPosition } from '../../internal/_utils';
import { FullscreenDataSourceWizardPageId, FullscreenDataSourceWizardSectionId } from '../../pageId';
import { _registerChooseSqlConnectionPage } from '../../pages/chooseSqlConnectionPage';
import { _registerConfigureMasterDetailRelationshipsPage } from '../../pages/multiQueryWizard/configureMasterDetailRelationshipsPage';
import { _registerMultiQueryConfigurePage } from '../../pages/multiQueryWizard/multiQueryConfigurePage';
import { _registerMultiQueryConfigureParametersPage } from '../../pages/multiQueryWizard/multiQueryConfigureParametersPage';
import { FullscreenWizardPage } from './fullscreenWizardPage';
export class SpecifySqlDataSourceSettingsPage extends FullscreenWizardPage {
    constructor(_dataSourceWizardOptions) {
        super();
        this._dataSourceWizardOptions = _dataSourceWizardOptions;
    }
    getNextSectionId(sectionId) {
        if (!sectionId)
            return FullscreenDataSourceWizardSectionId.ChooseSqlConnectionPage;
        else if (sectionId === FullscreenDataSourceWizardSectionId.ChooseSqlConnectionPage && this._stateManager.getCurrentState().sqlDataSourceWizard.name) {
            return FullscreenDataSourceWizardSectionId.ConfigureQueryPage;
        }
        else if (sectionId === FullscreenDataSourceWizardSectionId.ConfigureQueryPage) {
            const sections = [];
            const sqlDataSourceWizardState = this._stateManager.getCurrentState().sqlDataSourceWizard;
            if ((sqlDataSourceWizardState.customQueries || []).length > 0) {
                sections.push(FullscreenDataSourceWizardSectionId.ConfigureQueryParametersPage);
            }
            const sqlDataSourceWrapped = _restoreSqlDataSourceFromState(sqlDataSourceWizardState);
            if (sqlDataSourceWrapped.sqlDataSource.queries().length > 1) {
                sections.push(FullscreenDataSourceWizardSectionId.ConfigureMasterDetailRelationshipsPage);
            }
            return sections;
        }
    }
    registerSections() {
        _registerChooseSqlConnectionPage(this._factory, this._dataSourceWizardOptions.connectionStrings.sql, this._dataSourceWizardOptions.getSqlConnectionStrings);
        _registerMultiQueryConfigurePage(this._factory, this._dataSourceWizardOptions);
        _registerConfigureMasterDetailRelationshipsPage(this._factory, wrapRebuildResultSchema(this._dataSourceWizardOptions.callbacks.sqlDataSourceResultSchema));
        _registerMultiQueryConfigureParametersPage(this._factory, this._dataSourceWizardOptions.requestWrapper);
        let meta = this._factory.getMetadata(FullscreenDataSourceWizardSectionId.ChooseSqlConnectionPage);
        meta.description = getLocalization('Choose a data connection.', 'AnalyticsCoreStringId.SqlDSWizard_PageChooseConnection');
        meta = this._factory.getMetadata(FullscreenDataSourceWizardSectionId.ConfigureQueryPage);
        meta['recreate'] = true;
        meta.description = getLocalization('Choose predefined queries and/or create custom queries.', 'AnalyticsCoreStringId.Wizard_Queries_Description');
        meta['required'] = true;
        meta = this._factory.getMetadata(FullscreenDataSourceWizardSectionId.ConfigureMasterDetailRelationshipsPage);
        meta.description = getLocalization('Configure master-detail relationships.', 'AnalyticsCoreStringId.SqlDSWizard_PageConfigureMasterDetailRelations');
        meta['disabledText'] = getLocalization('To create a master-detail relationship, select two or more queries.', 'AnalyticsCoreStringId.Wizard_MasterDetailRelationship_Placeholder');
        meta = this._factory.getMetadata(FullscreenDataSourceWizardSectionId.ConfigureQueryParametersPage);
        meta.description = getLocalization('Configure query parameters.', 'AnalyticsCoreStringId.SqlDSWizard_PageConfigureParameters');
        meta['disabledText'] = getLocalization('To specify query parameters, select a parameterized stored procedure or create a custom query.', 'AnalyticsCoreStringId.Wizard_ConfigureQueryParameters_Placeholder');
        this._setSectionPosition(FullscreenDataSourceWizardSectionId.ChooseSqlConnectionPage, this._dataSourceWizardOptions.rtl ? WizardSectionPosition.TopRight : WizardSectionPosition.TopLeft);
        this._setSectionPosition(FullscreenDataSourceWizardSectionId.ConfigureQueryPage, this._dataSourceWizardOptions.rtl ? WizardSectionPosition.TopLeft : WizardSectionPosition.TopRight);
        this._setSectionPosition(FullscreenDataSourceWizardSectionId.ConfigureQueryParametersPage, this._dataSourceWizardOptions.rtl ? WizardSectionPosition.BottomLeft : WizardSectionPosition.BottomRight);
        this._setSectionPosition(FullscreenDataSourceWizardSectionId.ConfigureMasterDetailRelationshipsPage, this._dataSourceWizardOptions.rtl ? WizardSectionPosition.BottomRight : WizardSectionPosition.BottomLeft);
    }
}
export function _registerSpecifySqlDataSourceSettingsPage(factory, dataSourceWizardOptions) {
    factory.registerMetadata(FullscreenDataSourceWizardPageId.SpecifySqlDataSourceSettingsPage, {
        setState: (data, state) => {
            state.sqlDataSourceWizard.customQueries = data.sqlDataSourceWizard.customQueries;
            state.sqlDataSourceWizard.name = data.sqlDataSourceWizard.name;
            state.sqlDataSourceWizard.queryName = data.sqlDataSourceWizard.name;
            state.sqlDataSourceWizard.sqlDataSourceJSON = data.sqlDataSourceWizard.sqlDataSourceJSON;
            state.sqlDataSourceWizard.relations = data.sqlDataSourceWizard.relations;
        },
        getState: (state) => state,
        resetState: (state, defaulState) => {
            state.sqlDataSourceWizard = extend(true, {}, defaulState);
        },
        create: () => {
            return new SpecifySqlDataSourceSettingsPage(dataSourceWizardOptions);
        },
        navigationPanelText: getLocalization('Specify Data Source Settings', 'AnalyticsCoreStringId.Wizard_SpecifyDataSourceSettingsPage'),
        template: 'dx-wizard-fullscreen-page'
    });
}
