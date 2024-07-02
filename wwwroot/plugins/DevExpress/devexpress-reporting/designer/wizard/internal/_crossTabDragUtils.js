﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_crossTabDragUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { isList, WizardDragDropHandler } from '@devexpress/analytics-core/analytics-internal';
import { FieldListController } from '../../internal/fieldlist/_fieldListController';
export class CrossTabWizardFieldListController extends FieldListController {
    constructor() {
        super(...arguments);
        this.showIconsForChildItems = () => true;
    }
    isDraggable(item) {
        if (item.data && !isList(item.data))
            return true;
        return false;
    }
}
export class CrossTabWizardDragDropHandler extends WizardDragDropHandler {
    doStopDrag(ui, _) {
        this.dragHelperContent.reset();
        if (this._dropTarget) {
            this._addHandler(this._dropTarget, ko.dataFor(ui).data.name);
        }
    }
}
