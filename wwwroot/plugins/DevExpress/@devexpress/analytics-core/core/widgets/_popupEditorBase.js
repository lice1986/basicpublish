﻿/**
* DevExpress Analytics (core\widgets\_popupEditorBase.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { getLocalization } from '../../property-grid/localization/_localization';
import { StringId } from '../../property-grid/localization/_localizationStringIds';
import { Disposable } from '../../serializer/disposable';
export class PopupEditorBase extends Disposable {
    constructor() {
        super();
        this.popupVisible = ko.observable(false);
        this.buttonItems = [];
        this._createMainPopupButtons();
    }
    _createMainPopupButtons() {
        const self = this;
        this._disposables.push(this._disableSaveButton = ko.pureComputed(() => !self.canSave()));
        this.buttonItems = [
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: this.saveLocalization, type: 'default', stylingMode: 'contained', onClick: function (sender) { self.save(sender); }, disabled: this._disableSaveButton } },
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: this.cancelLocalization, type: 'normal', stylingMode: 'contained', onClick: function () { self.close(); } } }
        ];
        this._disposables.push(this._disableSaveButton);
    }
    canSave() {
        return true;
    }
    save(sender) {
        this.popupVisible(false);
    }
    close() {
        this.popupVisible(false);
    }
    get cancelLocalization() {
        return getLocalization('Cancel', StringId.DataAccessBtnCancel);
    }
    get saveLocalization() {
        return getLocalization('OK', StringId.DataAccessBtnOK);
    }
}
