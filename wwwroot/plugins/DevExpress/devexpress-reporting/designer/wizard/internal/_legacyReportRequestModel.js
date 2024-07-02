﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_legacyReportRequestModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PaperKind } from '../../utils/paperKind';
import { ReportType } from '../reportWizardState';
import { CommonRequestModel } from './_commonRequestModel';
export class LegacyReportRequestModel extends CommonRequestModel {
    constructor(state) {
        super(state);
        if (state.reportType === ReportType.Standard) {
            this.AdjustFieldWidth = state.fitFieldsToPage;
            if (state.fields.length) {
                this.Columns = state.fields.map((value) => { return value.name; });
                this.ColumnInfo = state.fields.map(value => {
                    return {
                        Name: value.name,
                        DisplayName: value.displayName,
                        TypeSpecifics: 0
                    };
                });
            }
            else {
                this.Columns = null;
                this.ColumnInfo = null;
            }
            this.DataSourceName = null;
            this.GroupingLevels = state.groups;
            this.Layout = state.layout;
            this.Portrait = state.portrait;
            this.ReportStyleId = state.style;
            this.SummaryOptions = (state.summaryOptions || []).map((item) => {
                return {
                    ColumnName: item.columnName,
                    Flags: item.flags
                };
            });
            if (state.pageSetup) {
                this.PaperKind = PaperKind[state.pageSetup.paperKind];
                this.PaperSize = {
                    width: state.pageSetup.width,
                    height: state.pageSetup.height
                };
                this.Margins = {
                    left: state.pageSetup.marginLeft,
                    right: state.pageSetup.marginRight,
                    top: state.pageSetup.marginTop,
                    bottom: state.pageSetup.marginBottom
                };
                this.Unit = state.pageSetup.unit;
            }
        }
    }
}