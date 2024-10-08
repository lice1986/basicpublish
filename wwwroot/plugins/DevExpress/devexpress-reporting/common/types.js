﻿/**
* DevExpress HTML/JS Reporting (common\types.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function convertMapToKeyValuePair(object) {
    const result = [];
    if (object) {
        Object.keys(object).forEach(key => {
            result.push({ Key: key, Value: object[key] });
        });
    }
    return result;
}
