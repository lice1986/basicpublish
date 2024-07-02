﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_indicator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization, getUniqueName, guid } from '@devexpress/analytics-core/analytics-internal';
import { indicatorMapper } from '../../internal/meta/_indicators';
import { ChartElementCollectionItemBase } from '../../internal/_elementCollection';
import { createInnerActionsWithPopover } from '../../internal/_utils';
export class Indicator extends ChartElementCollectionItemBase {
    constructor(model, parent, serializer) {
        super(model, parent, serializer, indicatorMapper[model['@TypeNameSerializable']]);
    }
    getExpressionProperties() {
        return ['LegendText'];
    }
}
Indicator.prefix = 'indicator';
export function assignIndicatorActions(indicators) {
    const addIndicator = (model, display) => {
        model['@Name'] = getUniqueName(indicators().map(x => { return x['name'](); }), display);
        indicators()['innerActions'][0].closePopover();
        indicators.push(new Indicator(model, indicators));
    };
    const actions = Object.keys(indicatorMapper).map(x => {
        const display = getLocalization(x, 'ChartStringId.Ind' + x);
        return {
            text: x,
            display: display,
            clickAction: () => addIndicator({ '@TypeNameSerializable': x }, display)
        };
    });
    const id = 'addindicators-action_' + guid();
    indicators()['innerActions'] = createInnerActionsWithPopover(getLocalization('Add', 'ChartStringId.MenuItemAdd'), id, actions, 'dxcd-indicators-list');
}