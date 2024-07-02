﻿/**
* DevExpress Analytics (core\widgets\_fieldlistpicker.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import registerComponent from 'devextreme/core/component_registrator';
import 'devextreme/ui/drop_down_box';
import dxDropDownBox from 'devextreme/ui/drop_down_box';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { extend } from '../../serializer/_utils';
export class dxFieldListPicker extends dxDropDownBox {
    constructor($element, options) {
        var _a, _b;
        super($element, extend(options, { showClearButton: true }));
        this._path = ko.observable('');
        this._value = ko.observable('');
        this._parentViewport = null;
        this._itemsProvider = ko.observable(null);
        this._hasDisplayNameOption = false;
        this._defaultPosition = null;
        const _$element = $.fn.constructor($element);
        _$element.addClass('dx-fieldlistpicker');
        this.option('path') && this._path((_a = this.option('path')) === null || _a === void 0 ? void 0 : _a.toString());
        this.option('value') && this._value(this.option('value'));
        this.option('itemsProvider') && this._itemsProvider(this.option('itemsProvider'));
        this.option('valueChangeEvent', 'change');
        this.option('openOnFieldClick', this.option('acceptCustomValue') === false);
        this._parentViewport = _$element.parents('.dx-designer-viewport');
        if ('displayValue' in options) {
            this._hasDisplayNameOption = true;
            this.option('displayValue', options.displayValue);
            this._setTitle((_b = this.option('displayValue')) === null || _b === void 0 ? void 0 : _b.toString());
        }
    }
    updateOptions(options) {
        options.showClearButton = true;
    }
    _showDropDown() {
        if (this['_popup']) {
            const $element = $.fn.constructor(this.element());
            this['_popup'].option('width', $element.width());
            const popupPosition = extend(true, {}, this._defaultPosition, { boundary: this._parentViewport[0], boundaryOffset: '0 20', collision: 'none flip' });
            this['_popup'].option('position', popupPosition);
            this['_popup'].option('height', 'auto');
            this['_popup'].option('maxHeight', this._getMaxHeight());
            this['_popup'].repaint();
            $.fn.constructor(this['_popup'].content())[0].style.height = 'auto';
            this['_popup']._renderPosition();
        }
    }
    _getMaxHeight() {
        const $element = $.fn.constructor(this.element()), offset = $element.offset(), windowHeight = $.fn.constructor(window).height(), maxHeight = Math.max(offset.top, windowHeight - offset.top - $element.outerHeight());
        return Math.min(.5 * windowHeight, maxHeight);
    }
    _closeOutsideDropDownHandler(e, ignoreContainerClicks) { super['_closeOutsideDropDownHandler'].apply(this, [e, true]); }
    _hideOnBlur() { return false; }
    _popupConfig() {
        const dxPolymorphWidget = this.option('integrationOptions')['templates']['dx-polymorph-widget'];
        const popuConfig = super['_popupConfig'].apply(this);
        this._defaultPosition = popuConfig.position;
        return extend(popuConfig, {
            container: this._parentViewport,
            contentTemplate: dxPolymorphWidget && dxPolymorphWidget._template,
            hideOnOutsideClick: true
        });
    }
    _setTitle(text) {
        if (this.option('openOnFieldClick')) {
            $.fn.constructor(this.element()).attr('title', text);
        }
    }
    _renderDisplayText(newValue) { super['_renderDisplayText'].apply(this, [newValue]); }
    _optionChanged(args) {
        const name = args.name, newValue = args.value;
        switch (name) {
            case 'value':
                this._value(newValue);
                if (!this._hasDisplayNameOption)
                    this._renderDisplayText(newValue);
                setTimeout($.proxy(() => {
                    this.option('opened', false);
                }, this), 50);
                if (!!this.option('onValueChanged'))
                    this.option('onValueChanged')({
                        value: newValue
                    });
                break;
            case 'path':
                this._path(newValue);
                break;
            case 'itemsProvider':
                this._itemsProvider(newValue);
                break;
            case 'displayValue':
                this._renderDisplayText(newValue);
                this._setTitle(newValue);
                break;
            default:
                super['_optionChanged'].apply(this, arguments);
                if (name === 'opened' && newValue) {
                    this['_showDropDown']();
                }
        }
    }
    _clearValueHandler() {
        $.fn.constructor(this['_input']()).val(null);
        super['_clearValueHandler'].apply(this, arguments);
    }
    _renderPopupContent() {
        super['_renderPopupContent'].apply(this, arguments);
        const selectedPath = ko.pureComputed({
            read: () => {
                return this._path() ? this._path() + '.' + this._value() : this._value();
            },
            write: (newVal) => {
                if (this._path() && this._path().length > 0) {
                    this._value(newVal.substr(this._path().length + 1));
                    this.option('value', this._value());
                }
                else {
                    this._value(newVal);
                    this.option('value', this._value());
                }
            }
        });
        const element = $.fn.constructor('<div>').addClass('dx-treelist-wrapper').get(0);
        const scroll = this['_createComponent'](element, 'dxScrollView', { scrollByThumb: true });
        const self = this;
        const $scrollContent = $.fn.constructor(scroll['content']());
        const $element = $.fn.constructor(this.element());
        $scrollContent.append($.fn.constructor('<div data-bind="treelist: options"></div>')[0]);
        const context = ko.contextFor($element.get(0));
        const treeListController = this.option('treeListController');
        const options = ko.computed(() => {
            return {
                itemsProvider: this._itemsProvider(), onItemsVisibilityChanged: () => {
                    if (self['_popup']) {
                        self['_popup']._renderPosition();
                    }
                }, selectedPath: selectedPath, treeListController: treeListController, path: this._path
            };
        });
        const childContext = context.createChildContext({ options });
        ko.applyBindingsToDescendants(childContext, $scrollContent.get(0));
        $.fn.constructor(this['_popup'].content()).append(element);
    }
}
registerComponent('dxFieldListPicker', dxFieldListPicker);
