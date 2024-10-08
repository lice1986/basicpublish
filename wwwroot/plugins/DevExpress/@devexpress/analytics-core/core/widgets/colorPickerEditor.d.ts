﻿/**
* DevExpress Analytics (core\widgets\colorPickerEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Editor, IEditorViewModel } from '../../property-grid/widgets/editor';
import { ISerializationInfo } from '../../serializer/serializationInfo';
import { MultiPlatformComputed } from '../../serializer/native/multiplatformEngine';
import { EngineType } from '../../serializer/native/models/base.model';
import { PopupService } from '../../property-grid/internal/_popupService';
import { Popover } from './popover';
export interface IColorPickerEditorViewModel extends IEditorViewModel<string> {
    displayValue: string;
}
export declare class ColorPickerEditor extends Editor {
    createViewModel(): IColorPickerEditorViewModel;
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any, popupService?: PopupService, popover?: Popover, engineType?: EngineType);
    displayValue: MultiPlatformComputed<string>;
}
