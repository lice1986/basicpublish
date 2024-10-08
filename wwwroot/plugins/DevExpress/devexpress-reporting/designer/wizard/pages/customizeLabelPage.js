﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\customizeLabelPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { findFirstItemMatchesCondition } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import { subscribeProperties } from '@devexpress/analytics-core/analytics-wizard-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { CONVERSION_COEEFICIENT } from '../internal/_labelWizardUtils';
import { ReportWizardPageId } from '../pageId';
import { GraphicsUnit } from '../reportWizardState';
import { getFormattedValueInUnits } from '../_utils';
import { initializeLabelReportWizardPromise, labelReportWizardPromise } from './_selectLabelTypePage';
export class CustomizeLabelPage extends WizardPageBase {
    constructor() {
        super();
        this._id = ko.observable(0);
        this._labelWidth = ko.observable(0);
        this._labelHeight = ko.observable(0);
        this._horizontalPitch = ko.observable(0);
        this._verticalPitch = ko.observable(0);
        this._topMargin = ko.observable(0);
        this._leftMargin = ko.observable(0);
        this._rightMargin = ko.observable(0);
        this._bottomMargin = ko.observable(0);
        this._rowsCount = ko.pureComputed(() => {
            return this._getLabelsCount(this._pageHeight(), this._verticalPitch(), this._labelHeight(), this._topMargin() + this._bottomMargin());
        });
        this._columnsCount = ko.pureComputed(() => {
            return this._getLabelsCount(this._pageWidth(), this._horizontalPitch(), this._labelWidth(), this._leftMargin() + this._rightMargin());
        });
        this._pageHeight = ko.pureComputed(() => {
            if (this._selectedPaperSize().unit === this.unit())
                return this._selectedPaperSize().height;
            if (this._selectedPaperSize().unit === GraphicsUnit.Millimeter)
                return this._selectedPaperSize().height * CustomizeLabelPage._CONVERSION_COEEFICIENT;
            return this._selectedPaperSize().height / CustomizeLabelPage._CONVERSION_COEEFICIENT;
        });
        this._pageWidth = ko.pureComputed(() => {
            if (this._selectedPaperSize().unit === this.unit())
                return this._selectedPaperSize().width;
            if (this._selectedPaperSize().unit === GraphicsUnit.Millimeter)
                return this._selectedPaperSize().width * CustomizeLabelPage._CONVERSION_COEEFICIENT;
            return this._selectedPaperSize().width / CustomizeLabelPage._CONVERSION_COEEFICIENT;
        });
        this.paperKinds = () => { return (this._labelData.paperKinds); };
        this._selectedPaperSize = ko.observable({ 'id': 1, 'enumId': 9, 'name': 'A4', 'width': 210.0, 'height': 297.0, 'unit': 6, 'isRollPaper': false });
        this.unit = ko.observable();
        this._stepUnit = ko.pureComputed(() => this.unit() === GraphicsUnit.Inch ? 0.01 : 0.1);
        this.labelWidth = ko.computed({
            read: () => parseFloat(this._getFormattedValueInUnits(this._labelWidth())),
            write: (value) => this._labelWidth(value)
        });
        this.labelHeight = ko.computed({
            read: () => parseFloat(this._getFormattedValueInUnits(this._labelHeight())),
            write: (value) => this._labelHeight(value)
        });
        this.horizontalPitch = ko.computed({
            read: () => parseFloat(this._getFormattedValueInUnits(this._horizontalPitch())),
            write: (value) => this._horizontalPitch(value)
        });
        this.verticalPitch = ko.computed({
            read: () => parseFloat(this._getFormattedValueInUnits(this._verticalPitch())),
            write: (value) => this._verticalPitch(value)
        });
        this.topMargin = ko.computed({
            read: () => parseFloat(this._getFormattedValueInUnits(this._topMargin())),
            write: (value) => this._topMargin(value)
        });
        this.leftMargin = ko.computed({
            read: () => parseFloat(this._getFormattedValueInUnits(this._leftMargin())),
            write: (value) => this._leftMargin(value)
        });
        this.rightMargin = ko.computed({
            read: () => parseFloat(this._getFormattedValueInUnits(this._rightMargin())),
            write: (value) => this._rightMargin(value)
        });
        this.bottomMargin = ko.computed({
            read: () => parseFloat(this._getFormattedValueInUnits(this._bottomMargin())),
            write: (value) => this._bottomMargin(value)
        });
        this._labelsCountText = ko.pureComputed(() => {
            return this._rowsCount() * this._columnsCount() + ' ' + getLocalization('labels on the page', 'ASPxReportsStringId.ReportDesigner_Wizard_CustomizeLabelPage_LabelCountText') + ', ' + this._columnsCount() + ' x ' + this._rowsCount();
        });
        this._pageSizeText = ko.pureComputed(() => {
            return CustomizeLabelPage._getPageSizeText(this._pageWidth(), this._pageHeight(), this.unit());
        });
        this._units = [
            { text: getLocalization('Inch', 'AnalyticsCoreStringId.Wizard_Inch'), value: GraphicsUnit.Inch },
            { text: getLocalization('Millimeter', 'AnalyticsCoreStringId.Wizard_Millimeter'), value: GraphicsUnit.Millimeter }
        ];
        this._disposables.push(this._rowsCount, this._columnsCount, this._pageHeight, this._pageWidth);
        this._disposables.push(this.unit.subscribe(newUnit => {
            if (newUnit === GraphicsUnit.Inch) {
                this._labelWidth(this._labelWidth() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
                this._labelHeight(this._labelHeight() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
                this._horizontalPitch(this._horizontalPitch() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
                this._verticalPitch(this._verticalPitch() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
                this._topMargin(this._topMargin() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
                this._leftMargin(this._leftMargin() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
                this._rightMargin(this._rightMargin() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
                this._bottomMargin(this._bottomMargin() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
            }
            else if (newUnit === GraphicsUnit.Millimeter) {
                this._labelWidth(this._labelWidth() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
                this._labelHeight(this._labelHeight() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
                this._horizontalPitch(this._horizontalPitch() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
                this._verticalPitch(this._verticalPitch() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
                this._topMargin(this._topMargin() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
                this._leftMargin(this._leftMargin() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
                this._rightMargin(this._rightMargin() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
                this._bottomMargin(this._bottomMargin() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
            }
        }));
        this._disposables.push(...subscribeProperties([
            this._labelWidth,
            this._labelHeight,
            this._horizontalPitch,
            this._verticalPitch,
            this._topMargin,
            this._leftMargin,
            this._rightMargin,
            this._bottomMargin,
            this.unit,
            this._selectedPaperSize
        ], () => this._onChange()));
        this._disposables.push(this._stepUnit, this.labelWidth, this.labelHeight, this.horizontalPitch, this.verticalPitch, this.topMargin, this.leftMargin, this.rightMargin, this.bottomMargin, this._labelsCountText, this._pageSizeText);
    }
    _getFormattedValueInUnits(value) {
        return getFormattedValueInUnits(value, this.unit());
    }
    _getLabelsCount(paperDimentionInLabelUnit, labelPitch, labelWidth, margin) {
        return Math.floor((paperDimentionInLabelUnit - margin + (labelPitch - labelWidth)) / labelPitch);
    }
    canNext() {
        return false;
    }
    canFinish() {
        return true;
    }
    initialize(labelDetails) {
        initializeLabelReportWizardPromise();
        return labelReportWizardPromise.done((labelData) => {
            this._labelData = labelData;
            this._id(labelDetails.id);
            this.unit(labelDetails.unit);
            this._selectedPaperSize(findFirstItemMatchesCondition(this.paperKinds(), item => item.id === labelDetails.paperKindId));
            this._labelWidth(labelDetails.width);
            this._labelHeight(labelDetails.height);
            this._horizontalPitch(labelDetails.hPitch);
            this._verticalPitch(labelDetails.vPitch);
            this._topMargin(labelDetails.topMargin);
            this._leftMargin(labelDetails.leftMargin);
            this._rightMargin(labelDetails.rightMargin);
            this._bottomMargin(labelDetails.bottomMargin);
        });
    }
    commit() {
        const labelDetails = {};
        labelDetails.width = this._labelWidth();
        labelDetails.height = this._labelHeight();
        labelDetails.hPitch = this._horizontalPitch();
        labelDetails.vPitch = this._verticalPitch();
        labelDetails.topMargin = this._topMargin();
        labelDetails.leftMargin = this._leftMargin();
        labelDetails.rightMargin = this._rightMargin();
        labelDetails.bottomMargin = this._bottomMargin();
        labelDetails.unit = this.unit();
        labelDetails.paperKindId = this._selectedPaperSize().id;
        return $.Deferred().resolve(labelDetails).promise();
    }
    static _getPageSizeText(width, height, unit) {
        return getFormattedValueInUnits(width, unit) + ' x ' + getFormattedValueInUnits(height, unit) + (unit === GraphicsUnit.Inch ? ' in' : ' mm');
    }
}
CustomizeLabelPage._CONVERSION_COEEFICIENT = CONVERSION_COEEFICIENT;
export function _registerCustomizeLabelPage(factory) {
    factory.registerMetadata(ReportWizardPageId.CustomizeLabelPage, {
        setState: (labelDetails, state) => {
            state.width = labelDetails.width;
            state.height = labelDetails.height;
            state.hPitch = labelDetails.hPitch;
            state.vPitch = labelDetails.vPitch;
            state.topMargin = labelDetails.topMargin;
            state.leftMargin = labelDetails.leftMargin;
            state.rightMargin = labelDetails.rightMargin;
            state.bottomMargin = labelDetails.bottomMargin;
            state.unit = labelDetails.unit;
            state.paperKindId = labelDetails.paperKindId;
        },
        getState: (state) => {
            return state.labelDetails;
        },
        resetState: (state, defaultState) => {
            state.width = defaultState.width;
            state.height = defaultState.height;
            state.hPitch = defaultState.hPitch;
            state.vPitch = defaultState.vPitch;
            state.topMargin = defaultState.topMargin;
            state.leftMargin = defaultState.leftMargin;
            state.rightMargin = defaultState.rightMargin;
            state.bottomMargin = defaultState.bottomMargin;
            state.unit = defaultState.unit;
            state.paperKindId = defaultState.paperKindId;
        },
        create: () => {
            return new CustomizeLabelPage();
        },
        template: 'dxrd-page-customizeLabel',
        description: getLocalization("Choose the page size and customize the label's parameters.", 'ASPxReportsStringId.ReportDesigner_Wizard_LabelPageSize')
    });
}
