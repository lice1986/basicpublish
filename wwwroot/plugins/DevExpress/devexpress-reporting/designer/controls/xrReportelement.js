﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrReportelement.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, Size } from '@devexpress/analytics-core/analytics-elements';
import { formatUnicorn } from '@devexpress/analytics-core/analytics-internal';
import { deserializeArray, getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { stylesProperties } from '../helpers/_styleHelper';
import { findFirstParentWithPropertyName } from '../internal/_createObjectFromInfo';
import { DataBindingMode } from '../internal/_dataBindingMode';
import { createExpressionEditorAction } from '../internal/_expressionEditorAction';
import { controlsFactory } from '../utils/settings';
import { ReportExpressionEditorWrapper } from '../widgets/expressioneditor/reportExpressionEditorWrapper';
import { getNearestBand } from './getNearestBand';
import { stylePrioritySerializationInfo } from './metadata/properties/metadata';
import { FormattingRuleLink } from './properties/formattingrules';
import { isHeaderOrFooterBandType } from './utils/_headOrFooterBandType';
import { DefaultLocalizationProvider } from './utils/_localizationUtils';
import { createPaddingProperty } from './utils/_paddingUtils';
export class XRReportElementViewModel extends ElementViewModel {
    constructor(model, parent, serializer) {
        super(model, parent, serializer);
        this._expressionActions = {};
        this.initialize();
        this.formattingRuleLinks = deserializeArray(model.FormattingRuleLinks, (item) => { return new FormattingRuleLink(item, serializer); });
        const _generateProperty = (propertyName, stylePriorityName) => {
            this['_' + propertyName] = ko.observable(this[propertyName]());
            this._disposables.push(this[propertyName] = ko.computed({
                read: () => this._getStyleProperty(propertyName, stylePriorityName, this.root),
                write: (val) => {
                    if (this._getStyleProperty(propertyName, stylePriorityName, this.root) !== val) {
                        if (this.stylePriority && this.stylePriority[stylePriorityName]) {
                            this.stylePriority[stylePriorityName](false);
                        }
                        this['_' + propertyName](val);
                    }
                }
            }));
        };
        this.dsHelperProvider = () => this.root['dataSourceHelper'] && this.root['dataSourceHelper']();
        this.initBindings();
        this.getStyleProperty = (propertyName, stylePriorityName) => this._getStyleProperty(propertyName, stylePriorityName, this.root);
        for (let i = 0; i < stylesProperties.length; i++) {
            if (this[stylesProperties[i]]) {
                const stylePriorityName = this._getStylePriorityPropertyName(stylesProperties[i]);
                _generateProperty(stylesProperties[i], stylePriorityName);
            }
        }
        if (this.padding) {
            this._createPaddingDependencies();
        }
        this.toggleUseStyle = (propertyName) => {
            const styleName = this._getStylePriorityPropertyName(propertyName);
            this.stylePriority[styleName](!this.stylePriority[styleName]());
        };
        this.actions.push({ action: this.toggleUseStyle, title: getLocalization('Style Priority', 'DevExpress.XtraReports.UI.XRControl.StylePriority'), visible: name => this.isStyleProperty(name) });
        this.actionProviders.push({ getActions: (name) => this._getExpressionActions(name) });
        this._disposables.push(this.lockedInUserDesigner = ko.computed({
            read: () => {
                const parent = this.parentModel(), parentLocked = (parent && parent['lockedInUserDesigner']) ? parent['lockedInUserDesigner']() : false;
                return this._lockedInUserDesigner() || parentLocked;
            },
            write: newValue => this._lockedInUserDesigner(newValue)
        }));
    }
    get _localizationProvider() {
        if (!this.__localizationProvider) {
            this.__localizationProvider = this.createLocalizationProvider();
        }
        return this.__localizationProvider;
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.dataBindings);
        this.resetObservableArray(this.formattingRuleLinks);
        this.resetObservableArray(this.dataBindings);
        this.__localizationProvider = null;
    }
    createLocalizationProvider() {
        return new DefaultLocalizationProvider(this);
    }
    getLocalizationProperty(propertyName) {
        return this._localizationProvider.getLocalizationProperty(propertyName);
    }
    getLocalizationProperties() {
        return this._localizationProvider.getLocalizationProperties();
    }
    applyLocalization(propertyName, propertyValue) {
        this._localizationProvider.applyLocalization(propertyName, propertyValue);
    }
    _resetProperty(propertyName) {
        super._resetProperty(propertyName);
        this._resetExpressions(propertyName);
    }
    _getControlPropertyName(propertyName) {
        propertyName = propertyName === 'paddingObj' ? 'padding' : propertyName;
        propertyName = propertyName === 'textArea' ? 'text' : propertyName;
        return propertyName;
    }
    _getStylePriorityPropertyName(propertyName) {
        propertyName = this._getControlPropertyName(propertyName);
        return 'use' + propertyName.charAt(0).toUpperCase() + propertyName.substr(1);
    }
    _getStyle(root) {
        const styleName = this.styleName && this.styleName(), style = styleName && root && root.findStyle && root.findStyle(styleName);
        return style;
    }
    _checkStylePropertyModify(target, propertyName) {
        const property = ko.unwrap(target && (target['_' + propertyName] || target[propertyName]));
        return property != null && target.isPropertyModified(propertyName);
    }
    _getStyleProperty(propertyName, stylePriorityName, root) {
        if (this.stylePriority && this.stylePriority[stylePriorityName] && this.stylePriority[stylePriorityName]() || !this._checkStylePropertyModify(this, propertyName)) {
            const style = this._getStyle(root);
            if (style && this._checkStylePropertyModify(style, propertyName)) {
                return style[propertyName]();
            }
        }
        if (this._checkStylePropertyModify(this, propertyName)) {
            return this['_' + propertyName]();
        }
        const defaultValue = this.getPropertyDefaultValue(propertyName);
        if (defaultValue && !(defaultValue instanceof Object)) {
            return defaultValue;
        }
        const parent = this.parentModel();
        if (parent) {
            return parent.getStyleProperty(propertyName, stylePriorityName);
        }
    }
    _zOrderChange(bringToFront) {
        const parent = this.parentModel(), controlContainer = parent && parent[this.getControlContainerName()];
        if (controlContainer) {
            const itemIndex = controlContainer().indexOf(this);
            const items = controlContainer();
            items.splice(itemIndex, 1);
            items.splice((bringToFront ? 0 : controlContainer().length), 0, this);
            controlContainer.valueHasMutated();
        }
    }
    _createPaddingDependencies() {
        createPaddingProperty(this, this.root);
        this.paddingObj['isPropertyHighlighted'] = (propertyName) => {
            return this.isPropertyHighlighted(propertyName, 'padding');
        };
    }
    _getExpressionActions(name) {
        if (!this._expressionActions[name]) {
            this._expressionActions[name] = this._addExpressionActions(name);
        }
        return this._expressionActions[name];
    }
    _getExpressionEvents() {
        const events = [
            { name: 'BeforePrint', localizationId: 'DevExpress.XtraReports.UI.XRControlEvents.OnBeforePrint', displayName: 'BeforePrint' }
        ];
        if (this.dataBindingMode === DataBindingMode.ExpressionsAdvanced) {
            events.push({ name: 'PrintOnPage', localizationId: 'DevExpress.XtraReports.UI.XRControlEvents.OnPrintOnPage', displayName: 'PrintOnPage' });
        }
        return events;
    }
    _addExpressionActions(propertyName) {
        if (this.dataBindingMode === DataBindingMode.Bindings) {
            return [];
        }
        const expressionName = this._getExpressionNameByPropertyName(propertyName);
        if (!expressionName)
            return [];
        const events = this._getExpressionEvents();
        const allExpressionsTreeItems = this.expressionObj.getExpressionsTreeItems(expressionName);
        if (!allExpressionsTreeItems || !allExpressionsTreeItems.length)
            return [];
        const expressionForLocalizedString = getLocalization('{0} Expression', 'ReportStringId.UD_PropertyGrid_Menu_ItemExpression');
        const convertToMenuAction = (item) => {
            const hasInnerItems = item.innerItems && !!item.innerItems.length;
            const expressionEditor = hasInnerItems ? null : new ReportExpressionEditorWrapper(ko.observable(this), ko.observable(item.expressionObj));
            const currentEventInfo = events.filter(x => x.name === item.eventName)[0];
            const eventLocalizedName = currentEventInfo ? getLocalization(currentEventInfo.displayName, currentEventInfo.localizationId) : item.eventName;
            const expressionLocalizedName = !item.displayName && !item.localizationId ? item.expressionName : getLocalization(item.displayName, item.localizationId);
            const menuAction = createExpressionEditorAction({
                expressionEditor,
                hasInnerItems,
                title: item.eventName ? eventLocalizedName : formatUnicorn(expressionForLocalizedString, expressionLocalizedName),
                hint: ko.computed(() => {
                    return item.expressionObj && item.expressionObj.value();
                }),
            });
            menuAction.items = (item.innerItems || []).map(convertToMenuAction);
            this._disposables.push(menuAction.hint);
            return menuAction;
        };
        return allExpressionsTreeItems.map(convertToMenuAction);
    }
    getControlFactory() {
        return controlsFactory();
    }
    addChild(control) {
        if (control.controlType === 'XRTableOfContents' && !isHeaderOrFooterBandType(this)) {
            const band = getNearestBand(this);
            if (band) {
                if (isHeaderOrFooterBandType(band)) {
                    band.addChild(control);
                }
                return;
            }
            else {
                throw new Error('TOC can be added only to ReportHeaderBand or ReportFooterBand!!!');
            }
        }
        super.addChild(control);
    }
    initDataBindingProperties() {
        const bindingInfos = this.getInfo().filter(info => 'bindingName' in info);
        bindingInfos.forEach(info => {
            this[info.propertyName] = this.dataBindings()['findBinding'](info['bindingName']);
        });
    }
    initExpressionProperties() {
        if (!this.expressionBindings)
            return;
        const path = ko.pureComputed(() => {
            return this.getPath('expression');
        });
        this._disposables.push(path);
        this.expressionObj = this.getControlFactory()._createExpressionObject(this.controlType, this.expressionBindings, path, (name) => this['Summary'] && this['Summary']['Running'] && this.getControlInfo().defaultBindingName === name && ko.computed(() => {
            return this['Summary']['Running']() != 'None';
        }));
        if (!this.expressionObj)
            return;
        this._disposables.push(this.expressionObj);
        const expressionInfos = this.getInfo().filter(info => 'expressionName' in info);
        expressionInfos.forEach(info => {
            const expression = this.expressionObj.getExpression(info['expressionName'], 'BeforePrint');
            if (expression)
                this[info.propertyName] = expression;
        });
    }
    _resetExpressions(propertyName) {
        const modelName = this._getExpressionNameByPropertyName(propertyName);
        if (!modelName)
            return;
        this._getExpressionEvents().forEach((event) => {
            const expressionPropertyInfo = this.expressionObj.getExpression(modelName, event.name);
            if (!expressionPropertyInfo)
                return;
            if (expressionPropertyInfo['getInfo']) {
                (expressionPropertyInfo['getInfo']() || []).forEach(info => {
                    const value = expressionPropertyInfo[info.propertyName].value;
                    value && value('');
                });
            }
            else {
                expressionPropertyInfo.value && expressionPropertyInfo.value('');
            }
        });
    }
    _hasAnyExpressions(propertyName, predicateFunc = (value) => !!ko.unwrap(value)) {
        const modelName = this._getExpressionNameByPropertyName(propertyName);
        if (!modelName)
            return false;
        let returnValue = false;
        const events = this._getExpressionEvents();
        events.forEach((event) => {
            const expressionPropertyInfo = this.expressionObj.getExpression(modelName, event.name);
            if (!expressionPropertyInfo)
                return;
            const getInfoAction = expressionPropertyInfo['getInfo'];
            let expressionExists = false;
            if (getInfoAction) {
                const info = getInfoAction() || [];
                expressionExists = info.filter(info => {
                    return predicateFunc(expressionPropertyInfo[info.propertyName].value, info.propertyName);
                }).length > 0;
            }
            else {
                expressionExists = predicateFunc(expressionPropertyInfo.value);
            }
            returnValue = returnValue || expressionExists;
        });
        return returnValue;
    }
    _getExpressionNameByPropertyName(propertyName, info = this.getInfo()) {
        if (this.dataBindingMode === DataBindingMode.Bindings) {
            return '';
        }
        propertyName = this._getControlPropertyName(propertyName);
        const propInfo = this.getInfo().filter(info => info.propertyName === propertyName)[0];
        if (!propInfo || !propInfo.modelName) {
            return '';
        }
        return propInfo.modelName.substring(propInfo.modelName.lastIndexOf('@') + 1);
    }
    initBindings() {
        this.initDataBindingProperties();
        this.initExpressionProperties();
    }
    isStyleProperty(propertyName) {
        return this.stylePriority && stylePrioritySerializationInfo.some((info) => { return info.propertyName == this._getStylePriorityPropertyName(propertyName); });
    }
    isResettableProperty(propertyName) {
        return super.isResettableProperty(propertyName) && propertyName !== 'dataBindings';
    }
    getActionClassName(propertyName) {
        const result = {};
        result['dxrd-editormenu-usestyle'] = this.isStyleProperty(propertyName) && this.stylePriority[this._getStylePriorityPropertyName(propertyName)]();
        result['dxrd-editormenu-modified'] = this.isPropertyModified(propertyName);
        const hasExpression = this._hasAnyExpressions(propertyName);
        result['dxrd-editormenu-expressions'] = hasExpression;
        result['dxd-icon-accented'] = hasExpression;
        return result;
    }
    getMenuBoxTemplate(propertyName) {
        if (this._hasAnyExpressions(propertyName))
            return 'dxrd-svg-tabs-expressions';
        return '';
    }
    className() {
        return this.controlType.toLowerCase();
    }
    initialize() {
        if (!this.size) {
            this.size = new Size(0, 0);
        }
    }
    getPath(propertyName) {
        if (propertyName === 'expression' && this.dsHelperProvider()) {
            const firstParentWithDS = findFirstParentWithPropertyName(this, 'dataSource');
            const rootDataSourceName = this.dsHelperProvider().getDataSourcePath(ko.unwrap(firstParentWithDS['dataSource']));
            const rootDataMember = ko.unwrap(firstParentWithDS['dataMember']) || '';
            if (!!rootDataSourceName) {
                return !!rootDataMember ? [rootDataSourceName, rootDataMember].join('.') : rootDataSourceName;
            }
            else {
                return '';
            }
        }
        return '';
    }
    isPropertyDisabled(name) {
        return this.lockedInUserDesigner();
    }
    isPropertyVisible(name) {
        if (this.dataBindingMode !== DataBindingMode.Bindings) {
            return name !== 'dataBindings'
                && name !== 'formattingRuleLinks'
                && name !== 'formattingRuleSheet'
                && name.indexOf('popularDataBinding') !== 0;
        }
        else {
            return name.indexOf('popularExpression') !== 0;
        }
    }
    isPropertyHighlighted(propertyName, parentPropertyName) {
        if (!parentPropertyName) {
            return this._hasAnyExpressions(propertyName);
        }
        const parentExpressionName = this._getExpressionNameByPropertyName(parentPropertyName);
        const subPropertyName = propertyName[0].toUpperCase() + propertyName.substr(1);
        return parentExpressionName && this._hasAnyExpressions(parentPropertyName, (value, subExpressionName) => {
            const unwrappedValue = !!ko.unwrap(value);
            return subExpressionName === (parentExpressionName + '.' + subPropertyName) && unwrappedValue;
        });
    }
    sendToBack() {
        this._zOrderChange(false);
    }
    bringToFront() {
        this._zOrderChange(true);
    }
    get root() {
        return this._getRoot();
    }
    getControlContainerName() { return 'controls'; }
    customizeExpressionCategories(sender, categories) { }
    get dataBindingMode() {
        return this.root !== this ? this.root.dataBindingMode : DataBindingMode.Expressions;
    }
    set dpi(value) {
        this._innerDpi = value;
    }
    get dpi() {
        return this.root !== this ? this.root.dpi : this._innerDpi;
    }
    rtl() {
        const rtl = ko.unwrap(this['rightToLeft']);
        if (rtl === 'Yes')
            return true;
        if (this.parentModel() && (!rtl || rtl === 'Inherit'))
            return this.parentModel().rtl();
        return false;
    }
}
XRReportElementViewModel.unitProperties = ['size', 'location', 'paddingObj'];
