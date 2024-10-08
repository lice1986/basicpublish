﻿/**
* DevExpress Analytics (property-grid\widgets\fonteditor\_model.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { defaultFontSerialization } from '../internal/_internal';
export const availableUnits = [
    { value: 'pt', displayValue: 'Point', localizationId: 'DevExpress.ReportDesigner_FontOptions_Unit_Point' },
    { value: 'world', displayValue: 'World', localizationId: 'AnalyticsCoreStringId.FontOptions_Unit_World' },
    { value: 'px', displayValue: 'Pixel', localizationId: 'AnalyticsCoreStringId.FontOptions_Unit_Pixel' },
    { value: 'in', displayValue: 'Inch', localizationId: 'AnalyticsCoreStringId.Wizard_Inch' },
    { value: 'doc', displayValue: 'Document', localizationId: 'PreviewStringId.ReportDesigner_FontOptions_Unit_Document' },
    { value: 'mm', displayValue: 'Millimetr', localizationId: 'AnalyticsCoreStringId.Wizard_Millimeter' }
];
export class FontModel extends Disposable {
    constructor(value) {
        super();
        this.family = ko.observable(null);
        this.unit = ko.observable(null);
        this.isUpdateModel = false;
        this.size = ko.observable(null);
        this.modificators = {
            bold: ko.observable(false),
            italic: ko.observable(false),
            strikeout: ko.observable(false),
            underline: ko.observable(false)
        };
        this.updateModel(value());
        this._disposables.push(value.subscribe((newVal) => {
            this.isUpdateModel = true;
            this.updateModel(newVal);
            this.isUpdateModel = false;
        }));
        this._disposables.push(this.modificators.bold.subscribe((newVal) => this.updateValue(value)));
        this._disposables.push(this.modificators.italic.subscribe((newVal) => this.updateValue(value)));
        this._disposables.push(this.modificators.strikeout.subscribe((newVal) => this.updateValue(value)));
        this._disposables.push(this.modificators.underline.subscribe((newVal) => this.updateValue(value)));
        this._disposables.push(this.family.subscribe((newVal) => this.updateValue(value)));
        this._disposables.push(this.size.subscribe((newVal) => this.updateValue(value)));
        this._disposables.push(this.unit.subscribe((newVal) => this.updateValue(value)));
    }
    _toString() {
        const leftPart = [this.family(), this.size() + this.unit()].join(', ');
        const modificators = [];
        if (this.modificators.bold())
            modificators.push('Bold');
        if (this.modificators.italic())
            modificators.push('Italic');
        if (this.modificators.underline())
            modificators.push('Underline');
        if (this.modificators.strikeout())
            modificators.push('Strikeout');
        const rightPart = modificators.join(', ');
        return !!rightPart ? [leftPart, rightPart].join(', style=') : leftPart;
    }
    updateModel(value) {
        if (!value)
            value = defaultFontSerialization();
        const components = value.split(',');
        this.family(components[0]);
        const self = this;
        availableUnits.forEach(function (element) {
            if (components[1].trim().indexOf(element.value) != -1) {
                self.size(parseFloat(components[1].split(element.value)[0]));
                self.unit(element.value);
            }
        });
        this.modificators.bold(value.indexOf('Bold') !== -1);
        this.modificators.italic(value.indexOf('Italic') !== -1);
        this.modificators.underline(value.indexOf('Underline') !== -1);
        this.modificators.strikeout(value.indexOf('Strikeout') !== -1);
    }
    updateValue(value) {
        if (!this.isUpdateModel) {
            value(this._toString());
        }
    }
}
