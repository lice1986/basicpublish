﻿/**
* DevExpress Analytics (widgets\internal\_valueEditorHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class ValueEditorHelper {
    private static _getCharFromKeyCode;
    private static _getCaretPosition;
    static editors: {
        integer: {
            regExpEditing: RegExp;
        };
        float: {
            regExpEditing: RegExp;
        };
        'System.Byte': {
            regExpEditing: RegExp;
            minValue: any;
            maxValue: string;
        };
        'System.SByte': {
            regExpEditing: RegExp;
            minValue: string;
            maxValue: string;
        };
        'System.Int16': {
            regExpEditing: RegExp;
            minValue: string;
            maxValue: string;
        };
        'System.UInt16': {
            regExpEditing: RegExp;
            minValue: any;
            maxValue: string;
        };
        'System.Int32': {
            regExpEditing: RegExp;
            minValue: string;
            maxValue: string;
        };
        'System.UInt32': {
            regExpEditing: RegExp;
            minValue: any;
            maxValue: string;
        };
        'System.Int64': {
            regExpEditing: RegExp;
            minValue: string;
            maxValue: string;
        };
        'System.UInt64': {
            regExpEditing: RegExp;
            minValue: any;
            maxValue: string;
        };
        'System.Single': {
            regExpEditing: RegExp;
            minValue: string;
            maxValue: string;
        };
        'System.Double': {
            regExpEditing: RegExp;
            minValue: string;
            maxValue: string;
        };
        'System.Decimal': {
            regExpEditing: RegExp;
            minValue: string;
            maxValue: string;
        };
    };
    private static _validate;
    static validateWidgetValue(e: any, validate: (value: string) => boolean, defaultVal: string): void;
    static getNumberEditorOptions(id: string, specifics: string, extendOptions?: {}): any;
    static getValueEditorOptions(regExpEditing: RegExp, validate: (value: string) => boolean, defaultVal: string, extendOptions?: {}): any;
    static isValid(id: string, specifics: string, value: string): boolean;
    private static _invokeStandardHandler;
}
