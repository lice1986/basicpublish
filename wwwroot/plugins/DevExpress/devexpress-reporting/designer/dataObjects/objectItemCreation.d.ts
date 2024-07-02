﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\objectItemCreation.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
import { ObjectItem } from './objectStorageItem';
export declare function createNewObjectItem(model: any, dsHelperProvider?: () => DataSourceHelper, serializer?: IModelSerializer): ObjectItem;