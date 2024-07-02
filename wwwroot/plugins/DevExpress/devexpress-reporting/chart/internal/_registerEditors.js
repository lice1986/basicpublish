﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_registerEditors.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataMemberEditor, FieldListEditor } from '@devexpress/analytics-core/analytics-widgets';
import { ChartDataMemberEditor } from '../widgets/_chartDataMemberEditor';
import { ChartDataSourceEditor } from '../widgets/_chartDataSourceEditor';
import { ChartDependencyEditor } from '../widgets/_chartDependencyEditor';
import { CollectionLookupEditorModel } from '../widgets/_collectionLookupEditor';
import { PointsEditor } from '../widgets/_pointsEditor';
import { PositionSeriesLabelEditor } from '../widgets/_positionSeriesLabelEditor';
import { SummaryFunctionEditor } from '../widgets/_summaryFunctionEditor';
import { UndoColorPickerEditor } from '../widgets/_undoColorPickerEditor';
import { ViewEditor } from '../widgets/_viewEditor';
import { editorTemplates } from './_editorTemplates';
export function registerEditorTemplates() {
    editorTemplates.registerEditors({
        chartDataSource: { header: 'dxcd-datasource', editorType: ChartDataSourceEditor },
        collection: { header: 'dxcd-collection-lookup-header', content: 'dxcd-collection-item', editorType: CollectionLookupEditorModel },
        views: { header: 'dxcd-viewHeader', content: 'dxcd-viewContent', editorType: ViewEditor },
        fieldChart: { header: 'dxcd-field', editorType: FieldListEditor },
        dataMemberChart: { header: 'dxcd-field', editorType: DataMemberEditor },
        valueDataMember: { header: 'dxcd-field', editorType: ChartDataMemberEditor },
        comboboxPositionSeriesLabel: { header: 'dx-combobox', editorType: PositionSeriesLabelEditor },
        panes: { header: 'dxcd-panes-editor' },
        axisX: { header: 'dxcd-axisX-editor' },
        axisY: { header: 'dxcd-axisY-editor' },
        legends: { header: 'dxcd-legends-editor' },
        summaryFunction: { header: 'dx-emptyHeader', content: 'dxcd-summaryFunction-content', editorType: SummaryFunctionEditor },
        points: { custom: 'dxcd-pointscollection', editorType: PointsEditor },
        maxSize: { header: 'dxcd-maxSize', editorType: ChartDependencyEditor },
        minSize: { header: 'dxcd-minSize', editorType: ChartDependencyEditor },
        group: { header: 'dxcd-group' },
        undoCustomColorEditor: { header: 'dxcd-color-undo', editorType: UndoColorPickerEditor }
    });
}