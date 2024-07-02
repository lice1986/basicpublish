﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\components.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ObjectItem } from '../../dataObjects/objectStorageItem';
import { IRenameComponentStrategy } from '../../internal/fieldlist/_renameDataSourceStrategy';
export declare class ComponentsModel extends Disposable {
    renameComponentStrategy: IRenameComponentStrategy;
    getInfo(): ISerializationInfoArray;
    constructor(model: IDataSourceInfo, renameComponentStrategy: IRenameComponentStrategy);
    className: () => string;
    controlType: string;
    name: ko.Observable<string> | ko.Computed<string>;
    data: ObjectItem;
}
