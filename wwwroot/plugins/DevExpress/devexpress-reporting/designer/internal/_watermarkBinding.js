﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_watermarkBinding.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { formatUnicorn } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
ko.bindingHandlers['dxWatermark'] = {
    update: (element, valueAccessor, allBindings, viewModel, bindingContext) => {
        const options = valueAccessor();
        const leftMargin = options.forLeftMargin;
        const band = options.band;
        const reportSurface = options.reportSurface;
        const backgroundRect = band.backgroundRect();
        const pxs = (x) => x === 0 ? '0' : (x + 'px');
        const url = (s) => s ? formatUnicorn('url("{0}")', s) : s;
        const size = (w, h) => pxs(w) + ' ' + pxs(h);
        const getOffset = (size, vertical) => {
            const noOffsetKey = vertical ? 'Top' : 'Left', fullOffsetKey = vertical ? 'Bottom' : 'Right', pageSize = vertical ? reportSurface.pageHeight() : reportSurface.pageWidth(), align = options.align;
            return (pageSize - size) * (align.indexOf(noOffsetKey) >= 0 ? 0 : align.indexOf(fullOffsetKey) >= 0 ? 1 : 0.5);
        };
        element.style['height'] = pxs(backgroundRect.height);
        element.style['width'] = pxs(leftMargin ? reportSurface.margins.left() : band._width());
        element.style['background-image'] = url(options.image);
        element.style['opacity'] = (255 - options.transparency) / 255 + '';
        element.style['background-repeat'] = options.tiling ? 'repeat' : 'no-repeat';
        let xOffset = 0, yOffset = 0, { width, height } = reportSurface._watermarkImageNaturalSize();
        switch (options.viewMode) {
            case 'Clip':
                width *= reportSurface.zoom();
                height *= reportSurface.zoom();
                xOffset = getOffset(width, false);
                yOffset = getOffset(height, true);
                element.style['background-size'] = size(width, height);
                break;
            case 'Stretch':
                xOffset = yOffset = 0;
                element.style['background-size'] = size(reportSurface.pageWidth(), reportSurface.pageHeight());
                break;
            case 'Zoom':
                const xRatio = reportSurface.pageWidth() / width, yRatio = reportSurface.pageHeight() / height;
                let ratio;
                if (xRatio < yRatio) {
                    ratio = xRatio;
                    xOffset = 0;
                    yOffset = getOffset(ratio * height, true);
                }
                else {
                    ratio = yRatio;
                    xOffset = getOffset(ratio * width, false);
                    yOffset = 0;
                }
                element.style['background-size'] = size(width * ratio, height * ratio);
                break;
        }
        element.style['background-position-y'] = pxs(yOffset - backgroundRect.top);
        element.style['background-position-x'] = pxs(xOffset - (backgroundRect.left || 0) - (leftMargin ? 0 : reportSurface.margins.left()));
    }
};
