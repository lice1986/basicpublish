﻿/**
* DevExpress Analytics (undo-engine\undoengine.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../serializer/disposable';
import { checkModelReady, guid } from './_utils';
import { propertiesVisitor } from './_propertiesVisitor';
export class _LatestChangeSet {
    constructor(changes, position) {
        this.changes = changes;
        this.position = position;
    }
    static Empty() {
        return new _LatestChangeSet(null, null);
    }
    equal(changeSet) {
        return this.changes === changeSet.changes && this.position === changeSet.position;
    }
}
const activeEngines = [];
export class UndoEngine extends Disposable {
    constructor(target, _ignoredProperties = ['surface'], _getInfoMethodName, _alwaysSubscribeProperties = []) {
        super();
        this._ignoredProperties = _ignoredProperties;
        this._getInfoMethodName = _getInfoMethodName;
        this._alwaysSubscribeProperties = _alwaysSubscribeProperties;
        this._groupObservers = [];
        this._groupPosition = -1;
        this._observers = [];
        this._subscriptions = [];
        this._visited = [];
        this._position = ko.observable(-1);
        this._lockedPosition = ko.observable(-1);
        this._inUndoRedo = false;
        this._currentEngineName = UndoEngine._disposeUndoEngineSubscriptionsName + guid();
        this.redoEnabled = ko.observable(false);
        this.undoEnabled = ko.observable(false);
        this.isIngroup = -1;
        this.isDirty = ko.computed({
            read: () => { return this._position() !== this._lockedPosition(); },
            write: (value) => { value ? this._lockedPosition('forcibly marked as dirty') : this._lockedPosition(this._position()); }
        });
        activeEngines.push(this._currentEngineName);
        this._model = ko.unwrap(target);
        if (this._getInfoMethodName) {
            if (ko.isSubscribable(target)) {
                this._targetSubscription = this.subscribeProperty(target, true);
            }
            else {
                this._createDisposeFunction(target);
            }
        }
        else {
            let innerSubscriptions = this.subscribe(this._model);
            if (ko.isSubscribable(target)) {
                let prevVal = target();
                this._targetSubscription = target.subscribe((newTargetValue) => {
                    this._removePropertiesSubscriptions();
                    if (!this._inUndoRedo) {
                        this.properyChanged({
                            observable: target, propertyChanged: { oldVal: prevVal, val: newTargetValue }
                        });
                        prevVal = newTargetValue;
                    }
                    this._cleanSubscribtions(innerSubscriptions);
                    this._model = newTargetValue;
                    innerSubscriptions = this.subscribe(this._model);
                });
            }
        }
        this._disposables.push(this.isDirty);
    }
    static tryGetUndoEngine(object) {
        let undo = null;
        activeEngines.some(x => {
            undo = object[x] && object[x].instance;
            return !!undo;
        });
        return undo;
    }
    get _modelReady() {
        return checkModelReady(this._model);
    }
    _disposeObserver(record) {
        if (record.propertyChanged) {
            const value = record.propertyChanged.val;
            if (value && !value[this._currentEngineName]) {
                value.dispose && value.dispose();
            }
        }
        else if (record.arrayChanges) {
            record.arrayChanges.forEach(change => {
                if (change.status === 'added') {
                    const value = change.value;
                    if (value && !value[this._currentEngineName])
                        value.dispose && value.dispose();
                }
            });
        }
    }
    _disposeRemovedRecord(record) {
        if (record.arrayChanges) {
            record.arrayChanges.forEach(change => {
                var _a, _b;
                if (change.status === 'deleted') {
                    ((_a = change.value) === null || _a === void 0 ? void 0 : _a.dispose) && ((_b = change.value) === null || _b === void 0 ? void 0 : _b.dispose());
                }
            });
        }
    }
    _disposeObservers(removedItems, disposeRemovedRecords) {
        const disposalFunction = (disposeRemovedRecords ? this._disposeRemovedRecord : this._disposeObserver).bind(this);
        removedItems.forEach((changeSet) => {
            if (Array.isArray(changeSet)) {
                changeSet.reverse().forEach(item => disposalFunction(item));
            }
            else {
                disposalFunction(changeSet);
            }
        });
    }
    properyChanged(undoRecord) {
        if (this._inUndoRedo) {
            return;
        }
        const currentPosition = this._position() + 1;
        if (currentPosition < this._observers.length) {
            const removedItems = this._observers.splice(currentPosition, this._observers.length);
            this._disposeObservers(removedItems, false);
        }
        this._observers.push(undoRecord);
        this._position(currentPosition);
        this.undoEnabled(true);
        this.redoEnabled(false);
    }
    visitProperties(target, info) {
        const subscribtions = [];
        if (target && info) {
            for (let i = 0; i < info.length; i++) {
                const alwaysSubscribeProperty = this._alwaysSubscribeProperties.some(x => x === info[i].propertyName);
                if (info[i].modelName || info[i].editor || info[i].info || alwaysSubscribeProperty) {
                    const realPropertyName = alwaysSubscribeProperty ? info[i].propertyName : this.validatePropertyName(target, info[i].propertyName);
                    if (realPropertyName) {
                        if (!ko.isComputed(target[realPropertyName])) {
                            if (!ko.isObservable(target[realPropertyName])) {
                                subscribtions.push.apply([], this._createDisposeFunction(target[realPropertyName], info[i].info));
                            }
                            else {
                                subscribtions.push(this.subscribeProperty(target[realPropertyName], !info[i].link));
                            }
                        }
                    }
                }
            }
        }
        return subscribtions;
    }
    undoChangeSet(changeSet) {
        if (changeSet.propertyChanged) {
            changeSet.observable(changeSet.propertyChanged.oldVal);
        }
        else {
            const array = changeSet.observable();
            for (let i = 0; i < changeSet.arrayChanges.length; i++) {
                if (changeSet.arrayChanges[i].status === 'added') {
                    const addedIndex = array.indexOf(changeSet.arrayChanges[i].value);
                    if (addedIndex != -1)
                        array.splice(addedIndex, 1);
                }
            }
            for (let i = 0; i < changeSet.arrayChanges.length; i++) {
                if (changeSet.arrayChanges[i].status === 'deleted') {
                    array.splice(changeSet.arrayChanges[i].index, 0, changeSet.arrayChanges[i].value);
                }
            }
            if (ko.isObservable(changeSet.observable)) {
                changeSet.observable.valueHasMutated();
            }
        }
    }
    redoChangeSet(changeSet) {
        if (changeSet.propertyChanged) {
            changeSet.observable(changeSet.propertyChanged.val);
        }
        else {
            const array = changeSet.observable();
            for (let i = 0; i < changeSet.arrayChanges.length; i++) {
                if (changeSet.arrayChanges[i].status === 'deleted') {
                    array.splice(array.indexOf(changeSet.arrayChanges[i].value), 1);
                }
            }
            for (let i = 0; i < changeSet.arrayChanges.length; i++) {
                if (changeSet.arrayChanges[i].status === 'added') {
                    array.splice(changeSet.arrayChanges[i].index, 0, changeSet.arrayChanges[i].value);
                }
            }
            if (ko.isObservable(changeSet.observable)) {
                changeSet.observable.valueHasMutated();
            }
        }
    }
    _disposeChilds(target, info) {
        if (target && info) {
            for (let i = 0; i < info.length; i++) {
                if (info[i].modelName || info[i].editor || info[i].info) {
                    const propertyName = info[i].propertyName;
                    if (propertyName.indexOf('_') !== 0) {
                        let realPropertyName = propertyName;
                        if (ko.isWritableObservable(target['_' + propertyName])) {
                            realPropertyName = '_' + realPropertyName;
                        }
                        if (!ko.isComputed(target[realPropertyName])) {
                            const val = ko.unwrap(target[realPropertyName]);
                            if (!!val && typeof val === 'object') {
                                if (!info[i].link) {
                                    this._callDisposeFunction(val);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    _createDisposeFunction(val, info) {
        let subscriptions = [];
        if (val && typeof val === 'object') {
            const objectInfo = info || (val[this._getInfoMethodName] && val[this._getInfoMethodName]());
            if (!!objectInfo) {
                if (val[this._currentEngineName]) {
                    val[this._currentEngineName].inc++;
                }
                else {
                    val[this._currentEngineName] = { inc: 1, instance: this };
                    subscriptions = this.subscribe(val, objectInfo);
                    val[this._currentEngineName]['func'] = () => {
                        val[this._currentEngineName].inc--;
                        this._disposeChilds(val, objectInfo);
                        if (val[this._currentEngineName].inc === 0) {
                            this._cleanSubscribtions(subscriptions);
                            delete val[this._currentEngineName];
                        }
                    };
                }
            }
        }
        return subscriptions;
    }
    _callDisposeFunction(val) {
        if (val) {
            if (Array.isArray(val)) {
                for (let i = 0; i < val.length; i++) {
                    val[i][this._currentEngineName] && val[i][this._currentEngineName].func();
                }
            }
            else {
                val[this._currentEngineName] && val[this._currentEngineName].func();
            }
        }
    }
    _cleanSubscribtions(subscribtionArray) {
        if (subscribtionArray) {
            if (subscribtionArray.length) {
                for (let i = 0; i < subscribtionArray.length; i++) {
                    this._cleanSubscribtions(subscribtionArray[i]);
                }
            }
            else {
                subscribtionArray.dispose && subscribtionArray.dispose();
            }
        }
    }
    validatePropertyName(target, propertyName) {
        if ((!this._ignoredProperties || (this._ignoredProperties && this._ignoredProperties.every(x => x !== propertyName))) && propertyName[0] !== '_') {
            if (ko.isWritableObservable(target['_' + propertyName])) {
                return '_' + propertyName;
            }
            return propertyName;
        }
        return null;
    }
    subscribeProperty(property, subscribeChilds) {
        if (ko.isObservable(property)) {
            let prevVal = property();
            if (Array.isArray(prevVal)) {
                for (let i = 0; i < property().length; i++) {
                    this._createDisposeFunction(property()[i]);
                }
                return property.subscribe((args) => {
                    if (this._modelReady) {
                        const addedItems = args.filter(x => x.status === 'added');
                        const removedItems = args.filter(x => x.status === 'deleted');
                        for (let i = 0; i < removedItems.length; i++) {
                            this._callDisposeFunction(removedItems[i].value);
                        }
                        for (let i = 0; i < addedItems.length; i++) {
                            this._createDisposeFunction(addedItems[i].value);
                        }
                        this.properyChanged({ observable: property, arrayChanges: args });
                    }
                }, null, 'arrayChange');
            }
            else {
                if (ko.isWritableObservable(property)) {
                    if (subscribeChilds) {
                        this._createDisposeFunction(property());
                    }
                    return property.subscribe((val) => {
                        if (this._modelReady) {
                            if (subscribeChilds) {
                                this._callDisposeFunction(prevVal);
                            }
                            this.properyChanged({
                                observable: property, propertyChanged: { oldVal: prevVal, val: val }
                            });
                            prevVal = val;
                            if (subscribeChilds) {
                                this._createDisposeFunction(val);
                            }
                        }
                    });
                }
            }
        }
    }
    subscribeProperties(properties) {
        properties.forEach((property) => {
            if (ko.isObservable(property)) {
                let prevVal = property();
                if (property['push']) {
                    this._subscriptions.push(property.subscribe((args) => {
                        if (this._modelReady) {
                            if (!this._inUndoRedo) {
                                this.properyChanged({ observable: property, arrayChanges: args });
                                this.subscribe(args.map((item) => { return item.value; }));
                            }
                        }
                    }, null, 'arrayChange'));
                }
                else {
                    if (ko.isWritableObservable(property)) {
                        this._subscriptions.push(property.subscribe((val) => {
                            if (this._modelReady) {
                                this.properyChanged({
                                    observable: property, propertyChanged: { oldVal: prevVal, val: val }
                                });
                                prevVal = property();
                            }
                        }));
                    }
                }
            }
        });
    }
    subscribe(target, info) {
        if (this._getInfoMethodName) {
            return this.visitProperties(target, info || (target && target[this._getInfoMethodName] && target[this._getInfoMethodName]()));
        }
        else {
            propertiesVisitor(target, (properties) => { this.subscribeProperties(properties); }, this._visited, this._ignoredProperties);
        }
    }
    getCurrentChangeSet() {
        return new _LatestChangeSet(this._observers[this._position()], this._position());
    }
    _removePropertiesSubscriptions() {
        this._subscriptions.forEach(subscription => subscription.dispose());
        this._subscriptions = [];
        this._visited = [];
    }
    dispose() {
        super.dispose();
        this._disposeObservers(this._observers.splice(0, this._observers.length), true);
        this.removeTargetSubscription();
        let position = 0;
        activeEngines.some((x, index) => {
            if (x === this._currentEngineName) {
                position = index;
                return true;
            }
            return false;
        });
        activeEngines.splice(position, 1);
    }
    removeTargetSubscription() {
        this._targetSubscription && this._targetSubscription.dispose();
        this.reset();
    }
    undoAll() {
        if (this.undoEnabled()) {
            this.undo();
            this.undoAll();
        }
    }
    reset() {
        this._removePropertiesSubscriptions();
        this.clearHistory();
    }
    clearHistory() {
        this._groupObservers = [];
        this._observers = [];
        this.redoEnabled(false);
        this.undoEnabled(false);
        this._inUndoRedo = false;
        this._groupPosition = -1;
        this._position(-1);
        this._lockedPosition(this._position());
    }
    undo(removeNode = false) {
        try {
            this._inUndoRedo = true;
            if (this.undoEnabled()) {
                const changeSet = this._observers[this._position()];
                if (changeSet) {
                    if (Array.isArray(changeSet)) {
                        changeSet.reverse().forEach(item => this.undoChangeSet(item));
                    }
                    else {
                        this.undoChangeSet(changeSet);
                    }
                    if (removeNode) {
                        this._observers.splice(this._position(), 1);
                    }
                    this._position(this._position() - 1);
                    this.undoEnabled(this._observers.length !== 0 && this._position() >= 0);
                    this.redoEnabled(this._position() < this._observers.length - 1);
                }
            }
        }
        finally {
            this._inUndoRedo = false;
        }
    }
    redo() {
        try {
            this._inUndoRedo = true;
            if (this.redoEnabled()) {
                const changeSet = this._observers[this._position() + 1];
                if (changeSet) {
                    if (Array.isArray(changeSet)) {
                        changeSet.reverse().forEach(item => this.redoChangeSet(item));
                    }
                    else {
                        this.redoChangeSet(changeSet);
                    }
                    this._position(this._position() + 1);
                    this.undoEnabled(this._observers.length !== 0 && this._position() >= 0);
                    this.redoEnabled(this._position() + 1 < this._observers.length);
                }
            }
        }
        finally {
            this._inUndoRedo = false;
        }
    }
    _hasSessionChanges() {
        return this.isIngroup === 0 && this._observers.length > 0;
    }
    start() {
        this.isIngroup++;
        if (this.isIngroup !== 0)
            return;
        this._groupObservers = this._observers;
        this._observers = [];
        this._groupPosition = this._position();
        this._position(-1);
        this._lockedPosition(this._position());
    }
    end() {
        this.isIngroup--;
        if (this.isIngroup !== -1) {
            return;
        }
        if (this._observers.length > 0) {
            this._position(this._groupPosition + 1);
            const removedItems = this._groupObservers.splice(this._position(), this._groupObservers.length - this._position(), this._observers);
            this._disposeObservers(removedItems, false);
        }
        else {
            this._position(this._groupPosition);
        }
        this._observers = this._groupObservers;
    }
}
UndoEngine._disposeUndoEngineSubscriptionsName = '___dispose___UndoEngine___Subscriptions___';
