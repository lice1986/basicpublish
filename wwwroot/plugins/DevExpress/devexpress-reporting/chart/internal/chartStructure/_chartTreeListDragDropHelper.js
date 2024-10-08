﻿/**
* DevExpress HTML/JS Reporting (chart\internal\chartStructure\_chartTreeListDragDropHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReorderTreeListDragDropHelper } from '@devexpress/analytics-core/analytics-widgets-internal';
export class ChartTreeListDragDropHelper extends ReorderTreeListDragDropHelper {
    getSiblings() {
        return this._draggableModel.parent;
    }
    stop() {
        super.stop();
        if (this.canDrop())
            this.reorderSiblings();
    }
}
