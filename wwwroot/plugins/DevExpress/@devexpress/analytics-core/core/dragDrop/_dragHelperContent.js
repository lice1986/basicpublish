﻿/**
* DevExpress Analytics (core\dragDrop\_dragHelperContent.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Rectangle } from '../elements/rectangle';
export class DragHelperControlRectangle extends Rectangle {
    constructor(position, left, top, width, height) {
        super(left, top, width, height);
        this.position = position;
    }
}
export class DragHelperContent extends Rectangle {
    constructor(selectionProvider) {
        super();
        this.controls = ko.observableArray([]);
        this.customData = ko.observable({});
        this.template = 'dxrd-drag-helper-source';
        this.isLocked = ko.observable(false);
        this._selectionProvider = selectionProvider;
    }
    get _isEmpty() {
        return this.controls().length === 0;
    }
    reset() {
        this.controls([]);
        this.customData({});
    }
    update(surface) {
        this.left(surface.absolutePosition.x());
        this.top(surface.absolutePosition.y());
        this.width(surface.rect().width);
        this.height(surface.rect().height);
        if (this._isEmpty) {
            const controls = [];
            this._selectionProvider.selectedItems.forEach((item, index) => {
                if (!item.locked && item.parent === surface.parent)
                    controls.push(new DragHelperControlRectangle(index));
            });
            this.controls(controls);
        }
        this.controls().forEach((item) => {
            const surfaceElement = this._selectionProvider.selectedItems[item.position];
            item.left(surfaceElement.absolutePosition.x() - this.left());
            item.top(surfaceElement.absolutePosition.y() - this.top());
            item.width(surfaceElement.rect().width);
            item.height(surfaceElement.rect().height);
        });
    }
    setContent(area, customData = null) {
        if (this._isEmpty)
            this.controls([area]);
        this.left(area.left());
        this.top(area.top());
        this.width(area.width());
        this.height(area.height());
        this.customData(customData);
    }
}
