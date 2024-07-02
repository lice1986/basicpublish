﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrChart.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getFullPath, getUniqueNameForNamedObjectsArray, NotifyAboutWarning } from '@devexpress/analytics-core/analytics-internal';
import { deserializeArray, getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { CommonValueDataMembers } from '../../chart/internal/data/_commonValue';
import { StockValueDataMembers } from '../../chart/internal/data/_stockValue';
import { Value1Value2DataMembers } from '../../chart/internal/data/_value1Value2';
import { ValueWeightDataMembers } from '../../chart/internal/data/_valueWeight';
import { ChartControlViewModel } from '../../chart/_control';
import { getChartChildComponents } from '../../common/utils/_chartUtils';
import { ReportRenderingService } from '../services/_reportRenderingService';
import { HandlerUri } from '../utils/settings';
import { ControlParameter } from './properties/controlParameter';
import { ChartLocalizationProvider } from './utils/_localizationUtils';
import { XRControlSurface, XRControlViewModel } from './xrControl';
import { XRPivotGridViewModel } from './xrPivotgrid';
export class XRChartViewModel extends XRControlViewModel {
    constructor(model, parent, serializer) {
        super(model, parent, serializer);
        ['seriesDataMember', 'dataMember'].forEach((val) => {
            this[val] = ko.computed({
                read: () => {
                    return this.chart.dataContainer[val]();
                }, write: (newVal) => {
                    this.chart.dataContainer[val](newVal);
                }
            });
        });
        ['appearanceName', 'paletteName'].forEach((val) => {
            this[val] = ko.computed({
                read: () => {
                    return this.chart[val]();
                }, write: (newVal) => {
                    this.chart[val](newVal);
                }
            });
        });
        this.controlParameters = deserializeArray(model['Parameters'], (item) => { return new ControlParameter(item, serializer); });
        this._disposables.push(this.controlParameters.subscribe((args) => {
            args.forEach((change) => {
                if (!change.value.parameterName()) {
                    change.value.parameterName(getUniqueNameForNamedObjectsArray(this.controlParameters(), 'controlParameter'));
                }
            });
        }, null, 'arrayChange'));
        this.pivotGridDataSourceOptions = ko.computed(() => {
            return this.chart.dataContainer.pivotGridDataSourceOptions;
        });
        this.isPivotGridDataSource = ko.observable(this.dataSource() instanceof XRPivotGridViewModel);
        this.isPivotGridDataSource.subscribe((newVal) => {
            XRChartViewModel.setDataMembers(this.chart, newVal);
        });
        this.realDataSource = ko.computed(() => {
            this.isPivotGridDataSource(this.dataSource() instanceof XRPivotGridViewModel);
            const rootSource = this.root && this.root['dataSource'] && this.root['dataSource']();
            return this.dataSource() || rootSource;
        });
        this._disposables.push(this.allChartComponents = ko.computed(() => this._getChildComponents()));
        if (this.expressionObj) {
            this._disposables.push(this.allChartComponents.subscribe((chartComponents) => this._updateExpressionObjectProperties(chartComponents)));
            this._updateExpressionObjectProperties(this.allChartComponents.peek());
        }
        this._disposables.push(ko.computed(() => {
            const dataSources = this.root && this.root.dsHelperProvider && this.root.dsHelperProvider() && this.root.dsHelperProvider().usedDataSources().map(ds => ds.data);
            if (dataSources && !this.isPivotGridDataSource() && dataSources.indexOf(this.dataSource()) === -1)
                this.dataSource(null);
        }));
        this.chartModel = this._createChartModel();
        this.isPivotGridDataSource.subscribe((newVal) => {
            XRChartViewModel.setDataMembers(this.chart, newVal);
        });
    }
    static assignValueDataMembers(chart, str) {
        const valueDataMembers = chart.dataContainer.seriesTemplate.valueDataMembers();
        const assign = (array) => {
            array.forEach((property) => { valueDataMembers[property](str); });
        };
        if (valueDataMembers instanceof CommonValueDataMembers) {
            assign(['value']);
        }
        else if (valueDataMembers instanceof ValueWeightDataMembers) {
            assign(['value', 'weight']);
        }
        else if (valueDataMembers instanceof Value1Value2DataMembers) {
            assign(['value1', 'value2']);
        }
        else if (valueDataMembers instanceof StockValueDataMembers) {
            assign(['open', 'close', 'hight', 'low']);
        }
    }
    static setDataMembers(chart, isPivotGrid) {
        if (isPivotGrid) {
            XRChartViewModel.assignValueDataMembers(chart, 'Values');
            chart.dataContainer.seriesTemplate.argumentDataMember('Arguments');
            chart.dataContainer.seriesDataMember('Series');
        }
        else {
            XRChartViewModel.assignValueDataMembers(chart, null);
            chart.dataContainer.seriesTemplate.argumentDataMember(null);
            chart.dataContainer.seriesDataMember(null);
        }
    }
    _createChartModel() {
        const model = new ChartControlViewModel({
            chart: this.chart,
            dataSource: this.dataSource,
            parameters: this.controlParameters
        });
        model.isSeriesPropertyDisabled = (propertyName) => {
            if (!this.realDataSource() || (this.realDataSource() instanceof XRPivotGridViewModel)) {
                return propertyName === 'argumentDataMember' || propertyName === 'valueDataMembers' || propertyName === 'colorDataMember';
            }
        };
        model.isSeriesTemplatePropertyDisabled = (propertyName) => {
            if (!this.realDataSource() || (this.realDataSource() instanceof XRPivotGridViewModel && model.chart.dataContainer.pivotGridDataSourceOptions.autoBindingSettingsEnabled())) {
                return propertyName === 'argumentDataMember' || propertyName === 'valueDataMembers' || propertyName === 'valueScaleType' || propertyName === 'argumentScaleType';
            }
        };
        model.getPath = (propertyName) => {
            if (this.realDataSource() instanceof XRPivotGridViewModel || propertyName === 'dataMember')
                return this.getPath(propertyName);
            if (propertyName === 'seriesDataMember') {
                return getFullPath(this.getPath('dataMember'), model.dataMember());
            }
        };
        model.isPropertyDisabled = (propertyName) => {
            return this.isPropertyDisabled(propertyName);
        };
        return model;
    }
    _updateExpressionObjectProperties(chartComponents) {
        const expressionDescriptions = this._getExpressionObjectProperties(chartComponents);
        this.expressionObj.updateExpressionObjectProperties(expressionDescriptions);
    }
    _getExpressionObjectProperties(chartComponents) {
        const expressionDescriptions = [];
        chartComponents.forEach(chartComponent => {
            if (chartComponent.component.getExpressionProperties) {
                const expressions = chartComponent.component.getExpressionProperties();
                expressionDescriptions.push(...expressions.map(expression => {
                    return {
                        controlType: this.controlType,
                        propertyName: chartComponent.path + '.' + expression,
                        events: ['BeforePrint'],
                        displayPath: chartComponent.displayPath
                    };
                }));
            }
        });
        return expressionDescriptions;
    }
    _getChildComponents() {
        return getChartChildComponents(this.chart, '');
    }
    createLocalizationProvider() {
        return new ChartLocalizationProvider(this);
    }
    isPropertyDisabled(name) {
        if (!this.realDataSource() || (this.realDataSource() instanceof XRPivotGridViewModel && this.pivotGridDataSourceOptions()['autoBindingSettingsEnabled']())) {
            return name === 'seriesDataMember' || name === 'dataMember';
        }
        else if (!this.realDataSource() || this.realDataSource() instanceof XRPivotGridViewModel) {
            return name === 'dataMember';
        }
        return super.isPropertyDisabled(name);
    }
    getPath(propertyName) {
        if (this.dataSource() instanceof XRPivotGridViewModel) {
            return ['PivotGrid', propertyName].join('.');
        }
        const dsHelperProvider = this.dsHelperProvider();
        const dataSourceName = dsHelperProvider && dsHelperProvider.getDataSourcePath(this.realDataSource());
        if (propertyName === 'seriesDataMember') {
            return getFullPath(dataSourceName, this.dataMember());
        }
        else if (propertyName === 'dataMember') {
            return dataSourceName;
        }
    }
}
export class XRChartSurface extends XRControlSurface {
    constructor(control, context) {
        super(control, context);
        this.designTime = ko.observable(false);
        this.isLoading = ko.observable(false);
        this.imageSrc = ko.observable('');
        this.template = 'dxrd-shape';
        this.contenttemplate = 'dxrd-server-rendered-control-content';
        this.selectiontemplate = 'dxrd-chart-selection';
        this._disposables.push(ko.computed(() => {
            if (!this.designTime()) {
                const _self = this;
                if (HandlerUri()) {
                    _self.isLoading(true);
                    ReportRenderingService.getChartImage(this).done(function (result) {
                        _self.isLoading(false);
                        _self.imageSrc('data:image/svg+xml;base64,' + result.Image);
                    }).fail(function (jqXHR) {
                        _self.isLoading(false);
                        NotifyAboutWarning('Impossible to get chart image.');
                    });
                }
            }
        }).extend({ deferred: true }));
    }
    runDesignerButtonText() {
        return getLocalization('Run Designer', 'ReportStringId.Verb_RunDesigner');
    }
}