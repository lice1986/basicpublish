﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_baseConverter.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare class BaseConverter {
    protected _model: any;
    popupOptions: {
        height: number;
        visible: ko.Observable<boolean>;
        title: any;
        confirmMessage: string;
        infoMessage: string;
        linkText: string;
        linkUrl: string;
        container: (element: HTMLElement) => any;
        buttons: {
            toolbar: string;
            location: string;
            widget: string;
            options: {
                text: any;
                type: string;
                stylingMode: string;
                onClick: () => void;
            };
        }[];
    };
    convert(model: any): void;
    protected _applyChanges(): void;
    protected _cancel(): void;
}
