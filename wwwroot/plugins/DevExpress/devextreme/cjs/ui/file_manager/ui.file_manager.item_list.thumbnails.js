/**
 * DevExtreme (cjs/ui/file_manager/ui.file_manager.item_list.thumbnails.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _deferred = require("../../core/utils/deferred");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _index = require("../../events/utils/index");
var _contextmenu = require("../../events/contextmenu");
var _uiFile_manager = require("./ui.file_manager.common");
var _message = _interopRequireDefault(require("../../localization/message"));
var _uiFile_managerItems_listThumbnails = _interopRequireDefault(require("./ui.file_manager.items_list.thumbnails.list_box"));
var _uiFile_manager2 = _interopRequireDefault(require("./ui.file_manager.item_list"));
var _file_items_controller = require("./file_items_controller");

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
const FILE_MANAGER_THUMBNAILS_ITEM_LIST_CLASS = "dx-filemanager-thumbnails";
const FILE_MANAGER_THUMBNAILS_ITEM_CLASS = "dx-filemanager-thumbnails-item";
const FILE_MANAGER_THUMBNAILS_ITEM_THUMBNAIL_CLASS = "dx-filemanager-thumbnails-item-thumbnail";
const FILE_MANAGER_THUMBNAILS_EVENT_NAMESPACE = "dxFileManager_thumbnails";
let FileManagerThumbnailsItemList = function(_FileManagerItemListB) {
    _inheritsLoose(FileManagerThumbnailsItemList, _FileManagerItemListB);

    function FileManagerThumbnailsItemList() {
        return _FileManagerItemListB.apply(this, arguments) || this
    }
    var _proto = FileManagerThumbnailsItemList.prototype;
    _proto._initMarkup = function() {
        _FileManagerItemListB.prototype._initMarkup.call(this);
        this.$element().addClass("dx-filemanager-thumbnails");
        const contextMenuEvent = (0, _index.addNamespace)(_contextmenu.name, "dxFileManager_thumbnails");
        _events_engine.default.on(this.$element(), contextMenuEvent, this._onContextMenu.bind(this));
        this._createItemList()
    };
    _proto._createItemList = function() {
        const selectionMode = this._isMultipleSelectionMode() ? "multiple" : "single";
        const $itemListContainer = (0, _renderer.default)("<div>").appendTo(this.$element());
        this._itemList = this._createComponent($itemListContainer, _uiFile_managerItems_listThumbnails.default, {
            dataSource: this._createDataSource(),
            selectionMode: selectionMode,
            selectedItemKeys: this.option("selectedItemKeys"),
            focusedItemKey: this.option("focusedItemKey"),
            activeStateEnabled: true,
            hoverStateEnabled: true,
            loopItemFocus: false,
            focusStateEnabled: true,
            onItemEnterKeyPressed: this._tryOpen.bind(this),
            itemThumbnailTemplate: this._getItemThumbnailContainer.bind(this),
            getTooltipText: this._getTooltipText.bind(this),
            onSelectionChanged: this._onItemListSelectionChanged.bind(this),
            onFocusedItemChanged: this._onItemListFocusedItemChanged.bind(this),
            onContentReady: this._onContentReady.bind(this)
        })
    };
    _proto._onContextMenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this._isDesktop()) {
            return
        }
        let items = null;
        const targetItemElement = (0, _renderer.default)(e.target).closest(this._getItemSelector());
        let targetItem = null;
        if (targetItemElement.length > 0) {
            targetItem = this._itemList.getItemByItemElement(targetItemElement);
            this._itemList.selectItem(targetItem);
            items = this._getFileItemsForContextMenu(targetItem)
        }
        const target = {
            itemData: targetItem,
            itemElement: targetItemElement.length ? targetItemElement : void 0
        };
        this._showContextMenu(items, e.target, e, target)
    };
    _proto._getItemThumbnailCssClass = function() {
        return "dx-filemanager-thumbnails-item-thumbnail"
    };
    _proto._getItemSelector = function() {
        return ".".concat("dx-filemanager-thumbnails-item")
    };
    _proto._getTooltipText = function(fileItemInfo) {
        const item = fileItemInfo.fileItem;
        if (item.tooltipText) {
            return item.tooltipText
        }
        let text = "".concat(item.name, "\r\n");
        if (!item.isDirectory) {
            text += "".concat(_message.default.format("dxFileManager-listThumbnailsTooltipTextSize"), ": ").concat((0, _uiFile_manager.getDisplayFileSize)(item.size), "\r\n")
        }
        text += "".concat(_message.default.format("dxFileManager-listThumbnailsTooltipTextDateModified"), ": ").concat(item.dateModified);
        return text
    };
    _proto._onItemDblClick = function(e) {
        const $item = (0, _renderer.default)(e.currentTarget);
        const item = this._itemList.getItemByItemElement($item);
        this._tryOpen(item)
    };
    _proto._tryOpen = function(item) {
        if (item) {
            this._raiseSelectedItemOpened(item)
        }
    };
    _proto._getItemsInternal = function() {
        return _FileManagerItemListB.prototype._getItemsInternal.call(this).then(items => {
            const deferred = new _deferred.Deferred;
            setTimeout(() => deferred.resolve(items));
            return deferred.promise()
        })
    };
    _proto._disableDragging = function() {
        return false
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_FileManagerItemListB.prototype._getDefaultOptions.call(this), {
            focusStateEnabled: true
        })
    };
    _proto._onItemListSelectionChanged = function(_ref) {
        let {
            addedItemKeys: addedItemKeys,
            removedItemKeys: removedItemKeys
        } = _ref;
        const selectedItemInfos = this.getSelectedItems();
        const selectedItems = selectedItemInfos.map(itemInfo => itemInfo.fileItem);
        const selectedItemKeys = selectedItems.map(item => item.key);
        this._tryRaiseSelectionChanged({
            selectedItemInfos: selectedItemInfos,
            selectedItems: selectedItems,
            selectedItemKeys: selectedItemKeys,
            currentSelectedItemKeys: addedItemKeys,
            currentDeselectedItemKeys: removedItemKeys
        })
    };
    _proto._onItemListFocusedItemChanged = function(_ref2) {
        let {
            item: item,
            itemElement: itemElement
        } = _ref2;
        if (!this._isMultipleSelectionMode()) {
            this._selectItemSingleSelection(item)
        }
        const fileSystemItem = (null === item || void 0 === item ? void 0 : item.fileItem) || null;
        this._onFocusedItemChanged({
            item: fileSystemItem,
            itemKey: null === fileSystemItem || void 0 === fileSystemItem ? void 0 : fileSystemItem.key,
            itemElement: itemElement || void 0
        })
    };
    _proto._getScrollable = function() {
        return this._itemList.getScrollable()
    };
    _proto._setSelectedItemKeys = function(itemKeys) {
        this._itemList.option("selectedItemKeys", itemKeys)
    };
    _proto._setFocusedItemKey = function(itemKey) {
        this._itemList.option("focusedItemKey", itemKey)
    };
    _proto.refresh = function(options, operation) {
        const actualOptions = {
            dataSource: this._createDataSource()
        };
        if (options && Object.prototype.hasOwnProperty.call(options, "focusedItemKey")) {
            actualOptions.focusedItemKey = options.focusedItemKey
        }
        if (options && Object.prototype.hasOwnProperty.call(options, "selectedItemKeys")) {
            actualOptions.selectedItemKeys = options.selectedItemKeys
        }
        if (!(0, _type.isDefined)(actualOptions.focusedItemKey) && operation === _file_items_controller.OPERATIONS.NAVIGATION) {
            this._needResetScrollPosition = true
        }
        this._itemList.option(actualOptions);
        this._refreshDeferred = new _deferred.Deferred;
        return this._refreshDeferred.promise()
    };
    _proto._deselectItem = function(item) {
        const itemElement = this._itemList.getItemElementByItem(item);
        this._itemList.unselectItem(itemElement)
    };
    _proto._selectItemSingleSelection = function(item) {
        if (item) {
            this._itemList.selectItem(item)
        } else {
            this._itemList.clearSelection()
        }
    };
    _proto.clearSelection = function() {
        this._itemList.clearSelection()
    };
    _proto.getSelectedItems = function() {
        return this._itemList.getSelectedItems()
    };
    return FileManagerThumbnailsItemList
}(_uiFile_manager2.default);
var _default = FileManagerThumbnailsItemList;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;