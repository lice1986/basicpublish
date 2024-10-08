﻿/**
* DevExpress HTML/JS Reporting (common\widgets\_editorTemplates.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getLocalization } from '@devexpress/analytics-core/analytics-utils-native';
import { cultureInfo } from '../utils/_utils';
export const editorTemplates = {
    csvSeparator: { header: 'dx-text',
        extendedOptions: () => ({
            placeholder: (cultureInfo['csvTextSeparator'] || '') + ' ' + getLocalization('(Using System Separator)', 'PreviewStringId.ExportOption_CsvSeparator_UsingSystem')
        })
    }
};
