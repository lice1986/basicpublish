﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_chart.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { cutRefs } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { appearanceName, backImage, emptyChartText, legends, paletteName, sideBySideBarDistance, sideBySideBarDistanceFixed, sideBySideEqualBarWidth, smallChartText, titles } from '../../internal/meta/_chart';
import { diagramMapper } from '../../internal/meta/_diagram';
import { deserializeModelArray } from '../../_utils';
import { diagram, DiagramViewModel } from '../_diagram';
import { AdditionalLegendViewModel } from './_additionalLegend';
import { dataContainer } from './_dataContainer';
import { legend } from './_legend';
import { assignTitleActions, TitleViewModel } from './_title';
export class ChartViewModel extends SerializableModel {
    constructor(model, serializer) {
        super(cutRefs(model), serializer, chartSerializationsInfo);
        const oldType = ko.observable('');
        this._createDiagram(model['Diagram'], oldType, serializer);
        this._disposables.push(ko.computed(() => {
            this._createDiagram({}, oldType, serializer);
        }));
        this.titles = deserializeModelArray(model && model['Titles'], (title, parent) => { return new TitleViewModel(title, parent, serializer); }, TitleViewModel.prefix);
        this.legends = deserializeModelArray(model && model['Legends'], (legends, parent) => { return new AdditionalLegendViewModel(legends, parent, serializer); }, AdditionalLegendViewModel.prefix);
        this._patchSeries(this.dataContainer.seriesTemplate);
        this._disposables.push(this.dataContainer.series.subscribe((changes) => {
            changes.filter(x => x.status === 'added').forEach((change) => {
                this._patchSeries(change.value);
            });
        }, undefined, 'arrayChange'));
        this.dataContainer.series().forEach((series) => this._patchSeries(series));
        assignTitleActions(this.titles);
    }
    static from(model, serializer) {
        return new ChartViewModel(model || {}, serializer);
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, chartSerializationsInfo, refs);
    }
    _patchView(view) {
        const info = view.getInfo();
        ['barDistance', 'barDistanceFixed', 'equalBarWidth'].forEach(propertyName => {
            if (info.filter(x => x.propertyName === propertyName).length > 0) {
                view[propertyName] = this[propertyName];
            }
        });
    }
    _patchSeries(series) {
        series._disposables.push(series.view.subscribe((newVal) => {
            this._patchView(newVal);
        }));
        this._patchView(series.view());
    }
    _createDiagram(model, oldType, serializer) {
        if (model) {
            let typeName = '';
            if (this.dataContainer.seriesDataMember() || this.dataContainer.series().length === 0) {
                typeName = this.dataContainer.seriesTemplate.viewType();
            }
            else {
                typeName = this.dataContainer.series()[0].viewType();
            }
            if (oldType.peek() !== diagramMapper[typeName].type) {
                oldType(diagramMapper[typeName].type);
                this.diagram(new DiagramViewModel(model, typeName, serializer));
            }
        }
    }
    getChildComponents() {
        return [
            { component: this.emptyChartText, path: 'EmptyChartText' },
            { component: this.smallChartText, path: 'SmallChartText' },
            { component: ko.unwrap(this.titles), path: 'Titles' },
            { component: ko.unwrap(this.legends), path: 'Legends' },
            { component: this.legend.title, path: 'Legend.Title' },
            { component: this.dataContainer, path: '' },
            { component: ko.unwrap(this.diagram), path: 'Diagram' }
        ];
    }
}
export const chartSerializationsInfo = [appearanceName, backImage, paletteName, sideBySideBarDistanceFixed, sideBySideEqualBarWidth, sideBySideBarDistance, dataContainer, diagram, titles, legend, legends, emptyChartText, smallChartText];
export const chart = { propertyName: 'chart', modelName: 'Chart', displayName: 'Chart', from: ChartViewModel.from, toJsonObject: ChartViewModel.toJson, localizationId: 'DevExpress.XtraReports.UI.XRChart' };
