﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_crossTabDragUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { WizardDragDropHandler } from '@devexpress/analytics-core/analytics-internal';
import { TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { FieldListController } from '../../internal/fieldlist/_fieldListController';
export declare class CrossTabWizardFieldListController extends FieldListController {
    isDraggable(item: TreeListItemViewModel): boolean;
    showIconsForChildItems: () => boolean;
}
export declare class CrossTabWizardDragDropHandler extends WizardDragDropHandler {
    doStopDrag(ui: any, _: any): void;
}
