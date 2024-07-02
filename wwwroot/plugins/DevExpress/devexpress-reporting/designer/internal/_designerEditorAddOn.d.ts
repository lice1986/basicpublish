﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_designerEditorAddOn.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { EditorAddOn, IModelAction, PopupService } from '@devexpress/analytics-core/analytics-internal';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
export declare class DesignerEditorAddOn extends EditorAddOn {
    constructor(editor: Editor, popupService: PopupService, imageTemplateName?: string);
    onPopupShown(popupService: PopupService): void;
    showPopup(_: any, element: any): void;
}
export declare class ExpressionEditorAddOn extends DesignerEditorAddOn {
    dispose(): void;
    actionFilter(action: IModelAction): boolean;
    onPopupShown(popupService: PopupService): void;
    cacheFunction(callback: (expressionEditor: any) => void): void;
    activateExpressionEditorFunc: (expressionEditor: any) => void;
    templateName: string;
}
export declare class ValueEditorAddOn extends DesignerEditorAddOn {
    onPopupShown(popupService: PopupService): void;
    actionFilter(action: IModelAction): boolean;
}