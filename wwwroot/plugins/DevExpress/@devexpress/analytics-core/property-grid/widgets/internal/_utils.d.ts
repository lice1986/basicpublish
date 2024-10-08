﻿/**
* DevExpress Analytics (property-grid\widgets\internal\_utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfoArray } from '../../../serializer/serializationInfo';
export interface ILocalizationInfo {
    text: string;
    localizationId: string;
}
export interface IFileUploadOptions {
    accept?: string;
    type?: string;
    readMode?: string;
}
export declare enum SearchMode {
    contains = 0,
    startWith = 1
}
export interface ISearchOptions {
    globalMatch?: boolean;
    canUseRegex?: boolean;
    caseSensitive?: boolean;
    searchMode?: SearchMode;
}
export interface IFileUploadResult {
    content: string;
    format: string;
}
export declare function _getFileContent(content: string, readMode: string): string;
export declare let uploadFile: (options: IFileUploadOptions) => JQuery.Promise<IFileUploadResult, any, any>;
export declare const _replaceUploadFile: (newFunc: any) => any;
export declare function setUploadFile(newFunc: any): void;
export declare function compareEditorInfo(editor1: any, editor2: any): boolean;
export declare function findMatchesInString(stringWhereSearch: string, searchPattern: string, options?: ISearchOptions): RegExpMatchArray;
export declare function escapeToRegExp(value: String): string;
export declare function stringRemove(value: string, start: number, count?: number): string;
export declare function stringReplace(value: string, start: number, count?: number, newChar?: string): string;
export declare function stringInsert(value: string, pos: number, subStr: string): string;
export declare function formatUnicorn(format: string, ...args: any[]): string;
export interface IModelAction {
    id?: string;
    action: (propertyName: string) => void;
    title: string;
    visible: (propertyName: string) => boolean;
    hint?: ko.Observable<string> | ko.Computed<string>;
    weight?: number;
    itemTemplate?: string;
    innerTemplate?: {
        name: string;
        data: {
            popupVisible: ko.Observable<boolean>;
            value: any;
        };
    };
    items?: IModelAction[];
}
export interface IControlPropertiesViewModel {
    isPropertyDisabled: (name: string) => boolean;
    isPropertyVisible: (name: string) => boolean;
    isPropertyModified: (name: string) => boolean;
    isPropertyHighlighted?: (name: string) => boolean;
    controlType?: string;
    actions: IModelAction[];
    actionProviders?: IModelActionProvider[];
    getInfo?: () => ISerializationInfoArray;
}
export declare type IModelActionProvider = {
    getActions: (name: string) => IModelAction[];
};
export interface IUndoEngine {
    start: () => void;
    end: () => void;
}
export declare enum KeyboardEnum {
    Plus = "+",
    Minus = "-",
    Equal = "=",
    Tab = "Tab",
    Delete = "Delete",
    Enter = "Enter",
    Esc = "Escape",
    Space = " ",
    End = "End",
    Home = "Home",
    PageUp = "PageUp",
    PageDown = "PageDown",
    ArrowLeft = "ArrowLeft",
    ArrowUp = "ArrowUp",
    ArrowRight = "ArrowRight",
    ArrowDown = "ArrowDown"
}
export declare enum KeyboardCodesEnum {
    Tab = 9,
    Enter = 13,
    Esc = 27,
    Space = 32,
    End = 35,
    Home = 36,
    Left = 37,
    Up = 38,
    Right = 39,
    Down = 40
}
export declare type IKeyboardCodesEnum = {
    [key in keyof typeof KeyboardCodesEnum]?: (e: any, index?: number) => boolean;
};
