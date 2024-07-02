﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_parametersViewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IActionsProvider, IItemsExtender } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, IAction, IDataMemberInfo, IPathRequest } from '@devexpress/analytics-core/analytics-utils';
import { ITreeListItemViewModel, TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { ReportViewModel } from '../../controls/xrReport';
import { Parameter } from '../../dataObjects/parameters/parameter';
import { EditParametersDialog } from '../../tools/dialogs/editParametersDialog';
import { AddParameterDialog } from '../../tools/dialogs/parametersDialogs';
export declare class ParametersViewModel extends Disposable implements IActionsProvider, IItemsExtender {
    _addParametersDialog: AddParameterDialog;
    _editParametersDialog: EditParametersDialog;
    constructor(report: ReportViewModel);
    parameters: ko.ObservableArray<Parameter>;
    addAction: {
        clickAction: () => void;
        imageClassName: string;
        imageTemplateName: string;
        text: string;
        displayText: () => string;
    };
    removeAction: {
        clickAction: (item: ITreeListItemViewModel) => void;
        imageClassName: string;
        imageTemplateName: string;
        text: string;
        displayText: () => string;
    };
    editAction: {
        clickAction: (item: ITreeListItemViewModel) => void;
        imageClassName: string;
        imageTemplateName: string;
        text: string;
        displayText: () => string;
    };
    getActions(context: TreeListItemViewModel): IAction[];
    add: () => void;
    remove: (parameter: Parameter) => void;
    edit: (parameter: Parameter) => void;
    beforeItemsFilled(request: IPathRequest, items: IDataMemberInfo[]): boolean;
    afterItemsFilled(request: IPathRequest, items: IDataMemberInfo[]): void;
}