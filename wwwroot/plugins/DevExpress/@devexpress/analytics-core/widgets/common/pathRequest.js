﻿/**
* DevExpress Analytics (widgets\common\pathRequest.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export class PathRequest {
    constructor(fullPath, pathParts = []) {
        this.pathParts = pathParts;
        this.path = '';
        this.fullPath = fullPath;
        if (fullPath) {
            if (fullPath.indexOf('.') !== -1) {
                const pathComponents = fullPath.split('.');
                this.id = this.ref = pathComponents[0];
                pathComponents.splice(0, 1);
                this.path = pathComponents.join('.');
            }
            else {
                this.id = this.ref = fullPath;
            }
        }
    }
}
