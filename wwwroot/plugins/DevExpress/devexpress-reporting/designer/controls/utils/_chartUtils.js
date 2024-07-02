﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_chartUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getParentContainer } from '@devexpress/analytics-core/analytics-internal';
import { ActionId } from '@devexpress/analytics-core/analytics-tools';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export const createChartDesignerOptions = (designerModel, dataSourceHelper, model, parameters, chartValueBindingProvider, accessibilityProvider) => {
    const chartDesignerOptionsVisible = ko.observable(false);
    let chartIsDirty;
    const currentChart = ko.observable(null);
    let disposables = [];
    let chartDisposables = [];
    disposables.push(chartDesignerOptionsVisible.subscribe((newVal) => {
        if (newVal) {
            currentChart().designTime(true);
            designerModel.undoEngine().start();
        }
        else {
            chartDisposables.forEach((x) => x.dispose());
            chartDisposables = [];
            designerModel.undoEngine().end();
            const isDirty = chartIsDirty();
            chartDesignerOptions.options.data.chart(null);
            if (isDirty) {
                const undoEngine = designerModel.undoEngine();
                undoEngine.undo();
                undoEngine.redoEnabled(false);
                undoEngine._observers.pop();
            }
            currentChart().designTime(false);
            currentChart(null);
        }
    }));
    const chartDesignerOptions = {
        dispose: () => {
            chartDisposables.forEach((x) => x.dispose());
            disposables.forEach((x) => x.dispose());
            chartDisposables = [];
            disposables = [];
        },
        options: null,
        visible: chartDesignerOptionsVisible,
        buttons: [{
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: getLocalization('OK', 'PivotGridStringId.FilterOk'), type: 'default', stylingMode: 'contained', onClick: () => {
                        chartIsDirty(false);
                        chartDesignerOptionsVisible(false);
                    }
                }
            },
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'), type: 'normal', stylingMode: 'contained', onClick: () => {
                        chartDesignerOptionsVisible(false);
                    }
                }
            }],
        run: (chartSurface) => {
            const xrChart = chartSurface._control;
            currentChart(chartSurface);
            if (!chartDesignerOptions.options) {
                chartDesignerOptions.options = {
                    callbacks: {
                        customizeActions: function (actions) {
                            for (let i = 0; i < actions.length; i++) {
                                if (actions[i].id === ActionId.Undo || actions[i].id === ActionId.Redo) {
                                    actions[i].hasSeparator = false;
                                }
                                else {
                                    actions[i].visible = false;
                                    actions[i].hasSeparator = false;
                                }
                            }
                        },
                        init: function (chartModel) {
                            chartDisposables.push(chartIsDirty = ko.computed({
                                read: () => {
                                    return chartModel.undoEngine().isDirty();
                                },
                                write: (newVal) => {
                                    chartModel.undoEngine().isDirty(newVal);
                                }
                            }));
                            chartModel.displayNameProvider = designerModel.displayNameProvider;
                            chartModel.dataSourceHelper = dataSourceHelper;
                            chartDisposables.push(chartModel.reportParameters = ko.computed(() => { return parameters().parameters(); }));
                            chartDisposables.push(chartModel.reportDataSource = ko.computed(() => { return dataSourceHelper().findDataSourceInfo(model() && model().dataSource()); }));
                            chartModel.reportDataBindingsProvider = chartValueBindingProvider;
                            chartDisposables.push(chartDesignerOptionsVisible.subscribe((newVal) => {
                                if (newVal) {
                                    chartModel.updateSurfaceSize();
                                }
                            }));
                        }
                    },
                    data: {
                        chart: ko.observable(xrChart.chartModel),
                        availableChartDataSources: designerModel.chartDataSources,
                        width: 500,
                        height: 500
                    },
                    accessibilityProvider: accessibilityProvider,
                    visible: chartDesignerOptionsVisible,
                    rtl: designerModel.rtl,
                    fieldListProvider: designerModel.dataBindingsProvider
                };
            }
            else {
                chartDesignerOptions.options.data.chart(xrChart.chartModel);
            }
            chartDesignerOptions.visible(true);
        },
        container: (element) => getParentContainer(element, '.dx-designer')
    };
    return chartDesignerOptions;
};
