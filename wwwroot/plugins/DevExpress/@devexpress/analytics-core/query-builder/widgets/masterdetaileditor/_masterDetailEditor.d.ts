﻿/**
* DevExpress Analytics (query-builder\widgets\masterdetaileditor\_masterDetailEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { MasterDetailRelation } from '../../dataSource/sql/masterDetailRelation';
import { ResultSet } from '../../dataSource/resultSet';
import { PopupService } from '../../../property-grid/internal/_popupService';
import { MasterQuerySurface } from './_masterQuerySurface';
import { KeyColumnSurface } from './_keyColumnSurface';
import { PopupEditorBase } from '../../../core/widgets/_popupEditorBase';
export declare class MasterDetailEditor extends PopupEditorBase {
    constructor(relations: ko.ObservableArray<MasterDetailRelation>, resultSet: ResultSet, saveCallBack: () => JQueryPromise<{}>);
    isValid: ko.Observable<boolean>;
    save: () => void;
    loadPanelVisible: ko.Observable<boolean>;
    popupService: PopupService;
    masterQueries: ko.ObservableArray<MasterQuerySurface>;
    createRelation: (target: MasterQuerySurface) => any;
    setColumn: (target: KeyColumnSurface) => any;
    title(): any;
}
