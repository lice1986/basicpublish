﻿/**
* DevExpress Analytics (serializer\utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare function deserializeArray<T>(model: any, creator: (item: any) => any): ko.ObservableArray<T>;
