﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_editorTemplates.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { EditorTemplates } from '@devexpress/analytics-core/analytics-widgets';
declare type ChartEditorTemplates = 'chartDataSource' | 'collection' | 'views' | 'fieldChart' | 'dataMemberChart' | 'valueDataMember' | 'comboboxPositionSeriesLabel' | 'panes' | 'axisX' | 'axisY' | 'legends' | 'summaryFunction' | 'points' | 'maxSize' | 'minSize' | 'group' | 'undoCustomColorEditor';
export declare const editorTemplates: EditorTemplates<ChartEditorTemplates>;
export declare const chartDataSource: ISerializationInfo;
export {};
