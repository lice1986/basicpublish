﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_renameDataSourceStrategy.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export class RenameDataSourceStrategy {
    constructor(dsHelper, _afterRenameCallBack) {
        this.dsHelper = dsHelper;
        this._afterRenameCallBack = _afterRenameCallBack;
        this._rename = (dataSourceInfo, name) => {
            dataSourceInfo.name = name;
            if (dataSourceInfo.data.name) {
                dataSourceInfo.data.name(name);
            }
            this._afterRenameCallBack && this._afterRenameCallBack();
        };
    }
    validateName(nameCandidate) {
        return nameCandidate && !nameCandidate.match(/(?!\_)[\W]+/);
    }
    validateUnique(nameCandidate, currentName) {
        return nameCandidate && (nameCandidate === currentName || this.dsHelper().usedDataSources().map(dataSource => dataSource.name).indexOf(nameCandidate) === -1);
    }
    tryRename(nameCandidate, currentItemData) {
        const currentDs = this.dsHelper && this.dsHelper().findDataSourceInfo(currentItemData);
        if (!currentDs)
            return false;
        this._rename(currentDs, nameCandidate);
        return true;
    }
}
