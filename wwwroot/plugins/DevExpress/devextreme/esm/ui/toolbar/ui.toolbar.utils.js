/**
 * DevExtreme (esm/ui/toolbar/ui.toolbar.utils.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import $ from "../../core/renderer";
var BUTTON_GROUP_CLASS = "dx-buttongroup";
var TOOLBAR_ITEMS = ["dxAutocomplete", "dxButton", "dxCheckBox", "dxDateBox", "dxMenu", "dxSelectBox", "dxTabs", "dxTextBox", "dxButtonGroup", "dxDropDownButton"];
var getItemInstance = function($element) {
    var itemData = $element.data && $element.data();
    var dxComponents = itemData && itemData.dxComponents;
    var widgetName = dxComponents && dxComponents[0];
    return widgetName && itemData[widgetName]
};
export function toggleItemFocusableElementTabIndex(context, item) {
    var _itemData$options;
    if (!context) {
        return
    }
    var $item = context._findItemElementByItem(item);
    if (!$item.length) {
        return
    }
    var itemData = context._getItemData($item);
    var isItemNotFocusable = !!(null !== (_itemData$options = itemData.options) && void 0 !== _itemData$options && _itemData$options.disabled || itemData.disabled || context.option("disabled"));
    var {
        widget: widget
    } = itemData;
    if (widget && -1 !== TOOLBAR_ITEMS.indexOf(widget)) {
        var $widget = $item.find(widget.toLowerCase().replace("dx", ".dx-"));
        if ($widget.length) {
            var _itemInstance$_focusT, _itemData$options2;
            var itemInstance = getItemInstance($widget);
            if (!itemInstance) {
                return
            }
            var $focusTarget = null === (_itemInstance$_focusT = itemInstance._focusTarget) || void 0 === _itemInstance$_focusT ? void 0 : _itemInstance$_focusT.call(itemInstance);
            if ("dxDropDownButton" === widget) {
                $focusTarget = $focusTarget && $focusTarget.find(".".concat(BUTTON_GROUP_CLASS))
            } else {
                var _$focusTarget;
                $focusTarget = null !== (_$focusTarget = $focusTarget) && void 0 !== _$focusTarget ? _$focusTarget : $(itemInstance.element())
            }
            var tabIndex = null === (_itemData$options2 = itemData.options) || void 0 === _itemData$options2 ? void 0 : _itemData$options2.tabIndex;
            if (isItemNotFocusable) {
                $focusTarget.attr("tabIndex", -1)
            } else {
                $focusTarget.attr("tabIndex", null !== tabIndex && void 0 !== tabIndex ? tabIndex : 0)
            }
        }
    }
}
