﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\characterCombEditingField.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TextEditingFieldViewModelBase } from './textEditingField';
import { brickStyleSerializationsInfo } from '../../../common/metadata';
import { CssCalculator, extend } from '@devexpress/analytics-core/analytics-internal-native';
import { createViewModelGenerator, currentModelSerializer, currentMultiPlatformEngine } from '@devexpress/analytics-core/analytics-serializer-native';
export class CharacterCombEditingFieldViewModel extends TextEditingFieldViewModelBase {
    constructor(field, pageWidth, pageHeight, page, bounds) {
        super(page);
        this.field = field;
        this.template = 'dxrp-character-comb-editing-field';
        this.canActivateEditor = true;
        const brickStyle = field.model().brickOptions;
        const style = { rtl: () => brickStyle.rtl };
        currentModelSerializer().deserialize(style, JSON.parse(brickStyle.style), brickStyleSerializationsInfo);
        const cssCalculator = new CssCalculator(style, !!brickStyle.rtlLayout);
        let verticalPadding = parseInt(cssCalculator.paddingsCss()['paddingTop']) + parseInt(cssCalculator.paddingsCss()['paddingBottom']);
        const borderCss = cssCalculator.borderCss();
        if (borderCss['borderTop'] !== 'none') {
            verticalPadding += currentMultiPlatformEngine.unwrap(style['borderWidth']);
        }
        if (borderCss['borderBottom'] !== 'none') {
            verticalPadding += currentMultiPlatformEngine.unwrap(style['borderWidth']);
        }
        this.textStyle = extend({}, cssCalculator.fontCss(), cssCalculator.foreColorCss(), cssCalculator.textAlignmentCss());
        this.hideEditor = (shouldCommit) => {
            setTimeout(() => {
                if (shouldCommit) {
                    field.setEditValue(field._editorValue);
                }
                else {
                    field._editorValue = field.getEditValue();
                }
                this.active = false;
            });
        };
        this.containerStyle = extend({
            width: bounds.width + 'px',
            height: bounds.height + 'px',
            'line-height': (bounds.height - verticalPadding) + 'px',
            top: bounds.top * 100 / pageHeight + '%',
            left: bounds.left * 100 / pageWidth + '%'
        }, cssCalculator.fontCss(), cssCalculator.foreColorCss());
        let cellVerticalPadding = 0;
        let borderCellStyle = 'none';
        ['Left', 'Top', 'Right', 'Bottom'].forEach((item) => {
            if (borderCss['border' + item] !== 'none') {
                borderCellStyle = borderCss['border' + item];
                cellVerticalPadding = currentMultiPlatformEngine.unwrap(style['borderWidth']) * 2;
            }
        });
        const cellStyle = {
            'border': borderCellStyle,
            'text-align': 'center',
            'position': 'absolute',
            'box-sizing': 'border-box',
            'border-color': 'transparent'
        };
        const characterCombBounds = field.model().brickOptions.characterCombBounds;
        const cells = [];
        const rowTops = {};
        for (let i = 0; i < characterCombBounds.length; i++) {
            cells.push({
                style: extend({
                    width: characterCombBounds[i].width + 'px',
                    height: characterCombBounds[i].height + 'px',
                    'line-height': (characterCombBounds[i].height - cellVerticalPadding) + 'px',
                    top: characterCombBounds[i].top + 'px',
                    left: characterCombBounds[i].left + 'px'
                }, cellStyle),
                text: ''
            });
            rowTops[characterCombBounds[i].top] = i;
        }
        const rowsCount = Object.keys(rowTops).length;
        const colsCount = cells.length / rowsCount;
        this.cells = this._createCellViewModels(cells);
        CharacterCombEditingFieldViewModel.setText(this.cells, style['textAlignment'](), style.rtl(), field.getEditValue(), rowsCount, colsCount);
        this.addDisposable(this.field.events.on('editValueChanged', (args) => {
            CharacterCombEditingFieldViewModel.setText(this.cells, style['textAlignment'](), style.rtl(), args.newValue, rowsCount, colsCount);
        }));
    }
    _createCellViewModels(cells) {
        return cells.map(cell => createViewModelGenerator()
            .createDefaultModel(this)
            .generateProperty('text', cell.text)
            .generateProperty('style', cell.style)
            .getViewModel());
    }
    createViewModel() {
        return createViewModelGenerator(super.createViewModel())
            .generateProperty('cells', this.cells)
            .generateProperty('hideEditor', (data) => this.hideEditor(!!data))
            .generateProperty('keypressAction', (data, event) => this.keypressAction(data, event))
            .getViewModel();
    }
    activateEditor(viewModel, event) {
        if (!this.field.readOnly && !this.active) {
            this.active = true;
            super.activateEditor(viewModel, event);
        }
    }
    static setText(cells, textAlignment, rtl, text, rowsCount, colsCount) {
        for (let j = 0; j < cells.length; j++) {
            cells[j].text = '';
        }
        const textRowsCount = Math.ceil(text.length / colsCount);
        const textLastRowColCount = text.length % colsCount;
        let startRow = -1;
        if (textAlignment.indexOf('Bottom') === 0) {
            startRow = rowsCount - textRowsCount;
        }
        else if (textAlignment.indexOf('Middle') === 0) {
            startRow = Math.floor((rowsCount - textRowsCount) / 2);
        }
        else {
            startRow = 0;
        }
        let lastRowStartCol = -1;
        if (textAlignment.indexOf('Right') > 0) {
            lastRowStartCol = rtl ? 0 : (colsCount - textLastRowColCount);
        }
        else if (textAlignment.indexOf('Center') > 0) {
            lastRowStartCol = Math.floor((colsCount - textLastRowColCount) / 2);
        }
        else {
            lastRowStartCol = rtl ? (colsCount - textLastRowColCount) : 0;
        }
        let j = startRow * colsCount;
        let i = 0;
        for (; i < text.length - textLastRowColCount; i++, j++) {
            if (j >= 0 && j < cells.length) {
                cells[j].text = text[i];
            }
        }
        for (; i < text.length; i++, j++) {
            if (j >= 0 && j < cells.length) {
                cells[j + lastRowStartCol].text = text[i];
            }
        }
    }
}
