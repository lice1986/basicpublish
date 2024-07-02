﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\selectLabelTypePage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { findFirstItemMatchesCondition } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { ReportWizardPageId } from '../pageId';
import { GraphicsUnit } from '../reportWizardState';
import { getFormattedValueInUnits } from '../_utils';
import { initializeLabelReportWizardPromise, labelReportWizardPromise } from './_selectLabelTypePage';
export class SelectLabelTypePage extends WizardPageBase {
    constructor() {
        super();
        this._selectedPaperSize = ko.computed({
            read: () => {
                return findFirstItemMatchesCondition(this._labelData.paperKinds, item => item.id === this._selectedLabelDetails().paperKindId);
            },
            deferEvaluation: true
        });
        this._selectedLabelProduct = ko.observable();
        this._selectedLabelDetails = ko.observable();
        this._labelDetails = ko.observable();
        this._width = ko.pureComputed(() => getFormattedValueInUnits(this._selectedLabelDetails().width, this._selectedPaperSize().unit) + (this._selectedPaperSize().unit === GraphicsUnit.Inch ? ' in' : ' mm'));
        this._height = ko.pureComputed(() => getFormattedValueInUnits(this._selectedLabelDetails().height, this._selectedPaperSize().unit) + (this._selectedPaperSize().unit === GraphicsUnit.Inch ? ' in' : ' mm'));
        this._paperType = ko.pureComputed(() => this._selectedPaperSize().name);
        this._pageSizeText = ko.pureComputed(() => getFormattedValueInUnits(this._selectedPaperSize().width, this._selectedPaperSize().unit) + ' x ' + getFormattedValueInUnits(this._selectedPaperSize().height, this._selectedPaperSize().unit) + (this._selectedPaperSize().unit === GraphicsUnit.Inch ? ' in' : ' mm'));
        this._disposables.push(this._selectedLabelProduct.subscribe(newProductsType => {
            const labelDetails = this._labelData.labelDetails.filter(item => item.productId === newProductsType.id);
            this._selectedLabelDetails(labelDetails[0]);
            this._labelDetails({
                store: labelDetails,
                paginate: labelDetails.length > 200,
                pageSize: 100
            });
        }));
        this._disposables.push(this._selectedLabelDetails.subscribe(() => this._onChange()));
        this._disposables.push(this._selectedPaperSize, this._width, this._height, this._paperType, this._pageSizeText);
    }
    initialize(state) {
        initializeLabelReportWizardPromise();
        return labelReportWizardPromise.done((labelData) => {
            this._labelData = labelData;
            if (state.labelDetails) {
                if (!this._selectedLabelProduct() || this._selectedLabelProduct().id !== state.labelDetails.productId) {
                    this._selectedLabelProduct(findFirstItemMatchesCondition(this._labelData.labelProducts, item => item.id === state.labelDetails.productId));
                }
                this._selectedLabelDetails(findFirstItemMatchesCondition(this._labelData.labelDetails, item => item.id === state.labelDetails.id));
            }
            else {
                this._selectedLabelProduct(this._labelData.labelProducts[0]);
            }
        });
    }
    canNext() {
        return !!this._selectedLabelDetails();
    }
    canFinish() {
        return !!this._selectedLabelDetails();
    }
    commit() {
        const labelDetails = this._selectedLabelDetails() ? $.extend({}, this._selectedLabelDetails()) : null;
        return $.Deferred().resolve({ labelDetails: labelDetails }).promise();
    }
}
export function _registerSelectLabelTypePage(factory) {
    factory.registerMetadata(ReportWizardPageId.SelectLabelTypePage, {
        setState: (data, state) => {
            if (data && (!state.labelDetails || data.labelDetails.id !== state.labelDetails.id))
                state.labelDetails = data.labelDetails;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.labelDetails = defaultState.labelDetails;
        },
        create: () => {
            return new SelectLabelTypePage();
        },
        template: 'dxrd-page-selectPredefinedLabels',
        description: getLocalization('Select the label type.', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectLabelType')
    });
}