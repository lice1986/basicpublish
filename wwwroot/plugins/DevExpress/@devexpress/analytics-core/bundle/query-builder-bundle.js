﻿/**
* DevExpress Analytics (bundle\query-builder-bundle.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _addQueryBuilderToBundle } from './_add-querybuilder-to-bundle';
const DevExpress = window.DevExpress || {};
_addQueryBuilderToBundle(DevExpress);
export default {
    QueryBuilder: DevExpress['QueryBuilder'],
    Analytics: DevExpress['Analytics'],
};
