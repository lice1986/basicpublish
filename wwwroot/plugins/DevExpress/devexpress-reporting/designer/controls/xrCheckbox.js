﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCheckbox.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PaddingModel } from '@devexpress/analytics-core/analytics-elements';
import { unitsToPixel } from '@devexpress/analytics-core/analytics-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { Locker } from '../../common/utils/_locker';
import { createCustomGlyphStyleCss, getCheckBoxTemplate } from '../../viewer/editing/models/checkEditingField';
import { XRControlViewModel } from './xrControl';
import { XRReportElementViewModel } from './xrReportelement';
import { XRTextControlSurfaceBase } from './xrTextControl';
export class XRCheckBoxViewModel extends XRControlViewModel {
    constructor(control, parent, serializer) {
        super(XRCheckBoxViewModel._patchModel(control), parent, serializer);
        const lock = new Locker().lock;
        this._disposables.push(this.checkBoxState.subscribe((val) => {
            lock(() => {
                this.checked(val === 'Checked' || val === 'Indeterminate');
            });
        }));
        this._disposables.push(this.checked.subscribe((val) => {
            lock(() => {
                this.checkBoxState(val ? 'Checked' : 'Unchecked');
            });
        }));
        if (this.checkBoxState() !== 'Unchecked') {
            this.checkBoxState.valueHasMutated();
        }
        else if (this.checked() !== false) {
            this.checked.valueHasMutated();
        }
        if (this.glyphOptions && ko.isObservable(this.glyphOptions.alignment))
            this.glyphAlignment = this.glyphOptions.alignment;
    }
    static _patchModel(model) {
        if (model['@CheckState']) {
            model['@CheckBoxState'] = model['@CheckState'];
            delete model['@CheckState'];
        }
        return model;
    }
}
XRCheckBoxViewModel.unitProperties = [].concat(['glyphOptions'], XRReportElementViewModel.unitProperties);
export class XRCheckBoxSurface extends XRTextControlSurfaceBase {
    constructor(control, context) {
        super(control, context);
        this.checkStateWidthContainer = ko.observable();
        this.visibleText = ko.observable(true);
        this.contenttemplate = 'dxrd-checkbox-content';
        this._disposables.push(this.checkStateWidth = ko.computed(() => {
            return unitsToPixel(control.glyphOptions.size.width(), context.measureUnit(), 1);
        }));
        this._disposables.push(this.checkStateHeight = ko.computed(() => {
            return unitsToPixel(control.glyphOptions.size.height(), context.measureUnit(), 1);
        }));
        this._disposables.push(this.checkStateClass = ko.pureComputed(() => {
            return 'dxrd-checkbox-checkstate-' + control['checkBoxState']().toLowerCase();
        }));
        this._disposables.push(this.customGlyphStyleCss = ko.pureComputed(() => {
            return createCustomGlyphStyleCss(control.glyphOptions.customGlyphs[control['checkBoxState']()]());
        }));
        this._disposables.push(this.checkStateStyleIcon = ko.pureComputed(() => {
            return getCheckBoxTemplate(control.glyphOptions.style(), control['checkBoxState'](), this.customGlyphStyleCss());
        }));
        this.leftPadding = () => {
            const padding = ko.unwrap(control['paddingObj']) || PaddingModel.from(PaddingModel.defaultVal);
            return unitsToPixel(padding._get('left'), context.measureUnit());
        };
        this._disposables.push(this.textWidth = ko.pureComputed(() => {
            return this.contentWidthWithoutZoom() - this.checkStateWidth() - this.leftPadding();
        }));
        this._disposables.push(this.visibleText = ko.pureComputed(() => {
            return control['glyphAlignment']() !== 'Center';
        }));
        this._disposables.push(this.checkStateWidthContainer = ko.pureComputed(() => {
            return this.visibleText() ? this.checkStateWidth() + 'px' : '100%';
        }));
        this.isGlyphAlignmentNear = ko.pureComputed(() => {
            return this._control.rtl() ? control['glyphAlignment']() === 'Far' : control['glyphAlignment']() === 'Near';
        });
        this._disposables.push(this.css = ko.pureComputed(() => {
            return $.extend({}, this.cssCalculator.fontCss(), this.cssCalculator.backGroundCss(), this.cssCalculator.foreColorCss(), this.cssCalculator.textAlignmentCss(), this.cssCalculator.paddingsCss());
        }));
    }
}