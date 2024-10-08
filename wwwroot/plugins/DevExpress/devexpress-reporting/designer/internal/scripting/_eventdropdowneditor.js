﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_eventdropdowneditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SvgTemplatesEngine } from '@devexpress/analytics-core/analytics-widgets-internal';
import registerComponent from 'devextreme/core/component_registrator';
import 'devextreme/ui/select_box';
import dxSelectBox from 'devextreme/ui/select_box';
import * as $ from 'jquery';
import * as ko from 'knockout';
const EDITOR_CLASS = 'dx-eventdropdowneditor dx-selectbox', EDITOR_ELLIPSIS_BUTTON_CLASS = 'dx-button-normal dx-dropdowneditor-button dxrd-ellipsis-button', EDITOR_ELLIPSIS_BUTTON_ICON_CLASS = 'dx-dropdowneditor-icon dxrd-ellipsis-image', EDITOR_ELLIPSIS_BUTTON_ICON_TEMPLATE = 'dxrd-svg-ellipsis';
export class dxEventDropDownEditor extends dxSelectBox {
    _getDefaultOptions() {
        return $.extend(super['_getDefaultOptions'].apply(this), {
            openOnFieldClick: false,
            secondAction: null
        });
    }
    _init() {
        super['_init'].apply(this);
        this._initSecondAction();
        const $element = $.fn.constructor(this['element']());
        this._koContext = ko.contextFor($element[0]);
    }
    _initSecondAction() {
        this._secondAction = this['_createAction'](this.option('secondAction'));
    }
    _render() {
        const $element = $.fn.constructor(this['element']());
        $element.addClass(EDITOR_CLASS);
        super['_render'].apply(this);
    }
    _renderDropDownButton() {
        if (this._$ellipsisButton) {
            this._$ellipsisButton.remove();
            this._$ellipsisButton = null;
        }
        super['_renderDropDownButton'].apply(this);
        this._$ellipsisButton = this._createEllipsisButton();
        this._$ellipsisButton.prependTo(this['_buttonsContainer']());
        this._attachEllipsisButtonClickHandler();
    }
    _createEllipsisButton() {
        const $buttonIcon = $.fn.constructor('<div>').addClass(EDITOR_ELLIPSIS_BUTTON_ICON_CLASS).append(SvgTemplatesEngine.templates[EDITOR_ELLIPSIS_BUTTON_ICON_TEMPLATE]);
        ko.applyBindingsToDescendants(this._koContext, $buttonIcon[0]);
        const $button = $.fn.constructor('<div>')['dxButton']({
            focusStateEnabled: false,
            disabled: this.option('readOnly')
        })['removeClass']('dx-button');
        $button.addClass(EDITOR_ELLIPSIS_BUTTON_CLASS);
        $button.append($buttonIcon);
        $button.find('.dx-button-content').remove();
        return $button;
    }
    _attachEllipsisButtonClickHandler() {
        if (this._$ellipsisButton) {
            this._$ellipsisButton.dxButton('option', 'onClick', this._secondAction.bind(this));
        }
    }
    _optionChanged(args) {
        switch (args.name) {
            case 'secondAction':
                this._initSecondAction();
                this._attachEllipsisButtonClickHandler();
                break;
            default:
                super['_optionChanged'].apply(this, [args]);
        }
    }
}
registerComponent('dxEventDropDownEditor', dxEventDropDownEditor);
