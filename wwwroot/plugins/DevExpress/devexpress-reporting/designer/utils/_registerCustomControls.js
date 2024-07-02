﻿/**
* DevExpress HTML/JS Reporting (designer\utils\_registerCustomControls.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTypeMapper } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer, colorFromString, colorToString, parseBool } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { CustomControlSerializableModel } from '../controls/customControlViewModel';
import { XRUnknownControlSurface } from '../controls/xrUnknownControl';
import { groups } from '../widgets/groups';
import { controlsFactory } from './settings';
export function registerCustomControls(controls) {
    if (!(controls === null || controls === void 0 ? void 0 : controls.length)) {
        return;
    }
    const factory = controlsFactory();
    const indexes = Object.getOwnPropertyNames(factory.controlsMap)
        .map(prop => { var _a; return (_a = factory.controlsMap[prop]) === null || _a === void 0 ? void 0 : _a.toolboxIndex; })
        .filter(index => index);
    let toolboxIndex = Math.max(...indexes) + 1;
    controls.forEach((control) => {
        if (!factory.getControlInfo(control.className)) {
            const info = getSerializationInfo(control.properties, `${control.className}_`);
            const meta = factory.inheritControl(control.inheritClassName, getMetaForControl(control, info, toolboxIndex++));
            factory.registerControl(control.className, meta);
            info.forEach((prop) => {
                if (groups[prop.group] === undefined) {
                    groups[prop.group] = {
                        info: [prop],
                        displayName: () => prop.group,
                    };
                }
                else {
                    groups[prop.group].info.push(prop);
                }
            });
        }
    });
}
function getMetaForControl(control, info, toolboxIndex) {
    var _a;
    const defaultVal = ((_a = control.initValues) !== null && _a !== void 0 ? _a : []).reduce((result, current) => {
        result[current.Key] = current.Value;
        return result;
    }, {});
    const popularProperties = control.properties.filter(x => x.isFavorite).map(x => x.name);
    return {
        info,
        toolboxIndex,
        group: 'custom',
        surfaceType: XRUnknownControlSurface,
        displayName: control.className,
        isToolboxItem: control.showInToolbox,
        popularProperties,
        defaultVal: Object.assign(Object.assign({}, defaultVal), { '@ControlType': control.fullTypeName }),
    };
}
function getSerializationInfo(properties, namePrefix = '') {
    return properties
        .map(prop => {
        var _a, _b, _c;
        const info = Object.assign({ propertyName: namePrefix + prop.name, modelName: prop.model, displayName: prop.displayName, group: prop.category, defaultVal: prop.defaultValue }, getEditor(prop.editor));
        if (prop.editor === 'enum') {
            const enumValues = (_a = prop === null || prop === void 0 ? void 0 : prop.values) !== null && _a !== void 0 ? _a : [];
            info.valuesArray = enumValues;
        }
        if (prop.editor === 'object') {
            const objectProps = (_b = prop === null || prop === void 0 ? void 0 : prop.properties) !== null && _b !== void 0 ? _b : [];
            info.from = (val, serializer) => CustomControlSerializableModel.from(val, serializer, getSerializationInfo(objectProps));
            info.toJsonObject = CustomControlSerializableModel.toJson;
        }
        if (prop.editor === 'array') {
            const arrayItemProps = (_c = prop === null || prop === void 0 ? void 0 : prop.properties) !== null && _c !== void 0 ? _c : [];
            const propsInfo = getSerializationInfo(arrayItemProps);
            info.template = '#dxrd-commonCollectionItem';
            info.info = propsInfo;
            info.addHandler = () => CustomControlSerializableModel.from({}, new ModelSerializer(), propsInfo);
        }
        return info;
    });
}
function getEditor(name) {
    if (name === 'unknown') {
        return {};
    }
    if (name === 'boolean') {
        return { editor: editorTemplates.getEditor('boolSelect'), from: parseBool };
    }
    if (name === 'rationalNumber') {
        return { editor: editorTemplates.getEditor('numeric') };
    }
    if (name === 'irrationalNumber') {
        return { editor: editorTemplates.getEditor('numeric'), from: parseFloat };
    }
    if (name === 'enum') {
        return { editor: editorTemplates.getEditor('combobox') };
    }
    if (name === 'array') {
        return { editor: editorTemplates.getEditor('commonCollection'), array: true };
    }
    if (name === 'object') {
        return { editor: editorTemplates.getEditor('objecteditor') };
    }
    if (name === 'color') {
        return { editor: editorTemplates.getEditor('customColorEditor'), from: colorFromString, toJsonObject: colorToString };
    }
    if (name === 'link') {
        return { link: true };
    }
    const defaultEditor = editorTypeMapper[name] || editorTemplates.getEditor(name);
    if (defaultEditor) {
        return { editor: defaultEditor };
    }
    return {};
}