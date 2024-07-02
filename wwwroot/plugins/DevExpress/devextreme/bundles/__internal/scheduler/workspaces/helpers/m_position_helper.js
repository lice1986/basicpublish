/**
 * DevExtreme (bundles/__internal/scheduler/workspaces/helpers/m_position_helper.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMaxAllowedPosition = exports.getGroupWidth = exports.getCellWidth = exports.getCellHeight = exports.getAllDayHeight = exports.PositionHelper = void 0;

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor
}

function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return "symbol" === typeof key ? key : String(key)
}

function _toPrimitive(input, hint) {
    if ("object" !== typeof input || null === input) {
        return input
    }
    var prim = input[Symbol.toPrimitive];
    if (void 0 !== prim) {
        var res = prim.call(input, hint || "default");
        if ("object" !== typeof res) {
            return res
        }
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return ("string" === hint ? String : Number)(input)
}
const getCellSize = DOMMetaData => {
    const {
        dateTableCellsMeta: dateTableCellsMeta
    } = DOMMetaData;
    const length = null === dateTableCellsMeta || void 0 === dateTableCellsMeta ? void 0 : dateTableCellsMeta.length;
    if (!length) {
        return {
            width: 0,
            height: 0
        }
    }
    const cellIndex = length > 1 ? 1 : 0;
    const cellSize = dateTableCellsMeta[cellIndex][0];
    return {
        width: cellSize.width,
        height: cellSize.height
    }
};
const getMaxAllowedHorizontalPosition = (groupIndex, viewDataProvider, rtlEnabled, DOMMetaData) => {
    const {
        dateTableCellsMeta: dateTableCellsMeta
    } = DOMMetaData;
    const firstRow = dateTableCellsMeta[0];
    if (!firstRow) {
        return 0
    }
    const {
        columnIndex: columnIndex
    } = viewDataProvider.getLastGroupCellPosition(groupIndex);
    const cellPosition = firstRow[columnIndex];
    if (!cellPosition) {
        return 0
    }
    return !rtlEnabled ? cellPosition.left + cellPosition.width : cellPosition.left
};
const getCellHeight = DOMMetaData => getCellSize(DOMMetaData).height;
exports.getCellHeight = getCellHeight;
const getCellWidth = DOMMetaData => getCellSize(DOMMetaData).width;
exports.getCellWidth = getCellWidth;
const getAllDayHeight = (showAllDayPanel, isVerticalGrouping, DOMMetaData) => {
    if (!showAllDayPanel) {
        return 0
    }
    if (isVerticalGrouping) {
        const {
            dateTableCellsMeta: dateTableCellsMeta
        } = DOMMetaData;
        const length = null === dateTableCellsMeta || void 0 === dateTableCellsMeta ? void 0 : dateTableCellsMeta.length;
        return length ? dateTableCellsMeta[0][0].height : 0
    }
    const {
        allDayPanelCellsMeta: allDayPanelCellsMeta
    } = DOMMetaData;
    return (null === allDayPanelCellsMeta || void 0 === allDayPanelCellsMeta ? void 0 : allDayPanelCellsMeta.length) ? allDayPanelCellsMeta[0].height : 0
};
exports.getAllDayHeight = getAllDayHeight;
const getMaxAllowedPosition = (groupIndex, viewDataProvider, rtlEnabled, DOMMetaData) => {
    const validGroupIndex = groupIndex || 0;
    return getMaxAllowedHorizontalPosition(validGroupIndex, viewDataProvider, rtlEnabled, DOMMetaData)
};
exports.getMaxAllowedPosition = getMaxAllowedPosition;
const getGroupWidth = (groupIndex, viewDataProvider, options) => {
    const {
        isVirtualScrolling: isVirtualScrolling,
        rtlEnabled: rtlEnabled,
        DOMMetaData: DOMMetaData
    } = options;
    const cellWidth = getCellWidth(DOMMetaData);
    let result = viewDataProvider.getCellCount(options) * cellWidth;
    if (isVirtualScrolling) {
        const groupedData = viewDataProvider.groupedDataMap.dateTableGroupedMap;
        const groupLength = groupedData[groupIndex][0].length;
        result = groupLength * cellWidth
    }
    const position = getMaxAllowedPosition(groupIndex, viewDataProvider, rtlEnabled, DOMMetaData);
    const currentPosition = position[groupIndex];
    if (currentPosition) {
        if (rtlEnabled) {
            result = currentPosition - position[groupIndex + 1]
        } else if (0 === groupIndex) {
            result = currentPosition
        } else {
            result = currentPosition - position[groupIndex - 1]
        }
    }
    return result
};
exports.getGroupWidth = getGroupWidth;
let PositionHelper = function() {
    function PositionHelper(options) {
        this.options = options;
        this.groupStrategy = this.options.isVerticalGrouping ? new GroupStrategyBase(this.options) : new GroupStrategyHorizontal(this.options)
    }
    var _proto = PositionHelper.prototype;
    _proto.getHorizontalMax = function(groupIndex) {
        const getMaxPosition = groupIndex => getMaxAllowedPosition(groupIndex, this.viewDataProvider, this.rtlEnabled, this.DOMMetaData);
        if (this.isGroupedByDate) {
            const viewPortGroupCount = this.viewDataProvider.getViewPortGroupCount();
            return Math.max(getMaxPosition(groupIndex), getMaxPosition(viewPortGroupCount - 1))
        }
        return getMaxPosition(groupIndex)
    };
    _proto.getResizableStep = function() {
        const cellWidth = getCellWidth(this.DOMMetaData);
        if (this.isGroupedByDate) {
            return this.groupCount * cellWidth
        }
        return cellWidth
    };
    _proto.getVerticalMax = function(options) {
        return this.groupStrategy.getVerticalMax(options)
    };
    _proto.getOffsetByAllDayPanel = function(options) {
        return this.groupStrategy.getOffsetByAllDayPanel(options)
    };
    _proto.getGroupTop = function(options) {
        return this.groupStrategy.getGroupTop(options)
    };
    _createClass(PositionHelper, [{
        key: "viewDataProvider",
        get: function() {
            return this.options.viewDataProvider
        }
    }, {
        key: "rtlEnabled",
        get: function() {
            return this.options.rtlEnabled
        }
    }, {
        key: "isGroupedByDate",
        get: function() {
            return this.options.isGroupedByDate
        }
    }, {
        key: "groupCount",
        get: function() {
            return this.options.groupCount
        }
    }, {
        key: "DOMMetaData",
        get: function() {
            return this.options.getDOMMetaDataCallback()
        }
    }]);
    return PositionHelper
}();
exports.PositionHelper = PositionHelper;
let GroupStrategyBase = function() {
    function GroupStrategyBase(options) {
        this.options = options
    }
    var _proto2 = GroupStrategyBase.prototype;
    _proto2.getOffsetByAllDayPanel = function(_ref) {
        let {
            groupIndex: groupIndex,
            supportAllDayRow: supportAllDayRow,
            showAllDayPanel: showAllDayPanel
        } = _ref;
        let result = 0;
        if (supportAllDayRow && showAllDayPanel) {
            const allDayPanelHeight = getAllDayHeight(showAllDayPanel, true, this.DOMMetaData);
            result = allDayPanelHeight * (groupIndex + 1)
        }
        return result
    };
    _proto2.getVerticalMax = function(options) {
        let maxAllowedPosition = this._getMaxAllowedVerticalPosition(_extends(_extends({}, options), {
            viewDataProvider: this.viewDataProvider,
            rtlEnabled: this.rtlEnabled,
            DOMMetaData: this.DOMMetaData
        }));
        maxAllowedPosition += this.getOffsetByAllDayPanel(options);
        return maxAllowedPosition
    };
    _proto2.getGroupTop = function(_ref2) {
        let {
            groupIndex: groupIndex,
            showAllDayPanel: showAllDayPanel,
            isGroupedAllDayPanel: isGroupedAllDayPanel
        } = _ref2;
        const rowCount = this.viewDataProvider.getRowCountInGroup(groupIndex);
        const maxVerticalPosition = this._getMaxAllowedVerticalPosition({
            groupIndex: groupIndex,
            viewDataProvider: this.viewDataProvider,
            showAllDayPanel: showAllDayPanel,
            isGroupedAllDayPanel: isGroupedAllDayPanel,
            isVerticalGrouping: true,
            DOMMetaData: this.DOMMetaData
        });
        return maxVerticalPosition - getCellHeight(this.DOMMetaData) * rowCount
    };
    _proto2._getAllDayHeight = function(showAllDayPanel) {
        return getAllDayHeight(showAllDayPanel, true, this.DOMMetaData)
    };
    _proto2._getMaxAllowedVerticalPosition = function(_ref3) {
        let {
            groupIndex: groupIndex,
            showAllDayPanel: showAllDayPanel,
            isGroupedAllDayPanel: isGroupedAllDayPanel
        } = _ref3;
        const {
            rowIndex: rowIndex
        } = this.viewDataProvider.getLastGroupCellPosition(groupIndex);
        const {
            dateTableCellsMeta: dateTableCellsMeta
        } = this.DOMMetaData;
        const lastGroupRow = dateTableCellsMeta[rowIndex];
        if (!lastGroupRow) {
            return 0
        }
        let result = lastGroupRow[0].top + lastGroupRow[0].height;
        if (isGroupedAllDayPanel) {
            result -= (groupIndex + 1) * this._getAllDayHeight(showAllDayPanel)
        }
        return result
    };
    _createClass(GroupStrategyBase, [{
        key: "viewDataProvider",
        get: function() {
            return this.options.viewDataProvider
        }
    }, {
        key: "isGroupedByDate",
        get: function() {
            return this.options.isGroupedByDate
        }
    }, {
        key: "rtlEnabled",
        get: function() {
            return this.options.rtlEnabled
        }
    }, {
        key: "groupCount",
        get: function() {
            return this.options.groupCount
        }
    }, {
        key: "DOMMetaData",
        get: function() {
            return this.options.getDOMMetaDataCallback()
        }
    }]);
    return GroupStrategyBase
}();
let GroupStrategyHorizontal = function(_GroupStrategyBase) {
    _inheritsLoose(GroupStrategyHorizontal, _GroupStrategyBase);

    function GroupStrategyHorizontal() {
        return _GroupStrategyBase.apply(this, arguments) || this
    }
    var _proto3 = GroupStrategyHorizontal.prototype;
    _proto3.getOffsetByAllDayPanel = function() {
        return 0
    };
    _proto3.getVerticalMax = function(options) {
        const {
            isVirtualScrolling: isVirtualScrolling,
            groupIndex: groupIndex
        } = options;
        const correctedGroupIndex = isVirtualScrolling ? groupIndex : 0;
        return this._getMaxAllowedVerticalPosition(_extends(_extends({}, options), {
            groupIndex: correctedGroupIndex
        }))
    };
    _proto3.getGroupTop = function() {
        return 0
    };
    _proto3._getAllDayHeight = function(showAllDayPanel) {
        return getAllDayHeight(showAllDayPanel, false, this.DOMMetaData)
    };
    return GroupStrategyHorizontal
}(GroupStrategyBase);
