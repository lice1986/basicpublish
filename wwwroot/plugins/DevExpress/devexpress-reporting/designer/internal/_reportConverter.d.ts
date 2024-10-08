﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_reportConverter.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportViewModel } from '../controls/xrReport';
import { ObjectStorageItem } from '../dataObjects/objectStorageItem';
import { BaseConverter } from './_baseConverter';
import { DataBindingMode } from './_dataBindingMode';
export interface IRulesDictionaryItem {
    condition: string;
    dataMember: string;
    dataSource: ObjectStorageItem;
    formatting: any;
}
export declare class ReportConverter extends BaseConverter {
    private _controlsHelper;
    private _undoEngine;
    private _dataBindingMode;
    private convertChoiceEnum;
    private _formattingMapper;
    private _mapRulesProperties;
    private _expressionsToControlMap;
    private _lastChoice;
    private _defaultFormatting;
    private _notShowAgain;
    private _detailLink;
    protected _model: ReportViewModel;
    constructor(_controlsHelper: any, _undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, _dataBindingMode?: string);
    private _hasBindings;
    private _hasFormattingRules;
    convert(model: ReportViewModel, convertBindingsToExpressions?: string): void;
    private _generateStyleName;
    private _createBindingExpression;
    private _tryToGenerateBindingExpressions;
    private _resetDataBindings;
    private _mapPaddingObj;
    private _mapFontObj;
    private _splitFontPropertyValue;
    private _splitPaddingPropertyValue;
    private _patchRuleCondition;
    private _tryToGenerateFormattingRulesExpressions;
    private _getControlDataSourceDataMember;
    private _generateFormattingRulesDictionary;
    private _createRuleExpression;
    private _canConvertReport;
    protected _applyChanges(): void;
    protected _cancel(mode?: DataBindingMode): void;
}
