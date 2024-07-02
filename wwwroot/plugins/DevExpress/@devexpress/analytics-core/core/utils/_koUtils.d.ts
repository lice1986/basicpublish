﻿/**
* DevExpress Analytics (core\utils\_koUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Computed, MaybeSubscribable, Subscribable } from 'knockout';
import { IGlobalSubscribableValue } from '../../serializer/_internal';
export declare const koUtils: {
    isSubscribable: (value: MaybeSubscribable) => value is Subscribable<any>;
    isComputed: (value: MaybeSubscribable) => value is Computed<any>;
    unwrap: <T = any>(value: MaybeSubscribable<T> | IGlobalSubscribableValue<T>) => T;
};