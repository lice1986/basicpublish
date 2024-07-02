﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_coordinateGrid.js)
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
export class CoordinateGridViewModel extends Disposable {
    constructor(options) {
        super();
        this.width = ko.observable(0);
        this.height = ko.observable(0);
        this.verticalGridLines = ko.observableArray().extend({ deferred: true });
        this.horizontalGridLines = ko.observableArray().extend({ deferred: true });
        this.majorVerticalGridLines = ko.observableArray().extend({ deferred: true });
        this.majorHorizontalGridLines = ko.observableArray().extend({ deferred: true });
        this._disposables.push(ko.computed(() => {
            const flip = !!ko.unwrap(options.flip);
            const gridSize = unitsToPixel(options.snapGridSize(), options.measureUnit(), options.zoom());
            const width = unitsToPixel(options.width(), options.measureUnit(), options.zoom());
            this.width(width + 0.5);
            this._initGrid(width, gridSize, this.verticalGridLines, flip);
            this._initGrid(width, 4 * gridSize, this.majorVerticalGridLines, flip);
        }));
        this._disposables.push(ko.computed(() => {
            const gridSize = unitsToPixel(options.snapGridSize(), options.measureUnit(), options.zoom());
            const height = unitsToPixel(options.height(), options.measureUnit(), options.zoom());
            this.height(height + 0.5);
            this._initGrid(height, gridSize, this.horizontalGridLines);
            this._initGrid(height, 4 * gridSize, this.majorHorizontalGridLines);
        }));
    }
    _initGrid(length, gridSize, gridLines, flip = false) {
        const lines = gridLines.peek();
        const arrayLength = Math.ceil(length / gridSize), currentLength = lines.length, diff = arrayLength - currentLength;
        if (diff > 0) {
            for (let index = currentLength; index < arrayLength; index++) {
                gridLines.push({ coordVal: ko.observable((index + 1) * gridSize + 0.5), visible: ko.observable(true) });
            }
        }
        if (flip) {
            for (let index = 0, coordVal = length; index < gridLines.peek().length; index++, coordVal -= gridSize) {
                gridLines.peek()[index].coordVal(coordVal - 0.5);
                gridLines.peek()[index].visible(index < arrayLength);
            }
        }
        else {
            for (let index = 0, coordVal = 0; index < gridLines.peek().length; coordVal += gridSize, index++) {
                gridLines.peek()[index].coordVal(coordVal + 0.5);
                gridLines.peek()[index].visible(index < arrayLength);
            }
        }
    }
    dispose() {
        super.dispose();
        this.horizontalGridLines([]);
        this.verticalGridLines([]);
        this.majorHorizontalGridLines([]);
        this.majorVerticalGridLines([]);
    }
}
ko.bindingHandlers['coordinateGrid'] = {
    init: function (element, valueAccessor) {
        $.fn.constructor(element).children().remove();
        const values = valueAccessor(), gridViewModel = new CoordinateGridViewModel(values), templateHtml = getTemplate('dxrd-coordinategrid'), $element = $.fn.constructor(element).append(templateHtml);
        ko.applyBindings(gridViewModel, $element.children()[0]);
        addDisposeCallback($element.children()[0], () => {
            gridViewModel.dispose();
        });
        return { controlsDescendantBindings: true };
    }
};
