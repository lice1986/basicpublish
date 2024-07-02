﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportPreviewService.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { sendRequest } from '@devexpress/analytics-core/analytics-internal';
import { PreviewRequestWrapper } from '../../viewer/internal/_previewRequestWrapper';
import { language } from '../controls/metadata/xrReport';
import { HandlerUri } from '../utils/settings';
export class ReportPreviewService {
    static initializePreview(report) {
        return sendRequest(HandlerUri(), 'initializePreview', JSON.stringify({
            layout: JSON.stringify({ 'XtraReportsLayoutSerializer': report.serialize() }),
            culture: report.isLocalized() && report.language() !== language.defaultVal ? report.language() : ''
        }), PreviewRequestWrapper.getProcessErrorCallback());
    }
}