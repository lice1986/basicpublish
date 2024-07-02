﻿/**
* DevExpress Analytics (core\internal\dx-versions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as devextremeVersion from 'devextreme/core/version';
import { version as clientVersions } from '../../analytics-version';
import { dxtTemplate } from './dxtTemplate';
import dxtConfig from 'devextreme/core/config';
export const dxversions = {
    analytics: clientVersions,
    devextreme: devextremeVersion.version || devextremeVersion
};
if (dxtTemplate()) {
    dxtConfig(dxtTemplate());
}