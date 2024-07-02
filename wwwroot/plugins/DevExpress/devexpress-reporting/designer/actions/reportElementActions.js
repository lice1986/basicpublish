﻿/**
* DevExpress HTML/JS Reporting (designer\actions\reportElementActions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BandViewModel } from '../bands/xrBand';
import { ReportViewModel } from '../controls/xrReport';
import { XRReportElementViewModel } from '../controls/xrReportelement';
import { ElementActions } from './elementActions';
export class ReportElementActions extends ElementActions {
    constructor(surfaceContext, selection) {
        super(surfaceContext, selection);
    }
    getActions(context) {
        if (context && !(context instanceof ReportViewModel || context instanceof BandViewModel) && (context instanceof XRReportElementViewModel || context.controlType === 'multiselect')) {
            return super.getActions(context);
        }
        return [];
    }
}