﻿/**
* DevExpress Analytics (core\binding\_requestHelper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export class RequestHelper {
    static generateUri(host, uri) {
        host = host || '';
        if (host && host[host.length - 1] === '/' && uri && uri[0] === '/') {
            return host + uri.substring(1);
        }
        return host + uri;
    }
}
