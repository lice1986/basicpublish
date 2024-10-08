﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_strip.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { axisLabelText, legendName, showAxisLabel } from '../../internal/meta/_axis';
import { color, legendText, name, showInLegend, tag, visible } from '../../internal/meta/_common';
import { ChartElementCollectionItemBase } from '../../internal/_elementCollection';
import { stripFillStyle } from '../series/_fillStyle';
import { stripMaxLimitInfo, stripMinLimitInfo } from './_stripLimit';
export class StripViewModel extends ChartElementCollectionItemBase {
    constructor(model, parent, serializer) {
        super(extend(true, {}, StripViewModel.initialModel, model), parent, serializer, stripSerializationsInfo);
    }
    static from(model, serializer) {
        return new StripViewModel(model || {}, null, serializer);
    }
    getExpressionProperties() {
        return ['LegendText', 'AxisLabelText'];
    }
    getChildComponents() {
        return [
            { component: ko.unwrap(this.minLimit), path: 'MinLimit' },
            { component: ko.unwrap(this.maxLimit), path: 'MaxLimit' },
        ];
    }
}
StripViewModel.initialModel = {
    'MinLimit': {
        '@AxisValueSerializable': '0'
    },
    'MaxLimit': {
        '@AxisValueSerializable': '1'
    }
};
StripViewModel.prefix = 'Strip ';
export const stripSerializationsInfo = [visible, color, showInLegend, legendName, legendText, showAxisLabel, axisLabelText, name, tag, stripFillStyle, stripMinLimitInfo, stripMaxLimitInfo];
