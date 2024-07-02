﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_chartDataFilterModelReport.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { DataFilterModel, dataFilterSerializationsInfo, DefaultDataFilterModel } from '../../../chart/components/models/_dataFilter';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
const dataFilterReportPropertiesSerializationsInfo = [{ propertyName: 'dataMember', modelName: '@DataMember' }, { propertyName: 'dataSource', modelName: '@DataSource', link: true }], valueDataBinding = { propertyName: 'value', displayName: 'Value Data Members', editor: designerEditorTemplates.getEditor('chartValueBinding'), localizationId: 'DevExpress.XtraCharts.SeriesBase.ValueDataMembers' };
const dataFilterReportSerializationFakeInfo = [
    { propertyName: 'misc', displayName: 'Misc', editor: editorTemplates.getEditor('objecteditor'), info: dataFilterSerializationsInfo, localizationId: 'ChartStringId.PropertyGridCategory_Misc' },
    { propertyName: 'report', displayName: 'Report Data', localizationId: 'ReportStringId.CatReportData', editor: editorTemplates.getEditor('objecteditor'), info: [valueDataBinding] }
];
export class DataFilterModelReport extends DataFilterModel {
    constructor(model, serializer) {
        super(model, serializer);
        this.misc = this._mapObject(dataFilterSerializationsInfo);
        this.misc.isPropertyDisabled = (propertyName) => {
            return propertyName === 'value' && this.dataMember() != null;
        };
        this.report = this._createReportDataProperty();
    }
    getInfo() {
        return [].concat([].concat(dataFilterSerializationsInfo, dataFilterReportPropertiesSerializationsInfo)
            .map(x => { return { propertyName: x.propertyName, modelName: x.modelName, link: x.link }; }), dataFilterReportSerializationFakeInfo);
    }
    _createReportDataProperty() {
        return {
            updateValue: (pathRequest, parameters) => {
                if (!!pathRequest.fullPath) {
                    if (pathRequest.fullPath.indexOf('Parameters') === 0) {
                        const parameterName = pathRequest.fullPath.split('.').pop();
                        this.dataSource(parameters.filter((x) => x.name === parameterName)[0]);
                        this.dataMember('Value');
                    }
                    else {
                        this.dataMember(pathRequest.path);
                        this.dataSource(null);
                    }
                }
                else {
                    this.dataMember(null);
                    this.dataSource(null);
                }
            },
            displayValue: (reportDataSource) => {
                if (this.dataSource()) {
                    return ['Parameters', this.dataSource().name].join(' - ');
                }
                else {
                    if (this.dataMember()) {
                        return [reportDataSource.name, this.dataMember()].join(' - ');
                    }
                    return '';
                }
            },
            calculatePath: (reportDataSource) => {
                if (this.dataSource()) {
                    return ['Parameters', this.dataSource().name].join('.');
                }
                else {
                    if (this.dataMember()) {
                        return [reportDataSource.ref || reportDataSource.id, this.dataMember()].join('.');
                    }
                    return '';
                }
            },
            getInfo: () => { return [valueDataBinding]; },
            value: this._mapObject(dataFilterReportPropertiesSerializationsInfo)
        };
    }
    _mapObject(info) {
        const obj = { getInfo: () => { return info; } };
        for (let i = 0; i < info.length; i++) {
            const propertyName = info[i].propertyName;
            obj[propertyName] = this[propertyName];
        }
        obj['getPath'] = (propertyName) => {
            return this['getPath'](propertyName);
        };
        return obj;
    }
}
DefaultDataFilterModel(DataFilterModelReport);
