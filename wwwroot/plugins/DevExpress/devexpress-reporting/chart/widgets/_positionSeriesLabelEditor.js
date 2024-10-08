﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_positionSeriesLabelEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { barPositionValues, funnelPositionValues, piePositionValues, waterfallPositionValues } from '../internal/meta/_chart';
export class PositionSeriesLabelEditor extends Editor {
    constructor(info, level, parentDisabled, textToSearch) {
        super(info, level, parentDisabled, textToSearch);
        this._disposables.push(this.values = ko.pureComputed(() => {
            const model = this._get('_model');
            if (model && model['typeNameSerializable']) {
                return this._positionChooser(model['typeNameSerializable']());
            }
        }));
    }
    _positionChooser(type) {
        if (type) {
            if (['PieSeriesLabel', 'Pie3DSeriesLabel', 'DoughnutSeriesLabel', 'NestedDoughnutSeriesLabel', 'Doughnut3DSeriesLabel'].indexOf(type) !== -1)
                return piePositionValues;
            if ((['FunnelSeriesLabel', 'Funnel3DSeriesLabel'].indexOf(type) !== -1))
                return funnelPositionValues;
            if (type === 'WaterfallSeriesLabel')
                return waterfallPositionValues;
        }
        return barPositionValues;
    }
}
