﻿/**
* DevExpress Analytics (query-builder\wizard\dataSourceWizardState.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '../../serializer/serializer';
import { guid } from '../../undo-engine/_utils';
import { FederationDataSource } from '../dataSource/federation/federationDataSource';
import { FederationMasterDetailRelation } from '../dataSource/federation/federationMasterDetailRelation';
import { JsonDataSource } from '../dataSource/json/jsonDataSource';
import { ObjectDataSource } from '../dataSource/object/objectDataSource';
import { MasterDetailRelation } from '../dataSource/sql/masterDetailRelation';
import { DataSourceType } from './pages/chooseDataSourceTypePage';
import { _SqlDataSourceWrapper } from './pages/sqlDataSourceWizard/_sqlDataSourceWrapper';
const _defaultRestoreSqlDataSourceFromState = (state, requestWrapper, dataSourceId) => {
    const wrapper = new _SqlDataSourceWrapper(state.sqlDataSourceJSON, state.queryName, requestWrapper);
    state.name && wrapper.sqlDataSource.connection.name(state.name);
    const serializer = new ModelSerializer();
    if (state.customQueries && state.customQueries.length > 0) {
        wrapper.customQueries = state.customQueries.map((query) => wrapper.sqlDataSource.createQuery(JSON.parse(query), serializer));
        wrapper.sqlDataSource.queries.push(...wrapper.customQueries);
    }
    if (state.relations && state.relations.length > 0) {
        wrapper.sqlDataSource.relations.push(...state.relations.map((relation) => new MasterDetailRelation(JSON.parse(relation), serializer)));
    }
    wrapper.sqlDataSource.id = dataSourceId || guid().replace(/-/g, '');
    return wrapper;
};
export let _restoreSqlDataSourceFromState = _defaultRestoreSqlDataSourceFromState;
export const _setRestoreSqlDataSourceFromState = (func) => { _restoreSqlDataSourceFromState = func; };
export const _resetRestoreSqlDataSourceFromState = () => { _restoreSqlDataSourceFromState = _defaultRestoreSqlDataSourceFromState; };
const _defaultRestoreFederationDataSourceFromState = (state, usedDataSources, dataSourceId) => {
    const dataSource = new FederationDataSource(JSON.parse(state.federationDataSourceJSON), usedDataSources);
    if (dataSourceId) {
        dataSource.id = dataSourceId;
    }
    if (state.relations && state.relations.length > 0) {
        dataSource.relations.push(...state.relations.map((relation) => new FederationMasterDetailRelation(JSON.parse(relation), new ModelSerializer())));
    }
    return dataSource;
};
export const _restoreFederationDataSourceFromState = _defaultRestoreFederationDataSourceFromState;
const _defaultRestoreJsonDataSourceFromState = (state, requestWrapper, dataSourceId) => {
    const jsonDataSource = new JsonDataSource({
        'Source': state.jsonSource && JSON.parse(state.jsonSource) || {},
        'Schema': state.jsonScheme && JSON.parse(state.jsonScheme) || {},
        '@RootElement': state.rootElement || ''
    }, undefined, requestWrapper);
    state.connectionName && jsonDataSource.connectionName(state.connectionName);
    state.dataSourceName && jsonDataSource.name(state.dataSourceName);
    jsonDataSource.id = dataSourceId || guid().replace(/-/g, '');
    return jsonDataSource;
};
export let _restoreJsonDataSourceFromState = _defaultRestoreJsonDataSourceFromState;
export function _setRestoreJsonDataSourceFromState(func) { _restoreJsonDataSourceFromState = func; }
export function _resetRestoreJsonDataSourceFromState() { _restoreJsonDataSourceFromState = _defaultRestoreJsonDataSourceFromState; }
export function _restoreObjectDataSourceFromState(state, requestWrapper, dataSourceId) {
    const objectDataSource = new ObjectDataSource();
    objectDataSource.setState(state);
    if (dataSourceId)
        objectDataSource.id = dataSourceId;
    return objectDataSource;
}
export function _createDefaultDataSourceWizardState(sqlDataSourceWizardState = {}, jsonDataSourceWizardState = { jsonSource: '' }, objectDataSourceWizardState = {}, federationDataSourceWizardState = {}) {
    return {
        dataSourceType: DataSourceType.Sql,
        jsonDataSourceWizard: jsonDataSourceWizardState,
        sqlDataSourceWizard: sqlDataSourceWizardState,
        objectDataSourceWizard: objectDataSourceWizardState,
        federationDataSourceWizard: federationDataSourceWizardState,
        dataSourceId: guid().replace(/-/g, '')
    };
}
