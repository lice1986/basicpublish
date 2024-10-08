﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_exportHandler.viewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization, getParentContainer, StringId } from '@devexpress/analytics-core/analytics-internal-native';
import { createViewModelGenerator } from '@devexpress/analytics-core/analytics-serializer-native';
export function createExportHandlerViewModel(base) {
    const printingTextParts = getLocalization('If the operation fails, you can download the {0} and print it out from another application.', 'ASPxReportsStringId.WebDocumentViewer_Print_Popup_Text').split('{0}');
    return createViewModelGenerator(base)
        .generateProperty('popupOptions', createViewModelGenerator()
        .generateProperty('width', '515px')
        .generateProperty('height', 'auto')
        .generateProperty('title', this.getPopupTitle())
        .generateProperty('visible', this.popupVisible)
        .generateProperty('toolbarItems', [{
            toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                text: getLocalization('OK', StringId.DataAccessBtnOK), type: 'default', stylingMode: 'contained', onClick: () => {
                    this.popupVisible = false;
                }
            }
        }])
        .generateProperty('wrapperAttr', { class: 'dxrd-print-dialog dx-editors dx-widget' })
        .generateProperty('getPopupContainer', (element) => getParentContainer(element))
        .generateProperty('onHidden', () => this.clearExportTools())
        .getViewModel())
        .generateProperty('printingTexts', createViewModelGenerator()
        .generateProperty('link', getLocalization('document in PDF format', 'ASPxReportsStringId.WebDocumentViewer_Print_Popup_LinkText'))
        .generateProperty('caption', getLocalization('The browser sent the document to the printer.', 'ASPxReportsStringId.WebDocumentViewer_Print_Popup_Caption'))
        .generateProperty('postfix', printingTextParts[1])
        .generateProperty('prefix', printingTextParts[0])
        .getViewModel())
        .generateProperty('exportActionUri', this.exportActionUri)
        .generateProperty('exportFormData', this.exportFormData)
        .generateProperty('printingLinkCallback', (_, event) => {
        this.printingLinkCallback();
        event.preventDefault();
    })
        .getViewModel();
}
export function updateExportHandlerViewModel(args) {
    const viewModel = this.getViewModel();
    if (args.propertyName === 'popupVisible')
        viewModel.popupOptions.visible = this.popupVisible;
    if (args.propertyName === 'reportDisplayName')
        viewModel.popupOptions.title = this.getPopupTitle();
    if (args.propertyName === 'exportActionUri')
        viewModel.exportActionUri = this.exportActionUri;
    if (args.propertyName === 'exportFormData')
        viewModel.exportFormData = this.exportFormData;
}
