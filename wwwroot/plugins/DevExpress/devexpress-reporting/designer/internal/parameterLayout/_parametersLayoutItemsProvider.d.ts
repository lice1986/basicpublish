﻿/**
* DevExpress HTML/JS Reporting (designer\internal\parameterLayout\_parametersLayoutItemsProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectExplorerProvider } from '@devexpress/analytics-core/analytics-internal';
import { IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IParameterContainer, ParameterPanelLayoutItem } from '../../dataObjects/parameters/layoutItems';
export declare class ParametersLayoutItemsProvider extends ObjectExplorerProvider {
    constructor(report: IParameterContainer, member: ko.Observable<ParameterPanelLayoutItem>);
    createArrayItem(currentTarget: ParameterPanelLayoutItem[], result: IDataMemberInfo[], propertyName?: any): void;
}
