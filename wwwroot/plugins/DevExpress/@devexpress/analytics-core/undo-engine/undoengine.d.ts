﻿/**
* DevExpress Analytics (undo-engine\undoengine.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../serializer/disposable';
export declare class _LatestChangeSet {
    changes: any;
    position: number;
    static Empty(): _LatestChangeSet;
    constructor(changes: any, position: number);
    equal(changeSet: _LatestChangeSet): boolean;
}
export interface IModelReady {
    isModelReady: ko.Computed<boolean>;
}
export declare class UndoEngine extends Disposable {
    private _ignoredProperties;
    private _getInfoMethodName?;
    private _alwaysSubscribeProperties;
    static _disposeUndoEngineSubscriptionsName: string;
    static tryGetUndoEngine(object: any): UndoEngine;
    private _groupObservers;
    private _groupPosition;
    private _observers;
    private _subscriptions;
    private _targetSubscription;
    private _visited;
    private _position;
    private _lockedPosition;
    private _inUndoRedo;
    private _model;
    private get _modelReady();
    private _disposeObserver;
    private _disposeRemovedRecord;
    private _disposeObservers;
    private properyChanged;
    private _currentEngineName;
    private visitProperties;
    private undoChangeSet;
    private redoChangeSet;
    private _disposeChilds;
    private _createDisposeFunction;
    private _callDisposeFunction;
    private _cleanSubscribtions;
    protected validatePropertyName(target: any, propertyName: string): string;
    subscribeProperty(property: any, subscribeChilds: any): ko.Subscription;
    subscribeProperties(properties: any): void;
    subscribe(target: any, info?: any): any[];
    getCurrentChangeSet(): _LatestChangeSet;
    private _removePropertiesSubscriptions;
    constructor(target: any, _ignoredProperties?: string[], _getInfoMethodName?: string, _alwaysSubscribeProperties?: any[]);
    redoEnabled: ko.Observable<boolean>;
    undoEnabled: ko.Observable<boolean>;
    dispose(): void;
    removeTargetSubscription(): void;
    undoAll(): void;
    reset(): void;
    clearHistory(): void;
    undo(removeNode?: boolean): void;
    redo(): void;
    _hasSessionChanges(): boolean;
    isIngroup: number;
    isDirty: ko.Computed<boolean>;
    start(): void;
    end(): void;
}