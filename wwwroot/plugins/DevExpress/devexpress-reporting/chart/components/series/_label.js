﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_label.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { seriesLabelSerializationsInfo } from '../../internal/meta/_series';
export class SeriesLabelViewModel extends SerializableModel {
    constructor(model, serializer) {
        super(model, serializer, seriesLabelSerializationsInfo);
        if (this.typeNameSerializable) {
            this._disposables.push(this.typeNameSerializable.subscribe(val => {
                this.seriesLabelPosition(null);
            }));
        }
    }
    static from(model, serializer) {
        return new SeriesLabelViewModel(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, seriesLabelSerializationsInfo, refs);
    }
}
export const seriesLabel = { propertyName: 'label', modelName: 'Label', displayName: 'Label', info: seriesLabelSerializationsInfo, defaultVal: {}, from: SeriesLabelViewModel.from, toJsonObject: SeriesLabelViewModel.toJson, editor: editorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraReports.UI.XRLabel' };
