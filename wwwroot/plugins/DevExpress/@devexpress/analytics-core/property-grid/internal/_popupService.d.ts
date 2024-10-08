﻿/**
* DevExpress Analytics (property-grid\internal\_popupService.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IModelAction } from '../widgets/internal/_utils';
export declare class PopupService {
    data: ko.Observable<any>;
    title: ko.Observable<string>;
    visible: ko.Observable<boolean>;
    disabled: ko.Observable<boolean>;
    actions: ko.ObservableArray<IModelAction>;
    target: ko.Observable<any>;
}
