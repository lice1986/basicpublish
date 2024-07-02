/**
 * DevExtreme (cjs/__internal/grids/data_grid/grouping/m_grouping_expanded.js)
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
exports.GroupingHelper = void 0;
var _data = require("../../../../core/utils/data");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _query = _interopRequireDefault(require("../../../../data/query"));
var _store_helper = _interopRequireDefault(require("../../../../data/store_helper"));
var _utils = require("../../../../data/utils");
var _m_core = _interopRequireDefault(require("../m_core"));
var _m_utils = require("../m_utils");
var _m_grouping_core = require("./m_grouping_core");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

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
const loadTotalCount = function(dataSource, options) {
    const d = new _deferred.Deferred;
    const loadOptions = (0, _extend.extend)({
        skip: 0,
        take: 1,
        requireTotalCount: true
    }, options);
    dataSource.load(loadOptions).done((data, extra) => {
        d.resolve(extra && extra.totalCount)
    }).fail(d.reject.bind(d));
    return d
};
const foreachCollapsedGroups = function(that, callback, updateOffsets) {
    return that.foreachGroups(groupInfo => {
        if (!groupInfo.isExpanded) {
            return callback(groupInfo)
        }
    }, false, false, updateOffsets, true)
};
const correctSkipLoadOption = function(that, skip) {
    let skipCorrection = 0;
    let resultSkip = skip || 0;
    if (skip) {
        foreachCollapsedGroups(that, groupInfo => {
            if (groupInfo.offset - skipCorrection >= skip) {
                return false
            }
            skipCorrection += groupInfo.count - 1
        });
        resultSkip += skipCorrection
    }
    return resultSkip
};
const processGroupItems = function(that, items, path, offset, skipFirstItem, take) {
    let removeLastItemsCount = 0;
    let needRemoveFirstItem = false;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (void 0 !== item.items) {
            path.push(item.key);
            const groupInfo = that.findGroupInfo(path);
            if (groupInfo && !groupInfo.isExpanded) {
                item.collapsedItems = item.items;
                item.items = null;
                offset += groupInfo.count;
                take--;
                if (take < 0) {
                    removeLastItemsCount++
                }
                if (skipFirstItem) {
                    needRemoveFirstItem = true
                }
            } else if (item.items) {
                const offsetInfo = processGroupItems(that, item.items, path, offset, skipFirstItem, take);
                if (skipFirstItem) {
                    if (offsetInfo.offset - offset > 1) {
                        item.isContinuation = true
                    } else {
                        needRemoveFirstItem = true
                    }
                }
                offset = offsetInfo.offset;
                take = offsetInfo.take;
                if (take < 0) {
                    if (item.items.length) {
                        item.isContinuationOnNextPage = true
                    } else {
                        removeLastItemsCount++
                    }
                }
            }
            path.pop()
        } else {
            if (skipFirstItem) {
                needRemoveFirstItem = true
            }
            offset++;
            take--;
            if (take < 0) {
                removeLastItemsCount++
            }
        }
        skipFirstItem = false
    }
    if (needRemoveFirstItem) {
        items.splice(0, 1)
    }
    if (removeLastItemsCount) {
        items.splice(-removeLastItemsCount, removeLastItemsCount)
    }
    return {
        offset: offset,
        take: take
    }
};
const pathEquals = function(path1, path2) {
    if (path1.length !== path2.length) {
        return false
    }
    for (let i = 0; i < path1.length; i++) {
        if (!(0, _utils.keysEqual)(null, path1[i], path2[i])) {
            return false
        }
    }
    return true
};
const updateGroupOffsets = function(that, items, path, offset, additionalGroupInfo) {
    if (!items) {
        return
    }
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if ("key" in item && void 0 !== item.items) {
            path.push(item.key);
            if (additionalGroupInfo && pathEquals(additionalGroupInfo.path, path) && !item.isContinuation) {
                additionalGroupInfo.offset = offset
            }
            const groupInfo = that.findGroupInfo(path);
            if (groupInfo && !item.isContinuation) {
                groupInfo.offset = offset
            }
            if (groupInfo && !groupInfo.isExpanded) {
                offset += groupInfo.count
            } else {
                offset = updateGroupOffsets(that, item.items, path, offset, additionalGroupInfo)
            }
            path.pop()
        } else {
            offset++
        }
    }
    return offset
};
const removeGroupLoadOption = function(storeLoadOptions, loadOptions) {
    if (loadOptions.group) {
        const groups = _m_core.default.normalizeSortingInfo(loadOptions.group);
        const sorts = _m_core.default.normalizeSortingInfo(storeLoadOptions.sort);
        storeLoadOptions.sort = _store_helper.default.arrangeSortingInfo(groups, sorts);
        delete loadOptions.group
    }
};
const createNotGroupFilter = function(path, storeLoadOptions, group) {
    const groups = _m_core.default.normalizeSortingInfo(group || storeLoadOptions.group);
    let filter = [];
    for (let i = 0; i < path.length; i++) {
        const filterElement = [];
        for (let j = 0; j <= i; j++) {
            filterElement.push([groups[j].selector, i === j ? "<>" : "=", path[j]])
        }
        filter.push(_m_core.default.combineFilters(filterElement))
    }
    filter = _m_core.default.combineFilters(filter, "or");
    return _m_core.default.combineFilters([filter, storeLoadOptions.filter])
};
const getGroupCount = function(item, groupCount) {
    let count = item.count || item.items.length;
    if (!item.count && groupCount > 1) {
        count = 0;
        for (let i = 0; i < item.items.length; i++) {
            count += getGroupCount(item.items[i], groupCount - 1)
        }
    }
    return count
};
let GroupingHelper = function(_GroupingHelperCore) {
    _inheritsLoose(GroupingHelper, _GroupingHelperCore);

    function GroupingHelper() {
        return _GroupingHelperCore.apply(this, arguments) || this
    }
    var _proto = GroupingHelper.prototype;
    _proto.handleDataLoading = function(options) {
        const {
            storeLoadOptions: storeLoadOptions
        } = options;
        const collapsedGroups = [];
        let collapsedItemsCount = 0;
        let skipFirstItem = false;
        let take;
        const {
            group: group
        } = options.loadOptions;
        let skipCorrection = 0;
        removeGroupLoadOption(storeLoadOptions, options.loadOptions);
        options.group = options.group || group;
        if (options.isCustomLoading) {
            return
        }
        const loadOptions = (0, _extend.extend)({}, storeLoadOptions);
        loadOptions.skip = correctSkipLoadOption(this, storeLoadOptions.skip);
        if (loadOptions.skip && loadOptions.take && group) {
            loadOptions.skip--;
            loadOptions.take++;
            skipFirstItem = true
        }
        if (loadOptions.take && group) {
            take = loadOptions.take;
            loadOptions.take++
        }
        foreachCollapsedGroups(this, groupInfo => {
            if (groupInfo.offset >= loadOptions.skip + loadOptions.take + skipCorrection) {
                return false
            }
            if (groupInfo.offset >= loadOptions.skip + skipCorrection && groupInfo.count) {
                skipCorrection += groupInfo.count - 1;
                collapsedGroups.push(groupInfo);
                collapsedItemsCount += groupInfo.count
            }
        });
        (0, _iterator.each)(collapsedGroups, (function() {
            loadOptions.filter = createNotGroupFilter(this.path, loadOptions, group)
        }));
        options.storeLoadOptions = loadOptions;
        options.collapsedGroups = collapsedGroups;
        options.collapsedItemsCount = collapsedItemsCount;
        options.skip = loadOptions.skip || 0;
        options.skipFirstItem = skipFirstItem;
        options.take = take
    };
    _proto.handleDataLoaded = function(options, callBase) {
        const that = this;
        const {
            collapsedGroups: collapsedGroups
        } = options;
        const groups = _m_core.default.normalizeSortingInfo(options.group);
        const groupCount = groups.length;

        function appendCollapsedPath(data, path, groups, collapsedGroup, offset) {
            if (!data || !path.length || !groups.length) {
                return
            }
            let keyValue;
            let i;
            const pathValue = (0, _data.toComparable)(path[0], true);
            for (i = 0; i < data.length; i++) {
                keyValue = (0, _data.toComparable)(data[i].key, true);
                if (offset >= collapsedGroup.offset || pathValue === keyValue) {
                    break
                } else {
                    offset += getGroupCount(data[i], groups.length)
                }
            }
            if (!data.length || pathValue !== keyValue) {
                data.splice(i, 0, {
                    key: path[0],
                    items: [],
                    count: 1 === path.length ? collapsedGroup.count : void 0
                })
            }
            appendCollapsedPath(data[i].items, path.slice(1), groups.slice(1), collapsedGroup, offset)
        }
        if (options.collapsedItemsCount && options.extra && options.extra.totalCount >= 0) {
            if (!options.extra._totalCountWasIncreasedByCollapsedItems) {
                options.extra.totalCount += options.collapsedItemsCount;
                options.extra._totalCountWasIncreasedByCollapsedItems = true
            }
        }
        callBase(options);
        if (groupCount) {
            let {
                data: data
            } = options;
            const query = (0, _query.default)(data);
            _store_helper.default.multiLevelGroup(query, groups).enumerate().done(groupedData => {
                data = groupedData
            });
            if (collapsedGroups) {
                for (let pathIndex = 0; pathIndex < collapsedGroups.length; pathIndex++) {
                    appendCollapsedPath(data, collapsedGroups[pathIndex].path, groups, collapsedGroups[pathIndex], options.skip)
                }
            }
            if (!options.isCustomLoading) {
                processGroupItems(that, data, [], options.skip, options.skipFirstItem, options.take)
            }
            options.data = data
        }
    };
    _proto.isGroupItemCountable = function(item) {
        return null === item.items
    };
    _proto.updateTotalItemsCount = function() {
        let itemsCountCorrection = 0;
        foreachCollapsedGroups(this, groupInfo => {
            if (groupInfo.count) {
                itemsCountCorrection -= groupInfo.count - 1
            }
        });
        _GroupingHelperCore.prototype.updateTotalItemsCount.call(this, itemsCountCorrection)
    };
    _proto.changeRowExpand = function(path) {
        const that = this;
        const dataSource = that._dataSource;
        const beginPageIndex = dataSource.beginPageIndex ? dataSource.beginPageIndex() : dataSource.pageIndex();
        const dataSourceItems = dataSource.items();
        const offset = correctSkipLoadOption(that, beginPageIndex * dataSource.pageSize());
        let groupInfo = that.findGroupInfo(path);
        let groupCountQuery;
        if (groupInfo && !groupInfo.isExpanded) {
            groupCountQuery = (new _deferred.Deferred).resolve(groupInfo.count)
        } else {
            groupCountQuery = loadTotalCount(dataSource, {
                filter: (0, _m_utils.createGroupFilter)(path, {
                    filter: dataSource.filter(),
                    group: dataSource.group()
                })
            })
        }
        return (0, _deferred.when)(groupCountQuery).done(count => {
            count = parseInt(count.length ? count[0] : count);
            if (groupInfo) {
                updateGroupOffsets(that, dataSourceItems, [], offset);
                groupInfo.isExpanded = !groupInfo.isExpanded;
                groupInfo.count = count
            } else {
                groupInfo = {
                    offset: -1,
                    count: count,
                    path: path,
                    isExpanded: false
                };
                updateGroupOffsets(that, dataSourceItems, [], offset, groupInfo);
                if (groupInfo.offset >= 0) {
                    that.addGroupInfo(groupInfo)
                }
            }
            that.updateTotalItemsCount()
        }).fail((function() {
            dataSource._eventsStrategy.fireEvent("loadError", arguments)
        }))
    };
    _proto.allowCollapseAll = function() {
        return false
    };
    _proto.refresh = function(options, operationTypes) {
        const that = this;
        const {
            storeLoadOptions: storeLoadOptions
        } = options;
        const dataSource = that._dataSource;
        _GroupingHelperCore.prototype.refresh.apply(this, arguments);
        if (operationTypes.reload) {
            return foreachCollapsedGroups(that, groupInfo => {
                const groupCountQuery = loadTotalCount(dataSource, {
                    filter: (0, _m_utils.createGroupFilter)(groupInfo.path, storeLoadOptions)
                });
                const groupOffsetQuery = loadTotalCount(dataSource, {
                    filter: (0, _m_grouping_core.createOffsetFilter)(groupInfo.path, storeLoadOptions)
                });
                return (0, _deferred.when)(groupOffsetQuery, groupCountQuery).done((offset, count) => {
                    offset = parseInt(offset.length ? offset[0] : offset);
                    count = parseInt(count.length ? count[0] : count);
                    groupInfo.offset = offset;
                    if (groupInfo.count !== count) {
                        groupInfo.count = count;
                        that.updateTotalItemsCount()
                    }
                })
            }, true)
        }
    };
    return GroupingHelper
}(_m_grouping_core.GroupingHelper);
exports.GroupingHelper = GroupingHelper;