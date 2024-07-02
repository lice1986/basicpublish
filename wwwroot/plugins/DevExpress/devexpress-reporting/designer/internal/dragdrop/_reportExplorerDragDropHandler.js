﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_reportExplorerDragDropHandler.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Rectangle } from '@devexpress/analytics-core/analytics-elements';
import { FormattingRuleLink } from '../../controls/properties/formattingrules';
import { ReportSurface } from '../../controls/xrReport';
import { ObjectExplorerDragDropHandler } from './_objectExplorerDragDropHandler';
import { ReportControlsDragDropHelper } from './_reportControlsDragDropHelper';
import { selectTreeListItem } from './_utils';
export class ReportExplorerDragDropHandler extends ObjectExplorerDragDropHandler {
    constructor(canAddItems, surface, selection, undoEngine, dragHelperContent) {
        super(canAddItems, surface, selection, undoEngine, dragHelperContent);
        this._isStyle = (item) => item.data && item.data.specifics === 'stylemodel';
        this._isFormatingRule = (item) => item.data && item.data.specifics === 'formattingrule';
        this._isReportControl = (item) => !this._isStyle(item) && !this._isFormatingRule(item);
        this.cursor = 'arrow';
        this.alwaysAlt = true;
        this.containment = '.dxrd-designer';
        this['cursorAt'] = {
            top: 0,
            left: 0
        };
        this.reportControlsDragDropHelper = new ReportControlsDragDropHelper(this.dragHelperContent, this.undoEngine && this.undoEngine());
        this.helper = (draggable, event) => {
            const item = draggable;
            selectTreeListItem(item, event);
            if (this._isReportControl(item)) {
                this.reportControlsDragDropHelper.helper(draggable, event);
            }
            else {
                const rect = new Rectangle(12, 12, 12, 12);
                let templateId = '';
                if (this._isStyle(item)) {
                    rect.className = 'dxrd-image-ghost-stylemodel';
                    templateId = 'dxrd-svg-reportexplorer-style';
                }
                else if (this._isFormatingRule(item)) {
                    rect.className = 'dxrd-image-ghost-formattingrule';
                    templateId = 'dxrd-svg-reportexplorer-formatting_rule';
                }
                this.dragHelperContent.reset();
                dragHelperContent.setContent(rect, (templateId ? { template: templateId } : null));
                this._size.width(12);
                this._size.height(12);
            }
        };
    }
    dispose() {
        super.dispose();
        this.reportControlsDragDropHelper.dispose();
    }
    startDrag(draggable) {
        if (this._isReportControl(draggable)) {
            this.reportControlsDragDropHelper.start(draggable);
        }
        super.startDrag(draggable);
    }
    doStopDrag(uiElement, draggable, event) {
        this.reportControlsDragDropHelper.started && this.reportControlsDragDropHelper.clearDroppableClasses();
        this.dragHelperContent.reset();
        if (this.dragHelperContent.isLocked())
            return;
        if (this.reportControlsDragDropHelper.started) {
            this.selection.initialize(this.reportControlsDragDropHelper.stop());
        }
        else if (this.selection.dropTarget && !this.selection.dropTarget.locked) {
            if (this.selection.dropTarget instanceof ReportSurface)
                return;
            const position = this._getAbsoluteSurfacePosition(uiElement);
            this.selection.dropTarget.underCursor().x = position.left - this.selection.dropTarget['absolutePosition'].x();
            this.selection.dropTarget.underCursor().y = position.top - this.selection.dropTarget['absolutePosition'].y();
            if (!draggable || !draggable.data)
                return;
            if (this.surface().isFit && this.surface().isFit(this.selection.dropTarget) || this.selection.dropTarget.underCursor().isOver) {
                if (draggable.data.specifics === 'stylemodel') {
                    this.selection.dropTarget.getControlModel()['styleName'] && this.selection.dropTarget.getControlModel()['styleName'](draggable.data.displayName);
                }
                else if (draggable.data.specifics === 'formattingrule') {
                    this.selection.dropTarget.getControlModel()['formattingRuleLinks'] && this.selection.dropTarget.getControlModel()['formattingRuleLinks'].push(FormattingRuleLink.createNew(draggable.data.data));
                }
            }
        }
    }
}