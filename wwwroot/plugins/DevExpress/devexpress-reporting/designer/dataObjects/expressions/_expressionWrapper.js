﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\expressions\_expressionWrapper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { availableFonts } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { expressionBindingSerializationsInfo } from '../../controls/metadata/properties/expressionBinding';
import { borderDashStyleValues, textAlignmentValues } from '../../controls/metadata/properties/metadata';
import { DataBindingMode } from '../../internal/_dataBindingMode';
import { reportFunctionDisplay } from '../../widgets/customFunctions';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
import { WrappedExpressionOptions } from './_wrappedExpressionOptions';
const colors = ['Transparent', 'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenrod', 'DarkGray', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DodgerBlue', 'Firebrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'Goldenrod', 'Gray', 'Green', 'GreenYellow', 'Honeydew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenrodYellow', 'LightGreen', 'LightGray', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquamarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenrod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];
export class ExpressionWrapper extends Disposable {
    constructor(_bindingMode = DataBindingMode.Expressions, _fieldListProvider) {
        super();
        this._bindingMode = _bindingMode;
        this._fieldListProvider = _fieldListProvider;
        this._valuesDictionary = {
            ForeColor: colors,
            BackColor: colors,
            FillColor: colors,
            BorderColor: colors,
            Borders: ['Left', 'Right', 'Top', 'Bottom', 'All'],
            BorderDashStyle: borderDashStyleValues,
            TextAlignment: textAlignmentValues,
            Name: Object.keys(ko.unwrap(availableFonts))
        };
        this._displayNameDictionary = {
            AccessibleDescription: { localizationId: 'DevExpress.XtraReports.UI.XRControl.AccessibleDescription', displayName: 'Accessible Description' },
            Text: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Text', displayName: 'Text' },
            Visible: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Visible', displayName: 'Visible' },
            RowVisible: { localizationId: 'DevExpress.XtraReports.UI.CrossTab.XRCrossTabCell.RowVisible', displayName: 'Row Visible' },
            ColumnVisible: { localizationId: 'DevExpress.XtraReports.UI.CrossTab.XRCrossTabCell.ColumnVisible', displayName: 'Column Visible' },
            NavigateUrl: { localizationId: 'DevExpress.XtraReports.UI.XRControl.NavigateUrl', displayName: 'Navigate Url' },
            Bookmark: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Bookmark', displayName: 'Bookmark' },
            Tag: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Tag', displayName: 'Tag' },
            LeftF: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Left', displayName: 'Left' },
            TopF: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Top', displayName: 'Top' },
            WidthF: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Width', displayName: 'Width' },
            HeightF: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Height', displayName: 'Height' },
            StyleName: { localizationId: 'DevExpress.XtraReports.UI.XRControl.StyleName', displayName: 'Style Name' },
            ForeColor: { localizationId: 'DevExpress.XtraReports.UI.XRControl.ForeColor', displayName: 'Foreground Color' },
            BackColor: { localizationId: 'DevExpress.XtraReports.UI.XRControl.BackColor', displayName: 'Background Color' },
            BorderColor: { localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderColor', displayName: 'Border Color' },
            Borders: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Borders', displayName: 'Borders' },
            BorderWidth: { localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderWidth', displayName: 'Border Width' },
            BorderDashStyle: { localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderDashStyle', displayName: 'Border Dash Style' },
            TextAlignment: { localizationId: 'DevExpress.XtraReports.UI.XRControl.TextAlignment', displayName: 'Text Alignment' },
            Font: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Font', displayName: 'Font' },
            Padding: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Padding', displayName: 'Padding' },
            Appearance: { localizationId: 'ReportStringId.CatAppearance', displayName: 'Appearance' },
            Layout: { localizationId: 'ReportStringId.CatLayout', displayName: 'Layout' },
            Name: { localizationId: 'AnalyticsCoreStringId.FormatFontName', displayName: 'Name' },
            Size: { localizationId: 'AnalyticsCoreStringId.Font.Size', displayName: 'Size' },
            Italic: { localizationId: 'System.Drawing.Font.Italic', displayName: 'Italic' },
            Strikeout: { localizationId: 'System.Drawing.Font.Strikeout', displayName: 'Strikeout' },
            Bold: { localizationId: 'System.Drawing.Font.Bold', displayName: 'Bold' },
            Underline: { localizationId: 'System.Drawing.Font.Underline', displayName: 'Underline' },
            Left: { localizationId: 'AnalyticsCoreStringId.PaddingInfo.Left', displayName: 'Left' },
            Right: { localizationId: 'AnalyticsCoreStringId.PaddingInfo.Right', displayName: 'Right' },
            Top: { localizationId: 'AnalyticsCoreStringId.PaddingInfo.Top', displayName: 'Top' },
            Bottom: { localizationId: 'AnalyticsCoreStringId.PaddingInfo.Bottom', displayName: 'Bottom' },
            CheckBoxState: { localizationId: 'DevExpress.XtraReports.UI.XRCheckBox.CheckBoxState', displayName: 'Check Box State' },
            Image: { localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.Image', displayName: 'Image' },
            ImageSource: { localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.ImageSource', displayName: 'Image Source' },
            ImageUrl: { localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.ImageUrl', displayName: 'Image Url' },
            BinaryData: { localizationId: 'DevExpress.XtraReports.UI.XRBarCode.BinaryData', displayName: 'Binary Data' },
            TargetValue: { localizationId: 'DevExpress.XtraReports.UI.XRGauge.TargetValue', displayName: 'Target Value' },
            ActualValue: { localizationId: 'DevExpress.XtraReports.UI.XRGauge.ActualValue', displayName: 'Actual Value' },
            PrintOnPage: { localizationId: 'DevExpress.XtraReports.UI.XRControlEvents.OnPrintOnPage', displayName: 'PrintOnPage' },
            BeforePrint: { localizationId: 'DevExpress.XtraReports.UI.XRControlEvents.OnBeforePrint', displayName: 'BeforePrint' },
            Minimum: { localizationId: 'DevExpress.XtraReports.UI.XRGauge.Minimum', displayName: 'Minimum' },
            Maximum: { localizationId: 'DevExpress.XtraReports.UI.XRGauge.Maximum', displayName: 'Maximum' },
            FillColor: { localizationId: 'DevExpress.XtraReports.UI.XRShape.FillColor', displayName: 'Fill Color' },
            Diagram: { localizationId: 'DevExpress.XtraReports.UI.XRChart.Diagram', displayName: 'Diagram' },
            AxisX: { localizationId: 'DevExpress.XtraCharts.XYDiagram.AxisX', displayName: 'X-Axis' },
            AxisY: { localizationId: 'DevExpress.XtraCharts.XYDiagram.AxisY', displayName: 'Y-Axis' },
            Title: { localizationId: 'DevExpress.XtraCharts.Axis2D.Title', displayName: 'Title' },
            EmptyChartText: { localizationId: 'DevExpress.XtraCharts.EmptyChartText', displayName: 'Empty Chart Text' },
            SmallChartText: { localizationId: 'DevExpress.XtraCharts.SmallChartText', displayName: 'Small Chart Text' },
            PaletteName: { localizationId: 'DevExpress.XtraReports.UI.XRChart.PaletteName', displayName: 'Palette Name' },
            DefaultPane: { localizationId: 'ChartStringId.DefaultPaneName', displayName: 'Default Pane' },
            Panes: { localizationId: 'ChartDesignerStringIDs.TreeAdditionalPanelCollection', displayName: 'Additional Panes' },
            Legend: { localizationId: 'DevExpress.XtraCharts.Legend', displayName: 'Legend' },
            Legends: { localizationId: 'DevExpress.XtraReports.UI.XRChart.Legends', displayName: 'Legends' },
            LegendText: { localizationId: 'DevExpress.XtraCharts.Strip.LegendText', displayName: 'Legend Text' },
            ConstantLines: { localizationId: 'DevExpress.XtraCharts.Axis2D.ConstantLines', displayName: 'Constant Lines' },
            Strips: { localizationId: 'DevExpress.XtraCharts.Axis2D.Strips', displayName: 'Strips' },
            AxisLabelText: { localizationId: 'DevExpress.XtraCharts.Strip.AxisLabelText', displayName: 'Axis Label Text' },
            SeriesTemplate: { localizationId: 'DevExpress.XtraReports.UI.XRChart.SeriesTemplate', displayName: 'Series Template' },
            Series: { localizationId: 'DevExpress.XtraReports.UI.XRChart.Series', displayName: 'Series' },
            MinValue: { localizationId: 'DevExpress.XtraCharts.AxisRange.MinValue', displayName: 'Min Value' },
            MaxValue: { localizationId: 'DevExpress.XtraCharts.AxisRange.MaxValue', displayName: 'Max Value' },
            MinLimit: { localizationId: 'DevExpress.XtraCharts.Strip.MinLimit', displayName: 'Min Limit' },
            MaxLimit: { localizationId: 'DevExpress.XtraCharts.Strip.MaxLimit', displayName: 'Max Limit' },
            LegendTextPattern: { localizationId: 'DevExpress.XtraCharts.SeriesBase.LegendTextPattern', displayName: 'Legend Text Pattern' },
            AxisValue: { localizationId: 'DevExpress.XtraCharts.AxisCoordinate.AxisValue', displayName: 'Axis Value' },
            WatermarkId: { localizationId: 'DevExpress.XtraReports.UI.XtraReport.WatermarkId', displayName: 'Watermark Id' }
        };
        this._expressionsInfo = {};
        this._expressionsSerializationInfoCache = {};
    }
    dispose() {
        this._expressionsInfo = null;
        this._expressionsSerializationInfoCache = null;
        this._fieldListProvider = null;
    }
    static createExpression(propertyName, eventName, expression) {
        return {
            getInfo: () => expressionBindingSerializationsInfo,
            eventName: ko.observable(eventName),
            expression: ko.observable(expression),
            propertyName: ko.observable(propertyName)
        };
    }
    _createPropertyByName(propertyName, prefix, displaName) {
        const result = {
            propertyName: prefix ? [prefix, propertyName].join('.') : propertyName,
            modelName: propertyName,
            displayName: displaName || propertyName,
            editor: designerEditorTemplates.getEditor('reportexpressionComplex')
        };
        if (this._displayNameDictionary[propertyName]) {
            result.localizationId = this._displayNameDictionary[propertyName].localizationId;
            result.displayName = this._displayNameDictionary[propertyName].displayName;
        }
        if (this._valuesDictionary[propertyName]) {
            result.valuesArray = this._valuesDictionary[propertyName];
        }
        return result;
    }
    _updateCachedControlInfo(description, useEvents) {
        var _a;
        const displayPath = ((_a = description.displayPath) === null || _a === void 0 ? void 0 : _a.split('.')) || [];
        if (!useEvents) {
            if (description.events.indexOf('BeforePrint') !== -1)
                this._addControlInfoToCache(description.controlType, displayPath, description.group, description.propertyName, description.objectProperties);
        }
        else {
            description.events.forEach((eventName) => {
                displayPath.unshift(undefined);
                this._addControlInfoToCache(description.controlType, displayPath, eventName, description.group, description.propertyName, description.objectProperties);
            });
        }
    }
    _createInfo(rootInfo, displayPath, prefix, path) {
        let info = rootInfo;
        for (let i = 0; i < path.length; i++) {
            if (typeof (path[i]) !== 'string' && Array.isArray(path[i])) {
                info.push.apply(info, path[i].map(innerProperty => this._createPropertyByName(innerProperty, path[i - 1])));
            }
            else {
                const pathPart = path[i];
                const propertySplit = pathPart.split('.');
                const propertyName = propertySplit.pop();
                if (propertySplit.length > 0) {
                    path.splice(i, 1, ...propertySplit.concat([propertyName]));
                    return this._createInfo(rootInfo, displayPath, propertySplit.join('.'), path);
                }
                else {
                    let currentInfo = info.filter(x => x.propertyName === path[i] || x.propertyName === [prefix, path[i]].join('.'))[0];
                    const displaName = displayPath[i];
                    if (!currentInfo) {
                        const isComplexProperty = i !== path.length - 1;
                        currentInfo = this._createPropertyByName(path[i], isComplexProperty ? undefined : prefix, displaName);
                        if (isComplexProperty) {
                            currentInfo.editor = editorTemplates.getEditor('objecteditor');
                            currentInfo.info = [];
                        }
                        info.push(currentInfo);
                    }
                    else if (displaName && displaName !== propertyName) {
                        info.splice(info.indexOf(currentInfo), 1, Object.assign(Object.assign({}, currentInfo), { displayName: displaName }));
                    }
                    info = currentInfo.info;
                }
            }
        }
        return rootInfo;
    }
    _addControlInfoToCache(controlType, displayPath, ...params) {
        if (!this._expressionsSerializationInfoCache[controlType]) {
            this._expressionsSerializationInfoCache[controlType] = [];
        }
        const cache = this._expressionsSerializationInfoCache[controlType];
        const infos = this._createInfo(cache, displayPath, '', params.filter(x => !!x));
        cache.splice(0, cache.length, ...infos);
    }
    _initCachedSerializationInfo(controlType, useEvents = false) {
        const propertyNames = Object.keys(this._expressionsInfo[controlType]);
        propertyNames.forEach((propertyName) => {
            const propertyDescriptor = this._expressionsInfo[controlType][propertyName];
            this._updateCachedControlInfo(Object.assign(Object.assign({}, propertyDescriptor), { propertyName,
                controlType }), useEvents);
        });
    }
    _getPropertyDescriptors(controlType, expressionName) {
        const propertyNames = Object.keys(this._expressionsInfo[controlType]);
        if (!propertyNames.some(propertyName => propertyName === expressionName))
            return null;
        return this._expressionsInfo[controlType][expressionName];
    }
    _getExpressionFromArray(propertyName, eventName, expressions) {
        return expressions().filter(x => x.propertyName() === propertyName &&
            x.eventName() === eventName)[0];
    }
    _createExpressionMap(propertyName, eventName, expressions, subscriptions, path, summaryRunning) {
        const functions = !!summaryRunning && !!summaryRunning(propertyName)
            ? ko.computed(() => summaryRunning(propertyName)() ? this._summaryFunctions() : reportFunctionDisplay)
            : reportFunctionDisplay;
        const expressionOptions = new WrappedExpressionOptions({
            path: path || ko.observable(''),
            functions: functions
        }, {
            addExpression: (newVal) => {
                expressions.push(ExpressionWrapper.createExpression(propertyName, eventName, newVal));
            },
            removeExpression: (expression) => {
                expressions.remove(expression);
            }
        }, this._fieldListProvider, eventName);
        expressionOptions._disposables.push(functions);
        expressionOptions.expression(this._getExpressionFromArray(propertyName, eventName, expressions));
        return expressionOptions;
    }
    _summaryFunctions() {
        const createNewItemDelegate = (funcName, paramCount) => {
            return [{
                    paramCount: paramCount,
                    text: 'sum' + funcName + '()',
                    descriptionStringId: 'ReportStringId.ExpressionEditor_Description_Function_Summary' + funcName
                }];
        };
        const summaryCategory = {
            display: 'Summary',
            localizationId: 'ReportStringId.ExpressionEditor_ItemInfo_FunctionSummary',
            category: 'Summary',
            items: {}
        };
        ['Avg', 'Count', 'Sum', 'RunningSum', 'CarryoverSum', 'Percentage', 'Max', 'Min', 'Median', 'const', 'VarP', 'StdDev', 'StdDevP', 'DAvg', 'DCount', 'DSum', 'DVar', 'DVarP', 'DStdDev', 'DStdDevP', 'RecordNumber',
            { name: 'WAvg', paramCount: 2 }
        ].forEach(func => {
            if (typeof func === 'string') {
                summaryCategory.items[func] = createNewItemDelegate(func, 1);
            }
            else {
                summaryCategory.items[func.name] = createNewItemDelegate(func.name, func.paramCount);
            }
        });
        return reportFunctionDisplay
            .filter(cat => cat.category != 'Aggregate')
            .concat([summaryCategory]);
    }
    _mapExpressionsToObjectByEventName(object, eventName, expressions, subscriptions, path, summaryRunning) {
        const properties = object.getInfo();
        properties.forEach(info => {
            if (!ko.isObservable(object[info.propertyName])) {
                this._mapExpressionsToObjectByEventName(object[info.propertyName], eventName, expressions, subscriptions, path, summaryRunning);
            }
            else {
                object[info.propertyName] = this._createExpressionMap(info.propertyName, eventName, expressions, subscriptions, path, summaryRunning);
                object[info.propertyName].serializationInfo = info;
                subscriptions.push(object[info.propertyName]);
            }
        });
    }
    _allExpressions(object, condition) {
        let positive = true;
        const properties = object.getInfo();
        properties.forEach(info => {
            if (!positive)
                return;
            if (object[info.propertyName] instanceof Object && !(object[info.propertyName] instanceof WrappedExpressionOptions)) {
                positive = this._allExpressions(object[info.propertyName], condition);
            }
            else {
                positive = condition(object[info.propertyName]);
            }
        });
        return positive;
    }
    _isValidExpressions(object) {
        return this._allExpressions(object, (expr) => expr.isValid());
    }
    _isWarningExpressions(object) {
        return !this._allExpressions(object, (expr) => !expr.warningMessage());
    }
    _getExpressionByPropertyName(object, propertyNameToSearch) {
        if (!object)
            return;
        if (object[propertyNameToSearch]) {
            return object[propertyNameToSearch];
        }
        else {
            const properties = object.getInfo();
            const innerObjectPropertyNames = properties.filter(info => !(object[info.propertyName] instanceof WrappedExpressionOptions));
            for (let i = 0; i < innerObjectPropertyNames.length; i++) {
                const result = this._getExpressionByPropertyName(object[innerObjectPropertyNames[i].propertyName], propertyNameToSearch);
                if (result)
                    return result;
            }
        }
    }
    _mapExpressionsToObject(controlType, expressions, path, summaryRunning) {
        if (this._bindingMode === DataBindingMode.Bindings) {
            return null;
        }
        const useEvents = this._bindingMode === DataBindingMode.ExpressionsAdvanced;
        const subscriptions = [];
        if (!this._expressionsSerializationInfoCache[controlType]) {
            this._initCachedSerializationInfo(controlType, useEvents);
        }
        const stateObj = {
            getInfo: ko.observable(this._expressionsSerializationInfoCache[controlType]),
            getExpression: (propertyName, eventName) => {
                if (useEvents) {
                    return this._getExpressionByPropertyName(stateObj[eventName], propertyName);
                }
                else {
                    return this._getExpressionByPropertyName(stateObj, propertyName);
                }
            },
            getExpressionsTreeItems: (expressionName) => {
                const propertyDescriptor = this._getPropertyDescriptors(controlType, expressionName);
                if (!propertyDescriptor)
                    return null;
                const expressionTreeItems = [];
                const isComplexProperty = !!(propertyDescriptor.objectProperties || []).length;
                const generateExpressionItem = (currentExpressionName, parentExpressionName) => {
                    const expressionTreeItem = {
                        innerItems: null,
                        expressionName: currentExpressionName,
                    };
                    const expressionObjPropertyName = parentExpressionName ? [parentExpressionName, currentExpressionName].join('.') : currentExpressionName;
                    if (useEvents) {
                        propertyDescriptor.events.forEach((eventName) => {
                            const innerExpressionObj = stateObj.getExpression(expressionObjPropertyName, eventName);
                            if (!innerExpressionObj)
                                return;
                            const serializationInfo = innerExpressionObj['serializationInfo'];
                            expressionTreeItem.displayName = serializationInfo && serializationInfo.displayName;
                            expressionTreeItem.localizationId = serializationInfo && serializationInfo.localizationId;
                            expressionTreeItem.innerItems = expressionTreeItem.innerItems || [];
                            const eventInfo = this._displayNameDictionary[eventName];
                            expressionTreeItem.innerItems.push({
                                eventName: eventName,
                                displayName: eventInfo && eventInfo.displayName,
                                localizationId: eventInfo && eventInfo.localizationId,
                                expressionName: currentExpressionName,
                                expressionObj: innerExpressionObj
                            });
                        });
                    }
                    else {
                        const innerExpressionObj = stateObj.getExpression(expressionObjPropertyName);
                        if (!innerExpressionObj)
                            return;
                        expressionTreeItem.expressionObj = innerExpressionObj;
                        const serializationInfo = innerExpressionObj['serializationInfo'];
                        expressionTreeItem.displayName = serializationInfo.displayName;
                        expressionTreeItem.localizationId = serializationInfo.localizationId;
                    }
                    expressionTreeItems.push(expressionTreeItem);
                };
                if (isComplexProperty) {
                    (propertyDescriptor.objectProperties || []).forEach((innerExpresionName) => { generateExpressionItem(innerExpresionName, expressionName); });
                }
                else {
                    generateExpressionItem(expressionName);
                }
                return expressionTreeItems;
            },
            dispose: () => {
                subscriptions.forEach(x => x.dispose());
                subscriptions.splice(0);
            },
            validateExpression: () => {
                return this._isValidExpressions(stateObj);
            },
            hasWarning: () => {
                return this._isWarningExpressions(stateObj);
            },
            updateExpressionObjectProperties: (newExpressionProperties) => {
                stateObj.dispose();
                if (newExpressionProperties) {
                    newExpressionProperties === null || newExpressionProperties === void 0 ? void 0 : newExpressionProperties.forEach(description => this._updateCachedControlInfo(description, useEvents));
                }
                new ModelSerializer().deserialize(stateObj, {});
                if (useEvents) {
                    const properties = stateObj.getInfo();
                    properties.forEach(info => {
                        this._mapExpressionsToObjectByEventName(stateObj[info.propertyName], info.propertyName, expressions, subscriptions, path, summaryRunning);
                    });
                }
                else {
                    this._mapExpressionsToObjectByEventName(stateObj, 'BeforePrint', expressions, subscriptions, path, summaryRunning);
                }
                stateObj.getInfo(this._expressionsSerializationInfoCache[controlType]);
                subscriptions.push(expressions.subscribe((args) => {
                    args.forEach(arg => {
                        if (arg.status === 'deleted') {
                            stateObj.getExpression(arg.value.propertyName(), arg.value.eventName()).expression(null);
                        }
                        else if (arg.status === 'added') {
                            stateObj.getExpression(arg.value.propertyName(), arg.value.eventName()).expression(arg.value);
                        }
                    });
                }, null, 'arrayChange'));
            }
        };
        stateObj.updateExpressionObjectProperties();
        return { stateObj, subscriptions };
    }
    setPropertyDescription(controlType, propertyName, events, objectProperties, group) {
        if (!this._expressionsInfo[controlType])
            this._expressionsInfo[controlType] = {};
        this._expressionsInfo[controlType][propertyName] = {
            events: events,
            group: group,
            objectProperties: objectProperties
        };
    }
    hidePropertyDescriptions(controlType, ...propertyNames) {
        propertyNames.forEach(propertyName => {
            if (propertyName.indexOf('.') !== -1) {
                const propertyPath = propertyName.split('.');
                if (propertyPath.length > 2)
                    return;
                const expressionInfo = this._expressionsInfo[controlType][propertyPath[0]];
                if (!expressionInfo || !expressionInfo.objectProperties)
                    return;
                const index = expressionInfo.objectProperties.indexOf(propertyPath[1]);
                if (index === -1)
                    return;
                expressionInfo.objectProperties.splice(index, 1);
                if (expressionInfo.objectProperties.length === 0)
                    delete this._expressionsInfo[controlType][propertyPath[0]];
                return;
            }
            delete this._expressionsInfo[controlType][propertyName];
        });
    }
    createExpressionsObject(controlType, expressions, path, summaryRunning) {
        const result = this._mapExpressionsToObject(controlType, expressions, path, summaryRunning);
        if (!result)
            return;
        return result.stateObj;
    }
    setLocalizationId(propertyName, localizationId, displayName) {
        this._displayNameDictionary[propertyName] = {
            localizationId: localizationId,
            displayName: displayName || propertyName
        };
    }
    setValues(propertyName, values) {
        this._valuesDictionary[propertyName] = values;
    }
}