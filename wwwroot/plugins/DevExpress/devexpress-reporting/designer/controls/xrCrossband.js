﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCrossband.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { checkModelReady, findSurface } from '@devexpress/analytics-core/analytics-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { defaultCulture } from '../../common/defaultCulture';
import { XRControlSurfaceBase } from './xrControl';
import { XRReportElementViewModel } from './xrReportelement';
function findBandByPositionY(bandsHolder, position) {
    let result = null;
    bandsHolder.bands().forEach((band) => {
        if (band.absolutePosition.y.peek() <= position) {
            if (band) {
                result = findBandByPositionY(band.bandsHolder, position) || band;
                return false;
            }
        }
    });
    return result;
}
export class XRCrossBandControlViewModel extends XRReportElementViewModel {
    constructor(control, parent, serializer) {
        super(control, parent, serializer);
        this.isCrossbandShow = ko.computed(() => {
            return !!(this.startBand() && this.endBand());
        });
        const originalEndBand = this.endBand;
        this._disposables.push(this.endPoint.x = ko.pureComputed({
            read: () => {
                return this.startPoint.x();
            },
            write: (val) => {
                if (checkModelReady(this.root)) {
                    this.startPoint.x(val);
                }
            }
        }));
        this._disposables.push(this.locationF.x = ko.pureComputed({
            read: () => {
                return this.startPoint.x();
            },
            write: (val) => {
                if (checkModelReady(this.root)) {
                    this.startPoint.x(val);
                }
            }
        }));
        this._disposables.push(this.locationF.y = ko.pureComputed({
            read: () => {
                return this.startPoint.y();
            },
            write: (val) => {
                if (checkModelReady(this.root)) {
                    this.startPoint.y(val);
                }
            }
        }));
        if (this.parentModel()) {
            this._subscribeBands(this.parentModel());
        }
        else {
            this._disposables.push(this.parentModel.subscribe((report) => {
                if (report)
                    this._subscribeBands(report);
            }));
        }
        this._disposables.push(this.isCrossbandShow);
    }
    _subscribeBands(report) {
        this._disposables.push(report.bands.subscribe((changes) => {
            for (let i = 0; i < changes.length; i++) {
                const change = changes[i];
                if (change.status === 'deleted') {
                    if (change.value === this.startBand() && change.value === this.endBand()) {
                        report.crossBandControls.remove(this);
                    }
                    else if (change.value === this.endBand()) {
                        this.endBand(report.bands()[change.index - 1]);
                        this.endPoint.y(report.bands()[change.index - 1].height());
                    }
                    else if (change.value === this.startBand()) {
                        const saveEndBand = this.endBand(), saveEndPointY = this.endPoint.y();
                        this.startBand(report.bands()[change.index]);
                        this.startPoint.y(0);
                        this.endBand(saveEndBand);
                        this.endPoint.y(saveEndPointY);
                    }
                }
            }
        }, null, 'arrayChange'));
    }
    getNearestParent(target) {
        let result = target;
        while (result.parentModel()) {
            result = result.parentModel();
        }
        return result;
    }
    isResettableProperty(propertyName) {
        return super.isResettableProperty(propertyName) && ['startPoint', 'endPoint', 'startBand', 'endBand'].indexOf(propertyName) === -1;
    }
    isPropertyVisible(name) {
        if (name === 'size')
            return false;
        return super.isPropertyVisible(name);
    }
    getControlContainerName() { return 'crossBandControls'; }
}
XRCrossBandControlViewModel.unitProperties = ['width', 'locationF', 'startPoint', 'endPoint'];
export class XRCrossBandSurface extends XRControlSurfaceBase {
    constructor(control, context) {
        super(control, context, XRCrossBandSurface._unitProperties);
        this.edgeUnderCursor = ko.observable({ isOver: false, x: 0, y: 0, isNotDropTarget: true });
        this.underCursor = ko.observable({ isOver: false, x: 0, y: 0, isNotDropTarget: true });
        this._disposables.push(this['_x'].subscribe((newVal) => {
            this['_endX'](newVal);
        }));
        this.visible = control.isCrossbandShow;
        let currentAbsoluteStartY = this['_startY']();
        let currentAbsoluteEndY = this['_endY']();
        this._disposables.push(ko.computed(() => {
            if (control.startBand()) {
                const startBandSurface = findSurface(control.startBand.peek());
                currentAbsoluteStartY = this._isBandCollapsed(startBandSurface) ? startBandSurface.absolutePosition.y() : this['_startY']() + startBandSurface.absolutePosition.y();
            }
            this['_y'](currentAbsoluteStartY);
        }));
        this._disposables.push(ko.computed(() => {
            if (control.endBand()) {
                const endBandSurface = findSurface(control.endBand.peek());
                currentAbsoluteEndY = this._isBandCollapsed(endBandSurface) ? endBandSurface.absolutePosition.y() : this['_endY']() + endBandSurface.absolutePosition.y();
            }
            this['_height'](currentAbsoluteEndY - currentAbsoluteStartY);
        }));
        this._disposables.push(ko.computed(() => {
            const absoluteStartY = this['_y']();
            if (absoluteStartY < 0) {
                this['_y'](0);
                return;
            }
            if (absoluteStartY !== currentAbsoluteStartY) {
                const startBandSurface = findBandByPositionY(this.parent.bandsHolder, absoluteStartY);
                control.startBand(startBandSurface.getControlModel());
                currentAbsoluteStartY = absoluteStartY;
                this['_startY'](currentAbsoluteStartY - startBandSurface.absolutePosition.y());
                this._updateEndPoint(this['_height'](), currentAbsoluteEndY, currentAbsoluteStartY);
            }
        }));
        this._disposables.push(ko.computed(() => {
            const height = this['_height']();
            if (height !== currentAbsoluteEndY - currentAbsoluteStartY) {
                this._updateEndPoint(height, currentAbsoluteEndY, currentAbsoluteStartY);
            }
        }));
        this.template = control.controlType === 'XRCrossBandLine' ? 'dxrd-crossband-line' : 'dxrd-crossband';
        if (this.getControlModel().controlType === 'XRCrossBandLine') {
            this._disposables.push(this.lineCss = ko.pureComputed(() => {
                return $.extend({}, this.cssCalculator.stroke(), this.cssCalculator.strokeWidthWithWidth(), this.cssCalculator.strokeDashArrayWithWidth());
            }));
            this._disposables.push(this.lineWidthCss = ko.pureComputed(() => {
                return $.extend({}, this.cssCalculator.strokeWidthWithWidth());
            }));
        }
        else {
            this._disposables.push(this.leftCss = ko.pureComputed(() => { return this.cssCalculator.crossBandBorder('Left'); }));
            this._disposables.push(this.rightCss = ko.pureComputed(() => { return this.cssCalculator.crossBandBorder('Right'); }));
            this._disposables.push(this.topCss = ko.pureComputed(() => { return this.cssCalculator.crossBandBorder('Top'); }));
            this._disposables.push(this.bottomCss = ko.pureComputed(() => { return this.cssCalculator.crossBandBorder('Bottom'); }));
        }
        this._disposables.push(control.startBand.subscribe((newBand) => {
            if (newBand) {
                const bandSurface = findSurface(newBand);
                this['_y'](bandSurface.absolutePosition.y());
            }
        }));
        this._disposables.push(control.endBand.subscribe((newBand) => {
            if (newBand) {
                const bandSurface = findSurface(newBand);
                let newHeight = bandSurface.absolutePosition.y() - this['_y']();
                if (control.startBand() === newBand) {
                    newHeight += this['_endY']();
                }
                this['_height'](newHeight);
            }
        }));
        this._disposables.push(this.borderWidth = ko.pureComputed(() => {
            return control['borderWidth'] && Math.floor(control['borderWidth']());
        }));
    }
    _isBandCollapsed(bandSurface) {
        return bandSurface && (bandSurface.collapsed() || bandSurface.isSomeParentCollapsed());
    }
    _updateEndPoint(height, currentAbsoluteEndY, currentAbsoluteStartY) {
        currentAbsoluteEndY = currentAbsoluteStartY + height;
        const endBandSurface = findBandByPositionY(this.parent.bandsHolder, currentAbsoluteEndY);
        if (!endBandSurface) {
            return;
        }
        if (endBandSurface.absolutePosition.y.peek() + endBandSurface.height.peek() < currentAbsoluteEndY) {
            endBandSurface['_height'](currentAbsoluteEndY - endBandSurface.absolutePosition.y.peek());
        }
        this._control.endBand(endBandSurface.getControlModel());
        this['_endY'](currentAbsoluteEndY - endBandSurface.absolutePosition.y());
    }
    _getAllBands(band) {
        const bands = band.bandsHolder.bands();
        let innerBands = [];
        bands.forEach((band) => {
            innerBands = innerBands.concat(this._getAllBands(band));
        });
        return [].concat(bands, innerBands);
    }
    _getIntersectionBands(currentRect, bands) {
        const bandSurfaces = bands.filter((band) => { return this.isThereIntersection(currentRect, band.absoluteRect()); });
        let intersectionBands = [].concat(bandSurfaces);
        bandSurfaces.forEach((band) => {
            intersectionBands = intersectionBands.concat(this._getAllBands(band));
        });
        intersectionBands = intersectionBands.filter((band) => {
            return band.controls && band.controls().length > 0;
        });
        return intersectionBands;
    }
    _getCrossBandBoxSides() {
        const currentRect = this._unitAbsoluteRect, borderWidth = this.getControlModel()['borderWidth']();
        return [{ top: currentRect.top, left: currentRect.left, height: borderWidth, width: currentRect.width },
            { top: currentRect.bottom - borderWidth, left: currentRect.left, height: borderWidth, width: currentRect.width },
            { top: currentRect.top, left: currentRect.left, height: currentRect.height, width: borderWidth },
            { top: currentRect.top, left: currentRect.right - borderWidth, height: currentRect.height, width: borderWidth }];
    }
    get _unitAbsoluteRect() {
        const startBandSurface = this._control.startBand() && this._control.startBand().surface, endBandSurface = this._control.endBand() && this._control.endBand().surface;
        const startBandTop = startBandSurface ? startBandSurface['_unitAbsoluteRect'].top : 0;
        const endBandTop = endBandSurface ? endBandSurface['_unitAbsoluteRect'].top : 0;
        const top = startBandTop + this._control.startPoint.y(), bottom = endBandTop + this._control.endPoint.y();
        return {
            top: top, left: this._control.startPoint.x(),
            right: this._control.startPoint.x() + this._control.width(), bottom: bottom,
            width: this._control.width(), height: bottom - top
        };
    }
    canSetRect(rect) {
        const report = this._control.root;
        if (report && report.language() !== defaultCulture) {
            const endBand = findBandByPositionY(this.parent.bandsHolder, rect.top + rect.height);
            if (this._control.endBand() !== endBand._control)
                return false;
            const startBand = findBandByPositionY(this.parent.bandsHolder, rect.top);
            if (this._control.startBand() !== startBand._control)
                return false;
        }
        return true;
    }
    isThereIntersectionWithControls() {
        let isThereIntersection = false;
        const currentRect = this._unitAbsoluteRect, intersectionBands = this._getIntersectionBands(currentRect, this.parent && this.parent.getChildrenCollection()()), rectangles = this.getControlModel().controlType === 'XRCrossBandBox' ? this._getCrossBandBoxSides() : [currentRect];
        for (let bandIndex = 0; bandIndex < intersectionBands.length; bandIndex++) {
            for (let rectIndex = 0; rectIndex < rectangles.length; rectIndex++) {
                if (this.isThereIntersectionWithNeighborsCollection(rectangles[rectIndex], intersectionBands[bandIndex].controls().filter((control) => { return !control.isIntersectionDeny; }), '_unitAbsoluteRect')) {
                    isThereIntersection = true;
                    break;
                }
            }
            if (isThereIntersection)
                break;
        }
        return isThereIntersection;
    }
    updateAbsolutePosition() {
        this.absolutePosition.x(this['_endX']());
        this.absolutePosition.y(this['_y']());
        this.afterUpdateAbsolutePosition();
    }
    isThereIntersectionWithCrossBandControls() {
        if (this.getControlModel().controlType === 'XRCrossBandBox') {
            let isThereIntersection = false;
            const rects = this._getCrossBandBoxSides() || [];
            for (let rectIndex = 0; rectIndex < rects.length; rectIndex++) {
                if (super.isThereIntersectionWithCrossBandControls(rects[rectIndex])) {
                    isThereIntersection = true;
                    break;
                }
            }
            return isThereIntersection;
        }
        else {
            return super.isThereIntersectionWithCrossBandControls();
        }
    }
    get parent() {
        return this._getParent();
    }
    container() {
        if (this._control.isCrossbandShow()) {
            return findSurface(this.getControlModel().startBand());
        }
        else {
            return null;
        }
    }
    _getChildrenHolderName() {
        return null;
    }
}
XRCrossBandSurface._unitProperties = {
    _x: (o) => {
        return o.startPoint.x;
    },
    _width: (o) => {
        return o.width;
    },
    _startY: (o) => {
        return o.startPoint.y;
    },
    _endX: (o) => {
        return o.endPoint.x;
    },
    _endY: (o) => {
        return o.endPoint.y;
    }
};
