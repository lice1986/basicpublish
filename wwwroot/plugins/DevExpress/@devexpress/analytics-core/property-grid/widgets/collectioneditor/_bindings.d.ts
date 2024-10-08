﻿/**
* DevExpress Analytics (property-grid\widgets\collectioneditor\_bindings.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ICollectionEditorOptionsBase } from './_editor';
import { IUndoEngine } from '../internal/_utils';
import { ISerializationInfo } from '../../../serializer/serializationInfo';
export interface IKoCollectionEditorOptions extends ICollectionEditorOptionsBase {
    values: ko.Observable<ko.ObservableArray<any>> | ko.Computed<ko.ObservableArray<any>>;
    undoEngine?: ko.Observable<IUndoEngine> | ko.Computed<IUndoEngine>;
    info?: ko.Observable<ISerializationInfo> | ko.Computed<ISerializationInfo>;
}
