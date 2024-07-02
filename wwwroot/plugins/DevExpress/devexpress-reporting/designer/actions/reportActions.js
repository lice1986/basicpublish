﻿/**
* DevExpress HTML/JS Reporting (designer\actions\reportActions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { defaultCulture } from '../../common/defaultCulture';
import { BandViewModel } from '../bands/xrBand';
import { ReportViewModel } from '../controls/xrReport';
export class ReportActions extends Disposable {
    constructor(onComponentAdded, _buildingModel) {
        super();
        this._buildingModel = _buildingModel;
        this._contextModel = ko.observable();
        this._disposables.push(this._targetModel = ko.computed(() => {
            let model = this._contextModel();
            if (model) {
                if (model.parentModel() && model.parentModel().parentModel() && model.controlType === 'SubBand') {
                    model = model.parentModel().parentModel();
                }
                else if (model.parentModel() && model.controlType !== 'DevExpress.XtraReports.UI.XtraReport' && model.controlType !== 'DetailReportBand') {
                    model = model.parentModel();
                }
            }
            return model;
        }));
        const reportWizardVisibile = ko.observable(true);
        this._disposables.push(this._contextModel.subscribe(newValue => {
            reportWizardVisibile(newValue instanceof ReportViewModel);
        }));
        this.actions = [
            {
                text: 'Design in Report Wizard...',
                displayText: () => getLocalization('Design in Report Wizard...', 'ReportStringId.Verb_ReportWizard'),
                clickAction: () => { _buildingModel === null || _buildingModel === void 0 ? void 0 : _buildingModel._wizardRunner.run('DesignInReportWizard'); },
                disabled: ko.observable(false),
                visible: reportWizardVisibile,
                isContextMenuAction: true
            },
            {
                text: 'Top Margin',
                group: () => getLocalization('Insert Band', 'ReportStringId.Cmd_InsertBand'),
                displayText: () => getLocalization('Top Margin', 'ReportStringId.Cmd_TopMargin'),
                imageClassName: 'dxrd-image-actions-top_margin',
                imageTemplateName: 'dxrd-svg-actions-top_margin',
                disabled: this.createComputed(() => {
                    return !this._canAddBand('TopMarginBand');
                }),
                visible: true,
                clickAction: () => { this._addBand('TopMarginBand'); },
            }, {
                text: 'Report Header',
                group: () => getLocalization('Insert Band', 'ReportStringId.Cmd_InsertBand'),
                displayText: () => getLocalization('Report Header', 'ReportStringId.Cmd_ReportHeader'),
                imageClassName: 'dxrd-image-actions-report_header',
                imageTemplateName: 'dxrd-svg-actions-report_header',
                disabled: this.createComputed(() => {
                    return !this._canAddBand('ReportHeaderBand');
                }),
                visible: true,
                clickAction: () => { this._addBand('ReportHeaderBand'); },
            }, {
                text: 'Page Header',
                group: () => getLocalization('Insert Band', 'ReportStringId.Cmd_InsertBand'),
                displayText: () => getLocalization('Page Header', 'ReportStringId.Cmd_PageHeader'),
                imageClassName: 'dxrd-image-actions-page_header',
                imageTemplateName: 'dxrd-svg-actions-page_header',
                disabled: this.createComputed(() => {
                    return !this._canAddBand('PageHeaderBand');
                }),
                visible: true,
                clickAction: () => { this._addBand('PageHeaderBand'); },
            }, {
                text: 'Group Header',
                group: () => getLocalization('Insert Band', 'ReportStringId.Cmd_InsertBand'),
                displayText: () => getLocalization('Group Header', 'ReportStringId.Cmd_GroupHeader'),
                imageClassName: 'dxrd-image-actions-group_header',
                imageTemplateName: 'dxrd-svg-actions-group_header',
                disabled: this.createComputed(() => {
                    return !this._canAddBand('GroupHeaderBand');
                }),
                visible: true,
                clickAction: () => { this._addBand('GroupHeaderBand'); },
            }, {
                text: 'Detail',
                group: () => getLocalization('Insert Band', 'ReportStringId.Cmd_InsertBand'),
                displayText: () => getLocalization('Detail', 'ReportStringId.Cmd_Detail'),
                imageClassName: 'dxrd-image-actions-detail',
                imageTemplateName: 'dxrd-svg-actions-detail',
                disabled: this.createComputed(() => {
                    return !this._canAddBand('DetailBand');
                }),
                visible: true,
                clickAction: () => { this._addBand('DetailBand'); },
            }, {
                text: 'Detail Report',
                group: () => getLocalization('Insert Band', 'ReportStringId.Cmd_InsertBand'),
                displayText: () => getLocalization('Detail Report', 'ReportStringId.Cmd_DetailReport'),
                imageClassName: 'dxrd-image-actions-detail_report',
                imageTemplateName: 'dxrd-svg-actions-detail_report',
                disabled: this.createComputed(() => {
                    return !this._canAddBand('DetailReportBand');
                }),
                visible: true,
                clickAction: () => { this._addBand('DetailReportBand'); },
            }, {
                text: 'Group Footer',
                group: () => getLocalization('Insert Band', 'ReportStringId.Cmd_InsertBand'),
                displayText: () => getLocalization('Group Footer', 'ReportStringId.Cmd_GroupFooter'),
                imageClassName: 'dxrd-image-actions-group_footer',
                imageTemplateName: 'dxrd-svg-actions-group_footer',
                disabled: this.createComputed(() => {
                    return !this._canAddBand('GroupFooterBand');
                }),
                visible: true,
                clickAction: () => { this._addBand('GroupFooterBand'); },
            }, {
                text: 'Report Footer',
                group: () => getLocalization('Insert Band', 'ReportStringId.Cmd_InsertBand'),
                displayText: () => getLocalization('Report Footer', 'ReportStringId.Cmd_ReportFooter'),
                imageClassName: 'dxrd-image-actions-report_footer',
                imageTemplateName: 'dxrd-svg-actions-report_footer',
                disabled: this.createComputed(() => {
                    return !this._canAddBand('ReportFooterBand');
                }),
                visible: true,
                clickAction: () => { this._addBand('ReportFooterBand'); },
            }, {
                text: 'Page Footer',
                group: () => getLocalization('Insert Band', 'ReportStringId.Cmd_InsertBand'),
                displayText: () => getLocalization('Page Footer', 'ReportStringId.Cmd_PageFooter'),
                imageClassName: 'dxrd-image-actions-page_footer',
                imageTemplateName: 'dxrd-svg-actions-page_footer',
                disabled: this.createComputed(() => {
                    return !this._canAddBand('PageFooterBand');
                }),
                visible: true,
                clickAction: () => { this._addBand('PageFooterBand'); },
            }, {
                text: 'Bottom Margin',
                group: () => getLocalization('Insert Band', 'ReportStringId.Cmd_InsertBand'),
                displayText: () => getLocalization('Bottom Margin', 'ReportStringId.Cmd_BottomMargin'),
                imageClassName: 'dxrd-image-actions-bottom_margin',
                imageTemplateName: 'dxrd-svg-actions-bottom_margin',
                disabled: this.createComputed(() => {
                    return !this._canAddBand('BottomMarginBand');
                }),
                visible: true,
                clickAction: () => { this._addBand('BottomMarginBand'); },
            }, {
                text: 'Insert Sub-Band',
                group: () => getLocalization('Insert Band', 'ReportStringId.Cmd_InsertBand'),
                displayText: () => getLocalization('Insert Sub-Band', 'ReportStringId.Cmd_AddSubBand'),
                imageClassName: 'dxrd-image-actions-subband',
                imageTemplateName: 'dxrd-svg-actions-subband',
                disabled: this.createComputed(() => {
                    return !this._canAddBand('SubBand');
                }),
                visible: true,
                clickAction: () => { this._addBand('SubBand'); },
            }, {
                text: 'Vertical Header',
                group: () => getLocalization('Insert Vertical Band', 'ReportStringId.Cmd_InsertVerticalBand'),
                displayText: () => getLocalization('Vertical Header', 'ReportStringId.Cmd_VerticalHeader'),
                imageClassName: 'dxrd-image-actions-vertical_header',
                imageTemplateName: 'dxrd-svg-actions-vertical_header',
                disabled: this.createComputed(() => {
                    return !this._canAddBand('VerticalHeaderBand');
                }),
                visible: true,
                clickAction: () => { this._addBand('VerticalHeaderBand'); },
            }, {
                text: 'Vertical Detail',
                group: () => getLocalization('Insert Vertical Band', 'ReportStringId.Cmd_InsertVerticalBand'),
                displayText: () => getLocalization('Vertical Detail', 'ReportStringId.Cmd_VerticalDetail'),
                imageClassName: 'dxrd-image-actions-vertical_detail',
                imageTemplateName: 'dxrd-svg-actions-vertical_detail',
                disabled: this.createComputed(() => {
                    return !this._canAddBand('VerticalDetailBand');
                }),
                visible: true,
                clickAction: () => { this._addBand('VerticalDetailBand'); },
            }, {
                text: 'Vertical Total',
                group: () => getLocalization('Insert Vertical Band', 'ReportStringId.Cmd_InsertVerticalBand'),
                displayText: () => getLocalization('Vertical Total', 'ReportStringId.Cmd_VerticalTotal'),
                imageClassName: 'dxrd-image-actions-vertical_total',
                imageTemplateName: 'dxrd-svg-actions-vertical_total',
                disabled: this.createComputed(() => {
                    return !this._canAddBand('VerticalTotalBand');
                }),
                visible: true,
                clickAction: () => { this._addBand('VerticalTotalBand'); },
            }, {
                text: 'Insert Sub-Band',
                displayText: () => getLocalization('Insert Sub-Band', 'ReportStringId.Cmd_AddSubBand'),
                imageClassName: 'dxrd-image-actions-subband',
                imageTemplateName: 'dxrd-svg-actions-subband',
                disabled: this.createComputed(() => {
                    return !this._canAddBand('SubBand');
                }),
                visible: true,
                isContextMenuAction: true,
                clickAction: () => { this._addBand('SubBand'); },
            }
        ];
        this.onComponentAdded = (e) => { onComponentAdded && onComponentAdded(e); };
    }
    _canAddBand(bandType) {
        if (!this._targetModel()) {
            return false;
        }
        const report = this._targetModel().root;
        if (report && report.language && report.language() !== defaultCulture)
            return false;
        if (bandType === 'GroupHeaderBand' || bandType === 'GroupFooterBand' || bandType === 'DetailReportBand') {
            return true;
        }
        if (bandType === 'SubBand') {
            const model = (this._contextModel());
            return model !== null && !model.lockedInUserDesigner() && (model.controlType.indexOf('XtraReport') === -1 && ['DetailReportBand', 'TopMarginBand', 'BottomMarginBand', 'SubBand'].indexOf(model.controlType) === -1);
        }
        if (this._targetModel().controlType === 'DetailReportBand' && (bandType === 'TopMarginBand' || bandType === 'BottomMarginBand' || bandType === 'PageHeaderBand' || bandType === 'PageFooterBand')) {
            return false;
        }
        return this._targetModel()['bands']().filter((band) => band.controlType === bandType).length === 0;
    }
    _addBand(bandType) {
        if (this._canAddBand(bandType)) {
            let model = this._targetModel();
            if (bandType === 'SubBand') {
                model = this._contextModel();
            }
            const height = model.root['dpi']();
            const control = model.createChild({ '@ControlType': bandType, '@HeightF': height });
            this.onComponentAdded({ parent: model, model: control });
        }
    }
    createComputed(contion) {
        const computed = ko.computed(() => contion());
        this._disposables.push(computed);
        return computed;
    }
    getActions(context) {
        if (context instanceof ReportViewModel || context instanceof BandViewModel) {
            this._contextModel(context);
            return this.actions;
        }
        else {
            this._contextModel(null);
        }
        return [];
    }
}