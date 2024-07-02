﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseDate as analyticParseDate } from '@devexpress/analytics-core/analytics-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { parseDate } from '../_dateUtils';
export function createInnerActionsWithPopover(text, id, actions, template) {
    const object = {
        text: text,
        imageClassName: 'dxrd-image-add',
        imageTemplateName: 'dxrd-svg-operations-add',
        disabled: ko.observable(false),
        id: id,
        _visible: ko.observable(false),
        popoverVisible: null,
        togglePopoverVisible: null,
        closePopover: null,
        templateName: 'dxrd-collectionactions-template',
        contentTemplate: template,
        getContainer: function (element, selector) {
            return $.fn.constructor(element).parent().find(selector);
        },
        actions: actions
    };
    object.popoverVisible = ko.pureComputed(() => {
        return object._visible();
    });
    object.togglePopoverVisible = () => {
        object._visible(!object._visible());
    };
    object.closePopover = () => {
        object._visible(false);
    };
    return [object];
}
export function _isNumericTypeSpecific(specific) {
    return ['Integer', 'Float', 'CalcInteger', 'CalcFloat', 'SumInteger', 'SumFloat'].indexOf(specific) > -1;
}
export function _isDateTypeSpecific(specific) {
    return ['Date', 'CalcDate', 'SumDate'].indexOf(specific) > -1;
}
export function _getUnconvertiblePoint(propertyName, oldValue, newValue, points) {
    let filter = _ => false;
    if ((oldValue === 'Numerical' && newValue === 'DateTime') || (oldValue === 'DateTime' && newValue === 'Numerical')) {
        filter = point => point[propertyName]() !== null && point[propertyName]() !== void 0 && point[propertyName]() !== '';
    }
    if (oldValue === 'Auto' || oldValue === 'Qualitative')
        if (newValue === 'Numerical') {
            filter = point => {
                const number = parseInt(point[propertyName]());
                return isNaN(number) || (typeof number === 'number' && JSON.stringify(number) !== point[propertyName]().toString());
            };
        }
        else if (newValue === 'DateTime') {
            filter = point => {
                let date = analyticParseDate(point[propertyName](), false, 'MM/dd/yyyy');
                if (!date)
                    date = parseDate(point[propertyName]());
                return !date;
            };
        }
    return points.filter(filter)[0] || null;
}
