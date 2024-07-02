﻿/**
* DevExpress Analytics (core\utils\_units.roundingXDecimals.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function roundingXDecimals(value, useFloor = false, x = 3) {
    return (useFloor ? Math.floor : Math.round)(value * Math.pow(10, x)) / Math.pow(10, x);
}
