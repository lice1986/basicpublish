﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_selectionDragDropHandler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SelectionDragDropHandler as AnalyticSelectionDragDropHandler } from '@devexpress/analytics-core/analytics-internal';
import { XRSubreportSurface } from '../../controls/xrSubreport';
export class SelectionDragDropHandler extends AnalyticSelectionDragDropHandler {
    constructor(_canAddItems, surface, selection, undoEngine, snapHelper, dragHelperContent) {
        super(surface, selection, undoEngine, snapHelper, dragHelperContent);
        this._canAddItems = _canAddItems;
    }
    _localizationCanDrop(dropTarget, controlModel) {
        const locked = !this._canAddItems() && dropTarget.getControlModel() !== controlModel.parentModel();
        return !locked;
    }
    getLocation(adjustedTarget, item) {
        const location = super.getLocation(adjustedTarget, item);
        if (item instanceof XRSubreportSurface)
            return item.processLocation(location);
        return location;
    }
    canDrop(dropTarget, controlModel, metaData) {
        const canDrop = super.canDrop(dropTarget, controlModel, metaData);
        return canDrop && this._localizationCanDrop(dropTarget, controlModel);
    }
}
