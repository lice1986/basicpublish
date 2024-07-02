export declare class Browser {
    static UserAgent: string;
    static Edge: boolean;
    static MSTouchUI: boolean;
    static WebKitTouchUI: boolean;
    static MacOSMobilePlatform: boolean;
    static MacOSPlatform: boolean;
    static NetscapeFamily: boolean;
    static Opera: boolean;
    static Safari: boolean;
    static IE: boolean;
    static WebKitFamily: boolean;
    static Firefox: boolean;
    static AndroidDefaultBrowser: boolean;
    static AndroidChromeBrowser: boolean;
    static WindowsPlatform: boolean;
    static AndroidMobilePlatform: boolean;
    static WindowsPhonePlatform: boolean;
    static Chrome: boolean;
    static Netscape: boolean;
    static Mozilla: boolean;
    static TouchUI: boolean;
    static MobileUI: boolean;
    static SamsungAndroidDevice: boolean;
    static VirtualKeyboardSupported: boolean;
    static Info: string;
    static MajorVersion: number;
    static PlaformMajorVersion: string;
    static Version: number;
    static IdentUserAgent(userAgent: string, ignoreDocumentMode?: boolean): void;
    static GetBrowserVersion(userAgent: string, matches: RegExpExecArray, tridentPattern: string, ieCompatibleVersionString: string): number;
    private static getIECompatibleVersionString;
    static isTouchEnabled(): boolean;
    private static hasTouchStart;
    private static hasMaxTouchPoints;
    private static hasMsMaxTouchPoints;
    private static hasNavigator;
    static fillUserAgentInfo(browserTypesOrderedList: string[], browserType: string, version: number, platform: string, isSamsungAndroidDevice?: boolean | null): void;
    private static indentPlatformMajorVersion;
    private static getVersionFromMatches;
    private static getVersionFromTrident;
    static fillDocumentElementBrowserTypeClassNames(browserTypesOrderedList: string[]): void;
    private static getUserAgent;
    static _foo: void;
}
//# sourceMappingURL=browser.d.ts.map
