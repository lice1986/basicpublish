﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrVerticalBand.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Point, SurfaceElementBase } from '@devexpress/analytics-core/analytics-elements';
import { checkModelReady, DragDropHandler, roundingXDecimals } from '@devexpress/analytics-core/analytics-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { bandSurfaceCollapsedHeight } from './bandSurfaceCollapsedHeight';
import { BandViewModel } from './xrBand';
import { _getUnitAbsoluteRect } from './_bandUtils';
import { markerHeight } from './_verticalBandsUtils';
export class VerticalBandViewModel extends BandViewModel {
    constructor(band, parent, serializer) {
        super(band, parent, serializer);
        this.preInit(band, parent, serializer);
        let _widthFromControls = 0;
        this._disposables.push(this.widthFromControls = ko.pureComputed(() => {
            _widthFromControls = 0;
            if (checkModelReady(this.root)) {
                _widthFromControls = this.controls().length > 0 ? Math.max(...this.controls().filter(x => !x.update()).map(x => x.location.x() + x.size.width())) : 1;
                _widthFromControls = roundingXDecimals(_widthFromControls);
                this.width(Math.max(_widthFromControls, this.width()));
                _widthFromControls = _widthFromControls > 0 ? _widthFromControls : 0;
            }
            return _widthFromControls;
        }));
        this._disposables.push(this.height.subscribe((newValue) => {
            if (this.update())
                return;
            const verticalBands = this.parentModel() && (this.parentModel()['bands']() || []).filter(x => x instanceof VerticalBandViewModel);
            const minValue = Math.max(...verticalBands.map(x => x.heightFromControls()));
            if (newValue < minValue)
                newValue = minValue;
            verticalBands.forEach(x => {
                x.update(true);
                x.height(newValue);
                x.update(false);
            });
        }));
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.controls);
        this.resetObservableArray(this.controls);
    }
    initSize() {
        this.size.height = this.height;
        this.size.width = this.width;
    }
    preInit(band, parent, serializer) {
    }
}
VerticalBandViewModel.unitProperties = [].concat(['width'], BandViewModel.unitProperties);
export class VerticalBandSurface extends SurfaceElementBase {
    constructor(band, context, unitProperties = VerticalBandSurface._unitProperties) {
        super(band, context, unitProperties);
        this.isSomeParentCollapsed = ko.observable(false);
        this._resize = (delta, oldDelta) => {
            const width = Math.max(this._width() + delta - oldDelta, this.minimumWidth());
            this._width(width);
            return delta;
        };
        this.resizeHandles = ko.computed(() => {
            return this.rtlLayout() ? 'w' : 'e';
        });
        this.templateName = 'dxrd-vertical-band';
        this.selectiontemplate = 'dxrd-vertical-band-selection';
        this.contentSelectionTemplate = 'dxrd-vertical-band-selection-content';
        this._disposables.push(this.collapsed = ko.pureComputed({
            read: () => {
                return !band.expanded();
            },
            write: (newVal) => {
                band.expanded(!newVal);
            }
        }));
        this.coordinateGridOptions = {
            height: band.height,
            snapGridSize: band.root.snapGridSize,
            width: band.width,
            zoom: context.zoom,
            measureUnit: context.measureUnit,
            flip: context.rtl
        };
        this.name = band.name;
        this.height = ko.pureComputed(() => {
            if (this.collapsed())
                return bandSurfaceCollapsedHeight;
            return this._height() + markerHeight;
        });
        this._disposables.push(this.backgroundRect = ko.pureComputed(() => {
            const top = this.verticalBandsContainer._getTopOffset();
            return {
                top: top,
                left: this.absolutePosition.x(),
                height: this._height(),
                width: this._width()
            };
        }));
        let oldDelta = 0;
        this['resize'] = (params) => {
            if (this.rtlLayout() && params.delta.dx) {
                oldDelta = this._resize(-1 * params.delta.dx, oldDelta);
            }
            else if (params.delta.dh) {
                oldDelta = this.verticalBandsContainer['_resize'](params.delta.dh, oldDelta);
            }
            else {
                oldDelta = this._resize(params.delta.dw, oldDelta);
            }
        };
        this['stopResize'] = () => {
            oldDelta = 0;
        };
        this._disposables.push(this.canResize = ko.computed(() => {
            return this.selected() && !this.locked && !DragDropHandler.started();
        }));
        this.getUsefulRect = () => {
            return {
                top: 0,
                left: 0,
                right: this._width(),
                bottom: this._height(),
                width: this._width(),
                height: this._height()
            };
        };
        let x = this.underCursor().x;
        const self = this;
        const createCursor = (newCursor) => {
            const cursor = $.extend(true, {}, newCursor);
            delete cursor.x;
            Object.defineProperty(cursor, 'x', {
                get() {
                    return x;
                },
                set(newVal) {
                    x = newVal + self.verticalBandsContainer.scrollOffset();
                },
                configurable: true
            });
            return cursor;
        };
        let underCursor = createCursor(this.underCursor());
        this.underCursor = ((newVal) => {
            if (!newVal)
                return underCursor;
            x = newVal.x;
            underCursor = createCursor(newVal);
        });
        this._disposables.push(this.resizeHandles);
    }
    _getRtlAbsolutePositionX(bandIndex, bands) {
        const allBandsWidth = this.verticalBandsContainer.getBandsWidth(bands);
        if (bandIndex !== 0) {
            return bands[bandIndex - 1].absolutePosition.x() - bands[bandIndex]._width();
        }
        else if (allBandsWidth > this.verticalBandsContainer.width()) {
            return bands.reduce((acc, band, index) => acc += (index === 0 ? 0 : band._width()), 0);
        }
        else {
            return this.verticalBandsContainer.width() - bands[bandIndex]._width();
        }
    }
    _getGrayArea() {
        return 0;
    }
    _getUnitPositionInParent() {
        const neighbors = this._control.parentModel().bands();
        const position = neighbors
            .slice(0, neighbors.indexOf(this._control))
            .reduce((previousValue, currentBand) => {
            if (currentBand instanceof VerticalBandViewModel)
                previousValue.x += currentBand.size.width();
            else
                previousValue.y += currentBand.size.height();
            return previousValue;
        }, { x: 0, y: 0 });
        return new Point(position.x, position.y);
    }
    get _unitAbsoluteRect() {
        return _getUnitAbsoluteRect(this, () => this._getUnitPositionInParent());
    }
    getAbsolutePositionX() {
        let newX = 0;
        let bandIndex;
        const parentBands = ko.unwrap(this.verticalBandsContainer.verticalBands);
        if (parentBands && parentBands.length !== 0) {
            bandIndex = parentBands.indexOf(this);
            if (bandIndex === -1)
                return 0;
            if (this.rtlLayout()) {
                newX = this._getRtlAbsolutePositionX(bandIndex, parentBands);
            }
            else if (bandIndex > 0 && parentBands[bandIndex - 1])
                newX = parentBands[bandIndex - 1].absolutePosition.x() + parentBands[bandIndex - 1]._width();
        }
        return newX;
    }
    updateAbsolutePosition() {
        if (!this.parent)
            return;
        this.absolutePosition.x(this.getAbsolutePositionX());
        this.absolutePosition.y(this.verticalBandsContainer.topOffset() + markerHeight);
    }
    minimumHeight() {
        return this.verticalBandsContainer.minHeight && this.verticalBandsContainer.minHeight();
    }
    minimumWidth() {
        return this.widthFromControls && this.widthFromControls();
    }
    get parent() {
        return this._getParent();
    }
    get verticalBandsContainer() {
        return this.parent.bandsHolder.verticalBandsContainer;
    }
}
VerticalBandSurface._unitProperties = {
    _width: (x) => x.width,
    _height: (x) => x.height,
    heightFromControls: (o) => { return o.heightFromControls; },
    widthFromControls: (o) => { return o.widthFromControls; }
};
