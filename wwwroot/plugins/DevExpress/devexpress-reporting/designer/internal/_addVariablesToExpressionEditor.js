﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_addVariablesToExpressionEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createExpressionEditorCollectionToolOptions } from '@devexpress/analytics-core/analytics-widgets-internal';
export function addVariablesToExpressionEditor(categories, customizeItems = (items) => items) {
    const items = customizeItems([
        { text: 'DataSource.CurrentRowIndex', class: 'dx-expression-variables-datasource', val: '[DataSource.CurrentRowIndex]', descriptionStringId: 'ReportStringId.ExpressionEditor_ItemInfo_Variables_CurrentRowIndex_Description' },
        { text: 'DataSource.RowCount', class: 'dx-expression-variables-datasource', val: '[DataSource.RowCount]', descriptionStringId: 'ReportStringId.ExpressionEditor_ItemInfo_Variables_RowCount_Description' },
        { text: 'DataSource.CurrentRowHierarchyLevel', class: 'dx-expression-variables-datasource', val: '[DataSource.CurrentRowHierarchyLevel]', descriptionStringId: 'ReportStringId.ExpressionEditor_ItemInfo_Variables_CurrentRowHierarchyLevel_Description' },
        { text: 'Arguments.GroupRowIndex', class: 'dx-expression-variables-arguments', val: '[Arguments.GroupRowIndex]', descriptionStringId: '' },
        { text: 'Arguments.GroupColumnIndex', class: 'dx-expression-variables-arguments', val: '[Arguments.GroupColumnIndex]', descriptionStringId: '' }
    ]);
    categories.push(createExpressionEditorCollectionToolOptions(items, 'Variables', 'ReportStringId.ExpressionEditor_ItemInfo_Variables', true));
}
