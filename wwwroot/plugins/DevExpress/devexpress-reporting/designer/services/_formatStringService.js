﻿/**
* DevExpress HTML/JS Reporting (designer\services\_formatStringService.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { sendRequest } from '@devexpress/analytics-core/analytics-internal';
import { HandlerUri } from '../utils/settings';
export class FormatStringService {
    static saveCustomPattern(typeString, format) {
        return sendRequest(HandlerUri(), 'formatString', JSON.stringify({ action: 'save', typeString: typeString, customFormatString: format }));
    }
    static removeCustomPattern(typeString, format) {
        return sendRequest(HandlerUri(), 'formatString', JSON.stringify({ action: 'remove', typeString: typeString, customFormatString: format }));
    }
    static updatePreview(value, typeString, format) {
        return sendRequest(HandlerUri(), 'formatStringPreview', JSON.stringify({ value: value, typeString: typeString, formatString: format }));
    }
}
FormatStringService.actions = { updatePreview: FormatStringService.updatePreview, removeCustomPattern: FormatStringService.removeCustomPattern, saveCustomPattern: FormatStringService.saveCustomPattern };
