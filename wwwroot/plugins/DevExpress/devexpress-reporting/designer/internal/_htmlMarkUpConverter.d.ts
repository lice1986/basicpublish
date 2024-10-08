﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_htmlMarkUpConverter.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface IDiplayNameParameters {
    text: string;
    wordWrap?: boolean;
    fontSize?: number;
    fontUnit?: string;
}
export interface IInheritValues {
    fontSize?: number;
    backcolor?: boolean;
}
export interface ITag {
    node: Element;
    element: HTMLElement;
    createElement: () => any;
    appendTo: (el: HTMLElement) => void;
    hasChildNodes: boolean;
    setProperties: (parameters?: IDiplayNameParameters, inheritValues?: IInheritValues) => any;
    value?: any;
    inheritValues: IInheritValues;
}
export declare class ValueConverter {
    private _displayNameParameters;
    static ValueAttrName: string;
    private _regExp;
    private _createTag;
    private _parceToXml;
    private _checkValidTag;
    private _createTree;
    constructor(_displayNameParameters: IDiplayNameParameters);
    appendTo(element: HTMLElement): void;
}
