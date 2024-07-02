﻿/**
* DevExpress Analytics (core\internal\_controlsHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/disposable';
import { getUniqueNameForNamedObjectsArray } from './_getNameHelpers';
import { collectionsVisitor } from '../utils/_visitors';
export class DesignControlsHelper extends Disposable {
    constructor(target, handlers, collectionNames) {
        super();
        this.target = target;
        this.collectionNames = collectionNames;
        this._handlers = [];
        this._setText = false;
        this._visitedCollections = [];
        this._subscriptions = [];
        this.added = (value) => {
            this._setText = true;
            this._collectControls(value);
            this._setText = false;
        };
        this.deleted = (value) => {
            const allControls = this.allControls();
            const index = allControls.indexOf(value);
            allControls.splice(index, 1);
            collectionsVisitor(value, (collection) => {
                collection().forEach((item) => {
                    allControls.splice(allControls.indexOf(item), 1);
                });
            });
            this.allControls.valueHasMutated();
        };
        this.allControls = ko.observableArray();
        let unwrappedTarget = target;
        if (ko.isSubscribable(target)) {
            this._disposables.push(target.subscribe((newTarget) => {
                this._visitedCollections = [];
                for (let i = 0, len = this._subscriptions.length; i < len; i++) {
                    this._subscriptions[i].dispose();
                }
                this._subscriptions = [];
                this.allControls([]);
                if (newTarget) {
                    this._collectControls(newTarget);
                }
            }));
            unwrappedTarget = target.peek();
        }
        this._disposables.push(this.allControls.subscribe((args) => {
            const addedItems = args.filter(x => x.status === 'added');
            for (let i = 0; i < addedItems.length; i++) {
                this._setName(addedItems[i].value);
            }
        }, null, 'arrayChange'));
        unwrappedTarget && this._collectControls(unwrappedTarget);
        this._handlers.push.apply(this._handlers, handlers);
    }
    getNameProperty(model) {
        return model.name;
    }
    getControlByName(name) {
        let control = null;
        this.allControls().some(x => {
            if (ko.unwrap(x.name) == name) {
                control = x;
                return true;
            }
            return false;
        });
        return control;
    }
    _setName(value) {
        const names = this.allControls().map((item) => { return ko.unwrap(this.getNameProperty(item)); });
        if (!this.getNameProperty(value)() || names.filter((x) => { return x === this.getNameProperty(value)(); }).length > 1) {
            const newName = getUniqueNameForNamedObjectsArray(this.allControls(), this._getNamePrefix(value), names);
            this.getNameProperty(value)(newName);
            this._setText && this._setDefaultText(value);
        }
    }
    _setDefaultText(value) {
        const initialText = value.getControlInfo && value.getControlInfo().defaultVal && value.getControlInfo().defaultVal['@Text'];
        if (this._setText && value['text'] && !value['text']() && (initialText === null || initialText === undefined)) {
            value['text'](this.getNameProperty(value)());
        }
    }
    _getNamePrefix(value) {
        const controlType = value.controlType || 'Unknown';
        return controlType.split('.').pop();
    }
    dispose() {
        super.dispose();
        this._subscriptions.forEach(subscription => subscription.dispose());
        this._subscriptions.splice(0);
        this._visitedCollections.splice(0);
        this._handlers.splice(0);
        this.target = null;
        this.allControls([]);
    }
    processCollection(collection) { }
    _collectControls(target) {
        const array = [target];
        collectionsVisitor(target, (collection, owner) => {
            if (this._visitedCollections.indexOf(collection) === -1) {
                this._visitedCollections.push(collection);
                let subscriptionsArray = this._subscriptions;
                if (owner instanceof Disposable) {
                    subscriptionsArray = owner._disposables;
                }
                let subscription = collection.subscribe((args) => {
                    args.forEach((changeSet) => {
                        if (changeSet.moved != undefined)
                            return;
                        this[changeSet.status] && this[changeSet.status](changeSet.value);
                        this._handlers.forEach((handler) => {
                            handler[changeSet.status] && handler[changeSet.status](changeSet.value);
                        });
                    });
                }, null, 'arrayChange');
                subscriptionsArray.push({
                    dispose: () => {
                        subscription.dispose();
                        subscription = null;
                        this._visitedCollections.splice(this._visitedCollections.indexOf(collection), 1);
                    }
                });
            }
            this.processCollection(collection());
            array.push.apply(array, collection());
        }, this.collectionNames);
        this.allControls.push.apply(this.allControls, array);
    }
    getControls(target) {
        const controls = ko.observableArray();
        collectionsVisitor(target, (collection) => {
            controls.push.apply(controls, collection());
        });
        return controls;
    }
}
