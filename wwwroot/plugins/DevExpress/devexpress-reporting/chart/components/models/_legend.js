﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_legend.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { legendSerializationsInfo } from '../../internal/meta/_chart';
export class LegendViewModel extends SerializableModel {
    constructor(model, serializer) {
        super(model, serializer, legendSerializationsInfo);
    }
    static from(model, serializer) {
        return new LegendViewModel(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, legendSerializationsInfo, refs);
    }
}
export const legend = { propertyName: 'legend', modelName: 'Legend', displayName: 'Legend', localizationId: 'DevExpress.XtraCharts.Legend', info: legendSerializationsInfo, from: LegendViewModel.from, toJsonObject: LegendViewModel.toJson, defaultVal: {}, editor: editorTemplates.getEditor('objecteditor') };