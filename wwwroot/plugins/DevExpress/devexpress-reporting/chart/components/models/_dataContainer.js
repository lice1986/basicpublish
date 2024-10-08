﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_dataContainer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { getLocalization, getUniqueName } from '@devexpress/analytics-core/analytics-internal';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { SvgTemplatesEngine } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { pivotGridDataSourceOptions, seriesDataMember, seriesSerializable, viewBindableSerializationInfo } from '../../internal/meta/_chart';
import { dataMember } from '../../internal/meta/_common';
import { createInnerActionsWithPopover } from '../../internal/_utils';
import { deserializeModelArray, getSeriesClassName } from '../../_utils';
import { SeriesViewModel } from '../series/_series';
import { seriesTemplate } from '../series/_template';
export class DataContainerViewModel extends SerializableModel {
    constructor(model, serializer) {
        super(model, serializer, dataContainerSerializationsInfo);
        this.series = deserializeModelArray(model && model['SeriesSerializable'], (item, parent) => { return new SeriesViewModel(item, parent, serializer); }, SeriesViewModel.prefix);
        const array = viewBindableSerializationInfo.valuesArray;
        const actions = [];
        for (let i = 0; i < array.length; i++) {
            const value = array[i];
            const getImageClassName = (isTemplate = false) => (isTemplate ? 'dxrd-svg-fieldlist-' : 'dx-image-fieldlist-') + getSeriesClassName(value.value);
            actions.push({
                text: getLocalization(value.displayValue, value.localizationId),
                imageClassName: getImageClassName(),
                imageTemplateName: SvgTemplatesEngine.getExistingTemplate(getImageClassName(true)),
                disabled: ko.observable(false),
                visible: true,
                clickAction: ((typeName) => (item) => {
                    this.series()['innerActions'][0].closePopover();
                    this.series.push(new SeriesViewModel({
                        '@Name': getUniqueName(this.series().map(x => { return x['name'](); }), SeriesViewModel.prefix),
                        'View': {
                            '@TypeNameSerializable': typeName,
                        }
                    }, this.series));
                })(value.value)
            });
        }
        this.series()['innerActions'] = createInnerActionsWithPopover(getLocalization('Add', 'ChartStringId.MenuItemAdd'), 'addseries-action', actions);
    }
    static from(model, serializer) {
        return new DataContainerViewModel(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, dataContainerSerializationsInfo, refs);
    }
    getChildComponents() {
        return [
            { component: ko.unwrap(this.series), path: 'Series' },
        ];
    }
}
export const dataContainerSerializationsInfo = [seriesDataMember, seriesSerializable, seriesTemplate, dataMember, pivotGridDataSourceOptions];
export const dataContainer = { propertyName: 'dataContainer', modelName: 'DataContainer', displayName: 'Data Container', info: dataContainerSerializationsInfo, from: DataContainerViewModel.from, toJsonObject: DataContainerViewModel.toJson, editor: editorTemplates.getEditor('objecteditorCustom') };
