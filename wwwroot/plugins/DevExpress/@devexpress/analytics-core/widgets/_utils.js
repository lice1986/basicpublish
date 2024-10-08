﻿/**
* DevExpress Analytics (widgets\_utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import themes from 'devextreme/ui/themes';
import * as $ from 'jquery';
import { getLocalization } from '../property-grid/localization/localization_utils';
import { formatUnicorn } from '../property-grid/widgets/internal/_utils';
import { PathRequest } from './common/pathRequest';
import { OperandParameter } from './criteria/operators/parameter';
import { OperandProperty } from './criteria/operators/property';
import { criteriaForEach } from './criteria/utils/criteriaEnumeration';
import { CriteriaOperatorStateMachine } from './criteria/utils/criteriaOperatorStateMachine';
import { ValueEditorHelper } from './internal/_valueEditorHelper';
export function integerValueConverter(val, defaultValue, type) {
    const stringValue = '' + val;
    return ValueEditorHelper.isValid(type, 'integer', stringValue) ? stringValue : defaultValue;
}
export function enumValueConverter(val, defaultValue, valuesList) {
    if (valuesList.filter((enumValue) => val === enumValue.value)[0])
        return val;
    const existingValue = valuesList.filter((enumValue) => val === enumValue.displayName || val === enumValue.name)[0];
    if (existingValue)
        return existingValue.value;
    return defaultValue;
}
export function validateExpression(options) {
    const deferred = $.Deferred();
    try {
        const requests = [];
        const _pushRequest = (path, propertyName, isParameter = false) => {
            const message = formatUnicorn(getLocalization('{0} is not found', 'AnalyticsCoreStringId.WarningMessage_FieldNotFound'), isParameter ? ('?' + propertyName) : ('[' + propertyName + ']'));
            const propertyDeferred = $.Deferred();
            options.fieldListProvider.getItemByPath(new PathRequest(path))
                .done(_ => propertyDeferred.resolve({ success: true }))
                .fail(_ => {
                path === propertyName
                    ? propertyDeferred.resolve({ success: false, message })
                    : options.fieldListProvider.getItemByPath(new PathRequest([path.split('.')[0], propertyName].join('.')))
                        .done(_ => propertyDeferred.resolve({ success: true }))
                        .fail(_ => propertyDeferred.resolve({ success: false, message }));
            });
            requests.push(propertyDeferred);
        };
        const expression = CriteriaOperatorStateMachine.parse(options.expression);
        criteriaForEach(expression, (operator, innerPath) => {
            if (operator instanceof OperandProperty) {
                const propertyName = operator.propertyName.indexOf('^.') === 0 ? operator.propertyName.substring(2) : operator.propertyName;
                let path = propertyName;
                if ((options.rootItems || []).indexOf(propertyName.split('.')[0]) === -1 && innerPath) {
                    path = propertyName ? [innerPath, propertyName].join('.') : innerPath;
                }
                _pushRequest(path, propertyName);
            }
            else if (operator instanceof OperandParameter) {
                const parameterName = operator.parameterName;
                const parameterPath = 'Parameters.' + parameterName;
                _pushRequest(parameterPath, parameterName, true);
            }
        }, options.path);
        $.when.apply($, requests).done((...responses) => deferred.resolve(responses.reduce((result, value) => {
            if (!value.success)
                result = result ? [result, value.message].join('\n') : value.message;
            return result;
        }, '')));
    }
    catch (e) {
        deferred.reject();
    }
    return deferred.promise();
}
export function floatValueConverter(val, defaultValue, type) {
    const stringValue = '' + val;
    return ValueEditorHelper.isValid(type, 'float', stringValue) ? stringValue : defaultValue;
}
function getCurrentTheme() {
    return themes.current();
}
export let isDarkTheme = (theme) => {
    theme = theme || getCurrentTheme();
    return theme && ['dark', 'contrast'].some(x => theme.indexOf(x) !== -1);
};
export function _setIsDarkTheme(callback) {
    isDarkTheme = callback;
}
export function setCursorInFunctionParameter(paramCount, editor, insertValue) {
    if (!paramCount || paramCount <= 0)
        return;
    const cursorPosition = editor.getCursorPosition();
    let lastIndexOpeningBracket = insertValue.lastIndexOf('(');
    if (insertValue.charAt(lastIndexOpeningBracket + 1) === "'")
        lastIndexOpeningBracket++;
    editor.gotoLine(cursorPosition.row + 1, cursorPosition.column - (insertValue.length - 1 - lastIndexOpeningBracket));
}
export function isList(data) {
    return data.isList === true || data.specifics === 'List' || data.specifics === 'ListSource';
}
export function getParentContainer(el, container = '.dx-designer-viewport') {
    return $.fn.constructor(el).closest(container);
}
export function isNullOrEmptyString(str) {
    return str == null || str === '';
}
