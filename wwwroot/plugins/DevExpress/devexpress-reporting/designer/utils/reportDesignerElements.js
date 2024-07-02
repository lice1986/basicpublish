﻿/**
* DevExpress HTML/JS Reporting (designer\utils\reportDesignerElements.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DesignerBaseElements } from '@devexpress/analytics-core/analytics-internal';
import * as $ from 'jquery';
export const ReportDesignerElements = $.extend({}, DesignerBaseElements, {
    MenuButton: 'dxrd-menubutton-template',
    NavigationPanel: 'dxrd-navigation-panel-template',
    ReportDialog: 'dxrd-report-dialog-template',
    ChartDialog: 'dxrd-chart-designer-popup',
    ReportConverterDialog: 'dxrd-report-dialog-converter-template',
    Parameters: 'dxrd-report-parameters-dialogs',
    ContextMenu: 'dxrd-context-menu'
});
export const ReportDesignerAddOns = {
    Preview: 'dxrd-report-preview',
    ReportWizard: 'dx-wizard-newlayout#report',
    ReportWizardFullscreen: 'dx-wizard-fullscreen#report',
    LocalizationEditor: 'dxrd-localization-editor',
    ErrorPanel: 'dxrd-error-panel',
    DataSourceWizard: 'dx-wizard-newlayout#data-source',
    MultiQueryDataSourceWizard: 'dx-wizard-newlayout#multiquery-data-source',
    MultiQueryDataSourceWizardFullscreen: 'dx-wizard-fullscreen#multiquery-data-source',
    MasterDetailEditor: 'dxrd-masterDetail-editor',
    FederatedManageQueriesEditor: 'dxrd-federated-manageQueries-editor',
    FederatedQueriesPopups: 'dx-querybuilder-federation-popup-templates',
    ScriptEditor: 'dxrd-scripts',
    ExpressionEditor: 'dxrd-activated-expressioneditor'
};
