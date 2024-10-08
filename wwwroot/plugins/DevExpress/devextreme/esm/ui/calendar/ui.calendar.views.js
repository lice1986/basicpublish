/**
 * DevExtreme (esm/ui/calendar/ui.calendar.views.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import $ from "../../core/renderer";
import BaseView from "./ui.calendar.base_view";
import domAdapter from "../../core/dom_adapter";
import {
    noop
} from "../../core/utils/common";
import dateUtils from "../../core/utils/date";
import {
    extend
} from "../../core/utils/extend";
import dateLocalization from "../../localization/date";
import dateSerialization from "../../core/utils/date_serialization";
var CALENDAR_OTHER_MONTH_CLASS = "dx-calendar-other-month";
var CALENDAR_OTHER_VIEW_CLASS = "dx-calendar-other-view";
var CALENDAR_WEEK_NUMBER_CELL_CLASS = "dx-calendar-week-number-cell";
var CALENDAR_WEEK_SELECTION_CLASS = "dx-calendar-week-selection";
var Views = {
    month: BaseView.inherit({
        _getViewName: function() {
            return "month"
        },
        _getDefaultOptions: function() {
            return extend(this.callBase(), {
                firstDayOfWeek: 0,
                rowCount: 6,
                colCount: 7
            })
        },
        _renderImpl: function() {
            this.callBase();
            this._renderHeader()
        },
        _renderBody: function() {
            this.callBase();
            this._$table.find(".".concat(CALENDAR_OTHER_VIEW_CLASS)).addClass(CALENDAR_OTHER_MONTH_CLASS)
        },
        _renderFocusTarget: noop,
        getCellAriaLabel: function(date) {
            return dateLocalization.format(date, "longdate")
        },
        _renderHeader: function() {
            var $headerRow = $("<tr>");
            var $header = $("<thead>").append($headerRow);
            this._$table.prepend($header);
            for (var colIndex = 0, colCount = this.option("colCount"); colIndex < colCount; colIndex++) {
                this._renderHeaderCell(colIndex, $headerRow)
            }
            if (this.option("showWeekNumbers")) {
                this._renderWeekHeaderCell($headerRow)
            }
        },
        _renderHeaderCell: function(cellIndex, $headerRow) {
            var {
                firstDayOfWeek: firstDayOfWeek
            } = this.option();
            var {
                full: fullCaption,
                abbreviated: abbrCaption
            } = this._getDayCaption(firstDayOfWeek + cellIndex);
            var $cell = $("<th>").attr({
                scope: "col",
                abbr: fullCaption
            }).text(abbrCaption);
            $headerRow.append($cell)
        },
        _renderWeekHeaderCell: function($headerRow) {
            var $weekNumberHeaderCell = $("<th>").attr({
                scope: "col",
                abbr: "WeekNumber",
                class: "dx-week-number-header"
            });
            $headerRow.prepend($weekNumberHeaderCell)
        },
        _renderWeekNumberCell: function(rowData) {
            var {
                showWeekNumbers: showWeekNumbers,
                cellTemplate: cellTemplate,
                selectionMode: selectionMode,
                selectWeekOnClick: selectWeekOnClick
            } = this.option();
            if (!showWeekNumbers) {
                return
            }
            var weekNumber = this._getWeekNumber(rowData.prevCellDate);
            var cell = domAdapter.createElement("td");
            var $cell = $(cell);
            cell.className = CALENDAR_WEEK_NUMBER_CELL_CLASS;
            if ("single" !== selectionMode && selectWeekOnClick) {
                $cell.addClass(CALENDAR_WEEK_SELECTION_CLASS)
            }
            if (cellTemplate) {
                cellTemplate.render(this._prepareCellTemplateData(weekNumber, -1, $cell))
            } else {
                cell.innerHTML = weekNumber
            }
            rowData.row.prepend(cell);
            this.setAria({
                role: "gridcell",
                label: "Week ".concat(weekNumber)
            }, $cell)
        },
        _getWeekNumber: function(date) {
            var {
                weekNumberRule: weekNumberRule,
                firstDayOfWeek: firstDayOfWeek
            } = this.option();
            if ("auto" === weekNumberRule) {
                return dateUtils.getWeekNumber(date, firstDayOfWeek, 1 === firstDayOfWeek ? "firstFourDays" : "firstDay")
            }
            return dateUtils.getWeekNumber(date, firstDayOfWeek, weekNumberRule)
        },
        getNavigatorCaption: function() {
            return dateLocalization.format(this.option("date"), "monthandyear")
        },
        _isTodayCell: function(cellDate) {
            var today = this.option("_todayDate")();
            return dateUtils.sameDate(cellDate, today)
        },
        _isDateOutOfRange: function(cellDate) {
            var minDate = this.option("min");
            var maxDate = this.option("max");
            return !dateUtils.dateInRange(cellDate, minDate, maxDate, "date")
        },
        _isOtherView: function(cellDate) {
            return cellDate.getMonth() !== this.option("date").getMonth()
        },
        _isStartDayOfMonth: function(cellDate) {
            return dateUtils.sameDate(cellDate, dateUtils.getFirstMonthDate(this.option("date")))
        },
        _isEndDayOfMonth: function(cellDate) {
            return dateUtils.sameDate(cellDate, dateUtils.getLastMonthDate(this.option("date")))
        },
        _getCellText: function(cellDate) {
            return dateLocalization.format(cellDate, "d")
        },
        _getDayCaption: function(day) {
            var daysInWeek = this.option("colCount");
            var dayIndex = day % daysInWeek;
            return {
                full: dateLocalization.getDayNames()[dayIndex],
                abbreviated: dateLocalization.getDayNames("abbreviated")[dayIndex]
            }
        },
        _getFirstCellData: function() {
            var {
                firstDayOfWeek: firstDayOfWeek
            } = this.option();
            var firstDay = dateUtils.getFirstMonthDate(this.option("date"));
            var firstMonthDayOffset = firstDayOfWeek - firstDay.getDay();
            var daysInWeek = this.option("colCount");
            if (firstMonthDayOffset >= 0) {
                firstMonthDayOffset -= daysInWeek
            }
            firstDay.setDate(firstDay.getDate() + firstMonthDayOffset);
            return firstDay
        },
        _getNextCellData: function(date) {
            date = new Date(date);
            date.setDate(date.getDate() + 1);
            return date
        },
        _getCellByDate: function(date) {
            return this._$table.find("td[data-value='".concat(dateSerialization.serializeDate(date, dateUtils.getShortDateFormat()), "']"))
        },
        isBoundary: function(date) {
            return dateUtils.sameMonthAndYear(date, this.option("min")) || dateUtils.sameMonthAndYear(date, this.option("max"))
        },
        _getDefaultDisabledDatesHandler: function(disabledDates) {
            return function(args) {
                var isDisabledDate = disabledDates.some((function(item) {
                    return dateUtils.sameDate(item, args.date)
                }));
                if (isDisabledDate) {
                    return true
                }
            }
        }
    }),
    year: BaseView.inherit({
        _getViewName: function() {
            return "year"
        },
        _isTodayCell: function(cellDate) {
            var today = this.option("_todayDate")();
            return dateUtils.sameMonthAndYear(cellDate, today)
        },
        _isDateOutOfRange: function(cellDate) {
            return !dateUtils.dateInRange(cellDate, dateUtils.getFirstMonthDate(this.option("min")), dateUtils.getLastMonthDate(this.option("max")))
        },
        _isOtherView: function() {
            return false
        },
        _isStartDayOfMonth: function() {
            return false
        },
        _isEndDayOfMonth: function() {
            return false
        },
        _getCellText: function(cellDate) {
            return dateLocalization.getMonthNames("abbreviated")[cellDate.getMonth()]
        },
        _getFirstCellData: function() {
            var currentDate = this.option("date");
            var data = new Date(currentDate);
            data.setDate(1);
            data.setMonth(0);
            return data
        },
        _getNextCellData: function(date) {
            date = new Date(date);
            date.setMonth(date.getMonth() + 1);
            return date
        },
        _getCellByDate: function(date) {
            var foundDate = new Date(date);
            foundDate.setDate(1);
            return this._$table.find("td[data-value='".concat(dateSerialization.serializeDate(foundDate, dateUtils.getShortDateFormat()), "']"))
        },
        getCellAriaLabel: function(date) {
            return dateLocalization.format(date, "monthandyear")
        },
        getNavigatorCaption: function() {
            return dateLocalization.format(this.option("date"), "yyyy")
        },
        isBoundary: function(date) {
            return dateUtils.sameYear(date, this.option("min")) || dateUtils.sameYear(date, this.option("max"))
        },
        _renderWeekNumberCell: noop
    }),
    decade: BaseView.inherit({
        _getViewName: function() {
            return "decade"
        },
        _isTodayCell: function(cellDate) {
            var today = this.option("_todayDate")();
            return dateUtils.sameYear(cellDate, today)
        },
        _isDateOutOfRange: function(cellDate) {
            var min = this.option("min");
            var max = this.option("max");
            return !dateUtils.dateInRange(cellDate.getFullYear(), min && min.getFullYear(), max && max.getFullYear())
        },
        _isOtherView: function(cellDate) {
            var date = new Date(cellDate);
            date.setMonth(1);
            return !dateUtils.sameDecade(date, this.option("date"))
        },
        _isStartDayOfMonth: function() {
            return false
        },
        _isEndDayOfMonth: function() {
            return false
        },
        _getCellText: function(cellDate) {
            return dateLocalization.format(cellDate, "yyyy")
        },
        _getFirstCellData: function() {
            var year = dateUtils.getFirstYearInDecade(this.option("date")) - 1;
            return dateUtils.createDateWithFullYear(year, 0, 1)
        },
        _getNextCellData: function(date) {
            date = new Date(date);
            date.setFullYear(date.getFullYear() + 1);
            return date
        },
        getNavigatorCaption: function() {
            var currentDate = this.option("date");
            var firstYearInDecade = dateUtils.getFirstYearInDecade(currentDate);
            var startDate = new Date(currentDate);
            var endDate = new Date(currentDate);
            startDate.setFullYear(firstYearInDecade);
            endDate.setFullYear(firstYearInDecade + 9);
            return dateLocalization.format(startDate, "yyyy") + "-" + dateLocalization.format(endDate, "yyyy")
        },
        _isValueOnCurrentView: function(currentDate, value) {
            return dateUtils.sameDecade(currentDate, value)
        },
        _getCellByDate: function(date) {
            var foundDate = new Date(date);
            foundDate.setDate(1);
            foundDate.setMonth(0);
            return this._$table.find("td[data-value='".concat(dateSerialization.serializeDate(foundDate, dateUtils.getShortDateFormat()), "']"))
        },
        isBoundary: function(date) {
            return dateUtils.sameDecade(date, this.option("min")) || dateUtils.sameDecade(date, this.option("max"))
        },
        _renderWeekNumberCell: noop
    }),
    century: BaseView.inherit({
        _getViewName: function() {
            return "century"
        },
        _isTodayCell: function(cellDate) {
            var today = this.option("_todayDate")();
            return dateUtils.sameDecade(cellDate, today)
        },
        _isDateOutOfRange: function(cellDate) {
            var decade = dateUtils.getFirstYearInDecade(cellDate);
            var minDecade = dateUtils.getFirstYearInDecade(this.option("min"));
            var maxDecade = dateUtils.getFirstYearInDecade(this.option("max"));
            return !dateUtils.dateInRange(decade, minDecade, maxDecade)
        },
        _isOtherView: function(cellDate) {
            var date = new Date(cellDate);
            date.setMonth(1);
            return !dateUtils.sameCentury(date, this.option("date"))
        },
        _isStartDayOfMonth: function() {
            return false
        },
        _isEndDayOfMonth: function() {
            return false
        },
        _getCellText: function(cellDate) {
            var startDate = dateLocalization.format(cellDate, "yyyy");
            var endDate = new Date(cellDate);
            endDate.setFullYear(endDate.getFullYear() + 9);
            return startDate + " - " + dateLocalization.format(endDate, "yyyy")
        },
        _getFirstCellData: function() {
            var decade = dateUtils.getFirstDecadeInCentury(this.option("date")) - 10;
            return dateUtils.createDateWithFullYear(decade, 0, 1)
        },
        _getNextCellData: function(date) {
            date = new Date(date);
            date.setFullYear(date.getFullYear() + 10);
            return date
        },
        _getCellByDate: function(date) {
            var foundDate = new Date(date);
            foundDate.setDate(1);
            foundDate.setMonth(0);
            foundDate.setFullYear(dateUtils.getFirstYearInDecade(foundDate));
            return this._$table.find("td[data-value='".concat(dateSerialization.serializeDate(foundDate, dateUtils.getShortDateFormat()), "']"))
        },
        getNavigatorCaption: function() {
            var currentDate = this.option("date");
            var firstDecadeInCentury = dateUtils.getFirstDecadeInCentury(currentDate);
            var startDate = new Date(currentDate);
            var endDate = new Date(currentDate);
            startDate.setFullYear(firstDecadeInCentury);
            endDate.setFullYear(firstDecadeInCentury + 99);
            return dateLocalization.format(startDate, "yyyy") + "-" + dateLocalization.format(endDate, "yyyy")
        },
        isBoundary: function(date) {
            return dateUtils.sameCentury(date, this.option("min")) || dateUtils.sameCentury(date, this.option("max"))
        },
        _renderWeekNumberCell: noop
    })
};
export default Views;
