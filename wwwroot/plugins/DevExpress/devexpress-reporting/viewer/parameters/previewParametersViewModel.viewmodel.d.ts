﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParametersViewModel.viewmodel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IViewModel } from '@devexpress/analytics-core/analytics-serializer-native';
import { PreviewParametersViewModel } from './previewParametersViewModel';
import { Properties } from 'devextreme/ui/button';
export interface IPreviewParametersViewModel extends IViewModel {
    headerText: string;
    emptyText: string;
    isEmpty: boolean;
    parametersLoading: boolean;
    resetButton: Properties;
    submitButton: Properties;
}
export declare function createPreviewParametersViewModel(this: PreviewParametersViewModel, baseModel: IPreviewParametersViewModel): IPreviewParametersViewModel;
export declare function updateViewModel(this: PreviewParametersViewModel): void;