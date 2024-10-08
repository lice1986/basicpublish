﻿/**
* DevExpress Analytics (property-grid\widgets\internal\_bindingsCache.ko.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import config from 'devextreme/core/config';
import * as ko from 'knockout';
import { getFromCache } from './_bindingsCache';
const currentParseBindingsString = ko.bindingProvider.prototype.parseBindingsString;
ko.utils.extend(ko.bindingProvider.prototype, {
    'parseBindingsString': function (bindingsString, bindingContext, node, options) {
        try {
            const func = getFromCache(bindingsString.trim());
            if (func)
                return func(bindingContext, node);
            return currentParseBindingsString.call(ko.bindingProvider.instance, bindingsString, bindingContext, node, options);
        }
        catch (ex) {
            ex.message = 'Unable to parse bindings.\nBindings value: ' + bindingsString + '\nMessage: ' + ex.message;
            throw ex;
        }
    }
});
const optionsParser = config()['optionsParser'];
config({
    optionsParser: function (optionsString) {
        const func = getFromCache(optionsString.trim());
        if (func)
            return func();
        return optionsParser(optionsString);
    }
});
