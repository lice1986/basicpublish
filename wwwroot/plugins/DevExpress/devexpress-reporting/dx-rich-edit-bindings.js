﻿/**
* DevExpress HTML/JS Reporting (dx-rich-edit-bindings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { addToBindingsCache } from '@devexpress/analytics-core/analytics-widgets-internal';
addToBindingsCache('css: className', function ($context, $element) { return { 'css': function () { return $context.$data.className; } }; });
addToBindingsCache('dxPopover: { width: \'auto\', height: \'auto\', position: { my: \'right center\', at: \'left center\', boundary: \'.dxrd-designer-wrapper\', of: getPositionTarget($element), collision: \'flip fit\', offset: \'-10 0\' }, container: getPopupContainer($element), onContentReady: onContentReady, hideOnOutsideClick: hideOnOutsideClick, closeOnTargetScroll: false, showTitle: false, target: getPositionTarget($element), showCloseButton: false, shading: false, visible: visible, animation: {} }', function ($context, $element) { return { 'dxPopover': function () { return { 'width': 'auto', 'height': 'auto', 'position': { 'my': 'right center', 'at': 'left center', 'boundary': '.dxrd-designer-wrapper', 'of': $context.$data.getPositionTarget($element), 'collision': 'flip fit', 'offset': '-10 0' }, 'container': $context.$data.getPopupContainer($element), 'onContentReady': $context.$data.onContentReady, 'hideOnOutsideClick': $context.$data.hideOnOutsideClick, 'closeOnTargetScroll': false, 'showTitle': false, 'target': $context.$data.getPositionTarget($element), 'showCloseButton': false, 'shading': false, 'visible': $context.$data.visible, 'animation': {} }; } }; });
addToBindingsCache('text: $data.showTitle();', function ($context, $element) { return { 'text': function () { return $context.$data.showTitle(); } }; });
addToBindingsCache('dxButtonGroup:{ items: items, keyExpr: itemKey, selectedItems: selectedItems, selectionMode: selectionMode, stylingMode: \'text\', focusStateEnabled: false}', function ($context, $element) { return { 'dxButtonGroup': function () { return { 'items': $context.$data.items, 'keyExpr': $context.$data.itemKey, 'selectedItems': $context.$data.selectedItems, 'selectionMode': $context.$data.selectionMode, 'stylingMode': 'text', 'focusStateEnabled': false }; } }; });
addToBindingsCache('dxButton: { onClick: $data.clickAction, icon: $data.icon, hint: $data.hint, stylingMode: \'text\', focusStateEnabled: false }', function ($context, $element) { return { 'dxButton': function () { return { 'onClick': $context.$data.clickAction, 'icon': $context.$data.icon, 'hint': $context.$data.hint, 'stylingMode': 'text', 'focusStateEnabled': false }; } }; });
addToBindingsCache('dxColorBox: { value: value, popupPosition: { collision: \'flipfit flipfit\' }, focusStateEnabled: false }', function ($context, $element) { return { 'dxColorBox': function () { return { 'value': $context.$data.value, 'popupPosition': { 'collision': 'flipfit flipfit' }, 'focusStateEnabled': false }; } }; });
addToBindingsCache('dxLocalizedSelectBox: { dataSource: items, value: value, focusStateEnabled: false, searchEnabled: !supportCustomValue, displayCustomValue: true,  acceptCustomValue: supportCustomValue, openOnFieldClick: !supportCustomValue }, dxValidator: { validationRules: validationRules }', function ($context, $element) { return { 'dxLocalizedSelectBox': function () { return { 'dataSource': $context.$data.items, 'value': $context.$data.value, 'focusStateEnabled': false, 'searchEnabled': !$context.$data.supportCustomValue, 'displayCustomValue': true, 'acceptCustomValue': $context.$data.supportCustomValue, 'openOnFieldClick': !$context.$data.supportCustomValue }; }, 'dxValidator': function () { return { 'validationRules': $context.$data.validationRules }; } }; });
addToBindingsCache('with: getToolbar()', function ($context, $element) { return { 'with': function () { return $context.$data.getToolbar(); } }; });
addToBindingsCache('template: { name: template, data: $data }', function ($context, $element) { return { 'template': function () { return { 'name': $context.$data.template, 'data': $context.$data }; } }; });
addToBindingsCache('foreach: componentCollection', function ($context, $element) { return { 'foreach': function () { return $context.$data.componentCollection; } }; });
addToBindingsCache('template: { name: $data.template, data: $data }', function ($context, $element) { return { 'template': function () { return { 'name': $context.$data.template, 'data': $context.$data }; } }; });
addToBindingsCache('if: $index() !== 0', function ($context, $element) { return { 'if': function () { return $context.$index() !== 0; } }; });
addToBindingsCache('if: $data.showTitle()', function ($context, $element) { return { 'if': function () { return $context.$data.showTitle(); } }; });
addToBindingsCache('foreach: { data: $data.items }', function ($context, $element) { return { 'foreach': function () { return { 'data': $context.$data.items }; } }; });
addToBindingsCache('css:{ \'dxrd-intersect\': !isValid() }', function ($context, $element) { return { 'css': function () { return { 'dxrd-intersect': !$context.$data.isValid() }; } }; });
addToBindingsCache('style: { display: isValid()? \'inline\' : \'none\' }', function ($context, $element) { return { 'style': function () { return { 'display': $context.$data.isValid() ? 'inline' : 'none' }; } }; });
addToBindingsCache('text: \'Document is not valid\'', function ($context, $element) { return { 'text': function () { return 'Document is not valid'; } }; });
addToBindingsCache('if: !isValid()', function ($context, $element) { return { 'if': function () { return !$context.$data.isValid(); } }; });
addToBindingsCache('event: { dblclick: function() { $root.richInlineControl.show($element) } }, visible: selected() || focused(), css: {\'dxrd-selected dxrd-context-menu-container\': selected, \'dxrd-focused\': focused, \'dxrd-intersect\': isIntersect, \'dxrd-locked\': locked }, resizable: $root.resizeHandler, draggable: $root.dragHandler, styleunit: position, trackCursor: underCursor', function ($context, $element) { return { 'event': function () { return { 'dblclick': function () { $context.$root.richInlineControl.show($element); } }; }, 'visible': function () { return $context.$data.selected() || $context.$data.focused(); }, 'css': function () { return { 'dxrd-selected dxrd-context-menu-container': $context.$data.selected, 'dxrd-focused': $context.$data.focused, 'dxrd-intersect': $context.$data.isIntersect, 'dxrd-locked': $context.$data.locked }; }, 'resizable': function () { return $context.$root.resizeHandler; }, 'draggable': function () { return $context.$root.dragHandler; }, 'styleunit': function () { return $context.$data.position; }, 'trackCursor': function () { return $context.$data.underCursor; } }; });
addToBindingsCache('style: { \'backgroundColor\': $root.richInlineControl.visible() && selected() ? \'#FFF\' : \'transparent\' }', function ($context, $element) { return { 'style': function () { return { 'backgroundColor': $context.$root.richInlineControl.visible() && $context.$data.selected() ? '#FFF' : 'transparent' }; } }; });
addToBindingsCache('styleunit: position, trackCursor: underCursor, style:{ pointerEvents: $root.richInlineControl.visible() && selected() ? \'auto\' : \'none\'  }', function ($context, $element) { return { 'styleunit': function () { return $context.$data.position; }, 'trackCursor': function () { return $context.$data.underCursor; }, 'style': function () { return { 'pointerEvents': $context.$root.richInlineControl.visible() && $context.$data.selected() ? 'auto' : 'none' }; } }; });
addToBindingsCache('styleunit: defaultStyleunit', function ($context, $element) { return { 'styleunit': function () { return $context.$data.defaultStyleunit; } }; });
addToBindingsCache('zoom: _context.zoom(), styleunit: { \'height\': contentHeightWithoutZoom, \'width\': contentWidthWithoutZoom }, dxRichSurface: { inlineEdit: $root.richInlineControl }', function ($context, $element) { return { 'zoom': function () { return $context.$data._context.zoom(); }, 'styleunit': function () { return { 'height': $context.$data.contentHeightWithoutZoom, 'width': $context.$data.contentWidthWithoutZoom }; }, 'dxRichSurface': function () { return { 'inlineEdit': $context.$root.richInlineControl }; } }; });
addToBindingsCache('if: selected()', function ($context, $element) { return { 'if': function () { return $context.$data.selected(); } }; });
