﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrBand.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Point, SurfaceElementBase } from '@devexpress/analytics-core/analytics-elements';
import { checkModelReady, deserializeChildArray, DragDropHandler, getFullPath, HoverInfo, roundingXDecimals, unitsToPixel } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { stylesInfo, stylesObj } from '../controls/metadata/properties/style';
import { Anchoring } from '../controls/properties/anchoring';
import { isVerticalBand } from '../controls/utils/_controlTypes';
import { isHeaderOrFooterBandType } from '../controls/utils/_headOrFooterBandType';
import { getExistTableOfContents } from '../controls/utils/_tocUtils';
import { XRReportElementViewModel } from '../controls/xrReportelement';
import { createObjectFromInfo } from '../internal/_createObjectFromInfo';
import { controlsFactory } from '../utils/settings';
import { bandSurfaceCollapsedHeight } from './bandSurfaceCollapsedHeight';
import { pageBreak, printAcrossBands, repeatEveryPage } from './metadata/bandsMetadata';
import { BandsHolder } from './_bandHolder';
import { generateArray, initLevels, insertBand, sortBands, _getUnitAbsoluteRect } from './_bandUtils';
import { PrintAcrossBandsPlaceHolder } from './_printAcrossBandsPlaceHolder';
export class BandViewModel extends XRReportElementViewModel {
    constructor(band, parent, serializer) {
        super(band, parent, serializer);
        this.preInit(band, parent, serializer);
        this.createChildsArray(band, serializer);
        this.initHeight();
        this.size.height = this.height;
        if (this.level) {
            this._disposables.push(this.maxLevel = ko.pureComputed(() => this._getMaxLevel()));
            this._level = ko.observable(this.level.peek());
            this._disposables.push(this.level = ko.pureComputed({
                read: () => { return this._level(); },
                write: (newVal) => {
                    newVal > this.maxLevel() && (newVal = this.maxLevel());
                    const parentModel = this.parentModel();
                    const parentBands = parentModel.bands;
                    const groupArray = generateArray(parentBands(), this.controlType, newVal);
                    groupArray.splice(newVal, 0, groupArray.splice(this._level(), 1)[0]);
                    this._level(newVal);
                    for (let i = newVal + 1, level = newVal + 1; i < groupArray.length; i++) {
                        groupArray[i] && groupArray[i]._level(level++);
                    }
                    for (let i = newVal - 1, level = newVal - 1; i >= 0; i--) {
                        groupArray[i] && groupArray[i]._level(level--);
                    }
                    parentBands.sort((left, right) => {
                        if (left.controlType === this.controlType && right.controlType === this.controlType) {
                            return this.controlType === 'GroupHeaderBand' ? right.level() - left.level() : left.level() - right.level();
                        }
                        return 0;
                    });
                }
            }));
        }
        const stylesObject = createObjectFromInfo(this, stylesInfo);
        if (stylesObject) {
            this[stylesObj.propertyName] = stylesObject;
        }
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.bands);
        this.disposeObservableArray(this.controls);
        this.resetObservableArray(this.bands);
        this.resetObservableArray(this.controls);
    }
    createChildsArray(band, serializer) {
        const subBands = [];
        if (band.SubBands) {
            Object.keys(band.SubBands).forEach((key) => {
                subBands.push(this.getControlFactory().createControl(Object.assign({ '@ControlType': 'SubBand' }, band.SubBands[key]), this, serializer));
            });
        }
        if (subBands) {
            initLevels(subBands);
            subBands.sort(sortBands);
        }
        this.bands = ko.observableArray(subBands);
        this.controls = deserializeChildArray(band.Controls, this, (control) => { return this.createControl(control, serializer); });
    }
    initHeight() {
        let _heightFromControls = 0;
        this._disposables.push(this.heightFromControls = ko.pureComputed(() => {
            _heightFromControls = 0;
            if (checkModelReady(this.root)) {
                for (let i = 0; i < this.controls().length; i++) {
                    if (!this.controls()[i].update()) {
                        const controlY = this.controls()[i].anchorVertical && this.controls()[i].anchorVertical() === 'Bottom' && this.controls()[i].vertAnchoring.state !== Anchoring.states.fromControls ? 0 : this.controls()[i].location.y(), controlHeight = this.controls()[i].anchorVertical && this.controls()[i].anchorVertical() === 'Both' && this.controls()[i].vertAnchoring.state !== Anchoring.states.fromControls ? 1 : this.controls()[i].size.height(), controlBottom = controlY + controlHeight;
                        if (controlBottom > _heightFromControls) {
                            _heightFromControls = controlBottom;
                        }
                    }
                }
                _heightFromControls = roundingXDecimals(_heightFromControls);
                this.height(Math.max(_heightFromControls, this.height()));
                _heightFromControls = _heightFromControls > 0 ? _heightFromControls : 0;
            }
            return _heightFromControls;
        }));
    }
    preInit(band, parent, serializer) {
    }
    _getMaxLevel() {
        const getSiblingBandsCount = (controlType) => this.parentModel().bands().filter(x => {
            return x.controlType === controlType;
        }).length;
        if (this.controlType === 'GroupHeaderBand' || this.controlType === 'GroupFooterBand') {
            return Math.max(getSiblingBandsCount('GroupHeaderBand'), getSiblingBandsCount('GroupFooterBand')) - 1;
        }
        return getSiblingBandsCount(this.controlType) - 1;
    }
    addChild(control) {
        if (control instanceof BandViewModel && control.isAllowedParent(this)) {
            insertBand(this.bands, control);
            return;
        }
        if (control.controlType === 'XRTableOfContents' && isHeaderOrFooterBandType(this)) {
            const tocAlreadyExists = !!getExistTableOfContents(this);
            if (tocAlreadyExists) {
                throw new Error('Only one TOC can be added!!!');
            }
        }
        super.addChild(control);
    }
    getPath(propertyName) {
        if (propertyName === 'dataMember') {
            return this.dsHelperProvider() && this.dsHelperProvider().getDataSourcePath(this['dataSource']());
        }
        else if (propertyName === 'groupFields') {
            return getFullPath(this.parentModel().getPath('dataMember'), this.parentModel()['dataMember']());
        }
        return super.getPath(propertyName);
    }
    initSize() {
        this.size.height = this.height;
        this._disposables.push(this.size.width = ko.computed({
            read: () => {
                return this.root.size.width() - (this.root['margins'] ? ((this.root['margins'].left && this.root['margins'].left()) + (this.root['margins'].right && this.root['margins'].right())) : 0);
            }, write: (newVal) => void 0
        }));
        this.size.isPropertyDisabled = (name) => { return name === 'width' || name === 'height' && ko.unwrap(controlsFactory().getPropertyInfo('DetailBand', 'height').disabled); };
        this.size.isPropertyVisible = (name) => { return name !== 'height' || ko.unwrap(controlsFactory().getPropertyInfo('DetailBand', 'height').visible) !== false; };
    }
    initialize() {
        super.initialize();
        this.initSize();
    }
    removeChild(control) {
        if (control instanceof BandViewModel) {
            if (this.bands().indexOf(control) !== -1) {
                this.bands.splice(this.bands().indexOf(control), 1);
            }
        }
        else {
            super.removeChild(control);
        }
    }
    static isReorderingBand(control) {
        return ['GroupHeaderBand', 'GroupFooterBand', 'DetailReportBand', 'SubBand'].indexOf(control.controlType) > -1;
    }
    isAllowedParent(target) {
        return false;
    }
    _isHeaderBandTypeOrThemSubBands(band) {
        const _isHeader = (band) => band.controlType === 'PageHeaderBand' || band.controlType === 'GroupHeaderBand';
        return _isHeader(band) || (this.controlType === 'SubBand' && _isHeader(band.parentModel()));
    }
    isPropertyVisible(name) {
        if (name === printAcrossBands.propertyName) {
            return this._isHeaderBandTypeOrThemSubBands(this);
        }
        else if (name === pageBreak.propertyName) {
            return this.controlType === 'SubBand' || !this._isHeaderBandTypeOrThemSubBands(this) || this[printAcrossBands.propertyName];
        }
        else {
            return super.isPropertyVisible(name);
        }
    }
    isPropertyDisabled(name) {
        if (name === 'dataMember' && this['dataSource']) {
            return this['dataSource']() === null;
        }
        else if (name === repeatEveryPage.propertyName) {
            return this[printAcrossBands.propertyName] && this[printAcrossBands.propertyName]();
        }
        else if (name === printAcrossBands.propertyName) {
            return !!this[repeatEveryPage.propertyName] && this[repeatEveryPage.propertyName]() ||
                !!this.parentModel().bands().filter(x => isVerticalBand(x.controlType)).length ||
                (!!this[pageBreak.propertyName] && (this[pageBreak.propertyName]() === 'AfterBand' || this[pageBreak.propertyName]() === 'AfterBandExceptLastEntry'));
        }
        else {
            return super.isPropertyDisabled(name);
        }
    }
}
BandViewModel.unitProperties = ['height'];
export class BandSurface extends SurfaceElementBase {
    constructor(band, context, unitProperties = BandSurface._unitProperties) {
        super(band, context, unitProperties);
        this.isSomeParentCollapsed = ko.observable(false);
        this._resize = (delta, oldDelta) => {
            this._height(this._height() + delta - oldDelta);
            return delta;
        };
        this.showMarker = true;
        this.templateName = 'dxrd-band';
        this.selectionTemplate = 'dxrd-band-selection';
        this.vrulerTemplate = 'dxrd-band-vruler';
        this.contentSelectionTemplate = 'dxrd-bandselection-content';
        this.leftMarginTemplate = 'dxrd-band-coordinate-grid';
        this.leftMarginSelectionTemplate = 'dxrd-band-coordinate-grid-selection';
        this.allowMultiselect = false;
        this.markerWidth = ko.observable(bandSurfaceCollapsedHeight);
        this.collapsed = ko.observable(false);
        this._disposables.push(ko.computed(() => {
            this._width(context.pageWidth() - context.margins.left());
        }));
        this._disposables.push(this.collapsed = ko.pureComputed({
            read: () => {
                return !band.expanded();
            },
            write: (newVal) => {
                band.expanded(!newVal);
            }
        }));
        this._disposables.push(this._totalHeight = ko.pureComputed(() => this.getTotalHeight()));
        this.name = band.name;
        const subBandsHeight = 0;
        this._disposables.push(this.subBandsHeight = ko.pureComputed(() => this.bandsHolder.getHeight()));
        this._disposables.push(this.heightWithoutSubBands = ko.pureComputed(() => {
            return this.height() - this.subBandsHeight();
        }));
        this._disposables.push(this.height = ko.pureComputed(() => this.getHeight()));
        this._initMultiColumn();
        this.createChildCollection(band);
        this.createUnderCursor();
        this._disposables.push(this.hasOwnRuler = ko.pureComputed(() => this.getHasOwnRuler()));
        this._disposables.push(this.rulerHeight = ko.pureComputed(() => {
            return this.collapsed() ? bandSurfaceCollapsedHeight : (this.heightWithoutSubBands());
        }));
        const root = this.getControlModel().root;
        const nearMarginWidth = () => root.margins.right() + root.margins.left();
        this.coordinateGridOptions = {
            left: ko.pureComputed(() => {
                return this.rtlLayout() ? this._context.margins.right() : 0;
            }),
            height: this.getControlModel().height,
            snapGridSize: root.snapGridSize,
            zoom: context.zoom,
            measureUnit: context.measureUnit,
            width: ko.pureComputed(() => root.pageWidth() - nearMarginWidth()),
            flip: context.rtl
        };
        let oldDelta = 0;
        this['resize'] = (params) => {
            oldDelta = this._resize(params.delta.dh, oldDelta);
        };
        this['resizeTheBand'] = (params) => {
            oldDelta = this._resize(params.delta.dh, oldDelta);
        };
        this['stopResize'] = () => {
            oldDelta = 0;
        };
        this._disposables.push(this['markerClass'] = ko.pureComputed(() => {
            let cssClass = 'dxrd-band-marker-body';
            if (band.controlType.toLowerCase().indexOf('header') !== -1 || band.controlType === 'TopMarginBand') {
                cssClass = 'dxrd-band-marker-header';
            }
            else if (band.controlType.toLowerCase().indexOf('footer') !== -1 || band.controlType === 'BottomMarginBand') {
                cssClass = 'dxrd-band-marker-footer';
            }
            if (this.focused()) {
                return cssClass += '-focused';
            }
            return cssClass;
        }));
        this._disposables.push(this['leftMargin'] = ko.pureComputed(() => {
            return 0 - (context['margins'] && context.margins.left() || 0) + 10;
        }));
        this._disposables.push(this.canResize = ko.computed(() => {
            return this.selected() && !this.locked && !this.collapsed() && !DragDropHandler.started();
        }));
        this._disposables.push(this.minHeight = ko.computed(() => {
            const minHeight = (this.heightFromControls && this.heightFromControls() || 0) + this.subBandsHeight();
            return minHeight || 1;
        }));
        this.getUsefulRect = () => {
            let usefulWidth = this.rect().width;
            const margins = this.getControlModel().root['margins'];
            usefulWidth -= this._getMarginWidth(margins, this._context.rtl());
            usefulWidth -= this._getGrayArea();
            if (this.rtlLayout()) {
                const nearMarginWidth = this._getMarginWidth(margins, this._context.rtl(), false);
                const left = this.container().rect().width - usefulWidth - nearMarginWidth;
                return { top: 0, left: left, right: usefulWidth + nearMarginWidth, bottom: this.height(), width: usefulWidth, height: this.height() };
            }
            else {
                return { top: 0, left: 0, right: usefulWidth, bottom: this.height(), width: usefulWidth, height: this.height() };
            }
        };
        this._disposables.push(this.backgroundRect = ko.pureComputed(() => this.getBackgroundRect()));
        if (this._isHeaderBandTypeOrThemSubBands()) {
            this.printAcrossBands = band['printAcrossBands'];
            this._disposables.push(this.printAcrossBandsPlaceHolder = new PrintAcrossBandsPlaceHolder(this));
        }
    }
    _getMarginWidth(margins, rtl, isFarMargin = true) {
        const marginWidht = margins ? (isFarMargin && this._context.rtl() ? margins.left && margins.left() : margins.right && margins.right()) || 0 : 0;
        return unitsToPixel(marginWidht, this._context.measureUnit(), this._context.zoom());
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.controls);
        this.resetObservableArray(this.controls);
    }
    _isHeaderBandTypeOrThemSubBands() {
        const band = this.getControlModel();
        const _isHeader = (band) => band.controlType === 'PageHeaderBand' || band.controlType === 'GroupHeaderBand';
        return _isHeader(band) || (band.controlType === 'SubBand' && _isHeader(band.parentModel()));
    }
    _getUnitPositionInParent() {
        let isVerticalBandTakenIntoAccount = false;
        const neighbors = this._control.parentModel().bands();
        const absoluteY = neighbors
            .slice(0, neighbors.indexOf(this._control))
            .reduce((sum, currentBandModel) => {
            if (isVerticalBand(currentBandModel.controlType) && isVerticalBandTakenIntoAccount)
                return sum;
            else if (isVerticalBand(currentBandModel.controlType))
                isVerticalBandTakenIntoAccount = true;
            return sum + currentBandModel.size.height();
        }, 0);
        return new Point(0, absoluteY);
    }
    get _unitAbsoluteRect() {
        return _getUnitAbsoluteRect(this, () => this._getUnitPositionInParent());
    }
    _getGrayArea() {
        if (this.multiColumn && this.multiColumn()) {
            return this.multiColumn().grayAreaWidth() + (this.multiColumn().columnSpacing() || 0);
        }
        return 0;
    }
    createChildCollection(band) {
        this._disposables.push(this.bandsHolder = new BandsHolder(this));
        this.bandsHolder.initialize(band.bands);
    }
    createUnderCursor() {
        this.underCursor = ko.observable(new HoverInfo());
    }
    getTotalHeight() {
        return this._height() + this.bandsHolder.getTotalHeight();
    }
    getHeight() {
        if (this.collapsed())
            return bandSurfaceCollapsedHeight;
        else
            return this._height() + this.subBandsHeight();
    }
    getHasOwnRuler() {
        return true;
    }
    getBackgroundRect() {
        let top = 0, bottom, height = this._height();
        const parent = this.parent;
        if (!parent) {
            return { top, bottom, height };
        }
        const parentBands = ko.unwrap(parent.bandsHolder.bands);
        const parentBackgroundRect = ko.unwrap(parent.backgroundRect);
        if (parentBackgroundRect) {
            top += parentBackgroundRect.top;
            bottom = parentBackgroundRect.bottom;
        }
        else {
            const pageHeight = parent.pageHeight();
            const bottomMargin = parent.margins.bottom();
            const footer = parentBands.filter(function (x) { return x._control.controlType === 'PageFooterBand'; })[0];
            bottom = pageHeight - bottomMargin;
            if (footer)
                bottom -= footer._totalHeight();
        }
        const bandIndex = parentBands.indexOf(this);
        if (parent.bandsHolder.verticalBandsContainer.visible && parent.bandsHolder.verticalBandsContainer.bandPosition() <= bandIndex) {
            top += parent.bandsHolder.verticalBandsContainer._height();
        }
        for (let i = 0; i < bandIndex; i++) {
            top += parentBands[i]._totalHeight();
        }
        if (top > bottom)
            height = 0;
        else if (top + height > bottom)
            height = bottom - top;
        return { top, bottom, height };
    }
    _initMultiColumn() {
        this._disposables.push(this.multiColumn = ko.computed(() => {
            const currentMultiColumn = this.parent && this.parent.bandsHolder.multiColumn();
            const parentMultiColumn = this.parent && !(this.parent['_control'].controlType === 'DevExpress.XtraReports.UI.XtraReport') && this.parent.parent.bandsHolder.multiColumn();
            if (parentMultiColumn && parentMultiColumn.haveColumns())
                return parentMultiColumn;
            else if (currentMultiColumn && currentMultiColumn.haveColumns()
                && (this.getControlModel().controlType === 'GroupHeaderBand' ||
                    this.getControlModel().controlType === 'GroupFooterBand' ||
                    this.getControlModel().controlType === 'DetailReportBand')) {
                return currentMultiColumn;
            }
        }));
    }
    getAbsolutePositionY() {
        return this.parent.bandsHolder.getBandAbsolutePositionY(this);
    }
    updateAbsolutePosition() {
        if (!this.parent)
            return;
        const parent = this.parent;
        this.absolutePosition.x(0);
        if (ko.unwrap(parent['collapsed'])) {
            this.absolutePosition.y(parent['absolutePosition'].y());
            return;
        }
        this.absolutePosition.y(this.getAbsolutePositionY());
    }
    markerClick(selection, changeCollapsed = true) {
        if (selection.expectClick) {
            selection.expectClick = false;
            return;
        }
        if (!this.focused() && !selection.disabled()) {
            selection.initialize(this);
        }
        else {
            if (changeCollapsed)
                this.collapsed(!this.collapsed());
        }
    }
    canDrop() { return super.canDrop() && !this.collapsed(); }
    get parent() {
        return this._getParent();
    }
    get zoom() { return this.getRoot().zoom; }
    checkParent(surfaceParent) {
        return false;
    }
}
BandSurface._unitProperties = {
    _height: (o) => { return o.height; },
    heightFromControls: (o) => { return o.heightFromControls; }
};
