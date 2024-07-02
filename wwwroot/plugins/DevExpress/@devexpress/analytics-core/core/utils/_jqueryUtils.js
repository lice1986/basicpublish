﻿/**
* DevExpress Analytics (core\utils\_jqueryUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function $unwrap(_element) {
    if (!!_element && 'length' in _element) {
        return _element[0];
    }
    return _element;
}
export const $dx = (_element) => {
    let _unwrapedElement = _element;
    if (!Array.isArray(_unwrapedElement) && typeof _element !== 'string') {
        _unwrapedElement = $unwrap(_element);
    }
    let element = null;
    let length = 0;
    const indexer = {};
    if (typeof _unwrapedElement === 'string') {
        element = document.querySelector(_unwrapedElement);
        length = document.querySelectorAll(_unwrapedElement).length;
    }
    else if (Array.isArray(_unwrapedElement)) {
        element = _unwrapedElement[0];
        _unwrapedElement.forEach((htmlElement, i) => indexer[i] = htmlElement);
        length = _unwrapedElement.length;
    }
    else if (_unwrapedElement && typeof _unwrapedElement === 'object') {
        element = _unwrapedElement;
        indexer[0] = element;
        length = 1;
    }
    return Object.assign(Object.assign({}, indexer), { length: length, element: element, isVisible: () => {
            if (!element)
                return undefined;
            const style = getComputedStyle(element);
            return style.display !== 'none' && style.visibility !== 'hidden';
        }, is: (target) => {
            if (typeof target === 'string') {
                return element === null || element === void 0 ? void 0 : element.matches(target);
            }
            else {
                return element === target;
            }
        }, has: (target) => {
            return element === null || element === void 0 ? void 0 : element.contains(target);
        }, hasClass: (className) => {
            if (!element)
                return undefined;
            return element.classList.contains(className);
        }, width: () => element === null || element === void 0 ? void 0 : element.getBoundingClientRect().width, height: () => element === null || element === void 0 ? void 0 : element.getBoundingClientRect().height, outerWidth: () => {
            if (!element)
                return undefined;
            const totalWidth = element.offsetWidth;
            const horizontalPadding = parseFloat(getComputedStyle(element).paddingLeft) +
                parseFloat(getComputedStyle(element).paddingRight);
            const horizontalBorder = parseFloat(getComputedStyle(element).borderLeftWidth) +
                parseFloat(getComputedStyle(element).borderRightWidth);
            return totalWidth + horizontalPadding + horizontalBorder;
        }, outerHeight: () => {
            if (!element)
                return undefined;
            const totalHeight = element.offsetHeight;
            const verticalPadding = parseFloat(getComputedStyle(element).paddingTop) +
                parseFloat(getComputedStyle(element).paddingBottom);
            const verticalBorder = parseFloat(getComputedStyle(element).borderTopWidth) +
                parseFloat(getComputedStyle(element).borderBottomWidth);
            const outerHeight = totalHeight + verticalPadding + verticalBorder;
            return outerHeight;
        }, empty: () => {
            while (element === null || element === void 0 ? void 0 : element.firstChild) {
                element.removeChild(element.firstChild);
            }
            return $dx(element);
        }, hide: () => { if (element)
            element.style.display = 'none'; return $dx(element); }, show: () => { if (element)
            element.style.display = 'block'; return $dx(element); }, find: (selector, filterVisible = false) => {
            if (!element)
                return $dx(undefined);
            if (selector.indexOf(':visible') !== -1) {
                filterVisible = true;
                selector = selector.split(':visible')[0];
            }
            const visibleElements = Array.from(element.querySelectorAll(selector));
            let result = visibleElements.map(x => $dx(x));
            if (filterVisible)
                result = result.filter(x => x.isVisible());
            return result[0] || $dx(undefined);
        }, closest: (selector) => $dx(element === null || element === void 0 ? void 0 : element.closest(selector)), css: (styles, value) => {
            if (!element)
                return undefined;
            if (typeof styles === 'string') {
                value && element.style.setProperty(styles, value);
                return getComputedStyle(element)[styles] || '';
            }
            else if (typeof styles === 'object') {
                for (const property in styles) {
                    if (styles.hasOwnProperty(property)) {
                        element.style.setProperty(property, styles[property]);
                    }
                }
            }
        }, children: (selector) => {
            if (!element)
                return $dx(undefined);
            const children = element.children;
            const filteredChildren = Array.from(children).filter(child => child.matches(selector));
            const wrappedItems = filteredChildren.map(x => $dx(x));
            return wrappedItems[0] || $dx(undefined);
        }, addClass: (className) => {
            if (!element)
                return $dx(element);
            element.classList.add(className);
            return $dx(element);
        }, removeClass: (className) => {
            if (!element)
                return $dx(element);
            element.classList.remove(className);
            return $dx(element);
        }, parentElement: () => {
            if (!element)
                return $dx(element);
            return $dx(element.parentElement);
        }, offset: () => {
            if (!element)
                return undefined;
            const rect = element.getBoundingClientRect();
            return { left: rect.left + window.scrollX, top: rect.top + window.scrollY };
        }, position: () => {
            if (!element)
                return undefined;
            const rect = element.getBoundingClientRect();
            const offsetParent = element.offsetParent;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const offsetLeft = rect.left + scrollLeft - (offsetParent ? offsetParent.offsetLeft : 0);
            const offsetTop = rect.top + scrollTop - (offsetParent ? offsetParent.offsetTop : 0);
            return {
                left: offsetLeft,
                top: offsetTop,
            };
        }, get: (index) => {
            return indexer[index];
        }, append: (content) => {
            if (!element)
                return;
            const tempElement = document.createElement('div');
            tempElement.innerHTML = content.trim();
            while (tempElement.firstChild) {
                element.appendChild(tempElement.firstChild);
            }
        }, prepend: (topElement) => {
            if (!element)
                return;
            element.prepend(topElement);
        } });
};