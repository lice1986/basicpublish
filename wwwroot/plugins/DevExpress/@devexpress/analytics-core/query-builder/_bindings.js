﻿/**
* DevExpress Analytics (query-builder\_bindings.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { noDataText } from '../property-grid/localization/_localization';
import { addDisposeCallback } from '../serializer/_internal';
import { getTemplate } from '../property-grid/widgets/templateUtils';
import { Resizable } from '../core/internal/_resizable';
import { convertFromCssPixelUnits, convertToCssPixelUnits } from '../core/internal/_utils.unitsConvertation';
ko.bindingHandlers['dxdTableView'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        const templateHtml = getTemplate('dxd-tableview');
        let $element = $.fn.constructor(element).append(templateHtml), $titles, $content;
        const rtl = !!bindingContext.$root.rtl, value = ko.unwrap(valueAccessor());
        const onDataScroll = (e) => {
            if (e.scrollOffset.left >= 0) {
                if (!$titles)
                    $titles = $element.find('.dxd-tableview-titles');
                if (!$content)
                    $content = $element.find('.dxd-tableview-data table');
                $titles.offset({ left: $content.offset().left, top: $titles.offset().top });
            }
        };
        const onDataScrollInitialized = (e) => {
            $content = null;
            if (!rtl)
                return;
            const dxScroll = e.component;
            setTimeout(() => dxScroll.scrollTo({ left: dxScroll.scrollWidth(), top: 0 }), 1);
        };
        ko.applyBindings({
            onDataScroll: onDataScroll,
            onDataScrollInitialized: onDataScrollInitialized,
            data: value,
            rtl: rtl,
            noDataText: noDataText,
            isImage: index => value.schema[index].type === 'System.Byte[]',
            isImageTooLarge: cellValue => cellValue[0] === '!',
            getImageTooLargeText: cellValue => 'Image too large (' + cellValue.substring(1) + ' bytes)'
        }, $element.children()[0]);
        $element.find('.dxd-tableview-titles .dxd-tableview-resizable').each((index, resizable) => {
            const $title = $.fn.constructor(resizable).find('.dxd-tableview-cell-text');
            const $column = $element.find('.dxd-tableview-data .dxd-tableview-resizable' + index);
            if (index < value.schema.length - 1) {
                const resizableElement = new Resizable(resizable, {
                    handles: 'e',
                    start: (e, ui) => { },
                    stop: () => { },
                    resize: (e, element) => {
                        const startResizePosition = convertFromCssPixelUnits(element.dataset.originalLeftMousePosition);
                        const originalWidth = convertFromCssPixelUnits(element.dataset.originalWidth);
                        const sizeDiff = e.x - startResizePosition;
                        const newWidth = originalWidth + sizeDiff;
                        element.style.width = convertToCssPixelUnits(newWidth);
                        $title.outerWidth(newWidth);
                        $column.outerWidth(newWidth);
                        $column.parent().width(newWidth);
                    }
                }).initialize();
                addDisposeCallback(resizable, () => {
                    resizableElement.dispose();
                });
            }
            const maxWidth = Math.max($title.width(), $column.width());
            $title.width(maxWidth);
            $column.width(maxWidth);
        });
        addDisposeCallback($element.children()[0], () => {
            $element = null;
        });
        return { controlsDescendantBindings: true };
    }
};