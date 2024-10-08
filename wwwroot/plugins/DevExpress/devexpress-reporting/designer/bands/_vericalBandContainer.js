﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_vericalBandContainer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragDropHandler } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { bandSurfaceCollapsedHeight } from './bandSurfaceCollapsedHeight';
import { markerHeight } from './_verticalBandsUtils';
export class VerticalBandsContainerSurface extends Disposable {
    constructor(_parent) {
        super();
        this._parent = _parent;
        this.markerWidth = ko.observable(bandSurfaceCollapsedHeight);
        this.name = 'Vertical Bands';
        this.bandOffset = 29;
        this.templateName = 'dxrd-vertical-bands-container';
        this.selectionTemplate = 'dxrd-vertical-bands-container-selection';
        this.vrulerTemplate = 'dxrd-vertical-bands-container-vruler';
        this.leftMarginTemplate = 'dxrd-vertical-bands-leftMargin';
        this.leftMarginSelectionTemplate = 'dxrd-vertical-bands-leftMargin-selection';
        this.verticalBands = ko.observableArray();
        this.scrollOffset = ko.observable(0);
        this._disposables.push(this.bandPosition = ko.computed(() => {
            return this.getBandPosition();
        }), this.topOffset = ko.computed(() => {
            const offset = 0;
            if (this.bandPosition() > 0) {
                const prevBand = this._parent.bandsHolder.bands()[this.bandPosition() - 1];
                if (prevBand) {
                    return prevBand.absolutePosition.y() + prevBand.height();
                }
            }
            if (this._parent && this._parent._control.controlType === 'DetailReportBand') {
                return this._parent['absolutePosition'].y();
            }
            else
                return 0;
        }), this.collapsed = ko.computed({
            read: () => this.verticalBands().some(x => x.collapsed()),
            write: (newVal) => this.verticalBands().forEach(x => x.collapsed(newVal))
        }), this.selected = ko.computed(() => {
            return this.verticalBands().some(x => x.selected());
        }), this.canResize = ko.computed(() => {
            return this.selected() && !this.isLocked() && !this.collapsed() && !DragDropHandler.started();
        }), this.width = ko.computed(() => _parent._context.pageWidth() - _parent._context.margins.left() - (!this.collapsed() ? _parent._context.margins.right() : 0)), this.leftMargin = ko.pureComputed(() => 0 - (_parent._context.margins && _parent._context.margins.left() || 0) + 10), this.height = ko.computed({
            read: () => {
                return this.verticalBands()[0] && this.verticalBands()[0].height() || 0;
            },
            write: (newVal) => this.verticalBands().forEach((x => x._height(newVal - markerHeight)))
        }), this._height = ko.computed(() => { return this.verticalBands()[0] && this.verticalBands()[0]._height() || 0; }), this.focused = ko.computed(() => {
            return this.verticalBands().some(x => x.focused());
        }), this.leftOffset = ko.computed(() => _parent.rtlLayout() ? _parent._context.margins.right() : 0), this.grayAreaWidth = ko.computed(() => {
            return Math.max(0, this.width() - this.getBandsWidth(this.verticalBands()));
        }), this.grayAreaLeft = ko.computed(() => {
            const bands = this.verticalBands();
            if (!bands.length)
                return 0;
            const band = bands[bands.length - 1];
            return band.absolutePosition.x() + band._width();
        }), this.minHeight = ko.pureComputed(() => {
            return Math.max(...this.verticalBands().map(x => (x.heightFromControls && x.heightFromControls()) || 1)) + markerHeight;
        }), this.locked = ko.computed(() => this.isLocked()));
        let oldDelta = 0;
        this['_resize'] = (delta, oldDelta) => {
            const firstBand = this.verticalBands()[0];
            firstBand._height(firstBand._height() + delta - oldDelta);
            return delta;
        };
        this['resize'] = (params) => {
            oldDelta = this['_resize'](params.delta.dh, oldDelta);
        };
        this['stopResize'] = () => {
            oldDelta = 0;
        };
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.verticalBands);
        this.resetObservableArray(this.verticalBands);
    }
    getBandPosition() {
        if (this.visible)
            return this._parent.getControlModel().bands().indexOf(this.verticalBands()[0]._control);
        return -1;
    }
    isLocked() {
        return this.verticalBands().some(x => x.locked);
    }
    createScrollViewOptions(target, selection) {
        return {
            direction: 'horizontal',
            showScrollbar: 'always',
            useNative: false,
            scrollByContent: false,
            scrollByThumb: true,
            onStart: function () {
                selection['disabled'](true);
            },
            onScroll: function (e) {
                target.scrollOffset(e.scrollOffset.left);
            },
            onEnd: function () {
                selection['disabled'](false);
            }
        };
    }
    markerClick(selection, changeCollapsed = true) {
        if (selection.expectClick) {
            selection.expectClick = false;
            return;
        }
        if (!this.focused() && !selection.disabled()) {
            selection.initialize(this.verticalBands()[0]);
        }
        else {
            if (changeCollapsed)
                this.collapsed(!this.collapsed());
        }
    }
    getBandsWidth(bands) {
        return bands.reduce((acc, band, index) => acc += band._width(), 0);
    }
    _getTopOffset() {
        let top = 0;
        if (this._parent && this._parent._control.controlType === 'DetailReportBand') {
            top = this._parent['backgroundRect']().top;
        }
        if (this.bandPosition() > 0) {
            for (let i = 0; i < this.bandPosition(); i++) {
                top += this._parent.bandsHolder.bands()[i]._totalHeight();
            }
        }
        return top;
    }
    get visible() {
        return this.verticalBands().length > 0;
    }
    get zoom() { return this._parent.zoom; }
}
