﻿/**
* DevExpress HTML/JS Reporting (bundle\viewer-bundle.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _addViewerToBundle } from './_add-viewer-to-bundle';
import { checkVersions } from './_validator';
const DevExpress = window.DevExpress || {};
_addViewerToBundle(DevExpress);
checkVersions();
export default DevExpress['Reporting'];
