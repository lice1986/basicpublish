﻿/**
* DevExpress HTML/JS Reporting (chart\components\_diagram.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { diagramMapper, panes, secondaryAxesX } from '../internal/meta/_diagram';
import { deserializeModelArray } from '../_utils';
import { SecondaryAxisViewModel } from './axis/_secondaryAxisViewModel';
import { AdditionalPaneViewModel } from './models/_additionalPane';
export class DiagramViewModel extends SerializableModel {
    constructor(model, type, serializer = new ModelSerializer()) {
        const info = diagramMapper[type].info;
        model = $.extend(model, { '@TypeNameSerializable': diagramMapper[type].type });
        super(model, serializer, diagramMapper[type].info);
        if (info.filter(x => { return x.propertyName === secondaryAxesX.propertyName; }).length > 0) {
            const createAxes = (item, parent) => { return new SecondaryAxisViewModel(item, parent, serializer); };
            this.secondaryAxesX = deserializeModelArray(model && model['SecondaryAxesX'], createAxes, SecondaryAxisViewModel.xPrefix);
            this.secondaryAxesY = deserializeModelArray(model && model['SecondaryAxesY'], createAxes, SecondaryAxisViewModel.yPrefix);
        }
        if (info.filter(x => { return x.propertyName === panes.propertyName; }).length > 0) {
            this.panes = deserializeModelArray(model && model['Panes'], (item, parent) => { return new AdditionalPaneViewModel(item, parent, serializer); }, AdditionalPaneViewModel.prefix);
        }
    }
    getChildComponents() {
        var _a;
        return [
            { component: this.axisX, path: 'AxisX' },
            { component: this.axisY, path: 'AxisY' },
            { component: ko.unwrap(this.secondaryAxesX), path: 'SecondaryAxesX' },
            { component: ko.unwrap(this.secondaryAxesY), path: 'SecondaryAxesY' },
            { component: ko.unwrap(this.panes), path: 'Panes' },
            { component: (_a = this.defaultPane) === null || _a === void 0 ? void 0 : _a.title, path: 'DefaultPane.Title' }
        ];
    }
    static toJson(value, serializer, refs) {
        return serializer.serialize(value, null, refs);
    }
}
export const diagram = { propertyName: 'diagram', modelName: 'Diagram', displayName: 'Diagram', from: (val) => { return ko.observable(val); }, toJsonObject: DiagramViewModel.toJson, localizationId: 'DevExpress.XtraReports.UI.XRChart.Diagram' };
