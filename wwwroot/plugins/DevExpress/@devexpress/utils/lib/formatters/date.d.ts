import { IDateFormatterOptions } from './options';
export declare class DateFormatter {
    readonly options: IDateFormatterOptions;
    private date;
    private mask;
    private specifiers;
    private spPositions;
    private parserKeys;
    private savedYear;
    private isYearParsed;
    private parsedMonth;
    private strToParse;
    private hasAmPm;
    private dayMonthNameReplacePattern;
    private parseNumbers;
    private currentParseNumber;
    private readonly knownSpecifiers;
    private readonly replacers;
    private readonly parsers;
    constructor(options: IDateFormatterOptions);
    setFormatString(mask: string): void;
    format(date: Date): string;
    parse(str: string, rememberParserKeys: boolean): Date | boolean;
    hasYear(): boolean;
    hasMonth(): boolean;
    hasDay(): boolean;
    hasHours(): boolean;
    hasMinutes(): boolean;
    hasSeconds(): boolean;
    hasMilliseconds(): boolean;
    private hasParserKey;
    static expandPredefinedFormat(format: string, options: IDateFormatterOptions): string;
    private applyMonth;
    private registerSpecifier;
    private replaceDay;
    private replaceMonth;
    private replaceYear;
    private replaceHours23;
    private replaceHours12;
    private replaceMinutes;
    private replaceSeconds;
    private replaceMsTrimmed;
    private replaceMs;
    private replaceEra;
    private replaceAmPm;
    private catchNumbers;
    private popParseNumber;
    private findAbbrMonth;
    private findFullMonth;
    private findMonthCore;
    private parseDay;
    private parseMonth;
    private parseYear;
    private parseHours;
    private parseMinutes;
    private parseSeconds;
    private parseMs;
    private parseEra;
    private parseAmPm;
    private parseDecInt;
    private padLeft;
    private formatMs;
    private parseMinSecCore;
    private fixHours;
    private getAmPmState;
    private getDayMonthNameReplacePattern;
    private createDayMonthNameReplacePattern;
    private createReplacePattern;
    private isNumericSpecifier;
    private isKnownSpecifier;
}
//# sourceMappingURL=date.d.ts.map
