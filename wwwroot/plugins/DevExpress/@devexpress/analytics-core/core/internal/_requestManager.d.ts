﻿/**
* DevExpress Analytics (core\internal\_requestManager.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
export interface IRequestManagerSettings {
    headers?: {
        [key: string]: any;
    };
    data?: {};
    type?: string;
    url?: string;
    abortController?: AbortController;
    beforeSend?: (settings: RequestInit) => void;
}
export interface IRequestManager<T = IRequestManagerSettings> {
    sendRequest: (settings: T) => JQueryPromise<any>;
    useFetch?: boolean;
}
