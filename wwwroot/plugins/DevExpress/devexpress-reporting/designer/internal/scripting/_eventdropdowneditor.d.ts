﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_eventdropdowneditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import 'devextreme/ui/select_box';
import dxSelectBox from 'devextreme/ui/select_box';
export declare class dxEventDropDownEditor extends dxSelectBox {
    _secondAction: any;
    _$ellipsisButton: any;
    _koContext: any;
    _getDefaultOptions(): any;
    _init(): void;
    _initSecondAction(): void;
    _render(): void;
    _renderDropDownButton(): void;
    _createEllipsisButton(): any;
    _attachEllipsisButtonClickHandler(): void;
    _optionChanged(args: any): void;
}