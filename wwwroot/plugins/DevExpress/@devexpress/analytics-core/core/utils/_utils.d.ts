﻿/**
* DevExpress Analytics (core\utils\_utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IAction } from '../../widgets/utils';
import { IDesignerPart } from './_utils.designerPart';
export declare function copyObservables(from: any, to: any): void;
export interface IGroupedItem<T> {
    group: string;
    items: T[];
}
export declare function collectGroupsFromFlatList<T>(list: T[], getGroupId: (item: T) => string): IGroupedItem<T>[];
export declare function compareObjects(a: any, b: any): boolean;
export declare function getFullPath(path: string, dataMember: string): string;
export declare function loadTemplates(): any;
export interface INamedValue {
    displayName: string;
    value: any;
}
export declare function cutRefs(model: any): any;
export declare const DesignerBaseElements: {
    MenuButton: string;
    Toolbar: string;
    Toolbox: string;
    GroupedToolbox: string;
    Surface: string;
    RightPanel: string;
};
export declare function generateDefaultParts(model: any): IDesignerPart[];
export declare function createActionWrappingFunction(wrapperName: string, func: (model: any, originalHandler: (model?: any) => any) => any): (actions: IAction[]) => void;
export declare function localizeNoneString(noneValue: any): any;
