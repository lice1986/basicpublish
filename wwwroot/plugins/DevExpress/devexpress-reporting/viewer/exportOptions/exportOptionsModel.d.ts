﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\exportOptionsModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ActionListsBase } from '@devexpress/analytics-core/analytics-internal-native';
import { Disposable, IActionViewModel, TabInfoWithPropertyGrid } from '@devexpress/analytics-core/analytics-utils-native';
import { ReportPreview } from '../reportPreview';
import { ArrayPropertyChangedEventArgs, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { IExportActionItem, ExportActionBase } from '../internal/_actions';
export declare class ExportOptionsModel extends Disposable {
    private _reportPreview;
    constructor(reportPreview: ReportPreview, enableKeyboardSupport?: boolean);
    _getExportFormatItems(): Array<{
        text: string;
        format: string;
    }>;
    _exportDocumentByFormat(format: any): void;
    getActions(context: any): any[];
    dispose(): void;
    actions: any[];
    tabInfo: TabInfoWithPropertyGrid;
}
export declare class ExportOptionsEventHandlers {
    private _menuButton;
    onSubmenuShowing(popupContainer: any, element: any): (e: any) => void;
    onSubmenuShown(e: any): void;
    onSubmenuHiding(e: any): void;
    onItemRendered(e: any): void;
}
export interface IExportActionViewModel extends IActionViewModel {
    widget: {
        items: {
            text: string;
            imageClassName: string;
            imageTemplateName: string;
            format?: any;
            items?: IExportActionViewModel['widget']['items'];
        }[];
        onItemClick: (e: any) => void;
        onSubmenuShowing: (container: HTMLElement, element: HTMLElement) => (e: any) => void;
        onSubmenuShown: (e: any) => void;
        onSubmenuHiding: (e: any) => void;
        onItemRendered: (e: any) => void;
    };
    getPopupContainer: (e: any) => HTMLElement;
}
export declare class ExportAction extends ExportActionBase {
    model: ExportOptionsModel;
    constructor(reportPreview: ReportPreview, model: ExportOptionsModel);
    updateViewModel(args: PropertyChangedEventArgs<ExportAction> | ArrayPropertyChangedEventArgs<ExportAction>): void;
    createViewModel(parent: ActionListsBase, index: number): IActionViewModel;
    getExportItems(): IExportActionItem[];
    items: IExportActionItem[];
    eventHandlers: ExportOptionsEventHandlers;
}
