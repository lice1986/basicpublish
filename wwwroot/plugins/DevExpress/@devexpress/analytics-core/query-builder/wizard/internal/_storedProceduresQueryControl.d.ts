﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_storedProceduresQueryControl.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { ISqlQueryControl } from './_selectStatementQueryControl';
import { StoredProcQuery } from '../../dataSource/sql/storedProcQuery';
import { DBStoredProcedure } from '../../dataSource/dbStoredProcedure';
export declare class StoredProceduresQueryControl extends Disposable implements ISqlQueryControl {
    private _query;
    private _needToProcessParameters;
    private static _availableConvertToParameter;
    private get _selectedProcedure();
    private set _selectedProcedure(value);
    constructor();
    template: string;
    storedProcedures: ko.ObservableArray<DBStoredProcedure>;
    selectedProcedure: ko.ObservableArray<DBStoredProcedure>;
    caption: () => any;
    generateStoredProcedureDisplayName: (procedure: any) => string;
    scrollActiveItem(e: any): void;
    static generateStoredProcedureDisplayName(procedure: DBStoredProcedure): string;
    setQuery(query: StoredProcQuery): JQuery.Promise<any, any, any>;
    getQuery(): StoredProcQuery;
    isNextDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
    isFinishDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
    get runQueryBuilderDisabled(): boolean;
}
