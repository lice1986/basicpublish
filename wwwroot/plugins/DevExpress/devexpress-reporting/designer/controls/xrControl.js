﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrControl.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Point, Size, SurfaceElementBase } from '@devexpress/analytics-core/analytics-elements';
import { deserializeChildArray, getFirstItemByPropertyValue } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import { FontModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { BandSurface } from '../bands/xrBand';
import { VerticalBandSurface } from '../bands/xrVerticalBand';
import { createObjectFromInfo, findFirstParentWithPropertyName } from '../internal/_createObjectFromInfo';
import { DataBindingMode } from '../internal/_dataBindingMode';
import { getNearestBand } from './getNearestBand';
import { stylesInfo, stylesObj } from './metadata/properties/style';
import { HorizontalAnchoring, VerticalAcnhoring } from './properties/anchoring';
import { SortingOptions } from './properties/sortingOptions';
import { XRReportElementViewModel } from './xrReportelement';
import { ActionTypeBase, NavigateToReportAction } from './properties/action';
export class XRControlViewModel extends XRReportElementViewModel {
    constructor(control, parent, serializer) {
        super(control, parent, serializer);
        if (this.text) {
            this.textArea = this.text;
        }
        this.controls = deserializeChildArray(control.Controls, this, (childControl) => { return this.createControl(childControl, serializer); });
        if (this.anchorVertical || this.anchorHorizontal) {
            this.anchoring(parent);
            this._disposables.push(this.parentModel.subscribe((newParent) => {
                if (this.vertAnchoring && this.horAnchoring && newParent) {
                    this.vertAnchoring.start(newParent.size.height, this);
                    this.horAnchoring.start(newParent.size.width, this);
                }
                else {
                    this.anchoring(newParent);
                }
            }));
        }
        if (this.interactiveSorting) {
            this.interactiveSorting = new SortingOptions(control['InteractiveSorting'], this.root, serializer);
            this._disposables.push(this.interactiveSorting);
        }
        this._disposables.push(this.hasBindings = ko.pureComputed(() => {
            const bindings = this.dataBindings && this.dataBindings();
            return !!bindings && bindings.filter((dataBinding) => { return !dataBinding.isEmpty(); }).length > 0 || this.hasExpressionBindings();
        }));
        const stylesObject = createObjectFromInfo(this, stylesInfo);
        if (stylesObject) {
            this[stylesObj.propertyName] = stylesObject;
        }
        if (this['Summary'])
            this['Summary'].isPropertyVisible = (propertyName) => {
                return propertyName === 'Func' ? this.isPropertyVisible('dataBindings') : true;
            };
        if (this.textFormatString) {
            const binding = this['dataBindings'] && this['dataBindings']().filter(binding => binding.propertyName() === 'Text')[0];
            let summaryFormatString = null;
            let bindingFormatString = null;
            this['_textFormatString'] = ko.observable(this.textFormatString.peek());
            [summaryFormatString, bindingFormatString] = [this['Summary'], binding].map(obj => {
                if (obj && obj['formatString']) {
                    obj['_formatString'] = ko.observable(obj['formatString'].peek());
                    this._disposables.push(obj['formatString'] = ko.computed({
                        read: () => this['_textFormatString']() ||
                            obj['_formatString'](),
                        write: x => { this.textFormatString(x); }
                    }));
                    return obj['_formatString'];
                }
            });
            this._disposables.push(this.textFormatString = ko.computed({
                read: () => this['_textFormatString']() ||
                    summaryFormatString && summaryFormatString() ||
                    bindingFormatString && bindingFormatString(),
                write: x => {
                    this['_textFormatString'](x);
                    summaryFormatString && summaryFormatString(null);
                    bindingFormatString && bindingFormatString(null);
                }
            }));
        }
        if (control.Action) {
            if (control.Action['@Name'].indexOf('NavigateToReport') !== -1) {
                this.action = ko.observable(new NavigateToReportAction(this.name(), control.Action, this, serializer, (report, serializer) => this.root.createReportViewModel(report, serializer)));
            }
        }
        else {
            this.action = ko.observable(new ActionTypeBase(this, this.name(), true));
        }
        this.dataBindingsAreValid = ko.observable(true);
        this._disposables.push(ko.computed(() => {
            const bindings = this.dataBindings && this.dataBindings();
            if (bindings) {
                if (bindings.length === 0)
                    this.dataBindingsAreValid(true);
                else {
                    const report = this.root;
                    if (!report || !(report.controlType === 'DevExpress.XtraReports.UI.XtraReport'))
                        return;
                    const dsHelper = report.dsHelperProvider();
                    const parameters = report.parameters();
                    const fieldListProvider = report.getControlFactory().fieldListProvider();
                    if (!dsHelper || !parameters || !fieldListProvider)
                        return;
                    const defaultDataSourceInfo = dsHelper.findDataSourceInfo(ko.unwrap(findFirstParentWithPropertyName(this, 'dataSource').dataSource));
                    let reqFinished = 0;
                    const reqCount = bindings.length;
                    let reqResult = true;
                    const deferred = $.Deferred();
                    for (let i = 0; i < bindings.length; i++) {
                        const binding = bindings[i], parameter = binding.parameter(), dataMember = binding.dataMember(), dataSource = binding.dataSource();
                        if (parameter) {
                            if (dataSource)
                                reqResult = false;
                            else
                                reqResult = reqResult && parameters.some(x => x.name === parameter.name);
                            reqFinished++;
                        }
                        else if (dataMember) {
                            let dsInfo = null;
                            if (dataSource) {
                                dsInfo = dataSource['dataSourceInfo'];
                                if (dsHelper.usedDataSources().indexOf(dsInfo) < 0) {
                                    reqResult = false;
                                    reqFinished++;
                                }
                            }
                            else {
                                dsInfo = defaultDataSourceInfo;
                            }
                            if (dsInfo) {
                                const lastPart = dataMember.slice(dataMember.lastIndexOf('.') + 1);
                                fieldListProvider.getItems(new PathRequest([dsInfo.id || dsInfo.ref].concat(...dataMember.split('.').slice(0, -1)).join('.')))
                                    .done(result => { if (result.every(x => x.isList || x.name !== lastPart))
                                    reqResult = false; })
                                    .fail(() => { reqResult = false; })
                                    .always(() => { if (++reqFinished === reqCount)
                                    deferred.resolve(reqResult); });
                            }
                            else {
                                reqResult = false;
                                reqFinished++;
                            }
                        }
                        else if (dataSource) {
                            reqResult = false;
                            reqFinished++;
                        }
                        else
                            reqFinished++;
                        if (!reqResult) {
                            reqFinished += reqCount - 1 - i;
                            break;
                        }
                    }
                    if (reqFinished === reqCount)
                        deferred.resolve(reqResult);
                    deferred.done(result => { this.dataBindingsAreValid(result); });
                }
            }
        }));
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.controls);
        this.resetObservableArray(this.controls);
    }
    anchoring(parent) {
        if (parent) {
            this.vertAnchoring = new VerticalAcnhoring(parent.size.height, this, this.anchorVertical);
            this.horAnchoring = new HorizontalAnchoring(parent.size.width, this, this.anchorHorizontal);
            this._disposables.push(this.vertAnchoring);
            this._disposables.push(this.horAnchoring);
        }
    }
    getNearestParent(target) {
        if (['XRPageBreak', 'XRPivotGrid', 'XRSubreport', 'XRTableOfContents', 'XRPdfContent'].indexOf(this.controlType) !== -1) {
            return getNearestBand(target);
        }
        else {
            return super.getNearestParent(target);
        }
    }
    isPropertyDisabled(name) {
        if (name === 'textFitMode') {
            return this['canGrow']() || this['canShrink']() || (this.controlType === 'XRLabel' && this['autoWidth']());
        }
        else if (name === 'processNullValues') {
            return this['Summary'] && ko.unwrap(this['Summary']['Running']) !== 'None';
        }
        else if (name === 'allowMarkupText') {
            return this['textEditOptions'] && ko.unwrap(this['textEditOptions']['enabled']);
        }
        else if (name === 'textEditOptions' || name === 'angle') {
            return this['allowMarkupText'] && ko.unwrap(this['allowMarkupText']);
        }
        return super.isPropertyDisabled(name);
    }
    isPropertyVisible(name) {
        if (this.multiline && this.multiline()) {
            if (name === 'text')
                return false;
        }
        else {
            if (name === 'textArea')
                return false;
        }
        return super.isPropertyVisible(name);
    }
    hasExpressionBindings() {
        return !!(this.expressionBindings && this.expressionBindings().filter(binding => !!binding.expression())[0]);
    }
    hasDataBindingByName(property = 'Text') {
        const bindings = this.dataBindings && this.dataBindings() && this.dataBindings().filter((dataBinding) => { return !dataBinding.isEmpty(); });
        if (!!bindings && bindings.length > 0) {
            const binding = this.dataBindings()['findBinding'](property);
            return !!binding && !binding.isEmpty();
        }
        return !!(this.expressionBindings && this.expressionBindings().filter(binding => binding.propertyName() === property).length > 0);
    }
    get hasDefaultBindingProperty() {
        return !!this.getControlInfo().defaultBindingName;
    }
    getExpressionBinding(property = 'Text', event = 'BeforePrint') {
        if (!this.expressionBindings)
            return null;
        const binding = this.expressionBindings().filter(binding => binding.propertyName() === property && binding.eventName() === event)[0];
        return binding && binding.expression();
    }
    setExpressionBinding(value, property = 'Text', event = 'BeforePrint') {
        if (!this.expressionBindings)
            return;
        const binding = this.expressionBindings().filter(binding => binding.propertyName() === property && binding.eventName() === event)[0];
        binding && binding.expression(value);
    }
    getControlInfo() {
        return super.getControlInfo();
    }
    getDefaultBinding() {
        const bindingName = this.getControlInfo().defaultBindingName;
        if (this.dataBindingMode !== DataBindingMode.Bindings) {
            return this.expressionObj.getExpression(bindingName, 'BeforePrint');
        }
        else {
            return this.dataBindings().filter(x => x.propertyName() === bindingName)[0];
        }
    }
}
export class XRControlSurfaceBase extends SurfaceElementBase {
    constructor(control, context, unitProperties) {
        super(control, context, unitProperties);
        this.delta = 0.0001;
        this.template = 'dxrd-control';
        this.selectiontemplate = 'dxrd-control-selection';
        this.contenttemplate = 'dxrd-control-content';
        this.displayNameParameters = ko.pureComputed(() => {
            const control = this.getControlModel();
            const parameters = {
                text: null,
                isExpression: true,
                dataSource: null,
                dataMember: null,
                dataMemberOffset: null,
                allowMarkupText: false,
                wordWrap: false,
                fontSize: 0,
                fontUnit: null
            };
            if (control['controls'] && control['controls']().length !== 0) {
                parameters.text = '';
                return parameters;
            }
            parameters.text = control['getExpressionBinding'] && control['getExpressionBinding']();
            parameters.isExpression = !!parameters.text;
            parameters.allowMarkupText = control['allowMarkupText'] && control['allowMarkupText']();
            parameters.wordWrap = control['wordWrap'] && control['wordWrap']();
            if (control['font']) {
                const _font = new FontModel(control['font']);
                parameters.fontSize = _font.size();
                parameters.fontUnit = _font.unit();
                _font.dispose();
            }
            if (parameters.isExpression) {
                parameters.dataMember = control['getPath'] && control['getPath']('expression') || '';
                return parameters;
            }
            if (control['dataBindings'] && this.hasBindings) {
                const textBinding = getFirstItemByPropertyValue(control['dataBindings'](), 'propertyName', 'Text');
                if (textBinding && textBinding.dataMember()) {
                    const dataMember = textBinding.dataMember();
                    const dataSource = textBinding.dataSource();
                    const parentWithDS = findFirstParentWithPropertyName(control, 'dataSource');
                    const rootDataMember = parentWithDS['dataMember'] && parentWithDS['dataMember']() || '';
                    const rootDataSource = parentWithDS['dataSource'] && parentWithDS['dataSource']() || null;
                    if ((!dataSource || dataSource === rootDataSource) && dataMember.indexOf(rootDataMember) === 0 && dataMember.charAt(rootDataMember.length) === '.') {
                        parameters.dataMemberOffset = rootDataMember;
                        parameters.dataMember = dataMember.substr(rootDataMember.length + 1);
                    }
                    else {
                        parameters.dataMemberOffset = '';
                        parameters.dataMember = textBinding.dataMember();
                    }
                    parameters.dataSource = dataSource || rootDataSource;
                    return parameters;
                }
            }
            parameters.text = this.displayText();
            return parameters;
        });
        this.displayName = ko.pureComputed(() => {
            const parameters = this.displayNameParameters();
            return parameters.dataMember ? ('[' + parameters.dataMember + ']') : (parameters.text || '');
        });
        this._disposables.push(this.contentSizes = ko.pureComputed(() => this.cssCalculator.contentSizeCss(this.rect().width, this.rect().height, this._context.zoom())));
        this._disposables.push(this.contentHeightWithoutZoom = ko.pureComputed(() => this.contentSizes().height / this._context.zoom()));
        this._disposables.push(this.contentWidthWithoutZoom = ko.pureComputed(() => this.contentSizes().width / this._context.zoom()));
        this._disposables.push(this.borderCss = ko.pureComputed(() => {
            return (!control['borders'] || control['borders']() === 'None') ? { 'border': 'solid 1px Silver' } : this.cssCalculator.borderCss(this._context.zoom());
        }));
        this._disposables.push(this.isIntersect = ko.pureComputed(() => {
            return this.isThereIntersectionWithUsefulArea() ||
                this.isThereIntersectionWithCrossBandControls() ||
                this.isThereIntersectionWithControls();
        }).extend({ deferred: true }));
        this._disposables.push(this.adorntemplate = ko.computed(() => { return this.getAdornTemplate(); }));
        this._disposables.push(this.displayNameParameters);
        this._disposables.push(this.displayName);
    }
    _isThereIntersectionWithUsefulArea(useFullWidth) {
        const absoluteRect = this._unitAbsoluteRect;
        return Math.max(absoluteRect.left, absoluteRect.right) - useFullWidth > this.delta;
    }
    static _appendValue(accumulator, value, needToAppend = true) {
        if (needToAppend) {
            accumulator += accumulator ? (' ' + value) : value;
        }
        return accumulator;
    }
    get _unitAbsoluteRect() {
        const parentAbsoluteRect = this.parent && this.parent['_unitAbsoluteRect'];
        if (parentAbsoluteRect) {
            return {
                top: parentAbsoluteRect.top + this._unitRect.top,
                left: parentAbsoluteRect.left + this._unitRect.left,
                right: parentAbsoluteRect.left + this._unitRect.left + this._unitRect.width,
                bottom: parentAbsoluteRect.top + this._unitRect.top + this._unitRect.height,
                width: this._unitRect.width,
                height: this._unitRect.height
            };
        }
        else {
            return this._unitRect;
        }
    }
    get _unitRect() {
        const location = this._control['location'] || new Point(0, 0), size = this._control['size'] || new Size(0, 0);
        return {
            top: location.y(),
            left: location.x(),
            right: location.x() + size.width(),
            bottom: location.y() + size.height(),
            width: size.width(),
            height: size.height()
        };
    }
    checkParent(surfaceParent) {
        const thisParent = this.parent instanceof BandSurface || this.parent && this.parent._control.controlType === 'DevExpress.XtraReports.UI.XtraReport' ? null : this.parent;
        const anotherParent = surfaceParent instanceof BandSurface || this.parent && this.parent._control.controlType === 'DevExpress.XtraReports.UI.XtraReport' ? null : surfaceParent;
        return thisParent === anotherParent;
    }
    isThereIntersection(rect1, rect2) {
        const rect1Right = rect1.right || rect1.left + rect1.width, rect2Right = rect2.right || rect2.left + rect2.width, rect1Bottom = rect1.bottom || rect1.top + rect1.height, rect2Bottom = rect2.bottom || rect2.top + rect2.height;
        return rect1Right > rect2.left && Math.abs(rect1Right - rect2.left) >= 0.0001 &&
            rect2Right > rect1.left && Math.abs(rect2Right - rect1.left) >= 0.0001 &&
            rect1Bottom > rect2.top && Math.abs(rect1Bottom - rect2.top) >= 0.0001 &&
            rect2Bottom > rect1.top && Math.abs(rect2Bottom - rect1.top) >= 0.0001;
    }
    isThereIntersectionWithParent(parentRect, childRect) {
        const rectWidhtElement = childRect.right || childRect.left + childRect.width, rectHeightElement = childRect.bottom || childRect.top + childRect.height;
        return rectWidhtElement > parentRect.width && Math.abs(rectWidhtElement - parentRect.width) > this.delta ||
            rectHeightElement > parentRect.height && Math.abs(rectHeightElement - parentRect.height) > this.delta;
    }
    isThereIntersectionWithUsefulArea() {
        const _container = this.container();
        if (_container instanceof BandSurface && _container['_unitAbsoluteRect']) {
            const absoluteRect = this.container()['_unitAbsoluteRect'];
            return this._isThereIntersectionWithUsefulArea(absoluteRect.width);
        }
        else if (_container instanceof VerticalBandSurface) {
            return false;
        }
        else {
            const root = this.getRoot(), usefulPageWidth = root['_unitAbsoluteRect'].width;
            return this._isThereIntersectionWithUsefulArea(usefulPageWidth);
        }
    }
    isThereIntersectionWithCrossBandControls(currentRect = this._unitAbsoluteRect) {
        if (!currentRect)
            return false;
        let isThereIntersection = false;
        const crossBandControls = this.getRoot()['crossBandControls']();
        if (this.isThereIntersectionWithNeighborsCollection(currentRect, crossBandControls.filter((control) => { return control.visible() && control.getControlModel().controlType === 'XRCrossBandLine'; }), '_unitAbsoluteRect')) {
            return true;
        }
        const crossBandBoxControls = crossBandControls.filter((control) => { return control.visible() && control.getControlModel().controlType === 'XRCrossBandBox'; });
        for (let crossbandIndex = 0; crossbandIndex < crossBandBoxControls.length; crossbandIndex++) {
            const rects = crossBandBoxControls[crossbandIndex]._getCrossBandBoxSides();
            for (let rectIndex = 0; rectIndex < rects.length; rectIndex++) {
                if (this !== crossBandBoxControls[crossbandIndex] && this.isThereIntersection(currentRect, rects[rectIndex])) {
                    isThereIntersection = true;
                    break;
                }
            }
            if (isThereIntersection)
                break;
        }
        return isThereIntersection;
    }
    isThereIntersectionWithControls() {
        const collectionControls = this.parent && this.parent.getChildrenCollection() && this.parent.getChildrenCollection()().filter((control) => { return !control.isIntersectionDeny; }) || [];
        return this.isThereIntersectionWithParentCollection(this._unitRect)
            || this.isThereIntersectionWithChildCollection()
            || this.isThereIntersectionWithNeighborsCollection(this._unitRect, collectionControls);
    }
    isThereIntersectionWithParentCollection(currentRect, controlRectProperty = '_unitRect') {
        return this.parent && this.parent instanceof XRControlSurfaceBase &&
            this.parent[controlRectProperty] && this.isThereIntersectionWithParent(this.parent[controlRectProperty], currentRect);
    }
    isThereIntersectionWithChildCollection(controlRectProperty = '_unitRect') {
        return this['controls'] && this['controls']().length > 0 &&
            this.isThereIntersectionWithChildControls(this['controls'](), controlRectProperty);
    }
    isThereIntersectionWithNeighborsCollection(currentRect, collectionControls, controlRectProperty = '_unitRect') {
        for (let i = 0; i < collectionControls.length; i++) {
            if (this !== collectionControls[i] && this.isThereIntersection(currentRect, collectionControls[i][controlRectProperty])) {
                return true;
            }
        }
        return false;
    }
    isThereIntersectionWithChildControls(collectionControls, controlRectProperty = '_unitRect') {
        const currentRect = this[controlRectProperty];
        for (let i = 0; i < collectionControls.length; i++) {
            if (this !== collectionControls[i] && this.isThereIntersectionWithParent(currentRect, collectionControls[i][controlRectProperty])) {
                return true;
            }
        }
        return false;
    }
    getAdornTemplate() {
        let result = XRControlSurface._appendValue('', 'dxrd-intersect', this.isIntersect());
        result = XRControlSurface._appendValue(result, 'dxrd-control-rtl', this._control.rtl());
        result = XRControlSurface._appendValue(result, 'dxrd-uiselected', this.selected());
        if (this.hasBindings) {
            if (this._context['validationMode'] && this._context['validationMode']()) {
                if (!this.bindingsIsValid) {
                    result = XRControlSurface._appendValue(result, 'dxrd-image-surface-bounded-notvalid', true);
                }
                else if (this.bindingsHasWarning) {
                    result = XRControlSurface._appendValue(result, 'dxrd-image-surface-bounded-warning', true);
                }
                else
                    result = XRControlSurface._appendValue(result, 'dxrd-image-surface-bounded', true);
            }
            else
                result = XRControlSurface._appendValue(result, 'dxrd-image-surface-bounded', true);
        }
        if (this._control['visible']) {
            result = XRControlSurface._appendValue(result, 'dxrd-surface-hidden', !this._control['visible']());
        }
        return result;
    }
    hasDataBindingByName(propertyName) {
        return !!(this._control['hasDataBindingByName'] && this._control['hasDataBindingByName'](propertyName));
    }
    get hasBindings() { return !!(this._control['hasBindings'] && this._control['hasBindings']()); }
    get bindingsIsValid() {
        if (this._control['dataBindingMode'] !== 'Bindings') {
            if (!!this._control['expressionBindings']) {
                return this._control['expressionObj'].validateExpression();
            }
            return true;
        }
        else {
            return this._control['dataBindingsAreValid']();
        }
    }
    get bindingsHasWarning() {
        if (this._control['dataBindingMode'] !== 'Bindings') {
            if (!!this._control['expressionBindings']) {
                return this._control['expressionObj'].hasWarning();
            }
            return false;
        }
    }
    displayText() {
        if (this._control.controlType == 'XRPanel')
            return getLocalization('Place controls here to keep them together', 'ReportStringId.PanelDesignMsg');
        let text = this._control['text'] && this._control['text']() ? this._control['text']() : '';
        if (this._control['multiline'] && !this._control['multiline']()) {
            text = text.replace(/\r/g, '').replace(/\n/g, '');
        }
        return text;
    }
}
export class XRControlSurface extends XRControlSurfaceBase {
    constructor(control, context) {
        super(control, context, XRControlSurface._unitProperties);
        this['multiline'] = control['multiline'] || false;
        this.getUsefulRect = () => {
            const borderWidth = ko.unwrap(control['borderWidth']), borderFlags = control['borders']();
            const rect = { top: 0, left: 0, width: this.rect().width, height: this.rect().height };
            if (borderWidth) {
                if (borderFlags === 'All') {
                    rect.height -= 2 * borderWidth;
                    rect.width -= 2 * borderWidth;
                }
                else {
                    if (borderFlags.indexOf('Top') >= 0)
                        rect.height -= borderWidth;
                    if (borderFlags.indexOf('Right') >= 0)
                        rect.width -= borderWidth;
                    if (borderFlags.indexOf('Bottom') >= 0)
                        rect.height -= borderWidth;
                    if (borderFlags.indexOf('Left') >= 0)
                        rect.width -= borderWidth;
                }
            }
            return rect;
        };
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.controls);
        this.resetObservableArray(this.controls);
    }
}
XRControlSurface._unitProperties = {
    _height: (o) => {
        return o.size.height;
    },
    _width: (o) => {
        return o.size.width;
    },
    _x: (o) => {
        return o.location.x;
    },
    _y: (o) => {
        return o.location.y;
    }
};
