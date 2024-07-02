﻿/**
* DevExpress Analytics (query-builder\widgets\filterEditor\_qbFilterEditorHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { FilterEditorHelper } from '../../../widgets/filtereditor/helpers/helper';
import { DataSourceParameter } from '../../dataSource/dataSourceParameter';
export declare class QBFilterEditorHelper extends FilterEditorHelper {
    constructor(parametersMode: string);
    newParameters: ko.ObservableArray<DataSourceParameter>;
}
export declare let QBFilterEditorHelperDefault: typeof QBFilterEditorHelper;
export declare function _setQBFilterEditorHelperDefault(helperType: any): void;
