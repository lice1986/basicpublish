﻿/**
* DevExpress HTML/JS Reporting (dx-rich-edit-templates.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SvgTemplatesEngine } from '@devexpress/analytics-core/analytics-widgets-internal-native';
SvgTemplatesEngine.addTemplates({
    'dxrd-rich-edit': '<div class="dxrd-width-100 dxrd-height-100" data-bind="css: className"> <div data-bind="visible: visible"> <!-- ko with: getToolbar() --> <!-- ko template: { name: template, data: $data }--> <!-- /ko --> <!-- /ko --> </div> </div>',
    'dxrd-richedit-toolbar': '<div class="dxrd-z-index-0 dxrd-position-absolute" data-bind="dxPopover: { width: \'auto\', height: \'auto\', position: { my: \'right center\', at: \'left center\', boundary: \'.dxrd-designer-wrapper\', of: getPositionTarget($element), collision: \'flip fit\', offset: \'-10 0\' }, container: getPopupContainer($element), onContentReady: onContentReady, hideOnOutsideClick: hideOnOutsideClick, closeOnTargetScroll: false, showTitle: false, target: getPositionTarget($element), showCloseButton: false, shading: false, visible: visible, animation: {} }"> <div class="dxrd-rich-toolbar-popover-content"> <!-- ko foreach: componentCollection --> <!-- ko if: $data.visible --> <!-- ko template: { name: $data.template, data: $data } --> <!-- /ko --> <!-- /ko --> <!-- /ko --> </div> </div>',
    'dxrd-rich-edit-toolbar-component-collection': '<div class="dxrd-toolbar-elements-line"> <!-- ko if: $index() !== 0 --> <div class="dxrd-toolbar-elements-line-bottom dxd-border-secondary"></div> <!-- /ko --> <!-- ko if: $data.showTitle() --> <div class="dxrd-rich-toolbar-header" data-bind="text: $data.showTitle();"></div> <!-- /ko --> <div class="dxrd-rich-toolbar-value"> <!-- ko foreach: { data: $data.items } --> <!-- ko if: $data.visible --> <!-- ko template: { name: $data.template, data: $data } --> <!-- /ko --> <!-- /ko --> <!-- /ko --> </div> </div>',
    'dxrd-rich-edit-toolbar-button-group': '<div data-bind="dxButtonGroup:{ items: items, keyExpr: itemKey, selectedItems: selectedItems, selectionMode: selectionMode, stylingMode: \'text\', focusStateEnabled: false}"></div>',
    'dxrd-button-with-template': '<div data-bind="dxButton: { onClick: $data.clickAction, icon: $data.icon, hint: $data.hint, stylingMode: \'text\', focusStateEnabled: false }"></div>',
    'dxrd-richEdit-toolbar-colorpicker': '<div data-bind="dxColorBox: { value: value, popupPosition: { collision: \'flipfit flipfit\' }, focusStateEnabled: false }"></div>',
    'dxrd-rich-toolbar-combobox': '<div data-bind="dxLocalizedSelectBox: { dataSource: items, value: value, focusStateEnabled: false, searchEnabled: !supportCustomValue, displayCustomValue: true,  acceptCustomValue: supportCustomValue, openOnFieldClick: !supportCustomValue }, dxValidator: { validationRules: validationRules }"></div>',
    'dxrd-richedit-content': '<div data-bind="css:{ \'dxrd-intersect\': !isValid() }" class="dxrd-box-sizing-border-box dxrd-letter-spacing-normal dxrd-width-100 dxrd-height-100"> <div data-bind="style: { display: isValid()? \'inline\' : \'none\' }"> <div  class="dxrd-control-content dxrd-richedit-readonly dxrd-width-100 dxrd-height-100 dxrd-vertical-align-top" data-bind="style: contentCss"></div> </div> <!-- ko if: !isValid() --> <div data-bind="text: \'Document is not valid\'"></div> <!-- /ko --></div>',
    'dxrd-richedit-selection': '<div class="dxrd-control" data-bind="event: { dblclick: function() { $root.richInlineControl.show($element) } }, visible: selected() || focused(), css: {\'dxrd-selected dxrd-context-menu-container\': selected, \'dxrd-focused\': focused, \'dxrd-intersect\': isIntersect, \'dxrd-locked\': locked }, resizable: $root.resizeHandler, draggable: $root.dragHandler, styleunit: position, trackCursor: underCursor"> <!-- ko if: selected() --> <div class="dxd-border-accented dxrd-control-border-box" data-bind="style: { \'backgroundColor\': $root.richInlineControl.visible() && selected() ? \'#FFF\' : \'transparent\' }"></div> <!-- /ko --></div><div class="dxrd-control dxrd-context-menu-container" data-bind="visible: !(selected() && focused()), styleunit: position, trackCursor: underCursor, style:{ overflow: isSelected() ? \'visible\' : \'hidden\'}"> <div class="dxrd-control-content-select-main" data-bind="styleunit: { \'top\': contentSizes().top + (isIntersect() ? 1 : 0), \'left\': contentSizes().left + (isIntersect()? 1 : 0), lineHeight: contentSizes().height, height: contentSizes().height, width: contentSizes().width}"> </div></div><div class="dxrd-control dxrd-richedit-selected" data-bind="styleunit: position, trackCursor: underCursor, style:{ pointerEvents: $root.richInlineControl.visible() && selected() ? \'auto\' : \'none\'  }"> <div class="dxrd-control-content-main" data-bind="styleunit: defaultStyleunit"> <div class="dxrd-richedit-selected-content" data-bind="zoom: _context.zoom(), styleunit: { \'height\': contentHeightWithoutZoom, \'width\': contentWidthWithoutZoom }, dxRichSurface: { inlineEdit: $root.richInlineControl }"> </div> </div></div>'
});
