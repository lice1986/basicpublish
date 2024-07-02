/**
 * DevExtreme (esm/data/store_helper.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    grep
} from "../core/utils/common";
import {
    extend
} from "../core/utils/extend";
import {
    each
} from "../core/utils/iterator";
import arrayQuery from "./array_query";
import {
    normalizeSortingInfo
} from "./utils";

function multiLevelGroup(query, groupInfo) {
    query = query.groupBy(groupInfo[0].selector);
    if (groupInfo.length > 1) {
        query = query.select((function(g) {
            return extend({}, g, {
                items: multiLevelGroup(arrayQuery(g.items), groupInfo.slice(1)).toArray()
            })
        }))
    }
    return query
}

function arrangeSortingInfo(groupInfo, sortInfo) {
    var filteredGroup = [];
    each(groupInfo, (function(_, group) {
        var collision = grep(sortInfo, (function(sort) {
            return group.selector === sort.selector
        }));
        if (collision.length < 1) {
            filteredGroup.push(group)
        }
    }));
    return filteredGroup.concat(sortInfo)
}

function queryByOptions(query, options, isCountQuery) {
    var _options;
    options = options || {};
    var filter = options.filter;
    if (null !== (_options = options) && void 0 !== _options && _options.langParams) {
        var _query$setLangParams, _query;
        null === (_query$setLangParams = (_query = query).setLangParams) || void 0 === _query$setLangParams ? void 0 : _query$setLangParams.call(_query, options.langParams)
    }
    if (filter) {
        query = query.filter(filter)
    }
    if (isCountQuery) {
        return query
    }
    var sort = options.sort;
    var select = options.select;
    var group = options.group;
    var skip = options.skip;
    var take = options.take;
    if (group) {
        group = normalizeSortingInfo(group);
        group.keepInitialKeyOrder = !!options.group.keepInitialKeyOrder
    }
    if (sort || group) {
        sort = normalizeSortingInfo(sort || []);
        if (group && !group.keepInitialKeyOrder) {
            sort = arrangeSortingInfo(group, sort)
        }
        each(sort, (function(index) {
            query = query[index ? "thenBy" : "sortBy"](this.selector, this.desc, this.compare)
        }))
    }
    if (select) {
        query = query.select(select)
    }
    if (group) {
        query = multiLevelGroup(query, group)
    }
    if (take || skip) {
        query = query.slice(skip || 0, take)
    }
    return query
}
export default {
    multiLevelGroup: multiLevelGroup,
    arrangeSortingInfo: arrangeSortingInfo,
    queryByOptions: queryByOptions
};
