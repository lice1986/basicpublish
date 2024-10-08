﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { ComponentsModel } from '../controls/properties/components';
import { FormattingRule } from '../controls/properties/formattingrules';
import { StyleModel } from '../controls/properties/style';
import { subreportControlCollector } from '../controls/utils/_subreportUtils';
import { ReportViewModel } from '../controls/xrReport';
import { CalculatedField } from '../dataObjects/calculatedField';
import { Parameter } from '../dataObjects/parameters/parameter';
export function recalculateUnit(value, dpi) {
    return Math.round(value * dpi) / 100;
}
export const PromptBoolean = {
    'False': 'False',
    'True': 'True',
    'Prompt': 'Prompt'
};
export function correctModel(model) {
    if (Array.isArray(model)) {
        for (let i = 0; i < model.length; i++) {
            if (model[i]['@Ref'] !== undefined) {
                model = model[i];
                break;
            }
        }
    }
    else {
        Object.keys(model).forEach((name) => {
            if (model[name] instanceof Object)
                model[name] = correctModel(model[name]);
        });
    }
    return model;
}
export function createReportViewModel(newReportInfo, oldReport) {
    const reportModel = JSON.parse(newReportInfo.reportModel);
    const report = new ReportViewModel(reportModel, undefined, newReportInfo.knownEnums);
    if (oldReport) {
        let nextRef = Math.max(...report.objectStorage().map(data => parseInt(data['_model']['@Ref']))) + 1;
        oldReport.dsHelperProvider().usedDataSources()
            .filter(dsInfo => !!dsInfo.data && !newReportInfo.dataSourceRefs.some(ref => ref.name === dsInfo.name))
            .forEach((dsInfo) => {
            dsInfo.data['_model']['@Ref'] = nextRef.toString();
            newReportInfo.dataSourceRefs.push({
                name: dsInfo.name,
                ref: nextRef.toString(),
                isFederationDataSource: dsInfo.isFederationDataSource,
                isSqlDataSource: dsInfo.isSqlDataSource,
                isJsonDataSource: dsInfo.isJsonDataSource,
                isObjectDataSource: dsInfo.isObjectDataSource,
                isListType: dsInfo.isListType,
                isSupportQueries: dsInfo.isSupportQueries,
                dataSerializer: dsInfo.dataSerializer,
                hasParams: dsInfo['hasParams']
            });
            report.objectStorage.push(dsInfo.data);
            nextRef++;
        });
    }
    report.dataSourceRefs = newReportInfo.dataSourceRefs;
    return report;
}
export function updateDataSourceRefs(report, dataSourceRefs) {
    const getDataSourceRefs = (key) => {
        const resultRefs = (dataSourceRefs || []).filter((ds) => { return ds.Key === key; })[0];
        return resultRefs && resultRefs.Value || [];
    };
    report.dataSourceRefs = getDataSourceRefs(report.key());
    const subreportControls = subreportControlCollector(report);
    subreportControls.forEach((subreport) => {
        if (subreport.reportSource) {
            subreport.reportSource.dataSourceRefs = getDataSourceRefs(subreport.key());
        }
    });
}
export function isNotParameter(control) {
    return !(control instanceof Parameter);
}
export function isControl(control) {
    return isNotParameter(control) && !(control instanceof StyleModel || control instanceof FormattingRule || control instanceof ComponentsModel || control instanceof CalculatedField);
}
export function updateSurfaceContentSizeLocalizationMode(surfaceSize, root, rtl) {
    return () => {
        const $root = $.fn.constructor(root).find('.dxrd-designer').eq(0);
        const leftLocalizationPanel = $.fn.constructor(root).find('.dxrd-left-localization-panel:visible').outerWidth() || 0;
        const otherWidth = leftLocalizationPanel + 50;
        const surfaceWidth = $root.width() - (otherWidth);
        $root.find('.dxrd-surface-wrapper').eq(0).css({
            'left': rtl ? '50px' : otherWidth,
            'right': !rtl ? otherWidth : '50px',
            'width': surfaceWidth,
            'bottom': 0
        });
        surfaceSize(surfaceWidth);
    };
}
