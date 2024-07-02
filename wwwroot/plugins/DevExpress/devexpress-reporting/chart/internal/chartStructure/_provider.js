﻿/**
* DevExpress HTML/JS Reporting (chart\internal\chartStructure\_provider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectStructureProvider } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { SecondaryAxisViewModel } from '../../components/axis/_secondaryAxisViewModel';
import { SeriesViewModel } from '../../components/series/_series';
export class ChartStructureObjectProvider extends ObjectStructureProvider {
    getClassName(instance) {
        if (instance instanceof SeriesViewModel) {
            return 'SeriesViewModel';
        }
        else if (instance instanceof SecondaryAxisViewModel) {
            return 'SecondaryAxisViewModel';
        }
        else {
            return super.getClassName(instance);
        }
    }
    createArrayItem(currentTarget, result, propertyName) {
        super.createArrayItem(currentTarget, result, propertyName);
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            if (item.specifics === 'SeriesViewModel') {
                const unwrapArrayValue = ko.unwrap(currentTarget[i]);
                result[i].dragData = { noDragable: false };
                result[i]['data'] = unwrapArrayValue;
            }
        }
    }
    constructor(target, displayName, localizationId) {
        super(target, displayName, localizationId);
    }
}