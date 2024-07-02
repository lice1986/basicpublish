﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_editorTemplates.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { EditorTemplates } from '@devexpress/analytics-core/analytics-widgets';
export const editorTemplates = new EditorTemplates();
export const chartDataSource = { propertyName: 'dataSource', displayName: 'Data Source', modelName: '@DataSource', link: true, editor: editorTemplates.getEditor('chartDataSource'), localizationId: 'DevExpress.XtraReports.UI.XRSparkline.DataSource' };