﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_crossTabRequestModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ColumnSortOrder } from '../../../viewer/internal/_previewRequestWrapper';
import { PivotSummaryType } from '../reportWizardState';
export class CrossTabFieldInfoBase {
    constructor(info) {
        this.__type = '';
        this.FieldName = info.name;
        this.DisplayText = info.displayName;
    }
}
export class CrossTabGroupFieldInfo extends CrossTabFieldInfoBase {
    constructor(info) {
        super(info);
        this.SortOrder = ColumnSortOrder[info.sortOrder] || ColumnSortOrder.Ascending;
    }
}
export class CrossTabColumnFieldInfo extends CrossTabGroupFieldInfo {
    constructor() {
        super(...arguments);
        this.__type = 'CrossTabColumnFieldInfo:#DevExpress.XtraReports.Wizards.CrossTab';
    }
}
export class CrossTabRowFieldInfo extends CrossTabGroupFieldInfo {
    constructor() {
        super(...arguments);
        this.__type = 'CrossTabRowFieldInfo:#DevExpress.XtraReports.Wizards.CrossTab';
    }
}
export class CrossTabDataFieldInfo extends CrossTabFieldInfoBase {
    constructor(info) {
        super(info);
        this.__type = 'CrossTabDataFieldInfo:#DevExpress.XtraReports.Wizards.CrossTab';
        this.SummaryType = PivotSummaryType[info.summaryType] || PivotSummaryType.Sum;
    }
}