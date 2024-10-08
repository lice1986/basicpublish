﻿/**
* DevExpress Analytics (core\widgets\_buttonInlineEditor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import 'devextreme/ui/button';
import dxButton, { Properties } from 'devextreme/ui/button';
export declare type ButtonOptions = Properties & {
    template?: any;
};
export declare class dxButtonWithTemplate extends dxButton {
    constructor(element: Element, options?: ButtonOptions);
    _patchOptionValues(options: any): any;
}
export declare function InitButtonWithTemplate(element: Element, options?: ButtonOptions): () => void;
