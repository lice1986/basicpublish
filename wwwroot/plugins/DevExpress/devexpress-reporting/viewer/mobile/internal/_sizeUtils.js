﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_sizeUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function updatePreviewContentSizeMobile(mobilePreview, $root) {
    return () => {
        const height = $root.outerHeight();
        const width = $root.outerWidth();
        mobilePreview.previewWrapperSize = { width, height };
    };
}
