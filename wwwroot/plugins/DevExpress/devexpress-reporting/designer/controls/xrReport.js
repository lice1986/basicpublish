﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrReport.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SurfaceElementArea } from '@devexpress/analytics-core/analytics-elements';
import { addDisposeCallback, assignObj, collectionsVisitor, convertFromCssPixelUnits, createObservableArrayMapCollection, CssCalculator, deserializeChildArray, DragDropHandler, extend, getFirstItemByPropertyValue, getFullPath, getPaperSize, getUniqueName, getUniqueNameForNamedObjectsArray, HoverInfo, NotifyAboutWarning, Resizable, roundingXDecimals, unitsToPixel } from '@devexpress/analytics-core/analytics-internal';
import { deserializeArray, Disposable } from '@devexpress/analytics-core/analytics-utils';
import { FilterStringOptions } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { defaultCulture } from '../../common/defaultCulture';
import { transformNewLineCharacters } from '../../common/utils/_utils';
import { bandSurfaceCollapsedHeight } from '../bands/bandSurfaceCollapsedHeight';
import { BandViewModel } from '../bands/xrBand';
import { addBandToContainer } from '../bands/_bandContainerUtils';
import { BandsHolder } from '../bands/_bandHolder';
import { getLevelCount, initLevels, setMarkerWidth, sortBands } from '../bands/_bandUtils';
import { CalculatedField } from '../dataObjects/calculatedField';
import { collectAvailableParameters } from '../dataObjects/metadata/_parameterUtils';
import { createNewObjectItem } from '../dataObjects/objectItemCreation';
import { ObjectsStorage } from '../dataObjects/objectStorage';
import { ParameterPanelLayoutItem } from '../dataObjects/parameters/layoutItems';
import { Parameter } from '../dataObjects/parameters/parameter';
import { UniversalDataSource } from '../dataObjects/universalDataSource';
import { ReportParameterHelper } from '../helpers/reportParameterHelper';
import { ReportModelSerializer } from '../internal/serialization/_serializer';
import { LocalizationItem } from '../localization/_localization';
import { ReportLocalizationEngine } from '../localization/_localizationEngine';
import { pageHeight, pageWidth } from './metadata/xrReport';
import { ExtensionModel } from './properties/extension';
import { FormattingRule } from './properties/formattingrules';
import { StyleModel } from './properties/style';
import { WatermarkModel } from './properties/watermark';
import { getUnitProperties } from './utils/_initUtils';
import { ReportLocalizationProvider } from './utils/_localizationUtils';
import { patchMargins } from './utils/_modelPatch';
import { getExistTableOfContents } from './utils/_tocUtils';
import { XRCrossBandControlViewModel } from './xrCrossband';
import { XRReportElementViewModel } from './xrReportelement';
import { XRTableSurface } from './xrTable';
import { XRTableCellSurface } from './xrTableCell';
export class ReportViewModel extends XRReportElementViewModel {
    constructor(report, serializer, knownEnums) {
        super(patchMargins(report = report.XtraReportsLayoutSerializer || report), null, serializer = serializer || new ReportModelSerializer());
        if (this.pageWidth() === pageWidth.defaultVal) {
            this.pageWidth(ReportViewModel.defaultPageSize.width);
        }
        if (this.pageHeight() === pageHeight.defaultVal) {
            this.pageHeight(ReportViewModel.defaultPageSize.height);
        }
        this.knownEnums = knownEnums;
        this._dataBindingMode = ko.observable('');
        this._update = ko.observable(false);
        this._disposables.push(this.isModelReady = ko.pureComputed(() => { return !this._update(); }));
        this._disposables.push(this.key = ko.pureComputed(() => { return this.name(); }));
        this._disposables.push(this['displayName'] = ko.pureComputed({
            read: () => { return this.displayNameObject(); },
            write: (newValue) => { this.displayNameObject(newValue); }
        }));
        this.dataSourceRefs = [];
        this.dataSourceHelper = ko.observable();
        this.stylesHelper = ko.observable();
        this.dataBindingsProvider = ko.observable();
        this._disposables.push(this.parameterHelper = new ReportParameterHelper(this));
        this.parameterHelper.initialize(knownEnums);
        this._disposables.push(this.measureUnit.subscribe((unitType) => {
            this._update(true);
            this._recalculateUnits(unitType);
            this._updatePageSize(this.paperKind.peek());
            this._update(false);
        }));
        this._disposables.push(this.landscape.subscribe((newVal) => {
            const width = this.pageWidth();
            this.pageWidth(this.pageHeight());
            this.pageHeight(width);
        }));
        this._disposables.push(this.dataSource.subscribe((newVal) => {
            if (!newVal) {
                this.dataMember(null);
            }
        }));
        this.styles = deserializeArray(report.StyleSheet, (item) => { return new StyleModel(item, this, serializer); });
        this._objectStorage = deserializeArray(report.ObjectStorage, (item) => { return createNewObjectItem(item, this.dsHelperProvider, serializer); });
        this._componentStorage = deserializeArray(report.ComponentStorage, (item) => { return createNewObjectItem(item, this.dsHelperProvider, serializer); });
        this.objectStorage = ReportViewModel.createObjectStorage(this._componentStorage, this._objectStorage, (subscription) => this._disposables.push(subscription));
        this.objectsStorageHelper = new ObjectsStorage(this.objectStorage, this.dsHelperProvider);
        this._disposables.push(this.objectsStorageHelper);
        this.parameters = deserializeArray(report.Parameters, (item) => { return new Parameter(item, this, serializer); });
        this.parameterPanelLayoutItems = deserializeArray(report.ParameterPanelLayoutItems, (item) => { return ParameterPanelLayoutItem.createLayoutItem(item, this, serializer); });
        this.parameterHelper.updateParameterLayoutItems();
        this.objectStorage().forEach((objectStorage) => {
            if (objectStorage instanceof UniversalDataSource) {
                objectStorage['tableInfoCollection']().forEach((tableInfoCollection) => {
                    tableInfoCollection.filterString().helper.parameters = this.parameters;
                });
            }
        });
        this.bands = deserializeChildArray(report.Bands, this, (item) => { return this.createControl(item, serializer); });
        initLevels(this.bands());
        this.bands().sort(sortBands);
        this.extensions = deserializeArray(report.Extensions, (item) => { return new ExtensionModel(item, serializer); });
        this.crossBandControls = deserializeArray(report.CrossBandControls, (item) => { return this.createControl(item, serializer); });
        this.calculatedFields = deserializeArray(report.CalculatedFields, (item) => { return new CalculatedField(item, serializer); });
        this.watermarks = deserializeArray(report.Watermarks, (item) => { return new WatermarkModel(item, serializer); });
        this._initializeBands();
        this.formattingRuleSheet = deserializeArray(report.FormattingRuleSheet, (item) => { return new FormattingRule(item, this, serializer); });
        this.components = ko.observableArray([]);
        this._disposables.push(this.formattingRuleSheet.subscribe((args) => {
            args.forEach((rule) => {
                if (!rule.value.name()) {
                    rule.value.name(getUniqueNameForNamedObjectsArray(this.formattingRuleSheet(), 'formattingRule'));
                }
                if (!rule.value.parent) {
                    rule.value.parent = this;
                }
            });
        }, null, 'arrayChange'));
        this._disposables.push(this.margins.left.subscribe((newVal) => {
            if (this.isModelReady() && newVal > this.pageWidth() - this.margins.right()) {
                this.margins.right(this.pageWidth() - this.margins.left());
            }
        }));
        this._disposables.push(this.margins.right.subscribe((newVal) => {
            if (this.isModelReady() && newVal > this.pageWidth() - this.margins.left()) {
                this.margins.left(this.pageWidth() - this.margins.right());
            }
        }));
        this._disposables.push(this.paperKind.subscribe((newVal) => {
            newVal !== 'Custom' && this._updatePageSize(newVal);
        }));
        const dataMember = ko.pureComputed(() => {
            return getFullPath(this.getPath('dataMember'), this.dataMember());
        });
        const dataSource = this.dataSource;
        const disabled = ko.pureComputed(() => !dataSource());
        const filterString = new FilterStringOptions(this['_filterString'], dataMember, disabled);
        this._disposables.push(dataMember);
        this._disposables.push(disabled);
        filterString.helper.parameters = ko.computed(() => {
            return collectAvailableParameters(this.parameters());
        });
        this._disposables.push(filterString.helper.parameters);
        this['filterString'] = filterString;
        this._scriptReferencesString = ko.observable(this.scriptReferencesString());
        this._disposables.push(this.scriptReferencesString = ko.pureComputed({
            read: () => { return this._scriptReferencesString(); },
            write: (newVal) => { this._scriptReferencesString(transformNewLineCharacters(newVal)); }
        }));
        this._localizationItems = deserializeArray(report.LocalizationItems, (item) => { return new LocalizationItem(item, serializer); });
        this._disposables.push(this._localization = new ReportLocalizationEngine(this));
        this._localizationItems.removeAll();
        let currentLanguage = defaultCulture;
        this.language = ko.observable(currentLanguage);
        this._localization.apply(currentLanguage);
        this._disposables.push(this.language.subscribe((newVal) => {
            this._localization.save(currentLanguage);
            this._localization.apply(newVal);
            currentLanguage = newVal;
        }));
    }
    static createObjectStorage(_componentStorage, _objectStorage, collectSubscription = (subscription) => void 0) {
        const objectStorage = ko.observableArray([
            ..._objectStorage(),
            ..._componentStorage()
        ]);
        collectSubscription(objectStorage.subscribe((changeSet) => {
            changeSet.forEach((change) => {
                if (change.status === 'added') {
                    if (change.value.objectType && ReportViewModel.availableDataSourceTypes.some(x => change.value.objectType().indexOf(x) !== -1)) {
                        _componentStorage.push(change.value);
                    }
                    else {
                        _objectStorage.push(change.value);
                    }
                }
                else if (change.status === 'deleted') {
                    if (change.value.objectType && ReportViewModel.availableDataSourceTypes.some(x => change.value.objectType().indexOf(x) !== -1) && _componentStorage().indexOf(change.value) !== -1) {
                        _componentStorage.remove(change.value);
                    }
                    else {
                        _objectStorage.remove(change.value);
                    }
                }
            });
        }, null, 'arrayChange'));
        return objectStorage;
    }
    _getDpi(unitType) {
        switch (unitType) {
            case 'HundredthsOfAnInch': return 100;
            case 'TenthsOfAMillimeter': return 254;
            case 'Pixels': return 96;
        }
    }
    _recalculateUnits(unitType) {
        const newDpi = this._getDpi(unitType), oldDpi = this._innerDpi(), coef = newDpi / oldDpi;
        const unitProperties = getUnitProperties(this);
        unitProperties && unitProperties.reCalculateObject(coef);
        this.enumerateComponents((target) => {
            target().forEach((item) => {
                const unitProperties = getUnitProperties(item);
                unitProperties && unitProperties.reCalculateObject(coef);
            });
        });
        this._localization.recalculateUnits(coef);
        this._innerDpi(newDpi);
    }
    _updatePageSize(paperKind) {
        const size = paperKind === 'Custom' ? this.size : getPaperSize(paperKind);
        this.pageHeight(roundingXDecimals(ko.unwrap(this.landscape() ? size.width : size.height) * (this._innerDpi.peek() / 100), false, 0));
        this.pageWidth(roundingXDecimals(ko.unwrap(this.landscape() ? size.height : size.width) * (this._innerDpi.peek() / 100), false, 0));
    }
    enumerateComponents(process = () => void 0) {
        const controls = [];
        collectionsVisitor(this, process, ['controls', 'bands', 'subBands', 'crossBandControls', 'rows', 'cells', 'parameters', 'fields', 'levels', 'styles'], controls);
        return [].concat.apply([], controls);
    }
    createLocalizationProvider() {
        return new ReportLocalizationProvider(this);
    }
    createReportViewModel(report, serializer) {
        return new ReportViewModel(report, serializer);
    }
    findStyle(styleName) {
        const result = null;
        for (let i = 0; i < this.styles().length; i++) {
            if (this.styles()[i].name() === styleName) {
                return this.styles()[i];
            }
        }
        return result;
    }
    _getBandForToc(bands) {
        let currentBand = null;
        bands.some((band) => {
            if (!getExistTableOfContents(band)) {
                currentBand = band;
            }
            else if (band.bands().length > 0) {
                currentBand = this._getBandForToc(band.bands());
            }
            return !!currentBand;
        });
        return currentBand;
    }
    getOrCreateBandForToC(createNew = true) {
        const availableTypes = ['ReportHeaderBand', 'ReportFooterBand'];
        const bands = this.bands().filter(element => {
            const typesIndex = availableTypes.indexOf(element.controlType);
            if (typesIndex !== -1) {
                availableTypes.splice(typesIndex, 1);
                return true;
            }
            return false;
        });
        let currentBand = this._getBandForToc(bands);
        const canCreate = availableTypes.length > 0;
        if (createNew && !currentBand && canCreate) {
            currentBand = this.createChild({ '@ControlType': availableTypes[0] });
        }
        return { band: currentBand, canAdd: canCreate || !!currentBand };
    }
    canAddToC() {
        return this.getOrCreateBandForToC(false).canAdd;
    }
    _initializeBands() {
        const traverse = (xs) => xs.reduce((res, x) => { res.push(x, ...traverse(ko.unwrap(x['bands']) || [])); return res; }, []);
        const bandNames = traverse(this.bands()).map(x => x.name());
        if (this.bands().length === 0) {
            this.createChild({ '@ControlType': 'DetailBand', '@Name': 'Detail1' });
        }
        else if (getFirstItemByPropertyValue(this.bands(), 'controlType', 'DetailBand') === null && getFirstItemByPropertyValue(this.bands(), 'controlType', 'VerticalDetailBand') === null) {
            this.createChild({ '@ControlType': 'DetailBand', '@Name': getUniqueName(bandNames, 'Detail') });
        }
        if (getFirstItemByPropertyValue(this.bands(), 'controlType', 'TopMarginBand') === null) {
            this.createChild({ '@ControlType': 'TopMarginBand', '@Name': getUniqueName(bandNames, 'TopMargin') });
        }
        if (getFirstItemByPropertyValue(this.bands(), 'controlType', 'BottomMarginBand') === null) {
            this.createChild({ '@ControlType': 'BottomMarginBand', '@Name': getUniqueName(bandNames, 'BottomMargin') });
        }
    }
    isPropertyDisabled(name) {
        if (name === 'pageWidth' || name === 'pageHeight') {
            return this.paperKind() !== 'Custom';
        }
        else if (name === 'dataMember') {
            return this.dataSource() === null;
        }
        return super.isPropertyDisabled(name);
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.parameters);
        this.disposeObservableArray(this.calculatedFields);
        this.disposeObservableArray(this.watermarks);
        this.disposeObservableArray(this.crossBandControls);
        this.disposeObservableArray(this.formattingRuleSheet);
        this.disposeObservableArray(this.bands);
        this.disposeObservableArray(this.objectStorage);
        this.disposeObservableArray(this.styles);
        this.resetObservableArray(this.extensions);
        this.resetObservableArray(this.objectStorage);
        this.resetObservableArray(this.parameters);
        this.resetObservableArray(this.parameterPanelLayoutItems);
        this.resetObservableArray(this.calculatedFields);
        this.resetObservableArray(this.watermarks);
        this.resetObservableArray(this.crossBandControls);
        this.resetObservableArray(this.formattingRuleSheet);
        this.resetObservableArray(this.bands);
        this.resetObservableArray(this.styles);
        this.resetObservableArray(this.components);
    }
    preInitProperties() {
        this.controlType = 'DevExpress.XtraReports.UI.XtraReport';
    }
    isLocalized() {
        return this._localization.isLocalized();
    }
    initialize() {
        super.initialize();
        this.size.height = this.pageHeight;
        this.size.width = this.pageWidth;
    }
    getNearestParent(target) {
        return this;
    }
    addChild(control) {
        if (control instanceof XRCrossBandControlViewModel) {
            control.parentModel(this);
            control.startBand(this.bands()[0]);
            control.endBand(this.bands()[0]);
            this.crossBandControls.push(control);
        }
        else if (control instanceof BandViewModel) {
            addBandToContainer(this, control);
        }
        else {
            NotifyAboutWarning('Attempt to add wrong child control.');
        }
    }
    removeChild(control) {
        if (control instanceof XRCrossBandControlViewModel) {
            this.crossBandControls.splice(this.crossBandControls().indexOf(control), 1);
        }
        else if (control instanceof BandViewModel) {
            if (this.bands().length > 1) {
                this.bands.splice(this.bands().indexOf(control), 1);
            }
        }
        else {
            NotifyAboutWarning('Attempt to remove wrong child control.');
        }
    }
    clearLocalization(culture = this.language()) {
        this._localization.items.clear(culture);
        this._localization.apply(culture);
    }
    serialize() {
        this._localization.save();
        if (this.isLocalized()) {
            this._localizationItems(this._localization.serialize());
        }
        else {
            this._localization.apply(defaultCulture);
            this._localization.items.clear();
        }
        return new ReportModelSerializer(this).serialize();
    }
    save() {
        this.parameterHelper.clearLayoutItems();
        const data = this.serialize();
        if (this.onSave) {
            this.onSave(data);
        }
        return data;
    }
    getPath(propertyName) {
        const helper = ko.unwrap(this.dataSourceHelper);
        if (!helper)
            return;
        let path = helper.getDataSourcePath(this.dataSource());
        if (propertyName === 'expression' && this.dataMember())
            path += '.' + this.dataMember();
        return path;
    }
    clone(dataSourceRefsFromParent) {
        const filteredDataSourceRefs = [];
        let dataSourceRefs = [...this.dataSourceRefs];
        if (this['objectStorageIsEmpty']() && dataSourceRefsFromParent && dataSourceRefsFromParent.length) {
            dataSourceRefs = [...dataSourceRefs, ...dataSourceRefsFromParent];
        }
        const collectStorages = (storage, isComponentStorage = false) => {
            storage.reduce((result, storageItem, index) => {
                const dataSourceRef = dataSourceRefs.filter(x => x.ref === storageItem['_model']['@Ref'])[0];
                if (dataSourceRef) {
                    result.push({
                        index,
                        isComponentStorage,
                        dataSourceRef: extend(true, {}, dataSourceRef)
                    });
                }
                return result;
            }, filteredDataSourceRefs);
        };
        collectStorages(this._objectStorage());
        collectStorages(this._componentStorage(), true);
        const report = new ReportViewModel(this.save());
        report.dataSourceRefs = [];
        filteredDataSourceRefs.forEach((item) => {
            const storage = item.isComponentStorage ? report._componentStorage() : report._objectStorage();
            item.dataSourceRef.ref = storage[item.index]['_model']['@Ref'];
            report.dataSourceRefs.push(item.dataSourceRef);
        });
        return report;
    }
    isStyleProperty(propertyName) { return false; }
    get dataBindingMode() {
        return ko.unwrap(this._dataBindingMode);
    }
}
ReportViewModel.availableDataSourceTypes = ['DataSource', 'ObjectSource'];
ReportViewModel.bandsTypeOrdering = ['TopMarginBand', 'ReportHeaderBand', 'PageHeaderBand', 'GroupHeaderBand', 'DetailBand', 'DetailReportBand', 'GroupFooterBand', 'ReportFooterBand', 'PageFooterBand', 'BottomMarginBand'];
ReportViewModel.unitProperties = ['snapGridSize', 'margins'];
ReportViewModel.defaultPageSize = {
    width: 850,
    height: 1100
};
export class ReportSurface extends SurfaceElementArea {
    constructor(report, zoom = ko.observable(1)) {
        super(report, {
            measureUnit: report.measureUnit, zoom: zoom
        }, ReportSurface._unitProperties);
        this.report = report;
        this._watermarkSubscriptions = [];
        this._assignSelectedWatermark = () => {
            this._watermarkSubscriptions.push(this.watermark.imageSource.subscribe((newValue) => {
                this._updateWatermarkImageNaturalSize(newValue);
            }));
            this._updateWatermarkImageNaturalSize(this.watermark.imageSource.peek());
            this._watermarkSubscriptions.push(this._watermarkTextRenderingResult = ko.pureComputed(() => {
                const canvas = document.createElement('canvas');
                const originalWidthPx = unitsToPixel(this.report.pageWidth(), this.measureUnit());
                const originalHeightPx = unitsToPixel(this.report.pageHeight(), this.measureUnit());
                canvas.width = originalWidthPx;
                canvas.height = originalHeightPx;
                const context = canvas.getContext('2d');
                context.translate(originalWidthPx / 2, originalHeightPx / 2);
                switch (this.watermark.textDirection()) {
                    case 'Vertical':
                        context.rotate(-Math.PI / 2);
                        break;
                    case 'ForwardDiagonal':
                        context.rotate(-50 * Math.PI / 180);
                        break;
                    case 'BackwardDiagonal':
                        context.rotate(50 * Math.PI / 180);
                }
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                const font = new CssCalculator(this.watermark, ko.observable(false)).fontCss();
                context.font = [font.fontStyle.toLowerCase(), font.fontWeight.toLowerCase(), font.fontSize, font.fontFamily].filter(x => x).join(' ');
                context.fillStyle = this.watermark.foreColor();
                context.fillText(this.watermark.text(), 0, 0);
                return canvas.toDataURL('image/png');
            }));
        };
        this.surfaceContextMenuHandler = (selection, surface, e) => {
            const target = e.target;
            if (target.className === 'dxrd-band-marker-content')
                return;
            const focused = selection.focused && selection.focused();
            if (!focused)
                return;
            if (focused instanceof XRTableSurface && selection.dropTarget instanceof XRTableCellSurface
                && focused.rows && focused.rows().some(row => row === selection.dropTarget.parent))
                return;
            !selection.disabled() && selection.clickHandler(selection.dropTarget ? null : surface, e);
        };
        this.allowMultiselect = false;
        this.locked = false;
        this.focused = ko.observable(false);
        this.selected = ko.observable(false);
        this.templateName = ko.observable('dxrd-report');
        this.underCursor = ko.observable(new HoverInfo());
        this.crossBandControls = ko.observableArray();
        this.minHeight = ko.observable();
        this.maxMarkerWidth = ko.observable();
        this.validationMode = ko.observable(false);
        this.parent = null;
        this.zoom = zoom;
        this.dpi = report.dpi;
        this._disposables.push(this.rtl = ko.pureComputed(() => report.rtl() && report.rtlLayout() === 'Yes'));
        this.measureUnit = report.measureUnit;
        this._context = this;
        this._watermarkImageNaturalSize = ko.observable({ width: 0, height: 0 });
        this.drawWatermark = report.drawWatermark;
        this._disposables.push(report.watermarks.subscribe((args) => {
            args.forEach(arg => {
                if (arg.status === 'deleted') {
                    const isSelectedWatermarkDeleted = arg.index === 0;
                    if (isSelectedWatermarkDeleted) {
                        this._watermarkSubscriptions.forEach(watermark => watermark.dispose());
                        report.watermarks().length > 0 && this._assignSelectedWatermark();
                    }
                }
                else if (arg.status === 'added' && report.watermarks().length === 1) {
                    this._assignSelectedWatermark();
                }
            });
        }, null, 'arrayChange'));
        this.watermark && this._assignSelectedWatermark();
        this._disposables.push(this._width = ko.pureComputed({
            read: () => {
                return this['pageWidth']();
            }
        }));
        this._disposables.push(this._height = ko.pureComputed({
            read: () => {
                return this['pageHeight']();
            }
        }));
        this.margins = {
            bottom: this['_bottom'],
            left: this._createMargin('_left', '_right'),
            right: this._createMargin('_right', '_left'),
            top: this['_top']
        };
        this._disposables.push(this.pageWidthWithoutMargins = ko.computed(() => {
            return this.pageWidth() - this.margins.left() - this.margins.right();
        }));
        this._disposables.push(this.margins.left);
        this._disposables.push(this.margins.right);
        this._disposables.push(this.bandsHolder = new BandsHolder(this));
        this.bandsHolder.initialize(report.bands);
        this._disposables.push(ko.computed(() => {
            const levelCount = getLevelCount(this.bandsHolder);
            setMarkerWidth(this.bandsHolder, levelCount, 0);
            this.maxMarkerWidth(bandSurfaceCollapsedHeight * levelCount + 22);
        }));
        this._disposables.push(this.effectiveHeight = ko.pureComputed(() => {
            const minHeight = this.bandsHolder.getHeight();
            this.minHeight(minHeight);
            return minHeight;
        }));
        this._disposables.push(createObservableArrayMapCollection(report.crossBandControls, this.crossBandControls, this._createSurface));
        this._disposables.push(this.ghostContainerOffset = ko.pureComputed(() => {
            return this.rtl() ? 0 : this.margins.left();
        }));
        const marginOptions = new SurfaceMarginResizeOptions(this.margins, this.rtl, this.pageWidth);
        this._disposables.push(marginOptions);
        this.rightMarginOffset = marginOptions.rightMarginOffset;
        this.leftMarginOffset = marginOptions.leftMarginOffset;
        this.rightMarginResizableOffset = marginOptions.rightMarginResizableOffset;
        this.leftMarginResizableOffset = marginOptions.leftMarginResizableOffset;
        this.leftMarginResizeOptions = marginOptions.leftMarginOptions;
        this.rightMarginResizeOptions = marginOptions.rightMarginOptions;
    }
    _createMargin(side, oppositeSide) {
        return ko.pureComputed({
            read: () => this.rtl() ? this[oppositeSide]() : this[side](),
            write: (value) => {
                this.rtl() ? this[oppositeSide](value) : this[side](value);
            }
        });
    }
    _updateWatermarkImageNaturalSize(val) {
        if (!val)
            return;
        const image = new Image();
        image.src = val.getDataUrl();
        image.onload = (e) => {
            this._watermarkImageNaturalSize({ width: image.naturalWidth, height: image.naturalHeight });
            image.onload = null;
        };
    }
    get _unitAbsoluteRect() {
        return {
            top: 0, left: 0,
            right: this._control.size.width(), bottom: this._control.size.height(),
            width: this._control.size.width(), height: this._control.size.height(),
        };
    }
    dispose() {
        super.dispose();
        this._watermarkSubscriptions.forEach(watermark => watermark.dispose());
        this.disposeObservableArray(this.crossBandControls);
        this.resetObservableArray(this.crossBandControls);
    }
    get watermark() {
        return this.report.watermarks()[0];
    }
    getChildrenCollection() {
        return this.bandsHolder.bands;
    }
    isFit(dropTarget) {
        return dropTarget.underCursor().y >= -0.1
            && dropTarget.underCursor().x >= 0
            && ((this === dropTarget) ? this.effectiveHeight() : dropTarget.rect().height) > dropTarget.underCursor().y
            && (this.pageWidth() - this.margins.left()) > dropTarget.underCursor().x;
    }
    canDrop() { return true; }
    wrapRtlProperty(data, undoEngine, element) {
        const wrapper = ko.computed({
            read: data.value,
            write: (newValue) => {
                undoEngine.peek().start();
                const prevValue = this.rtl.peek();
                data.value(newValue);
                if (prevValue !== this.rtl.peek()) {
                    const report = this.getControlModel();
                    const left = report.margins.left();
                    report.margins.left(report.margins.right());
                    report.margins.right(left);
                }
                undoEngine.peek().end();
            }
        });
        addDisposeCallback(element, () => { wrapper.dispose(); });
        return assignObj(data, extend({}, data, { value: wrapper }));
    }
    clickHandler(selection, e) {
        !selection.disabled() && selection.clickHandler(this, e);
        e.stopPropagation();
    }
    reportContextMenuHandler(selection, e) {
        if (!e.target.closest('.dxrd-surface') && !selection.disabled())
            selection.clickHandler(this, e);
    }
    checkParent(surfaceParent) { return false; }
}
ReportSurface._unitProperties = {
    _width: (o) => { return o.size.width; },
    _height: (o) => { return o.size.height; },
    pageWidth: (o) => { return o.size.width; },
    pageHeight: (o) => { return o.size.height; },
    snapGridSize: (o) => {
        return o.snapGridSize;
    },
    _bottom: (o) => { return o.margins.bottom; },
    _left: (o) => { return o.margins.left; },
    _right: (o) => { return o.margins.right; },
    _top: (o) => { return o.margins.top; }
};
class SurfaceMarginResizeOptions extends Disposable {
    constructor(margins, rtl, pageWidth) {
        super();
        this.rtl = rtl;
        this.handle = 'w';
        this.oppositeHandle = 'e';
        const elements = [];
        this._disposables.push(rtl.subscribe((value) => {
            $.fn.constructor(elements).find('.ui-resizable-e, .ui-resizable-w')
                .removeClass('ui-resizable-' + (value ? this.handle : this.oppositeHandle))
                .addClass('ui-resizable-' + (value ? this.oppositeHandle : this.handle));
        }));
        let rightOptions = null;
        let leftOptions = null;
        this._disposables.push(this.rightMarginOffset = ko.pureComputed(() => {
            return rtl() ? 0 : pageWidth() - margins.left() - margins.right();
        }));
        this._disposables.push(this.leftMarginOffset = ko.pureComputed(() => {
            return rtl() ? pageWidth() - margins.left() : 0;
        }));
        this._disposables.push(this.rightMarginResizableOffset = ko.pureComputed(() => {
            return rtl() ? margins.right() : this.rightMarginOffset();
        }));
        this._disposables.push(this.leftMarginResizableOffset = ko.pureComputed(() => {
            return rtl() ? margins.right() : 0;
        }));
        this.rightMarginOptions = (undoEngine, element) => {
            if (!rightOptions) {
                let originalMarginRight = margins.right();
                let maxRightMargin = void 0;
                rightOptions = this._createOptions(undoEngine, (e, element) => {
                    originalMarginRight = margins.right();
                    maxRightMargin = pageWidth() - margins.left() - 1;
                }, (e, element) => {
                    const startResizePosition = convertFromCssPixelUnits(element.dataset.originalLeftMousePosition);
                    const positionDiff = e.pageX - startResizePosition;
                    margins.right(Math.max(0, Math.min(originalMarginRight + (rtl() ? positionDiff : -positionDiff), maxRightMargin)));
                    if (!element.classList.contains('dxrd-ruler-shadow')) {
                        $.fn.constructor(element).css({ left: this.rightMarginResizableOffset(), width: 0 });
                    }
                    else {
                        $.fn.constructor(element).css({ left: this.rightMarginOffset() });
                    }
                });
                this._disposables.push(rightOptions);
            }
            const resizableElement = new Resizable(element, rightOptions).initialize();
            addDisposeCallback(element, () => {
                resizableElement.dispose();
            });
            elements.push(element);
            return rightOptions;
        };
        this.leftMarginOptions = (undoEngine, element) => {
            if (!leftOptions) {
                let startMarginLeftPosition = margins.left();
                leftOptions = this._createOptions(undoEngine, (e, element) => {
                    startMarginLeftPosition = margins.left();
                }, (e, element) => {
                    const startResizePosition = convertFromCssPixelUnits(element.dataset.originalLeftMousePosition);
                    const sizeDiff = e.pageX - startResizePosition;
                    const maxLeftmargin = pageWidth() - margins.right();
                    margins.left(Math.min(Math.max(1, startMarginLeftPosition + (rtl() ? -sizeDiff : sizeDiff)), maxLeftmargin));
                    $.fn.constructor(element).css({ left: this.leftMarginResizableOffset(), width: (pageWidth() - margins.left() - margins.right()) });
                });
                this._disposables.push(leftOptions);
            }
            const resizableElement = new Resizable(element, leftOptions).initialize();
            addDisposeCallback(element, () => {
                resizableElement.dispose();
            });
            elements.push(element);
            return leftOptions;
        };
    }
    _createOptions(undoEngine, startDelegate, resizeDelegate) {
        return {
            handles: ko.pureComputed(() => {
                return this.rtl() ? this.oppositeHandle : this.handle;
            }),
            start: (e, ui) => {
                startDelegate(e, ui);
                undoEngine().start();
            },
            resize: (e, ui) => {
                resizeDelegate(e, ui);
            },
            stop: (e, ui) => {
                undoEngine().end();
            },
            disabled: DragDropHandler.started
        };
    }
}
