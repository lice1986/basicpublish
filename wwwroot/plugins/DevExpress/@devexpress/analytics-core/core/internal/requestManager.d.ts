﻿/**
* DevExpress Analytics (core\internal\requestManager.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IAjaxSetup } from './_ajaxSetup';
import { IFetchSetup } from './_fetchSetup';
import { IRequestManager, IRequestManagerSettings } from './_requestManager';
interface IRequestManagerSetup {
    ajaxSetup?: IAjaxSetup;
    fetchSetup?: IFetchSetup;
}
export declare const requestManager: {
    getInstance: (requestManagerSetup?: IRequestManagerSetup) => IRequestManager<JQueryAjaxSettings | IRequestManagerSettings>;
    _initialize: (requestManagerSetup?: IRequestManagerSetup) => void;
    initialize: (requestManagerInstance?: IRequestManager<JQueryAjaxSettings | IRequestManagerSettings>) => void;
};
export declare function _isFetchConfigured(): boolean;
export {};
