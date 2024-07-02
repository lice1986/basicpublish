﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_reportToolboxDragDropHandler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PaddingModel, Rectangle, Size } from '@devexpress/analytics-core/analytics-elements';
import { findSurface, ToolboxDragDropHandler } from '@devexpress/analytics-core/analytics-internal';
import * as $ from 'jquery';
import { isHeaderOrFooterBandType } from '../../controls/utils/_headOrFooterBandType';
import { getExistTableOfContents } from '../../controls/utils/_tocUtils';
import { recalculateUnit } from '../_utils';
import { dragDropComponentAdded } from './_utils';
export class ReportToolboxDragDropHandler extends ToolboxDragDropHandler {
    constructor(surface, selection, undoEngine, snapHelper, dragHelperContent, controlsFactory, onComponentAdded) {
        super(surface, selection, undoEngine, snapHelper, dragHelperContent, controlsFactory);
        this._wholeWideControls = ['XRTableOfContents', 'XRPdfContent'];
        this.onComponentAdded = (e) => { onComponentAdded && onComponentAdded(e); };
    }
    dispose() {
        this.surface = null;
        this.dragHelperContent = null;
        this.snapHelper = null;
    }
    helper(draggable) {
        super.helper(draggable);
        const toolboxItem = draggable;
        if (this._wholeWideControls.indexOf(toolboxItem.type) !== -1) {
            const width = this.surface().pageWidth() - (this.surface().margins.right() + this.surface().margins.left());
            const height = toolboxItem.type === 'XRTableOfContents' ? 46 : 23;
            const size = new Size(width, height);
            this.recalculateSize(size);
            this.dragHelperContent.reset();
            this.dragHelperContent.setContent(new Rectangle(0, 0, width, this._size.height()));
        }
    }
    _processProperty(propertyName, target, callback) {
        if (target instanceof Object && !$.isFunction(target)) {
            !!target[propertyName] && callback(target);
            Object.keys(target).forEach((name) => {
                if (target[name] instanceof Object && !$.isFunction(target[name])) {
                    this._processProperty(propertyName, target[name], callback);
                }
            });
        }
    }
    doStopDrag(ui, draggable) {
        const reportSurface = this.surface();
        const toolboxItem = $.extend(true, {}, draggable);
        this._processProperty('@Padding', toolboxItem.info, (target) => {
            const model = PaddingModel.from(target['@Padding']);
            PaddingModel.unitProperties.forEach((name) => {
                model[name](model[name]() * reportSurface.dpi() / 100);
            });
            model._set('dpi', reportSurface.dpi());
            target['@Padding'] = model.toString();
        });
        super.doStopDrag(ui, toolboxItem);
    }
    addControl(control, dropTargetSurface, size) {
        if (control.controlType === 'XRTableOfContents') {
            const dropTargetModel = dropTargetSurface.getControlModel();
            if (!isHeaderOrFooterBandType(dropTargetModel) || !!getExistTableOfContents(dropTargetModel)) {
                const reportSurface = this.surface();
                const reportModel = reportSurface.getControlModel();
                const targetBand = reportModel.getOrCreateBandForToC().band;
                if (!targetBand)
                    return;
                dropTargetSurface = findSurface(targetBand);
            }
            if (!dropTargetSurface)
                return;
            const band = dropTargetSurface.getControlModel();
            const tocModel = control;
            tocModel.allLevels().forEach((lvl) => {
                lvl.height(recalculateUnit(lvl.height(), band.dpi()));
            });
        }
        super.addControl(control, dropTargetSurface, size);
        const parent = dropTargetSurface.getControlModel();
        dragDropComponentAdded(control, parent);
        this.onComponentAdded({ parent: parent, model: control });
    }
}