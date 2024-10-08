﻿/**
* DevExpress Analytics (diagram\bindings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SnapLinesHelper } from '../core/snapLines/_snapLinesHelper';
import { addDisposeCallback } from '../serializer/_internal';
import { extend } from '../serializer/_utils';
import { Draggable } from '../core/internal/_draggable';
import { convertFromCssPixelUnits } from '../core/internal/_utils.unitsConvertation';
ko.bindingHandlers['routeLineDraggable'] = {
    init: (element, valueAccessor) => {
        let startDragPosition = null;
        const values = valueAccessor(), options = extend({ snap: '.dxrd-drag-snap-line', snapTolerance: SnapLinesHelper.snapTolerance }, ko.unwrap(values), {
            start: function (event, uiElement) {
                values.starting();
            },
            stop: function (event, uiElement) {
                values.stopped();
            },
            drag: function (event, uiElement) {
                startDragPosition = startDragPosition || { left: convertFromCssPixelUnits(uiElement.dataset.leftPosition), top: convertFromCssPixelUnits(uiElement.dataset.topPosition) };
                const dragDeltaLeft = startDragPosition && event.pageX - startDragPosition.left;
                const dragDeltaTop = startDragPosition && event.pageY - startDragPosition.top;
                values.forceResize({ delta: { dx: dragDeltaLeft || 0, dy: dragDeltaTop || 0 } });
            }
        });
        const draggable = new Draggable(element, options);
        addDisposeCallback(element, () => {
            draggable.dispose();
            element = null;
        });
    }
};
