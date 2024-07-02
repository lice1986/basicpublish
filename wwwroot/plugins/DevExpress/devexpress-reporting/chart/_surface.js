﻿/**
* DevExpress HTML/JS Reporting (chart\_surface.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Size } from '@devexpress/analytics-core/analytics-elements';
import { NotifyAboutWarning } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ChartViewModel } from './components/models/_chart';
import { ChartRequests } from './internal/_requests';
import { HandlerUri } from './_handlerUri';
export class ChartControlSurface extends Disposable {
    constructor(control, zoom = ko.observable(1), size = Size.fromString('500, 500')) {
        super();
        this.imageSrc = ko.observable('');
        this.templateName = 'dx-chart-surface';
        this.width = ko.computed(() => { return size.width() * zoom(); });
        this.height = ko.computed(() => { return size.height() * zoom(); });
        this.zoom = zoom;
        this._disposables.push(this.width);
        this._disposables.push(this.height);
        this._disposables.push(ko.computed(() => {
            const series = control.chart.dataContainer.series();
            series.forEach((val) => {
                val.viewType();
            });
            const _self = this;
            if (HandlerUri()) {
                ChartRequests.getChartImage(HandlerUri(), ChartViewModel.toJson(ko.unwrap(control.chart), new ModelSerializer(), null), this.width(), this.height()).done(function (result) {
                    const allSeries = control.chart.dataContainer.series();
                    allSeries.forEach((val) => {
                        val.isIncompatible(false);
                    });
                    _self.imageSrc('data:image/svg+xml;base64,' + result.Image);
                    result.Indexes.forEach((val) => {
                        const series = allSeries[val];
                        series.isIncompatible(true);
                    });
                })
                    .fail(function (result) {
                    NotifyAboutWarning('Impossible to get chart image.');
                });
            }
        }).extend({ deferred: true }));
    }
}