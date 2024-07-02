﻿/**
* DevExpress HTML/JS Reporting (bundle\designer-bundle.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _addDesignerToBundle } from './_add-designer-to-bundle';
import { _addRichToBundle } from './_add-rich-edit-to-bundle';
const DevExpress = window.DevExpress || {};
_addDesignerToBundle(DevExpress);
_addRichToBundle(DevExpress);
export default DevExpress['Reporting'];
