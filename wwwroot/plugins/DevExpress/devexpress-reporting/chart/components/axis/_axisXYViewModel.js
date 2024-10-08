﻿/**
* DevExpress HTML/JS Reporting (chart\components\axis\_axisXYViewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { axisXYSerializationsInfo, gridLinesAxisX, gridLinesAxisY, qualitativeScaleOptions } from '../../internal/meta/_axis';
import { deserializeModelArray } from '../../_utils';
import { ConstantLineViewModel } from '../models/_constantLine';
import { ScaleBreakViewModel } from '../models/_scaleBreak';
import { StripViewModel } from '../models/_strip';
export class AxisXYViewModel extends SerializableModel {
    constructor(model, serializer, info) {
        super(model, serializer, info || axisXYSerializationsInfo);
        this.constantLines = deserializeModelArray(model && model['ConstantLines'], (item, parent) => { return new ConstantLineViewModel(item, parent, serializer); }, ConstantLineViewModel.prefix);
        this.scaleBreaks = deserializeModelArray(model && model['ScaleBreaks'], (item, parent) => { return new ScaleBreakViewModel(item, parent, serializer); }, ScaleBreakViewModel.prefix);
        this.strips = deserializeModelArray(model && model['Strips'], (item, parent) => { return new StripViewModel(item, parent, serializer); }, StripViewModel.prefix);
    }
    static from(info) {
        return (model, serializer) => {
            return new AxisXYViewModel(model || {}, serializer, info);
        };
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, undefined, refs);
    }
    getChildComponents() {
        return [
            { component: this.axisTitle, path: 'Title' },
            { component: ko.unwrap(this.strips), path: 'Strips' },
            { component: ko.unwrap(this.constantLines), path: 'ConstantLines' },
            { component: ko.unwrap(this.wholeRange), path: 'WholeRange' }
        ];
    }
}
export const axisX = { propertyName: 'axisX', modelName: 'AxisX', displayName: 'Primary Axis X', localizationId: 'DevExpress.XtraCharts.AxisX', defaultVal: {}, from: AxisXYViewModel.from([gridLinesAxisX, qualitativeScaleOptions].concat(axisXYSerializationsInfo)), toJsonObject: AxisXYViewModel.toJson, editor: editorTemplates.getEditor('objecteditor') };
export const axisY = { propertyName: 'axisY', modelName: 'AxisY', displayName: 'Primary Axis Y', localizationId: 'DevExpress.XtraCharts.AxisY', defaultVal: {}, from: AxisXYViewModel.from([gridLinesAxisY].concat(axisXYSerializationsInfo)), toJsonObject: AxisXYViewModel.toJson, editor: editorTemplates.getEditor('objecteditor') };
