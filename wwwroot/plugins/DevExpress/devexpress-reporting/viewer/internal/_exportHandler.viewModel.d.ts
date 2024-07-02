﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_exportHandler.viewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getParentContainer } from '@devexpress/analytics-core/analytics-internal-native';
import { IViewModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { dxPopupToolbarItem } from 'devextreme/ui/popup';
import { ExportHandler } from './_exportHandler';
export interface IExportToolViewModel extends IViewModel {
    popupOptions: {
        width: string;
        height: string;
        title: string;
        visible: boolean;
        toolbarItems: Array<dxPopupToolbarItem>;
        wrapperAttr: {
            [key: string]: string;
        };
        getPopupContainer: typeof getParentContainer;
        onHidden: () => void;
    };
    printingTexts: {
        link: string;
        caption: string;
        postfix: string;
        prefix: string;
    };
    exportActionUri: string;
    exportFormData: Array<{
        name: string;
        value: string;
    }>;
    printingLinkCallback: (data: IExportToolViewModel, event: Event) => void;
}
export declare function createExportHandlerViewModel(this: ExportHandler, base: IViewModel): IExportToolViewModel;
export declare function updateExportHandlerViewModel(this: ExportHandler, args: PropertyChangedEventArgs<ExportHandler>): void;