﻿/**
* DevExpress HTML/JS Reporting (designer\viewtemplates.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IEditorViewModel, IFieldListEditorViewModel } from '@devexpress/analytics-core/analytics-widgets';
import { ICollectionItemWrapperViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { ISummaryFunctionEditorViewModel } from '../chart/widgets/_summaryFunctionEditor';
export declare type ReportDesignerTemplates = {
    'dxcd-field': IFieldListEditorViewModel;
    'dxcd-pointscollection': IEditorViewModel;
    'dxrd-formattingRuleCollection': IEditorViewModel;
    'dxrd-dataBinding': IFieldListEditorViewModel;
    'dxrd-chartValueBinding': IFieldListEditorViewModel;
    'dxrd-reportexplorer-editor': IFieldListEditorViewModel;
    'dxrd-collection-item-group': ICollectionItemWrapperViewModel;
    'dxcd-summaryFunction-content': ISummaryFunctionEditorViewModel;
};