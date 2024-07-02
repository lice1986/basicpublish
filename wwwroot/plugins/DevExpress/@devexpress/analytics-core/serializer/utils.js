﻿/**
* DevExpress Analytics (serializer\utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { deserializeArray as deserializeArrayNative } from './native/deserialization.utils';
export function deserializeArray(model, creator) {
    return ko.observableArray(deserializeArrayNative(model, creator));
}
