﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_localizationUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { formatUnicorn } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export function __createLocalizationProperties(target, format = '{0}') {
    return target.getInfo().filter(x => x.localizable && x.modelName).map(x => {
        return new LocalizedProperty(formatUnicorn(format, x.modelName.substr(1)), target['_' + x.propertyName] || target[x.propertyName], x);
    });
}
export class DefaultLocalizationProvider extends Disposable {
    constructor(_model) {
        super();
        this._model = _model;
    }
    dispose() {
        this._localizationInfo = null;
    }
    getLocalizationProperty(propertyName) {
        return this.getLocalizationProperties().filter(x => x.propertyName === propertyName)[0];
    }
    getLocalizationProperties() {
        if (!this._localizationInfo) {
            this._localizationInfo = __createLocalizationProperties(this._model);
        }
        return this._localizationInfo;
    }
    applyLocalization(propertyName, propertyValue) {
        this.getLocalizationProperties().filter(x => x.propertyName === propertyName).forEach((x) => x.applyLocalization(propertyValue));
    }
}
export class TableOfContentLocalizationProvider extends DefaultLocalizationProvider {
    getLocalizationProperties() {
        if (!this._localizationInfo) {
            this._localizationInfo = [].concat.apply(super.getLocalizationProperties(), [
                __createLocalizationProperties(this._model.levelTitle, 'LevelTitle.{0}')
            ]);
        }
        return [].concat.apply(this._localizationInfo, this._model.levels().map((level, i) => {
            return __createLocalizationProperties(level, formatUnicorn('Levels.{0}.', i) + '{0}');
        }));
    }
}
export class ReportLocalizationProvider extends DefaultLocalizationProvider {
    getLocalizationProperties() {
        if (!this._localizationInfo) {
            this._localizationInfo = [].concat.apply(super.getLocalizationProperties(), this._model.watermarks().map((watermark) => __createLocalizationProperties(watermark, formatUnicorn('Watermarks.{0}.', ko.unwrap(watermark.watermarkId)) + '{0}')));
        }
        return this._localizationInfo;
    }
}
export class ChartLocalizationProvider extends DefaultLocalizationProvider {
    getLocalizationProperties() {
        const chartComponents = this._model.allChartComponents();
        return [].concat.apply(super.getLocalizationProperties(), chartComponents.map(componentInfo => {
            return __createLocalizationProperties(componentInfo.component, componentInfo.path + '.{0}');
        }));
    }
}
export class LocalizedProperty {
    constructor(propertyName, value, info) {
        this.propertyName = propertyName;
        this.value = value;
        this.info = info;
    }
    applyLocalization(value) {
        const newValue = this.info.from ? ko.unwrap(this.info.from(value)) : value;
        const componentValueAsValue = ko.unwrap(this.value);
        if (this.value.getInfo) {
            const info = componentValueAsValue.getInfo();
            info.forEach(info => {
                componentValueAsValue[info.propertyName] && componentValueAsValue[info.propertyName](newValue[info.propertyName]());
            });
        }
        else {
            this.value(newValue);
        }
    }
}