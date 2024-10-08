﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\registerEditors.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor, editorTemplates as analyticsEditorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { editorTemplates as chartEditorTemplates } from '../../chart/internal/_editorTemplates';
import { BandLevelEditor } from '../internal/_bandLevelEditor';
import { BandsEditor, PageBreakBandEditor, RunningBandEditor, SortingBandEditor } from './bandEditors';
import { ChartValueBindingEditor } from './chartValueBindingEditor';
import { DataSourceEditor } from './dataSourceEditor';
import { DataSourceSelectBox } from './dataSourceSelectBox';
import { designerEditorTemplates } from './editorTemplates';
import { DrillDownEditor, ExplorerEditor } from './explorerEditors';
import { ExpressionableFontEditor } from './expressionableFontEditor';
import { ReportComplexExpressionEditor } from './expressioneditor/reportComplexExpressionEditor';
import { ReportExpressionEditor } from './expressioneditor/reportExpressionEditor';
import { FieldsComboboxEditor } from './fieldsComboboxEditor';
import { FormatStringEditor } from './formatStringEditor';
import { FormattingRuleEditor } from './formattingRuleEditor';
import { GaugeStyleEditor } from './gaugeStyleEditor';
import { NameEditor } from './nameEditor';
import { PivotGridCriteriaEditor } from './pivotGridCriteriaEditor';
import { ContentByTypeEditor, DataBindingEditor, DataBindingsEditor, FontEditorUndo } from './propertyGridEditors';
import { ReportUrlEditor } from './reportUrlEditor';
import { SummaryEditor } from './summaryEditor';
import { ComboboxUndoEditor } from './undoEditors';
import { WatermarkIdEditor } from './watermarkIdEditor';
export function registerEditors() {
    designerEditorTemplates.registerEditors({
        formatEditor: { header: 'dxrd-formatstring', editorType: FormatStringEditor },
        dataSource: { header: 'dxrd-datasource', editorType: DataSourceEditor },
        dataBindings: { header: 'dxrd-dataBindings', content: 'dxrd-dataBindingsContent', editorType: DataBindingsEditor },
        dataBinding: { header: 'dxrd-dataBinding', content: 'dxrd-dataBindingContent', editorType: DataBindingEditor },
        reportExplorer: { header: 'dxrd-reportexplorer-editor', editorType: ExplorerEditor },
        reportSourceUrl: { header: 'dxrd-reportSourceUrl', editorType: ReportUrlEditor },
        bands: { header: 'dxrd-bands', editorType: BandsEditor },
        runningBand: { header: 'dxrd-bands', editorType: RunningBandEditor },
        sortingBand: { header: 'dxrd-bands', content: 'dx-objectEditorContent', editorType: SortingBandEditor },
        style: { header: 'dxrd-style', content: 'dxrd-styleContent' },
        stylePriority: { header: 'dxrd-stylePriority' },
        contentByType: { header: 'dxrd-content-type', content: 'dx-objectEditorContent', editorType: ContentByTypeEditor },
        lookUpValues: { custom: 'dxrd-lookUpValues' },
        reportexpression: { header: 'dxrd-reportexpression', editorType: ReportExpressionEditor },
        reportexpressionComplex: { header: 'dxrd-reportexpression-complex', editorType: ReportComplexExpressionEditor },
        drillDownControls: { header: 'dxrd-reportexplorer-editor', editorType: DrillDownEditor },
        pivotGridFields: { custom: 'dxrd-pivotGridFields' },
        scriptsBox: { header: 'dxrd-scriptsbox' },
        formattingRule: { custom: 'dxrd-formattingRuleCollection', editorType: FormattingRuleEditor },
        toclevel: { custom: 'dxrd-levelCollection' },
        calculatedFields: { custom: 'dxrd-calculatedFields' },
        watermarks: { custom: 'dxrd-watermarks' },
        parameters: { custom: 'dxrd-parameters' },
        reportRtlProperty: { header: 'dxrd-reportRtlProperty' },
        comboboxUndo: { header: 'dx-combobox-undo', editorType: ComboboxUndoEditor },
        comboboxPageBreak: { header: 'dx-combobox', editorType: PageBreakBandEditor },
        fontUndo: { header: 'dx-emptyHeader', content: 'dx-objectEditorContentUndo', editorType: FontEditorUndo },
        chartValueBinding: { header: 'dxrd-chartValueBinding', editorType: ChartValueBindingEditor },
        name: { header: 'dxrd-name', editorType: NameEditor },
        watermarkId: { header: 'dxrd-name', editorType: WatermarkIdEditor },
        bandLevel: { header: 'dx-numeric-undo', editorType: BandLevelEditor },
        pivotCriteria: { header: 'dxrd-pivotcriteria', editorType: PivotGridCriteriaEditor },
        fieldsCombobox: { header: 'dxrd-fields-combobox', editorType: FieldsComboboxEditor },
        richTextLoad: { header: 'dxrd-richtext-loadfile', editorType: Editor },
        summaryEditor: { header: 'dxrd-summaryeditor-header', content: 'dxrd-objectEditorContent', editorType: SummaryEditor },
        expressionableFont: { header: 'dx-emptyHeader', content: 'dx-objectEditorContent', editorType: ExpressionableFontEditor },
        fontModificatorsHighlightable: { custom: 'dx-modificators-highlightable' },
        parametersCheckbox: { custom: 'dxrd-parameters-checkbox' },
        dataSourceSelectBox: { header: 'dxrd-datasource-combobox', editorType: DataSourceSelectBox },
        localizationSelectBox: { header: 'dxrd-localization-combobox', editorType: DataSourceSelectBox },
        pdfContentLoad: { header: 'dxrd-pdfcontent-loadfile', editorType: Editor },
        viewStyle: { header: 'dxrd-viewStyle', editorType: GaugeStyleEditor }
    });
    chartEditorTemplates.getEditor('dataMemberChart').header = analyticsEditorTemplates.getEditor('dataMember').header;
    chartEditorTemplates.getEditor('fieldChart').header = analyticsEditorTemplates.getEditor('field').header;
    chartEditorTemplates.getEditor('valueDataMember').header = analyticsEditorTemplates.getEditor('field').header;
}
