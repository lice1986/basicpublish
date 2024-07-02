﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\controlsFactory.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { ControlsFactory as AnalyticControlsFactory } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ExpressionWrapper } from '../../dataObjects/expressions/_expressionWrapper';
import { DataBindingMode } from '../../utils/settings';
import { createPopularBindingInfo } from './_metaUtils';
export class ControlsFactory extends AnalyticControlsFactory {
    constructor(fieldListProvider = ko.observable(null)) {
        super();
        this.fieldListProvider = fieldListProvider;
        this._beforePrintPrintOnPage = ['BeforePrint', 'PrintOnPage'];
        this._beforePrint = ['BeforePrint'];
        this._expressionWrapper = new ExpressionWrapper(DataBindingMode(), this.fieldListProvider);
    }
    dispose() {
        this._expressionWrapper.dispose();
        this._expressionWrapper = null;
        Object.keys(this.controlsMap).forEach((x) => {
            delete this.controlsMap[x];
        });
        this.fieldListProvider = null;
    }
    _registerCommonExpressions(controlType) {
        this.setExpressionBinding(controlType, 'Text', this._beforePrintPrintOnPage);
        this.setExpressionBinding(controlType, 'AccessibleDescription', this._beforePrintPrintOnPage);
        this.setExpressionBinding(controlType, 'Visible', this._beforePrintPrintOnPage);
        this.setExpressionBinding(controlType, 'NavigateUrl', this._beforePrint);
        this.setExpressionBinding(controlType, 'Bookmark', this._beforePrint);
        this.setExpressionBinding(controlType, 'Tag', this._beforePrint);
        this.setExpressionBinding(controlType, 'LeftF', this._beforePrint, 'Layout');
        this.setExpressionBinding(controlType, 'TopF', this._beforePrint, 'Layout');
        this.setExpressionBinding(controlType, 'WidthF', this._beforePrint, 'Layout');
        this.setExpressionBinding(controlType, 'HeightF', this._beforePrint, 'Layout');
        this.setExpressionBinding(controlType, 'StyleName', this._beforePrint);
        this.setExpressionBinding(controlType, 'ForeColor', this._beforePrintPrintOnPage, 'Appearance');
        this.setExpressionBinding(controlType, 'BackColor', this._beforePrintPrintOnPage, 'Appearance');
        this.setExpressionBinding(controlType, 'BorderColor', this._beforePrintPrintOnPage, 'Appearance');
        this.setExpressionBinding(controlType, 'Borders', this._beforePrintPrintOnPage, 'Appearance');
        this.setExpressionBinding(controlType, 'BorderWidth', this._beforePrintPrintOnPage, 'Appearance');
        this.setExpressionBinding(controlType, 'BorderDashStyle', this._beforePrintPrintOnPage, 'Appearance');
        this.setExpressionBinding(controlType, 'TextAlignment', this._beforePrintPrintOnPage, 'Appearance');
        this.setExpressionBinding(controlType, 'Font', this._beforePrintPrintOnPage, 'Appearance', ['Name', 'Size', 'Italic', 'Strikeout', 'Bold', 'Underline']);
        this.setExpressionBinding(controlType, 'Padding', this._beforePrintPrintOnPage, 'Appearance', ['All', 'Left', 'Right', 'Top', 'Bottom']);
    }
    _registerExtensions(controlType, metadata) {
        const parentType = (metadata && metadata.parentType || controlType);
        this._registerCommonExpressions(controlType);
        switch (parentType) {
            case 'XRCheckBox':
                this.setExpressionBinding(controlType, 'CheckBoxState', this._beforePrintPrintOnPage);
                break;
            case 'XRPictureBox':
                this.setExpressionBinding(controlType, 'ImageSource', this._beforePrintPrintOnPage);
                this.setExpressionBinding(controlType, 'ImageUrl', this._beforePrintPrintOnPage);
                this.hideExpressionBindings(controlType, 'Font', 'ForeColor', 'Text', 'TextAlignment');
                break;
            case 'XRBarCode':
                this.setExpressionBinding(controlType, 'BinaryData', this._beforePrint);
                break;
            case 'XRGauge':
                this.hideExpressionBindings(controlType, 'Text', 'TextAlignment', 'Font', 'ForeColor');
                this.setExpressionBinding(controlType, 'TargetValue', this._beforePrint);
                this.setExpressionBinding(controlType, 'ActualValue', this._beforePrint);
                this.setExpressionBinding(controlType, 'Minimum', this._beforePrint);
                this.setExpressionBinding(controlType, 'Maximum', this._beforePrint);
                break;
            case 'XRCharacterComb':
                this.hideExpressionBindings(controlType, 'Padding');
                break;
            case 'TopMarginBand':
            case 'BottomMarginBand':
            case 'DetailReportBand':
            case 'DetailBand':
            case 'SubBand':
            case 'GroupHeaderBand':
            case 'GroupFooterBand':
            case 'PageHeaderBand':
            case 'ReportHeaderBand':
            case 'ReportFooterBand':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Bookmark', 'NavigateUrl', 'Text', 'WidthF', 'LeftF', 'TopF');
                this.setExpressionBinding(controlType, 'Visible', this._beforePrint);
                break;
            case 'XRSubreport':
                this.setExpressionBinding(controlType, 'Visible', this._beforePrint);
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Bookmark', 'NavigateUrl', 'Padding', 'StyleName');
                this.hideExpressionBindings(controlType, 'BackColor', 'BorderColor', 'BorderWidth', 'BorderDashStyle', 'Borders', 'Font', 'ForeColor', 'TextAlignment', 'Tag', 'Text', 'NavigateUrl');
                break;
            case 'XRCrossBandBox':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Bookmark', 'NavigateUrl', 'Text', 'BackColor', 'Font', 'Padding', 'TextAlignment');
                this.hideExpressionBindings(controlType, 'ForeColor', 'Visible');
                break;
            case 'XRCrossBandLine':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Bookmark', 'NavigateUrl', 'Text', 'BackColor', 'Font', 'Padding', 'TextAlignment');
                this.hideExpressionBindings(controlType, 'BorderColor', 'BorderDashStyle', 'Borders', 'BorderWidth', 'Visible');
                break;
            case 'XRCrossTab':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Bookmark', 'BackColor', 'BorderColor', 'Borders', 'BorderDashStyle', 'BorderWidth', 'Font', 'ForeColor', 'Padding', 'TextAlignment', 'Text', 'NavigateUrl', 'Visible', 'StyleName');
                this.setExpressionBinding(controlType, 'Visible', this._beforePrint);
                break;
            case 'XRCrossTabCell':
                this.hideExpressionBindings(controlType, 'Visible', 'HeightF', 'WidthF', 'LeftF', 'TopF', 'StyleName');
                this.setExpressionBinding(controlType, 'ColumnVisible', this._beforePrint);
                this.setExpressionBinding(controlType, 'RowVisible', this._beforePrint);
                break;
            case 'XRChart':
                this.hideExpressionBindings(controlType, 'Text', 'Font', 'ForeColor', 'TextAlignment');
                this.setExpressionBinding(controlType, 'PaletteName', this._beforePrint);
                this.setExpressionBinding(controlType, 'StyleName', this._beforePrint);
                break;
            case 'XRLine':
                this.hideExpressionBindings(controlType, 'Font', 'Text', 'TextAlignment', 'NavigateUrl', 'Bookmark');
                break;
            case 'XRPivotGrid':
                this.setExpressionBinding(controlType, 'Visible', this._beforePrint);
                this.hideExpressionBindings(controlType, 'BackColor', 'BorderColor', 'Borders', 'BorderDashStyle', 'BorderWidth', 'Font', 'ForeColor', 'Padding', 'TextAlignment', 'Text', 'NavigateUrl', 'StyleName');
                break;
            case 'XRPageBreak':
                this.setExpressionBinding(controlType, 'Visible', this._beforePrint);
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'BackColor', 'BorderColor', 'Borders', 'BorderDashStyle', 'BorderWidth', 'Font', 'ForeColor', 'Padding', 'TextAlignment', 'Tag', 'Text', 'NavigateUrl', 'LeftF', 'WidthF', 'HeightF', 'Bookmark', 'StyleName');
                break;
            case 'XRPageInfo':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Text');
                break;
            case 'XRPanel':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Font', 'ForeColor', 'Text', 'TextAlignment');
                break;
            case 'XRRichText':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Text');
                this.setExpressionBinding(controlType, 'Rtf', this._beforePrint);
                this.setExpressionBinding(controlType, 'Html', this._beforePrint);
                break;
            case 'XRShape':
                this.hideExpressionBindings(controlType, 'Font', 'TextAlignment', 'Text');
                this.setExpressionBinding(controlType, 'FillColor', this._beforePrint, 'Appearance');
                break;
            case 'XRSparkline':
                this.hideExpressionBindings(controlType, 'Text', 'Font', 'TextAlignment', 'ForeColor');
                break;
            case 'XRTableOfContents':
                this.hideExpressionBindings(controlType, 'NavigateUrl', 'Text', 'TextAlignment', 'Bookmark', 'Font', 'LeftF', 'WidthF');
                break;
            case 'XRTableRow':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'LeftF', 'TopF', 'WidthF', 'Text', 'NavigateUrl', 'Bookmark');
                break;
            case 'XRTableCell':
                this.hideExpressionBindings(controlType, 'LeftF', 'TopF', 'HeightF', 'WidthF');
                break;
            case 'XRTable':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Text', 'NavigateUrl');
                break;
            case 'XRZipCode':
                this.hideExpressionBindings(controlType, 'Font', 'TextAlignment');
                break;
            case 'XRPdfContent':
                this.setExpressionBinding(controlType, 'Visible', this._beforePrint);
                this.setExpressionBinding(controlType, 'Source', this._beforePrint, 'Data');
                this.setExpressionBinding(controlType, 'SourceUrl', this._beforePrint, 'Data');
                this.setExpressionBinding(controlType, 'PageRange', this._beforePrint, 'Data');
                this.hideExpressionBindings(controlType, 'BackColor', 'BorderColor', 'Borders', 'BorderDashStyle', 'BorderWidth', 'Font', 'ForeColor', 'Padding', 'TextAlignment', 'Tag', 'Text', 'NavigateUrl', 'LeftF', 'WidthF', 'HeightF');
                break;
            case 'DevExpress.XtraReports.UI.XtraReport':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'StyleName', 'Text', 'NavigateUrl');
                this.setExpressionBinding(controlType, 'Bookmark', this._beforePrint);
                this.setExpressionBinding(controlType, 'WatermarkId', this._beforePrint, 'Appearance');
                this.hideExpressionBindings(controlType, 'LeftF', 'TopF', 'WidthF', 'HeightF');
                break;
            case 'XRPdfSignature':
                this.hideExpressionBindings(controlType, 'AccessibleDescription');
                break;
        }
    }
    registerControl(typeName, metadata) {
        super.registerControl(typeName, metadata);
        this._registerExtensions(typeName, metadata);
    }
    _createExpressionObject(typeName, expressions, path, summaryRunning) {
        return this._expressionWrapper.createExpressionsObject(typeName, expressions, path, summaryRunning);
    }
    setExpressionBinding(controlType, propertyName, events, group, objectProperties) {
        this._expressionWrapper.setPropertyDescription(controlType, propertyName, events, objectProperties, group);
    }
    setPropertyDescription(controlType, propertyName, events, group, objectProperties) {
        return this.setExpressionBinding(controlType, propertyName, events, group, objectProperties);
    }
    setDisplayNameForExpression(propertyName, localizationId, displayName) {
        this._expressionWrapper.setLocalizationId(propertyName, localizationId, displayName);
    }
    hideExpressionBindings(type, ...propertyNames) {
        this._expressionWrapper.hidePropertyDescriptions(type, ...propertyNames);
    }
    hidePropertyDescriptions(type, ...propertyNames) {
        return this.hideExpressionBindings(type, ...propertyNames);
    }
    inheritControl(parentType, extendedOptions) {
        const parentInfo = this.getControlInfo(parentType);
        const copyParentSerializationsInfo = extend(true, [], parentInfo.info);
        const copyExtendedOptions = extend(true, {}, extendedOptions);
        copyExtendedOptions.info = [].concat(copyParentSerializationsInfo, extendedOptions.info || []);
        copyExtendedOptions.popularProperties = [].concat(parentInfo.popularProperties || [], extendedOptions.popularProperties || []);
        return extend(true, {}, parentInfo, copyExtendedOptions, {
            parentType: parentType,
        });
    }
    createPopularBindingInfo(options, isExpression = true) {
        return createPopularBindingInfo(options, isExpression);
    }
}