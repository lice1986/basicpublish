﻿/**
* DevExpress Analytics (property-grid\widgets\internal\_svgTemplateEngine.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare class SvgTemplateSource implements ko.TemplateSource {
    private _data;
    private _templates;
    constructor(template: string, _data: {
        [key: string]: any;
    }, _templates: {
        [key: string]: any;
    });
    templateName: any;
    data(key: any, value?: any): any;
    text(value?: any): any;
}
export declare class SvgTemplatesEngine {
    private static _instance;
    private _data;
    private _templates;
    private _hasTemplate;
    constructor();
    private static get Instance();
    static get templates(): {
        [key: string]: string;
    };
    static addTemplate(templateName: string, templateMarkup: string): void;
    static addTemplates(templates: {
        [key: string]: string;
    }): void;
    static extendTemplates(templates: {
        [key: string]: string;
    }): void;
    static getExistingTemplate(name: string, findEverywhere?: boolean): string;
}