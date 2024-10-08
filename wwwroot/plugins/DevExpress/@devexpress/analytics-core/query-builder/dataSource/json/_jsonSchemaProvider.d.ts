﻿/**
* DevExpress Analytics (query-builder\dataSource\json\_jsonSchemaProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { RequestWrapper } from '../../utils/requestwrapper';
import { JsonDataSource } from './jsonDataSource';
import { IParameter } from '../../wizard/internal/_utils';
import { JsonSchemaRootNode } from './jsonSchemaNode';
export declare let getJsonSchemaCallback: (requestWrapper: RequestWrapper, jsonDataSource: JsonDataSource, parameters?: IParameter[]) => JQueryPromise<JsonSchemaRootNode>;
export declare function _setGetJsonSchemaCallback(func: any): void;
export declare function _resetGetJsonSchemaCallback(): void;
