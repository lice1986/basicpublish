﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_reportSnapLinesCollector.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SnapLinesCollector } from '@devexpress/analytics-core/analytics-internal';
import { DetailReportBandSurface } from '../../bands/xrDetailReportBand';
export class ReportSnapLinesCollector extends SnapLinesCollector {
    constructor(_rtl) {
        super();
        this._rtl = _rtl;
    }
    _getCollection(parent) {
        if (parent['controls'] && parent['controls']().length > 0) {
            return parent['controls']();
        }
        else if (parent['rows']) {
            return parent['rows']();
        }
        else if (parent['cells']) {
            return parent['cells']();
        }
    }
    _enumerateBandCollection(bandsHolder, parentAbsoluteProsition, callback) {
        const collection = bandsHolder.bands();
        for (let i = 0; i < collection.length; i++) {
            const itemRect = collection[i].getUsefulRect();
            const itemAbsoluteRect = this._processBandRtl({
                top: collection[i].absolutePosition.y(),
                bottom: collection[i].absolutePosition.y() + collection[i].height(),
                left: itemRect.left + parentAbsoluteProsition.left,
                right: itemRect.right + parentAbsoluteProsition.left
            });
            if (collection[i] instanceof DetailReportBandSurface) {
                this._enumerateBandCollection(collection[i].bandsHolder, itemAbsoluteRect, callback);
            }
            else {
                callback(collection[i], itemAbsoluteRect);
            }
        }
        if (bandsHolder.verticalBandsContainer && !bandsHolder.verticalBandsContainer.scrollOffset()) {
            bandsHolder.verticalBandsContainer.verticalBands().forEach((band => {
                const absoluteRect = {
                    top: band.absolutePosition.y(),
                    bottom: band.absolutePosition.y() + band._height(),
                    left: band.absolutePosition.x() - band.verticalBandsContainer.scrollOffset(),
                    right: band.absolutePosition.x() + band.rect().width - band.verticalBandsContainer.scrollOffset()
                };
                callback(band, absoluteRect);
            }));
        }
    }
    _processBandRtl(itemAbsoluteRect) {
        if (this._rtl()) {
            itemAbsoluteRect.right = itemAbsoluteRect.left;
            itemAbsoluteRect.left = 0;
        }
        return itemAbsoluteRect;
    }
    _enumerateCollection(parent, parentAbsoluteProsition, callback) {
        if (parent.bandsHolder)
            this._enumerateBandCollection(parent.bandsHolder, parentAbsoluteProsition, callback);
        super._enumerateCollection(parent, parentAbsoluteProsition, callback);
    }
}
