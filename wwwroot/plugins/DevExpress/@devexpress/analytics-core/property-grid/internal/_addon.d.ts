﻿/**
* DevExpress Analytics (property-grid\internal\_addon.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PopupService } from './_popupService';
import { Editor } from '../widgets/editor';
import { IModelAction } from '../widgets/internal/_utils';
import { BaseRenderingMultiplatformModel, EngineType } from '../../serializer/native/models/base.model';
import { IViewModel } from '../../serializer/native/models/interfaces.model';
import { MultiPlatformComputed } from '../../serializer/native/multiplatformEngine';
export interface IEditorAddon {
    templateName: string;
    data: EditorAddOn[] | any;
}
export declare class EditorAddOn extends BaseRenderingMultiplatformModel<IViewModel> {
    private _popupService;
    private _editor;
    private _imageTemplateName;
    private _updateActions;
    private _getTitles;
    private _wrapVisibleItems;
    private _wrapActionClick;
    constructor(editor: Editor, popupService: PopupService, engineType?: EngineType);
    showPopup(_: any, element: any): void;
    actionFilter(action: IModelAction): boolean;
    visible: MultiPlatformComputed<boolean>;
    _actions: MultiPlatformComputed<IModelAction[]>;
    editorMenuButtonCss: MultiPlatformComputed<string | {
        [key: string]: boolean;
    }>;
    imageTemplateName: MultiPlatformComputed<string>;
    hint: MultiPlatformComputed<string>;
    templateName: any;
}
