﻿/**
* DevExpress Analytics (query-builder\_accordionTabInfo.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ObjectProperties } from '../property-grid/propertygrid';
import { getLocalization } from '../property-grid/localization/localization_utils';
import { ParameterViewModel } from './elements/parameterModel';
import { QueryViewModel } from './elements/queryModel';
import { ControlProperties } from '../core/widgets/propertygrid/_controlProperties';
import { TabInfo } from '../core/widgets/tabInfo';
const parametersInfo = { propertyName: 'parameters', displayName: 'parameters', editor: { custom: 'dxqb-parameterspanel' } };
const selectedItemInfo = { propertyName: 'selectedItem', displayName: 'selectedItem', editor: { custom: 'dxqb-propertygrid' } };
const fieldsInfo = { propertyName: 'fields', displayName: 'fields', editor: { custom: 'dxqb-fieldspanel' } };
const queryInfo = { propertyName: 'query', displayName: 'query', editor: { custom: 'dxqb-propertygrid' } };
export class AccordionTabInfo extends TabInfo {
    constructor(query, itemPropertiesTabInfoModel, undoEngine, focused, showParameters) {
        super({
            text: 'Properties',
            template: 'dxqb-properties-wrapper',
            model: AccordionTabInfo._createQBPropertyGrid(query, itemPropertiesTabInfoModel, undoEngine, showParameters)
        });
        this.active = true;
        this._getGroupByName('Fields').collapsed(false);
        this._disposables.push(focused.subscribe((newVal) => {
            if (!(newVal instanceof QueryViewModel)) {
                const group = this._getGroupByName('SelectedItem');
                group.collapsed(false);
            }
        }));
    }
    static _getSelectedItemPropertyName(model) {
        let text = 'Selection Properties';
        let id = 'AnalyticsCoreStringId.QueryBuilder_SelectionProperties';
        switch (model && model.controlType) {
            case 'Query':
            case 'FQuery':
                text = 'Query Properties';
                id = 'AnalyticsCoreStringId.QueryBuilder_QueryProperties';
                break;
            case 'Table':
            case 'FTable':
                text = 'Table Properties';
                id = 'AnalyticsCoreStringId.QueryBuilder_TableProperties';
                break;
            case 'Column':
                text = 'Column Properties';
                id = 'AnalyticsCoreStringId.QueryBuilder_ColumnProperties';
                break;
            case 'JoinCondition':
                text = 'Relation Properties';
                id = 'AnalyticsCoreStringId.QueryBuilder_RelationProperties';
                break;
        }
        return getLocalization(text, id);
    }
    static _createWrappedObject(query, commonModel, undoEngine, showParameters) {
        const modelProperties = new ObjectProperties(query, null, 1);
        const modelValues = ko.computed(() => query() && query().parameters);
        const info = [queryInfo, selectedItemInfo, fieldsInfo];
        const object = {
            selectedItem: commonModel,
            query: {
                editableObject: query,
                properties: modelProperties
            },
            fields: commonModel,
            isPropertyVisible: (propertyName) => {
                if (propertyName === 'selectedItem') {
                    return commonModel.editableObject() !== query();
                }
                return true;
            }
        };
        if (showParameters) {
            object['parameters'] = {
                values: modelValues,
                addHandler: () => new ParameterViewModel({ '@Type': 'System.String' }),
                collapsed: false,
                undoEngine: undoEngine,
                isVisibleButton: (index, button) => button === 'add' || button === 'delete',
                template: '#dxqb-collectioneditor-template',
                textEmptyArray: { text: 'Click the Add button to create a parameter.', localizationId: 'AnalyticsCoreStringId.QueryBuilder_PageConfigureParametersEmpty' }
            };
            info.push(parametersInfo);
        }
        object['getInfo'] = () => info;
        return object;
    }
    static _createGroups(editableObject, showParameters) {
        const groups = {
            'Query': {
                info: [queryInfo],
                displayName: () => getLocalization('Query Properties', 'AnalyticsCoreStringId.QueryBuilder_QueryProperties')
            },
            'SelectedItem': {
                info: [selectedItemInfo],
                displayName: () => this._getSelectedItemPropertyName(editableObject())
            },
            'Fields': {
                info: [fieldsInfo],
                displayName: () => getLocalization('Available tables and views', 'AnalyticsCoreStringId.QueryBuilder_AvailableTables')
            }
        };
        if (showParameters)
            groups['Parameters'] = {
                info: [parametersInfo],
                displayName: () => getLocalization('Parameters', 'AnalyticsCoreStringId.QueryBuilder_Parameters')
            };
        return groups;
    }
    static _createQBPropertyGrid(query, commonModel, undoEngine, showParameters) {
        const object = this._createWrappedObject(query, commonModel, undoEngine, showParameters);
        const grid = new ControlProperties(ko.observable(object), {
            groups: this._createGroups(commonModel.editableObject, showParameters),
            editors: object['getInfo']()
        }, undefined, false);
        return grid;
    }
    _getGroupByName(name) {
        return this.model.groups.filter(x => x['_displayName'] === name)[0];
    }
}
export class SelectedTabInfo extends TabInfo {
    constructor(model) {
        super({
            text: 'Properties',
            template: 'dxqb-properties-wrapper-editorlist',
            model: model
        });
        this.model = model;
    }
}
