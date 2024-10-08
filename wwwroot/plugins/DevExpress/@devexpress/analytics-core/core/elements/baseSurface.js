﻿/**
* DevExpress Analytics (core\elements\baseSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
import { createUnitProperties } from '../utils/_units';
import { CssCalculator } from '../internal/_cssCalculator';
import { createObservableReverseArrayMapCollection, createObservableArrayMapCollection } from '../utils/_arrayutils';
import { HoverInfo } from '../internal/_hoverInfo';
import { Point } from './point';
import { extend } from '../../serializer/_utils';
export class SurfaceElementArea extends Disposable {
    constructor(control, context, unitProperties) {
        super();
        this._createSurface = (item) => {
            return item['surface'] || new (item.getControlFactory()).controlsMap[item.controlType].surfaceType(item, this._context);
        };
        this.preInitProperties(control, context, unitProperties);
        this._control = control;
        this._context = context;
        control['surface'] = this;
        if (this._context) {
            createUnitProperties(control, this, unitProperties, this._context.measureUnit, this._context.zoom, (property) => { this._disposables.push(property); });
        }
        this._x = this._x || ko.observable(0);
        this._y = this._y || ko.observable(0);
        this._width = this._width || ko.observable(0);
        this._height = this._height || ko.observable(0);
        const container = ko.pureComputed(() => this.container());
        this._disposables.push(container);
        this._container = container();
        this._disposables.push(container.subscribe((value) => {
            if (this._container !== value && this.rtlLayout()) {
                const x = this._getX();
                this._container = value;
                this._setX(x);
            }
            else {
                this._container = value;
            }
        }));
        const x = ko.computed({
            read: () => this._getX(),
            write: (value) => {
                this._setX(value);
            }
        }), y = this._y, width = this._width, height = this._height;
        this['position'] = {
            top: y,
            left: x,
            width: width,
            height: height,
            lineHeight: height
        };
        this._disposables.push(x);
        const _rect = ko.observable();
        this._disposables.push(ko.computed(() => {
            if (!this._control.update()) {
                _rect({ top: y(), left: x(), right: x() + width(), bottom: y() + height(), width: width(), height: height() });
            }
        }));
        this._disposables.push(this.rect = ko.pureComputed({
            read: () => {
                return _rect();
            },
            write: (newRect) => {
                newRect = this.beforeRectUpdated(newRect);
                this._control.update(true);
                try {
                    if (newRect.left !== undefined) {
                        this._setX(newRect.left, newRect.width);
                    }
                    else if (newRect.width !== undefined) {
                        this._setX(x(), newRect.width);
                    }
                    if (newRect.top !== undefined) {
                        y(newRect.top);
                    }
                    if (newRect.right !== undefined && newRect.left === undefined && newRect.width === undefined) {
                        width(newRect.right - x());
                    }
                    if (newRect.bottom !== undefined && newRect.top === undefined) {
                        height(newRect.bottom - y());
                    }
                    if (newRect.right !== undefined && newRect.left !== undefined && newRect.width === undefined) {
                        width(newRect.right - newRect.left);
                    }
                    if (newRect.bottom !== undefined && newRect.top !== undefined) {
                        height(newRect.bottom - newRect.top);
                    }
                    if (newRect.width !== undefined) {
                        width(newRect.width);
                    }
                    if (newRect.height !== undefined) {
                        height(newRect.height);
                    }
                }
                finally {
                    this._control.update(false);
                }
            }
        }));
    }
    _getX() {
        if (this.rtlLayout() && this._container) {
            return this._container.rect().width - this._x() - this._width();
        }
        else {
            return this._x();
        }
    }
    _setX(value, width) {
        width = width || this._width();
        if (this.rtlLayout() && this._container) {
            this._x(this._container.rect().width - value - width);
        }
        else {
            this._x(value);
        }
    }
    getRoot() {
        return this._context;
    }
    preInitProperties(control, context, unitProperties) { }
    container() {
        return this['parent'];
    }
    beforeRectUpdated(rect) {
        rect.left = rect.left < 0 ? 0 : rect.left;
        rect.top = rect.top < 0 ? 0 : rect.top;
        return rect;
    }
    rtlLayout() {
        return !!ko.unwrap(this._context.rtl);
    }
    getControlModel() {
        return this._control;
    }
}
export class SurfaceElementBase extends SurfaceElementArea {
    constructor(control, context, unitProperties) {
        super(control, context, unitProperties);
        this._countSelectedChildren = ko.observable(0);
        this.focused = ko.observable(false);
        this.selected = ko.observable(false);
        this.underCursor = ko.observable(new HoverInfo());
        this.allowMultiselect = true;
        this.absolutePosition = new Point(0, 0);
        this.getControlModel = () => {
            return control;
        };
        this.cssCalculator = new CssCalculator(control, context.rtl);
        if (this._getChildrenHolderName() && control[this._getChildrenHolderName()]) {
            const collection = ko.observableArray();
            if (this._getChildrenHolderName() === 'controls') {
                this._disposables.push(createObservableReverseArrayMapCollection(control[this._getChildrenHolderName()], collection, this._createSurface));
            }
            else {
                this._disposables.push(createObservableArrayMapCollection(control[this._getChildrenHolderName()], collection, this._createSurface));
            }
            this[this._getChildrenHolderName()] = collection;
            this._disposables.push(this.isSelected = ko.pureComputed(() => {
                if (!(this.focused() || this.selected())) {
                    return collection().some((item) => {
                        return item.isSelected();
                    });
                }
                return true;
            }));
        }
        else {
            this._disposables.push(this.isSelected = ko.pureComputed(() => {
                return this.focused() || this.selected();
            }));
        }
        this._disposables.push(this.css = ko.pureComputed(() => {
            return extend({}, this.cssCalculator.fontCss(), this.cssCalculator.foreColorCss(), this.cssCalculator.backGroundCss(), this.cssCalculator.textAlignmentCss());
        }));
        this._disposables.push(this.contentCss = ko.pureComputed(() => {
            return extend({}, this.cssCalculator.fontCss(), this.cssCalculator.foreColorCss(), this.cssCalculator.textAlignmentCss(), this.cssCalculator.angle(), this.cssCalculator.wordWrapCss(), this.cssCalculator.paddingsCss());
        }));
        this._disposables.push(ko.computed(() => {
            this.updateAbsolutePosition();
        }));
        this._disposables.push(this.absoluteRect = ko.pureComputed(() => {
            const controlRect = this.rect(), absolutePositionY = this.absolutePosition.y(), absolutePositionX = this.absolutePosition.x();
            return { top: absolutePositionY, left: absolutePositionX, right: absolutePositionX + controlRect.width, bottom: absolutePositionY + controlRect.height, width: controlRect.width, height: controlRect.height };
        }));
        this.locked = control['lockedInUserDesigner'] ? control['lockedInUserDesigner']() : false;
    }
    _getParent() {
        return this.getControlModel().parentModel() && this.getControlModel().parentModel().surface;
    }
    get parent() {
        return this._getParent();
    }
    checkParent(surfaceParent) {
        return this.parent === surfaceParent;
    }
    _getChildrenHolderName() { return 'controls'; }
    getChildrenCollection() {
        return this._getChildrenHolderName() && this[this._getChildrenHolderName()] || ko.observableArray([]);
    }
    updateAbsolutePosition() {
        if (this.parent && this.parent.absolutePosition) {
            const parentX = this.parent.absolutePosition.x(), parentY = this.parent.absolutePosition.y(), newX = parentX + this.rect().left, newY = parentY + this.rect().top;
            this.absolutePosition.x(newX);
            this.absolutePosition.y(newY);
        }
        else {
            this.absolutePosition.x(0);
            this.absolutePosition.y(0);
        }
        this.afterUpdateAbsolutePosition();
    }
    canDrop() { return !this.locked && this._control.getMetaData().isContainer; }
    afterUpdateAbsolutePosition() {
    }
    findNextSelection() {
        const parentSurface = this.parent;
        let targetSurface = parentSurface;
        if (parentSurface) {
            const childrenCollection = parentSurface.getChildrenCollection()();
            const indexInCollection = childrenCollection.indexOf(this);
            if (indexInCollection === -1 && childrenCollection.length > 0) {
                targetSurface = childrenCollection[childrenCollection.length - 1];
            }
            else if (childrenCollection.length > 1 && indexInCollection === childrenCollection.length - 1) {
                targetSurface = childrenCollection[indexInCollection - 1];
            }
            else if (childrenCollection.length > 1 && indexInCollection === 0) {
                targetSurface = childrenCollection[childrenCollection.length - 1];
            }
            else if (childrenCollection.length > 1) {
                targetSurface = childrenCollection[childrenCollection.length - 1];
            }
            else if (indexInCollection === -1 && targetSurface.parent && targetSurface.parent.getChildrenCollection()().indexOf(targetSurface) === -1) {
                targetSurface = targetSurface.findNextSelection();
            }
        }
        return targetSurface;
    }
}
