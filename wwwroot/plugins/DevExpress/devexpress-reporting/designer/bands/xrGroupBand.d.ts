﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrGroupBand.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ControlType } from '../controls/utils/_controlTypes';
import { GroupFieldModel } from './groupfield';
import { BandViewModel } from './xrBand';
export interface ISortingSummary {
    enabled: boolean;
    Function: string;
    fieldName: string;
    ignoreNullValues: string;
    sortOrder: string;
    getPath: (propertyName: string) => string;
}
export declare class GroupHeaderBand extends BandViewModel {
    dispose(): void;
    constructor(band: any, parent: ElementViewModel<ControlType>, serializer?: ModelSerializer);
    groupFields: ko.ObservableArray<GroupFieldModel>;
    sortingSummary: ISortingSummary;
}
