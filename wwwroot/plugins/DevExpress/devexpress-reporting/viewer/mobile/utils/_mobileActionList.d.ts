﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\utils\_mobileActionList.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { MobileReportPreview } from '../mobilePreview';
import { ExportOptionsModel } from '../../exportOptions/exportOptionsModel';
import { PreviewParametersViewModel } from '../../parameters/previewParametersViewModel';
import { MobileSearchViewModel } from '../internal/_mobileSearch';
import { IPreviewCustomizationHandler } from '../../utils/initializer';
import { BaseRenderingModel, IViewModel } from '@devexpress/analytics-core/analytics-serializer-native';
import { MobilePreviewModel } from '../internal/_mobilePreviewModel';
export interface IMobileActionContent {
    name: string;
    data: any;
    dispose?: () => void;
}
export interface IMobileAction {
    imageClassName: string;
    imageTemplateName: string;
    clickAction: () => void;
    visible?: boolean;
    content?: IMobileActionContent;
}
export interface IMobileActionListViewModel extends IViewModel {
    visible: boolean;
    actions: IMobileAction[];
}
export declare class MobileActionList extends BaseRenderingModel<IMobileActionListViewModel> {
    actions: IMobileAction[];
    constructor(actions: IMobileAction[], reportPreview: MobileReportPreview);
    createViewModel(): IMobileActionListViewModel;
    updateViewModel(): void;
    onPropertyChanged(): void;
    dispose(): void;
    visible: boolean;
}
export interface IPreviewActionsMobileOptions {
    designerModel: MobilePreviewModel;
    reportPreview: MobileReportPreview;
    exportModel: ExportOptionsModel;
    parametersModel: PreviewParametersViewModel;
    searchModel: MobileSearchViewModel;
    exportTypes: {
        text: string;
        format: string;
    }[];
    callbacks: IPreviewCustomizationHandler;
}
export interface IMobileExportAction {
    visible: boolean;
    items: {
        text: string;
        action: () => void;
    }[];
}
export declare function getPreviewActionsMobile(options: IPreviewActionsMobileOptions): MobileActionList;
