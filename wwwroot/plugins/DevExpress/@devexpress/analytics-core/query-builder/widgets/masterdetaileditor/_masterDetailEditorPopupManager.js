﻿/**
* DevExpress Analytics (query-builder\widgets\masterdetaileditor\_masterDetailEditorPopupManager.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export class MasterDetailEditorPopupManager {
    constructor(target, popupService, action, popupItems) {
        this.showPopup = (_, element) => {
            if (this._popupService['subscription']) {
                this._popupService['subscription'].dispose();
            }
            this._popupService.title('');
            this._updateActions(this.target);
            this._popupService.target(element);
            this._popupService.visible(true);
        };
        this.target = target;
        this._action = action;
        this._popupService = popupService;
        this._popupItems = popupItems;
    }
    _updateActions(viewModel) {
        this._popupService['subscription'] = this._popupService.visible.subscribe((newVal) => {
            this.target.isSelected && this.target.isSelected(newVal);
        });
        this._popupService.data({
            data: this._popupItems,
            template: 'dx-filtereditor-popup-common',
            click: (data) => {
                viewModel[this._action](data);
                this._popupService.visible(false);
            }
        });
    }
}
