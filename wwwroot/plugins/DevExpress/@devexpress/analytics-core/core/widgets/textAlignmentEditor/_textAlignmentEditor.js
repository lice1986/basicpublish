﻿/**
* DevExpress Analytics (core\widgets\textAlignmentEditor\_textAlignmentEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { getLocalization } from '../../../property-grid/localization/_localization';
import { Disposable } from '../../../serializer/disposable';
export class TextAlignmentModel extends Disposable {
    constructor(object) {
        super();
        this.top = ko.observable(false);
        this.middle = ko.observable(false);
        this.bottom = ko.observable(false);
        this.left = ko.observable(false);
        this.right = ko.observable(false);
        this.center = ko.observable(false);
        this.justify = ko.observable(false);
        this.horizontalString = ko.observable(getLocalization('Horizontal', 'ASPxReportsStringId.ReportDesigner_TextAlignment_Horizontal'));
        this.verticalString = ko.observable(getLocalization('Vertical', 'ASPxReportsStringId.ReportDesigner_TextAlignment_Vertical'));
        this.disabled = object.disabled || ko.observable(false);
        this.value = object.value;
        this.updateModel(object.value());
        this._disposables.push(object.value.subscribe((newVal) => {
            this.updateModel(newVal);
        }));
    }
    _resetHorizontalValues() {
        this.left(false), this.right(false), this.center(false), this.justify(false);
    }
    _resetVerticalValues() {
        this.top(false), this.middle(false), this.bottom(false);
    }
    setValue(name, type) {
        if (this.disabled() || this[name]())
            return;
        if (type == 'Horizontal')
            this._resetHorizontalValues();
        else
            this._resetVerticalValues();
        this[name](true);
        this.updateValue();
    }
    updateModel(value) {
        const val = value || 'TopLeft';
        this.top(val.indexOf('Top') !== -1);
        this.middle(val.indexOf('Middle') !== -1);
        this.bottom(val.indexOf('Bottom') !== -1);
        this.left(val.indexOf('Left') !== -1);
        this.right(val.indexOf('Right') !== -1);
        this.center(val.indexOf('Center') !== -1);
        this.justify(val.indexOf('Justify') !== -1);
    }
    updateValue() {
        const result = [];
        this.top() ? result.push('Top') : null;
        this.middle() ? result.push('Middle') : null;
        this.bottom() ? result.push('Bottom') : null;
        this.left() ? result.push('Left') : null;
        this.right() ? result.push('Right') : null;
        this.center() ? result.push('Center') : null;
        this.justify() ? result.push('Justify') : null;
        this.value(result.join(''));
    }
}
