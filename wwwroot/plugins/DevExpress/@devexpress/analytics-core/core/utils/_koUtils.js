﻿/**
* DevExpress Analytics (core\utils\_koUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export const koUtils = {
    isSubscribable: (value) => {
        return typeof value === 'function' && 'subscribe' in value;
    },
    isComputed: (value) => {
        return koUtils.isSubscribable(value) && 'dispose' in value;
    },
    unwrap: (value) => {
        return koUtils.isSubscribable(value) ? value() : value;
    }
};