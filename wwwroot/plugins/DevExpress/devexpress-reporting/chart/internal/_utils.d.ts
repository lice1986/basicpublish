﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_utils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SeriesPointModel } from '../components/series/_point';
export declare function createInnerActionsWithPopover(text: any, id: any, actions: any, template?: any): {
    text: any;
    imageClassName: string;
    imageTemplateName: string;
    disabled: ko.Observable<boolean>;
    id: any;
    _visible: ko.Observable<boolean>;
    popoverVisible: any;
    togglePopoverVisible: any;
    closePopover: any;
    templateName: string;
    contentTemplate: any;
    getContainer: (element: HTMLElement, selector: string) => any;
    actions: any;
}[];
export declare function _isNumericTypeSpecific(specific: string): boolean;
export declare function _isDateTypeSpecific(specific: string): boolean;
export declare function _getUnconvertiblePoint(propertyName: string, oldValue: string, newValue: string, points: SeriesPointModel[]): SeriesPointModel;
