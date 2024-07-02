﻿/**
* DevExpress Analytics (query-builder\wizard\pages\chooseDataSourceTypePage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { findFirstItemMatchesCondition } from '../../../core/utils/_arrayutils';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { __nextActionFunctionName } from '../internal/_constants';
import { DataSourceWizardPageId } from '../pageId';
import { WizardPageBase } from './wizardPageBase';
export var DataSourceType;
(function (DataSourceType) {
    DataSourceType[DataSourceType["NoData"] = 0] = "NoData";
    DataSourceType[DataSourceType["Sql"] = 1] = "Sql";
    DataSourceType[DataSourceType["Json"] = 2] = "Json";
    DataSourceType[DataSourceType["Object"] = 3] = "Object";
    DataSourceType[DataSourceType["Federation"] = 4] = "Federation";
})(DataSourceType || (DataSourceType = {}));
export class TypeItem {
    constructor(textDefault, textID, imageClassName, imageTemplateName, type) {
        this.text = getLocalization(textDefault, textID);
        this.imageClassName = imageClassName;
        this.imageTemplateName = imageTemplateName;
        this.type = type;
    }
}
export class ChooseDataSourceTypePage extends WizardPageBase {
    constructor(_dataSourceTypeOptions) {
        super();
        this._dataSourceTypeOptions = _dataSourceTypeOptions;
        this._itemClick = (item) => {
            this.selectedItem(item);
        };
        this._IsSelected = (item) => {
            return this.selectedItem().type === item.type;
        };
        this.selectedItem = ko.observable();
        this.typeItems = this._createTypeItems();
        this._disposables.push(this.selectedItem.subscribe(() => this._onChange()));
        this._extendCssClass = $.noop;
    }
    canNext() {
        return this.selectedItem() != null;
    }
    canFinish() {
        return false;
    }
    _goToNextPage() {
        this[__nextActionFunctionName] && this[__nextActionFunctionName]();
    }
    commit() {
        return $.Deferred().resolve({ dataSourceType: this.selectedItem().type }).promise();
    }
    _createTypeItems() {
        const typeItems = [];
        if (this._dataSourceTypeOptions.sqlDataSourceAvailable) {
            typeItems.push(new TypeItem('Database', 'DataAccessUIStringId.DSTypeSql', 'sqldatasource', 'dxrd-svg-wizard-SqlDataSource', DataSourceType.Sql));
        }
        if (this._dataSourceTypeOptions.jsonDataSourceAvailable) {
            typeItems.push(new TypeItem('JSON', 'DataAccessUIStringId.DSTypeJson', 'jsondatasource', 'dxrd-svg-wizard-JsonDataSource', DataSourceType.Json));
        }
        if (this._dataSourceTypeOptions.objectDataSourceAvailable) {
            typeItems.push(new TypeItem('Object', 'DataAccessUIStringId.DSTypeObject', 'objectdatasource', 'dxrd-svg-wizard-ObjectDataSource', DataSourceType.Object));
        }
        if (this._dataSourceTypeOptions.federationDataSourceAvailable) {
            typeItems.push(new TypeItem('Data Federation', 'DataAccessUIStringId.DSTypeFederation', 'federationdatasource', 'dxrd-svg-wizard-FederationDataSource', DataSourceType.Federation));
        }
        return typeItems;
    }
    initialize(state) {
        if (!this.typeItems || this.typeItems.length === 0) {
            this.selectedItem(null);
        }
        else {
            const type = state.dataSourceType !== undefined ? state.dataSourceType : this.typeItems[0].type;
            this.selectedItem(findFirstItemMatchesCondition(this.typeItems, (item) => item.type === type));
        }
        return $.Deferred().resolve().promise();
    }
}
export function _registerChooseDataSourceTypePage(factory, dataSourceTypeOptions) {
    factory.registerMetadata(DataSourceWizardPageId.ChooseDataSourceTypePage, {
        setState: (data, state) => {
            state.dataSourceType = data.dataSourceType;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.dataSourceType = defaultState.dataSourceType;
        },
        create: () => {
            return new ChooseDataSourceTypePage(dataSourceTypeOptions);
        },
        description: getLocalization('Select the data source type.', 'DataAccessUIStringId.WizardPageChooseDSType'),
        template: 'dxrd-page-choose-datasource-type'
    });
}
