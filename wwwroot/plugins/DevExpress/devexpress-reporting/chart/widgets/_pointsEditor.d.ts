﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_pointsEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import { SeriesPointModel } from '../components/series/_point';
export declare class PointsEditor extends Editor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    addPoint(model: any): SeriesPointModel;
}
