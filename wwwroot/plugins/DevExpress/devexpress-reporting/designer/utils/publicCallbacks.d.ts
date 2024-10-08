﻿/**
* DevExpress HTML/JS Reporting (designer\utils\publicCallbacks.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { ControlsFactory, IAction, IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import { IDialogModel } from '../tools/dialogs/reportDialogBase';
import { INavigateTab } from '../tools/navigation/navigateTab';
import { WizardType, WizardTypeString } from '../wizard/wizardTypes';
import { ICommonCallbacksHandler } from '@devexpress/analytics-core/analytics-internal';
import { SaveReportDialog } from '../tools/dialogs/saveReportDialog';
import { OpenReportDialog } from '../tools/dialogs/openReportDialog';
import { SaveAsReportDialog } from '../tools/dialogs/saveAsReportDialog';
import { IPreviewCustomizationCallbacks, IPreviewCustomizationCallbacksCommon } from '../../viewer/utils/publicCallbacks';
import { IReportDesignerRootContext } from '../tools/generator/reportDesignerContext';
interface IReportNavigationArgs {
    Tab: INavigateTab;
}
interface IReportTabClosingArgs extends IReportNavigationArgs {
    Tab: INavigateTab;
    ReadyToClose: JQueryDeferred<any>;
    Handled: boolean;
}
interface IReportOpenedArgs {
    Url: string;
    Report?: any;
}
interface IReportOpeningArgs extends IReportOpenedArgs {
    Cancel: boolean;
}
interface IComponentAddedArgs {
    Model: any;
    Parent: any;
}
interface ICustomizeDialogArgs<DialogType> {
    Popup: DialogType;
    Customize: (template: string, model: IDialogModel) => void;
}
interface ICustomizeWizardArgs {
    Type: WizardTypeString;
    Wizard: WizardType;
}
interface ICustomizeFieldListActionsArgs {
    Item: IDataMemberInfo;
    Actions: IAction[];
}
export declare type IReportViewerIntoDesignerCallbacks<T> = {
    [K in keyof IPreviewCustomizationCallbacks<T> as `Preview${K}`]: IPreviewCustomizationCallbacks<T>[K];
};
export interface IReportDeisgnerCallbacks<T> extends IReportViewerIntoDesignerCallbacks<T>, IPreviewCustomizationCallbacksCommon<T>, ICommonCallbacksHandler<T, IReportDesignerRootContext> {
    ReportTabClosing?: (sender: T, args: IReportTabClosingArgs) => void;
    ReportTabClosed?: (sender: T, args: IReportNavigationArgs) => void;
    ReportOpening?: (sender: T, args: IReportOpeningArgs) => void;
    ReportOpened?: (sender: T, args: IReportOpenedArgs) => void;
    TabChanged?: (sender: T, args: {
        Tab: INavigateTab;
    }) => void;
    ExitDesigner?: (sender: T) => void;
    ReportSaving?: (sender: T, args: IReportOpeningArgs) => void;
    reportSaved?: (sender: T, args: IReportOpenedArgs) => void;
    ComponentAdded?: (sender: T, args: IComponentAddedArgs) => void;
    CustomizeSaveDialog?: (sender: T, args: ICustomizeDialogArgs<SaveReportDialog>) => void;
    CustomizeOpenDialog?: (sender: T, args: ICustomizeDialogArgs<OpenReportDialog>) => void;
    CustomizeSaveAsDialog?: (sender: T, args: ICustomizeDialogArgs<SaveAsReportDialog>) => void;
    CustomizeWizard?: (sender: T, args: ICustomizeWizardArgs) => void;
    CustomizeToolbox?: (sender: T, args: {
        ControlsFactory: ControlsFactory;
    }) => void;
    CustomizeFieldListActions?: (sender: T, args: ICustomizeFieldListActionsArgs) => void;
}
export {};
