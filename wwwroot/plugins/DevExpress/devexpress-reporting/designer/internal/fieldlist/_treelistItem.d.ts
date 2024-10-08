﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_treelistItem.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CodeResolver } from '@devexpress/analytics-core/analytics-internal';
import { ArrayPropertyChangedEventArgs, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { ITreeListItemViewModel, ITreeListOptions, TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { CustomRule } from 'devextreme/common';
import { NativeEventInfo } from 'devextreme/events';
import dxTextBox from 'devextreme/ui/text_box';
import { FieldListItemFactory } from './_treelistFactory';
export interface IReportDesignerTreeListItem extends ITreeListItemViewModel {
    inRenameMode: boolean;
    disabled: boolean;
    setRenameMode: (value: boolean) => void;
    createValidatorOptions: () => {
        validationRules: CustomRule[];
    };
    createRenameEditorOptions: () => {
        [key: string]: ((event: NativeEventInfo<dxTextBox>) => void) | string;
    };
}
export declare class ReportDesignerTreelistItem extends TreeListItemViewModel {
    protected resolver: CodeResolver;
    private _fieldListItemFactory;
    private _isDisabled;
    private _createValidatorOptions;
    private _rename;
    private _onRenameDisposeFunc;
    private _createRenameEditorOptions;
    _getCssRules(): {
        [key: string]: boolean;
    };
    constructor(options: ITreeListOptions, path: string[], onItemsVisibilityChanged: () => undefined, rtl: boolean, resolver: CodeResolver, _fieldListItemFactory: FieldListItemFactory);
    onPropertyChanged(args: PropertyChangedEventArgs<ReportDesignerTreelistItem> | ArrayPropertyChangedEventArgs<ReportDesignerTreelistItem>): void;
    updateViewModel(args: PropertyChangedEventArgs<ReportDesignerTreelistItem> | ArrayPropertyChangedEventArgs<ReportDesignerTreelistItem>): void;
    createViewModel(): IReportDesignerTreeListItem;
    dispose(): void;
    renameMode: boolean;
    disabled: boolean;
}
