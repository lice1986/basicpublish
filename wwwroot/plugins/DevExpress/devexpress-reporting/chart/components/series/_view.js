﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_view.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { typeNameSerializable } from '../../internal/meta/_series';
import { viewMapper } from '../../internal/meta/_view';
import { assignTitleActions } from '../models/_title';
import { assignIndicatorActions } from './_indicator';
export class SeriesViewViewModel extends SerializableModel {
    constructor(model, serializer) {
        model['@TypeNameSerializable'] = model['@TypeNameSerializable'] || 'SideBySideBarSeriesView';
        super(model, serializer);
        if (this['titles'])
            assignTitleActions(this['titles']);
        if (this['indicators'])
            assignIndicatorActions(this['indicators']);
        this._createMarkerDependences();
        this._createLinkOptionsDependences();
        this['isPropertyDisabled'] = (propertyName) => {
            return this._createPropertyDisabledDependence(propertyName, 'heightToWidthRatio', this['heightToWidthRatioAuto'], [true]) ||
                this._createPropertyDisabledDependence(propertyName, 'minSize', this['autoSize'], [true]) ||
                this._createPropertyDisabledDependence(propertyName, 'maxSize', this['autoSize'], [true]) ||
                this._createPropertyDisabledDependence(propertyName, 'barDepth', this['barDepthAuto'], [true]) ||
                this._createPropertyDisabledDependence(propertyName, 'showFacet', this['model'], ['Cone', 'Pyramid']);
        };
    }
    static from(model, serializer) {
        return ko.observable(new SeriesViewViewModel(model || {}, serializer));
    }
    dispose() {
        this._disposables.forEach(x => x.dispose());
    }
    static toJson(value, serializer, refs) {
        const unwrappedValue = ko.unwrap(value);
        return serializer.serialize(unwrappedValue, unwrappedValue.getInfo(), refs);
    }
    _getInfo(typeName) {
        return [typeNameSerializable].concat(viewMapper[typeName]);
    }
    _createPropertyDisabledDependence(propertyName, depLeftPropertyName, depRightProperty, depValues, reverse = false) {
        if (propertyName !== depLeftPropertyName || !depRightProperty)
            return false;
        let isDisabled = false;
        for (let i = 0; i < depValues.length; i++) {
            if (depRightProperty() === depValues[i]) {
                isDisabled = true;
                break;
            }
        }
        return reverse ? !isDisabled : isDisabled;
    }
    _createMarkerDependences() {
        ['minValueMarker', 'maxValueMarker', 'marker1', 'marker2', 'markerOptions', 'lineMarkerOptions', 'bubbleMarkerOptions', 'pointMarkerOptions'].forEach((propertyName) => {
            if (this[propertyName]) {
                this[propertyName].isPropertyDisabled = (innerName) => {
                    return this._createPropertyDisabledDependence(innerName, 'starPointCount', this[propertyName].kind, ['Star'], true);
                };
            }
        });
    }
    _createLinkOptionsDependences() {
        if (!!this['linkOptions']) {
            this._disposables.push(this['linkOptions'].color.subscribe((newVal) => {
                this['linkOptions'].colorSource('OwnColor');
            }));
        }
    }
    preInitProperties(model) {
        this.getInfo = () => { return this._getInfo(model['@TypeNameSerializable']); };
    }
    getChildComponents() {
        return [
            { component: ko.unwrap(this.indicators), path: 'Indicators' },
            { component: ko.unwrap(this.titles), path: 'Titles' }
        ];
    }
}
export const view = {
    propertyName: 'view', modelName: 'View', displayName: 'View', defaultVal: {},
    from: SeriesViewViewModel.from, toJsonObject: SeriesViewViewModel.toJson,
    localizationId: 'DevExpress.XtraReports.UI.XRSparkline.View'
};
