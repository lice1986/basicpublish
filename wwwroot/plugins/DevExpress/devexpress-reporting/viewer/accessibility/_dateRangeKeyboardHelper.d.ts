﻿/**
* DevExpress HTML/JS Reporting (viewer\accessibility\_dateRangeKeyboardHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityKeyboardHelperBase, ControlElementWithParentHighlight, ListKeyboardHelper } from '@devexpress/analytics-core/analytics-internal-native';
import { DateRangeEditor } from '../widgets/dateRange/dateRangeEditor';
export declare class DateRangeDialogElementWithHighlight extends ControlElementWithParentHighlight {
    element: HTMLElement;
    elementClassName: string;
    private _getTargetElement;
    dateRangeItemHandleFocus: () => void;
    dispose(): void;
    constructor(element: HTMLElement, _parentElement: Element);
}
export declare class DateRangeDialogElementsKeyboardHelper extends AccessibilityKeyboardHelperBase {
    private _dateRangeEditor;
    controlElementClassName: string;
    predefinedDateRangesKeyboardHelper: PredefinedDateRangesKeyboardHelper;
    _next: number;
    createControlElement(element: HTMLElement, index?: number): DateRangeDialogElementWithHighlight;
    constructor(_dateRangeEditor: DateRangeEditor);
    itemHandleEscKey(e: any, index?: any): boolean;
    itemHandleUpArrowKey(e: any, index?: any): boolean;
    itemHandleTabKey(e: any, index: any): boolean;
    itemHandleShiftTabKey(e: any, index?: any): boolean;
    handleTabKey(e: any): boolean;
    setFocusToNext(currentIndex: number, roundTrip?: boolean): number;
}
export declare class PredefinedDateRangesKeyboardHelper extends ListKeyboardHelper {
    private owner;
    constructor(owner: DateRangeDialogElementsKeyboardHelper);
    itemHandleEscKey(e: any, index: any): boolean;
    itemHandleTabKey(e: any, index: any): boolean;
    itemHandleShiftTabKey(e: any, index?: any): boolean;
    itemHandleUpArrowKey(e: any, index: any): any;
}