﻿/**
* DevExpress HTML/JS Reporting (designer\internal\errorPanel\_runtimeErrorProvider.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IErrorModel, IErrorProvider } from './_types';
export declare class RuntimeErrorProvider implements IErrorProvider {
    errors: ko.ObservableArray<IErrorModel>;
    collectErrors(): void;
}
