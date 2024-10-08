﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\textEditingField.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { brickStyleSerializationsInfo } from '../../../common/metadata';
import { EditingFieldExtensions, ___isCancelFlag } from '../../../common/utils/editingFieldExtensions';
import { processTextEditorHotKeys, CssCalculator, $dx, extend, getParentContainer } from '@devexpress/analytics-core/analytics-internal-native';
import { createViewModelGenerator, currentModelSerializer, currentMultiPlatformEngine } from '@devexpress/analytics-core/analytics-serializer-native';
import { EditingFieldBase } from './editingFieldBase';
export class TextEditingFieldViewModelBase extends EditingFieldBase {
    constructor() {
        super(...arguments);
        this.canActivateEditor = true;
    }
    keypressAction(data, event) {
        this.field._editorValue = event.target['value'];
        processTextEditorHotKeys(event, {
            esc: () => {
                this.hideEditor(false);
            },
            ctrlEnter: () => {
                this.hideEditor(true);
            }
        });
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('textStyle', this.textStyle)
            .getViewModel();
    }
    activateEditor(model, event, elementFocused = false) {
        const eventTarget = event === null || event === void 0 ? void 0 : event.currentTarget;
        if (!elementFocused) {
            setTimeout(() => {
                focusTextElement(eventTarget);
            });
        }
    }
}
export class TextEditingFieldViewModel extends TextEditingFieldViewModelBase {
    constructor(field, pageWidth, pageHeight, page, bounds) {
        super(page);
        this.template = 'dxrp-editing-field-container';
        this.wordWrap = true;
        this.canActivateEditor = true;
        const brickStyle = field.model().brickOptions;
        const style = { rtl: () => brickStyle.rtl };
        currentModelSerializer().deserialize(style, JSON.parse(brickStyle.style), brickStyleSerializationsInfo);
        const cssCalculator = new CssCalculator(style, !!brickStyle.rtlLayout);
        const padding = cssCalculator.paddingsCss();
        let verticalPadding = parseInt(padding['paddingTop']) + parseInt(padding['paddingBottom']);
        if (cssCalculator.borderCss()['borderTop'] !== 'none') {
            verticalPadding += currentMultiPlatformEngine.unwrap(style['borderWidth']);
        }
        if (cssCalculator.borderCss()['borderBottom'] !== 'none') {
            verticalPadding += currentMultiPlatformEngine.unwrap(style['borderWidth']);
        }
        this.breakOffsetStyle = {
            top: bounds.offset.y * -100 / bounds.height + '%',
            left: bounds.offset.x * -100 / bounds.width + '%'
        };
        this.textStyle = extend({}, cssCalculator.fontCss(), cssCalculator.foreColorCss(), cssCalculator.textAlignmentCss());
        this.field = field;
        if (brickStyle.wordWrap != undefined) {
            this.wordWrap = brickStyle.wordWrap;
        }
        this.hideEditor = (shouldCommit) => {
            setTimeout(() => {
                if (shouldCommit && this.active) {
                    if (editorOptions.onHideEditor) {
                        editorOptions.onHideEditor(field);
                    }
                    else {
                        field.setEditValue(field._editorValue);
                    }
                }
                else {
                    field._editorValue = field.getEditValue();
                }
                this.active = false;
            }, 1);
        };
        const editor = EditingFieldExtensions.instance().editor(field.editorName());
        const editorOptions = extend(true, {}, (editor === null || editor === void 0 ? void 0 : editor.options) || {});
        this.data = createViewModelGenerator().createDefaultModel(this)
            .generateProperty('value', field._editorValue)
            .generateProperty('hideEditor', (shouldCommit) => this.hideEditor(shouldCommit))
            .generateProperty('keypressAction', (data, event) => this.keypressAction(data, event))
            .generateProperty('textStyle', this.textStyle)
            .generateProperty('options', editorOptions)
            .generateProperty('getPopupContainer', getParentContainer)
            .generateProperty('getOptions', (templateOptions) => extend({}, this.data.options, templateOptions))
            .getViewModel();
        const isCustomEditor = !!(editor && editor.template && editor.template !== 'dxrp-editing-field-datetime');
        if (!isCustomEditor) {
            const self = this;
            this.data.options = extend(true, {}, editorOptions, {
                value: field._editorValue,
                onValueChanged: (event) => {
                    if (!event.component[___isCancelFlag]) {
                        (editorOptions === null || editorOptions === void 0 ? void 0 : editorOptions.onValueChanged) && (editorOptions === null || editorOptions === void 0 ? void 0 : editorOptions.onValueChanged(event));
                        this.field._editorValue = event.value;
                        this.data.options.value = event.value;
                    }
                },
                onFocusOut: (e) => {
                    self.hideEditor(true);
                }
            });
        }
        if (editor) {
            this.editorTemplate = editor.template || 'dxrp-editing-field-mask';
        }
        else {
            this.editorTemplate = 'dxrp-editing-field-text';
        }
        this._updateContainerStyle = () => {
            if (!bounds)
                return;
            this.containerStyle = extend({
                width: bounds.width + 'px',
                height: bounds.height + 'px',
                'line-height': (bounds.height - verticalPadding) + 'px',
                top: bounds.top * 100 / pageHeight + '%',
                left: bounds.left * 100 / pageWidth + '%',
                cursor: this.field.readOnly ? 'auto' : 'text'
            }, this.active || !this.field.htmlValue ? cssCalculator.borderCss() : { border: 'none' }, isCustomEditor && this.active || (!!this.field.htmlValue && !this.active) ? { padding: 0 } : cssCalculator.paddingsCss(), { 'border-color': 'transparent' });
        };
        const borderWidth = currentMultiPlatformEngine.unwrap(style['borderWidth']);
        const borders = currentMultiPlatformEngine.unwrap(style['borders']);
        if (borderWidth && borderWidth > 0 && borders !== 'None') {
            this.borderStyle = {
                left: '-' + borderWidth + 'px',
                top: '-' + borderWidth + 'px',
                paddingRight: (borderWidth * 2 - 2) + 'px',
                paddingBottom: (borderWidth * 2 - 2) + 'px'
            };
        }
        this.addDisposable(this.field.events.on('htmlValueChanged', (args) => {
            this._updateContainerStyle();
        }), this.field.events.on('readOnlyChanged', (args) => {
            this._updateContainerStyle();
        }), this.field.events.on('_editorValueChanged', (args) => {
            this.data.value = this.field._editorValue;
        }));
        this._updateContainerStyle();
    }
    onPropertyChanged(args) {
        if (args.propertyName === 'active')
            this._updateContainerStyle();
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('borderStyle', this.borderStyle)
            .generateProperty('breakOffsetStyle', this.breakOffsetStyle)
            .generateProperty('wordWrap', this.wordWrap)
            .generateProperty('editorTemplate', this.editorTemplate)
            .generateProperty('data', this.data)
            .getViewModel();
    }
    activateEditor(viewModel, e) {
        if (this.field.readOnly || this.active) {
            return;
        }
        const data = viewModel.data;
        if (data && data.options && data.options.onPreRender) {
            data.options.onPreRender(this.data, this.field);
        }
        this.active = true;
        let elementFocused = false;
        const options = viewModel['options'];
        if (options === null || options === void 0 ? void 0 : options.onEditorShown) {
            elementFocused = options.onEditorShown(this.data, e === null || e === void 0 ? void 0 : e.currentTarget);
        }
        super.activateEditor(viewModel, e, elementFocused);
    }
}
export function focusTextElement(target) {
    const element = $dx(target).find('input:visible').element || $dx(target).find('textarea:visible').element;
    if (!element)
        return;
    element === null || element === void 0 ? void 0 : element.focus();
    if (element['setSelectionRange']) {
        element['setSelectionRange'](element['value'].length, element['value'].length);
    }
}
