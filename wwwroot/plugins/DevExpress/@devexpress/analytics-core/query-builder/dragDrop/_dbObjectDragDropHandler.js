﻿/**
* DevExpress Analytics (query-builder\dragDrop\_dbObjectDragDropHandler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DragDropHandler } from '../../core/dragDrop/_dragDropHandler';
import { controlsFactory } from '../utils/controlsFactory';
import { Size } from '../../core/elements/size';
import { Rectangle } from '../../core/elements/rectangle';
import { findSurface } from '../../core/internal/_surfaceHelpers';
import { extend } from '../../serializer/_utils';
export class DbObjectDragDropHandler extends DragDropHandler {
    constructor(surface, selection, _undoEngine, snapHelper, dragHelperContent) {
        super(surface, selection, _undoEngine, snapHelper, dragHelperContent);
        this._undoEngine = _undoEngine;
        this._query = () => this._querySurface().getControlModel();
        this.getDropCallback = (undoEngine, suggestLocation) => ((item, query) => {
            const newControl = query.createChild(extend({ '@ControlType': 'Table', '@Name': item.data.name }, controlsFactory.controlsMap['Table'].defaultVal));
            if (newControl.isInitialized()) {
                query.tryToCreateRelationsByFK(newControl);
            }
            else {
                newControl.isInitialized.subscribe(() => {
                    undoEngine().start();
                    query.tryToCreateRelationsByFK(newControl);
                    undoEngine().end();
                });
            }
            if (suggestLocation) {
                this.suggestLocation(newControl, query);
            }
            return newControl;
        });
        this._querySurface = surface;
        this.cursor = 'arrow';
        this.containment = '.dxqb-designer';
        this['cursorAt'] = {
            top: 0,
            left: 0
        };
        this['helper'] = (draggable) => {
            super.helper(draggable);
            this.recalculateSize(Size.fromString('199, 123'));
            dragHelperContent.setContent(new Rectangle(0, 0, this._size.width(), this._size.height()));
        };
    }
    suggestLocation(newControl, query) {
        const posX = Math.max.apply(null, query.tables.peek()
            .filter(t => t !== newControl)
            .map((t) => t.location.x.peek() + t.size.width.peek() * 3 / 2)
            .concat([30]));
        newControl.location.x(posX);
        newControl.location.y(65);
    }
    startDrag(draggable) {
        if (draggable && draggable.name) {
            this._query().dbSchemaProvider.getDbTable(draggable.name);
        }
    }
    doStopDrag(uiElement, _) {
        this.dragHelperContent.reset();
        if (this.selection.dropTarget) {
            const position = this._getAbsoluteSurfacePosition(uiElement);
            this._querySurface().underCursor().x = position.left - this._querySurface()['absolutePosition'].x();
            this._querySurface().underCursor().y = position.top - this._querySurface()['absolutePosition'].y();
            const item = ko.dataFor(uiElement);
            const control = this.getDropCallback(this._undoEngine, false)(item, this._query());
            this.addControl(control, this._querySurface(), this._size);
        }
    }
    addControl(control, dropTargetSurface, size) {
        dropTargetSurface.getControlModel().addChild(control);
        const controlSurface = findSurface(control);
        if (!controlSurface)
            return;
        controlSurface.rect({ left: dropTargetSurface.underCursor().x, top: dropTargetSurface.underCursor().y, width: size.width() });
        this.selection.initialize(controlSurface);
    }
}
