﻿/**
* DevExpress Analytics (serializer\native\deserialization.utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function deserializeArray(model, creator) {
    const result = Object.keys(model || {}).map(propertyName => creator(model[propertyName]));
    return result;
}
