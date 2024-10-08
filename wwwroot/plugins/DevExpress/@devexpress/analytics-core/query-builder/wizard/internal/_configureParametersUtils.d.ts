﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_configureParametersUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { IDataMemberInfo, IAction } from '../../../widgets/utils';
import { ISqlQueryViewModel } from '../../dataSource/utils';
import { TreeListController } from '../../../widgets/treelist/_treelistController';
import { TreeListItemViewModel } from '../../../widgets/treelist/_treelistItem';
export declare class ParametersTreeListItemBase extends Disposable implements IDataMemberInfo {
    private _displayName;
    private _name;
    constructor(parameter: {
        name: ko.Observable<string> | ko.Computed<string>;
        displayName?: any;
    });
    dataSourceParameter: ko.Observable<{
        name: ko.Observable<string> | ko.Computed<string>;
    }> | ko.Computed<{
        name: ko.Observable<string> | ko.Computed<string>;
    }>;
    editor: import("../../../analytics-utils-native").IEditorInfo;
    isList: boolean;
    contenttemplate: string;
    actionsTemplate: string;
    get name(): string;
    get displayName(): string;
}
export declare class ParametersTreeListItem extends ParametersTreeListItemBase {
    parent: ParametersTreeListRootItem;
    constructor(parameter: {
        name: ko.Observable<string> | ko.Computed<string>;
    }, parent: ParametersTreeListRootItem);
    query(): ISqlQueryViewModel;
}
export declare class ParametersTreeListRootItemBase implements IDataMemberInfo {
    constructor(name: string);
    name: string;
    displayName: string;
    isList: boolean;
    specifics: string;
    parameters: ko.ObservableArray<ParametersTreeListItemBase>;
    visible: ko.Observable<boolean>;
    removeChild(parameter: any): void;
}
export declare class ParametersTreeListRootItem extends ParametersTreeListRootItemBase {
    private _query;
    constructor(query: ISqlQueryViewModel);
    query(): ISqlQueryViewModel;
}
export declare class ParametersTreeListController extends TreeListController {
    private _createNewParameter;
    private _rootItems;
    constructor(rootItems: ParametersTreeListRootItemBase[], createNewParameter: (queryName: string, parameters: {
        name: string;
    }[]) => any);
    hasItems(item: IDataMemberInfo): boolean;
    getActions(treeListItem: TreeListItemViewModel & {
        data: ParametersTreeListRootItem | ParametersTreeListItem;
    }): IAction[];
    canSelect(value: TreeListItemViewModel): boolean;
}
