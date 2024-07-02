﻿/**
* DevExpress HTML/JS Reporting (viewer\templates.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IContentActionViewModel, ISelectBoxActionViewModel } from '@devexpress/analytics-core/analytics-utils-native';
import { IEditorViewModel } from '@devexpress/analytics-core/analytics-widgets-native';
import { IExportActionViewModel } from './exportOptions/exportOptionsModel';
export declare type ViewerTemplate = {
    'dxrd-preview-pager': ISelectBoxActionViewModel;
    'dxrd-zoom-autofit-select-template': ISelectBoxActionViewModel;
    'dxrd-toolbar-two-way-switch': IContentActionViewModel;
    'dxrd-preview-export-to': IExportActionViewModel;
    'dxrd-multivalue-editing': IEditorViewModel;
};