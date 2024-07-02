﻿/**
* DevExpress Analytics (core\utils\_utils.wrapModelInObservable.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { koUtils } from './_koUtils';
import { currentMultiPlatformEngine } from '../../serializer/native/multiplatformEngine';
export function _wrapModelInObservable(model) {
    return koUtils.isSubscribable(model) ? model : currentMultiPlatformEngine.wrap(null);
}
