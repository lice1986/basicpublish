﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\summaryEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PropertyGridEditor } from '@devexpress/analytics-core/analytics-widgets';
import { SummaryEditorModel, SummaryEditorPopup } from './_summaryEditor';
export declare class SummaryEditor extends PropertyGridEditor {
    dispose(): void;
    getPopupServiceActions(): import("@devexpress/analytics-core/analytics-internal").IModelAction[];
    summaryModel: SummaryEditorModel;
    popup: SummaryEditorPopup;
}
