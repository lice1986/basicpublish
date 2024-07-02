﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\reportUrlEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import DataSource from 'devextreme/data/data_source';
import * as ko from 'knockout';
import { IKeyValuePair } from '../../common/types';
import { INavigateTab } from '../tools/navigation/navigateTab';
export declare class ReportUrlEditor extends Editor {
    private _initUrls;
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    getValues(urls: ko.ObservableArray<IKeyValuePair<string>>, tab: ko.Observable<INavigateTab>): ko.Computed<DataSource>;
    updateUrls(): void;
    urls: ko.Computed<IKeyValuePair<string>[]> | ko.Observable<IKeyValuePair<string>[]>;
    dataSource: ko.Computed<DataSource>;
}