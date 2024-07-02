﻿/**
* DevExpress HTML/JS Reporting (viewer\constants.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export const ActionId = {
    Design: 'dxxrp-design',
    FirstPage: 'dxxrp-first-page',
    PrevPage: 'dxxrp-prev-page',
    Pagination: 'dxxrp-pagination',
    NextPage: 'dxxrp-next-page',
    LastPage: 'dxxrp-last-page',
    MultipageToggle: 'dxxrp-multipage-toggle',
    HighlightEditingFields: 'dxxrp-highlight-editing-fields',
    ZoomOut: 'dxxrp-zoom-out',
    ZoomSelector: 'dxxrp-zoom-selector',
    ZoomIn: 'dxxrp-zoom-in',
    Print: 'dxxrp-print',
    PrintPage: 'dxxrp-print-page',
    ExportTo: 'dxxrp-export-menu',
    Search: 'dxxrp-search',
    FullScreen: 'dxrd-fullscreen'
};
export const ExportFormatID = {
    PDF: { text: 'PDF', textId: 'ASPxReportsStringId.ExportName_pdf', format: 'pdf' },
    XLS: { text: 'XLS', textId: 'ASPxReportsStringId.ExportName_xls', format: 'xls' },
    XLSX: { text: 'XLSX', textId: 'ASPxReportsStringId.ExportName_xlsx', format: 'xlsx' },
    RTF: { text: 'RTF', textId: 'ASPxReportsStringId.ExportName_rtf', format: 'rtf' },
    MHT: { text: 'MHT', textId: 'ASPxReportsStringId.ExportName_mht', format: 'mht' },
    HTML: { text: 'HTML', textId: 'ASPxReportsStringId.ExportName_html', format: 'html' },
    Text: { text: 'Text', textId: 'ASPxReportsStringId.ExportName_txt', format: 'txt', propertyName: 'textExportOptions' },
    CSV: { text: 'CSV', textId: 'ASPxReportsStringId.ExportName_csv', format: 'csv' },
    Image: { text: 'Image', textId: 'ASPxReportsStringId.ExportName_png', format: 'image' },
    DOCX: { text: 'DOCX', textId: 'ASPxReportsStringId.ExportName_docx', format: 'docx' }
};
export const PreviewElements = {
    Toolbar: 'dxrd-preview-toolbar-scrollable',
    Breadcrumb: 'dxrd-preview-breadcrumb',
    Surface: 'dxrdp-surface',
    RightPanel: 'dxrd-right-panel-template-base',
    ExportTool: 'dxrd-export-tool'
};
export var ZoomAutoBy;
(function (ZoomAutoBy) {
    ZoomAutoBy[ZoomAutoBy["None"] = 1] = "None";
    ZoomAutoBy[ZoomAutoBy["WholePage"] = 0] = "WholePage";
    ZoomAutoBy[ZoomAutoBy["PageWidth"] = -1] = "PageWidth";
})(ZoomAutoBy || (ZoomAutoBy = {}));