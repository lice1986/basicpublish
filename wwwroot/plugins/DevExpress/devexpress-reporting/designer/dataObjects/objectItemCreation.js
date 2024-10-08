﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\objectItemCreation.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataFederationDataSource } from './dataFederation';
import { ObjectStorageItem } from './objectStorageItem';
import { DynamicListLookUpSettings, StaticListLookUpSettings } from './parameters/lookupSettings';
import { RangeEndParameter, RangeParametersSettings, RangeStartParameter } from './parameters/rangeSettings';
import { UniversalDataSource } from './universalDataSource';
export function createNewObjectItem(model, dsHelperProvider, serializer) {
    const objectType = model['@ObjectType'] || '';
    if (objectType.indexOf('StaticListLookUpSettings') !== -1) {
        return new StaticListLookUpSettings(model, dsHelperProvider, serializer);
    }
    else if (objectType.indexOf('DynamicListLookUpSettings') !== -1) {
        return new DynamicListLookUpSettings(model, dsHelperProvider, serializer);
    }
    else if (objectType.indexOf('RangeParametersSettings') !== -1) {
        return new RangeParametersSettings(model, dsHelperProvider, serializer);
    }
    else if (objectType.indexOf('RangeStartParameter') !== -1) {
        return new RangeStartParameter(model, dsHelperProvider, serializer);
    }
    else if (objectType.indexOf('RangeEndParameter') !== -1) {
        return new RangeEndParameter(model, dsHelperProvider, serializer);
    }
    else if (objectType.indexOf('ReportServer') !== -1 && model['@ObjectType'].indexOf('DataSource') !== -1) {
        return new UniversalDataSource(model, dsHelperProvider, serializer);
    }
    else if (objectType.indexOf('DataFederation') !== -1) {
        return new DataFederationDataSource(model, dsHelperProvider, serializer);
    }
    return new ObjectStorageItem(model, dsHelperProvider, serializer);
}
