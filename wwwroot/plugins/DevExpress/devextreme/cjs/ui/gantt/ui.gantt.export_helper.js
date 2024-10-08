/**
 * DevExtreme (cjs/ui/gantt/ui.gantt.export_helper.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.GanttExportHelper = void 0;
var _window = require("../../core/utils/window");
var _uiGrid_core = _interopRequireDefault(require("../grid_core/ui.grid_core.utils"));
var _type = require("../../core/utils/type");
var _date = _interopRequireDefault(require("../../localization/date"));
var _number = _interopRequireDefault(require("../../localization/number"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const window = (0, _window.getWindow)();
const TREELIST_EMPTY_SPACE = "dx-treelist-empty-space";
const TREELIST_TABLE = "dx-treelist-table";
let GanttExportHelper = function() {
    function GanttExportHelper(gantt) {
        this._gantt = gantt;
        this._treeList = gantt._treeList;
        this._cache = {}
    }
    var _proto = GanttExportHelper.prototype;
    _proto.reset = function() {
        this._cache = {}
    };
    _proto.getTreeListTableStyle = function() {
        const table = this._getTreeListTable();
        const style = window.getComputedStyle(table);
        return {
            color: style.color,
            backgroundColor: style.backgroundColor,
            fontSize: style.fontSize,
            fontFamily: style.fontFamily,
            fontWeight: style.fontWeight,
            fontStyle: style.fontStyle,
            textAlign: "left",
            verticalAlign: "middle"
        }
    };
    _proto.getTreeListColCount = function() {
        const headerView = this._getHeaderView();
        const widths = headerView.getColumnWidths().filter(w => w > 0);
        return widths.length
    };
    _proto.getTreeListHeaderInfo = function(colIndex) {
        const element = this._getHeaderElement(colIndex);
        if (!element) {
            return null
        }
        const style = window.getComputedStyle(element);
        const styleForExport = {
            color: style.color,
            padding: style.padding,
            paddingLeft: style.paddingLeft,
            paddingTop: style.paddingTop,
            paddingRight: style.paddingRight,
            paddingBottom: style.paddingBottom,
            verticalAlign: style.verticalAlign,
            width: this._getColumnWidth(colIndex)
        };
        return {
            content: element.textContent,
            styles: styleForExport
        }
    };
    _proto.getTreeListCellInfo = function(key, colIndex) {
        var _cell$textContent;
        const node = this._treeList.getNodeByKey(key);
        const visibleRowIndex = this._treeList.getRowIndexByKey(key);
        const cell = visibleRowIndex > -1 ? this._getDataCell(visibleRowIndex, colIndex) : null;
        const style = cell ? window.getComputedStyle(cell) : this._getColumnCellStyle(colIndex);
        const styleForExport = {
            color: style.color,
            padding: style.padding,
            paddingLeft: style.paddingLeft,
            paddingTop: style.paddingTop,
            paddingRight: style.paddingRight,
            paddingBottom: style.paddingBottom,
            width: this._getColumnWidth(colIndex)
        };
        if (0 === colIndex) {
            styleForExport.extraLeftPadding = this._getEmptySpaceWidth(node.level)
        }
        return {
            content: null !== (_cell$textContent = null === cell || void 0 === cell ? void 0 : cell.textContent) && void 0 !== _cell$textContent ? _cell$textContent : this._getDisplayText(key, colIndex),
            styles: styleForExport
        }
    };
    _proto.getTreeListEmptyDataCellInfo = function() {
        return {
            content: this._treeList.option("noDataText")
        }
    };
    _proto._ensureColumnWidthCache = function(colIndex) {
        var _this$_cache, _this$_cache$_columnW;
        null !== (_this$_cache$_columnW = (_this$_cache = this._cache)["columnWidths"]) && void 0 !== _this$_cache$_columnW ? _this$_cache$_columnW : _this$_cache.columnWidths = {};
        if (!this._cache.columnWidths[colIndex]) {
            var _header$clientWidth;
            const header = this._getHeaderElement(colIndex);
            this._cache.columnWidths[colIndex] = null !== (_header$clientWidth = null === header || void 0 === header ? void 0 : header.clientWidth) && void 0 !== _header$clientWidth ? _header$clientWidth : 0
        }
    };
    _proto._getColumnWidth = function(colIndex) {
        this._ensureColumnWidthCache(colIndex);
        const widths = this._cache.columnWidths;
        return widths && widths[colIndex]
    };
    _proto._getEmptySpaceWidth = function(level) {
        if (!this._cache.emptyWidth) {
            var _this$_cache2, _this$_cache2$_emptyW, _element$offsetWidth;
            const element = this._getTreeListElement(TREELIST_EMPTY_SPACE);
            null !== (_this$_cache2$_emptyW = (_this$_cache2 = this._cache)["emptyWidth"]) && void 0 !== _this$_cache2$_emptyW ? _this$_cache2$_emptyW : _this$_cache2.emptyWidth = null !== (_element$offsetWidth = element.offsetWidth) && void 0 !== _element$offsetWidth ? _element$offsetWidth : 0
        }
        return this._cache.emptyWidth * (level + 1)
    };
    _proto._getColumnCellStyle = function(colIndex) {
        this._ensureColumnCellStyleCache(colIndex);
        return this._cache.columnStyles[colIndex]
    };
    _proto._ensureColumnCellStyleCache = function(colIndex) {
        var _this$_cache3, _this$_cache3$_column;
        null !== (_this$_cache3$_column = (_this$_cache3 = this._cache)["columnStyles"]) && void 0 !== _this$_cache3$_column ? _this$_cache3$_column : _this$_cache3.columnStyles = {};
        if (!this._cache.columnStyles[colIndex]) {
            const cell = this._getDataCell(0, colIndex);
            this._cache.columnStyles[colIndex] = window.getComputedStyle(cell)
        }
    };
    _proto._getTask = function(key) {
        this._ensureTaskCache(key);
        return this._cache.tasks[key]
    };
    _proto._ensureTaskCache = function(key) {
        var _this$_cache4, _this$_cache4$_tasks, _this$_cache$tasks, _this$_cache$tasks$ke;
        null !== (_this$_cache4$_tasks = (_this$_cache4 = this._cache)["tasks"]) && void 0 !== _this$_cache4$_tasks ? _this$_cache4$_tasks : _this$_cache4.tasks = {};
        null !== (_this$_cache$tasks$ke = (_this$_cache$tasks = this._cache.tasks)[key]) && void 0 !== _this$_cache$tasks$ke ? _this$_cache$tasks$ke : _this$_cache$tasks[key] = this._gantt._findTaskByKey(key)
    };
    _proto._getTreeListTable = function() {
        return this._getTreeListElement(TREELIST_TABLE)
    };
    _proto._getTreeListElement = function(className) {
        return this._treeList._$element.find("." + className).get(0)
    };
    _proto._getDataCell = function(rowIndex, colIndex) {
        const treeList = this._treeList;
        const cellElement = treeList.getCellElement(rowIndex, colIndex);
        return cellElement && cellElement.length ? cellElement[0] : cellElement
    };
    _proto._getHeaderElement = function(index) {
        return this._getHeaderView().getHeaderElement(index).get(0)
    };
    _proto._getHeaderView = function() {
        return this._treeList._views.columnHeadersView
    };
    _proto._getDisplayText = function(key, colIndex) {
        const task = this._getTask(key);
        return task && this._getGridDisplayText(colIndex, task)
    };
    _proto._getGridDisplayText = function(colIndex, data) {
        const columns = this._treeList.getController("columns").getColumns();
        const column = columns[colIndex];
        const field = null === column || void 0 === column ? void 0 : column.dataField;
        const format = null === column || void 0 === column ? void 0 : column.format;
        const value = _uiGrid_core.default.getDisplayValue(column, data[field], data, "data");
        if ((0, _type.isDefined)(format)) {
            if ("date" === (null === column || void 0 === column ? void 0 : column.dataType) || "datetime" === (null === column || void 0 === column ? void 0 : column.dataType)) {
                const date = (0, _type.isDate)(value) ? value : new Date(value);
                return _date.default.format(date, format)
            }
            if ((0, _type.isNumeric)(value)) {
                return _number.default.format(value, format)
            }
        }
        return "string" === typeof value ? value : null === value || void 0 === value ? void 0 : value.toString()
    };
    return GanttExportHelper
}();
exports.GanttExportHelper = GanttExportHelper;
