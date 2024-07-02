﻿/**
* DevExpress HTML/JS Reporting (designer\internal\serialization\_serializer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { defaultCulture } from '../../../common/defaultCulture';
import { localizationItems } from '../../controls/metadata/xrReport';
import { cultureInfo } from '../../localization/localizationMetadata';
export class ReportModelSerializer extends ModelSerializer {
    constructor(reportModel, options) {
        super(options);
        this.reportModel = reportModel;
        this.isLocalized = false;
    }
    serialize(viewModel, serializationsInfo, refs) {
        const isInitialize = !viewModel;
        viewModel = viewModel || this.reportModel;
        refs = refs || { linkObjTable: [], objects: [] };
        const model = super.serialize(viewModel, serializationsInfo, refs);
        if (isInitialize) {
            model['@Ref'] = (refs.objects.push(viewModel) - 1).toString();
            this.setLinks(refs);
        }
        return model;
    }
    serializeProperty(modelPropertyInfo, viewModel, serializationsInfo, refs, result) {
        if (!modelPropertyInfo.localizable || !this.reportModel.isLocalized()) {
            return super.serializeProperty(modelPropertyInfo, viewModel, serializationsInfo, refs, result);
        }
    }
    deserialize(viewModel, model, serializationsInfo) {
        if (viewModel.controlType === 'DevExpress.XtraReports.UI.XtraReport') {
            if (!this.reportModel)
                this.reportModel = viewModel;
            const currentLocalizationItems = model[localizationItems.modelName];
            if (currentLocalizationItems) {
                this.isLocalized = true;
                this.localizationJsonObj = Object.keys(currentLocalizationItems).map(key => currentLocalizationItems[key]).filter(a => a[cultureInfo.modelName] === defaultCulture);
            }
        }
        return super.deserialize(viewModel, model, serializationsInfo);
    }
}
