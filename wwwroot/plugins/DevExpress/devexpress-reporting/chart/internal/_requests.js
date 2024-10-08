﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_requests.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { sendRequest } from '@devexpress/analytics-core/analytics-internal';
import { HandlerUri } from '../_handlerUri';
export class ChartRequests {
    static getChartImage(uri, chartLayout, width, height) {
        return sendRequest(uri, 'chart', JSON.stringify({
            width: width,
            height: height,
            Chart: JSON.stringify({
                'ChartXmlSerializer': {
                    '@version': '16.2.0.0',
                    Chart: chartLayout
                }
            })
        }));
    }
    static fieldListCallback(request) {
        const requestJson = JSON.stringify(request);
        return sendRequest(HandlerUri(), 'fieldList', requestJson);
    }
}
