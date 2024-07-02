﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_template.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { extend, formatDate, formatUnicorn } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates, FilterStringOptions } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { CommonValueDataMembers } from '../../internal/data/_commonValue';
import { legendName } from '../../internal/meta/_axis';
import { bubbleSeriesPointsSortingKeys, colorDataMember, commonSeriesPointsSortingKeys, dateTimeSumaryOptions, numericSummaryOptions, qualitativeSummaryOptions, rangeSeriesPointsSortingKeys, stockSeriesPointsSortingKeys, topNOptions, viewBindableSerializationInfo } from '../../internal/meta/_chart';
import { defaultBooleanValues, filterString, filterStringEditable, scaleTypeValues, showInLegend, visible } from '../../internal/meta/_common';
import { chartDataSource, editorTemplates as chartEditorTemplates } from '../../internal/_editorTemplates';
import { _getUnconvertiblePoint } from '../../internal/_utils';
import { seriesLabel } from './_label';
import { mapTypes, onlyNumericArgumentSupportedSeriesViewTypes, viewTypesDataMembers } from './_templateOptions';
import { SeriesViewViewModel, view } from './_view';
const _isBubble = (viewType) => viewType === 'BubbleSeriesView';
const _isRange = (viewType) => viewType === 'PolarRangeAreaSeriesView' ||
    viewType === 'RadarRangeAreaSeriesView' ||
    viewType === 'RangeArea3DSeriesView' ||
    viewType === 'RangeAreaSeriesView' ||
    viewType === 'OverlappedGanttSeriesView' ||
    viewType === 'SideBySideGanttSeriesView' ||
    viewType === 'OverlappedRangeBarSeriesView' ||
    viewType === 'SideBySideRangeBarSeriesView';
const _isStock = (viewType) => viewType === 'StockSeriesView' ||
    viewType === 'CandleStickSeriesView';
