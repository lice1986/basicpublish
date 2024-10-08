﻿/**
* DevExpress Analytics (core\utils\_utils.parseZoom.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function parseZoom(val) {
    const _value = Math.round(parseInt(val.replace('%', ''))) / 100;
    if (!_value)
        return 1;
    if (_value >= 5)
        return 5;
    if (_value <= 0.1)
        return 0.1;
    return _value;
}
