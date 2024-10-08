﻿/**
* DevExpress Analytics (serializer\native\serializer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend, isEmptyObject, isPlainObject } from '../_utils';
import { EventPropertyManager } from '../eventManager';
import { serializeDate } from '../_date.utiles';
import { defaultPropertyDeserializatonEngine } from './deserializationEngine';
const xtraNullString = '~Xtra#NULL';
export class NativeModelSerializer {
    constructor(options) {
        this.engineType = 'native';
        this._options = {
            useRefs: true,
            serializeDate: serializeDate
        };
        this._refTable = {};
        this._linkTable = {};
        this._options = extend(this._options, options);
    }
    createObjectByInfo(info) {
        return {
            getInfo: () => { return info || []; },
            events: new EventPropertyManager(),
            onPropertyChanged(args) { },
        };
    }
    linkObjects() {
        Object.keys(this._linkTable).forEach((index) => {
            const val = this._refTable[index];
            if (val) {
                this._linkTable[index].splice(0).forEach(property => property(val));
            }
        });
    }
    wrapPropertyValue(value) {
        return value;
    }
    wrapPropertyArrayValue(value) {
        return value;
    }
    unwrapPropertyValue(value) {
        return value;
    }
    _getModel(model, propertyPath) {
        let currentModel = model;
        propertyPath.forEach((name) => {
            currentModel = currentModel[name];
        });
        return currentModel;
    }
    _collectLinks(model, internalModel, propertyPath, propertyName) {
        const refVal = model[propertyName].slice('#Ref-'.length);
        let value = undefined;
        this._linkTable[refVal] = this._linkTable[refVal] || [];
        this._linkTable[refVal].push((newVal) => value = newVal);
        if (!internalModel._restoreLinks)
            internalModel._restoreLinks = [];
        internalModel._restoreLinks.push((model) => {
            const currentModel = this._getModel(model, propertyPath);
            return {
                setRef: (ref) => {
                    if (ref === -1)
                        delete currentModel[propertyName];
                    else
                        currentModel[propertyName] = '#Ref-' + ref;
                },
                obj: () => value
            };
        });
    }
    _enumRefs(internalModel, propertyPath, propertyName) {
        if (!internalModel._refs)
            internalModel._refs = [];
        internalModel._refs.push((model, ref) => {
            this._getModel(model, propertyPath)[propertyName] = ref;
        });
    }
    _collectLinksAndEnumRefs(model, internalModel = null, propertyPath = []) {
        const start = internalModel === null;
        internalModel = internalModel || model;
        Object.keys(model).forEach((propertyName) => {
            if (model[propertyName] instanceof Object) {
                this._collectLinksAndEnumRefs(model[propertyName], internalModel, [].concat(propertyPath, [propertyName]));
            }
            else if (model[propertyName].indexOf && model[propertyName].indexOf('#Ref-') === 0) {
                this._collectLinks(model, internalModel, propertyPath, propertyName);
            }
            else if (!start && propertyName === '@Ref') {
                this._enumRefs(internalModel, propertyPath, propertyName);
            }
        });
        if (start)
            this.linkObjects();
    }
    setLinks(refs) {
        refs.linkObjTable.forEach(item => {
            const refValue = refs.objects.indexOf(item.obj());
            item.setRef(refValue);
        });
    }
    deserializeProperty(modelPropertyInfo, model) {
        const propName = modelPropertyInfo.modelName;
        if (!propName) {
            return;
        }
        const modelValue = model[propName] !== undefined ? model[propName] : modelPropertyInfo.defaultVal;
        return this.deserializePropertyValue(modelPropertyInfo, modelValue);
    }
    deserializeDefaultValue(modelPropertyInfo) {
        const value = this.deserializePropertyValue(modelPropertyInfo, modelPropertyInfo.defaultVal, false);
        return value || modelPropertyInfo.defaultVal;
    }
    deserializePropertyValue(modelPropertyInfo, modelValue, strict = true) {
        if (typeof modelPropertyInfo === 'string') {
            return this.wrapPropertyValue(modelValue);
        }
        else if (modelPropertyInfo.array) {
            if (modelPropertyInfo.from) {
                return modelPropertyInfo.from(modelValue, this);
            }
            else if (modelPropertyInfo.info) {
                return this.wrapPropertyArrayValue(Object.keys(modelValue || {}).map(propertyName => {
                    const object = this.createObjectByInfo(modelPropertyInfo.info || []);
                    this.deserialize(object, modelValue[propertyName] || {});
                    return object;
                }));
            }
            return;
        }
        else if (modelPropertyInfo.from) {
            return modelPropertyInfo.from(modelValue, this);
        }
        else if (modelPropertyInfo.type) {
            const ctorResult = new modelPropertyInfo.type(modelValue, this, modelPropertyInfo.info);
            if (!ctorResult._model) {
                this.deserialize(ctorResult, modelValue || {}, modelPropertyInfo.info);
            }
            return ctorResult;
        }
        else if (modelPropertyInfo.info) {
            const object = this.createObjectByInfo(modelPropertyInfo.info);
            this.deserialize(object, modelValue || {});
            return object;
        }
        else if (modelPropertyInfo.modelName) {
            return this.wrapPropertyValue(modelValue);
        }
        if (strict) {
            throw new Error("Invalid info '" + JSON.stringify(modelPropertyInfo) + "'");
        }
        return;
    }
    setLinkProperty(viewModel, propertyName, newVal) {
        viewModel[propertyName] = newVal;
        return viewModel[propertyName];
    }
    getLinkProperty(viewModel, propertyName) {
        return viewModel[propertyName];
    }
    setReferencedProperty(viewModel, model, refValue) {
        if (Object.keys(model).some(key => model[key] === xtraNullString))
            return;
        this._refTable[refValue] = viewModel;
    }
    generateProperty(model, propertyName, value) {
        defaultPropertyDeserializatonEngine.generateProperty(model, propertyName, value);
    }
    generateArrayProperty(model, propertyName, value) {
        defaultPropertyDeserializatonEngine.generateArrayProperty(model, propertyName, value);
    }
    deserialize(viewModel, model, serializationsInfo = []) {
        if (!model) {
            return;
        }
        viewModel._model = extend({}, model);
        if (!viewModel['events']) {
            viewModel['events'] = new EventPropertyManager();
        }
        if (!viewModel['getInfo'])
            viewModel['getInfo'] = () => serializationsInfo;
        serializationsInfo = viewModel.getInfo();
        const refValue = model['@Ref'];
        const proto = Object.getPrototypeOf(viewModel);
        serializationsInfo.forEach((modelPropertyInfo) => {
            const propertyName = modelPropertyInfo.propertyName, propName = modelPropertyInfo.modelName;
            if (model[propName] !== undefined) {
                delete viewModel._model[propName];
            }
            let property = undefined;
            if (modelPropertyInfo.link) {
                property = this.wrapPropertyValue(null);
                const modelValue = model[modelPropertyInfo.modelName];
                if (modelValue) {
                    const refVal = modelValue && modelValue.slice('#Ref-'.length);
                    this._linkTable[refVal] = this._linkTable[refVal] || [];
                    const self = this;
                    this._linkTable[refVal].push(function (newVal) {
                        if (arguments.length === 0)
                            return self.getLinkProperty(viewModel, propertyName);
                        else
                            return self.setLinkProperty(viewModel, propertyName, newVal);
                    });
                }
            }
            else {
                property = this.deserializeProperty(modelPropertyInfo, model);
            }
            const descriptor = Object.getOwnPropertyDescriptor(proto, propertyName);
            if (property !== undefined && (!descriptor || !!descriptor.set)) {
                this.generateProperty(viewModel, propertyName, property);
            }
            if (!(propertyName in viewModel) && property === undefined && modelPropertyInfo.array) {
                this.generateArrayProperty(viewModel, propertyName, []);
            }
        });
        if (refValue) {
            this.setReferencedProperty(viewModel, model, refValue);
        }
        this.linkObjects();
    }
    serialize(viewModel, serializationsInfo, refs = null) {
        if (!serializationsInfo && !refs) {
            return this._serialize(viewModel, [], null);
        }
        return this._serialize(viewModel, serializationsInfo || [], refs);
    }
    _isSerializableValue(resultValue) {
        return (isPlainObject(resultValue) && !isEmptyObject(resultValue)) || (Array.isArray(resultValue) && resultValue['length'] > 0) || (!Array.isArray(resultValue) && !isPlainObject(resultValue));
    }
    serializeProperty(modelPropertyInfo, viewModel, serializationsInfo, refs, result) {
        const propertyName = modelPropertyInfo.propertyName;
        let value = this.unwrapPropertyValue('_' + propertyName in viewModel ? viewModel['_' + propertyName] : viewModel[propertyName]), defaultVal = modelPropertyInfo.defaultVal;
        if (modelPropertyInfo.beforeSerialize)
            value = modelPropertyInfo.beforeSerialize(value);
        if (!!modelPropertyInfo.from) {
            defaultVal = this.unwrapPropertyValue(modelPropertyInfo.from(defaultVal, this));
        }
        let resultValue = {};
        if (!modelPropertyInfo.modelName) {
            return;
        }
        if (modelPropertyInfo.alwaysSerialize || ((value !== undefined && value !== null) && ((isPlainObject(value) || !isEmptyObject(value)) || (Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && !isPlainObject(value))) && (value !== defaultVal))) {
            if (modelPropertyInfo.link) {
                refs.linkObjTable.push({
                    obj: () => value,
                    setRef: (index) => {
                        if (index < 0) {
                            delete result[modelPropertyInfo.modelName];
                        }
                        else {
                            result[modelPropertyInfo.modelName] = '#Ref-' + index;
                        }
                    }
                });
                resultValue = undefined;
            }
            else if (modelPropertyInfo.array) {
                resultValue = {};
                let index = 1;
                value.forEach((item) => {
                    const info = modelPropertyInfo.info || null;
                    const item_ = this._serialize(item, info, refs);
                    if (this._isSerializableValue(item_) || modelPropertyInfo.alwaysSerialize) {
                        resultValue['Item' + index] = item_;
                        if (this._options.useRefs) {
                            item_['@Ref'] = (refs.objects.push(item) - 1).toString();
                        }
                        index++;
                    }
                });
            }
            else if (modelPropertyInfo.from) {
                if (value['isEmpty'] && value['isEmpty']()) {
                    resultValue = {};
                }
                else {
                    resultValue = modelPropertyInfo.toJsonObject ? modelPropertyInfo.toJsonObject(value, this, refs) : value.toString();
                }
            }
            else if (modelPropertyInfo.info || value['getInfo']) {
                resultValue = this._serialize(value, modelPropertyInfo.info, refs);
            }
            else if (modelPropertyInfo.modelName) {
                if (value instanceof Date) {
                    resultValue = this._options && this._options.serializeDate(value);
                }
                else {
                    resultValue = value;
                }
            }
            else {
                throw new Error("Invalid info '" + serializationsInfo.stringify() + "'");
            }
            if (modelPropertyInfo.alwaysSerialize || this._isSerializableValue(resultValue)) {
                if (modelPropertyInfo.asRef) {
                    resultValue['@Ref'] = (refs.objects.push(value) - 1).toString();
                }
                result[modelPropertyInfo.modelName] = resultValue;
            }
        }
    }
    _serialize(viewModel, serializationsInfo, refs) {
        const result = extend(true, {}, viewModel._model), isInitial = refs === null;
        refs = refs || { linkObjTable: [], objects: [] };
        if (result._restoreLinks) {
            refs.linkObjTable.push.apply(refs.linkObjTable, result._restoreLinks.map((x) => x(result)));
            delete result._restoreLinks;
        }
        if (result._refs) {
            result._refs.forEach((x) => x(result, (refs.objects.push('0') - 1).toString()));
            delete result._refs;
        }
        serializationsInfo = viewModel.getInfo ? viewModel.getInfo() : serializationsInfo;
        delete result['@Ref'];
        if (viewModel['isEmpty'] && viewModel['isEmpty']())
            return {};
        serializationsInfo.forEach((modelPropertyInfo) => {
            this.serializeProperty(modelPropertyInfo, viewModel, serializationsInfo, refs, result);
        });
        if (isInitial)
            this.setLinks(refs);
        return result;
    }
}
