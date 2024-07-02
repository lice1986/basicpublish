﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\_parameterUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { serializeDate } from '@devexpress/analytics-core/analytics-utils';
import { ReportParameterHelper } from '../../helpers/reportParameterHelper';
import { parameterSeparator } from '../parameters/parameterSettings';
export function parameterValueToJsonObject(value) {
    const result = ReportParameterHelper.getSerializationValue(value, serializeDate);
    return (result instanceof Array) ? result.join(parameterSeparator) : result;
}
export function collectAvailableParameters(parameters) {
    return parameters.reduce((result, parameter) => {
        if (parameter.isList)
            result.push.apply(result, parameter.getRangeParameters());
        else
            result.push(parameter);
        return result;
    }, []);
}
