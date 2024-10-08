﻿/**
* DevExpress Analytics (core\internal\_cssCalculator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { unitsToPixel } from '../utils/_units.unitsToPixel';
import { PaddingModel } from '../elements/paddingModel';
import { extend } from '../../serializer/_utils';
import { currentMultiPlatformEngine } from '../../serializer/native/multiplatformEngine';
export function patchPositionByRTL(position, rtl) {
    if (rtl) {
        if (position === 'Left')
            return 'Right';
        else if (position === 'Right')
            return 'Left';
    }
    return position;
}
export class CssCalculator {
    constructor(control, _rtlLayout) {
        this._rtlLayout = _rtlLayout;
        this._control = control;
        this.borderCss = (zoom) => {
            const borderWidth = this._getBorderWidth(control, zoom);
            const borderDefault = currentMultiPlatformEngine.unwrap(control['borderDefault']);
            const borderColor = currentMultiPlatformEngine.unwrap(control['borderColor']) || '';
            const borders = currentMultiPlatformEngine.unwrap(control['borders']) || '';
            const borderStyle = currentMultiPlatformEngine.unwrap(control['borderDashStyle']) || '';
            return borderDefault ? this.createBorders(borderStyle, borderWidth, borderColor, borders, borderDefault) :
                this.createBorders(borderStyle, borderWidth, borderColor, borders);
        };
        this.backGroundCss = () => {
            return { backgroundColor: currentMultiPlatformEngine.unwrap(control['backColor']) || 'transparent' };
        };
        this.foreColorCss = () => {
            const color = (currentMultiPlatformEngine.unwrap(control['foreColor']) || 'transparent') === 'transparent' ? 'black' : currentMultiPlatformEngine.unwrap(control['foreColor']);
            return { color: color };
        };
        this.fontCss = () => {
            return this.createFont(currentMultiPlatformEngine.unwrap(control['font']) || '');
        };
        this.wordWrapCss = () => {
            return this.createWordWrap(currentMultiPlatformEngine.unwrap(control['wordWrap']), currentMultiPlatformEngine.unwrap(control['multiline']));
        };
        this.paddingsCss = () => {
            const controlPaddings = currentMultiPlatformEngine.unwrap(control['paddingObj'] || control['padding']) || PaddingModel.from(PaddingModel.defaultVal);
            const paddings = {
                paddingLeft: this._getPixelValueFromUnit(controlPaddings._get('left'), control) + 'px',
                paddingTop: this._getPixelValueFromUnit(controlPaddings._get('top'), control) + 'px',
                paddingRight: this._getPixelValueFromUnit(controlPaddings._get('right'), control) + 'px',
                paddingBottom: this._getPixelValueFromUnit(controlPaddings._get('bottom'), control) + 'px'
            };
            return paddings;
        };
        this.textAlignmentCss = () => {
            const align = currentMultiPlatformEngine.unwrap(control['textAlignment']) || '';
            return extend(this.createVerticalAlignment(align), this.createHorizontalAlignment(align));
        };
        this.stroke = () => {
            const color = (currentMultiPlatformEngine.unwrap(control['foreColor']) || 'transparent') === 'transparent' ? 'black' : currentMultiPlatformEngine.unwrap(control['foreColor']);
            return { 'stroke': color };
        };
        this.strokeWidth = () => {
            const lineWidth = currentMultiPlatformEngine.unwrap(control['lineWidth']) || '';
            return { 'strokeWidth': lineWidth };
        };
        this.strokeWidthWithWidth = () => {
            const lineWidth = currentMultiPlatformEngine.unwrap(control['width']) || '';
            return { 'strokeWidth': lineWidth };
        };
        this.strokeDashArray = () => {
            const dashArray = this.createStrokeDashArray(currentMultiPlatformEngine.unwrap(control['lineStyle']) || '', currentMultiPlatformEngine.unwrap(control['lineWidth']) || '');
            return { 'strokeDasharray': dashArray };
        };
        this.strokeDashArrayWithWidth = () => {
            const dashArray = this.createStrokeDashArray(currentMultiPlatformEngine.unwrap(control['lineStyle']) || '', currentMultiPlatformEngine.unwrap(control['width']) || '');
            return { 'strokeDasharray': dashArray };
        };
        this.crossBandBorder = (position) => {
            return this.createBorder(currentMultiPlatformEngine.unwrap(control['borderDashStyleCrossband']) || 'solid', this._getBorderWidth(control), currentMultiPlatformEngine.unwrap(control['borderColor']) || '', currentMultiPlatformEngine.unwrap(control['borders']) || '', position);
        };
        this.angle = () => {
            return this.createAngle(currentMultiPlatformEngine.unwrap(control['angle']) || 0);
        };
        this.cellBorder = (position, zoom) => {
            return this.createControlBorder(currentMultiPlatformEngine.unwrap(control['borderDashStyle']) || 'solid', this._getBorderWidth(control, zoom), currentMultiPlatformEngine.unwrap(control['borderColor']) || '', currentMultiPlatformEngine.unwrap(control['borders']) || '', position);
        };
        this.zipCodeFontCss = (fontSize) => {
            return this.createZipCodeFont(fontSize || currentMultiPlatformEngine.unwrap(control['size']['height']));
        };
        this.zipCodeAlignment = () => {
            const align = 'TopLeft';
            return extend(this.createVerticalAlignment(align), this.createHorizontalAlignment(align));
        };
    }
    _getPixelValueFromUnit(value, control) {
        if (control['root'] && control['root'].measureUnit) {
            return unitsToPixel(value, control['root'].measureUnit());
        }
        return value;
    }
    _patchPosition(position) {
        return patchPositionByRTL(position, currentMultiPlatformEngine.unwrap(this._rtlLayout));
    }
    _getBorderWidth(control, zoom) {
        const borderWidth = currentMultiPlatformEngine.unwrap(control['borderWidth']);
        return control['borderWidth'] && typeof borderWidth == 'number' ? Math.floor(borderWidth * (zoom || 1)) : '';
    }
    createBorder(dashStyle, width, color, positions, position) {
        let line = {};
        positions = positions || 'All';
        line = { stroke: 'Silver', strokeWidth: 2 };
        const dash = this.createStrokeDashArray(dashStyle, width);
        if (positions.indexOf(position) !== -1 || positions.indexOf('All') !== -1) {
            line['stroke'] = color;
            line['strokeWidth'] = width;
            line['strokeDasharray'] = dash;
        }
        return line;
    }
    createControlBorder(borderStyle, width, color, positions, position, defaultColor = 'solid 1px Silver') {
        const border = {};
        positions = positions || '';
        if (borderStyle === 'Dash') {
            borderStyle = 'dashed';
        }
        else if (borderStyle === 'Dot') {
            borderStyle = 'dotted';
        }
        else if (borderStyle === 'Double') {
            borderStyle = 'double';
        }
        else {
            borderStyle = 'solid';
        }
        if (positions.indexOf(position) !== -1 || positions.indexOf('All') !== -1) {
            border['border' + this._patchPosition(position)] = borderStyle + ' ' + width + 'px ' + color;
        }
        else {
            border['border' + this._patchPosition(position)] = defaultColor;
        }
        return border;
    }
    createBorders(borderStyle, width, color, positions, defaultColor = CssCalculator.DEFAULT_BORDER) {
        const left = this.createControlBorder(borderStyle, width, color, positions, 'Left', defaultColor);
        const right = this.createControlBorder(borderStyle, width, color, positions, 'Right', defaultColor);
        const top = this.createControlBorder(borderStyle, width, color, positions, 'Top', defaultColor);
        const bottom = this.createControlBorder(borderStyle, width, color, positions, 'Bottom', defaultColor);
        const border = extend({}, left, right, top, bottom);
        return border;
    }
    createZipCodeFont(height) {
        const fontStyles = {};
        fontStyles['fontFamily'] = 'Impact';
        fontStyles['fontSize'] = height + 'px';
        return fontStyles;
    }
    createFont(fontString) {
        const fontStyles = {};
        fontString = fontString || '';
        const components = fontString.split(',');
        fontStyles['fontFamily'] = components[0] ? '"' + components[0] + '"' : '';
        fontStyles['fontSize'] = components[1];
        if (components.length > 2) {
            for (let i = 2; i < components.length; i++) {
                if (components[i].indexOf('Bold') !== -1)
                    fontStyles['fontWeight'] = 'Bold';
                if (components[i].indexOf('Italic') !== -1)
                    fontStyles['fontStyle'] = 'Italic';
                if (components[i].indexOf('Underline') != -1)
                    fontStyles['textDecoration'] = 'Underline';
                if (components[i].indexOf('Strikeout') != -1)
                    fontStyles['textDecoration'] = (fontStyles['textDecoration'] ? fontStyles['textDecoration'] + ' ' : '') + 'Line-through';
            }
        }
        if (!fontStyles['fontWeight']) {
            fontStyles['fontWeight'] = '';
        }
        if (!fontStyles['fontStyle']) {
            fontStyles['fontStyle'] = '';
        }
        if (!fontStyles['textDecoration']) {
            fontStyles['textDecoration'] = '';
        }
        return fontStyles;
    }
    createVerticalAlignment(alignment) {
        const result = {};
        if (alignment.indexOf('Top') !== -1) {
            result['verticalAlign'] = 'top';
        }
        if (alignment.indexOf('Middle') !== -1) {
            result['verticalAlign'] = 'middle';
        }
        if (alignment.indexOf('Bottom') !== -1) {
            result['verticalAlign'] = 'bottom';
        }
        return result;
    }
    createHorizontalAlignment(alignment) {
        const result = {};
        if (alignment.indexOf('Left') !== -1) {
            result['textAlign'] = patchPositionByRTL('Left', this._control.rtl()).toLowerCase();
        }
        if (alignment.indexOf('Right') !== -1) {
            result['textAlign'] = patchPositionByRTL('Right', this._control.rtl()).toLowerCase();
        }
        if (alignment.indexOf('Center') !== -1) {
            result['textAlign'] = 'center';
        }
        if (alignment.indexOf('Justify') !== -1) {
            result['textAlign'] = 'justify';
        }
        return result;
    }
    createStrokeDashArray(style, width) {
        if (style === 'Solid') {
            return '';
        }
        else if (style === 'Dot') {
            return [width, width * 2].join('px, ') + 'px';
        }
        else if (style === 'Dash') {
            return [width * 4, width * 4].join('px, ') + 'px';
        }
        else if (style === 'DashDot') {
            return [width * 4, width * 2, width, width * 2].join('px, ') + 'px';
        }
        else if (style === 'DashDotDot') {
            return [width * 4, width * 2, width, width * 2, width, width * 2].join('px, ') + 'px';
        }
        else {
            return '';
        }
    }
    createWordWrap(wordwrap, multiline) {
        const result = {};
        if (wordwrap === false && multiline === false) {
            result['white-space'] = 'nowrap';
            result['word-wrap'] = 'normal';
        }
        else if (wordwrap === true && multiline === false) {
            result['word-wrap'] = 'break-word';
            result['white-space'] = '';
        }
        else if (wordwrap === false && multiline === true) {
            result['word-wrap'] = 'normal';
            result['white-space'] = 'pre';
        }
        else if (wordwrap === true && multiline === true) {
            result['white-space'] = 'pre-wrap';
            result['word-wrap'] = 'break-word';
        }
        return result;
    }
    createAngle(angle) {
        angle = -angle;
        return {
            '-webkit-transform': 'rotate(' + angle + 'deg)',
            '-moz-transform': 'rotate(' + angle + 'deg)',
            '-o-transform': 'rotate(' + angle + 'deg)',
            '-ms-transform': 'rotate(' + angle + 'deg)',
            'transform': 'rotate(' + angle + 'deg)'
        };
    }
    contentSizeCss(controlSurfaceWidth, controlSurfaceHeight, zoom, borders, paddings) {
        const result = { top: 1, left: 1, right: 1, bottom: 1, width: 1, height: 1 };
        borders = borders || currentMultiPlatformEngine.unwrap(this._control['borders']) || '';
        const borderWidth = this._getBorderWidth(this._control, zoom);
        ['Left', 'Top', 'Right', 'Bottom'].forEach((item) => {
            let value = 0;
            if (borderWidth != '' && (borders.indexOf(item) !== -1 || borders.indexOf('All') !== -1)) {
                value += borderWidth;
            }
            if (paddings) {
                value += this._getPixelValueFromUnit(paddings._get(item.toLowerCase()), this._control) * (zoom || 1);
            }
            if (value)
                result[this._patchPosition(item).toLowerCase()] = value;
        });
        result.width = controlSurfaceWidth - result.left - result.right;
        result.height = controlSurfaceHeight - result.top - result.bottom;
        return result;
    }
}
CssCalculator.DEFAULT_BORDER = 'none';
