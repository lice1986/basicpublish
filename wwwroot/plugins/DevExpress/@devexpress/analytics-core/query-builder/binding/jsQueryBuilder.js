﻿/**
* DevExpress Analytics (query-builder\binding\jsQueryBuilder.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { updateLocalization } from '../../property-grid/localization/localization_utils';
import { NotifyAboutWarning } from '../../core/utils/_infoMessageHelpers';
import { serializeDataConnection } from '../utils/_dataConnection';
export class JSQueryBuilder {
    constructor(_queryBuilderModel) {
        this._queryBuilderModel = _queryBuilderModel;
    }
    get queryBuilderModel() {
        return this._queryBuilderModel();
    }
    set queryBuilderModel(newVal) {
        this._queryBuilderModel(newVal);
    }
    UpdateLocalization(localization) {
        updateLocalization(localization);
    }
    GetQueryBuilderModel() {
        return this.queryBuilderModel;
    }
    GetJsonQueryModel() {
        return { 'Query': this.queryBuilderModel.model().serialize() };
    }
    GetSaveQueryModel() {
        return {
            queryLayout: JSON.stringify(this.GetJsonQueryModel()),
            connection: this.SerializeDataConnection()
        };
    }
    SerializeDataConnection() {
        const connection = this.queryBuilderModel.model().dbSchemaProvider.connection;
        return serializeDataConnection(connection);
    }
    AdjustControlCore() {
        this.queryBuilderModel && this.queryBuilderModel.updateSurfaceSize();
    }
    Save() {
        this.queryBuilderModel && this.queryBuilderModel.model().onSave();
    }
    ShowPreview() {
        this.queryBuilderModel && this.queryBuilderModel.showPreview();
    }
    IsQueryValid() {
        return this.queryBuilderModel && this.queryBuilderModel.model().isValid();
    }
    OnCallback(result) {
        if (result.queryValidationError) {
            NotifyAboutWarning(result.queryValidationError, true);
        }
    }
}