﻿/**
* DevExpress HTML/JS Reporting (common\utils\editingFieldExtensions.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IImageEditorItem } from '../../viewer/widgets/pictureEditor/_pictureEditorTypes';
export interface IInplaceEditorInfo {
    name: string;
    category: string;
    displayName: string;
    template?: string;
    options?: any;
}
export declare const Categories: {
    Image: () => string;
    Numeric: () => string;
    DateTime: () => string;
    Letters: () => string;
};
export interface IImageEditorRegistrationOptions {
    name: string;
    displayName: string;
    images?: IImageEditorItem[];
    customizeActions?: (sender: any, actions: any[]) => void;
    searchEnabled?: boolean;
    imageLoadEnabled?: boolean;
    sizeOptionsEnabled?: boolean;
    clearEnabled?: boolean;
    drawingEnabled?: boolean;
    shadingEnabled?: boolean;
}
export declare const ___isCancelFlag = "___isCancel";
export declare class EditingFieldExtensions {
    private static _instance;
    private _editors;
    static instance(): EditingFieldExtensions;
    private _registerStandartEditors;
    static enableImageEditorShading(): void;
    static registerImageEditor(imageRegistrationOptions: IImageEditorRegistrationOptions): void;
    static registerEditor(name: string, displayName: string, category: string, options?: {}, template?: string, validate?: (value: string) => boolean, defaultVal?: string): void;
    static registerMaskEditor(editorID: string, displayName: string, category: string, mask: string): void;
    static registerRegExpEditor(editorID: string, displayName: string, category: string, regExpEditing: RegExp, regExpFinal: RegExp, defaultVal: string): void;
    static unregisterEditor(editorID: string): void;
    categories(excludeCategories?: string[]): string[];
    editors(): IInplaceEditorInfo[];
    editorsByCategories(categories?: string[]): IInplaceEditorInfo[];
    editor(editorID: string): IInplaceEditorInfo;
}
