﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrReportelement.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, PaddingModel, Point, Size } from '@devexpress/analytics-core/analytics-elements';
import { IModelAction } from '@devexpress/analytics-core/analytics-internal';
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { IExpressionEditorCategory, Tools } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { DataBinding } from '../dataObjects/dataBinding';
import { IExpressionObject } from '../dataObjects/expressions/_wrappedExpressionOptions';
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
import { IScriptingControl } from '../internal/scripting/_scriptsEditor';
import { IExpressionBinding } from './properties/expressionBinding';
import { FormattingRuleLink } from './properties/formattingrules';
import { ControlType } from './utils/_controlTypes';
import { DefaultLocalizationProvider, ILocalizedControl } from './utils/_localizationUtils';
import { ReportViewModel } from './xrReport';
export declare class XRReportElementViewModel extends ElementViewModel<ControlType> implements ILocalizedControl, IScriptingControl {
    __localizationProvider: DefaultLocalizationProvider<ILocalizedControl>;
    get _localizationProvider(): DefaultLocalizationProvider<ILocalizedControl>;
    static unitProperties: string[];
    dispose(): void;
    createLocalizationProvider(): DefaultLocalizationProvider<ILocalizedControl>;
    getLocalizationProperty(propertyName: string): import("./utils/_localizationUtils").LocalizedProperty;
    getLocalizationProperties(): import("./utils/_localizationUtils").LocalizedProperty[];
    applyLocalization(propertyName: string, propertyValue: any): void;
    protected _resetProperty(propertyName: string): void;
    private _getControlPropertyName;
    private _getStylePriorityPropertyName;
    private _getStyle;
    private _checkStylePropertyModify;
    private _getStyleProperty;
    private _zOrderChange;
    private _createPaddingDependencies;
    constructor(model: any, parent: ElementViewModel<ControlType>, serializer?: IModelSerializer);
    _getExpressionActions(name: any): IModelAction[];
    _getExpressionEvents(): {
        name: string;
        localizationId: string;
        displayName: string;
    }[];
    _addExpressionActions(propertyName: any): IModelAction[];
    _expressionActions: {
        [key: string]: IModelAction[];
    };
    getControlFactory(): import("./utils/controlsFactory").ControlsFactory;
    addChild(control: ElementViewModel<ControlType>): void;
    initDataBindingProperties(): void;
    initExpressionProperties(): void;
    _resetExpressions(propertyName: string): void;
    _hasAnyExpressions(propertyName: any, predicateFunc?: (value: ko.Observable<string> | ko.Computed<string>, innerPropertyName?: string) => boolean): boolean;
    _getExpressionNameByPropertyName(propertyName: any, info?: ISerializationInfoArray): string;
    initBindings(): void;
    dsHelperProvider: () => DataSourceHelper;
    isStyleProperty(propertyName: string): boolean;
    isResettableProperty(propertyName: string): boolean;
    getActionClassName(propertyName: string): {};
    getMenuBoxTemplate(propertyName: any): string;
    className(): string;
    initialize(): void;
    getPath(propertyName: any): string;
    isPropertyDisabled(name: string): boolean;
    isPropertyVisible(name: string): boolean;
    isPropertyHighlighted(propertyName: string, parentPropertyName?: string): boolean;
    sendToBack(): void;
    bringToFront(): void;
    get root(): ReportViewModel;
    getControlContainerName(): string;
    customizeExpressionCategories(sender: Tools, categories: IExpressionEditorCategory[]): void;
    get dataBindingMode(): any;
    set dpi(value: ko.Observable<number> | ko.Computed<number>);
    get dpi(): ko.Observable<number> | ko.Computed<number>;
    _innerDpi: ko.Observable<number> | ko.Computed<number>;
    styleName: ko.Observable<string> | ko.Computed<string>;
    stylePriority: {
        [key: string]: ko.Observable<boolean> | ko.Computed<boolean>;
    };
    formattingRuleLinks: ko.ObservableArray<FormattingRuleLink>;
    dataBindings: ko.ObservableArray<DataBinding>;
    size: Size;
    location: Point;
    scripts: any;
    paddingObj: PaddingModel;
    expressionBindings: ko.ObservableArray<IExpressionBinding>;
    expressionObj: IExpressionObject;
    padding: ko.Observable<string> | ko.Computed<string>;
    getStyleProperty: (propertyName: string, styleProperty: string) => any;
    toggleUseStyle: (propertyName: string) => void;
    _lockedInUserDesigner: ko.Observable<boolean> | ko.Computed<boolean>;
    lockedInUserDesigner: ko.Computed<boolean>;
    rtl(): boolean;
    parentModel: ko.Observable<XRReportElementViewModel | any>;
}
