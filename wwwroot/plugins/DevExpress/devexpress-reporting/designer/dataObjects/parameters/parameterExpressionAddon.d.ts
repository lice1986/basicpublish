﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameterExpressionAddon.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { Parameter } from './parameter';
export declare class ParameterExpressionAddOn extends Disposable {
    private _editor;
    private _parameter;
    constructor(_editor: Editor, _parameter: ko.Observable<Parameter>);
    switchEditors(): void;
    isExpression: ko.Computed<boolean>;
    imageTemplateName: string;
}
