/**
 * DevExtreme (esm/ui/hierarchical_collection/ui.hierarchical_collection_widget.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from "../../core/renderer";
import {
    compileGetter,
    compileSetter
} from "../../core/utils/data";
import {
    extend
} from "../../core/utils/extend";
import {
    each
} from "../../core/utils/iterator";
import devices from "../../core/devices";
import {
    getImageContainer
} from "../../core/utils/icon";
import HierarchicalDataAdapter from "./ui.data_adapter";
import CollectionWidget from "../collection/ui.collection_widget.edit";
import {
    BindableTemplate
} from "../../core/templates/bindable_template";
import {
    isFunction,
    isObject
} from "../../core/utils/type";
import {
    noop
} from "../../core/utils/common";
var DISABLED_STATE_CLASS = "dx-state-disabled";
var ITEM_URL_CLASS = "dx-item-url";
var HierarchicalCollectionWidget = CollectionWidget.inherit({
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            keyExpr: "id",
            displayExpr: "text",
            selectedExpr: "selected",
            disabledExpr: "disabled",
            itemsExpr: "items",
            hoverStateEnabled: true,
            parentIdExpr: "parentId",
            expandedExpr: "expanded"
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return "desktop" === devices.real().deviceType && !devices.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }])
    },
    _init: function() {
        this.callBase();
        this._initAccessors();
        this._initDataAdapter();
        this._initDynamicTemplates()
    },
    _initDataSource: function() {
        this.callBase();
        this._dataSource && this._dataSource.paginate(false)
    },
    _initDataAdapter: function() {
        var accessors = this._createDataAdapterAccessors();
        this._dataAdapter = new HierarchicalDataAdapter(extend({
            dataAccessors: {
                getters: accessors.getters,
                setters: accessors.setters
            },
            items: this.option("items")
        }, this._getDataAdapterOptions()))
    },
    _getDataAdapterOptions: noop,
    _getItemExtraPropNames: noop,
    _initDynamicTemplates: function() {
        var fields = ["text", "html", "items", "icon"].concat(this._getItemExtraPropNames());
        this._templateManager.addDefaultTemplates({
            item: new BindableTemplate(this._addContent.bind(this), fields, this.option("integrationOptions.watchMethod"), {
                text: this._displayGetter,
                items: this._itemsGetter
            })
        })
    },
    _addContent: function($container, itemData) {
        $container.html(itemData.html).append(this._getIconContainer(itemData)).append(this._getTextContainer(itemData))
    },
    _getLinkContainer: function(iconContainer, textContainer, _ref) {
        var {
            linkAttr: linkAttr,
            url: url
        } = _ref;
        var linkAttributes = isObject(linkAttr) ? linkAttr : {};
        return $("<a>").addClass(ITEM_URL_CLASS).attr(_extends({}, linkAttributes, {
            href: url
        })).append(iconContainer).append(textContainer)
    },
    _getIconContainer: function(itemData) {
        if (!itemData.icon) {
            return
        }
        var $imageContainer = getImageContainer(itemData.icon);
        if ($imageContainer.is("img")) {
            $imageContainer.attr("alt", "".concat(this.NAME, " item icon"))
        }
        return $imageContainer
    },
    _getTextContainer: function(itemData) {
        return $("<span>").text(itemData.text)
    },
    _initAccessors: function() {
        var that = this;
        each(this._getAccessors(), (function(_, accessor) {
            that._compileAccessor(accessor)
        }));
        this._compileDisplayGetter()
    },
    _getAccessors: function() {
        return ["key", "selected", "items", "disabled", "parentId", "expanded"]
    },
    _getChildNodes: function(node) {
        var that = this;
        var arr = [];
        each(node.internalFields.childrenKeys, (function(_, key) {
            var childNode = that._dataAdapter.getNodeByKey(key);
            arr.push(childNode)
        }));
        return arr
    },
    _hasChildren: function(node) {
        return node && node.internalFields.childrenKeys.length
    },
    _compileAccessor: function(optionName) {
        var getter = "_" + optionName + "Getter";
        var setter = "_" + optionName + "Setter";
        var optionExpr = this.option(optionName + "Expr");
        if (!optionExpr) {
            this[getter] = noop;
            this[setter] = noop;
            return
        } else if (isFunction(optionExpr)) {
            this[setter] = function(obj, value) {
                obj[optionExpr()] = value
            };
            this[getter] = function(obj) {
                return obj[optionExpr()]
            };
            return
        }
        this[getter] = compileGetter(optionExpr);
        this[setter] = compileSetter(optionExpr)
    },
    _createDataAdapterAccessors: function() {
        var that = this;
        var accessors = {
            getters: {},
            setters: {}
        };
        each(this._getAccessors(), (function(_, accessor) {
            var getterName = "_" + accessor + "Getter";
            var setterName = "_" + accessor + "Setter";
            var newAccessor = "parentId" === accessor ? "parentKey" : accessor;
            accessors.getters[newAccessor] = that[getterName];
            accessors.setters[newAccessor] = that[setterName]
        }));
        accessors.getters.display = !this._displayGetter ? itemData => itemData.text : this._displayGetter;
        return accessors
    },
    _initMarkup: function() {
        this.callBase();
        this._addWidgetClass()
    },
    _addWidgetClass: function() {
        this._focusTarget().addClass(this._widgetClass())
    },
    _widgetClass: noop,
    _renderItemFrame: function(index, itemData) {
        var $itemFrame = this.callBase.apply(this, arguments);
        $itemFrame.toggleClass(DISABLED_STATE_CLASS, !!this._disabledGetter(itemData));
        return $itemFrame
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "displayExpr":
            case "keyExpr":
                this._initAccessors();
                this._initDynamicTemplates();
                this.repaint();
                break;
            case "itemsExpr":
            case "selectedExpr":
            case "disabledExpr":
            case "expandedExpr":
            case "parentIdExpr":
                this._initAccessors();
                this._initDataAdapter();
                this.repaint();
                break;
            case "items":
                this._initDataAdapter();
                this.callBase(args);
                break;
            default:
                this.callBase(args)
        }
    }
});
export default HierarchicalCollectionWidget;
