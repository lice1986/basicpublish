﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPageinfo.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlSurface, XRControlViewModel } from './xrControl';
export class XRPageInfoSurface extends XRControlSurface {
    constructor(control, context) {
        super(control, context);
        this.displayText = () => {
            const format = control['textFormatString'] && control.textFormatString();
            if (format)
                return format;
            const value = control['pageInfo'](), info = pageInfoValuesMap.filter(item => item.value === value)[0];
            if (info)
                return info.displayValue;
            return value;
        };
    }
}
export class XRPageInfoViewModel extends XRControlViewModel {
    constructor(model, parent, serializer) {
        super(model, parent, serializer);
        const format = this['_model']['@Format'];
        if (format) {
            if (!this.textFormatString()) {
                this.textFormatString(format);
            }
            delete this['_model']['@Format'];
        }
    }
}
export const pageInfoValuesMap = [
    { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraPrinting.PageInfo.None' },
    { value: 'Number', displayValue: 'Page Number', localizationId: 'DevExpress.XtraPrinting.PageInfo.Number' },
    { value: 'NumberOfTotal', displayValue: "'Current of Total' Page Numbers", localizationId: 'DevExpress.XtraPrinting.PageInfo.NumberOfTotal' },
    { value: 'RomLowNumber', displayValue: 'Page Number (Roman, Lowercase)', localizationId: 'DevExpress.XtraPrinting.PageInfo.RomLowNumber' },
    { value: 'RomHiNumber', displayValue: 'Page Number (Roman, Uppercase)', localizationId: 'DevExpress.XtraPrinting.PageInfo.RomHiNumber' },
    { value: 'DateTime', displayValue: 'Current Date and Time', localizationId: 'DevExpress.XtraPrinting.PageInfo.DateTime' },
    { value: 'UserName', displayValue: 'User Name', localizationId: 'DevExpress.XtraPrinting.PageInfo.UserName' },
    { value: 'Total', displayValue: 'Page Count', localizationId: 'DevExpress.XtraPrinting.PageInfo.Total' }
];
