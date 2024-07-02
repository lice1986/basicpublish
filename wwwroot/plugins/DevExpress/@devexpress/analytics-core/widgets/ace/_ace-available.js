﻿/**
* DevExpress Analytics (widgets\ace\_ace-available.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import ace from 'ace-builds/src-noconflict/ace';
export const aceAvailable = createGlobalAceVariableFunc();
function createGlobalAceVariableFunc() {
    let currentValue;
    return (newVal) => {
        if (newVal !== undefined)
            currentValue = newVal;
        return currentValue === undefined ? !!ace : currentValue;
    };
}
