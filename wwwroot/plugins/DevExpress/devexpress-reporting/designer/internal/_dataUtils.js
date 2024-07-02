﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_dataUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { find, findFirstItemMatchesCondition } from '@devexpress/analytics-core/analytics-internal';
import { PathRequest } from '@devexpress/analytics-core/analytics-utils';
import { defaultObjectDataSourceItemSpecifics } from '@devexpress/analytics-core/analytics-wizard-internal';
import * as ko from 'knockout';
import { ExtensionModel } from '../controls/properties/extension';
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
import { isList } from './dragdrop/_utils';
export function addDataSourceToReport(dataSourceHelper, report, undoEngine, itemsProvider, dataSource, forceAssigning = false) {
    undoEngine.start();
    const findFirstDataSourceWithSerializer = findFirstItemMatchesCondition(dataSourceHelper.usedDataSources.peek(), item => !!item.dataSerializer && item.dataSerializer !== dataSource.dataSerializer);
    const result = dataSourceHelper.addDataSource(dataSource);
    if (!findFirstDataSourceWithSerializer && dataSource.dataSerializer) {
        report.extensions.peek().forEach((item, index) => {
            if (item.key.peek() === DataSourceHelper.defaultReportExtensionKey) {
                report.extensions.splice(index, 1);
            }
        });
        const newDataSerializer = new ExtensionModel({});
        newDataSerializer.key = ko.observable(DataSourceHelper.defaultReportExtensionKey);
        newDataSerializer.value = ko.observable(dataSource.dataSerializer);
        report.extensions.push(newDataSerializer);
    }
    if (forceAssigning || !report.dataSource()) {
        report.dataSource(result);
        itemsProvider
            .getItems(new PathRequest(dataSource.id || dataSource.ref))
            .done((dataMembers) => {
            const lists = dataMembers.filter(item => isList(item));
            if (dataMembers.length === 0 || includeNonListItem(dataMembers)) {
                report.dataMember('');
            }
            else if (!find(lists, item => item.name === report.dataMember())) {
                report.dataMember(lists[0].name);
            }
        });
    }
    undoEngine.end();
}
export function includeNonListItem(dataMembers) {
    return dataMembers.some(field => !isList(field) || field.specifics === defaultObjectDataSourceItemSpecifics);
}
export function removeDataSourceFromReport(dataSourceHelper, reportDataSource, undoEngine, dataSource) {
    undoEngine().start();
    dataSourceHelper.removeDataSource(dataSource);
    if (reportDataSource() === dataSource.data) {
        reportDataSource(dataSourceHelper.findDataSourceInfoByRef('none').data);
    }
    undoEngine().end();
}
