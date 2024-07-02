﻿/**
* DevExpress Analytics (widgets\internal\_popupwithautoheight.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import registerComponent from 'devextreme/core/component_registrator';
import dxPopup from 'devextreme/ui/popup';
export class dxPopupWithAutoHeight extends dxPopup {
    _setContentHeight() {
        this['_$popupContent'].css({
            height: '100%'
        });
    }
}
registerComponent('dxPopupWithAutoHeight', dxPopupWithAutoHeight);