﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParametersViewModel.viewmodel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createViewModelGenerator } from '@devexpress/analytics-core/analytics-serializer-native';
import { getLocalization } from '@devexpress/analytics-core/analytics-internal-native';
export function createPreviewParametersViewModel(baseModel) {
    return createViewModelGenerator(baseModel)
        .generateProperty('headerText', getLocalization('Preview Parameters', 'ASPxReportsStringId.ReportDesigner_Preview_ParametersTitle'))
        .generateProperty('emptyText', getLocalization('The report does not contain any parameters.', 'ASPxReportsStringId.WebDocumentViewer_NoParameters'))
        .generateProperty('isEmpty', this.isEmpty)
        .generateProperty('resetButton', {
        text: getLocalization('Reset', 'ASPxReportsStringId.ParametersPanel_Reset'),
        onClick: (e) => this.restore()
    })
        .generateProperty('submitButton', {
        text: getLocalization('Submit', 'ASPxReportsStringId.ParametersPanel_Submit'),
        onClick: (params) => this.validateAndSubmit(params)
    })
        .generateProperty('parametersLoading', this.parametersLoading)
        .getViewModel();
}
export function updateViewModel() {
    const viewModel = this.getViewModel();
    viewModel.isEmpty = this.isEmpty;
    viewModel.parametersLoading = this.parametersLoading;
}
