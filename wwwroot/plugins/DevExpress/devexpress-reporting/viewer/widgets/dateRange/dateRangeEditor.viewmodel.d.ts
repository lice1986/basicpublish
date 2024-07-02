﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\dateRange\dateRangeEditor.viewmodel.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IViewModel } from '@devexpress/analytics-core/analytics-serializer-native';
import { Properties as PopupProperties } from 'devextreme/ui/popup';
import { Properties as ScrollViewProperties } from 'devextreme/ui/scroll_view';
import { Properties as CalendarProperties } from 'devextreme/ui/calendar';
import { DateRangeEditor } from './dateRangeEditor';
import { DateRangeDialogElementsKeyboardHelper, PredefinedDateRangesKeyboardHelper } from '../../accessibility/_dateRangeKeyboardHelper';
import { IDateRangeEditorItem } from './dateRangeEditor.ranges';
export declare type IDateRangeEditorPredefinedItemViewModel = IDateRangeEditorItem & {
    click: () => void;
    selected: boolean;
};
export declare type IDateRangeCalendarViewModel = {
    value: Date;
    onValueChanged: CalendarProperties['onValueChanged'];
    min: Date;
    height: string;
    inRange: (date: Date) => boolean;
};
export interface IDateRangeEditorViewModel extends IViewModel {
    getPopupSettings: () => PopupProperties;
    _displayName: string;
    displayValue: string;
    popupModel: IDateRangeEditorViewModel | any;
    popupTemplate: string;
    dialogKeyboardHelper: DateRangeDialogElementsKeyboardHelper;
    scrollViewOptions: ScrollViewProperties;
    predefinedRanges: {
        attr: object;
        accessibilityKeyboardHelper: PredefinedDateRangesKeyboardHelper;
        scrollViewOptions: ScrollViewProperties;
        items: IDateRangeEditorPredefinedItemViewModel[];
    };
    items: IDateRangeEditorItem[];
    showPopup: () => void;
    cacheElement: (element: JQuery) => void;
    startRange: IDateRangeCalendarViewModel;
    endRange: IDateRangeCalendarViewModel;
    _editorInputId: string;
}
export declare function createDateRangeEditorViewModel(this: DateRangeEditor, baseViewModel: IViewModel): IDateRangeEditorViewModel;
