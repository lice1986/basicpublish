﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_fillStyle.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import { tag } from '../../internal/meta/_common';
import { fillModeMapper, fillStyleOptionsSerialize } from '../../internal/meta/_series';
export class FillStyle extends SerializableModel {
    constructor(model, info, gradientTypeName, serializer) {
        super(model, serializer, info);
        this.gradientTypeName = gradientTypeName;
        this.updateOptions(this.fillMode(), serializer, model['Options']);
        this._disposables.push(this.fillMode.subscribe((newValue) => {
            this.updateOptions(newValue, serializer, {});
        }));
    }
    static from(info, gradientTypeName) {
        return (model, serializer) => {
            return new FillStyle(model || {}, info, gradientTypeName, serializer);
        };
    }
    static toJson(model, serializer, refs) {
        return serializer.serialize(model, undefined, refs);
    }
    _optionsTypeMap(unitType) {
        switch (unitType) {
            case 'Gradient': return this.gradientTypeName;
            case 'Hatch': return 'HatchFillOptions';
            default: return undefined;
        }
    }
    isPropertyVisible(propertyName) {
        return propertyName !== 'options' || (propertyName === 'options' && this[propertyName]());
    }
    updateOptions(fillMode, serializer, optionsObject) {
        const newObject = $.extend({ '@TypeNameSerializable': this._optionsTypeMap(fillMode) }, optionsObject);
        const optionsInfo = fillModeMapper[fillMode];
        this.options(new SerializableModel(newObject, serializer, optionsInfo));
    }
}
export const viewFillMode = {
    propertyName: 'fillMode', modelName: '@FillMode', displayName: 'Fill Mode', localizationId: 'DevExpress.XtraCharts.FillStyle2D.FillMode', editor: editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Empty', displayValue: 'Empty', localizationId: 'DevExpress.XtraPivotGrid.PivotGridAppearances.Empty' }, { value: 'Solid', displayValue: 'Solid', localizationId: 'DevExpress.XtraCharts.FillMode3D.Solid' }, { value: 'Gradient', displayValue: 'Gradient', localizationId: 'DevExpress.XtraCharts.FillMode3D.Gradient' }, { value: 'Hatch', displayValue: 'Hatch', localizationId: 'DevExpress.XtraCharts.FillMode.Hatch' }], defaultVal: 'Empty'
};
export const fillStyleInfo = [viewFillMode, fillStyleOptionsSerialize, tag];
export const stripFillStyle = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', localizationId: 'DevExpress.XtraCharts.Strip.FillStyle', editor: editorTemplates.getEditor('objecteditor'), from: FillStyle.from(fillStyleInfo, 'RectangleGradientFillOptions'), toJsonObject: FillStyle.toJson };
