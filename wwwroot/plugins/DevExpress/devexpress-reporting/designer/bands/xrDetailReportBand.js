﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrDetailReportBand.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { checkModelReady, deserializeChildArray, getFullPath, HoverInfo } from '@devexpress/analytics-core/analytics-internal';
import { FilterStringOptions } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { collectAvailableParameters } from '../dataObjects/metadata/_parameterUtils';
import { bandSurfaceCollapsedHeight } from './bandSurfaceCollapsedHeight';
import { BandSurface, BandViewModel } from './xrBand';
import { SubBandViewModel } from './xrSubband';
import { VerticalBandViewModel } from './xrVerticalBand';
import { addBandToContainer } from './_bandContainerUtils';
import { initLevels, sortBands } from './_bandUtils';
export class DetailReportBand extends BandViewModel {
    constructor(band, parent, serializer) {
        super(band, parent, serializer);
        this._disposables.push(this.dataSource.subscribe((newVal) => {
            if (!newVal) {
                this.dataMember(null);
            }
        }));
        const dataMember = ko.pureComputed(() => {
            return getFullPath(this.getPath('dataMember'), this.dataMember());
        });
        const disabled = ko.pureComputed(() => !this.dataSource());
        this.filterString = new FilterStringOptions(this._filterString, dataMember, disabled);
        this._disposables.push(dataMember);
        this._disposables.push(disabled);
        this.filterString.helper.parameters = ko.computed(() => {
            return collectAvailableParameters(this.root['parameters']());
        });
        this._disposables.push(this.filterString.helper.parameters);
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.bands);
        this.resetObservableArray(this.bands);
    }
    initHeight() {
        let oldHeight = 0;
        this._disposables.push(this.height = ko.pureComputed({
            read: () => {
                if (checkModelReady(this.root)) {
                    const verticalBand = this.bands().filter(x => x instanceof VerticalBandViewModel)[0];
                    let height = 0;
                    if (verticalBand)
                        height = verticalBand.height();
                    oldHeight = this.bands().filter(x => !(x instanceof VerticalBandViewModel)).reduce((sum, b) => { return sum + b.height(); }, height);
                }
                return oldHeight;
            },
            write: (newHeight) => {
                if (checkModelReady(this.root)) {
                    const deltaHeight = newHeight - this.height.peek(), oldHeight = this.bands()[this.bands().length - 1].height.peek();
                    this.bands()[this.bands().length - 1].height(oldHeight + deltaHeight);
                }
            }
        }));
    }
    createChildsArray(band, serializer) {
        const factory = this.getControlFactory();
        this.bands = deserializeChildArray(band.Bands, this, (item) => {
            return new (factory.controlsMap[item['@ControlType']].type || BandViewModel)(item, this, serializer);
        });
        const bands = this.bands.peek();
        if (bands) {
            initLevels(bands);
            bands.sort(sortBands);
        }
        if (this.bands().length === 0)
            this.createChild({ '@ControlType': 'DetailBand', '@HeightF': this.height() });
    }
    addChild(control) {
        if (control instanceof BandViewModel && !(control instanceof SubBandViewModel)) {
            addBandToContainer(this, control);
        }
    }
}
export class DetailReportBandSurface extends BandSurface {
    constructor(band, context) {
        super(band, context, {
            _height: (o) => o.height
        });
        this.templateName = 'dxrd-detailreportband';
        this.selectionTemplate = 'dxrd-detailreportband-selection';
        this.leftMarginTemplate = 'dxrd-detail-report-band-coordinate-grid';
        this._disposables.push(ko.computed(() => {
            const isSomeParentCollapsed = this.collapsed() || this.isSomeParentCollapsed();
            this.bandsHolder.bands().forEach((band) => {
                band.isSomeParentCollapsed(isSomeParentCollapsed);
            });
        }));
    }
    dispose() {
        super.dispose();
    }
    getChildrenCollection() {
        return this.bandsHolder.bands;
    }
    createUnderCursor() {
        const _underCursor = ko.observable(new HoverInfo());
        this._disposables.push(this.underCursor = ko.pureComputed({
            read: () => {
                _underCursor().isOver = this.bandsHolder.checkUnderCursor();
                return _underCursor();
            },
            write: (val) => { _underCursor(val); }
        }));
    }
    getTotalHeight() {
        return this.bandsHolder.getTotalHeight();
    }
    getHeight() {
        if (this.collapsed()) {
            return bandSurfaceCollapsedHeight;
        }
        else {
            return this.bandsHolder.getHeight();
        }
    }
    getHasOwnRuler() {
        return this.collapsed();
    }
}
