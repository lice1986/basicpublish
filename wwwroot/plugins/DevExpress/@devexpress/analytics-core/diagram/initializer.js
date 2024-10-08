﻿/**
* DevExpress Analytics (diagram\initializer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { name, location, size } from './metadata';
import { pageWidth, pageHeight, DiagramViewModel } from './elements/diagramModel';
import { addCultureInfo } from '../property-grid/localization/localization_utils';
import { diagramControlsFactory } from './controlsFactory';
import { DiagramSurface } from './elements/diagramSurface';
import { createDesigner } from '../core/utils/_designerInitializer';
import { ConnectionPointDragHandler } from './dragDrop/connectionPointDragHandler';
import { ConnectingPointDragHandler } from './dragDrop/connectingPointDragHandler';
import { updateSurfaceContentSize } from '../core/internal/_surfaceHelpers';
import { addDisposeCallback } from '../serializer/_internal';
import { registerControls } from './controlRegistrator';
export const groups = {
    'Appearance': { info: [] },
    'Behavior': { info: [] },
    'Design': { info: [name] },
    'Layout': { info: [location, size, pageWidth, pageHeight] }
};
export function createDiagramDesigner(element, diagramSource, localization, rtl) {
    if (localization) {
        addCultureInfo({
            messages: localization
        });
    }
    registerControls();
    const diagram = ko.pureComputed(() => { return new DiagramViewModel(diagramSource()); }), surface = ko.pureComputed(() => {
        const surface = new DiagramSurface(diagram());
        return surface;
    });
    const designerModel = createDesigner(diagram, surface, diagramControlsFactory, groups, undefined, undefined, rtl);
    designerModel.connectionPointDragHandler = new ConnectionPointDragHandler(surface, designerModel.selection, designerModel.undoEngine, designerModel.snapHelper, designerModel.dragHelperContent);
    designerModel.connectingPointDragHandler = new ConnectingPointDragHandler(surface, designerModel.selection, designerModel.undoEngine, designerModel.snapHelper, designerModel.dragHelperContent);
    designerModel.isLoading(false);
    designerModel.selection.focused(surface());
    $.fn.constructor(element).children().remove();
    ko.applyBindings(designerModel, element);
    const updateSurfaceContentSize_ = updateSurfaceContentSize(designerModel.surfaceSize, element);
    const onResize = () => {
        updateSurfaceContentSize_();
    };
    window.addEventListener('resize', onResize);
    addDisposeCallback(element, function () {
        window.removeEventListener('resize', onResize);
    });
    designerModel.tabPanel.width.subscribe(() => {
        updateSurfaceContentSize_();
    });
    updateSurfaceContentSize_();
    return designerModel;
}
