﻿/**
* DevExpress Analytics (widgets\formatstring\formatstringeditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { Disposable } from '../../serializer/disposable';
import { formatStringStandardPatterns } from './_patterns';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { StringId } from '../../property-grid/localization/_localizationStringIds';
import { PopupService } from '../../property-grid/internal/_popupService';
import dxScrollView from 'devextreme/ui/scroll_view';
export class FormatStringEditor extends Disposable {
    constructor(value, disabled, defaultPatterns, customPatterns, actions, rtl, popupContainer) {
        super();
        this._isDisabled = ko.observable(false);
        this._timeout = null;
        this.currentType = ko.observable();
        this.patternList = ko.observableArray([]);
        this.canAddCustomFormat = ko.observable(false);
        this.formatPrefix = ko.observable('');
        this.formatSuffix = ko.observable('');
        this.previewString = ko.observable('Preview string');
        this.formatResult = ko.observable('');
        this.selectedFormats = ko.observable([]);
        this.selectedTypes = ko.observable([]);
        this.popupVisible = ko.observable(false);
        this.localizationIdMap = {
            'title': { text: 'FormatString Editor', localizationId: 'AnalyticsCoreStringId.FormatStringEditor_Title' },
            'category': { text: 'Category', localizationId: 'AnalyticsCoreStringId.Category' },
            'preview': { text: 'Preview', localizationId: 'AnalyticsCoreStringId.TooltipButtons_Preview' },
            'types': { text: 'Types', localizationId: 'AnalyticsCoreStringId.FormatStringEditor_Types' },
            'add': { text: 'Add', localizationId: 'DataAccessUIStringId.Button_Add' },
            'prefix': { text: 'Prefix', localizationId: 'AnalyticsCoreStringId.Prefix' },
            'suffix': { text: 'Suffix', localizationId: 'AnalyticsCoreStringId.FormatStringEditor_Suffix' }
        };
        this.option('value', value);
        this.option('disabled', disabled || false);
        this.option('rtl', rtl || false);
        this.option('popupContainer', popupContainer || '.dx-designer-viewport');
        const self = this;
        this.popupService = new PopupService();
        this._standardPatternSource = defaultPatterns || formatStringStandardPatterns;
        this._customPatternSource = customPatterns || {};
        this.types = this._convertArray(Object.keys(this._standardPatternSource));
        this._disposables.push(this.currentType.subscribe((newVal) => {
            if (self.isGeneralType) {
                self.formatResult('');
                self.selectedFormats([]);
            }
            else {
                self._updateFormatList();
            }
        }));
        this.currentType(this.types[0].name);
        this._disposables.push(this.formatResult.subscribe((newVal) => {
            self._updateCanAddCustomFormat(newVal);
            self._updatePreview();
        }));
        this._disposables.push(this.formatPrefix.subscribe((newVal) => {
            self._updatePreview();
        }));
        this._disposables.push(this.formatSuffix.subscribe((newVal) => {
            self._updatePreview();
        }));
        this._disposables.push(this.popupVisible.subscribe((newVal) => {
            if (!newVal)
                return;
            self._initEditor(value());
            self.selectedTypes(self.types.filter((item) => { return item.name === self.currentType(); }));
        }));
        this._createMainPopupButtons();
        actions && actions.updatePreview && (this.updatePreview = actions.updatePreview);
        this.setType = (e) => {
            self.currentType(e.itemData.name);
            self._updateSelection();
        };
        this.setFormat = (e) => {
            self.formatResult(e.itemData.name);
        };
        this.addCustomFormat = () => {
            if (self.formatResult() && self.canAddCustomFormat()) {
                self.customPatterns.push(self.formatResult());
                self._updateFormatList();
                self._scrollToBottom();
                actions && actions.saveCustomPattern(self.currentType(), self.formatResult());
                self._updateSelection(self.patternList().length - 1);
                self.canAddCustomFormat(false);
            }
        };
        this.removeCustomFormat = (data) => {
            const currentSelection = self.selectedFormats()[0];
            const patternList = self.patternList();
            const removedItemIndex = patternList.map((item) => { return item.name; }).indexOf(data.name);
            self.customPatterns.splice(self.customPatterns.indexOf(data.name), 1);
            self._updateFormatList();
            actions && actions.removeCustomPattern(self.currentType(), data.name);
            if (currentSelection.name === data.name) {
                self._updateSelection(removedItemIndex === (patternList.length - 1) ? (self.patternList().length - 1) : removedItemIndex);
            }
            else {
                self.selectedFormats(self.patternList().filter((item) => { return item.name === currentSelection.name; }));
            }
        };
    }
    okAction() {
        const result = this.isGeneralType ? this._getGeneralPreview('{0}') : this._wrapFormat();
        this.option('value', result);
        this.popupVisible(false);
    }
    _createMainPopupButtons() {
        const self = this;
        this.buttonItems = [
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: getLocalization('OK', StringId.DataAccessBtnOK), type: 'default', stylingMode: 'contained', disabled: this._isDisabled, onClick: function () { self.okAction(); } } },
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: getLocalization('Cancel', StringId.DataAccessBtnCancel), type: 'normal', stylingMode: 'contained', onClick: function () { self.popupVisible(false); } } }
        ];
    }
    _convertArray(array, canRemove) {
        return array.map(item => { return { name: item, displayName: getLocalization(item), canRemove: !!canRemove }; });
    }
    _scrollToBottom() {
        const $scrollView = $.fn.constructor('.dx-format-string .dx-format-string-formats').find('.dx-scrollview').filter(':visible');
        const scrollViewInstance = dxScrollView.getInstance($scrollView.get(0));
        scrollViewInstance && scrollViewInstance['scrollTo'] && scrollViewInstance['scrollTo'](scrollViewInstance['scrollHeight']());
    }
    _updateFormatList() {
        this.selectedFormats([]);
        const currentTypeInfo = this._standardPatternSource[this.currentType()];
        this.patternList(this._convertArray(currentTypeInfo.patterns).concat(this._convertArray(this.customPatterns, true)));
    }
    _updateSelection(selectedItemIndex) {
        const currectFormat = this.patternList()[selectedItemIndex || 0];
        if (currectFormat) {
            this.selectedFormats([currectFormat]);
            this.formatResult(currectFormat.name);
        }
    }
    _setPreviewString(previewString) {
        this.previewString(previewString);
        this._isDisabled(false);
    }
    _setErrorMessage(setDisabled) {
        this.previewString(getLocalization('Preview string is not available', 'AnalyticsCoreStringId.FormatStringEditor_PreviewNotAvailable_Text'));
        this._isDisabled(setDisabled);
    }
    _updatePreview() {
        this._timeout && clearTimeout(this._timeout);
        this._timeout = setTimeout(() => {
            if (this.isGeneralType) {
                this.previewString(this._getGeneralPreview(undefined));
                return;
            }
            const category = this._standardPatternSource[this.currentType()];
            const updatedPreviewPromise = this.updatePreview(category.value, category.type, this._wrapFormat());
            this._lastUpdatePreviewPromise = updatedPreviewPromise;
            updatedPreviewPromise
                .done((previewResult) => {
                if (this._lastUpdatePreviewPromise === updatedPreviewPromise) {
                    if (previewResult.Result)
                        this._setPreviewString(previewResult.Result);
                    else
                        this._setErrorMessage(previewResult.IsError);
                }
            }).fail((error) => {
                if (this._lastUpdatePreviewPromise === updatedPreviewPromise)
                    this.previewString(getLocalization('Preview string is not available', 'AnalyticsCoreStringId.FormatStringEditor_PreviewNotAvailable_Text'));
            });
        }, 100);
    }
    _getGeneralPreview(value = '###') {
        return this.formatPrefix() + value + this.formatSuffix();
    }
    _wrapFormat(format) {
        const pattern = format || this.formatResult();
        if (pattern && pattern.indexOf('{0:') !== -1) {
            return pattern;
        }
        return pattern ? '{0:' + pattern + '}' : '';
    }
    _updateCanAddCustomFormat(newFormat) {
        if (!newFormat) {
            this.canAddCustomFormat(false);
            return;
        }
        let canAddCustomFormat = true;
        Object.keys(this._standardPatternSource).some((name) => {
            canAddCustomFormat = this._standardPatternSource[name].patterns.indexOf(newFormat) === -1;
            return !canAddCustomFormat;
        });
        this.canAddCustomFormat(canAddCustomFormat ? this.customPatterns.indexOf(newFormat) === -1 : canAddCustomFormat);
    }
    _initEditor(formatStringValue) {
        if (!formatStringValue) {
            this.setType({ itemData: this.types[0] });
            return;
        }
        if (formatStringValue.indexOf('{0}') !== -1) {
            this.currentType('General');
            this.formatPrefix(formatStringValue.substring(0, formatStringValue.indexOf('{0}')));
            this.formatSuffix(formatStringValue.substring(formatStringValue.indexOf('{0}') + 3));
            return;
        }
        const startIndex = formatStringValue.indexOf('{0:'), closingBracketIndex = formatStringValue.indexOf('}', startIndex), formatPattern = formatStringValue.substring(startIndex + 3, closingBracketIndex);
        let isFormatPatternFind;
        const selectTypePatternPair = (name) => {
            this.currentType(name);
            if (startIndex === 0 && closingBracketIndex === (formatStringValue.length - 1)) {
                this.selectedFormats(this.patternList().filter((item) => { return item.name === formatPattern; }));
                this.formatResult(formatPattern);
                isFormatPatternFind = true;
            }
        };
        Object.keys(this._standardPatternSource).some((name) => {
            if (this._standardPatternSource[name].patterns.indexOf(formatPattern) !== -1) {
                selectTypePatternPair(name);
                return true;
            }
            const customPatterns = this._customPatternSource[this._standardPatternSource[name].type];
            if (customPatterns && customPatterns.indexOf(formatPattern) !== -1) {
                selectTypePatternPair(name);
                return true;
            }
            return false;
        });
        if (!isFormatPatternFind) {
            this.currentType(this.types[0].name);
            this.selectedFormats([]);
            this.formatResult(formatStringValue);
        }
    }
    updateInputText(propertyName, componentInstance) {
        this[propertyName](componentInstance.option('text'));
    }
    option(name, value) {
        if (value !== void 0) {
            if (ko.isObservable(this[name])) {
                this[name](value);
            }
            else {
                this[name] = value;
            }
        }
        return ko.unwrap(this[name]);
    }
    updatePreview(value, category, pattern) {
        return $.Deferred().resolve({ Result: value || 'preview string' }).promise();
    }
    get customPatterns() {
        const currentTypeInfo = this._standardPatternSource[this.currentType()];
        return this._customPatternSource[currentTypeInfo.type] = this._customPatternSource[currentTypeInfo.type] || [];
    }
    get isGeneralType() {
        return this.currentType() === 'General';
    }
    getDisplayText(key) {
        return getLocalization(this.localizationIdMap[key].text, this.localizationIdMap[key].localizationId);
    }
    getPopupContainer(el) {
        return $.fn.constructor(el).closest(this.option('popupContainer'));
    }
}
