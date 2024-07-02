﻿/**
* DevExpress HTML/JS Reporting (viewer\constants.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare const ActionId: {
    Design: string;
    FirstPage: string;
    PrevPage: string;
    Pagination: string;
    NextPage: string;
    LastPage: string;
    MultipageToggle: string;
    HighlightEditingFields: string;
    ZoomOut: string;
    ZoomSelector: string;
    ZoomIn: string;
    Print: string;
    PrintPage: string;
    ExportTo: string;
    Search: string;
    FullScreen: string;
};
export declare const ExportFormatID: {
    PDF: {
        text: string;
        textId: string;
        format: string;
    };
    XLS: {
        text: string;
        textId: string;
        format: string;
    };
    XLSX: {
        text: string;
        textId: string;
        format: string;
    };
    RTF: {
        text: string;
        textId: string;
        format: string;
    };
    MHT: {
        text: string;
        textId: string;
        format: string;
    };
    HTML: {
        text: string;
        textId: string;
        format: string;
    };
    Text: {
        text: string;
        textId: string;
        format: string;
        propertyName: string;
    };
    CSV: {
        text: string;
        textId: string;
        format: string;
    };
    Image: {
        text: string;
        textId: string;
        format: string;
    };
    DOCX: {
        text: string;
        textId: string;
        format: string;
    };
};
export declare const PreviewElements: {
    Toolbar: string;
    Breadcrumb: string;
    Surface: string;
    RightPanel: string;
    ExportTool: string;
};
export declare enum ZoomAutoBy {
    None = 1,
    WholePage = 0,
    PageWidth = -1
}