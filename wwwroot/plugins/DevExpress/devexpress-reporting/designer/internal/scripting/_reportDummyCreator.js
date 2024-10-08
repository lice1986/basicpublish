﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_reportDummyCreator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { isEmptyObject, isPlainObject } from '@devexpress/analytics-core/analytics-internal';
export class ReportDummyCreator {
    static _createDummy(report) {
        Object.keys(report).forEach((propertyName) => {
            if (isPlainObject(report[propertyName])) {
                ReportDummyCreator._createDummy(report[propertyName]);
                if (isEmptyObject(report[propertyName]) || (Object.keys(report[propertyName]).length === 1 && report[propertyName]['@Ref']))
                    delete report[propertyName];
            }
            else if (propertyName !== '@Ref' &&
                propertyName.indexOf('Item') !== 0 &&
                propertyName !== '@Name' &&
                propertyName !== 'Name' &&
                propertyName !== '@ControlType' &&
                propertyName !== '@ObjectType' &&
                propertyName !== '@Content' &&
                propertyName !== '@Type' &&
                report[propertyName].toString().indexOf('#Ref-') !== 0) {
                delete report[propertyName];
            }
        });
        return report;
    }
}
