﻿/**
* DevExpress Analytics (property-grid\widgets\fonteditor\editor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfo } from '../../../serializer/serializationInfo';
import { ObjectProperties, PropertyGridEditor } from '../../propertygrid';
export declare class FontEditor extends PropertyGridEditor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    createObjectProperties(): ObjectProperties;
}
