﻿/**
* DevExpress HTML/JS Reporting (common\binding\eventGenerator.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class EventGenerator {
    static generateCustomizeLocalizationCallback(fireEvent: (eventName: any, args?: any) => void): (localizationCallbacks: JQueryPromise<any>[]) => void;
    static generateDesignerEvents(fireEvent: (eventName: any, args?: any) => void): {
        publicName: string;
        privateName: string;
    }[];
    static generatePreviewEvents(fireEvent: (eventName: any, args?: any) => void, prefix?: string): {
        publicName: string;
        privateName: string;
    }[];
}
