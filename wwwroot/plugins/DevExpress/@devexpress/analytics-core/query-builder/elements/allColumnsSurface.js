﻿/**
* DevExpress Analytics (query-builder\elements\allColumnsSurface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SurfaceElementBase } from '../../core/elements/baseSurface';
import { DragDropHandler } from '../../core/dragDrop/_dragDropHandler';
export class AllColumnsSurface extends SurfaceElementBase {
    constructor(control, context) {
        super(control, context, null);
        this.template = 'dxqb-table-asterisk-field';
        this.toggleSelected = () => {
            this.getControlModel().selected(!this.getControlModel().selected());
        };
        this.selectedWrapper = ko.pureComputed(() => {
            return this.getControlModel().selected();
        });
        this.isOverAsterisk = ko.pureComputed(() => {
            return this.underCursor().isOver && !DragDropHandler.started();
        });
        this.cssClasses = () => {
            return {
                'dxd-state-active': this.selected,
                'dxd-state-hovered': this.isOverAsterisk()
            };
        };
    }
}
