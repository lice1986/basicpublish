﻿/**
* DevExpress Analytics (widgets\filtereditor\helpers\helper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
import { createGlobalModuleVariableFunc } from '../../../serializer/_internal';
import { AggregateOperand } from '../../criteria/operators/aggregate';
import { BetweenOperator } from '../../criteria/operators/between';
import { InOperator } from '../../criteria/operators/in';
import { BinaryOperatorType } from '../../criteria/operators/options/binary';
import { FunctionOperatorType } from '../../criteria/operators/options/function';
import { GroupOperatorType } from '../../criteria/operators/options/group';
import { UnaryOperatorType } from '../../criteria/operators/options/unary';
import { AggregateOperandSurface } from '../operators/aggregateOperandSurface';
import { BetweenOperandSurface } from '../operators/betweenOperandSurface';
import { BinaryOperandSurface } from '../operators/binaryOperandSurface';
import { CriteriaOperatorSurface } from '../operators/criteriaOperatorSurface';
import { FunctionOperandSurface } from '../operators/functionOperandSurface';
import { GroupOperandSurface } from '../operators/groupOperandSurface';
import { InOperandSurface } from '../operators/inOperandSurface';
import { OperandParameterSurface } from '../operators/operandParameterSurface';
import { OperandPropertySurface } from '../operators/operandPropertySurface';
import { OperandValueSurface } from '../operators/operandValueSurface';
import { UnaryOperandSurface } from '../operators/unaryOperandSurface';
import { FilterEditorAddOn } from './_addon';
import { initDisplayText } from './_helper';
import { FilterEditorSerializer } from './_serializer';
import { FilterEditorTreeListController } from './_treelistController';
import { CriteriaSurfaceValidator } from './_validator';
export class FilterEditorHelper {
    constructor(serializer) {
        this.rtl = false;
        this.parameters = ko.observable([]);
        this.canSelectLists = true;
        this.canCreateParameters = false;
        this.canChoiceParameters = true;
        this.canChoiceProperty = true;
        this.criteriaTreeValidator = new CriteriaSurfaceValidator();
        this.filterEditorOperators = {
            _common: [
                { name: 'Equals', _type: 'binary', insertVal: '==', value: BinaryOperatorType.Equal, type: BinaryOperatorType, localizationId: 'StringId.FilterClauseEquals' },
                { name: 'Does not equal', _type: 'binary', hidden: true, reverse: true, value: BinaryOperatorType.Equal, type: BinaryOperatorType, localizationId: 'StringId.FilterClauseDoesNotEqual' },
                { name: 'Does not equal', _type: 'binary', insertVal: '!=', value: BinaryOperatorType.NotEqual, type: BinaryOperatorType, localizationId: 'StringId.FilterClauseDoesNotEqual' },
                { name: 'Equals', _type: 'binary', reverse: true, hidden: true, value: BinaryOperatorType.NotEqual, type: BinaryOperatorType, localizationId: 'StringId.FilterClauseEquals' },
                { name: 'Is greater than', _type: 'binary', insertVal: '>', value: BinaryOperatorType.Greater, type: BinaryOperatorType, localizationId: 'StringId.FilterClauseGreater' },
                { name: 'Is less than or equal to', _type: 'binary', hidden: true, reverse: true, value: BinaryOperatorType.Greater, type: BinaryOperatorType, localizationId: 'StringId.FilterClauseGreater' },
                { name: 'Is greater than or equal to', _type: 'binary', insertVal: '>=', value: BinaryOperatorType.GreaterOrEqual, type: BinaryOperatorType, localizationId: 'StringId.FilterClauseGreaterOrEqual' },
                { name: 'Is less than', _type: 'binary', hidden: true, reverse: true, value: BinaryOperatorType.GreaterOrEqual, type: BinaryOperatorType, localizationId: 'StringId.FilterClauseLess' },
                { name: 'Is less than', _type: 'binary', insertVal: '<', value: BinaryOperatorType.Less, type: BinaryOperatorType, localizationId: 'StringId.FilterClauseLess' },
                { name: 'Is greater than or equal to', _type: 'binary', reverse: true, hidden: true, value: BinaryOperatorType.Less, type: BinaryOperatorType, localizationId: 'StringId.FilterClauseGreaterOrEqual' },
                { name: 'Is less than or equal to', _type: 'binary', insertVal: '<=', value: BinaryOperatorType.LessOrEqual, type: BinaryOperatorType, localizationId: 'StringId.FilterClauseLessOrEqual' },
                { name: 'Is greater than', _type: 'binary', reverse: true, hidden: true, value: BinaryOperatorType.LessOrEqual, type: BinaryOperatorType, localizationId: 'StringId.FilterClauseGreater' },
                { name: 'Is between', _type: 'between', value: 'Between', insertVal: 'Between(, )', paramCount: 1, type: BetweenOperator, localizationId: 'StringId.FilterClauseBetween' },
                { name: 'Is not between', _type: 'between', value: 'Between', insertVal: 'Between(, )', paramCount: 1, type: BetweenOperator, reverse: true, localizationId: 'StringId.FilterClauseNotBetween' }
            ],
            string: [],
            guid: [],
            integer: [],
            float: [],
            date: [],
            list: [],
            group: [],
            bool: []
        };
        this.onChange = () => { };
        this.onEditorFocusOut = (criteria) => { };
        this.onSave = (criteria) => { };
        this.onClosing = () => { };
        this.handlers = {
            create: (criteria, popupService) => {
                return {
                    data: new FilterEditorAddOn(criteria, popupService, 'create', 'createItems'),
                    templateName: 'dx-filtereditor-create'
                };
            },
            change: (criteria, popupService) => {
                return {
                    data: new FilterEditorAddOn(criteria, popupService, 'change', 'items'),
                    templateName: 'dx-filtereditor-change'
                };
            },
            changeProperty: (criteria, popupService) => {
                return {
                    data: new FilterEditorAddOn(criteria, popupService, 'changeProperty', 'items', 'dx-filtereditor-popup-treelist'),
                    templateName: 'dx-filtereditor-changeProperty'
                };
            },
            changeValueType: (criteria, popupService) => {
                return {
                    data: new FilterEditorAddOn(criteria, popupService, 'changeValueType', 'changeTypeItems'),
                    templateName: 'dx-filtereditor-changeValueType'
                };
            },
            changeParameter: (criteria, popupService) => {
                return {
                    data: new FilterEditorAddOn(criteria, popupService, 'changeParameter', 'items'),
                    templateName: 'dx-filtereditor-changeParameter'
                };
            }
        };
        this.mapper = {
            aggregate: AggregateOperandSurface,
            property: OperandPropertySurface,
            parameter: OperandParameterSurface,
            value: OperandValueSurface,
            group: GroupOperandSurface,
            between: BetweenOperandSurface,
            binary: BinaryOperandSurface,
            function: FunctionOperandSurface,
            in: InOperandSurface,
            unary: UnaryOperandSurface,
            default: CriteriaOperatorSurface
        };
        this.serializer = serializer || new FilterEditorSerializer();
        this.filterEditorOperators.string = [].concat(this.filterEditorOperators._common, [
            { name: 'Contains', _type: 'function', insertVal: 'Contains(, )', value: FunctionOperatorType.Contains, type: FunctionOperatorType, localizationId: 'StringId.FilterClauseContains' },
            { name: 'Does not contain', _type: 'function', value: FunctionOperatorType.Contains, type: FunctionOperatorType, reverse: true, localizationId: 'StringId.FilterClauseDoesNotContain' },
            { name: 'Begins with', _type: 'function', insertVal: 'StartsWith(, )', value: FunctionOperatorType.StartsWith, type: FunctionOperatorType, localizationId: 'StringId.FilterClauseBeginsWith' },
            { name: 'Ends with', _type: 'function', insertVal: 'StartsWith(, )', value: FunctionOperatorType.EndsWith, type: FunctionOperatorType, localizationId: 'StringId.FilterClauseEndsWith' },
            { name: 'Is like', _type: 'binary', insertVal: 'Like', value: BinaryOperatorType.Like, type: BinaryOperatorType, localizationId: 'StringId.FilterClauseLike' },
            { name: 'Is not like', _type: 'binary', insertVal: 'Not Like', value: BinaryOperatorType.Like, type: BinaryOperatorType, reverse: true, localizationId: 'StringId.FilterClauseNotLike' },
            { name: 'Is any of', _type: 'in', value: 'In', insertVal: 'In()', paramCount: 1, type: InOperator, localizationId: 'StringId.FilterClauseAnyOf' },
            { name: 'Is none of', _type: 'in', value: 'In', type: InOperator, reverse: true, localizationId: 'StringId.FilterClauseNoneOf' },
            { name: 'Is blank', _type: 'function', insertVal: 'IsNullOrEmpty()', emptyRightPart: true, value: FunctionOperatorType.IsNullOrEmpty, type: FunctionOperatorType, localizationId: 'StringId.FilterClauseIsNullOrEmpty' },
            { name: 'Is not blank', _type: 'function', insertVal: 'Not IsNullOrEmpty()', emptyRightPart: true, value: FunctionOperatorType.IsNullOrEmpty, type: FunctionOperatorType, reverse: true, localizationId: 'StringId.FilterClauseIsNotNullOrEmpty' }
        ]);
        this.filterEditorOperators.guid = this.filterEditorOperators.string;
        this.filterEditorOperators.integer = [].concat(this.filterEditorOperators._common, [
            { name: 'Is null', _type: 'unary', insertVal: 'Is Null', value: UnaryOperatorType.IsNull, type: UnaryOperatorType, localizationId: 'StringId.FilterClauseIsNull' },
            { name: 'Is not null', _type: 'unary', insertVal: 'Is Not Null', value: UnaryOperatorType.IsNull, type: UnaryOperatorType, reverse: true, localizationId: 'StringId.FilterClauseIsNotNull' },
            { name: 'Is any of', _type: 'in', value: 'In', insertVal: 'In()', paramCount: 1, type: InOperator, localizationId: 'StringId.FilterClauseAnyOf' },
            { name: 'Is none of', _type: 'in', value: 'In', type: InOperator, reverse: true, localizationId: 'StringId.FilterClauseNoneOf' },
        ]);
        this.filterEditorOperators.float = this.filterEditorOperators.integer;
        this.filterEditorOperators.bool = this.filterEditorOperators.integer;
        this.filterEditorOperators.date = [].concat(this.filterEditorOperators._common, [
            { name: 'Is null', _type: 'unary', insertVal: 'Is Null', value: UnaryOperatorType.IsNull, type: UnaryOperatorType, localizationId: 'StringId.FilterClauseIsNull' },
            { name: 'Is not null', _type: 'unary', insertVal: 'Is Not Null', value: UnaryOperatorType.IsNull, type: UnaryOperatorType, reverse: true, localizationId: 'StringId.FilterClauseIsNotNull' },
            { name: 'Is any of', _type: 'in', value: 'In', insertVal: 'In()', type: InOperator, localizationId: 'StringId.FilterClauseAnyOf' },
            { name: 'Is none of', _type: 'in', value: 'In', type: InOperator, reverse: true, localizationId: 'StringId.FilterClauseNoneOf' },
            { name: 'Is beyond this year', _type: 'function', insertVal: 'IsOutlookIntervalBeyondThisYear()', emptyRightPart: true, value: FunctionOperatorType.IsOutlookIntervalBeyondThisYear, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsOutlookIntervalBeyondThisYear' },
            { name: 'Is next week', _type: 'function', insertVal: 'IsOutlookIntervalNextWeek()', emptyRightPart: true, value: FunctionOperatorType.IsOutlookIntervalNextWeek, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsOutlookIntervalNextWeek' },
            { name: 'Is tomorrow', _type: 'function', insertVal: 'IsOutlookIntervalTomorrow()', emptyRightPart: true, value: FunctionOperatorType.IsOutlookIntervalTomorrow, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsOutlookIntervalTomorrow' },
            { name: 'Is today', _type: 'function', insertVal: 'IsOutlookIntervalToday()', emptyRightPart: true, value: FunctionOperatorType.IsOutlookIntervalToday, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsOutlookIntervalToday' },
            { name: 'Is yesterday', _type: 'function', insertVal: 'IsOutlookIntervalYesterday()', emptyRightPart: true, value: FunctionOperatorType.IsOutlookIntervalYesterday, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsOutlookIntervalYesterday' },
            { name: 'Is last week', _type: 'function', insertVal: 'IsOutlookIntervalLastWeek()', emptyRightPart: true, value: FunctionOperatorType.IsOutlookIntervalLastWeek, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsOutlookIntervalLastWeek' },
            { name: 'Is prior this year', _type: 'function', insertVal: 'IsOutlookIntervalPriorThisYear()', emptyRightPart: true, value: FunctionOperatorType.IsOutlookIntervalPriorThisYear, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsOutlookIntervalPriorThisYear' },
            { name: 'Is same day', _type: 'function', insertVal: 'IsSameDay(, )', value: FunctionOperatorType.IsSameDay, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsSameDay' },
            { name: 'Is this month', _type: 'function', insertVal: 'IsThisMonth()', emptyRightPart: true, value: FunctionOperatorType.IsThisMonth, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsThisMonth' },
            { name: 'Is this week', _type: 'function', insertVal: 'IsThisWeek()', emptyRightPart: true, value: FunctionOperatorType.IsThisWeek, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsThisWeek' },
            { name: 'Is this year', _type: 'function', insertVal: 'IsThisYear()', emptyRightPart: true, value: FunctionOperatorType.IsThisYear, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsThisYear' },
            { name: 'Is next month', _type: 'function', insertVal: 'IsNextMonth', emptyRightPart: true, value: FunctionOperatorType.IsNextMonth, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsNextMonth' },
            { name: 'Is next year', _type: 'function', insertVal: 'IsNextYear()', emptyRightPart: true, value: FunctionOperatorType.IsNextYear, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsNextYear' },
            { name: 'Is last month', _type: 'function', insertVal: 'IsLastMonth()', emptyRightPart: true, value: FunctionOperatorType.IsLastMonth, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsLastMonth' },
            { name: 'Is last year', _type: 'function', insertVal: 'IsLastYear()', emptyRightPart: true, value: FunctionOperatorType.IsLastYear, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsLastYear' },
            { name: 'Is the year-to-date period', _type: 'function', insertVal: 'IsYearToDate()', emptyRightPart: true, value: FunctionOperatorType.IsYearToDate, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsYearToDate' },
            { name: 'Is January', _type: 'function', insertVal: 'IsJanuary()', emptyRightPart: true, value: FunctionOperatorType.IsJanuary, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsJanuary' },
            { name: 'Is February', _type: 'function', insertVal: 'IsFebruary()', emptyRightPart: true, value: FunctionOperatorType.IsFebruary, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsFebruary' },
            { name: 'Is March', _type: 'function', insertVal: 'IsMarch()', emptyRightPart: true, value: FunctionOperatorType.IsMarch, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsMarch' },
            { name: 'Is April', _type: 'function', insertVal: 'IsApril()', emptyRightPart: true, value: FunctionOperatorType.IsApril, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsApril' },
            { name: 'Is May', _type: 'function', insertVal: 'IsMay()', emptyRightPart: true, value: FunctionOperatorType.IsMay, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsMay' },
            { name: 'Is June', _type: 'function', insertVal: 'IsJune()', emptyRightPart: true, value: FunctionOperatorType.IsJune, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsJune' },
            { name: 'Is July', _type: 'function', insertVal: 'IsJuly()', emptyRightPart: true, value: FunctionOperatorType.IsJuly, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsJuly' },
            { name: 'Is August', _type: 'function', insertVal: 'IsAugust()', emptyRightPart: true, value: FunctionOperatorType.IsAugust, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsAugust' },
            { name: 'Is September', _type: 'function', insertVal: 'IsSeptember()', emptyRightPart: true, value: FunctionOperatorType.IsSeptember, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsSeptember' },
            { name: 'Is October', _type: 'function', insertVal: 'IsOctober()', emptyRightPart: true, value: FunctionOperatorType.IsOctober, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsOctober' },
            { name: 'Is November', _type: 'function', insertVal: 'IsNovember()', emptyRightPart: true, value: FunctionOperatorType.IsNovember, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsNovember' },
            { name: 'Is December', _type: 'function', insertVal: 'IsDecember()', emptyRightPart: true, value: FunctionOperatorType.IsDecember, type: FunctionOperatorType, localizationId: 'StringId.FilterCriteriaToStringFunctionIsDecember' },
        ]);
        this.filterEditorOperators.list = [
            { name: 'Exists', _type: 'aggregate', value: 'Exists', insertVal: 'Exists()', type: AggregateOperand, localizationId: 'StringId.FilterAggregateExists' },
            { name: 'Count', _type: 'aggregate', value: 'Count', insertVal: 'Count()', type: AggregateOperand, localizationId: 'StringId.FilterAggregateCount' },
            { name: 'Max', _type: 'aggregate', value: 'Max', insertVal: 'Max()', type: AggregateOperand, localizationId: 'StringId.FilterAggregateMax' },
            { name: 'Min', _type: 'aggregate', value: 'Min', insertVal: 'Min()', type: AggregateOperand, localizationId: 'StringId.FilterAggregateMin' },
            { name: 'Sum', _type: 'aggregate', value: 'Sum', insertVal: 'Sum()', type: AggregateOperand, localizationId: 'StringId.FilterAggregateSum' },
            { name: 'Avg', _type: 'aggregate', value: 'Avg', insertVal: 'Avg()', type: AggregateOperand, localizationId: 'StringId.FilterAggregateAvg' }
        ];
        this.filterEditorOperators.group = [
            { name: 'And', _type: 'group', insertVal: 'And', value: GroupOperatorType.And, type: GroupOperatorType, localizationId: 'StringId.FilterGroupAnd' },
            { name: 'Or', _type: 'group', insertVal: 'Or', value: GroupOperatorType.Or, type: GroupOperatorType, localizationId: 'StringId.FilterGroupOr' },
            { name: 'Not And', _type: 'group', value: GroupOperatorType.And, reverse: true, type: GroupOperatorType, localizationId: 'StringId.FilterGroupNotAnd' },
            { name: 'Not Or', _type: 'group', value: GroupOperatorType.Or, reverse: true, type: GroupOperatorType, localizationId: 'StringId.FilterGroupNotOr' },
        ];
        this._initDisplayText();
    }
    get _allFilterEditorOperators() {
        const operators = [];
        Object.keys(this.filterEditorOperators).forEach(propertyName => {
            operators.push(...this.filterEditorOperators[propertyName]);
        });
        return operators;
    }
    _getFilterEditorOperator(item, items, reverse) {
        return items.filter(x => x.value === item.operatorType && x.type === item.enumType && x.reverse === reverse)[0];
    }
    _initDisplayText() {
        Object.keys(this.filterEditorOperators).forEach(specific => {
            this.filterEditorOperators[specific].forEach(initDisplayText);
        });
    }
    registrateOperator(specific, targetEnum, value, name, opreatorType = 'function', reverse = false, localizationId) {
        if (this.filterEditorOperators[specific]) {
            if (!targetEnum[value]) {
                let maxNumber = 0;
                let index = 0;
                $.each(targetEnum, (name, _) => {
                    index = parseInt(name);
                    if (!isNaN(index) && maxNumber < index) {
                        maxNumber = index;
                    }
                });
                maxNumber++;
                targetEnum[maxNumber] = value;
                targetEnum[value] = maxNumber;
            }
            const newOperator = { name: name, value: targetEnum[value], type: targetEnum, _type: opreatorType, reverse: reverse, displayText: getLocalization(name, localizationId) };
            this.filterEditorOperators[specific].push(newOperator);
        }
    }
    generateTreelistOptions(fieldListProvider, path) {
        const treeListOptions = ko.observable(null);
        const selected = ko.observable(null);
        return {
            subscription: ko.computed(() => {
                treeListOptions({
                    itemsProvider: ko.unwrap(fieldListProvider),
                    selectedPath: ko.observable(''),
                    selected: selected,
                    path: ko.unwrap(path),
                    treeListController: new FilterEditorTreeListController(selected),
                    rtl: this.rtl
                });
            }),
            options: treeListOptions
        };
    }
}
export const DefaultFilterEditorHelper = createGlobalModuleVariableFunc(FilterEditorHelper);
export function _setDefaultFilterEditorHelper(helperType) {
    DefaultFilterEditorHelper(helperType);
}
