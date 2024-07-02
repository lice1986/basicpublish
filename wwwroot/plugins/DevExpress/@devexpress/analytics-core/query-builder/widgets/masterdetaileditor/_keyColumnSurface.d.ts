﻿/**
* DevExpress Analytics (query-builder\widgets\masterdetaileditor\_keyColumnSurface.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare class KeyColumnSurface {
    private _isMaster;
    constructor(column: ko.Observable<string> | ko.Computed<string>, queryName: string, _isMaster?: boolean);
    getTitle: () => string;
    isSelected: ko.Observable<boolean> | ko.Computed<boolean>;
    _setColumn: (resultColumn: {
        name: string;
    }) => void;
    queryName: string;
    column: ko.Observable<string> | ko.Computed<string>;
    selectColumnText: () => string;
}
