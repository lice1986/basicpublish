﻿/**
* DevExpress Analytics (query-builder\binding\eventGenerator.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class EventGenerator {
    static generateQueryBuilderEvents(fireEvent: (eventName: any, args?: any) => void): {
        publicName: string;
        privateName: string;
    }[];
}
