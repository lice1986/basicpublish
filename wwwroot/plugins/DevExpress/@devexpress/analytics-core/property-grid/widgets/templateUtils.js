﻿/**
* DevExpress Analytics (property-grid\widgets\templateUtils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SvgTemplatesEngine } from './internal/_svgTemplateEngine';
export function addTemplate(templateName, templateMarkup) {
    SvgTemplatesEngine.addTemplate(templateName, templateMarkup);
}
export function getTemplate(_id) {
    const id = _id[0] === '#' ? _id.substr(1) : _id;
    const item = document.querySelector('#' + id);
    return item && item.innerHTML || SvgTemplatesEngine.templates[id];
}