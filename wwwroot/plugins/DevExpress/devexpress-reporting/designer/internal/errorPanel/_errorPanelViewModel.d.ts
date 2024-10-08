﻿/**
* DevExpress HTML/JS Reporting (designer\internal\errorPanel\_errorPanelViewModel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportDesignerControlsHelper } from '../../helpers/_reportDesignerControlsHelper';
import { IReportDesignerErrorPanelSettings } from '../../utils/inititalizer';
import { ControlScrollingTool } from '../_controlScrollingTool';
import { ErrorType, IErrorModel, IErrorProvider } from './_types';
interface IPositionX<T> {
    left?: ko.Subscribable<T>;
    right?: ko.Subscribable<T>;
    height?: ko.Subscribable<T>;
}
export interface IErrorPanelViewModelSettings extends IReportDesignerErrorPanelSettings {
    controlScrollingTool?: ControlScrollingTool;
    controlsHelper?: ReportDesignerControlsHelper;
    selection?: SurfaceSelection;
    editableObject?: ko.Observable<any>;
    position?: IPositionX<number>;
    undoEngine?: () => UndoEngine;
    onClick?: () => void;
    rtl?: boolean;
}
export declare class ErrorPanelViewModel extends Disposable {
    static get allErrorSources(): string[];
    static get allErrorTypes(): string[];
    private _offset;
    private _initOptions;
    private _height;
    private _controlScrollingTool;
    private _controlsHelper;
    private _selection;
    private _editableObject;
    private _position;
    private _errorSource;
    private _choosenTypes;
    private _filterValue;
    private _getUndoEngine;
    private _onClick;
    private _latestChangeSet;
    private _collectErrorButtonDisabled;
    private _openErrorPanelIconHeight;
    private _createMessage;
    private _createAvailableSourcesArray;
    private _expandParentBands;
    _dataGridOptions: any;
    collapsed: ko.Observable<boolean>;
    position: ko.Observable<any>;
    _suppressedErrorCodes: ko.ObservableArray<string>;
    _filteredErrorList: ko.Computed<IErrorModel[]>;
    _errorList: ko.ObservableArray<IErrorModel>;
    _providers: IErrorProvider[];
    _subscriptions: ko.Subscription[];
    _errorMessage: ko.Computed<string>;
    _warningMessage: ko.Computed<string>;
    _informationMessage: ko.Computed<string>;
    clear(): void;
    navigateToItem(name: string): void;
    _resizableOptions: any;
    panelTitle: any;
    getNotificationTemplate(): string;
    getTitleMessage(): string;
    assignErrors(): void;
    subscribeProvider(provider: IErrorProvider): void;
    collectErrors(): void;
    toggleCollapsed(): void;
    createDataGridOptions(undoEngine: () => UndoEngine): void;
    private _initDefaultFilter;
    private _assignFilter;
    getIconTemplateName(errorType: ErrorType): string;
    constructor(options: IErrorPanelViewModelSettings);
}
export {};
