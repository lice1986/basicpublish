﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrGauge.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { XRControlViewModel } from './xrControl';
export const circularValues = [
    { displayValue: 'Half', value: 'Half', localizationId: 'GaugesPresetsStringId.ShapeHalf' },
    { displayValue: 'Full', value: 'Full', localizationId: 'GaugesPresetsStringId.ShapeFull' },
    { displayValue: 'QuarterLeft', value: 'QuarterLeft', localizationId: 'GaugesPresetsStringId.ShapeQuarterLeft' },
    { displayValue: 'QuarterRight', value: 'QuarterRight', localizationId: 'GaugesPresetsStringId.ShapeQuarterRight' },
    { displayValue: 'ThreeFourth', value: 'ThreeFourth', localizationId: 'GaugesPresetsStringId.ShapeThreeFourth' }
];
export const linearValues = [
    { displayValue: 'Horizontal', value: 'Horizontal', localizationId: 'GaugesPresetsStringId.ShapeHorizontal' },
    { displayValue: 'Vertical', value: 'Vertical', localizationId: 'GaugesPresetsStringId.ShapeVertical' }
];
export class XRGaugeViewModel extends XRControlViewModel {
    constructor(model, parent, serializer) {
        super(model, parent, serializer);
        this._disposables.push(this.viewType.subscribe((val) => {
            return this.viewStyle(val === 'Circular' ? circularValues[0].value : linearValues[0].value);
        }));
    }
    getInfo() {
        const serializationInfo = $.extend(true, [], super.getInfo());
        const viewStyleProperty = serializationInfo.filter((info) => { return info.propertyName === 'viewStyle'; })[0];
        viewStyleProperty.defaultVal = this.viewType && (this.viewType() === 'Linear') ? 'Horizontal' : 'Half';
        return serializationInfo;
    }
}
XRGaugeViewModel.bindings = ['ActualValue', 'Maximum', 'Minimum', 'TargetValue'];