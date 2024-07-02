﻿/**
* DevExpress Analytics (property-grid\widgets\ellipsiseditor\_editor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import 'devextreme/ui/text_box';
import dxTextBox from 'devextreme/ui/text_box';
import * as $ from 'jquery';
import { addDisposeCallback } from '../../../serializer/_internal';
import { SvgTemplatesEngine } from '../internal/_svgTemplateEngine';
import { KeyboardEnum } from '../internal/_utils';
import registerComponent from 'devextreme/core/component_registrator';
const editor_prefix = 'dx-ellipsiseditor', EDITOR_CLASS = editor_prefix + ' dx-dropdowneditor', EDITOR_BUTTON_CLASS = editor_prefix + '-button dx-widget dx-button-normal dx-dropdowneditor-button dx-ellipsis-button', EDITOR_BUTTON_ICON_CLASS = editor_prefix + '-icon dx-ellipsis-image dx-dropdowneditor-icon', EDITOR_BUTTON_ICON_TEMPLATE = 'dxrd-svg-ellipsis', EDITOR_WARNING_STATE_CLASS = 'dx-ellipsiseditor-warning';
export class dxEllipsisEditor extends dxTextBox {
    constructor(element, options) {
        const ellipsisButton = {
            name: 'ellipsisButton',
            location: 'after',
            options: {
                disabled: false,
                template: SvgTemplatesEngine.templates[EDITOR_BUTTON_ICON_TEMPLATE],
                icon: EDITOR_BUTTON_ICON_TEMPLATE,
                onClick: options.buttonAction,
                elementAttr: {
                    class: EDITOR_BUTTON_CLASS
                }
            }
        };
        const clearButton = {
            name: 'clear'
        };
        options.buttons = [
            clearButton,
            ellipsisButton
        ];
        super(element, options);
    }
    _init() {
        super['_init'].apply(this);
        if (!this._$element) {
            this._$element = $.fn.constructor(this.element());
        }
        this._$element.addClass(EDITOR_CLASS);
    }
    _render() {
        super['_render'].apply(this);
        this._renderButton();
        this._updateWarningState();
        this._attachInputEvents();
    }
    _updateWarningState(value = this.option('warningMessage')) {
        if (value) {
            this._$element.attr('title', value.toString());
            this._$element.addClass(EDITOR_WARNING_STATE_CLASS);
        }
        else {
            this._$element.removeAttr('title');
            this._$element.removeClass(EDITOR_WARNING_STATE_CLASS);
        }
    }
    _updateButtonSize() {
        this._$buttonIcon.height($.fn.constructor(this.element()).height());
    }
    _renderButton() {
        const buttonsContainer = this['_buttonsContainer']();
        const children = buttonsContainer.children();
        const buttonsContainerContent = children[1];
        this._$button = $.fn.constructor(buttonsContainerContent);
        $.fn.constructor(this._$button.children()[0]).addClass(EDITOR_BUTTON_ICON_CLASS);
        this._attachButtonEvents();
        this._removeCustomHoveredStyle();
    }
    _attachButtonEvents() {
        if (!this._$input)
            this._$input = $.fn.constructor(this['_input']());
        const subscribeElements = [];
        this._$button.off('click');
        this._$input.off('click');
        if (!this.option('disabled'))
            subscribeElements.push(this._$button);
        if (this.option('openOnFieldClick'))
            subscribeElements.push(this._$input);
        subscribeElements.forEach(($element) => {
            $element.on('click', this.buttonAction.bind(this));
        });
    }
    _removeCustomHoveredStyle() {
        this._$button.off('mouseover');
        this._$button.on('mouseover', () => {
            $.fn.constructor(this.element()).removeClass('dx-custom-button-hovered');
        });
    }
    _attachInputEvents() {
        const input = this['_input']()[0];
        if (!input)
            return;
        const handler = (e) => {
            if (e.key == KeyboardEnum.Enter || (e.key == KeyboardEnum.ArrowDown && e.altKey)) {
                this.buttonAction(e);
            }
        };
        input.addEventListener('keydown', handler);
        addDisposeCallback(input, function () {
            input.removeEventListener('keydown', handler);
        });
    }
    _optionChanged(args) {
        switch (args.name) {
            case 'disabled':
                this._attachButtonEvents();
                break;
            case 'warningMessage':
                this._updateWarningState(args.value);
                break;
        }
        super['_optionChanged'].apply(this, arguments);
    }
    buttonAction(e) {
        if (this.option('buttonAction')) {
            this.option('buttonAction')();
            e.stopPropagation();
        }
    }
}
registerComponent('dxEllipsisEditor', dxEllipsisEditor);
