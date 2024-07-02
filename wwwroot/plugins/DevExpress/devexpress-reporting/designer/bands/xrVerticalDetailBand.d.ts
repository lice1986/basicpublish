﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrVerticalDetailBand.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { GroupFieldModel } from './groupfield';
import { VerticalBandViewModel } from './xrVerticalBand';
export declare class VerticalDetailBandViewModel extends VerticalBandViewModel {
    dispose(): void;
    preInit(band: any, parent: ElementViewModel, serializer?: ModelSerializer): void;
    sortFields: ko.ObservableArray<GroupFieldModel>;
}