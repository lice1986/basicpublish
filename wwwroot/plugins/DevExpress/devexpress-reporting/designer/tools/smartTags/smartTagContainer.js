﻿/**
* DevExpress HTML/JS Reporting (designer\tools\smartTags\smartTagContainer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Point } from '@devexpress/analytics-core/analytics-elements';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { BandViewModel } from '../../bands/xrBand';
import { ReportViewModel } from '../../controls/xrReport';
export class SmartTagModel extends Disposable {
    constructor(selection, reportSurface, offset, smartTagFactory, rtl) {
        super();
        this.smartTags = ko.observableArray();
        this.visible = ko.observable(true);
        this.width = 22;
        this.position = new Point(0, 0);
        this._disposables.push(selection.focused.subscribe(selectedSurface => {
            const selectedItem = selectedSurface && selectedSurface['_control'];
            if (selectedItem) {
                const reportElement = selectedItem;
                this.smartTags().forEach(x => x.dispose());
                this.smartTags(smartTagFactory[reportElement.controlType] ? smartTagFactory[reportElement.controlType](reportElement) :
                    smartTagFactory['default'] && smartTagFactory['default'](reportElement));
            }
        }));
        this._disposables.push(ko.computed(() => {
            const surface = reportSurface();
            if (!surface)
                return;
            const selectedSurface = selection.focused();
            const selectedItem = selectedSurface && selectedSurface['_control'];
            if (selectedItem) {
                const position = selectedSurface['absoluteRect'] && selectedSurface['absoluteRect']();
                const margin = this._getMargin(selectedItem, rtl);
                if (position) {
                    let left = surface.margins.left() + margin;
                    left += rtl ? position.left : position.right;
                    this.position.x(left);
                    this.position.y(position.top);
                }
                else {
                    let left = margin;
                    left += rtl ? surface._x() : surface._width() + offset();
                    this.position.x(left);
                    this.position.y(0);
                }
            }
            this.visible(selectedItem ? !ko.unwrap(selectedItem.lockedInUserDesigner) : false);
        }).extend(({ rateLimit: { timeout: 1, method: 'notifyWhenChangesStop' } })));
    }
    _getMargin(control, rtl) {
        const controlMargin = control instanceof ReportViewModel ? 3 : control instanceof BandViewModel ? -this.width : 9;
        return rtl ? -this.width - controlMargin : controlMargin;
    }
}
