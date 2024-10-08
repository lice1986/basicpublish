﻿/**
* DevExpress Analytics (core\utils\_utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { objectsVisitor } from './_visitors';
export function copyObservables(from, to) {
    Object.keys(from || {}).forEach((name) => {
        if (ko.isObservable(from[name])) {
            to[name](from[name]());
        }
        else if (!$.isFunction(from[name])) {
            copyObservables(from[name], to[name]);
        }
    });
}
export function collectGroupsFromFlatList(list, getGroupId) {
    const temp = {};
    return list.reduce((res, val) => {
        const groupId = getGroupId(val);
        if (groupId) {
            if (temp[groupId])
                temp[groupId].push(val);
            else {
                const group = { group: groupId, items: [val] };
                res.push(group);
                temp[groupId] = group.items;
            }
        }
        return res;
    }, []);
}
export function compareObjects(a, b) {
    let result = a && b && !(a instanceof Array) && !(b instanceof Array);
    result = result && (Object.getOwnPropertyNames(a).length === Object.getOwnPropertyNames(b).length);
    if (result) {
        Object.keys(a || {}).some((name) => {
            if (name.indexOf('_') !== 0 && (typeof a[name] !== 'function' || ko.isObservable(a[name]))) {
                if (ko.isObservable(a[name])) {
                    result = ko.unwrap(a[name]) === ko.unwrap(b[name]);
                }
                else if (a[name] instanceof Array) {
                    if ((b[name] instanceof Array) && a[name].length === b[name].length) {
                        for (let i = 0; i < a[name].length; i++) {
                            result = compareObjects(a[name][i], b[name][i]);
                            if (result === false)
                                break;
                        }
                    }
                    else {
                        result = false;
                    }
                }
                else if (a[name] instanceof Object) {
                    result = compareObjects(a[name], b[name]);
                }
                else {
                    result = a[name] === b[name];
                }
                return !result;
            }
        });
    }
    return result;
}
export function getFullPath(path, dataMember) {
    return path + (dataMember ? '.' + dataMember : '');
}
export function loadTemplates() {
    const promises = $.fn.constructor("script[type='text/html']").map(function (_, script) {
        if (script.src) {
            const deffered = $.Deferred();
            $.get(script.src)
                .done(function (tmpl) {
                script.text = tmpl;
                if (tmpl.indexOf('type="text/html"') !== -1 || tmpl.indexOf("type='text/html'") !== -1) {
                    $.fn.constructor(document.body).append(tmpl);
                }
                deffered.resolve();
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                deffered.reject();
            });
            return deffered.promise();
        }
    });
    return $.when.apply($.when, promises);
}
export function cutRefs(model) {
    objectsVisitor(model, (target) => {
        delete target['@Ref'];
    });
    return model;
}
export const DesignerBaseElements = {
    MenuButton: 'dxrd-menubutton-template-base',
    Toolbar: 'dxrd-toolbar-template-base',
    Toolbox: 'dxrd-toolbox-template-base',
    GroupedToolbox: 'dxrd-grouped-toolbox-template-base',
    Surface: 'dxrd-surface-template-base',
    RightPanel: 'dxrd-right-panel-template-base'
};
export function generateDefaultParts(model) {
    var _a;
    return [
        { id: DesignerBaseElements.MenuButton, templateName: DesignerBaseElements.MenuButton, model: model },
        { id: DesignerBaseElements.Toolbar, templateName: DesignerBaseElements.Toolbar, model: model },
        { id: DesignerBaseElements.Toolbox, templateName: DesignerBaseElements.Toolbox, model: model },
        { id: DesignerBaseElements.Surface, templateName: DesignerBaseElements.Surface, model: model },
        { id: DesignerBaseElements.RightPanel, templateName: DesignerBaseElements.RightPanel, model: model, viewModel: (_a = model.tabPanel) === null || _a === void 0 ? void 0 : _a.getViewModel() }
    ];
}
export function createActionWrappingFunction(wrapperName, func) {
    return (actions) => {
        actions.forEach(action => {
            if (!action['wrappedWith'] || action['wrappedWith'].indexOf(wrapperName) === -1) {
                const oldClickHandler = action.clickAction;
                action.clickAction = (model) => {
                    return func(model, oldClickHandler);
                };
                action['wrappedWith'] = action['wrappedWith'] || [];
                action['wrappedWith'].push(wrapperName);
            }
        });
    };
}
export function localizeNoneString(noneValue) {
    const value = ko.unwrap(noneValue);
    if (value === 'none') {
        return getLocalization('none', 'DataAccessStringId.ParameterListEmpty');
    }
    else if (value === '(none)') {
        return (getLocalization('(none)', 'DxDesignerStringId.None') !== '(none)') ? getLocalization('(none)', 'DxDesignerStringId.None') : ('(' + getLocalization('none', 'DataAccessStringId.ParameterListEmpty') + ')');
    }
    return value;
}
