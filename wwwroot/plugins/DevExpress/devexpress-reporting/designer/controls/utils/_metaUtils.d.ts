﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_metaUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDisplayedValue, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { ISerializationInfoWithBindings } from '../metadata/properties/metadata';
export declare const createSinglePopularBindingInfos: (propertyName: string) => ISerializationInfoArray;
export declare const createPopularBindingInfos: (options: ISerializationInfoWithBindings) => ISerializationInfoArray;
export declare const createPopularBindingInfo: (options: ISerializationInfoWithBindings, isExpression?: boolean) => ISerializationInfoWithBindings;
export declare function valuesArrayAsEnumWithLocalizationId(info: ISerializationInfo, prefix: string): IDisplayedValue[];
