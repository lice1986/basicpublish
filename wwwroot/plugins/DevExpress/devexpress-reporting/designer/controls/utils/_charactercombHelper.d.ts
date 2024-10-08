﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_charactercombHelper.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class CharacterCombHelper {
    static getAlignments(textAlignment: string): {
        vertical: string;
        horizontal: string;
    };
    static getLines(text: string, horizontal: number, multiline: boolean, wordwrap: boolean): any[];
    static getTextOffset(texts: string[], position: number, verticalAlign: string, horizontalAlign: string, vertical: number, horizontal: number): number;
    static setText(texts: string[], cells: Array<any>, getTextOffset: (texts: string[], position: number) => number): void;
    static distributionEmptySpace(emptySpace: number, vertical: boolean, textAlignment: string): number;
    static getHorizontalVerticalByText(multiline: boolean, wordwrap: boolean, text: string, horizontal: number, vertical: number): {
        horizontal: number;
        vertical: number;
    };
}
