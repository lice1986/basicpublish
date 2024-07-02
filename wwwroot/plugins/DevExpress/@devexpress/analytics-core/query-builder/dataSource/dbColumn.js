﻿/**
* DevExpress Analytics (query-builder\dataSource\dbColumn.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export var DBColumnType;
(function (DBColumnType) {
    DBColumnType[DBColumnType["Unknown"] = 0] = "Unknown";
    DBColumnType[DBColumnType["Boolean"] = 1] = "Boolean";
    DBColumnType[DBColumnType["Byte"] = 2] = "Byte";
    DBColumnType[DBColumnType["SByte"] = 3] = "SByte";
    DBColumnType[DBColumnType["Char"] = 4] = "Char";
    DBColumnType[DBColumnType["Decimal"] = 5] = "Decimal";
    DBColumnType[DBColumnType["Double"] = 6] = "Double";
    DBColumnType[DBColumnType["Single"] = 7] = "Single";
    DBColumnType[DBColumnType["Int32"] = 8] = "Int32";
    DBColumnType[DBColumnType["UInt32"] = 9] = "UInt32";
    DBColumnType[DBColumnType["Int16"] = 10] = "Int16";
    DBColumnType[DBColumnType["UInt16"] = 11] = "UInt16";
    DBColumnType[DBColumnType["Int64"] = 12] = "Int64";
    DBColumnType[DBColumnType["UInt64"] = 13] = "UInt64";
    DBColumnType[DBColumnType["String"] = 14] = "String";
    DBColumnType[DBColumnType["DateTime"] = 15] = "DateTime";
    DBColumnType[DBColumnType["Guid"] = 16] = "Guid";
    DBColumnType[DBColumnType["TimeSpan"] = 17] = "TimeSpan";
    DBColumnType[DBColumnType["ByteArray"] = 18] = "ByteArray";
})(DBColumnType || (DBColumnType = {}));
export class DBColumn {
    constructor(model) {
        this.name = model['Name'];
        this.type = model['ColumnType'];
        this.size = model['Size'];
    }
    static GetType(dbColumnType) {
        switch (dbColumnType) {
            case DBColumnType.Boolean:
                return 'System.Boolean';
            case DBColumnType.Byte:
                return 'System.Byte';
            case DBColumnType.SByte:
                return 'System.SByte';
            case DBColumnType.Char:
                return 'System.Char';
            case DBColumnType.Decimal:
                return 'System.Decimal';
            case DBColumnType.Double:
                return 'System.Double';
            case DBColumnType.Single:
                return 'System.Single';
            case DBColumnType.Int32:
                return 'System.Int32';
            case DBColumnType.UInt32:
                return 'System.UInt32';
            case DBColumnType.Int16:
                return 'System.Int16';
            case DBColumnType.UInt16:
                return 'System.UInt16';
            case DBColumnType.Int64:
                return 'System.Int64';
            case DBColumnType.UInt64:
                return 'System.UInt64';
            case DBColumnType.String:
                return 'System.String';
            case DBColumnType.DateTime:
                return 'System.DateTime';
            case DBColumnType.Guid:
                return 'System.Guid';
            case DBColumnType.TimeSpan:
                return 'System.TimeSpan';
            case DBColumnType.ByteArray:
                return 'System.Byte[]';
            default:
                return 'System.Object';
        }
    }
    static GetSpecific(type) {
        switch (type) {
            case 'System.Boolean':
                return 'Bool';
            case 'System.Byte':
            case 'System.SByte':
            case 'System.Int16':
            case 'System.UInt16':
            case 'System.Int32':
            case 'System.UInt32':
            case 'System.Int64':
            case 'System.UInt64':
                return 'Integer';
            case 'System.Char':
            case 'System.Guid':
            case 'System.ByteArray':
            case 'System.String':
                return 'String';
            case 'System.Double':
            case 'System.Single':
            case 'System.Decimal':
                return 'Float';
            case 'System.DateTime':
            case 'System.TimeSpan':
                return 'Date';
            default:
                return 'String';
        }
    }
}