﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_commonRequestModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { GraphicsUnit, ReportType } from '../reportWizardState';
export class CommonRequestModel {
    constructor(state) {
        this.DataMember = state.dataMember;
        if (state.reportType === ReportType.Label) {
            this.CustomLabelInformation = {
                Height: state.labelDetails.height,
                HorizontalPitch: state.labelDetails.hPitch,
                LeftMargin: state.labelDetails.leftMargin,
                RightMargin: state.labelDetails.rightMargin,
                PaperKindDataId: state.labelDetails.paperKindId,
                TopMargin: state.labelDetails.topMargin,
                BottomMargin: state.labelDetails.bottomMargin,
                Unit: state.labelDetails.unit === GraphicsUnit.Inch ? GraphicsUnit.Inch : GraphicsUnit.Millimeter,
                VerticalPitch: state.labelDetails.vPitch,
                Width: state.labelDetails.width
            };
            this.LabelProductId = state.labelDetails.productId;
            this.LabelProductDetailId = state.labelDetails.id;
        }
        this.IgnoreNullValuesForSummary = state.ignoreNullValuesForSummary;
        this.ReportTitle = state.reportTitle;
        this.ReportType = state.reportType;
        if (state.dataMemberInfo != null || state.dataMemberPath != null) {
            this.DataMemberName = {
                DisplayName: state.dataMemberInfo.displayName,
                Name: state.dataMemberInfo.name,
                DataMemberType: 0
            };
            if (state.dataMemberInfo.name) {
                const index = state.dataMemberPath.indexOf('.');
                this.DataMemberName.Name = index > 0 ? state.dataMemberPath.substr(index + 1) : state.dataMemberPath;
            }
        }
        else {
            this.DataMemberName = null;
        }
    }
}