﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_series.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { deserializeArray, getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { points } from '../../internal/meta/_chart';
import { name } from '../../internal/meta/_common';
import { initCollectionItem } from '../axis/_axis';
import { SeriesPointModel } from './_point';
import { seriesTemplateSerializationsInfo, SeriesTemplateViewModel } from './_template';
export class SeriesViewModel extends SeriesTemplateViewModel {
    constructor(model, parent, serializer) {
        super(model, serializer, seriesSerializationsInfo);
        this.isIncompatible = ko.observable(false);
        initCollectionItem(this, parent)();
        this._disposables.push(this['displayName'] = ko.pureComputed(() => {
            return this.isIncompatible() ? getLocalization('(incompatible)', 'ChartStringId.IncompatibleSeriesView') + ' ' + this['name']() : this['name']();
        }));
        this.points = ko.observableArray([]);
        this._disposables.push(this.points.subscribe((newValue) => { newValue['owner'] = this; }));
        this.points(deserializeArray(model.Points || [], (item) => { return new SeriesPointModel(item, this, serializer); })());
    }
    updateByView(view) {
        super.updateByView(view);
        this.points && this.points([]);
    }
    _isDataMemberPropertyDisabled(name) {
        if (SeriesTemplateViewModel.dataMemberProperies.concat(['colorDataMember']).some(x => x === name)) {
            return !ko.unwrap(this.dataSource);
        }
        return false;
    }
}
SeriesViewModel.prefix = 'Series';
export const seriesSerializationsInfo = [name, points].concat(seriesTemplateSerializationsInfo);
