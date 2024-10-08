﻿/**
* DevExpress Analytics (core\widgets\fieldListEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Editor, IEditorViewModel } from '../../property-grid/widgets/editor';
import { TreeListController } from '../../widgets/treelist/_treelistController';
export interface IFieldListEditorViewModel extends IEditorViewModel {
    path: string;
    getPath: () => string;
    getDataMember: () => string;
    treeListController: TreeListController;
}
export declare class FieldListEditor extends Editor {
    createViewModel(): IEditorViewModel;
    constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    path: ko.PureComputed<any>;
    treeListController: TreeListController;
}
