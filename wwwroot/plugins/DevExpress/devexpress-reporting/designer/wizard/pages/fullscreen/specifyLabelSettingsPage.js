﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifyLabelSettingsPage.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { FullscreenWizardPage } from '@devexpress/analytics-core/analytics-wizard';
import { WizardSectionPosition } from '@devexpress/analytics-core/analytics-wizard-internal';
import { FullscreenReportWizardPageId, FullscreenReportWizardSectionId } from '../../pageId';
import { _registerCustomizeLabelPage } from '../customizeLabelPage';
import { _registerSelectLabelTypePage } from '../selectLabelTypePage';
export class SpecifyLabelSettingsPage extends FullscreenWizardPage {
    constructor(_reportWizardOptions) {
        super();
        this._reportWizardOptions = _reportWizardOptions;
    }
    registerSections() {
        _registerSelectLabelTypePage(this._factory);
        _registerCustomizeLabelPage(this._factory);
        this._factory.getMetadata(FullscreenReportWizardSectionId.SelectLabelTypePage)['recreate'] = false;
        this._factory.getMetadata(FullscreenReportWizardSectionId.CustomizeLabelPage)['recreate'] = false;
        this._setSectionPosition(FullscreenReportWizardSectionId.SelectLabelTypePage, this._reportWizardOptions.rtl ? WizardSectionPosition.Right : WizardSectionPosition.Left);
        this._setSectionPosition(FullscreenReportWizardSectionId.CustomizeLabelPage, this._reportWizardOptions.rtl ? WizardSectionPosition.Left : WizardSectionPosition.Right);
    }
    canNext() {
        return false;
    }
    getNextSectionId(sectionId) {
        if (!sectionId) {
            return FullscreenReportWizardSectionId.SelectLabelTypePage;
        }
        else if (sectionId === FullscreenReportWizardSectionId.SelectLabelTypePage)
            return FullscreenReportWizardSectionId.CustomizeLabelPage;
    }
}
export function _registerSpecifyLabelSettingsPage(factory, reportWizardOptions) {
    factory.registerMetadata(FullscreenReportWizardPageId.SpecifyLabelSettingsPage, {
        setState: (data, state) => {
            if (data && (!state.labelDetails || data.labelDetails.id !== state.labelDetails.id))
                state.labelDetails = data.labelDetails;
            state.labelDetails.width = data.labelDetails.width;
            state.labelDetails.height = data.labelDetails.height;
            state.labelDetails.hPitch = data.labelDetails.hPitch;
            state.labelDetails.vPitch = data.labelDetails.vPitch;
            state.labelDetails.topMargin = data.labelDetails.topMargin;
            state.labelDetails.leftMargin = data.labelDetails.leftMargin;
            state.labelDetails.rightMargin = data.labelDetails.rightMargin;
            state.labelDetails.bottomMargin = data.labelDetails.bottomMargin;
            state.labelDetails.unit = data.labelDetails.unit;
            state.labelDetails.paperKindId = data.labelDetails.paperKindId;
        },
        getState: (state) => state,
        resetState: (state, defaultState) => {
            state.labelDetails = defaultState.labelDetails;
        },
        create: () => {
            return new SpecifyLabelSettingsPage(reportWizardOptions);
        },
        navigationPanelText: getLocalization('Specify Page Settings', 'ASPxReportsStringId.ReportDesigner_Wizard_SpecifyPageSettings'),
        template: 'dx-wizard-fullscreen-page',
        description: getLocalization("Choose the page size and customize the label's parameters.", 'ASPxReportsStringId.ReportDesigner_Wizard_LabelPageSize')
    });
}
