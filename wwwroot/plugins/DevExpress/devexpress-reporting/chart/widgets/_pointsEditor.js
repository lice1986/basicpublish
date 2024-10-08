﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_pointsEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import { SeriesPointModel } from '../components/series/_point';
export class PointsEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
    }
    addPoint(model) {
        return SeriesPointModel.createNew(model);
    }
}
