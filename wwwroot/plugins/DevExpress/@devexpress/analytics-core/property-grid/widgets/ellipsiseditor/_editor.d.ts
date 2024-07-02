﻿/**
* DevExpress Analytics (property-grid\widgets\ellipsiseditor\_editor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jquery" />
import 'devextreme/ui/text_box';
import dxTextBox, { Properties } from 'devextreme/ui/text_box';
export declare type EllipsisEditorOptions = Properties & {
    buttonAction?: () => void;
    openOnFieldClick?: boolean;
    value?: any;
};
export declare class dxEllipsisEditor extends dxTextBox<EllipsisEditorOptions> {
    _$button: JQuery<HTMLElement>;
    _$buttonIcon: JQuery<HTMLElement>;
    _$element: JQuery<HTMLElement>;
    _modelByElement: any;
    _$input: JQuery<HTMLElement>;
    constructor(element: Element, options?: EllipsisEditorOptions);
    _init(): void;
    _render(): void;
    _updateWarningState(value?: unknown): void;
    _updateButtonSize(): void;
    _renderButton(): void;
    _attachButtonEvents(): void;
    _removeCustomHoveredStyle(): void;
    _attachInputEvents(): void;
    _optionChanged(args: {
        name: string;
        value: any;
    }): void;
    buttonAction(e: any): void;
}
