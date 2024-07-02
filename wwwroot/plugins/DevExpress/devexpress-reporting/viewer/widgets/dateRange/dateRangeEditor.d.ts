﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\dateRange\dateRangeEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DateRangeDialogElementsKeyboardHelper } from '../../accessibility/_dateRangeKeyboardHelper';
import { ArrayPropertyChangedEventArgs, BaseRenderingModel, PropertyChangedEventArgs } from '@devexpress/analytics-core/analytics-serializer-native';
import { IDateRangeEditorViewModel } from './dateRangeEditor.viewmodel';
import { IDateRangeEditorItem } from './dateRangeEditor.ranges';
import { Editor, IEditorViewModel } from '@devexpress/analytics-core/analytics-widgets-native';
export interface IDateRangeEditorOptions {
    value: Date[];
    onValueChanged: (e: {
        value: Date[];
    }) => void;
    isMobile?: boolean;
    displayName?: string;
}
declare type IKoDateRangeEditorOptions = {
    value: ko.Observable<IDateRangeEditorOptions['value']>;
    isMobile?: boolean;
};
export declare function createDateRangeEditor(_options: IKoDateRangeEditorOptions | IDateRangeEditorOptions, element?: Node, model?: Editor | IEditorViewModel): DateRangeEditor;
export declare class DateRangeEditor extends BaseRenderingModel<IDateRangeEditorViewModel> {
    private _options;
    private _locker;
    createViewModel(): IDateRangeEditorViewModel;
    private _getStringValue;
    _showPopup: () => void;
    _hidePopup: () => void;
    getElement(): Element | undefined;
    _$element: JQuery;
    _editorInputId: string;
    _displayName: string;
    _isSelected(item: IDateRangeEditorItem): boolean;
    onPropertyChanged(args: PropertyChangedEventArgs<DateRangeEditor> | ArrayPropertyChangedEventArgs<DateRangeEditor>): void;
    deferredUpdateViewModel(): boolean;
    updateViewModel(args: PropertyChangedEventArgs<DateRangeEditor> | ArrayPropertyChangedEventArgs<DateRangeEditor>): void;
    constructor(_options: IDateRangeEditorOptions, editorInputId?: string);
    private _toParameterValue;
    applyDate(range: Date[], force?: boolean): void;
    inRange(date: Date): boolean;
    applyValue(updateEndDate?: boolean): void;
    popupTemplate: string;
    startDate: Date;
    endDate: Date;
    _popupVisible: boolean;
    _displayText: string;
    popupModel: any;
    items: any[];
    calendarHeight: string;
    dialogKeyboardHelper: DateRangeDialogElementsKeyboardHelper;
}
export {};