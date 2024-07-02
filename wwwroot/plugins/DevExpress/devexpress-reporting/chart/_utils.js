﻿/**
* DevExpress HTML/JS Reporting (chart\_utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getUniqueName } from '@devexpress/analytics-core/analytics-internal';
import { deserializeArray, getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export function getSeriesClassName(typeName) {
    return typeName.toLowerCase().split('seriesview')[0];
}
export function deserializeModelArray(model, creator, prefix) {
    const array = ko.observableArray();
    array(deserializeArray(model || {}, (item) => { return creator(item, array); })());
    array()['innerActions'] = [{
            text: getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-add',
            imageTemplateName: 'dxrd-svg-operations-add',
            disabled: ko.observable(false),
            visible: true,
            clickAction: () => {
                array.push(creator({ '@Name': getUniqueName(array().map(x => { return x['name'] && x['name'](); }), prefix) }, array));
            }
        }];
    return array;
}
