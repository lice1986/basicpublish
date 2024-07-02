﻿/**
* DevExpress Analytics (query-builder\utils\_controlsFactory.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { registerControls as registerControls1 } from '../../diagram/controlRegistrator';
import { controlsFactory } from './controlsFactory';
import { unknownSerializationsInfo } from '../metadata';
import { ElementViewModel } from '../../core/elements/elementViewModel';
import { SurfaceElementBase } from '../../core/elements/baseSurface';
import { relationSerializationInfo } from '../elements/relationModelMeta';
import { RelationSurface } from '../elements/relationSurface';
import { RelationViewModel } from '../elements/relationModel';
import { joinConditionSerializationInfo } from '../elements/joinConditionModelMeta';
import { JoinConditionSurface } from '../elements/joinConditionSurface';
import { JoinConditionViewModel } from '../elements/joinConditionModel';
import { tableSerializationInfo } from '../elements/tableModelMeta';
import { TableSurface } from '../elements/tableSurface';
import { TableViewModel } from '../elements/tableModel';
import { columnSerializationInfo } from '../elements/columnModelMeta';
import { ColumnSurface } from '../elements/columnSurface';
import { ColumnViewModel } from '../elements/columnModel';
import { querySerializationsInfo } from '../elements/queryModelMeta';
import { QuerySurface } from '../elements/querySurface';
import { QueryViewModel } from '../elements/queryModel';
import { federationQuerySerializationsInfo, FederationQuerySurface, FederationQueryViewModel, FederationTableSurface, FederationTableViewModel } from '../elements/_federationQueryModel';
export function registerControls() {
    registerControls1();
    controlsFactory.registerControl('Unknown', {
        info: unknownSerializationsInfo,
        type: ElementViewModel,
        nonToolboxItem: true,
        surfaceType: SurfaceElementBase,
        isDeleteDeny: true
    });
    controlsFactory.registerControl('Relation', {
        info: relationSerializationInfo,
        defaultVal: {},
        surfaceType: RelationSurface,
        popularProperties: [],
        type: RelationViewModel,
        elementActionsTypes: [],
        nonToolboxItem: true
    });
    controlsFactory.registerControl('JoinCondition', {
        info: joinConditionSerializationInfo,
        defaultVal: {},
        surfaceType: JoinConditionSurface,
        popularProperties: ['_parentColumnName', '_nestedColumnName', 'joinType'],
        type: JoinConditionViewModel,
        elementActionsTypes: [],
        nonToolboxItem: true
    });
    controlsFactory.registerControl('Table', {
        info: tableSerializationInfo,
        defaultVal: {},
        surfaceType: TableSurface,
        popularProperties: ['name', 'alias', 'columns'],
        type: TableViewModel,
        elementActionsTypes: [],
        nonToolboxItem: true
    });
    controlsFactory.registerControl('Column', {
        info: columnSerializationInfo,
        defaultVal: {},
        surfaceType: ColumnSurface,
        popularProperties: ['name', 'alias', 'selected'],
        type: ColumnViewModel,
        elementActionsTypes: [],
        nonToolboxItem: true,
        isDeleteDeny: true
    });
    controlsFactory.registerControl('Query', {
        info: querySerializationsInfo,
        surfaceType: QuerySurface,
        popularProperties: ['name', 'filterString', 'groupFilterString'],
        type: QueryViewModel,
        elementActionsTypes: [],
        isContainer: true,
        nonToolboxItem: true,
        isDeleteDeny: true
    });
    controlsFactory.registerControl('FTable', {
        info: tableSerializationInfo,
        defaultVal: {},
        surfaceType: FederationTableSurface,
        popularProperties: ['name', 'alias', 'columns'],
        type: FederationTableViewModel,
        elementActionsTypes: [],
        nonToolboxItem: true
    });
    controlsFactory.registerControl('FQuery', {
        info: federationQuerySerializationsInfo,
        surfaceType: FederationQuerySurface,
        popularProperties: ['name'],
        type: FederationQueryViewModel,
        elementActionsTypes: [],
        isContainer: true,
        nonToolboxItem: true,
        isDeleteDeny: true
    });
}