﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrDetailBand.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Margins } from '@devexpress/analytics-core/analytics-elements';
import { isNullOrEmptyString } from '@devexpress/analytics-core/analytics-internal';
import { deserializeArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { GroupFieldModel } from './groupfield';
import { pageBreak, printAtBottom } from './metadata/bandsMetadata';
import { fillEmptySpace } from './metadata/xrDetailBandMetaData';
import { MultiColumn, MultiColumnSurface } from './multiColumn';
import { BandSurface, BandViewModel } from './xrBand';
export class DetailBand extends BandViewModel {
    constructor(band, parent, serializer) {
        super(band, parent, serializer);
        this.hierarchyPrintOptions.isPropertyDisabled = function (propertyName) {
            if (propertyName === 'keyFieldName' || propertyName === 'parentFieldName')
                return !!this.childListFieldName();
            else if (propertyName === 'childListFieldName') {
                return !!this.keyFieldName() || !!this.parentFieldName();
            }
        };
        this.hierarchyPrintOptions.getPath = () => {
            return this.getPath('groupFields');
        };
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.sortFields);
        this.resetObservableArray(this.sortFields);
    }
    preInit(band, parent, serializer) {
        this.multiColumn = new MultiColumn(band['MultiColumn'], this.root['pageWidth'] || ko.observable(0), this.root['margins'] || Margins.fromString());
        this._disposables.push(this.multiColumn);
        this.sortFields = deserializeArray(band.SortFields, (field) => { return new GroupFieldModel(field, serializer); });
    }
    hasHierarchyPrintOptions() {
        return !(isNullOrEmptyString(this.hierarchyPrintOptions.childListFieldName()) &&
            (isNullOrEmptyString(this.hierarchyPrintOptions.keyFieldName()) ||
                isNullOrEmptyString(this.hierarchyPrintOptions.parentFieldName())));
    }
    isPropertyDisabled(name) {
        if (name === fillEmptySpace.propertyName) {
            return !this.parentModel()['bands']()
                .filter(band => band.controlType === 'GroupFooterBand' || band.controlType === 'ReportFooterBand')
                .every(band => band[printAtBottom.propertyName] && band[printAtBottom.propertyName]() ||
                band[pageBreak.propertyName] && (band[pageBreak.propertyName]() === 'BeforeBand' || band[pageBreak.propertyName]() === 'BeforeBandExceptFirstEntry'));
        }
        else {
            return super.isPropertyDisabled(name);
        }
    }
}
DetailBand.unitProperties = [].concat([], BandViewModel.unitProperties, 'multiColumn');
export class DetailBandSurface extends BandSurface {
    _initMultiColumn() {
        const multiColumn = new MultiColumnSurface(this._control.multiColumn, this._context);
        this._disposables.push(multiColumn);
        this._disposables.push(this.multiColumn = ko.computed(() => {
            const parentMultiColumn = this.parent['multiColumn'] && this.parent['multiColumn']();
            if (parentMultiColumn)
                return parentMultiColumn;
            return multiColumn;
        }));
    }
}
