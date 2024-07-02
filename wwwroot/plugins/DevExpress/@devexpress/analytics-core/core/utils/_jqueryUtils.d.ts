﻿/**
* DevExpress Analytics (core\utils\_jqueryUtils.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface IJQueryWrapper {
    isVisible: () => boolean;
    has: (target: HTMLElement) => boolean;
    is: (target: HTMLElement | string) => boolean;
    hasClass: (className: string) => boolean;
    outerWidth: () => number;
    outerHeight: () => number;
    width: () => number;
    height: () => number;
    empty: () => IJQueryWrapper;
    hide: () => IJQueryWrapper;
    show: () => IJQueryWrapper;
    find: (selector: string, filterVisible?: boolean) => IJQueryWrapper;
    css: (styles: object | string, value?: string) => string;
    children: (selector: string) => IJQueryWrapper;
    closest: (selector: string) => IJQueryWrapper;
    removeClass: (className: string) => IJQueryWrapper;
    addClass: (className: string) => IJQueryWrapper;
    offset: () => {
        left: number;
        top: number;
    };
    position: () => {
        left: number;
        top: number;
    };
    get: (index: number) => HTMLElement;
    append: (content: string) => void;
    parentElement: () => IJQueryWrapper;
    prepend: (topElement: HTMLElement) => void;
    element: HTMLElement;
    length: number;
    [index: number]: HTMLElement;
}
export declare function $unwrap(_element: HTMLElement | Array<HTMLElement>): HTMLElement;
export declare const $dx: (_element: HTMLElement | HTMLElement[] | string) => IJQueryWrapper;