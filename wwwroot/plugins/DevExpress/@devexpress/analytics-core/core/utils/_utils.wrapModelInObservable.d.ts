﻿/**
* DevExpress Analytics (core\utils\_utils.wrapModelInObservable.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare function _wrapModelInObservable<T>(model: T | ko.Observable<T> | ko.Computed<T>): ko.Observable<T>;
