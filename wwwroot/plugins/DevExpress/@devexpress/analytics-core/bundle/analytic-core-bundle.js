﻿/**
* DevExpress Analytics (bundle\analytic-core-bundle.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _addAnalyticsToBundle } from './_add-analytics-to-bundle';
import { useKoIntegration } from '../analytics-internal';
import { checkIncludedScripts, checkVersions } from './_validator';
checkIncludedScripts();
useKoIntegration();
const DevExpress = window.DevExpress || {};
_addAnalyticsToBundle(DevExpress);
checkVersions();
export default DevExpress['Analytics'];
