﻿/**
* DevExpress HTML/JS Reporting (chart\_control.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getFullPath } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, ModelSerializer, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { chart, ChartViewModel } from './components/models/_chart';
import { legend } from './components/models/_legend';
import { ScaleType, ScaleTypeMap, seriesTemplate } from './components/series/_template';
import { diagram } from './components/_diagram';
import { backImage, emptyChartText, legends, paletteName, seriesSerializable, smallChartText, titles } from './internal/meta/_chart';
import { chartDataSource, editorTemplates } from './internal/_editorTemplates';
import { _isDateTypeSpecific, _isNumericTypeSpecific } from './internal/_utils';
import { controlsFactory } from './_controlsFactory';
export class ChartControlViewModel extends Disposable {
    constructor(options) {
        super();
        this.fieldListProvider = ko.observable(null);
        this.chart = options.chart ? options.chart : new ChartViewModel(options.chartSource, new ModelSerializer());
        this.dataSource = options.dataSource;
        this.parameters = options.parameters;
        this._initChartElementFunctions();
        ['seriesDataMember', 'dataMember'].forEach((val) => {
            this[val] = ko.computed({
                read: () => {
                    return this.chart.dataContainer[val]();
                }, write: (newVal) => {
                    this.chart.dataContainer[val](newVal);
                }
            });
        });
    }
    getInfo() {
        return chartControlSerializationsInfo;
    }
    getControlFactory() {
        return controlsFactory;
    }
    isSeriesPropertyDisabled(name) {
        if (!this.dataSource()) {
            return name === 'argumentDataMember' || name === 'valueDataMembers' || name === 'colorDataMember' || name === 'filterString';
        }
    }
    isSeriesTemplatePropertyDisabled(name) {
        if (!this.dataSource()) {
            return name === 'argumentDataMember' || name === 'valueDataMembers' || name === 'valueScaleType' || name === 'filterString';
        }
    }
    _getSeriesActualArgumentScaleType(argumentDataMember) {
        const deffered = $.Deferred();
        if (this.fieldListProvider() && argumentDataMember) {
            let seriesDataMember = this.getPath('seriesDataMember');
            let argumentFieldName = argumentDataMember;
            const argumentDataMemberPathComponents = argumentDataMember.split('.');
            if (argumentDataMemberPathComponents.length > 1) {
                argumentFieldName = argumentDataMemberPathComponents.pop();
                argumentDataMemberPathComponents.splice(0, 0, seriesDataMember);
                seriesDataMember = argumentDataMemberPathComponents.join('.');
            }
            this.fieldListProvider().getItems(new PathRequest(seriesDataMember))
                .done((items) => {
                const result = items.filter(item => item.name === argumentFieldName)[0];
                let _scaleType = ScaleType.Numerical;
                if (result && result.specifics) {
                    if (_isNumericTypeSpecific(result.specifics))
                        _scaleType = ScaleType.Numerical;
                    else if (_isDateTypeSpecific(result.specifics))
                        _scaleType = ScaleType.DateTime;
                    else
                        _scaleType = ScaleType.Qualitative;
                }
                deffered.resolve(_scaleType);
            })
                .fail(() => {
                deffered.resolve(ScaleType.Numerical);
            });
        }
        else {
            deffered.resolve(ScaleType.Numerical);
        }
        return deffered.promise();
    }
    _initSeries(series) {
        const seriesGetPath = series['getPath'].bind(series);
        series['getPath'] = (propertyName) => {
            if (propertyName === 'argumentDataMember' || propertyName === 'colorDataMember' || propertyName === 'summaryFunction') {
                return seriesGetPath('seriesDataMember') || this.getPath('seriesDataMember');
            }
        };
        series['isPropertyDisabled'] = (name) => {
            if (series._isPropertyDisabled(name))
                return true;
            if (series._isDataMemberPropertyDisabled(name)) {
                return this.isSeriesPropertyDisabled(name);
            }
        };
        series._disposables.push(series.filterString.helper.parameters = ko.computed(() => {
            return this.parameters && this.parameters();
        }));
        series.valueDataMembers()['getPath'] = (propertyName) => {
            return seriesGetPath('seriesDataMember') || this.getPath('seriesDataMember');
        };
        series._disposables.push(series.valueDataMembers.subscribe((newVal) => {
            newVal['getPath'] = (propertyName) => {
                return seriesGetPath('seriesDataMember') || this.getPath('seriesDataMember');
            };
        }));
        const updateSeriesActualArgumentScaleType = () => {
            if (this.chart.dataContainer.seriesTemplate.argumentScaleType() !== 'Auto')
                return;
            this._getSeriesActualArgumentScaleType(series.argumentDataMember()).done((scaleType) => {
                series._actualArgumentScaleType(scaleType);
            });
        };
        updateSeriesActualArgumentScaleType();
        series._disposables.push(series.argumentDataMember.subscribe(updateSeriesActualArgumentScaleType), this.fieldListProvider.subscribe(updateSeriesActualArgumentScaleType));
        series._disposables.push(series.argumentScaleType.subscribe((newVal) => {
            if (newVal !== 'Auto' && newVal !== 'Qualitative')
                this._getSeriesActualArgumentScaleType(series.argumentDataMember()).done((scaleType) => {
                    if (scaleType !== ScaleTypeMap[newVal])
                        series.argumentDataMember('');
                });
            series._actualArgumentScaleType(newVal == 'Auto' ? ScaleType.Numerical : ScaleTypeMap[newVal]);
        }));
    }
    _initChartElementFunctions() {
        const seriesTemplate = this.chart.dataContainer.seriesTemplate;
        const seriesTemplateGetPath = seriesTemplate['getPath'].bind(seriesTemplate);
        this._initSeries(seriesTemplate);
        this.chart.dataContainer.series().forEach(series => this._initSeries(series));
        this._disposables.push(this.chart.dataContainer.series.subscribe((args) => {
            if (args[0].status === 'added') {
                this._initSeries(args[0].value);
            }
        }, null, 'arrayChange'));
        seriesTemplate['getPath'] = (propertyName) => {
            return seriesTemplateGetPath('seriesDataMember') || this.getPath('seriesDataMember');
        };
        seriesTemplate['isPropertyDisabled'] = (name) => {
            if (seriesTemplate._isPropertyDisabled(name))
                return true;
            if (seriesTemplate._isDataMemberPropertyDisabled(name)) {
                return this.isSeriesTemplatePropertyDisabled(name);
            }
        };
        this._disposables.push(seriesTemplate.filterString.helper.parameters = ko.computed(() => {
            return this.parameters && this.parameters();
        }));
        seriesTemplate.valueDataMembers()['getPath'] = (propertyName) => {
            return seriesTemplateGetPath('seriesDataMember') || this.getPath('seriesDataMember');
        };
        this._disposables.push(seriesTemplate.valueDataMembers.subscribe((newValue) => {
            newValue['getPath'] = (propertyName) => {
                return seriesTemplateGetPath('seriesDataMember') || this.getPath('seriesDataMember');
            };
        }));
        this._disposables.push(seriesTemplate.argumentDataMember.subscribe((newValue) => {
            if (seriesTemplate.argumentScaleType() !== 'Auto')
                return;
            this._getSeriesActualArgumentScaleType(newValue).done((scaleType) => {
                seriesTemplate._actualArgumentScaleType(scaleType);
            });
        }));
    }
    getPath(propertyName) {
        const dataSourceInfo = this.dataSource();
        const dataSourceName = (dataSourceInfo && dataSourceInfo.data && (dataSourceInfo.id || dataSourceInfo.ref)) || '';
        if (propertyName === 'seriesDataMember' || propertyName === 'valueDataMembers' || propertyName === 'colorDataMember') {
            return getFullPath(dataSourceName, this.chart.dataContainer.dataMember());
        }
        else if (propertyName === 'dataMember') {
            return dataSourceName;
        }
    }
    serialize() {
        return (new ModelSerializer()).serialize(this);
    }
    save() {
        const data = this.serialize();
        if (this.onSave) {
            this.onSave(data);
        }
        return data;
    }
    isPropertyDisabled(name) {
        return !this.dataSource() && (name === 'seriesDataMember' || name === 'dataMember');
    }
}
export const chartDataMember = { propertyName: 'dataMember', displayName: 'Data Member', defaultVal: '', editor: editorTemplates.getEditor('dataMemberChart'), localizationId: 'DevExpress.XtraReports.UI.XRSparkline.DataMember' };
export const chartSeriesDataMember = { propertyName: 'seriesDataMember', displayName: 'Series Data Member', defaultVal: '', editor: editorTemplates.getEditor('fieldChart'), localizationId: 'DevExpress.XtraReports.UI.XRChart.SeriesDataMember' };
export const fakeChartSerializationInfo = [
    chartDataSource, chartDataMember, chartSeriesDataMember, paletteName, seriesTemplate, seriesSerializable, diagram, titles, legend, legends, emptyChartText, smallChartText, backImage
];
export const chartControlSerializationsInfo = [chart];