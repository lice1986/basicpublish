﻿/**
* DevExpress Analytics (query-builder\widgets\masterdetaileditor\_masterDetailEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { StringId } from '../../../property-grid/localization/_localizationStringIds';
import { PopupService } from '../../../property-grid/internal/_popupService';
import { ShowMessage } from '../../../core/utils/_infoMessageHelpers';
import { MasterDetailEditorPopupManager } from './_masterDetailEditorPopupManager';
import { getFirstItemByPropertyValue } from '../../../core/utils/_arrayutils';
import { MasterQuerySurface } from './_masterQuerySurface';
import { PopupEditorBase } from '../../../core/widgets/_popupEditorBase';
export class MasterDetailEditor extends PopupEditorBase {
    constructor(relations, resultSet, saveCallBack) {
        super();
        this.isValid = ko.observable(true);
        this.loadPanelVisible = ko.observable(false);
        this.masterQueries = ko.observableArray();
        this.popupService = new PopupService();
        this.save = () => {
            const emptyFieldsExist = relations().some((relation) => {
                return !relation.detailQuery() || !relation.masterQuery() ||
                    relation.keyColumns().some(column => (!column.detailColumn() || !column.masterColumn()));
            });
            if (emptyFieldsExist) {
                ShowMessage(getLocalization('Some fields are empty. Please fill all empty fields or remove the corresponding conditions to proceed.', 'DataAccessUIStringId.JoinEditorFillAllFieldsException'));
            }
            else {
                saveCallBack().done(() => { this.popupVisible(false); });
            }
        };
        this.createRelation = (target) => {
            const popupItems = resultSet.tables()
                .filter(table => table.tableName() !== target.queryName)
                .map(table => { return { name: table.tableName() }; });
            return {
                data: new MasterDetailEditorPopupManager(target, this.popupService, 'create', popupItems),
                templateName: 'dx-filtereditor-create'
            };
        };
        this.setColumn = (target) => {
            const table = getFirstItemByPropertyValue(resultSet.tables(), 'tableName', target.queryName);
            return {
                data: new MasterDetailEditorPopupManager(target, this.popupService, '_setColumn', table ? table.columns() : []),
                templateName: 'dx-masterdetail-editor-setColumn'
            };
        };
        this._createMainPopupButtons();
        const masterQueries = {};
        resultSet.tables().forEach((table) => {
            masterQueries[table.tableName()] = new MasterQuerySurface(table.tableName(), relations);
        });
        relations().forEach((relation) => {
            masterQueries[relation.masterQuery()] = masterQueries[relation.masterQuery()] || new MasterQuerySurface(relation.masterQuery(), relations);
            masterQueries[relation.masterQuery()].add(relation);
        });
        this.masterQueries($.map(masterQueries, value => value));
    }
    title() {
        return getLocalization('Master-Detail Relation Editor', StringId.MasterDetailRelationsEditor);
    }
}
