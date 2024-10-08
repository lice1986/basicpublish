﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_ruler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { addDisposeCallback, unitsToPixel } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { getTemplate } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
export class RulerViewModel extends Disposable {
    constructor(options) {
        super();
        this.height = ko.observable(0);
        this.width = ko.observable(0);
        this.gridLines = ko.observableArray();
        this.majorGridLines = ko.observableArray();
        this.disable = null;
        this.defaultGridLinesCoordinate = ko.observable();
        this._disposables.push(ko.computed(() => {
            const gridSize = unitsToPixel(25, options.units(), options.zoom());
            this.defaultGridLinesCoordinate({ x: 4, x1: '80%', x2: '100%', majorX1: '70%', majorX2: '100%' });
            let flip = !!ko.unwrap(options.flip);
            if (options.direction === 'vertical') {
                this.height(options.length() + 0.5);
                this.width(20);
                if (flip) {
                    flip = false;
                    this.defaultGridLinesCoordinate({ x: 11, x1: '20%', x2: '0%', majorX1: '30%', majorX2: '0%' });
                }
            }
            else {
                this.width(options.length() + 0.5);
                this.height(20);
            }
            this._initGrid(options.length(), gridSize, this.gridLines, flip);
            this._initGrid(options.length(), 4 * gridSize, this.majorGridLines, flip);
        }));
        this.disable = options.disable;
    }
    _initGrid(length, gridSize, gridLines, flip = false) {
        const arrayLength = Math.round(length / gridSize) + 1, currentLength = gridLines.peek().length, diff = arrayLength - currentLength;
        if (diff > 0) {
            for (let index = 0; index < diff; index++) {
                gridLines.push({ coordVal: ko.observable(0), text: ko.observable(0), visible: ko.observable(false) });
            }
        }
        if (flip) {
            for (let index = 0, coordVal = length; index < gridLines.peek().length; index++, coordVal -= gridSize) {
                gridLines.peek()[index].coordVal(coordVal - 0.5);
                gridLines.peek()[index].text(index);
                gridLines.peek()[index].visible(index < arrayLength);
            }
        }
        else {
            for (let index = 0, coordVal = 0; index < gridLines.peek().length; coordVal += gridSize, index++) {
                gridLines.peek()[index].coordVal(coordVal + 0.5);
                gridLines.peek()[index].text(index);
                gridLines.peek()[index].visible(index < arrayLength);
            }
        }
    }
}
ko.bindingHandlers['ruler'] = {
    init: function (element, valueAccessor) {
        $.fn.constructor(element).children().remove();
        const values = valueAccessor(), options_ = $.extend({}, ko.unwrap(values), {}), zoom = options_.zoom, options = {
            length: options_.length,
            units: options_.units,
            direction: options_.direction || '',
            zoom: zoom,
            flip: options_.flip,
            disable: options_.disable
        }, rulerViewModel = new RulerViewModel(options), templateHtml = getTemplate('dxrd-ruler' + options.direction), $element = $.fn.constructor(element).append(templateHtml);
        ko.applyBindings(rulerViewModel, $element.children()[0]);
        addDisposeCallback($element.children()[0], () => {
            rulerViewModel.dispose();
            rulerViewModel.gridLines(null);
            rulerViewModel.majorGridLines(null);
        });
        return { controlsDescendantBindings: true };
    }
};
