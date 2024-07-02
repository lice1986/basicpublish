﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_tocUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { findFirstItemMatchesCondition } from '@devexpress/analytics-core/analytics-internal';
export function getExistTableOfContents(band) {
    const toc = findFirstItemMatchesCondition(band.controls(), (item) => item.controlType === 'XRTableOfContents');
    return toc;
}