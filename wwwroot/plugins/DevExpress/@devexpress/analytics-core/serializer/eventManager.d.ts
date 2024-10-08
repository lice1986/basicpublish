﻿/**
* DevExpress Analytics (serializer\eventManager.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PropertyChangedEvents } from './propertyChangedEvents';
import { Disposable } from './disposable';
export declare class EventManager<Sender, EventType> extends Disposable {
    dispose(): void;
    private _handlers;
    call<K extends keyof EventType>(type: K, args?: EventType[K]): void;
    addHandler<K extends keyof EventType>(type: K, listener: (this: Sender, ev: EventType[K]) => any): void;
    removeHandler<K extends keyof EventType>(type: K, listener: (this: Sender, ev: EventType[K]) => any): void;
    on<K extends keyof EventType>(type: K, listener: (this: Sender, ev: EventType[K]) => any): () => void;
}
export declare class EventPropertyManager<Sender> extends EventManager<Sender, PropertyChangedEvents> {
    call<K extends keyof PropertyChangedEvents>(type: K, _args?: PropertyChangedEvents[K]): void;
}
