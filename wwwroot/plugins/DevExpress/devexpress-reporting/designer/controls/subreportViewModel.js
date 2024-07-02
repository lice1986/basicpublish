﻿/**
* DevExpress HTML/JS Reporting (designer\controls\subreportViewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { reportSerializationInfo } from './metadata/xrReport';
import { ReportViewModel } from './xrReport';
export class SubreportViewModel extends ReportViewModel {
    constructor(model, serializer) {
        super(model, serializer);
        this.isAllSufficient = false;
        this.objectStorageIsEmpty = ko.observable(false);
        if (this.objectStorage().length === 0) {
            this.objectStorageIsEmpty(true);
            delete this._model['ObjectStorage'];
            delete this._model['ComponentStorage'];
        }
    }
    static from(model, serializer) {
        return model ? new SubreportViewModel(model, serializer) : null;
    }
    static toJson(value, serializer, refs) {
        value.parameterHelper.clearLayoutItems();
        return serializer.serialize(value, reportSerializationInfo, refs);
    }
    _initializeBands() {
        if (this.bands().length === 0) {
            this.createChild({ '@ControlType': 'DetailBand', '@Name': 'Detail1' });
        }
    }
    getInfo() {
        if (!this.isAllSufficient) {
            let newSerializationInfo = extend(true, [], super.getInfo());
            if (this.objectStorageIsEmpty && this.objectStorageIsEmpty()) {
                newSerializationInfo = newSerializationInfo.reduce((finalSerializationInfo, currentInfo, index) => {
                    if (currentInfo.propertyName === '_objectStorage' || currentInfo.propertyName === '_componentStorage')
                        return finalSerializationInfo;
                    return [...finalSerializationInfo, currentInfo];
                }, []);
            }
            return newSerializationInfo;
        }
        return super.getInfo();
    }
    serialize() {
        this.isAllSufficient = true;
        const result = super.serialize();
        this.isAllSufficient = false;
        return result;
    }
}
SubreportViewModel.defaultReport = {
    '@ControlType': 'DevExpress.XtraReports.UI.XtraReport',
    '@PageWidth': '850',
    '@PageHeight': '1100',
    '@Version': '23.2',
    '@Font': 'Arial,9pt',
    '@Dpi': '100',
    'Bands': {
        'Item1': {
            '@ControlType': 'TopMarginBand',
            '@HeightF': '100'
        },
        'Item2': {
            '@ControlType': 'DetailBand',
            '@HeightF': '100'
        },
        'Item3': {
            '@ControlType': 'BottomMarginBand',
            '@HeightF': '100'
        }
    }
};