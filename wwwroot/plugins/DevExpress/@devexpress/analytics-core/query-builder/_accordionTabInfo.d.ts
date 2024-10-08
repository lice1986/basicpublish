﻿/**
* DevExpress Analytics (query-builder\_accordionTabInfo.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ObjectProperties } from '../property-grid/propertygrid';
import { ITreeListOptions } from '../widgets/treelist/_treelistItem';
import { GroupObject } from '../core/widgets/propertygrid/_group';
import { QueryViewModel } from './elements/queryModel';
import { UndoEngine } from '../undo-engine/undoengine';
import { ControlProperties } from '../core/widgets/propertygrid/_controlProperties';
import { TabInfo } from '../core/widgets/tabInfo';
export interface ITabModel {
    editableObject: any;
    properties: ObjectProperties;
}
export interface IItemPropertiesTabModel extends ITabModel {
    fieldListModel: {
        treeListOptions: ko.Observable<ITreeListOptions> | ko.Computed<ITreeListOptions>;
    };
    tablesTop: ko.Observable<number> | ko.Computed<number>;
    searchPlaceholder: () => string;
}
export declare class AccordionTabInfo extends TabInfo {
    static _getSelectedItemPropertyName(model: any): string;
    static _createWrappedObject(query: any, commonModel: any, undoEngine: any, showParameters: boolean): {
        selectedItem: any;
        query: {
            editableObject: any;
            properties: ObjectProperties;
        };
        fields: any;
        isPropertyVisible: (propertyName: string) => boolean;
    };
    static _createGroups(editableObject: ko.Observable<any>, showParameters: boolean): GroupObject;
    static _createQBPropertyGrid(query: ko.Observable<QueryViewModel> | ko.Computed<QueryViewModel>, commonModel: IItemPropertiesTabModel, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, showParameters: boolean): ControlProperties;
    private _getGroupByName;
    constructor(query: ko.Observable<QueryViewModel> | ko.Computed<QueryViewModel>, itemPropertiesTabInfoModel: IItemPropertiesTabModel, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, focused: ko.Observable | ko.Computed, showParameters: boolean);
    model: ControlProperties;
}
export declare class SelectedTabInfo extends TabInfo {
    model: ObjectProperties;
    constructor(model: ObjectProperties);
}
