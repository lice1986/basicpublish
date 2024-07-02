﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_chartFieldListExtender.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
export class ChartFieldListExtender {
    beforeItemsFilled(request, items) {
        if (request.ref !== 'PivotGrid' && request.id !== 'PivotGrid')
            return false;
        switch (request.path) {
            case 'dataMember': return true;
            case 'seriesDataMember': {
                items.push({ name: 'Arguments', displayName: 'Arguments', specifics: 'String' }, { name: 'Series', displayName: getLocalization('Series', 'DevExpress.XtraReports.UI.XRChart.Series'), specifics: 'String' }, { name: 'Values', displayName: getLocalization('Values', 'DevExpress.XtraCharts.SeriesPoint.Values'), specifics: 'Integer' });
                return true;
            }
            case 'valueDataMembers': {
                items.push({ name: 'Values', displayName: getLocalization('Values', 'DevExpress.XtraCharts.SeriesPoint.Values'), specifics: 'Integer' });
                return true;
            }
        }
    }
}