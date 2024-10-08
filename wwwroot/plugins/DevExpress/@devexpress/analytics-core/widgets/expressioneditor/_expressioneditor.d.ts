﻿/**
* DevExpress Analytics (widgets\expressioneditor\_expressioneditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DisposableType } from '../../serializer/disposable';
import { IDisplayExpressionConverter } from '../common/displayNameProvider';
import { IExpressionEditorItem } from './tools/_operatorNames';
import { IExpressionEditorCategory } from './tools/_tools';
export declare const RangeSpecific = "range";
export declare function createExpressionEditorCollectionToolOptions(collectionItems: IExpressionEditorItem[], toolName: string, displayToolName: string, showDescription: boolean): IExpressionEditorCategory;
export declare function wrapExpressionValue(path: ko.Observable<string> | ko.Computed<string>, value: ko.Observable<string> | ko.Computed<string>, converter: IDisplayExpressionConverter, subscriptions: DisposableType[]): ko.Observable<string> | ko.Computed<string>;
