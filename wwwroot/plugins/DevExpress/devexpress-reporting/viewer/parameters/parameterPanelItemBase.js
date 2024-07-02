﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\parameterPanelItemBase.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { floatValueConverter, getUniqueName, integerValueConverter } from '@devexpress/analytics-core/analytics-internal-native';
import { viewerEditorTemplates } from '../widgets/editorTemplates';
import { PreviewParameter } from './previewParameter';
import { PreviewParameterHelper } from './previewParameterHelper';
import { mutable, subscribableProperty, BaseEmptyModel, updateViewModel, BaseRenderingModel, nativeMultiPlatformEngine } from '@devexpress/analytics-core/analytics-serializer-native';
import { Locker } from '../../common/utils/_locker';
export class ParameterPanelItemBase extends BaseRenderingModel {
    constructor(parameterHelper, layoutInfo) {
        super();
        this.parameterHelper = parameterHelper;
        this.layoutInfo = layoutInfo;
        this._parameters = [];
        this._separatorNames = [];
        this._groupLayoutItems = [];
        this.getInfo = () => this._getInfo;
        this.parameterHelper = parameterHelper || new PreviewParameterHelper();
    }
    onPropertyChanged(args) {
        if (args.propertyName === '_getInfo') {
            const newArgs = Object.assign(Object.assign({}, args), { propertyName: 'getInfo' });
            updateViewModel(this, args);
            this['events'] && this['events'].call('propertyChanged', newArgs);
        }
    }
    _fixGroupPropertyName(name) {
        return getUniqueName(Object.keys(this), name.toLocaleLowerCase().replace(/\s/g, '_'));
    }
    _proceedLayoutInfo(layoutInfo, previewParameters) {
        this._getInfo = [];
        this._groupLayoutItems = [];
        layoutInfo.layoutItems.forEach(itemInfo => {
            if (itemInfo.type === 'Group') {
                const groupItemInfo = itemInfo;
                const name = this._fixGroupPropertyName(groupItemInfo.title);
                const info = {
                    propertyName: name,
                    displayName: groupItemInfo.title,
                    editor: viewerEditorTemplates.groupEditor,
                    editorOptions: {
                        expanded: groupItemInfo.expanded,
                        titleVisible: groupItemInfo.titleVisible,
                        showExpandButton: groupItemInfo.showExpandButton,
                        borderVisible: itemInfo.borderVisible,
                        orientation: groupItemInfo.orientation
                    }
                };
                const item = new ParameterPanelItemBase(this.parameterHelper, groupItemInfo);
                this[name] = item;
                this._groupLayoutItems.push(item);
                const newinfo = this._getInfo.concat(info);
                this._getInfo = newinfo;
            }
            else if (itemInfo.type === 'Parameter') {
                const parameterLayoutInfo = itemInfo;
                const previewParameter = previewParameters.filter(x => x.path === parameterLayoutInfo.path)[0];
                previewParameter && this._add(previewParameter, parameterLayoutInfo);
            }
            else if (itemInfo.type === 'Separator') {
                const generatedName = this._fixGroupPropertyName('Separator');
                this[generatedName] = new BaseEmptyModel();
                this[generatedName].assignProperty('name', generatedName);
                const info = {
                    propertyName: generatedName,
                    editor: viewerEditorTemplates.separatorEditor
                };
                const newinfo = this._getInfo.concat(info);
                this._getInfo = newinfo;
                this._separatorNames.push(generatedName);
            }
        });
    }
    _add(parameter, parameterInfo) {
        if (this._parameters.indexOf(parameter) === -1) {
            this._parameters.push(parameter);
        }
        if (!parameter.visible && !parameter.hasVisibleExpression) {
            return parameter;
        }
        parameter.hasVerticalLabel = parameterInfo.labelOrientation === 'Vertical';
        const privatePropertyName = PreviewParameterHelper.getPrivatePropertyName(parameter.path);
        if (Array.isArray(parameter.value)) {
            this.assignArrayProperty(privatePropertyName, parameter.value);
        }
        else {
            this.assignProperty(privatePropertyName, parameter.value);
        }
        const locker = new Locker();
        this.events.on(`${privatePropertyName}Changed`, (e) => {
            locker.lock(() => parameter.value = this[privatePropertyName]);
        });
        this.addDisposable(parameter.events.on('valueChanged', () => {
            locker.lock(() => this[privatePropertyName] = parameter.value);
        }));
        const parameterPropertyName = PreviewParameterHelper.fixPropertyName(parameter.path);
        if (parameter.isMultiValue || !parameter.isTypesCurrentType(parameter.intTypes.concat(parameter.floatTypes), parameter.type)) {
            this.addDisposable(nativeMultiPlatformEngine.createComputedProperty(this, parameterPropertyName, {
                read: () => parameter.value,
                write: (newVal) => {
                    parameter.value = newVal;
                }
            }, [
                subscribableProperty(parameter, ['value'])
            ]));
        }
        else {
            this.addDisposable(nativeMultiPlatformEngine.createComputedProperty(this, parameterPropertyName, {
                read: () => {
                    let parseValue = parameter.value;
                    if (parseValue === null || parseValue === undefined) {
                        return parseValue;
                    }
                    if (parameter.isTypesCurrentType(parameter.intTypes, parameter.type)) {
                        parseValue = parseInt(parseValue);
                    }
                    else if (parameter.isTypesCurrentType(parameter.floatTypes, parameter.type)) {
                        parseValue = parseFloat(parseValue);
                    }
                    return parseValue;
                },
                write: (newVal) => {
                    let expandValue = newVal;
                    if (parameter.allowNull && (expandValue === '' || expandValue === undefined)) {
                        expandValue = null;
                    }
                    else if (parameter.isTypesCurrentType(parameter.intTypes, parameter.type)) {
                        expandValue = integerValueConverter(expandValue, '0');
                    }
                    else if (parameter.isTypesCurrentType(parameter.floatTypes, parameter.type)) {
                        expandValue = floatValueConverter(expandValue, '0');
                    }
                    parameter.value = expandValue;
                }
            }, [
                subscribableProperty(parameter, ['value'])
            ]));
        }
        const newinfo = this._getInfo.concat(parameter.valueInfo);
        this._getInfo = newinfo;
        return parameter;
    }
    get groupLayoutItems() {
        return this._groupLayoutItems;
    }
    isPropertyDisabled(name) {
        const parameter = this._parameters.filter(parameter => PreviewParameterHelper.getPrivatePropertyName(parameter.path) === name)[0];
        return parameter && !parameter.enabled;
    }
    isPropertyVisible(name) {
        const parameter = this._parameters.filter(parameter => PreviewParameterHelper.getPrivatePropertyName(parameter.path) === name)[0];
        return !parameter || parameter.visible;
    }
    initialize(originalParametersInfo, parameters) {
        this._parameters.forEach((usedParameter) => {
            delete this[PreviewParameterHelper.fixPropertyName(usedParameter.path)];
            delete this[PreviewParameterHelper.getPrivatePropertyName(usedParameter.path)];
        });
        this._parameters = [];
        if (!originalParametersInfo) {
            this.isEmpty = true;
            this._getInfo = [];
            return;
        }
        parameters = parameters || (originalParametersInfo.parameters || []).map((parameter) => {
            const previewParameter = new PreviewParameter(parameter, this.parameterHelper);
            this._parameters.push(previewParameter);
            return previewParameter;
        });
        const layoutInfo = originalParametersInfo.parameterPanelLayout || this.layoutInfo;
        layoutInfo && this._proceedLayoutInfo(layoutInfo, parameters);
        this._groupLayoutItems.forEach(item => item.initialize({}, parameters));
    }
}
__decorate([
    mutable(true)
], ParameterPanelItemBase.prototype, "isEmpty", void 0);
__decorate([
    mutable(() => [])
], ParameterPanelItemBase.prototype, "_getInfo", void 0);