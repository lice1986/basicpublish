﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\parametersDialogs.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { ReportViewModel } from '../../controls/xrReport';
import { ObjectItem } from '../../dataObjects/objectStorageItem';
import { ParameterLayoutItem, ParameterPanelLayoutItem } from '../../dataObjects/parameters/layoutItems';
import { Parameter } from '../../dataObjects/parameters/parameter';
declare class SettingsAreaModel {
    private _parameter;
    getInfo(): any[];
    constructor(_parameter: Parameter);
    isPropertyVisible(propertyName: string): boolean;
    valueSourceSettingsType: ko.Observable<string>;
    valueSourceSettings: ko.Observable<ObjectItem> | ko.Computed<ObjectItem>;
}
export declare class ParametersDialogBase extends Disposable {
    protected _currentReport: ReportViewModel;
    dispose(): void;
    protected onSubmit(): void;
    protected get undoEngine(): UndoEngine;
    protected _getParameterFromLayoutItem(layoutItem: ParameterPanelLayoutItem): Parameter;
    protected _createParameter(parameters?: Parameter[]): ParameterLayoutItem;
    protected _undoEngine: UndoEngine;
    protected _isSubmited: boolean;
    private _createButton;
    constructor(_currentReport: ReportViewModel);
    protected selectItem(layoutItem: ParameterPanelLayoutItem): void;
    show(parameter?: Parameter): void;
    _onStart(layoutItem: ParameterPanelLayoutItem): void;
    close(): void;
    submit(): void;
    buttons: {
        toolbar: string;
        location: string;
        widget: string;
        options: {
            text: string;
            type: string;
            stylingMode: string;
            onClick: () => void;
        };
    }[];
    _savedLayoutItems: any[];
    _propertiesGrid: ObjectProperties;
    _settingsGrid: ObjectProperties;
    _editableObject: ko.Observable<ParameterPanelLayoutItem | Parameter>;
    _selectedItem: ko.Observable<ParameterPanelLayoutItem>;
    _selectedParameter: ko.Observable<Parameter>;
    _selectedParameterSettings: ko.Observable<SettingsAreaModel>;
    visible: ko.Observable<boolean>;
    contentTemplate: string;
    container: (element: HTMLElement) => any;
}
export declare class AddParameterDialog extends ParametersDialogBase {
    onSubmit(): void;
    _onStart(parameter?: ParameterLayoutItem): void;
    popupCss: string;
    title: any;
    width: string | number;
    height: number;
    contentTemplate: string;
}
export {};
