/**
 * DevExtreme (esm/__internal/filter_builder/m_filter_builder.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import registerComponent from "../../core/component_registrator";
import domAdapter from "../../core/dom_adapter";
import $ from "../../core/renderer";
import {
    when
} from "../../core/utils/deferred";
import {
    extend
} from "../../core/utils/extend";
import {
    isDefined
} from "../../core/utils/type";
import eventsEngine from "../../events/core/events_engine";
import {
    normalizeKeyName
} from "../../events/utils/index";
import messageLocalization from "../../localization/message";
import {
    getElementMaxHeightByWindow
} from "../../ui/overlay/utils";
import Popup from "../../ui/popup";
import EditorFactoryMixin from "../../ui/shared/ui.editor_factory_mixin";
import TreeView from "../../ui/tree_view";
import Widget from "../../ui/widget/ui.widget";
import {
    addItem,
    convertToInnerStructure,
    createCondition,
    createEmptyGroup,
    getAvailableOperations,
    getCaptionWithParents,
    getCurrentLookupValueText,
    getCurrentValueText,
    getCustomOperation,
    getDefaultOperation,
    getField,
    getFilterExpression,
    getGroupCriteria,
    getGroupMenuItem,
    getGroupValue,
    getItems,
    getMergedOperations,
    getNormalizedFields,
    getNormalizedFilter,
    getOperationFromAvailable,
    getOperationValue,
    isCondition,
    isGroup,
    removeItem,
    renderValueText,
    setGroupValue,
    updateConditionByOperation
} from "./m_utils";
var FILTER_BUILDER_CLASS = "dx-filterbuilder";
var FILTER_BUILDER_GROUP_CLASS = "".concat(FILTER_BUILDER_CLASS, "-group");
var FILTER_BUILDER_GROUP_ITEM_CLASS = "".concat(FILTER_BUILDER_GROUP_CLASS, "-item");
var FILTER_BUILDER_GROUP_CONTENT_CLASS = "".concat(FILTER_BUILDER_GROUP_CLASS, "-content");
var FILTER_BUILDER_GROUP_OPERATIONS_CLASS = "".concat(FILTER_BUILDER_GROUP_CLASS, "-operations");
var FILTER_BUILDER_GROUP_OPERATION_CLASS = "".concat(FILTER_BUILDER_GROUP_CLASS, "-operation");
var FILTER_BUILDER_ACTION_CLASS = "".concat(FILTER_BUILDER_CLASS, "-action");
var FILTER_BUILDER_IMAGE_CLASS = "".concat(FILTER_BUILDER_ACTION_CLASS, "-icon");
var FILTER_BUILDER_IMAGE_ADD_CLASS = "dx-icon-plus";
var FILTER_BUILDER_IMAGE_REMOVE_CLASS = "dx-icon-remove";
var FILTER_BUILDER_ITEM_TEXT_CLASS = "".concat(FILTER_BUILDER_CLASS, "-text");
var FILTER_BUILDER_ITEM_FIELD_CLASS = "".concat(FILTER_BUILDER_CLASS, "-item-field");
var FILTER_BUILDER_ITEM_OPERATION_CLASS = "".concat(FILTER_BUILDER_CLASS, "-item-operation");
var FILTER_BUILDER_ITEM_VALUE_CLASS = "".concat(FILTER_BUILDER_CLASS, "-item-value");
var FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS = "".concat(FILTER_BUILDER_CLASS, "-item-value-text");
var FILTER_BUILDER_OVERLAY_CLASS = "".concat(FILTER_BUILDER_CLASS, "-overlay");
var FILTER_BUILDER_FILTER_OPERATIONS_CLASS = "".concat(FILTER_BUILDER_CLASS, "-operations");
var FILTER_BUILDER_FIELDS_CLASS = "".concat(FILTER_BUILDER_CLASS, "-fields");
var FILTER_BUILDER_ADD_CONDITION_CLASS = "".concat(FILTER_BUILDER_CLASS, "-add-condition");
var ACTIVE_CLASS = "dx-state-active";
var FILTER_BUILDER_MENU_CUSTOM_OPERATION_CLASS = "".concat(FILTER_BUILDER_CLASS, "-menu-custom-operation");
var SOURCE = "filterBuilder";
var DISABLED_STATE_CLASS = "dx-state-disabled";
var TAB_KEY = "tab";
var ENTER_KEY = "enter";
var ESCAPE_KEY = "escape";
var ACTIONS = [{
    name: "onEditorPreparing",
    config: {
        excludeValidators: ["disabled", "readOnly"],
        category: "rendering"
    }
}, {
    name: "onEditorPrepared",
    config: {
        excludeValidators: ["disabled", "readOnly"],
        category: "rendering"
    }
}, {
    name: "onValueChanged",
    config: {
        excludeValidators: ["disabled", "readOnly"]
    }
}];
var OPERATORS = {
    and: "and",
    or: "or",
    notAnd: "!and",
    notOr: "!or"
};
var EditorFactory = EditorFactoryMixin(class {});
class FilterBuilder extends Widget {
    _getDefaultOptions() {
        return extend(super._getDefaultOptions(), {
            onEditorPreparing: null,
            onEditorPrepared: null,
            onValueChanged: null,
            fields: [],
            groupOperations: ["and", "or", "notAnd", "notOr"],
            maxGroupLevel: void 0,
            value: null,
            allowHierarchicalFields: false,
            groupOperationDescriptions: {
                and: messageLocalization.format("dxFilterBuilder-and"),
                or: messageLocalization.format("dxFilterBuilder-or"),
                notAnd: messageLocalization.format("dxFilterBuilder-notAnd"),
                notOr: messageLocalization.format("dxFilterBuilder-notOr")
            },
            customOperations: [],
            closePopupOnTargetScroll: true,
            filterOperationDescriptions: {
                between: messageLocalization.format("dxFilterBuilder-filterOperationBetween"),
                equal: messageLocalization.format("dxFilterBuilder-filterOperationEquals"),
                notEqual: messageLocalization.format("dxFilterBuilder-filterOperationNotEquals"),
                lessThan: messageLocalization.format("dxFilterBuilder-filterOperationLess"),
                lessThanOrEqual: messageLocalization.format("dxFilterBuilder-filterOperationLessOrEquals"),
                greaterThan: messageLocalization.format("dxFilterBuilder-filterOperationGreater"),
                greaterThanOrEqual: messageLocalization.format("dxFilterBuilder-filterOperationGreaterOrEquals"),
                startsWith: messageLocalization.format("dxFilterBuilder-filterOperationStartsWith"),
                contains: messageLocalization.format("dxFilterBuilder-filterOperationContains"),
                notContains: messageLocalization.format("dxFilterBuilder-filterOperationNotContains"),
                endsWith: messageLocalization.format("dxFilterBuilder-filterOperationEndsWith"),
                isBlank: messageLocalization.format("dxFilterBuilder-filterOperationIsBlank"),
                isNotBlank: messageLocalization.format("dxFilterBuilder-filterOperationIsNotBlank")
            }
        })
    }
    _optionChanged(args) {
        switch (args.name) {
            case "closePopupOnTargetScroll":
                break;
            case "onEditorPreparing":
            case "onEditorPrepared":
            case "onValueChanged":
                this._initActions();
                break;
            case "customOperations":
                this._initCustomOperations();
                this._invalidate();
                break;
            case "fields":
            case "maxGroupLevel":
            case "groupOperations":
            case "allowHierarchicalFields":
            case "groupOperationDescriptions":
            case "filterOperationDescriptions":
                this._invalidate();
                break;
            case "value":
                if (args.value !== args.previousValue) {
                    var disableInvalidateForValue = this._disableInvalidateForValue;
                    if (!disableInvalidateForValue) {
                        this._initModel();
                        this._invalidate()
                    }
                    this._disableInvalidateForValue = false;
                    this.executeAction("onValueChanged", {
                        value: args.value,
                        previousValue: args.previousValue
                    });
                    this._disableInvalidateForValue = disableInvalidateForValue
                }
                break;
            default:
                super._optionChanged(args)
        }
    }
    getFilterExpression() {
        var fields = this._getNormalizedFields();
        var value = extend(true, [], this._model);
        return getFilterExpression(getNormalizedFilter(value), fields, this._customOperations, SOURCE)
    }
    _getNormalizedFields() {
        return getNormalizedFields(this.option("fields"))
    }
    _updateFilter() {
        this._disableInvalidateForValue = true;
        var value = extend(true, [], this._model);
        var normalizedValue = getNormalizedFilter(value);
        var oldValue = getNormalizedFilter(this._getModel(this.option("value")));
        if (JSON.stringify(oldValue) !== JSON.stringify(normalizedValue)) {
            this.option("value", normalizedValue)
        }
        this._disableInvalidateForValue = false;
        this._fireContentReadyAction()
    }
    _init() {
        this._initCustomOperations();
        this._initModel();
        this._initEditorFactory();
        this._initActions();
        super._init()
    }
    _initEditorFactory() {
        this._editorFactory = new EditorFactory
    }
    _initCustomOperations() {
        this._customOperations = getMergedOperations(this.option("customOperations"), this.option("filterOperationDescriptions.between"), this)
    }
    _getDefaultGroupOperation() {
        var _a, _b;
        return null !== (_b = null === (_a = this.option("groupOperations")) || void 0 === _a ? void 0 : _a[0]) && void 0 !== _b ? _b : OPERATORS.and
    }
    _getModel(value) {
        return convertToInnerStructure(value, this._customOperations, this._getDefaultGroupOperation())
    }
    _initModel() {
        this._model = this._getModel(this.option("value"))
    }
    _initActions() {
        var that = this;
        that._actions = {};
        ACTIONS.forEach(action => {
            var actionConfig = extend({}, action.config);
            that._actions[action.name] = that._createActionByOption(action.name, actionConfig)
        })
    }
    executeAction(actionName, options) {
        var action = this._actions[actionName];
        return action && action(options)
    }
    _initMarkup() {
        this.$element().addClass(FILTER_BUILDER_CLASS);
        super._initMarkup();
        this._createGroupElementByCriteria(this._model).appendTo(this.$element())
    }
    _createConditionElement(condition, parent) {
        return $("<div>").addClass(FILTER_BUILDER_GROUP_CLASS).append(this._createConditionItem(condition, parent))
    }
    _createGroupElementByCriteria(criteria, parent) {
        var groupLevel = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
        var $group = this._createGroupElement(criteria, parent, groupLevel);
        var $groupContent = $group.find(".".concat(FILTER_BUILDER_GROUP_CONTENT_CLASS));
        var groupCriteria = getGroupCriteria(criteria);
        for (var i = 0; i < groupCriteria.length; i++) {
            var innerCriteria = groupCriteria[i];
            if (isGroup(innerCriteria)) {
                this._createGroupElementByCriteria(innerCriteria, criteria, groupLevel + 1).appendTo($groupContent)
            } else if (isCondition(innerCriteria)) {
                this._createConditionElement(innerCriteria, criteria).appendTo($groupContent)
            }
        }
        return $group
    }
    _createGroupElement(criteria, parent, groupLevel) {
        var $groupItem = $("<div>").addClass(FILTER_BUILDER_GROUP_ITEM_CLASS);
        var $groupContent = $("<div>").addClass(FILTER_BUILDER_GROUP_CONTENT_CLASS);
        var $group = $("<div>").addClass(FILTER_BUILDER_GROUP_CLASS).append($groupItem).append($groupContent);
        if (null != parent) {
            this._createRemoveButton(() => {
                removeItem(parent, criteria);
                $group.remove();
                this._updateFilter()
            }).appendTo($groupItem)
        }
        this._createGroupOperationButton(criteria).appendTo($groupItem);
        this._createAddButton(() => {
            var newGroup = createEmptyGroup(this._getDefaultGroupOperation());
            addItem(newGroup, criteria);
            this._createGroupElement(newGroup, criteria, groupLevel + 1).appendTo($groupContent);
            this._updateFilter()
        }, () => {
            var field = this.option("fields")[0];
            var newCondition = createCondition(field, this._customOperations);
            addItem(newCondition, criteria);
            this._createConditionElement(newCondition, criteria).appendTo($groupContent);
            this._updateFilter()
        }, groupLevel).appendTo($groupItem);
        return $group
    }
    _createButton(caption) {
        return $("<div>").text(caption)
    }
    _createGroupOperationButton(criteria) {
        var groupOperations = this._getGroupOperations(criteria);
        var groupMenuItem = getGroupMenuItem(criteria, groupOperations);
        var caption = groupMenuItem.text;
        var $operationButton = groupOperations && groupOperations.length < 2 ? this._createButton(caption).addClass(DISABLED_STATE_CLASS) : this._createButtonWithMenu({
            caption: caption,
            menu: {
                items: groupOperations,
                displayExpr: "text",
                keyExpr: "value",
                onItemClick: e => {
                    if (groupMenuItem !== e.itemData) {
                        setGroupValue(criteria, e.itemData.value);
                        $operationButton.text(e.itemData.text);
                        groupMenuItem = e.itemData;
                        this._updateFilter()
                    }
                },
                onContentReady(e) {
                    e.component.selectItem(groupMenuItem)
                },
                cssClass: FILTER_BUILDER_GROUP_OPERATIONS_CLASS
            }
        });
        return $operationButton.addClass(FILTER_BUILDER_ITEM_TEXT_CLASS).addClass(FILTER_BUILDER_GROUP_OPERATION_CLASS).attr("tabindex", 0)
    }
    _createButtonWithMenu(options) {
        var that = this;
        var removeMenu = function() {
            that.$element().find(".".concat(ACTIVE_CLASS)).removeClass(ACTIVE_CLASS);
            that.$element().find(".dx-overlay .dx-treeview").remove();
            that.$element().find(".dx-overlay").remove()
        };
        var rtlEnabled = this.option("rtlEnabled");
        var position = rtlEnabled ? "right" : "left";
        var $button = this._createButton(options.caption);
        extend(options.menu, {
            focusStateEnabled: true,
            selectionMode: "single",
            onItemClick: (handler = options.menu.onItemClick, function(e) {
                handler(e);
                if ("dxclick" === e.event.type) {
                    removeMenu()
                }
            }),
            onHiding() {
                $button.removeClass(ACTIVE_CLASS)
            },
            position: {
                my: "".concat(position, " top"),
                at: "".concat(position, " bottom"),
                offset: "0 1",
                of: $button,
                collision: "flip"
            },
            animation: null,
            onHidden() {
                removeMenu()
            },
            cssClass: "".concat(FILTER_BUILDER_OVERLAY_CLASS, " ").concat(options.menu.cssClass),
            rtlEnabled: rtlEnabled
        });
        var handler;
        options.popup = {
            onShown(info) {
                var treeViewElement = $(info.component.content()).find(".dx-treeview");
                var treeView = treeViewElement.dxTreeView("instance");
                eventsEngine.on(treeViewElement, "keyup keydown", e => {
                    var keyName = normalizeKeyName(e);
                    if ("keydown" === e.type && keyName === TAB_KEY || "keyup" === e.type && (keyName === ESCAPE_KEY || keyName === ENTER_KEY)) {
                        info.component.hide();
                        eventsEngine.trigger(options.menu.position.of, "focus")
                    }
                });
                treeView.focus();
                treeView.option("focusedElement", null)
            }
        };
        this._subscribeOnClickAndEnterKey($button, () => {
            removeMenu();
            that._createPopupWithTreeView(options, that.$element());
            $button.addClass(ACTIVE_CLASS)
        });
        return $button
    }
    _hasValueButton(condition) {
        var customOperation = getCustomOperation(this._customOperations, condition[1]);
        return customOperation ? false !== customOperation.hasValue : null !== condition[2]
    }
    _createOperationButtonWithMenu(condition, field) {
        var that = this;
        var availableOperations = getAvailableOperations(field, this.option("filterOperationDescriptions"), this._customOperations);
        var currentOperation = getOperationFromAvailable(getOperationValue(condition), availableOperations);
        var $operationButton = this._createButtonWithMenu({
            caption: currentOperation.text,
            menu: {
                items: availableOperations,
                displayExpr: "text",
                onItemRendered(e) {
                    e.itemData.isCustom && $(e.itemElement).addClass(FILTER_BUILDER_MENU_CUSTOM_OPERATION_CLASS)
                },
                onContentReady(e) {
                    e.component.selectItem(currentOperation)
                },
                onItemClick: e => {
                    if (currentOperation !== e.itemData) {
                        currentOperation = e.itemData;
                        updateConditionByOperation(condition, currentOperation.value, that._customOperations);
                        var $valueButton = $operationButton.siblings().filter(".".concat(FILTER_BUILDER_ITEM_VALUE_CLASS));
                        if (that._hasValueButton(condition)) {
                            if (0 !== $valueButton.length) {
                                $valueButton.remove()
                            }
                            that._createValueButton(condition, field).appendTo($operationButton.parent())
                        } else {
                            $valueButton.remove()
                        }
                        $operationButton.text(currentOperation.text);
                        this._updateFilter()
                    }
                },
                cssClass: FILTER_BUILDER_FILTER_OPERATIONS_CLASS
            }
        }).addClass(FILTER_BUILDER_ITEM_TEXT_CLASS).addClass(FILTER_BUILDER_ITEM_OPERATION_CLASS).attr("tabindex", 0);
        return $operationButton
    }
    _createOperationAndValueButtons(condition, field, $item) {
        this._createOperationButtonWithMenu(condition, field).appendTo($item);
        if (this._hasValueButton(condition)) {
            this._createValueButton(condition, field).appendTo($item)
        }
    }
    _createFieldButtonWithMenu(fields, condition, field) {
        var that = this;
        var allowHierarchicalFields = this.option("allowHierarchicalFields");
        var items = getItems(fields, allowHierarchicalFields);
        var item = getField(field.name || field.dataField, items);
        var getFullCaption = function(item, items) {
            return allowHierarchicalFields ? getCaptionWithParents(item, items) : item.caption
        };
        var $fieldButton = this._createButtonWithMenu({
            caption: getFullCaption(item, items),
            menu: {
                items: items,
                dataStructure: "plain",
                keyExpr: "id",
                parentId: "parentId",
                displayExpr: "caption",
                onItemClick: e => {
                    if (item !== e.itemData) {
                        item = e.itemData;
                        condition[0] = item.name || item.dataField;
                        condition[2] = "object" === item.dataType ? null : "";
                        updateConditionByOperation(condition, getDefaultOperation(item), that._customOperations);
                        $fieldButton.siblings().filter(".".concat(FILTER_BUILDER_ITEM_TEXT_CLASS)).remove();
                        that._createOperationAndValueButtons(condition, item, $fieldButton.parent());
                        var caption = getFullCaption(item, e.component.option("items"));
                        $fieldButton.text(caption);
                        this._updateFilter()
                    }
                },
                onContentReady(e) {
                    e.component.selectItem(item)
                },
                cssClass: FILTER_BUILDER_FIELDS_CLASS
            }
        }).addClass(FILTER_BUILDER_ITEM_TEXT_CLASS).addClass(FILTER_BUILDER_ITEM_FIELD_CLASS).attr("tabindex", 0);
        return $fieldButton
    }
    _createConditionItem(condition, parent) {
        var $item = $("<div>").addClass(FILTER_BUILDER_GROUP_ITEM_CLASS);
        var fields = this._getNormalizedFields();
        var field = getField(condition[0], fields);
        this._createRemoveButton(() => {
            removeItem(parent, condition);
            var isSingleChild = 1 === $item.parent().children().length;
            if (isSingleChild) {
                $item.parent().remove()
            } else {
                $item.remove()
            }
            this._updateFilter()
        }).appendTo($item);
        this._createFieldButtonWithMenu(fields, condition, field).appendTo($item);
        this._createOperationAndValueButtons(condition, field, $item);
        return $item
    }
    _getGroupOperations(criteria) {
        var groupOperations = this.option("groupOperations");
        var groupOperationDescriptions = this.option("groupOperationDescriptions");
        if (!groupOperations || !groupOperations.length) {
            groupOperations = [getGroupValue(criteria).replace("!", "not")]
        }
        return groupOperations.map(operation => ({
            text: groupOperationDescriptions[operation],
            value: OPERATORS[operation]
        }))
    }
    _createRemoveButton(handler) {
        var $removeButton = $("<div>").addClass(FILTER_BUILDER_IMAGE_CLASS).addClass(FILTER_BUILDER_IMAGE_REMOVE_CLASS).addClass(FILTER_BUILDER_ACTION_CLASS).attr("tabindex", 0);
        this._subscribeOnClickAndEnterKey($removeButton, handler);
        return $removeButton
    }
    _createAddButton(addGroupHandler, addConditionHandler, groupLevel) {
        var $button;
        var maxGroupLevel = this.option("maxGroupLevel");
        if (isDefined(maxGroupLevel) && groupLevel >= maxGroupLevel) {
            $button = this._createButton();
            this._subscribeOnClickAndEnterKey($button, addConditionHandler)
        } else {
            $button = this._createButtonWithMenu({
                menu: {
                    items: [{
                        caption: messageLocalization.format("dxFilterBuilder-addCondition"),
                        click: addConditionHandler
                    }, {
                        caption: messageLocalization.format("dxFilterBuilder-addGroup"),
                        click: addGroupHandler
                    }],
                    displayExpr: "caption",
                    onItemClick(e) {
                        e.itemData.click()
                    },
                    cssClass: FILTER_BUILDER_ADD_CONDITION_CLASS
                }
            })
        }
        return $button.addClass(FILTER_BUILDER_IMAGE_CLASS).addClass(FILTER_BUILDER_IMAGE_ADD_CLASS).addClass(FILTER_BUILDER_ACTION_CLASS).attr("tabindex", 0)
    }
    _createValueText(item, field, $container) {
        var that = this;
        var $text = $("<div>").html("&nbsp;").addClass(FILTER_BUILDER_ITEM_VALUE_TEXT_CLASS).attr("tabindex", 0).appendTo($container);
        var value = item[2];
        var customOperation = getCustomOperation(that._customOperations, item[1]);
        if (!customOperation && field.lookup) {
            getCurrentLookupValueText(field, value, result => {
                renderValueText($text, result)
            })
        } else {
            when(getCurrentValueText(field, value, customOperation)).done(result => {
                renderValueText($text, result, customOperation)
            })
        }
        that._subscribeOnClickAndEnterKey($text, e => {
            if ("keyup" === e.type) {
                e.stopPropagation()
            }
            that._createValueEditorWithEvents(item, field, $container)
        });
        return $text
    }
    _updateConditionValue(item, value, callback) {
        var areValuesDifferent = item[2] !== value;
        if (areValuesDifferent) {
            item[2] = value
        }
        callback();
        this._updateFilter()
    }
    _addDocumentKeyUp($editor, handler) {
        var isComposing = false;
        var hasCompositionJustEnded = false;
        var document = domAdapter.getDocument();
        var documentKeyUpHandler = e => {
            if (isComposing || hasCompositionJustEnded) {
                hasCompositionJustEnded = false;
                return
            }
            handler(e)
        };
        eventsEngine.on(document, "keyup", documentKeyUpHandler);
        var input = $editor.find("input");
        eventsEngine.on(input, "compositionstart", () => {
            isComposing = true
        });
        eventsEngine.on(input, "compositionend", () => {
            isComposing = false;
            hasCompositionJustEnded = true
        });
        eventsEngine.on(input, "keydown", event => {
            if (229 !== event.which) {
                hasCompositionJustEnded = false
            }
        });
        this._documentKeyUpHandler = documentKeyUpHandler
    }
    _addDocumentClick($editor, closeEditorFunc) {
        var document = domAdapter.getDocument();
        var documentClickHandler = e => {
            if (!this._isFocusOnEditorParts($editor, e.target)) {
                eventsEngine.trigger($editor.find("input"), "change");
                closeEditorFunc()
            }
        };
        eventsEngine.on(document, "dxpointerdown", documentClickHandler);
        this._documentClickHandler = documentClickHandler
    }
    _isFocusOnEditorParts($editor, target) {
        var activeElement = target || domAdapter.getActiveElement();
        return $(activeElement).closest($editor.children()).length || $(activeElement).closest(".dx-dropdowneditor-overlay").length
    }
    _removeEvents() {
        var document = domAdapter.getDocument();
        isDefined(this._documentKeyUpHandler) && eventsEngine.off(document, "keyup", this._documentKeyUpHandler);
        isDefined(this._documentClickHandler) && eventsEngine.off(document, "dxpointerdown", this._documentClickHandler)
    }
    _dispose() {
        this._removeEvents();
        super._dispose()
    }
    _createValueEditorWithEvents(item, field, $container) {
        var value = item[2];
        var createValueText = () => {
            $container.empty();
            this._removeEvents();
            return this._createValueText(item, field, $container)
        };
        var closeEditor = () => {
            this._updateConditionValue(item, value, () => {
                createValueText()
            })
        };
        var options = {
            value: "" === value ? null : value,
            filterOperation: getOperationValue(item),
            setValue(data) {
                value = null === data ? "" : data
            },
            closeEditor: closeEditor,
            text: $container.text()
        };
        $container.empty();
        var $editor = this._createValueEditor($container, field, options);
        eventsEngine.trigger($editor.find("input").not(":hidden").eq(0), "focus");
        this._removeEvents();
        this._addDocumentClick($editor, closeEditor);
        this._addDocumentKeyUp($editor, e => {
            var keyName = normalizeKeyName(e);
            if (keyName === TAB_KEY) {
                if (this._isFocusOnEditorParts($editor)) {
                    return
                }
                this._updateConditionValue(item, value, () => {
                    createValueText();
                    if (e.shiftKey) {
                        eventsEngine.trigger($container.prev(), "focus")
                    }
                })
            }
            if (keyName === ESCAPE_KEY) {
                eventsEngine.trigger(createValueText(), "focus")
            }
            if (keyName === ENTER_KEY) {
                this._updateConditionValue(item, value, () => {
                    eventsEngine.trigger(createValueText(), "focus")
                })
            }
        });
        this._fireContentReadyAction()
    }
    _createValueButton(item, field) {
        var $valueButton = $("<div>").addClass(FILTER_BUILDER_ITEM_TEXT_CLASS).addClass(FILTER_BUILDER_ITEM_VALUE_CLASS);
        this._createValueText(item, field, $valueButton);
        return $valueButton
    }
    _createValueEditor($container, field, options) {
        var $editor = $("<div>").attr("tabindex", 0).appendTo($container);
        var customOperation = getCustomOperation(this._customOperations, options.filterOperation);
        var editorTemplate = customOperation && customOperation.editorTemplate ? customOperation.editorTemplate : field.editorTemplate;
        if (editorTemplate) {
            var template = this._getTemplate(editorTemplate);
            template.render({
                model: extend({
                    field: field
                }, options),
                container: $editor
            })
        } else {
            this._editorFactory.createEditor.call(this, $editor, extend({}, field, options, {
                parentType: SOURCE
            }))
        }
        return $editor
    }
    _createPopupWithTreeView(options, $container) {
        var that = this;
        var $popup = $("<div>").addClass(options.menu.cssClass).appendTo($container);
        this._createComponent($popup, Popup, {
            onHiding: options.menu.onHiding,
            onHidden: options.menu.onHidden,
            rtlEnabled: options.menu.rtlEnabled,
            position: options.menu.position,
            animation: options.menu.animation,
            contentTemplate(contentElement) {
                var $menuContainer = $("<div>").appendTo(contentElement);
                that._createComponent($menuContainer, TreeView, options.menu);
                this.repaint()
            },
            _ignoreFunctionValueDeprecation: true,
            maxHeight: () => getElementMaxHeightByWindow(options.menu.position.of),
            visible: true,
            focusStateEnabled: false,
            hideOnParentScroll: this.option("closePopupOnTargetScroll"),
            hideOnOutsideClick: true,
            onShown: options.popup.onShown,
            shading: false,
            width: "auto",
            height: "auto",
            showTitle: false,
            _wrapperClassExternal: options.menu.cssClass
        })
    }
    _subscribeOnClickAndEnterKey($button, handler) {
        eventsEngine.on($button, "dxclick", handler);
        eventsEngine.on($button, "keyup", e => {
            if (normalizeKeyName(e) === ENTER_KEY) {
                handler(e)
            }
        })
    }
}
registerComponent("dxFilterBuilder", FilterBuilder);
export default FilterBuilder;
