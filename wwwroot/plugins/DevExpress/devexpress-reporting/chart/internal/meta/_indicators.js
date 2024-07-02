﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_indicators.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { argumentSerializable } from './_common';
const pointscount = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.AverageTrueRange.PointsCount', editor: editorTemplates.getEditor('numeric'), defaultVal: 14 };
const name = { propertyName: 'name', modelName: '@Name', displayName: 'Name', localizationId: 'DevExpress.XtraCharts.Indicator.Name', editor: editorTemplates.getEditor('text') };
const legendtext = { propertyName: 'legendText', modelName: '@LegendText', displayName: 'LegendText', localizable: true, localizationId: 'DevExpress.XtraCharts.Indicator.LegendText', editor: editorTemplates.getEditor('text') };
const color = { propertyName: 'color', modelName: '@Color', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.Indicator.Color', editor: editorTemplates.getEditor('customColorEditor') };
const visible = { propertyName: 'visible', modelName: '@Visible', displayName: 'Visible', localizationId: 'DevExpress.XtraCharts.Indicator.Visible', editor: editorTemplates.getEditor('bool'), defaultVal: true };
const checkedinlegend = { propertyName: 'checkedInLegend', modelName: '@CheckedInLegend', displayName: 'CheckedInLegend', localizationId: 'DevExpress.XtraCharts.Indicator.CheckedInLegend', editor: editorTemplates.getEditor('bool'), defaultVal: true };
const checkableinlegend = { propertyName: 'checkableInLegend', modelName: '@CheckableInLegend', displayName: 'CheckableInLegend', localizationId: 'DevExpress.XtraCharts.Indicator.CheckableInLegend', editor: editorTemplates.getEditor('bool'), defaultVal: true };
const showinlegend = { propertyName: 'showInLegend', modelName: '@ShowInLegend', displayName: 'ShowInLegend', localizationId: 'DevExpress.XtraCharts.Indicator.ShowInLegend', editor: editorTemplates.getEditor('bool'), defaultVal: false };
const crosshairenabled = {
    propertyName: 'crosshairEnabled', modelName: '@CrosshairEnabled', displayName: 'CrosshairEnabled', localizationId: 'DevExpress.XtraCharts.Indicator.CrosshairEnabled', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Default', valuesArray: [
        { displayValue: 'True', value: 'True' },
        { displayValue: 'False', value: 'False' },
        { displayValue: 'Default', value: 'Default' },
    ]
};
const crosshairlabelvisibility = {
    propertyName: 'crosshairLabelVisibility', modelName: '@CrosshairLabelVisibility', displayName: 'CrosshairLabelVisibility', localizationId: 'DevExpress.XtraCharts.Indicator.CrosshairLabelVisibility', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Default', valuesArray: [
        { displayValue: 'True', value: 'True' },
        { displayValue: 'False', value: 'False' },
        { displayValue: 'Default', value: 'Default' },
    ]
};
const crosshairlabelpattern = { propertyName: 'crosshairLabelPattern', modelName: '@CrosshairLabelPattern', displayName: 'CrosshairLabelPattern', localizationId: 'DevExpress.XtraCharts.Indicator.CrosshairLabelPattern', editor: editorTemplates.getEditor('text') };
const crosshaircontentshowmode = {
    propertyName: 'crosshairContentShowMode', modelName: '@CrosshairContentShowMode', displayName: 'CrosshairContentShowMode', localizationId: 'DevExpress.XtraCharts.Indicator.CrosshairContentShowMode', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Default', valuesArray: [
        { displayValue: 'Default', value: 'Default' },
        { displayValue: 'Label', value: 'Label' },
        { displayValue: 'Legend', value: 'Legend' },
    ]
};
const crosshairemptyvaluelegendtext = { propertyName: 'crosshairEmptyValueLegendText', modelName: '@CrosshairEmptyValueLegendText', displayName: 'CrosshairEmptyValueLegendText', localizationId: 'DevExpress.XtraCharts.Indicator.CrosshairEmptyValueLegendText', editor: editorTemplates.getEditor('text') };
const tag = { propertyName: 'tag', modelName: '@Tag', displayName: 'Tag', localizationId: 'DevExpress.XtraCharts.ChartElement.Tag', editor: editorTemplates.getEditor('objecteditor'), visible: false };
const averageTrueRange = [pointscount, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const pointscount1 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.BollingerBands.PointsCount', editor: editorTemplates.getEditor('numeric'), defaultVal: 20 };
const valuelevel = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.BollingerBands.ValueLevel', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Close', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
const bandscolor = { propertyName: 'bandsColor', modelName: '@BandsColor', displayName: 'BandsColor', localizationId: 'DevExpress.XtraCharts.BollingerBands.BandsColor', editor: editorTemplates.getEditor('customColorEditor') };
const standarddeviationmultiplier = { propertyName: 'standardDeviationMultiplier', modelName: '@StandardDeviationMultiplier', displayName: 'StandardDeviationMultiplier', localizationId: 'DevExpress.XtraCharts.BollingerBands.StandardDeviationMultiplier', editor: editorTemplates.getEditor('numeric'), defaultVal: 2 };
const bollingerBands = [pointscount1, valuelevel, bandscolor, standarddeviationmultiplier, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const pointscount2 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.ChaikinsVolatility.PointsCount', editor: editorTemplates.getEditor('numeric'), defaultVal: 10 };
const chaikinsVolatility = [pointscount2, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const pointscount3 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.CommodityChannelIndex.PointsCount', editor: editorTemplates.getEditor('numeric'), defaultVal: 14 };
const commodityChannelIndex = [pointscount3, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const negativeerrordatamember = { propertyName: 'negativeErrorDataMember', modelName: '@NegativeErrorDataMember', displayName: 'NegativeErrorDataMember', localizationId: 'DevExpress.XtraCharts.DataSourceBasedErrorBars.NegativeErrorDataMember', editor: editorTemplates.getEditor('text') };
const positiveerrordatamember = { propertyName: 'positiveErrorDataMember', modelName: '@PositiveErrorDataMember', displayName: 'PositiveErrorDataMember', localizationId: 'DevExpress.XtraCharts.DataSourceBasedErrorBars.PositiveErrorDataMember', editor: editorTemplates.getEditor('text') };
const endstyle = {
    propertyName: 'endStyle', modelName: '@EndStyle', displayName: 'EndStyle', localizationId: 'DevExpress.XtraCharts.ErrorBars.EndStyle', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Cap', valuesArray: [
        { displayValue: 'Cap', value: 'Cap' },
        { displayValue: 'NoCap', value: 'NoCap' },
    ]
};
const direction = {
    propertyName: 'direction', modelName: '@Direction', displayName: 'Direction', localizationId: 'DevExpress.XtraCharts.ErrorBars.Direction', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Both', valuesArray: [
        { displayValue: 'Both', value: 'Both' },
        { displayValue: 'Minus', value: 'Minus' },
        { displayValue: 'Plus', value: 'Plus' },
    ]
};
const dataSourceBasedErrorBars = [negativeerrordatamember, positiveerrordatamember, endstyle, direction, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const pointscount4 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.DetrendedPriceOscillator.PointsCount', editor: editorTemplates.getEditor('numeric'), defaultVal: 20 };
const valuelevel1 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.DetrendedPriceOscillator.ValueLevel', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Close', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
const detrendedPriceOscillator = [pointscount4, valuelevel1, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const kind = {
    propertyName: 'kind', modelName: '@Kind', displayName: 'Kind', localizationId: 'DevExpress.XtraCharts.MovingAverage.Kind', editor: editorTemplates.getEditor('combobox'), defaultVal: 'MovingAverage', valuesArray: [
        { displayValue: 'MovingAverage', value: 'MovingAverage' },
        { displayValue: 'Envelope', value: 'Envelope' },
        { displayValue: 'MovingAverageAndEnvelope', value: 'MovingAverageAndEnvelope' },
    ]
};
const envelopepercent = { propertyName: 'envelopePercent', modelName: '@EnvelopePercent', displayName: 'EnvelopePercent', localizationId: 'DevExpress.XtraCharts.MovingAverage.EnvelopePercent', editor: editorTemplates.getEditor('numeric'), defaultVal: 3 };
const envelopecolor = { propertyName: 'envelopeColor', modelName: '@EnvelopeColor', displayName: 'EnvelopeColor', localizationId: 'DevExpress.XtraCharts.MovingAverage.EnvelopeColor', editor: editorTemplates.getEditor('customColorEditor') };
const pointscount5 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.SubsetBasedIndicator.PointsCount', editor: editorTemplates.getEditor('numeric') };
const valuelevel2 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.SingleLevelIndicator.ValueLevel', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Value', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
const exponentialMovingAverage = [kind, envelopepercent, envelopecolor, pointscount5, valuelevel2, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const baselevelcolor = { propertyName: 'baseLevelColor', modelName: '@BaseLevelColor', displayName: 'BaseLevelColor', localizationId: 'DevExpress.XtraCharts.FibonacciIndicator.BaseLevelColor', editor: editorTemplates.getEditor('customColorEditor') };
const showlevel0 = { propertyName: 'showLevel0', modelName: '@ShowLevel0', displayName: 'ShowLevel0', localizationId: 'DevExpress.XtraCharts.FibonacciIndicator.ShowLevel0', editor: editorTemplates.getEditor('bool') };
const showlevel100 = { propertyName: 'showLevel100', modelName: '@ShowLevel100', displayName: 'ShowLevel100', localizationId: 'DevExpress.XtraCharts.FibonacciIndicator.ShowLevel100', editor: editorTemplates.getEditor('bool') };
const showlevel23_6 = { propertyName: 'showLevel23_6', modelName: '@ShowLevel23_6', displayName: 'ShowLevel23_6', localizationId: 'DevExpress.XtraCharts.FibonacciIndicator.ShowLevel23_6', editor: editorTemplates.getEditor('bool') };
const showlevel76_4 = { propertyName: 'showLevel76_4', modelName: '@ShowLevel76_4', displayName: 'ShowLevel76_4', localizationId: 'DevExpress.XtraCharts.FibonacciIndicator.ShowLevel76_4', editor: editorTemplates.getEditor('bool') };
const showadditionallevels = { propertyName: 'showAdditionalLevels', modelName: '@ShowAdditionalLevels', displayName: 'ShowAdditionalLevels', localizationId: 'DevExpress.XtraCharts.FibonacciIndicator.ShowAdditionalLevels', editor: editorTemplates.getEditor('bool') };
const kind1 = {
    propertyName: 'kind', modelName: '@Kind', displayName: 'Kind', localizationId: 'DevExpress.XtraCharts.FibonacciIndicator.Kind', editor: editorTemplates.getEditor('combobox'), defaultVal: 'FibonacciArcs', valuesArray: [
        { displayValue: 'FibonacciArcs', value: 'FibonacciArcs' },
        { displayValue: 'FibonacciFans', value: 'FibonacciFans' },
        { displayValue: 'FibonacciRetracement', value: 'FibonacciRetracement' },
    ]
};
const fibonacciIndicator = [baselevelcolor, showlevel0, showlevel100, showlevel23_6, showlevel76_4, showadditionallevels, kind1, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const negativeerror = { propertyName: 'negativeError', modelName: '@NegativeError', displayName: 'NegativeError', localizationId: 'DevExpress.XtraCharts.FixedValueErrorBars.NegativeError', editor: editorTemplates.getEditor('numeric'), defaultVal: 1 };
const positiveerror = { propertyName: 'positiveError', modelName: '@PositiveError', displayName: 'PositiveError', localizationId: 'DevExpress.XtraCharts.FixedValueErrorBars.PositiveError', editor: editorTemplates.getEditor('numeric'), defaultVal: 1 };
const fixedValueErrorBars = [negativeerror, positiveerror, endstyle, direction, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const movingaveragepointscount = { propertyName: 'movingAveragePointsCount', modelName: '@MovingAveragePointsCount', displayName: 'MovingAveragePointsCount', localizationId: 'DevExpress.XtraCharts.MassIndex.MovingAveragePointsCount', editor: editorTemplates.getEditor('numeric') };
const sumpointscount = { propertyName: 'sumPointsCount', modelName: '@SumPointsCount', displayName: 'SumPointsCount', localizationId: 'DevExpress.XtraCharts.MassIndex.SumPointsCount', editor: editorTemplates.getEditor('numeric'), defaultVal: 25 };
const massIndex = [movingaveragepointscount, sumpointscount, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const medianPrice = [name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const longperiod = { propertyName: 'longPeriod', modelName: '@LongPeriod', displayName: 'LongPeriod', localizationId: 'DevExpress.XtraCharts.MovingAverageConvergenceDivergence.LongPeriod', editor: editorTemplates.getEditor('numeric'), defaultVal: 26 };
const shortperiod = { propertyName: 'shortPeriod', modelName: '@ShortPeriod', displayName: 'ShortPeriod', localizationId: 'DevExpress.XtraCharts.MovingAverageConvergenceDivergence.ShortPeriod', editor: editorTemplates.getEditor('numeric'), defaultVal: 12 };
const signalsmoothingperiod = { propertyName: 'signalSmoothingPeriod', modelName: '@SignalSmoothingPeriod', displayName: 'SignalSmoothingPeriod', localizationId: 'DevExpress.XtraCharts.MovingAverageConvergenceDivergence.SignalSmoothingPeriod', editor: editorTemplates.getEditor('numeric'), defaultVal: 9 };
const signallinecolor = { propertyName: 'signalLineColor', modelName: '@SignalLineColor', displayName: 'SignalLineColor', localizationId: 'DevExpress.XtraCharts.MovingAverageConvergenceDivergence.SignalLineColor', editor: editorTemplates.getEditor('customColorEditor') };
const valuelevel3 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.MovingAverageConvergenceDivergence.ValueLevel', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Close', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
const movingAverageConvergenceDivergence = [longperiod, shortperiod, signalsmoothingperiod, signallinecolor, valuelevel3, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const percent = { propertyName: 'percent', modelName: '@Percent', displayName: 'Percent', localizationId: 'DevExpress.XtraCharts.PercentageErrorBars.Percent', editor: editorTemplates.getEditor('numeric'), defaultVal: 5 };
const percentageErrorBars = [percent, endstyle, direction, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const pointscount6 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.RateOfChange.PointsCount', editor: editorTemplates.getEditor('numeric'), defaultVal: 14 };
const valuelevel4 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.RateOfChange.ValueLevel', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Close', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
const rateOfChange = [pointscount6, valuelevel4, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const valuelevel5 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.SingleLevelIndicator.ValueLevel', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Value', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
const regressionLine = [valuelevel5, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const pointscount7 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.RelativeStrengthIndex.PointsCount', editor: editorTemplates.getEditor('numeric'), defaultVal: 14 };
const valuelevel6 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.RelativeStrengthIndex.ValueLevel', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Close', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
const relativeStrengthIndex = [pointscount7, valuelevel6, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const pointscount8 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.SubsetBasedIndicator.PointsCount', editor: editorTemplates.getEditor('numeric') };
const valuelevel7 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.SingleLevelIndicator.ValueLevel', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Value', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
const simpleMovingAverage = [kind, envelopepercent, envelopecolor, pointscount8, valuelevel7, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const pointscount9 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.StandardDeviation.PointsCount', editor: editorTemplates.getEditor('numeric'), defaultVal: 14 };
const valuelevel8 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.StandardDeviation.ValueLevel', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Close', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
const standardDeviation = [pointscount9, valuelevel8, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const multiplier = { propertyName: 'multiplier', modelName: '@Multiplier', displayName: 'Multiplier', localizationId: 'DevExpress.XtraCharts.StandardDeviationErrorBars.Multiplier', editor: editorTemplates.getEditor('numeric'), defaultVal: 1 };
const standardDeviationErrorBars = [multiplier, endstyle, direction, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const standardErrorBars = [endstyle, direction, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const extrapolatetoinfinity = { propertyName: 'extrapolateToInfinity', modelName: '@ExtrapolateToInfinity', displayName: 'ExtrapolateToInfinity', localizationId: 'DevExpress.XtraCharts.TrendLine.ExtrapolateToInfinity', editor: editorTemplates.getEditor('bool'), defaultVal: true };
const pointInfo = [valuelevel2, argumentSerializable];
const point1 = { propertyName: 'point1', modelName: 'Point1', displayName: 'Point 1', localizationId: 'DevExpress.XtraCharts.FinancialIndicator.Point1', info: pointInfo, editor: editorTemplates.getEditor('objecteditor'), defaultVal: {} };
const point2 = extend(true, {}, point1, { propertyName: 'point2', modelName: 'Point2', displayName: 'Point 2', localizationId: 'DevExpress.XtraCharts.FinancialIndicator.Point2' });
const trendLine = [extrapolatetoinfinity, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag, point1, point2];
const pointscount10 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.SubsetBasedIndicator.PointsCount', editor: editorTemplates.getEditor('numeric') };
const valuelevel9 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.SingleLevelIndicator.ValueLevel', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Value', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
const triangularMovingAverage = [kind, envelopepercent, envelopecolor, pointscount10, valuelevel9, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const pointscount11 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.SubsetBasedIndicator.PointsCount', editor: editorTemplates.getEditor('numeric') };
const valuelevel10 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.SingleLevelIndicator.ValueLevel', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Value', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
const tripleExponentialMovingAverageTema = [kind, envelopepercent, envelopecolor, pointscount11, valuelevel10, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const pointscount12 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.TripleExponentialMovingAverageTrix.PointsCount', editor: editorTemplates.getEditor('numeric'), defaultVal: 15 };
const valuelevel11 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.TripleExponentialMovingAverageTrix.ValueLevel', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Close', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
const tripleExponentialMovingAverageTrix = [pointscount12, valuelevel11, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const typicalPrice = [name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const weightedClose = [name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const pointscount13 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.SubsetBasedIndicator.PointsCount', editor: editorTemplates.getEditor('numeric') };
const valuelevel12 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.SingleLevelIndicator.ValueLevel', editor: editorTemplates.getEditor('combobox'), defaultVal: 'Value', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
const weightedMovingAverage = [kind, envelopepercent, envelopecolor, pointscount13, valuelevel12, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
const pointscount14 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.WilliamsR.PointsCount', editor: editorTemplates.getEditor('numeric'), defaultVal: 14 };
const williamsR = [pointscount14, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
export const indicatorMapper = {
    'AverageTrueRange': averageTrueRange,
    'BollingerBands': bollingerBands,
    'ChaikinsVolatility': chaikinsVolatility,
    'CommodityChannelIndex': commodityChannelIndex,
    'DataSourceBasedErrorBars': dataSourceBasedErrorBars,
    'DetrendedPriceOscillator': detrendedPriceOscillator,
    'ExponentialMovingAverage': exponentialMovingAverage,
    'FibonacciIndicator': fibonacciIndicator,
    'FixedValueErrorBars': fixedValueErrorBars,
    'MassIndex': massIndex,
    'MedianPrice': medianPrice,
    'MovingAverageConvergenceDivergence': movingAverageConvergenceDivergence,
    'PercentageErrorBars': percentageErrorBars,
    'RateOfChange': rateOfChange,
    'RegressionLine': regressionLine,
    'RelativeStrengthIndex': relativeStrengthIndex,
    'SimpleMovingAverage': simpleMovingAverage,
    'StandardDeviation': standardDeviation,
    'StandardDeviationErrorBars': standardDeviationErrorBars,
    'StandardErrorBars': standardErrorBars,
    'TrendLine': trendLine,
    'TriangularMovingAverage': triangularMovingAverage,
    'TripleExponentialMovingAverageTema': tripleExponentialMovingAverageTema,
    'TripleExponentialMovingAverageTrix': tripleExponentialMovingAverageTrix,
    'TypicalPrice': typicalPrice,
    'WeightedClose': weightedClose,
    'WeightedMovingAverage': weightedMovingAverage,
    'WilliamsR': williamsR,
};
