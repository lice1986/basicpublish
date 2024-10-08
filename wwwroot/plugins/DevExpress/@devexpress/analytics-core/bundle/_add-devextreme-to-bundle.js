﻿/**
* DevExpress Analytics (bundle\_add-devextreme-to-bundle.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import config from 'devextreme/core/config';
import registerComponent from 'devextreme/core/component_registrator';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import * as localization from 'devextreme/localization';
export function _addDevExtremeToBundle(bundle) {
    bundle.config = config;
    bundle.registerComponent = registerComponent;
    bundle.data = {
        ArrayStore: ArrayStore,
        DataSource: DataSource,
        CustomStore: CustomStore
    };
    bundle.localization = localization;
    return bundle;
}
