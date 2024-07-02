﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParameterHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ParameterHelper } from './parameterHelper';
import { ILookUpValue } from './previewParametersViewModel';
import { PreviewParameter } from './previewParameter';
import { IEnumType } from '../../common/customTypes';
import { IParametersCustomizationHandler } from '../utils/initializer';
import { ISerializationInfo, IDisplayedValue } from '@devexpress/analytics-core/analytics-utils-native';
import { EventPropertyManager } from '@devexpress/analytics-core/analytics-utils-native';
export declare class PreviewParameterHelper extends ParameterHelper {
    callbacks?: IParametersCustomizationHandler;
    mapLookUpValues(type: string, lookUpValues: Array<ILookUpValue>): Array<IDisplayedValue>;
    static fixPropertyName(propertyName: string): string;
    static getPrivatePropertyName(propertyName: string): string;
    createInfo(parameter: PreviewParameter): ISerializationInfo;
    assignValueStore(info: ISerializationInfo & {
        events: EventPropertyManager<ISerializationInfo>;
    }, parameter: PreviewParameter): void;
    isEnumType(parameter: PreviewParameter): boolean;
    getValueConverter(type: string): (val: any) => any;
    getRangeEditor(): {
        header: string;
    };
    constructor(knownEnums?: Array<IEnumType>, callbacks?: IParametersCustomizationHandler);
}
