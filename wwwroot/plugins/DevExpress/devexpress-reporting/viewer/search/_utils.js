﻿/**
* DevExpress HTML/JS Reporting (viewer\search\_utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils-native';
export const formatSearchResult = function (value) { return value && (getLocalization('page', 'ASPxReportsStringId.WebDocumentViewer_SearchPageNumberText') + ' ' + (value.pageIndex + 1)); };
