﻿/**
* DevExpress HTML/JS Reporting (designer\tools\smartTags\expressionSmartTag.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { XRReportElementViewModel } from '../../controls/xrReportelement';
import { ReportExpressionEditorWrapper } from '../../widgets/expressioneditor/reportExpressionEditorWrapper';
import { ISmartTag } from './smartTagContainer';
import { Editor, ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
import { getParentContainer } from '@devexpress/analytics-core/analytics-internal';
import { ControlType } from '../../controls/utils/_controlTypes';
export declare class ExpressionSmartTag extends Disposable implements ISmartTag {
    reportElement: XRReportElementViewModel;
    private _expressionEditor;
    constructor(reportElement: XRReportElementViewModel, _expressionEditor: ko.Observable<ReportExpressionEditorWrapper>);
    templateName?: string;
    disabled: ko.Observable<boolean>;
    onClick(): void;
    dispose(): void;
    imageTemplateName: string;
    visible: ko.Observable<boolean>;
    subscription: ko.Subscription;
}
export declare class TasksSmartTag extends Disposable implements ISmartTag {
    reportElement: XRReportElementViewModel;
    popularProperties: ObjectProperties;
    private _booleanEditors;
    private _nonBooleanEditors;
    constructor(reportElement: XRReportElementViewModel, popularProperties: ObjectProperties);
    collectEditorsFromComplex(complexEditor: any, propertyNames: string[], editorsFound?: Editor[], parentEditorName?: string): Editor[];
    getPopularPropertyNames(controlType: ControlType): any;
    onClick(): void;
    getEditors(booleanEditors: boolean): Editor[];
    visible: ko.Observable<boolean>;
    popoverVisible: ko.Observable<boolean>;
    imageTemplateName: string;
    templateName: string;
    editorsAvailableSubscriptions: (() => void)[];
    getPopupContainer: typeof getParentContainer;
    separatorVisible: ko.Observable<boolean>;
}