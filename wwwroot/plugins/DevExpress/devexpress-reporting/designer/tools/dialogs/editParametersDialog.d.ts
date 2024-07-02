﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\editParametersDialog.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ILocalizationInfo } from '@devexpress/analytics-core/analytics-internal';
import { ITreeListOptions } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { ReportViewModel } from '../../controls/xrReport';
import { ParametersLayoutItemsProvider } from '../../internal/parameterLayout/_parametersLayoutItemsProvider';
import { ParametersLayoutTreeListController } from '../../internal/parameterLayout/_parametersLayoutTreeListController';
import { ParametersDialogBase } from './parametersDialogs';
export declare class EditParametersDialog extends ParametersDialogBase {
    buttonMap: {
        [keyname: string]: ILocalizationInfo;
    };
    dispose(): void;
    constructor(report: ReportViewModel);
    getDisplayTextButton(key: string): string;
    up(): void;
    down(): void;
    addGroup(): void;
    addSeparator(): void;
    addParameter(): void;
    isDisabledButton(buttonName: string): boolean;
    onSubmit(): void;
    width: string;
    height: number;
    popupCss: string;
    title: any;
    contentEmptyAreaPlaceHolder: any;
    contentNoPropertiesPlaceHolder: any;
    contentTemplate: string;
    hasNoEditableProperties: ko.PureComputed<boolean>;
    contentVisible: ko.Computed<boolean>;
    selectedPath: ko.Observable<string>;
    itemsProvider: ParametersLayoutItemsProvider;
    treeListController: ParametersLayoutTreeListController;
    fieldListModel: ITreeListOptions;
}