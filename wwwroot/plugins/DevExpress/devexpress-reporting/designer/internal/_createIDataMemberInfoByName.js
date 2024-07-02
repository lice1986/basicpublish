﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_createIDataMemberInfoByName.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function createIDataMemberInfoByName(name, specifics = 'list') {
    return {
        displayName: name,
        name: name,
        specifics: specifics,
        isList: specifics === 'list' ? true : false
    };
}
