﻿/**
* DevExpress Analytics (query-builder\widgets\_undoEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Editor } from '../../property-grid/widgets/editor';
import { ISerializationInfo } from '../../serializer/serializationInfo';
import { UndoEngine } from '../../undo-engine/undoengine';
export declare class UndoEditor extends Editor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    generateValue(undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>): ko.Observable<any> | ko.Computed<any>;
    undoValue: ko.Observable | ko.Computed;
}
