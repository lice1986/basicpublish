﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrGroupBand.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { deserializeArray } from '@devexpress/analytics-core/analytics-utils';
import { GroupFieldModel } from './groupfield';
import { BandViewModel } from './xrBand';
export class GroupHeaderBand extends BandViewModel {
    constructor(band, parent, serializer) {
        super(band, parent, serializer);
        this.groupFields = deserializeArray(band.GroupFields, (field) => { return new GroupFieldModel(field, serializer); });
        this.sortingSummary.getPath = (propertyName) => {
            if (propertyName === 'fieldName') {
                return this.getPath('groupFields');
            }
        };
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.groupFields);
        this.resetObservableArray(this.groupFields);
    }
}
