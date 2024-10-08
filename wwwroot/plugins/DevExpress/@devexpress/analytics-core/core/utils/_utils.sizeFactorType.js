﻿/**
* DevExpress Analytics (core\utils\_utils.sizeFactorType.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function getSizeFactor(width) {
    if (width < 768) {
        return 'xs';
    }
    else if (width < 992) {
        return 'sm';
    }
    else if (width < 1200) {
        return 'md';
    }
    else if (width < 1380) {
        return 'lg';
    }
    else {
        return 'xl';
    }
}
