﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\controlsFactory.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IElementMetadata } from '@devexpress/analytics-core/analytics-elements';
import { ISelectionTarget } from '@devexpress/analytics-core/analytics-internal';
import { ControlsFactory as AnalyticControlsFactory, IDisposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IExpressionObject } from '../../dataObjects/expressions/_wrappedExpressionOptions';
import { ISerializationInfoWithBindings } from '../metadata/properties/metadata';
import { IExpressionBinding } from '../properties/expressionBinding';
import { ControlType } from './_controlTypes';
export interface IReportControlMetadata extends IElementMetadata {
    defaultBindingName?: string;
    group?: 'common' | 'misc' | 'complex' | 'graphics' | 'custom' | string;
    canPaste?: (dropTarget: ISelectionTarget) => boolean;
}
export declare class ControlsFactory extends AnalyticControlsFactory<ControlType> implements IDisposable {
    fieldListProvider: ko.Observable | ko.Computed;
    dispose(): void;
    private _expressionWrapper;
    private _beforePrintPrintOnPage;
    private _beforePrint;
    private _registerCommonExpressions;
    private _registerExtensions;
    constructor(fieldListProvider?: ko.Observable | ko.Computed);
    registerControl(typeName: ControlType, metadata: IReportControlMetadata): void;
    _createExpressionObject(typeName: ControlType, expressions: ko.ObservableArray<IExpressionBinding>, path?: ko.Computed<string>, summaryRunning?: (name: string) => ko.Observable<boolean> | ko.Computed<boolean>): IExpressionObject;
    setExpressionBinding(controlType: ControlType, propertyName: string, events: string[], group?: string, objectProperties?: string[]): void;
    setPropertyDescription(controlType: ControlType, propertyName: string, events: string[], group?: string, objectProperties?: string[]): void;
    setDisplayNameForExpression(propertyName: string, localizationId: string, displayName: string): void;
    hideExpressionBindings(type: ControlType, ...propertyNames: string[]): void;
    hidePropertyDescriptions(type: ControlType, ...propertyNames: string[]): void;
    inheritControl(parentType: ControlType, extendedOptions: IElementMetadata): IElementMetadata;
    createPopularBindingInfo(options: ISerializationInfoWithBindings, isExpression?: boolean): ISerializationInfoWithBindings;
}
