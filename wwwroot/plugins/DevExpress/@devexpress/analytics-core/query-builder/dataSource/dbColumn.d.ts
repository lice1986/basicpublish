﻿/**
* DevExpress Analytics (query-builder\dataSource\dbColumn.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare enum DBColumnType {
    Unknown = 0,
    Boolean = 1,
    Byte = 2,
    SByte = 3,
    Char = 4,
    Decimal = 5,
    Double = 6,
    Single = 7,
    Int32 = 8,
    UInt32 = 9,
    Int16 = 10,
    UInt16 = 11,
    Int64 = 12,
    UInt64 = 13,
    String = 14,
    DateTime = 15,
    Guid = 16,
    TimeSpan = 17,
    ByteArray = 18
}
export declare class DBColumn {
    name: string;
    type: DBColumnType;
    size: string;
    constructor(model: any);
    static GetType(dbColumnType: DBColumnType): "System.Boolean" | "System.Byte" | "System.SByte" | "System.Char" | "System.Decimal" | "System.Double" | "System.Single" | "System.Int32" | "System.UInt32" | "System.Int16" | "System.UInt16" | "System.Int64" | "System.UInt64" | "System.String" | "System.DateTime" | "System.Guid" | "System.TimeSpan" | "System.Byte[]" | "System.Object";
    static GetSpecific(type: string): "String" | "Date" | "Bool" | "Integer" | "Float";
}
