﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_bandHolder.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { isVerticalBand } from '../controls/utils/_controlTypes';
import { VerticalBandsContainerSurface } from './_vericalBandContainer';
export class BandsHolder extends Disposable {
    constructor(_container) {
        super();
        this._container = _container;
        this.bands = ko.observableArray();
        if (_container._control.controlType === 'DevExpress.XtraReports.UI.XtraReport' || _container._control.controlType === 'DetailReportBand')
            this._disposables.push(this.verticalBandsContainer = new VerticalBandsContainerSurface(_container));
        this._disposables.push(this.multiColumn = ko.computed(() => {
            const containerMultiColumn = _container['multiColumn'] && _container['multiColumn']();
            if (containerMultiColumn && containerMultiColumn.haveColumns()) {
                return containerMultiColumn;
            }
            else {
                const detailBand = this.bands().filter(item => item._control.controlType === 'DetailBand')[0];
                if (detailBand && detailBand.multiColumn() && detailBand.multiColumn().haveColumns())
                    return detailBand.multiColumn();
                else
                    return null;
            }
        }));
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.bands);
        this.resetObservableArray(this.bands);
    }
    _createBandsMapCollection(elementModels, callbacks) {
        let position = 0;
        elementModels.peek().forEach(item => callbacks.addItem(callbacks.createItem(item), position++));
        callbacks.callMutated();
        return elementModels.subscribe((args) => {
            args.forEach((changeSet) => {
                if (changeSet.status === 'deleted') {
                    callbacks.removeItem(changeSet.value.surface);
                    callbacks.callMutated();
                }
            });
            args.forEach((changeSet) => {
                if (changeSet.status === 'added') {
                    callbacks.addItem(callbacks.createItem(changeSet.value), changeSet.index);
                    callbacks.callMutated();
                }
            });
        }, null, 'arrayChange');
    }
    _addHorizontalBand(item, index) {
        const verticalBandsPosition = this.verticalBandsContainer && this.verticalBandsContainer.bandPosition();
        if (index === undefined)
            return this.bands().push(item);
        if (verticalBandsPosition > 0 && index > verticalBandsPosition) {
            index -= this.verticalBandsContainer.verticalBands().length;
        }
        this.bands().splice(index, 0, item);
    }
    _addVerticalBand(item, index) {
        this.verticalBandsContainer.verticalBands().splice(index > 0 ? index : 0, 0, item);
    }
    initialize(bands) {
        let isVerticalChanged = false;
        let isHorizontalChanged = false;
        this._disposables.push(this._createBandsMapCollection(bands, {
            addItem: (item, index) => {
                if (isVerticalBand(item._control.controlType)) {
                    this._addVerticalBand(item, index - this.verticalBandsContainer.bandPosition());
                    isVerticalChanged = true;
                }
                else {
                    isHorizontalChanged = true;
                    this._addHorizontalBand(item, index);
                }
            },
            callMutated: () => {
                isHorizontalChanged && this.bands.valueHasMutated();
                isVerticalChanged && this.verticalBandsContainer && this.verticalBandsContainer.verticalBands.valueHasMutated();
                isHorizontalChanged = false;
                isVerticalChanged = false;
            },
            createItem: (item) => this._container._createSurface(item),
            removeItem: (item) => {
                if (isVerticalBand(item._control.controlType)) {
                    this.verticalBandsContainer.verticalBands().splice(this.verticalBandsContainer.verticalBands().indexOf(item), 1);
                    isVerticalChanged = true;
                }
                else {
                    this.bands().splice(this.bands().indexOf(item), 1);
                    isHorizontalChanged = true;
                }
            }
        }));
    }
    getHeight() {
        let minHeight = (this.verticalBandsContainer && this.verticalBandsContainer.height()) || 0;
        this.bands().forEach((band) => { minHeight += band.height(); });
        return minHeight;
    }
    getTotalHeight() {
        const height = this.verticalBandsContainer && this.verticalBandsContainer._height() || 0;
        return height + (this.bands() || []).reduce((acc, x) => acc + x._totalHeight(), 0);
    }
    getBandAbsolutePositionY(band) {
        let newY = 0;
        let bandIndex;
        const parentBands = ko.unwrap(this.bands);
        if (parentBands && parentBands.length !== 0) {
            bandIndex = parentBands.indexOf(band);
            if (bandIndex === -1)
                return newY;
            if (bandIndex > 0 && parentBands[bandIndex - 1]) {
                newY = parentBands[bandIndex - 1].absolutePosition.y() + parentBands[bandIndex - 1].height();
            }
            else if (bandIndex === 0 && this._container['absolutePosition']) {
                newY = this._container['absolutePosition'].y();
            }
            if (this.verticalBandsContainer) {
                if (bandIndex === this.verticalBandsContainer.getBandPosition()) {
                    newY = this.verticalBandsContainer.topOffset() + this.verticalBandsContainer.height();
                }
            }
        }
        return newY;
    }
    checkUnderCursor() {
        let isOver = false;
        [this.bands(), this.verticalBandsContainer.verticalBands()].forEach((collection) => {
            for (let i = 0; i < collection.length; i++) {
                isOver = collection[i].underCursor().isOver;
                if (isOver)
                    return isOver;
            }
        });
        return isOver;
    }
}
