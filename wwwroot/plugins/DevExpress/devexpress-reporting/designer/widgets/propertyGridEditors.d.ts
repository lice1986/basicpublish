﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\propertyGridEditors.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { FieldListEditor, ObjectProperties, PropertyGridEditor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import './editorTemplates';
export declare class ContentByTypeEditor extends PropertyGridEditor {
    createObjectProperties(): ObjectProperties;
    _getViewModel(): ko.Computed<any>;
    hideCollapsingButton: ko.Observable<boolean>;
}
export declare class DataBindingsEditor extends PropertyGridEditor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    createObjectProperties(): ObjectProperties;
}
export declare class DataBindingEditor extends FieldListEditor {
    get actions(): import("@devexpress/analytics-core/analytics-widgets").IFormatStringEditorActions;
    get customPatterns(): {
        [key: string]: string[];
    };
}
export declare class FontEditorUndo extends PropertyGridEditor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    generateValue(undoEngine: ko.Observable<UndoEngine>): ObjectProperties;
    createObjectProperties(): ObjectProperties;
    undoEngine: ko.Observable<UndoEngine>;
}
