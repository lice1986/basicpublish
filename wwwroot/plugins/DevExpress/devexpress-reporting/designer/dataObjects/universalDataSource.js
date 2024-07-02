﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\universalDataSource.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { deserializeArray } from '@devexpress/analytics-core/analytics-utils';
import { FilterStringOptions } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { filterString, filterStringEditable } from '../controls/metadata/properties/metadata';
import { ObjectItem, ObjectStorageParameter } from './objectStorageItem';
export class TableInfoCollectionItem extends SerializableModel {
    constructor(model, dataSource, dsHelper, serializer) {
        super(model, serializer, tableInfoCollectionItemSerializationsInfo);
        this.filterString = ko.observable(null);
        const options = new FilterStringOptions(this['_filterString'], ko.pureComputed(() => {
            return dsHelper() && (dsHelper().getDataSourcePath(dataSource) + '.' + this['tableName']());
        }), ko.pureComputed(() => !dataSource));
        options.helper.canChoiceParameters = true;
        this.filterString(options);
    }
}
const tableInfoCollectionItemSerializationsInfo = [filterString, filterStringEditable, { propertyName: 'tableName', modelName: '@TableName' }];
export class UniversalDataSource extends ObjectItem {
    constructor(model, dsHelperProvider, serializer) {
        super($.extend({ '@ObjectType': 'DevExpress.ReportServer.Infrastructure.Data.UniversalDataSource' }, model), dsHelperProvider, serializer);
        this.parameters = deserializeArray(model.Parameters || [], (item) => { return new ObjectStorageParameter(item, serializer); });
        this.tableInfoCollection = deserializeArray(model.TableInfoCollection || [], (item) => { return new TableInfoCollectionItem(item, this, dsHelperProvider, serializer); });
        this.spParameterInfoCollection = deserializeArray(model.StoredProcedureParameterInfoCollection || [], (item) => { return new ObjectStorageParameter(item, serializer); });
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.parameters);
        this.disposeObservableArray(this.tableInfoCollection);
        this.disposeObservableArray(this.spParameterInfoCollection);
        this.resetObservableArray(this.parameters);
        this.resetObservableArray(this.tableInfoCollection);
        this.resetObservableArray(this.spParameterInfoCollection);
    }
    getInfo() {
        return super.getInfo().concat([
            { propertyName: 'parameters', modelName: 'Parameters', array: true },
            { propertyName: 'tableInfoCollection', modelName: 'TableInfoCollection', array: true },
            { propertyName: 'spParameterInfoCollection', modelName: 'StoredProcedureParameterInfoCollection', array: true },
            { propertyName: 'name', modelName: '@Name' }
        ]);
    }
}