export var ScaleType;
(function (ScaleType) {
    ScaleType[ScaleType["Qualitative"] = 0] = "Qualitative";
    ScaleType[ScaleType["Numerical"] = 1] = "Numerical";
    ScaleType[ScaleType["DateTime"] = 2] = "DateTime";
    ScaleType[ScaleType["Auto"] = 3] = "Auto";
})(ScaleType || (ScaleType = {}));
export const ScaleTypeMap = {
    'Qualitative': ScaleType.Qualitative,
    'Numerical': ScaleType.Numerical,
    'DateTime': ScaleType.DateTime,
    'Auto': ScaleType.Auto
};
function _fixSeriesTemplateModel(model) {
    delete model['@SeriesDataMember'];
    return model;
}
export class SeriesTemplateViewModel extends SerializableModel {
    constructor(model, serializer, info) {
        super(_fixSeriesTemplateModel(model), serializer, info);
        this._actualArgumentScaleType = ko.observable(ScaleType.Numerical);
        if (this.valueDataMembers) {
            ko.unwrap(this.valueDataMembers).dispose();
        }
        this.viewType = ko.observable(this.view().typeName);
        this._adjustArgumentScaleType();
        const newInfo = extend(true, [], info);
        const seriesPointsSortingKeyMeta = newInfo.filter(x => x.propertyName === seriesPointsSortingKey.propertyName)[0];
        Object.defineProperty(seriesPointsSortingKeyMeta, 'valuesArray', {
            get: () => this._getCurrentSeriesPointsSortingKeys(this.viewType()),
            configurable: true
        });
        this.viewType.subscribe((newType) => {
            const newSerializer = serializer || new ModelSerializer();
            this.view(SeriesViewViewModel.from({ '@TypeNameSerializable': newType }, newSerializer)());
            this._adjustArgumentScaleType();
            this._updateSeriesPointsSortingKey(seriesPointsSortingKeyMeta);
        });
        this.getInfo = () => newInfo;
        this._disposables.push(this.view.subscribe((newView) => {
            if (this.viewType() !== newView.typeName) {
                this.viewType(newView.typeName);
            }
            this.updateByView(newView);
        }));
        this.valueDataMembers = ko.observable(new (viewTypesDataMembers[this.view().typeName] || CommonValueDataMembers)(model['@ValueDataMembersSerializable'] || '', this.valueScaleType));
        this._disposables.push(this['indicators'] = ko.computed(() => {
            return this.view() && this.view()['indicators'] && this.view()['indicators']();
        }));
        this._disposables.push(this['titles'] = ko.computed(() => {
            return this.view() && this.view()['titles'] && this.view()['titles']();
        }));
        this._disposables.push(this._actualArgumentScaleType.subscribe((newVal) => {
            switch (newVal) {
                case ScaleType.DateTime:
                    this.qualitativeSummaryOptions.resetAllProperties();
                    this.numericSummaryOptions.resetAllProperties();
                    break;
                case ScaleType.Numerical:
                    this.qualitativeSummaryOptions.resetAllProperties();
                    this.dateTimeSummaryOptions.resetAllProperties();
                    break;
                case ScaleType.Qualitative:
                    this.numericSummaryOptions.resetAllProperties();
                    this.dateTimeSummaryOptions.resetAllProperties();
                    break;
            }
        }));
        this.updateByView(this.view());
        [this.qualitativeSummaryOptions, this.numericSummaryOptions, this.dateTimeSummaryOptions].forEach(options => {
            options['getPath'] = (propertyName) => {
                return this['getPath'] && this['getPath']('summaryFunction') || '';
            };
        });
        this.viewBindable = {
            model: this.view,
            type: this.viewType
        };
        this.filterString = new FilterStringOptions(this._filterString, ko.pureComputed(() => { return this['getPath'] && this['getPath']('argumentDataMember') || ''; }));
    }
    static from(model, serializer) {
        return new SeriesTemplateViewModel(model || {}, serializer, seriesTemplateSerializationsInfo);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, seriesTemplateSerializationsInfo, refs);
    }
    updateByView(view) {
        if (this.label && this.label.typeNameSerializable) {
            this.label.typeNameSerializable(mapTypes[view.typeName]);
        }
        this.valueDataMembers.peek().dispose();
        this.valueDataMembers(new (viewTypesDataMembers[view.typeName] || CommonValueDataMembers)(this.valueDataMembers.peek().toString(), this.valueScaleType));
    }
    preInitProperties(model) {
        delete model['DataFilters'];
    }
    getChildComponents() {
        return [
            { component: ko.unwrap(this.view), path: 'View' },
        ];
    }
    getExpressionProperties() {
        return ['LegendTextPattern'];
    }
    _isOnlyNumericArgumentScaleTypeSupported() {
        return onlyNumericArgumentSupportedSeriesViewTypes.indexOf(this.viewType()) > -1;
    }
    _getCurrentSeriesPointsSortingKeys(viewType) {
        if (_isBubble(viewType))
            return bubbleSeriesPointsSortingKeys;
        if (_isRange(viewType))
            return rangeSeriesPointsSortingKeys;
        if (_isStock(viewType))
            return stockSeriesPointsSortingKeys;
        return commonSeriesPointsSortingKeys;
    }
    _adjustArgumentScaleType() {
        if (this._isOnlyNumericArgumentScaleTypeSupported())
            this.argumentScaleType('Numerical');
    }
    _updateSeriesPointsSortingKey(seriesPointsSortingKeyMeta) {
        const value = this[seriesPointsSortingKeyMeta.propertyName];
        if (!!value() && !seriesPointsSortingKeyMeta.valuesArray.some(x => x.value === value())) {
            value(seriesPointsSortingKeyMeta.valuesArray[0].value);
        }
    }
    _isDataMemberPropertyDisabled(name) {
        if (SeriesTemplateViewModel.dataMemberProperies.concat(['valueScaleType', 'argumentScaleType']).some(x => x === name)) {
            return !ko.unwrap(this.dataSource);
        }
        return false;
    }
    _isPropertyDisabled(name) {
        if (name === 'argumentScaleType') {
            return this._isOnlyNumericArgumentScaleTypeSupported();
        }
        return false;
    }
    getPath(propertyName) {
        const dataSourceInfo = ko.unwrap(this.dataSource);
        if (dataSourceInfo) {
            const helper = dataSourceInfo.dsHelperProvider && dataSourceInfo.dsHelperProvider();
            return helper && helper.getDataSourcePath(dataSourceInfo);
        }
    }
    isPropertyVisible(propertyName) {
        switch (propertyName) {
            case 'qualitativeSummaryOptions':
                return this._actualArgumentScaleType() === ScaleType.Qualitative;
            case 'numericSummaryOptions':
                return this._actualArgumentScaleType() === ScaleType.Numerical;
            case 'dateTimeSummaryOptions':
                return this._actualArgumentScaleType() === ScaleType.DateTime;
            default:
                return true;
        }
    }
}
SeriesTemplateViewModel.dataMemberProperies = ['argumentDataMember', 'valueDataMembers'];
export const seriesPointsSorting = {
    propertyName: 'seriesPointsSorting', modelName: '@SeriesPointsSorting', displayName: 'Series Points Sorting', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.None' }, { value: 'Ascending', displayValue: 'Ascending', localizationId: 'DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending' }, { value: 'Descending', displayValue: 'Descending', localizationId: 'DevExpress.XtraReports.UI.XRColumnSortOrder.Descending' }],
    localizationId: 'DevExpress.XtraCharts.SeriesBase.SeriesPointsSorting'
}, seriesPointsSortingKey = {
    propertyName: 'seriesPointsSortingKey', modelName: '@SeriesPointsSortingKey', displayName: 'Series Points Sorting Key', editor: editorTemplates.getEditor('combobox'), valuesArray: commonSeriesPointsSortingKeys, localizationId: 'DevExpress.XtraCharts.SeriesBase.SeriesPointsSortingKey'
}, legendTextPattern = { propertyName: 'legendTextPattern', modelName: '@LegendTextPattern', displayName: 'Legend Text Pattern', localizable: true, editor: editorTemplates.getEditor('text'), localizationId: 'DevExpress.XtraCharts.SeriesBase.LegendTextPattern' }, _argumentScaleTypeValidatorOptions = {
    _seriesViewModel: null,
    onInitialized: ({ model }) => { _argumentScaleTypeValidatorOptions._seriesViewModel = model._model; },
    validationRules: [{
            type: 'custom',
            reevaluate: true,
            validationCallback: (params) => {
                let model = _argumentScaleTypeValidatorOptions._seriesViewModel.peek();
                if ('points' in model && model instanceof SeriesTemplateViewModel) {
                    model = model;
                    const unconvertiblePoint = _getUnconvertiblePoint('argumentSerializable', model.argumentScaleType.peek(), params.value, model.points.peek());
                    const stringFormat = getLocalization("The type of the '{0}' point isn't compatible with the {1} scale.", 'ChartStringId.MsgIncompatiblePointType');
                    let argumentValue = unconvertiblePoint && unconvertiblePoint.argumentSerializable();
                    if (argumentValue && (argumentValue instanceof Date))
                        argumentValue = formatDate(argumentValue);
                    params.rule.message = formatUnicorn(stringFormat, (argumentValue !== null || argumentValue !== void 0) ? argumentValue : '', params.value);
                    return !unconvertiblePoint;
                }
                return true;
            }
        }]
}, argumentScaleType = {
    propertyName: 'argumentScaleType', modelName: '@ArgumentScaleType', displayName: 'Argument Scale Type', defaultVal: 'Auto', editor: editorTemplates.getEditor('combobox'), valuesArray: scaleTypeValues, localizationId: 'DevExpress.XtraCharts.SeriesBase.ArgumentScaleType', validatorOptions: _argumentScaleTypeValidatorOptions
}, valueScaleType = {
    propertyName: 'valueScaleType', modelName: '@ValueScaleType', displayName: 'Value Scale Type', defaultVal: 'Numerical', editor: editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'Numerical', displayValue: 'Numerical', localizationId: 'DevExpress.XtraCharts.ScaleType.Numerical' },
        { value: 'DateTime', displayValue: 'DateTime', localizationId: 'DevExpress.XtraTreeList.Data.UnboundColumnType.DateTime' }
    ],
    localizationId: 'DevExpress.XtraCharts.SeriesBase.ValueScaleType'
}, labelsVisibility = { propertyName: 'labelsVisibility', modelName: '@LabelsVisibility', displayName: 'Labels Visibility', defaultVal: 'Default', editor: editorTemplates.getEditor('combobox'), valuesArray: defaultBooleanValues, localizationId: 'DevExpress.XtraCharts.SeriesBase.LabelsVisibility' }, argumentDataMember = { propertyName: 'argumentDataMember', modelName: '@ArgumentDataMember', displayName: 'Argument Data Member', defaultVal: '', editor: chartEditorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraCharts.SeriesBase.ArgumentDataMember' }, valueDataMembersSerializable = { propertyName: 'valueDataMembers', modelName: '@ValueDataMembersSerializable', displayName: 'Value Data Members', defaultVal: '', editor: editorTemplates.getEditor('objecteditor'), from: CommonValueDataMembers.from, toJsonObject: CommonValueDataMembers.toJson, localizationId: 'DevExpress.XtraCharts.SeriesBase.ValueDataMembers' };
export const seriesTemplateSerializationsInfo = [
    viewBindableSerializationInfo,
    { propertyName: 'titles', displayName: 'Titles', localizationId: 'DevExpress.XtraReports.UI.XRChart.Titles' },
    { propertyName: 'indicators', displayName: 'Indicators', localizationId: 'DevExpress.XtraReports.UI.XRChart.Indicators' },
    view, argumentDataMember, valueDataMembersSerializable, colorDataMember, argumentScaleType, valueScaleType, filterString,
    filterStringEditable, seriesPointsSorting, seriesPointsSortingKey, showInLegend, legendName, legendTextPattern, labelsVisibility,
    qualitativeSummaryOptions, numericSummaryOptions, dateTimeSumaryOptions,
    seriesLabel, topNOptions, visible, chartDataSource
];
export const seriesTemplate = { propertyName: 'seriesTemplate', modelName: 'SeriesTemplate', displayName: 'Series Template', localizationId: 'DevExpress.XtraReports.UI.XRChart.SeriesTemplate', info: seriesTemplateSerializationsInfo, from: SeriesTemplateViewModel.from, toJsonObject: SeriesTemplateViewModel.toJson, editor: editorTemplates.getEditor('objecteditor') };