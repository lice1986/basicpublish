﻿/**
* DevExpress Analytics (query-builder\wizard\internal\objectDataSource\_chooseObjectTypes.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { TreeListController } from '../../../../widgets/treelist/_treelistController';
import { Disposable } from '../../../../serializer/disposable';
import { ObjectType, ObjectCtor } from '../../../dataSource/object/objectSchema';
import { ObjectSchemaProvider } from './_objectSchemaProvider';
import { ITreeListOptions, TreeListItemViewModel } from '../../../../widgets/treelist/_treelistItem';
export declare class ChooseObjectTypesTreelistController extends TreeListController {
    canSelect(value: TreeListItemViewModel): boolean;
}
export declare class ChooseObjectTypes extends Disposable {
    types: ko.ObservableArray<ObjectType>;
    constructor(types: ko.ObservableArray<ObjectType>, provider: ObjectSchemaProvider);
    availableTypesTreelistModel: ITreeListOptions;
    selectedType: ko.Observable<ObjectType>;
    selectedCtor: ko.Observable<ObjectCtor>;
    selectedPath: ko.Observable<string>;
    _scrollViewHeight: string;
}
