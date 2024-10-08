﻿/**
* DevExpress HTML/JS Reporting (designer\localization\_localizationEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization, getResizableOptions, searchPlaceholder } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { availableCultures, defaultCulture } from '../../common/defaultCulture';
import { BandViewModel } from '../bands/xrBand';
import { XRChartViewModel } from '../controls/xrChart';
import { XRCheckBoxViewModel } from '../controls/xrCheckbox';
import { TranslateHelper } from '../internal/_translateHelper';
import { DataSourceSelectBox } from '../widgets/dataSourceSelectBox';
import { _translationFactory } from './localizationService';
export class LocalizationEditor extends Disposable {
    constructor(_options) {
        super();
        this._options = _options;
        this._allowedPropertyNames = ['text', 'legendText', 'axisLabelText', 'legendTextPattern'];
        this.defaultLanguageText = () => availableCultures()[defaultCulture];
        this.currentLanguageText = () => availableCultures()[this.language()];
        this.propertiesHeaderText = () => getLocalization('Property', 'AnalyticsCoreStringId.FilterEditor_Operand_Type_Property');
        this.localizationItems = ko.observableArray();
        this.textToSearch = ko.observable('');
        this.searchPlaceholder = () => searchPlaceholder();
        this.searchBox = ko.observable(null);
        this.isSearching = ko.observable(false);
        this.getResizableOptions = getResizableOptions;
        this.isVisible = ko.observable(false);
        this.width = ko.observable(500);
        this.showLoadIndicator = ko.observable(false);
        this.getLoadPanelPosition = (element) => $.fn.constructor(element).closest('.dxrd-localization-editor');
        this._disposables.push(this.availableCultures = DataSourceSelectBox.createDataSource(Object.keys(availableCultures()).map((key) => {
            return { value: key, displayValue: availableCultures()[key] };
        })));
        this.translateHelper = new TranslateHelper();
    }
    _uncollapseParent(newVal) {
        const parent = newVal.parentModel();
        if (!parent)
            return;
        if (parent instanceof BandViewModel) {
            parent.expanded(true);
        }
        this._uncollapseParent(parent);
    }
    _subscribeFocused() {
        return this._options.selection.focused.subscribe((newVal) => {
            this._uncollapseParent(newVal.getControlModel());
            this._options.controlScrollingTool.scrollToControl(newVal);
        });
    }
    _getDefaultLanguageItems() {
        return this._options.report()._localization.items.get(defaultCulture).properties;
    }
    dispose() {
        super.dispose();
        this.localizationItems().forEach(x => x.dispose());
        this.localizationItems.removeAll();
        this._autoScrollingSubscription && this._autoScrollingSubscription.dispose();
        this._options = null;
        this.language = null;
        this.searchBox(null);
        this._selectionDisabled = null;
        this.translateHelper.dispose();
    }
    _isLocalizableControl(x) {
        if (x instanceof XRCheckBoxViewModel) {
            return x.glyphAlignment() !== 'Center';
        }
        return true;
    }
    _shouldLocalizeReportControl(control) {
        return control.getLocalizationProperties && control['text'] && !control.hasDataBindingByName()
            && this._isLocalizableControl(control) || control instanceof XRChartViewModel;
    }
    _createLocalizationItem(component, localizedProperty, defaultProperties) {
        const displayName = component.name() + '.' + localizedProperty.propertyName;
        const _defaultText = ko.observable(localizedProperty.value());
        if (!this.isDefaultLanguage()) {
            const defaultTextProperty = defaultProperties.filter(x => x.component === component && x.propertyName === localizedProperty.propertyName)[0];
            _defaultText(defaultTextProperty && defaultTextProperty.value);
        }
        return {
            component,
            displayName: displayName,
            defaultText: ko.computed({
                read: () => _defaultText(),
                write: (newVal) => {
                    _defaultText(newVal);
                    if (this.isDefaultLanguage())
                        localizedProperty.value(newVal);
                }
            }),
            isDefaultLanguage: () => this.isDefaultLanguage(),
            visible: ko.computed(() => {
                const regex = new RegExp(this.textToSearch(), 'gi');
                return [_defaultText(), localizedProperty.value(), displayName].some(x => regex.test(x));
            }),
            dispose: function () {
                this.defaultText.dispose();
                this.visible.dispose();
            },
            localizedText: localizedProperty.value,
            multiline: component['multiline']
        };
    }
    _updateLocalizationItems() {
        const defaultProperties = this._getDefaultLanguageItems();
        const localizationItems = [];
        this._options.report().enumerateComponents().filter(x => this._shouldLocalizeReportControl(x)).forEach((control) => {
            control.getLocalizationProperties().forEach(property => {
                const propertyName = property.info.propertyName;
                if (this._allowedPropertyNames.indexOf(propertyName) !== -1) {
                    localizationItems.push(this._createLocalizationItem(control, property, defaultProperties));
                }
            });
        });
        this.localizationItems(localizationItems);
    }
    applyLocalization(serviceName) {
        if (this.language() !== defaultCulture) {
            this.showLoadIndicator(true);
            const textCollection = this.localizationItems().reduce((result, item) => {
                if (item.visible())
                    result.push(item.localizedText);
                return result;
            }, []);
            _translationFactory.translate(serviceName, textCollection.map(x => x()), this.language()).done((result) => {
                result.texts.forEach((val, i) => {
                    textCollection[i](val);
                });
                this.showLoadIndicator(false);
            }).fail(() => {
                this.showLoadIndicator(false);
            });
        }
    }
    clearLocalization() {
        this._options.report().clearLocalization(this.language());
    }
    getRegisteredService() {
        return _translationFactory.getFirstRegistered();
    }
    isDefaultLanguage() {
        return this.language() === defaultCulture;
    }
    start() {
        if (this._options.controlScrollingTool) {
            this._autoScrollingSubscription = this._subscribeFocused();
        }
        this.language = this._options.report().language;
        this._updateLocalizationItems();
        this._options.selection.updateSelection(this._options.report().surface);
        this._selectionDisabled = this._options.selection.disabled();
        this._options.selection.disabled(true);
        this.isVisible(true);
    }
    finish() {
        this._autoScrollingSubscription && this._autoScrollingSubscription.dispose();
        this.localizationItems().forEach(x => x.dispose());
        this.localizationItems.removeAll();
        this._options.selection.disabled(this._selectionDisabled);
        this.language = null;
        this._selectionDisabled = null;
        this.searchBox(null);
        this.isVisible(false);
    }
    onSelectionChanged(e) {
        if (e.addedItems[0])
            this._options.selection.updateSelection(e.addedItems[0].component.surface);
        else
            this._options.selection.clear();
    }
    onItemGotFocus(e) {
        if (!e.model.component.surface.selected())
            this._options.selection.updateSelection(e.model.component.surface);
    }
    switchSearchBox() {
        if (this.isSearching()) {
            this.textToSearch('');
        }
        this.isSearching(!this.isSearching());
    }
}
