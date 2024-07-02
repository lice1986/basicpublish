﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_settings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { createGlobalModuleVariableFunc } from '@devexpress/analytics-core/analytics-internal';
import dxSelectBox from 'devextreme/ui/select_box';
export const reportStorageWebIsRegister = createGlobalModuleVariableFunc(false);
export const limitation = createGlobalModuleVariableFunc(false);
const orig_optionValuesEqual = dxSelectBox.prototype['_optionValuesEqual'];
dxSelectBox['redefine']({
    _optionValuesEqual: function (optionName, oldValue, newValue) {
        if (optionName === 'value' && (oldValue instanceof ElementViewModel) && (newValue instanceof ElementViewModel)) {
            return oldValue === newValue;
        }
        return orig_optionValuesEqual.apply(this, arguments);
    }
});