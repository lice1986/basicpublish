﻿/**
* DevExpress Analytics (query-builder\widgets\masterdetaileditor\_masterDetailEditorPopupManager.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PopupService } from '../../../property-grid/internal/_popupService';
export declare class MasterDetailEditorPopupManager {
    private _popupService;
    private _action;
    private _popupItems;
    private _updateActions;
    constructor(target: any, popupService: PopupService, action: string, popupItems: {
        name: any;
    }[]);
    target: any;
    showPopup: (_: any, element: any) => void;
}
