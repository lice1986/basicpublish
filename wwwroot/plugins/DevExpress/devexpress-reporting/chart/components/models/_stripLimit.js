﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_stripLimit.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { axisValue, axisValueSerializable } from '../../internal/meta/_axis';
import { tag } from '../../internal/meta/_common';
export class StripLimitViewModel extends SerializableModel {
    constructor(model, serializer, info) {
        super(model, serializer, info || stripLimitSerializationsInfo);
        this.axisValue = ko.observable(this._axisValue());
        this.getInfo = () => {
            if (!this.enabled()) {
                const newInfo = extend(true, [], stripLimitSerializationsInfo);
                const axisValueProperty = newInfo.filter((info) => { return info.propertyName === 'axisValue'; })[0];
                axisValueProperty.visible = false;
                return newInfo;
            }
            return stripLimitSerializationsInfo;
        };
    }
    static from(model, serializer) {
        return new StripLimitViewModel(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        value._axisValue(value.enabled() ? value.axisValue() : null);
        return serializer.serialize(value, undefined, refs);
    }
    getExpressionProperties() {
        return ['AxisValue'];
    }
}
const stripLimitEnable = { propertyName: 'enabled', modelName: '@Enabled', displayName: 'Enabled', defaultVal: true, editor: editorTemplates.getEditor('bool'), from: parseBool, localizationId: 'DevExpress.XtraCharts.StripLimit.Enabled' };
export const stripLimitSerializationsInfo = [axisValueSerializable, axisValue, stripLimitEnable, tag];
export const stripMinLimitInfo = { propertyName: 'minLimit', modelName: 'MinLimit', displayName: 'Min Limit', from: StripLimitViewModel.from, toJsonObject: StripLimitViewModel.toJson, editor: editorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraCharts.Strip.MinLimit' }, stripMaxLimitInfo = { propertyName: 'maxLimit', modelName: 'MaxLimit', displayName: 'Max Limit', from: StripLimitViewModel.from, toJsonObject: StripLimitViewModel.toJson, editor: editorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraCharts.Strip.MaxLimit' };