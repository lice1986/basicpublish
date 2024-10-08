﻿/**
* DevExpress Analytics (widgets\expressioneditor\tools\_functions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '../../../serializer/_utils';
import { createGlobalModuleVariableFunc } from '../../../serializer/_internal';
const defaultFunctionDisplay = [
    {
        display: 'Aggregate',
        localizationId: 'DataAccessStringId.ExpressionEditor_FunctionCategory_Aggregate',
        category: 'Aggregate',
        items: {
            Avg: [{ paramCount: 1, text: '[].Avg()', displayName: 'Avg()', descriptionStringId: 'ExpressionEditorStringId.Function_AvgAggregate' }],
            Count: [{ paramCount: 1, text: '[].Count()', displayName: 'Count()', descriptionStringId: 'ExpressionEditorStringId.Function_CountAggregate' }],
            Exists: [{ paramCount: 1, text: '[].Exists()', displayName: 'Exists()', descriptionStringId: 'ExpressionEditorStringId.Function_ExistsAggregate' }],
            Max: [{ paramCount: 1, text: '[].Max()', displayName: 'Max()', descriptionStringId: 'ExpressionEditorStringId.Function_MaxAggregate' }],
            Min: [{ paramCount: 1, text: '[].Min()', displayName: 'Min()', descriptionStringId: 'ExpressionEditorStringId.Function_MinAggregate' }],
            Single: [{ paramCount: 1, text: '[].Single()', displayName: 'Single()', descriptionStringId: 'ExpressionEditorStringId.Function_SingleAggregate' }],
            Sum: [{ paramCount: 1, text: '[].Sum()', displayName: 'Sum()', descriptionStringId: 'ExpressionEditorStringId.Function_SumAggregate' }],
        }
    }, {
        display: 'Date-Time',
        localizationId: 'DataAccessStringId.ExpressionEditor_FunctionCategory_DateTime',
        items: {
            LocalDateTimeThisYear: [{ paramCount: 0, text: 'LocalDateTimeThisYear()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeThisYear' }],
            LocalDateTimeThisMonth: [{ paramCount: 0, text: 'LocalDateTimeThisMonth()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeThisMonth' }],
            LocalDateTimeLastMonth: [{ paramCount: 0, text: 'LocalDateTimeLastMonth()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeLastMonth' }],
            LocalDateTimeLastWeek: [{ paramCount: 0, text: 'LocalDateTimeLastWeek()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeLastWeek' }],
            LocalDateTimeLastYear: [{ paramCount: 0, text: 'LocalDateTimeLastYear()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeLastYear' }],
            LocalDateTimeThisWeek: [{ paramCount: 0, text: 'LocalDateTimeThisWeek()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeThisWeek' }],
            LocalDateTimeYesterday: [{ paramCount: 0, text: 'LocalDateTimeYesterday()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeYesterday' }],
            LocalDateTimeToday: [{ paramCount: 0, text: 'LocalDateTimeToday()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeToday' }],
            LocalDateTimeNow: [{ paramCount: 0, text: 'LocalDateTimeNow()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeNow' }],
            LocalDateTimeTomorrow: [{ paramCount: 0, text: 'LocalDateTimeTomorrow()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeTomorrow' }],
            LocalDateTimeDayAfterTomorrow: [{ paramCount: 0, text: 'LocalDateTimeDayAfterTomorrow()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeDayAfterTomorrow' }],
            LocalDateTimeNextWeek: [{ paramCount: 0, text: 'LocalDateTimeNextWeek()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeNextWeek' }],
            LocalDateTimeTwoMonthsAway: [{ paramCount: 0, text: 'LocalDateTimeTwoMonthsAway()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeTwoMonthsAway' }],
            LocalDateTimeTwoYearsAway: [{ paramCount: 0, text: 'LocalDateTimeTwoYearsAway()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeTwoYearsAway' }],
            LocalDateTimeTwoWeeksAway: [{ paramCount: 0, text: 'LocalDateTimeTwoWeeksAway()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeTwoWeeksAway' }],
            LocalDateTimeNextMonth: [{ paramCount: 0, text: 'LocalDateTimeNextMonth()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeNextMonth' }],
            LocalDateTimeNextYear: [{ paramCount: 0, text: 'LocalDateTimeNextYear()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeNextYear' }],
            LocalDateTimeYearBeforeToday: [{ paramCount: 0, text: 'LocalDateTimeYearBeforeToday()', descriptionStringId: 'ExpressionEditorStringId.Function_LocalDateTimeYearBeforeToday' }],
            InDateRange: [{ paramCount: 3, text: 'InDateRange(, , )', descriptionStringId: 'ExpressionEditorStringId.Function_InDateRange' }],
            IsOutlookIntervalBeyondThisYear: null,
            IsOutlookIntervalNextWeek: null,
            IsOutlookIntervalTomorrow: null,
            IsOutlookIntervalToday: null,
            IsOutlookIntervalYesterday: null,
            IsOutlookIntervalLastWeek: null,
            IsOutlookIntervalPriorThisYear: null,
            IsLastMonth: [{ paramCount: 1, text: 'IsLastMonth()', descriptionStringId: 'ExpressionEditorStringId.Function_IsLastMonth' }],
            IsLastYear: [{ paramCount: 1, text: 'IsLastYear()', descriptionStringId: 'ExpressionEditorStringId.Function_IsLastYear' }],
            IsNextMonth: [{ paramCount: 1, text: 'IsNextMonth()', descriptionStringId: 'ExpressionEditorStringId.Function_IsNextMonth' }],
            IsNextYear: [{ paramCount: 1, text: 'IsNextYear()', descriptionStringId: 'ExpressionEditorStringId.Function_IsNextYear' }],
            IsThisWeek: [{ paramCount: 1, text: 'IsThisWeek()', descriptionStringId: 'ExpressionEditorStringId.Function_IsThisWeek' }],
            IsThisMonth: [{ paramCount: 1, text: 'IsThisMonth()', descriptionStringId: 'ExpressionEditorStringId.Function_IsThisMonth' }],
            IsThisYear: [{ paramCount: 1, text: 'IsThisYear()', descriptionStringId: 'ExpressionEditorStringId.Function_IsThisYear' }],
            IsJanuary: [{ paramCount: 1, text: 'IsJanuary()', descriptionStringId: 'ExpressionEditorStringId.Function_IsJanuary' }],
            IsFebruary: [{ paramCount: 1, text: 'IsFebruary()', descriptionStringId: 'ExpressionEditorStringId.Function_IsFebruary' }],
            IsMarch: [{ paramCount: 1, text: 'IsMarch()', descriptionStringId: 'ExpressionEditorStringId.Function_IsMarch' }],
            IsApril: [{ paramCount: 1, text: 'IsApril()', descriptionStringId: 'ExpressionEditorStringId.Function_IsApril' }],
            IsMay: [{ paramCount: 1, text: 'IsMay()', descriptionStringId: 'ExpressionEditorStringId.Function_IsMay' }],
            IsJune: [{ paramCount: 1, text: 'IsJune()', descriptionStringId: 'ExpressionEditorStringId.Function_IsJune' }],
            IsJuly: [{ paramCount: 1, text: 'IsJuly()', descriptionStringId: 'ExpressionEditorStringId.Function_IsJuly' }],
            IsAugust: [{ paramCount: 1, text: 'IsAugust()', descriptionStringId: 'ExpressionEditorStringId.Function_IsAugust' }],
            IsSeptember: [{ paramCount: 1, text: 'IsSeptember()', descriptionStringId: 'ExpressionEditorStringId.Function_IsSeptember' }],
            IsOctober: [{ paramCount: 1, text: 'IsOctober()', descriptionStringId: 'ExpressionEditorStringId.Function_IsOctober' }],
            IsNovember: [{ paramCount: 1, text: 'IsNovember()', descriptionStringId: 'ExpressionEditorStringId.Function_IsNovember' }],
            IsDecember: [{ paramCount: 1, text: 'IsDecember()', descriptionStringId: 'ExpressionEditorStringId.Function_IsDecember' }],
            IsSameDay: [{ paramCount: 2, text: 'IsSameDay(, )', descriptionStringId: 'ExpressionEditorStringId.Function_IsSameDay' }],
            IsYearToDate: [{ paramCount: 1, text: 'IsYearToDate()', descriptionStringId: 'ExpressionEditorStringId.Function_IsYearToDate' }],
            DateDiffTick: [{ paramCount: 2, text: 'DateDiffTick(, )', descriptionStringId: 'ExpressionEditorStringId.Function_DateDiffTick' }],
            DateDiffSecond: [{ paramCount: 2, text: 'DateDiffSecond(, )', descriptionStringId: 'ExpressionEditorStringId.Function_DateDiffSecond' }],
            DateDiffMilliSecond: [{ paramCount: 2, text: 'DateDiffMilliSecond(, )', descriptionStringId: 'ExpressionEditorStringId.Function_DateDiffMilliSecond' }],
            DateDiffMinute: [{ paramCount: 2, text: 'DateDiffMinute(, )', descriptionStringId: 'ExpressionEditorStringId.Function_DateDiffMinute' }],
            DateDiffHour: [{ paramCount: 2, text: 'DateDiffHour(, )', descriptionStringId: 'ExpressionEditorStringId.Function_DateDiffHour' }],
            DateDiffDay: [{ paramCount: 2, text: 'DateDiffDay(, )', descriptionStringId: 'ExpressionEditorStringId.Function_DateDiffDay' }],
            DateDiffMonth: [{ paramCount: 2, text: 'DateDiffMonth(, )', descriptionStringId: 'ExpressionEditorStringId.Function_DateDiffMonth' }],
            DateDiffYear: [{ paramCount: 2, text: 'DateDiffYear(, )', descriptionStringId: 'ExpressionEditorStringId.Function_DateDiffYear' }],
            DateTimeFromParts: [
                { paramCount: 3, text: 'DateTimeFromParts(, , )', descriptionStringId: 'ExpressionEditorStringId.Function_DateTimeFromParts3' },
                { paramCount: 4, text: 'DateTimeFromParts(, , , )', descriptionStringId: 'ExpressionEditorStringId.Function_DateTimeFromParts4' },
                { paramCount: 5, text: 'DateTimeFromParts(, , , , )', descriptionStringId: 'ExpressionEditorStringId.Function_DateTimeFromParts5' },
                { paramCount: 6, text: 'DateTimeFromParts(, , , , , )', descriptionStringId: 'ExpressionEditorStringId.Function_DateTimeFromParts6' }
            ],
            GetDate: [{ paramCount: 1, text: 'GetDate()', descriptionStringId: 'ExpressionEditorStringId.Function_GetDate' }],
            GetMilliSecond: [{ paramCount: 1, text: 'GetMilliSecond()', descriptionStringId: 'ExpressionEditorStringId.Function_GetMilliSecond' }],
            GetSecond: [{ paramCount: 1, text: 'GetSecond()', descriptionStringId: 'ExpressionEditorStringId.Function_GetSecond' }],
            GetMinute: [{ paramCount: 1, text: 'GetMinute()', descriptionStringId: 'ExpressionEditorStringId.Function_GetMinute' }],
            GetHour: [{ paramCount: 1, text: 'GetHour()', descriptionStringId: 'ExpressionEditorStringId.Function_GetHour' }],
            GetDay: [{ paramCount: 1, text: 'GetDay()', descriptionStringId: 'ExpressionEditorStringId.Function_GetDay' }],
            GetMonth: [{ paramCount: 1, text: 'GetMonth()', descriptionStringId: 'ExpressionEditorStringId.Function_GetMonth' }],
            GetYear: [{ paramCount: 1, text: 'GetYear()', descriptionStringId: 'ExpressionEditorStringId.Function_GetYear' }],
            GetDayOfWeek: [{ paramCount: 1, text: 'GetDayOfWeek()', descriptionStringId: 'ExpressionEditorStringId.Function_GetDayOfWeek' }],
            GetDayOfYear: [{ paramCount: 1, text: 'GetDayOfYear()', descriptionStringId: 'ExpressionEditorStringId.Function_GetDayOfYear' }],
            GetTimeOfDay: [{ paramCount: 1, text: 'GetTimeOfDay()', descriptionStringId: 'ExpressionEditorStringId.Function_GetTimeOfDay' }],
            Now: [{ paramCount: 0, text: 'Now()', descriptionStringId: 'ExpressionEditorStringId.Function_Now' }],
            UtcNow: [{ paramCount: 0, text: 'UtcNow()', descriptionStringId: 'ExpressionEditorStringId.Function_UtcNow' }],
            Today: [{ paramCount: 0, text: 'Today()', descriptionStringId: 'ExpressionEditorStringId.Function_Today' }],
            AddTimeSpan: [{ paramCount: 2, text: 'AddTimeSpan(, )', descriptionStringId: 'ExpressionEditorStringId.Function_AddTimeSpan' }],
            AddTicks: [{ paramCount: 2, text: 'AddTicks(, )', descriptionStringId: 'ExpressionEditorStringId.Function_AddTicks' }],
            AddMilliSeconds: [{ paramCount: 2, text: 'AddMilliSeconds(, )', descriptionStringId: 'ExpressionEditorStringId.Function_AddMilliSeconds' }],
            AddSeconds: [{ paramCount: 2, text: 'AddSeconds(, )', descriptionStringId: 'ExpressionEditorStringId.Function_AddSeconds' }],
            AddMinutes: [{ paramCount: 2, text: 'AddMinutes(, )', descriptionStringId: 'ExpressionEditorStringId.Function_AddMinutes' }],
            AddHours: [{ paramCount: 2, text: 'AddHours(, )', descriptionStringId: 'ExpressionEditorStringId.Function_AddHours' }],
            AddDays: [{ paramCount: 2, text: 'AddDays(, )', descriptionStringId: 'ExpressionEditorStringId.Function_AddDays' }],
            AddMonths: [{ paramCount: 2, text: 'AddMonths(, )', descriptionStringId: 'ExpressionEditorStringId.Function_AddMonths' }],
            AddYears: [{ paramCount: 2, text: 'AddYears(, )', descriptionStringId: 'ExpressionEditorStringId.Function_AddYears' }],
        },
    }, {
        display: 'Logical',
        localizationId: 'DataAccessStringId.ExpressionEditor_FunctionCategory_Logical',
        items: {
            Iif: [{ paramCount: 3, text: 'Iif(, , )', descriptionStringId: 'ExpressionEditorStringId.Function_Iif' }],
            InRange: [{ paramCount: 3, text: 'InRange(, , )', descriptionStringId: 'ExpressionEditorStringId.Function_InRange' }],
            IsNull: [{ paramCount: 1, text: 'IsNull()', descriptionStringId: 'ExpressionEditorStringId.Function_IsNull' }],
            IsNullOrEmpty: [{ paramCount: 1, text: 'IsNullOrEmpty()', descriptionStringId: 'ExpressionEditorStringId.Function_IsNullOrEmpty' }],
        }
    }, {
        display: 'Math',
        localizationId: 'DataAccessStringId.ExpressionEditor_FunctionCategory_Math',
        items: {
            Abs: [{ paramCount: 1, text: 'Abs()', descriptionStringId: 'ExpressionEditorStringId.Function_Abs' }],
            Sqr: [{ paramCount: 1, text: 'Sqr()', descriptionStringId: 'ExpressionEditorStringId.Function_Sqr' }],
            Cos: [{ paramCount: 1, text: 'Cos()', descriptionStringId: 'ExpressionEditorStringId.Function_Cos' }],
            Sin: [{ paramCount: 1, text: 'Sin()', descriptionStringId: 'ExpressionEditorStringId.Function_Sin' }],
            Atn: [{ paramCount: 1, text: 'Atn()', descriptionStringId: 'ExpressionEditorStringId.Function_Atn' }],
            Exp: [{ paramCount: 1, text: 'Exp()', descriptionStringId: 'ExpressionEditorStringId.Function_Exp' }],
            Log: [
                { paramCount: 1, text: 'Log()', descriptionStringId: 'ExpressionEditorStringId.Function_Log' },
                { paramCount: 2, text: 'Log(, )', descriptionStringId: 'ExpressionEditorStringId.Function_Log_2' },
            ],
            Rnd: [{ paramCount: 0, text: 'Rnd()', descriptionStringId: 'ExpressionEditorStringId.Function_Rnd' }],
            Tan: [{ paramCount: 1, text: 'Tan()', descriptionStringId: 'ExpressionEditorStringId.Function_Tan' }],
            Power: [{ paramCount: 2, text: 'Power(, )', descriptionStringId: 'ExpressionEditorStringId.Function_Power' }],
            Sign: [{ paramCount: 1, text: 'Sign()', descriptionStringId: 'ExpressionEditorStringId.Function_Sign' }],
            Round: [
                { paramCount: 1, text: 'Round()', descriptionStringId: 'ExpressionEditorStringId.Function_Round' },
                { paramCount: 2, text: 'Round(, )', descriptionStringId: 'ExpressionEditorStringId.Function_Round_2' },
            ],
            Ceiling: [{ paramCount: 1, text: 'Ceiling()', descriptionStringId: 'ExpressionEditorStringId.Function_Ceiling' }],
            Floor: [{ paramCount: 1, text: 'Floor()', descriptionStringId: 'ExpressionEditorStringId.Function_Floor' }],
            Max: [{ paramCount: 2, text: 'Max(, )', descriptionStringId: 'ExpressionEditorStringId.Function_Max' }],
            Min: [{ paramCount: 2, text: 'Min(, )', descriptionStringId: 'ExpressionEditorStringId.Function_Min' }],
            Acos: [{ paramCount: 1, text: 'Acos()', descriptionStringId: 'ExpressionEditorStringId.Function_Acos' }],
            Asin: [{ paramCount: 1, text: 'Asin()', descriptionStringId: 'ExpressionEditorStringId.Function_Asin' }],
            Atn2: [{ paramCount: 2, text: 'Atn2(, )', descriptionStringId: 'ExpressionEditorStringId.Function_Atn2' }],
            BigMul: [{ paramCount: 2, text: 'BigMul(, )', descriptionStringId: 'ExpressionEditorStringId.Function_BigMul' }],
            Cosh: [{ paramCount: 1, text: 'Cosh()', descriptionStringId: 'ExpressionEditorStringId.Function_Cosh' }],
            Log10: [{ paramCount: 1, text: 'Log10()', descriptionStringId: 'ExpressionEditorStringId.Function_Log10' }],
            Sinh: [{ paramCount: 1, text: 'Sinh()', descriptionStringId: 'ExpressionEditorStringId.Function_Sinh' }],
            Tanh: [{ paramCount: 1, text: 'Tanh()', descriptionStringId: 'ExpressionEditorStringId.Function_Tanh' }],
            ToInt: [{ paramCount: 1, text: 'ToInt()', descriptionStringId: 'ExpressionEditorStringId.Function_ToInt' }],
            ToLong: [{ paramCount: 1, text: 'ToLong()', descriptionStringId: 'ExpressionEditorStringId.Function_ToLong' }],
            ToFloat: [{ paramCount: 1, text: 'ToFloat()', descriptionStringId: 'ExpressionEditorStringId.Function_ToFloat' }],
            ToDouble: [{ paramCount: 1, text: 'ToDouble()', descriptionStringId: 'ExpressionEditorStringId.Function_ToDouble' }],
            ToDecimal: [{ paramCount: 1, text: 'ToDecimal()', descriptionStringId: 'ExpressionEditorStringId.Function_ToDecimal' }],
        }
    }, {
        display: 'String',
        localizationId: 'DataAccessStringId.ExpressionEditor_FunctionCategory_Text',
        items: {
            Trim: [{ paramCount: 1, text: 'Trim()', descriptionStringId: 'ExpressionEditorStringId.Function_Trim' }],
            Len: [{ paramCount: 1, text: 'Len()', descriptionStringId: 'ExpressionEditorStringId.Function_Len' }],
            Substring: [
                { paramCount: 3, text: "Substring('', , )", descriptionStringId: 'ExpressionEditorStringId.Function_Substring_3' },
                { paramCount: 2, text: "Substring('', )", descriptionStringId: 'ExpressionEditorStringId.Function_Substring' }
            ],
            Upper: [{ paramCount: 1, text: 'Upper()', descriptionStringId: 'ExpressionEditorStringId.Function_Upper' }],
            Lower: [{ paramCount: 1, text: 'Lower()', descriptionStringId: 'ExpressionEditorStringId.Function_Lower' }],
            Concat: [{ paramCount: Infinity, text: 'Concat(, )', descriptionStringId: 'ExpressionEditorStringId.Function_Concat' }],
            Ascii: [{ paramCount: 1, text: "Ascii('')", descriptionStringId: 'ExpressionEditorStringId.Function_Ascii' }],
            Char: [{ paramCount: 1, text: 'Char()', descriptionStringId: 'ExpressionEditorStringId.Function_Char' }],
            ToStr: [{ paramCount: 1, text: 'ToStr()', descriptionStringId: 'ExpressionEditorStringId.Function_ToStr' }],
            Replace: [{ paramCount: 3, text: "Replace('','', '')", descriptionStringId: 'ExpressionEditorStringId.Function_Replace' }],
            Reverse: [{ paramCount: 1, text: "Reverse('')", descriptionStringId: 'ExpressionEditorStringId.Function_Reverse' }],
            Insert: [{ paramCount: 3, text: "Insert('', , '')", descriptionStringId: 'ExpressionEditorStringId.Function_Insert' }],
            CharIndex: [
                { paramCount: 2, text: "CharIndex('','')", descriptionStringId: 'ExpressionEditorStringId.Function_CharIndex' },
                { paramCount: 3, text: "CharIndex('','', )", descriptionStringId: 'ExpressionEditorStringId.Function_CharIndex_3' }
            ],
            Remove: [
                { paramCount: 2, text: "Remove('', )", descriptionStringId: 'ExpressionEditorStringId.Function_Remove' },
                { paramCount: 3, text: "Remove('', , )", descriptionStringId: 'ExpressionEditorStringId.Function_Remove_3' }
            ],
            PadLeft: [
                { paramCount: 2, text: 'PadLeft(, )', descriptionStringId: 'ExpressionEditorStringId.Function_PadLeft' },
                { paramCount: 3, text: "PadLeft(, , '')", descriptionStringId: 'ExpressionEditorStringId.Function_PadLeft_3' }
            ],
            PadRight: [
                { paramCount: 2, text: 'PadRight(, )', descriptionStringId: 'ExpressionEditorStringId.Function_PadRight' },
                { paramCount: 3, text: "PadRight(, , '')", descriptionStringId: 'ExpressionEditorStringId.Function_PadRight_3' }
            ],
            StartsWith: [{ paramCount: 2, text: "StartsWith('', '')", descriptionStringId: 'ExpressionEditorStringId.Function_StartsWith' }],
            EndsWith: [{ paramCount: 2, text: "EndsWith('', '')", descriptionStringId: 'ExpressionEditorStringId.Function_EndsWith' }],
            Contains: [{ paramCount: 0, text: "Contains('', '')", descriptionStringId: 'ExpressionEditorStringId.Function_Contains' }],
            Join: [
                { paramCount: 1, text: 'Join()', descriptionStringId: 'ExpressionEditorStringId.Function_Join' },
                { paramCount: 2, text: "Join(, '')", descriptionStringId: 'ExpressionEditorStringId.Function_Join_2' }
            ],
        }
    }
];
export const insertOrUpdateFunctions = (functions, addins) => {
    if (Array.isArray(addins)) {
        addins.forEach(addin => {
            const func = functions.find(x => x.display === addin.display);
            if (!!func) {
                func.items = Object.assign(Object.assign({}, func.items), addin.items);
            }
            else {
                functions.push(addin);
            }
        });
        return functions;
    }
    const result = [];
    functions.forEach(cat => {
        const ext = addins[cat.display];
        const items = extend({}, cat.items, ext);
        if (!Object.keys(items).length)
            return;
        result.push(ext ? {
            display: cat.display, category: cat.category, localizationId: cat.localizationId,
            items: items
        } : cat);
    });
    return result;
};
export const functionDisplay = createGlobalModuleVariableFunc(defaultFunctionDisplay);
export const resetFunctionDisplay = () => functionDisplay(defaultFunctionDisplay);
export function combineFunctionDisplay(addins) {
    const functions = extend(true, [], functionDisplay());
    return insertOrUpdateFunctions(functions, addins);
}
