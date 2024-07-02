﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_selectStatementQueryControl.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { ISqlQueryViewModel } from '../../dataSource/utils';
import { Disposable } from '../../../serializer/disposable';
import { SelectQuerySqlTextProvider } from './_selectQuerySqlTextProvider';
import { ISelectStatementResponse } from '../../utils/requestwrapper';
export interface ISqlQueryControl {
    isNextDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
    isFinishDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
    setQuery: (query: ISqlQueryViewModel, isInProcess?: ko.Observable<boolean>) => JQueryPromise<any>;
    getQuery: () => ISqlQueryViewModel;
    runQueryBuilderDisabled: boolean;
}
export declare class SelectStatementQueryControl extends Disposable implements ISqlQueryControl {
    private _tableQueryString;
    private _query;
    private _needToCustomizeParameters;
    private _sqlTextProvider;
    constructor(sqlTextProvider: SelectQuerySqlTextProvider, disableCustomSql: any);
    template: string;
    aceOptions: {
        showLineNumbers: boolean;
        showPrintMargin: boolean;
        enableBasicAutocompletion: boolean;
        enableLiveAutocompletion: boolean;
        readOnly: boolean;
        highlightSelectedWord: boolean;
        showGutter: boolean;
        highlightActiveLine: boolean;
    };
    additionalOptions: {
        onChange: (session: any) => void;
        onValueChange: (editor: any) => void;
        changeTimeout: number;
        overrideEditorFocus: boolean;
        setUseWrapMode: boolean;
    };
    aceAvailable: any;
    languageHelper: {
        getLanguageMode: () => string;
        createCompleters: () => any[];
    };
    caption: () => any;
    sqlString: ko.PureComputed<string>;
    setQuery(query: ISqlQueryViewModel, isInProcess?: ko.Observable<boolean>): JQueryPromise<ISelectStatementResponse>;
    getQuery(): ISqlQueryViewModel;
    isNextDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
    isFinishDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
    get runQueryBuilderDisabled(): boolean;
    disableCustomSql: () => boolean;
}