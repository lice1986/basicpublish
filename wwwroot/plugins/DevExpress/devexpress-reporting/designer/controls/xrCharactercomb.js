﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCharactercomb.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { pixelToUnits, roundingXDecimals, unitsToPixel } from '@devexpress/analytics-core/analytics-internal';
import { FontModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { TextElementSizeHelper } from '../helpers/_textElementSizeHelper';
import { CharacterCombHelper } from './utils/_charactercombHelper';
import { XRControlSurface, XRControlViewModel } from './xrControl';
import { XRReportElementViewModel } from './xrReportelement';
export class XRCharacterComb extends XRControlViewModel {
    constructor(control, parent, serializer) {
        super(control, parent, serializer);
        const _originalCellWidth = this.cellWidth;
        const _originalCellHeight = this.cellHeight;
        this._disposables.push(this.cellWidth = this._createCellSideFromOriginalSide(_originalCellWidth, false));
        this._disposables.push(this.cellHeight = this._createCellSideFromOriginalSide(_originalCellHeight, true));
        const fontModel = new FontModel(this.font);
        const borderWidth = ko.computed(() => {
            if (this['borders']() && this['borders']() !== 'None') {
                return this['borderWidth']();
            }
            else {
                return 0;
            }
        });
        this._disposables.push(borderWidth);
        const textSizeHelper = new TextElementSizeHelper();
        this.autoCellSide = ko.observable(this.cellHeight());
        this._disposables.push(ko.computed(() => {
            if (this.sizeMode() !== 'Custom') {
                const characterHeight = textSizeHelper.getTextContainerSize('a', {
                    'font-size': fontModel.size() + fontModel.unit(),
                    'font-family': fontModel.family(),
                    'height': 'auto',
                    'width': 'auto'
                }, 0).height;
                let side = characterHeight * 1.5 + 2 * borderWidth();
                if (this.parentModel()) {
                    side = pixelToUnits(side, this.parentModel().root['measureUnit'](), 1);
                }
                this.autoCellSide(side);
            }
        }));
    }
    isPropertyDisabled(name) {
        if (name === 'cellWidth') {
            return this.sizeMode() === 'AutoSize' || this.sizeMode() === 'AutoWidth';
        }
        if (name === 'cellHeight') {
            return this.sizeMode() === 'AutoSize' || this.sizeMode() === 'AutoHeight';
        }
        return super.isPropertyDisabled(name);
    }
    _createCellSideFromOriginalSide(originalCellSide, isHeight) {
        return ko.pureComputed({
            read: () => {
                switch (this.sizeMode()) {
                    case 'AutoSize':
                        return null;
                    case 'AutoWidth':
                        return isHeight ? originalCellSide() : null;
                    case 'AutoHeight':
                        return !isHeight ? originalCellSide() : null;
                    case 'Custom':
                        return originalCellSide();
                }
            },
            write: (val) => { originalCellSide(val); }
        });
    }
    roundSize() {
        this.size.width(Math.ceil(this.size.width()));
        this.size.height(Math.ceil(this.size.height()));
    }
}
XRCharacterComb.unitProperties = [].concat(['cellWidth', 'cellHeight', 'verticalSpacing', 'horizontalSpacing'], XRReportElementViewModel.unitProperties);
export class XRCharacterCombSurface extends XRControlSurface {
    constructor(control, context) {
        super(control, context);
        this.cells = ko.observableArray([]);
        this._disposables.push(this.borderWidth = ko.computed(() => {
            return control['borderWidth']() === undefined ? 1 : control['borderWidth']();
        }));
        this.rtl = () => { return control.rtl(); };
        this.borders = control['borders'];
        this.template = 'dxrd-charactercomb';
        this.contenttemplate = 'dxrd-charactercomb-content';
        this._disposables.push(control.textAlignment.subscribe((newVal) => {
            this._updateCellsText(newVal);
        }));
        this._disposables.push(this.verticalSpacing = ko.computed(() => {
            return unitsToPixel(control.verticalSpacing(), context.measureUnit(), 1);
        }));
        this._disposables.push(this.horizontalSpacing = ko.computed(() => {
            return unitsToPixel(control.horizontalSpacing(), context.measureUnit(), 1);
        }));
        this.cellSize = {
            width: ko.computed(() => {
                return unitsToPixel(control.cellWidth() || control.autoCellSide(), context.measureUnit(), 1);
            }),
            height: ko.computed(() => {
                return unitsToPixel(control.cellHeight() || control.autoCellSide(), context.measureUnit(), 1);
            }),
            isPropertyDisabled: (name) => { return false; }
        };
        this._disposables.push(this.cellSize.width);
        this._disposables.push(this.cellSize.height);
        this._disposables.push(this.fullCellHeight = ko.computed(() => {
            const _verticalSpacing = this.verticalSpacing();
            let fullCellHeight = this.cellSize.height();
            if (!!this.verticalSpacing()) {
                fullCellHeight += this.verticalSpacing();
            }
            return fullCellHeight - this._getBorderWidthBySpacing(_verticalSpacing);
        }));
        this._disposables.push(this.fullCellWidth = ko.computed(() => {
            const _horizontalSpacing = this.horizontalSpacing.peek();
            let fullCellWidth = this.cellSize.width();
            if (!!this.horizontalSpacing()) {
                fullCellWidth += this.horizontalSpacing();
            }
            return fullCellWidth - this._getBorderWidthBySpacing(_horizontalSpacing);
        }));
        this._disposables.push(this.vertical = ko.computed(() => {
            const _borderWidth = this._getBorderWidthBySpacing(this.verticalSpacing()) * context.zoom();
            const fullCellHeight = this.fullCellHeight() * context.zoom();
            let vertical = Math.floor(roundingXDecimals((this.rect().height - _borderWidth) / fullCellHeight));
            if (roundingXDecimals(this.rect().height - (vertical * fullCellHeight + _borderWidth)) >= roundingXDecimals(this.cellSize.height() * context.zoom() - _borderWidth)) {
                vertical += 1;
            }
            return vertical;
        }));
        this._disposables.push(this.horizontal = ko.computed(() => {
            const _borderWidth = this._getBorderWidthBySpacing(this.horizontalSpacing()) * context.zoom();
            const fullCellWidth = this.fullCellWidth() * context.zoom();
            let horizontal = Math.floor(roundingXDecimals((this.rect().width - _borderWidth) / fullCellWidth));
            if (roundingXDecimals(this.rect().width - (horizontal * fullCellWidth + _borderWidth)) >= roundingXDecimals(this.cellSize.width() * context.zoom() - _borderWidth)) {
                horizontal += 1;
            }
            return horizontal;
        }));
        this._disposables.push(this.topEmptySpace = ko.computed(() => {
            const _verticalSpacing = this.verticalSpacing();
            const _borderWidth = this._getBorderWidthBySpacing(_verticalSpacing);
            const _emptySpace = this.rect().height / context.zoom() - (this.fullCellHeight() * this.vertical() - _verticalSpacing + _borderWidth);
            return CharacterCombHelper.distributionEmptySpace(_emptySpace, true, this.getControlModel().textAlignment());
        }));
        this._disposables.push(this.leftEmptySpace = ko.computed(() => {
            const _horizontalSpacing = this.horizontalSpacing();
            const _borderWidth = this._getBorderWidthBySpacing(_horizontalSpacing);
            const _emptySpace = this.rect().width / context.zoom() - (this.fullCellWidth() * this.horizontal() - _horizontalSpacing + _borderWidth);
            return CharacterCombHelper.distributionEmptySpace(_emptySpace, false, this.getControlModel().textAlignment());
        }));
        this._disposables.push(this.css = ko.pureComputed(() => {
            return $.extend({}, this.cssCalculator.fontCss(), this.cssCalculator.foreColorCss(), this.cssCalculator.backGroundCss());
        }));
        this._disposables.push(this.borderCss = ko.pureComputed(() => {
            return this.cssCalculator.borderCss();
        }));
        this._disposables.push(ko.computed(() => {
            this.updateArray(this.vertical() * this.horizontal());
            this._updateCellsText(control.textAlignment.peek());
        }));
        this._disposables.push(control.text.subscribe((newVal) => {
            this._updateCellsText(control.textAlignment.peek());
        }));
    }
    _createCell(text, position) {
        return {
            text: ko.observable(text),
            left: ko.computed(() => {
                const _horizontalSpacing = this.horizontalSpacing();
                const borderWidth = this._getBorderWidthBySpacing(_horizontalSpacing);
                const line = Math.floor((position) / this.horizontal());
                let column = position - (this.horizontal() * line);
                if (this.rtl()) {
                    column = (this.horizontal() * (line + 1)) - (position + 1);
                }
                return column * (this.cellSize.width() + _horizontalSpacing - borderWidth) + this.leftEmptySpace();
            }),
            top: ko.computed(() => {
                const _verticalSpacing = this.verticalSpacing();
                const borderWidth = this._getBorderWidthBySpacing(_verticalSpacing);
                const line = Math.floor((position) / this.horizontal());
                return line * (this.cellSize.height() + _verticalSpacing - borderWidth) + this.topEmptySpace();
            }),
            size: this.cellSize,
            isEmpty: false
        };
    }
    _updateCellsText(textAlignment) {
        const alignments = CharacterCombHelper.getAlignments(textAlignment);
        const texts = CharacterCombHelper.getLines(this.displayText(), this.horizontal.peek(), this._control.multiline(), this._control['wordWrap'] && this._control['wordWrap']());
        CharacterCombHelper.setText(texts, this.cells.peek(), (texts, position) => {
            return CharacterCombHelper.getTextOffset(texts, position, alignments.vertical, alignments.horizontal, this.vertical.peek(), this.horizontal.peek());
        });
    }
    _getBorderWidthBySpacing(spacing) {
        return (!spacing && this.borders() && this.borders() !== 'None') ? this.borderWidth() : 0;
    }
    _applyBounds(newRect, newHorizontal, newVertical, multiline, wordwrap) {
        if (newVertical <= this.vertical()) {
            const notEmptyCells = this.cells().filter(cell => !cell.isEmpty);
            const cellLefts = notEmptyCells.map(cell => cell.left());
            newRect.top += notEmptyCells[0].top();
            if (newHorizontal <= this.horizontal())
                newRect.left += Math.min(...cellLefts);
        }
        else if (newHorizontal <= this.horizontal()) {
            const newCells = [];
            this.updateArray(newVertical * newHorizontal, newCells);
            const alignments = CharacterCombHelper.getAlignments(this.getControlModel()['textAlignment']());
            const texts = CharacterCombHelper.getLines(this.displayText(), newHorizontal, multiline, wordwrap);
            CharacterCombHelper.setText(texts, newCells, (texts, position) => {
                return CharacterCombHelper.getTextOffset(texts, position, alignments.vertical, alignments.horizontal, newVertical, newHorizontal);
            });
            const newCellsLefts = newCells.filter(cell => !cell.isEmpty).map(cell => cell.left());
            newRect.left += Math.min(...newCellsLefts);
        }
        newRect.height = (this.cellSize.height() + this.verticalSpacing()) * newVertical - this.verticalSpacing() - unitsToPixel(this._getBorderWidthBySpacing(this.verticalSpacing()) * (newVertical - 1), this._context.measureUnit(), 1);
        newRect.width = (this.cellSize.width() + this.horizontalSpacing()) * newHorizontal - this.horizontalSpacing() - unitsToPixel(this._getBorderWidthBySpacing(this.horizontalSpacing()) * (newHorizontal - 1), this._context.measureUnit(), 1);
    }
    updateArray(cellsCount, array) {
        const cells = array || this.cells.peek();
        if (cells.length > cellsCount) {
            cells.splice(cellsCount, cells.length - cellsCount);
        }
        else if (cells.length < cellsCount) {
            for (let i = cells.length; i < cellsCount; i++) {
                cells.push(this._createCell('', i));
            }
        }
        if (!array)
            this.cells.valueHasMutated();
    }
    fitBoundsToText() {
        const _multiline = this._control['multiline'] && this._control['multiline']();
        const _wordwrap = this._control['wordWrap'] && this._control['wordWrap']();
        const zoom = this._context.zoom();
        const oldRect = this.rect();
        const newRect = {};
        Object.keys(oldRect).forEach(propertyName => {
            newRect[propertyName] = oldRect[propertyName] / zoom;
        });
        const newHorizVert = CharacterCombHelper.getHorizontalVerticalByText(_multiline, _wordwrap, this.displayText(), this.horizontal() || 1, this.vertical() || 1);
        this._applyBounds(newRect, newHorizVert.horizontal, newHorizVert.vertical, _multiline, _wordwrap);
        if (newRect.top !== oldRect.top || newRect.height !== oldRect.height || newRect.left !== oldRect.left || newRect.width !== oldRect.width) {
            this.rect({ top: Math.round(newRect.top * zoom), height: newRect.height * zoom, left: Math.round(newRect.left * zoom), width: newRect.width * zoom });
            this.getControlModel().roundSize();
        }
    }
    getText() {
        return this.displayText();
    }
}