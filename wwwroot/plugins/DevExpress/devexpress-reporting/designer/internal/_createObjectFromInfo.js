﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_createObjectFromInfo.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function createObjectFromInfo(control, serializationsInfo) {
    let newObj = undefined;
    const newObjInfo = [];
    serializationsInfo.forEach(info => {
        if (control[info.propertyName]) {
            if (newObj === undefined)
                newObj = {};
            newObj[info.propertyName] = control[info.propertyName];
            newObjInfo.push(info);
        }
    });
    if (!!newObj) {
        newObj['getInfo'] = () => { return newObjInfo; };
    }
    return newObj;
}
export function findFirstParentWithPropertyName(control, propertyName) {
    const parent = control.parentModel && control.parentModel();
    if (parent)
        return parent[propertyName] ? parent : findFirstParentWithPropertyName(parent, propertyName);
    else
        return control.root;
}
