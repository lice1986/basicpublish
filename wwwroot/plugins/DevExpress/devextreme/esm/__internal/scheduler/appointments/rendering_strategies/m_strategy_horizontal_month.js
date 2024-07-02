/**
 * DevExtreme (esm/__internal/scheduler/appointments/rendering_strategies/m_strategy_horizontal_month.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import dateUtils from "../../../../core/utils/date";
import {
    getGroupWidth
} from "../../workspaces/helpers/m_position_helper";
import HorizontalMonthLineRenderingStrategy from "./m_strategy_horizontal_month_line";
var MONTH_APPOINTMENT_HEIGHT_RATIO = .6;
var MONTH_APPOINTMENT_MIN_OFFSET = 26;
var MONTH_APPOINTMENT_MAX_OFFSET = 30;
var MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET = 36;
var MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET = 60;
var toMs = dateUtils.dateToMilliseconds;
class HorizontalMonthRenderingStrategy extends HorizontalMonthLineRenderingStrategy {
    get endViewDate() {
        return this.options.endViewDate
    }
    get adaptivityEnabled() {
        return this.options.adaptivityEnabled
    }
    get DOMMetaData() {
        return this.options.DOMMetaData
    }
    _getLeftPosition(settings) {
        var fullWeekAppointmentWidth = this.getGroupWidth(settings.groupIndex);
        return this._calculateMultiWeekAppointmentLeftOffset(settings.hMax, fullWeekAppointmentWidth)
    }
    _getChunkCount(fullChunksWidth, firstChunkWidth, weekWidth, settings) {
        var {
            groupIndex: groupIndex,
            info: {
                appointment: {
                    startDate: startDate
                }
            }
        } = settings;
        var rawFullChunksWidth = fullChunksWidth - firstChunkWidth + weekWidth;
        var allChunksCount = Math.ceil(rawFullChunksWidth / weekWidth);
        var viewRowIndex = this._tryGetRowIndexInView(startDate);
        if (void 0 !== viewRowIndex) {
            var viewChunksCount = this.viewDataProvider.getRowCountInGroup(groupIndex);
            var allowedChunksCount = viewChunksCount - viewRowIndex;
            return allChunksCount <= allowedChunksCount ? allChunksCount : allowedChunksCount
        }
        return allChunksCount
    }
    _tryGetRowIndexInView(positionStartDate) {
        var _a;
        var columnsCount = this.viewDataProvider.getColumnsCount();
        if ((null === (_a = this.options.dataRange) || void 0 === _a ? void 0 : _a.length) < 1 || !columnsCount) {
            return
        }
        var [startViewDate] = this.options.dateRange;
        var dayDurationMs = toMs("day");
        var timeFromStart = positionStartDate.getTime() - startViewDate.getTime();
        return Math.floor(timeFromStart / dayDurationMs / columnsCount)
    }
    _getChunkWidths(geometry, settings, weekWidth) {
        var firstChunkWidth = geometry.reducedWidth;
        var fullChunksWidth = Math.floor(geometry.sourceAppointmentWidth);
        var widthWithoutFirstChunk = fullChunksWidth - firstChunkWidth;
        return [firstChunkWidth, fullChunksWidth, widthWithoutFirstChunk]
    }
    _getTailChunkSettings(withoutFirstChunkWidth, weekWidth, leftPosition) {
        var tailChunkWidth = withoutFirstChunkWidth % weekWidth || weekWidth;
        var rtlPosition = leftPosition + (weekWidth - tailChunkWidth);
        var tailChunkLeftPosition = this.rtlEnabled ? rtlPosition : leftPosition;
        return [tailChunkWidth, tailChunkLeftPosition]
    }
    _getAppointmentParts(geometry, settings) {
        var result = [];
        var weekWidth = Math.round(this.getGroupWidth(settings.groupIndex));
        var [firstChunkWidth, fullChunksWidth, withoutFirstChunkWidth] = this._getChunkWidths(geometry, settings, weekWidth);
        var leftPosition = this._getLeftPosition(settings);
        var {
            endDate: endDate
        } = settings.info.appointment;
        var hasTailChunk = this.endViewDate > endDate;
        var chunkCount = this._getChunkCount(fullChunksWidth, firstChunkWidth, weekWidth, settings);
        var [tailChunkWidth, tailChunkLeftPosition] = this._getTailChunkSettings(withoutFirstChunkWidth, weekWidth, leftPosition);
        for (var chunkIndex = 1; chunkIndex < chunkCount; chunkIndex++) {
            var topPosition = settings.top + this.cellHeight * chunkIndex;
            var isTailChunk = hasTailChunk && chunkIndex === chunkCount - 1;
            result.push(_extends(_extends({}, settings), {
                top: topPosition,
                left: isTailChunk ? tailChunkLeftPosition : leftPosition,
                height: geometry.height,
                width: isTailChunk ? tailChunkWidth : weekWidth,
                appointmentReduced: isTailChunk ? "tail" : "body",
                rowIndex: ++settings.rowIndex,
                columnIndex: 0
            }))
        }
        return result
    }
    _calculateMultiWeekAppointmentLeftOffset(max, width) {
        return this.rtlEnabled ? max : max - width
    }
    getGroupWidth(groupIndex) {
        return getGroupWidth(groupIndex, this.viewDataProvider, {
            intervalCount: this.options.intervalCount,
            currentDate: this.options.currentDate,
            viewType: this.options.viewType,
            hoursInterval: this.options.hoursInterval,
            startDayHour: this.options.startDayHour,
            endDayHour: this.options.endDayHour,
            isVirtualScrolling: this.isVirtualScrolling,
            rtlEnabled: this.rtlEnabled,
            DOMMetaData: this.DOMMetaData
        })
    }
    _getAppointmentDefaultHeight() {
        return this._getAppointmentHeightByTheme()
    }
    _getAppointmentMinHeight() {
        return this._getAppointmentDefaultHeight()
    }
    createTaskPositionMap(items) {
        return super.createTaskPositionMap(items, true)
    }
    _getSortedPositions(map) {
        return super._getSortedPositions(map, true)
    }
    _getDefaultRatio() {
        return MONTH_APPOINTMENT_HEIGHT_RATIO
    }
    _getOffsets() {
        return {
            unlimited: MONTH_APPOINTMENT_MIN_OFFSET,
            auto: MONTH_APPOINTMENT_MAX_OFFSET
        }
    }
    getDropDownAppointmentWidth(intervalCount, isAllDay) {
        if (this.adaptivityEnabled) {
            return this.getDropDownButtonAdaptiveSize()
        }
        var offset = intervalCount > 1 ? MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET : MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET;
        return this.cellWidth - offset
    }
    needCorrectAppointmentDates() {
        return false
    }
    _needVerticalGroupBounds() {
        return false
    }
    _needHorizontalGroupBounds() {
        return true
    }
}
export default HorizontalMonthRenderingStrategy;
