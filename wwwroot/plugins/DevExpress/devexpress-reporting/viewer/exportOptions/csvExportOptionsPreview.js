﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\csvExportOptionsPreview.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CsvExportOptions } from '../../common/exportOptions/csvExportOptions';
import { useCustomSeparator } from '../../common/exportOptions/metadata';
export class CsvExportOptionsPreview extends CsvExportOptions {
    isPropertyVisible(name) {
        return name !== useCustomSeparator.propertyName;
    }
    isPropertyDisabled(name) {
        return false;
    }
}
