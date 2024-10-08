﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_summaryFunctionEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListEditor, IFieldListEditorViewModel } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export declare class SummaryFunctionModel {
    static availableItems: string[];
    static from(val: any): SummaryFunctionModel;
    static toJson(value: SummaryFunctionModel): {};
    private _updateArgs;
    constructor(functionName: any, args: any);
    functionName: ko.Observable<any>;
    args: ko.ObservableArray<{
        value: ko.Observable<string>;
    }>;
}
export interface ISummaryFunctionEditorViewModel extends IFieldListEditorViewModel {
    availableItems: string[];
    memberPadding: {
        paddingLeft: number;
    };
    argumentTemplateName: string;
    actionsAreAvailable: boolean;
    getLocalization: (displayName: string, localizationId: string) => string;
    add: () => void;
    remove: (index: number) => void;
}
export declare class SummaryFunctionEditor extends FieldListEditor {
    createViewModel(): ISummaryFunctionEditorViewModel;
    constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>);
    getLocalization(displayName: any, localizationId: any): string;
    memberPadding: any;
    argumentTemplateName: string;
    actionsAreAvailable: ko.Observable<boolean>;
    add(): void;
    remove(index: number): void;
    getAvailableItems(): string[];
}
