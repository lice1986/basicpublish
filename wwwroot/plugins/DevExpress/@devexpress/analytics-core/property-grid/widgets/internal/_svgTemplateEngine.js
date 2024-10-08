﻿/**
* DevExpress Analytics (property-grid\widgets\internal\_svgTemplateEngine.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '../../../serializer/_utils';
export class SvgTemplateSource {
    constructor(template, _data, _templates) {
        this._data = _data;
        this._templates = _templates;
        this.templateName = template;
    }
    data(key, value) {
        this._data[this.templateName] = this._data[this.templateName] || {};
        if (arguments.length === 1) {
            return this._data[this.templateName][key];
        }
        this._data[this.templateName][key] = value;
    }
    text(value) {
        if (arguments.length === 0) {
            if (this.templateName in this._templates)
                return this._templates[this.templateName];
            else
                throw new Error('Cannot find template with ID ' + this.templateName);
        }
        this._templates[this.templateName] = value;
    }
}
export class SvgTemplatesEngine {
    constructor() {
        this._hasTemplate = (name, findEverywhere) => {
            return findEverywhere && !!document.getElementById(name) || this._templates.hasOwnProperty(name);
        };
        this._data = {};
        this._templates = {};
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    static get templates() {
        return SvgTemplatesEngine.Instance._templates;
    }
    static addTemplate(templateName, templateMarkup) {
        SvgTemplatesEngine.templates[templateName] = templateMarkup;
    }
    static addTemplates(templates) {
        extend(SvgTemplatesEngine.templates, templates);
    }
    static extendTemplates(templates) {
        for (const key in templates) {
            let currentValue = undefined;
            Object.defineProperty(SvgTemplatesEngine.templates, key, {
                configurable: true,
                enumerable: true,
                get: () => {
                    return currentValue ? currentValue : SvgTemplatesEngine.templates[templates[key]];
                },
                set: (newVal) => {
                    currentValue = newVal;
                }
            });
        }
    }
    static getExistingTemplate(name, findEverywhere = true) {
        return SvgTemplatesEngine.Instance._hasTemplate(name, findEverywhere) ? name : undefined;
    }
}
