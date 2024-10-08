﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_dataSourceActions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { guid, NotifyType, ShowMessage } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { addDataSourceToReport, removeDataSourceFromReport } from '../internal/_dataUtils';
import { ReportDataSourceService } from '../services/_reportDataSourceService';
export class DataSourceActions {
    constructor(dsHelper, reportViewModel, undoEngine, _allowEditDataSource = true, _allowRemoveDataSource = true, _fieldListProvider) {
        this._allowEditDataSource = _allowEditDataSource;
        this._allowRemoveDataSource = _allowRemoveDataSource;
        this._fieldListProvider = _fieldListProvider;
        this.removeDataSourceAction = {
            clickAction: (item) => {
                this.removeDataSource(item.data.name);
            },
            position: 50,
            imageClassName: 'dxrd-image-recycle-bin',
            imageTemplateName: 'dxrd-svg-operations-recycle_bin',
            text: getLocalization('Remove Data Source', 'ASPxReportsStringId.ReportDesigner_FieldListActions_RemoveDataSource')
        };
        this.rebuildResultSchemaAction = {
            clickAction: (item) => {
                this.rebuildResultSchema(item.data.name);
            },
            position: 0,
            imageClassName: 'dxrd-image-operations-rebuild_schema',
            imageTemplateName: 'dxrd-svg-operations-rebuild_schema',
            text: getLocalization('Rebuild Result Schema', 'DataAccessUIStringId.SqlDataSourceDesignerVerbRebuildSchema')
        };
        this.renameAction = {
            clickAction: (item) => {
                item.setRenameMode(true);
            },
            position: 0,
            imageClassName: 'dxrd-image-operations-rename',
            imageTemplateName: 'dxrd-svg-operations-rename',
            text: getLocalization('Rename', 'ASPxReportsStringId.ReportDesigner_FieldListActions_Rename')
        };
        this._dsHelper = dsHelper;
        this._reportViewModel = reportViewModel;
        this._undoEngine = undoEngine;
    }
    _findDataSource(dataSourceID) {
        return this._dsHelper().usedDataSources().filter((item) => {
            return item.id === dataSourceID || item.ref === dataSourceID;
        })[0];
    }
    removeDataSource(dataSourceID) {
        const dsInfo = this._findDataSource(dataSourceID);
        if (!dsInfo)
            return;
        removeDataSourceFromReport(this._dsHelper(), this._reportViewModel().dataSource, this._undoEngine, dsInfo);
    }
    addPredifinedDataSource(dataSourceName) {
        const dsHelper = ko.unwrap(this._dsHelper);
        const data = dsHelper.availableDataSources.filter(x => x.name === dataSourceName)[0];
        data.id = guid().replace(/-/g, '');
        addDataSourceToReport(dsHelper, this._reportViewModel(), this._undoEngine(), this._fieldListProvider(), data, true);
    }
    rebuildResultSchema(dataSourceID) {
        const dsInfo = this._findDataSource(dataSourceID);
        if (!dsInfo)
            return;
        let request = null;
        if (dsInfo.isSqlDataSource)
            request = ReportDataSourceService.sqlRebuildResultSchema(dsInfo.data['base64']());
        if (dsInfo.isFederationDataSource)
            request = ReportDataSourceService.federationRebuildResultSchema(dsInfo.data['base64'](), dsInfo.data.dependentDataSources);
        request.done((result) => {
            dsInfo.data['base64'](result);
            ShowMessage(getLocalization('Result schema is rebuilt successfully.', 'DataAccessUIStringId.RebuildResultSchemaComplete'), NotifyType.success);
        });
    }
    getActions(context) {
        const result = [];
        if (!context.data)
            return result;
        if (this._allowRemoveDataSource && context.data['canRemove'] === true) {
            result.push(this.removeDataSourceAction);
        }
        if (this._allowEditDataSource) {
            if (!!context.data['rename'])
                result.push(this.renameAction);
            if (context.data['isSqlDataSource'] || context.data['isFederationDataSource'])
                result.push(this.rebuildResultSchemaAction);
        }
        return result;
    }
}
