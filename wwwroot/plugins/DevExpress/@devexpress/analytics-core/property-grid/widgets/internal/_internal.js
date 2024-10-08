﻿/**
* DevExpress Analytics (property-grid\widgets\internal\_internal.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createGlobalModuleVariableFunc } from '../../../serializer/_internal';
import { getLocalization } from '../../localization/localization_utils';
export const propertiesGridEditorsPaddingLeft = createGlobalModuleVariableFunc(19);
export const defaultFontSerialization = createGlobalModuleVariableFunc('Times New Roman, 9.75pt');
function RegexGuid(guid) {
    return (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(guid)
        || /^\{[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}$/.test(guid)
        || /^\([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\)$/.test(guid)
        || /^[0-9a-fA-F]{32}$/.test(guid));
}
export function validateGuid(guid) {
    return guid && RegexGuid(guid);
}
export function validateNullableGuid(guid) {
    return !guid || RegexGuid(guid);
}
const guidValidationMessage = () => getLocalization('Guid is required and should have a valid format.', 'AnalyticsCoreStringId.GuidIsRequired_Error');
export const guidValidationRules = [{
        type: 'custom',
        validationCallback: (options) => { return validateNullableGuid(options.value); },
        get message() {
            return guidValidationMessage();
        }
    }];
export const guidRequiredValidationRules = [{
        type: 'required',
        get message() {
            return guidValidationMessage();
        }
    }];
const requiredValidationRule = {
    type: 'required',
    get message() {
        return getLocalization('The value cannot be empty', 'AnalyticsCoreStringId.ParametersPanel_DateTimeValueValidationError');
    }
};
export const requiredValidationRules = [requiredValidationRule];
