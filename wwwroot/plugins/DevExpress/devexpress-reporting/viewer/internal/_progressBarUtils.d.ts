﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_progressBarUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IProgressBarSettings } from '../utils/initializer';
import { PreviewDisposableModel } from './_previewModel';
import { ReportPreview } from '../reportPreview';
export declare function getUpdateProgressBarCallback(progressBarSettings: IProgressBarSettings, designerModel: PreviewDisposableModel, reportPreview: ReportPreview, rootElement: Element, $window?: JQuery<Window>): () => void;