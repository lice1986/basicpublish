﻿/**
* DevExpress HTML/JS Reporting (designer\tools\generator\reportDesignerContext.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListProvider } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ChartFieldListExtender } from '../../controls/utils/_chartFieldListExtender';
import { ReportSurface, ReportViewModel } from '../../controls/xrReport';
import { DataSourceHelper } from '../../helpers/_dataSourceHelper';
import { DesignControlsHelper } from '../../helpers/_designControlsHelper';
import { StylesHelper } from '../../helpers/_styleHelper';
import { DesignerErrorProvider } from '../../internal/errorPanel/_designerErrorProvider';
import { RuntimeErrorProvider } from '../../internal/errorPanel/_runtimeErrorProvider';
import { CalculatedFieldsSource } from '../../internal/fieldlist/_calculatedFieldsSource';
import { DataSourceItemsExtender } from '../../internal/fieldlist/_dataSourceItemsExtender';
import { FieldListDataSourcesHelper } from '../../internal/fieldlist/_fieldListDataSourcesHelper';
import { ParametersViewModel } from '../../internal/fieldlist/_parametersViewModel';
import { ReportItemsProvider } from '../../internal/reportExplorer/_reportItemsProvider';
import { DisplayNameProvider } from '../../internal/_displayNameProvider';
import { WatermarksViewModel } from '../../internal/fieldlist/_watermarksViewModel';
export class ReportDesignerContext extends Disposable {
    constructor(options) {
        var _a;
        super();
        this.report = options.report || new ReportViewModel(options.data);
        this.url = ko.isObservable(options.url) ? options.url : ko.observable(options.url);
        if (options.dataSourceRefs)
            this.report.dataSourceRefs = options.dataSourceRefs;
        const knownEnums = !!((_a = options.knownEnums) === null || _a === void 0 ? void 0 : _a.length) ? options.knownEnums : options.report.knownEnums;
        this.report.parameterHelper.initialize(knownEnums, options.designerCallbacks);
        const selection = options.selection;
        const data = options.initializeOptions;
        const designerCallbacks = options.designerCallbacks;
        this.surface = new ReportSurface(this.report);
        this.watermarks = new WatermarksViewModel(this.report.watermarks);
        this.parameters = new ParametersViewModel(this.report);
        this.dataSourceHelper = new DataSourceHelper(this.report.objectStorage, this.report.dataSourceRefs, data.availableDataSources);
        this.report.dataSourceHelper(this.dataSourceHelper);
        this.fieldListDataSourceHelper = new FieldListDataSourcesHelper();
        this.fieldListDataSourceHelper.updateDataSources(this.dataSourceHelper, this.report, this.parameters.parameters);
        this.calcFieldsSource = new CalculatedFieldsSource(this.report.calculatedFields, this.report.dataSource, this.dataSourceHelper);
        const chartValueBindingAvailableSources = ko.observableArray(this._getChartAvailableSources(this.dataSourceHelper, this.report.dataSource(), this.parameters));
        const subscription = this.report.dataSource.subscribe((newVal) => {
            chartValueBindingAvailableSources(this._getChartAvailableSources(this.dataSourceHelper, newVal, this.parameters));
        });
        this._disposables.push({
            dispose: () => {
                chartValueBindingAvailableSources([]);
                subscription.dispose();
            }
        });
        const dataSourceItemsExtender = new DataSourceItemsExtender(this.dataSourceHelper.usedDataSources, (nameCandidate, dataSourceInfo) => {
            const component = this.report.components().filter(x => x.data === dataSourceInfo.data)[0];
            component.name(nameCandidate);
        });
        const chartFieldListExtender = new ChartFieldListExtender();
        this.state = () => {
            const extensions = this.report && this.report.extensions.peek() || [];
            if (extensions.length > 0) {
                return {
                    reportExtensions: this.report.extensions().map((item) => {
                        return {
                            'Key': item.key(),
                            'Value': item.value()
                        };
                    })
                };
            }
            return data.state;
        };
        this.fieldListItemsExtenders = [
            this.parameters,
            dataSourceItemsExtender,
            this.calcFieldsSource,
            chartFieldListExtender
        ];
        this.controlsHelper = new DesignControlsHelper(this.report, selection);
        this.stylesHelper = new StylesHelper(this.report, this.controlsHelper);
        this.report.stylesHelper(this.stylesHelper);
        const wrappedCallback = this.fieldListDataSourceHelper.wrapFieldsCallback(designerCallbacks.fieldLists, this.state);
        this.fieldListProvider = new FieldListProvider(wrappedCallback, this.fieldListDataSourceHelper.fieldListDataSources, this.fieldListItemsExtenders);
        this.reportItemsProvider = new ReportItemsProvider(this.controlsHelper, this.fieldListProvider);
        this.dataBindingsProvider = new FieldListProvider(wrappedCallback, this.fieldListDataSourceHelper.fieldListDataSources, [this.parameters, this.calcFieldsSource, chartFieldListExtender]);
        this.report.dataBindingsProvider(this.dataBindingsProvider);
        this.chartValueBindingProvider = new FieldListProvider(wrappedCallback, chartValueBindingAvailableSources, [this.parameters, this.calcFieldsSource]);
        this.displayNameProvider = new DisplayNameProvider(this.fieldListProvider, this.fieldListDataSourceHelper.dataSourceHelper(), this.report.dataSource);
        this.expressionDisplayNameProvider = new DisplayNameProvider(this.reportItemsProvider, this.fieldListDataSourceHelper.dataSourceHelper(), this.report.dataSource);
        this.reportErrorProvider = new DesignerErrorProvider(this.report);
        this.runtimeErrorProvider = new RuntimeErrorProvider();
        this._disposables.push(this.report);
        this._disposables.push(this.surface);
        this._disposables.push(this.displayNameProvider);
        this._disposables.push(this.expressionDisplayNameProvider);
        this._disposables.push(this.dataSourceHelper);
        this._disposables.push(this.fieldListDataSourceHelper);
        this._disposables.push(this.calcFieldsSource);
        this._disposables.push(this.watermarks);
        this._disposables.push(this.parameters);
        this._disposables.push(this.controlsHelper);
        this._disposables.push(this.reportItemsProvider);
        this._disposables.push(this.stylesHelper);
        this._disposables.push(this.reportErrorProvider);
    }
    _getChartAvailableSources(dsHelper, dataSource, parameters) {
        return [
            dataSource && dsHelper.findDataSourceInfo(dataSource),
            { ref: 'Parameters', name: 'Parameters', specifics: 'parameters', data: parameters },
            { ref: 'none', name: 'none', specifics: 'none', data: null }
        ].filter(x => x);
    }
    getInfo() {
        return [{ propertyName: 'report', modelName: '@Report' }];
    }
    isModelReady() {
        return this.report && this.report.isModelReady();
    }
    dispose() {
        super.dispose();
        this.report = null;
        this.url = null;
        this.surface = null;
        this.watermarks = null;
        this.parameters = null;
        this.dataSourceHelper = null;
        this.fieldListDataSourceHelper = null;
        this.calcFieldsSource = null;
        this.fieldListItemsExtenders = [];
        this.controlsHelper = null;
        this.fieldListProvider = null;
        this.reportItemsProvider = null;
        this.dataBindingsProvider = null;
        this.chartValueBindingProvider = null;
        this.displayNameProvider = null;
        this.expressionDisplayNameProvider = null;
        this.stylesHelper = null;
        this.dataBindingsProvider = null;
    }
}