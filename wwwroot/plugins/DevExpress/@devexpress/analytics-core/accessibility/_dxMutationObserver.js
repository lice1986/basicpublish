﻿/**
* DevExpress Analytics (accessibility\_dxMutationObserver.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export function initializeMutationObserver(element, mutationObserverArgs, accessibilityCompliant) {
    const { onInitialized, onDomUpdated, onDispose, controlElementClassName } = mutationObserverArgs;
    const observerCallback = (records, selector) => {
        records.some(record => record.target.querySelector(`.${selector}`)) && onDomUpdated();
    };
    const observer = new MutationObserver(records => observerCallback(records, controlElementClassName));
    observer.observe(element, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style']
    });
    onInitialized(element, accessibilityCompliant);
    return () => {
        observer.disconnect();
        onDispose();
    };
}
