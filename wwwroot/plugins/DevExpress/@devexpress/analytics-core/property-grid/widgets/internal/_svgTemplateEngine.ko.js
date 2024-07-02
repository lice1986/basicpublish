﻿/**
* DevExpress Analytics (property-grid\widgets\internal\_svgTemplateEngine.ko.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SvgTemplatesEngine, SvgTemplateSource } from './_svgTemplateEngine';
const makeTemplateSource = ko.templateEngine.prototype['makeTemplateSource'];
ko.templateEngine.prototype['makeTemplateSource'] = function (template, doc) {
    if (typeof template === 'string' && SvgTemplatesEngine.getExistingTemplate(template, false) && !document.getElementById(template)) {
        return new SvgTemplateSource(template, SvgTemplatesEngine['_instance']['_data'], SvgTemplatesEngine.templates);
    }
    else {
        return makeTemplateSource.apply(this, [template, doc]);
    }
};