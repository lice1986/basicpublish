﻿/**
* DevExpress Analytics (widgets\_searchHighlighting.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Observable, Computed } from 'knockout';
import { ISearchOptions } from '../property-grid/widgets/internal/_utils';
import { Disposable } from '../serializer/disposable';
export interface ISearchHighlightOptions {
    text: string | Observable<string>;
    textToSearch: string | Observable<string> | Computed<string>;
    searchOptions?: ISearchOptions;
}
export declare class HighlightEngine extends Disposable {
    private _$spanProtect;
    private _$spanSearch;
    private _options;
    private _update;
    content: string;
    update(options: ISearchHighlightOptions): void;
    private _getHighlightContent;
    constructor(options: ISearchHighlightOptions);
}
