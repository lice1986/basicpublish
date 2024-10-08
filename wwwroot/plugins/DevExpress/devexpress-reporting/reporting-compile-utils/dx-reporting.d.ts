/**
* DevExpress HTML/JS Reporting (dist\js\dx-reporting.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
declare module DevExpress.Reporting.Chart.Internal {
    import IAction = DevExpress.Analytics.Utils.IAction;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    import IDisplayedValue = DevExpress.Analytics.Utils.IDisplayedValue;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import EditorTemplates = DevExpress.Analytics.Widgets.EditorTemplates;
    import SeriesPointModel = DevExpress.Reporting.Chart.Internal.Series.SeriesPointModel;
    import IPathRequest = DevExpress.Analytics.Utils.IPathRequest;
    import SerializableModel = DevExpress.Analytics.Elements.SerializableModel;
    import IModelSerializer = DevExpress.Analytics.Utils.IModelSerializer;
    import IModelSerializerRef = DevExpress.Analytics.Utils.IModelSerializerRef;
    import IChartComponent = DevExpress.Reporting.Internal.IChartComponent;
    import IChartComponentInfo = DevExpress.Reporting.Internal.IChartComponentInfo;
    import IChartComponentWithText = DevExpress.Reporting.Chart.Internal.Models.IChartComponentWithText;
    import AxisXYViewModel = DevExpress.Reporting.Chart.Internal.Axis.AxisXYViewModel;
    import SecondaryAxisViewModel = DevExpress.Reporting.Chart.Internal.Axis.SecondaryAxisViewModel;
    import AdditionalPaneViewModel = DevExpress.Reporting.Chart.Internal.Models.AdditionalPaneViewModel;
    import ControlsFactory = DevExpress.Analytics.Utils.ControlsFactory;
    import ISize = DevExpress.Analytics.Elements.ISize;
    import FieldListProvider = DevExpress.Analytics.Internal.FieldListProvider;
    import IDataSourceInfo = DevExpress.Analytics.Internal.IDataSourceInfo;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import ChartViewModel = DevExpress.Reporting.Chart.Internal.Models.ChartViewModel;
    import IChartControlCallbacks = DevExpress.Reporting.Chart.Internal.IChartControlCallbacks;
    import ReorderTreeListDragDropHelper = DevExpress.Analytics.Widgets.Internal.ReorderTreeListDragDropHelper;
    import ISurfaceContext = DevExpress.Analytics.Elements.ISurfaceContext;
    import DragDropHandler = DevExpress.Analytics.Internal.DragDropHandler;
    import DragHelperContent = DevExpress.Analytics.Internal.DragHelperContent;
    import ObjectStructureTreeListController = DevExpress.Analytics.Internal.ObjectStructureTreeListController;
    import SurfaceSelection = DevExpress.Analytics.Internal.SurfaceSelection;
    import UndoEngine = DevExpress.Analytics.Utils.UndoEngine;
    import ITreeListItemViewModel = DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel;
    import TreeListItemViewModel = DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
    import ChartTreeListDragDropHelper = DevExpress.Reporting.Chart.Internal.ChartTreeListDragDropHelper;
    import ObjectStructureProvider = DevExpress.Analytics.Internal.ObjectStructureProvider;
    import ChartControlViewModel = DevExpress.Reporting.Chart.Internal.ChartControlViewModel;
    import IPropertiesAccessibilityProvider = DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider;
    import ChartStructureTreeListController = DevExpress.Reporting.Chart.Internal.ChartStructureTreeListController;
    import ChartStructureObjectProvider = DevExpress.Reporting.Chart.Internal.ChartStructureObjectProvider;
    export interface IChartControlCallbacks {
        fieldLists?: (IPathRequest: any) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
        customizeActions?: (actions: DevExpress.Analytics.Utils.IAction[]) => void;
        init?: (designerModel: any) => void;
    }
    export const defaultBooleanValues: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
    export const scaleTypeValues: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
    export const stringAlignmentValues: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
    export const angle: DevExpress.Analytics.Utils.ISerializationInfo;
    export const borderColor: DevExpress.Analytics.Utils.ISerializationInfo;
    export const backColor: DevExpress.Analytics.Utils.ISerializationInfo;
    export const dataMember: DevExpress.Analytics.Utils.ISerializationInfo;
    export const text: DevExpress.Analytics.Utils.ISerializationInfo;
    export const visible: DevExpress.Analytics.Utils.ISerializationInfo;
    export const name: DevExpress.Analytics.Utils.ISerializationInfo;
    export const tag: DevExpress.Analytics.Utils.ISerializationInfo;
    export const legendText: DevExpress.Analytics.Utils.ISerializationInfo;
    export const showInLegend: DevExpress.Analytics.Utils.ISerializationInfo;
    export const thickness: DevExpress.Analytics.Utils.ISerializationInfo;
    export const visibility: DevExpress.Analytics.Utils.ISerializationInfo;
    export const color: DevExpress.Analytics.Utils.ISerializationInfo;
    export const titleAlignment: DevExpress.Analytics.Utils.ISerializationInfo;
    export const textPattern: DevExpress.Analytics.Utils.ISerializationInfo;
    export const textAlignment: DevExpress.Analytics.Utils.ISerializationInfo;
    export const maxLineCount: DevExpress.Analytics.Utils.ISerializationInfo;
    export const maxWidth: DevExpress.Analytics.Utils.ISerializationInfo;
    export const textColor: DevExpress.Analytics.Utils.ISerializationInfo;
    export const antialiasing: DevExpress.Analytics.Utils.ISerializationInfo;
    export const font: DevExpress.Analytics.Utils.ISerializationInfo;
    export const titleSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const title: DevExpress.Analytics.Utils.ISerializationInfo;
    export const enableAxisXZooming: DevExpress.Analytics.Utils.ISerializationInfo;
    export const enableAxisXScrolling: DevExpress.Analytics.Utils.ISerializationInfo;
    export const enableAxisYZooming: DevExpress.Analytics.Utils.ISerializationInfo;
    export const enableAxisYScrolling: DevExpress.Analytics.Utils.ISerializationInfo;
    export const rotated: DevExpress.Analytics.Utils.ISerializationInfo;
    export const typeNameNotShow: DevExpress.Analytics.Utils.ISerializationInfo;
    export const left: DevExpress.Analytics.Utils.ISerializationInfo;
    export const right: DevExpress.Analytics.Utils.ISerializationInfo;
    export const top: DevExpress.Analytics.Utils.ISerializationInfo;
    export const bottom: DevExpress.Analytics.Utils.ISerializationInfo;
    export const margin: DevExpress.Analytics.Utils.ISerializationInfo;
    export const font18: DevExpress.Analytics.Utils.ISerializationInfo;
    export const font12: DevExpress.Analytics.Utils.ISerializationInfo;
    export const font8: DevExpress.Analytics.Utils.ISerializationInfo;
    export const paneSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const defaultPane: DevExpress.Analytics.Utils.ISerializationInfo;
    export const additionalPaneSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const filterString: DevExpress.Analytics.Utils.ISerializationInfo;
    export const filterStringEditable: DevExpress.Analytics.Utils.ISerializationInfo;
    export const argumentSerializable: DevExpress.Analytics.Utils.ISerializationInfo;
    export const editorTemplates: DevExpress.Analytics.Widgets.EditorTemplates<ChartEditorTemplates>;
    export const chartDataSource: DevExpress.Analytics.Utils.ISerializationInfo;
    export {};
    export const typeNameSerializable: DevExpress.Analytics.Utils.ISerializationInfo;
    export const barSeriesViewGroup: string[];
    export const bar3DSeriesViewGroup: string[];
    export const barWidth: DevExpress.Analytics.Utils.ISerializationInfo;
    export const colorEach: DevExpress.Analytics.Utils.ISerializationInfo;
    export const borderSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const border: DevExpress.Analytics.Utils.ISerializationInfo;
    export const fillMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const fillStyleOptionsSerialize: DevExpress.Analytics.Utils.ISerializationInfo;
    export const fillMode3D: DevExpress.Analytics.Utils.ISerializationInfo;
    export const fillStyle: DevExpress.Analytics.Utils.ISerializationInfo;
    export const viewSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const fillModeMapper: {
        Empty: any[];
        Solid: DevExpress.Analytics.Utils.ISerializationInfo[];
        Gradient: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Hatch: DevExpress.Analytics.Utils.ISerializationInfoArray;
    };
    export const seriesLabelSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const sideBySideEqualBarWidth: DevExpress.Analytics.Utils.ISerializationInfo, sideBySideBarDistanceFixed: DevExpress.Analytics.Utils.ISerializationInfo, sideBySideBarDistance: DevExpress.Analytics.Utils.ISerializationInfo;
    export const commonSeriesPointsSortingKeys: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[], bubbleSeriesPointsSortingKeys: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[], rangeSeriesPointsSortingKeys: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[], stockSeriesPointsSortingKeys: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    export const barPositionValues: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    export const piePositionValues: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    export const funnelPositionValues: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    export const waterfallPositionValues: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    export const padding: DevExpress.Analytics.Utils.ISerializationInfo;
    export const lineMarkerOptionsSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray, lineMarker: DevExpress.Analytics.Utils.ISerializationInfo;
    export const topNOptionsSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray, topNOptions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const autoBindingSettingsEnabled: DevExpress.Analytics.Utils.ISerializationInfo, autoLayoutSettingsEnabled: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pivotGridDataSourceOptions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const dataFiltersConjunctionMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const colorDataMember: DevExpress.Analytics.Utils.ISerializationInfo;
    export const points: DevExpress.Analytics.Utils.ISerializationInfo;
    export const createViewsArray: (limitation: boolean) => DevExpress.Analytics.Utils.IDisplayedValue[];
    export const viewBindableSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const qualitativeSummaryOptions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const numericSummaryOptions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const dateTimeSumaryOptions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const seriesSerializable: DevExpress.Analytics.Utils.ISerializationInfo;
    export const seriesDataMember: DevExpress.Analytics.Utils.ISerializationInfo;
    export const enableAntialiasing: DevExpress.Analytics.Utils.ISerializationInfo;
    export const emptyChartTextSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const emptyChartText: DevExpress.Analytics.Utils.ISerializationInfo;
    export const smallChartText: DevExpress.Analytics.Utils.ISerializationInfo;
    export const titles: DevExpress.Analytics.Utils.ISerializationInfo;
    export const legendSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const additionalLegendSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const legends: DevExpress.Analytics.Utils.ISerializationInfo;
    export const appearanceName: DevExpress.Analytics.Utils.ISerializationInfo;
    export const paletteName: DevExpress.Analytics.Utils.ISerializationInfo;
    export const backImage: DevExpress.Analytics.Utils.ISerializationInfo;
    export const qualitativeScaleOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray, qualitativeScaleOptions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const gridLinesAxisX: DevExpress.Analytics.Utils.ISerializationInfo, gridLinesAxisY: DevExpress.Analytics.Utils.ISerializationInfo;
    export const scaleBreakSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const axisValueSerializable: DevExpress.Analytics.Utils.ISerializationInfo, axisValue: DevExpress.Analytics.Utils.ISerializationInfo, showBehind: DevExpress.Analytics.Utils.ISerializationInfo;
    export const legendName: DevExpress.Analytics.Utils.ISerializationInfo;
    export const showAxisLabel: DevExpress.Analytics.Utils.ISerializationInfo, axisLabelText: DevExpress.Analytics.Utils.ISerializationInfo;
    export const constantLineSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const axisXYSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const secondaryAxisXYSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const radarAxisX: DevExpress.Analytics.Utils.ISerializationInfo;
    export const radarAxisY: DevExpress.Analytics.Utils.ISerializationInfo;
    export const axisX3D: DevExpress.Analytics.Utils.ISerializationInfo;
    export const axisY3D: DevExpress.Analytics.Utils.ISerializationInfo;
    export function getSeriesClassName(typeName: any): any;
    export function deserializeModelArray<T>(model: any, creator: (item: any, parent: any) => T, prefix: string): ko.ObservableArray<T>;
    export const secondaryAxesX: DevExpress.Analytics.Utils.ISerializationInfo;
    export const secondaryAxesY: DevExpress.Analytics.Utils.ISerializationInfo;
    export const panes: DevExpress.Analytics.Utils.ISerializationInfo;
    export const diagramSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const diagramMapper: {
        [key: string]: {
            info: DevExpress.Analytics.Utils.ISerializationInfoArray;
            type: string;
        };
    };
    export function parseDate(val: any): Date;
    export function serializeDate(date: Date): string;
    export const commonValueSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const valueWeightSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const value1Value2SerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const stockValueSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export function createInnerActionsWithPopover(text: any, id: any, actions: any, template?: any): {
        text: any;
        imageClassName: string;
        imageTemplateName: string;
        disabled: ko.Observable<boolean>;
        id: any;
        _visible: ko.Observable<boolean>;
        popoverVisible: any;
        togglePopoverVisible: any;
        closePopover: any;
        templateName: string;
        contentTemplate: any;
        getContainer: (element: HTMLElement, selector: string) => any;
        actions: any;
    }[];
    export function _isNumericTypeSpecific(specific: string): boolean;
    export function _isDateTypeSpecific(specific: string): boolean;
    export function _getUnconvertiblePoint(propertyName: string, oldValue: string, newValue: string, points: DevExpress.Reporting.Chart.Internal.Series.SeriesPointModel[]): DevExpress.Reporting.Chart.Internal.Series.SeriesPointModel;
    export const HandlerUri: DevExpress.Analytics.Internal.IGlobalSubscribableValue<string>;
    export class ChartRequests {
        static getChartImage(uri: string, chartLayout: any, width: number, height: number): any;
        static fieldListCallback(request: DevExpress.Analytics.Utils.IPathRequest): JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
    }
    export const indicatorMapper: {
        AverageTrueRange: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        BollingerBands: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        ChaikinsVolatility: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        CommodityChannelIndex: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        DataSourceBasedErrorBars: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        DetrendedPriceOscillator: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        ExponentialMovingAverage: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        FibonacciIndicator: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        FixedValueErrorBars: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        MassIndex: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        MedianPrice: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        MovingAverageConvergenceDivergence: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        PercentageErrorBars: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        RateOfChange: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        RegressionLine: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        RelativeStrengthIndex: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        SimpleMovingAverage: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        StandardDeviation: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        StandardDeviationErrorBars: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        StandardErrorBars: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        TrendLine: (DevExpress.Analytics.Utils.ISerializationInfo | {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        })[];
        TriangularMovingAverage: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        TripleExponentialMovingAverageTema: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        TripleExponentialMovingAverageTrix: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        TypicalPrice: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        WeightedClose: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        WeightedMovingAverage: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
        WilliamsR: {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
        }[];
    };
    export const paneName: DevExpress.Analytics.Utils.ISerializationInfo;
    export const axisXName: DevExpress.Analytics.Utils.ISerializationInfo;
    export const axisYName: DevExpress.Analytics.Utils.ISerializationInfo;
    export const viewMapper: {
        FullStackedStepAreaSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        PolarRangeAreaSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        RadarRangeAreaSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        RangeArea3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        RangeAreaSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        StackedStepAreaSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        StepArea3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        StepAreaSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        SideBySideFullStackedBar3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        SideBySideFullStackedBarSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        SideBySideStackedBar3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        SideBySideStackedBarSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        FullStackedLine3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        FullStackedLineSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        WaterfallSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        ScatterPolarLineSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        ScatterRadarLineSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        StackedLine3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        StackedLineSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        NestedDoughnutSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        SwiftPlotSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Funnel3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        FunnelSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        ScatterLineSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        BubbleSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Spline3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        SplineArea3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        FullStackedSplineArea3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        SplineAreaSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        FullStackedSplineAreaSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        StackedSplineArea3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        SplineSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        StackedSplineAreaSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Area3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        FullStackedArea3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        PolarAreaSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        RadarAreaSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        StackedArea3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        FullStackedBar3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        SideBySideBar3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        StackedBar3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        PolarLineSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        RadarLineSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Doughnut3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        DoughnutSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        PolarPointSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        OverlappedGanttSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        RadarPointSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        SideBySideGanttSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        AreaSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        CandleStickSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        FullStackedAreaSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        FullStackedBarSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Line3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        LineSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        ManhattanBarSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        OverlappedRangeBarSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Pie3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        PieSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        PointSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        SideBySideBarSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        SideBySideRangeBarSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        StackedAreaSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        StackedBarSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        StepLineSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        StockSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
        StepLine3DSeriesView: DevExpress.Analytics.Utils.ISerializationInfoArray;
    };
    export interface IDiagramViewModel {
        axisX?: any;
        axisY?: any;
        secondaryAxesX?: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Axis.SecondaryAxisViewModel>;
        secondaryAxesY?: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Axis.SecondaryAxisViewModel>;
        defaultPane?: any;
        panes?: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Models.AdditionalPaneViewModel>;
        getInfo: () => DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class DiagramViewModel extends SerializableModel implements IDiagramViewModel, IChartComponent {
        getChildComponents(): DevExpress.Reporting.Internal.IChartComponentInfo[];
        static toJson(value: DiagramViewModel, serializer: DevExpress.Analytics.Utils.IModelSerializer, refs: DevExpress.Analytics.Utils.IModelSerializerRef): object;
        constructor(model: object, type: string, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        secondaryAxesX: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Axis.SecondaryAxisViewModel>;
        secondaryAxesY: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Axis.SecondaryAxisViewModel>;
        axisX: DevExpress.Reporting.Chart.Internal.Axis.AxisXYViewModel;
        axisY: DevExpress.Reporting.Chart.Internal.Axis.AxisXYViewModel;
        panes: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Models.AdditionalPaneViewModel>;
        defaultPane: {
            title: DevExpress.Reporting.Chart.Internal.Models.IChartComponentWithText;
        };
    }
    export const diagram: DevExpress.Analytics.Utils.ISerializationInfo;
    export const controlsFactory: DevExpress.Analytics.Utils.ControlsFactory<string>;
    export interface IChartControlOptions {
        chartSource?: any;
        chart?: DevExpress.Reporting.Chart.Internal.Models.ChartViewModel;
        dataSource: ko.Observable<DevExpress.Analytics.Internal.IDataSourceInfo> | ko.Computed<DevExpress.Analytics.Internal.IDataSourceInfo>;
        size?: DevExpress.Analytics.Elements.ISize;
        disabled?: ko.Observable<boolean> | ko.Computed<boolean>;
        callbacks?: DevExpress.Reporting.Chart.Internal.IChartControlCallbacks;
        parameters?: ko.ObservableArray;
    }
    export class ChartControlViewModel extends Disposable {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        getControlFactory(): DevExpress.Analytics.Utils.ControlsFactory;
        isSeriesPropertyDisabled(name: string): boolean;
        isSeriesTemplatePropertyDisabled(name: string): boolean;
        private _getSeriesActualArgumentScaleType;
        private _initSeries;
        private _initChartElementFunctions;
        constructor(options: IChartControlOptions);
        getPath(propertyName: string): string;
        serialize(): object;
        save(): object;
        isPropertyDisabled(name: string): boolean;
        chart: DevExpress.Reporting.Chart.Internal.Models.ChartViewModel;
        onSave: (data: any) => void;
        dataSource: ko.Observable<DevExpress.Analytics.Internal.IDataSourceInfo> | ko.Computed<DevExpress.Analytics.Internal.IDataSourceInfo>;
        seriesDataMember: ko.Observable<string> | ko.Computed<string>;
        dataMember: ko.Observable<string> | ko.Computed<string>;
        fieldListProvider: ko.Observable<DevExpress.Analytics.Internal.FieldListProvider>;
        parameters: ko.ObservableArray;
    }
    export const chartDataMember: DevExpress.Analytics.Utils.ISerializationInfo;
    export const chartSeriesDataMember: DevExpress.Analytics.Utils.ISerializationInfo;
    export const fakeChartSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const chartControlSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class ChartTreeListDragDropHelper extends ReorderTreeListDragDropHelper {
        getSiblings(): ObservableArray<any>;
        stop(): void;
    }
    export class ChartStructureTreeListController extends ObjectStructureTreeListController {
        private surface?;
        private undoEngine?;
        private dragHelperContent?;
        constructor(propertyNames?: string[], listPropertyNames?: string[], selectCallback?: (value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void, surface?: DevExpress.Analytics.Internal.SurfaceSelection, undoEngine?: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, dragHelperContent?: DevExpress.Analytics.Internal.DragHelperContent);
    }
    export class ChartDragDropHandler extends DragDropHandler {
        private undoEngine;
        dispose(): void;
        constructor(surface: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext> | ko.Computed<DevExpress.Analytics.Elements.ISurfaceContext>, selection: DevExpress.Analytics.Internal.SurfaceSelection, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent);
        startDrag(draggable: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel): void;
        drag(event: MouseEvent, ui: HTMLElement): void;
        doStopDrag(ui: Element, draggable: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel, event: MouseEvent): void;
        dragDropHelper: DevExpress.Reporting.Chart.Internal.ChartTreeListDragDropHelper;
    }
    export class ChartStructureObjectProvider extends ObjectStructureProvider {
        getClassName(instance: any): any;
        createArrayItem(currentTarget: Array<any>, result: DevExpress.Analytics.Utils.IDataMemberInfo[], propertyName?: any): void;
        constructor(target: any, displayName?: string, localizationId?: string);
    }
    export class ChartControlSurface extends Disposable {
        constructor(control: DevExpress.Reporting.Chart.Internal.ChartControlViewModel, zoom?: ko.Observable<number>, size?: DevExpress.Analytics.Elements.ISize);
        width: ko.Computed<number>;
        height: ko.Computed<number>;
        imageSrc: ko.Observable<string>;
        zoom: ko.Observable<number> | ko.Computed<number>;
        templateName: string;
    }
    export const ActionId: {
        Save: string;
    };
    export function registerControls(): void;
    export function _setChartLimitation(chartLimitation: any): void;
    export function updateChartSurfaceContentSize(element: any, surfaceSize: ko.Observable<number> | ko.Computed<number>, rtl?: boolean): () => void;
    export interface IChartDesignerOptions {
        data: {
            chartSource?: ko.Observable<any>;
            chart?: ko.Observable<DevExpress.Reporting.Chart.Internal.ChartControlViewModel>;
            dataSource?: ko.Observable<DevExpress.Analytics.Internal.IDataSourceInfo>;
            availableChartDataSources?: ko.Computed<Array<{
                displayName: string;
                value: any;
            }>>;
            width?: number;
            height?: number;
        };
        fieldListProvider?: DevExpress.Analytics.Internal.FieldListProvider;
        callbacks?: DevExpress.Reporting.Chart.Internal.IChartControlCallbacks;
        visible?: ko.Observable<boolean>;
        localization?: any;
        rtl?: boolean;
        accessibilityProvider?: DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider;
    }
    export function subscribeTreelistArray(chartStructureProvider: any, array: ko.ObservableArray<any>, getPath: () => string[], subscribeNewItem?: (item: any, array: any, path: any) => void): ko.Subscription;
    export function getPropertyInfo(serializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray, index: number, pathComponets: any): DevExpress.Analytics.Utils.ISerializationInfo;
    export function createChartStructure(chart: DevExpress.Reporting.Chart.Internal.ChartControlViewModel, selectedItem: any, subscriptions: any, surface: any, undoEngine: any, dragdrophandler: any): {
        itemsProvider: DevExpress.Reporting.Chart.Internal.ChartStructureObjectProvider;
        treeListController: DevExpress.Reporting.Chart.Internal.ChartStructureTreeListController;
        expandRootItems: boolean;
        selectedPath: ko.Observable<string> | ko.Computed<string>;
    };
    export function createChartDesigner(element: Element, options: IChartDesignerOptions, applyBindings?: boolean): any;
    export function registerEditorTemplates(): void;
}
declare module DevExpress.Reporting.Internal {
    import ISerializableModel = DevExpress.Analytics.Utils.ISerializableModel;
    import IGlobalSubscribableValue = DevExpress.Analytics.Internal.IGlobalSubscribableValue;
    import IDisposable = DevExpress.Analytics.Utils.IDisposable;
    export interface IChartComponentInfo {
        component?: IChartComponent | IChartComponent[];
        path: string;
    }
    export interface IXRChartComponentInfo {
        component: IChartComponent;
        path: string;
        displayPath: string;
    }
    export interface IChartComponent extends ISerializableModel {
        getChildComponents?: () => IChartComponentInfo[];
        getExpressionProperties?: () => string[];
        name?: ko.Observable<string> | ko.Computed<string>;
    }
    export function getChartChildComponents(chartComponent: IChartComponent, path: string, displayPath?: string): IXRChartComponentInfo[];
    export const cultureInfo: {};
    export const generateGuid: () => string;
    export function createFullscreenComputed(element: Element, parent: DevExpress.Analytics.Utils.IDisposable): DevExpress.Analytics.Internal.IGlobalSubscribableValue<boolean>;
    export function processZoomFactor(accessibilityCompliant: any): void;
    export const isIOS: boolean;
    export const isAndroid: boolean;
    export const isMobile: boolean;
    export function transformNewLineCharacters(value: string): string;
    export const editorTemplates: {
        csvSeparator: {
            header: string;
            extendedOptions: () => {
                placeholder: string;
            };
        };
    };
    export class Locker {
        constructor();
        lock: (action: () => void) => void;
        isUpdate: boolean;
    }
}
declare module DevExpress.Reporting.Designer.Internal {
    import ElementViewModel = DevExpress.Analytics.Elements.ElementViewModel;
    import ControlType = DevExpress.Reporting.Designer.Internal.ControlType;
    import BandViewModel = DevExpress.Reporting.Designer.Bands.BandViewModel;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ILocalizedControl = DevExpress.Reporting.Designer.Internal.ILocalizedControl;
    import PaddingModel = DevExpress.Analytics.Elements.PaddingModel;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import XRReportElementViewModel = DevExpress.Reporting.Designer.Controls.XRReportElementViewModel;
    import DesignControlsHelper = DevExpress.Analytics.Internal.DesignControlsHelper;
    import StyleModel = DevExpress.Reporting.Designer.Controls.StyleModel;
    import ReportViewModel = DevExpress.Reporting.Designer.Controls.ReportViewModel;
    import ActionListsBase = DevExpress.Analytics.Internal.ActionListsBase;
    import IActionViewModel = DevExpress.Analytics.Utils.IActionViewModel;
    import LanguageHelper = DevExpress.Reporting.Designer.Internal.LanguageHelper;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import IModelAction = DevExpress.Analytics.Internal.IModelAction;
    import ReportExpressionEditorWrapper = DevExpress.Reporting.Designer.Widgets.ReportExpressionEditorWrapper;
    import IDisplayedValue = DevExpress.Analytics.Utils.IDisplayedValue;
    import ISerializationInfoWithBindings = DevExpress.Reporting.Designer.Controls.Metadata.ISerializationInfoWithBindings;
    import AnalyticDesignControlsHelper = DevExpress.Analytics.Internal.AnalyticDesignControlsHelper;
    import IDisplayedObject = DevExpress.Analytics.Internal.IDisplayedObject;
    import SurfaceSelection = DevExpress.Analytics.Internal.SurfaceSelection;
    import IDesignControlsHelper = DevExpress.Analytics.Internal.IDesignControlsHelper;
    import DesignControlsHelper = DevExpress.Reporting.Designer.Internal.DesignControlsHelper;
    import UndoEngine = DevExpress.Analytics.Utils.UndoEngine;
    import ReportDesignerControlsHelper = DevExpress.Reporting.Designer.Internal.ReportDesignerControlsHelper;
    import IReportDesignerErrorPanelSettings = DevExpress.Reporting.Designer.Utils.IReportDesignerErrorPanelSettings;
    import ControlScrollingTool = DevExpress.Reporting.Designer.Internal.ControlScrollingTool;
    import ErrorType = DevExpress.Reporting.Designer.Internal.ErrorType;
    import IErrorModel = DevExpress.Reporting.Designer.Internal.IErrorModel;
    import IErrorProvider = DevExpress.Reporting.Designer.Internal.IErrorProvider;
    import ObjectItem = DevExpress.Reporting.Designer.Data.ObjectItem;
    import DataSourceHelper = DevExpress.Reporting.Designer.Internal.DataSourceHelper;
    import IEnumType = DevExpress.Reporting.IEnumType;
    import IDataSourceRefInfo = DevExpress.Reporting.Designer.Utils.IDataSourceRefInfo;
    import IItemsExtender = DevExpress.Analytics.Internal.IItemsExtender;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    import IPathRequest = DevExpress.Analytics.Utils.IPathRequest;
    import IArea = DevExpress.Analytics.Elements.IArea;
    import XRTextControlSurfaceBase = DevExpress.Reporting.Designer.Controls.XRTextControlSurfaceBase;
    import XRTableControlViewModel = DevExpress.Reporting.Designer.Controls.XRTableControlViewModel;
    import IElementViewModel = DevExpress.Analytics.Elements.IElementViewModel;
    import ISize = DevExpress.Analytics.Elements.ISize;
    import ISelectionTarget = DevExpress.Analytics.Internal.ISelectionTarget;
    import PathRequest = DevExpress.Analytics.Utils.PathRequest;
    import ITreeListItemViewModel = DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel;
    import TreeListItemViewModel = DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
    import BandSurface = DevExpress.Reporting.Designer.Bands.BandSurface;
    import VerticalBandSurface = DevExpress.Reporting.Designer.Bands.VerticalBandSurface;
    import ReportSurface = DevExpress.Reporting.Designer.Controls.ReportSurface;
    import DataBindingMode = DevExpress.Reporting.Designer.Internal.DataBindingMode;
    import ISurfaceContext = DevExpress.Analytics.Elements.ISurfaceContext;
    import Size = DevExpress.Analytics.Elements.Size;
    import DragDropHandler = DevExpress.Analytics.Internal.DragDropHandler;
    import DragHelperContent = DevExpress.Analytics.Internal.DragHelperContent;
    import IDataSourceInfo = DevExpress.Analytics.Internal.IDataSourceInfo;
    import SnapLinesHelper = DevExpress.Analytics.Internal.SnapLinesHelper;
    import IComponentAddedEventArgs = DevExpress.Reporting.Designer.Utils.IComponentAddedEventArgs;
    import ToolboxDragDropHandler = DevExpress.Analytics.Internal.ToolboxDragDropHandler;
    import ControlsFactory = DevExpress.Analytics.Utils.ControlsFactory;
    import IAjaxSettings = DevExpress.Analytics.Internal.IAjaxSettings;
    import IActionsProvider = DevExpress.Analytics.Internal.IActionsProvider;
    import IAction = DevExpress.Analytics.Utils.IAction;
    import ITreeListController = DevExpress.Analytics.Widgets.Internal.ITreeListController;
    import CodeResolver = DevExpress.Analytics.Internal.CodeResolver;
    import ITreeListOptions = DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
    import KoTreeListItemFactory = DevExpress.Analytics.Widgets.Internal.KoTreeListItemFactory;
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import CustomRule = ;
    null.CustomRule;
    import NativeEventInfo = DevExpress.events.NativeEventInfo;
    import dxTextBox = DevExpress.ui.dxTextBox;
    import FieldListItemFactory = DevExpress.Reporting.Designer.Internal.FieldListItemFactory;
    import CalculatedField = DevExpress.Reporting.Designer.Data.CalculatedField;
    import ObjectStorageItem = DevExpress.Reporting.Designer.Data.ObjectStorageItem;
    import ReportDesignerTreelistItem = DevExpress.Reporting.Designer.Internal.ReportDesignerTreelistItem;
    import IDisposable = DevExpress.Analytics.Utils.IDisposable;
    import ObjectExplorerProvider = DevExpress.Analytics.Internal.ObjectExplorerProvider;
    import IParameterContainer = DevExpress.Reporting.Designer.Data.IParameterContainer;
    import ParameterPanelLayoutItem = DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem;
    import ReorderTreeListDragDropHelper = DevExpress.Analytics.Widgets.Internal.ReorderTreeListDragDropHelper;
    import ObjectExplorerDragDropHelper = DevExpress.Reporting.Designer.Internal.ObjectExplorerDragDropHelper;
    import GroupLayoutItem = DevExpress.Reporting.Designer.Data.GroupLayoutItem;
    import ObjectExplorerDragDropHandler = DevExpress.Reporting.Designer.Internal.ObjectExplorerDragDropHandler;
    import ObjectStructureTreeListController = DevExpress.Analytics.Internal.ObjectStructureTreeListController;
    import Parameter = DevExpress.Reporting.Designer.Data.Parameter;
    import EditParametersDialog = DevExpress.Reporting.Designer.Tools.EditParametersDialog;
    import AddParameterDialog = DevExpress.Reporting.Designer.Tools.AddParameterDialog;
    import IDisplayNameProvider = DevExpress.Analytics.Utils.IDisplayNameProvider;
    import IItemsProvider = DevExpress.Analytics.Utils.IItemsProvider;
    import FederationDataSource = DevExpress.Analytics.Data.FederationDataSource;
    import JsonDataSource = DevExpress.Analytics.Data.JsonDataSource;
    import SqlDataSource = DevExpress.Analytics.Data.SqlDataSource;
    import TableQuery = DevExpress.Analytics.Data.TableQuery;
    import IConnectionStringDefinition = DevExpress.Analytics.Wizard.IConnectionStringDefinition;
    import IObjectDataSourceWizardState = DevExpress.Analytics.Wizard.IObjectDataSourceWizardState;
    import RequestWrapper = DevExpress.QueryBuilder.Utils.RequestWrapper;
    import analyticIDataSourceInfo = DevExpress.Analytics.Internal.analyticIDataSourceInfo;
    import DataSourceWizard = DevExpress.Analytics.Wizard.DataSourceWizard;
    import DataSourceWizardPageIterator = DevExpress.Analytics.Wizard.DataSourceWizardPageIterator;
    import IDataSourceWizardState = DevExpress.Analytics.Wizard.IDataSourceWizardState;
    import IMultiQueryDataSourceWizardCallbacks = DevExpress.Analytics.Wizard.Internal.IMultiQueryDataSourceWizardCallbacks;
    import IParameter = DevExpress.Analytics.Wizard.Internal.IParameter;
    import IRebuildSchemaResponse = DevExpress.QueryBuilder.Utils.IRebuildSchemaResponse;
    import MasterDetailEditor = DevExpress.QueryBuilder.Widgets.Internal.MasterDetailEditor;
    import IAnalyticDataSourceInfo = DevExpress.Analytics.Internal.IAnalyticDataSourceInfo;
    import PageFactory = DevExpress.Analytics.Wizard.PageFactory;
    import WizardPageBase = DevExpress.Analytics.Wizard.WizardPageBase;
    import IDataSourceInfo = DevExpress.Reporting.Designer.Internal.IDataSourceInfo;
    import ColumnSortOrder = DevExpress.Reporting.Viewer.Internal.ColumnSortOrder;
    import PivotSummaryType = DevExpress.Reporting.Designer.Wizard.PivotSummaryType;
    import DataMemberTreeListController = DevExpress.Analytics.Widgets.Internal.DataMemberTreeListController;
    import DataMemberTreeNode = DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode;
    import FieldTreeNode = DevExpress.Analytics.Wizard.Internal.FieldTreeNode;
    import FieldListController = DevExpress.Reporting.Designer.Internal.FieldListController;
    import FieldInfo = DevExpress.Reporting.Designer.Internal.FieldInfo;
    import GraphicsUnit = DevExpress.Reporting.Designer.Wizard.GraphicsUnit;
    import IReportWizardState = DevExpress.Reporting.Designer.Wizard.IReportWizardState;
    import INumericSize = DevExpress.Analytics.Elements.INumericSize;
    import PaperKind = DevExpress.Reporting.Designer.Utils.PaperKind;
    import CommonRequestModel = DevExpress.Reporting.Designer.Internal.CommonRequestModel;
    import WizardDragDropHandler = DevExpress.Analytics.Internal.WizardDragDropHandler;
    import IReportWizardSettings = DevExpress.Reporting.Designer.Utils.IReportWizardSettings;
    import FederatedQueriesHelper = DevExpress.QueryBuilder.Widgets.Internal.FederatedQueriesHelper;
    import ManageFederatedQueriesEditor = DevExpress.QueryBuilder.Widgets.Internal.ManageFederatedQueriesEditor;
    import DataSourceEditorBase = DevExpress.Reporting.Designer.Internal.DataSourceEditorBase;
    import IWizardPage = DevExpress.Analytics.Wizard.IWizardPage;
    import IWizardPageMetadata = DevExpress.Analytics.Wizard.IWizardPageMetadata;
    import IJsonDataSourceWizardState = DevExpress.Analytics.Wizard.IJsonDataSourceWizardState;
    import ILabelDetails = DevExpress.Reporting.Designer.Wizard.ILabelDetails;
    import ILabelProduct = DevExpress.Reporting.Designer.Wizard.ILabelProduct;
    import IPaperKind = DevExpress.Reporting.Designer.Wizard.IPaperKind;
    import ObjectDataSource = DevExpress.Analytics.Data.ObjectDataSource;
    import CommandRunType = DevExpress.Reporting.Designer.Wizard.CommandRunType;
    import getResizableOptions = DevExpress.Analytics.Internal.getResizableOptions;
    import XRControlViewModel = DevExpress.Reporting.Designer.Controls.XRControlViewModel;
    import TranslateHelper = DevExpress.Reporting.Designer.Internal.TranslateHelper;
    import WatermarkModel = DevExpress.Reporting.Designer.Controls.WatermarkModel;
    import FieldListProvider = DevExpress.Analytics.Internal.FieldListProvider;
    import IDataSourceWizardConnectionStrings = DevExpress.Analytics.Wizard.IDataSourceWizardConnectionStrings;
    import ILegacyReportWizardState = DevExpress.Reporting.Designer.Wizard.ILegacyReportWizardState;
    import ReportLayout = DevExpress.Reporting.Designer.Wizard.ReportLayout;
    import ReportStyle = DevExpress.Reporting.Designer.Wizard.ReportStyle;
    import FullscreenReportWizard = DevExpress.Reporting.Designer.Wizard.FullscreenReportWizard;
    import _ReportWizardOptions = DevExpress.Reporting.Designer.Wizard._ReportWizardOptions;
    import LegacyReportWizard = DevExpress.Reporting.Designer.Wizard.LegacyReportWizard;
    import ReportWizard = DevExpress.Reporting.Designer.Wizard.ReportWizard;
    import ILocalizationSettings = DevExpress.Analytics.Internal.ILocalizationSettings;
    import FullscreenDataSourceWizard = DevExpress.Analytics.Wizard.FullscreenDataSourceWizard;
    import MultiQueryDataSourceWizard = DevExpress.Analytics.Wizard.MultiQueryDataSourceWizard;
    import IKeyValuePair = DevExpress.Reporting.IKeyValuePair;
    import IReportParametersInfo = DevExpress.Reporting.Viewer.Parameters.IReportParametersInfo;
    import IExportSettings = DevExpress.Reporting.Viewer.Utils.IExportSettings;
    import IPreviewCustomizationHandler = DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler;
    import IProgressBarSettings = DevExpress.Reporting.Viewer.Utils.IProgressBarSettings;
    import ISearchSettings = DevExpress.Reporting.Viewer.Utils.ISearchSettings;
    import DataSourceActions = DevExpress.Reporting.Designer.Internal.DataSourceActions;
    import FederationDataSourceEditor = DevExpress.Reporting.Designer.Internal.FederationDataSourceEditor;
    import JsonDataSourceEditor = DevExpress.Reporting.Designer.Internal.JsonDataSourceEditor;
    import ObjectDataSourceEditor = DevExpress.Reporting.Designer.Internal.ObjectDataSourceEditor;
    import SqlDataSourceEditor = DevExpress.Reporting.Designer.Internal.SqlDataSourceEditor;
    import IReportDesignerCustomizationHandler = DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler;
    import IReportDesignerInitializationData = DevExpress.Reporting.Designer.Utils.IReportDesignerInitializationData;
    import OpenReportDialog = DevExpress.Reporting.Designer.Tools.OpenReportDialog;
    import SaveAsReportDialog = DevExpress.Reporting.Designer.Tools.SaveAsReportDialog;
    import SaveReportDialog = DevExpress.Reporting.Designer.Tools.SaveReportDialog;
    import NavigateByReports = DevExpress.Reporting.Designer.Tools.NavigateByReports;
    import ModelSerializer = DevExpress.Analytics.Utils.ModelSerializer;
    import XRControlSurface = DevExpress.Reporting.Designer.Controls.XRControlSurface;
    import XRChartSurface = DevExpress.Reporting.Designer.Controls.XRChartSurface;
    import XRPdfContentViewModel = DevExpress.Reporting.Designer.Controls.XRPdfContentViewModel;
    import XRRichSurface = DevExpress.Reporting.Designer.Controls.XRRichSurface;
    import XRShapeControlSurface = DevExpress.Reporting.Designer.Controls.XRShapeControlSurface;
    import ISerializableModel = DevExpress.Analytics.Utils.ISerializableModel;
    import ILocalizationItemInfo = DevExpress.Reporting.Designer.Internal.ILocalizationItemInfo;
    import XRChartViewModel = DevExpress.Reporting.Designer.Controls.XRChartViewModel;
    import XRTableOfContentsViewModel = DevExpress.Reporting.Designer.Controls.XRTableOfContentsViewModel;
    import IModelSerializer = DevExpress.Analytics.Utils.IModelSerializer;
    import IModelSerializerOptions = DevExpress.Analytics.Utils.IModelSerializerOptions;
    import IModelSerializerRef = DevExpress.Analytics.Utils.IModelSerializerRef;
    import IReportSerializableModel = DevExpress.Reporting.Designer.Internal.IReportSerializableModel;
    import LocalizationDictionary = DevExpress.Reporting.Designer.Internal.LocalizationDictionary;
    import LocalizationItem = DevExpress.Reporting.Designer.Internal.LocalizationItem;
    import IExpressionOptions = DevExpress.Analytics.Widgets.IExpressionOptions;
    import IExpressionEditorFunction = DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction;
    import IExpressionBinding = DevExpress.Reporting.Designer.Controls.IExpressionBinding;
    import IControlPropertyDescription = DevExpress.Reporting.Designer.Internal.IControlPropertyDescription;
    import IExpressionObject = DevExpress.Reporting.Designer.Internal.IExpressionObject;
    import ISelectionProvider = DevExpress.Analytics.Internal.ISelectionProvider;
    import BaseConverter = DevExpress.Reporting.Designer.Internal.BaseConverter;
    import IPropertiesAccessibilityProvider = DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider;
    import IChartDesignerOptions = DevExpress.Reporting.Chart.Internal.IChartDesignerOptions;
    import ReportControlsDragDropHelper = DevExpress.Reporting.Designer.Internal.ReportControlsDragDropHelper;
    import SnapLinesCollector = DevExpress.Analytics.Internal.SnapLinesCollector;
    import AnalyticSelectionDragDropHandler = DevExpress.Analytics.Internal.AnalyticSelectionDragDropHandler;
    import IDataSourceSettings = DevExpress.Reporting.Designer.Utils.IDataSourceSettings;
    import ReportExplorerDragDropHandler = DevExpress.Reporting.Designer.Internal.ReportExplorerDragDropHandler;
    import ICopyPasteStrategy = DevExpress.Analytics.Internal.ICopyPasteStrategy;
    import EditorAddOn = DevExpress.Analytics.Internal.EditorAddOn;
    import PopupService = DevExpress.Analytics.Internal.PopupService;
    import Editor = DevExpress.Analytics.Widgets.Editor;
    import PropertiesAccessibilityProvider = DevExpress.Analytics.Internal.PropertiesAccessibilityProvider;
    import SerializableModel = DevExpress.Analytics.Elements.SerializableModel;
    import ICustomControlTypeInfo = DevExpress.Reporting.Designer.Utils.ICustomControlTypeInfo;
    import ICustomExpressionInfo = DevExpress.Reporting.Designer.Utils.ICustomExpressionInfo;
    import MenuSettings = DevExpress.Analytics.Internal.MenuSettings;
    import ActionLists = DevExpress.Analytics.Internal.ActionLists;
    import CommonDesignerGenerator = DevExpress.Analytics.Internal.CommonDesignerGenerator;
    import ContextActionsSettings = DevExpress.Analytics.Internal.ContextActionsSettings;
    import ControlProperties = DevExpress.Analytics.Internal.ControlProperties;
    import ControlsHelperSettings = DevExpress.Analytics.Internal.ControlsHelperSettings;
    import GroupObject = DevExpress.Analytics.Internal.GroupObject;
    import IDesignerPart = DevExpress.Analytics.Internal.IDesignerPart;
    import InlineTextEdit = DevExpress.Analytics.Internal.InlineTextEdit;
    import SelectionSettings = DevExpress.Analytics.Internal.SelectionSettings;
    import TabInfo = DevExpress.Analytics.Utils.TabInfo;
    import TabPanel = DevExpress.Analytics.Utils.TabPanel;
    import ToolboxItem = DevExpress.Analytics.Utils.ToolboxItem;
    import IStandardPattern = DevExpress.Analytics.Widgets.Internal.IStandardPattern;
    import ReportItemsProvider = DevExpress.Reporting.Designer.Internal.ReportItemsProvider;
    import ICultureInfoList = DevExpress.Reporting.Designer.Utils.ICultureInfoList;
    import DataBindingModeValue = DevExpress.Reporting.Designer.Utils.DataBindingModeValue;
    import DefaultCrossTabControlValue = DevExpress.Reporting.Designer.Utils.DefaultCrossTabControlValue;
    import IReportDesignerContext = DevExpress.Reporting.Designer.IReportDesignerContext;
    import IReportDesignerRootContext = DevExpress.Reporting.Designer.IReportDesignerRootContext;
    import ReportMenuSettings = DevExpress.Reporting.Designer.Internal.ReportMenuSettings;
    import IReportDesignerGeneratorSettings = DevExpress.Reporting.Designer.Internal.IReportDesignerGeneratorSettings;
    import IReportUriSettings = DevExpress.Reporting.Designer.Internal.IReportUriSettings;
    import PreviewOptions = DevExpress.Reporting.Designer.Internal.PreviewOptions;
    import ReportDialogSettings = DevExpress.Reporting.Designer.Internal.ReportDialogSettings;
    import WizardsInitializerSettings = DevExpress.Reporting.Designer.Internal.WizardsInitializerSettings;
    import IReportDesignerInitializationModel = DevExpress.Reporting.Designer.Utils.IReportDesignerInitializationModel;
    import IEditorViewModel = DevExpress.Analytics.Widgets.IEditorViewModel;
    import IFieldListEditorViewModel = DevExpress.Analytics.Widgets.IFieldListEditorViewModel;
    import ICollectionItemWrapperViewModel = DevExpress.Analytics.Widgets.Internal.ICollectionItemWrapperViewModel;
    import ISummaryFunctionEditorViewModel = DevExpress.Reporting.Chart.Internal.Widgets.ISummaryFunctionEditorViewModel;
    import DataFilterModel = DevExpress.Reporting.Chart.Internal.Models.DataFilterModel;
    import UndoEditor = DevExpress.QueryBuilder.Widgets.Internal.UndoEditor;
    import MeasureUnit = DevExpress.Analytics.Internal.MeasureUnit;
    import IControlPropertiesViewModel = DevExpress.Analytics.Internal.IControlPropertiesViewModel;
    import FontModel = DevExpress.Analytics.Widgets.Internal.FontModel;
    import dxSelectBox = DevExpress.ui.dxSelectBox;
    import IFormatStringEditorActions = DevExpress.Analytics.Widgets.IFormatStringEditorActions;
    export const reportStorageWebIsRegister: DevExpress.Analytics.Internal.IGlobalSubscribableValue<boolean>;
    export const limitation: DevExpress.Analytics.Internal.IGlobalSubscribableValue<boolean>;
    export enum DataBindingMode {
        Bindings = "Bindings",
        Expressions = "Expressions",
        ExpressionsAdvanced = "ExpressionsAdvanced"
    }
    export type ReportBandsType = "TopMarginBand" | "ReportHeaderBand" | "PageHeaderBand" | "GroupHeaderBand" | "DetailBand" | "VerticalHeaderBand" | "VerticalDetailBand" | "VerticalTotalBand" | "DetailReportBand" | "GroupFooterBand" | "ReportFooterBand" | "PageFooterBand" | "BottomMarginBand" | "SubBand";
    export type ControlType = ReportBandsType | "Unknown" | "XRLabel" | "XRCheckBox" | "XRRichText" | "XRPictureBox" | "XRPanel" | "XRTable" | "XRCharacterComb" | "XRLine" | "XRShape" | "XRBarCode" | "XRZipCode" | "XRChart" | "XRGauge" | "XRSparkline" | "XRPivotGrid" | "XRCrossTab" | "XRCrossTabCell" | "XRSubreport" | "XRPdfContent" | "XRPdfSignature" | "XRTableOfContents" | "XRPageInfo" | "XRPageBreak" | "XRCrossBandLine" | "XRCrossBandBox" | "DevExpress.XtraReports.UI.XtraReport" | "PivotGridField" | "XRTableRow" | "XRTableCell" | string;
    export function isVerticalBand(type: DevExpress.Reporting.Designer.Internal.ControlType | ReportBandsType): boolean;
    export function isBand(type: DevExpress.Reporting.Designer.Internal.ControlType): boolean;
    export function isHeaderOrFooterBandType(band: DevExpress.Analytics.Elements.ElementViewModel<ControlType>): any;
    export function getExistTableOfContents(band: DevExpress.Reporting.Designer.Bands.BandViewModel): DevExpress.Reporting.XRControlViewModel;
    export function getUnitProperties(object: any): {
        reCalculateObject: (coef: any) => void;
        calcProperty: (val: any, coef: any) => number;
        properties: string[];
    };
    export class LocalizationItem {
        culture: ko.Observable<string>;
        component: ko.Observable<DevExpress.Reporting.Designer.Internal.ILocalizedControl>;
        propertyName: ko.Observable<string>;
        propertyValue: ko.Observable<any>;
        constructor(model?: any, serializer?: any);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfo[];
    }
    export function searchInLocalizationArray(localizationArray: DevExpress.Reporting.Designer.Internal.ILocalizationItemInfo[], controlPropertyName: string, component: DevExpress.Reporting.Designer.Internal.ILocalizedControl): DevExpress.Reporting.Designer.Internal.ILocalizationItemInfo;
    export interface ILocalizationItemInfo {
        propertyName: string;
        component: DevExpress.Reporting.Designer.Internal.ILocalizedControl;
        value: any;
        recalculate?: (coef: number) => any;
    }
    export class LocalizationDictionary {
        private cultures;
        add(code: string): LocalizationInfo;
        get(code: string): LocalizationInfo;
        count: () => number;
        keys(): string[];
        clear: (code?: string) => void;
    }
    export class LocalizationInfo {
        private code;
        properties: DevExpress.Reporting.Designer.Internal.ILocalizationItemInfo[];
        parent: LocalizationInfo;
        isLocalized: ko.Observable<boolean>;
        constructor(code: string);
        getInheritedProperties(): DevExpress.Reporting.Designer.Internal.ILocalizationItemInfo[];
        createNodes(code: string, list: DevExpress.Reporting.Designer.Internal.LocalizationDictionary): void;
        private mergePropertiesWithChild;
        private _recalculateUnit;
        private _updateLocalizationInfoItem;
        setValue: (component: DevExpress.Reporting.Designer.Internal.ILocalizedControl, propertyName: string, value: any) => void;
        private _createLocalizationItem;
        serialize(canSerialize: (contol: any) => boolean): DevExpress.Reporting.Designer.Internal.LocalizationItem[];
        private findClosestProperty;
        private getParentCulture;
    }
    export function addVariablesToExpressionEditor(categories: any, customizeItems?: (items: any[]) => any[]): void;
    interface IModelWithPadding extends Disposable {
        paddingObj?: DevExpress.Analytics.Elements.PaddingModel;
        padding?: ko.Observable<string> | ko.Computed<string>;
        _padding?: ko.Observable<string>;
        dpi?: ko.Observable<number> | ko.Computed<number>;
    }
    export function createPaddingProperty(model: IModelWithPadding, parent: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel): void;
    export {};
    export const stylesProperties: string[];
    export class StylesHelper extends Disposable {
        private _report;
        private _controlsHelper;
        static styleEqualityComparer(x: DevExpress.Reporting.Designer.Controls.StyleModel, y: DevExpress.Reporting.Designer.Controls.StyleModel): boolean;
        static generateStyle(element: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel | DevExpress.Reporting.Designer.Controls.StyleModel, parent: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel): DevExpress.Reporting.Designer.Controls.StyleModel;
        constructor(_report: DevExpress.Reporting.Designer.Controls.ReportViewModel, _controlsHelper: DevExpress.Reporting.Designer.Internal.DesignControlsHelper);
        removeUnusedStyle(styleName: string): DevExpress.Reporting.Designer.Controls.StyleModel;
    }
    export class ReportScriptService {
        static validateScripts(report: DevExpress.Reporting.Designer.Controls.ReportViewModel): any;
        static getCompletions(editor: any, session: any, pos: any, prefix: any, callback: any, report: any, editorInstance: any, guid: string): any;
        static setCodeDom(key: string, reportLayout: string): any;
    }
    export const eventArgsTypes: {
        [key: string]: string;
    };
    export class ReportDummyCreator {
        static _createDummy(report: any): any;
    }
    export class ReportCompleter {
        __getCompletions(editor: any, session: any, pos: any, prefix: any, callback: any): void;
        constructor(report: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel>, editorInstance: any, guid: any);
        getCompletions(editor: any, session: any, pos: any, prefix: any, callback: any): void;
        completions: any[];
        oldPrefix: string;
        report: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel>;
        editorInstance: any;
        guid: ko.Observable<string> | ko.Computed<string>;
    }
    export class LanguageHelper {
        private _report;
        getLanguageMode(): "ace/mode/text" | "ace/mode/csharp" | "ace/mode/vbscript";
        createNewHandler(eventName: string, eventArgsType: string): string;
        getFunctionNamesFromScript(scripts: string): any[];
        constructor(report: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel>);
        createCompleters(editor: any, bindingContext: any, viewModel: any): Array<{
            getCompletions: any;
        }>;
    }
    export interface ICursorPosition {
        row: number;
        column: number;
    }
    export interface IScriptingControl {
        scripts: any;
        lockedInUserDesigner: () => boolean;
    }
    export interface IAceEditor {
        setValue: (text: string) => void;
        getValue: () => string;
        getSession: () => any;
        getSelection: () => any;
        getCopyText: () => string;
        getCursorPosition: () => ICursorPosition;
        onPaste: (text: string) => void;
        execCommand: (cmd: string) => void;
        undo: (select: boolean) => void;
        redo: (select: boolean) => void;
        on: (event: string, handler: any) => void;
        resize: () => void;
        find: (needle: string, options: any, animate: boolean) => void;
        findNext: () => void;
        findPrevious: () => void;
        focus: () => any;
        guid: string;
    }
    export class ScriptsEditor extends ActionListsBase {
        private _selectionNotEmpty;
        private _canUndo;
        private _canRedo;
        private _cursorPosition;
        private _changeSelection;
        private _updateEditorState;
        createActionViewModel(action: any, index: number): DevExpress.Analytics.Utils.IActionViewModel;
        private _initializeToolbar;
        private _getValidIndex;
        private _setScriptsText;
        private _getFunctionName;
        private _getEventByFunction;
        static generateFunctionName(control: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel, eventName: string, functionName?: string, allFunctionNames?: any[]): string;
        static getEventArgsType(eventName: string): string;
        initialize(): void;
        constructor(report: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel>, allControls: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRReportElementViewModel>);
        get allFunctionNames(): any[];
        guid: ko.Observable<any>;
        ensureEvent: (eventName: string, functionName?: string, model?: any) => void;
        private _ensureFunction;
        selectionChanged: (editor: IAceEditor) => void;
        report: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel>;
        scriptsText: ko.Observable<string> | ko.Computed<string>;
        editorContainer: ko.Observable<IAceEditor>;
        editorVisible: ko.Observable<boolean>;
        toolbarItems: any[];
        controls: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRReportElementViewModel>;
        selectedControl: ko.Observable<DevExpress.Reporting.Designer.Controls.XRReportElementViewModel>;
        eventsCollection: ko.Observable<string[]>;
        selectedEvent: ko.Observable<string>;
        languageHelper: DevExpress.Reporting.Designer.Internal.LanguageHelper;
        validateDisabled: ko.Observable<boolean>;
        aceOptions: {
            enableBasicAutocompletion: boolean;
            enableSnippets: boolean;
            enableLiveAutocompletion: boolean;
            showPrintMargin: boolean;
        };
    }
    export function createObjectFromInfo(control: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel, serializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray): any;
    export function findFirstParentWithPropertyName(control: any, propertyName: any): any;
    type Options = {
        expressionEditor: DevExpress.Reporting.Designer.Widgets.ReportExpressionEditorWrapper;
        hasInnerItems?: boolean;
        title: string;
        hint: ko.Computed;
    };
    export const expressionEditorActionId = "dxrd-expression";
    export function createExpressionEditorAction({ expressionEditor, hasInnerItems, title, hint }: Options): DevExpress.Analytics.Internal.IModelAction;
    export {};
    export const createSinglePopularBindingInfos: (propertyName: string) => DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const createPopularBindingInfos: (options: DevExpress.Reporting.Designer.Controls.Metadata.ISerializationInfoWithBindings) => DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const createPopularBindingInfo: (options: DevExpress.Reporting.Designer.Controls.Metadata.ISerializationInfoWithBindings, isExpression?: boolean) => DevExpress.Reporting.Designer.Controls.Metadata.ISerializationInfoWithBindings;
    export function valuesArrayAsEnumWithLocalizationId(info: DevExpress.Analytics.Utils.ISerializationInfo, prefix: string): DevExpress.Analytics.Utils.IDisplayedValue[];
    export class DesignControlsHelper extends AnalyticDesignControlsHelper {
        private _xrPdfSignatureCollection;
        dispose(): void;
        getNameProperty(model: any): any;
        protected _setName(value: any): void;
        protected _setDefaultText(value: any): void;
        protected _getNamePrefix(value: any): any;
        processCollection(collection: DevExpress.Analytics.Internal.IDisplayedObject[]): void;
        constructor(target: DevExpress.Reporting.Designer.Controls.ReportViewModel, selection: DevExpress.Analytics.Internal.SurfaceSelection);
    }
    export class ReportDesignerControlsHelper extends Disposable implements IDesignControlsHelper {
        constructor(helper: ko.Computed<DevExpress.Reporting.Designer.Internal.DesignControlsHelper>);
        getControls: (target: any) => ko.ObservableArray<DevExpress.Analytics.Internal.IDisplayedObject>;
        allControls: any;
        getControlByName: (name: string) => DevExpress.Analytics.Internal.IDisplayedObject;
    }
    export class ControlScrollingTool extends Disposable {
        private _rootElement;
        private _viewport;
        constructor(_rootElement: Element);
        scrollToControl(surface: any): void;
        private _getScrollOffset;
        dispose(): void;
    }
    export enum ErrorSource {
        ReportCreation = 0,
        ReportLayout = 1,
        ReportExport = 2,
        ReportScripts = 3
    }
    export enum ErrorType {
        Error = 0,
        Warning = 1,
        Information = 2
    }
    export interface IErrorModel {
        code: string;
        showLink?: boolean;
        link?: string;
        description: string;
        errorSource: ErrorSource;
        errorType: DevExpress.Reporting.Designer.Internal.ErrorType;
        message: string;
        controlName?: string;
    }
    export interface IErrorProvider {
        errors: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.IErrorModel>;
        collectErrors(): void;
    }
    interface IPositionX<T> {
        left?: ko.Subscribable<T>;
        right?: ko.Subscribable<T>;
        height?: ko.Subscribable<T>;
    }
    export interface IErrorPanelViewModelSettings extends IReportDesignerErrorPanelSettings {
        controlScrollingTool?: DevExpress.Reporting.Designer.Internal.ControlScrollingTool;
        controlsHelper?: DevExpress.Reporting.Designer.Internal.ReportDesignerControlsHelper;
        selection?: DevExpress.Analytics.Internal.SurfaceSelection;
        editableObject?: ko.Observable<any>;
        position?: IPositionX<number>;
        undoEngine?: () => DevExpress.Analytics.Utils.UndoEngine;
        onClick?: () => void;
        rtl?: boolean;
    }
    export class ErrorPanelViewModel extends Disposable {
        static get allErrorSources(): string[];
        static get allErrorTypes(): string[];
        private _offset;
        private _initOptions;
        private _height;
        private _controlScrollingTool;
        private _controlsHelper;
        private _selection;
        private _editableObject;
        private _position;
        private _errorSource;
        private _choosenTypes;
        private _filterValue;
        private _getUndoEngine;
        private _onClick;
        private _latestChangeSet;
        private _collectErrorButtonDisabled;
        private _openErrorPanelIconHeight;
        private _createMessage;
        private _createAvailableSourcesArray;
        private _expandParentBands;
        _dataGridOptions: any;
        collapsed: ko.Observable<boolean>;
        position: ko.Observable<any>;
        _suppressedErrorCodes: ko.ObservableArray<string>;
        _filteredErrorList: ko.Computed<DevExpress.Reporting.Designer.Internal.IErrorModel[]>;
        _errorList: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.IErrorModel>;
        _providers: DevExpress.Reporting.Designer.Internal.IErrorProvider[];
        _subscriptions: ko.Subscription[];
        _errorMessage: ko.Computed<string>;
        _warningMessage: ko.Computed<string>;
        _informationMessage: ko.Computed<string>;
        clear(): void;
        navigateToItem(name: string): void;
        _resizableOptions: any;
        panelTitle: any;
        getNotificationTemplate(): string;
        getTitleMessage(): string;
        assignErrors(): void;
        subscribeProvider(provider: DevExpress.Reporting.Designer.Internal.IErrorProvider): void;
        collectErrors(): void;
        toggleCollapsed(): void;
        createDataGridOptions(undoEngine: () => DevExpress.Analytics.Utils.UndoEngine): void;
        private _initDefaultFilter;
        private _assignFilter;
        getIconTemplateName(errorType: DevExpress.Reporting.Designer.Internal.ErrorType): string;
        constructor(options: IErrorPanelViewModelSettings);
    }
    export {};
    export interface IComponentNameValidator {
        validateName: (nameCandidate: string) => boolean;
        validateUnique: (nameCandidate: string, currentName: string) => boolean;
    }
    export interface IRenameComponentStrategy extends IComponentNameValidator {
        tryRename: (nameCandidate: string, currentItemData: DevExpress.Reporting.Designer.Data.ObjectItem) => boolean;
    }
    export class RenameDataSourceStrategy implements IRenameComponentStrategy {
        dsHelper: ko.Observable<DevExpress.Reporting.Designer.Internal.DataSourceHelper>;
        private _afterRenameCallBack?;
        private _rename;
        constructor(dsHelper: ko.Observable<DevExpress.Reporting.Designer.Internal.DataSourceHelper>, _afterRenameCallBack?: () => void);
        validateName(nameCandidate: string): boolean;
        validateUnique(nameCandidate: any, currentName: string): boolean;
        tryRename(nameCandidate: string, currentItemData: DevExpress.Reporting.Designer.Data.ObjectItem): boolean;
    }
    export function convertFontToDXFont(font: string): string;
    export function patchFontInLocalizationItem(model: any): void;
    export function patchFont(model: any): any;
    export function patchMargins(model: any): any;
    export function patchSubreport(model: any): any;
    export function subreportControlCollector(target: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, subreportControls?: any[]): any[];
    export function recalculateUnit(value: any, dpi: number): number;
    export const PromptBoolean: {
        False: string;
        True: string;
        Prompt: string;
    };
    export function correctModel(model: any): any;
    export function createReportViewModel(newReportInfo: {
        reportModel: string;
        dataSourceRefs: DevExpress.Reporting.Designer.Utils.IDataSourceRefInfo[];
        knownEnums: DevExpress.Reporting.IEnumType[];
    }, oldReport: DevExpress.Reporting.Designer.Controls.ReportViewModel): DevExpress.Reporting.Designer.Controls.ReportViewModel;
    export function updateDataSourceRefs(report: DevExpress.Reporting.Designer.Controls.ReportViewModel, dataSourceRefs: {
        Key: string;
        Value: DevExpress.Reporting.Designer.Utils.IDataSourceRefInfo[];
    }[]): void;
    export function isNotParameter(control: any): boolean;
    export function isControl(control: any): boolean;
    export function updateSurfaceContentSizeLocalizationMode(surfaceSize: ko.Observable<number> | ko.Computed<number>, root: Element, rtl?: boolean): () => void;
    export class ChartFieldListExtender implements IItemsExtender {
        beforeItemsFilled(request: DevExpress.Analytics.Utils.IPathRequest, items: DevExpress.Analytics.Utils.IDataMemberInfo[]): boolean;
    }
    export class TextElementSizeHelper {
        private _spaceSymbol;
        private _$createElement;
        $createTextElement(text: string, options: Object): JQuery<HTMLElement>;
        $createSpaceElement(options: Object): JQuery<HTMLElement>;
        getTextContainerSize(text: any, options: any, increaseHeight?: number): {
            width: number;
            height: number;
        };
    }
    export enum TableActionDirection {
        vertical = 0,
        horizontal = 1
    }
    export class TableComponentSurface<T extends DevExpress.Analytics.Elements.ElementViewModel<ControlType>> extends XRTextControlSurfaceBase<T> {
        private _getNeededProperties;
        private _generateRect;
        beforeRectUpdated(rect: DevExpress.Analytics.Elements.IArea): DevExpress.Analytics.Elements.IArea;
        direction: TableActionDirection;
    }
    export interface ITableCalculationNode {
        column: number;
        row: number;
        calc: () => void;
    }
    export class TableCalculationProvider {
        private _table;
        private _tableOffset;
        private _calculationStarted;
        private _calculationTimeout;
        private _calculationNodes;
        private _resetState;
        private _startCalculation;
        constructor(_table: DevExpress.Reporting.Designer.Controls.XRTableControlViewModel);
        addTableOffset(width: any, left: any): void;
        addCalculationNode(node: ITableCalculationNode): void;
        hasCalculationNode(rowIndex: number, cellIndex: number): boolean;
    }
    export function selectTreeListItem(item: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel, event: JQueryEventObject): void;
    export function getClosestDataMember(control: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel): string;
    export function getExpressionPath(container: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel, pathRequest: string | DevExpress.Analytics.Utils.PathRequest): string;
    export function getFirstSurfaceParentByType(target: DevExpress.Analytics.Internal.ISelectionTarget, checkBandsType: (target: DevExpress.Analytics.Internal.ISelectionTarget) => boolean): DevExpress.Analytics.Internal.ISelectionTarget;
    export function getUsefulReportWidth(surface?: DevExpress.Reporting.Designer.Controls.ReportSurface): DevExpress.Analytics.Elements.ISize;
    export function createPictureBox(container: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel, bindingPath: string, dataBindingMode: string): DevExpress.Reporting.Designer.Controls.XRReportElementViewModel;
    export const _checkBandsType: (target: DevExpress.Reporting.Designer.Bands.BandSurface | DevExpress.Reporting.Designer.Bands.VerticalBandSurface) => boolean;
    export function createSimpleControl(controlType: string, dropTargetControl: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel): DevExpress.Reporting.Designer.Controls.XRReportElementViewModel;
    export function assignBinding(control: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel, container: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel, bindingName: string, item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel, dataBindingMode: DevExpress.Reporting.Designer.Internal.DataBindingMode): DevExpress.Reporting.Designer.Controls.XRReportElementViewModel;
    export function isList(data: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
    export function dragDropComponentAdded(model: DevExpress.Analytics.Elements.IElementViewModel<string>, parent: DevExpress.Analytics.Elements.IElementViewModel<string>): void;
    export class FieldListDragDropHelper {
        private _dataBindingMode;
        private _size?;
        constructor(_dataBindingMode: DevExpress.Reporting.Designer.Internal.DataBindingMode, _size?: DevExpress.Analytics.Elements.Size);
        private _createTable;
        private _getItemsFromList;
        private _getFirstLevelItems;
        createTableFromListSource(treeListItem: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel, parent: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel): JQueryPromise<DevExpress.Analytics.Elements.IElementViewModel>;
        createTableFromItems(treeListItems: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel[], parent: DevExpress.Analytics.Elements.ElementViewModel): JQueryPromise<DevExpress.Analytics.Elements.IElementViewModel>;
    }
    interface IMemberContolBase {
        size: (surface?: DevExpress.Analytics.Elements.ISurfaceContext) => DevExpress.Analytics.Elements.ISize;
        adjustDropTarget?: (dropTarget: DevExpress.Analytics.Internal.ISelectionTarget) => DevExpress.Analytics.Internal.ISelectionTarget;
    }
    interface IMemberContol extends IMemberContolBase {
        drop: (treeListItem: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel, dropTargetControl: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel, dataBindingMode: DevExpress.Reporting.Designer.Internal.DataBindingMode, size?: DevExpress.Analytics.Elements.ISize) => DevExpress.Reporting.Designer.Controls.XRReportElementViewModel;
    }
    interface IListMemberContol extends IMemberContolBase {
        drop: (treeListItem: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel, dropTargetControl: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel, dataBindingMode: DevExpress.Reporting.Designer.Internal.DataBindingMode, size?: DevExpress.Analytics.Elements.ISize) => JQueryPromise<DevExpress.Analytics.Elements.IElementViewModel>;
    }
    export const listMemberControlsMap: {
        [key: string]: IListMemberContol;
    };
    export const memberControlsMap: {
        [key: string]: IMemberContol;
    };
    export {};
    export class FieldListDragDropHandler extends DragDropHandler {
        private _canAddItems;
        private _undoEngine;
        private _dataSources;
        private _getKey;
        private _isIcon;
        private _setDragHelperContent;
        private _getDropTarget;
        private _needToChangeHelperContent;
        private _updateInnerControlSize;
        private _addControl;
        private _isDefaultBindingAssigned;
        canDrop(dropTarget: DevExpress.Analytics.Internal.ISelectionTarget, controlModel: DevExpress.Analytics.Elements.ElementViewModel, metaData: object): boolean;
        constructor(_canAddItems: ko.Computed<boolean>, surface: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportSurface> | ko.Computed<DevExpress.Reporting.Designer.Controls.ReportSurface>, selection: DevExpress.Analytics.Internal.SurfaceSelection, _undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, snapHelper: DevExpress.Analytics.Internal.SnapLinesHelper, dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent, _dataSources: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>, onComponentAdded?: (e: DevExpress.Reporting.Designer.Utils.IComponentAddedEventArgs) => void);
        drag(event: MouseEvent, ui: HTMLElement, draggable: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel): void;
        doStopDrag(uiElement: HTMLElement, draggable: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel, event: MouseEvent): void;
        onComponentAdded: (e: DevExpress.Reporting.Designer.Utils.IComponentAddedEventArgs) => void;
        dataBindingMode: ko.Computed<DevExpress.Reporting.Designer.Internal.DataBindingMode>;
    }
    export class ReportToolboxDragDropHandler extends ToolboxDragDropHandler {
        _wholeWideControls: string[];
        dispose(): void;
        surface: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportSurface> | ko.Computed<DevExpress.Reporting.Designer.Controls.ReportSurface>;
        constructor(surface: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportSurface> | ko.Computed<DevExpress.Reporting.Designer.Controls.ReportSurface>, selection: DevExpress.Analytics.Internal.SurfaceSelection, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, snapHelper: DevExpress.Analytics.Internal.SnapLinesHelper, dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent, controlsFactory: DevExpress.Analytics.Utils.ControlsFactory, onComponentAdded?: any);
        helper(draggable: any): void;
        private _processProperty;
        doStopDrag(ui: any, draggable: any): void;
        addControl(control: DevExpress.Analytics.Elements.IElementViewModel, dropTargetSurface: DevExpress.Analytics.Internal.ISelectionTarget<ControlType>, size: any): void;
        onComponentAdded: (e: DevExpress.Reporting.Designer.Utils.IComponentAddedEventArgs) => void;
    }
    export class DesignerErrorProvider extends Disposable implements IErrorProvider {
        private _report;
        errors: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.IErrorModel>;
        collectErrors(): (...params: (DevExpress.Analytics.Internal.IAjaxSettings | any)[]) => any;
        constructor(_report: DevExpress.Reporting.Designer.Controls.ReportViewModel);
    }
    export class RuntimeErrorProvider implements IErrorProvider {
        errors: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.IErrorModel>;
        collectErrors(): void;
    }
    export class FieldListController implements ITreeListController {
        private _actionProviders;
        private _fieldListActionWrapper;
        private _customizeFieldListActions;
        private _selectedItems;
        dispose(): void;
        constructor(actionProviders?: DevExpress.Analytics.Internal.IActionsProvider[], fieldListActionWrapper?: (actions: DevExpress.Analytics.Utils.IAction[]) => void, dragDropHandler?: DevExpress.Analytics.Internal.DragDropHandler, customizeFieldListActions?: (item: DevExpress.Analytics.Utils.IDataMemberInfo, actions: DevExpress.Analytics.Utils.IAction[]) => void);
        itemsFilter(item: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
        static isList(item: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
        hasItems: typeof FieldListController.isList;
        select(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): void;
        canSelect(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
        getActions(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): DevExpress.Analytics.Utils.IAction[];
        canMultiSelect(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): any;
        multiSelect(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel, isShiftPressed?: boolean, isCtrlPressed?: boolean): void;
        isDraggable(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
        dragDropHandler: DevExpress.Analytics.Internal.DragDropHandler;
        get selectedItem(): DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
        set selectedItem(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel);
        selectedItems(): DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel[];
        subscribeOnSelectedItemChange(callback: () => void): ko.Subscription;
    }
    export class FieldListItemFactory extends KoTreeListItemFactory {
        createItem(options: DevExpress.Analytics.Widgets.Internal.ITreeListOptions, path?: string[], onItemsVisibilityChanged?: () => undefined, rtl?: boolean, resolver?: DevExpress.Analytics.Internal.CodeResolver): DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
        renameInProgress: boolean;
    }
    export interface IReportDesignerTreeListItem extends ITreeListItemViewModel {
        inRenameMode: boolean;
        disabled: boolean;
        setRenameMode: (value: boolean) => void;
        createValidatorOptions: () => {
            validationRules: CustomRule[];
        };
        createRenameEditorOptions: () => {
            [key: string]: ((event: DevExpress.events.NativeEventInfo<dxTextBox>) => void) | string;
        };
    }
    export class ReportDesignerTreelistItem extends TreeListItemViewModel {
        protected resolver: DevExpress.Analytics.Internal.CodeResolver;
        private _fieldListItemFactory;
        private _isDisabled;
        private _createValidatorOptions;
        private _rename;
        private _onRenameDisposeFunc;
        private _createRenameEditorOptions;
        _getCssRules(): {
            [key: string]: boolean;
        };
        constructor(options: DevExpress.Analytics.Widgets.Internal.ITreeListOptions, path: string[], onItemsVisibilityChanged: () => undefined, rtl: boolean, resolver: DevExpress.Analytics.Internal.CodeResolver, _fieldListItemFactory: DevExpress.Reporting.Designer.Internal.FieldListItemFactory);
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<ReportDesignerTreelistItem> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<ReportDesignerTreelistItem>): void;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<ReportDesignerTreelistItem> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<ReportDesignerTreelistItem>): void;
        createViewModel(): IReportDesignerTreeListItem;
        dispose(): void;
        renameMode: boolean;
        disabled: boolean;
    }
    export class CalculatedFieldsSource extends Disposable implements IActionsProvider, IItemsExtender {
        dispose(): void;
        private _calculatedFieldsInfo;
        private _ordinaryFieldsInfo;
        private _calculatedFields;
        private _dataSourceHelper;
        private _reportDataSource;
        private _fieldsDataMembersInfo;
        private _fieldsCallback;
        private _getDataMembersInfoByPath;
        private _subscribeFieldProperties;
        private _getFieldPathRequest;
        private _updateFieldPathRequest;
        private _initializeCalculatedField;
        private _generateNewFieldName;
        constructor(calculatedFields: ko.ObservableArray<DevExpress.Reporting.Designer.Data.CalculatedField>, reportDataSource: ko.Observable<DevExpress.Reporting.Designer.Data.ObjectStorageItem>, dataSourceHelper: DevExpress.Reporting.Designer.Internal.DataSourceHelper);
        createCalculatedField(dataMember: string): DevExpress.Reporting.Designer.Data.CalculatedField;
        addAction: DevExpress.Analytics.Utils.IAction;
        removeAction: DevExpress.Analytics.Utils.IAction;
        getActions(context: DevExpress.Reporting.Designer.Internal.ReportDesignerTreelistItem): DevExpress.Analytics.Utils.IAction[];
        beforeItemsFilled(request: DevExpress.Analytics.Utils.IPathRequest, items: DevExpress.Analytics.Utils.IDataMemberInfo[]): boolean;
        afterItemsFilled(request: DevExpress.Analytics.Utils.IPathRequest, items: DevExpress.Analytics.Utils.IDataMemberInfo[]): void;
        addCalculatedField: (fullPath: string) => DevExpress.Reporting.Designer.Data.CalculatedField;
        removeCalculatedField: (fullPath: string) => void;
    }
    export class DataSourceItemsExtender implements IItemsExtender {
        private _renameCallback;
        private _dataSources;
        constructor(dataSources: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>, _renameCallback: (nameCandidate: string, dataSourceInfo: DevExpress.Reporting.Designer.Internal.IDataSourceInfo) => void);
        beforeItemsFilled(request: DevExpress.Analytics.Utils.IPathRequest, items: DevExpress.Analytics.Utils.IDataMemberInfo[]): boolean;
        afterItemsFilled(request: DevExpress.Analytics.Utils.IPathRequest, items: DevExpress.Analytics.Utils.IDataMemberInfo[]): boolean;
    }
    export const maxNestingLevelUpdate: DevExpress.Analytics.Internal.IGlobalSubscribableValue<number>;
    export function patchRequest(request: DevExpress.Analytics.Utils.IPathRequest, dataSources: DevExpress.Reporting.Designer.Internal.IDataSourceInfo[], state: any): void;
    export class FieldListDataSourcesHelper implements IDisposable {
        private _fieldListCache;
        private _dataSourceSubscriptions;
        private _innerCache;
        private _usedDataSourceSubscription;
        private _renameDataSourceStrategy;
        private _cacheIsClearNotificicator;
        dataSourceHelper: ko.Observable<DevExpress.Reporting.Designer.Internal.DataSourceHelper>;
        fieldListDataSources: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>;
        dispose(): void;
        private _clearDataSourceCache;
        private _subscribeDataSource;
        private _updateFieldListDataSources;
        constructor();
        private _wrapRequest;
        private _findItems;
        private _createRelativePath;
        private _updateInnerCache;
        private _getPathPartsFromRequest;
        private _getItemsFromCache;
        wrapFieldsCallback(fieldsCallback: (request: DevExpress.Analytics.Utils.IPathRequest) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>, state: () => {}, dataSources?: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>, useCache?: boolean): (request: DevExpress.Analytics.Utils.IPathRequest) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
        _subscribeDataSources(usedDataSources: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>, model: any): void;
        updateDataSources(dsHelper: DevExpress.Reporting.Designer.Internal.DataSourceHelper, model: any, parameters?: any): void;
    }
    export class ParametersLayoutItemsProvider extends ObjectExplorerProvider {
        constructor(report: DevExpress.Reporting.Designer.Data.IParameterContainer, member: ko.Observable<DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem>);
        createArrayItem(currentTarget: DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem[], result: DevExpress.Analytics.Utils.IDataMemberInfo[], propertyName?: any): void;
    }
    export abstract class ObjectExplorerDragDropHelper extends ReorderTreeListDragDropHelper {
        private _orderingAreaHeight;
        protected _isInTopOrderArea(targetElement: JQuery<HTMLElement>, mouseLocationY?: number): boolean;
        protected _isInBottomOrderArea(targetElement: JQuery<HTMLElement>, mouseLocationY?: number): boolean;
        protected _getDroppableClassName(isInTopOrderArea: boolean, isInBottomOrderArea: boolean): string;
        protected _shouldCheckAreas(): boolean;
        setNewDropTarget(elementModel: any, element: HTMLElement, mouseLocationY?: number): void;
    }
    export class ObjectExplorerDragDropHandler extends DragDropHandler {
        private _canAddItems;
        protected undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>;
        protected _lastList: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
        protected _timeout: any;
        constructor(_canAddItems: ko.Computed<boolean>, surface: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext> | ko.Computed<DevExpress.Analytics.Elements.ISurfaceContext>, selection: DevExpress.Analytics.Internal.SurfaceSelection, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent);
        drag(event: MouseEvent | JQueryEventObject, ui: HTMLElement): void;
        reportControlsDragDropHelper: DevExpress.Reporting.Designer.Internal.ObjectExplorerDragDropHelper;
    }
    class ParameterLayoutDragDropHelper extends ObjectExplorerDragDropHelper {
        private _selectedItem;
        private _dropBefore;
        private _dropInside;
        protected _targetModel: DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem;
        protected _draggableModel: DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem;
        constructor(_selectedItem: ko.Observable<DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem>, dragHelperContent: any);
        protected _getDroppableClassName(isInTopOrderArea: boolean, isInBottomOrderArea: boolean): string;
        getSiblings(): ko.ObservableArray<DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem>;
        getNewParentModel(): DevExpress.Reporting.ReportViewModel | DevExpress.Reporting.Designer.Data.GroupLayoutItem;
        getTargetSiblings(): ko.ObservableArray<DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem>;
        reorderSiblings(isDragToBottom?: boolean): void;
        canDrop(): boolean;
        stop(): Promise<DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel>;
    }
    export class ParameterLayoutDragDropHandler extends ObjectExplorerDragDropHandler {
        constructor(selectedItem: ko.Observable<DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem>);
        startDrag(draggable: any): void;
        doStopDrag(ui: any, draggable: any, event: JQueryEventObject): void;
        reportControlsDragDropHelper: ParameterLayoutDragDropHelper;
    }
    export {};
    export class ParametersLayoutTreeListController extends ObjectStructureTreeListController {
        private _report;
        private _selectedItemModel;
        private _innerSwap;
        private _outerSwap;
        private _siblingsSwap;
        private _checkIndex;
        constructor(_report: DevExpress.Reporting.Designer.Data.IParameterContainer, _selectedItemModel: ko.Observable<DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem>);
        addItem(item: DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem): void;
        move(goUp?: boolean): void;
        delete(item?: DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem): void;
        getActions: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => DevExpress.Analytics.Utils.IAction[];
    }
    export class ParametersViewModel extends Disposable implements IActionsProvider, IItemsExtender {
        _addParametersDialog: DevExpress.Reporting.Designer.Tools.AddParameterDialog;
        _editParametersDialog: DevExpress.Reporting.Designer.Tools.EditParametersDialog;
        constructor(report: DevExpress.Reporting.Designer.Controls.ReportViewModel);
        parameters: ko.ObservableArray<DevExpress.Reporting.Designer.Data.Parameter>;
        addAction: {
            clickAction: () => void;
            imageClassName: string;
            imageTemplateName: string;
            text: string;
            displayText: () => string;
        };
        removeAction: {
            clickAction: (item: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel) => void;
            imageClassName: string;
            imageTemplateName: string;
            text: string;
            displayText: () => string;
        };
        editAction: {
            clickAction: (item: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel) => void;
            imageClassName: string;
            imageTemplateName: string;
            text: string;
            displayText: () => string;
        };
        getActions(context: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): DevExpress.Analytics.Utils.IAction[];
        add: () => void;
        remove: (parameter: DevExpress.Reporting.Designer.Data.Parameter) => void;
        edit: (parameter: DevExpress.Reporting.Designer.Data.Parameter) => void;
        beforeItemsFilled(request: DevExpress.Analytics.Utils.IPathRequest, items: DevExpress.Analytics.Utils.IDataMemberInfo[]): boolean;
        afterItemsFilled(request: DevExpress.Analytics.Utils.IPathRequest, items: DevExpress.Analytics.Utils.IDataMemberInfo[]): void;
    }
    /// <reference types="jquery" />
    export class DisplayNameProvider implements IDisplayNameProvider {
        private _fieldsProvider;
        private _dataSourceHelper;
        private _rootDS;
        private _requests;
        private _getRequest;
        private _ignoreDisplayNameRequest;
        private _getDisplayNameRequest;
        private _createRequestInfo;
        private _getFieldDisplayName;
        private _getDisplayName;
        private _getRealName;
        private _getRealNameRequest;
        constructor(_fieldsProvider: DevExpress.Analytics.Utils.IItemsProvider, _dataSourceHelper: DevExpress.Reporting.Designer.Internal.DataSourceHelper, _rootDS: ko.Observable<DevExpress.Reporting.Designer.Data.ObjectStorageItem>);
        getDisplayName(dataSource: DevExpress.Reporting.Designer.Data.ObjectStorageItem, dataMember: string, dataMemberOffset?: string, includeDataSourceName?: boolean): JQuery.Promise<string, any, any>;
        getDisplayNameByPath(path: string, dataMember: string): JQueryPromise<string>;
        getRealName(path: string, dataMember: string): JQueryPromise<string>;
        private _getByPath;
        dispose(): void;
    }
    export function addDataSourceToReport(dataSourceHelper: DevExpress.Reporting.Designer.Internal.DataSourceHelper, report: DevExpress.Reporting.Designer.Controls.ReportViewModel, undoEngine: DevExpress.Analytics.Utils.UndoEngine, itemsProvider: DevExpress.Analytics.Utils.IItemsProvider, dataSource: DevExpress.Reporting.Designer.Internal.IDataSourceInfo, forceAssigning?: boolean): void;
    export function includeNonListItem(dataMembers: DevExpress.Analytics.Utils.IDataMemberInfo[]): boolean;
    export function removeDataSourceFromReport(dataSourceHelper: DevExpress.Reporting.Designer.Internal.DataSourceHelper, reportDataSource: ko.Observable<DevExpress.Reporting.Designer.Data.ObjectItem> | ko.Computed<DevExpress.Reporting.Designer.Data.ObjectItem>, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, dataSource: DevExpress.Reporting.Designer.Internal.IDataSourceInfo): void;
    export class ReportDataSourceService {
        static fieldListCallback(request: DevExpress.Analytics.Utils.IPathRequest): JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
        static getCustomQueriesPreset(dataSource: DevExpress.Analytics.Data.SqlDataSource): JQueryPromise<DevExpress.Analytics.Data.TableQuery[]>;
        static getWizardSqlDataConnections(): JQueryPromise<DevExpress.Analytics.Wizard.IConnectionStringDefinition[]>;
        static getWizardJsonDataConnections(): JQueryPromise<DevExpress.Analytics.Wizard.IConnectionStringDefinition[]>;
        static sqlDataSourceFromBase64(base64: string): JQueryPromise<{
            sqlDataSourceJSON: string;
            queryName: string;
            relationsEditing: boolean;
        }>;
        static sqlRebuildResultSchema(base64: string): JQueryPromise<string>;
        static getSqlDataSourceBase64(dataSource: DevExpress.Analytics.Data.SqlDataSource): JQueryPromise<string>;
        static federationDataSourceFromBase64(base64: string, dependentDataSources: string[]): JQueryPromise<{
            federationDataSourceJSON: string;
        }>;
        static federationRebuildResultSchema(base64: string, dependentDataSources: string[]): JQueryPromise<string>;
        static getFederationDataSourceBase64(dataSource: DevExpress.Analytics.Data.FederationDataSource, dependentDataSources: string[]): JQueryPromise<string>;
        static getJsonDataSourceBase64(dataSource: DevExpress.Analytics.Data.JsonDataSource): JQueryPromise<{
            base64: string;
            schema: string;
            isSupportQueries: boolean;
            isListType: boolean;
        }>;
        static getObjectDataSourceBase64(json: DevExpress.Analytics.Wizard.IObjectDataSourceWizardState): JQueryPromise<{
            base64: string;
            isSupportQueries: boolean;
            isListType: boolean;
        }>;
        static editObjectDataSourceParameters(json: DevExpress.Analytics.Wizard.IObjectDataSourceWizardState, base64: string): JQueryPromise<{
            base64: string;
            isSupportQueries: boolean;
            isListType: boolean;
        }>;
        static objectDataSourceFromBase64(base64: string): JQueryPromise<DevExpress.Analytics.Wizard.IObjectDataSourceWizardState>;
        static jsonDataSourceFromBase64(base64: string): JQueryPromise<{
            jsonDataSourceJSON: string;
        }>;
    }
    export const QBRequestWrapper: DevExpress.Analytics.Internal.IGlobalSubscribableValue<DevExpress.QueryBuilder.Utils.RequestWrapper>;
    /// <reference types="jquery" />
    export abstract class DataSourceEditorBase implements IActionsProvider {
        _dsHelper: ko.Observable<DevExpress.Reporting.Designer.Internal.DataSourceHelper> | ko.Computed<DevExpress.Reporting.Designer.Internal.DataSourceHelper>;
        _wizard: DevExpress.Analytics.Wizard.DataSourceWizard;
        _reportViewModel: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel> | ko.Computed<DevExpress.Reporting.Designer.Controls.ReportViewModel>;
        _undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>;
        _itemsProvider: ko.Observable<DevExpress.Analytics.Utils.IItemsProvider> | ko.Computed<DevExpress.Analytics.Utils.IItemsProvider>;
        _callbacks?: DevExpress.Analytics.Wizard.Internal.IMultiQueryDataSourceWizardCallbacks;
        _rtl?: boolean;
        abstract getActions(context: any): DevExpress.Analytics.Utils.IAction[];
        constructor(_dsHelper: ko.Observable<DevExpress.Reporting.Designer.Internal.DataSourceHelper> | ko.Computed<DevExpress.Reporting.Designer.Internal.DataSourceHelper>, _wizard: DevExpress.Analytics.Wizard.DataSourceWizard, _reportViewModel: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel> | ko.Computed<DevExpress.Reporting.Designer.Controls.ReportViewModel>, _undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, _itemsProvider: ko.Observable<DevExpress.Analytics.Utils.IItemsProvider> | ko.Computed<DevExpress.Analytics.Utils.IItemsProvider>, _callbacks?: DevExpress.Analytics.Wizard.Internal.IMultiQueryDataSourceWizardCallbacks, _rtl?: boolean);
        protected _findDataSource(dataSourceID: string): DevExpress.Analytics.Internal.analyticIDataSourceInfo;
        static _onFail(result: any, deferred: JQueryDeferred<any>): void;
    }
    export interface IDataSourceInfo extends analyticIDataSourceInfo {
        base64: () => string;
    }
    export class CreateQueryIterator extends DataSourceWizardPageIterator {
        getNextPageId(pageId: string): string;
    }
    export class SqlDataSourceEditor extends DataSourceEditorBase {
        private _applyWizardChanges;
        private _createOrEditSqlDataSource;
        private _applyDataSourceChange;
        relationsEditor: ko.Observable<DevExpress.QueryBuilder.Widgets.Internal.MasterDetailEditor>;
        editSqlQuery(dataSourceID: string, queryName: string): void;
        addSqlQuery(dataSourceID: string): void;
        removeSqlQuery(dataSourceID: string, queryName: string): void;
        editMasterDetailRelations(dataSourceID: string): void;
        applySqlDataSourceWizardChanges(dataSourceWizardModel: DevExpress.Analytics.Wizard.IDataSourceWizardState): JQueryPromise<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>;
        static rebuildResultSchema(source: DevExpress.Analytics.Data.SqlDataSource, queryName?: string, relationsEditing?: boolean, parameters?: DevExpress.Analytics.Wizard.Internal.IParameter[]): JQueryPromise<DevExpress.QueryBuilder.Utils.IRebuildSchemaResponse>;
        static createSqlDataSourceInfo(source: DevExpress.Analytics.Data.SqlDataSource, queryName?: string, relationsEditing?: boolean, parameters?: DevExpress.Analytics.Wizard.Internal.IParameter[]): JQueryPromise<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>;
        addAction: {
            clickAction: (item: any) => void;
            imageClassName: string;
            imageTemplateName: string;
            text: any;
        };
        editAction: {
            clickAction: (item: any) => void;
            position: number;
            imageClassName: string;
            imageTemplateName: string;
            text: any;
        };
        removeAction: {
            clickAction: (item: any) => void;
            position: number;
            imageClassName: string;
            imageTemplateName: string;
            text: any;
        };
        editRelationsAction: {
            clickAction: (item: any) => void;
            position: number;
            imageClassName: string;
            imageTemplateName: string;
            text: any;
        };
        getActions(context: any): DevExpress.Analytics.Utils.IAction[];
    }
    export interface IReportWizardCallbacks extends IMultiQueryDataSourceWizardCallbacks {
        createSqlDataSourceInfo?: (dataSource: DevExpress.Analytics.Data.SqlDataSource) => JQueryPromise<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>;
        createJsonDataSourceInfo?: (dataSource: DevExpress.Analytics.Data.JsonDataSource) => JQueryPromise<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>;
    }
    export interface IReportWizardFieldsCallback {
        (request: DevExpress.Analytics.Utils.IPathRequest, dataSource: DevExpress.Analytics.Internal.IAnalyticDataSourceInfo): JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
    }
    export const _masterDetailWizardHeight = "600";
    export const _masterDetailWizardWidth = "840";
    export const _masterDetailScrollViewHeight = "100%";
    export function overrideFullscreenDataSourceWizardPageMetadata(factory: DevExpress.Analytics.Wizard.PageFactory, pageId: string, create: () => DevExpress.Analytics.Wizard.WizardPageBase): void;
    export class FieldInfo extends Disposable {
        constructor(data: Array<DevExpress.Analytics.Utils.IDisplayedValue>);
        getOptions(options: any): any;
        field: ko.Observable<DevExpress.Analytics.Utils.IDataMemberInfo>;
        selectedItems: ko.ObservableArray<any>;
        functionValue: ko.Observable<any>;
        visible: ko.Observable<boolean>;
        value: any;
    }
    export interface ICrossTabGroupFieldInfo extends IDataMemberInfo {
        sortOrder: string;
    }
    export interface ICrossTabDataFieldInfo extends IDataMemberInfo {
        summaryType: string;
    }
    export class CrossTabFieldInfoBase {
        constructor(info: DevExpress.Analytics.Utils.IDataMemberInfo);
        __type: string;
        FieldName: string;
        DisplayText: string;
    }
    export class CrossTabGroupFieldInfo extends CrossTabFieldInfoBase {
        constructor(info: ICrossTabGroupFieldInfo);
        SortOrder: DevExpress.Reporting.Viewer.Internal.ColumnSortOrder;
    }
    export class CrossTabColumnFieldInfo extends CrossTabGroupFieldInfo {
        __type: string;
    }
    export class CrossTabRowFieldInfo extends CrossTabGroupFieldInfo {
        __type: string;
    }
    export class CrossTabDataFieldInfo extends CrossTabFieldInfoBase {
        __type: string;
        constructor(info: ICrossTabDataFieldInfo);
        SummaryType: DevExpress.Reporting.Designer.Wizard.PivotSummaryType;
    }
    export interface IMasterDetailInfoBase {
        name: string;
        displayName: string;
        specifics: string;
    }
    export interface IMasterDetailFieldInfo extends IMasterDetailInfoBase {
        checked: boolean;
    }
    export interface IMasterDetailQueryInfo extends IMasterDetailInfoBase {
        path: string;
        checked: boolean;
        fields: IMasterDetailFieldInfo[];
        relations: IMasterDetailQueryInfo[];
    }
    export class MasterDetailInfoBase implements IMasterDetailInfoBase {
        name: string;
        specifics: string;
        constructor(name: string, specifics: string, displayName?: string);
        displayName: string;
    }
    export interface IMasterDetailReportTree {
        name: string;
        displayName?: string;
        path: string;
        fields: DevExpress.Analytics.Utils.IDataMemberInfo[];
        level: number;
    }
    export class MasterDetailFieldInfo extends MasterDetailInfoBase implements IMasterDetailFieldInfo {
        constructor(field: DevExpress.Analytics.Wizard.Internal.FieldTreeNode);
        checked: boolean;
    }
    export class MasterDetailQueryInfo extends MasterDetailInfoBase implements IMasterDetailQueryInfo {
        private _complexFields;
        private _complexRelations;
        private _expandComplexFieds;
        constructor(dataMember: DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode);
        path: string;
        checked: boolean;
        fields: IMasterDetailFieldInfo[];
        relations: IMasterDetailQueryInfo[];
    }
    export class DataMemberCustomCheckedTreeNode extends DataMemberTreeNode {
        constructor(name: string, displayName: string, specifics: string, isChecked: boolean, path: string, afterCheckToggled?: (node: DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode) => void);
        setChecked(value: boolean): void;
    }
    export class MasterDetailTreeListController extends DataMemberTreeListController {
        constructor(hideDataMemberSubItems: any);
        canSelect(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
        hasItems(item: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
        hideDataMemberSubItems: ko.Observable<boolean> | ko.Computed<boolean>;
    }
    export class AvailableFieldsTreeListController extends FieldListController {
        constructor(rootItems: any);
        itemsFilter(item: DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode): boolean;
        isDraggable(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
        rootItems: any;
    }
    export interface ISummaryDataMemberInfo extends IDataMemberInfo {
        path?: string;
        fields?: ISummaryDataMemberInfo[];
        parent?: {
            path?: string;
            displayName?: string;
        };
    }
    export class SummaryInfo extends FieldInfo {
        constructor(data: Array<DevExpress.Analytics.Utils.IDisplayedValue>);
    }
    export class SummaryInfoFieldlist extends SummaryInfo {
        constructor();
        field: ko.Observable<ISummaryDataMemberInfo>;
        selectedPath: ko.Observable<string>;
        displayName: ko.Computed<string>;
    }
    export interface ISummaryOptions {
        columnName: string;
        flags: number;
    }
    export class SummaryOptionsWrapper {
        private _name;
        private static _getNumber;
        constructor(name: string, displayName: string);
        columnName: string;
        avg: ko.Observable<boolean>;
        count: ko.Observable<boolean>;
        max: ko.Observable<boolean>;
        min: ko.Observable<boolean>;
        sum: ko.Observable<boolean>;
        getOptions(): ISummaryOptions;
    }
    export interface ICustomLabelInformation {
        Height: number;
        HorizontalPitch: number;
        LeftMargin: number;
        RightMargin: number;
        PaperKindDataId: number;
        TopMargin: number;
        BottomMargin: number;
        Unit: DevExpress.Reporting.Designer.Wizard.GraphicsUnit;
        VerticalPitch: number;
        Width: number;
    }
    export class CommonRequestModel {
        CustomLabelInformation: ICustomLabelInformation;
        IgnoreNullValuesForSummary: boolean;
        LabelProductId: number;
        LabelProductDetailId: number;
        ReportTitle: string;
        ReportType: number;
        DataMember: string;
        DataMemberName: {
            "DisplayName": string;
            "Name": string;
            "DataMemberType": number;
        };
        constructor(state: DevExpress.Reporting.Designer.Wizard.IReportWizardState);
    }
    export class MasterDetailRequestModel extends CommonRequestModel {
        private _masterRelationMap;
        private _collectionByPath;
        DataSourceName: string;
        MasterDetailInfo: any;
        MasterDetailGroupsInfo: {
            [key: string]: any;
        };
        MasterDetailSummariesInfo: {
            [key: string]: any;
        };
        CrossTabFieldInfo: any;
        Portrait: boolean;
        PaperKind: DevExpress.Reporting.Designer.Utils.PaperKind;
        PaperSize: DevExpress.Analytics.Elements.INumericSize;
        Margins: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        Unit: DevExpress.Reporting.Designer.Wizard.GraphicsUnit;
        UseMasterDetailBuilder: boolean;
        DataMemberName: {
            "DisplayName": string;
            "Name": string;
            "DataMemberType": number;
        };
        constructor(state: DevExpress.Reporting.Designer.Wizard.IReportWizardState);
    }
    export class CrossTabWizardFieldListController extends FieldListController {
        isDraggable(item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
        showIconsForChildItems: () => boolean;
    }
    export class CrossTabWizardDragDropHandler extends WizardDragDropHandler {
        doStopDrag(ui: any, _: any): void;
    }
    export function getFormattedValueInUnits(value: number, unit: DevExpress.Reporting.Designer.Wizard.GraphicsUnit): string;
    export interface IReportWizardData {
        report: ko.Observable | ko.Computed;
        availableDataSources: DevExpress.Reporting.Designer.Internal.IDataSourceInfo[];
        dataSourceRefs: DevExpress.Reporting.Designer.Utils.IDataSourceRefInfo[];
        isReportServer?: boolean;
        disableCustomSql?: boolean;
        wizardSettings?: DevExpress.Reporting.Designer.Utils.IReportWizardSettings;
    }
    export class ListViewModel<T> {
        caption?: string;
        private _items;
        private _refreshActiveItem;
        activeItemArray: ko.ObservableArray<T>;
        constructor(caption?: string);
        get items(): T[];
        get activeItem(): T;
        set activeItem(value: T);
        add(item: T): void;
        addRange(items: T[]): void;
        removeActiveItem(): void;
        removeAll(): void;
        setItems(items: T[]): void;
        moveUp(): void;
        moveDown(): void;
        get isEmpty(): boolean;
        isMoveUpEnabled(): boolean;
        isMoveDownEnabled(): boolean;
    }
    /// <reference types="jquery" />
    export class FederationDataSourceEditor extends DataSourceEditorBase {
        private _applyFederationDataSourceWizardChanges;
        applyFederationDataSourceWizardChanges(dataSourceWizardModel: DevExpress.Analytics.Wizard.IDataSourceWizardState): JQuery.Promise<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>;
        static createFederationDataSourceInfo(dataSource: DevExpress.Analytics.Data.FederationDataSource): JQueryPromise<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>;
        private _wrapFieldListCallback;
        getFederationDataSourceByInfo(dataSourceInfo: DevExpress.Analytics.Internal.analyticIDataSourceInfo): JQuery.Promise<DevExpress.Analytics.Data.FederationDataSource>;
        editMasterDetailRelations(dataSourceID: string): void;
        saveDataSourceInfo(federationDataSource: DevExpress.Analytics.Data.FederationDataSource, dataSourceInfo: DevExpress.Analytics.Internal.analyticIDataSourceInfo): void;
        openManageQueriesEditor(dataSourceID: string): void;
        addAction: {
            clickAction: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void;
            imageClassName: string;
            imageTemplateName: string;
            text: any;
        };
        editAction: {
            clickAction: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void;
            position: number;
            imageClassName: string;
            imageTemplateName: string;
            text: any;
        };
        editRelationsAction: {
            clickAction: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void;
            position: number;
            imageClassName: string;
            imageTemplateName: string;
            text: any;
        };
        removeAction: {
            clickAction: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void;
            position: number;
            imageClassName: string;
            imageTemplateName: string;
            text: any;
        };
        getActions(context: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): DevExpress.Analytics.Utils.IAction[];
        relationsEditor: ko.Observable<DevExpress.QueryBuilder.Widgets.Internal.MasterDetailEditor>;
        manageQueriesEditor: ko.Observable<DevExpress.QueryBuilder.Widgets.Internal.ManageFederatedQueriesEditor>;
        queriesPopupHelper: ko.Observable<DevExpress.QueryBuilder.Widgets.Internal.FederatedQueriesHelper>;
    }
    /// <reference types="jquery" />
    export function overrideJsonDataSourceWizardPage(factory: DevExpress.Analytics.Wizard.PageFactory, pageId: string, meta: DevExpress.Analytics.Wizard.IWizardPageMetadata<IWizardPage>): void;
    export function overrideSqlDataSourceWizardPage(factory: DevExpress.Analytics.Wizard.PageFactory, pageId: string, meta: DevExpress.Analytics.Wizard.IWizardPageMetadata<IWizardPage>): void;
    export class DataSourceWizardHelper {
        private _page;
        private _callback;
        constructor(_page: DevExpress.Analytics.Wizard.IWizardPage, _callback: (dataSource: any) => JQueryPromise<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>);
        commit(superCommit: () => JQueryPromise<any>, createDataSource: (state: any) => any): JQuery.Promise<any, any, any>;
    }
    export const CONVERSION_COEEFICIENT = 0.0393701;
    /// <reference types="jquery" />
    export interface IOldReportInfo {
        json: string;
        useInitialDataSource: boolean;
    }
    export class ReportWizardService {
        static createNewWizardRequest(reportWizardState: DevExpress.Reporting.Designer.Wizard.IReportWizardState, requestType: any, state: any, customizeWizardModelAction: (wizardModel: any) => void, oldReportInfo?: IOldReportInfo): string;
        static generateReportFromWizardState(reportWizardState: DevExpress.Reporting.Designer.Wizard.IReportWizardState, requestType: any, state: any, customizeWizardModelAction: (wizardModel: any) => void, oldReportInfo?: IOldReportInfo): JQueryPromise<any>;
        static getLabelReportWizardData(): any;
        static createNewJsonDataSource(state: DevExpress.Analytics.Wizard.IJsonDataSourceWizardState, createJsonCallback: (dataSource: DevExpress.Analytics.Data.JsonDataSource) => JQueryPromise<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>): JQuery.Promise<string, any, any>;
    }
    export let labelReportWizardPromise: JQueryPromise<{
        labelProducts: DevExpress.Reporting.Designer.Wizard.ILabelProduct[];
        paperKinds: DevExpress.Reporting.Designer.Wizard.IPaperKind[];
        labelDetails: DevExpress.Reporting.Designer.Wizard.ILabelDetails[];
    }>;
    export function initializeLabelReportWizardPromise(): void;
    /// <reference types="jquery" />
    export class ObjectDataSourceEditParametersIterator extends DataSourceWizardPageIterator {
        getNextPageId(pageId: any): string;
    }
    export class ObjectDataSourceEditor extends DataSourceEditorBase {
        static createObjectDataSourceInfo(objectDataSourceWizard: DevExpress.Analytics.Wizard.IObjectDataSourceWizardState, objectDataSource: DevExpress.Analytics.Data.ObjectDataSource, base64?: string): JQueryPromise<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>;
        applyDataSourceWizardChanges(dataSourceWizardModel: DevExpress.Analytics.Wizard.IDataSourceWizardState): JQuery.Promise<DevExpress.Reporting.Designer.Internal.IDataSourceInfo, any, any>;
        getActions(context: any): DevExpress.Analytics.Utils.IAction[];
        editSchema(dataSourceID: string): void;
        editParametersAction: {
            clickAction: (item: any) => void;
            position: number;
            imageClassName: string;
            imageTemplateName: string;
            text: any;
        };
    }
    export class PageSetupHelper {
        static mm2px(val: number): number;
        static in2px(val: number): number;
        static px2mm(val: number): number;
        static px2in(val: number): number;
        static mm2in(val: number): number;
        static in2mm(val: number): number;
        static getConverter(from: DevExpress.Reporting.Designer.Wizard.GraphicsUnit, to: DevExpress.Reporting.Designer.Wizard.GraphicsUnit): (val: number) => number;
    }
    export class ReportWizardStateHelper {
        static applyDataBindings(state: DevExpress.Reporting.Designer.Wizard.IReportWizardState, model: DevExpress.Reporting.Designer.Controls.ReportViewModel): void;
        static applyPageSetup(state: DevExpress.Reporting.Designer.Wizard.IReportWizardState, model: DevExpress.Reporting.Designer.Controls.ReportViewModel): void;
    }
    export class WizardRunner extends Disposable {
        private _menuOptions;
        dispose(): void;
        private _currentWizard;
        private _wizards;
        constructor(_menuOptions: {
            visible: ko.Subscribable<boolean>;
            collapsed: ko.Subscribable<boolean>;
        });
        registerCommand(wizardType: DevExpress.Reporting.Designer.Wizard.CommandRunType, start: () => void, close: () => void): void;
        run(command: DevExpress.Reporting.Designer.Wizard.CommandRunType): void;
        closeWizard(): void;
    }
    export class TranslateHelper extends Disposable {
        private _maxInterval;
        private _restoreDictionary;
        private _timeouts;
        private _getElement;
        dispose(): void;
        move(elementClassName: string, sign?: string, transform?: string, transition?: string): void;
        reset(elementClassName: string): void;
    }
    export interface ILocalizationItem {
        component: DevExpress.Reporting.Designer.Controls.XRControlViewModel;
        defaultText: ko.Observable<string> | ko.Computed<string>;
        localizedText: ko.Observable<string>;
        isDefaultLanguage: () => boolean;
        visible: () => boolean;
        dispose: () => void;
        displayName: string;
        multiline?: ko.Observable<boolean> | ko.Computed<any>;
    }
    export interface ILocalizationEditorOptions {
        controlScrollingTool: DevExpress.Reporting.Designer.Internal.ControlScrollingTool;
        selection: DevExpress.Analytics.Internal.SurfaceSelection;
        report: () => DevExpress.Reporting.Designer.Controls.ReportViewModel;
    }
    export class LocalizationEditor extends Disposable {
        private _options;
        private _allowedPropertyNames;
        private _selectionDisabled;
        private _autoScrollingSubscription;
        private _uncollapseParent;
        private _subscribeFocused;
        private _getDefaultLanguageItems;
        dispose(): void;
        private _isLocalizableControl;
        private _shouldLocalizeReportControl;
        private _createLocalizationItem;
        private _updateLocalizationItems;
        applyLocalization(serviceName: string): void;
        clearLocalization(): void;
        getRegisteredService(): string;
        isDefaultLanguage(): boolean;
        constructor(_options: ILocalizationEditorOptions);
        start(): void;
        finish(): void;
        onSelectionChanged(e: {
            addedItems: ILocalizationItem[];
        }): void;
        onItemGotFocus(e: {
            model: ILocalizationItem;
        }): void;
        switchSearchBox(): void;
        defaultLanguageText: () => string;
        currentLanguageText: () => string;
        propertiesHeaderText: () => string;
        localizationItems: ko.ObservableArray<ILocalizationItem>;
        textToSearch: ko.Observable<string>;
        language: ko.Observable<string>;
        searchPlaceholder: () => string;
        searchBox: ko.Observable<any>;
        availableCultures: any;
        isSearching: ko.Observable<boolean>;
        getResizableOptions: typeof DevExpress.Analytics.Internal.getResizableOptions;
        translateHelper: DevExpress.Reporting.Designer.Internal.TranslateHelper;
        isVisible: ko.Observable<boolean>;
        width: ko.Observable<number>;
        showLoadIndicator: ko.Observable<boolean>;
        getLoadPanelPosition: (element: HTMLElement) => JQuery<HTMLElement>;
    }
    export class WatermarksViewModel extends Disposable implements IActionsProvider {
        private _watermarks;
        constructor(watermarks: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.WatermarkModel>);
        createWatermark(): DevExpress.Reporting.Designer.Controls.WatermarkModel;
        getActions(context: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): DevExpress.Analytics.Utils.IAction[];
    }
    export class DataSourceActions implements IActionsProvider {
        private _allowEditDataSource;
        private _allowRemoveDataSource;
        private _fieldListProvider;
        private _dsHelper;
        private _reportViewModel;
        private _undoEngine;
        private _findDataSource;
        constructor(dsHelper: ko.Observable<DevExpress.Reporting.Designer.Internal.DataSourceHelper> | ko.Computed<DevExpress.Reporting.Designer.Internal.DataSourceHelper>, reportViewModel: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel> | ko.Computed<DevExpress.Reporting.Designer.Controls.ReportViewModel>, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, _allowEditDataSource: boolean, _allowRemoveDataSource: boolean, _fieldListProvider: ko.Observable<DevExpress.Analytics.Internal.FieldListProvider> | ko.Computed<DevExpress.Analytics.Internal.FieldListProvider>);
        removeDataSource(dataSourceID: string): void;
        addPredifinedDataSource(dataSourceName: string): void;
        removeDataSourceAction: {
            clickAction: (item: DevExpress.Reporting.Designer.Internal.ReportDesignerTreelistItem) => void;
            position: number;
            imageClassName: string;
            imageTemplateName: string;
            text: any;
        };
        rebuildResultSchema(dataSourceID: string): void;
        rebuildResultSchemaAction: DevExpress.Analytics.Utils.IAction;
        renameAction: DevExpress.Analytics.Utils.IAction;
        getActions(context: DevExpress.Reporting.Designer.Internal.ReportDesignerTreelistItem): DevExpress.Analytics.Utils.IAction[];
    }
    /// <reference types="jquery" />
    export class JsonEditSchemaIterator extends DataSourceWizardPageIterator {
        getNextPageId(pageId: any): string;
    }
    export class JsonDataSourceEditor extends DataSourceEditorBase {
        private _applyDataSourceChange;
        editSchema(dataSourceID: string): void;
        applyDataSourceWizardChanges(dataSourceWizardModel: DevExpress.Analytics.Wizard.IDataSourceWizardState): JQueryPromise<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>;
        saveJsonSource(state: DevExpress.Analytics.Wizard.IDataSourceWizardState, connections: DevExpress.Analytics.Wizard.IDataSourceWizardConnectionStrings): JQuery.Promise<any, any, any>;
        static createJsonDataSourceInfo(source: DevExpress.Analytics.Data.JsonDataSource): JQueryPromise<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>;
        editSchemaAction: {
            clickAction: (item: any) => void;
            position: number;
            imageClassName: string;
            imageTemplateName: string;
            text: any;
        };
        getActions(context: any): DevExpress.Analytics.Utils.IAction[];
    }
    export class LegacyReportRequestModel extends CommonRequestModel {
        AdjustFieldWidth: boolean;
        Columns: Array<string>;
        ColumnInfo: {
            Name: string;
            DisplayName: string;
            TypeSpecifics: number;
        }[];
        DataSourceName: string;
        GroupingLevels: string[][];
        Layout: DevExpress.Reporting.Designer.Wizard.ReportLayout;
        Portrait: boolean;
        ReportStyleId: DevExpress.Reporting.Designer.Wizard.ReportStyle;
        SummaryOptions: {
            ColumnName: string;
            Flags: number;
        }[];
        UseMasterDetailBuilder: boolean;
        PaperKind: DevExpress.Reporting.Designer.Utils.PaperKind;
        PaperSize: DevExpress.Analytics.Elements.INumericSize;
        Margins: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        Unit: DevExpress.Reporting.Designer.Wizard.GraphicsUnit;
        constructor(state: DevExpress.Reporting.Designer.Wizard.ILegacyReportWizardState);
    }
    export function _createReportWizard(reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): DevExpress.Reporting.Designer.Wizard.ReportWizard | DevExpress.Reporting.Designer.Wizard.FullscreenReportWizard | DevExpress.Reporting.Designer.Wizard.LegacyReportWizard;
    export interface IReportDesignerGeneratorSettings {
        selection?: DevExpress.Analytics.Internal.SurfaceSelection;
        rtl?: boolean;
        callbacks: {
            designer?: DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler;
            preview?: DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler;
        };
        reportStorageWebIsRegister?: boolean;
        allowMDI?: boolean;
        knownEnums?: DevExpress.Reporting.IEnumType[];
        reportUrl?: ko.Observable<string> | ko.Computed<string>;
        availableDataSources?: DevExpress.Reporting.Designer.Internal.IDataSourceInfo[];
        convertBindingsToExpressions?: string;
        state?: any;
        reportPreviewSettings?: IReportPreviewSettings;
        data: DevExpress.Reporting.Designer.Utils.IReportDesignerInitializationData;
    }
    export interface IReportPreviewSettings {
        exportSettings?: DevExpress.Reporting.Viewer.Utils.IExportSettings;
        progressBarSettings?: DevExpress.Reporting.Viewer.Utils.IProgressBarSettings;
        searchSettings?: DevExpress.Reporting.Viewer.Utils.ISearchSettings;
    }
    export interface IReportUriSettings {
        reportDesignerUri?: string;
        previewUri?: string;
    }
    export interface PreviewOptions {
        element: HTMLElement;
        callbacks: DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler;
        localizationSettings?: DevExpress.Analytics.Internal.ILocalizationSettings;
        parametersInfo?: DevExpress.Reporting.Viewer.Parameters.IReportParametersInfo;
        handlerUri?: string;
        rtl?: boolean;
        exportSettings?: DevExpress.Reporting.Viewer.Utils.IExportSettings;
        progressBarSettings?: DevExpress.Reporting.Viewer.Utils.IProgressBarSettings;
        searchSettings?: DevExpress.Reporting.Viewer.Utils.ISearchSettings;
    }
    export class WizardsInitializerSettings {
        private callbacks;
        private _doFinishCallback;
        private _getParameters;
        private _getItemsProviderCallBack;
        registerReportWizardPages: (pageFactory: DevExpress.Analytics.Wizard.PageFactory) => void;
        registerMultiQueryDataSourceWizardPages: (pageFactory: DevExpress.Analytics.Wizard.PageFactory) => void;
        sqlDataSourceEditor: DevExpress.Reporting.Designer.Internal.SqlDataSourceEditor;
        federationDataSourceEditor: DevExpress.Reporting.Designer.Internal.FederationDataSourceEditor;
        jsonDataSourceEditor: DevExpress.Reporting.Designer.Internal.JsonDataSourceEditor;
        objectDataSourceEditor: DevExpress.Reporting.Designer.Internal.ObjectDataSourceEditor;
        dataSourceActionProvider: DevExpress.Reporting.Designer.Internal.DataSourceActions;
        dataSourceWizard: DevExpress.Analytics.Wizard.DataSourceWizard;
        multiQueryDataSourceWizard: DevExpress.Analytics.Wizard.MultiQueryDataSourceWizard | DevExpress.Analytics.Wizard.FullscreenDataSourceWizard;
        multipleQueriesWizardCallbacks: DevExpress.Analytics.Wizard.Internal.IMultiQueryDataSourceWizardCallbacks;
        reportWizard: DevExpress.Reporting.Designer.Wizard.ReportWizard | DevExpress.Reporting.Designer.Wizard.LegacyReportWizard | DevExpress.Reporting.Designer.Wizard.FullscreenReportWizard;
        createSqlDataSourceWizard(disableCustomSql: boolean, itemsProvider?: ko.Observable<DevExpress.Analytics.Utils.IItemsProvider> | ko.Computed<DevExpress.Analytics.Utils.IItemsProvider>, model?: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel>): DevExpress.Analytics.Wizard.DataSourceWizard;
        createSqlDataSourceEditor(settings: {
            dataSourceHelper: ko.Observable<DevExpress.Reporting.Designer.Internal.DataSourceHelper> | ko.Computed<DevExpress.Reporting.Designer.Internal.DataSourceHelper>;
            dataSourceWizard: DevExpress.Analytics.Wizard.DataSourceWizard;
            model: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel> | ko.Computed<DevExpress.Reporting.Designer.Controls.ReportViewModel>;
            undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>;
            fieldListProvider: ko.Observable<DevExpress.Analytics.Internal.FieldListProvider> | ko.Computed<DevExpress.Analytics.Internal.FieldListProvider>;
            rtl: boolean;
            allowEditDataSource: boolean;
            allowRemoveDataSource: boolean;
        }): void;
        createMultipleQueriesWizardCallbacks(itemsProvider?: ko.Observable<DevExpress.Analytics.Utils.IItemsProvider> | ko.Computed<DevExpress.Analytics.Utils.IItemsProvider>, model?: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel>, state?: () => any): void;
        createMultiQueryDataSourceWizard(disableCustomSql: boolean, multipleQueriesWizardCallbacks?: DevExpress.Analytics.Wizard.Internal.IMultiQueryDataSourceWizardCallbacks, allowCreateNewJsonConnection?: boolean): void;
        createReportWizard(settings: {
            dataSourceHelper: ko.Observable<DevExpress.Reporting.Designer.Internal.DataSourceHelper> | ko.Computed<DevExpress.Reporting.Designer.Internal.DataSourceHelper>;
            navigation: DevExpress.Reporting.Designer.Tools.NavigateByReports;
            isLoading: ko.Observable<boolean> | ko.Computed<boolean>;
            isDirty: ko.Observable<boolean> | ko.Computed<boolean>;
            state: () => any;
            model: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel> | ko.Computed<DevExpress.Reporting.Designer.Controls.ReportViewModel>;
            undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>;
            fieldListProvider: ko.Observable<DevExpress.Analytics.Internal.FieldListProvider> | ko.Computed<DevExpress.Analytics.Internal.FieldListProvider>;
            data: DevExpress.Reporting.Designer.Utils.IReportDesignerInitializationData;
        }): void;
        constructor(connectionStrings: DevExpress.Analytics.Wizard.IDataSourceWizardConnectionStrings, wizardSettings: DevExpress.Reporting.Designer.Utils.IReportWizardSettings, callbacks: DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler, rtl: boolean, dataSources: ko.PureComputed<DevExpress.Reporting.Designer.Internal.IDataSourceInfo[]>, predefinedDataSources: ko.PureComputed<DevExpress.Reporting.Designer.Internal.IDataSourceInfo[]>);
        private reportWizardOptions;
        private multiQueryWizardOptions;
        private dataSourceWizardOptions;
    }
    export class ReportDialogSettings {
        private _designerCallbacks;
        saveReportDialog: DevExpress.Reporting.Designer.Tools.SaveAsReportDialog;
        saveReportDialogLight: DevExpress.Reporting.Designer.Tools.SaveReportDialog;
        openReportDialog: DevExpress.Reporting.Designer.Tools.OpenReportDialog;
        constructor(_designerCallbacks: DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler);
        createSaveReportDialog(reportUrls: ko.ObservableArray<DevExpress.Reporting.IKeyValuePair<string>>): void;
        createSaveReportDialogLight(saveReportDialog?: DevExpress.Reporting.Designer.Tools.SaveAsReportDialog): void;
        createOpenReportDialog(reportUrls: ko.ObservableArray<DevExpress.Reporting.IKeyValuePair<string>>, navigation: DevExpress.Reporting.Designer.Tools.NavigateByReports): void;
    }
    export class DataSourceHelper extends Disposable {
        private _objects;
        availableDataSources: DevExpress.Reporting.Designer.Internal.IDataSourceInfo[];
        static defaultReportExtensionKey: string;
        dispose(): void;
        constructor(objects: ko.ObservableArray<DevExpress.Reporting.Designer.Data.ObjectStorageItem>, dataSourceRefs: DevExpress.Reporting.Designer.Utils.IDataSourceRefInfo[], availableDataSources: DevExpress.Reporting.Designer.Internal.IDataSourceInfo[]);
        getDataSourcePath(dataSource: any): string;
        _findDataSourceInfo(name: string, collection: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>): DevExpress.Analytics.Internal.IDataSourceInfo;
        _getDataSourceInfo(name: string): DevExpress.Analytics.Internal.IDataSourceInfo;
        _getDataSourceName(dataSource: DevExpress.Reporting.Designer.Data.ObjectStorageItem): string;
        _addUsedDataSource(result: DevExpress.Reporting.Designer.Internal.IDataSourceInfo): void;
        _addDataSource(dataSource: DevExpress.Reporting.Designer.Internal.IDataSourceInfo, data: DevExpress.Reporting.Designer.Data.ObjectItem, uniqueName?: string): DevExpress.Analytics.Internal.IDataSourceInfo;
        private _cloneObjectItem;
        getUniqueDataSourceName(name: string): string;
        addDataSource(dataSourceInfo: DevExpress.Reporting.Designer.Internal.IDataSourceInfo): DevExpress.Reporting.Designer.Data.ObjectItem;
        removeDataSource(dataSourceInfo: DevExpress.Reporting.Designer.Internal.IDataSourceInfo): void;
        restoreDataSource(dataSourceInfo: DevExpress.Reporting.Designer.Internal.IDataSourceInfo): void;
        dataSourceValue(value: ko.Observable<DevExpress.Reporting.Designer.Data.ObjectStorageItem>, undoEngine?: ko.Observable<DevExpress.Analytics.Utils.UndoEngine>): ko.PureComputed<string>;
        dataSourceDisplayExpr(dataSource: DevExpress.Reporting.Designer.Internal.IDataSourceInfo): any;
        usedDataSources: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>;
        allDataSources: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.IDataSourceInfo>;
        mergedDataSources(): DevExpress.Reporting.Designer.Internal.IDataSourceInfo[];
        findDataSourceInfo(dataSource: DevExpress.Reporting.Designer.Data.ObjectItem): DevExpress.Analytics.Internal.IDataSourceInfo;
        findDataSourceInfoByID(id: string): DevExpress.Analytics.Internal.IDataSourceInfo;
        findDataSourceInfoByRef(ref: string): DevExpress.Analytics.Internal.IDataSourceInfo;
        findDataSourceInfoByName(name: string): DevExpress.Analytics.Internal.IDataSourceInfo;
        static _assignValueInTimeout: boolean;
    }
    export class UnknownViewModel extends XRControlViewModel {
        constructor(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        _model: any;
    }
    export class TodoControlSurface extends XRControlSurface {
        constructor(control: DevExpress.Reporting.Designer.Controls.XRControlViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
    }
    export class ReportRenderingService {
        static getChartImage(surface: DevExpress.Reporting.Designer.Controls.XRChartSurface): any;
        static getUnknownControlImage(model: any, scale: number): any;
        static getShapeImage(surface: DevExpress.Reporting.Designer.Controls.XRShapeControlSurface): any;
        static getRichImage(surface: DevExpress.Reporting.Designer.Controls.XRRichSurface, propertyName: any): any;
        static getPdfContentData(control: DevExpress.Reporting.Designer.Controls.XRPdfContentViewModel): any;
    }
    export function __createLocalizationProperties(target: DevExpress.Analytics.Utils.ISerializableModel, format?: string): LocalizedProperty[];
    export class DefaultLocalizationProvider<T extends DevExpress.Reporting.Designer.Internal.ILocalizedControl> extends Disposable {
        _model: T;
        dispose(): void;
        _localizationInfo: LocalizedProperty[];
        constructor(_model: T);
        getLocalizationProperty(propertyName: string): LocalizedProperty;
        getLocalizationProperties(): LocalizedProperty[];
        applyLocalization(propertyName: string, propertyValue: DevExpress.Reporting.Designer.Internal.ILocalizationItemInfo): void;
    }
    export class TableOfContentLocalizationProvider extends DefaultLocalizationProvider<DevExpress.Reporting.Designer.Controls.XRTableOfContentsViewModel> {
        getLocalizationProperties(): LocalizedProperty[];
    }
    export class ReportLocalizationProvider extends DefaultLocalizationProvider<DevExpress.Reporting.Designer.Controls.ReportViewModel> {
        getLocalizationProperties(): LocalizedProperty[];
    }
    export class ChartLocalizationProvider extends DefaultLocalizationProvider<DevExpress.Reporting.Designer.Controls.XRChartViewModel> {
        getLocalizationProperties(): LocalizedProperty[];
    }
    export class LocalizedProperty {
        propertyName: string;
        value: any;
        info: DevExpress.Analytics.Utils.ISerializationInfo;
        constructor(propertyName: string, value: any, info: DevExpress.Analytics.Utils.ISerializationInfo);
        applyLocalization(value: DevExpress.Reporting.Designer.Internal.ILocalizationItemInfo): void;
    }
    export interface ILocalizedControl extends ISerializableModel {
        getLocalizationProperties(): LocalizedProperty[];
        applyLocalization(propertyName: string, value: any): void;
        getLocalizationProperty(propertyName: string): LocalizedProperty;
    }
    export type IReportSerializableModel = DevExpress.Analytics.Utils.ISerializableModel & {
        controlType: DevExpress.Reporting.Designer.Internal.ControlType;
        isLocalized: () => boolean;
    };
    export class ReportModelSerializer extends ModelSerializer implements IModelSerializer {
        reportModel?: DevExpress.Reporting.Designer.Internal.IReportSerializableModel;
        localizationJsonObj: any[];
        isLocalized: boolean;
        constructor(reportModel?: DevExpress.Reporting.Designer.Internal.IReportSerializableModel, options?: DevExpress.Analytics.Utils.IModelSerializerOptions);
        serialize(viewModel?: DevExpress.Analytics.Utils.ISerializableModel, serializationsInfo?: DevExpress.Analytics.Utils.ISerializationInfoArray, refs?: DevExpress.Analytics.Utils.IModelSerializerRef): any;
        serializeProperty(modelPropertyInfo: DevExpress.Analytics.Utils.ISerializationInfo, viewModel: DevExpress.Analytics.Utils.ISerializableModel, serializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray, refs: DevExpress.Analytics.Utils.IModelSerializerRef, result: any): void;
        deserialize(viewModel: DevExpress.Reporting.Designer.Internal.IReportSerializableModel, model: any, serializationsInfo?: DevExpress.Analytics.Utils.ISerializationInfoArray): void;
    }
    export class ReportLocalizationEngine extends Disposable {
        report: DevExpress.Reporting.Designer.Controls.ReportViewModel;
        items: DevExpress.Reporting.Designer.Internal.LocalizationDictionary;
        constructor(report: DevExpress.Reporting.Designer.Controls.ReportViewModel);
        recalculateUnits(coef: any): void;
        hasCulture(cultureCode: string): boolean;
        add: (cultureCode: string, component: DevExpress.Reporting.Designer.Internal.ILocalizedControl, propertyName: string, value: any) => void;
        isLocalized(): boolean;
        save: (cultureCode?: string) => void;
        apply: (cultureCode: string) => void;
        serialize: () => DevExpress.Reporting.Designer.Internal.LocalizationItem[];
    }
    export function createIDataMemberInfoByName(name: string, specifics?: string): DevExpress.Analytics.Utils.IDataMemberInfo;
    export type IReportItemsProviderRootItems = {
        [key: string]: (path: string, controlsHelper: DevExpress.Reporting.Designer.Internal.DesignControlsHelper) => DevExpress.Analytics.Utils.IDataMemberInfo[];
    };
    export class ReportItemsProvider extends Disposable implements IItemsProvider {
        private _rootItems;
        private _getControlByName;
        private _getProperties;
        private _tryGenerateGetItemsFunc;
        getReportElementsByPath(controlsHelper: any, path: string[]): DevExpress.Analytics.Utils.IDataMemberInfo[];
        getItems: (path: DevExpress.Analytics.Utils.IPathRequest, rootItems?: IReportItemsProviderRootItems) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
        getItemByPath: (path: DevExpress.Analytics.Utils.IPathRequest, rootItems?: IReportItemsProviderRootItems) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo>;
        constructor(controlsHelper: DevExpress.Reporting.Designer.Internal.DesignControlsHelper, fieldListProvider: DevExpress.Analytics.Utils.IItemsProvider);
        _getItemByPath(pathParts: string[], rootItems: IReportItemsProviderRootItems, propertyName: string): JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo>;
    }
    export interface IExpressionObject extends IDisposable {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        getExpression(propertyName: string, eventName: string): DevExpress.Analytics.Widgets.IExpressionOptions;
        getExpressionsTreeItems(propertyName: string): IExpressionTreeItem[];
        validateExpression(): boolean;
        hasWarning(): boolean;
        updateExpressionObjectProperties: (newInfo?: DevExpress.Reporting.Designer.Internal.IControlPropertyDescription[]) => void;
    }
    export interface IExpressionTreeItem {
        expressionName: string;
        eventName?: string;
        displayName?: string;
        localizationId?: string;
        expressionObj?: DevExpress.Analytics.Widgets.IExpressionOptions;
        innerItems?: IExpressionTreeItem[];
    }
    export class WrappedExpressionOptions extends Disposable implements IExpressionOptions {
        eventName?: string;
        constructor(options: DevExpress.Analytics.Widgets.IExpressionOptions, handlers?: {
            addExpression: (newVal: string) => void;
            removeExpression: (expression: DevExpress.Reporting.Designer.Controls.IExpressionBinding) => void;
        }, fieldListProvider?: ko.Observable<DevExpress.Analytics.Utils.IItemsProvider> | ko.Computed<DevExpress.Analytics.Utils.IItemsProvider>, eventName?: string);
        onHiding(e: {
            component: any;
            element: HTMLElement;
        }): void;
        onShowing(e: {
            component: any;
            element: HTMLElement;
        }): void;
        onContentReady(e: {
            component: any;
            element: HTMLElement;
        }): void;
        isValid: ko.Observable<boolean> | ko.Computed<boolean>;
        warningMessage: ko.Observable<string>;
        expression: ko.Observable<DevExpress.Reporting.Designer.Controls.IExpressionBinding> | ko.Computed<DevExpress.Reporting.Designer.Controls.IExpressionBinding>;
        value: ko.Observable<string> | ko.Computed<string>;
        path: ko.Observable<string> | ko.Computed<string>;
        functions: Array<DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction>;
        customizeCategories?: (sender: any, categories: any, dblclick?: any) => void;
        rootItems: ({
            name: string;
            needPrefix: boolean;
            rootPath?: undefined;
        } | {
            name: string;
            needPrefix: boolean;
            rootPath: string;
        })[];
    }
    export interface IPropertyDescription {
        events: string[];
        group?: string;
        objectProperties?: string[];
    }
    export interface IControlPropertyDescription extends IPropertyDescription {
        propertyName: string;
        controlType: string;
        displayPath?: string;
    }
    export class ExpressionWrapper extends Disposable {
        private _bindingMode;
        private _fieldListProvider?;
        dispose(): void;
        static createExpression(propertyName: string, eventName: string, expression: string): DevExpress.Reporting.Designer.Controls.IExpressionBinding;
        private _valuesDictionary;
        private _displayNameDictionary;
        private _expressionsInfo;
        private _expressionsSerializationInfoCache;
        private _createPropertyByName;
        private _updateCachedControlInfo;
        private _createInfo;
        private _addControlInfoToCache;
        private _initCachedSerializationInfo;
        private _getPropertyDescriptors;
        private _getExpressionFromArray;
        private _createExpressionMap;
        private _summaryFunctions;
        private _mapExpressionsToObjectByEventName;
        private _allExpressions;
        private _isValidExpressions;
        private _isWarningExpressions;
        private _getExpressionByPropertyName;
        private _mapExpressionsToObject;
        constructor(_bindingMode?: string, _fieldListProvider?: ko.Observable | ko.Computed);
        setPropertyDescription(controlType: string, propertyName: string, events: string[], objectProperties?: string[], group?: string): void;
        hidePropertyDescriptions(controlType: string, ...propertyNames: string[]): void;
        createExpressionsObject(controlType: string, expressions: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.IExpressionBinding>, path?: ko.Observable<string> | ko.Computed<string>, summaryRunning?: (name: string) => ko.Observable<boolean> | ko.Computed<boolean>): DevExpress.Reporting.Designer.Internal.IExpressionObject;
        setLocalizationId(propertyName: string, localizationId: string, displayName?: string): void;
        setValues(propertyName: string, values: any[]): void;
    }
    export class BaseConverter {
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
    export class ControlConverterService {
        static getXmlStringFromJson(controlJsonLayout: string, doneCallback: (result: any) => void, errorCallback: (error: any) => void): (...params: (DevExpress.Analytics.Internal.IAjaxSettings | any)[]) => any;
        static getControlModelFromXmlString(controlXmlLayout: string, doneCallback: (result: any) => void, errorCallback: (error: any) => void): (...params: (DevExpress.Analytics.Internal.IAjaxSettings | any)[]) => any;
    }
    export class CrossTabConverter extends BaseConverter {
        private _selectionProvider;
        private _context;
        private _detailLink;
        private _warnings;
        private _undoEngine;
        constructor(_selectionProvider: DevExpress.Analytics.Internal.ISelectionProvider, _context: any);
        protected _applyChanges(): void;
        private _convertStyles;
        private _prepareNoStyles;
        private _prepareGeneralStyle;
        private _prepareStandardStyles;
        private _applyStyles;
        private _applyStyle;
        private _convertOptions;
        private _convertFields;
        private _copyPropertiesToField;
        private _saveOriginalLayout;
        private _applyVisibility;
        private _applyText;
        private _findRelatedPivotGridItem;
        private _validateChartLinked;
    }
    export class PivotGridConverter extends BaseConverter {
        private _selectionProvider;
        constructor(_selectionProvider: DevExpress.Analytics.Internal.ISelectionProvider);
        protected _applyChanges(): void;
    }
    export enum DefaultCrossTabControlEnum {
        XRCrossTab = "XRCrossTab",
        XRPivotGrid = "XRPivotGrid"
    }
    export class AlignmentHandler {
        private _selectionProvider;
        private _surfaceContext;
        constructor(selectionProvider: DevExpress.Analytics.Internal.ISelectionProvider, surfaceContext: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext>);
        private _getFocusedItem;
        private _getFocusedParent;
        private _getPositionFromBand;
        private _visitAllSelectedItemsInSameContainerWithFocused;
        private _centerByBand;
        private _roundingValue;
        alignLeft(): void;
        alignTop(): void;
        alignRight(): void;
        alignBottom(): void;
        alignVerticalCenters(): void;
        alignHorizontalCenters(): void;
        sizeToControlWidth(): void;
        sizeToControlHeight(): void;
        sizeToControl(): void;
        centerHorizontally(): void;
        centerVertically(): void;
        alignToGrid(): void;
        sizeToGrid(): void;
        sendToBack(): void;
        bringToFront(): void;
        canChangeZOrder(): boolean;
    }
    export class SpaceCommandHandler {
        private _selectionProvider;
        private _surfaceContext;
        constructor(selectionProvider: DevExpress.Analytics.Internal.ISelectionProvider, surfaceContext: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext>);
        private _comparer;
        private _spaceIncrease;
        private _spaceMakeEqual;
        private _concatenateWithSpace;
        horizSpaceConcatenate(): void;
        vertSpaceConcatenate(): void;
        horizSpaceMakeEqual(): void;
        vertSpaceMakeEqual(): void;
        horizSpaceDecrease(): void;
        horizSpaceIncrease(): void;
        vertSpaceDecrease(): void;
        vertSpaceIncrease(): void;
    }
    export const createChartDesignerOptions: (designerModel: any, dataSourceHelper: any, model: any, parameters: any, chartValueBindingProvider: any, accessibilityProvider: DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider) => {
        dispose: () => void;
        options: DevExpress.Reporting.Chart.Internal.IChartDesignerOptions;
        visible: ko.Observable<boolean>;
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
        run: (chartSurface: DevExpress.Reporting.Designer.Controls.XRChartSurface) => void;
        container: (element: HTMLElement) => any;
    };
    export class ReportControlsDragDropHelper extends ObjectExplorerDragDropHelper {
        private _dragHelperContent?;
        private _undoEngine?;
        private _isTargetContainer;
        private _serializer;
        private _tableControlTypes;
        private _restrictedTargets;
        private _canReorder;
        private _canInsertToTarget;
        private _targetIsClosestOfDraggable;
        private _canDrop;
        private _insertTableChildren;
        protected _shouldCheckAreas(): boolean;
        protected _getDroppableClassName(isInTopOrderArea: boolean, isInBottomOrderArea: boolean): string;
        private _reorderBands;
        private _reorderTableControls;
        private _changeControlParent;
        constructor(_dragHelperContent?: DevExpress.Analytics.Internal.DragHelperContent, _undoEngine?: DevExpress.Analytics.Utils.UndoEngine);
        start(draggable: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel): void;
        getSiblings(): ko.ObservableArray<any>;
        stop(): DevExpress.Analytics.Internal.ISelectionTarget;
    }
    export class ReportExplorerDragDropHandler extends ObjectExplorerDragDropHandler {
        private _isStyle;
        private _isFormatingRule;
        private _isReportControl;
        dispose(): void;
        constructor(canAddItems: ko.Computed<boolean>, surface: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext> | ko.Computed<DevExpress.Analytics.Elements.ISurfaceContext>, selection: DevExpress.Analytics.Internal.SurfaceSelection, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent);
        startDrag(draggable: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel): void;
        doStopDrag(uiElement: HTMLElement, draggable: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel, event: MouseEvent | JQueryEventObject): void;
        reportControlsDragDropHelper: DevExpress.Reporting.Designer.Internal.ReportControlsDragDropHelper;
    }
    export class ReportSnapLinesCollector extends SnapLinesCollector {
        private _rtl;
        _getCollection(parent: any): {
            rect: ko.Observable<DevExpress.Analytics.Elements.IArea>;
        }[];
        private _enumerateBandCollection;
        private _processBandRtl;
        _enumerateCollection(parent: any, parentAbsoluteProsition: {
            top: number;
            left: number;
        }, callback: (item: any, itemAbsoluteRect: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        }) => void): void;
        constructor(_rtl: ko.Observable<boolean> | ko.Computed<boolean>);
    }
    export class SelectionDragDropHandler extends AnalyticSelectionDragDropHandler {
        private _canAddItems;
        private _localizationCanDrop;
        constructor(_canAddItems: ko.Computed<boolean>, surface: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext> | ko.Computed<DevExpress.Analytics.Elements.ISurfaceContext>, selection: DevExpress.Analytics.Internal.SurfaceSelection, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, snapHelper: DevExpress.Analytics.Internal.SnapLinesHelper, dragHelperContent: DevExpress.Analytics.Internal.DragHelperContent);
        getLocation(adjustedTarget: any, item: any): DevExpress.Analytics.Elements.IArea;
        canDrop(dropTarget: any, controlModel: any, metaData: any): boolean;
    }
    export class ReportExplorerModel extends Disposable {
        private _dataSourceSettings?;
        static getPathByMember(model: any): any;
        private _createActionsForOneElement;
        private _createActionsForArray;
        private _getPathNonControl;
        constructor(reportModel: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel>, editableObject: any, clickHandler: any, dragDropHandler: DevExpress.Reporting.Designer.Internal.ReportExplorerDragDropHandler, selection: DevExpress.Analytics.Internal.ISelectionProvider, _dataSourceSettings?: DevExpress.Reporting.Designer.Utils.IDataSourceSettings);
        itemsProvider: DevExpress.Analytics.Internal.ObjectExplorerProvider;
        treeListController: DevExpress.Analytics.Internal.ObjectStructureTreeListController;
    }
    export const reportCopyPasteStrategy: (componentAdded?: any) => DevExpress.Analytics.Internal.ICopyPasteStrategy;
    export class CustomMergingEngine {
        private _customMergeForFormatString;
        customMerge(propertyName: string, controls: {}[], undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine>): {
            result: ko.ObservableArray<any>;
            subscriptions: any[];
        };
    }
    export class DesignerEditorAddOn extends EditorAddOn {
        constructor(editor: DevExpress.Analytics.Widgets.Editor, popupService: DevExpress.Analytics.Internal.PopupService, imageTemplateName?: string);
        onPopupShown(popupService: DevExpress.Analytics.Internal.PopupService): void;
        showPopup(_: any, element: any): void;
    }
    export class ExpressionEditorAddOn extends DesignerEditorAddOn {
        dispose(): void;
        actionFilter(action: DevExpress.Analytics.Internal.IModelAction): boolean;
        onPopupShown(popupService: DevExpress.Analytics.Internal.PopupService): void;
        cacheFunction(callback: (expressionEditor: any) => void): void;
        activateExpressionEditorFunc: (expressionEditor: any) => void;
        templateName: string;
    }
    export class ValueEditorAddOn extends DesignerEditorAddOn {
        onPopupShown(popupService: DevExpress.Analytics.Internal.PopupService): void;
        actionFilter(action: DevExpress.Analytics.Internal.IModelAction): boolean;
    }
    export const StringId: {
        Copy: string;
        NewViaWizard: string;
        Open: string;
        Save: string;
        SaveAs: string;
        MdiReportChanged: string;
    };
    export interface IRulesDictionaryItem {
        condition: string;
        dataMember: string;
        dataSource: DevExpress.Reporting.Designer.Data.ObjectStorageItem;
        formatting: any;
    }
    export class ReportConverter extends BaseConverter {
        private _controlsHelper;
        private _undoEngine;
        private _dataBindingMode;
        private convertChoiceEnum;
        private _formattingMapper;
        private _mapRulesProperties;
        private _expressionsToControlMap;
        private _lastChoice;
        private _defaultFormatting;
        private _notShowAgain;
        private _detailLink;
        protected _model: DevExpress.Reporting.Designer.Controls.ReportViewModel;
        constructor(_controlsHelper: any, _undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, _dataBindingMode?: string);
        private _hasBindings;
        private _hasFormattingRules;
        convert(model: DevExpress.Reporting.Designer.Controls.ReportViewModel, convertBindingsToExpressions?: string): void;
        private _generateStyleName;
        private _createBindingExpression;
        private _tryToGenerateBindingExpressions;
        private _resetDataBindings;
        private _mapPaddingObj;
        private _mapFontObj;
        private _splitFontPropertyValue;
        private _splitPaddingPropertyValue;
        private _patchRuleCondition;
        private _tryToGenerateFormattingRulesExpressions;
        private _getControlDataSourceDataMember;
        private _generateFormattingRulesDictionary;
        private _createRuleExpression;
        private _canConvertReport;
        protected _applyChanges(): void;
        protected _cancel(mode?: DevExpress.Reporting.Designer.Internal.DataBindingMode): void;
    }
    export class LocaliziblePropertiesAccessibilityProvider extends PropertiesAccessibilityProvider {
        private isDefaultLanguage;
        constructor(isDefaultLanguage: ko.Computed<boolean>);
        isPropertyVisible(editor: DevExpress.Analytics.Widgets.Editor): any;
        _hasLocalizedParent(parent: DevExpress.Analytics.Widgets.Editor): any;
    }
    export class ReportPreviewService {
        static initializePreview(report: DevExpress.Reporting.Designer.Controls.ReportViewModel): any;
    }
    export class CharacterCombHelper {
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
    export function registerControls(fieldListProvider?: any): void;
    export class CustomControlSerializableModel extends SerializableModel {
        static from(model: any, serializer: DevExpress.Analytics.Utils.IModelSerializer, info: DevExpress.Analytics.Utils.ISerializationInfoArray): CustomControlSerializableModel;
        static toJson(value: DevExpress.Analytics.Elements.SerializableModel, serializer: DevExpress.Analytics.Utils.IModelSerializer, refs: DevExpress.Analytics.Utils.IModelSerializerRef): any;
    }
    export function registerCustomControls(controls: DevExpress.Reporting.Designer.Utils.ICustomControlTypeInfo[]): void;
    export function registerCustomGlobalExpressions(expressions: DevExpress.Reporting.Designer.Utils.ICustomExpressionInfo[]): void;
    export function registerCustomReportExpressions(expressions: DevExpress.Reporting.Designer.Utils.ICustomExpressionInfo[]): void;
    export class ReportMenuSettings extends MenuSettings {
        _appMenuVisible: ko.Observable<boolean>;
        dispose(): void;
        _$menuElement: JQuery;
        setMenuElement($element: any): void;
        toggleAppMenu: any;
        constructor();
        _toggleAppMenu(): void;
        generate(): object;
        isMenuCollapsed: ko.Observable<boolean>;
    }
    export class ReportDesignerInitializer extends CommonDesignerGenerator<DevExpress.Reporting.Designer.IReportDesignerRootContext> {
        options: DevExpress.Reporting.Designer.Internal.IReportDesignerGeneratorSettings;
        private _navigation;
        private _selection;
        private _onAfterRenderCallbacks;
        private _sqlDataSourceEditor;
        private _federationDataSourceEditor;
        private _jsonDataSourceEditor;
        private _objectDataSourceEditor;
        private _dataSourceActionProvider;
        private _previewUri;
        private _dataBiningMode;
        private _defaultCrossTabControl;
        private _converters;
        private _parameters;
        private _calculatedFieldsSource;
        private _watermarks;
        private _convertBindingsToExpressions;
        private _reportcontext;
        get reportContext(): ko.Computed<DevExpress.Reporting.Designer.IReportDesignerContext>;
        private _allowMDI;
        private _callbacks;
        private _customMergeEngine;
        private _accessibilityProvider;
        get buildingModel(): DevExpress.Reporting.Designer.IReportDesignerRootContext;
        private get _designerCallbacks();
        getModel(): DevExpress.Reporting.Designer.IReportDesignerRootContext;
        subscribeIncomeReport(report: ko.Observable | ko.Computed, reportUrl?: ko.Observable<string> | ko.Computed<string>, dataSourceRefs?: any[], knownEnums?: Array<DevExpress.Reporting.IEnumType>): ReportDesignerInitializer;
        private _addDisposable;
        private _tryAddScriptEditor;
        private _getControls;
        private _createEmptyReportItemsProvider;
        addReportDialogs(func: (settings: DevExpress.Reporting.Designer.Internal.ReportDialogSettings) => void): ReportDesignerInitializer;
        addErrorPanelViewModel(element: Element, options: DevExpress.Reporting.Designer.Utils.IReportDesignerErrorPanelSettings): ReportDesignerInitializer;
        addNavigateToControl(element?: Element): ReportDesignerInitializer;
        addFlagsAndInitProperties(element?: Element): ReportDesignerInitializer;
        addPreview(options: DevExpress.Reporting.Designer.Internal.PreviewOptions): ReportDesignerInitializer;
        addReportUrls(subreports: object): ReportDesignerInitializer;
        private _wrapActionProvider;
        initializeFieldListActionProviders(func?: () => DevExpress.Analytics.Internal.IActionsProvider[]): ReportDesignerInitializer;
        initializeCalculatedFieldsSource(): ReportDesignerInitializer;
        initializeWatermarks(): ReportDesignerInitializer;
        initializeFieldListItemsExtenders(): ReportDesignerInitializer;
        initializeParameters(): ReportDesignerInitializer;
        initializeFieldListProvider(): ReportDesignerInitializer;
        initializeReportItemsProvider(): ReportDesignerInitializer;
        initializeDataBindingsProvider(): ReportDesignerInitializer;
        initializeDisplayNameProvider(): ReportDesignerInitializer;
        initializeExpressionDisplayNameProvider(): ReportDesignerInitializer;
        initializeDataSourceHelper(): ReportDesignerInitializer;
        addSelection(func?: (settings: DevExpress.Analytics.Internal.SelectionSettings) => void): ReportDesignerInitializer;
        addToolboxItems(items?: () => DevExpress.Analytics.Utils.ToolboxItem[]): ReportDesignerInitializer;
        addGroupedToolboxItems(): ReportDesignerInitializer;
        addControlProperties(editors: DevExpress.Analytics.Utils.ISerializationInfoArray, groups: DevExpress.Analytics.Internal.GroupObject, accessibilityProvider?: DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider): ReportDesignerInitializer;
        createControlProperties(editors: DevExpress.Analytics.Utils.ISerializationInfoArray, groups: DevExpress.Analytics.Internal.GroupObject, accessibilityProvider?: DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider): DevExpress.Analytics.Internal.ControlProperties;
        addMenu(func?: (settings: DevExpress.Reporting.Designer.Internal.ReportMenuSettings) => void): ReportDesignerInitializer;
        addControlsHelper(func?: (settings: DevExpress.Analytics.Internal.ControlsHelperSettings) => void): ReportDesignerInitializer;
        addSmartTagModel(): ReportDesignerInitializer;
        setControlsHelperFilter(filter: (control: any) => boolean): ReportDesignerInitializer;
        private _createPropertiesTab;
        private _createExpressionsTab;
        private _createReportExplorerTab;
        private _createFieldListTab;
        addTabPanel(panel?: () => DevExpress.Analytics.Utils.TabPanel, addTabInfo?: () => DevExpress.Analytics.Utils.TabInfo[]): ReportDesignerInitializer;
        private _createActionsStorage;
        private _updateCallback;
        addOpenReportMethod(): ReportDesignerInitializer;
        addShowPreviewMethod(): ReportDesignerInitializer;
        initializeUIEffects(applyBindings: boolean, element: Element): ReportDesignerInitializer;
        private _createNewReportFromWizardState;
        private _createNewViaWizardAction;
        private _createLocalizationModeAction;
        private _createDesignInReportWizardAction;
        private _createMultiQueryDataSourceWizardAction;
        private _customizeDesignerActions;
        private _patchReportBeforeRedesign;
        addContextActions(func?: (contextActions: DevExpress.Analytics.Internal.ContextActionsSettings) => void): ReportDesignerInitializer;
        addActionList(actionListFunc?: () => DevExpress.Analytics.Internal.ActionLists): ReportDesignerInitializer;
        private _createChartDesignerPart;
        private _createWizardPart;
        addActivatedExpressionEditor(): ReportDesignerInitializer;
        addParts(func?: (parts: any) => DevExpress.Analytics.Internal.IDesignerPart[]): ReportDesignerInitializer;
        addDefaultAddons(addons?: DevExpress.Analytics.Internal.IDesignerPart[]): ReportDesignerInitializer;
        tryAddSqlDataSourceEditorAddon(relationsEditor?: ko.Observable<DevExpress.QueryBuilder.Widgets.Internal.MasterDetailEditor>): ReportDesignerInitializer;
        tryAddFederationDataSourceEditorAddon(relationsEditor?: ko.Observable<DevExpress.QueryBuilder.Widgets.Internal.MasterDetailEditor>, manageQueriesEditor?: ko.Observable<DevExpress.QueryBuilder.Widgets.Internal.ManageFederatedQueriesEditor>, queriesPopupHelper?: ko.Observable<DevExpress.QueryBuilder.Widgets.Internal.FederatedQueriesHelper>): ReportDesignerInitializer;
        tryAddScriptEditorAddon(isScriptsDisabled: boolean): ReportDesignerInitializer;
        tryAddInlineRichTextEdit(): ReportDesignerInitializer;
        onContextChanged(subreports?: object, func?: (context: DevExpress.Reporting.Designer.IReportDesignerContext) => void): ReportDesignerInitializer;
        configurateRtl(rtl: boolean): ReportDesignerInitializer;
        configureReportStorageRegistration(reportStorageIsRegister: boolean, allowMDI: boolean): ReportDesignerInitializer;
        applyUri(uriSettings: DevExpress.Reporting.Designer.Internal.IReportUriSettings): ReportDesignerInitializer;
        initBindingMode(dataBiningMode: string, convertBindingsToExpressions: string): ReportDesignerInitializer;
        initDefaultCrossTabControl(defaultCrossTabControl: DevExpress.Reporting.Designer.Utils.DefaultCrossTabControlValue): ReportDesignerInitializer;
        registerControls(dataBindingMode: DevExpress.Reporting.Designer.Utils.DataBindingModeValue, reportItemsProvider: ko.Observable<DevExpress.Reporting.Designer.Internal.ReportItemsProvider> | ko.Computed<DevExpress.Reporting.Designer.Internal.ReportItemsProvider>): ReportDesignerInitializer;
        registerCustomControls(controls: DevExpress.Reporting.Designer.Utils.ICustomControlTypeInfo[]): ReportDesignerInitializer;
        registerCustomExpressions(globalExpressions: DevExpress.Reporting.Designer.Utils.ICustomExpressionInfo[], reportExpressions: DevExpress.Reporting.Designer.Utils.ICustomExpressionInfo[]): ReportDesignerInitializer;
        addCallbacks(callbacks: {
            designer?: DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler;
            preview?: DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler;
        }): ReportDesignerInitializer;
        addProcessErrorCallback(processError?: (e: any) => void): ReportDesignerInitializer;
        runCustomizeToolboxEvent(customizeToolbox?: (controlsStore: DevExpress.Reporting.ControlsFactory) => void): ReportDesignerInitializer;
        initCultureInfo(cultureInfoList: DevExpress.Reporting.Designer.Utils.ICultureInfoList): ReportDesignerInitializer;
        updateFont(fontSet: string[] | {
            [key: string]: string;
        }): ReportDesignerInitializer;
        initFormatStringPatterns(formatStringData: {
            standardPatterns: {
                [key: string]: DevExpress.Analytics.Widgets.Internal.IStandardPattern;
            };
            customPatterns: {
                [key: string]: Array<string>;
            };
        }): ReportDesignerInitializer;
        addPopularProperties(controlsFactory: DevExpress.Analytics.Utils.ControlsFactory, accessibilityProvider?: DevExpress.Analytics.Internal.IPropertiesAccessibilityProvider): ReportDesignerInitializer;
        addInlineTextEdit(func?: () => DevExpress.Analytics.Internal.InlineTextEdit): ReportDesignerInitializer;
        addStylesProjection(styles?: ko.PureComputed<ko.ObservableArray<DevExpress.Reporting.StyleModel>>): ReportDesignerInitializer;
        addFormattingRulesProjection(rules?: ko.PureComputed<ko.ObservableArray<DevExpress.Reporting.FormattingRule>>): ReportDesignerInitializer;
        addReportExplorerProvider(reportExplorerProvider?: DevExpress.Analytics.Internal.ObjectExplorerProvider): ReportDesignerInitializer;
        addControlsProjection(controlsHelper?: DevExpress.Analytics.Internal.DesignControlsHelper): ReportDesignerInitializer;
        addBandsProjection(controlsHelper?: DevExpress.Analytics.Internal.DesignControlsHelper): ReportDesignerInitializer;
        addWizardRunner(): ReportDesignerInitializer;
        addWizards(connectionStrings: DevExpress.Analytics.Wizard.IDataSourceWizardConnectionStrings, wizardSettings: DevExpress.Reporting.Designer.Utils.IReportWizardSettings, cusomizeSettingsFunc: (settings: DevExpress.Reporting.Designer.Internal.WizardsInitializerSettings) => void): ReportDesignerInitializer;
        addLocalizationEditor(): ReportDesignerInitializer;
        addStaticContext(): ReportDesignerInitializer;
        tryApplyBindings(applyBindings: boolean, element: Element): ReportDesignerInitializer;
        dispose(): void;
        constructor(options: DevExpress.Reporting.Designer.Internal.IReportDesignerGeneratorSettings);
    }
    /// <reference types="jquery" />
    export function createReportDesigner(element: HTMLElement, data: DevExpress.Reporting.Designer.Utils.IReportDesignerInitializationData, callbacks: {
        designer?: DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler;
        preview?: DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler;
    }, localizationSettings?: DevExpress.Analytics.Internal.ILocalizationSettings, knownEnums?: Array<DevExpress.Reporting.IEnumType>, designerHandlerUri?: string, previewHandlerUri?: string, rtl?: boolean, applyBindings?: boolean): JQuery.Promise<DevExpress.Reporting.Designer.IReportDesignerRootContext>;
    export function createReportDesignerFromModel(model: DevExpress.Reporting.Designer.Utils.IReportDesignerInitializationModel, element: HTMLElement, callbacks?: {
        designer?: DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler;
        preview?: DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler;
    }, applyBindings?: boolean): JQuery.Promise<DevExpress.Reporting.Designer.IReportDesignerRootContext>;
    export type ReportDesignerTemplates = {
        "dxcd-field": DevExpress.Analytics.Widgets.IFieldListEditorViewModel;
        "dxcd-pointscollection": DevExpress.Analytics.Widgets.IEditorViewModel;
        "dxrd-formattingRuleCollection": DevExpress.Analytics.Widgets.IEditorViewModel;
        "dxrd-dataBinding": DevExpress.Analytics.Widgets.IFieldListEditorViewModel;
        "dxrd-chartValueBinding": DevExpress.Analytics.Widgets.IFieldListEditorViewModel;
        "dxrd-reportexplorer-editor": DevExpress.Analytics.Widgets.IFieldListEditorViewModel;
        "dxrd-collection-item-group": DevExpress.Analytics.Widgets.Internal.ICollectionItemWrapperViewModel;
        "dxcd-summaryFunction-content": DevExpress.Reporting.Chart.Internal.Widgets.ISummaryFunctionEditorViewModel;
    };
    export {};
    export class DataFilterModelReport extends DataFilterModel {
        getInfo(): any[];
        private _createReportDataProperty;
        private _mapObject;
        constructor(model: any, serializer?: any);
        dataMember: ko.Observable<string> | ko.Computed<string>;
        dataSource: ko.Observable<any>;
        misc: any;
        report: any;
    }
    export {};
    export class BandLevelEditor extends UndoEditor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        max: ko.PureComputed;
        min: number;
    }
    export class CoordinateGridViewModel extends Disposable {
        _initGrid(length: number, gridSize: number, gridLines: ko.ObservableArray<any>, flip?: boolean): void;
        constructor(options: {
            height: ko.Observable<number> | ko.Computed<number>;
            width: ko.Observable<number> | ko.Computed<number>;
            snapGridSize: ko.Observable<number> | ko.Computed<number>;
            zoom: ko.Observable<number> | ko.Computed<number>;
            measureUnit: ko.Observable<DevExpress.Analytics.Internal.MeasureUnit> | ko.Computed<DevExpress.Analytics.Internal.MeasureUnit>;
            flip?: ko.Observable<boolean> | ko.Computed<boolean>;
        });
        width: ko.Observable<number>;
        height: ko.Observable<number>;
        verticalGridLines: ko.ObservableArray<any>;
        horizontalGridLines: ko.ObservableArray<any>;
        majorVerticalGridLines: ko.ObservableArray<any>;
        majorHorizontalGridLines: ko.ObservableArray<any>;
        dispose(): void;
    }
    export {};
    export class ExpressionableFontModel extends FontModel {
        private _model;
        constructor(value: ko.Observable<string> | ko.Computed<string>, _model: ko.Observable<DevExpress.Analytics.Internal.IControlPropertiesViewModel> | ko.Computed<DevExpress.Analytics.Internal.IControlPropertiesViewModel>);
        modificators: {
            bold: ko.Observable<boolean>;
            boldHasExpression: ko.Computed<boolean>;
            italic: ko.Observable<boolean>;
            italicHasExpression: ko.Computed<boolean>;
            strikeout: ko.Observable<boolean>;
            strikeoutHasExpression: ko.Computed<boolean>;
            underline: ko.Observable<boolean>;
            underlineHasExpression: ko.Computed<boolean>;
        };
        isPropertyHighlighted: (propertyName: any) => boolean;
    }
    export class RulerViewModel extends Disposable {
        _initGrid(length: number, gridSize: any, gridLines: any, flip?: boolean): void;
        constructor(options: {
            length: () => number;
            units: ko.Observable<DevExpress.Analytics.Internal.MeasureUnit> | ko.Computed<DevExpress.Analytics.Internal.MeasureUnit>;
            zoom: ko.Observable<number> | ko.Computed<number>;
            direction?: string;
            flip?: any;
            disable?: {
                start: number;
                width: number;
            };
        });
        height: ko.Observable<number>;
        width: ko.Observable<number>;
        gridLines: ko.ObservableArray<any>;
        majorGridLines: ko.ObservableArray<any>;
        disable: any;
        defaultGridLinesCoordinate: ko.Observable<any>;
    }
    export interface WatermarkBindingOptions {
        band: DevExpress.Reporting.Designer.Bands.BandSurface;
        reportSurface: DevExpress.Reporting.Designer.Controls.ReportSurface;
        forLeftMargin: boolean;
        image: string;
        transparency: number;
        viewMode: string;
        align: string;
        tiling: boolean;
    }
    export class dxEventDropDownEditor extends dxSelectBox {
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
    export class FormatStringService {
        static saveCustomPattern(typeString: string, format: string): any;
        static removeCustomPattern(typeString: string, format: string): any;
        static updatePreview(value: string, typeString: string, format: string): any;
        static actions: DevExpress.Analytics.Widgets.IFormatStringEditorActions;
    }
}
declare module DevExpress.Reporting.Chart.Internal.Widgets {
    import FieldListEditor = DevExpress.Analytics.Widgets.FieldListEditor;
    import IFieldListEditorViewModel = DevExpress.Analytics.Widgets.IFieldListEditorViewModel;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import Editor = DevExpress.Analytics.Widgets.Editor;
    import SeriesPointModel = DevExpress.Reporting.Chart.Internal.Series.SeriesPointModel;
    import UndoEngine = DevExpress.Analytics.Utils.UndoEngine;
    import ColorPickerEditor = DevExpress.Analytics.Widgets.ColorPickerEditor;
    export class SummaryFunctionModel {
        static availableItems: string[];
        static from(val: any): SummaryFunctionModel;
        static toJson(value: SummaryFunctionModel): {};
        private _updateArgs;
        constructor(functionName: any, args: any);
        functionName: ko.Observable<any>;
        args: ko.ObservableArray<{
            value: ko.Observable<string>;
        }>;
    }
    export interface ISummaryFunctionEditorViewModel extends IFieldListEditorViewModel {
        availableItems: string[];
        memberPadding: {
            paddingLeft: number;
        };
        argumentTemplateName: string;
        actionsAreAvailable: boolean;
        getLocalization: (displayName: string, localizationId: string) => string;
        add: () => void;
        remove: (index: number) => void;
    }
    export class SummaryFunctionEditor extends FieldListEditor {
        createViewModel(): ISummaryFunctionEditorViewModel;
        constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>);
        getLocalization(displayName: any, localizationId: any): string;
        memberPadding: any;
        argumentTemplateName: string;
        actionsAreAvailable: ko.Observable<boolean>;
        add(): void;
        remove(index: number): void;
        getAvailableItems(): string[];
    }
    export class ChartDataMemberEditor extends FieldListEditor {
        private _isNumber;
        private _isDate;
        private _getArgumentDataMemberFilter;
        private _getValueDataMemberFilter;
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>);
    }
    export class ChartDataSourceEditor extends Editor {
        generateOptions(dataSources: ko.Computed<Array<{
            displayName: string;
            value: any;
        }>>, popupContainer: string): any;
        options: any;
    }
    export class ChartDependencyEditor extends Editor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        getDependencyOptions(templateOptions: any, propertyName: any, depPropertyName: any): any;
        depProperty: any;
        bindableOptions: any;
    }
    export class CollectionLookupEditorModel extends Editor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        get editors(): any;
        array: ko.Computed<any>;
        selectedItem: ko.Observable<any>;
    }
    export class PointsEditor extends Editor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        addPoint(model: any): DevExpress.Reporting.Chart.Internal.Series.SeriesPointModel;
    }
    export class PositionSeriesLabelEditor extends Editor {
        private _positionChooser;
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        values: ko.Computed<{
            displayValue: string;
            value: string;
        }[]>;
    }
    export class UndoColorPickerEditor extends ColorPickerEditor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>);
        generateValue(undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine>): ko.Computed<any>;
        generatedValue: ko.Computed<any>;
    }
    export class ViewEditor extends Editor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        generateHeaderValue(undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine>): ko.Computed<string>;
        generateViewItems(): any[];
        generateViewClassName(value: any, isTemplate?: boolean): string;
        viewItems: any[];
        headerValue: ko.Computed<string>;
        contentValue: ko.Computed<any>;
    }
    export {};
}
declare module DevExpress.Reporting.Chart.Internal.Axis {
    import IAction = DevExpress.Analytics.Utils.IAction;
    import SerializableModel = DevExpress.Analytics.Elements.SerializableModel;
    import IModelSerializer = DevExpress.Analytics.Utils.IModelSerializer;
    import IModelSerializerRef = DevExpress.Analytics.Utils.IModelSerializerRef;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import IChartComponent = DevExpress.Reporting.Internal.IChartComponent;
    import IChartComponentInfo = DevExpress.Reporting.Internal.IChartComponentInfo;
    import IChartComponentWithText = DevExpress.Reporting.Chart.Internal.Models.IChartComponentWithText;
    import ConstantLineViewModel = DevExpress.Reporting.Chart.Internal.Models.ConstantLineViewModel;
    import ScaleBreakViewModel = DevExpress.Reporting.Chart.Internal.Models.ScaleBreakViewModel;
    import StripViewModel = DevExpress.Reporting.Chart.Internal.Models.StripViewModel;
    import WholeRangeModel = DevExpress.Reporting.Chart.Internal.Models.WholeRangeModel;
    import ICollectionItem = DevExpress.Reporting.Chart.Internal.Axis.ICollectionItem;
    import AxisXYViewModel = DevExpress.Reporting.Chart.Internal.Axis.AxisXYViewModel;
    export interface ICollectionItem {
        parent: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Axis.ICollectionItem>;
        innerActions: Array<DevExpress.Analytics.Utils.IAction>;
    }
    export function initCollectionItem(item: DevExpress.Reporting.Chart.Internal.Axis.ICollectionItem, parent: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Axis.ICollectionItem>): () => void;
    export class AxisXYViewModel extends SerializableModel implements IChartComponent {
        static from(info?: DevExpress.Analytics.Utils.ISerializationInfoArray): (model: object, serializer: DevExpress.Analytics.Utils.IModelSerializer) => DevExpress.Reporting.Chart.Internal.Axis.AxisXYViewModel;
        static toJson(value: DevExpress.Reporting.Chart.Internal.Axis.AxisXYViewModel, serializer: DevExpress.Analytics.Utils.IModelSerializer, refs: DevExpress.Analytics.Utils.IModelSerializerRef): object;
        getChildComponents(): DevExpress.Reporting.Internal.IChartComponentInfo[];
        constructor(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer, info?: DevExpress.Analytics.Utils.ISerializationInfoArray);
        constantLines: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Models.ConstantLineViewModel>;
        scaleBreaks: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Models.ScaleBreakViewModel>;
        strips: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Models.StripViewModel>;
        axisTitle: DevExpress.Reporting.Chart.Internal.Models.IChartComponentWithText;
        wholeRange: DevExpress.Reporting.Chart.Internal.Models.WholeRangeModel;
    }
    export const axisX: DevExpress.Analytics.Utils.ISerializationInfo;
    export const axisY: DevExpress.Analytics.Utils.ISerializationInfo;
    export class SecondaryAxisViewModel extends AxisXYViewModel implements ICollectionItem {
        static xPrefix: string;
        static yPrefix: string;
        constructor(model: object, parent: ko.ObservableArray<SecondaryAxisViewModel>, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        get axisID(): number;
        parent: ko.ObservableArray<SecondaryAxisViewModel>;
        innerActions: Array<DevExpress.Analytics.Utils.IAction>;
    }
}
declare module DevExpress.Reporting.Chart.Internal.Models {
    import SerializableModel = DevExpress.Analytics.Elements.SerializableModel;
    import IAction = DevExpress.Analytics.Utils.IAction;
    import IModelSerializer = DevExpress.Analytics.Utils.IModelSerializer;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import ICollectionItem = DevExpress.Reporting.Chart.Internal.Axis.ICollectionItem;
    import ChartElementCollectionItemBase = DevExpress.Reporting.Chart.Internal.Models.ChartElementCollectionItemBase;
    import ISerializableModel = DevExpress.Analytics.Utils.ISerializableModel;
    import IChartComponent = DevExpress.Reporting.Internal.IChartComponent;
    import IChartComponentInfo = DevExpress.Reporting.Internal.IChartComponentInfo;
    import ChartLocalizableElementCollectionItemBase = DevExpress.Reporting.Chart.Internal.Models.ChartLocalizableElementCollectionItemBase;
    import IModelSerializerRef = DevExpress.Analytics.Utils.IModelSerializerRef;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import StripLimitViewModel = DevExpress.Reporting.Chart.Internal.Models.StripLimitViewModel;
    import SeriesViewModel = DevExpress.Reporting.Chart.Internal.Series.SeriesViewModel;
    import SeriesTemplateViewModel = DevExpress.Reporting.Chart.Internal.Series.SeriesTemplateViewModel;
    import IChartComponentWithText = DevExpress.Reporting.Chart.Internal.Models.IChartComponentWithText;
    import DiagramViewModel = DevExpress.Reporting.Chart.Internal.DiagramViewModel;
    import AdditionalLegendViewModel = DevExpress.Reporting.Chart.Internal.Models.AdditionalLegendViewModel;
    import DataContainerViewModel = DevExpress.Reporting.Chart.Internal.Models.DataContainerViewModel;
    import LegendViewModel = DevExpress.Reporting.Chart.Internal.Models.LegendViewModel;
    import TitleViewModel = DevExpress.Reporting.Chart.Internal.Models.TitleViewModel;
    export class ChartElementCollectionItemBase extends SerializableModel implements ICollectionItem {
        static toJson(value: DevExpress.Reporting.Chart.Internal.Models.ChartElementCollectionItemBase, serializer: any, refs: any): any;
        constructor(model: any, parent: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Models.ChartElementCollectionItemBase>, serializer?: DevExpress.Analytics.Utils.IModelSerializer, info?: DevExpress.Analytics.Utils.ISerializationInfoArray);
        parent: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Axis.ICollectionItem>;
        name: ko.Observable<string> | ko.Computed<string>;
        defaultItemName: (parentName?: string) => string;
        innerActions: DevExpress.Analytics.Utils.IAction[];
    }
    export interface IChartComponentWithText extends ISerializableModel {
        text: ko.Observable<string>;
    }
    export class ChartComponentModelWithText extends SerializableModel implements IChartComponentWithText, IChartComponent {
        constructor(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer, info?: DevExpress.Analytics.Utils.ISerializationInfoArray);
        getExpressionProperties(): string[];
        text: ko.Observable<string>;
    }
    export class ChartLocalizableElementCollectionItemBase extends ChartElementCollectionItemBase implements ICollectionItem, IChartComponent {
        getChildComponents(): DevExpress.Reporting.Internal.IChartComponentInfo[];
        title: DevExpress.Reporting.Chart.Internal.Models.IChartComponentWithText;
    }
    export class WholeRangeModel extends SerializableModel implements IChartComponent {
        constructor(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer, info?: DevExpress.Analytics.Utils.ISerializationInfoArray);
        getExpressionProperties(): string[];
        minValue: ko.Observable<number>;
        maxValue: ko.Observable<number>;
    }
    export class ConstantLineViewModel extends ChartLocalizableElementCollectionItemBase {
        static from(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer): ConstantLineViewModel;
        constructor(model: object, parent: ko.ObservableArray<ConstantLineViewModel>, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getExpressionProperties(): string[];
        static prefix: string;
        axisValue: ko.Observable<string>;
        _axisValue: ko.Observable<string>;
        legendText: ko.Observable<string>;
    }
    export class ScaleBreakViewModel extends ChartElementCollectionItemBase {
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): ScaleBreakViewModel;
        constructor(model: any, parent: ko.ObservableArray<ScaleBreakViewModel>, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        static prefix: string;
    }
    export class StripLimitViewModel extends SerializableModel implements IChartComponent {
        static from(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Reporting.Chart.Internal.Models.StripLimitViewModel;
        static toJson(value: DevExpress.Reporting.Chart.Internal.Models.StripLimitViewModel, serializer: DevExpress.Analytics.Utils.IModelSerializer, refs: DevExpress.Analytics.Utils.IModelSerializerRef): object;
        constructor(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer, info?: DevExpress.Analytics.Utils.ISerializationInfoArray);
        getExpressionProperties(): string[];
        enabled: ko.Observable<boolean>;
        axisValue: ko.Observable<string>;
        _axisValue: ko.Observable<string>;
    }
    export const stripLimitSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const stripMinLimitInfo: DevExpress.Analytics.Utils.ISerializationInfo, stripMaxLimitInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export class StripViewModel extends ChartElementCollectionItemBase implements IChartComponent {
        static initialModel: {
            MinLimit: {
                "@AxisValueSerializable": string;
            };
            MaxLimit: {
                "@AxisValueSerializable": string;
            };
        };
        static from(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer): StripViewModel;
        constructor(model: object, parent: ko.ObservableArray<StripViewModel>, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getExpressionProperties(): string[];
        getChildComponents(): DevExpress.Reporting.Internal.IChartComponentInfo[];
        static prefix: string;
        minLimit: DevExpress.Reporting.Chart.Internal.Models.StripLimitViewModel;
        maxLimit: DevExpress.Reporting.Chart.Internal.Models.StripLimitViewModel;
        legendText: ko.Observable<string>;
        axisLabelText: ko.Observable<string>;
    }
    export const stripSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class TitleViewModel extends ChartElementCollectionItemBase implements IChartComponent {
        static prefix: string;
        static from(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Reporting.Chart.Internal.Models.TitleViewModel;
        getExpressionProperties(): string[];
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        titleID: ko.Observable<string>;
        name: ko.Observable<string>;
    }
    export class ChartViewTitleModel extends TitleViewModel {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export function assignTitleActions(titles: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Models.TitleViewModel>): void;
    export const defaultChartTitleText = "Chart Title";
    export const chartViewTitleSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const titleSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class AdditionalPaneViewModel extends ChartLocalizableElementCollectionItemBase {
        static from(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer): AdditionalPaneViewModel;
        constructor(model: object, parent: ko.ObservableArray<AdditionalPaneViewModel>, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        static prefix: string;
    }
    export class AdditionalLegendViewModel extends ChartLocalizableElementCollectionItemBase {
        static from(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Reporting.Chart.Internal.Models.AdditionalLegendViewModel;
        constructor(model: object, parent: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Models.AdditionalLegendViewModel>, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        static prefix: string;
    }
    export class DataContainerViewModel extends SerializableModel implements IChartComponent {
        static from(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Reporting.Chart.Internal.Models.DataContainerViewModel;
        static toJson(value: DevExpress.Reporting.Chart.Internal.Models.DataContainerViewModel, serializer: DevExpress.Analytics.Utils.IModelSerializer, refs: DevExpress.Analytics.Utils.IModelSerializerRef): object;
        getChildComponents(): DevExpress.Reporting.Internal.IChartComponentInfo[];
        constructor(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        seriesTemplate: DevExpress.Reporting.Chart.Internal.Series.SeriesTemplateViewModel;
        series: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Series.SeriesViewModel>;
        dataMember: ko.Observable<string> | ko.Computed<string>;
        seriesDataMember: ko.Observable<string> | ko.Computed<string>;
        pivotGridDataSourceOptions: {
            autoBindingSettingsEnabled: ko.Observable<boolean> | ko.Computed<boolean>;
        };
    }
    export const dataContainerSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const dataContainer: DevExpress.Analytics.Utils.ISerializationInfo;
    export class LegendViewModel extends SerializableModel {
        static from(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Reporting.Chart.Internal.Models.LegendViewModel;
        static toJson(value: DevExpress.Reporting.Chart.Internal.Models.LegendViewModel, serializer: DevExpress.Analytics.Utils.IModelSerializer, refs: DevExpress.Analytics.Utils.IModelSerializerRef): object;
        constructor(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        title: DevExpress.Reporting.Chart.Internal.Models.IChartComponentWithText;
    }
    export const legend: DevExpress.Analytics.Utils.ISerializationInfo;
    export class ChartViewModel extends SerializableModel implements IChartComponent {
        static from(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer): ChartViewModel;
        static toJson(value: ChartViewModel, serializer: DevExpress.Analytics.Utils.IModelSerializer, refs: DevExpress.Analytics.Utils.IModelSerializerRef): object;
        private _patchView;
        private _patchSeries;
        _createDiagram(model: object, oldType: ko.Observable<string>, serializer: DevExpress.Analytics.Utils.IModelSerializer): void;
        getChildComponents(): DevExpress.Reporting.Internal.IChartComponentInfo[];
        constructor(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        barDistance: ko.Observable<number>;
        barDistanceFixed: ko.Observable<number>;
        titles: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Models.TitleViewModel>;
        legends: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Models.AdditionalLegendViewModel>;
        legend: DevExpress.Reporting.Chart.Internal.Models.LegendViewModel;
        smallChartText: DevExpress.Reporting.Chart.Internal.Models.IChartComponentWithText;
        emptyChartText: DevExpress.Reporting.Chart.Internal.Models.IChartComponentWithText;
        dataContainer: DevExpress.Reporting.Chart.Internal.Models.DataContainerViewModel;
        diagram: ko.Observable<DevExpress.Reporting.Chart.Internal.DiagramViewModel> | ko.Computed<DevExpress.Reporting.Chart.Internal.DiagramViewModel>;
    }
    export const chartSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const chart: DevExpress.Analytics.Utils.ISerializationInfo;
    export const dataFilterSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class DataFilterModel implements ISerializableModel {
        static createNew(): DataFilterModel;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        columnName: ko.Observable<string>;
        name: ko.Computed<string>;
    }
    export const DefaultDataFilterModel: DevExpress.Analytics.Internal.IGlobalSubscribableValue<typeof DataFilterModel>;
}
declare module DevExpress.Reporting.Chart.Internal.Series {
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import IModelSerializer = DevExpress.Analytics.Utils.IModelSerializer;
    import ISerializableModel = DevExpress.Analytics.Utils.ISerializableModel;
    import SummaryFunctionModel = DevExpress.Reporting.Chart.Internal.Widgets.SummaryFunctionModel;
    import SerializableModel = DevExpress.Analytics.Elements.SerializableModel;
    import SeriesViewModel = DevExpress.Reporting.Chart.Internal.Series.SeriesViewModel;
    import StockValueDataMembers = DevExpress.Reporting.Chart.Internal.DataMembers.StockValueDataMembers;
    import Value1Value2DataMembers = DevExpress.Reporting.Chart.Internal.DataMembers.Value1Value2DataMembers;
    import ValueWeightDataMembers = DevExpress.Reporting.Chart.Internal.DataMembers.ValueWeightDataMembers;
    import IChartComponent = DevExpress.Reporting.Internal.IChartComponent;
    import ChartElementCollectionItemBase = DevExpress.Reporting.Chart.Internal.Models.ChartElementCollectionItemBase;
    import IModelSerializerRef = DevExpress.Analytics.Utils.IModelSerializerRef;
    import IChartComponentInfo = DevExpress.Reporting.Internal.IChartComponentInfo;
    import TitleViewModel = DevExpress.Reporting.Chart.Internal.Models.TitleViewModel;
    import FillStyle = DevExpress.Reporting.Chart.Internal.Series.FillStyle;
    import Indicator = DevExpress.Reporting.Chart.Internal.Series.Indicator;
    import SeriesLabelViewModel = DevExpress.Reporting.Chart.Internal.Series.SeriesLabelViewModel;
    import DateTimeSummaryOptionsModel = DevExpress.Reporting.Chart.Internal.Series.DateTimeSummaryOptionsModel;
    import NumericSummaryOptionsModel = DevExpress.Reporting.Chart.Internal.Series.NumericSummaryOptionsModel;
    import QualitativeSummaryOptionsModel = DevExpress.Reporting.Chart.Internal.Series.QualitativeSummaryOptionsModel;
    import SeriesViewViewModel = DevExpress.Reporting.Chart.Internal.Series.SeriesViewViewModel;
    import IAction = DevExpress.Analytics.Utils.IAction;
    import ICollectionItem = DevExpress.Reporting.Chart.Internal.Axis.ICollectionItem;
    import SeriesPointModel = DevExpress.Reporting.Chart.Internal.Series.SeriesPointModel;
    import SeriesTemplateViewModel = DevExpress.Reporting.Chart.Internal.Series.SeriesTemplateViewModel;
    export const summaryFunctionSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const summaryOptionsSerializationInfoArray: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const numericSummaryOptionsSerializationInfoArray: DevExpress.Analytics.Utils.ISerializationInfo[];
    export const dateTimeSummaryOptionsSerializationInfoArray: DevExpress.Analytics.Utils.ISerializationInfo[];
    export class SummaryOptionsModelBase implements ISerializableModel {
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        resetAllProperties(): void;
        summaryFunction: DevExpress.Reporting.Chart.Internal.Widgets.SummaryFunctionModel;
    }
    export class QualitativeSummaryOptionsModel extends SummaryOptionsModelBase {
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Reporting.Chart.Internal.Series.QualitativeSummaryOptionsModel;
        static toJson(value: DevExpress.Reporting.Chart.Internal.Series.QualitativeSummaryOptionsModel, serializer: any, refs: any): any;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
    }
    export class NumericSummaryOptionsModel extends SummaryOptionsModelBase {
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Reporting.Chart.Internal.Series.NumericSummaryOptionsModel;
        static toJson(value: DevExpress.Reporting.Chart.Internal.Series.QualitativeSummaryOptionsModel, serializer: any, refs: any): any;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class DateTimeSummaryOptionsModel extends SummaryOptionsModelBase {
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Reporting.Chart.Internal.Series.DateTimeSummaryOptionsModel;
        static toJson(value: DevExpress.Reporting.Chart.Internal.Series.QualitativeSummaryOptionsModel, serializer: any, refs: any): any;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class FillStyle extends SerializableModel {
        static from(info: any, gradientTypeName: any): (model: any, serializer: any) => DevExpress.Reporting.Chart.Internal.Series.FillStyle;
        static toJson(model: DevExpress.Reporting.Chart.Internal.Series.FillStyle, serializer: DevExpress.Analytics.Utils.IModelSerializer, refs: any): any;
        private _optionsTypeMap;
        constructor(model: any, info: DevExpress.Analytics.Utils.ISerializationInfoArray, gradientTypeName: string, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        isPropertyVisible(propertyName: any): any;
        updateOptions(fillMode: string, serializer: any, optionsObject: any): void;
        fillMode: ko.Observable<string> | ko.Computed<string>;
        options: ko.Observable<any>;
        gradientTypeName: string;
    }
    export const viewFillMode: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        valuesArray: {
            value: string;
            displayValue: string;
            localizationId: string;
        }[];
        defaultVal: string;
    };
    export const fillStyleInfo: (DevExpress.Analytics.Utils.ISerializationInfo | {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        valuesArray: {
            value: string;
            displayValue: string;
            localizationId: string;
        }[];
        defaultVal: string;
    })[];
    export const stripFillStyle: DevExpress.Analytics.Utils.ISerializationInfo;
    export class SeriesPointModel extends SerializableModel {
        static separator: string;
        static getSerializationValue(array: Array<ko.Observable<any>>, dateConverter: any): any[];
        static createNew(series: any): DevExpress.Reporting.Chart.Internal.Series.SeriesPointModel;
        static getPointModelBySeries(series: DevExpress.Reporting.Chart.Internal.Series.SeriesViewModel): {
            "@ValuesSerializable": any;
        };
        static getDefaultValueByScaleType(scaleType: string): Date | 0;
        static valueToJsonObject(value: any): string;
        private _valueDataMembersToString;
        private _assignValueDataMembers;
        constructor(model: any, series: DevExpress.Reporting.Chart.Internal.Series.SeriesViewModel, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        get isDateType(): boolean;
        argumentSerializable: ko.Observable | ko.Computed;
        argumentSerializableInfo: ko.Computed;
        valuesSerializable: ko.Observable | ko.Computed;
        series: DevExpress.Reporting.Chart.Internal.Series.SeriesViewModel;
        arrayValueDataMemberNames: string[];
    }
    export const valuesSerializable: DevExpress.Analytics.Utils.ISerializationInfo, colorSerializable: DevExpress.Analytics.Utils.ISerializationInfo;
    export const seriesPointSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfo[];
    export class SeriesLabelViewModel extends SerializableModel {
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Reporting.Chart.Internal.Series.SeriesLabelViewModel;
        static toJson(value: any, serializer: any, refs: any): any;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        typeNameSerializable: ko.Observable<string> | ko.Computed<string>;
        seriesLabelPosition: ko.Observable<string>;
    }
    export const seriesLabel: DevExpress.Analytics.Utils.ISerializationInfo;
    export const viewTypesDataMembers: {
        BubbleSeriesView: typeof DevExpress.Reporting.Chart.Internal.DataMembers.ValueWeightDataMembers;
        OverlappedRangeBarSeriesView: typeof DevExpress.Reporting.Chart.Internal.DataMembers.Value1Value2DataMembers;
        SideBySideRangeBarSeriesView: typeof DevExpress.Reporting.Chart.Internal.DataMembers.Value1Value2DataMembers;
        RangeAreaSeriesView: typeof DevExpress.Reporting.Chart.Internal.DataMembers.Value1Value2DataMembers;
        RangeArea3DSeriesView: typeof DevExpress.Reporting.Chart.Internal.DataMembers.Value1Value2DataMembers;
        OverlappedGanttSeriesView: typeof DevExpress.Reporting.Chart.Internal.DataMembers.Value1Value2DataMembers;
        SideBySideGanttSeriesView: typeof DevExpress.Reporting.Chart.Internal.DataMembers.Value1Value2DataMembers;
        StockSeriesView: typeof DevExpress.Reporting.Chart.Internal.DataMembers.StockValueDataMembers;
        CandleStickSeriesView: typeof DevExpress.Reporting.Chart.Internal.DataMembers.StockValueDataMembers;
    };
    export const mapTypes: {
        [key: string]: string;
    };
    export const onlyNumericArgumentSupportedSeriesViewTypes: Array<string>;
    export class Indicator extends ChartElementCollectionItemBase implements IChartComponent {
        static prefix: string;
        constructor(model: object, parent: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Series.Indicator>, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getExpressionProperties(): string[];
        legendText: ko.Observable<string>;
    }
    export function assignIndicatorActions(indicators: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Series.Indicator>): void;
    export class SeriesViewViewModel extends SerializableModel implements IChartComponent {
        static from(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer): ko.Observable<DevExpress.Reporting.Chart.Internal.Series.SeriesViewViewModel>;
        dispose(): void;
        static toJson(value: ko.Observable<DevExpress.Reporting.Chart.Internal.Series.SeriesViewViewModel>, serializer: DevExpress.Analytics.Utils.IModelSerializer, refs: DevExpress.Analytics.Utils.IModelSerializerRef): object;
        _getInfo(typeName: string): DevExpress.Analytics.Utils.ISerializationInfoArray;
        private _createPropertyDisabledDependence;
        private _createMarkerDependences;
        private _createLinkOptionsDependences;
        preInitProperties(model: object): void;
        getChildComponents(): DevExpress.Reporting.Internal.IChartComponentInfo[];
        constructor(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        axisXName: ko.Observable<string> | ko.Computed<string>;
        axisYName: ko.Observable<string> | ko.Computed<string>;
        paneName: ko.Observable<string> | ko.Computed<string>;
        fillStyle: DevExpress.Reporting.Chart.Internal.Series.FillStyle;
        indicators: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Series.Indicator>;
        titles: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Models.TitleViewModel>;
        barWidth: ko.Observable<number> | ko.Computed<number>;
        typeName: string;
    }
    export const view: DevExpress.Analytics.Utils.ISerializationInfo;
    export interface IViewBindableProperty {
        model: ko.Observable<any>;
        type: ko.Observable<string> | ko.Computed<string>;
    }
    export enum ScaleType {
        Qualitative = 0,
        Numerical = 1,
        DateTime = 2,
        Auto = 3
    }
    export const ScaleTypeMap: {
        [key: string]: ScaleType;
    };
    export class SeriesTemplateViewModel extends SerializableModel implements IChartComponent {
        static dataMemberProperies: string[];
        static from(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Reporting.Chart.Internal.Series.SeriesTemplateViewModel;
        static toJson(value: DevExpress.Reporting.Chart.Internal.Series.SeriesTemplateViewModel, serializer: DevExpress.Analytics.Utils.IModelSerializer, refs: DevExpress.Analytics.Utils.IModelSerializerRef): object;
        updateByView(view: DevExpress.Reporting.Chart.Internal.Series.SeriesViewViewModel): void;
        preInitProperties(model: object): void;
        getChildComponents(): DevExpress.Reporting.Internal.IChartComponentInfo[];
        getExpressionProperties(): string[];
        _isOnlyNumericArgumentScaleTypeSupported(): boolean;
        private _getCurrentSeriesPointsSortingKeys;
        private _adjustArgumentScaleType;
        private _updateSeriesPointsSortingKey;
        _isDataMemberPropertyDisabled(name: string): boolean;
        _isPropertyDisabled(name: string): boolean;
        getPath(propertyName: string): string;
        constructor(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer, info?: DevExpress.Analytics.Utils.ISerializationInfoArray);
        isPropertyVisible(propertyName: string): boolean;
        viewBindable: IViewBindableProperty;
        viewType: ko.Observable<string> | ko.Computed<string>;
        view: ko.Observable<DevExpress.Reporting.Chart.Internal.Series.SeriesViewViewModel>;
        label: DevExpress.Reporting.Chart.Internal.Series.SeriesLabelViewModel;
        legendTextPattern: ko.Observable<string>;
        dataSource: ko.Observable<any>;
        argumentDataMember: ko.Observable<string> | ko.Computed<string>;
        argumentScaleType: ko.Observable<string> | ko.Computed<string>;
        valueScaleType: ko.Observable<string> | ko.Computed<string>;
        valueDataMembers: any;
        filterString: any;
        _filterString: any;
        qualitativeSummaryOptions: DevExpress.Reporting.Chart.Internal.Series.QualitativeSummaryOptionsModel;
        numericSummaryOptions: DevExpress.Reporting.Chart.Internal.Series.NumericSummaryOptionsModel;
        dateTimeSummaryOptions: DevExpress.Reporting.Chart.Internal.Series.DateTimeSummaryOptionsModel;
        _actualArgumentScaleType: ko.Observable<ScaleType>;
    }
    export const seriesPointsSorting: DevExpress.Analytics.Utils.ISerializationInfo, seriesPointsSortingKey: DevExpress.Analytics.Utils.ISerializationInfo, legendTextPattern: DevExpress.Analytics.Utils.ISerializationInfo, _argumentScaleTypeValidatorOptions: {
        _seriesViewModel: any;
        onInitialized: ({ model }: {
            model: any;
        }) => void;
        validationRules: {
            type: string;
            reevaluate: boolean;
            validationCallback: (params: {
                value;
                rule;
            }) => boolean;
        }[];
    }, argumentScaleType: DevExpress.Analytics.Utils.ISerializationInfo, valueScaleType: DevExpress.Analytics.Utils.ISerializationInfo, labelsVisibility: DevExpress.Analytics.Utils.ISerializationInfo, argumentDataMember: DevExpress.Analytics.Utils.ISerializationInfo, valueDataMembersSerializable: DevExpress.Analytics.Utils.ISerializationInfo;
    export const seriesTemplateSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const seriesTemplate: DevExpress.Analytics.Utils.ISerializationInfo;
    export class SeriesViewModel extends SeriesTemplateViewModel implements ICollectionItem {
        static prefix: string;
        updateByView(view: DevExpress.Reporting.Chart.Internal.Series.SeriesViewViewModel): void;
        _isDataMemberPropertyDisabled(name: string): boolean;
        constructor(model: any, parent: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Series.SeriesViewModel>, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        isIncompatible: ko.Observable<boolean>;
        parent: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Series.SeriesViewModel>;
        points: ko.ObservableArray<DevExpress.Reporting.Chart.Internal.Series.SeriesPointModel>;
        innerActions: DevExpress.Analytics.Utils.IAction[];
    }
    export const seriesSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
}
declare module DevExpress.Reporting.Chart.Internal.DataMembers {
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import DataMemberBase = DevExpress.Reporting.Chart.Internal.DataMembers.DataMemberBase;
    export class DataMemberBase extends Disposable {
        private _separator;
        private _assignValueDataMembers;
        private _valueDataMembersToString;
        toString(): string;
        constructor(value: any, valueScaleType?: any);
        valueScaleType: any;
        get arrayValueDataMemberNames(): string[];
    }
    export class CommonValueDataMembers extends DataMemberBase {
        static from(value: any): CommonValueDataMembers;
        static toJson(value: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        get arrayValueDataMemberNames(): string[];
    }
    export class StockValueDataMembers extends DataMemberBase {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        get arrayValueDataMemberNames(): string[];
    }
    export class Value1Value2DataMembers extends DataMemberBase {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        get arrayValueDataMemberNames(): string[];
    }
    export class ValueWeightDataMembers extends DataMemberBase {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        get arrayValueDataMemberNames(): string[];
    }
}
declare module DevExpress.Reporting.Metadata {
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import IGlobalSubscribableValue = DevExpress.Analytics.Internal.IGlobalSubscribableValue;
    export const previewBackColor: DevExpress.Analytics.Utils.ISerializationInfo;
    export const previewSides: DevExpress.Analytics.Utils.ISerializationInfo;
    export const previewBorderColor: DevExpress.Analytics.Utils.ISerializationInfo;
    export const previewBorderStyle: DevExpress.Analytics.Utils.ISerializationInfo;
    export const previewBorderDashStyle: DevExpress.Analytics.Utils.ISerializationInfo;
    export const previewBorderWidth: DevExpress.Analytics.Utils.ISerializationInfo;
    export const previewForeColor: DevExpress.Analytics.Utils.ISerializationInfo;
    export const previewFont: DevExpress.Analytics.Utils.ISerializationInfo;
    export const previewPadding: DevExpress.Analytics.Utils.ISerializationInfo;
    export const previewTextAlignment: DevExpress.Analytics.Utils.ISerializationInfo;
    export const brickStyleSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const defaultCulture = "Default";
    export const availableCultures: DevExpress.Analytics.Internal.IGlobalSubscribableValue<{
        [key: string]: string;
    }>;
}
declare module DevExpress.Reporting.Designer.Controls.Metadata {
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import parseBool = DevExpress.Analytics.Utils.parseBool;
    import IDisplayedValue = DevExpress.Analytics.Utils.IDisplayedValue;
    export const expressionBindingSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const expressionBindings: DevExpress.Analytics.Utils.ISerializationInfo;
    export const styleSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const styleName: DevExpress.Analytics.Utils.ISerializationInfo;
    export const evenStyleName: DevExpress.Analytics.Utils.ISerializationInfo;
    export const oddStyleName: DevExpress.Analytics.Utils.ISerializationInfo;
    export const stylePriority: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pivotGridStyles: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const crossTabStyles: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const crossTabStylesDefaults: {
        generalStyleName: {
            "@Name": string;
            "@BorderStyle": string;
            "@Padding": string;
            "@Font": string;
            "@ForeColor": string;
            "@BackColor": string;
            "@BorderColor": string;
            "@Sides": string;
            "@StringFormat": string;
        };
        dataAreaStyleName: {
            "@Name": string;
            "@BorderStyle": string;
            "@StringFormat": string;
            "@TextAlignment": string;
        };
        headerAreaStyleName: {
            "@Name": string;
            "@BorderStyle": string;
            "@BackColor": string;
            "@StringFormat": string;
            "@TextAlignment": string;
        };
        totalAreaStyleName: {
            "@Name": string;
            "@BorderStyle": string;
            "@StringFormat": string;
            "@TextAlignment": string;
        };
    };
    export const stylesInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const stylesObj: DevExpress.Analytics.Utils.ISerializationInfo;
    export const afterPrint: DevExpress.Analytics.Utils.ISerializationInfo;
    export const beforePrint: DevExpress.Analytics.Utils.ISerializationInfo;
    export const sizeChanged: DevExpress.Analytics.Utils.ISerializationInfo;
    export const evaluateBinding: DevExpress.Analytics.Utils.ISerializationInfo;
    export const truncatedControlEventsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const truncatedControlScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const commonScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const controlScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const textControlScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const labelScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const chartScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pivotScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const subreportScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pdfContentScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const commonBandScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const groupBandScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const groupHeaderBandScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const detailReportBandScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const reportScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const allScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const formattingRuleLinkSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const defaultBooleanVisible: DevExpress.Analytics.Utils.ISerializationInfo;
    export const formattingSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const conditionObj: DevExpress.Analytics.Utils.ISerializationInfo;
    export const formatting: DevExpress.Analytics.Utils.ISerializationInfo;
    export const formattingRuleSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const formattingRuleLinks: DevExpress.Analytics.Utils.ISerializationInfo;
    export const sortingOptionsSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const interactiveSorting: DevExpress.Analytics.Utils.ISerializationInfo;
    export const sizeLocation: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const bordersProperties: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const baseControlProperties: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const commonBandProperties: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const commonControlProperties: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const fontGroup: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const bookmarkGroup: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const navigationGroup: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const datasourcePrintOptionsGroup: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const processGroup: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const canGrowShrinkGroup: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const labelGroup: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const unknownSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const editOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const anchorVertical: DevExpress.Analytics.Utils.ISerializationInfo;
    export const anchorHorizontal: DevExpress.Analytics.Utils.ISerializationInfo;
    export const editOptions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const textEditOptions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const parameterBindingSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const drillThroughReportSourceUrl: DevExpress.Analytics.Utils.ISerializationInfo;
    export const drillThroughReportSource: DevExpress.Analytics.Utils.ISerializationInfo;
    export const drillThroughParameterBindings: DevExpress.Analytics.Utils.ISerializationInfo;
    export const ActionType: {
        None: string;
        NavigateToReport: string;
    };
    export const actionKind: DevExpress.Analytics.Utils.ISerializationInfo;
    export const actionSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const action: DevExpress.Analytics.Utils.ISerializationInfo;
    export const imageUrl: DevExpress.Analytics.Utils.ISerializationInfo;
    export const imageSource: DevExpress.Analytics.Utils.ISerializationInfo;
    export const imageEditOptions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const useImageMetadata: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pictureBoxSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesPicture: string[];
    export const foreColorWatermark: DevExpress.Analytics.Utils.ISerializationInfo;
    export const fontWatermark: DevExpress.Analytics.Utils.ISerializationInfo;
    export const watermarkSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const paperKind: DevExpress.Analytics.Utils.ISerializationInfo;
    export const landscape: DevExpress.Analytics.Utils.ISerializationInfo;
    export const margins: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pageColor: DevExpress.Analytics.Utils.ISerializationInfo;
    export const measureUnit: DevExpress.Analytics.Utils.ISerializationInfo;
    export const snapGridSize: DevExpress.Analytics.Utils.ISerializationInfo;
    export const drawWatermark: DevExpress.Analytics.Utils.ISerializationInfo;
    export const showPreviewMarginLines: DevExpress.Analytics.Utils.ISerializationInfo;
    export const verticalContentSplitting: DevExpress.Analytics.Utils.ISerializationInfo;
    export const reportExportOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const watermarks: DevExpress.Analytics.Utils.ISerializationInfo;
    export const watermarkId: DevExpress.Analytics.Utils.ISerializationInfo;
    export const rollPaper: DevExpress.Analytics.Utils.ISerializationInfo;
    export const requestParameters: DevExpress.Analytics.Utils.ISerializationInfo;
    export const formattingRuleSheet: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pageWidth: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pageHeight: DevExpress.Analytics.Utils.ISerializationInfo;
    export const localizationItems: DevExpress.Analytics.Utils.ISerializationInfo;
    export const language: DevExpress.Analytics.Utils.ISerializationInfo;
    export const scriptLanguage: DevExpress.Analytics.Utils.ISerializationInfo;
    export const scriptReferencesString: DevExpress.Analytics.Utils.ISerializationInfo;
    export const calculatedFields: DevExpress.Analytics.Utils.ISerializationInfo;
    export const parametersInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const bookmarkDuplicateSuppress: DevExpress.Analytics.Utils.ISerializationInfo;
    export const horizontalContentSplitting: DevExpress.Analytics.Utils.ISerializationInfo;
    export const rtlLayout: DevExpress.Analytics.Utils.ISerializationInfo;
    export const rtlReport: DevExpress.Analytics.Utils.ISerializationInfo;
    export const useLandscape: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        defaultVal: boolean;
        from: typeof DevExpress.Analytics.Utils.parseBool;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
    };
    export const usePaperKind: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        defaultVal: boolean;
        from: typeof DevExpress.Analytics.Utils.parseBool;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
    };
    export const defaultPrinterSettingsUsingInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const reportSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesReport: string[];
    export const glyphAlignment: DevExpress.Analytics.Utils.ISerializationInfo;
    export const glyphOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const baseTocLevelSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const tocLevelSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const tocTitleSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const tocTitle: DevExpress.Analytics.Utils.ISerializationInfo;
    export const tocLevelDefault: DevExpress.Analytics.Utils.ISerializationInfo;
    export const maxNestingLevel: DevExpress.Analytics.Utils.ISerializationInfo;
    export const tocLevels: DevExpress.Analytics.Utils.ISerializationInfo;
    export const tocSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const reportSourceUrl: DevExpress.Analytics.Utils.ISerializationInfo;
    export const reportSource: DevExpress.Analytics.Utils.ISerializationInfo;
    export const parameterBindings: DevExpress.Analytics.Utils.ISerializationInfo;
    export const generateOwnPages: DevExpress.Analytics.Utils.ISerializationInfo;
    export const subreportSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const pdfSource: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pdfSourceUrl: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pageCount: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        disabled: boolean;
        defaultVal: number;
    };
    export const pdfContentSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesPdfContent: string[];
    export const shapeType: DevExpress.Analytics.Utils.ISerializationInfo;
    export const stretch: DevExpress.Analytics.Utils.ISerializationInfo;
    export const fillColor: DevExpress.Analytics.Utils.ISerializationInfo;
    export const Shape: DevExpress.Analytics.Utils.ISerializationInfo;
    export const shapeFake: DevExpress.Analytics.Utils.ISerializationInfo;
    export const shapeElementSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const shapesMap: {
        Rectangle: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Arrow: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Ellipse: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Polygon: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Star: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Line: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Bracket: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Cross: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Brace: DevExpress.Analytics.Utils.ISerializationInfoArray;
    };
    export const shapeSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesShape: string[];
    export const controlParameterInfos: DevExpress.Analytics.Utils.ISerializationInfo[];
    export interface ISerializationInfoWithBindings extends ISerializationInfo {
        bindingName?: string;
    }
    export const textAlignmentValues: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    export const borderDashStyleValues: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    export const stylePrioritySerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const xlsxFormatString: DevExpress.Analytics.Utils.ISerializationInfo;
    export const name: DevExpress.Analytics.Utils.ISerializationInfo;
    export const displayName: DevExpress.Analytics.Utils.ISerializationInfo;
    export const text: DevExpress.Analytics.Utils.ISerializationInfo;
    export const textArea: DevExpress.Analytics.Utils.ISerializationInfo;
    export const textTrimmingValues: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    export const textTrimming: DevExpress.Analytics.Utils.ISerializationInfo;
    export const size: DevExpress.Analytics.Utils.ISerializationInfo;
    export const location: DevExpress.Analytics.Utils.ISerializationInfo;
    export const defaultBooleanValuesArray: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
    export const tag: DevExpress.Analytics.Utils.ISerializationInfo;
    export const lockedInUserDesigner: DevExpress.Analytics.Utils.ISerializationInfo;
    export const visible: DevExpress.Analytics.Utils.ISerializationInfo;
    export const backColor: DevExpress.Analytics.Utils.ISerializationInfo;
    export const foreColor: DevExpress.Analytics.Utils.ISerializationInfo;
    export const font: DevExpress.Analytics.Utils.ISerializationInfo;
    export const expressionableFont: DevExpress.Analytics.Utils.ISerializationInfo;
    export const expressionableFontInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const borderColor: DevExpress.Analytics.Utils.ISerializationInfo;
    export const borders: DevExpress.Analytics.Utils.ISerializationInfo;
    export const borderWidth: DevExpress.Analytics.Utils.ISerializationInfo;
    export const borderDashStyle: DevExpress.Analytics.Utils.ISerializationInfo;
    export const paddingString: DevExpress.Analytics.Utils.ISerializationInfo;
    export const padding: DevExpress.Analytics.Utils.ISerializationInfo;
    export const defaultTextPadding = "2,2,0,0,96";
    export const textAlignment: DevExpress.Analytics.Utils.ISerializationInfo;
    export const textFitMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const angle: DevExpress.Analytics.Utils.ISerializationInfo;
    export const canGrow: DevExpress.Analytics.Utils.ISerializationInfo;
    export const canShrink: DevExpress.Analytics.Utils.ISerializationInfo;
    export const multiline: DevExpress.Analytics.Utils.ISerializationInfo;
    export const wordWrap: DevExpress.Analytics.Utils.ISerializationInfo;
    export const allowMarkupText: DevExpress.Analytics.Utils.ISerializationInfo;
    export const autoWidth: DevExpress.Analytics.Utils.ISerializationInfo;
    export const keepTogether: DevExpress.Analytics.Utils.ISerializationInfo;
    export const keepTogetherDefaultValueFalse: DevExpress.Analytics.Utils.ISerializationInfo;
    export const processDuplicatesTarget: DevExpress.Analytics.Utils.ISerializationInfo;
    export const processDuplicatesMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const processNullValues: DevExpress.Analytics.Utils.ISerializationInfo;
    export const reportPrintOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const dataAdapter: DevExpress.Analytics.Utils.ISerializationInfo;
    export const dataSource: DevExpress.Analytics.Utils.ISerializationInfo;
    export const dataMember: DevExpress.Analytics.Utils.ISerializationInfo;
    export const filterString: DevExpress.Analytics.Utils.ISerializationInfo;
    export const filterStringEditable: DevExpress.Analytics.Utils.ISerializationInfo;
    export const bookmark: DevExpress.Analytics.Utils.ISerializationInfo;
    export const bookmarkParent: DevExpress.Analytics.Utils.ISerializationInfo;
    export const navigateUrl: DevExpress.Analytics.Utils.ISerializationInfo;
    export const target: DevExpress.Analytics.Utils.ISerializationInfo;
    export const nullValueText: DevExpress.Analytics.Utils.ISerializationInfo;
    export function getSummaryFunctionValues(): Array<DevExpress.Analytics.Utils.IDisplayedValue>;
    export const summaryFunctionValues: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
    export const textFormatString: DevExpress.Analytics.Utils.ISerializationInfo;
    export function createSummarySerializationInfo(summaryFunctions?: any): DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const summarySerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const summary: DevExpress.Analytics.Utils.ISerializationInfo;
    export const reportPrintOptions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const lineWidth: DevExpress.Analytics.Utils.ISerializationInfo;
    export const lineStyle: DevExpress.Analytics.Utils.ISerializationInfo;
    export const dpi: DevExpress.Analytics.Utils.ISerializationInfo;
    export const canPublish: DevExpress.Analytics.Utils.ISerializationInfo;
    export const rtlValues: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    export const rtl: DevExpress.Analytics.Utils.ISerializationInfo;
    export const imageType: DevExpress.Analytics.Utils.ISerializationInfo;
    export const paddingGroup: DevExpress.Analytics.Utils.ISerializationInfo[];
    export const defaultAccessibleRole: {
        value: string;
        displayValue: string;
        localizationId: string;
    };
    export const accessibleRoleValues: DevExpress.Analytics.Utils.IDisplayedValue[];
    export const accessibleRole: DevExpress.Analytics.Utils.ISerializationInfo;
    export const accessibleDescription: DevExpress.Analytics.Utils.ISerializationInfo;
    export const cells: {
        propertyName: string;
        modelName: string;
        array: boolean;
    };
    export const sortOrder: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        defaultVal: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        valuesArray: {
            value: string;
            displayValue: string;
            localizationId: string;
        }[];
    };
    export const defaultFrameOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const frameOptionsTypes: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
    export const FrameOptionsTypesEPC: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
    export const frameOptionsMap: {
        [key: string]: DevExpress.Analytics.Utils.ISerializationInfoArray;
    };
    export const defaultCodeSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const autoModule: DevExpress.Analytics.Utils.ISerializationInfo;
    export const barCodeOrientation: DevExpress.Analytics.Utils.ISerializationInfo;
    export const moduleInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const showText: DevExpress.Analytics.Utils.ISerializationInfo;
    export const symbology: DevExpress.Analytics.Utils.ISerializationInfo;
    export const targetDeviceDpi: DevExpress.Analytics.Utils.ISerializationInfo;
    export const barcodeFake: DevExpress.Analytics.Utils.ISerializationInfo;
    export const alignment: DevExpress.Analytics.Utils.ISerializationInfo;
    export const barCodesMap: {
        [key: string]: DevExpress.Analytics.Utils.ISerializationInfoArray;
    };
    export const barcodeSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesBarCode: string[];
    export const cellVerticalSpacing: DevExpress.Analytics.Utils.ISerializationInfo;
    export const cellHorizontalSpacing: DevExpress.Analytics.Utils.ISerializationInfo;
    export const cellWidth: DevExpress.Analytics.Utils.ISerializationInfo;
    export const cellHeight: DevExpress.Analytics.Utils.ISerializationInfo;
    export const cellSizeMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const characterCombFont: DevExpress.Analytics.Utils.ISerializationInfo;
    export const characterCombBorders: DevExpress.Analytics.Utils.ISerializationInfo;
    export const characterCombBorderDashStyle: DevExpress.Analytics.Utils.ISerializationInfo;
    export const characterCombSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfo[];
    export const chart: DevExpress.Analytics.Utils.ISerializationInfo;
    export const controlParametersInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const xrChartSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const checkState: DevExpress.Analytics.Utils.ISerializationInfo;
    export const checked: DevExpress.Analytics.Utils.ISerializationInfo;
    export const glyphOptions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const checkEditOptions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const checkboxSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesCheckBox: string[];
    export const crossBandLineWidth: DevExpress.Analytics.Utils.ISerializationInfo;
    export const startPoint: DevExpress.Analytics.Utils.ISerializationInfo;
    export const endPoint: DevExpress.Analytics.Utils.ISerializationInfo;
    export const startBand: DevExpress.Analytics.Utils.ISerializationInfo;
    export const endBand: DevExpress.Analytics.Utils.ISerializationInfo;
    export const borderDashStyleCrossband: DevExpress.Analytics.Utils.ISerializationInfo;
    export const width: DevExpress.Analytics.Utils.ISerializationInfo;
    export const crossBandBoxControlSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const crossBandLineControlSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesCrossLine: string[];
    export const actualValue: DevExpress.Analytics.Utils.ISerializationInfo;
    export const maximum: DevExpress.Analytics.Utils.ISerializationInfo;
    export const minimum: DevExpress.Analytics.Utils.ISerializationInfo;
    export const tickmarkCount: DevExpress.Analytics.Utils.ISerializationInfo;
    export const targetValue: DevExpress.Analytics.Utils.ISerializationInfo;
    export const viewStyle: DevExpress.Analytics.Utils.ISerializationInfo;
    export const viewTheme: DevExpress.Analytics.Utils.ISerializationInfo;
    export const viewType: DevExpress.Analytics.Utils.ISerializationInfo;
    export const xrGaugeSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesGauge: string[];
    export const lineDirection: DevExpress.Analytics.Utils.ISerializationInfo;
    export const lineSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesLine: string[];
    export const pageInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const startPageNumber: DevExpress.Analytics.Utils.ISerializationInfo;
    export const runningBand: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pageInfoSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesPageInfo: string[];
    export const signatureOptions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pdfSignatureInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const pivotGridAppearances: DevExpress.Analytics.Utils.ISerializationInfo;
    export const prefilter: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pivotGridOptions: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const pivotGridSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const rtf: DevExpress.Analytics.Utils.ISerializationInfo;
    export const textRtf: DevExpress.Analytics.Utils.ISerializationInfo;
    export const serializableRtfString: DevExpress.Analytics.Utils.ISerializationInfo;
    export const newDocumentData: DevExpress.Analytics.Utils.ISerializationInfo;
    export const richTextSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesRichText: string[];
    export const valueMember: DevExpress.Analytics.Utils.ISerializationInfo;
    export const sparklineViewMap: {
        Line: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Bar: DevExpress.Analytics.Utils.ISerializationInfoArray;
        WinLoss: DevExpress.Analytics.Utils.ISerializationInfoArray;
        Area: DevExpress.Analytics.Utils.ISerializationInfoArray;
    };
    export const valueRange: DevExpress.Analytics.Utils.ISerializationInfo;
    export const sparklineFake: DevExpress.Analytics.Utils.ISerializationInfo;
    export const sparklineSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesSparkline: string[];
    export const processHiddenCellMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const tableSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesTable: string[];
    export const weight: DevExpress.Analytics.Utils.ISerializationInfo;
    export const rowSpan: DevExpress.Analytics.Utils.ISerializationInfo;
    export const tableCellSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesTableCell: string[];
    export const segmentWidth: DevExpress.Analytics.Utils.ISerializationInfo;
    export const zipCodeSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesZipCode: string[];
    export const panelSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const xrControlSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const crossTabSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const pageBreakSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const tableRowSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const labelSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesLabel: string[];
}
declare module DevExpress.Reporting.Designer.Controls {
    import IPoint = DevExpress.Analytics.Elements.IPoint;
    import ISize = DevExpress.Analytics.Elements.ISize;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import IModelSerializer = DevExpress.Analytics.Utils.IModelSerializer;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import ObjectStorageItem = DevExpress.Reporting.Designer.Data.ObjectStorageItem;
    import ReportViewModel = DevExpress.Reporting.Designer.Controls.ReportViewModel;
    import PaddingModel = DevExpress.Analytics.Elements.PaddingModel;
    import XRReportElementViewModel = DevExpress.Reporting.Designer.Controls.XRReportElementViewModel;
    import IElementViewModel = DevExpress.Analytics.Elements.IElementViewModel;
    import BandViewModel = DevExpress.Reporting.Designer.Bands.BandViewModel;
    import ControlType = DevExpress.Reporting.Designer.Internal.ControlType;
    import ElementViewModel = DevExpress.Analytics.Elements.ElementViewModel;
    import Point = DevExpress.Analytics.Elements.Point;
    import Size = DevExpress.Analytics.Elements.Size;
    import IModelAction = DevExpress.Analytics.Internal.IModelAction;
    import IExpressionEditorCategory = DevExpress.Analytics.Widgets.Internal.IExpressionEditorCategory;
    import Tools = DevExpress.Analytics.Widgets.Internal.Tools;
    import DataBinding = DevExpress.Reporting.Designer.Data.DataBinding;
    import IExpressionObject = DevExpress.Reporting.Designer.Internal.IExpressionObject;
    import DataSourceHelper = DevExpress.Reporting.Designer.Internal.DataSourceHelper;
    import IScriptingControl = DevExpress.Reporting.Designer.Internal.IScriptingControl;
    import IExpressionBinding = DevExpress.Reporting.Designer.Controls.IExpressionBinding;
    import FormattingRuleLink = DevExpress.Reporting.Designer.Controls.FormattingRuleLink;
    import DefaultLocalizationProvider = DevExpress.Reporting.Designer.Internal.DefaultLocalizationProvider;
    import ILocalizedControl = DevExpress.Reporting.Designer.Internal.ILocalizedControl;
    import IArea = DevExpress.Analytics.Elements.IArea;
    import ISurfaceContext = DevExpress.Analytics.Elements.ISurfaceContext;
    import SurfaceElementArea = DevExpress.Analytics.Elements.SurfaceElementArea;
    import IHoverInfo = DevExpress.Analytics.Internal.IHoverInfo;
    import IUnitProperties = DevExpress.Analytics.Internal.IUnitProperties;
    import ModelSerializer = DevExpress.Analytics.Utils.ModelSerializer;
    import XRControlSurfaceBase = DevExpress.Reporting.Designer.Controls.XRControlSurfaceBase;
    import ReportSurface = DevExpress.Reporting.Designer.Controls.ReportSurface;
    import XRControlSurface = DevExpress.Reporting.Designer.Controls.XRControlSurface;
    import XRControlViewModel = DevExpress.Reporting.Designer.Controls.XRControlViewModel;
    import ISerializableModel = DevExpress.Analytics.Utils.ISerializableModel;
    import PathRequest = DevExpress.Analytics.Utils.PathRequest;
    import DataBindingBase = DevExpress.Reporting.Designer.Data.DataBindingBase;
    import SerializableModel = DevExpress.Analytics.Elements.SerializableModel;
    import IStyleContainer = DevExpress.Analytics.Internal.IStyleContainer;
    import ImageSource = DevExpress.Reporting.ImageSource;
    import IDataSourceInfo = DevExpress.Analytics.Internal.IDataSourceInfo;
    import ObjectItem = DevExpress.Reporting.Designer.Data.ObjectItem;
    import IRenameComponentStrategy = DevExpress.Reporting.Designer.Internal.IRenameComponentStrategy;
    import ParameterBinding = DevExpress.Reporting.Designer.Controls.ParameterBinding;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import GlyphStyle = DevExpress.Reporting.Viewer.Editing.GlyphStyle;
    import FontModel = DevExpress.Analytics.Widgets.Internal.FontModel;
    import FitBoundsToTextAction = DevExpress.Reporting.Designer.Actions.FitBoundsToTextAction;
    import FitTextToBoundsAction = DevExpress.Reporting.Designer.Actions.FitTextToBoundsAction;
    import GlyphOptions = DevExpress.Reporting.Designer.Controls.GlyphOptions;
    import XRTextControlSurfaceBase = DevExpress.Reporting.Designer.Controls.XRTextControlSurfaceBase;
    import ISelectionProvider = DevExpress.Analytics.Internal.ISelectionProvider;
    import ISelectionTarget = DevExpress.Analytics.Internal.ISelectionTarget;
    import ContainerEditOptions = DevExpress.Reporting.Designer.Controls.ContainerEditOptions;
    import TableActionDirection = DevExpress.Reporting.Designer.Internal.TableActionDirection;
    import TableComponentSurface = DevExpress.Reporting.Designer.Internal.TableComponentSurface;
    import XRTableRowViewModel = DevExpress.Reporting.Designer.Controls.XRTableRowViewModel;
    import TableCalculationProvider = DevExpress.Reporting.Designer.Internal.TableCalculationProvider;
    import XRTableCellSurface = DevExpress.Reporting.Designer.Controls.XRTableCellSurface;
    import XRTableCellViewModel = DevExpress.Reporting.Designer.Controls.XRTableCellViewModel;
    import XRTableRowSurface = DevExpress.Reporting.Designer.Controls.XRTableRowSurface;
    import XRTableControlViewModel = DevExpress.Reporting.Designer.Controls.XRTableControlViewModel;
    import IResizeHandler = DevExpress.Analytics.Internal.IResizeHandler;
    import XRTableOfContentsViewModel = DevExpress.Reporting.Designer.Controls.XRTableOfContentsViewModel;
    import TableOfContentLocalizationProvider = DevExpress.Reporting.Designer.Internal.TableOfContentLocalizationProvider;
    import TableOfContentsLevel = DevExpress.Reporting.Designer.Controls.TableOfContentsLevel;
    import TableOfContentsLevelSurface = DevExpress.Reporting.Designer.Controls.TableOfContentsLevelSurface;
    import FilterStringOptions = DevExpress.Analytics.Widgets.FilterStringOptions;
    import PivotGridFieldSurface = DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldSurface;
    import PivotGridFieldViewModel = DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldViewModel;
    import TodoControlSurface = DevExpress.Reporting.Designer.Internal.TodoControlSurface;
    import SurfaceSelection = DevExpress.Analytics.Internal.SurfaceSelection;
    import IFileUploadResult = DevExpress.Analytics.Internal.IFileUploadResult;
    import XRRichViewModel = DevExpress.Reporting.Designer.Controls.XRRichViewModel;
    import FieldListProvider = DevExpress.Analytics.Internal.FieldListProvider;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    import UndoEngine = DevExpress.Analytics.Utils.UndoEngine;
    import ChartViewModel = DevExpress.Reporting.Chart.Internal.Models.ChartViewModel;
    import ChartControlViewModel = DevExpress.Reporting.Chart.Internal.ChartControlViewModel;
    import IXRChartComponentInfo = DevExpress.Reporting.Internal.IXRChartComponentInfo;
    import IControlPropertyDescription = DevExpress.Reporting.Designer.Internal.IControlPropertyDescription;
    import ChartLocalizationProvider = DevExpress.Reporting.Designer.Internal.ChartLocalizationProvider;
    import SurfaceElementBase = DevExpress.Analytics.Elements.SurfaceElementBase;
    import IExpressionOptions = DevExpress.Analytics.Widgets.IExpressionOptions;
    import HorizontalAnchoring = DevExpress.Reporting.Designer.Controls.HorizontalAnchoring;
    import IAnchoringProperties = DevExpress.Reporting.Designer.Controls.IAnchoringProperties;
    import VerticalAcnhoring = DevExpress.Reporting.Designer.Controls.VerticalAcnhoring;
    import SortingOptions = DevExpress.Reporting.Designer.Controls.SortingOptions;
    import IReportControlMetadata = DevExpress.Reporting.Designer.Controls.IReportControlMetadata;
    import ActionTypeBase = DevExpress.Reporting.Designer.Controls.ActionTypeBase;
    import IMargins = DevExpress.Analytics.Elements.IMargins;
    import INumericSize = DevExpress.Analytics.Elements.INumericSize;
    import Margins = DevExpress.Analytics.Elements.Margins;
    import MeasureUnit = DevExpress.Analytics.Internal.MeasureUnit;
    import IModelReady = DevExpress.Analytics.Utils.IModelReady;
    import IEnumType = DevExpress.Reporting.IEnumType;
    import ExportOptions = DevExpress.Reporting.Export.ExportOptions;
    import BandSurface = DevExpress.Reporting.Designer.Bands.BandSurface;
    import BandsHolder = DevExpress.Reporting.Designer.Bands.Internal.BandsHolder;
    import CalculatedField = DevExpress.Reporting.Designer.Data.CalculatedField;
    import ObjectsStorage = DevExpress.Reporting.Designer.Data.ObjectsStorage;
    import ParameterPanelLayoutItem = DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem;
    import Parameter = DevExpress.Reporting.Designer.Data.Parameter;
    import ReportParameterHelper = DevExpress.Reporting.Designer.ReportParameterHelper;
    import StylesHelper = DevExpress.Reporting.Designer.Internal.StylesHelper;
    import LocalizationItem = DevExpress.Reporting.Designer.Internal.LocalizationItem;
    import ReportLocalizationEngine = DevExpress.Reporting.Designer.Internal.ReportLocalizationEngine;
    import IDataSourceRefInfo = DevExpress.Reporting.Designer.Utils.IDataSourceRefInfo;
    import ComponentsModel = DevExpress.Reporting.Designer.Controls.ComponentsModel;
    import ExtensionModel = DevExpress.Reporting.Designer.Controls.ExtensionModel;
    import FormattingRule = DevExpress.Reporting.Designer.Controls.FormattingRule;
    import StyleModel = DevExpress.Reporting.Designer.Controls.StyleModel;
    import WatermarkModel = DevExpress.Reporting.Designer.Controls.WatermarkModel;
    import ReportBandsType = DevExpress.Reporting.Designer.Internal.ReportBandsType;
    import ReportLocalizationProvider = DevExpress.Reporting.Designer.Internal.ReportLocalizationProvider;
    import XRCrossBandControlViewModel = DevExpress.Reporting.Designer.Controls.XRCrossBandControlViewModel;
    import XRCrossBandSurface = DevExpress.Reporting.Designer.Controls.XRCrossBandSurface;
    import IElementMetadata = DevExpress.Analytics.Elements.IElementMetadata;
    import AnalyticControlsFactory = DevExpress.Analytics.Utils.AnalyticControlsFactory;
    import IDisposable = DevExpress.Analytics.Utils.IDisposable;
    import ISerializationInfoWithBindings = DevExpress.Reporting.Designer.Controls.Metadata.ISerializationInfoWithBindings;
    import IDisplayedValue = DevExpress.Analytics.Utils.IDisplayedValue;
    import Rectangle = DevExpress.Analytics.Elements.Rectangle;
    import ITreeListItemViewModel = DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel;
    import ICrossTabCell = DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
    import CellKind = DevExpress.Reporting.Designer.Controls.CrossTab.CellKind;
    import DataFieldLayout = DevExpress.Reporting.Designer.Controls.CrossTab.DataFieldLayout;
    import CrossTabFieldModel = DevExpress.Reporting.Designer.Controls.CrossTabFieldModel;
    import XRCrossTabSurface = DevExpress.Reporting.Designer.Controls.XRCrossTabSurface;
    import XRCrossTabViewModel = DevExpress.Reporting.Designer.Controls.XRCrossTabViewModel;
    import CellCreator = DevExpress.Reporting.Designer.Controls.CrossTab.CellCreator;
    import CrossTabCellInfo = DevExpress.Reporting.Designer.Controls.CrossTab.CrossTabCellInfo;
    import CrossTabColumnDefinitionsModel = DevExpress.Reporting.Designer.Controls.CrossTab.CrossTabColumnDefinitionsModel;
    import CrossTabRowDefinitionsModel = DevExpress.Reporting.Designer.Controls.CrossTab.CrossTabRowDefinitionsModel;
    import DefenitionUpdater = DevExpress.Reporting.Designer.Controls.CrossTab.DefenitionUpdater;
    import ControlParameter = DevExpress.Reporting.Designer.Controls.ControlParameter;
    import XRCellsurface = DevExpress.Reporting.Designer.Controls.XRCellsurface;
    import XRCrossTabCellViewModel = DevExpress.Reporting.Designer.Controls.XRCrossTabCellViewModel;
    import XRBarCodeViewModel = DevExpress.Reporting.Designer.Controls.XRBarCodeViewModel;
    import BarCodeSymbology = DevExpress.Reporting.Designer.Controls.BarCodeSymbology;
    export interface IExpressionBinding {
        eventName: ko.Observable<string>;
        propertyName: ko.Observable<string>;
        expression: ko.Observable<string>;
    }
    export interface IAnchoringProperties {
        size?: DevExpress.Analytics.Elements.ISize;
        location?: DevExpress.Analytics.Elements.IPoint;
        root: any;
    }
    export class Anchoring extends Disposable {
        static states: {
            inProgress: string;
            complete: string;
            fromControls: string;
        };
        anchoring: ko.Observable<string> | ko.Computed<string>;
        subscribtion: ko.Subscription;
        dispose(): void;
        constructor(subscrible: ko.Observable<number> | ko.Computed<number>, model: DevExpress.Reporting.Designer.Controls.IAnchoringProperties, anchoringProperty: ko.Observable<string> | ko.Computed<string>);
        start(subscrible: ko.Observable<number> | ko.Computed<number>, model: DevExpress.Reporting.Designer.Controls.IAnchoringProperties): void;
        anchorSubscribtion: (parentSizeValue: number, oldValue: ko.Observable<number> | ko.Computed<number>, model: DevExpress.Reporting.Designer.Controls.IAnchoringProperties) => void;
        state: string;
    }
    export class VerticalAcnhoring extends Anchoring {
        anchorSubscribtion: (parentSizeValue: number, oldValue: ko.Observable<number> | ko.Computed<number>, model: DevExpress.Reporting.Designer.Controls.IAnchoringProperties) => void;
        constructor(subscrible: ko.Observable<number> | ko.Computed<number>, model: DevExpress.Reporting.Designer.Controls.IAnchoringProperties, anchoringProperty: ko.Observable<string> | ko.Computed<string>);
    }
    export class HorizontalAnchoring extends Anchoring {
        anchorSubscribtion: (parentSizeValue: number, oldValue: ko.Observable<number> | ko.Computed<number>, model: DevExpress.Reporting.Designer.Controls.IAnchoringProperties) => void;
        constructor(subscrible: ko.Observable<number> | ko.Computed<number>, model: DevExpress.Reporting.Designer.Controls.IAnchoringProperties, anchoringProperty: ko.Observable<string> | ko.Computed<string>);
    }
    export class FormattingRule extends Disposable {
        static createNew(report?: any): DevExpress.Reporting.Designer.Controls.FormattingRule;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, parent: DevExpress.Reporting.Designer.Controls.ReportViewModel, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getPath(propertyName: any): string;
        className: () => string;
        displayType(): any;
        controlType: string;
        selected: ko.Observable<boolean> | ko.Computed<boolean>;
        name: ko.Observable<string> | ko.Computed<string>;
        parent: DevExpress.Reporting.Designer.Controls.ReportViewModel;
        dataSource: ko.Observable<DevExpress.Reporting.Designer.Data.ObjectStorageItem> | ko.Computed<DevExpress.Reporting.Designer.Data.ObjectStorageItem>;
        dataMember: ko.Observable<string> | ko.Computed<string>;
        condition: ko.Observable<string> | ko.Computed<string>;
    }
    export class FormattingRuleLink {
        static createNew(rule: DevExpress.Reporting.Designer.Controls.FormattingRule): DevExpress.Reporting.Designer.Controls.FormattingRuleLink;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        value: ko.Observable<DevExpress.Reporting.Designer.Controls.FormattingRule> | ko.Computed<DevExpress.Reporting.Designer.Controls.FormattingRule>;
    }
    export class StyleModel extends Disposable {
        parent: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel;
        static unitProperties: string[];
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, parent: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        dpi: ko.Observable<number> | ko.Computed<number>;
        isPropertyModified(name: any): boolean;
        className: () => string;
        displayType(): any;
        name: ko.Observable<string> | ko.Computed<string>;
        paddingObj: DevExpress.Analytics.Elements.PaddingModel;
        padding: ko.Observable<string>;
        controlType: string;
    }
    export function getNearestBand(target: DevExpress.Analytics.Elements.IElementViewModel<ControlType>): DevExpress.Reporting.Designer.Bands.BandViewModel;
    export class XRReportElementViewModel extends ElementViewModel<DevExpress.Reporting.Designer.Internal.ControlType> implements ILocalizedControl, IScriptingControl {
        __localizationProvider: DevExpress.Reporting.Designer.Internal.DefaultLocalizationProvider<ILocalizedControl>;
        get _localizationProvider(): DevExpress.Reporting.Designer.Internal.DefaultLocalizationProvider<ILocalizedControl>;
        static unitProperties: string[];
        dispose(): void;
        createLocalizationProvider(): DevExpress.Reporting.Designer.Internal.DefaultLocalizationProvider<ILocalizedControl>;
        getLocalizationProperty(propertyName: string): DevExpress.Reporting.LocalizedProperty;
        getLocalizationProperties(): DevExpress.Reporting.LocalizedProperty[];
        applyLocalization(propertyName: string, propertyValue: any): void;
        protected _resetProperty(propertyName: string): void;
        private _getControlPropertyName;
        private _getStylePriorityPropertyName;
        private _getStyle;
        private _checkStylePropertyModify;
        private _getStyleProperty;
        private _zOrderChange;
        private _createPaddingDependencies;
        constructor(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        _getExpressionActions(name: any): DevExpress.Analytics.Internal.IModelAction[];
        _getExpressionEvents(): {
            name: string;
            localizationId: string;
            displayName: string;
        }[];
        _addExpressionActions(propertyName: any): DevExpress.Analytics.Internal.IModelAction[];
        _expressionActions: {
            [key: string]: DevExpress.Analytics.Internal.IModelAction[];
        };
        getControlFactory(): DevExpress.Reporting.ControlsFactory;
        addChild(control: DevExpress.Analytics.Elements.ElementViewModel<ControlType>): void;
        initDataBindingProperties(): void;
        initExpressionProperties(): void;
        _resetExpressions(propertyName: string): void;
        _hasAnyExpressions(propertyName: any, predicateFunc?: (value: ko.Observable<string> | ko.Computed<string>, innerPropertyName?: string) => boolean): boolean;
        _getExpressionNameByPropertyName(propertyName: any, info?: DevExpress.Analytics.Utils.ISerializationInfoArray): string;
        initBindings(): void;
        dsHelperProvider: () => DevExpress.Reporting.Designer.Internal.DataSourceHelper;
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
        get root(): DevExpress.Reporting.Designer.Controls.ReportViewModel;
        getControlContainerName(): string;
        customizeExpressionCategories(sender: DevExpress.Analytics.Widgets.Internal.Tools, categories: DevExpress.Analytics.Widgets.Internal.IExpressionEditorCategory[]): void;
        get dataBindingMode(): any;
        set dpi(value: ko.Observable<number> | ko.Computed<number>);
        get dpi(): ko.Observable<number> | ko.Computed<number>;
        _innerDpi: ko.Observable<number> | ko.Computed<number>;
        styleName: ko.Observable<string> | ko.Computed<string>;
        stylePriority: {
            [key: string]: ko.Observable<boolean> | ko.Computed<boolean>;
        };
        formattingRuleLinks: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.FormattingRuleLink>;
        dataBindings: ko.ObservableArray<DevExpress.Reporting.Designer.Data.DataBinding>;
        size: DevExpress.Analytics.Elements.Size;
        location: DevExpress.Analytics.Elements.Point;
        scripts: any;
        paddingObj: DevExpress.Analytics.Elements.PaddingModel;
        expressionBindings: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.IExpressionBinding>;
        expressionObj: DevExpress.Reporting.Designer.Internal.IExpressionObject;
        padding: ko.Observable<string> | ko.Computed<string>;
        getStyleProperty: (propertyName: string, styleProperty: string) => any;
        toggleUseStyle: (propertyName: string) => void;
        _lockedInUserDesigner: ko.Observable<boolean> | ko.Computed<boolean>;
        lockedInUserDesigner: ko.Computed<boolean>;
        rtl(): boolean;
        parentModel: ko.Observable<DevExpress.Reporting.Designer.Controls.XRReportElementViewModel | any>;
    }
    export class XRCrossBandControlViewModel extends XRReportElementViewModel {
        static unitProperties: string[];
        constructor(control: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        private _subscribeBands;
        getNearestParent(target: DevExpress.Analytics.Elements.IElementViewModel<ControlType>): DevExpress.Analytics.Elements.IElementViewModel<string>;
        isResettableProperty(propertyName: string): boolean;
        isPropertyVisible(name: any): boolean;
        getControlContainerName(): string;
        name: ko.Observable<string> | ko.Computed<string>;
        isCrossbandShow: ko.Computed<boolean>;
        endPoint: DevExpress.Analytics.Elements.Point;
        startPoint: DevExpress.Analytics.Elements.Point;
        locationF: DevExpress.Analytics.Elements.Point;
        startBand: ko.Observable<DevExpress.Reporting.Designer.Bands.BandViewModel>;
        endBand: ko.Observable<DevExpress.Reporting.Designer.Bands.BandViewModel>;
        width: ko.Observable<number> | ko.Computed<number>;
        surface: DevExpress.Reporting.Designer.Controls.XRCrossBandSurface;
        parentModel: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel>;
    }
    export class XRCrossBandSurface extends XRControlSurfaceBase<DevExpress.Reporting.Designer.Controls.XRCrossBandControlViewModel> {
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<XRCrossBandControlViewModel>;
        private _isBandCollapsed;
        private _updateEndPoint;
        private _getAllBands;
        private _getIntersectionBands;
        private _getCrossBandBoxSides;
        protected get _unitAbsoluteRect(): DevExpress.Analytics.Elements.IArea;
        constructor(control: DevExpress.Reporting.Designer.Controls.XRCrossBandControlViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        canSetRect(rect: DevExpress.Analytics.Elements.IArea): boolean;
        isThereIntersectionWithControls(): boolean;
        updateAbsolutePosition(): void;
        isThereIntersectionWithCrossBandControls(): boolean;
        edgeUnderCursor: ko.Observable<DevExpress.Analytics.Internal.IHoverInfo> | ko.Computed<DevExpress.Analytics.Internal.IHoverInfo>;
        underCursor: ko.Observable<DevExpress.Analytics.Internal.IHoverInfo> | ko.Computed<DevExpress.Analytics.Internal.IHoverInfo>;
        leftCss: ko.Observable | ko.Computed;
        visible: ko.Computed<boolean>;
        rightCss: ko.Observable | ko.Computed;
        bottomCss: ko.Observable | ko.Computed;
        topCss: ko.Observable | ko.Computed;
        lineCss: ko.Observable | ko.Computed;
        get parent(): DevExpress.Reporting.Designer.Controls.ReportSurface;
        lineWidthCss: ko.Observable | ko.Computed;
        borderWidth: ko.Computed<number>;
        container(): DevExpress.Analytics.Elements.SurfaceElementArea<ElementViewModel>;
        _getChildrenHolderName(): any;
    }
    export interface ISignatureOptions {
        displayDocumentSignature: ko.Observable<boolean>;
        imageDisplayMode: ko.Observable<string>;
        showSignatureDate: ko.Observable<boolean>;
        showCertificateName: ko.Observable<boolean>;
        showLocation: ko.Observable<boolean>;
        showSignatureReason: ko.Observable<boolean>;
        showDistinguishedName: ko.Observable<boolean>;
        showCaptions: ko.Observable<boolean>;
        isPropertyDisabled: (propertyName: string) => boolean;
        getInfo: () => DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class XRPdfSignatureModel extends XRControlViewModel {
        private _displayDocumentSignatureSubscribed;
        signatureOptions: ISignatureOptions;
        subscribeSignature(allControls: () => XRPdfSignatureModel[]): void;
    }
    export class XRPdfSignatureSurface extends XRControlSurface {
        getSignatureInformationString(control: XRPdfSignatureModel): string;
        constructor(control: XRPdfSignatureModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        get certificateName(): any;
        showSkeleton: ko.Computed<boolean>;
        visibleText: ko.Computed<boolean>;
        visibleImage: ko.Computed<boolean>;
        hideImage: ko.Computed<boolean>;
    }
    export class EditOptions implements ISerializableModel {
        id: ko.Observable<string> | ko.Computed<string>;
        enabled: ko.Observable<boolean> | ko.Computed<boolean>;
        constructor(model: {}, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isEmpty(): boolean;
        isPropertyDisabled(name: string): boolean;
    }
    export class ContainerEditOptions extends EditOptions {
        parent: any;
        constructor(model: {}, parent: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        isPropertyDisabled(name: string): boolean;
    }
    export class CheckEditOptions extends EditOptions {
        groupID: ko.Observable<string> | ko.Computed<string>;
        constructor(model: {}, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class ImageEditOptions extends EditOptions {
        editorName: ko.Observable<string> | ko.Computed<string>;
        constructor(model: {}, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class TextEditOptions extends EditOptions {
        editorName: ko.Observable<string> | ko.Computed<string>;
        constructor(model: {}, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class ParameterBinding extends DataBindingBase implements ISerializableModel {
        private _dataSourceCallback;
        private _parametersCallback;
        private _reportDataSource;
        static createNew(): DevExpress.Reporting.Designer.Controls.ParameterBinding;
        dispose(): void;
        getInfo(): any;
        updateParameter(pathRequest: DevExpress.Analytics.Utils.PathRequest, dataSources: any): void;
        refresh(): void;
        initReportDataSource(dataSourceCallback: () => DevExpress.Reporting.Designer.Data.ObjectStorageItem): void;
        initSubreportParameters(parametersCallback: () => string[]): void;
        constructor(model: any, parent: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        visible: ko.Observable<boolean>;
        parameterName: ko.Observable<string> | ko.Computed<string>;
        subreportParameters: ko.Computed<string[]>;
        fakeBinding: any;
    }
    export class WatermarkModel extends SerializableModel implements IStyleContainer {
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        get displayName(): string;
        get name(): string;
        displayType(): string;
        shouldDrawWatermarkImage(): boolean;
        watermarkId: ko.Observable<string> | ko.Computed<string>;
        text: ko.Observable<string>;
        textDirection: ko.Observable<string>;
        foreColor: ko.Observable<string>;
        imageSource: ko.Observable<DevExpress.Reporting.ImageSource>;
        rtl: () => undefined;
    }
    export class ComponentsModel extends Disposable {
        renameComponentStrategy: DevExpress.Reporting.Designer.Internal.IRenameComponentStrategy;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: DevExpress.Analytics.Internal.IDataSourceInfo, renameComponentStrategy: DevExpress.Reporting.Designer.Internal.IRenameComponentStrategy);
        className: () => string;
        controlType: string;
        name: ko.Observable<string> | ko.Computed<string>;
        data: DevExpress.Reporting.Designer.Data.ObjectItem;
    }
    export class SubreportViewModel extends ReportViewModel {
        static defaultReport: {
            "@ControlType": string;
            "@PageWidth": string;
            "@PageHeight": string;
            "@Version": string;
            "@Font": string;
            "@Dpi": string;
            Bands: {
                Item1: {
                    "@ControlType": string;
                    "@HeightF": string;
                };
                Item2: {
                    "@ControlType": string;
                    "@HeightF": string;
                };
                Item3: {
                    "@ControlType": string;
                    "@HeightF": string;
                };
            };
        };
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): SubreportViewModel;
        static toJson(value: SubreportViewModel, serializer: any, refs: any): any;
        _initializeBands(): void;
        getInfo(): any;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        serialize(): any;
        isAllSufficient: boolean;
        _model: any;
        objectStorageIsEmpty: ko.Observable<boolean>;
    }
    export class XRSubreportViewModel extends XRControlViewModel {
        dispose(): void;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        private _getCurrentGenerateOwnPagesIsActive;
        private _clearReportModel;
        private _assignParameters;
        private _calculateSubreportPosition;
        private _subscribeStorages;
        private _initParameter;
        constructor(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        refreshParameterBindings(): void;
        isPropertyDisabled(propertyName: any): any;
        updateParameters(): void;
        cloneReportSource(): DevExpress.Reporting.Designer.Controls.ReportViewModel;
        needProcessLocation: boolean;
        get root(): DevExpress.Reporting.Designer.Controls.ReportViewModel;
        generateOwnPages: ko.Computed<boolean>;
        _generateOwnPages: ko.Observable<boolean> | ko.Computed<boolean>;
        generateOwnPagesIsActive: ko.Computed<boolean>;
        subreportParameters: ko.ObservableArray<string>;
        reportSource: DevExpress.Reporting.Designer.Controls.ReportViewModel;
        reportSourceUrl: ko.Observable<string> | ko.Computed<string>;
        parameterBindings: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.ParameterBinding>;
        key: ko.Computed<string>;
    }
    export class XRSubreportSurface extends XRControlSurface {
        constructor(control: XRSubreportViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        getAdornTemplate(): string;
        getResizableOptions(resizeHandler: any): any;
        processLocation(location: DevExpress.Analytics.Elements.IArea): DevExpress.Analytics.Elements.IArea;
        _control: XRSubreportViewModel;
    }
    export function getDefaultCheckSize(checkState?: DevExpress.Reporting.Viewer.Editing.GlyphStyle): DevExpress.Analytics.Elements.Size;
    export function _getCustomGlyphsInfo(type: string): DevExpress.Analytics.Utils.ISerializationInfo;
    export interface ICheckBoxCustomGlyphs {
        Checked: ko.Observable<DevExpress.Reporting.ImageSource>;
        Unchecked: ko.Observable<DevExpress.Reporting.ImageSource>;
        Indeterminate: ko.Observable<DevExpress.Reporting.ImageSource>;
    }
    export class GlyphOptions extends Disposable implements ISerializableModel {
        static unitProperties: string[];
        constructor(model: {}, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getInfo: ko.Observable<DevExpress.Analytics.Utils.ISerializationInfoArray>;
        alignment: ko.Observable<string> | ko.Computed<string>;
        size: DevExpress.Analytics.Elements.Size;
        style: ko.Observable<string> | ko.Computed<string>;
        customGlyphs: ICheckBoxCustomGlyphs;
    }
    export class XRTextControlSurfaceBase<M extends DevExpress.Analytics.Elements.ElementViewModel<ControlType>> extends XRControlSurfaceBase<M> {
        private _$element;
        private _font;
        characterHeight: ko.Computed<number>;
        contenttemplate: string;
        getAlignments(): {
            vertical: string;
            horizontal: string;
        };
        getWordWrap(): any;
        getCssContent(content?: Object): Object;
        getContentSize(): any;
        getText(): string;
        getFontModel(): DevExpress.Analytics.Widgets.Internal.FontModel;
        setFontSize(size: any): void;
        cacheElementContent($element: JQuery): void;
        fitTextToBounds(): void;
        fitWidthToText(): void;
        fitHeightToText(): void;
        fitBoundsToText(): void;
        constructor(control: M, context: DevExpress.Analytics.Elements.ISurfaceContext, units?: DevExpress.Analytics.Internal.IUnitProperties<any>);
        fitTextToBoundsAction: DevExpress.Reporting.Designer.Actions.FitTextToBoundsAction;
        fitBoundsToTextAction: DevExpress.Reporting.Designer.Actions.FitBoundsToTextAction;
    }
    export class XRCheckBoxViewModel extends XRControlViewModel {
        static unitProperties: any[];
        static _patchModel(model: any): any;
        constructor(control: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        checked: ko.Observable<boolean> | ko.Computed<boolean>;
        checkBoxState: ko.Observable<string> | ko.Computed<string>;
        glyphAlignment: ko.Observable<string> | ko.Computed<string>;
        glyphOptions: DevExpress.Reporting.Designer.Controls.GlyphOptions;
    }
    export class XRCheckBoxSurface extends XRTextControlSurfaceBase<XRCheckBoxViewModel> {
        constructor(control: XRCheckBoxViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        borderCss: any;
        checkStateClass: ko.Computed<string>;
        checkStateStyleIcon: ko.Computed<string>;
        customGlyphStyleCss: ko.Computed<any>;
        checkStateWidth: ko.Observable<number> | ko.Computed<number>;
        checkStateHeight: ko.Observable<number> | ko.Computed<number>;
        textWidth: ko.Computed<number>;
        leftPadding: any;
        checkStateWidthContainer: ko.Observable<string> | ko.Computed<string>;
        visibleText: ko.Observable<boolean> | ko.Computed<boolean>;
        isGlyphAlignmentNear: ko.Computed<boolean>;
    }
    export class XRTableCellViewModel extends XRControlViewModel {
        static unitProperties: string[];
        constructor(model: any, parent: DevExpress.Reporting.Designer.Controls.XRTableRowViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        weight: ko.Observable<number> | ko.Computed<number>;
        width: ko.Computed<number>;
        height: ko.Computed<number>;
        left: ko.Observable<number> | ko.Computed<number>;
        name: ko.Observable<string> | ko.Computed<string>;
        text: ko.Observable<string> | ko.Computed<string>;
        surface: DevExpress.Reporting.Designer.Controls.XRTableCellSurface;
        borders: ko.Observable<string> | ko.Computed<string>;
        parentModel: ko.Observable<DevExpress.Reporting.Designer.Controls.XRTableRowViewModel>;
        textEditOptions: DevExpress.Reporting.Designer.Controls.ContainerEditOptions;
    }
    export class XRTableCellSurface extends TableComponentSurface<DevExpress.Reporting.Designer.Controls.XRTableCellViewModel> {
        private _row;
        private _table;
        private _cellIndex;
        private _rowIndex;
        private _getAdjacentCellByRowIndex;
        private _isShowBorder;
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<XRTableCellViewModel>;
        dispose(): void;
        constructor(control: DevExpress.Reporting.Designer.Controls.XRTableCellViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        direction: DevExpress.Reporting.Designer.Internal.TableActionDirection;
        controls: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRControlSurface>;
        x: ko.Observable<number> | ko.Computed<number>;
        rowSpan: ko.Computed<number>;
        heightWithRowSpan: () => number;
        offsetZIndex: () => number;
        selectColumn(selection: DevExpress.Analytics.Internal.ISelectionProvider): void;
        checkParent(surfaceParent: DevExpress.Analytics.Internal.ISelectionTarget): boolean;
        isThereIntersectionWithUsefulArea(): boolean;
        isThereIntersectionWithCrossBandControls(): boolean;
        isThereIntersectionWithNeighborsCollection(): boolean;
        isThereIntersectionWithParentCollection(): boolean;
        beforeRectUpdated(rect: DevExpress.Analytics.Elements.IArea): DevExpress.Analytics.Elements.IArea;
        canDrop(): boolean;
        getAdornTemplate(): string;
    }
    export class XRTableControlViewModel extends XRControlViewModel {
        private _getAdjacentCells;
        dispose(): void;
        constructor(control: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        updateRowLocation(row: DevExpress.Reporting.Designer.Controls.XRTableRowViewModel, deltaHeight: number): void;
        addChild(control: DevExpress.Analytics.Elements.IElementViewModel, position?: number, onComponentAdded?: any): void;
        insertRow(selectedRow: DevExpress.Reporting.Designer.Controls.XRTableRowViewModel, isRowAbove: boolean, onComponentAdded: any): void;
        removeChild(selectedRow: DevExpress.Reporting.Designer.Controls.XRTableRowViewModel): void;
        insertColumn(selectedCell: DevExpress.Reporting.Designer.Controls.XRTableCellViewModel, isRight: boolean, onComponentAdded: any): void;
        addColumnToCalculation(diff: number, last?: boolean): void;
        tableCalculationProvider: DevExpress.Reporting.Designer.Internal.TableCalculationProvider;
        rows: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRTableRowViewModel>;
        rowsTotalWeight: ko.Computed<number>;
        pixelHeightWeight: ko.Computed<number>;
        name: ko.Observable<string> | ko.Computed<string>;
        size: DevExpress.Analytics.Elements.Size;
        location: DevExpress.Analytics.Elements.Point;
        surface: XRTableSurface;
    }
    export class XRTableSurface extends XRControlSurfaceBase<DevExpress.Reporting.Designer.Controls.XRTableControlViewModel> {
        private _isUpdating;
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<XRTableControlViewModel>;
        _getChildrenHolderName(): string;
        dispose(): void;
        constructor(control: DevExpress.Reporting.Designer.Controls.XRTableControlViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        private _isCellInColumn;
        selectColumn(selection: DevExpress.Analytics.Internal.ISelectionProvider, cellSurface: DevExpress.Reporting.Designer.Controls.XRTableCellSurface): void;
        isThereIntersectionWithChildCollection(): boolean;
        rows: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRTableRowSurface>;
    }
    export class XRTableRowViewModel extends XRControlViewModel {
        static unitProperties: any[];
        dispose(): void;
        constructor(control: any, parent: DevExpress.Reporting.Designer.Controls.XRTableControlViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        hasCalculationNode(cellIndex: number): boolean;
        addCellToCalculation(cellIndex: number, delta: number): void;
        addColumnToCalculation(diff: number, last?: boolean): void;
        addTableOffset(width?: number, left?: number): void;
        addChild(control: DevExpress.Analytics.Elements.IElementViewModel, position?: number, onComponentAdded?: any): void;
        insertCellCopy(selectedCell: DevExpress.Reporting.Designer.Controls.XRTableCellViewModel, isRight: boolean, onComponentAdded: any): void;
        removeChild(selectedCell: DevExpress.Reporting.Designer.Controls.XRTableCellViewModel): void;
        parentModel: ko.Observable<DevExpress.Reporting.Designer.Controls.XRTableControlViewModel>;
        cells: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRTableCellViewModel>;
        cellsTotalWeight: ko.Computed<number>;
        pixelWidthWeight: ko.Computed<number>;
        name: ko.Observable<string> | ko.Computed<string>;
        weight: ko.Observable<number> | ko.Computed<number>;
        width: ko.Observable<number> | ko.Computed<number>;
        height: ko.Computed<number>;
        top: ko.Observable<number> | ko.Computed<number>;
        surface: DevExpress.Reporting.Designer.Controls.XRTableRowSurface;
    }
    export class XRTableRowSurface extends TableComponentSurface<DevExpress.Reporting.Designer.Controls.XRTableRowViewModel> {
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<XRTableRowViewModel>;
        _getChildrenHolderName(): string;
        dispose(): void;
        constructor(control: DevExpress.Reporting.Designer.Controls.XRTableRowViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        getAdornTemplate(): string;
        direction: DevExpress.Reporting.Designer.Internal.TableActionDirection;
        y: ko.Observable<number> | ko.Computed<number>;
        cells: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRTableCellSurface>;
    }
    export class XRPictureBoxViewModel extends XRControlViewModel {
        constructor(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        isAlignmentDisabled(): boolean;
        isPropertyDisabled(propertyName: string): any;
        imageAlignment: ko.Observable<string> | ko.Computed<string>;
        imageUrl: ko.Observable<string> | ko.Computed<string>;
        imageSource: ko.Observable<DevExpress.Reporting.ImageSource>;
        _sizing: ko.Observable<string> | ko.Computed<string>;
        sizing: ko.Observable<string> | ko.Computed<string>;
        isSmallerImage: ko.Observable<boolean> | ko.Computed<boolean>;
        get isAutoSize(): boolean;
        imageRatio: {
            x: number;
            y: number;
        };
        originalImageWidth: ko.Observable<number>;
        originalImageHeight: ko.Observable<number>;
    }
    export class XRPictureBoxSurface extends XRControlSurface {
        private _createBackgroundPosition;
        private _createBackimage;
        private _createBackgroundOrigin;
        constructor(model: XRPictureBoxViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        getResizeOptions(resizeHandler: DevExpress.Analytics.Internal.IResizeHandler): DevExpress.Analytics.Internal.IResizeHandler;
        selectiontemplate: string;
        getAdornTemplate(): string;
        _control: XRPictureBoxViewModel;
        resizeDisabled: ko.Computed<boolean>;
        resizeOptions: DevExpress.Analytics.Internal.IResizeHandler;
    }
    export const levelDefaultHeight = 23;
    export class TableOfContentsLevel extends ElementViewModel<DevExpress.Reporting.Designer.Internal.ControlType> {
        dispose(): void;
        static createNew(parent: DevExpress.Reporting.Designer.Controls.XRTableOfContentsViewModel): DevExpress.Reporting.Designer.Controls.TableOfContentsLevel;
        static unitProperties: string[];
        private _levelIndex;
        private _indentFactor;
        preInitProperties(model: any): void;
        constructor(model: any, parent: DevExpress.Reporting.Designer.Controls.XRTableOfContentsViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer, isTitle?: boolean);
        isTitle: boolean;
        name: ko.Observable<string> | ko.Computed<string>;
        height: ko.Observable<number> | ko.Computed<number>;
        width: ko.Observable<number> | ko.Computed<number>;
        top: ko.Observable<number> | ko.Computed<number>;
        levelsHeightUnder: ko.Observable<number> | ko.Computed<number>;
        indent: ko.Observable<number> | ko.Computed<number>;
        left: ko.Computed<number>;
        leaderSymbol: ko.Observable<string> | ko.Computed<string>;
        font: ko.Observable<string> | ko.Computed<string>;
        foreColor: ko.Observable<string> | ko.Computed<string>;
        backColor: ko.Observable<string> | ko.Computed<string>;
        padding: ko.Observable<string> | ko.Computed<string>;
        paddingObj: DevExpress.Analytics.Elements.PaddingModel;
        textAlignment: ko.Observable<string> | ko.Computed<string>;
        text: ko.Observable<string> | ko.Computed<string>;
        dpi: ko.Observable<number> | ko.Computed<number>;
        parentModel: ko.Observable<DevExpress.Reporting.Designer.Controls.XRTableOfContentsViewModel>;
        borderWidth: ko.Observable | ko.Computed;
        borderColor: ko.Observable | ko.Computed;
        borders: ko.Observable | ko.Computed;
        borderDefault: ko.Observable<string> | ko.Computed<string>;
        borderDashStyle: ko.Observable | ko.Computed;
        lockedInUserDesigner: ko.Observable<boolean> | ko.Computed<boolean>;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyModified(name: string): boolean;
        getControlFactory(): DevExpress.Reporting.ControlsFactory;
        rtl(): boolean;
    }
    export class TableOfContentsLevelSurface extends XRControlSurfaceBase<DevExpress.Reporting.Designer.Controls.TableOfContentsLevel> {
        static _$leaderSymbol: JQuery;
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<TableOfContentsLevel>;
        private _leaderSymbolWidth;
        constructor(control: DevExpress.Reporting.Designer.Controls.TableOfContentsLevel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        text: ko.Observable<string> | ko.Computed<string>;
        resizable(resizeHandler: any, element: HTMLElement): any;
        leaderSymbols: ko.PureComputed<string>;
        rtlLayout(): boolean;
    }
    export class XRTableOfContentsViewModel extends XRControlViewModel {
        static unitProperties: any[];
        dispose(): void;
        createLocalizationProvider(): DevExpress.Reporting.Designer.Internal.TableOfContentLocalizationProvider;
        constructor(control: any, parent: DevExpress.Reporting.Designer.Bands.BandViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        get textEditableProperty(): ko.Observable<string> | ko.Computed<string>;
        levels: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.TableOfContentsLevel>;
        levelDefault: DevExpress.Reporting.Designer.Controls.TableOfContentsLevel;
        levelTitle: DevExpress.Reporting.Designer.Controls.TableOfContentsLevel;
        maxNestingLevel: ko.Observable<number> | ko.Computed<number>;
        levelTitleText: ko.Observable<string> | ko.Computed<string>;
        allLevels: ko.Observable<DevExpress.Reporting.Designer.Controls.TableOfContentsLevel[]> | ko.Computed<DevExpress.Reporting.Designer.Controls.TableOfContentsLevel[]>;
        borderWidth: ko.Observable | ko.Computed;
        borderColor: ko.Observable | ko.Computed;
        borders: ko.Observable | ko.Computed;
        borderDashStyle: ko.Observable | ko.Computed;
        borderDefault: ko.PureComputed<string>;
        parentModel: ko.Observable<DevExpress.Reporting.Designer.Bands.BandViewModel>;
    }
    export class XRTableOfContentsSurface extends XRControlSurface {
        constructor(control: DevExpress.Reporting.Designer.Controls.XRTableOfContentsViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        isThereIntersectionWithChildCollection(): boolean;
        isThereIntersectionWithUsefulArea(): boolean;
        isThereIntersectionWithParentCollection(): boolean;
        levelTitle: DevExpress.Reporting.Designer.Controls.TableOfContentsLevelSurface;
        levelDefault: DevExpress.Reporting.Designer.Controls.TableOfContentsLevelSurface;
        levels: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.TableOfContentsLevelSurface>;
    }
    export class ExtensionModel {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        key: ko.Observable<string> | ko.Computed<string>;
        value: ko.Observable<string> | ko.Computed<string>;
    }
    export class XRPivotGridViewModel extends XRControlViewModel {
        dispose(): void;
        private _initCriteriaString;
        constructor(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        removeChild(selectedField: DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldViewModel): void;
        getFieldsFromArea(area: string): DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldViewModel[];
        getPath(propertyName: any): string;
        fields: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldViewModel>;
        dataSource: ko.Observable<DevExpress.Reporting.Designer.Data.ObjectStorageItem>;
        dataMember: ko.Observable<string> | ko.Computed<string>;
        addFieldToArea: any;
        prefilter: {
            parent: XRPivotGridViewModel;
            _criteriaString: ko.Observable<string> | ko.Computed<string>;
            criteriaString: DevExpress.Analytics.Widgets.FilterStringOptions;
        };
    }
    export class XRPivotGridSurface extends XRControlSurface {
        constructor(control: XRPivotGridViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        _getChildrenHolderName(): string;
        getAreaFields(area: string): DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldSurface[];
        getTotalsAreaFieldWidth(area: string, zoom: number): number;
        getAdornTemplate(): "" | "dxrd-intersect";
        isThereIntersectionWithChildCollection(): boolean;
        filterFields: ko.Computed<DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldSurface[]>;
        dataFields: ko.Computed<DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldSurface[]>;
        columnFields: ko.Computed<DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldSurface[]>;
        rowFields: ko.Computed<DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldSurface[]>;
        totalsHeight: ko.Computed<number>;
        rowHeaderHeight: ko.Computed<number>;
        totalsDataFieldWidth: ko.Computed<number>;
        totalsRowFieldWidth: ko.Computed<number>;
        fields: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldSurface>;
    }
    export class XRPdfContentViewModel extends XRControlViewModel {
        private _sourceItem;
        constructor(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        canFit(): boolean;
        fitToContent(): void;
        _getPdfContentData(checkSource: any): void;
        _getExpressionNameByPropertyName(propertyName: string): string;
        source: ko.Observable<string> | ko.Computed<string>;
        sourceUrl: ko.Observable<string> | ko.Computed<string>;
        generateOwnPages: ko.Observable<boolean>;
        pageCount: ko.Observable<number>;
        imageSource: ko.Observable<string>;
        imageWidth: number;
        imageHeight: number;
        textContent: ko.Computed<string>;
        pageRange: ko.Observable<string>;
    }
    export class XRPdfContentSurface extends TodoControlSurface {
        private _handles;
        private _getHandles;
        constructor(control: XRPdfContentViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        getResizableOptions(resizeHandler: any): any;
        generateOwnPages: ko.Observable<boolean>;
    }
    export const getRichEditSurface: DevExpress.Analytics.Internal.IGlobalSubscribableValue<() => any>;
    export const registerRichEditInline: DevExpress.Analytics.Internal.IGlobalSubscribableValue<(selection: DevExpress.Analytics.Internal.SurfaceSelection) => any>;
    export enum XRRichTextStreamType {
        RtfText = 0,
        PlainText = 1,
        HtmlText = 2,
        XmlText = 3
    }
    export class XRRichViewModel extends XRControlViewModel {
        private static _hiddenProperties;
        private _toStreamType;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        get textEditableProperty(): ko.Observable<string>;
        format: ko.Observable<XRRichTextStreamType>;
        foreColor: ko.Observable<string> | ko.Computed<string>;
        serializableRtfString: ko.Observable<string> | ko.Computed<string>;
        _newDocumentData: ko.Observable<DevExpress.Analytics.Internal.IFileUploadResult>;
        font: ko.Observable<string> | ko.Computed<string>;
        textRtf: ko.Observable<string>;
        _rtf: ko.Observable<string>;
    }
    export class XRRichSurface extends XRControlSurface {
        private _lastRequest;
        private _innerUpdate;
        private _sendCallback;
        constructor(control: DevExpress.Reporting.Designer.Controls.XRRichViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        imageSrc: ko.Observable<string>;
        isLoading: ko.Observable<boolean>;
    }
    export class XRShapeViewModel extends XRControlViewModel {
        static timeout: number;
        static shapes: ({
            displayName: string;
            type: string;
            angle?: undefined;
            val?: undefined;
        } | {
            displayName: string;
            type?: undefined;
            angle?: undefined;
            val?: undefined;
        } | {
            displayName: string;
            angle: number;
            type: string;
            val?: undefined;
        } | {
            displayName: string;
            val: {
                "@NumberOfSides": number;
                "@StarPointCount"?: undefined;
            };
            type: string;
            angle?: undefined;
        } | {
            displayName: string;
            val: {
                "@StarPointCount": number;
                "@NumberOfSides"?: undefined;
            };
            type: string;
            angle?: undefined;
        })[];
        static createShape(model: any, serializer?: any): {
            shapeType: ko.Observable<any>;
            getInfo: () => any;
        };
        constructor(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        Shape: any;
        shapeFake: any;
    }
    export class ImageBase64Model {
        imageBase64: string;
    }
    export class XRShapeControlSurface extends XRControlSurface {
        private _lastUpdateImageDeferred;
        private _updateImage;
        constructor(control: DevExpress.Reporting.Designer.Controls.XRControlViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        imageSrc: ko.Observable<string>;
        isLoading: ko.Observable<boolean>;
        error: ko.Observable<string>;
    }
    export class ControlParameter extends DataBindingBase implements ISerializableModel {
        private _dataSourceHelper?;
        private _dataBindingsProvider?;
        static createNew(): DevExpress.Reporting.Designer.Controls.ControlParameter;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfo[];
        isEmpty(): boolean;
        constructor(model: object, serializer?: DevExpress.Analytics.Utils.IModelSerializer, _dataSourceHelper?: ko.Observable<DevExpress.Reporting.Designer.Internal.DataSourceHelper>, _dataBindingsProvider?: ko.Observable<DevExpress.Analytics.Internal.FieldListProvider>);
        setDataMemberInfo(dataMemberInfo: DevExpress.Analytics.Utils.IDataMemberInfo): void;
        get dataType(): string;
        get specifics(): string;
        get name(): string;
        generateValue(undoEngine: DevExpress.Analytics.Utils.UndoEngine, dataSourceHelper: DevExpress.Reporting.Designer.Internal.DataSourceHelper, dataSources: DevExpress.Analytics.Internal.IDataSourceInfo[], dataBindingsProvider?: DevExpress.Analytics.Internal.FieldListProvider): ko.Computed<string>;
        initDataMemberInfo(dataSourceHelper?: DevExpress.Reporting.Designer.Internal.DataSourceHelper, dataBindingsProvider?: DevExpress.Analytics.Internal.FieldListProvider): void;
        fakeBinding: any;
        visible: ko.Observable<boolean>;
        parameterName: ko.Observable<string>;
        dataMemberInfo: ko.Observable<DevExpress.Analytics.Utils.IDataMemberInfo>;
    }
    export class XRChartViewModel extends XRControlViewModel {
        static assignValueDataMembers(chart: DevExpress.Reporting.Chart.Internal.Models.ChartViewModel, str: string): void;
        static setDataMembers(chart: DevExpress.Reporting.Chart.Internal.Models.ChartViewModel, isPivotGrid: boolean): void;
        private _createChartModel;
        private _updateExpressionObjectProperties;
        _getExpressionObjectProperties(chartComponents: DevExpress.Reporting.Internal.IXRChartComponentInfo[]): DevExpress.Reporting.Designer.Internal.IControlPropertyDescription[];
        _getChildComponents(): DevExpress.Reporting.Internal.IXRChartComponentInfo[];
        createLocalizationProvider(): DevExpress.Reporting.Designer.Internal.ChartLocalizationProvider;
        constructor(model: object, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        isPropertyDisabled(name: string): boolean;
        getPath(propertyName: string): string;
        pivotGridDataSourceOptions: ko.Computed<any>;
        isPivotGridDataSource: ko.Observable<boolean> | ko.Computed<boolean>;
        seriesDataMember: ko.Observable<string> | ko.Computed<string>;
        dataMember: ko.Observable<string> | ko.Computed<string>;
        chart: DevExpress.Reporting.Chart.Internal.Models.ChartViewModel;
        chartModel: DevExpress.Reporting.Chart.Internal.ChartControlViewModel;
        dataSource: ko.Observable | ko.Computed;
        realDataSource: ko.Observable | ko.Computed;
        controlParameters: ko.ObservableArray<any>;
        allChartComponents: ko.Computed<DevExpress.Reporting.Internal.IXRChartComponentInfo[]>;
    }
    export class XRChartSurface extends XRControlSurface {
        constructor(control: XRChartViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        designTime: ko.Observable<boolean>;
        isLoading: ko.Observable<boolean>;
        imageSrc: ko.Observable<string>;
        runDesignerButtonText(): string;
    }
    export class SortingOptions extends Disposable implements ISerializableModel {
        private _info;
        private _fieldNameInfo;
        targetBand: ko.Observable<DevExpress.Reporting.Designer.Bands.BandViewModel>;
        fieldName: ko.Observable<string> | ko.Computed<string>;
        private _getFieldNames;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        resetValue(): void;
        constructor(model: {}, report: DevExpress.Reporting.Designer.Controls.ReportViewModel, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getPath(propertyName: string): any;
    }
    export class ActionTypeBase extends Disposable implements ISerializableModel {
        constructor(control: any, key?: string, addSubcsription?: boolean);
        updateActionType(objectType: string): void;
        subscribeToObjectType(): void;
        isPropertyVisible(name: string): boolean;
        getInfo: () => DevExpress.Analytics.Utils.ISerializationInfoArray;
        key: ko.Observable<string>;
        name: ko.Observable<string>;
        _control: any;
    }
    export class NavigateToReportAction extends ActionTypeBase {
        constructor(key: string, model: any, control: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer, drillThroughReportViewModel?: (report: any, serializer: any) => any);
        private getParameters;
        private _assignParameters;
        private _initParameter;
        refreshParameterBindings(): void;
        updateParameters(): void;
        isPropertyVisible(name: string): boolean;
        reportSourceUrl: ko.Observable<string>;
        subreportParameters: ko.ObservableArray<string>;
        reportSource?: DevExpress.Reporting.Designer.Controls.ReportViewModel;
        parameterBindings?: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.ParameterBinding>;
        drillThroughReportViewModel: (report: any, serializer: any) => any;
    }
    export class XRControlViewModel extends XRReportElementViewModel {
        dispose(): void;
        anchoring(parent: DevExpress.Reporting.Designer.Controls.IAnchoringProperties): void;
        constructor(control: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getNearestParent(target: DevExpress.Analytics.Elements.IElementViewModel<ControlType>): DevExpress.Analytics.Elements.IElementViewModel<string>;
        isPropertyDisabled(name: any): any;
        isPropertyVisible(name: any): boolean;
        hasExpressionBindings(): boolean;
        hasDataBindingByName(property?: string): boolean;
        get hasDefaultBindingProperty(): boolean;
        getExpressionBinding(property?: string, event?: string): string;
        setExpressionBinding(value: string, property?: string, event?: string): void;
        getControlInfo(): DevExpress.Reporting.Designer.Controls.IReportControlMetadata;
        getDefaultBinding(): DevExpress.Analytics.Widgets.IExpressionOptions | DevExpress.Reporting.Designer.Data.DataBinding;
        textArea: ko.Observable<string> | ko.Computed<string>;
        multiline: ko.Observable<boolean> | ko.Computed<boolean>;
        name: ko.Observable<string> | ko.Computed<string>;
        text: ko.Observable<string> | ko.Computed<string>;
        textFormatString: ko.Observable<string> | ko.Computed<string>;
        controls: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRControlViewModel>;
        popularDataBinding: any;
        anchorVertical: ko.Observable<string> | ko.Computed<string>;
        anchorHorizontal: ko.Observable<string> | ko.Computed<string>;
        vertAnchoring: DevExpress.Reporting.Designer.Controls.VerticalAcnhoring;
        horAnchoring: DevExpress.Reporting.Designer.Controls.HorizontalAnchoring;
        hasBindings: ko.Computed<boolean>;
        interactiveSorting: DevExpress.Reporting.Designer.Controls.SortingOptions;
        expressionBindings: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.IExpressionBinding>;
        dataBindingsAreValid: ko.Observable<boolean> | ko.Computed<boolean>;
        action?: ko.Observable<DevExpress.Reporting.Designer.Controls.ActionTypeBase>;
    }
    export class XRControlSurfaceBase<M extends DevExpress.Analytics.Elements.ElementViewModel<ControlType>> extends SurfaceElementBase<M, DevExpress.Reporting.Designer.Internal.ControlType> {
        private delta;
        private _isThereIntersectionWithUsefulArea;
        static _appendValue(accumulator: string, value: string, needToAppend?: boolean): string;
        protected get _unitAbsoluteRect(): DevExpress.Analytics.Elements.IArea;
        private get _unitRect();
        constructor(control: M, context: DevExpress.Analytics.Elements.ISurfaceContext, unitProperties: DevExpress.Analytics.Internal.IUnitProperties<M>);
        checkParent(surfaceParent: DevExpress.Analytics.Internal.ISelectionTarget): boolean;
        isThereIntersection(rect1: DevExpress.Analytics.Elements.IArea, rect2: DevExpress.Analytics.Elements.IArea): boolean;
        isThereIntersectionWithParent(parentRect: DevExpress.Analytics.Elements.IArea, childRect: DevExpress.Analytics.Elements.IArea): boolean;
        isThereIntersectionWithUsefulArea(): boolean;
        isThereIntersectionWithCrossBandControls(currentRect?: DevExpress.Analytics.Elements.IArea): boolean;
        isThereIntersectionWithControls(): boolean;
        isThereIntersectionWithParentCollection(currentRect: any, controlRectProperty?: string): boolean;
        isThereIntersectionWithChildCollection(controlRectProperty?: string): boolean;
        isThereIntersectionWithNeighborsCollection(currentRect: any, collectionControls: any, controlRectProperty?: string): boolean;
        isThereIntersectionWithChildControls(collectionControls: any, controlRectProperty?: string): boolean;
        getAdornTemplate(): string;
        hasDataBindingByName(propertyName: string): boolean;
        get hasBindings(): boolean;
        get bindingsIsValid(): any;
        get bindingsHasWarning(): any;
        contentSizes: any;
        contentHeightWithoutZoom: any;
        contentWidthWithoutZoom: any;
        borderCss: any;
        template: string;
        selectiontemplate: string;
        contenttemplate: string;
        isIntersect: ko.Computed<boolean>;
        adorntemplate: ko.Computed<string>;
        displayNameParameters: ko.PureComputed<{
            text: any;
            isExpression: boolean;
            dataSource: any;
            dataMember: any;
            dataMemberOffset: any;
            allowMarkupText: boolean;
            wordWrap: boolean;
            fontSize: number;
            fontUnit: any;
        }>;
        displayName: ko.PureComputed<any>;
        displayText(): any;
    }
    export class XRControlSurface extends XRControlSurfaceBase<DevExpress.Reporting.Designer.Controls.XRControlViewModel> {
        dispose(): void;
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<XRControlViewModel>;
        constructor(control: DevExpress.Reporting.Designer.Controls.XRControlViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        controls: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRControlSurface>;
    }
    export class ReportViewModel extends XRReportElementViewModel implements IModelReady {
        static availableDataSourceTypes: string[];
        static bandsTypeOrdering: DevExpress.Reporting.Designer.Internal.ReportBandsType[];
        static unitProperties: string[];
        static defaultPageSize: {
            width: number;
            height: number;
        };
        static createObjectStorage(_componentStorage: ko.ObservableArray<DevExpress.Reporting.Designer.Data.ObjectStorageItem>, _objectStorage: ko.ObservableArray<DevExpress.Reporting.Designer.Data.ObjectStorageItem>, collectSubscription?: (subscription: ko.Subscription) => any): ko.ObservableArray<DevExpress.Reporting.Designer.Data.ObjectStorageItem>;
        private _getDpi;
        private _recalculateUnits;
        private _updatePageSize;
        enumerateComponents(process?: (target: ko.ObservableArray<any>) => void): any[];
        createLocalizationProvider(): DevExpress.Reporting.Designer.Internal.ReportLocalizationProvider;
        createReportViewModel(report: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Reporting.Designer.Controls.ReportViewModel;
        findStyle(styleName: string): DevExpress.Reporting.Designer.Controls.StyleModel;
        _getBandForToc(bands: DevExpress.Reporting.Designer.Bands.BandViewModel[]): DevExpress.Reporting.Designer.Bands.BandViewModel;
        getOrCreateBandForToC(createNew?: boolean): {
            band: DevExpress.Reporting.Designer.Bands.BandViewModel;
            canAdd: boolean;
        };
        canAddToC(): boolean;
        _initializeBands(): void;
        isPropertyDisabled(name: string): boolean;
        dispose(): void;
        preInitProperties(): void;
        constructor(report: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer, knownEnums?: DevExpress.Reporting.IEnumType[]);
        isLocalized(): boolean;
        initialize(): void;
        getNearestParent(target: DevExpress.Analytics.Elements.IElementViewModel<ControlType>): DevExpress.Reporting.Designer.Controls.ReportViewModel;
        addChild(control: DevExpress.Analytics.Elements.IElementViewModel): void;
        removeChild(control: DevExpress.Analytics.Elements.IElementViewModel): void;
        clearLocalization(culture?: string): void;
        serialize(): any;
        save(): any;
        getPath(propertyName: string): string;
        clone(dataSourceRefsFromParent?: DevExpress.Reporting.Designer.Utils.IDataSourceRefInfo[]): DevExpress.Reporting.Designer.Controls.ReportViewModel;
        paperKind: ko.Observable<string> | ko.Computed<string>;
        isStyleProperty(propertyName: string): boolean;
        onSave: (data: any) => void;
        dataSourceHelper: ko.Observable<DevExpress.Reporting.Designer.Internal.DataSourceHelper>;
        dataBindingsProvider: ko.Observable<DevExpress.Analytics.Internal.FieldListProvider>;
        stylesHelper: ko.Observable<DevExpress.Reporting.Designer.Internal.StylesHelper>;
        dataSource: ko.Observable<DevExpress.Reporting.Designer.Data.ObjectStorageItem>;
        dataMember: ko.Observable<string> | ko.Computed<string>;
        styles: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.StyleModel>;
        measureUnit: ko.Observable<DevExpress.Analytics.Internal.MeasureUnit> | ko.Computed<DevExpress.Analytics.Internal.MeasureUnit>;
        snapGridSize: ko.Observable<number> | ko.Computed<number>;
        pageWidth: ko.Observable<number> | ko.Computed<number>;
        pageHeight: ko.Observable<number> | ko.Computed<number>;
        margins: DevExpress.Analytics.Elements.Margins;
        bands: ko.ObservableArray<DevExpress.Reporting.Designer.Bands.BandViewModel>;
        crossBandControls: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRCrossBandControlViewModel>;
        parameters: ko.ObservableArray<DevExpress.Reporting.Designer.Data.Parameter>;
        parameterPanelLayoutItems: ko.ObservableArray<DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem>;
        parameterHelper: DevExpress.Reporting.Designer.ReportParameterHelper;
        objectsStorageHelper: DevExpress.Reporting.Designer.Data.ObjectsStorage;
        objectStorage: ko.ObservableArray<DevExpress.Reporting.Designer.Data.ObjectStorageItem>;
        _objectStorage: ko.ObservableArray<DevExpress.Reporting.Designer.Data.ObjectStorageItem>;
        _componentStorage: ko.ObservableArray<DevExpress.Reporting.Designer.Data.ObjectStorageItem>;
        _dataBindingMode: ko.Observable<string> | ko.Computed<string>;
        get dataBindingMode(): string;
        extensions: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.ExtensionModel>;
        formattingRuleSheet: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.FormattingRule>;
        components: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.ComponentsModel>;
        calculatedFields: ko.ObservableArray<DevExpress.Reporting.Designer.Data.CalculatedField>;
        watermarks: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.WatermarkModel>;
        scriptsSource: ko.Observable<string> | ko.Computed<string>;
        scriptLanguage: ko.Observable<string> | ko.Computed<string>;
        private _getReportUnit;
        private _update;
        surface: DevExpress.Reporting.Designer.Controls.ReportSurface;
        exportOptions: DevExpress.Reporting.Export.ExportOptions;
        isModelReady: ko.Computed<boolean>;
        scriptReferencesString: ko.Computed<string>;
        landscape: ko.Observable<boolean> | ko.Computed<boolean>;
        _scriptReferencesString: ko.Observable<string> | ko.Computed<string>;
        key: ko.Computed<string>;
        dataSourceRefs: Array<DevExpress.Reporting.Designer.Utils.IDataSourceRefInfo>;
        knownEnums?: Array<DevExpress.Reporting.IEnumType>;
        rtlLayout: ko.Observable<string> | ko.Computed<string>;
        drawWatermark: ko.Observable<boolean> | ko.Computed<boolean>;
        displayNameObject: ko.Observable<string>;
        _localizationItems: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.LocalizationItem>;
        _localization: DevExpress.Reporting.Designer.Internal.ReportLocalizationEngine;
        language: ko.Observable<string>;
    }
    export class ReportSurface extends SurfaceElementArea<DevExpress.Reporting.Designer.Controls.ReportViewModel, DevExpress.Reporting.Designer.Internal.ControlType> implements ISelectionTarget, ISurfaceContext {
        private report;
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<ReportViewModel>;
        private _createMargin;
        private _updateWatermarkImageNaturalSize;
        get _unitAbsoluteRect(): DevExpress.Analytics.Elements.IArea;
        dispose(): void;
        private _watermarkSubscriptions;
        get watermark(): DevExpress.Reporting.Designer.Controls.WatermarkModel;
        private _assignSelectedWatermark;
        constructor(report: DevExpress.Reporting.Designer.Controls.ReportViewModel, zoom?: ko.Observable<number>);
        surfaceContextMenuHandler: (selection: DevExpress.Analytics.Internal.SurfaceSelection, surface: DevExpress.Reporting.Designer.Controls.ReportSurface, e: PointerEvent) => void;
        getChildrenCollection(): ko.ObservableArray<DevExpress.Reporting.Designer.Bands.BandSurface>;
        isFit(dropTarget: DevExpress.Analytics.Internal.ISelectionTarget): boolean;
        canDrop(): boolean;
        wrapRtlProperty(data: {
            value: ko.Observable | ko.Computed;
        }, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine> | ko.Computed<DevExpress.Analytics.Utils.UndoEngine>, element: Element): {
            value: ko.Observable | ko.Computed;
        };
        clickHandler(selection: DevExpress.Analytics.Internal.SurfaceSelection, e: PointerEvent): void;
        reportContextMenuHandler(selection: DevExpress.Analytics.Internal.SurfaceSelection, e: PointerEvent): void;
        allowMultiselect: boolean;
        locked: boolean;
        focused: ko.Observable<boolean>;
        selected: ko.Observable<boolean>;
        templateName: ko.Observable<string>;
        bandsHolder: DevExpress.Reporting.Designer.Bands.Internal.BandsHolder;
        underCursor: ko.Observable<DevExpress.Analytics.Internal.IHoverInfo>;
        crossBandControls: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRCrossBandSurface>;
        measureUnit: ko.Observable<DevExpress.Analytics.Internal.MeasureUnit> | ko.Computed<DevExpress.Analytics.Internal.MeasureUnit>;
        zoom: ko.Observable<number> | ko.Computed<number>;
        margins: DevExpress.Analytics.Elements.IMargins;
        dpi: ko.Observable<number> | ko.Computed<number>;
        rtl: ko.Observable<boolean> | ko.Computed<boolean>;
        pageWidthWithoutMargins: ko.Computed<number>;
        ghostContainerOffset: ko.Computed<number>;
        checkParent(surfaceParent: DevExpress.Analytics.Internal.ISelectionTarget): boolean;
        effectiveHeight: ko.Computed<number>;
        minHeight: ko.Observable<number>;
        maxMarkerWidth: ko.Observable<number>;
        pageWidth: ko.Observable<number> | ko.Computed<number>;
        pageHeight: ko.Observable<number> | ko.Computed<number>;
        validationMode: ko.Observable<boolean>;
        parent: DevExpress.Analytics.Internal.ISelectionTarget;
        leftMarginOffset: ko.Computed<number>;
        rightMarginOffset: ko.Computed<number>;
        rightMarginResizableOffset: ko.Computed<number>;
        rightMarginResizeOptions: (undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine>, element: Element) => {};
        leftMarginResizeOptions: (undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine>, element: Element) => {};
        leftMarginResizableOffset: ko.Computed<number>;
        drawWatermark: ko.Observable<boolean> | ko.Computed<boolean>;
        _watermarkImageNaturalSize: ko.Observable<DevExpress.Analytics.Elements.INumericSize>;
        _watermarkTextRenderingResult: ko.Observable<string> | ko.Computed<string>;
    }
    export interface IReportControlMetadata extends IElementMetadata {
        defaultBindingName?: string;
        group?: "common" | "misc" | "complex" | "graphics" | "custom" | string;
        canPaste?: (dropTarget: DevExpress.Analytics.Internal.ISelectionTarget) => boolean;
    }
    export class ControlsFactory extends AnalyticControlsFactory<DevExpress.Reporting.Designer.Internal.ControlType> implements IDisposable {
        fieldListProvider: ko.Observable | ko.Computed;
        dispose(): void;
        private _expressionWrapper;
        private _beforePrintPrintOnPage;
        private _beforePrint;
        private _registerCommonExpressions;
        private _registerExtensions;
        constructor(fieldListProvider?: ko.Observable | ko.Computed);
        registerControl(typeName: DevExpress.Reporting.Designer.Internal.ControlType, metadata: DevExpress.Reporting.Designer.Controls.IReportControlMetadata): void;
        _createExpressionObject(typeName: DevExpress.Reporting.Designer.Internal.ControlType, expressions: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.IExpressionBinding>, path?: ko.Computed<string>, summaryRunning?: (name: string) => ko.Observable<boolean> | ko.Computed<boolean>): DevExpress.Reporting.Designer.Internal.IExpressionObject;
        setExpressionBinding(controlType: DevExpress.Reporting.Designer.Internal.ControlType, propertyName: string, events: string[], group?: string, objectProperties?: string[]): void;
        setPropertyDescription(controlType: DevExpress.Reporting.Designer.Internal.ControlType, propertyName: string, events: string[], group?: string, objectProperties?: string[]): void;
        setDisplayNameForExpression(propertyName: string, localizationId: string, displayName: string): void;
        hideExpressionBindings(type: DevExpress.Reporting.Designer.Internal.ControlType, ...propertyNames: string[]): void;
        hidePropertyDescriptions(type: DevExpress.Reporting.Designer.Internal.ControlType, ...propertyNames: string[]): void;
        inheritControl(parentType: DevExpress.Reporting.Designer.Internal.ControlType, extendedOptions: DevExpress.Analytics.Elements.IElementMetadata): DevExpress.Analytics.Elements.IElementMetadata;
        createPopularBindingInfo(options: DevExpress.Reporting.Designer.Controls.Metadata.ISerializationInfoWithBindings, isExpression?: boolean): DevExpress.Reporting.Designer.Controls.Metadata.ISerializationInfoWithBindings;
    }
    export const barCodesTypes: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
    export const circularValues: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
    export const linearValues: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
    export class XRGaugeViewModel extends XRControlViewModel {
        static bindings: string[];
        constructor(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        viewType: ko.Observable<string> | ko.Computed<string>;
        viewStyle: ko.Observable<string> | ko.Computed<string>;
    }
    export class XRPageInfoSurface extends XRControlSurface {
        constructor(control: XRPageInfoViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
    }
    export class XRPageInfoViewModel extends XRControlViewModel {
        constructor(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
    }
    export const pageInfoValuesMap: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    export const spartlineTypes: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    export function kindToString(kind: DevExpress.Reporting.Designer.Controls.CrossTab.CellKind): string;
    export class XRCrossTabCellViewModel extends XRControlViewModel implements ICrossTabCell {
        private parent;
        get namePrefix(): string;
        static cellKinds: {
            Header: DevExpress.Reporting.Designer.Controls.CrossTab.CellKind[];
            Total: DevExpress.Reporting.Designer.Controls.CrossTab.CellKind[];
            Data: DevExpress.Reporting.Designer.Controls.CrossTab.CellKind[];
        };
        private get _width();
        private get _height();
        private get _left();
        private get _top();
        private _text;
        private _textFormatString;
        private _showCellCode;
        private _oldFieldName;
        private _getDefaultName;
        private _testFieldName;
        private _createParametersExpressionCategory;
        constructor(model: object, parent: DevExpress.Reporting.Designer.Controls.XRCrossTabViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        getPath: (propertyName: string) => string;
        reset(): void;
        canRemove(): boolean;
        canDropDown(): boolean;
        canDropRight(): boolean;
        canDropUp(): boolean;
        canDropLeft(): boolean;
        getExpressionBinding(property: string, event: string): string;
        isPropertyVisible(name: string, isPopularProperty?: boolean): boolean;
        isPropertyModified(name: string): boolean;
        isPropertyDisabled(name: string): boolean;
        isBindable(): boolean;
        isIndependant(): boolean;
        isEditable(): boolean;
        createAndAssignNewField(fieldName: string, insertBefore: boolean, dataFieldLayout?: DevExpress.Reporting.Designer.Controls.CrossTab.DataFieldLayout): void;
        customizeExpressionCategories(tools: DevExpress.Analytics.Widgets.Internal.Tools, categories: DevExpress.Analytics.Widgets.Internal.IExpressionEditorCategory[]): void;
        fieldName: ko.Observable<string> | ko.Computed<string>;
        summaryType: any;
        summaryDisplayType: any;
        sortOrder: any;
        crossTabGroupInterval: any;
        crossTabGroupIntervalNumericRange: any;
        crossTabSortBySummaryInfo: any;
        _columnIndex: ko.Observable<number>;
        _rowIndex: ko.Observable<number>;
        _columnSpan: ko.Observable<number>;
        _rowSpan: ko.Observable<number>;
        name: ko.Observable<string> | ko.Computed<string>;
        text: ko.Observable<string> | ko.Computed<string>;
        dataLevel?: number;
        rowLevel?: number;
        columnLevel?: number;
        kind: ko.Observable<DevExpress.Reporting.Designer.Controls.CrossTab.CellKind>;
        field: ko.Observable<DevExpress.Reporting.Designer.Controls.CrossTabFieldModel>;
        dependentFields: DevExpress.Reporting.Designer.Controls.CrossTabFieldModel[];
        textFormatString: ko.Observable<string> | ko.Computed<string>;
        rowVisible: ko.Computed<boolean>;
        columnVisible: ko.Computed<boolean>;
        rowAutoHeightMode: ko.Observable<string>;
        columnAutoWidthMode: ko.Observable<string>;
        fieldNameAreValid: ko.Observable<boolean>;
    }
    export class XRCellsurface extends XRTextControlSurfaceBase<DevExpress.Reporting.Designer.Controls.XRControlViewModel> {
        constructor(control: DevExpress.Reporting.Designer.Controls.XRCrossTabCellViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        checkParent(surfaceParent: DevExpress.Analytics.Internal.ISelectionTarget): boolean;
        selectLine(selection: DevExpress.Analytics.Internal.ISelectionProvider, event?: {
            ctrlKey: boolean;
            metaKey: boolean;
        }, isRow?: boolean): void;
        cellClick(): void;
        isEditable(): boolean;
        private _getDropCallback;
        private _canSetFieldName;
        getAdornTemplate(): string;
        dragCallback(item: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel): void;
        findNextSelection(): DevExpress.Reporting.Designer.Controls.XRCrossTabSurface;
        controls: any;
        contenttemplate: string;
        showDropSurface: ko.Computed<boolean>;
        dropRect: DevExpress.Analytics.Elements.Rectangle;
        isDropTarget: ko.Observable<boolean>;
        dragCss: ko.Observable<string>;
        dropCallback: (treeListItem: DevExpress.Analytics.Widgets.Internal.ITreeListItemViewModel) => void;
    }
    export class XRCrossTabViewModel extends XRControlViewModel {
        private _getCreator;
        private _getArray;
        private _initStyles;
        private _calcSize;
        constructor(model: object, parent: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        removeChild(cell: DevExpress.Reporting.Designer.Controls.XRCrossTabCellViewModel): void;
        removeField(dataLevel: number, columnLevel: number, rowLevel: number): void;
        initialize(): void;
        updateLayout(): void;
        getFields(): DevExpress.Reporting.Designer.Controls.CrossTabFieldModel[];
        getNames(): {
            columnFields: string;
            rowFields: string;
            dataFields: string;
        };
        onDelete(): void;
        preInitProperties(): void;
        isPropertyDisabled(propertyName: string): boolean;
        applyCells(cellsInfo: DevExpress.Reporting.Designer.Controls.CrossTab.CrossTabCellInfo[], initOnly?: boolean): DevExpress.Reporting.Designer.Controls.XRCrossTabCellViewModel[];
        applyCell(from: DevExpress.Reporting.Designer.Controls.CrossTab.CrossTabCellInfo, to: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell): void;
        insertNewField(collectionName: string, insertPosition: number, fieldName: string, dataFieldLayout?: DevExpress.Reporting.Designer.Controls.CrossTab.DataFieldLayout): void;
        customizeExpressionCategories(tools: DevExpress.Analytics.Widgets.Internal.Tools, categories: DevExpress.Analytics.Widgets.Internal.IExpressionEditorCategory[]): void;
        getPath: (propertyName: string) => string;
        dependentStyles: DevExpress.Reporting.Designer.Controls.StyleModel[];
        dataSource: ko.Observable;
        width: ko.Computed<number>;
        height: ko.Computed<number>;
        _cells: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRCrossTabCellViewModel>;
        cells: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRCrossTabCellViewModel>;
        rowFields: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.CrossTabFieldModel>;
        columnFields: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.CrossTabFieldModel>;
        dataFields: ko.ObservableArray<CrossTabDataFieldModel>;
        _rowDefinitions: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.CrossTab.CrossTabRowDefinitionsModel>;
        _columnDefinitions: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.CrossTab.CrossTabColumnDefinitionsModel>;
        layoutOptions: CrossTabLayoutOptionsModel;
        cellCreator: DevExpress.Reporting.Designer.Controls.CrossTab.CellCreator;
        defenitionUpdater: DevExpress.Reporting.Designer.Controls.CrossTab.DefenitionUpdater;
        isModelReady: ko.Computed<boolean>;
        originalPivotGridLayout: ko.Observable<string>;
        controlParameters: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.ControlParameter>;
        filterString: any;
        _filterString: any;
    }
    export class CrossTabLayoutOptionsModel extends SerializableModel {
        parent: DevExpress.Reporting.Designer.Controls.XRCrossTabViewModel;
        constructor(model: object, parent: DevExpress.Reporting.Designer.Controls.XRCrossTabViewModel, serializer: DevExpress.Analytics.Utils.ModelSerializer);
        isPropertyDisabled(name: string): boolean;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        cornerHeaderDisplayMode: ko.Observable<string>;
        dataFieldLayout: ko.Observable<string>;
        columnTotalsPosition: ko.Observable<string>;
        rowTotalsPosition: ko.Observable<string>;
        columnTotalHeaderPosition: ko.Observable<string>;
        rowTotalHeaderPosition: ko.Observable<string>;
        hierarchicalRowLayout: ko.Observable<boolean>;
    }
    export class CrossTabFieldModel extends SerializableModel {
        constructor(model: object, parent: DevExpress.Reporting.Designer.Controls.XRCrossTabViewModel, serializer: DevExpress.Analytics.Utils.ModelSerializer, name: string);
        setFieldName(fullPath: string): void;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        getPath: (propertyName: string) => string;
        isPropertyDisabled: (propertyName: string) => boolean;
        parent: DevExpress.Reporting.Designer.Controls.XRCrossTabViewModel;
        name: ko.Computed<string>;
        fieldName: ko.Observable<string>;
        crossTabSortBySummaryInfo: any;
    }
    export class CrossTabDataFieldModel extends CrossTabFieldModel {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class XRCrossTabSurface extends XRControlSurface {
        constructor(control: DevExpress.Reporting.Designer.Controls.XRCrossTabViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        selectLine(selection: DevExpress.Analytics.Internal.ISelectionProvider<ControlType>, cell: DevExpress.Reporting.Designer.Controls.XRCrossTabCellViewModel, isMultiSelect: boolean, isRow: boolean): void;
        controls: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRCellsurface>;
    }
    export class XRPageBreakSurface extends XRControlSurfaceBase<DevExpress.Reporting.Designer.Controls.XRControlViewModel> {
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<XRControlViewModel>;
        preInitProperties(control: any, context: any): void;
        constructor(control: DevExpress.Reporting.Designer.Controls.XRControlViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        get isIntersectionDeny(): boolean;
        linePosition: any;
        lineHeight: ko.Computed<number>;
    }
    class FrameOptionsModel extends SerializableModel {
        constructor(model: any, serializer: DevExpress.Analytics.Utils.IModelSerializer, info: DevExpress.Analytics.Utils.ISerializationInfoArray, barCode: DevExpress.Reporting.Designer.Controls.XRBarCodeViewModel);
        padding: ko.Observable<string>;
        paddingObj: DevExpress.Analytics.Elements.PaddingModel;
    }
    export class BarCodeSymbology extends SerializableModel {
        createFrameOptions(model: any, barCode: DevExpress.Reporting.Designer.Controls.XRBarCodeViewModel, serializer?: DevExpress.Analytics.Utils.IModelSerializer): FrameOptionsModel;
        constructor(model: any, serializer: DevExpress.Analytics.Utils.IModelSerializer, info: DevExpress.Analytics.Utils.ISerializationInfoArray, barCode: DevExpress.Reporting.Designer.Controls.XRBarCodeViewModel);
        isPropertyDisabled(propertyName: any): boolean;
        dispose(): void;
        name: ko.Observable<string>;
        logo?: ko.Observable<DevExpress.Reporting.ImageSource>;
        pharmacodeType?: ko.Observable<string>;
        startSymbol?: ko.Observable<string>;
        stopSymbol?: ko.Observable<string>;
        frameOptionsFake?: any;
        frameOptions?: ko.Observable<FrameOptionsModel>;
    }
    export {};
    export class XRBarCodeViewModel extends XRControlViewModel {
        static unitProperties: any[];
        createBarcode(model: any, serializer?: any): DevExpress.Reporting.Designer.Controls.BarCodeSymbology;
        constructor(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        dispose(): void;
        symbology: ko.Observable<DevExpress.Reporting.Designer.Controls.BarCodeSymbology>;
        barcodeFake: any;
    }
    export class XRCharacterComb extends XRControlViewModel {
        static unitProperties: any[];
        isPropertyDisabled(name: string): any;
        private _createCellSideFromOriginalSide;
        constructor(control: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        roundSize(): void;
        font: ko.Observable<string> | ko.Computed<string>;
        cellWidth: ko.Computed<number>;
        cellHeight: ko.Computed<number>;
        autoCellSide: ko.Observable<number> | ko.Computed<number>;
        verticalSpacing: ko.Observable<number> | ko.Computed<number>;
        horizontalSpacing: ko.Observable<number> | ko.Computed<number>;
        textAlignment: ko.Observable<string> | ko.Computed<string>;
        sizeMode: ko.Observable<string> | ko.Computed<string>;
    }
    export class XRCharacterCombSurface extends XRControlSurface {
        private _createCell;
        private _updateCellsText;
        private _getBorderWidthBySpacing;
        private _applyBounds;
        updateArray(cellsCount: number, array?: Array<any>): void;
        fitBoundsToText(): void;
        constructor(control: XRCharacterComb, context: DevExpress.Analytics.Elements.ISurfaceContext);
        getText(): string;
        borderWidth: ko.Computed<number>;
        borders: ko.Observable<string> | ko.Computed<string>;
        verticalSpacing: ko.Observable<number> | ko.Computed<number>;
        horizontalSpacing: ko.Observable<number> | ko.Computed<number>;
        fullCellWidth: ko.Computed<number>;
        fullCellHeight: ko.Computed<number>;
        cellSize: DevExpress.Analytics.Elements.ISize;
        rtl: () => boolean;
        vertical: ko.Computed<number>;
        horizontal: ko.Computed<number>;
        topEmptySpace: ko.Computed<number>;
        leftEmptySpace: ko.Computed<number>;
        cells: ko.ObservableArray<any>;
    }
    export class XRLineSurface extends XRControlSurface {
        constructor(control: DevExpress.Reporting.Designer.Controls.XRControlViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        linePosition: any;
    }
    export class XRSparklineViewModel extends XRControlViewModel {
        createView(model: any, serializer?: any): {
            type: ko.Observable<any>;
            getInfo: () => any;
        };
        constructor(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        getPath(propertyName: any): any;
        view: any;
        dataSource: ko.Observable<any>;
        dataMember: ko.Observable<string> | ko.Computed<string>;
        sparklineFake: any;
        valueMember: ko.Observable<string> | ko.Computed<string>;
    }
    export class XRSparkLineSurface extends TodoControlSurface {
        constructor(control: DevExpress.Reporting.Designer.Controls.XRControlViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
    }
    export class XRZipCodeSurface extends XRControlSurface {
        constructor(control: DevExpress.Reporting.Designer.Controls.XRControlViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        fontSize: ko.Computed<number>;
        letterSpacing: ko.Computed<number>;
    }
    export class XRUnknownControlSurface extends XRControlSurface {
        constructor(control: DevExpress.Reporting.Designer.Controls.XRControlViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        isLoading: ko.Observable<boolean>;
        imageSrc: ko.Observable<string>;
        error: ko.Observable<string>;
        private getValue;
        private _getParentStyles;
        private _applyParentStyles;
    }
}
declare module DevExpress.Reporting.Designer.Widgets {
    import IExpressionEditorFunction = DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction;
    import EditorTemplates = DevExpress.Analytics.Widgets.EditorTemplates;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import IItemsProvider = DevExpress.Analytics.Utils.IItemsProvider;
    import XRReportElementViewModel = DevExpress.Reporting.Designer.Controls.XRReportElementViewModel;
    import WrappedExpressionOptions = DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions;
    import getParentContainer = DevExpress.Analytics.Internal.getParentContainer;
    import UndoEngine = DevExpress.Analytics.Utils.UndoEngine;
    import ExpressionEditor = DevExpress.Analytics.Widgets.ExpressionEditor;
    import PopupEditorBase = DevExpress.Analytics.Widgets.Internal.PopupEditorBase;
    import ResizeHelper = DevExpress.Analytics.Widgets.Internal.ResizeHelper;
    import IExpressionObject = DevExpress.Reporting.Designer.Internal.IExpressionObject;
    import ReportExpressionEditorAdapter = DevExpress.Reporting.Designer.Widgets.ReportExpressionEditorAdapter;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import Editor = DevExpress.Analytics.Widgets.Editor;
    import DataSource = DevExpress.data.DataSource;
    import FieldListEditor = DevExpress.Analytics.Widgets.FieldListEditor;
    import GroupObject = DevExpress.Analytics.Internal.GroupObject;
    import StyleModel = DevExpress.Reporting.Designer.Controls.StyleModel;
    import ReportViewModel = DevExpress.Reporting.Designer.Controls.ReportViewModel;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import BandViewModel = DevExpress.Reporting.Designer.Bands.BandViewModel;
    import IDataSourceInfo = DevExpress.Analytics.Internal.IDataSourceInfo;
    import TreeListController = DevExpress.Analytics.Widgets.Internal.TreeListController;
    import Parameter = DevExpress.Reporting.Designer.Data.Parameter;
    import IEditorViewModel = DevExpress.Analytics.Widgets.IEditorViewModel;
    import DataSourceHelper = DevExpress.Reporting.Designer.Internal.DataSourceHelper;
    import ObjectExplorerProvider = DevExpress.Analytics.Internal.ObjectExplorerProvider;
    import ObjectStructureTreeListController = DevExpress.Analytics.Internal.ObjectStructureTreeListController;
    import FontEditor = DevExpress.Analytics.Widgets.FontEditor;
    import ObjectProperties = DevExpress.Analytics.Widgets.ObjectProperties;
    import IDisplayNameProvider = DevExpress.Analytics.Utils.IDisplayNameProvider;
    import IKoCollectionEditorOptions = DevExpress.Analytics.Widgets.Internal.IKoCollectionEditorOptions;
    import IFileUploadResult = DevExpress.Analytics.Internal.IFileUploadResult;
    import dxFileImagePicker = DevExpress.Analytics.Widgets.Internal.dxFileImagePicker;
    import IDisplayedObject = DevExpress.Analytics.Internal.IDisplayedObject;
    import PropertyGridEditor = DevExpress.Analytics.Widgets.PropertyGridEditor;
    import ReportExpressionEditor = DevExpress.Reporting.Designer.Widgets.ReportExpressionEditor;
    import ReportExpressionEditorWrapper = DevExpress.Reporting.Designer.Widgets.ReportExpressionEditorWrapper;
    import IKeyValuePair = DevExpress.Reporting.IKeyValuePair;
    import INavigateTab = DevExpress.Reporting.Designer.Tools.INavigateTab;
    import SummaryEditorModel = DevExpress.Reporting.Designer.Widgets.Internal.SummaryEditorModel;
    import SummaryEditorPopup = DevExpress.Reporting.Designer.Widgets.Internal.SummaryEditorPopup;
    import NameEditor = DevExpress.Reporting.Designer.Widgets.NameEditor;
    export const reportFunctionDisplay: DevExpress.Analytics.Widgets.Internal.IExpressionEditorFunction[];
    export const designerEditorTemplates: DevExpress.Analytics.Widgets.EditorTemplates<ReportDesignerEditors>;
    export {};
    export class ReportExpressionEditorAdapter extends Disposable {
        private values;
        value: ko.Observable<DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions> | ko.Computed<DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions>;
        private _relatedControlClassName;
        private _onHidingPopup;
        private _onShowingPopup;
        constructor(values: ko.Observable<any[]> | ko.Computed<any[]>, value: ko.Observable<DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions> | ko.Computed<DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions>);
        patchOptions(reportExplorerProvider: DevExpress.Analytics.Utils.IItemsProvider, editableObject: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel): boolean;
        private _createReportItems;
        private _createValuesTab;
        popupVisible: ko.Observable<boolean>;
    }
    export interface IExpressionEditorProperty {
        propertyName: string;
        displayName: string;
        isSelected?: ko.Observable<boolean> | ko.Computed<boolean>;
        isBinded?: () => boolean;
        collapsed?: ko.Observable<boolean> | ko.Computed<boolean>;
        content?: DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions;
        items?: IExpressionEditorProperty[];
        templateName?: string;
        value?: ko.Observable<any>;
        click?: () => void;
    }
    export class ReportExpressionEditorWrapper extends PopupEditorBase {
        control: ko.Observable;
        value: ko.Observable<DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions> | ko.Computed<DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions>;
        _allProperties: IExpressionEditorProperty[];
        _undoEngine: DevExpress.Analytics.Utils.UndoEngine;
        constructor(control: ko.Observable, value: ko.Observable<DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions> | ko.Computed<DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions>);
        save(sender: any): void;
        apply(sender: any): boolean;
        onShowing(e: any): void;
        resizeAceEditor(): void;
        onHiding(e: any): void;
        createExpressionEditorProperties(expressionObj: DevExpress.Reporting.Designer.Internal.IExpressionObject, properties: any, selected: any): any;
        switchExpression(property: IExpressionEditorProperty): void;
        updateExpression(expression: any): void;
        resizeHelper: DevExpress.Analytics.Widgets.Internal.ResizeHelper;
        title: () => string;
        getPopupContainer: typeof DevExpress.Analytics.Internal.getParentContainer;
        adapter: ko.Observable<DevExpress.Reporting.Designer.Widgets.ReportExpressionEditorAdapter>;
        editor: ko.Observable<DevExpress.Analytics.Widgets.ExpressionEditor>;
        properties: ko.Observable<IExpressionEditorProperty[]>;
        currentProperty: IExpressionEditorProperty;
    }
    export class EditOptionsEditorNameEditorModel extends Editor {
        constructor(modelPropertyInfo: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Observable<boolean>, textToSearch?: any);
        itemsProvider: DevExpress.Analytics.Utils.IItemsProvider;
        displayValue: ko.Observable<string>;
    }
    export class DataSourceSelectBox extends Editor {
        static createDataSource(values: any): DevExpress.data.DataSource;
        getValues(): ko.Computed<DevExpress.data.DataSource>;
        dataSource: ko.Computed<DevExpress.data.DataSource>;
    }
    export class ReportFieldListEditor extends FieldListEditor {
        constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    }
    export class LinesEditor extends Editor {
        collapsed: ko.Observable<boolean>;
        protected _shouldSkipHighlighting(propertyName: string): boolean;
    }
    export const groups: DevExpress.Analytics.Internal.GroupObject;
    export class StylesEditorHeaderModel {
        private _report;
        static newItem: string;
        static newItemTextId: string;
        get styles(): ko.ObservableArray<DevExpress.Reporting.Designer.Controls.StyleModel>;
        constructor(styleName: ko.Observable<string>, _report: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel>, disabled: ko.Observable<boolean>, popupContainer: string);
        items: ko.Computed<DevExpress.Reporting.Designer.Controls.StyleModel[]>;
        value: any;
        onValueChanged: (e: any) => void;
        displayExpr: string;
        valueExpr: string;
        displayCustomValue: boolean;
        encodeNoDataText: boolean;
        placeholder: any;
        noDataText: any;
        disabled: ko.Observable<boolean> | ko.Computed<boolean>;
        dropDownOptions: any;
    }
    export const dataBindingsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class BandEditorBase extends Editor {
        generateValue: (bands: (filter?: any, noneNeaded?: any) => ko.Computed<any>) => any;
        bands: any;
        filter: (item: DevExpress.Reporting.Designer.Bands.BandViewModel) => boolean;
        noneNeaded: boolean;
    }
    export class RunningBandEditor extends BandEditorBase {
        filter: (item: DevExpress.Reporting.Designer.Bands.BandViewModel) => boolean;
        noneNeaded: boolean;
    }
    export class BandsEditor extends BandEditorBase {
        filter: (item: DevExpress.Reporting.Designer.Bands.BandViewModel) => boolean;
        noneNeaded: boolean;
    }
    export class SortingBandEditor extends BandEditorBase {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        filter: (item: DevExpress.Reporting.Designer.Bands.BandViewModel) => boolean;
        noneNeaded: boolean;
    }
    export class PageBreakBandEditor extends Editor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        values: ko.Computed<{
            displayValue: string;
            value: string;
        }[]>;
    }
    export class ChartValueBindingEditor extends Editor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        generateDisplayValue(reportDataSource: ko.Observable<DevExpress.Analytics.Internal.IDataSourceInfo>): string;
        generateValue(undoEngine: DevExpress.Analytics.Utils.UndoEngine, reportParameters: ko.ObservableArray<DevExpress.Reporting.Designer.Data.Parameter>, reportDataSource: ko.Observable<DevExpress.Analytics.Internal.IDataSourceInfo>): ko.Observable<string> | ko.Computed<string>;
        treeListController: DevExpress.Analytics.Widgets.Internal.TreeListController;
        binding: ko.Observable<string> | ko.Computed<string>;
        displayBinding: ko.Observable<string> | ko.Computed<string>;
    }
    export interface IDataSourceEditorViewModel extends IEditorViewModel {
        getEditorOptions: (dataSourceHelper: ko.Observable<DevExpress.Reporting.Designer.Internal.DataSourceHelper>, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine>, popupContainer: string) => any;
    }
    export class DataSourceEditor extends Editor {
        private _getEditorOptions;
        createViewModel(): DevExpress.Analytics.Widgets.IEditorViewModel;
        dispose(): void;
        getEditorOptions(dataSourceHelper: ko.Observable<DevExpress.Reporting.Designer.Internal.DataSourceHelper>, undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine>, popupContainer: string): any;
    }
    export class ExplorerEditor extends Editor {
        constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        private _collectionNames;
        private _isEqualModel;
        private _isVisible;
        treeListController: DevExpress.Analytics.Internal.ObjectStructureTreeListController;
        displayExpr: ko.Observable<string> | ko.Computed<string>;
        itemsProvider: DevExpress.Analytics.Internal.ObjectExplorerProvider;
    }
    export class DrillDownEditor extends ExplorerEditor {
        private _setDisabled;
        private _findFistAvailableBand;
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        path: ko.Observable<any>;
    }
    export class ExpressionableFontEditor extends FontEditor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        createObjectProperties(): DevExpress.Analytics.Widgets.ObjectProperties;
    }
    export class FieldsComboboxEditor extends FieldListEditor {
        private _createItem;
        private _updateValues;
        wrapValues(displayNameProvider: ko.Observable<DevExpress.Analytics.Utils.IDisplayNameProvider>): any;
        wrappedValues: any;
    }
    export class FormatStringEditor extends Editor {
        get actions(): DevExpress.Analytics.Widgets.IFormatStringEditorActions;
        get customPatterns(): {
            [key: string]: string[];
        };
    }
    export class FormattingRuleEditor extends Editor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        options: DevExpress.Analytics.Widgets.Internal.IKoCollectionEditorOptions;
    }
    export class GaugeStyleEditor extends Editor {
        private _viewModel;
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        update(viewModel: any): void;
    }
    export class dxImageSourceEditor extends dxFileImagePicker {
        constructor(element: any, options?: any);
        _toggleReadOnlyState(): void;
        _handleResult(result: DevExpress.Analytics.Internal.IFileUploadResult): void;
    }
    export interface INameEditorViewModel extends IEditorViewModel {
        generateRules: (rules: any) => any;
    }
    export class NameEditor extends Editor {
        createViewModel(): DevExpress.Analytics.Widgets.IEditorViewModel;
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        _getEditorValidationRules(): any[];
        _filterControls(controls: DevExpress.Analytics.Internal.IDisplayedObject[]): DevExpress.Analytics.Internal.IDisplayedObject[];
        generateRules(allControls: ko.ObservableArray<DevExpress.Analytics.Internal.IDisplayedObject>): any[];
        currentValidationRules: ko.Observable<any[]>;
    }
    export class PivotGridCriteriaEditor extends Editor {
        private _createItemsProvider;
        private _getFieldName;
        private _createDisplayNameProvider;
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        wrapModel(fieldListProvider: any): this;
        itemsProvider: DevExpress.Analytics.Utils.IItemsProvider;
        displayNameProvider: DevExpress.Analytics.Utils.IDisplayNameProvider;
    }
    export class ContentByTypeEditor extends PropertyGridEditor {
        createObjectProperties(): DevExpress.Analytics.Widgets.ObjectProperties;
        _getViewModel(): ko.Computed<any>;
        hideCollapsingButton: ko.Observable<boolean>;
    }
    export class DataBindingsEditor extends PropertyGridEditor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        createObjectProperties(): DevExpress.Analytics.Widgets.ObjectProperties;
    }
    export class DataBindingEditor extends FieldListEditor {
        get actions(): DevExpress.Analytics.Widgets.IFormatStringEditorActions;
        get customPatterns(): {
            [key: string]: string[];
        };
    }
    export class FontEditorUndo extends PropertyGridEditor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        generateValue(undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine>): DevExpress.Analytics.Widgets.ObjectProperties;
        createObjectProperties(): DevExpress.Analytics.Widgets.ObjectProperties;
        undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine>;
    }
    export class ReportExpressionEditor extends Editor {
        private _adapter;
        constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        patchOptions(reportExplorerProvider: any, editableObject: any): boolean;
        popupVisible: ko.Observable<boolean>;
        value: ko.Computed<DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions>;
    }
    export class ReportComplexExpressionEditor extends ReportExpressionEditor {
        wrapper: DevExpress.Reporting.Designer.Widgets.ReportExpressionEditorWrapper;
        constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        showPopup(editableObject: any): void;
        editorTemplateName: string;
    }
    export class ReportUrlEditor extends Editor {
        private _initUrls;
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        getValues(urls: ko.ObservableArray<DevExpress.Reporting.IKeyValuePair<string>>, tab: ko.Observable<DevExpress.Reporting.Designer.Tools.INavigateTab>): ko.Computed<DevExpress.data.DataSource>;
        updateUrls(): void;
        urls: ko.Computed<DevExpress.Reporting.IKeyValuePair<string>[]> | ko.Observable<DevExpress.Reporting.IKeyValuePair<string>[]>;
        dataSource: ko.Computed<DevExpress.data.DataSource>;
    }
    export class SummaryEditor extends PropertyGridEditor {
        dispose(): void;
        getPopupServiceActions(): DevExpress.Analytics.Internal.IModelAction[];
        summaryModel: DevExpress.Reporting.Designer.Widgets.Internal.SummaryEditorModel;
        popup: DevExpress.Reporting.Designer.Widgets.Internal.SummaryEditorPopup;
    }
    export class ComboboxUndoEditor extends Editor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        generateValue(undoEngine: ko.Observable<DevExpress.Analytics.Utils.UndoEngine>): ko.Observable<any> | ko.Computed<any>;
        undoValue: ko.Observable | ko.Computed;
    }
    export class WatermarkIdEditor extends NameEditor {
        constructor(info: DevExpress.Analytics.Utils.ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
        _filterControls(allControls: any): any;
    }
    export function registerEditors(): void;
    export class dxRichTextFileEditor extends dxFileImagePicker {
        constructor(element: any, options?: any);
        _handleResult(result: DevExpress.Analytics.Internal.IFileUploadResult): void;
    }
}
declare module DevExpress.Reporting {
    import IPreviewExportOptionsCustomizationArgs = DevExpress.Reporting.Viewer.Utils.IPreviewExportOptionsCustomizationArgs;
    export interface IEnumType {
        enumType: string;
        values: Array<IEnumValue>;
    }
    export interface IEnumValue {
        displayName: string;
        name: string;
        value: any;
    }
    export class ImageSource {
        sourceType: string;
        data: string;
        constructor(sourceType: string, data: string);
        getDataUrl(): string;
        static parse(val: string): ImageSource;
        static toString(val: ImageSource): string;
    }
    export interface IKeyValuePair<T> {
        Key: string;
        Value: T;
    }
    export function convertMapToKeyValuePair(object: any): any[];
    export class CustomizeExportOptionsEventArgs {
        constructor(options: DevExpress.Reporting.Viewer.Utils.IPreviewExportOptionsCustomizationArgs);
        HideExportOptionsPanel(): void;
        HideFormat(format: any): void;
        HideProperties(format: any, ...paths: (string | string[])[]): void;
        GetExportOptionsModel(format: any): any;
        _options: DevExpress.Reporting.Viewer.Utils.IPreviewExportOptionsCustomizationArgs;
    }
    export const version = "%VERSION%";
    export {};
    export class EventGenerator {
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
}
declare module DevExpress.Reporting.Export.Metadata {
    import IDisplayedValue = DevExpress.Analytics.Utils.IDisplayedValue;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import fromEnum = DevExpress.Analytics.Utils.fromEnum;
    import parseBool = DevExpress.Analytics.Utils.parseBool;
    export const pageBorderColor: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pageBorderWidth: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pageRange: DevExpress.Analytics.Utils.ISerializationInfo;
    export const expotOptionsTitle: DevExpress.Analytics.Utils.ISerializationInfo;
    export const htmlTableLayout: DevExpress.Analytics.Utils.ISerializationInfo;
    export const docxTableLayout: DevExpress.Analytics.Utils.ISerializationInfo;
    export const allowURLsWithJSContent: DevExpress.Analytics.Utils.ISerializationInfo;
    export const rasterizationResolution: DevExpress.Analytics.Utils.ISerializationInfo;
    export const rasterizeImages: DevExpress.Analytics.Utils.ISerializationInfo;
    export const useHRefHyperlinks: DevExpress.Analytics.Utils.ISerializationInfo;
    export const exportWatermarks: DevExpress.Analytics.Utils.ISerializationInfo;
    export const inlineCss: DevExpress.Analytics.Utils.ISerializationInfo;
    export const removeSecondarySymbols: DevExpress.Analytics.Utils.ISerializationInfo;
    export const characterSet: DevExpress.Analytics.Utils.ISerializationInfo;
    export function getExportModeValues(format?: string, preview?: boolean, merged?: boolean): Array<DevExpress.Analytics.Utils.IDisplayedValue>;
    export const exportPageBreaks: DevExpress.Analytics.Utils.ISerializationInfo;
    export const rtfExportMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const docxExportMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const htmlExportMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const embedImagesInHTML: DevExpress.Analytics.Utils.ISerializationInfo;
    export const imageExportMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const xlsExportMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const xlsxExportMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const textExportMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const xlsTextExportMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const csvTextSeparator: DevExpress.Analytics.Utils.ISerializationInfo;
    export const useCustomSeparator: DevExpress.Analytics.Utils.ISerializationInfo;
    export const textEncodingType: DevExpress.Analytics.Utils.ISerializationInfo;
    export const xlsExportHyperlinks: DevExpress.Analytics.Utils.ISerializationInfo;
    export const xlsRawDataMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const xlsShowGridLines: DevExpress.Analytics.Utils.ISerializationInfo;
    export const xlsExportOptionsSheetName: DevExpress.Analytics.Utils.ISerializationInfo;
    export const csvExportOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const rtfExportOptionsSerializationInfoBase: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const emptyFirstPageHeaderFooter: DevExpress.Analytics.Utils.ISerializationInfo;
    export const keepRowHeight: DevExpress.Analytics.Utils.ISerializationInfo;
    export const rtfExportOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const docxDocumentOptions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const docxExportOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const nativeFormatOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const additionalRecipients: DevExpress.Analytics.Utils.ISerializationInfo;
    export const emailOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const htmlExportOptionsSerializationInfoBase: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const htmlExportOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const imageExportOptionsSerializationInfoBase: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const imageExportOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const mhtExportOptionsSerializationInfoBase: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const mhtExportOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const pdfACompatibilityValues: {
        None: string;
        PdfA1a: string;
        PdfA1b: string;
        PdfA2a: string;
        PdfA2b: string;
        PdfA3a: string;
        PdfA3b: string;
    };
    export const pdfACompatibility: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: string;
        from: typeof DevExpress.Analytics.Utils.fromEnum;
        valuesArray: {
            value: string;
            displayValue: string;
            localizationId: string;
        }[];
    };
    export const pdfUACompatibilityValues: {
        None: string;
        PdfUA1: string;
    };
    export const pdfUACompatibility: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: string;
        from: typeof DevExpress.Analytics.Utils.fromEnum;
        valuesArray: {
            value: string;
            displayValue: string;
            localizationId: string;
        }[];
    };
    export const showPrintDialogOnOpen: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        defaultVal: boolean;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        from: typeof DevExpress.Analytics.Utils.parseBool;
    };
    export const pdfExportOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const printPreviewOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const textExportOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const xlsExportOptionsSerializationInfoCommon: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const xlsExportOptionsSerializationInfoBase: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const xlsExportOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const xlsxExportOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const exportOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
}
declare module DevExpress.Reporting.Export {
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import IModelSerializer = DevExpress.Analytics.Serializer.Native.IModelSerializer;
    import BaseRenderingMultiplatformModel = DevExpress.Analytics.Serializer.Native.BaseRenderingMultiplatformModel;
    import IViewModel = DevExpress.Analytics.Serializer.Native.IViewModel;
    import MultiPlatformObservable = DevExpress.Analytics.Serializer.Native.MultiPlatformObservable;
    import ISerializableModel = DevExpress.Analytics.Utils.ISerializableModel;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import PdfPasswordSecurityOptions = DevExpress.Reporting.Export.PdfPasswordSecurityOptions;
    import IModel = DevExpress.Analytics.Serializer.Native.IModel;
    import CsvExportOptions = DevExpress.Reporting.Export.CsvExportOptions;
    import DocxExportOptions = DevExpress.Reporting.Export.DocxExportOptions;
    import HtmlExportOptions = DevExpress.Reporting.Export.HtmlExportOptions;
    import ImageExportOptions = DevExpress.Reporting.Export.ImageExportOptions;
    import MhtExportOptions = DevExpress.Reporting.Export.MhtExportOptions;
    import PdfExportOptions = DevExpress.Reporting.Export.PdfExportOptions;
    import PrintPreviewOptions = DevExpress.Reporting.Export.PrintPreviewOptions;
    import RtfExportOptions = DevExpress.Reporting.Export.RtfExportOptions;
    import TextExportOptions = DevExpress.Reporting.Export.TextExportOptions;
    import XlsExportOptions = DevExpress.Reporting.Export.XlsExportOptions;
    import XlsxExportOptions = DevExpress.Reporting.Export.XlsxExportOptions;
    export class CsvExportOptions extends BaseRenderingMultiplatformModel<DevExpress.Analytics.Serializer.Native.IViewModel> {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DevExpress.Reporting.Export.CsvExportOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer);
        isPropertyDisabled(name: string): boolean;
        _separatorValue: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
        useCustomSeparator: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<boolean>;
        separator: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
        defaultSeparatorValue: string;
    }
    export class DocxExportDocumentOptions {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DocxExportDocumentOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer);
    }
    export const docxExportDocumentOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class DocxExportOptions extends BaseRenderingMultiplatformModel<DevExpress.Analytics.Serializer.Native.IViewModel> {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DevExpress.Reporting.Export.DocxExportOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        docxExportMode: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
        tableLayout: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<boolean>;
    }
    export class AdditionalRecipientModel implements ISerializableModel {
        static createNew: () => AdditionalRecipientModel;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer);
    }
    export const additionalRecipientSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class HtmlExportOptions extends BaseRenderingMultiplatformModel<DevExpress.Analytics.Serializer.Native.IViewModel> {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DevExpress.Reporting.Export.HtmlExportOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        htmlExportMode: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
    }
    export class ImageExportOptions extends BaseRenderingMultiplatformModel<DevExpress.Analytics.Serializer.Native.IViewModel> {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DevExpress.Reporting.Export.ImageExportOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        imageExportMode: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
    }
    export class MhtExportOptions extends BaseRenderingMultiplatformModel<DevExpress.Analytics.Serializer.Native.IViewModel> {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DevExpress.Reporting.Export.MhtExportOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        htmlExportMode: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
    }
    export class PdfPermissionsOptions {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): PdfPermissionsOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer);
    }
    export const pdfExportPermissionsOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class PdfPasswordSecurityOptions extends BaseRenderingMultiplatformModel<DevExpress.Analytics.Serializer.Native.IViewModel> {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DevExpress.Reporting.Export.PdfPasswordSecurityOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        hasSensitiveData(): boolean;
        openPassword: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
        permissionsPassword: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
    }
    export const pdfEncryptionLevel: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pdfExportPasswordSecurityOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class PdfExportDocumentOptions {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): PdfExportDocumentOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer);
    }
    export const author: DevExpress.Analytics.Utils.ISerializationInfo;
    export const application: DevExpress.Analytics.Utils.ISerializationInfo;
    export const title: DevExpress.Analytics.Utils.ISerializationInfo;
    export const subject: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pdfExportDocumentOptionsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class PdfExportOptions extends BaseRenderingMultiplatformModel<DevExpress.Analytics.Serializer.Native.IViewModel> {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DevExpress.Reporting.Export.PdfExportOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        isPropertyDisabled(propertyName: string): boolean;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        hasSensitiveData(): boolean;
        pdfACompatibility: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
        pdfUACompatibility: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
        showPrintDialogOnOpen: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<boolean>;
        pdfPasswordSecurityOptions: DevExpress.Reporting.Export.PdfPasswordSecurityOptions;
    }
    export class PrintPreviewOptions {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DevExpress.Reporting.Export.PrintPreviewOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer);
    }
    export class RtfExportOptions extends BaseRenderingMultiplatformModel<DevExpress.Analytics.Serializer.Native.IViewModel> {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DevExpress.Reporting.Export.RtfExportOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        rtfExportMode: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
    }
    export class TextExportOptions {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DevExpress.Reporting.Export.TextExportOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer);
    }
    export class XlsExportOptions extends BaseRenderingMultiplatformModel<DevExpress.Analytics.Serializer.Native.IViewModel> {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DevExpress.Reporting.Export.XlsExportOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        hasSensitiveData(): boolean;
        xlsExportMode: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
        encryptionOptions: DevExpress.Analytics.Serializer.Native.IModel & {
            password: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
        };
    }
    export class XlsxExportOptions extends BaseRenderingMultiplatformModel<DevExpress.Analytics.Serializer.Native.IViewModel> {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): DevExpress.Reporting.Export.XlsxExportOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        hasSensitiveData(): boolean;
        xlsxExportMode: ko.Observable<string> | ko.Computed<string>;
        encryptionOptions: DevExpress.Analytics.Serializer.Native.IModel & {
            password: ko.Observable<string>;
        };
    }
    export class ExportOptions {
        static from(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): ExportOptions;
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        deserialize(model: any, serializer?: DevExpress.Analytics.Serializer.Native.IModelSerializer): this;
        csv: DevExpress.Reporting.Export.CsvExportOptions;
        html: DevExpress.Reporting.Export.HtmlExportOptions;
        image: DevExpress.Reporting.Export.ImageExportOptions;
        mht: DevExpress.Reporting.Export.MhtExportOptions;
        pdf: DevExpress.Reporting.Export.PdfExportOptions;
        printPreview: DevExpress.Reporting.Export.PrintPreviewOptions;
        rtf: DevExpress.Reporting.Export.RtfExportOptions;
        textExportOptions: DevExpress.Reporting.Export.TextExportOptions;
        xls: DevExpress.Reporting.Export.XlsExportOptions;
        xlsx: DevExpress.Reporting.Export.XlsxExportOptions;
        docx: DevExpress.Reporting.Export.DocxExportOptions;
    }
}
declare module DevExpress.Reporting.Designer.Bands {
    import ISurfaceContext = DevExpress.Analytics.Elements.ISurfaceContext;
    import Margins = DevExpress.Analytics.Elements.Margins;
    import SerializableModel = DevExpress.Analytics.Elements.SerializableModel;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import IModelSerializer = DevExpress.Analytics.Utils.IModelSerializer;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import ISerializableModel = DevExpress.Analytics.Utils.ISerializableModel;
    import ElementViewModel = DevExpress.Analytics.Elements.ElementViewModel;
    import ModelSerializer = DevExpress.Analytics.Utils.ModelSerializer;
    import GroupFieldModel = DevExpress.Reporting.Designer.Bands.GroupFieldModel;
    import MultiColumn = DevExpress.Reporting.Designer.Bands.MultiColumn;
    import BandSurface = DevExpress.Reporting.Designer.Bands.BandSurface;
    import BandViewModel = DevExpress.Reporting.Designer.Bands.BandViewModel;
    import IElementViewModel = DevExpress.Analytics.Elements.IElementViewModel;
    import ControlType = DevExpress.Reporting.Designer.Internal.ControlType;
    import FilterStringOptions = DevExpress.Analytics.Widgets.FilterStringOptions;
    import ObjectStorageItem = DevExpress.Reporting.Designer.Data.ObjectStorageItem;
    import VerticalBandsContainerSurface = DevExpress.Reporting.Designer.Bands.Internal.VerticalBandsContainerSurface;
    import IArea = DevExpress.Analytics.Elements.IArea;
    import SurfaceElementBase = DevExpress.Analytics.Elements.SurfaceElementBase;
    import IUnitProperties = DevExpress.Analytics.Internal.IUnitProperties;
    import XRControlViewModel = DevExpress.Reporting.Designer.Controls.XRControlViewModel;
    import ReportSurface = DevExpress.Reporting.Designer.Controls.ReportSurface;
    import DetailReportBandSurface = DevExpress.Reporting.Designer.Bands.DetailReportBandSurface;
    import Size = DevExpress.Analytics.Elements.Size;
    import SurfaceSelection = DevExpress.Analytics.Internal.SurfaceSelection;
    import ReportBandsType = DevExpress.Reporting.Designer.Internal.ReportBandsType;
    import XRControlSurface = DevExpress.Reporting.Designer.Controls.XRControlSurface;
    import XRControlSurfaceBase = DevExpress.Reporting.Designer.Controls.XRControlSurfaceBase;
    import ReportViewModel = DevExpress.Reporting.Designer.Controls.ReportViewModel;
    import XRReportElementViewModel = DevExpress.Reporting.Designer.Controls.XRReportElementViewModel;
    import MultiColumnSurface = DevExpress.Reporting.Designer.Bands.MultiColumnSurface;
    import BandsHolder = DevExpress.Reporting.Designer.Bands.Internal.BandsHolder;
    import PrintAcrossBandsPlaceHolder = DevExpress.Reporting.Designer.Bands.Internal.PrintAcrossBandsPlaceHolder;
    import VerticalBandViewModel = DevExpress.Reporting.Designer.Bands.VerticalBandViewModel;
    export const bandSurfaceCollapsedHeight = 27;
    export class MultiColumn extends SerializableModel {
        static unitProperties: string[];
        constructor(model: any, pageWidth: ko.Observable<number> | ko.Computed<number>, margins: DevExpress.Analytics.Elements.Margins, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        mode: ko.Observable<string> | ko.Computed<string>;
        realColumnWidth: ko.Observable<number> | ko.Computed<number>;
        grayAreaWidth: ko.Observable<number>;
        columnWidth: ko.Observable<number> | ko.Computed<number>;
        columnCount: ko.Observable<number> | ko.Computed<number>;
        columnSpacing: any;
    }
    export const multiColumnSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export class MultiColumnSurface extends Disposable {
        constructor(multiColumn: DevExpress.Reporting.Designer.Bands.MultiColumn, context: DevExpress.Analytics.Elements.ISurfaceContext);
        grayAreaWidth: ko.Computed<number>;
        columnWidth: ko.Computed<number>;
        columnSpacing: ko.Computed<number>;
        columnSpacingLeft: ko.Computed<number>;
        grayAreaLeft: ko.Computed<number>;
        haveColumns: ko.Computed<boolean>;
    }
    export class GroupFieldModel extends Disposable implements ISerializableModel {
        static createNew: () => DevExpress.Reporting.Designer.Bands.GroupFieldModel;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        sortOrder: ko.Observable<string> | ko.Computed<string>;
        sortOrderClass: ko.Computed<{
            class: string;
            template: string;
        }>;
        changeSortOrder: () => void;
        fieldName: ko.Observable<string> | ko.Computed<string>;
    }
    interface IHierarchyPrintOptions {
        keyFieldName: ko.Observable<string>;
        childListFieldName: ko.Observable<string>;
        parentFieldName: ko.Observable<string>;
        indent: ko.Observable<number>;
        keepTogetherWithFirstChild: ko.Observable<boolean>;
        isPropertyDisabled: (propertyName: string) => boolean;
        getPath: (propertyName?: string) => string;
    }
    export class DetailBand extends BandViewModel {
        static unitProperties: any[];
        dispose(): void;
        preInit(band: any, parent: DevExpress.Analytics.Elements.ElementViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer): void;
        hasHierarchyPrintOptions(): boolean;
        constructor(band: any, parent: any, serializer: any);
        isPropertyDisabled(name: string): any;
        multiColumn: DevExpress.Reporting.Designer.Bands.MultiColumn;
        hierarchyPrintOptions: IHierarchyPrintOptions;
        sortFields: ko.ObservableArray<DevExpress.Reporting.Designer.Bands.GroupFieldModel>;
    }
    export class DetailBandSurface extends BandSurface {
        protected _initMultiColumn(): void;
        _control: DetailBand;
    }
    export {};
    export class SubBandViewModel extends BandViewModel {
        constructor(band: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        isPropertyDisabled(name: string): any;
        isAllowedParent(target: DevExpress.Analytics.Elements.IElementViewModel): boolean;
    }
    export class SubBandSurface extends BandSurface {
        getAbsolutePositionY(): number;
        getBackgroundRect(): {
            top: number;
            bottom: number;
            height: number;
        };
        protected _initMultiColumn(): void;
        get parent(): DevExpress.Reporting.Designer.Bands.BandSurface;
        leftMarginTemplate: string;
    }
    export class DetailReportBand extends BandViewModel {
        dispose(): void;
        initHeight(): void;
        createChildsArray(band: any, serializer: DevExpress.Analytics.Utils.ModelSerializer): void;
        addChild(control: DevExpress.Analytics.Elements.IElementViewModel): void;
        constructor(band: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        dataMember: ko.Observable<string> | ko.Computed<string>;
        dataSource: ko.Observable<DevExpress.Reporting.Designer.Data.ObjectStorageItem>;
        _filterString: ko.Observable<string> | ko.Computed<string>;
        filterString: DevExpress.Analytics.Widgets.FilterStringOptions;
    }
    export class DetailReportBandSurface extends BandSurface {
        dispose(): void;
        getChildrenCollection(): ko.ObservableArray<DevExpress.Reporting.Designer.Bands.BandSurface>;
        createUnderCursor(): void;
        getTotalHeight(): number;
        getHeight(): number;
        getHasOwnRuler(): boolean;
        constructor(band: DetailReportBand, context: DevExpress.Analytics.Elements.ISurfaceContext);
        verticalBandsContainer: DevExpress.Reporting.Designer.Bands.Internal.VerticalBandsContainerSurface;
        templateName: string;
        selectionTemplate: string;
        leftMarginTemplate: string;
    }
    export class VerticalBandViewModel extends BandViewModel {
        static unitProperties: any[];
        dispose(): void;
        initSize(): void;
        preInit(band: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer): void;
        constructor(band: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        surface: VerticalBandSurface;
        controls: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRControlViewModel>;
        width: ko.Observable<number> | ko.Computed<number>;
        height: ko.Observable<number> | ko.Computed<number>;
        widthFromControls: ko.Computed<number>;
    }
    export class VerticalBandSurface extends SurfaceElementBase<DevExpress.Reporting.Designer.Bands.VerticalBandViewModel> {
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<VerticalBandViewModel>;
        isSomeParentCollapsed: ko.Observable<boolean>;
        private _resize;
        private _getRtlAbsolutePositionX;
        private _getGrayArea;
        private _getUnitPositionInParent;
        private get _unitAbsoluteRect();
        constructor(band: DevExpress.Reporting.Designer.Bands.VerticalBandViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext, unitProperties?: DevExpress.Analytics.Internal.IUnitProperties<VerticalBandViewModel>);
        getAbsolutePositionX(): number;
        updateAbsolutePosition(): void;
        minimumHeight(): number;
        minimumWidth(): number;
        collapsed: ko.Observable<boolean> | ko.Computed<boolean>;
        resizeHandles: ko.Computed<string>;
        templateName: string;
        selectiontemplate: string;
        contentSelectionTemplate: string;
        backgroundRect: ko.Computed<DevExpress.Analytics.Elements.IArea>;
        get parent(): DevExpress.Reporting.Designer.Controls.ReportSurface | DevExpress.Reporting.Designer.Bands.DetailReportBandSurface;
        get verticalBandsContainer(): DevExpress.Reporting.VerticalBandsContainerSurface;
        height: ko.Observable<number> | ko.Computed<number>;
        name: ko.Observable<string> | ko.Computed<string>;
        coordinateGridOptions: any;
        canResize: ko.Computed<boolean>;
        heightFromControls: ko.Computed<number>;
        widthFromControls: ko.Computed<number>;
    }
    export class BandViewModel extends XRReportElementViewModel {
        static unitProperties: string[];
        dispose(): void;
        createChildsArray(band: any, serializer: DevExpress.Analytics.Utils.ModelSerializer): void;
        initHeight(): void;
        preInit(band: any, parent: DevExpress.Analytics.Elements.ElementViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer): void;
        private _getMaxLevel;
        constructor(band: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        addChild(control: DevExpress.Analytics.Elements.ElementViewModel<ControlType>): void;
        getPath(propertyName: any): any;
        initSize(): void;
        initialize(): void;
        removeChild(control: DevExpress.Analytics.Elements.ElementViewModel<ControlType>): void;
        static isReorderingBand(control: DevExpress.Analytics.Elements.ElementViewModel): boolean;
        isAllowedParent(target: DevExpress.Analytics.Elements.IElementViewModel): boolean;
        private _isHeaderBandTypeOrThemSubBands;
        isPropertyVisible(name: string): any;
        isPropertyDisabled(name: string): any;
        level: ko.Observable<number> | ko.Computed<number>;
        _level: ko.Observable<number> | ko.Computed<number>;
        size: DevExpress.Analytics.Elements.Size;
        name: ko.Observable<string> | ko.Computed<string>;
        height: ko.Observable<number> | ko.Computed<number>;
        bands: ko.ObservableArray<DevExpress.Reporting.Designer.Bands.BandViewModel>;
        controls: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRControlViewModel>;
        heightFromControls: ko.Computed<number>;
        expanded: ko.Observable<boolean> | ko.Computed<boolean>;
        parentModel: ko.Observable<DevExpress.Reporting.Designer.Bands.BandViewModel | DevExpress.Reporting.Designer.Controls.ReportViewModel>;
        controlType: DevExpress.Reporting.Designer.Internal.ReportBandsType;
        maxLevel: ko.PureComputed;
    }
    export class BandSurface extends SurfaceElementBase<DevExpress.Reporting.Designer.Bands.BandViewModel, DevExpress.Reporting.Designer.Internal.ControlType> {
        private _getMarginWidth;
        coordinateGridOptions: any;
        dispose(): void;
        static _unitProperties: DevExpress.Analytics.Internal.IUnitProperties<BandViewModel>;
        isSomeParentCollapsed: ko.Observable<boolean>;
        private _resize;
        private _isHeaderBandTypeOrThemSubBands;
        private _getUnitPositionInParent;
        private get _unitAbsoluteRect();
        private _getGrayArea;
        createChildCollection(band: DevExpress.Reporting.Designer.Bands.BandViewModel): void;
        createUnderCursor(): void;
        getTotalHeight(): number;
        getHeight(): number;
        getHasOwnRuler(): boolean;
        getBackgroundRect(): {
            top: number;
            bottom: any;
            height: number;
        };
        protected _initMultiColumn(): void;
        constructor(band: DevExpress.Reporting.Designer.Bands.BandViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext, unitProperties?: DevExpress.Analytics.Internal.IUnitProperties<BandViewModel>);
        getAbsolutePositionY(): number;
        updateAbsolutePosition(): void;
        markerClick(selection: DevExpress.Analytics.Internal.SurfaceSelection, changeCollapsed?: boolean): void;
        showMarker: boolean;
        templateName: string;
        selectionTemplate: string;
        vrulerTemplate: string;
        contentSelectionTemplate: string;
        leftMarginTemplate: string;
        leftMarginSelectionTemplate: string;
        canDrop(): boolean;
        minHeight: ko.Computed<number>;
        allowMultiselect: boolean;
        heightFromControls: ko.Computed<number>;
        subBandsHeight: ko.Computed<number>;
        heightWithoutSubBands: ko.Computed<number>;
        hasOwnRuler: ko.Computed<boolean>;
        rulerHeight: ko.Computed<number>;
        height: ko.Computed<number>;
        markerWidth: ko.Observable<number>;
        name: ko.Observable<string> | ko.Computed<string>;
        get parent(): DevExpress.Reporting.Designer.Controls.ReportSurface | DevExpress.Reporting.Designer.Bands.BandSurface;
        bandsHolder: DevExpress.Reporting.Designer.Bands.Internal.BandsHolder;
        controls: ko.ObservableArray<DevExpress.Reporting.Designer.Controls.XRControlSurface>;
        get zoom(): ko.Observable<number> | ko.Computed<number>;
        collapsed: ko.Observable<boolean> | ko.Computed<boolean>;
        checkParent(surfaceParent: DevExpress.Reporting.Designer.Controls.XRControlSurfaceBase<any>): boolean;
        canResize: ko.Computed<boolean>;
        backgroundRect: ko.Computed<DevExpress.Analytics.Elements.IArea>;
        _totalHeight: ko.Computed<number>;
        multiColumn: ko.Computed<DevExpress.Reporting.Designer.Bands.MultiColumnSurface>;
        printAcrossBandsPlaceHolder: DevExpress.Reporting.Designer.Bands.Internal.PrintAcrossBandsPlaceHolder;
        printAcrossBands: ko.Observable<boolean>;
    }
    export interface ISortingSummary {
        enabled: boolean;
        Function: string;
        fieldName: string;
        ignoreNullValues: string;
        sortOrder: string;
        getPath: (propertyName: string) => string;
    }
    export class GroupHeaderBand extends BandViewModel {
        dispose(): void;
        constructor(band: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        groupFields: ko.ObservableArray<DevExpress.Reporting.Designer.Bands.GroupFieldModel>;
        sortingSummary: ISortingSummary;
    }
    export class TopMarginBand extends BandViewModel {
        initHeight(): void;
    }
    export class BottomMarginBand extends BandViewModel {
        initHeight(): void;
    }
    export class BottomMarginSurface extends BandSurface {
        getBackgroundRect(): {
            top: number;
            bottom: any;
            height: number;
        };
        get parent(): DevExpress.Reporting.Designer.Controls.ReportSurface;
    }
    export class PageFooterSurface extends BandSurface {
        getBackgroundRect(): {
            top: number;
            bottom: any;
            height: number;
        };
        get parent(): DevExpress.Reporting.Designer.Controls.ReportSurface;
    }
    export class VerticalDetailBandViewModel extends VerticalBandViewModel {
        dispose(): void;
        preInit(band: any, parent: DevExpress.Analytics.Elements.ElementViewModel, serializer?: DevExpress.Analytics.Utils.ModelSerializer): void;
        sortFields: ko.ObservableArray<DevExpress.Reporting.Designer.Bands.GroupFieldModel>;
    }
}
declare module DevExpress.Reporting.Viewer.Widgets.Internal {
    import IPropertyGridEditorViewModel = DevExpress.Analytics.Widgets.IPropertyGridEditorViewModel;
    import PropertyGridEditor = DevExpress.Analytics.Widgets.PropertyGridEditor;
    import INumericSize = DevExpress.Analytics.Elements.INumericSize;
    import ImageAlignment = DevExpress.Reporting.Viewer.Editing.ImageAlignment;
    import ImageSizeMode = DevExpress.Reporting.Viewer.Editing.ImageSizeMode;
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import BaseModel = DevExpress.Analytics.Serializer.Native.BaseModel;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import BaseRenderingModel = DevExpress.Analytics.Serializer.Native.BaseRenderingModel;
    import IViewModel = DevExpress.Analytics.Serializer.Native.IViewModel;
    import ValueChangedEvent = DevExpress.ui.dxTextBox.ValueChangedEvent;
    import IImageEditorItem = DevExpress.Reporting.Viewer.Widgets.Internal.IImageEditorItem;
    import dxPopup = DevExpress.ui.dxPopup;
    import ContentReadyEvent = DevExpress.ui.dxPopup.ContentReadyEvent;
    import HiddenEvent = DevExpress.ui.dxPopup.HiddenEvent;
    import Properties = DevExpress.ui.dxPopup.Properties;
    import ShownEvent = DevExpress.ui.dxPopup.ShownEvent;
    import PictureEditorActionId = DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorActionId;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import PictureEditorModel = DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorModel;
    import IPictureEditorActionPopupOptions = DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorActionPopupOptions;
    import PictureEditorToolbarItem = DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorToolbarItem;
    import PictureEditorToolbarItemWithPopup = DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorToolbarItemWithPopup;
    import ImagePainter = DevExpress.Reporting.Viewer.Widgets.Internal.ImagePainter;
    import SignaturePainter = DevExpress.Reporting.Viewer.Widgets.Internal.SignaturePainter;
    import IPictureEditorFieldModel = DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorFieldModel;
    import ValueChangedEvent = ;
    null.ValueChangedEvent;
    import getParentContainer = DevExpress.Analytics.Internal.getParentContainer;
    import IModel = DevExpress.Analytics.Serializer.Native.IModel;
    import PictureEditMode = DevExpress.Reporting.Viewer.Widgets.PictureEditMode;
    import IPainterViewModel = DevExpress.Reporting.Viewer.Widgets.Internal.IPainterViewModel;
    import Painter = DevExpress.Reporting.Viewer.Widgets.Internal.Painter;
    import PictureEditorActionProvider = DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorActionProvider;
    import IPictureEditorToolbarItem = DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorToolbarItem;
    import IPictureEditorToolbarItemWithTemplateOptions = DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorToolbarItemWithTemplateOptions;
    import IDisplayedValue = DevExpress.Analytics.Utils.IDisplayedValue;
    import Editor = DevExpress.Analytics.Widgets.Editor;
    import IEditorViewModel = DevExpress.Analytics.Widgets.IEditorViewModel;
    export interface IParameterGroupEditorViewModel extends IPropertyGridEditorViewModel {
        isGroupLabel: boolean;
        hideEditorHeader: boolean;
        hideBorder: boolean;
        showHorizontally: boolean;
    }
    export class ParametersGroupEditor extends PropertyGridEditor {
        createViewModel(): IParameterGroupEditorViewModel;
        _setPadding(position: string, value: any): {};
        createObjectProperties(): DevExpress.Analytics.Widgets.ObjectProperties;
        hideEditorHeader: boolean;
        hideBorder: boolean;
        showHorizontally: boolean;
        isGroupLabel: boolean;
    }
    export enum PictureEditorActionId {
        OpenFile = 0,
        PickImage = 1,
        Alignment = 2,
        Brush = 3,
        Clear = 4,
        Reset = 5
    }
    export interface IImageEditorItem {
        data?: string;
        url?: string;
        text?: string;
        visible?: boolean;
    }
    export class ImagePainter {
        private _drawImage;
        private _getImageSize;
        private _getImageCoordinate;
        constructor(options: {
            imageSource: () => string;
            sizeMode: () => DevExpress.Reporting.Viewer.Editing.ImageSizeMode;
            alignment: () => DevExpress.Reporting.Viewer.Editing.ImageAlignment;
        });
        refresh(context: CanvasRenderingContext2D, scale?: number, contentSize?: DevExpress.Analytics.Elements.INumericSize): Promise<void>;
        format: string;
        image: () => string;
        sizeMode: () => DevExpress.Reporting.Viewer.Editing.ImageSizeMode;
        alignment: () => DevExpress.Reporting.Viewer.Editing.ImageAlignment;
    }
    export class SignaturePainter extends BaseModel {
        dispose(): void;
        _points: Array<any>;
        private _lastX;
        private _lastY;
        private _drawPath;
        private _drawCircle;
        private _drawAllPoints;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<SignaturePainter> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<SignaturePainter>): void;
        drawCircle(context: CanvasRenderingContext2D, x: number, y: number, color: string, width: number): void;
        drawPath(context: CanvasRenderingContext2D, x: number, y: number, color: string, width: number): void;
        resetLastPosition(): void;
        resetPoints(): void;
        reset(): void;
        refresh(context: CanvasRenderingContext2D): void;
        hasPoints: boolean;
    }
    export interface IImagePickerActionViewModel extends IViewModel {
        images: IImageEditorItemViewModel[];
        filterEnabled: boolean;
        filter: string;
        width: number;
        contentWidth: number;
        height: number;
        onFilterChanged: (event: DevExpress.ui.dxTextBox.ValueChangedEvent) => void;
        searchPlaceholder: string;
    }
    export interface IImageEditorItemViewModel extends IViewModel, IImageEditorItem {
        action: () => void;
        width: number;
        height: number;
        filter: string;
        filterEnabled: boolean;
    }
    export class ImagePickerAction extends BaseRenderingModel<IImagePickerActionViewModel> {
        constructor(images: DevExpress.Reporting.Viewer.Widgets.Internal.IImageEditorItem[], filterEnabled: boolean, action: (base64: string) => void, initialSize: DevExpress.Analytics.Elements.INumericSize);
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<ImagePickerAction> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<ImagePickerAction>): void;
        createViewModel(): IImagePickerActionViewModel;
        filterString: string;
        filterEnabled: boolean;
        images: IImageEditorItemViewModel[];
        contentTemplate: string;
        width: number;
        height: number;
        contentWidth: number;
    }
    export class PictureEditorToolbarItem extends BaseModel implements IPictureEditorToolbarItem {
        constructor(options: IPictureEditorToolbarItemOptions);
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        dispose(): void;
        id: DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorActionId;
        icon: string;
        title: string;
        active: boolean;
        action: (e: any, model: any) => void;
    }
    export class PictureEditorToolbarItemWithPopup extends PictureEditorToolbarItem implements IPictureEditorToolbarItemWithPopup {
        private _popup;
        constructor(options: DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorToolbarItemWithTemplateOptions<IPictureEditorActionPopupOptions>);
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<PictureEditorToolbarItemWithPopup> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<PictureEditorToolbarItemWithPopup>): void;
        dispose(): void;
        template: string;
        templateOptions: IPictureEditorActionPopup;
    }
    export interface IPictureEditorToolbarItem extends IPictureEditorToolbarItemOptions {
        dispose: () => void;
        active: boolean;
    }
    export interface IPictureEditorToolbarItemWithPopup extends IPictureEditorToolbarItemWithTemplateOptions<IPictureEditorActionPopup> {
        dispose: () => void;
    }
    export interface IPictureEditorToolbarItemWithTemplateOptions<T = unknown> extends IPictureEditorToolbarItemOptions {
        template?: string;
        templateOptions?: T;
    }
    export interface IPictureEditorToolbarItemOptions {
        id: DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorActionId;
        icon: string;
        action?: (e: any, model: any) => void;
        title: string;
    }
    export interface IPictureEditorActionPopup extends IPictureEditorActionPopupOptions {
        component: DevExpress.ui.dxPopup<Properties>;
        onContentReady: (event: DevExpress.ui.dxPopup.ContentReadyEvent) => void;
        onShown: (event: DevExpress.ui.dxPopup.ShownEvent) => void;
        onHidden: (e: DevExpress.ui.dxPopup.HiddenEvent) => void;
        hideOnOutsideClick: (e: {
            target: any;
        }) => boolean;
    }
    export interface IPictureEditorActionPopupOptions {
        width: string;
        height: string;
        contentTemplate: string;
        contentData: any;
        container: string;
        target: string;
        boundary: string | any;
        getPositionTarget: () => HTMLElement;
        visible: boolean;
    }
    export class PictureEditorActionProvider extends Disposable {
        private _editorModel;
        private _popupOptions;
        static colors: string[];
        private _initPopupOptions;
        createOpenFileAction(action: (e: any) => void): DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorToolbarItem;
        createImagePickerAction(images: DevExpress.Reporting.Viewer.Widgets.Internal.IImageEditorItem[], filterEnabled: boolean, action: (base64: string) => void): DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorToolbarItemWithPopup;
        createSizingAction(): DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorToolbarItemWithPopup;
        createBrushAction(): DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorToolbarItemWithPopup;
        createResetItem(action: () => void): DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorToolbarItem;
        createClearItem(action: () => void): DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorToolbarItem;
        constructor(_editorModel: DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorModel, _popupOptions: DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorActionPopupOptions);
    }
    export interface IPainterOptions {
        imageSource: string;
        imageType: string;
        sizeMode: DevExpress.Reporting.Viewer.Editing.ImageSizeMode;
        alignment: DevExpress.Reporting.Viewer.Editing.ImageAlignment;
        pictureEditorModel?: DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorModel;
        setPainter?: (painter: DevExpress.Reporting.Viewer.Widgets.Internal.Painter) => void;
        editingFieldModel: DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorFieldModel;
    }
    export interface IPainterColorOptionViewModel {
        value: string;
        isSelected: boolean;
        action: () => void;
    }
    export interface IPainterSizingOptionViewModel extends IPainterColorOptionViewModel {
        attrTitle: string;
        iconTemplate: string;
    }
    export interface IPainterBrushOptions {
        lineWidth: number;
        lineColor: string;
        onLineWidthChanged: (event: DevExpress.ui.dxTextBox.ValueChangedEvent) => void;
        colors: IPainterColorOptionViewModel[];
        brushWidthText: string;
        brushColorText: string;
    }
    export interface IPainterSizeOptions {
        sizeMode: DevExpress.Reporting.Viewer.Editing.ImageSizeMode;
        sizeModeText: string;
        sizeModeValues: IPainterSizingOptionViewModel[];
        alignment: DevExpress.Reporting.Viewer.Editing.ImageAlignment;
        alignmentText: string;
        alignmentValues: IPainterSizingOptionViewModel[];
    }
    export interface IPainterViewModel extends IViewModel {
        scale: number;
        brushOptions: IPainterBrushOptions;
        sizingOptions: IPainterSizeOptions;
    }
    export class Painter extends BaseRenderingModel<DevExpress.Reporting.Viewer.Widgets.Internal.IPainterViewModel> {
        private $element;
        private _context;
        private _getContextPoint;
        private _pointerDownHandler;
        private _pointerMoveHandler;
        private _pointerLeaveHandler;
        private _addEvents;
        private _removeEvents;
        private _setCanvasSize;
        private _cleanCanvas;
        private _updateScale;
        private _getColorValues;
        private _getEnumValues;
        constructor(element: HTMLElement, options: IPainterOptions, onResize?: () => void);
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<Painter> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<Painter>): void;
        createViewModel(): DevExpress.Reporting.Viewer.Widgets.Internal.IPainterViewModel;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<Painter> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<Painter>): void;
        clear(): void;
        refresh(): void;
        initSize(element: HTMLElement, zoom: number): void;
        initCanvas(zoom: number): void;
        imageFormatByType(imageType: string): string;
        getImage(): string;
        hasSignature(): boolean;
        dispose(): void;
        reset(initialImage: string, initialAlignment: DevExpress.Reporting.Viewer.Editing.ImageAlignment, initialSizeMode: DevExpress.Reporting.Viewer.Editing.ImageSizeMode, initialImageType: string): void;
        initialSize: {
            width: number;
            height: number;
        };
        height: number;
        format: (newVal?: string) => string;
        image: string;
        imageSizeMode: DevExpress.Reporting.Viewer.Editing.ImageSizeMode;
        imageAlignment: DevExpress.Reporting.Viewer.Editing.ImageAlignment;
        getZoom: () => number;
        scale: number;
        lineWidth: number;
        lineColor: string;
        imagePainter: DevExpress.Reporting.Viewer.Widgets.Internal.ImagePainter;
        signaturePainter: DevExpress.Reporting.Viewer.Widgets.Internal.SignaturePainter;
    }
    export interface IPictureEditorViewModel extends IViewModel {
        shadingEnabled: boolean;
        getPopupContainer: typeof DevExpress.Analytics.Internal.getParentContainer;
        onContentReady: (event: DevExpress.ui.dxPopup.ContentReadyEvent) => void;
        actions: DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorToolbarItemWithTemplateOptions[];
        painter: DevExpress.Reporting.Viewer.Widgets.Internal.IPainterViewModel;
        element: HTMLElement;
    }
    export class PictureEditorModel extends BaseRenderingModel<IPictureEditorViewModel> {
        editingFieldModel: DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorFieldModel;
        private $element;
        private _initialImage;
        private _initialAlignment;
        private _initialSizeMode;
        private _initialImageType;
        private _pointerDownHandler;
        private _pointerUpHandler;
        private _pointerCancelHandler;
        private _canDrawChanged;
        private _callbacks;
        private GESTURE_COVER_CLASS;
        private ACTIVE_POPUP_CLASS;
        private _getPopupContent;
        private _takeFocus;
        private _releaseFocus;
        private _wrapButtonAction;
        private _initActions;
        private _loadImage;
        private _addEvents;
        constructor(editingFieldModel: DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorFieldModel, element: HTMLElement, onResize?: () => void);
        createViewModel(): IPictureEditorViewModel;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<PictureEditorModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<PictureEditorModel>): void;
        changeActiveButton(selectedItem: DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorToolbarItem): void;
        dispose(): void;
        getImage(): string;
        reset(image: string, alignment: DevExpress.Reporting.Viewer.Editing.ImageAlignment, sizeMode: DevExpress.Reporting.Viewer.Editing.ImageSizeMode, imageType: string): void;
        getCurrentOptions(): IImageEditValue;
        actionsProvider: DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorActionProvider;
        editMode: DevExpress.Reporting.Viewer.Widgets.PictureEditMode;
        actions: Array<DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorToolbarItem>;
        painter: DevExpress.Reporting.Viewer.Widgets.Internal.Painter;
        active: boolean;
        canDraw: boolean;
        shadingEnabled: boolean;
    }
    export interface IPictureEditorCallbacks {
        onFocusOut: (s: any) => void;
        onFocusIn?: (s: any) => void;
        onDraw: (s: any) => void;
        customizeActions?: (s: DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorModel, actions: Array<DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorToolbarItem>) => void;
    }
    export interface IImageEditValue {
        sizeMode: DevExpress.Reporting.Viewer.Editing.ImageSizeMode;
        alignment: DevExpress.Reporting.Viewer.Editing.ImageAlignment;
        imageType: string;
        image: string;
    }
    export interface IPictureEditorFieldModel extends IModel {
        editMode: DevExpress.Reporting.Viewer.Widgets.PictureEditMode;
        sizeMode: DevExpress.Reporting.Viewer.Editing.ImageSizeMode;
        alignment: DevExpress.Reporting.Viewer.Editing.ImageAlignment;
        callbacks: IPictureEditorCallbacks;
        popupOptions: IPictureEditorPopupTargetOptions;
        shadingEnabled: boolean;
        active: boolean;
        zoom: number;
        getImage: () => string;
        getImageType: () => string;
        _setPictureEditor?: (editor: DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorModel) => void;
        _renderedHandler?: () => void;
    }
    export interface IPictureEditorPopupTargetOptions {
        target?: string;
        container?: string;
        boundary?: string;
    }
    export interface IClickEvent {
        target: HTMLElement;
    }
    export interface IMultiValueEditorViewModel {
        value: any[];
        onValueChanged: (e: any) => void;
        dataSource: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
        items: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
        maxDisplayedTags: number;
        placeholder: string;
        selectAllText: string;
        searchExpr: string[];
        displayExpr: string;
        valueExpr: string;
        getOptions: (options: any) => any;
        displayName: string;
        editorInputId: string;
        disabled: boolean;
        getPopupContainer: (element: Element) => Element;
        validationRules: any[];
    }
    export class MultiValueEditor extends Editor {
        private _multiValueEditorSubscriptions;
        private _createMultiValueEditorValueViewModel;
        createViewModel(): DevExpress.Analytics.Widgets.IEditorViewModel;
        dispose(): void;
    }
    export {};
}
declare module DevExpress.Reporting.Viewer.Settings {
    export interface IMessageHandler {
        processError: (message: string, showForUser?: boolean, prefix?: string, element?: Element) => void;
        processMessage: (message: string, showForUser?: boolean, element?: Element) => void;
        processWarning: (message: string, showForUser?: boolean, element?: Element) => void;
    }
    export const EditablePreviewEnabled: DevExpress.Analytics.Internal.IGlobalSubscribableValue<boolean>;
    export const SearchAvailable: DevExpress.Analytics.Internal.IGlobalSubscribableValue<boolean>;
    export const ReportServerInvokeUri = "/RSWebDocumentViewerApi/Invoke";
    export const ReportServerExportUri = "/RSWebDocumentViewerApi/Download";
    export const AsyncExportApproach: DevExpress.Analytics.Internal.IGlobalSubscribableValue<boolean>;
    export const MessageHandler: DevExpress.Analytics.Internal.IGlobalSubscribableValue<IMessageHandler>;
    export const HandlerUri: DevExpress.Analytics.Internal.IGlobalSubscribableValue<string>;
    export const previewDefaultResolution: DevExpress.Analytics.Internal.IGlobalSubscribableValue<number>;
    export const ReportServerDownloadUri: DevExpress.Analytics.Internal.IGlobalSubscribableValue<string>;
    export const PollingDelay: DevExpress.Analytics.Internal.IGlobalSubscribableValue<number>;
    export const TimeOut: DevExpress.Analytics.Internal.IGlobalSubscribableValue<number>;
    export const PreloadedPagesOffset: DevExpress.Analytics.Internal.IGlobalSubscribableValue<number>;
    export const MultipageScrollingThrottle: DevExpress.Analytics.Internal.IGlobalSubscribableValue<number>;
}
declare module DevExpress.Reporting.Viewer.Internal {
    import IBookmarkNode = DevExpress.Reporting.Viewer.Internal.IBookmarkNode;
    import IBookmarkDataMemberInfo = DevExpress.Reporting.Viewer.Internal.IBookmarkDataMemberInfo;
    import IItemsProvider = DevExpress.Analytics.Utils.IItemsProvider;
    import TreeListItemViewModel = DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
    import ITreeListController = DevExpress.Analytics.Widgets.Internal.ITreeListController;
    import TreeListRootItemViewModel = DevExpress.Analytics.Widgets.Internal.TreeListRootItemViewModel;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    import AccessibilityKeyboardHelperBase = DevExpress.Analytics.Internal.AccessibilityKeyboardHelperBase;
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import BaseRenderingModel = DevExpress.Analytics.Serializer.Native.BaseRenderingModel;
    import IViewModel = DevExpress.Analytics.Serializer.Native.IViewModel;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import TabInfo = DevExpress.Analytics.Utils.TabInfo;
    import ITreeListOptions = DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
    import InitializedEvent = DevExpress.ui.dxScrollView.InitializedEvent;
    import ReportPreview = DevExpress.Reporting.Viewer.ReportPreview;
    import DocumentMapTreeListController = DevExpress.Reporting.Viewer.Internal.DocumentMapTreeListController;
    import IFoundText = DevExpress.Reporting.Viewer.Internal.IFoundText;
    import SearchViewModel = DevExpress.Reporting.Viewer.Internal.SearchViewModel;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import getParentContainer = DevExpress.Analytics.Internal.getParentContainer;
    import dxPopupToolbarItem = DevExpress.ui.dxPopup.dxPopupToolbarItem;
    import ExportHandler = DevExpress.Reporting.Viewer.Internal.ExportHandler;
    import IGetPageResponse = DevExpress.Reporting.Viewer.Internal.IGetPageResponse;
    import IExportSettings = DevExpress.Reporting.Viewer.Utils.IExportSettings;
    import IExportToolViewModel = DevExpress.Reporting.Viewer.Internal.IExportToolViewModel;
    import IExportProgressStatus = DevExpress.Reporting.Viewer.Internal.IExportProgressStatus;
    import ExportOptionsEventHandlers = DevExpress.Reporting.Viewer.Export.ExportOptionsEventHandlers;
    import IAction = DevExpress.Analytics.Utils.IAction;
    import IActionsProvider = DevExpress.Analytics.Internal.IActionsProvider;
    import IGlobalSubscribableValue = DevExpress.Analytics.Internal.IGlobalSubscribableValue;
    import ActionListsBase = DevExpress.Analytics.Internal.ActionListsBase;
    import BaseAction = DevExpress.Analytics.Internal.BaseAction;
    import SimplifiedSearchMode = ;
    null.SimplifiedSearchMode;
    import editor_template = DevExpress.Analytics.Internal.editor_template;
    import DataSource = DevExpress.data.DataSource;
    import SearchResultNavigator = DevExpress.Reporting.Viewer.Internal.SearchResultNavigator;
    import ISearchSettings = DevExpress.Reporting.Viewer.Utils.ISearchSettings;
    import FocusOutEvent = DevExpress.ui.dxTextBox.FocusOutEvent;
    import KeyDownEvent = DevExpress.ui.dxTextBox.KeyDownEvent;
    import TextChangedEvent = DevExpress.ui.dxTextBox.TextChangedEvent;
    import ClickEvent = ;
    null.ClickEvent;
    import ValueChangedEvent = ;
    null.ValueChangedEvent;
    import ItemRenderedEvent = ;
    null.ItemRenderedEvent;
    import IKeyValuePair = DevExpress.Reporting.IKeyValuePair;
    import IEditingFieldHtmlProvider = DevExpress.Reporting.Viewer.Editing.IEditingFieldHtmlProvider;
    import IEditingFieldSerializedModel = DevExpress.Reporting.Viewer.Editing.IEditingFieldSerializedModel;
    import PreviewParametersViewModel = DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel;
    import IPreviewCustomizationHandler = DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler;
    import IPreviewInitialize = DevExpress.Reporting.Viewer.Utils.IPreviewInitialize;
    import IBrickNode = DevExpress.Reporting.Viewer.Utils.IBrickNode;
    import IDocumentOperationResult = DevExpress.Reporting.Viewer.Utils.IDocumentOperationResult;
    import IGetPageRequest = DevExpress.Reporting.Viewer.Internal.IGetPageRequest;
    import IDocumentBuildStatus = DevExpress.Reporting.Viewer.Internal.IDocumentBuildStatus;
    import PreviewPage = DevExpress.Reporting.Viewer.Internal.PreviewPage;
    import ListKeyboardHelper = DevExpress.Analytics.Internal.ListKeyboardHelper;
    import IRenderingModel = DevExpress.Analytics.Serializer.Native.IRenderingModel;
    import IDisposable = DevExpress.Analytics.Utils.IDisposable;
    import IElementPosition = DevExpress.Reporting.Viewer.Internal.IElementPosition;
    import ZoomAutoBy = DevExpress.Reporting.Viewer.ZoomAutoBy;
    import IAutoFitOptions = DevExpress.Reporting.Viewer.Internal.IAutoFitOptions;
    import PreviewEditingFieldsKeyboardHelper = DevExpress.Reporting.Viewer.PreviewEditingFieldsKeyboardHelper;
    import IReportPreviewViewModel = DevExpress.Reporting.Viewer.IReportPreviewViewModel;
    import IPreviewPageViewModel = DevExpress.Reporting.Viewer.Internal.IPreviewPageViewModel;
    import EditingField = DevExpress.Reporting.Viewer.Editing.EditingField;
    import INumericSize = DevExpress.Analytics.Elements.INumericSize;
    import EditingFieldBase = DevExpress.Reporting.Viewer.Editing.EditingFieldBase;
    import IPageSizeConfiguration = DevExpress.Reporting.Viewer.Internal.IPageSizeConfiguration;
    import ISortingFieldInfo = DevExpress.Reporting.Viewer.Internal.ISortingFieldInfo;
    import ISortingData = DevExpress.Reporting.Viewer.Utils.ISortingData;
    import ExportOptionsModel = DevExpress.Reporting.Viewer.Export.ExportOptionsModel;
    import DocumentMapModel = DevExpress.Reporting.Viewer.Internal.DocumentMapModel;
    import ActionLists = DevExpress.Reporting.Viewer.Internal.ActionLists;
    import TabPanel = DevExpress.Analytics.Utils.TabPanel;
    import DisposableType = DevExpress.Analytics.Utils.DisposableType;
    import ITabPanelViewModel = DevExpress.Analytics.Utils.ITabPanelViewModel;
    import IDesignerPart = DevExpress.Analytics.Internal.IDesignerPart;
    import ToolbarKeyboardHelper = DevExpress.Analytics.Internal.ToolbarKeyboardHelper;
    import IActionListBaseViewModel = DevExpress.Analytics.Internal.IActionListBaseViewModel;
    import BreadcrumbModel = DevExpress.Reporting.Viewer.Internal.BreadcrumbModel;
    import IBreadcrumbViewModel = DevExpress.Reporting.Viewer.Internal.IBreadcrumbViewModel;
    import IProgressBarSettings = DevExpress.Reporting.Viewer.Utils.IProgressBarSettings;
    import PreviewDisposableModel = DevExpress.Reporting.Viewer.Internal.PreviewDisposableModel;
    import IBindingSettings = DevExpress.Reporting.Viewer.Utils.IBindingSettings;
    import IWebDocumentViewerModel = DevExpress.Reporting.Viewer.Utils.IWebDocumentViewerModel;
    import PreviewModel = DevExpress.Reporting.Viewer.Internal.PreviewModel;
    export class DocumentMapItemsProvider implements IItemsProvider {
        constructor(bookmark: DevExpress.Reporting.Viewer.Internal.IBookmarkNode);
        getItems: (IPathRequest: any) => JQueryPromise<DevExpress.Reporting.Viewer.Internal.IBookmarkDataMemberInfo[]>;
        private _selectNode;
        static fillNode(bookmark: DevExpress.Reporting.Viewer.Internal.IBookmarkNode): DevExpress.Reporting.Viewer.Internal.IBookmarkDataMemberInfo[];
        private _getRootNode;
        bookmarkDict: {};
    }
    export class DocumentMapTreeListController implements ITreeListController {
        itemsFilter(item: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
        hasItems(item: DevExpress.Analytics.Utils.IDataMemberInfo): boolean;
        canSelect(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): boolean;
        select(value: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel): void;
        showIconsForChildItems(): boolean;
        selectedItem: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel;
        clickHandler: (item: DevExpress.Analytics.Widgets.Internal.TreeListItemViewModel) => void;
        root: DevExpress.Analytics.Widgets.Internal.TreeListRootItemViewModel;
    }
    export interface IBookmarkNode {
        text: string;
        pageIndex: number;
        indexes: string;
        nodes?: Array<DevExpress.Reporting.Viewer.Internal.IBookmarkNode>;
    }
    export interface IBookmarkDataMemberInfo extends IDataMemberInfo {
        bookmark: DevExpress.Reporting.Viewer.Internal.IBookmarkNode;
    }
    export interface IDocumentMapViewModel extends IViewModel {
        treeListOptions: DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
        onInitialized: (event: DevExpress.ui.dxScrollView.InitializedEvent) => void;
        keyboardHelper: DevExpress.Analytics.Internal.AccessibilityKeyboardHelperBase;
    }
    export class DocumentMapModel extends BaseRenderingModel<IDocumentMapViewModel> {
        private _selectedPathChangedEvent;
        private _treeListChangedEvent;
        private _setSelectedPathByNavigationNode;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs): void;
        getTreeListModel(documentMap: DevExpress.Reporting.Viewer.Internal.IBookmarkNode): DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs): void;
        createViewModel(): IDocumentMapViewModel;
        constructor(reportPreview: DevExpress.Reporting.Viewer.ReportPreview);
        dispose(): void;
        treeListController: DevExpress.Reporting.Viewer.Internal.DocumentMapTreeListController;
        tabInfo: DevExpress.Analytics.Utils.TabInfo;
        selectedPath: string;
        treeListOptions: DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
        isEmpty: boolean;
    }
    export interface ISearchResultNavigator {
        next: (up: boolean) => boolean;
        getFirstMatchFromPage: (pageIndex: number, up: boolean, thisPageOnly?: boolean) => DevExpress.Reporting.Viewer.Internal.IFoundText;
        currentResult: DevExpress.Reporting.Viewer.Internal.IFoundText;
        goToResult: (resultId: number) => void;
    }
    export class SearchResultNavigator extends Disposable implements ISearchResultNavigator {
        constructor(searchModel: DevExpress.Reporting.Viewer.Internal.SearchViewModel, reportPreview: DevExpress.Reporting.Viewer.ReportPreview);
        next: (up: boolean) => boolean;
        getFirstMatchFromPage: (pageIndex: number, up: boolean, thisPageOnly?: boolean) => DevExpress.Reporting.Viewer.Internal.IFoundText;
        currentResult: DevExpress.Reporting.Viewer.Internal.IFoundText;
        goToResult: (resultId: number) => void;
    }
    export interface IExportToolViewModel extends IViewModel {
        popupOptions: {
            width: string;
            height: string;
            title: string;
            visible: boolean;
            toolbarItems: Array<DevExpress.ui.dxPopup.dxPopupToolbarItem>;
            wrapperAttr: {
                [key: string]: string;
            };
            getPopupContainer: typeof DevExpress.Analytics.Internal.getParentContainer;
            onHidden: () => void;
        };
        printingTexts: {
            link: string;
            caption: string;
            postfix: string;
            prefix: string;
        };
        exportActionUri: string;
        exportFormData: Array<{
            name: string;
            value: string;
        }>;
        printingLinkCallback: (data: DevExpress.Reporting.Viewer.Internal.IExportToolViewModel, event: Event) => void;
    }
    export function createExportHandlerViewModel(this: DevExpress.Reporting.Viewer.Internal.ExportHandler, base: DevExpress.Analytics.Serializer.Native.IViewModel): DevExpress.Reporting.Viewer.Internal.IExportToolViewModel;
    export function updateExportHandlerViewModel(this: DevExpress.Reporting.Viewer.Internal.ExportHandler, args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<ExportHandler>): void;
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    export interface IProgressStatus {
        requestAgain: boolean;
        completed?: boolean;
        progress?: number;
        error?: string;
    }
    export interface IExportProgressStatus extends IProgressStatus {
        token?: string;
        uri?: string;
    }
    export interface IDocumentBuildStatus extends IProgressStatus {
        pageCount?: number;
        firstPageResponse?: DevExpress.Reporting.Viewer.Internal.IGetPageResponse;
    }
    export class PreviewHandlersHelper {
        private _preview;
        constructor(preview: DevExpress.Reporting.Viewer.ReportPreview);
        doneStartExportHandler(deferred: JQueryDeferred<boolean>, inlineResult: boolean, response: string, exportOperationIdDeferred: JQueryDeferred<string>, startExportOperationId: string, useSameTab?: boolean, printable?: boolean, abortController?: AbortController): void;
        errorStartExportHandler(deferred: JQueryDeferred<boolean>, startExportOperationId: string): void;
        doneExportStatusHandler(deferred: JQueryDeferred<any>, operationId: string, response: DevExpress.Reporting.Viewer.Internal.IExportProgressStatus): void;
        errorExportStatusHandler(deferred: JQueryDeferred<DevExpress.Reporting.Viewer.Internal.IDocumentBuildStatus>, operationId: string): void;
        doneStartBuildHandler(deferred: JQueryDeferred<boolean>, response: {
            documentId: string;
        }, startBuildOperationId: string, doucmentIdDeferred: JQueryDeferred<string>): void;
        errorStartBuildHandler(deferred: JQuery.Deferred<boolean>, startBuildOperationId: string): void;
        errorGetBuildStatusHandler(deferred: JQueryDeferred<DevExpress.Reporting.Viewer.Internal.IDocumentBuildStatus>): void;
        processPages(pageCount: number, stopProcessingPredicate: () => boolean): void;
        doneGetBuildStatusHandler(deferred: JQueryDeferred<DevExpress.Reporting.Viewer.Internal.IDocumentBuildStatus>, documentId: string, response: DevExpress.Reporting.Viewer.Internal.IDocumentBuildStatus, stopProcessingPredicate: () => boolean): void;
    }
    /// <reference types="jquery" />
    export function getCurrentResolution(zoom: any): number;
    export function getImageBase64(url: any): JQuery.Promise<string, any, any>;
    export function getEnumValues(enumType: any): string[];
    export function safelyRunWindowOpen(url: string, target?: string): Window;
    /// <reference types="jquery" />
    export class ExportResultRequestData {
        RequestUrl: string;
        FormData: Object;
        QueryParameters: Object;
    }
    export class ExportHandler extends BaseRenderingModel<DevExpress.Reporting.Viewer.Internal.IExportToolViewModel> {
        private preview;
        exportActionUri: string;
        exportFormData: Array<{
            name: string;
            value: string;
        }>;
        reportDisplayName: string;
        popupVisible: boolean;
        exportingFrame: HTMLIFrameElement;
        postingForm: HTMLFormElement;
        exportingFrameName: string;
        printingLinkCallback: () => void;
        getPopupTitle: () => string;
        onExportCustomEvent: (data: any) => void;
        private _exportResultRequestData;
        private _showPrintNotificationDialog;
        private _useSameTabExport;
        private _useAsynchronousExport;
        private _workerTicker;
        private _workerFunctionBlobUrl;
        private _xhr;
        private _exportResultDeferred;
        private _workerTickerFunction;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        createViewModel(): DevExpress.Reporting.Viewer.Internal.IExportToolViewModel;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        constructor(exportSetting: DevExpress.Reporting.Viewer.Utils.IExportSettings, preview: DevExpress.Reporting.Viewer.ReportPreview);
        private _getUrlObject;
        private _createWorker;
        private _terminateWorker;
        private _callPrint;
        private _window;
        clearExportTools(): void;
        private _initPrintingWindow;
        private _setPrintingLinkCallback;
        private _formSubmit;
        private _doExportSync;
        private _handleFile;
        private _getExportResultUsingFetch;
        private _handleBlobUsingFetch;
        private _getFileName;
        private _initExportWindow;
        private _startExportAsync;
        export(args: () => string, actionUri: string, inlineResult?: boolean, printable?: boolean): JQuery.Promise<boolean>;
        private _showAsyncExportError;
        private _printUsingBlob;
        private _executeXhr;
        private _printUsingBlobFetch;
        private _prepareXhr;
        private _handleXhrReady;
        private _addQueryParamsToUri;
        private _replaceLocation;
        private _timeouts;
        dispose(): void;
        updateExportStatus(progress: number, operationId: string): void;
        getExportStatus(operationId: string): JQueryPromise<DevExpress.Reporting.Viewer.Internal.IExportProgressStatus>;
        getExportResult(operationId: string, inlineDisposition: boolean, useSameTab: boolean, token?: string, printable?: boolean, uri?: string, abortController?: AbortController): void;
    }
    export const formatSearchResult: (value: DevExpress.Reporting.Viewer.Internal.IFoundText) => string;
    /// <reference types="jquery" />
    interface IPageItem {
        index: number;
        text: number;
    }
    interface IPageItemsStore {
        store: Array<IPageItem>;
        paginate: boolean;
        pageSize: number;
    }
    export interface IPaginationAction extends IAction {
        selectedItem: IPageItem;
        selectItem: (item: IPageItem) => void;
        setSelectedItemChangedEvent: (callback: (selectedItem: IPageItem) => void) => () => void;
        pageItems: IPageItemsStore;
        setPageItemsChangedEvent: (callback: (pageItems: IPageItemsStore) => void) => () => void;
        _isPageChanged: (page: string) => boolean;
        itemTemplate: (value: any) => any;
        searchMode: null;
        SimplifiedSearchMode;
        searchTimeout: number;
    }
    export interface IExportActionItem {
        text: string;
        textId?: string;
        imageClassName?: string;
        items?: IExportActionItem[];
        imageTemplateName?: string;
        format?: string;
    }
    export interface IExportAction extends IAction {
        eventHandlers: DevExpress.Reporting.Viewer.Export.ExportOptionsEventHandlers;
        items: IExportActionItem[];
        setItemsChangedEvent: (callback: (newItems: IExportActionItem[]) => void) => () => void;
    }
    export class PreviewDesignerActions extends Disposable implements IActionsProvider {
        actions: DevExpress.Analytics.Utils.IAction[];
        dispose(): void;
        constructor(reportPreview: DevExpress.Reporting.Viewer.ReportPreview, fullscreen: DevExpress.Analytics.Internal.IGlobalSubscribableValue<boolean>);
        getActions(context: DevExpress.Reporting.Viewer.ReportPreview): DevExpress.Analytics.Utils.IAction[];
    }
    export class ActionLists extends ActionListsBase {
        updateToolbarItems: () => void;
        constructor(reportPreview: DevExpress.Reporting.Viewer.ReportPreview, globalActionProviders: Array<DevExpress.Analytics.Internal.IActionsProvider>, customizeActions?: (actions: DevExpress.Analytics.Utils.IAction[]) => void, enabled?: () => boolean);
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<ActionLists> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<ActionLists>): void;
        processShortcut(e: JQueryKeyEventObject): void;
        dispose(): void;
        globalActionProviders: Array<DevExpress.Analytics.Internal.IActionsProvider>;
    }
    export class PreviewActions extends Disposable implements IActionsProvider {
        actions: DevExpress.Analytics.Utils.IAction[];
        wrapDisposable<T>(object: T): T;
        constructor(reportPreview: DevExpress.Reporting.Viewer.ReportPreview);
        dispose(): void;
        getActions(context: DevExpress.Reporting.Viewer.ReportPreview): DevExpress.Analytics.Utils.IAction[];
    }
    export class ViewerAction extends BaseAction {
        reportPreview: DevExpress.Reporting.Viewer.ReportPreview;
        constructor(reportPreview: DevExpress.Reporting.Viewer.ReportPreview, visibilityDependencies?: Array<keyof DevExpress.Reporting.Viewer.ReportPreview>, disabilityDependencies?: Array<keyof DevExpress.Reporting.Viewer.ReportPreview>, model?: DevExpress.Analytics.Utils.IAction);
    }
    export class FullScreenActionBase extends BaseAction {
        fullscreen: DevExpress.Analytics.Internal.IGlobalSubscribableValue<boolean>;
        constructor(fullscreen: DevExpress.Analytics.Internal.IGlobalSubscribableValue<boolean>, model?: DevExpress.Analytics.Utils.IAction);
        getFullScreenImageTemplateName(): "dxrd-svg-toolbar-fullscreen-exit" | "dxrd-svg-toolbar-fullscreen";
    }
    export class ExportActionBase extends ViewerAction {
        constructor(reportPreview: DevExpress.Reporting.Viewer.ReportPreview);
        isDisabled(): boolean;
    }
    export {};
    /// <reference types="jquery" />
    export interface IFoundText {
        pageIndex: number;
        indexes: string;
        id: number;
        text: string;
    }
    export interface ISearchResult {
        matches: Array<DevExpress.Reporting.Viewer.Internal.IFoundText>;
        success: boolean;
        faultMessage: string;
    }
    export interface ISearchResultItemViewModel extends IViewModel {
        itemClickAction: (e: any) => void;
        data: DevExpress.Reporting.Viewer.Internal.IFoundText;
        attr: {
            "aria-label": string;
        };
        info: string;
    }
    interface ISearchEditorCheckBox {
        text: string;
        value: boolean;
        onValueChanged: (event: ValueChangedEvent) => void;
    }
    interface ISearchEditorArrowButton {
        template: typeof DevExpress.Analytics.Internal.editor_template;
        icon: string;
        onClick: (event: ClickEvent) => void;
    }
    export interface ISearchViewModel extends IViewModel {
        buttons: {
            searchButton: {
                text: string;
                disabled: boolean;
                onClick: (e: ClickEvent) => void;
            };
            upButton: ISearchEditorArrowButton;
            downButton: ISearchEditorArrowButton;
        };
        searchEditor: {
            onKeyDown: (e: DevExpress.ui.dxTextBox.KeyDownEvent) => void;
            onFocusOut: (e: DevExpress.ui.dxTextBox.FocusOutEvent) => void;
            inputAttr: {
                type: string;
                title: string;
            };
        };
        matchCaseEditor: ISearchEditorCheckBox;
        matchWholeWordEditor: ISearchEditorCheckBox;
        loading: boolean;
        headerText: string;
        noResultText: string;
        resultsInText: string;
        searchCompleted: boolean;
        resultsPagesText: string;
        searchResultCount: number;
        searchResultHeaderId: string;
        searchResultPageCount: number;
        searchResultDataSource: DevExpress.data.DataSource;
        doSearch: (searchUp: boolean) => void;
        onItemRendered: (event: ItemRenderedEvent) => void;
    }
    export class SearchViewModel extends BaseRenderingModel<ISearchViewModel> implements IActionsProvider {
        reportPreview: DevExpress.Reporting.Viewer.ReportPreview;
        private _cachedRequests;
        private _cachedWholeWordRequests;
        private _cachedCaseSensitiveRequests;
        private _cachedWholeWordWithCaseRequests;
        private _resultNavigator;
        private _timeoutItemRendered;
        private _searchTimeout;
        private _searchIgnoreObs;
        static createResultNavigator: (seacrhModel: DevExpress.Reporting.Viewer.Internal.SearchViewModel, reportPreview: DevExpress.Reporting.Viewer.ReportPreview) => DevExpress.Reporting.Viewer.Internal.SearchResultNavigator;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<SearchViewModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<SearchViewModel>): void;
        createViewModel(): ISearchViewModel;
        resetSearchResult(): void;
        findTextRequestDone(result: ISearchResult, cache: DevExpress.Reporting.Viewer.Internal.IFoundText[]): void;
        appentSearchResult(result: ISearchResult): void;
        performSearchAsync(text: string, reportPreview: DevExpress.Reporting.Viewer.ReportPreview, ignore?: boolean): void;
        performSearch(text: string, reportPreview: DevExpress.Reporting.Viewer.ReportPreview, cache: {
            [key: string]: DevExpress.Reporting.Viewer.Internal.IFoundText[];
        }, ignore?: boolean): void;
        mapSearchResultsToViewModels(results: {
            data: DevExpress.Reporting.Viewer.Internal.IFoundText;
        }[]): ISearchResultItemViewModel[];
        resetSearchResultDataSource(): void;
        resetDeffereds(): void;
        failRequestHandler(ignore: boolean): void;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<SearchViewModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<SearchViewModel>): void;
        constructor(reportPreview: DevExpress.Reporting.Viewer.ReportPreview, searchSettings?: DevExpress.Reporting.Viewer.Utils.ISearchSettings, enableKeyboardSupport?: boolean);
        goToResult(result: DevExpress.Reporting.Viewer.Internal.IFoundText): void;
        newSearch(text: string, matchCase: boolean, matchWholeWord: boolean): void;
        stopSearchProcess(): void;
        startSearchProcess(): void;
        searchButtonClick(): void;
        updateSearch(timeout: number): void;
        findNext(searchUp?: boolean): void;
        dispose(): void;
        onItemRendered(): void;
        getActions(context: object): DevExpress.Analytics.Utils.IAction[];
        noResultText(): string;
        getSearchButtonText(): string;
        onSearchTextChanged(e: DevExpress.ui.dxTextBox.FocusOutEvent | DevExpress.ui.dxTextBox.TextChangedEvent): void;
        tabInfo: DevExpress.Analytics.Utils.TabInfo;
        actions: DevExpress.Analytics.Utils.IAction[];
        matchWholeWord: boolean;
        matchCase: boolean;
        searchUp: boolean;
        searchText: string;
        searchResult: DevExpress.Reporting.Viewer.Internal.IFoundText[];
        searchOperationId: string;
        loading: boolean;
        searchResultCount: number;
        searchResultPageCount: number;
        stopSearchDisabled: boolean;
        searchCompleted: boolean;
        _renderedSearchResult: {
            data: DevExpress.Reporting.Viewer.Internal.IFoundText;
        }[];
        searchResultDataSource: DevExpress.data.DataSource;
        useAsyncSearch: boolean;
        searchRequestDeferred: JQuery.Deferred<any, any, any>;
        startSearchDeferred: JQuery.Deferred<any, any, any>;
        fetchLimit: number;
        pageSize: number;
    }
    export {};
    /// <reference types="jquery" />
    export interface IGetPageResponse extends IGetBrickMapResult {
        width: number;
        height: number;
        base64string: string;
    }
    export interface IGetBrickMapResult {
        brick: DevExpress.Reporting.Viewer.Utils.IBrickNode;
        columnWidthArray: Array<number>;
    }
    export enum ColumnSortOrder {
        None = 0,
        Ascending = 1,
        Descending = 2
    }
    export interface ISortingFieldInfo {
        fieldName?: string;
        sortOrder?: ColumnSortOrder;
    }
    export interface ISignatureItem {
        reason?: string;
        location?: string;
        contactInfo?: string;
        validFrom?: string;
        validTo?: string;
        issuer?: string;
        image?: string;
        key?: string;
    }
    export interface ISignatureField {
        label?: string;
        value: string;
    }
    export interface ISignatureDisplayItem {
        key: string;
        image: string;
        displayName: string;
        fields: ISignatureField[];
    }
    export interface IGeneratedDocumentData {
        documentMap?: DevExpress.Reporting.Viewer.Internal.IBookmarkNode;
        drillDownKeys?: Array<DevExpress.Reporting.IKeyValuePair<boolean>>;
        sortingState?: Array<DevExpress.Reporting.IKeyValuePair<Array<ISortingFieldInfo>>>;
        exportOptions?: string;
        canPerformContinuousExport?: boolean;
        editingFields?: Array<DevExpress.Reporting.Viewer.Editing.IEditingFieldSerializedModel>;
        displayName?: string;
        errors?: any;
        pageCount?: number;
        signatures?: ISignatureItem[];
    }
    export class PreviewRequestWrapper implements IEditingFieldHtmlProvider {
        private _callbacks?;
        private _reportPreview;
        private _parametersModel;
        private _searchModel;
        constructor(handlers?: {
            [key in keyof PreviewRequestWrapper]?: PreviewRequestWrapper[key];
        }, _callbacks?: DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler);
        static getProcessErrorCallback(reportPreview?: DevExpress.Reporting.Viewer.ReportPreview, defaultErrorMessage?: string, showMessage?: boolean): (message: string, jqXHR: JQuery.jqXHR<any>, textStatus: string) => void;
        static getPage(url: string, ignoreError?: () => boolean): JQueryPromise<DevExpress.Reporting.Viewer.Internal.IGetPageResponse>;
        initialize(reportPreview: DevExpress.Reporting.Viewer.ReportPreview, parametersModel: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel, searchModel: DevExpress.Reporting.Viewer.Internal.SearchViewModel): void;
        findTextRequest(text: string, ignore: boolean): JQueryPromise<any>;
        startSearch(text: string, ignore: boolean): JQueryPromise<any>;
        getSearchStatus(searchOperationId: string, startIndex: number, resultLimitPerRequest: number, ignore: boolean): JQueryPromise<any>;
        stopSearch(searchOperationId: string, ignore: boolean): any;
        stopBuild(id: string): void;
        sendCloseRequest(documentId: string, reportId?: string): void;
        startBuildRequest(shouldIgnoreError?: () => boolean): JQueryPromise<any>;
        getBuildStatusRequest(documentId: string, shouldIgnoreError: () => boolean, isFirstRequest: boolean, firstPageRequest: DevExpress.Reporting.Viewer.Internal.IGetPageRequest): JQueryPromise<DevExpress.Reporting.Viewer.Internal.IDocumentBuildStatus>;
        getDocumentData(documentId: string, shouldIgnoreError: () => boolean): JQueryPromise<IGeneratedDocumentData>;
        customDocumentOperation(documentId: string, serializedExportOptions: string, editindFields: any[], customData: string, hideMessageFromUser?: boolean): JQueryPromise<DevExpress.Reporting.Viewer.Utils.IDocumentOperationResult>;
        openReport(reportName: string): JQueryDeferred<DevExpress.Reporting.Viewer.Utils.IPreviewInitialize>;
        drillThrough(drillThroughData: string): JQueryDeferred<DevExpress.Reporting.Viewer.Utils.IPreviewInitialize>;
        goToReport(customData: string): JQueryDeferred<DevExpress.Reporting.Viewer.Utils.IPreviewInitialize>;
        getStartExportOperation(arg: string, shouldIgnoreError: () => boolean): JQueryDeferred<string>;
        getExportResult(requestData: any, shouldIgnoreError: () => boolean, method?: string): JQueryDeferred<Response>;
        cancelExportRequest(operationId: string, shouldIgnoreError: () => boolean): void;
        getExportStatusRequest(operationId: string): JQueryDeferred<DevExpress.Reporting.Viewer.Internal.IExportProgressStatus>;
        getEditingFieldHtml(value: unknown, editingFieldIndex: number): JQueryPromise<string>;
    }
    export class PreviewSelection {
        private _element;
        private _page;
        private _click;
        static started: boolean;
        static disabled: boolean;
        private _$element;
        private _$selectionContent;
        private _$selectionContainer;
        private _bodyEvents;
        private _startRect;
        private _getBodyScrollTop;
        private _getBodyScrollLeft;
        private _updateSelectionContent;
        private _mouseMove;
        private _mouseUp;
        private _mouseDown;
        constructor(_element: HTMLElement, _page: DevExpress.Reporting.Viewer.Internal.PreviewPage, _click: (pageIndex: number) => void);
        private _dispose;
        dispose: () => void;
    }
    export interface IBrickSelectionOptions {
        page: DevExpress.Reporting.Viewer.Internal.PreviewPage;
        click: (pageIndex: number) => void;
    }
    export function initializeBrickSelectionProg(element: HTMLElement, options: IBrickSelectionOptions): () => void;
    /// <reference types="jquery" />
    export interface IElementPosition {
        top: boolean;
        bottom?: boolean;
        left: boolean;
        right?: boolean;
    }
    export interface IProgressHandler extends IRenderingModel, IDisposable {
        text: string;
        visible: boolean;
        progress: number;
        inProgress: boolean;
        cancelText: string;
        cancelAction: () => void;
        startProgress: (startOperationId: string, onStop: (operationId: string) => void, getOperationIdPromise: JQueryPromise<string>) => JQuery.Promise<string>;
        complete: (operationId: string) => void;
        wasCancelRequested(id: string): boolean;
        setPosition: (position: DevExpress.Reporting.Viewer.Internal.IElementPosition) => void;
    }
    export interface IProgressBarViewModel extends IViewModel {
        text: string;
        visible: boolean;
        progress: number;
        cssClasses: string;
        progressBarAccessibilityKeyboardHelper: any;
        cancelButton: {
            action: () => void;
            text?: string;
            visible?: boolean;
        };
    }
    export class ProgressViewModel extends BaseRenderingModel<IProgressBarViewModel> implements IProgressHandler {
        private _startOperationId;
        private _lastOperationIdDeferred;
        private _lastOperationDeferred;
        private _cancelExportRequests;
        constructor(enableKeyboardSupport?: boolean);
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        createViewModel(): IProgressBarViewModel;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        private _rejectLastOperationIdDeferred;
        private _rejectLastOperationDeferred;
        progressBarAccessibility: DevExpress.Analytics.Internal.ListKeyboardHelper;
        visible: boolean;
        text: string;
        progress: number;
        cancelText: string;
        cancelAction: () => void;
        inProgress: boolean;
        private _operationId;
        private _isCancelling;
        private _forceInvisible;
        private _cssClasses;
        startProgress(startOperationId: string, onStop?: (operationId: string) => void, operationIdPromise?: JQueryPromise<string>): JQuery.Promise<string>;
        complete(completeOperationId: string): void;
        wasCancelRequested(id: string): boolean;
        setPosition(position: DevExpress.Reporting.Viewer.Internal.IElementPosition): void;
        dispose(): void;
    }
    export function stringToPosition(position: string): DevExpress.Reporting.Viewer.Internal.IElementPosition;
    export function getDockedElementCallback($targetElement: JQuery<Element>, $viewer: JQuery<Element>, $window: JQuery<Window>, selector: string, position?: DevExpress.Reporting.Viewer.Internal.IElementPosition): (element: Element) => void;
    export function updatePreviewContentSize(reportPreview: DevExpress.Reporting.Viewer.ReportPreview, root: HTMLElement, rtl?: boolean): (position: string) => void;
    export function updatePreviewZoomWithAutoFit(width: number, height: number, element: HTMLElement, autoFitBy?: DevExpress.Reporting.Viewer.ZoomAutoBy): number;
    export interface IPreviewPageViewModel extends IViewModel {
        pageLoading: boolean;
        brickLoading: boolean;
        displayImageSrc: string;
        width: number;
        height: number;
        loadingText: string;
        brickSelectionProg: {
            page: DevExpress.Reporting.Viewer.Internal.PreviewPage;
            preview: DevExpress.Reporting.Viewer.ReportPreview;
            click: (pageIndex: number) => void;
        };
        autoFitOptions: DevExpress.Reporting.Viewer.Internal.IAutoFitOptions;
        editingFields: any[];
        delayedInit: () => void;
        clickToBrick: (sender: DevExpress.Reporting.Viewer.Internal.IPreviewPageViewModel, event: any) => void;
        currentPageAriaLabelImgAlt: string;
        bricks: DevExpress.Reporting.Viewer.Utils.IBrickNode[];
        activeBricks: DevExpress.Reporting.Viewer.Utils.IBrickNode[];
        clickableBricks: DevExpress.Reporting.Viewer.Utils.IBrickNode[];
        setPageActiveChangedEvent: (callback: (active: boolean) => void) => () => void;
        isClientVisible: boolean;
        color: string;
        active: boolean;
        editingFieldsKeyboardHelper: DevExpress.Reporting.Viewer.PreviewEditingFieldsKeyboardHelper;
    }
    export function createPreviewPageViewModel(this: DevExpress.Reporting.Viewer.Internal.PreviewPage, base: DevExpress.Reporting.Viewer.Internal.IPreviewPageViewModel): DevExpress.Reporting.Viewer.Internal.IPreviewPageViewModel;
    export function updatePreviewPageViewModel(this: DevExpress.Reporting.Viewer.Internal.PreviewPage, args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<PreviewPage> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<PreviewPage>): void;
    export interface IToViewOptions {
        setPageActiveChangedEvent: (callback: (active: boolean) => void) => () => void;
    }
    export function initializeToViewBinding(previewPage: HTMLElement, options: IToViewOptions): () => void;
    export interface ILazyImagesOptions {
        getEnabled: () => boolean;
        setLoadVisibleImagesCallback: (callback: () => void) => () => void;
        getPage(index: number): DevExpress.Reporting.Viewer.Internal.PreviewPage;
        setPageVisibility: (page: DevExpress.Reporting.Viewer.Internal.IPreviewPageViewModel, isVisible: boolean) => void;
    }
    export function initializeLazyImagesBinding(element: HTMLElement, options: ILazyImagesOptions): () => void;
    export interface ITextCopierOptions {
        viewModel: DevExpress.Reporting.Viewer.IReportPreviewViewModel;
    }
    export function initializeTextCopierBinding(element: Element, options: ITextCopierOptions): () => void;
    export interface IAutoFitOptions {
        setAutoFitChangedEvent: (callback: () => void) => () => void;
        getPageSizeConfiguration: () => DevExpress.Reporting.Viewer.Internal.IPageSizeConfiguration;
        setZoom: (newValue: number) => void;
    }
    export interface IPageSizeConfiguration {
        skipIfInvisible: boolean;
        width: number;
        height: number;
        autoFitBy: number;
    }
    export function initializeAutoFitBinding(element: HTMLElement, autoFitOptions: DevExpress.Reporting.Viewer.Internal.IAutoFitOptions): () => void;
    export interface IChildStyleOptions {
        style: {
            [key: string]: string;
        };
        selector: string;
    }
    export function initializeChildStyleBinding(element: HTMLElement, values: IChildStyleOptions): void;
    export function initializeViewerExportBinding(element: HTMLElement, exportHandlerViewModel: DevExpress.Reporting.Viewer.Internal.IExportToolViewModel): void;
    export function convertToPercent(childSize: any, parentSize: any): string;
    export function getBrickValueForKey(brick: DevExpress.Reporting.Viewer.Utils.IBrickNode, key?: string): any;
    export function brickText(brick: DevExpress.Reporting.Viewer.Utils.IBrickNode, editingFieldsProvider?: () => DevExpress.Reporting.Viewer.Editing.EditingField[]): any;
    export function updateBricksPosition(brick: DevExpress.Reporting.Viewer.Utils.IBrickNode, height: any, width: any): void;
    export function initializeBrick(brick: DevExpress.Reporting.Viewer.Utils.IBrickNode, processClick: (target: DevExpress.Reporting.Viewer.Utils.IBrickNode, e?: JQueryEventObject) => void, editingFieldBricks: DevExpress.Reporting.Viewer.Utils.IBrickNode[]): void;
    /// <reference types="jquery" />
    export interface IGetPageRequest {
        pageIndex: number;
        documentId: string;
        resolution: number;
        includeBricks: boolean;
    }
    export class PreviewPage extends BaseRenderingModel<DevExpress.Reporting.Viewer.Internal.IPreviewPageViewModel> {
        reportPreview: DevExpress.Reporting.Viewer.ReportPreview;
        createViewModel(): DevExpress.Reporting.Viewer.Internal.IPreviewPageViewModel;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<PreviewPage> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<PreviewPage>): void;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<PreviewPage>): void;
        private _initializeEditingFields;
        private _getPixelRatio;
        private _onPageLoaded;
        private _onPageLoadFailed;
        private _updatePageSize;
        private _getAriaLabel;
        constructor(reportPreview: DevExpress.Reporting.Viewer.ReportPreview, pageIndex: number, processClick?: (target: DevExpress.Reporting.Viewer.Utils.IBrickNode) => void, subscribeToPageLoading?: boolean);
        updateSize(zoom?: number): number;
        updateActiveBricks(): void;
        activateBrick(brick: DevExpress.Reporting.Viewer.Utils.IBrickNode): void;
        deactivateBrick(brick: DevExpress.Reporting.Viewer.Utils.IBrickNode): void;
        clearBricks(): void;
        dispose(): void;
        _setPageImgSrc(documentId: string, unifier: string, zoom?: number, shouldSkipBricks?: boolean): void;
        _requestPage(preview: DevExpress.Reporting.Viewer.ReportPreview): void;
        _getCurrentPageRequest(documentId: string, shouldSkipBricks?: boolean): DevExpress.Reporting.Viewer.Internal.IGetPageRequest;
        _getPageSizeConfiguration(): DevExpress.Reporting.Viewer.Internal.IPageSizeConfiguration;
        _clear(): void;
        initializeBrick(brick: DevExpress.Reporting.Viewer.Utils.IBrickNode, processClick: (target: DevExpress.Reporting.Viewer.Utils.IBrickNode) => void, editingFieldBricks: DevExpress.Reporting.Viewer.Utils.IBrickNode[]): void;
        _clickToBrick(e: JQueryEventObject): void;
        getBricksFlatList(brick: DevExpress.Reporting.Viewer.Utils.IBrickNode): DevExpress.Reporting.Viewer.Utils.IBrickNode[];
        editingFields: DevExpress.Reporting.Viewer.Editing.EditingFieldBase[];
        selectBrick: (path: string, ctrlKey?: boolean) => void;
        resetBrickRecusive: (brick: DevExpress.Reporting.Viewer.Utils.IBrickNode) => void;
        getBricks: (pageIndex: number) => void;
        actualResolution: number;
        isEmpty: boolean;
        pageIndex: number;
        _currentScaleFactor: any;
        currentScaleFactor: number;
        imageHeight: number;
        imageWidth: number;
        color: string;
        isClientVisible: boolean;
        zoom: number;
        previewSize: number;
        autoFitBy: DevExpress.Reporting.Viewer.ZoomAutoBy;
        size: DevExpress.Analytics.Elements.INumericSize;
        originalSize: DevExpress.Analytics.Elements.INumericSize;
        imageSrcOptions: {
            rateLimit: {
                timeout: number;
                method: string;
            };
        };
        imageSrc: string;
        pageLoading: boolean;
        brickLoading: boolean;
        displayImageSrc: string;
        active: boolean;
        brick: DevExpress.Reporting.Viewer.Utils.IBrickNode;
        _unifier: string;
        currentPageAriaLabelImgAlt: string;
        shouldSkipBrickLoading: boolean;
        brickColumnWidthArray: Array<number>;
        bricks: DevExpress.Reporting.Viewer.Utils.IBrickNode[];
        activeBricks: DevExpress.Reporting.Viewer.Utils.IBrickNode[];
        clickableBricks: DevExpress.Reporting.Viewer.Utils.IBrickNode[];
        maxZoom: number;
        disableResolutionReduction: boolean;
        editingFieldsKeyboardHelper: DevExpress.Reporting.Viewer.PreviewEditingFieldsKeyboardHelper;
        shouldSendRequest: boolean;
        lastGetPageDeferred: JQueryDeferred<DevExpress.Reporting.Viewer.Internal.IGetPageResponse>;
        _onAutoFitChanged: () => void;
        _onPageActiveChanged: (active: boolean) => void;
        private _lastZoom;
        protected _selectedBrickPath: string;
        private _isDisposed;
        private _resizeTimeout;
        private _onResize;
        private _onImageSrcChanged;
        private _editingFieldsSubscriptionDispose;
    }
    export class PageLoader {
        private _preview;
        private _defaultResolution;
        private _requestCyclesLimit;
        private _currentPrefetchCycle;
        private _disabled;
        private _loadTimeout;
        get pages(): DevExpress.Reporting.Viewer.Internal.PreviewPage[];
        private _getNextStartingIndex;
        private _getPagesToUpdate;
        private _performPrefetch;
        private _scheduleNextPrefetch;
        constructor(_preview: DevExpress.Reporting.Viewer.ReportPreview);
        prefetchPages(startIndex: number, endIndex: number, currentPageIndex: number): void;
        reset(): void;
        isActive(): boolean;
    }
    export class SortingProcessor {
        private _getSortingStage;
        constructor(_getSortingStage: () => Array<DevExpress.Reporting.IKeyValuePair<Array<ISortingFieldInfo>>>);
        doSorting(sortData: DevExpress.Reporting.Viewer.Utils.ISortingData, shiftKey?: boolean, ctrlKey?: boolean): boolean;
        private _applySorting;
        private _appendSorting;
        private _detachSorting;
        private _changeSortOrder;
    }
    export interface IBreadcrumbViewModel extends IViewModel {
        listItems: IBreadcrumbItem[];
        templateName: string;
        onClick: (itemIndex: number) => void;
        visible: boolean;
    }
    export interface IBreadcrumbItem extends IViewModel {
        position: number;
        previewInitData: DevExpress.Reporting.Viewer.Utils.IPreviewInitialize;
        displayText: string;
        parameterValues: any;
        pageIndex?: number;
        indexes?: string;
        onItemClick: (previewInitData: DevExpress.Reporting.Viewer.Utils.IPreviewInitialize, parameters: {
            [path: string]: string;
        }, pageIndex?: number, indexes?: string) => void;
    }
    export class BreadcrumbItem extends BaseRenderingModel<IBreadcrumbItem> implements IBreadcrumbItem {
        constructor(position: number, previewInitData?: DevExpress.Reporting.Viewer.Utils.IPreviewInitialize, onItemClick?: (previewInitData: DevExpress.Reporting.Viewer.Utils.IPreviewInitialize, parameters: {
            [path: string]: string;
        }) => void);
        getModel(): BreadcrumbItem;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        createViewModel(): IBreadcrumbItem;
        pageIndex?: number;
        indexes?: string;
        displayText: string;
        position: number;
        parameterValues: any;
        previewInitData: DevExpress.Reporting.Viewer.Utils.IPreviewInitialize;
        onItemClick: (previewInitData: DevExpress.Reporting.Viewer.Utils.IPreviewInitialize, parameters: {
            [path: string]: string;
        }) => void;
    }
    export class BreadcrumbModel extends BaseRenderingModel<DevExpress.Reporting.Viewer.Internal.IBreadcrumbViewModel> implements IBreadcrumbViewModel {
        addItem(previewInitData: DevExpress.Reporting.Viewer.Utils.IPreviewInitialize, itemClick?: () => void, displayText?: string): void;
        reset(): void;
        updateCurrentParameters(parametersViewModel: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel): void;
        updateCurrentItem(previewInitData: DevExpress.Reporting.Viewer.Utils.IPreviewInitialize, itemClick: (previewInitData: DevExpress.Reporting.Viewer.Utils.IPreviewInitialize, parameters: {
            [path: string]: string;
        }) => void, displayText?: string): void;
        updateCurrentDocumentId(documentId: string): void;
        updateCurrentPosition(pageIndex: number, indexes: string): void;
        updateCurrentReportName(displayText: string): void;
        getCurrentPageInfo(): {
            pageIndex?: undefined;
            indexes?: undefined;
        } | {
            pageIndex: number;
            indexes: string;
        };
        private _currentIndex;
        onClick(itemIndex: number): void;
        constructor();
        dispose(): void;
        getModel(): DevExpress.Reporting.Viewer.Internal.BreadcrumbModel;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        createViewModel(): DevExpress.Reporting.Viewer.Internal.IBreadcrumbViewModel;
        templateName: string;
        updatePreviewSize: () => void;
        visible: boolean;
        listItems: IBreadcrumbItem[];
    }
    export interface IPreviewModelBase {
        rootStyle: string | {
            [key: string]: boolean;
        };
        reportPreview: DevExpress.Reporting.Viewer.ReportPreview;
        parametersModel: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel;
        exportModel: DevExpress.Reporting.Viewer.Export.ExportOptionsModel;
        searchModel: DevExpress.Reporting.Viewer.Internal.SearchViewModel;
        rtl: boolean;
        parts?: DevExpress.Analytics.Internal.IDesignerPart[];
        updateSurfaceSize?: () => void;
        resizeCallback?: () => void;
    }
    export interface IPreviewModel extends IPreviewModelBase {
        documentMapModel: DevExpress.Reporting.Viewer.Internal.DocumentMapModel;
        tabPanel: DevExpress.Analytics.Utils.TabPanel;
        actionLists: DevExpress.Reporting.Viewer.Internal.ActionLists;
        accessibilityCompliant: boolean;
        breadcrumb: DevExpress.Reporting.Viewer.Internal.BreadcrumbModel;
    }
    export interface IPreviewViewModelBase extends IViewModel {
        parts: DevExpress.Analytics.Internal.IDesignerPart[];
        reportPreview: DevExpress.Reporting.Viewer.IReportPreviewViewModel;
        exportHandler: DevExpress.Reporting.Viewer.Internal.IExportToolViewModel;
        rootStyle: string | {
            [key: string]: boolean;
        };
        rtl: boolean;
    }
    export interface IPreviewViewModel extends IPreviewViewModelBase {
        toolBar: IToolbarViewModel;
        accessibilityCompliant: boolean;
        tabPanel: DevExpress.Analytics.Utils.ITabPanelViewModel;
        breadcrumb: DevExpress.Reporting.Viewer.Internal.IBreadcrumbViewModel;
    }
    export interface IToolbarViewModel extends IViewModel {
        actionLists: DevExpress.Analytics.Internal.IActionListBaseViewModel;
        keyboardHelper: DevExpress.Analytics.Internal.ToolbarKeyboardHelper;
        canSwitchToDesigner: boolean;
    }
    export class PreviewDisposableModel extends BaseRenderingModel<IPreviewViewModelBase> implements IPreviewModelBase {
        rootStyle: string | {
            [key: string]: boolean;
        };
        reportPreview: DevExpress.Reporting.Viewer.ReportPreview;
        parametersModel: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel;
        exportModel: DevExpress.Reporting.Viewer.Export.ExportOptionsModel;
        searchModel: DevExpress.Reporting.Viewer.Internal.SearchViewModel;
        rtl: boolean;
        parts?: DevExpress.Analytics.Internal.IDesignerPart[];
        resizeCallback?: () => void;
        updateSurfaceSize?: () => void;
        constructor(options: IPreviewModelBase);
        createViewModel(): IPreviewViewModelBase;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        _addDisposable(object: DevExpress.Analytics.Utils.DisposableType): void;
        dispose(): void;
        GetParametersModel(): DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel;
        OpenReport(reportName: string): void;
        Print(pageIndex?: number): void;
        ExportTo(format: string, inlineResult?: boolean): void;
        GetCurrentPageIndex(): number;
        GoToPage(pageIndex: number): void;
        Close(): void;
        ResetParameters(): void;
        StartBuild(): void;
        PerformCustomDocumentOperation(customData?: string, hideMessageFromUser?: boolean): JQueryPromise<DevExpress.Reporting.Viewer.Utils.IDocumentOperationResult>;
    }
    export class PreviewModel extends PreviewDisposableModel implements IPreviewModel {
        documentMapModel: DevExpress.Reporting.Viewer.Internal.DocumentMapModel;
        tabPanel: DevExpress.Analytics.Utils.TabPanel;
        actionLists: DevExpress.Reporting.Viewer.Internal.ActionLists;
        accessibilityCompliant: boolean;
        createViewModel(): IPreviewViewModel;
        constructor(options: IPreviewModel);
        breadcrumb: DevExpress.Reporting.Viewer.Internal.BreadcrumbModel;
        getViewModel: () => IPreviewViewModel;
    }
    export function getUpdateProgressBarCallback(progressBarSettings: DevExpress.Reporting.Viewer.Utils.IProgressBarSettings, designerModel: DevExpress.Reporting.Viewer.Internal.PreviewDisposableModel, reportPreview: DevExpress.Reporting.Viewer.ReportPreview, rootElement: Element, $window?: JQuery<Window>): () => void;
    /// <reference types="jquery" />
    export function createDesktopPreview(bindingSettings: DevExpress.Reporting.Viewer.Utils.IBindingSettings): DevExpress.Reporting.Viewer.Internal.PreviewModel;
    export function createPreview(bindingSettings: DevExpress.Reporting.Viewer.Utils.IBindingSettings): JQueryDeferred<DevExpress.Reporting.Viewer.Internal.PreviewDisposableModel>;
    export function createPreviewModel(viewerModel: DevExpress.Reporting.Viewer.Utils.IWebDocumentViewerModel, element: HTMLElement, callbacks?: DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler, applyBindings?: boolean): JQueryDeferred<DevExpress.Reporting.Viewer.Internal.PreviewDisposableModel>;
    export function initPreviewModel(previewModel: DevExpress.Reporting.Viewer.Internal.PreviewDisposableModel, viewerModel: DevExpress.Reporting.Viewer.Utils.IWebDocumentViewerModel): void;
    export {};
}
declare module DevExpress.Reporting.Viewer {
    import ListKeyboardHelper = DevExpress.Analytics.Internal.ListKeyboardHelper;
    import SearchViewModel = DevExpress.Reporting.Viewer.Internal.SearchViewModel;
    import AccessibilityControlElementBase = DevExpress.Analytics.Internal.AccessibilityControlElementBase;
    import AccessibilityKeyboardHelperBase = DevExpress.Analytics.Internal.AccessibilityKeyboardHelperBase;
    import EditingFieldBase = DevExpress.Reporting.Viewer.Editing.EditingFieldBase;
    import PreviewPage = DevExpress.Reporting.Viewer.Internal.PreviewPage;
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import IViewModel = DevExpress.Analytics.Serializer.Native.IViewModel;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import PreviewBricksKeyboardHelper = DevExpress.Reporting.Viewer.PreviewBricksKeyboardHelper;
    import ILazyImagesOptions = DevExpress.Reporting.Viewer.Internal.ILazyImagesOptions;
    import IPreviewPageViewModel = DevExpress.Reporting.Viewer.Internal.IPreviewPageViewModel;
    import ISignatureDisplayItem = DevExpress.Reporting.Viewer.Internal.ISignatureDisplayItem;
    import IProgressBarViewModel = DevExpress.Reporting.Viewer.Internal.IProgressBarViewModel;
    import ReportPreview = DevExpress.Reporting.Viewer.ReportPreview;
    import KeyboardHelperWithArrowButtonBase = DevExpress.Analytics.Internal.KeyboardHelperWithArrowButtonBase;
    import BaseRenderingModel = DevExpress.Analytics.Serializer.Native.BaseRenderingModel;
    import TabPanel = DevExpress.Analytics.Utils.TabPanel;
    import ZoomAutoBy = DevExpress.Reporting.Viewer.ZoomAutoBy;
    import IBookmarkNode = DevExpress.Reporting.Viewer.Internal.IBookmarkNode;
    import EditingField = DevExpress.Reporting.Viewer.Editing.EditingField;
    import IEditingFieldSerializedModel = DevExpress.Reporting.Viewer.Editing.IEditingFieldSerializedModel;
    import ExportOptionsPreview = DevExpress.Reporting.Viewer.Export.ExportOptionsPreview;
    import ExportHandler = DevExpress.Reporting.Viewer.Internal.ExportHandler;
    import PageLoader = DevExpress.Reporting.Viewer.Internal.PageLoader;
    import IDocumentBuildStatus = DevExpress.Reporting.Viewer.Internal.IDocumentBuildStatus;
    import PreviewHandlersHelper = DevExpress.Reporting.Viewer.Internal.PreviewHandlersHelper;
    import PreviewRequestWrapper = DevExpress.Reporting.Viewer.Internal.PreviewRequestWrapper;
    import IProgressHandler = DevExpress.Reporting.Viewer.Internal.IProgressHandler;
    import IReportParametersInfo = DevExpress.Reporting.Viewer.Parameters.IReportParametersInfo;
    import PreviewParametersViewModel = DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel;
    import IReportPreviewViewModel = DevExpress.Reporting.Viewer.IReportPreviewViewModel;
    import IExportSettings = DevExpress.Reporting.Viewer.Utils.IExportSettings;
    import IPreviewCustomizationHandler = DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler;
    import IPreviewExportOptionsCustomizationArgs = DevExpress.Reporting.Viewer.Utils.IPreviewExportOptionsCustomizationArgs;
    import IPreviewInitialize = DevExpress.Reporting.Viewer.Utils.IPreviewInitialize;
    import IBrickNode = DevExpress.Reporting.Viewer.Utils.IBrickNode;
    import IBrickNodeNavigation = DevExpress.Reporting.Viewer.Utils.IBrickNodeNavigation;
    import IDocumentOperationResult = DevExpress.Reporting.Viewer.Utils.IDocumentOperationResult;
    import BreadcrumbModel = DevExpress.Reporting.Viewer.Internal.BreadcrumbModel;
    import ControlElementWithParentHighlight = DevExpress.Analytics.Internal.ControlElementWithParentHighlight;
    import DateRangeEditor = DevExpress.Reporting.Viewer.Widgets.DateRangeEditor;
    import BaseModel = DevExpress.Analytics.Serializer.Native.BaseModel;
    import PreviewDisposableModel = DevExpress.Reporting.Viewer.Internal.PreviewDisposableModel;
    import ICommonBindingCustomizationHandler = DevExpress.Analytics.Internal.ICommonBindingCustomizationHandler;
    import IJSDesignerBindingCommonOptions = DevExpress.Analytics.Internal.IJSDesignerBindingCommonOptions;
    import JSDesignerBindingCommon = DevExpress.Analytics.Internal.JSDesignerBindingCommon;
    import IWebDocumentViewerSettings = DevExpress.Reporting.Viewer.Utils.IWebDocumentViewerSettings;
    import JSReportViewer = DevExpress.Reporting.Viewer.JSReportViewer;
    import IPreviewCustomizationCallbacksPublic = DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationCallbacksPublic;
    import DxAnalyticsComponentCommon = DevExpress.Analytics.Internal.DxAnalyticsComponentCommon;
    import IReportViewerOptions = DevExpress.Reporting.Viewer.IReportViewerOptions;
    export class SearchKeyboardHelper extends ListKeyboardHelper {
        liveRegionId: string;
        constructor(searchModel: DevExpress.Reporting.Viewer.Internal.SearchViewModel);
    }
    export const ActionId: {
        Design: string;
        FirstPage: string;
        PrevPage: string;
        Pagination: string;
        NextPage: string;
        LastPage: string;
        MultipageToggle: string;
        HighlightEditingFields: string;
        ZoomOut: string;
        ZoomSelector: string;
        ZoomIn: string;
        Print: string;
        PrintPage: string;
        ExportTo: string;
        Search: string;
        FullScreen: string;
    };
    export const ExportFormatID: {
        PDF: {
            text: string;
            textId: string;
            format: string;
        };
        XLS: {
            text: string;
            textId: string;
            format: string;
        };
        XLSX: {
            text: string;
            textId: string;
            format: string;
        };
        RTF: {
            text: string;
            textId: string;
            format: string;
        };
        MHT: {
            text: string;
            textId: string;
            format: string;
        };
        HTML: {
            text: string;
            textId: string;
            format: string;
        };
        Text: {
            text: string;
            textId: string;
            format: string;
            propertyName: string;
        };
        CSV: {
            text: string;
            textId: string;
            format: string;
        };
        Image: {
            text: string;
            textId: string;
            format: string;
        };
        DOCX: {
            text: string;
            textId: string;
            format: string;
        };
    };
    export const PreviewElements: {
        Toolbar: string;
        Breadcrumb: string;
        Surface: string;
        RightPanel: string;
        ExportTool: string;
    };
    export enum ZoomAutoBy {
        None = 1,
        WholePage = 0,
        PageWidth = -1
    }
    export class PreviewEditingFieldsKeyboardHelper extends AccessibilityKeyboardHelperBase {
        private _page;
        controlElementClassName: string;
        accessibilityCompliantEnabled: boolean;
        constructor(_page: DevExpress.Reporting.Viewer.Internal.PreviewPage);
        initialize(): void;
        clickHandler(): void;
        itemHandleEnterKey(e: any, index: any): boolean;
        itemHandleSpaceKey(e: any, index: any): boolean;
        createControlElement(element: HTMLElement, index?: number): PreviewEditingFieldsElement;
    }
    class PreviewEditingFieldsElement extends AccessibilityControlElementBase {
        element: HTMLElement;
        private model;
        private _processFocus;
        dispose(): void;
        actionExecute(e: FocusEvent): void;
        private _isClick;
        private _activateHandler;
        private _blur;
        constructor(element: HTMLElement, model: DevExpress.Reporting.Viewer.Editing.EditingFieldBase);
    }
    export {};
    export interface IReportPreviewViewModel extends IViewModel {
        rtlReport: boolean;
        editingFieldsHighlighted: boolean;
        progressBar: DevExpress.Reporting.Viewer.Internal.IProgressBarViewModel;
        currentPage: DevExpress.Reporting.Viewer.Internal.IPreviewPageViewModel;
        pages: DevExpress.Reporting.Viewer.Internal.IPreviewPageViewModel[];
        showMultipagePreview: boolean;
        emptyDocumentCaption: string;
        previewVisible: boolean;
        lazyImagesOptions: DevExpress.Reporting.Viewer.Internal.ILazyImagesOptions;
        getSelectedContent: (mask?: string) => string;
        delayedInit: () => void;
        signatures: DevExpress.Reporting.Viewer.Internal.ISignatureDisplayItem[];
        previewBrickKeyboardHelper: DevExpress.Reporting.Viewer.PreviewBricksKeyboardHelper;
    }
    export function createReportPreviewViewModel(this: DevExpress.Reporting.Viewer.ReportPreview, base: DevExpress.Reporting.Viewer.IReportPreviewViewModel): DevExpress.Reporting.Viewer.IReportPreviewViewModel;
    export function updateReportPreviewViewModel(this: DevExpress.Reporting.Viewer.ReportPreview, args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<ReportPreview> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<ReportPreview>): void;
    export class PreviewBricksKeyboardHelper extends KeyboardHelperWithArrowButtonBase {
        controlElementClassName: string;
        liveRegionId: string;
        private _needFocusNext;
        private _currentPage;
        private _firstSelectedBrickIndex;
        private _lastSelectedBrickIndex;
        private _resetBricksIndexes;
        private _resetBricks;
        private _activeBricksSubscription;
        private _bricks;
        private _getSelectedContent;
        private _usePageKeyboardNavigation;
        private _pages;
        private _goToPage;
        private _initTimeout;
        private _liveRegionTimeout;
        private _afterInitializeCallback;
        dispose(): void;
        delayedInit: () => void;
        constructor(viewModel: DevExpress.Reporting.Viewer.ReportPreview);
        reset: () => void;
        initialize(): void;
        clickHandler(): void;
        itemHandleEscKey(e: any, index: any): boolean;
        private _actionExecute;
        private _getNonEmptyBrick;
        private _pageChangeHandle;
        private _activatePage;
        itemHandleHomeKey(e: any, index: any): boolean;
        itemHandleEndKey(e: any, index: any): boolean;
        itemHandleLeftArrowKey(e: any, index: any): boolean;
        itemHandleRightArrowKey(e: any, index: any): boolean;
        itemHandleEnterKey(e: any, index: any): boolean;
        itemHandleSpaceKey(e: any, index: any): boolean;
        setFocusToPrevious(currentIndex: number): number;
        setFocusToNext(currentIndex: number): number;
        createControlElement(element: HTMLElement, index?: number): PreviewPageControlsElement;
        active: boolean;
    }
    class PreviewPageControlsElement extends AccessibilityControlElementBase {
        element: HTMLElement;
        private _keyboardHelper;
        dispose(): void;
        private _focusHandler;
        constructor(element: HTMLElement, _keyboardHelper: DevExpress.Reporting.Viewer.PreviewBricksKeyboardHelper);
    }
    export {};
    /// <reference types="jquery" />
    export class ReportPreview extends BaseRenderingModel<DevExpress.Reporting.Viewer.IReportPreviewViewModel> {
        private enableKeyboardSupport?;
        private element?;
        predefinedZoomLevels: number[];
        _stopBuildRequests: {
            [key: string]: boolean;
        };
        _closeReportRequests: {
            [key: string]: boolean;
        };
        _closeDocumentRequests: {
            [key: string]: boolean;
        };
        _cancelExportRequests: {
            [key: string]: boolean;
        };
        _breadcrumb: DevExpress.Reporting.Viewer.Internal.BreadcrumbModel;
        private _openReportOperationDeferred;
        _startBuildOperationId: string;
        private _drillDownState;
        private _sortingState;
        private _sortingProcessor;
        private _getBuildStatusDeferreds;
        private _onGetBuildStatus;
        private _onGetDocumentDetails;
        private _initialDocumentData;
        private _timeouts;
        private _deferreds;
        private _doDrillDown;
        private _doSorting;
        dispose(): void;
        private _onDocumentBuildingChanged;
        private _updateCurrentPage;
        private _onOriginalZoomChanged;
        private _onSignaturesChanged;
        removePage(page: DevExpress.Reporting.Viewer.Internal.PreviewPage): void;
        removeAllPages(): void;
        removeEmptyPages(all?: boolean): void;
        private _initialize;
        createPage(pageIndex: number, processClick?: (target: DevExpress.Reporting.Viewer.Utils.IBrickNode) => void, subscribeToPageLoading?: boolean): DevExpress.Reporting.Viewer.Internal.PreviewPage;
        private _getIgnorePredicate;
        private _cleanTabInfo;
        private _clearReportInfo;
        createBrickClickProcessor(cyclePageIndex: number): (brick: DevExpress.Reporting.Viewer.Utils.IBrickNode, e?: JQueryEventObject) => void;
        constructor(handlerUri?: string, previewRequestWrapper?: DevExpress.Reporting.Viewer.Internal.PreviewRequestWrapper, previewHandlersHelper?: DevExpress.Reporting.Viewer.Internal.PreviewHandlersHelper, callbacks?: DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler, rtl?: boolean, enableKeyboardSupport?: boolean, exportSettings?: DevExpress.Reporting.Viewer.Utils.IExportSettings, element?: Element, breadcrumb?: DevExpress.Reporting.Viewer.Internal.BreadcrumbModel);
        delayedInit(): void;
        openReport(reportName: string): JQueryPromise<DevExpress.Reporting.Viewer.Utils.IPreviewInitialize>;
        goToReport(customData?: string, closeCurrentReport?: boolean): JQueryPromise<DevExpress.Reporting.Viewer.Utils.IPreviewInitialize>;
        drillThrough(drillThroughData: string): JQueryPromise<DevExpress.Reporting.Viewer.Utils.IPreviewInitialize>;
        _sortCustomParametersLookUpValues(reportParameterInfo?: DevExpress.Reporting.Viewer.Parameters.IReportParametersInfo): void;
        _resolveFirstPage(status: DevExpress.Reporting.Viewer.Internal.IDocumentBuildStatus): void;
        initialize(initializeDataPromise: JQueryPromise<DevExpress.Reporting.Viewer.Utils.IPreviewInitialize>, closeDocument?: boolean): JQueryPromise<DevExpress.Reporting.Viewer.Utils.IPreviewInitialize>;
        private _deserializeExportOptions;
        deactivate(): void;
        startBuild(): JQuery.Promise<boolean>;
        customDocumentOperation(customData?: string, hideMessageFromUser?: boolean): JQueryPromise<DevExpress.Reporting.Viewer.Utils.IDocumentOperationResult>;
        _initializeStartBuild(documentIdPromise: JQueryPromise<string>): boolean;
        _startBuildRequest(): JQuery.Promise<boolean>;
        getBuildStatus(documentId: string, isFirstRequest: boolean, shouldRequestFirstPage: boolean): JQueryPromise<DevExpress.Reporting.Viewer.Internal.IDocumentBuildStatus>;
        getDoGetBuildStatusFunc(shouldRequestFirstPage?: boolean): (documentId: string) => void;
        getDocumentData(documentId: string): void;
        exportDocumentTo(format: string, inlineResult?: boolean): void;
        printDocument(pageIndex?: number): void;
        stopBuild(documentId?: string): void;
        closeDocument(documentId?: string): void;
        closeReport(): void;
        setPageVisibility(page: DevExpress.Reporting.Viewer.Internal.PreviewPage, visible: boolean): void;
        updatePage(page: DevExpress.Reporting.Viewer.Internal.PreviewPage, zoom?: number): void;
        goToPage(pageIndex: number, forcePageChanging?: boolean, throttle?: number): void;
        private _goToPageTimer;
        getSelectedContent: (punctuationMark?: string) => string;
        createEditingField(item: DevExpress.Reporting.Viewer.Editing.IEditingFieldSerializedModel, index: number): DevExpress.Reporting.Viewer.Editing.EditingField;
        rtlViewer: boolean;
        exportHandler: DevExpress.Reporting.Viewer.Internal.ExportHandler;
        previewHandlersHelper: DevExpress.Reporting.Viewer.Internal.PreviewHandlersHelper;
        originalParametersInfo: DevExpress.Reporting.Viewer.Parameters.IReportParametersInfo;
        exportOptionsModel: DevExpress.Reporting.Viewer.Export.ExportOptionsPreview;
        errorMessage: string;
        reportOpening: boolean;
        progressBar: DevExpress.Reporting.Viewer.Internal.IProgressHandler;
        customProcessBrickClick: (pageNamber: number, brick: DevExpress.Reporting.Viewer.Utils.IBrickNode, defaultHandler: () => void) => boolean;
        documentReady: (documentId: string, reportId: string, pageCount: number) => void;
        brickClickDocumentMapHandler: (navigationBrick: DevExpress.Reporting.Viewer.Utils.IBrickNodeNavigation) => void;
        editingFieldChanged: (field: DevExpress.Reporting.Viewer.Editing.EditingField, oldVal: any, newVal: any) => void;
        customizeExportOptions: (options: DevExpress.Reporting.Viewer.Utils.IPreviewExportOptionsCustomizationArgs) => void;
        disposePagesChangedEvent: () => void;
        exportDisabled: boolean;
        private _updateExportDisabled;
        tabPanel: DevExpress.Analytics.Utils.TabPanel;
        pages: DevExpress.Reporting.Viewer.Internal.PreviewPage[];
        pageIndex: number;
        currentPage: DevExpress.Reporting.Viewer.Internal.PreviewPage;
        showMultipagePreview: boolean;
        rtlReport: boolean;
        editingFieldsHighlighted: boolean;
        documentMap: DevExpress.Reporting.Viewer.Internal.IBookmarkNode;
        pageLoading: boolean;
        autoFitBy: DevExpress.Reporting.Viewer.ZoomAutoBy;
        originalZoom: number;
        zoom: number;
        previewSize: number;
        documentId: string;
        reportId: string;
        reportUrl: string;
        documentBuilding: boolean;
        _unifier: string;
        _pageWidth: number;
        _pageHeight: number;
        _pageBackColor: string;
        emptyDocumentCaption: string;
        exportOptionsTabVisible: boolean;
        previewVisible: boolean;
        _editingFields: DevExpress.Reporting.Viewer.Editing.EditingField[];
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<ReportPreview>): void;
        createViewModel(): DevExpress.Reporting.Viewer.IReportPreviewViewModel;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<ReportPreview> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<ReportPreview>): void;
        editingFieldsProvider: () => DevExpress.Reporting.Viewer.Editing.EditingField[];
        _getErrorMessage(jqXHR: JQuery.jqXHR): string;
        _processError(error: string, jqXHR?: JQuery.jqXHR, showForUser?: boolean, serverError?: string): void;
        _getToastMessageContainer(): Element;
        _raiseOnSizeChanged: () => void;
        _loadVisibleImages: (timeout?: number) => void;
        _getPagesViewModels: () => DevExpress.Reporting.Viewer.Internal.IPreviewPageViewModel[];
        canSwitchToDesigner: boolean;
        allowURLsWithJSContent: boolean;
        requestWrapper: DevExpress.Reporting.Viewer.Internal.PreviewRequestWrapper;
        zoomStep: number;
        private _progressFirstTime;
        private _updateEmptyDocumentCaption;
        signatures: DevExpress.Reporting.Viewer.Internal.ISignatureDisplayItem[];
        previewParametersViewModel: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel;
        previewBrickKeyboardHelper: DevExpress.Reporting.Viewer.PreviewBricksKeyboardHelper;
        pageLoader: DevExpress.Reporting.Viewer.Internal.PageLoader;
    }
    export class DateRangeDialogElementWithHighlight extends ControlElementWithParentHighlight {
        element: HTMLElement;
        elementClassName: string;
        private _getTargetElement;
        dateRangeItemHandleFocus: () => void;
        dispose(): void;
        constructor(element: HTMLElement, _parentElement: Element);
    }
    export class DateRangeDialogElementsKeyboardHelper extends AccessibilityKeyboardHelperBase {
        private _dateRangeEditor;
        controlElementClassName: string;
        predefinedDateRangesKeyboardHelper: PredefinedDateRangesKeyboardHelper;
        _next: number;
        createControlElement(element: HTMLElement, index?: number): DateRangeDialogElementWithHighlight;
        constructor(_dateRangeEditor: DevExpress.Reporting.Viewer.Widgets.DateRangeEditor);
        itemHandleEscKey(e: any, index?: any): boolean;
        itemHandleUpArrowKey(e: any, index?: any): boolean;
        itemHandleTabKey(e: any, index: any): boolean;
        itemHandleShiftTabKey(e: any, index?: any): boolean;
        handleTabKey(e: any): boolean;
        setFocusToNext(currentIndex: number, roundTrip?: boolean): number;
    }
    export class PredefinedDateRangesKeyboardHelper extends ListKeyboardHelper {
        private owner;
        constructor(owner: DateRangeDialogElementsKeyboardHelper);
        itemHandleEscKey(e: any, index: any): boolean;
        itemHandleTabKey(e: any, index: any): boolean;
        itemHandleShiftTabKey(e: any, index?: any): boolean;
        itemHandleUpArrowKey(e: any, index: any): any;
    }
    export const MobilePreviewElements: {
        Surface: string;
        Search: string;
        Pages: string;
        MobileActions: string;
        Parameters: string;
    };
    export class JSReportViewer extends BaseModel {
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        dispose(): void;
        previewModel: DevExpress.Reporting.Viewer.Internal.PreviewDisposableModel;
        constructor(_previewModel: ko.Observable<DevExpress.Reporting.Viewer.Internal.PreviewDisposableModel>);
        previewExists(): DevExpress.Reporting.ReportPreview;
        GetReportPreview(): DevExpress.Reporting.ReportPreview;
        GetPreviewModel(): DevExpress.Reporting.Viewer.Internal.PreviewDisposableModel;
        GetParametersModel(): DevExpress.Reporting.PreviewParametersViewModel;
        PerformCustomDocumentOperation(customData: any, hideMessageFromUser: any): JQueryPromise<DevExpress.Reporting.Designer.Utils.IDocumentOperationResult>;
        OpenReport(reportName: any): void;
        Print(pageIndex: any): void;
        ExportTo(format: any, inlineResult: any): void;
        GetCurrentPageIndex(): number;
        GoToPage(pageIndex: any): void;
        Close(): void;
        ResetParameters(): void;
        StartBuild(): void;
        UpdateLocalization(localization: any): void;
        AdjustControlCore(): void;
    }
    /// <reference types="jquery" />
    export interface IJSReportViewerCallbacks extends IPreviewCustomizationHandler, ICommonBindingCustomizationHandler<DevExpress.Reporting.Viewer.JSReportViewer>, IPreviewCustomizationCallbacksPublic<DevExpress.Reporting.Viewer.JSReportViewer> {
    }
    export interface IReportViewerOptions extends IJSDesignerBindingCommonOptions, IWebDocumentViewerSettings {
        viewerModel?: any;
        reportPreview?: any;
        callbacks?: IJSReportViewerCallbacks;
        parts?: any[];
        handlerUri?: string;
        requestOptions?: {
            host?: string;
            invokeAction: string;
            getLocalizationAction?: string;
        };
        documentId?: string;
        reportId?: string;
        reportUrl?: any;
        keepReportOnComponentDisposal?: boolean;
    }
    export class JSReportViewerBinding extends JSDesignerBindingCommon<DevExpress.Reporting.Viewer.JSReportViewer, DevExpress.Reporting.Viewer.IReportViewerOptions> {
        private _shouldApplyBindings;
        private _callbacks;
        private _deferreds;
        private _closeReportOnDisposing;
        dispose(): void;
        private _initializeCallbacks;
        private _applyBindings;
        constructor(_options: DevExpress.Reporting.Viewer.IReportViewerOptions, customEventRaiser?: (eventName: string, args?: any) => void, _shouldApplyBindings?: boolean);
        _createModel(element: HTMLElement): JQueryDeferred<DevExpress.Reporting.Viewer.Internal.PreviewDisposableModel>;
        applyBindings(element: HTMLElement): void;
    }
    export class DxReportViewer extends DxAnalyticsComponentCommon<DevExpress.Reporting.Viewer.IReportViewerOptions> {
        constructor(_element: HTMLElement, _options: DevExpress.Reporting.Viewer.IReportViewerOptions);
        getBindingName(): string;
    }
}
declare module DevExpress.Reporting.Viewer.Export {
    import CsvExportOptions = DevExpress.Reporting.Export.CsvExportOptions;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import MultiPlatformObservable = DevExpress.Analytics.Serializer.Native.MultiPlatformObservable;
    import IModelSerializer = DevExpress.Analytics.Serializer.Native.IModelSerializer;
    import HtmlExportOptions = DevExpress.Reporting.Export.HtmlExportOptions;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import ImageExportOptions = DevExpress.Reporting.Export.ImageExportOptions;
    import MhtExportOptions = DevExpress.Reporting.Export.MhtExportOptions;
    import RtfExportOptions = DevExpress.Reporting.Export.RtfExportOptions;
    import XlsExportOptions = DevExpress.Reporting.Export.XlsExportOptions;
    import XlsxExportOptions = DevExpress.Reporting.Export.XlsxExportOptions;
    import DocxExportOptions = DevExpress.Reporting.Export.DocxExportOptions;
    import PdfExportOptions = DevExpress.Reporting.Export.PdfExportOptions;
    import ISignatureDisplayItem = DevExpress.Reporting.Viewer.Internal.ISignatureDisplayItem;
    import ExportOptions = DevExpress.Reporting.Export.ExportOptions;
    import ActionListsBase = DevExpress.Analytics.Internal.ActionListsBase;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import IActionViewModel = DevExpress.Analytics.Utils.IActionViewModel;
    import TabInfoWithPropertyGrid = DevExpress.Analytics.Utils.TabInfoWithPropertyGrid;
    import ReportPreview = DevExpress.Reporting.Viewer.ReportPreview;
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import IExportActionItem = DevExpress.Reporting.Viewer.Internal.IExportActionItem;
    import ExportActionBase = DevExpress.Reporting.Viewer.Internal.ExportActionBase;
    export class CsvExportOptionsPreview extends CsvExportOptions {
        isPropertyVisible(name: string): boolean;
        isPropertyDisabled(name: string): boolean;
    }
    export const rtfExportModeMergedPreview: DevExpress.Analytics.Utils.ISerializationInfo;
    export const docxExportModeMergedPreview: DevExpress.Analytics.Utils.ISerializationInfo;
    export const excludeModesForMergedDocuments = "SingleFilePageByPage";
    export const exportModePreviewBase: {
        from: (val: string, serializer: DevExpress.Analytics.Serializer.Native.IModelSerializer) => DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
    };
    export const htmlExportModePreviewBase: DevExpress.Analytics.Utils.ISerializationInfo;
    export const htmlExportModePreview: DevExpress.Analytics.Utils.ISerializationInfo;
    export const htmlExportModeMergedPreview: DevExpress.Analytics.Utils.ISerializationInfo;
    export const xlsExportModePreviewBase: DevExpress.Analytics.Utils.ISerializationInfo;
    export const xlsExportModePreview: DevExpress.Analytics.Utils.ISerializationInfo;
    export const xlsExportModeMergedPreview: DevExpress.Analytics.Utils.ISerializationInfo;
    export const imageExportModePreviewBase: DevExpress.Analytics.Utils.ISerializationInfo;
    export const imageExportModePreview: DevExpress.Analytics.Utils.ISerializationInfo;
    export const imageExportModeMergedPreview: DevExpress.Analytics.Utils.ISerializationInfo;
    export const xlsxExportModePreviewBase: DevExpress.Analytics.Utils.ISerializationInfo;
    export const xlsxExportModePreview: DevExpress.Analytics.Utils.ISerializationInfo;
    export const xlsxExportModeMergedPreview: DevExpress.Analytics.Utils.ISerializationInfo;
    export class HtmlExportOptionsPreview extends HtmlExportOptions {
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        _getVariableInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class HtmlExportOptionsMergedPreview extends HtmlExportOptionsPreview {
        _getVariableInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        constructor(model: any, serializer: any);
    }
    export class ImageExportOptionsPreview extends ImageExportOptions {
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        _getVariableInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class ImageExportOptionsMergedPreview extends ImageExportOptionsPreview {
        _getVariableInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        constructor(model: any, serializer: any);
    }
    export class MhtExportOptionsPreview extends MhtExportOptions {
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        _getVariableInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class MhtExportOptionsMergedPreview extends MhtExportOptionsPreview {
        _getVariableInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        constructor(model: any, serializer: any);
    }
    export class RtfExportOptionsPreview extends RtfExportOptions {
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        _getVariableInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class RtfExportOptionsMergedPreview extends RtfExportOptionsPreview {
        _getVariableInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        constructor(model: any, serializer: any);
    }
    export class XlsExportOptionsPreview extends XlsExportOptions {
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        _getVariableInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class XlsExportOptionsMergedPreview extends XlsExportOptionsPreview {
        _getVariableInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        constructor(model: any, serializer: any);
    }
    export class XlsxExportOptionsPreview extends XlsxExportOptions {
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        _getVariableInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class XlsxExportOptionsMergedPreview extends XlsxExportOptionsPreview {
        _getVariableInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        constructor(model: any, serializer: any);
    }
    export class DocxExportOptionsPreview extends DocxExportOptions {
        static toJson(value: any, serializer: any, refs: any): any;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        _getVariableInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class DocxExportOptionsMergedPreview extends DocxExportOptionsPreview {
        _getVariableInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyDisabled(name: string): boolean;
        constructor(model: any, serializer: any);
    }
    export class PdfExportOptionsPreview extends PdfExportOptions {
        private _signatures;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isPropertyVisible(name: string): boolean;
        constructor(model: object, serializer: DevExpress.Analytics.Serializer.Native.IModelSerializer, _signatures: DevExpress.Reporting.Viewer.Internal.ISignatureDisplayItem[]);
        signature: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<string>;
    }
    export class ExportOptionsPreview extends ExportOptions {
        protected _signatures: DevExpress.Reporting.Viewer.Internal.ISignatureDisplayItem[];
        _generateFromFunction(exportType: any): (model: any, serializer: any) => any;
        constructor(_signatures: DevExpress.Reporting.Viewer.Internal.ISignatureDisplayItem[]);
        hasSensitiveData(): boolean;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        pdf: DevExpress.Reporting.Export.PdfExportOptions;
    }
    export class ExportOptionsMergedPreview extends ExportOptionsPreview {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class ExportOptionsModel extends Disposable {
        private _reportPreview;
        constructor(reportPreview: DevExpress.Reporting.Viewer.ReportPreview, enableKeyboardSupport?: boolean);
        _getExportFormatItems(): Array<{
            text: string;
            format: string;
        }>;
        _exportDocumentByFormat(format: any): void;
        getActions(context: any): any[];
        dispose(): void;
        actions: any[];
        tabInfo: DevExpress.Analytics.Utils.TabInfoWithPropertyGrid;
    }
    export class ExportOptionsEventHandlers {
        private _menuButton;
        onSubmenuShowing(popupContainer: any, element: any): (e: any) => void;
        onSubmenuShown(e: any): void;
        onSubmenuHiding(e: any): void;
        onItemRendered(e: any): void;
    }
    export interface IExportActionViewModel extends IActionViewModel {
        widget: {
            items: {
                text: string;
                imageClassName: string;
                imageTemplateName: string;
                format?: any;
                items?: IExportActionViewModel["widget"]["items"];
            }[];
            onItemClick: (e: any) => void;
            onSubmenuShowing: (container: HTMLElement, element: HTMLElement) => (e: any) => void;
            onSubmenuShown: (e: any) => void;
            onSubmenuHiding: (e: any) => void;
            onItemRendered: (e: any) => void;
        };
        getPopupContainer: (e: any) => HTMLElement;
    }
    export class ExportAction extends ExportActionBase {
        model: ExportOptionsModel;
        constructor(reportPreview: DevExpress.Reporting.Viewer.ReportPreview, model: ExportOptionsModel);
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<ExportAction> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<ExportAction>): void;
        createViewModel(parent: DevExpress.Analytics.Internal.ActionListsBase, index: number): DevExpress.Analytics.Utils.IActionViewModel;
        getExportItems(): DevExpress.Reporting.Viewer.Internal.IExportActionItem[];
        items: DevExpress.Reporting.Viewer.Internal.IExportActionItem[];
        eventHandlers: ExportOptionsEventHandlers;
    }
}
declare module DevExpress.Reporting.Viewer.Utils {
    import IDesignerPart = DevExpress.Analytics.Internal.IDesignerPart;
    import IGlobalizeSettings = DevExpress.Analytics.Internal.IGlobalizeSettings;
    import ILocalizationSettings = DevExpress.Analytics.Internal.ILocalizationSettings;
    import _ICommonCallbacksHandler = DevExpress.Analytics.Internal._ICommonCallbacksHandler;
    import IDisplayedValue = DevExpress.Analytics.Utils.IDisplayedValue;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import TabPanel = DevExpress.Analytics.Utils.TabPanel;
    import IKeyValuePair = DevExpress.Reporting.IKeyValuePair;
    import EditingField = DevExpress.Reporting.Viewer.Editing.EditingField;
    import ExportOptionsPreview = DevExpress.Reporting.Viewer.Export.ExportOptionsPreview;
    import IGeneratedDocumentData = DevExpress.Reporting.Viewer.Internal.IGeneratedDocumentData;
    import IParameter = DevExpress.Reporting.Viewer.Parameters.IParameter;
    import IParameterDescriptor = DevExpress.Reporting.Viewer.Parameters.IParameterDescriptor;
    import IReportParametersInfo = DevExpress.Reporting.Viewer.Parameters.IReportParametersInfo;
    import PreviewParametersViewModel = DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel;
    import ReportPreview = DevExpress.Reporting.Viewer.ReportPreview;
    import IBrickNode = DevExpress.Reporting.Viewer.Utils.IBrickNode;
    import ExportResultRequestData = DevExpress.Reporting.Viewer.Internal.ExportResultRequestData;
    import IBounds = DevExpress.Reporting.Viewer.Editing.IBounds;
    import ColumnSortOrder = DevExpress.Reporting.Viewer.Internal.ColumnSortOrder;
    import CustomizeMenuActionsCallbacksHandler = DevExpress.Analytics.Internal.CustomizeMenuActionsCallbacksHandler;
    import ICommonCallbacksHandler = DevExpress.Analytics.Internal.ICommonCallbacksHandler;
    import CustomizeExportOptionsEventArgs = DevExpress.Reporting.CustomizeExportOptionsEventArgs;
    import PreviewDisposableModel = DevExpress.Reporting.Viewer.Internal.PreviewDisposableModel;
    import IContentActionViewModel = DevExpress.Analytics.Utils.IContentActionViewModel;
    import ISelectBoxActionViewModel = DevExpress.Analytics.Utils.ISelectBoxActionViewModel;
    import IEditorViewModel = DevExpress.Analytics.Widgets.IEditorViewModel;
    import IExportActionViewModel = DevExpress.Reporting.Viewer.Export.IExportActionViewModel;
    export interface IPreviewInitialize {
        reportId?: string;
        documentData?: DevExpress.Reporting.Viewer.Internal.IGeneratedDocumentData;
        reportUrl?: string;
        documentId?: string;
        pageSettings?: IPreviewPageInitialSettings;
        exportOptions?: string;
        parametersInfo?: DevExpress.Reporting.Viewer.Parameters.IReportParametersInfo;
        rtlReport?: boolean;
        startBuildFaultMessage?: string;
        error?: any;
    }
    export interface IPreviewModel {
        tabPanel: DevExpress.Analytics.Utils.TabPanel;
        reportPreview: DevExpress.Reporting.Viewer.ReportPreview;
        Close: () => void;
        ExportTo: (format?: string, inlineResult?: boolean) => void;
        GetCurrentPageIndex: () => number;
        GetParametersModel: () => DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel;
        GoToPage: (pageIndex: number) => void;
        OpenReport: (reportUrl: string) => void;
        Print: (pageIndex?: number) => JQueryPromise<boolean>;
        ResetParameters: () => void;
        StartBuild: () => void;
    }
    export interface IPreviewPageInitialSettings {
        height?: number;
        width?: number;
        color?: string;
    }
    export interface IParametersCustomizationHandler {
        customizeParameterEditors?: (parameter: DevExpress.Reporting.Viewer.Parameters.IParameterDescriptor, info: DevExpress.Analytics.Utils.ISerializationInfo) => void;
        customizeParameterLookUpSource?: (parameter: DevExpress.Reporting.Viewer.Parameters.IParameterDescriptor, items: Array<DevExpress.Analytics.Utils.IDisplayedValue>) => any;
        parametersReset?: (parametersViewModel: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel, parameters: DevExpress.Reporting.Viewer.Parameters.IParameter[]) => void;
        parametersSubmitted?: (parametersViewModel: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel, parameters: Array<DevExpress.Reporting.IKeyValuePair<any>>) => void;
        parametersInitialized?: (parametersModel: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel, actualParametersInfo: any[], submit: () => void, shouldRequestParameters: boolean) => void;
    }
    export interface IPreviewCustomizationHandler extends IParametersCustomizationHandler, _ICommonCallbacksHandler {
        _onGetBuildStatus?: (status: any) => void;
        _onGetDocumentDetails?: (respose: any) => void;
        customizeParts?: (parts: DevExpress.Analytics.Internal.IDesignerPart[]) => void;
        previewClick?: (pageIndex: number, brick: DevExpress.Reporting.Viewer.Utils.IBrickNode, defaultHandler: () => void) => boolean;
        editingFieldChanged?: (field: DevExpress.Reporting.Viewer.Editing.EditingField, oldValue: any, newValue: any) => any;
        documentReady?: (documentId: string, reportId: string, pageCount: number) => void;
        customizeExportOptions?: (options: IPreviewExportOptionsCustomizationArgs) => void;
        onExport?: (exportResultRequestData: DevExpress.Reporting.Viewer.Internal.ExportResultRequestData) => void;
    }
    export interface IPreviewExportOptionsCustomizationArgs {
        exportOptions: DevExpress.Reporting.Viewer.Export.ExportOptionsPreview;
        panelVisible: boolean;
    }
    export interface IMobileModeSettings {
        readerMode?: boolean;
        animationEnabled?: boolean;
    }
    export interface ITabPanelSettings {
        position?: string;
        width?: number | string;
    }
    export interface ISearchSettings {
        useAsyncSearch?: boolean;
        searchEnabled?: boolean;
    }
    export interface IProgressBarSettings {
        position?: string;
        keepOnVisibleArea?: boolean;
    }
    export interface IRemoteSettings {
        authToken?: string;
        serverUri?: string;
    }
    export interface IExportSettings {
        useSameTab?: boolean;
        useAsynchronousExport?: boolean;
        showPrintNotificationDialog?: boolean;
    }
    export interface IWebDocumentViewerSettings extends ILocalizationSettings {
        handlerUri?: string;
        allowURLsWithJSContent?: boolean;
        rtl?: boolean;
        accessibilityCompliant?: boolean;
        isMobile?: boolean;
        mobileModeSettings?: IMobileModeSettings;
        remoteSettings?: IRemoteSettings;
        tabPanelSettings?: ITabPanelSettings;
        progressBarSettings?: IProgressBarSettings;
        exportSettings?: IExportSettings;
        searchSettings?: ISearchSettings;
        developmentMode?: boolean;
    }
    export interface IWebDocumentViewerModel extends IPreviewInitialize, IWebDocumentViewerSettings, IGlobalizeSettings {
        cultureInfoList?: {
            [key: string]: string;
        };
        previewVisible?: boolean;
    }
    export interface IBindingSettings {
        element: HTMLElement;
        model: IWebDocumentViewerModel;
        callbacks?: IPreviewCustomizationHandler;
        applyBindings?: boolean;
    }
    export interface IBrickNode {
        top: number;
        topP: string;
        left: number;
        leftP?: string;
        rightP?: string;
        height: number;
        heightP: string;
        width: number;
        widthP: string;
        bricks: DevExpress.Reporting.Viewer.Utils.IBrickNode[];
        content: Array<DevExpress.Reporting.IKeyValuePair<any>>;
        indexes: string;
        row: number;
        col: number;
        genlIndex: number;
        active: boolean;
        navigation?: IBrickNodeNavigation;
        rtl: boolean;
        efIndex?: number;
        absoluteBounds?: DevExpress.Reporting.Viewer.Editing.IBounds;
        text: () => string;
        accessibleDescription: string;
        onClick?: (args?: any) => void;
    }
    export interface IBrickNodeNavigation {
        url?: string;
        target?: string;
        indexes?: string;
        pageIndex?: number;
        drillDownKey?: string;
        drillThroughData?: string;
        sortData?: ISortingData;
    }
    export interface ISortingData {
        target: string;
        field: string;
        order: DevExpress.Reporting.Viewer.Internal.ColumnSortOrder;
    }
    export interface IDocumentOperationResult {
        documentId: string;
        succeeded: boolean;
        message?: string;
        customData?: string;
    }
    interface IBrickEventArgs {
        GetBrickText: () => string;
        GetBrickValue: (key: string) => any;
    }
    interface IPreviewClickEventArgs extends IBrickEventArgs {
        PageIndex: number;
        Brick: DevExpress.Reporting.Viewer.Utils.IBrickNode;
        DefaultHandler: () => void;
        Handled: boolean;
    }
    interface IDocumentReadyEventArgs {
        ReportId: string;
        DocumentId: string;
        PageCount: number;
    }
    interface IEditingFieldChangedEventArgs extends IBrickEventArgs {
        Field: DevExpress.Reporting.Viewer.Editing.EditingField;
        OldValue: any;
        NewValue: any;
    }
    interface IParameterSubmittedArgs {
        ParametersViewModel: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel;
        Parameters: Array<DevExpress.Reporting.IKeyValuePair<any>>;
    }
    interface IParameterInitializedArgs {
        ParametersModel: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel;
        ActualParametersInfo: any[];
        Submit: () => void;
        ShouldRequestParameters: boolean;
    }
    interface IParameterResetArgs {
        ParametersViewModel: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel;
        Parameters: DevExpress.Reporting.Viewer.Parameters.IParameter[];
    }
    interface ICustomizeParameterLookUpSourceArgs {
        parameter: DevExpress.Reporting.Viewer.Parameters.IParameterDescriptor;
        items: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
        dataSource?: any;
    }
    interface ICustomizeParameterEditorsArgs {
        parameter: DevExpress.Reporting.Viewer.Parameters.IParameterDescriptor;
        info: DevExpress.Analytics.Utils.ISerializationInfo;
    }
    interface ICustomizeElementsArgs {
        Elmenets: DevExpress.Analytics.Internal.IDesignerPart[];
        GetById: (id: string) => DevExpress.Analytics.Internal.IDesignerPart;
    }
    export interface ICustomizeElementCallback<T> {
        CustomizeElements?: (sender: T, args: ICustomizeElementsArgs) => void;
    }
    export interface IPreviewCustomizationCallbacksCommon<T> extends ICustomizeElementCallback<T> {
        PreviewClick?: (sender: T, args: IPreviewClickEventArgs) => void;
        CustomizeParameterLookUpSource?: (sender: T, args: ICustomizeParameterLookUpSourceArgs) => void;
        CustomizeParameterEditors?: (sender: T, args: ICustomizeParameterEditorsArgs) => void;
    }
    export interface IPreviewCustomizationCallbacks<T> extends CustomizeMenuActionsCallbacksHandler<T>, ICustomizeElementCallback<T> {
        DocumentReady?: (sender: T, args: IDocumentReadyEventArgs) => void;
        EditingFieldChanged?: (sender: T, args: IEditingFieldChangedEventArgs) => void;
        ParametersSubmitted?: (sender: T, args: IParameterSubmittedArgs) => void;
        ParametersInitialized?: (sender: T, args: IParameterInitializedArgs) => void;
        ParametersReset?: (sender: T, args: IParameterResetArgs) => void;
        CustomizeExportOptions?: (sender: T, args: DevExpress.Reporting.CustomizeExportOptionsEventArgs) => void;
        OnExport?: (sender: T, args: DevExpress.Reporting.Viewer.Internal.ExportResultRequestData) => void;
    }
    export interface IPreviewCustomizationCallbacksPublic<T> extends ICommonCallbacksHandler<T, DevExpress.Reporting.Viewer.Internal.PreviewDisposableModel>, IPreviewCustomizationCallbacks<T>, IPreviewCustomizationCallbacksCommon<T> {
    }
    export {};
    export type ViewerTemplate = {
        "dxrd-preview-pager": DevExpress.Analytics.Utils.ISelectBoxActionViewModel;
        "dxrd-zoom-autofit-select-template": DevExpress.Analytics.Utils.ISelectBoxActionViewModel;
        "dxrd-toolbar-two-way-switch": DevExpress.Analytics.Utils.IContentActionViewModel;
        "dxrd-preview-export-to": DevExpress.Reporting.Viewer.Export.IExportActionViewModel;
        "dxrd-multivalue-editing": DevExpress.Analytics.Widgets.IEditorViewModel;
    };
}
declare module DevExpress.Reporting.Viewer.Widgets {
    import ParametersGroupEditor = DevExpress.Reporting.Viewer.Widgets.Internal.ParametersGroupEditor;
    import MultiValueEditor = DevExpress.Reporting.Viewer.Widgets.Internal.MultiValueEditor;
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import BaseModel = DevExpress.Analytics.Serializer.Native.BaseModel;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import IViewModel = DevExpress.Analytics.Serializer.Native.IViewModel;
    import PopupProperties = DevExpress.ui.dxPopup.PopupProperties;
    import ScrollViewProperties = DevExpress.ui.dxScrollView.ScrollViewProperties;
    import CalendarProperties = ;
    null.CalendarProperties;
    import DateRangeEditor = DevExpress.Reporting.Viewer.Widgets.DateRangeEditor;
    import DateRangeDialogElementsKeyboardHelper = DevExpress.Reporting.Viewer.DateRangeDialogElementsKeyboardHelper;
    import PredefinedDateRangesKeyboardHelper = DevExpress.Reporting.Viewer.PredefinedDateRangesKeyboardHelper;
    import IDateRangeEditorItem = DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorItem;
    import BaseRenderingModel = DevExpress.Analytics.Serializer.Native.BaseRenderingModel;
    import IDateRangeEditorViewModel = DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorViewModel;
    import Editor = DevExpress.Analytics.Widgets.Editor;
    import IEditorViewModel = DevExpress.Analytics.Widgets.IEditorViewModel;
    export enum PictureEditMode {
        Image = 0,
        Signature = 1,
        ImageAndSignature = 2
    }
    export const viewerEditorTemplates: {
        multiValue: {
            header: string;
            editorType: typeof DevExpress.Reporting.Viewer.Widgets.Internal.MultiValueEditor;
        };
        groupEditor: {
            header: string;
            custom: string;
            content: string;
            editorType: typeof DevExpress.Reporting.Viewer.Widgets.Internal.ParametersGroupEditor;
        };
        rangeEditor: {
            header: string;
        };
        multiValueEditable: {
            custom: string;
        };
        selectBox: {
            header: string;
        };
        separatorEditor: {
            header: string;
            custom: string;
        };
        signatures: {
            header: string;
        };
    };
    export interface IDateRangeEditorItem {
        displayName: string;
        range: () => Date[];
    }
    class PredefinedDateRangeModel extends BaseModel {
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        ranges: DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorItem[];
    }
    export const predefinedDateRangesModel: PredefinedDateRangeModel;
    export const predefinedDateRanges: DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorItem[];
    export {};
    export type IDateRangeEditorPredefinedItemViewModel = DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorItem & {
        click: () => void;
        selected: boolean;
    };
    export type IDateRangeCalendarViewModel = {
        value: Date;
        onValueChanged: CalendarProperties["onValueChanged"];
        min: Date;
        height: string;
        inRange: (date: Date) => boolean;
    };
    export interface IDateRangeEditorViewModel extends IViewModel {
        getPopupSettings: () => DevExpress.ui.dxPopup.PopupProperties;
        _displayName: string;
        displayValue: string;
        popupModel: DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorViewModel | any;
        popupTemplate: string;
        dialogKeyboardHelper: DevExpress.Reporting.Viewer.DateRangeDialogElementsKeyboardHelper;
        scrollViewOptions: DevExpress.ui.dxScrollView.ScrollViewProperties;
        predefinedRanges: {
            attr: object;
            accessibilityKeyboardHelper: DevExpress.Reporting.Viewer.PredefinedDateRangesKeyboardHelper;
            scrollViewOptions: DevExpress.ui.dxScrollView.ScrollViewProperties;
            items: IDateRangeEditorPredefinedItemViewModel[];
        };
        items: DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorItem[];
        showPopup: () => void;
        cacheElement: (element: JQuery) => void;
        startRange: IDateRangeCalendarViewModel;
        endRange: IDateRangeCalendarViewModel;
        _editorInputId: string;
    }
    export function createDateRangeEditorViewModel(this: DevExpress.Reporting.Viewer.Widgets.DateRangeEditor, baseViewModel: DevExpress.Analytics.Serializer.Native.IViewModel): DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorViewModel;
    export interface IDateRangeEditorOptions {
        value: Date[];
        onValueChanged: (e: {
            value: Date[];
        }) => void;
        isMobile?: boolean;
        displayName?: string;
    }
    type IKoDateRangeEditorOptions = {
        value: ko.Observable<IDateRangeEditorOptions["value"]>;
        isMobile?: boolean;
    };
    export function createDateRangeEditor(_options: IKoDateRangeEditorOptions | IDateRangeEditorOptions, element?: Node, model?: DevExpress.Analytics.Widgets.Editor | DevExpress.Analytics.Widgets.IEditorViewModel): DevExpress.Reporting.Viewer.Widgets.DateRangeEditor;
    export class DateRangeEditor extends BaseRenderingModel<DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorViewModel> {
        private _options;
        private _locker;
        createViewModel(): DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorViewModel;
        private _getStringValue;
        _showPopup: () => void;
        _hidePopup: () => void;
        getElement(): Element | undefined;
        _$element: JQuery;
        _editorInputId: string;
        _displayName: string;
        _isSelected(item: DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorItem): boolean;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<DateRangeEditor> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<DateRangeEditor>): void;
        deferredUpdateViewModel(): boolean;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<DateRangeEditor> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<DateRangeEditor>): void;
        constructor(_options: IDateRangeEditorOptions, editorInputId?: string);
        private _toParameterValue;
        applyDate(range: Date[], force?: boolean): void;
        inRange(date: Date): boolean;
        applyValue(updateEndDate?: boolean): void;
        popupTemplate: string;
        startDate: Date;
        endDate: Date;
        _popupVisible: boolean;
        _displayText: string;
        popupModel: any;
        items: any[];
        calendarHeight: string;
        dialogKeyboardHelper: DevExpress.Reporting.Viewer.DateRangeDialogElementsKeyboardHelper;
    }
    export {};
    export {};
}
declare module DevExpress.Reporting.Editing {
    import IImageEditorItem = DevExpress.Reporting.Viewer.Widgets.Internal.IImageEditorItem;
    export interface IInplaceEditorInfo {
        name: string;
        category: string;
        displayName: string;
        template?: string;
        options?: any;
    }
    export const Categories: {
        Image: () => string;
        Numeric: () => string;
        DateTime: () => string;
        Letters: () => string;
    };
    export interface IImageEditorRegistrationOptions {
        name: string;
        displayName: string;
        images?: DevExpress.Reporting.Viewer.Widgets.Internal.IImageEditorItem[];
        customizeActions?: (sender: any, actions: any[]) => void;
        searchEnabled?: boolean;
        imageLoadEnabled?: boolean;
        sizeOptionsEnabled?: boolean;
        clearEnabled?: boolean;
        drawingEnabled?: boolean;
        shadingEnabled?: boolean;
    }
    export const ___isCancelFlag = "___isCancel";
    export class EditingFieldExtensions {
        private static _instance;
        private _editors;
        static instance(): EditingFieldExtensions;
        private _registerStandartEditors;
        static enableImageEditorShading(): void;
        static registerImageEditor(imageRegistrationOptions: IImageEditorRegistrationOptions): void;
        static registerEditor(name: string, displayName: string, category: string, options?: {}, template?: string, validate?: (value: string) => boolean, defaultVal?: string): void;
        static registerMaskEditor(editorID: string, displayName: string, category: string, mask: string): void;
        static registerRegExpEditor(editorID: string, displayName: string, category: string, regExpEditing: RegExp, regExpFinal: RegExp, defaultVal: string): void;
        static unregisterEditor(editorID: string): void;
        categories(excludeCategories?: string[]): string[];
        editors(): IInplaceEditorInfo[];
        editorsByCategories(categories?: string[]): IInplaceEditorInfo[];
        editor(editorID: string): IInplaceEditorInfo;
    }
}
declare module DevExpress.Reporting.Viewer.Editing {
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import PreviewPage = DevExpress.Reporting.Viewer.Internal.PreviewPage;
    import PictureEditMode = DevExpress.Reporting.Viewer.Widgets.PictureEditMode;
    import IImageEditValue = DevExpress.Reporting.Viewer.Widgets.Internal.IImageEditValue;
    import IPictureEditorCallbacks = DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorCallbacks;
    import IPictureEditorFieldModel = DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorFieldModel;
    import IPictureEditorPopupTargetOptions = DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorPopupTargetOptions;
    import PictureEditorModel = DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorModel;
    import EditingField = DevExpress.Reporting.Viewer.Editing.EditingField;
    import IBounds = DevExpress.Reporting.Viewer.Editing.IBounds;
    import IEditingFieldModel = DevExpress.Reporting.Viewer.Editing.IEditingFieldModel;
    import ImageAlignment = DevExpress.Reporting.Viewer.Editing.ImageAlignment;
    import ImageSizeMode = DevExpress.Reporting.Viewer.Editing.ImageSizeMode;
    import EditingFieldBase = DevExpress.Reporting.Viewer.Editing.EditingFieldBase;
    import IEditingFieldViewModelBase = DevExpress.Reporting.Viewer.Editing.IEditingFieldViewModelBase;
    import getParentContainer = DevExpress.Analytics.Internal.getParentContainer;
    import ITextEditingFieldViewModelBase = DevExpress.Reporting.Viewer.Editing.ITextEditingFieldViewModelBase;
    import TextEditingFieldViewModelBase = DevExpress.Reporting.Viewer.Editing.TextEditingFieldViewModelBase;
    import ImageSource = DevExpress.Reporting.ImageSource;
    import ContentReadyEvent = DevExpress.ui.dxPopup.ContentReadyEvent;
    import IPainterOptions = DevExpress.Reporting.Viewer.Widgets.Internal.IPainterOptions;
    import Painter = DevExpress.Reporting.Viewer.Widgets.Internal.Painter;
    import ImageEditingFieldViewModel = DevExpress.Reporting.Viewer.Editing.ImageEditingFieldViewModel;
    import BaseRenderingModel = DevExpress.Analytics.Serializer.Native.BaseRenderingModel;
    import IViewModel = DevExpress.Analytics.Serializer.Native.IViewModel;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import IBrickNode = DevExpress.Reporting.Viewer.Utils.IBrickNode;
    import GlyphStyle = DevExpress.Reporting.Viewer.Editing.GlyphStyle;
    import IEditValueContainerViewModel = DevExpress.Reporting.Viewer.Editing.IEditValueContainerViewModel;
    export class ImageEditingFieldViewModel<T extends DevExpress.Reporting.Viewer.Editing.IEditingFieldViewModelBase = DevExpress.Reporting.Viewer.Editing.IEditingFieldViewModelBase> extends EditingFieldBase<T> implements IEditingFieldModel, IPictureEditorFieldModel {
        field: DevExpress.Reporting.Viewer.Editing.EditingField<IImageEditValue>;
        protected bounds: DevExpress.Reporting.Viewer.Editing.IBounds;
        static __DefaultImageType: string;
        protected popupTarget: string;
        protected _onZoomChanged: (newZoom: number) => void;
        constructor(field: DevExpress.Reporting.Viewer.Editing.EditingField<IImageEditValue>, pageWidth: number, pageHeight: number, page: DevExpress.Reporting.Viewer.Internal.PreviewPage, bounds: DevExpress.Reporting.Viewer.Editing.IBounds);
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<ImageEditingFieldViewModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<ImageEditingFieldViewModel>): void;
        getImage(): string;
        getImageType(): string;
        alignment: DevExpress.Reporting.Viewer.Editing.ImageAlignment;
        sizeMode: DevExpress.Reporting.Viewer.Editing.ImageSizeMode;
        editMode: DevExpress.Reporting.Viewer.Widgets.PictureEditMode;
        popupOptions: DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorPopupTargetOptions;
        template: string;
        shadingEnabled: boolean;
        callbacks: DevExpress.Reporting.Viewer.Widgets.Internal.IPictureEditorCallbacks;
        onKeyDown(event: KeyboardEvent): void;
        onFocusIn(s: DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorModel): void;
        onDraw(s: DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorModel): void;
        onBlur(s: DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorModel): void;
    }
    export interface ITextEditingFieldViewModelBase extends IEditingFieldViewModelBase {
        textStyle: {
            [key: string]: string;
        };
        hideEditor: (shouldCommit: boolean) => void;
        keypressAction: (data: any, event: any) => void;
    }
    export class TextEditingFieldViewModelBase<T extends DevExpress.Reporting.Viewer.Editing.ITextEditingFieldViewModelBase> extends EditingFieldBase<T> {
        keypressAction(data: ITextEditingFieldData, event: KeyboardEvent): void;
        createViewModel(): T;
        canActivateEditor: boolean;
        activateEditor(model: DevExpress.Reporting.Viewer.Editing.EditingFieldBase<IEditingFieldViewModelBase>, event: {
            target: EventTarget;
            currentTarget: EventTarget;
        }, elementFocused?: boolean): void;
        hideEditor: (shouldCommit: boolean) => void;
        textStyle: {
            [key: string]: string;
        };
    }
    export interface ITextEditingFieldData {
        value: string | Date;
        textStyle: {
            [key: string]: string;
        };
        hideEditor: (shouldCommit: boolean) => void;
        keypressAction: (data: ITextEditingFieldData, event: KeyboardEvent) => void;
        options: any;
        getOptions: (options: any) => any;
        getPopupContainer: typeof DevExpress.Analytics.Internal.getParentContainer;
    }
    export interface ITextEditingFieldViewModel extends ITextEditingFieldViewModelBase {
        borderStyle: {
            [key: string]: string;
        };
        breakOffsetStyle: {
            [key: string]: string;
        };
        wordWrap: boolean;
        editorTemplate: string;
        data: ITextEditingFieldData;
    }
    export class TextEditingFieldViewModel extends TextEditingFieldViewModelBase<ITextEditingFieldViewModel> implements IEditingFieldModel {
        constructor(field: DevExpress.Reporting.Viewer.Editing.EditingField<string>, pageWidth: number, pageHeight: number, page: DevExpress.Reporting.Viewer.Internal.PreviewPage, bounds: DevExpress.Reporting.Viewer.Editing.IBounds);
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<EditingFieldBase> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<EditingFieldBase>): void;
        createViewModel(): ITextEditingFieldViewModel;
        dispose: () => void;
        template: string;
        editorTemplate: string;
        field: DevExpress.Reporting.Viewer.Editing.EditingField;
        data: ITextEditingFieldData;
        breakOffsetStyle: {
            [key: string]: string;
        };
        borderStyle: {
            [key: string]: string;
        };
        wordWrap: boolean;
        canActivateEditor: boolean;
        activateEditor(viewModel: TextEditingFieldViewModel, e: MouseEvent): void;
    }
    export function focusTextElement(target: HTMLElement): void;
    interface ICharacterCombCell {
        text: string;
        style: any;
    }
    export interface ICharacterCombEditingFieldViewModel extends ITextEditingFieldViewModelBase {
        cells: ICharacterCombCell[];
    }
    export class CharacterCombEditingFieldViewModel extends TextEditingFieldViewModelBase<ICharacterCombEditingFieldViewModel> implements IEditingFieldModel {
        field: DevExpress.Reporting.Viewer.Editing.EditingField<string>;
        constructor(field: DevExpress.Reporting.Viewer.Editing.EditingField<string>, pageWidth: number, pageHeight: number, page: DevExpress.Reporting.Viewer.Internal.PreviewPage, bounds: DevExpress.Reporting.Viewer.Editing.IBounds);
        private _createCellViewModels;
        createViewModel(): ICharacterCombEditingFieldViewModel;
        cells: ICharacterCombCell[];
        template: string;
        canActivateEditor: boolean;
        activateEditor(viewModel: CharacterCombEditingFieldViewModel, event: MouseEvent): void;
        static setText(cells: ICharacterCombCell[], textAlignment: string, rtl: boolean, text: string, rowsCount: number, colsCount: number): void;
    }
    export {};
    export enum GlyphStyle {
        StandardBox1 = 0,
        StandardBox2 = 1,
        YesNoBox = 2,
        YesNoSolidBox = 3,
        YesNo = 4,
        RadioButton = 5,
        Smiley = 6,
        Thumb = 7,
        Toggle = 8,
        Star = 9,
        Heart = 10
    }
    export enum CheckState {
        Unchecked = 0,
        Checked = 1,
        Indeterminate = 2
    }
    export function createCustomGlyphStyleCss(imageSource: DevExpress.Reporting.ImageSource): {
        [key: string]: string;
    };
    export function getCheckBoxTemplate(style: string, state: string, customGlyph: {}): string;
    export interface ICheckEditingFieldViewModel extends IEditingFieldViewModelBase {
        onKeyDown: (event: KeyboardEvent) => void;
        onBlur: () => void;
        onFocus: () => void;
        checkStyle: {
            [key: string]: string;
        };
        checkStateStyleIcon: string;
        customGlyphStyleCss: {
            [key: string]: string;
        };
        checked: boolean;
    }
    export class CheckEditingFieldViewModel extends EditingFieldBase<ICheckEditingFieldViewModel> implements IEditingFieldModel {
        private _editingFieldsProvider;
        private _toggleCheckState;
        private _updateCustomGlyphStyleCss;
        private _updateCheckStateStyleIcon;
        private _updateCheckStyle;
        constructor(field: DevExpress.Reporting.Viewer.Editing.EditingField<number>, pageWidth: number, pageHeight: number, page: DevExpress.Reporting.Viewer.Internal.PreviewPage, editingFieldsProvider: () => DevExpress.Reporting.Viewer.Editing.EditingField[]);
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<CheckEditingFieldViewModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<CheckEditingFieldViewModel>): void;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<CheckEditingFieldViewModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<CheckEditingFieldViewModel>): void;
        createViewModel(): ICheckEditingFieldViewModel;
        template: string;
        field: DevExpress.Reporting.Viewer.Editing.EditingField<number>;
        checkStyle: {
            [key: string]: string;
        };
        checkStateStyleIcon: string;
        customGlyphStyleCss: {
            [key: string]: string;
        };
        focused: boolean;
        checked: boolean;
        onKeyDown(event: KeyboardEvent): void;
        onBlur(): void;
        onFocus(): void;
        onClick(model: DevExpress.Reporting.Viewer.Editing.EditingFieldBase, event: UIEvent): void;
        private _updateCheckedState;
        toggleCheckState(): void;
    }
    export interface IImageEditingFieldPopupData {
        contentData: PopupImageEditingFieldViewModel;
        paintData: DevExpress.Reporting.Viewer.Widgets.Internal.IPainterOptions;
        contentTemplate: string;
        visible: boolean;
        getPositionTarget: (element: HTMLElement) => HTMLElement;
        showContent: boolean;
        onShown: (e: {
            element: any;
            component: any;
        }) => void;
        onHiding: (e: {
            element: any;
            component: any;
        }) => void;
        onContentReady: (event: DevExpress.ui.dxPopup.ContentReadyEvent) => void;
        renderedHandler: () => void;
        shading: boolean;
        getPopupContainer: typeof DevExpress.Analytics.Internal.getParentContainer;
    }
    export interface IPopupImageEditingFieldViewModel extends IEditingFieldViewModelBase {
        popupData: IImageEditingFieldPopupData;
        parentPopupClass: string;
        getPainterOptions: () => DevExpress.Reporting.Viewer.Widgets.Internal.IPainterOptions;
    }
    export class PopupImageEditingFieldViewModel extends ImageEditingFieldViewModel<IPopupImageEditingFieldViewModel> implements IEditingFieldModel, IPictureEditorFieldModel {
        private _parentPopupClass;
        private _popupInitializedClass;
        private _getPopupContainer;
        private _resetPictureEditor;
        private _resetPainter;
        private _getPainterOptions;
        createViewModel(): IPopupImageEditingFieldViewModel;
        _renderedHandler(): void;
        _setPictureEditor(editor: DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorModel): void;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<PopupImageEditingFieldViewModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<PopupImageEditingFieldViewModel>): void;
        canActivateEditor: boolean;
        activateEditor(viewModel: PopupImageEditingFieldViewModel, e: MouseEvent): void;
        _showContent: boolean;
        painterData: DevExpress.Reporting.Viewer.Widgets.Internal.IPainterOptions;
        painter: DevExpress.Reporting.Viewer.Widgets.Internal.Painter;
        pictureEditor: DevExpress.Reporting.Viewer.Widgets.Internal.PictureEditorModel;
        template: string;
        deferredUpdateViewModel(): boolean;
    }
    export const DefaultImageEditingFieldViewModel: typeof PopupImageEditingFieldViewModel;
    export interface IBounds {
        left: number;
        top: number;
        width: number;
        height: number;
        offset: {
            x: number;
            y: number;
        };
    }
    export enum ImageAlignment {
        TopLeft = 1,
        TopCenter = 2,
        TopRight = 3,
        MiddleLeft = 4,
        MiddleCenter = 5,
        MiddleRight = 6,
        BottomLeft = 7,
        BottomCenter = 8,
        BottomRight = 9
    }
    export enum ImageSizeMode {
        Normal = 0,
        StretchImage = 1,
        ZoomImage = 4,
        Squeeze = 5,
        Cover = 7
    }
    export interface IImageSourceBrickData {
        image: string;
        imageType: string;
    }
    export interface IImageBrickData extends IImageSourceBrickData {
        alignment: DevExpress.Reporting.Viewer.Editing.ImageAlignment;
        sizeMode: DevExpress.Reporting.Viewer.Editing.ImageSizeMode;
    }
    export interface IEditingFieldSerializedModel {
        id: string;
        groupID: string;
        readOnly: boolean;
        editorName: string;
        editValue: any | IImageBrickData;
        htmlValue: string;
        pageIndex: number;
        brickIndeces: string;
        type: string;
        bounds: DevExpress.Reporting.Viewer.Editing.IBounds;
        brickOptions: {
            rtl: boolean;
            rtlLayout: boolean;
            formatString: string;
            wordWrap: boolean;
            style: string;
            checkBoxBounds?: DevExpress.Reporting.Viewer.Editing.IBounds;
            characterCombBounds?: DevExpress.Reporting.Viewer.Editing.IBounds[];
            checkBoxGlyphOptions?: {
                customGlyphs: {
                    key: number;
                    value: IImageSourceBrickData;
                }[];
                glyphStyle: DevExpress.Reporting.Viewer.Editing.GlyphStyle;
            };
        };
    }
    export interface IEditingFieldModel {
        template: string;
        field: DevExpress.Reporting.Viewer.Editing.EditingField;
        canActivateEditor: boolean;
        activateEditor: (viewModel: any, e: any) => void;
        hideEditor?: (shouldCommit: boolean) => void;
        active?: boolean;
        onClick?: (viewModel: any, e: any) => void;
        dispose?: () => void;
    }
    export interface IEditingFieldHtmlProvider {
        getEditingFieldHtml: (value: unknown, editingFieldIndex: number) => JQueryPromise<string>;
    }
    export const sizing: DevExpress.Analytics.Utils.ISerializationInfo;
    export const imageAlignment: DevExpress.Analytics.Utils.ISerializationInfo;
    export interface IEditValueContainerViewModel<T = unknown> extends IViewModel {
        readOnly: boolean;
        editValue: T;
        editorValue: T;
        htmlValue: string;
    }
    export class EditingField<T = unknown> extends BaseRenderingModel<DevExpress.Reporting.Viewer.Editing.IEditValueContainerViewModel<T>> {
        protected _fieldModel: IEditingFieldSerializedModel;
        private _needToUseHtml;
        private _index;
        private _htmlProvider;
        constructor(model: IEditingFieldSerializedModel, index: number, htmlProvider: IEditingFieldHtmlProvider);
        private _refreshHtmlValue;
        setEditValue(newVal: T): void;
        getEditValue(): T;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<EditingField> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<EditingField>): void;
        editingFieldChanged(field: DevExpress.Reporting.Viewer.Editing.EditingField, oldVal: T, newVal: T): T;
        createViewModel(): DevExpress.Reporting.Viewer.Editing.IEditValueContainerViewModel<T>;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<EditingField<T>> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<EditingField<T>>): void;
        readOnly: boolean;
        editValue: T;
        brick: DevExpress.Reporting.Viewer.Utils.IBrickNode;
        _editorValue: T;
        htmlValue: string;
        editorName(): string;
        id(): string;
        groupID(): string;
        pageIndex(): number;
        type(): string;
        model(): IEditingFieldSerializedModel;
        createModel(page: DevExpress.Reporting.Viewer.Internal.PreviewPage, pageWidth: number, pageHeight: number, editingFieldsProvider: () => DevExpress.Reporting.Viewer.Editing.EditingField[], bounds: DevExpress.Reporting.Viewer.Editing.IBounds): DevExpress.Reporting.Viewer.Editing.EditingFieldBase;
    }
    export interface IEditingFieldViewModelBase extends IViewModel {
        zoom: number;
        active: boolean;
        template: string;
        field: DevExpress.Reporting.Viewer.Editing.IEditValueContainerViewModel;
        activateEditor: (viewModel: DevExpress.Reporting.Viewer.Editing.IEditingFieldViewModelBase, event: Event) => void;
        canActivateEditor: boolean;
        onClick: (model: DevExpress.Reporting.Viewer.Editing.IEditingFieldViewModelBase, event: Event) => void;
        containerStyle: {
            [key: string]: string;
        };
    }
    export class EditingFieldBase<T extends DevExpress.Reporting.Viewer.Editing.IEditingFieldViewModelBase = DevExpress.Reporting.Viewer.Editing.IEditingFieldViewModelBase> extends BaseRenderingModel<T> {
        deferredUpdateViewModel(): boolean;
        protected _updateContainerStyle: () => void;
        constructor(page: DevExpress.Reporting.Viewer.Internal.PreviewPage);
        createViewModel(): T;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<EditingFieldBase> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<EditingFieldBase>): void;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<EditingFieldBase> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<EditingFieldBase>): void;
        canActivateEditor: boolean;
        activateEditor(model: DevExpress.Reporting.Viewer.Editing.EditingFieldBase, event: {
            target: EventTarget;
            currentTarget: EventTarget;
        }): void;
        onClick(model: DevExpress.Reporting.Viewer.Editing.EditingFieldBase, event: Event): void;
        template: string;
        field: DevExpress.Reporting.Viewer.Editing.EditingField;
        containerStyle: {
            [key: string]: string;
        };
        zoom: number;
        active: boolean;
    }
}
declare module DevExpress.Reporting.Viewer.Parameters {
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import PreviewParameter = DevExpress.Reporting.Viewer.Parameters.PreviewParameter;
    import PreviewParameterHelper = DevExpress.Reporting.Viewer.Parameters.PreviewParameterHelper;
    import IReportParametersInfo = DevExpress.Reporting.Viewer.Parameters.IReportParametersInfo;
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import IViewModel = DevExpress.Analytics.Serializer.Native.IViewModel;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import BaseRenderingModel = DevExpress.Analytics.Serializer.Native.BaseRenderingModel;
    import PreviewParametersViewModel = DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel;
    import Properties = ;
    null.Properties;
    import TabInfoWithPropertyGrid = DevExpress.Analytics.Utils.TabInfoWithPropertyGrid;
    import IEnumType = DevExpress.Reporting.IEnumType;
    import IKeyValuePair = DevExpress.Reporting.IKeyValuePair;
    import ReportPreview = DevExpress.Reporting.Viewer.ReportPreview;
    import IParameterPanelItemInfo = DevExpress.Reporting.Viewer.Parameters.IParameterPanelItemInfo;
    import ParameterPanelItemBase = DevExpress.Reporting.Viewer.Parameters.ParameterPanelItemBase;
    import IPreviewParametersViewModel = DevExpress.Reporting.Viewer.Parameters.IPreviewParametersViewModel;
    import ParameterHelper = DevExpress.Reporting.Viewer.Parameters.ParameterHelper;
    import ILookUpValue = DevExpress.Reporting.Viewer.Parameters.ILookUpValue;
    import IParametersCustomizationHandler = DevExpress.Reporting.Viewer.Utils.IParametersCustomizationHandler;
    import IDisplayedValue = DevExpress.Analytics.Utils.IDisplayedValue;
    import EventPropertyManager = DevExpress.Analytics.Utils.EventPropertyManager;
    import BaseModel = DevExpress.Analytics.Serializer.Native.BaseModel;
    import IParameter = DevExpress.Reporting.Viewer.Parameters.IParameter;
    import IParameterDescriptor = DevExpress.Reporting.Viewer.Parameters.IParameterDescriptor;
    import IPreviewParameterInfo = DevExpress.Reporting.Viewer.Parameters.IPreviewParameterInfo;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import ArrayStore = DevExpress.data.ArrayStore;
    import DataSource = DevExpress.data.DataSource;
    import BaseRenderingMultiplatformModel = DevExpress.Analytics.Serializer.Native.BaseRenderingMultiplatformModel;
    import EngineType = DevExpress.Analytics.Serializer.Native.EngineType;
    import MultiPlatformObservable = DevExpress.Analytics.Serializer.Native.MultiPlatformObservable;
    export interface IParameterPanelItemInfo {
        type: string;
        titleVisible?: boolean;
        title?: string;
        orientation?: string;
        borderVisible?: boolean;
        expanded?: boolean;
        showExpandButton?: boolean;
        layoutItems?: Array<any>;
    }
    export interface IParameterItemInfo {
        path: string;
        labelOrientation: string;
    }
    export class ParameterPanelItemBase<T extends DevExpress.Analytics.Serializer.Native.IViewModel> extends BaseRenderingModel<T> {
        parameterHelper: DevExpress.Reporting.Viewer.Parameters.PreviewParameterHelper;
        private layoutInfo?;
        protected _parameters: DevExpress.Reporting.Viewer.Parameters.PreviewParameter[];
        protected _separatorNames: string[];
        protected _groupLayoutItems: DevExpress.Reporting.Viewer.Parameters.ParameterPanelItemBase<IViewModel>[];
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        constructor(parameterHelper: DevExpress.Reporting.Viewer.Parameters.PreviewParameterHelper, layoutInfo?: DevExpress.Reporting.Viewer.Parameters.IParameterPanelItemInfo);
        private _fixGroupPropertyName;
        private _proceedLayoutInfo;
        protected _add(parameter: DevExpress.Reporting.Viewer.Parameters.PreviewParameter, parameterInfo: IParameterItemInfo): DevExpress.Reporting.Viewer.Parameters.PreviewParameter;
        get groupLayoutItems(): DevExpress.Reporting.Viewer.Parameters.ParameterPanelItemBase<IViewModel<unknown>>[];
        isPropertyDisabled(name: string): boolean;
        isPropertyVisible(name: string): boolean;
        initialize(originalParametersInfo: DevExpress.Reporting.Viewer.Parameters.IReportParametersInfo, parameters?: DevExpress.Reporting.Viewer.Parameters.PreviewParameter[]): void;
        isEmpty: boolean;
        _getInfo: DevExpress.Analytics.Utils.ISerializationInfo[];
        getInfo: () => DevExpress.Analytics.Utils.ISerializationInfo[];
    }
    export interface IPreviewParametersViewModel extends IViewModel {
        headerText: string;
        emptyText: string;
        isEmpty: boolean;
        parametersLoading: boolean;
        resetButton: null;
        Properties;
        submitButton: null;
        Properties;
    }
    export function createPreviewParametersViewModel(this: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel, baseModel: DevExpress.Reporting.Viewer.Parameters.IPreviewParametersViewModel): DevExpress.Reporting.Viewer.Parameters.IPreviewParametersViewModel;
    export function updateViewModel(this: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel): void;
    /// <reference types="jquery" />
    export interface IReportParametersInfo {
        shouldRequestParameters?: boolean;
        parameters?: Array<DevExpress.Reporting.Viewer.Parameters.IPreviewParameterInfo>;
        knownEnums?: Array<DevExpress.Reporting.IEnumType>;
        parameterPanelLayout?: DevExpress.Reporting.Viewer.Parameters.IParameterPanelItemInfo;
    }
    export interface IPreviewParameterInfo {
        Path: string;
        Description: string;
        Name: string;
        Value: any;
        TypeName: string;
        ValueInfo?: any;
        MultiValue?: boolean;
        SelectAllValues?: boolean;
        AllowNull?: boolean;
        IsFilteredLookUpSettings?: boolean;
        LookUpValues?: Array<DevExpress.Reporting.Viewer.Parameters.ILookUpValue>;
        Visible?: boolean;
        Enabled?: boolean;
        Tag?: any;
        EnabledExpression?: string;
        VisibleExpression?: string;
    }
    export interface IRange {
        Start: any;
        End: any;
    }
    export interface ILookUpValue {
        Description: string;
        Value: any;
    }
    export interface IUpdateParameterResponse {
        enabled: boolean;
        visible: boolean;
        lookUpValues: any;
    }
    export class PreviewParametersViewModel extends ParameterPanelItemBase<DevExpress.Reporting.Viewer.Parameters.IPreviewParametersViewModel> {
        private _reportPreview;
        private _updateParametersTimeOut;
        private _topChangedParameter;
        _needToUpdateParameter: boolean;
        createViewModel(): DevExpress.Reporting.Viewer.Parameters.IPreviewParametersViewModel;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        private get _visibleParameters();
        private _shouldProcessParameter;
        private _getParametersStateRequest;
        private _getDoneGetParametersStateHandler;
        private subscribeParameter;
        private _getFailGetParametersStateHandler;
        private _setLookUpValues;
        private _getParameterValuesContainedInLookups;
        private _filterParameterValuesContainsInLookups;
        private _setParameterValue;
        setParameterValue(parameterName: string, value: unknown): void;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<PreviewParametersViewModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<PreviewParametersViewModel>): void;
        constructor(reportPreview: DevExpress.Reporting.Viewer.ReportPreview, parameterHelper?: DevExpress.Reporting.Viewer.Parameters.PreviewParameterHelper, enableKeyboardSupport?: boolean);
        initialize(originalParametersInfo: DevExpress.Reporting.Viewer.Parameters.IReportParametersInfo): void;
        getPathsAfterPath(parameterPath: string): Array<string>;
        serializeParameters(): Array<DevExpress.Reporting.IKeyValuePair<any>>;
        restore: () => void;
        updateParameters(changedParameter: DevExpress.Reporting.Viewer.Parameters.PreviewParameter): void;
        submit: () => void;
        validateAndSubmit: (params: any) => void;
        processInvisibleParameters: boolean;
        parametersLoading: boolean;
        tabInfo: DevExpress.Analytics.Utils.TabInfoWithPropertyGrid;
        popupInfo: {
            visible: boolean;
            notEmpty: boolean;
        };
        _popupVisible: boolean;
        _popupVisibleSwitch: boolean;
        parameterHelper: DevExpress.Reporting.Viewer.Parameters.PreviewParameterHelper;
        prevParametersStateRequest: JQuery.Deferred<any>;
    }
    export class PreviewParameterHelper extends ParameterHelper {
        callbacks?: DevExpress.Reporting.Viewer.Utils.IParametersCustomizationHandler;
        mapLookUpValues(type: string, lookUpValues: Array<DevExpress.Reporting.Viewer.Parameters.ILookUpValue>): Array<DevExpress.Analytics.Utils.IDisplayedValue>;
        static fixPropertyName(propertyName: string): string;
        static getPrivatePropertyName(propertyName: string): string;
        createInfo(parameter: DevExpress.Reporting.Viewer.Parameters.PreviewParameter): DevExpress.Analytics.Utils.ISerializationInfo;
        assignValueStore(info: DevExpress.Analytics.Utils.ISerializationInfo & {
            events: DevExpress.Analytics.Utils.EventPropertyManager<ISerializationInfo>;
        }, parameter: DevExpress.Reporting.Viewer.Parameters.PreviewParameter): void;
        isEnumType(parameter: DevExpress.Reporting.Viewer.Parameters.PreviewParameter): boolean;
        getValueConverter(type: string): (val: any) => any;
        getRangeEditor(): {
            header: string;
        };
        constructor(knownEnums?: Array<DevExpress.Reporting.IEnumType>, callbacks?: DevExpress.Reporting.Viewer.Utils.IParametersCustomizationHandler);
    }
    export class PreviewParameterValueValidator {
        private _validatorMap;
        private _registerType;
        private _numericTypes;
        constructor();
        validate(type: string, value: any): boolean;
        isNumericType(type: string): boolean;
    }
    export interface IPreviewParameterDescriptor extends IParameterDescriptor {
        hasLookUpValues?: boolean;
    }
    export class PreviewParameter extends BaseModel implements IParameter {
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<this> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<this>): void;
        static _compareValues(value1: any, value2: any): boolean;
        constructor(parameterInfo: DevExpress.Reporting.Viewer.Parameters.IPreviewParameterInfo, parameterHelper: DevExpress.Reporting.Viewer.Parameters.PreviewParameterHelper);
        getParameterDescriptor: () => DevExpress.Reporting.Viewer.Parameters.IParameterDescriptor;
        safeAssignObservable(name: "value" | "_value", value: any): void;
        _validateRangeType(value: unknown): boolean;
        validateAndAssignValue(value: unknown): void;
        initialize(value: any, parameterHelper: DevExpress.Reporting.Viewer.Parameters.PreviewParameterHelper): void;
        serialize(): {
            Value: any;
            Key: string;
            TypeName: string;
        };
        hasVerticalLabel: boolean;
        valueInfo: DevExpress.Analytics.Utils.ISerializationInfo;
        value: any;
        _value: any;
        _originalLookUpValues: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
        _originalValue: any;
        isRange: boolean;
        tag: any;
        type: string;
        path: string;
        isFilteredLookUpSettings: boolean;
        hasBindedExpressions: boolean;
        hasVisibleExpression: boolean;
        lookUpValues: DevExpress.Analytics.Utils.IDisplayedValue[];
        valueStoreCache: any;
        allowNull: boolean;
        isMultiValue: boolean;
        selectAllValues: boolean;
        isMultiValueWithLookUp: boolean;
        multiValueInfo: DevExpress.Analytics.Utils.ISerializationInfo;
        visible: boolean;
        enabled: boolean;
        intTypes: string[];
        floatTypes: string[];
        isTypesCurrentType: (types: string[], type: string) => boolean;
    }
    export class MultiValuesHelper extends BaseModel {
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        static maxDisplayedTags: number;
        constructor(parameter: DevExpress.Reporting.Viewer.Parameters.PreviewParameter);
        selectedItems: any[];
        items: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
        isSelectedAll: boolean;
        maxDisplayedTags: number;
        dataSource: any;
        value: any[];
    }
    export interface IParameter {
        getParameterDescriptor: () => DevExpress.Reporting.Viewer.Parameters.IParameterDescriptor;
        value: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<any>;
        type: any;
        isMultiValue: any;
        selectAllValues: any;
        allowNull: any;
        multiValueInfo: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<ISerializationInfo>;
        tag?: any;
    }
    export interface IParameterDescriptor {
        description: string;
        name: string;
        type: string;
        value: any;
        visible: boolean;
        enabled: boolean;
        multiValue?: boolean;
        selectAllValues?: boolean;
        allowNull?: boolean;
        tag?: any;
    }
    export function getEditorType(typeString: any): any;
    export function _convertLocalDateToUTC(localDate: Date): Date;
    export class MultiValueItem extends BaseRenderingMultiplatformModel<DevExpress.Analytics.Serializer.Native.IViewModel> {
        constructor(engine: DevExpress.Analytics.Serializer.Native.EngineType);
        value: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<any>;
        getInfo: () => DevExpress.Analytics.Utils.ISerializationInfoArray;
    }
    export class ParameterHelper extends BaseRenderingMultiplatformModel<DevExpress.Analytics.Serializer.Native.IViewModel> {
        private _knownEnums;
        _customizeParameterEditors: DevExpress.Analytics.Serializer.Native.MultiPlatformObservable<(parameter: IParameterDescriptor, info: ISerializationInfo) => void>;
        private _isKnownEnumType;
        static getSerializationValue(value: any, dateConverter: any): any;
        static createDefaultDataSource(store: DevExpress.data.ArrayStore): DevExpress.data.DataSource;
        initialize(knownEnums?: Array<DevExpress.Reporting.IEnumType>, callbacks?: DevExpress.Reporting.Viewer.Utils.IParametersCustomizationHandler): void;
        createInfo(parameter: DevExpress.Reporting.Viewer.Parameters.IParameter): DevExpress.Analytics.Utils.ISerializationInfo;
        addShowCleanButton(info: DevExpress.Analytics.Utils.ISerializationInfo, parameter: DevExpress.Reporting.Viewer.Parameters.IParameter): void;
        assignValueStore(info: DevExpress.Analytics.Utils.ISerializationInfo, parameter: DevExpress.Reporting.Viewer.Parameters.IParameter): void;
        createMultiValue(parameter: DevExpress.Reporting.Viewer.Parameters.IParameter, value?: any): MultiValueItem;
        createMultiValueArray(fromArray: Array<any>, parameter: DevExpress.Reporting.Viewer.Parameters.IParameter, convertSingleValue?: (val: any) => any): MultiValueItem[];
        isEnumType(parameter: DevExpress.Reporting.Viewer.Parameters.IParameter): boolean;
        getItemsSource(parameterDescriptor: DevExpress.Reporting.Viewer.Parameters.IParameterDescriptor, items: Array<DevExpress.Analytics.Utils.IDisplayedValue>, sort?: boolean): any;
        getEnumCollection(parameter: DevExpress.Reporting.Viewer.Parameters.IParameter): Array<DevExpress.Analytics.Utils.IDisplayedValue>;
        getParameterInfo(parameter: DevExpress.Reporting.Viewer.Parameters.IParameter): DevExpress.Analytics.Utils.ISerializationInfo;
        getValueConverter(type: string): (val: any) => any;
        customizeParameterLookUpSource: (parameter: DevExpress.Reporting.Viewer.Parameters.IParameterDescriptor, items: Array<DevExpress.Analytics.Utils.IDisplayedValue>) => any;
        getUnspecifiedDisplayText: () => any;
    }
}
declare module DevExpress.Reporting.Designer.Data.Metadata {
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import PropertyGridEditorFlat = DevExpress.Analytics.Widgets.PropertyGridEditorFlat;
    import Parameter = DevExpress.Reporting.Designer.Data.Parameter;
    export const labelOrientation: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: string;
        valuesArray: {
            displayValue: string;
            value: string;
        }[];
    };
    export const groupLayoutItemInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const parameterLayoutItemInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const separatorLayoutItemInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const parameterExpressionBindingSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const parameterExpressionBindings: DevExpress.Analytics.Utils.ISerializationInfo;
    export const valueSourceSettingsTypes: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    export const extendValueSourceSettingsTypes: any;
    export const parameterValueSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const parameterExpressionSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const parameterLookUpSettingsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const valueSourceSettingsSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const parameterNameSerializationInfo: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        defaultVal: string;
        validationRules: {
            type: string;
            validationCallback?: (options: any) => boolean;
            readonly message: string;
        }[];
        editor: DevExpress.Analytics.Utils.IEditorInfo;
    };
    export const parameterSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const dynamicListLookUpSettingsInfoBase: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const editedStaticListLookUpSettingsInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const readonlyStaticListLookUpSettingsInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const lookUpValueSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const rangeEditor: {
        custom: string;
        editorType: typeof DevExpress.Analytics.Widgets.PropertyGridEditorFlat;
    };
    export const rangeBoundaryParameterInfos: (DevExpress.Analytics.Utils.ISerializationInfo | {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        defaultVal: string;
        validationRules: {
            type: string;
            validationCallback?: (options: any) => boolean;
            readonly message: string;
        }[];
        editor: DevExpress.Analytics.Utils.IEditorInfo;
    })[];
    export const rangeSettingsInfos: DevExpress.Analytics.Utils.ISerializationInfo[];
    export const calculatedFieldScripts: DevExpress.Analytics.Utils.ISerializationInfo;
    export const calculatedFieldExpression: DevExpress.Analytics.Utils.ISerializationInfo;
    export const calculatedFieldSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const dataBindingBaseSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const dataBindingSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const dataBindings: (dataBindingsArray: Array<string>) => DevExpress.Analytics.Utils.ISerializationInfo;
    export function parameterValueToJsonObject(value: any): any;
    export function collectAvailableParameters(parameters: DevExpress.Reporting.Designer.Data.Parameter[]): any[];
}
declare module DevExpress.Reporting.Designer.Metadata {
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    export const componentInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const cultureInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const propertyNameInfo: DevExpress.Analytics.Utils.ISerializationInfo;
    export const propertyValueInfo: DevExpress.Analytics.Utils.ISerializationInfo;
}
declare module DevExpress.Reporting.Designer.Data {
    import IEnumType = DevExpress.Reporting.IEnumType;
    import IParameterTypeValue = DevExpress.Reporting.Designer.Data.IParameterTypeValue;
    import SerializableModel = DevExpress.Analytics.Elements.SerializableModel;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import IModelSerializer = DevExpress.Analytics.Utils.IModelSerializer;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import DataSourceHelper = DevExpress.Reporting.Designer.Internal.DataSourceHelper;
    import IFederationDataSource = DevExpress.Analytics.Data.IFederationDataSource;
    import ISerializableDataFederationDataSourceInfo = DevExpress.Analytics.Data.ISerializableDataFederationDataSourceInfo;
    import ISerializableSourceMapItem = DevExpress.Analytics.Data.ISerializableSourceMapItem;
    import AnalyticsSerializableFederationDataSource = DevExpress.Analytics.Data.AnalyticsSerializableFederationDataSource;
    import ISerializableModel = DevExpress.Analytics.Utils.ISerializableModel;
    import ModelSerializer = DevExpress.Analytics.Utils.ModelSerializer;
    import ObjectStorageItem = DevExpress.Reporting.Designer.Data.ObjectStorageItem;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ReportViewModel = DevExpress.Reporting.Designer.Controls.ReportViewModel;
    import ObjectItem = DevExpress.Reporting.Designer.Data.ObjectItem;
    import LookUpValue = DevExpress.Reporting.Designer.Data.LookUpValue;
    import WrappedExpressionOptions = DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions;
    import Parameter = DevExpress.Reporting.Designer.Data.Parameter;
    import FilterStringOptions = DevExpress.Analytics.Widgets.FilterStringOptions;
    import ObjectStorageParameter = DevExpress.Reporting.Designer.Data.ObjectStorageParameter;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    import IPathRequest = DevExpress.Analytics.Utils.IPathRequest;
    import IExpressionOptions = DevExpress.Analytics.Widgets.IExpressionOptions;
    import ObjectProperties = DevExpress.Analytics.Widgets.ObjectProperties;
    import IScriptingControl = DevExpress.Reporting.Designer.Internal.IScriptingControl;
    import Editor = DevExpress.Analytics.Widgets.Editor;
    import IDataSourceInfo = DevExpress.Analytics.Internal.IDataSourceInfo;
    import PathRequest = DevExpress.Analytics.Utils.PathRequest;
    import UndoEngine = DevExpress.Analytics.Utils.UndoEngine;
    import DynamicListLookUpSettings = DevExpress.Reporting.Designer.Data.DynamicListLookUpSettings;
    import StaticListLookUpSettings = DevExpress.Reporting.Designer.Data.StaticListLookUpSettings;
    import RangeParametersSettings = DevExpress.Reporting.Designer.Data.RangeParametersSettings;
    import IModelAction = DevExpress.Analytics.Internal.IModelAction;
    import IParameter = DevExpress.Reporting.Viewer.Parameters.IParameter;
    import IParameterDescriptor = DevExpress.Reporting.Viewer.Parameters.IParameterDescriptor;
    import DefaultLocalizationProvider = DevExpress.Reporting.Designer.Internal.DefaultLocalizationProvider;
    import ILocalizedControl = DevExpress.Reporting.Designer.Internal.ILocalizedControl;
    import ObjectsStorage = DevExpress.Reporting.Designer.Data.ObjectsStorage;
    import ParameterTypesHelper = DevExpress.Reporting.Designer.Data.ParameterTypesHelper;
    import PropertyExpressionMapper = DevExpress.Reporting.Designer.Data.PropertyExpressionMapper;
    import ValueSourceSettingsHelper = DevExpress.Reporting.Designer.Data.ValueSourceSettingsHelper;
    import ElementViewModel = DevExpress.Analytics.Elements.ElementViewModel;
    import ReportParameterHelper = DevExpress.Reporting.Designer.ReportParameterHelper;
    export interface IParameterType {
        value: string;
        displayValue: string;
        defaultVal: any;
        specifics: string;
        valueConverter: (val: any) => any;
    }
    export interface IParameterTypeValue {
        value: string;
        displayValue: string;
        defaultValue: any;
        specifics: string;
        valueConverter: (val: any, defaultValue?: any) => any;
        icon?: string;
        localizationId?: string;
    }
    export class ParameterTypesHelper {
        private knownEnums?;
        static defaultGuidValue: string;
        static typeValues: DevExpress.Reporting.Designer.Data.IParameterTypeValue[];
        enumValueTypes?: DevExpress.Reporting.Designer.Data.IParameterTypeValue[];
        private _getTypeInfo;
        private _tryConvertValue;
        convertSingleValue(value: any, typeName: string): any;
        getSpecifics(typeName: string): string;
        getIcon(typeName: string): string;
        getDefaultValue(typeName: string): any;
        getEnumTypeValues(): DevExpress.Reporting.Designer.Data.IParameterTypeValue[];
        constructor(knownEnums?: Array<DevExpress.Reporting.IEnumType>);
    }
    export const parameterSeparator = "|";
    export const parameterTypeValues: DevExpress.Reporting.Designer.Data.IParameterTypeValue[];
    export class ObjectItem extends Disposable {
        dsHelperProvider?: () => DevExpress.Reporting.Designer.Internal.DataSourceHelper;
        dispose(): void;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        afterDeserialization(model: any, serializer: any): void;
        preInitProperties(model: any, dsHelperProvider?: () => DevExpress.Reporting.Designer.Internal.DataSourceHelper, serializer?: DevExpress.Analytics.Utils.IModelSerializer): void;
        constructor(model: any, dsHelperProvider?: () => DevExpress.Reporting.Designer.Internal.DataSourceHelper, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        objectType: ko.Observable<string> | ko.Computed<string>;
    }
    export class ObjectStorageItem extends ObjectItem {
        _getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        preInitProperties(model: any): void;
        constructor(model: any, dsHelperProvider?: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        isEmpty(): boolean;
        content: ko.Observable<string> | ko.Computed<string>;
        type: ko.Observable<string> | ko.Computed<string>;
        name: ko.Observable<string> | ko.Computed<string>;
    }
    export class ObjectStorageParameter extends SerializableModel {
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
    }
    export interface ISerializableDataFederationDataSource extends ISerializableModel {
        dataSources: ko.ObservableArray<any>;
        dataSource: DataFederationDataSource;
        serialize: () => DevExpress.Analytics.Data.ISerializableDataFederationDataSourceInfo;
    }
    export class DataFederationDataSource extends ObjectStorageItem implements IFederationDataSource {
        private _dsHelperProvider?;
        private _serializer?;
        static getDependentDataSources(item: DevExpress.Analytics.Data.ISerializableSourceMapItem, resultArray: Array<DevExpress.Analytics.Data.ISerializableSourceMapItem>): void;
        private _serializableModel;
        preInitProperties(model: any): void;
        constructor(model: any, _dsHelperProvider?: any, _serializer?: any);
        getSerializableModel(): SerializableDataFederationDataSource;
        get dependentDataSources(): string[];
        serializableSourceMap: ko.ObservableArray<DevExpress.Analytics.Data.ISerializableSourceMapItem>;
    }
    export class SerializableDataFederationDataSource extends AnalyticsSerializableFederationDataSource {
        constructor(dataSource: DevExpress.Analytics.Data.IFederationDataSource, model?: DevExpress.Analytics.Data.ISerializableDataFederationDataSourceInfo, dsHelperProvider?: any, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        dispose(): void;
        dataSource: DataFederationDataSource;
    }
    export class LookUpValue {
        static createNew(): DevExpress.Reporting.Designer.Data.LookUpValue;
        static from(model: any, serializer: DevExpress.Analytics.Utils.ModelSerializer): DevExpress.Reporting.Designer.Data.LookUpValue;
        static toJson(value: any, serializer: any, refs: any): any;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        description: ko.Observable<string> | ko.Computed<string>;
        _value: ko.Observable<DevExpress.Reporting.Designer.Data.ObjectStorageItem> | ko.Computed<DevExpress.Reporting.Designer.Data.ObjectStorageItem>;
        value: ko.Computed<any>;
        valueInfo: ko.Observable<DevExpress.Analytics.Utils.ISerializationInfo> | ko.Computed<DevExpress.Analytics.Utils.ISerializationInfo>;
        get isEmpty(): boolean;
    }
    export class LookUpSettings extends ObjectItem {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        updateFilter(parameter: any, report: DevExpress.Reporting.Designer.Controls.ReportViewModel): void;
        constructor(model: any, dsHelperProvider?: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        filterString: any;
        _filterString: any;
    }
    export class StaticListLookUpSettings extends LookUpSettings {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        preInitProperties(model: any, helper: any, serializer: any): void;
        afterDeserialization(model: any, serializer: any): void;
        updateFilter(parameter: any, report: DevExpress.Reporting.Designer.Controls.ReportViewModel): void;
        constructor(model: any, dsHelperProvider?: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        _isEditing: ko.Observable<boolean>;
        lookUpValues: ko.ObservableArray<DevExpress.Reporting.Designer.Data.LookUpValue>;
    }
    export class DynamicListLookUpSettings extends LookUpSettings {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, dsHelperProvider?: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        dsHelperProvider: () => DevExpress.Reporting.Designer.Internal.DataSourceHelper;
        dataSource: ko.Observable<DevExpress.Reporting.Designer.Data.ObjectStorageItem>;
        dataMember: ko.Observable<string> | ko.Computed<string>;
        getPath(propertyName: any): any;
        isPropertyDisabled(name: string): boolean;
    }
    export interface IParameterExpressionBinding {
        propertyName: ko.Observable<string>;
        expression: ko.Observable<string>;
    }
    export function createExpressionProperty(object: any, propertyName: string, suffix?: string): DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions;
    export class ParameterExpressionBinding implements IParameterExpressionBinding {
        static expressionSuff: string;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        isEmpty(): boolean;
        propertyName: ko.Observable<string>;
        expression: ko.Observable<string>;
    }
    export class RangeParametersSettings extends ObjectItem {
        constructor(model: any, dsHelperProvider?: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        private _updateInfo;
        preInitProperties(model: any, helper: any, serializer: any): void;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        initalizeRangeParameter(rangeParameter: RangeBoundaryParameter, parameter: DevExpress.Reporting.Designer.Data.Parameter, namePostfix?: string): void;
        assingParameterInfo(parameter: DevExpress.Reporting.Designer.Data.Parameter): void;
        initializeParameters(parameter: DevExpress.Reporting.Designer.Data.Parameter): void;
        _isEditing: ko.Observable<boolean>;
        startParameter: ko.Observable<RangeBoundaryParameter>;
        endParameter: ko.Observable<RangeBoundaryParameter>;
    }
    export class RangeBoundaryParameter extends ObjectItem {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, dsHelperProvider: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        get name(): string;
        get displayName(): string;
        get specifics(): string;
        _specifics: ko.Observable<string>;
        valueInfo: ko.Observable<DevExpress.Analytics.Utils.ISerializationInfo> | ko.Computed<DevExpress.Analytics.Utils.ISerializationInfo>;
        parameterName: ko.Observable<string>;
        value: ko.Observable | ko.Computed;
        templateName: string;
        type: ko.Observable | ko.Computed;
    }
    export class RangeStartParameter extends RangeBoundaryParameter {
        constructor(model: any, dsHelperProvider: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
    }
    export class RangeEndParameter extends RangeBoundaryParameter {
        constructor(model: any, dsHelperProvider: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
    }
    export class TableInfoCollectionItem extends SerializableModel {
        constructor(model: any, dataSource: any, dsHelper: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        filterString: ko.Observable<DevExpress.Analytics.Widgets.FilterStringOptions>;
    }
    export class UniversalDataSource extends ObjectItem {
        dispose(): void;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, dsHelperProvider?: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        parameters: ko.ObservableArray<DevExpress.Reporting.Designer.Data.ObjectStorageParameter>;
        tableInfoCollection: ko.ObservableArray<TableInfoCollectionItem>;
        spParameterInfoCollection: ko.ObservableArray<DevExpress.Analytics.Elements.SerializableModel>;
    }
    export function createNewObjectItem(model: any, dsHelperProvider?: () => DevExpress.Reporting.Designer.Internal.DataSourceHelper, serializer?: DevExpress.Analytics.Utils.IModelSerializer): DevExpress.Reporting.Designer.Data.ObjectItem;
    export class CalculatedField extends Disposable implements IDataMemberInfo, IScriptingControl {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        scripts: any;
        isSelected?: boolean;
        dataType?: string;
        innerActions?: any;
        relationPath?: string;
        noDragable?: any;
        dragData?: any;
        icon?: string;
        items?: DevExpress.Analytics.Utils.IDataMemberInfo[];
        get displayName(): string;
        get name(): string;
        get specifics(): string;
        get type(): string;
        lockedInUserDesigner(): boolean;
        displayType(): any;
        templateName: string;
        contenttemplate: string;
        isList: boolean;
        isCalculated: boolean;
        calculatedFieldName: ko.Observable<string> | ko.Computed<string>;
        nameEditable: ko.Computed<string>;
        dataMember: ko.Observable<string> | ko.Computed<string>;
        dataSource: ko.Observable<DevExpress.Reporting.Designer.Data.ObjectStorageItem>;
        fieldType: ko.Observable<string> | ko.Computed<string>;
        calcExpressionObj: DevExpress.Analytics.Widgets.IExpressionOptions;
        propertyGrid: DevExpress.Analytics.Widgets.ObjectProperties;
        pathRequest: DevExpress.Analytics.Utils.IPathRequest;
    }
    export class ParameterExpressionAddOn extends Disposable {
        private _editor;
        private _parameter;
        constructor(_editor: DevExpress.Analytics.Widgets.Editor, _parameter: ko.Observable<DevExpress.Reporting.Designer.Data.Parameter>);
        switchEditors(): void;
        isExpression: ko.Computed<boolean>;
        imageTemplateName: string;
    }
    export class DataBindingBase extends Disposable {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        private _findDataSourceFromPath;
        updateParameter(pathRequest: DevExpress.Analytics.Utils.PathRequest, dataSources: DevExpress.Analytics.Internal.IDataSourceInfo[]): void;
        updateBinding(path: string, dataSources: any): void;
        getValuePath(dataSourceHelper: any): string;
        generateValue(undoEngine: DevExpress.Analytics.Utils.UndoEngine, dataSourceHelper: DevExpress.Reporting.Designer.Internal.DataSourceHelper, dataSources: any): ko.Computed<string>;
        resetValue(): void;
        isEmpty(): boolean;
        value: ko.Observable<string> | ko.Computed<string>;
        generatedValue: ko.Computed<string>;
        parameter: ko.Observable<DevExpress.Reporting.Designer.Data.Parameter> | ko.Computed<DevExpress.Reporting.Designer.Data.Parameter>;
        dataSource: ko.Observable<DevExpress.Reporting.Designer.Data.ObjectStorageItem> | ko.Computed<DevExpress.Reporting.Designer.Data.ObjectStorageItem>;
        dataMember: ko.Observable<string> | ko.Computed<string>;
        displayExpr: ko.Computed<string>;
    }
    export class DataBinding extends DataBindingBase {
        static initialize(model: any, serializer?: DevExpress.Analytics.Utils.ModelSerializer): ko.ObservableArray<DataBinding>;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        updateParameter(pathRequest: DevExpress.Analytics.Utils.PathRequest, dataSources: any): void;
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        resetValue(): void;
        visible: ko.Observable<boolean>;
        disabled: ko.PureComputed<boolean>;
        propertyName: ko.Observable<string> | ko.Computed<string>;
        formatString: ko.Observable<string> | ko.Computed<string>;
    }
    export class ObjectsStorage extends Disposable {
        constructor(objects: ko.ObservableArray<DevExpress.Reporting.Designer.Data.ObjectItem>, dsHelperProvider: any);
        findType(content: string): DevExpress.Reporting.Designer.Data.ObjectStorageItem;
        getType(type: string): DevExpress.Reporting.Designer.Data.ObjectStorageItem;
        addValue(): DevExpress.Reporting.Designer.Data.ObjectStorageItem;
        createStaticLookUpSetting(): DevExpress.Reporting.Designer.Data.StaticListLookUpSettings;
        createDynamicLookUpSetting(): DevExpress.Reporting.Designer.Data.DynamicListLookUpSettings;
        createRangeSetting(): DevExpress.Reporting.Designer.Data.RangeParametersSettings;
        objects: ko.ObservableArray<DevExpress.Reporting.Designer.Data.ObjectItem>;
        dsHelperProvider: () => DevExpress.Reporting.Designer.Internal.DataSourceHelper;
    }
    export class PropertyExpressionMapper {
        static propertiesWithExpressions: string[];
        getExpressionPropertyName(propertyName: string): string;
        registerExpressionProperty(property: DevExpress.Analytics.Utils.ISerializationInfo): DevExpress.Analytics.Utils.ISerializationInfo;
        isPropertyVisible(propertyName: string, editingMode: boolean): boolean;
        getExpressionProperty(propertyName: string): {
            showExpression: ko.Observable<boolean>;
        };
        private _mapper;
    }
    export class ValueSourceSettingsHelper {
        parameter: DevExpress.Reporting.Designer.Data.Parameter;
        private _updateValueSourceSettingsType;
        private _updateValueSourceSettings;
        constructor(parameter: DevExpress.Reporting.Designer.Data.Parameter);
        initializeParameterSettingsType(): void;
        initializeLookupValueSubscribe(report: any): void;
        initializeLookUpValue(lookUpValue: DevExpress.Reporting.Designer.Data.LookUpValue): void;
        updateLookUpValues(newType: string, value?: any): void;
        updateSettingValues(newType: string, value?: any): void;
    }
    export class Parameter extends Disposable implements IParameter, IDataMemberInfo, ILocalizedControl {
        _report: DevExpress.Reporting.Designer.Controls.ReportViewModel;
        static propertiesWithExpressions: string[];
        static ParametersRefString: string;
        static defaultGuidValue: string;
        static availableRangeSettingTypes: string[];
        private _parameterHelper;
        __localizationProvider: DevExpress.Reporting.Designer.Internal.DefaultLocalizationProvider<ILocalizedControl>;
        get _localizationProvider(): DevExpress.Reporting.Designer.Internal.DefaultLocalizationProvider<ILocalizedControl>;
        getLocalizationProperty(propertyName: string): DevExpress.Reporting.LocalizedProperty;
        getLocalizationProperties(): DevExpress.Reporting.LocalizedProperty[];
        applyLocalization(propertyName: string, propertyValue: any): void;
        private _initializeValue;
        private _preDeserialize;
        private _processObsoleteProperties;
        private _getExpressionActions;
        private _updateTypeValues;
        preprocessInfo(info: DevExpress.Analytics.Utils.ISerializationInfoArray): void;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        appendExpressionObjInfo(info: DevExpress.Analytics.Utils.ISerializationInfoArray): void;
        getActionClassName(propertyName: string): {
            "dxrd-editormenu-expressions": boolean;
            "dxd-icon-accented": boolean;
        };
        constructor(model: any, _report: DevExpress.Reporting.Designer.Controls.ReportViewModel, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        isPropertyVisible(name: string): boolean;
        getParameterDescriptor(): DevExpress.Reporting.Viewer.Parameters.IParameterDescriptor;
        assign(parameter: DevExpress.Reporting.Designer.Data.Parameter): void;
        getRangeParameters(): DevExpress.Analytics.Utils.IDataMemberInfo[];
        get name(): string;
        get specifics(): string;
        get icon(): string;
        get defaultValue(): any;
        get displayName(): string;
        get isList(): boolean;
        get dragData(): {
            noDragable: boolean;
        };
        isPropertyDisabled(propertyName: any): any;
        templateName: string;
        labelOrientation: ko.Observable<string>;
        actionProviders: any[];
        _expressionActions: {
            [key: string]: DevExpress.Analytics.Internal.IModelAction[];
        };
        expressionObj: {};
        info: DevExpress.Analytics.Utils.ISerializationInfoArray;
        propertyExpressionMapper: DevExpress.Reporting.Designer.Data.PropertyExpressionMapper;
        _type: ko.Observable<DevExpress.Reporting.Designer.Data.ObjectStorageItem> | ko.Computed<DevExpress.Reporting.Designer.Data.ObjectStorageItem>;
        _obsoleteValue: ko.Observable | ko.Computed;
        _isEditing: ko.Observable<boolean>;
        _showLayoutProperties: ko.Observable<boolean>;
        objectsStorage: DevExpress.Reporting.Designer.Data.ObjectsStorage;
        valueSourceSettings: ko.Observable<DevExpress.Reporting.Designer.Data.ObjectItem> | ko.Computed<DevExpress.Reporting.Designer.Data.ObjectItem>;
        parameterName: ko.Observable<string> | ko.Computed<string>;
        description: ko.Observable<string> | ko.Computed<string>;
        tag: ko.Observable | ko.Computed;
        type: ko.Computed<string>;
        collapsed: ko.Observable<boolean> | ko.Computed<boolean>;
        valueSourceSettingsType: ko.Observable<string>;
        visible: ko.Observable<boolean> | ko.Computed<boolean>;
        enabled: ko.Observable<boolean>;
        value: ko.Observable;
        valueInfo: ko.Observable<DevExpress.Analytics.Utils.ISerializationInfo> | ko.Computed<DevExpress.Analytics.Utils.ISerializationInfo>;
        isMultiValue: ko.Observable<boolean> | ko.Computed<boolean>;
        selectAllValues: ko.Observable<boolean> | ko.Computed<boolean>;
        allowNull: ko.Observable<boolean> | ko.Computed<boolean>;
        multiValueInfo: ko.Observable<DevExpress.Analytics.Utils.ISerializationInfo>;
        parameterTypesHelper: DevExpress.Reporting.Designer.Data.ParameterTypesHelper;
        valueSourceSettingsHelper: DevExpress.Reporting.Designer.Data.ValueSourceSettingsHelper;
        viewmodel: DevExpress.Analytics.Widgets.ObjectProperties;
    }
    export interface IParameterContainer {
        parameterHelper: DevExpress.Reporting.Designer.ReportParameterHelper;
        parameterPanelLayoutItems: ko.ObservableArray<ParameterPanelLayoutItem>;
        parentModel: ko.Observable<DevExpress.Analytics.Elements.ElementViewModel>;
        parameters: ko.ObservableArray<DevExpress.Reporting.Designer.Data.Parameter>;
    }
    export class ParameterPanelLayoutItem extends ElementViewModel {
        static createLayoutItem(model: any, parent: IParameterContainer | ParameterPanelLayoutItem, serializer?: DevExpress.Analytics.Utils.IModelSerializer): ParameterPanelLayoutItem;
        constructor(model: any, parent: IParameterContainer | ParameterPanelLayoutItem, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        delete(): void;
        getControlFactory(): DevExpress.Reporting.ControlsFactory;
        className(): string;
        layoutItemType: ko.Observable<string>;
        name: ko.Observable<string> | ko.Computed<string>;
        parentModel: ko.Observable<GroupLayoutItem | DevExpress.Reporting.Designer.Controls.ReportViewModel>;
    }
    export class GroupLayoutItem extends ParameterPanelLayoutItem {
        constructor(model: any, parent: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        className(): string;
        isPropertyDisabled(name: string): boolean;
        title: ko.Observable<string>;
        showExpandButton: ko.Observable<boolean>;
        parameterPanelLayoutItems: ko.ObservableArray<ParameterPanelLayoutItem>;
    }
    export class SeparatorLayoutItem extends ParameterPanelLayoutItem {
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        className(): string;
        layoutItemType: ko.Observable<string>;
        name: ko.Observable<string>;
    }
    export class ParameterLayoutItem extends ParameterPanelLayoutItem {
        constructor(model: any, parent: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer, parameter?: DevExpress.Reporting.Designer.Data.Parameter);
        className(): string;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        labelOrientation: ko.Observable<string>;
        parameter: ko.Observable<DevExpress.Reporting.Designer.Data.Parameter>;
    }
    export const ParameterPanelMapper: {
        Group: typeof GroupLayoutItem;
        Separator: typeof SeparatorLayoutItem;
        Parameter: typeof ParameterLayoutItem;
    };
}
declare module DevExpress.Reporting.Designer.Bands.Metadata {
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    export const groupFieldSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const drillDownDetailReportExpanded: DevExpress.Analytics.Utils.ISerializationInfo;
    export const printAtBottom: DevExpress.Analytics.Utils.ISerializationInfo;
    export const printAcrossBands: DevExpress.Analytics.Utils.ISerializationInfo;
    export const repeatEveryPage: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pageBreakWithoutAfterValues: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
    export const pageBreakValues: any[];
    export const pageBreak: DevExpress.Analytics.Utils.ISerializationInfo;
    export const keepTogetherWithDetailReports: DevExpress.Analytics.Utils.ISerializationInfo;
    export const height: DevExpress.Analytics.Utils.ISerializationInfo;
    export const level: DevExpress.Analytics.Utils.ISerializationInfo;
    export const drillDownControl: DevExpress.Analytics.Utils.ISerializationInfo;
    export const multiColumn: DevExpress.Analytics.Utils.ISerializationInfo;
    export const expanded: DevExpress.Analytics.Utils.ISerializationInfo;
    export const commonBandSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const bandSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const reportHeaderBandSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const reportFooterBandSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesReportHeader: string[];
    export const popularPropertiesReportFooter: string[];
    export const sortFields: DevExpress.Analytics.Utils.ISerializationInfo;
    export const hierarchyPrintOptions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const fillEmptySpace: DevExpress.Analytics.Utils.ISerializationInfo;
    export const generalBandSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const subBandSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const generalBandPopularProperties: string[];
    export const detailBandSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesDetail: string[];
    export const groupUnion: DevExpress.Analytics.Utils.ISerializationInfo;
    export const groupFooterUnion: DevExpress.Analytics.Utils.ISerializationInfo;
    export const groupFields: DevExpress.Analytics.Utils.ISerializationInfo;
    export const sortingSummary: DevExpress.Analytics.Utils.ISerializationInfo;
    export const groupHeaderBandSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const groupFooterBandSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesGroupFooter: string[];
    export const popularPropertiesGroupHeader: string[];
    export const printOn: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pageBandSerializationInfoPageHeader: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const pageBandSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesPageHeader: string[];
    export const popularPropertiesPageFooter: string[];
    export const detailReportBandSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesDetailReport: string[];
    export const commonVerticalBandProperties: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const bandLayout: DevExpress.Analytics.Utils.ISerializationInfo;
    export const verticalHeaderBandSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesVerticalHeaderBand: string[];
    export const verticalTotalBandSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesVerticalTotalBand: string[];
    export const verticalDetailBandSerializationInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesVerticalDetailBand: string[];
}
declare module DevExpress.Reporting.Designer.Bands.Internal {
    import SurfaceSelection = DevExpress.Analytics.Internal.SurfaceSelection;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import ReportSurface = DevExpress.Reporting.Designer.Controls.ReportSurface;
    import BandSurface = DevExpress.Reporting.Designer.Bands.BandSurface;
    import VerticalBandSurface = DevExpress.Reporting.Designer.Bands.VerticalBandSurface;
    import MultiColumnSurface = DevExpress.Reporting.Designer.Bands.MultiColumnSurface;
    import VerticalBandsContainerSurface = DevExpress.Reporting.Designer.Bands.Internal.VerticalBandsContainerSurface;
    import IArea = DevExpress.Analytics.Elements.IArea;
    import BandViewModel = DevExpress.Reporting.Designer.Bands.BandViewModel;
    import IBandsHolder = DevExpress.Reporting.Designer.Bands.Internal.IBandsHolder;
    import ReportViewModel = DevExpress.Reporting.Designer.Controls.ReportViewModel;
    import DetailReportBand = DevExpress.Reporting.Designer.Bands.DetailReportBand;
    export const markerHeight = 29;
    export class VerticalBandsContainerSurface extends Disposable {
        private _parent;
        markerWidth: ko.Observable<number>;
        dispose(): void;
        getBandPosition(): number;
        isLocked(): boolean;
        createScrollViewOptions(target: DevExpress.Reporting.Designer.Bands.Internal.VerticalBandsContainerSurface, selection: DevExpress.Analytics.Internal.SurfaceSelection): {
            direction: string;
            showScrollbar: string;
            useNative: boolean;
            scrollByContent: boolean;
            scrollByThumb: boolean;
            onStart: () => void;
            onScroll: (e: any) => void;
            onEnd: () => void;
        };
        constructor(_parent: DevExpress.Reporting.Designer.Controls.ReportSurface | DevExpress.Reporting.Designer.Bands.BandSurface);
        markerClick(selection: DevExpress.Analytics.Internal.SurfaceSelection, changeCollapsed?: boolean): void;
        getBandsWidth(bands: DevExpress.Reporting.Designer.Bands.VerticalBandSurface[]): number;
        _getTopOffset(): number;
        name: string;
        focused: ko.Computed<boolean>;
        bandOffset: number;
        leftOffset: ko.Computed<number>;
        collapsed: ko.Computed<boolean>;
        selected: ko.Computed<boolean>;
        canResize: ko.Computed<boolean>;
        width: ko.Observable<number> | ko.Computed<number>;
        height: ko.Observable<number> | ko.Computed<number>;
        _height: ko.Computed<number>;
        leftMargin: ko.Computed<number>;
        get visible(): boolean;
        templateName: string;
        selectionTemplate: string;
        vrulerTemplate: string;
        leftMarginTemplate: string;
        leftMarginSelectionTemplate: string;
        verticalBands: ko.ObservableArray<DevExpress.Reporting.Designer.Bands.VerticalBandSurface>;
        minHeight: ko.Computed<number>;
        bandPosition: ko.Computed<number>;
        topOffset: ko.Computed<number>;
        get zoom(): ko.Observable<number> | ko.Computed<number>;
        grayAreaWidth: ko.Observable<number> | ko.Computed<number>;
        grayAreaLeft: ko.Observable<number> | ko.Computed<number>;
        scrollOffset: ko.Observable<number>;
        locked: ko.Computed<boolean>;
    }
    export interface IBandsHolder {
        bands: ko.ObservableArray<DevExpress.Reporting.Designer.Bands.BandSurface>;
        verticalBandsContainer?: DevExpress.Reporting.Designer.Bands.Internal.VerticalBandsContainerSurface;
    }
    export class BandsHolder extends Disposable implements IBandsHolder {
        private _container;
        dispose(): void;
        private _createBandsMapCollection;
        private _addHorizontalBand;
        private _addVerticalBand;
        initialize(bands: any): void;
        constructor(_container: DevExpress.Reporting.Designer.Controls.ReportSurface | DevExpress.Reporting.Designer.Bands.BandSurface);
        getHeight(): number;
        getTotalHeight(): number;
        getBandAbsolutePositionY(band: DevExpress.Reporting.Designer.Bands.BandSurface): number;
        checkUnderCursor(): boolean;
        bands: ko.ObservableArray<DevExpress.Reporting.Designer.Bands.BandSurface>;
        verticalBandsContainer: DevExpress.Reporting.Designer.Bands.Internal.VerticalBandsContainerSurface;
        multiColumn: ko.Computed<DevExpress.Reporting.Designer.Bands.MultiColumnSurface>;
    }
    export function sortBands(band1: any, band2: any): number;
    export function setMarkerWidth(bandHolder: DevExpress.Reporting.Designer.Bands.Internal.IBandsHolder, levelCount: any, currentLevel?: number): void;
    export function getLevelCount(bandHolder: DevExpress.Reporting.Designer.Bands.Internal.IBandsHolder): number;
    export function insertBand(bands: ko.ObservableArray<DevExpress.Reporting.Designer.Bands.BandViewModel>, newBand: DevExpress.Reporting.Designer.Bands.BandViewModel): void;
    export function initLevels(bands: DevExpress.Reporting.Designer.Bands.BandViewModel[]): void;
    export function generateArray(allbands: DevExpress.Reporting.Designer.Bands.BandViewModel[], controlType: string, newLevel?: number): any[];
    export function _getUnitAbsoluteRect(bandSurface: DevExpress.Reporting.Designer.Bands.BandSurface | DevExpress.Reporting.Designer.Bands.VerticalBandSurface, getPositionInParent: Function): DevExpress.Analytics.Elements.IArea;
    export function addBandToContainer(container: DevExpress.Reporting.Designer.Bands.DetailReportBand | DevExpress.Reporting.Designer.Controls.ReportViewModel, control: DevExpress.Reporting.Designer.Bands.BandViewModel): void;
    export class PrintAcrossBandsPlaceHolder extends Disposable {
        band: DevExpress.Reporting.Designer.Bands.BandSurface;
        private findNextUntransparentSiblingBand;
        private findFirstNonAcrossBand;
        constructor(band: DevExpress.Reporting.Designer.Bands.BandSurface);
        get bandModel(): DevExpress.Reporting.BandViewModel;
        isVisible: ko.Computed<boolean>;
        absolutePositionY: ko.Computed<number>;
        height: ko.Computed<number>;
    }
}
declare module DevExpress.Reporting.Designer {
    import ReportViewModel = DevExpress.Reporting.Designer.Controls.ReportViewModel;
    import FieldListProvider = DevExpress.Analytics.Internal.FieldListProvider;
    import IActionsProvider = DevExpress.Analytics.Internal.IActionsProvider;
    import IDataSourceInfo = DevExpress.Analytics.Internal.IDataSourceInfo;
    import IDesignerModel = DevExpress.Analytics.Internal.IDesignerModel;
    import IDesignerPart = DevExpress.Analytics.Internal.IDesignerPart;
    import IGlobalSubscribableValue = DevExpress.Analytics.Internal.IGlobalSubscribableValue;
    import IItemsExtender = DevExpress.Analytics.Internal.IItemsExtender;
    import INamedValue = DevExpress.Analytics.Internal.INamedValue;
    import ObjectExplorerProvider = DevExpress.Analytics.Internal.ObjectExplorerProvider;
    import SurfaceSelection = DevExpress.Analytics.Internal.SurfaceSelection;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import DataSourceWizard = DevExpress.Analytics.Wizard.DataSourceWizard;
    import IDataSourceWizardConnectionStrings = DevExpress.Analytics.Wizard.IDataSourceWizardConnectionStrings;
    import MultiQueryDataSourceWizard = DevExpress.Analytics.Wizard.MultiQueryDataSourceWizard;
    import IKeyValuePair = DevExpress.Reporting.IKeyValuePair;
    import PreviewModel = DevExpress.Reporting.Viewer.Internal.PreviewModel;
    import FormattingRule = DevExpress.Reporting.Designer.Controls.FormattingRule;
    import StyleModel = DevExpress.Reporting.Designer.Controls.StyleModel;
    import XRChartSurface = DevExpress.Reporting.Designer.Controls.XRChartSurface;
    import ReportSurface = DevExpress.Reporting.Designer.Controls.ReportSurface;
    import DataSourceHelper = DevExpress.Reporting.Designer.Internal.DataSourceHelper;
    import DesignControlsHelper = DevExpress.Reporting.Designer.Internal.DesignControlsHelper;
    import StylesHelper = DevExpress.Reporting.Designer.Internal.StylesHelper;
    import FieldListDragDropHandler = DevExpress.Reporting.Designer.Internal.FieldListDragDropHandler;
    import ReportToolboxDragDropHandler = DevExpress.Reporting.Designer.Internal.ReportToolboxDragDropHandler;
    import DesignerErrorProvider = DevExpress.Reporting.Designer.Internal.DesignerErrorProvider;
    import ErrorPanelViewModel = DevExpress.Reporting.Designer.Internal.ErrorPanelViewModel;
    import RuntimeErrorProvider = DevExpress.Reporting.Designer.Internal.RuntimeErrorProvider;
    import CalculatedFieldsSource = DevExpress.Reporting.Designer.Internal.CalculatedFieldsSource;
    import FieldListDataSourcesHelper = DevExpress.Reporting.Designer.Internal.FieldListDataSourcesHelper;
    import ParametersViewModel = DevExpress.Reporting.Designer.Internal.ParametersViewModel;
    import ReportItemsProvider = DevExpress.Reporting.Designer.Internal.ReportItemsProvider;
    import ScriptsEditor = DevExpress.Reporting.Designer.Internal.ScriptsEditor;
    import ControlScrollingTool = DevExpress.Reporting.Designer.Internal.ControlScrollingTool;
    import DisplayNameProvider = DevExpress.Reporting.Designer.Internal.DisplayNameProvider;
    import WizardRunner = DevExpress.Reporting.Designer.Internal.WizardRunner;
    import LocalizationEditor = DevExpress.Reporting.Designer.Internal.LocalizationEditor;
    import IReportDesignerCustomizationHandler = DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler;
    import ReportExpressionEditorWrapper = DevExpress.Reporting.Designer.Widgets.ReportExpressionEditorWrapper;
    import ReportWizard = DevExpress.Reporting.Designer.Wizard.ReportWizard;
    import OpenReportDialog = DevExpress.Reporting.Designer.Tools.OpenReportDialog;
    import SaveAsReportDialog = DevExpress.Reporting.Designer.Tools.SaveAsReportDialog;
    import SaveReportDialog = DevExpress.Reporting.Designer.Tools.SaveReportDialog;
    import NavigateByReports = DevExpress.Reporting.Designer.Tools.NavigateByReports;
    import INavigateTab = DevExpress.Reporting.Designer.Tools.INavigateTab;
    import WatermarksViewModel = DevExpress.Reporting.Designer.Internal.WatermarksViewModel;
    import ParameterHelper = DevExpress.Reporting.Viewer.Parameters.ParameterHelper;
    import IParameterContainer = DevExpress.Reporting.Designer.Data.IParameterContainer;
    import ParameterPanelLayoutItem = DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem;
    import Parameter = DevExpress.Reporting.Designer.Data.Parameter;
    import IEditorInfo = DevExpress.Analytics.Utils.IEditorInfo;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ControlType = DevExpress.Reporting.Designer.Internal.ControlType;
    import IParameterTypeValue = DevExpress.Reporting.Designer.Data.IParameterTypeValue;
    import IReportDesignerRootContext = DevExpress.Reporting.Designer.IReportDesignerRootContext;
    import NavigateTab = DevExpress.Reporting.Designer.Tools.NavigateTab;
    import WizardRunType = DevExpress.Reporting.Designer.Wizard.WizardRunType;
    import DxAnalyticsComponentCommon = DevExpress.Analytics.Internal.DxAnalyticsComponentCommon;
    import ICommonBindingCustomizationHandler = DevExpress.Analytics.Internal.ICommonBindingCustomizationHandler;
    import JSDesignerBindingCommon = DevExpress.Analytics.Internal.JSDesignerBindingCommon;
    import IJSDesignerBindingCommonOptions = DevExpress.Analytics.Internal.IJSDesignerBindingCommonOptions;
    import IPreviewCustomizationHandler = DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler;
    import JSReportDesigner = DevExpress.Reporting.Designer.JSReportDesigner;
    import IReportPreviewSettings = DevExpress.Reporting.Designer.Internal.IReportPreviewSettings;
    import IDataSourceSettings = DevExpress.Reporting.Designer.Utils.IDataSourceSettings;
    import IReportDesignerInitializationModel = DevExpress.Reporting.Designer.Utils.IReportDesignerInitializationModel;
    import IReportWizardSettings = DevExpress.Reporting.Designer.Utils.IReportWizardSettings;
    import IReportDeisgnerCallbacks = DevExpress.Reporting.Designer.Utils.IReportDeisgnerCallbacks;
    export class ReportStorageWeb {
        static getErrorMessageHandler(defaultErrorMessage?: string): (message: string, jqXHR: JQueryXHR, textStatus: string) => void;
        static getReportByUrl(url: string): JQueryPromise<DevExpress.Reporting.Designer.Controls.ReportViewModel>;
        static getData(url: string): any;
        static setData(layout: string, url: string): any;
        static setNewData(layout: string, url: string): JQueryPromise<any>;
        static getUrls(subreports?: any): any;
    }
    export interface IReportDesignerRootContext extends IDesignerModel {
        fullScreen: DevExpress.Analytics.Internal.IGlobalSubscribableValue<boolean>;
        canAddItems: ko.Computed<boolean>;
        _wizardRunner: DevExpress.Reporting.Designer.Internal.WizardRunner;
        model: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportViewModel>;
        surface: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportSurface>;
        navigateByReports: DevExpress.Reporting.Designer.Tools.NavigateByReports;
        reportUrls: ko.ObservableArray<DevExpress.Reporting.IKeyValuePair<string>>;
        fieldListItemsExtenders: ko.Observable<DevExpress.Analytics.Internal.IItemsExtender[]>;
        validationMode: ko.Computed<boolean>;
        drawCrossbandContent: ko.Observable<boolean>;
        rootStyle: string;
        toolboxDragHandler: DevExpress.Reporting.Designer.Internal.ReportToolboxDragDropHandler;
        isDirty: ko.Computed<boolean>;
        calculatedFieldsSource: ko.Computed<DevExpress.Reporting.Designer.Internal.CalculatedFieldsSource>;
        watermarks: ko.Computed<DevExpress.Reporting.Designer.Internal.WatermarksViewModel>;
        parameters: ko.Computed<DevExpress.Reporting.Designer.Internal.ParametersViewModel>;
        reportPreviewModel: DevExpress.Reporting.Viewer.Internal.PreviewModel;
        fieldListActionProviders: DevExpress.Analytics.Internal.IActionsProvider[];
        wizard: DevExpress.Reporting.Designer.Wizard.ReportWizard;
        dataSourceWizard: DevExpress.Analytics.Wizard.DataSourceWizard;
        multiQueryDataSourceWizard: DevExpress.Analytics.Wizard.MultiQueryDataSourceWizard;
        localizationEditor: DevExpress.Reporting.Designer.Internal.LocalizationEditor;
        addOns: ko.ObservableArray<DevExpress.Analytics.Internal.IDesignerPart>;
        scriptsEditor: DevExpress.Reporting.Designer.Internal.ScriptsEditor;
        state: any;
        events: ko.Computed<any[]>;
        gotoEvent: (functionName: any, eventName: any, model: any) => void;
        saveReportDialog: DevExpress.Reporting.Designer.Tools.SaveAsReportDialog;
        saveReportDialogLight: DevExpress.Reporting.Designer.Tools.SaveReportDialog;
        connections: DevExpress.Analytics.Wizard.IDataSourceWizardConnectionStrings;
        availableDataSources: DevExpress.Analytics.Internal.IDataSourceInfo[];
        openReportDialog: DevExpress.Reporting.Designer.Tools.OpenReportDialog;
        styles: ko.Computed<ko.ObservableArray<DevExpress.Reporting.Designer.Controls.StyleModel>>;
        formattingRuleSheet: ko.Computed<ko.ObservableArray<DevExpress.Reporting.Designer.Controls.FormattingRule>>;
        reportExplorerProvider: DevExpress.Analytics.Internal.ObjectExplorerProvider;
        designMode: ko.Observable<boolean> | ko.Computed<boolean>;
        displayNameProvider: ko.Computed<DevExpress.Reporting.Designer.Internal.DisplayNameProvider>;
        getDisplayNameByPath: (path: string, value: string) => JQueryPromise<string>;
        fieldListProvider: ko.Computed<DevExpress.Analytics.Internal.FieldListProvider>;
        dataBindingsProvider: ko.Computed<DevExpress.Analytics.Internal.FieldListProvider>;
        fieldListDataSources: ko.ObservableArray<DevExpress.Analytics.Internal.IDataSourceInfo>;
        reportItemsProvider: ko.Computed<DevExpress.Reporting.Designer.Internal.ReportItemsProvider>;
        expressionDisplayNameProvider: ko.Computed<DevExpress.Reporting.Designer.Internal.DisplayNameProvider>;
        dataSourceHelper: ko.Computed<DevExpress.Reporting.Designer.Internal.DataSourceHelper>;
        selectedPath: ko.Observable<string> | ko.Computed<string>;
        controls: ko.Computed<DevExpress.Analytics.Internal.INamedValue[]>;
        bands: ko.Computed<DevExpress.Analytics.Internal.INamedValue[]>;
        isMenuCollapsed: ko.Observable<boolean>;
        chartDataSources: ko.Computed<Array<{
            displayName: string;
            value: any;
        }>>;
        getControls: (target: any) => ko.Computed<ko.Computed<DevExpress.Analytics.Internal.INamedValue[]>>;
        actionStorage: any;
        fieldDragHandler: DevExpress.Reporting.Designer.Internal.FieldListDragDropHandler;
        runChartDesigner: (chart: DevExpress.Reporting.Designer.Controls.XRChartSurface) => void;
        zoomStep: ko.Observable<number> | ko.Computed<number>;
        onViewPortScroll: (viewPort: HTMLElement) => void;
        updateSurfaceSize: () => void;
        openReport: (url: string) => void;
        showPreview: () => void;
        getTabs: () => DevExpress.Reporting.Designer.Tools.INavigateTab[];
        closeTab: (tab: DevExpress.Reporting.Designer.Tools.INavigateTab, force?: boolean) => void;
        localizationMode: ko.Observable<boolean>;
        errorPanelViewModel: DevExpress.Reporting.Designer.Internal.ErrorPanelViewModel;
        controlScrollingTool: DevExpress.Reporting.Designer.Internal.ControlScrollingTool;
        afterRender?: () => void;
        activatedExpressionEditor: ko.Observable<DevExpress.Reporting.Designer.Widgets.ReportExpressionEditorWrapper>;
    }
    export interface IDesignerContextOptionsInitOptions {
        availableDataSources: DevExpress.Analytics.Internal.IDataSourceInfo[];
        state?: any;
    }
    export interface IDesignerContextOptions {
        initializeOptions: IDesignerContextOptionsInitOptions;
        selection: DevExpress.Analytics.Internal.SurfaceSelection;
        report?: DevExpress.Reporting.Designer.Controls.ReportViewModel;
        knownEnums?: any;
        url?: string | ko.Observable<string> | ko.Computed<string>;
        data?: any;
        dataSourceRefs?: any;
        designerCallbacks: DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler;
    }
    export interface IReportDesignerContext {
        report: DevExpress.Reporting.Designer.Controls.ReportViewModel;
        url: ko.Observable<string> | ko.Computed<string>;
        surface: DevExpress.Reporting.Designer.Controls.ReportSurface;
        dataSourceHelper: DevExpress.Reporting.Designer.Internal.DataSourceHelper;
        parameters: DevExpress.Reporting.Designer.Internal.ParametersViewModel;
        reportErrorProvider: DevExpress.Reporting.Designer.Internal.DesignerErrorProvider;
        runtimeErrorProvider: DevExpress.Reporting.Designer.Internal.RuntimeErrorProvider;
        fieldListDataSourceHelper: DevExpress.Reporting.Designer.Internal.FieldListDataSourcesHelper;
        watermarks: DevExpress.Reporting.Designer.Internal.WatermarksViewModel;
        calcFieldsSource: DevExpress.Reporting.Designer.Internal.CalculatedFieldsSource;
        fieldListItemsExtenders: DevExpress.Analytics.Internal.IItemsExtender[];
        fieldListProvider: DevExpress.Analytics.Internal.FieldListProvider;
        reportItemsProvider: DevExpress.Reporting.Designer.Internal.ReportItemsProvider;
        dataBindingsProvider: DevExpress.Analytics.Internal.FieldListProvider;
        chartValueBindingProvider: DevExpress.Analytics.Internal.FieldListProvider;
        displayNameProvider: DevExpress.Reporting.Designer.Internal.DisplayNameProvider;
        expressionDisplayNameProvider: DevExpress.Reporting.Designer.Internal.DisplayNameProvider;
        controlsHelper: DevExpress.Reporting.Designer.Internal.DesignControlsHelper;
        stylesHelper: DevExpress.Reporting.Designer.Internal.StylesHelper;
        state: () => any;
    }
    export class ReportDesignerContext extends Disposable implements IReportDesignerContext {
        state: () => any;
        url: ko.Observable<string> | ko.Computed<string>;
        report: DevExpress.Reporting.Designer.Controls.ReportViewModel;
        reportErrorProvider: DevExpress.Reporting.Designer.Internal.DesignerErrorProvider;
        runtimeErrorProvider: DevExpress.Reporting.Designer.Internal.RuntimeErrorProvider;
        surface: DevExpress.Reporting.Designer.Controls.ReportSurface;
        dataSourceHelper: DevExpress.Reporting.Designer.Internal.DataSourceHelper;
        watermarks: DevExpress.Reporting.Designer.Internal.WatermarksViewModel;
        parameters: DevExpress.Reporting.Designer.Internal.ParametersViewModel;
        fieldListDataSourceHelper: DevExpress.Reporting.Designer.Internal.FieldListDataSourcesHelper;
        calcFieldsSource: DevExpress.Reporting.Designer.Internal.CalculatedFieldsSource;
        fieldListItemsExtenders: DevExpress.Analytics.Internal.IItemsExtender[];
        fieldListProvider: DevExpress.Analytics.Internal.FieldListProvider;
        reportItemsProvider: DevExpress.Reporting.Designer.Internal.ReportItemsProvider;
        dataBindingsProvider: DevExpress.Analytics.Internal.FieldListProvider;
        chartValueBindingProvider: DevExpress.Analytics.Internal.FieldListProvider;
        displayNameProvider: DevExpress.Reporting.Designer.Internal.DisplayNameProvider;
        expressionDisplayNameProvider: DevExpress.Reporting.Designer.Internal.DisplayNameProvider;
        controlsHelper: DevExpress.Reporting.Designer.Internal.DesignControlsHelper;
        stylesHelper: DevExpress.Reporting.Designer.Internal.StylesHelper;
        private _getChartAvailableSources;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        isModelReady(): boolean;
        dispose(): void;
        constructor(options: IDesignerContextOptions);
    }
    export class ReportParameterHelper extends ParameterHelper {
        container: DevExpress.Reporting.Designer.Data.IParameterContainer;
        allLayoutItems: ko.Computed<DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem[]>;
        get parameters(): ko.ObservableArray<DevExpress.Reporting.Designer.Data.Parameter>;
        get parameterPanelLayoutItems(): ko.ObservableArray<DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem>;
        getAllLayoutItems(items: DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem[]): Array<any>;
        constructor(container: DevExpress.Reporting.Designer.Data.IParameterContainer);
        addParameterPanelLayoutItem(item: DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem): void;
        startEditing(): void;
        endEditing(): void;
        updateParameterLayoutItems(): void;
        clearLayoutItems(): void;
        getParameterLayoutItem(parameter: DevExpress.Reporting.Designer.Data.Parameter): DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem;
        removeParameterModel(parameter: DevExpress.Reporting.Designer.Data.Parameter): void;
    }
    /// <reference types="jquery" />
    export class JSReportDesigner {
        private _designerModel;
        get designerModel(): DevExpress.Reporting.Designer.IReportDesignerRootContext;
        set designerModel(newVal: DevExpress.Reporting.Designer.IReportDesignerRootContext);
        constructor(_designerModel: ko.Observable<DevExpress.Reporting.Designer.IReportDesignerRootContext>);
        UpdateLocalization(localization: {
            [key: string]: string;
        }): void;
        GetDesignerModel(): DevExpress.Reporting.Designer.IReportDesignerRootContext;
        GetPreviewModel(): DevExpress.Reporting.Viewer.Internal.PreviewModel;
        GetPropertyInfo(controlType: DevExpress.Reporting.Designer.Internal.ControlType, path: string | Array<string>): DevExpress.Analytics.Utils.ISerializationInfo;
        GetButtonStorage(): any;
        RunWizard(wizardType: DevExpress.Reporting.Designer.Wizard.WizardRunType): void;
        GetJsonReportModel(): any;
        IsModified(): boolean;
        ResetIsModified(): void;
        AddToPropertyGrid(groupName: string, property: DevExpress.Analytics.Utils.ISerializationInfo): void;
        AddParameterType(parameterInfo: DevExpress.Reporting.Designer.Data.IParameterTypeValue, editorInfo: DevExpress.Analytics.Utils.IEditorInfo): void;
        RemoveParameterType(parameterType: string): void;
        GetParameterInfo(parameterType: string): DevExpress.Reporting.Designer.Data.IParameterTypeValue;
        GetParameterEditor(valueType: string): DevExpress.Analytics.Utils.IEditorInfo;
        ReportStorageGetData(url: string): JQuery.Promise<any>;
        ReportStorageSetData(reportLayout: string, url: string): JQuery.Promise<any>;
        ReportStorageSetNewData(reportLayout: string, url: string): JQuery.Promise<any>;
        SaveReport(): JQuery.Promise<any>;
        GetTabs(): DevExpress.Reporting.Designer.Tools.INavigateTab[];
        GetCurrentTab(): DevExpress.Reporting.Designer.Tools.NavigateTab;
        CloseTab(tab: DevExpress.Reporting.Designer.Tools.INavigateTab, force?: boolean): void;
        CloseCurrentTab(): void;
        AdjustControlCore(): void;
        SaveNewReport(reportName: string): JQuery.Promise<any>;
        ReportStorageGetUrls(): JQuery.Promise<any[]>;
        OpenReport(url: string): void;
        ShowPreview(): void;
    }
    export interface IJSDesignerCallbacks extends IReportDeisgnerCallbacks<DxReportDesigner>, ICommonBindingCustomizationHandler<DevExpress.Reporting.Designer.JSReportDesigner> {
        designer?: DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler;
        preview?: DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler;
    }
    export interface IServerSideConfigurationOptions {
        wizardSettings?: DevExpress.Reporting.Designer.Utils.IReportWizardSettings;
        reportPreviewSettings?: DevExpress.Reporting.Designer.Internal.IReportPreviewSettings;
        dataSourceSettings?: DevExpress.Reporting.Designer.Utils.IDataSourceSettings;
        allowMDI?: boolean;
        rightToLeft?: boolean;
    }
    export interface IReportDesignerOptions extends IJSDesignerBindingCommonOptions {
        designerModel?: any;
        initializationData?: DevExpress.Reporting.Designer.Utils.IReportDesignerInitializationModel | ko.Observable<DevExpress.Reporting.Designer.Utils.IReportDesignerInitializationModel>;
        requestOptions?: {
            host: string;
            getDesignerModelAction?: string;
            getLocalizationAction?: string;
        };
        designerModelSettings?: IServerSideConfigurationOptions;
        callbacks?: IJSDesignerCallbacks;
        reportModel?: any;
        reportUrl?: any;
        parts?: any[];
        limitation?: boolean;
        undoEngine?: any;
    }
    export class JSReportDesignerBinding extends JSDesignerBindingCommon<DevExpress.Reporting.Designer.JSReportDesigner, IReportDesignerOptions> {
        private _initializationData;
        private _callbacks;
        private _model;
        private _deferreds;
        private _applyBindings;
        private _initializeCallbacks;
        private _createModel;
        private _showErrorInfo;
        private _getDesignerModelRequest;
        constructor(_options: IReportDesignerOptions, customEventRaiser?: (eventName: string, args?: any) => void);
        dispose(): void;
        applyBindings(element: HTMLElement): void;
    }
    export class DxReportDesigner extends DxAnalyticsComponentCommon<IReportDesignerOptions> {
        getBindingName(): string;
    }
}
declare module DevExpress.Reporting.Designer.Actions {
    import ElementViewModel = DevExpress.Analytics.Elements.ElementViewModel;
    import ControlType = DevExpress.Reporting.Designer.Internal.ControlType;
    import XRTextControlSurfaceBase = DevExpress.Reporting.Designer.Controls.XRTextControlSurfaceBase;
    import TextElementSizeHelper = DevExpress.Reporting.Designer.Internal.TextElementSizeHelper;
    import BaseActionsProvider = DevExpress.Analytics.Internal.BaseActionsProvider;
    import BaseConverter = DevExpress.Reporting.Designer.Internal.BaseConverter;
    import ISurfaceContext = DevExpress.Analytics.Elements.ISurfaceContext;
    import ISelectionProvider = DevExpress.Analytics.Internal.ISelectionProvider;
    import IActionKO = DevExpress.Analytics.Utils.IActionKO;
    import XRPdfContentViewModel = DevExpress.Reporting.Designer.Controls.XRPdfContentViewModel;
    import IDisposableActionsProvider = DevExpress.Analytics.Internal.IDisposableActionsProvider;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import IAction = DevExpress.Analytics.Utils.IAction;
    import IComponentAddedEventArgs = DevExpress.Reporting.Designer.Utils.IComponentAddedEventArgs;
    import IReportDesignerRootContext = DevExpress.Reporting.Designer.IReportDesignerRootContext;
    import SurfaceElementBase = DevExpress.Analytics.Elements.SurfaceElementBase;
    import ElementActions = DevExpress.Reporting.Designer.Actions.ElementActions;
    import XRTableControlViewModel = DevExpress.Reporting.Designer.Controls.XRTableControlViewModel;
    import XRTableRowViewModel = DevExpress.Reporting.Designer.Controls.XRTableRowViewModel;
    import XRTableCellViewModel = DevExpress.Reporting.Designer.Controls.XRTableCellViewModel;
    import TableRowActions = DevExpress.Reporting.Designer.Actions.TableRowActions;
    export class FitBoundsToTextAction {
        _control: DevExpress.Reporting.Designer.Controls.XRTextControlSurfaceBase<ElementViewModel<ControlType>>;
        textElementHelper: DevExpress.Reporting.Designer.Internal.TextElementSizeHelper;
        private _getNewRectForVetical;
        private _findWidth;
        private _getNewRectForHorizontal;
        private _getTextContainerSize;
        private _getTextHeight;
        fitWidth(): void;
        fitHeight(): void;
        fitBounds(): void;
        constructor(_control: DevExpress.Reporting.Designer.Controls.XRTextControlSurfaceBase<ElementViewModel<ControlType>>, textElementHelper?: DevExpress.Reporting.Designer.Internal.TextElementSizeHelper);
    }
    export class FitTextToBoundsAction {
        _control: DevExpress.Reporting.Designer.Controls.XRTextControlSurfaceBase<ElementViewModel<ControlType>>;
        textElementHelper: DevExpress.Reporting.Designer.Internal.TextElementSizeHelper;
        private _getTextSide;
        private _calculateFont;
        private _getAvailableFont;
        fit(): void;
        constructor(_control: DevExpress.Reporting.Designer.Controls.XRTextControlSurfaceBase<ElementViewModel<ControlType>>, textElementHelper?: DevExpress.Reporting.Designer.Internal.TextElementSizeHelper);
    }
    export const ActionId: {
        NewReport: string;
        NewReportViaWizard: string;
        OpenReport: string;
        ReportWizard: string;
        ReportWizardFullScreen: string;
        Preview: string;
        Scripts: string;
        AddDataSource: string;
        AddSqlDataSource: string;
        AddMultiQuerySqlDataSource: string;
        ValidateBindings: string;
        Save: string;
        SaveAs: string;
        Exit: string;
        FullScreen: string;
        Localization: string;
    };
    export class CrossTabActions extends BaseActionsProvider {
        private _converters;
        get _converter(): DevExpress.Reporting.Designer.Internal.BaseConverter;
        constructor(_converters: DevExpress.Reporting.Designer.Internal.BaseConverter[], isDisabled?: () => boolean);
        condition(context: any): boolean;
    }
    export class ElementsGroupActions extends BaseActionsProvider {
        private _selectionProvider;
        actions: DevExpress.Analytics.Utils.IActionKO[];
        constructor(surfaceContext: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext>, selectionProvider: DevExpress.Analytics.Internal.ISelectionProvider);
        condition(context: any): boolean;
    }
    export class PdfContentActions extends BaseActionsProvider {
        private _selection;
        get _focusedPdfContent(): DevExpress.Reporting.Designer.Controls.XRPdfContentViewModel;
        constructor(_selection: DevExpress.Analytics.Internal.ISelectionProvider, isDisabled?: () => boolean);
        condition(context: any): boolean;
    }
    export class PivotGridActions extends BaseActionsProvider {
        private _converters;
        get _converter(): DevExpress.Reporting.Designer.Internal.BaseConverter;
        constructor(_converters: DevExpress.Reporting.Designer.Internal.BaseConverter[], isDisabled?: () => boolean);
        condition(context: any): boolean;
    }
    export class ReportActions extends Disposable implements IDisposableActionsProvider {
        private _buildingModel?;
        actions: DevExpress.Analytics.Utils.IAction[];
        private _contextModel;
        private _targetModel;
        private _canAddBand;
        private _addBand;
        private createComputed;
        constructor(onComponentAdded?: any, _buildingModel?: DevExpress.Reporting.Designer.IReportDesignerRootContext);
        getActions(context: any): DevExpress.Analytics.Utils.IAction[];
        onComponentAdded: (e: DevExpress.Reporting.Designer.Utils.IComponentAddedEventArgs) => void;
    }
    export class FitToContainerAction {
        private _control;
        private _container;
        constructor(_control: ko.Observable<DevExpress.Analytics.Elements.SurfaceElementBase<ElementViewModel>>);
        doAction(): void;
        allowed(): boolean;
        visible(): boolean;
    }
    export class ElementActions extends BaseActionsProvider {
        private _selectionProvider;
        private _generalDisabled;
        private _isMultiSelect;
        constructor(surfaceContext: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext>, selectionProvider: DevExpress.Analytics.Internal.ISelectionProvider);
        condition(context: any): boolean;
    }
    export class ReportElementActions extends ElementActions {
        constructor(surfaceContext: ko.Observable<DevExpress.Analytics.Elements.ISurfaceContext>, selection: DevExpress.Analytics.Internal.ISelectionProvider);
        getActions(context: any): DevExpress.Analytics.Utils.IAction[];
    }
    export class TableRowActions extends BaseActionsProvider {
        selection: DevExpress.Analytics.Internal.ISelectionProvider;
        get _row(): DevExpress.Reporting.Designer.Controls.XRTableRowViewModel;
        get _table(): DevExpress.Reporting.Designer.Controls.XRTableControlViewModel;
        isDisabled(): boolean;
        constructor(selection: DevExpress.Analytics.Internal.ISelectionProvider, onComponentAdded?: any, isDisabled?: () => boolean);
        insertRowAbove(): void;
        insertRowBelow(): void;
        deleteRow(): void;
        condition(context: any): boolean;
        onComponentAdded: (e: DevExpress.Reporting.Designer.Utils.IComponentAddedEventArgs) => void;
    }
    export class TableCellActions extends TableRowActions {
        get _cell(): DevExpress.Reporting.Designer.Controls.XRTableCellViewModel;
        get _row(): DevExpress.Reporting.Designer.Controls.XRTableRowViewModel;
        get _table(): DevExpress.Reporting.Designer.Controls.XRTableControlViewModel;
        private get _cellSurface();
        constructor(selection: DevExpress.Analytics.Internal.ISelectionProvider, onComponentAdded?: any, isDisabled?: () => boolean);
        insertCell(): void;
        deleteCell(): void;
        deleteRow(): void;
        insertColumn(isRight: boolean): void;
        deleteColumn(): void;
        condition(context: any): boolean;
        onComponentAdded: (e: DevExpress.Reporting.Designer.Utils.IComponentAddedEventArgs) => void;
    }
    export class TableCellGroupActions extends BaseActionsProvider {
        private _selectionProvider;
        private _distributeColumnsAction;
        private _distributeRowsAction;
        constructor(selectionProvider: DevExpress.Analytics.Internal.ISelectionProvider);
        _distributeColumns(): void;
        _distributeRows(): void;
        _calculateMinimalHeight(cell: DevExpress.Reporting.Designer.Controls.XRTableCellViewModel): number;
        _calculateTextHeight(cell: DevExpress.Reporting.Designer.Controls.XRTableCellViewModel): number;
        _calculateBordersHeight(cell: DevExpress.Reporting.Designer.Controls.XRTableCellViewModel): number;
        _isCellTextControl(cell: DevExpress.Reporting.Designer.Controls.XRTableCellViewModel): boolean;
        _calculatePaddingsHeight(cell: DevExpress.Reporting.Designer.Controls.XRTableCellViewModel): number;
        _calculatePaddingsWidth(cell: DevExpress.Reporting.Designer.Controls.XRTableCellViewModel): number;
        _selectedCells(): any[];
        condition(context: any): boolean;
    }
    export class TextElementAction extends BaseActionsProvider {
        private _selectionProvider;
        private get _textControls();
        private _inaccessibleAction;
        constructor(_selectionProvider: DevExpress.Analytics.Internal.ISelectionProvider);
        condition(context: any): boolean;
    }
    export class ChartActions extends BaseActionsProvider {
        private _buildingModel?;
        private _context;
        constructor(_buildingModel?: DevExpress.Reporting.Designer.IReportDesignerRootContext);
        condition(context: any): boolean;
    }
}
declare module DevExpress.Reporting.Designer.Utils {
    import IDataSourceInfo = DevExpress.Analytics.Internal.IDataSourceInfo;
    import IDesignerPart = DevExpress.Analytics.Internal.IDesignerPart;
    import IGlobalizeSettings = DevExpress.Analytics.Internal.IGlobalizeSettings;
    import _ICommonCallbacksHandler = DevExpress.Analytics.Internal._ICommonCallbacksHandler;
    import IAction = DevExpress.Analytics.Utils.IAction;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    import IDisplayedValue = DevExpress.Analytics.Utils.IDisplayedValue;
    import IStandardPattern = DevExpress.Analytics.Widgets.Internal.IStandardPattern;
    import DataSourceWizardSettings = DevExpress.Analytics.Wizard.DataSourceWizardSettings;
    import IConnectionStringDefinition = DevExpress.Analytics.Wizard.IConnectionStringDefinition;
    import IDataSourceWizardSettings = DevExpress.Analytics.Wizard.IDataSourceWizardSettings;
    import ITypeItem = DevExpress.Analytics.Wizard.ITypeItem;
    import IEnumType = DevExpress.Reporting.IEnumType;
    import IKeyValuePair = DevExpress.Reporting.IKeyValuePair;
    import IParametersCustomizationHandler = DevExpress.Reporting.Viewer.Utils.IParametersCustomizationHandler;
    import ControlsFactory = DevExpress.Reporting.Designer.Controls.ControlsFactory;
    import IErrorPanelViewModelSettings = DevExpress.Reporting.Designer.Internal.IErrorPanelViewModelSettings;
    import ReportDialogBase = DevExpress.Reporting.Designer.Tools.ReportDialogBase;
    import IReportPreviewSettings = DevExpress.Reporting.Designer.Internal.IReportPreviewSettings;
    import INavigateTab = DevExpress.Reporting.Designer.Tools.INavigateTab;
    import WizardType = DevExpress.Reporting.Designer.Wizard.WizardType;
    import WizardTypeString = DevExpress.Reporting.Designer.Wizard.WizardTypeString;
    import DataBindingModeValue = DevExpress.Reporting.Designer.Utils.DataBindingModeValue;
    import DefaultCrossTabControlValue = DevExpress.Reporting.Designer.Utils.DefaultCrossTabControlValue;
    import ControlType = DevExpress.Reporting.Designer.Internal.ControlType;
    import XRReportElementViewModel = DevExpress.Reporting.Designer.Controls.XRReportElementViewModel;
    import ISmartTag = DevExpress.Reporting.Designer.Tools.ISmartTag;
    import ElementViewModel = DevExpress.Analytics.Elements.ElementViewModel;
    import ISelectionTarget = DevExpress.Analytics.Internal.ISelectionTarget;
    import BandViewModel = DevExpress.Reporting.Designer.Bands.BandViewModel;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ControlsFactory = DevExpress.Analytics.Utils.ControlsFactory;
    import IDialogModel = DevExpress.Reporting.Designer.Tools.IDialogModel;
    import ICommonCallbacksHandler = DevExpress.Analytics.Internal.ICommonCallbacksHandler;
    import SaveReportDialog = DevExpress.Reporting.Designer.Tools.SaveReportDialog;
    import OpenReportDialog = DevExpress.Reporting.Designer.Tools.OpenReportDialog;
    import SaveAsReportDialog = DevExpress.Reporting.Designer.Tools.SaveAsReportDialog;
    import IPreviewCustomizationCallbacks = DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationCallbacks;
    import IPreviewCustomizationCallbacksCommon = DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationCallbacksCommon;
    import IReportDesignerRootContext = DevExpress.Reporting.Designer.IReportDesignerRootContext;
    export class Base64ImageParser {
        static getImageRatio(data: string, format: string): {
            x: number;
            y: number;
        };
        private static _getDataChunks;
        private static _countDpiFromBytes;
        private static _pngHasDpiChunks;
        static getMonitorPPI(): number;
    }
    export enum PaperKind {
        Custom = 0,
        Letter = 1,
        LetterSmall = 2,
        Tabloid = 3,
        Ledger = 4,
        Legal = 5,
        Statement = 6,
        Executive = 7,
        A3 = 8,
        A4 = 9,
        A4Small = 10,
        A5 = 11,
        B4 = 12,
        B5 = 13,
        Folio = 14,
        Quarto = 15,
        Standard10x14 = 16,
        Standard11x17 = 17,
        Note = 18,
        Number9Envelope = 19,
        Number10Envelope = 20,
        Number11Envelope = 21,
        Number12Envelope = 22,
        Number14Envelope = 23,
        CSheet = 24,
        DSheet = 25,
        ESheet = 26,
        DLEnvelope = 27,
        C5Envelope = 28,
        C3Envelope = 29,
        C4Envelope = 30,
        C6Envelope = 31,
        C65Envelope = 32,
        B4Envelope = 33,
        B5Envelope = 34,
        B6Envelope = 35,
        ItalyEnvelope = 36,
        MonarchEnvelope = 37,
        PersonalEnvelope = 38,
        USStandardFanfold = 39,
        GermanStandardFanfold = 40,
        GermanLegalFanfold = 41,
        IsoB4 = 42,
        JapanesePostcard = 43,
        Standard9x11 = 44,
        Standard10x11 = 45,
        Standard15x11 = 46,
        InviteEnvelope = 47,
        LetterExtra = 50,
        LegalExtra = 51,
        TabloidExtra = 52,
        A4Extra = 53,
        LetterTransverse = 54,
        A4Transverse = 55,
        LetterExtraTransverse = 56,
        APlus = 57,
        BPlus = 58,
        LetterPlus = 59,
        A4Plus = 60,
        A5Transverse = 61,
        B5Transverse = 62,
        A3Extra = 63,
        A5Extra = 64,
        B5Extra = 65,
        A2 = 66,
        A3Transverse = 67,
        A3ExtraTransverse = 68,
        JapaneseDoublePostcard = 69,
        A6 = 70,
        JapaneseEnvelopeKakuNumber2 = 71,
        JapaneseEnvelopeKakuNumber3 = 72,
        JapaneseEnvelopeChouNumber3 = 73,
        JapaneseEnvelopeChouNumber4 = 74,
        LetterRotated = 75,
        A3Rotated = 76,
        A4Rotated = 77,
        A5Rotated = 78,
        B4JisRotated = 79,
        B5JisRotated = 80,
        JapanesePostcardRotated = 81,
        JapaneseDoublePostcardRotated = 82,
        A6Rotated = 83,
        JapaneseEnvelopeKakuNumber2Rotated = 84,
        JapaneseEnvelopeKakuNumber3Rotated = 85,
        JapaneseEnvelopeChouNumber3Rotated = 86,
        JapaneseEnvelopeChouNumber4Rotated = 87,
        B6Jis = 88,
        B6JisRotated = 89,
        Standard12x11 = 90,
        JapaneseEnvelopeYouNumber4 = 91,
        JapaneseEnvelopeYouNumber4Rotated = 92,
        Prc16K = 93,
        Prc32K = 94,
        Prc32KBig = 95,
        PrcEnvelopeNumber1 = 96,
        PrcEnvelopeNumber2 = 97,
        PrcEnvelopeNumber3 = 98,
        PrcEnvelopeNumber4 = 99,
        PrcEnvelopeNumber5 = 100,
        PrcEnvelopeNumber6 = 101,
        PrcEnvelopeNumber7 = 102,
        PrcEnvelopeNumber8 = 103,
        PrcEnvelopeNumber9 = 104,
        PrcEnvelopeNumber10 = 105,
        Prc16KRotated = 106,
        Prc32KRotated = 107,
        Prc32KBigRotated = 108,
        PrcEnvelopeNumber1Rotated = 109,
        PrcEnvelopeNumber2Rotated = 110,
        PrcEnvelopeNumber3Rotated = 111,
        PrcEnvelopeNumber4Rotated = 112,
        PrcEnvelopeNumber5Rotated = 113,
        PrcEnvelopeNumber6Rotated = 114,
        PrcEnvelopeNumber7Rotated = 115,
        PrcEnvelopeNumber8Rotated = 116,
        PrcEnvelopeNumber9Rotated = 117,
        PrcEnvelopeNumber10Rotated = 118
    }
    /// <reference types="jquery" />
    export interface IComponentAddedEventArgs {
        parent: any;
        model: any;
    }
    export interface ICultureItem {
        DisplayName: string;
        Name: string;
    }
    export interface IReportNavigationTabsCustomizationHandler {
        reportTabClosing?: (tab: DevExpress.Reporting.Designer.Tools.INavigateTab, deffered: JQueryDeferred<any>) => boolean;
        reportTabClosed?: (tab: DevExpress.Reporting.Designer.Tools.INavigateTab) => void;
        reportOpening?: (e: any) => void;
        reportOpened?: (e: any) => void;
        tabChanged?: (tab: DevExpress.Reporting.Designer.Tools.INavigateTab) => void;
    }
    export interface IReportDesignerCustomizationHandler extends IParametersCustomizationHandler, _ICommonCallbacksHandler, IReportNavigationTabsCustomizationHandler {
        fieldLists?: (IPathRequest: any) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
        exitDesigner?: () => void;
        reportSaving?: (e: any) => void;
        reportSaved?: (e: any) => void;
        customizeParts?: (parts: DevExpress.Analytics.Internal.IDesignerPart[]) => void;
        componentAdded?: (e: IComponentAddedEventArgs) => void;
        customizeSaveDialog?: (popup: DevExpress.Reporting.Designer.Tools.ReportDialogBase) => void;
        customizeOpenDialog?: (popup: DevExpress.Reporting.Designer.Tools.ReportDialogBase) => void;
        customizeWizard?: (wizardType: DevExpress.Reporting.Designer.Wizard.WizardTypeString, wizard: DevExpress.Reporting.Designer.Wizard.WizardType) => void;
        customizeSaveAsDialog?: (popup: DevExpress.Reporting.Designer.Tools.ReportDialogBase) => void;
        customizeToolbox?: (controlsStore: DevExpress.Analytics.Utils.ControlsFactory) => void;
        customizeFieldListActions?: (fieldListItem: DevExpress.Analytics.Utils.IDataMemberInfo, actions: DevExpress.Analytics.Utils.IAction[]) => void;
    }
    export interface IDataSourceRefInfo {
        ref: string;
        name: string;
        isFederationDataSource?: boolean;
        isSqlDataSource?: boolean;
        isJsonDataSource?: boolean;
        isObjectDataSource?: boolean;
        isListType?: boolean;
        isSupportQueries?: boolean;
        hasParams?: boolean;
        hasErrors?: boolean;
        dataSerializer?: string;
    }
    export interface ICultureInfoList {
        csvSeparator?: string;
        fontSet?: Array<string>;
    }
    export enum SearchBoxVisibilityMode {
        Auto = 0,
        Always = 1,
        Never = 2
    }
    export interface IReportWizardSettings extends IDataSourceWizardSettings {
        useFullscreenWizard?: boolean;
        useMasterDetailWizard?: boolean;
        reportWizardTemplatesSearchBoxVisibility?: SearchBoxVisibilityMode;
    }
    export class ReportWizardSettings extends DataSourceWizardSettings implements IReportWizardSettings {
        createDefault(wizardSettings?: IReportWizardSettings): IReportWizardSettings;
        useFullscreenWizard?: boolean;
        useMasterDetailWizard?: boolean;
    }
    export interface IWizardConnections {
        sql?: DevExpress.Analytics.Wizard.IConnectionStringDefinition[];
        json?: DevExpress.Analytics.Wizard.IConnectionStringDefinition[];
    }
    export interface IReportDesignerErrorPanelSettings {
        enableErrorCodeLinks?: boolean;
        showErrors?: boolean;
        showWarnings?: boolean;
        showInformation?: boolean;
        showReportLayoutErrorSource?: boolean;
        showReportScriptsErrorSource?: boolean;
        showReportCreationErrorSource?: boolean;
        showReportExportErrorSource?: boolean;
        enableReportLayoutErrorSource?: boolean;
        enableReportScriptsErrorSource?: boolean;
        enableReportCreationErrorSource?: boolean;
        enableReportExportErrorSource?: boolean;
        suppressedErrorCodes?: string[];
    }
    export interface IDataSourceSettings {
        allowAddDataSource?: boolean;
        allowRemoveDataSource?: boolean;
        allowEditDataSource?: boolean;
    }
    export interface IReportWizardTypeItem extends ITypeItem {
        id: string;
        canInstantlyFinish?: boolean;
        localizationID?: string;
    }
    export interface IReportDesignerInitializationData {
        dataSourceSettings?: IDataSourceSettings;
        report: ko.Observable<any>;
        dataBindingMode: DevExpress.Reporting.Designer.Utils.DataBindingModeValue;
        convertBindingsToExpressions?: string;
        allowMDI?: boolean;
        errorPanelSettings?: IReportDesignerErrorPanelSettings;
        allowCreateNewJsonConnection?: boolean;
        reportUrl: ko.Observable<string> | ko.Computed<string>;
        availableDataSources: DevExpress.Analytics.Internal.IDataSourceInfo[];
        formatStringData?: {
            standardPatterns: {
                [key: string]: DevExpress.Analytics.Widgets.Internal.IStandardPattern;
            };
            customPatterns: {
                [key: string]: Array<string>;
            };
        };
        dataSourceRefs: any[];
        state?: any;
        cultureInfoList?: ICultureInfoList;
        isReportServer?: boolean;
        disableCustomSql: boolean;
        wizardSettings?: IReportWizardSettings;
        wizardConnections?: IWizardConnections;
        isScriptsDisabled?: boolean;
        reportStorageWebIsRegister: boolean;
        subreports?: any;
        reportPreviewSettings?: DevExpress.Reporting.Designer.Internal.IReportPreviewSettings;
        defaultCrossTabControl?: DevExpress.Reporting.Designer.Utils.DefaultCrossTabControlValue;
        reportWizardTemplates?: IReportWizardTypeItem[];
        customControls?: ICustomControlTypeInfo[];
        customGlobalExpressions?: ICustomExpressionInfo[];
        customReportExpressions?: ICustomExpressionInfo[];
        developmentMode?: boolean;
    }
    export interface IReportDesignerInitializationModel extends IGlobalizeSettings {
        dataSourceSettings?: IDataSourceSettings;
        reportModel?: any;
        errorPanelSettings?: DevExpress.Reporting.Designer.Internal.IErrorPanelViewModelSettings;
        reportModelRootName?: string;
        dataBindingMode?: DevExpress.Reporting.Designer.Utils.DataBindingModeValue;
        defaultCrossTabControl?: DevExpress.Reporting.Designer.Utils.DefaultCrossTabControlValue;
        allowCreateNewJsonConnection?: boolean;
        convertBindingsToExpressions?: string;
        allowMDI?: boolean;
        formatStringData?: {
            customPatterns: Array<DevExpress.Reporting.IKeyValuePair<any>>;
            standardPatterns: Array<DevExpress.Reporting.IKeyValuePair<any>>;
        };
        availableCultures?: ICultureItem[];
        reportUrl?: string;
        dataSources?: DevExpress.Analytics.Internal.IDataSourceInfo[];
        dataSourcesData?: any[];
        dataSourceRefs?: any[];
        subreports?: any;
        internalSettings?: {
            isReportServer?: boolean;
        };
        disableCustomSql: boolean;
        scriptsEnabled?: boolean;
        reportStorageWebIsRegister?: boolean;
        cultureInfoList?: ICultureInfoList;
        reportExtensions?: any;
        wizardSettings?: IReportWizardSettings;
        wizardConnections?: IWizardConnections;
        knownEnums?: Array<DevExpress.Reporting.IEnumType>;
        localization?: any;
        fieldListMaxNestingLevelUpdate?: number;
        rtl?: boolean;
        handlerUri?: string;
        viewerHandlerUri?: string;
        limitation?: boolean;
        queryBuilderHandlerUri?: string;
        reportPreviewSettings?: DevExpress.Reporting.Designer.Internal.IReportPreviewSettings;
        reportWizardTemplates?: IReportWizardTypeItem[];
        customControls?: ICustomControlTypeInfo[];
        customGlobalExpressions?: ICustomExpressionInfo[];
        customReportExpressions?: ICustomExpressionInfo[];
        developmentMode?: boolean;
    }
    export interface ICustomControlTypeInfo {
        className: string;
        fullTypeName: string;
        inheritClassName: string;
        showInToolbox: boolean;
        properties: ICustomControlPropertyInfo[];
        initValues: DevExpress.Reporting.IKeyValuePair<string>[];
    }
    export interface ICustomControlPropertyInfo {
        name: string;
        model: string;
        category: string;
        editor: EditorName;
        displayName: string;
        defaultValue: any;
        isFavorite: boolean;
    }
    export interface ICustomControlObjectPropertyInfo extends ICustomControlPropertyInfo {
        properties: ICustomControlPropertyInfo[];
    }
    export interface ICustomControlLinkPropertyInfo extends ICustomControlPropertyInfo {
        link: boolean;
    }
    export interface ICustomControlArrayPropertyInfo extends ICustomControlPropertyInfo {
        array: boolean;
        properties: ICustomControlPropertyInfo[];
    }
    export interface ICustomControlEnumPropertyInfo extends ICustomControlPropertyInfo {
        values: DevExpress.Analytics.Utils.IDisplayedValue[];
    }
    export type EditorName = "unknown" | "text" | "boolean" | "irrationalNumber" | "rationalNumber" | "string" | "guid" | "date" | "color" | "object" | "array" | "enum" | "link";
    export interface ICustomExpressionInfo {
        name: string;
        category: string;
        description: string;
        minOperandCount: number;
        maxOperandCount: number;
    }
    export type DataBindingModeValue = "Bindings" | "Expressions" | "ExpressionsAdvanced";
    export type DefaultCrossTabControlValue = "XRCrossTab" | "XRPivotGrid";
    export type SmartTagFactory = {
        [key in DevExpress.Reporting.Designer.Internal.ControlType]?: (element: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel) => DevExpress.Reporting.Designer.Tools.ISmartTag[];
    };
    export const controlsFactory: DevExpress.Analytics.Internal.IGlobalSubscribableValue<DevExpress.Analytics.Utils.ControlsFactory>;
    export const smartTagFactory: DevExpress.Analytics.Internal.IGlobalSubscribableValue<SmartTagFactory>;
    export const DataBindingMode: DevExpress.Analytics.Internal.IGlobalSubscribableValue<DevExpress.Reporting.Designer.Utils.DataBindingModeValue>;
    export const HandlerUri: DevExpress.Analytics.Internal.IGlobalSubscribableValue<string>;
    export const formatStringEditorCustomSet: DevExpress.Analytics.Internal.IGlobalSubscribableValue<{
        [key: string]: string[];
    }>;
    export const DefaultCrossTabControl: DevExpress.Analytics.Internal.IGlobalSubscribableValue<DevExpress.Reporting.Designer.Utils.DefaultCrossTabControlValue>;
    export function base64UTF16LEtobase64UTF8(base64UTF16: string, resultCallback: any): void;
    export function _isReorderBand(dropTarget: DevExpress.Analytics.Internal.ISelectionTarget, dragFrom: DevExpress.Analytics.Elements.ElementViewModel): boolean;
    export function _isMarginBand(band: DevExpress.Reporting.Designer.Bands.BandViewModel): boolean;
    export function _isPageBand(band: DevExpress.Reporting.Designer.Bands.BandViewModel): boolean;
    export const availableFonts: DevExpress.Reporting.Observable<{
        [key: string]: string;
    }>;
    export const ReportDesignerElements: {
        MenuButton: string;
        Toolbar: string;
        Toolbox: string;
        GroupedToolbox: string;
        Surface: string;
        RightPanel: string;
    } & {
        MenuButton: string;
        NavigationPanel: string;
        ReportDialog: string;
        ChartDialog: string;
        ReportConverterDialog: string;
        Parameters: string;
        ContextMenu: string;
    };
    export const ReportDesignerAddOns: {
        Preview: string;
        ReportWizard: string;
        ReportWizardFullscreen: string;
        LocalizationEditor: string;
        ErrorPanel: string;
        DataSourceWizard: string;
        MultiQueryDataSourceWizard: string;
        MultiQueryDataSourceWizardFullscreen: string;
        MasterDetailEditor: string;
        FederatedManageQueriesEditor: string;
        FederatedQueriesPopups: string;
        ScriptEditor: string;
        ExpressionEditor: string;
    };
    export interface ICustomControlSerializationInfo extends ISerializationInfo {
        group: string;
    }
    /// <reference types="jquery" />
    interface IReportNavigationArgs {
        Tab: DevExpress.Reporting.Designer.Tools.INavigateTab;
    }
    interface IReportTabClosingArgs extends IReportNavigationArgs {
        Tab: DevExpress.Reporting.Designer.Tools.INavigateTab;
        ReadyToClose: JQueryDeferred<any>;
        Handled: boolean;
    }
    interface IReportOpenedArgs {
        Url: string;
        Report?: any;
    }
    interface IReportOpeningArgs extends IReportOpenedArgs {
        Cancel: boolean;
    }
    interface IComponentAddedArgs {
        Model: any;
        Parent: any;
    }
    interface ICustomizeDialogArgs<DialogType> {
        Popup: DialogType;
        Customize: (template: string, model: DevExpress.Reporting.Designer.Tools.IDialogModel) => void;
    }
    interface ICustomizeWizardArgs {
        Type: DevExpress.Reporting.Designer.Wizard.WizardTypeString;
        Wizard: DevExpress.Reporting.Designer.Wizard.WizardType;
    }
    interface ICustomizeFieldListActionsArgs {
        Item: DevExpress.Analytics.Utils.IDataMemberInfo;
        Actions: DevExpress.Analytics.Utils.IAction[];
    }
    export interface IReportDeisgnerCallbacks<T> extends IReportViewerIntoDesignerCallbacks<T>, IPreviewCustomizationCallbacksCommon<T>, ICommonCallbacksHandler<T, DevExpress.Reporting.Designer.IReportDesignerRootContext> {
        ReportTabClosing?: (sender: T, args: IReportTabClosingArgs) => void;
        ReportTabClosed?: (sender: T, args: IReportNavigationArgs) => void;
        ReportOpening?: (sender: T, args: IReportOpeningArgs) => void;
        ReportOpened?: (sender: T, args: IReportOpenedArgs) => void;
        TabChanged?: (sender: T, args: {
            Tab: DevExpress.Reporting.Designer.Tools.INavigateTab;
        }) => void;
        ExitDesigner?: (sender: T) => void;
        ReportSaving?: (sender: T, args: IReportOpeningArgs) => void;
        reportSaved?: (sender: T, args: IReportOpenedArgs) => void;
        ComponentAdded?: (sender: T, args: IComponentAddedArgs) => void;
        CustomizeSaveDialog?: (sender: T, args: ICustomizeDialogArgs<DevExpress.Reporting.Designer.Tools.SaveReportDialog>) => void;
        CustomizeOpenDialog?: (sender: T, args: ICustomizeDialogArgs<DevExpress.Reporting.Designer.Tools.OpenReportDialog>) => void;
        CustomizeSaveAsDialog?: (sender: T, args: ICustomizeDialogArgs<DevExpress.Reporting.Designer.Tools.SaveAsReportDialog>) => void;
        CustomizeWizard?: (sender: T, args: ICustomizeWizardArgs) => void;
        CustomizeToolbox?: (sender: T, args: {
            ControlsFactory: DevExpress.Analytics.Utils.ControlsFactory;
        }) => void;
        CustomizeFieldListActions?: (sender: T, args: ICustomizeFieldListActionsArgs) => void;
    }
    export {};
    export type IReportViewerIntoDesignerCallbacks<T> = { [key: string]: string };
}
declare module DevExpress.Reporting.Designer.Tools {
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import UndoEngine = DevExpress.Analytics.Utils.UndoEngine;
    import ObjectProperties = DevExpress.Analytics.Widgets.ObjectProperties;
    import ReportViewModel = DevExpress.Reporting.Designer.Controls.ReportViewModel;
    import ObjectItem = DevExpress.Reporting.Designer.Data.ObjectItem;
    import ParameterLayoutItem = DevExpress.Reporting.Designer.Data.ParameterLayoutItem;
    import ParameterPanelLayoutItem = DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem;
    import Parameter = DevExpress.Reporting.Designer.Data.Parameter;
    import ILocalizationInfo = DevExpress.Analytics.Internal.ILocalizationInfo;
    import ITreeListOptions = DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
    import ParametersLayoutItemsProvider = DevExpress.Reporting.Designer.Internal.ParametersLayoutItemsProvider;
    import ParametersLayoutTreeListController = DevExpress.Reporting.Designer.Internal.ParametersLayoutTreeListController;
    import ParametersDialogBase = DevExpress.Reporting.Designer.Tools.ParametersDialogBase;
    import SurfaceSelection = DevExpress.Analytics.Internal.SurfaceSelection;
    import XRSubreportSurface = DevExpress.Reporting.Designer.Controls.XRSubreportSurface;
    import IReportDesignerCustomizationHandler = DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler;
    import IDesignerContextOptionsInitOptions = DevExpress.Reporting.Designer.IDesignerContextOptionsInitOptions;
    import NavigateTab = DevExpress.Reporting.Designer.Tools.NavigateTab;
    import NavigateByReports = DevExpress.Reporting.Designer.Tools.NavigateByReports;
    import INavigateTab = DevExpress.Reporting.Designer.Tools.INavigateTab;
    import IDialogModel = DevExpress.Reporting.Designer.Tools.IDialogModel;
    import ReportDialogBase = DevExpress.Reporting.Designer.Tools.ReportDialogBase;
    import IKeyValuePair = DevExpress.Reporting.IKeyValuePair;
    import SaveAsReportDialog = DevExpress.Reporting.Designer.Tools.SaveAsReportDialog;
    import IDisposable = DevExpress.Analytics.Utils.IDisposable;
    import ReportDesignerContext = DevExpress.Reporting.Designer.ReportDesignerContext;
    import Point = DevExpress.Analytics.Elements.Point;
    import ReportSurface = DevExpress.Reporting.Designer.Controls.ReportSurface;
    import SmartTagFactory = DevExpress.Reporting.Designer.Utils.SmartTagFactory;
    import XRReportElementViewModel = DevExpress.Reporting.Designer.Controls.XRReportElementViewModel;
    import ReportExpressionEditorWrapper = DevExpress.Reporting.Designer.Widgets.ReportExpressionEditorWrapper;
    import ISmartTag = DevExpress.Reporting.Designer.Tools.ISmartTag;
    import Editor = DevExpress.Analytics.Widgets.Editor;
    import getParentContainer = DevExpress.Analytics.Internal.getParentContainer;
    import ControlType = DevExpress.Reporting.Designer.Internal.ControlType;
    class SettingsAreaModel {
        private _parameter;
        getInfo(): any[];
        constructor(_parameter: DevExpress.Reporting.Designer.Data.Parameter);
        isPropertyVisible(propertyName: string): boolean;
        valueSourceSettingsType: ko.Observable<string>;
        valueSourceSettings: ko.Observable<DevExpress.Reporting.Designer.Data.ObjectItem> | ko.Computed<DevExpress.Reporting.Designer.Data.ObjectItem>;
    }
    export class ParametersDialogBase extends Disposable {
        protected _currentReport: DevExpress.Reporting.Designer.Controls.ReportViewModel;
        dispose(): void;
        protected onSubmit(): void;
        protected get undoEngine(): DevExpress.Analytics.Utils.UndoEngine;
        protected _getParameterFromLayoutItem(layoutItem: DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem): DevExpress.Reporting.Designer.Data.Parameter;
        protected _createParameter(parameters?: DevExpress.Reporting.Designer.Data.Parameter[]): DevExpress.Reporting.Designer.Data.ParameterLayoutItem;
        protected _undoEngine: DevExpress.Analytics.Utils.UndoEngine;
        protected _isSubmited: boolean;
        private _createButton;
        constructor(_currentReport: DevExpress.Reporting.Designer.Controls.ReportViewModel);
        protected selectItem(layoutItem: DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem): void;
        show(parameter?: DevExpress.Reporting.Designer.Data.Parameter): void;
        _onStart(layoutItem: DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem): void;
        close(): void;
        submit(): void;
        buttons: {
            toolbar: string;
            location: string;
            widget: string;
            options: {
                text: string;
                type: string;
                stylingMode: string;
                onClick: () => void;
            };
        }[];
        _savedLayoutItems: any[];
        _propertiesGrid: DevExpress.Analytics.Widgets.ObjectProperties;
        _settingsGrid: DevExpress.Analytics.Widgets.ObjectProperties;
        _editableObject: ko.Observable<DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem | DevExpress.Reporting.Designer.Data.Parameter>;
        _selectedItem: ko.Observable<DevExpress.Reporting.Designer.Data.ParameterPanelLayoutItem>;
        _selectedParameter: ko.Observable<DevExpress.Reporting.Designer.Data.Parameter>;
        _selectedParameterSettings: ko.Observable<SettingsAreaModel>;
        visible: ko.Observable<boolean>;
        contentTemplate: string;
        container: (element: HTMLElement) => any;
    }
    export class AddParameterDialog extends ParametersDialogBase {
        onSubmit(): void;
        _onStart(parameter?: DevExpress.Reporting.Designer.Data.ParameterLayoutItem): void;
        popupCss: string;
        title: any;
        width: string | number;
        height: number;
        contentTemplate: string;
    }
    export {};
    export class EditParametersDialog extends ParametersDialogBase {
        buttonMap: {
            [keyname: string]: DevExpress.Analytics.Internal.ILocalizationInfo;
        };
        dispose(): void;
        constructor(report: DevExpress.Reporting.Designer.Controls.ReportViewModel);
        getDisplayTextButton(key: string): string;
        up(): void;
        down(): void;
        addGroup(): void;
        addSeparator(): void;
        addParameter(): void;
        isDisabledButton(buttonName: string): boolean;
        onSubmit(): void;
        width: string;
        height: number;
        popupCss: string;
        title: any;
        contentEmptyAreaPlaceHolder: any;
        contentNoPropertiesPlaceHolder: any;
        contentTemplate: string;
        hasNoEditableProperties: ko.PureComputed<boolean>;
        contentVisible: ko.Computed<boolean>;
        selectedPath: ko.Observable<string>;
        itemsProvider: DevExpress.Reporting.Designer.Internal.ParametersLayoutItemsProvider;
        treeListController: DevExpress.Reporting.Designer.Internal.ParametersLayoutTreeListController;
        fieldListModel: DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
    }
    /// <reference types="jquery" />
    export interface INavigationOptions {
        report?: DevExpress.Reporting.Designer.Controls.ReportViewModel;
        reportUrl?: ko.Observable<string> | ko.Computed<string>;
        callbacks?: DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler;
        allowMDI?: boolean;
        selection: DevExpress.Analytics.Internal.SurfaceSelection;
        initOptions: DevExpress.Reporting.Designer.IDesignerContextOptionsInitOptions;
        knownEnums?: any;
    }
    export class NavigateByReports extends Disposable {
        private _designerReportModel;
        private _isReportLoading;
        private _removeTab;
        dispose(): void;
        private _closeTab;
        private _closeAll;
        private _getTabByControl;
        private _addTab;
        changeContext(report: DevExpress.Reporting.Designer.Controls.ReportViewModel, reportUrl?: ko.Observable<string> | ko.Computed<string>): void;
        constructor(options: INavigationOptions);
        init(isLoading: ko.Observable<boolean>): void;
        removeTab(tab: any, force?: boolean): JQuery.Promise<any, any, any>;
        closeAll(): JQuery.Promise<any, any, any>;
        save: (tab: DevExpress.Reporting.Designer.Tools.NavigateTab) => any;
        switch(tab: DevExpress.Reporting.Designer.Tools.NavigateTab): void;
        _createNewTab(report: DevExpress.Reporting.Designer.Controls.ReportViewModel, url?: ko.Observable<string> | ko.Computed<string>, newReportName?: string): void;
        goToSubreport(subreportSurface: DevExpress.Reporting.Designer.Controls.XRSubreportSurface): void;
        addTab(report: DevExpress.Reporting.Designer.Controls.ReportViewModel, url?: ko.Observable<string> | ko.Computed<string>, onCancel?: () => any, newReportName?: string): JQuery.Promise<any, any, any>;
        checkHeight(): void;
        currentTab: ko.Observable<DevExpress.Reporting.Designer.Tools.NavigateTab> | ko.Computed<DevExpress.Reporting.Designer.Tools.NavigateTab>;
        height: ko.Observable<number> | ko.Computed<number>;
        tabs: ko.ObservableArray<DevExpress.Reporting.Designer.Tools.NavigateTab>;
        allowMDI: boolean;
        knownEnums: any;
        _callbacks: DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler;
        _selection: DevExpress.Analytics.Internal.SurfaceSelection;
        _initializeOptions: DevExpress.Reporting.Designer.IDesignerContextOptionsInitOptions;
        _selectedIndex: ko.Observable<number> | ko.Computed<number>;
        selectedIndex: ko.Computed<number>;
    }
    export class OpenReportDialogModelBase implements IDialogModel {
        urls: any;
        constructor(popup: OpenReportDialog, urls: any);
        onShow(tab: DevExpress.Reporting.Designer.Tools.INavigateTab): void;
        getUrl(): string;
        setUrl(url: any): void;
        onDblClick: (url: string) => void;
        searchValue: ko.Observable<string>;
        searchPlaceholder: () => any;
        popupButtons: any[];
        reportUrl: ko.Observable<string>;
        noDataText: any;
    }
    export class OpenReportDialog extends ReportDialogBase {
        title: string;
        open(url: string): void;
        constructor(subreports: any, navigateByReports: DevExpress.Reporting.Designer.Tools.NavigateByReports, callbacks: DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler);
        navigateByReports: DevExpress.Reporting.Designer.Tools.NavigateByReports;
        onOpening: (e: any) => void;
        onOpened: (e: any) => void;
    }
    export class SaveAsReportDialogModelBase implements IDialogModel {
        onShow(tab: DevExpress.Reporting.Designer.Tools.INavigateTab): void;
        constructor(popup: DevExpress.Reporting.Designer.Tools.SaveAsReportDialog, urls: ko.ObservableArray<DevExpress.Reporting.IKeyValuePair<string>>);
        getUrl(): string;
        setUrl(url: any): void;
        onDblClick: (url: string) => void;
        popupButtons: any[];
        reportUrl: ko.Observable<string> | ko.Computed<string>;
        noDataText: any;
        reportNamePlaceholder: () => any;
        urls: ko.ObservableArray<DevExpress.Reporting.IKeyValuePair<string>>;
        reportName: ko.Observable<string> | ko.Computed<string>;
    }
    export class SaveAsReportDialog extends ReportDialogBase {
        show(tab: DevExpress.Reporting.Designer.Tools.INavigateTab): void;
        constructor(subreports: ko.ObservableArray<DevExpress.Reporting.IKeyValuePair<string>>, callbacks: DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler);
        save(url: any): void;
        onSaving: (e: any) => void;
        onSaved: (e: any) => void;
        closeAfterSave: ko.Observable<boolean>;
        title: string;
    }
    export class SaveReportDialogModelBase implements IDialogModel {
        onShow(tab: DevExpress.Reporting.Designer.Tools.INavigateTab): void;
        getUrl(): string;
        setUrl(url: any): void;
        constructor(popup: SaveReportDialog);
        popupButtons: any[];
        reportUrl: ko.Observable<string>;
        saveText: ko.Observable<string>;
    }
    export class SaveReportDialog extends ReportDialogBase {
        constructor(saveReportDialog: DevExpress.Reporting.Designer.Tools.SaveAsReportDialog, callbacks: DevExpress.Reporting.Designer.Utils.IReportDesignerCustomizationHandler);
        save(url: any): void;
        notSave(): void;
        cancel(): void;
        saveReportDialog: DevExpress.Reporting.Designer.Tools.SaveAsReportDialog;
        onSaving: (e: any) => void;
        onSaved: (e: any) => void;
        title: string;
    }
    /// <reference types="jquery" />
    export interface INavigateTab extends IDisposable {
        displayName: ko.Computed<string>;
        isDirty: ko.Observable<boolean> | ko.Computed<boolean>;
        close?: JQueryDeferred<any>;
        icon?: string;
        context: ko.Observable<DevExpress.Reporting.Designer.ReportDesignerContext> | ko.Computed<DevExpress.Reporting.Designer.ReportDesignerContext>;
        undoEngine: DevExpress.Analytics.Utils.UndoEngine;
        report: ko.Computed<DevExpress.Reporting.Designer.Controls.ReportViewModel>;
        url: ko.Computed<string>;
    }
    export interface INavigateTabCallbacks {
        createContext: (report: DevExpress.Reporting.Designer.Controls.ReportViewModel, url: string | ko.Observable<string> | ko.Computed<string>) => DevExpress.Reporting.Designer.ReportDesignerContext;
        afterInititalize: (tab: DevExpress.Reporting.Designer.Tools.NavigateTab) => void;
    }
    export interface INavigateTabOptions {
        report: DevExpress.Reporting.Designer.Controls.ReportViewModel;
        url: string | ko.Observable<string> | ko.Computed<string>;
        isReportLoading: ko.Observable<boolean> | ko.Computed<boolean>;
        callbacks: INavigateTabCallbacks;
    }
    export class NavigateTab extends Disposable implements INavigateTab {
        dispose(): void;
        private _generateDisplayName;
        private _createReport;
        private _createReportUrl;
        changeContext(report: DevExpress.Reporting.Designer.Controls.ReportViewModel, reportUrl: string): void;
        resetIsModified(): void;
        refresh(resetState: boolean): void;
        constructor(options: INavigateTabOptions);
        private _callbacks;
        displayName: ko.Computed<string>;
        isDirty: ko.Observable<boolean> | ko.Computed<boolean>;
        isModified: ko.Observable<boolean> | ko.Computed<boolean>;
        close: JQueryDeferred<any>;
        icon: string;
        undoEngine: DevExpress.Analytics.Utils.UndoEngine;
        _isReportLoading: ko.Observable<boolean> | ko.Computed<boolean>;
        report: ko.Computed<DevExpress.Reporting.Designer.Controls.ReportViewModel>;
        url: ko.Computed<string>;
        context: ko.Observable<DevExpress.Reporting.Designer.ReportDesignerContext> | ko.Computed<DevExpress.Reporting.Designer.ReportDesignerContext>;
    }
    export interface IDialogModel {
        getUrl: () => string;
        setUrl: (url: string) => void;
        onShow: (tab: DevExpress.Reporting.Designer.Tools.INavigateTab) => void;
        popupButtons: any[];
    }
    export class ReportDialogBase extends Disposable {
        private _visible;
        dispose(): void;
        show(tab: DevExpress.Reporting.Designer.Tools.INavigateTab): void;
        customize(template: string, model: DevExpress.Reporting.Designer.Tools.IDialogModel): void;
        constructor();
        width: ko.Observable<any>;
        height: ko.Observable<any>;
        template: ko.Observable<string>;
        buttons: any[];
        model: ko.Observable<DevExpress.Reporting.Designer.Tools.IDialogModel>;
        tab: ko.Observable<DevExpress.Reporting.Designer.Tools.INavigateTab>;
        disabled: ko.Observable<boolean>;
        visible: ko.Computed<boolean>;
        cancel(): void;
        container: (element: HTMLElement) => any;
    }
    export interface ISmartTag extends IDisposable {
        onClick: () => void;
        imageTemplateName: string;
        templateName?: string;
        visible: ko.Observable<boolean>;
    }
    export class SmartTagModel extends Disposable {
        constructor(selection: DevExpress.Analytics.Internal.SurfaceSelection, reportSurface: ko.Observable<DevExpress.Reporting.Designer.Controls.ReportSurface>, offset: ko.Observable<number> | ko.Computed<number>, smartTagFactory: DevExpress.Reporting.Designer.Utils.SmartTagFactory, rtl: boolean);
        private _getMargin;
        position: DevExpress.Analytics.Elements.Point;
        smartTags: ko.ObservableArray<DevExpress.Reporting.Designer.Tools.ISmartTag>;
        visible: ko.Observable<boolean>;
        width: number;
    }
    export class ExpressionSmartTag extends Disposable implements ISmartTag {
        reportElement: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel;
        private _expressionEditor;
        constructor(reportElement: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel, _expressionEditor: ko.Observable<DevExpress.Reporting.Designer.Widgets.ReportExpressionEditorWrapper>);
        templateName?: string;
        disabled: ko.Observable<boolean>;
        onClick(): void;
        dispose(): void;
        imageTemplateName: string;
        visible: ko.Observable<boolean>;
        subscription: ko.Subscription;
    }
    export class TasksSmartTag extends Disposable implements ISmartTag {
        reportElement: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel;
        popularProperties: DevExpress.Analytics.Widgets.ObjectProperties;
        private _booleanEditors;
        private _nonBooleanEditors;
        constructor(reportElement: DevExpress.Reporting.Designer.Controls.XRReportElementViewModel, popularProperties: DevExpress.Analytics.Widgets.ObjectProperties);
        collectEditorsFromComplex(complexEditor: any, propertyNames: string[], editorsFound?: DevExpress.Analytics.Widgets.Editor[], parentEditorName?: string): DevExpress.Analytics.Widgets.Editor[];
        getPopularPropertyNames(controlType: DevExpress.Reporting.Designer.Internal.ControlType): any;
        onClick(): void;
        getEditors(booleanEditors: boolean): DevExpress.Analytics.Widgets.Editor[];
        visible: ko.Observable<boolean>;
        popoverVisible: ko.Observable<boolean>;
        imageTemplateName: string;
        templateName: string;
        editorsAvailableSubscriptions: (() => void)[];
        getPopupContainer: typeof DevExpress.Analytics.Internal.getParentContainer;
        separatorVisible: ko.Observable<boolean>;
    }
}
declare module DevExpress.Reporting.Designer.Wizard {
    import _DataSourceWizardOptionsBase = DevExpress.Analytics.Wizard._DataSourceWizardOptionsBase;
    import IReportWizardSettings = DevExpress.Reporting.Designer.Utils.IReportWizardSettings;
    import IReportWizardTypeItem = DevExpress.Reporting.Designer.Utils.IReportWizardTypeItem;
    import SearchBoxVisibilityMode = DevExpress.Reporting.Designer.Utils.SearchBoxVisibilityMode;
    import IReportWizardCallbacks = DevExpress.Reporting.Designer.Internal.IReportWizardCallbacks;
    import GraphicsUnit = DevExpress.Reporting.Designer.Wizard.GraphicsUnit;
    import IDataMemberInfo = DevExpress.Analytics.Utils.IDataMemberInfo;
    import IDataSourceWizardState = DevExpress.Analytics.Wizard.IDataSourceWizardState;
    import FieldTreeNode = DevExpress.Analytics.Wizard.Internal.FieldTreeNode;
    import ILabelDetails = DevExpress.Reporting.Designer.Wizard.ILabelDetails;
    import ReportLayout = DevExpress.Reporting.Designer.Wizard.ReportLayout;
    import ReportStyle = DevExpress.Reporting.Designer.Wizard.ReportStyle;
    import ICrossTabDataFieldInfo = DevExpress.Reporting.Designer.Internal.ICrossTabDataFieldInfo;
    import ICrossTabGroupFieldInfo = DevExpress.Reporting.Designer.Internal.ICrossTabGroupFieldInfo;
    import IMasterDetailQueryInfo = DevExpress.Reporting.Designer.Internal.IMasterDetailQueryInfo;
    import ISummaryOptions = DevExpress.Reporting.Designer.Internal.ISummaryOptions;
    import ChooseAvailableItemPage = DevExpress.Analytics.Wizard.ChooseAvailableItemPage;
    import PageFactory = DevExpress.Analytics.Wizard.PageFactory;
    import _ReportWizardOptions = DevExpress.Reporting.Designer.Wizard._ReportWizardOptions;
    import AnalyticChooseDataSourceTypePage = DevExpress.Analytics.Wizard.AnalyticChooseDataSourceTypePage;
    import FullscreenWizardPageFactory = DevExpress.Analytics.Wizard.FullscreenWizardPageFactory;
    import IReportWizardState = DevExpress.Reporting.Designer.Wizard.IReportWizardState;
    import ITreeListOptions = DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
    import WizardPageBase = DevExpress.Analytics.Wizard.WizardPageBase;
    import IReportWizardFieldsCallback = DevExpress.Reporting.Designer.Internal.IReportWizardFieldsCallback;
    import IHoverInfo = DevExpress.Analytics.Internal.IHoverInfo;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import FieldInfo = DevExpress.Reporting.Designer.Internal.FieldInfo;
    import SelectDataMembersPage = DevExpress.Reporting.Designer.Wizard.SelectDataMembersPage;
    import IMasterDetailReportTree = DevExpress.Reporting.Designer.Internal.IMasterDetailReportTree;
    import ListViewModel = DevExpress.Reporting.Designer.Internal.ListViewModel;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import SummaryInfo = DevExpress.Reporting.Designer.Internal.SummaryInfo;
    import SummaryOptionsWrapper = DevExpress.Reporting.Designer.Internal.SummaryOptionsWrapper;
    import IItemsProvider = DevExpress.Analytics.Utils.IItemsProvider;
    import ISummaryDataMemberInfo = DevExpress.Reporting.Designer.Internal.ISummaryDataMemberInfo;
    import SummaryInfoFieldlist = DevExpress.Reporting.Designer.Internal.SummaryInfoFieldlist;
    import FullscreenWizardPage = DevExpress.Analytics.Wizard.FullscreenWizardPage;
    import AnalyticSpecifyFederationDataSourceSettingsPage = DevExpress.Analytics.Wizard.AnalyticSpecifyFederationDataSourceSettingsPage;
    import JsonDataSource = DevExpress.Analytics.Data.JsonDataSource;
    import ChooseAnalyticJsonSchemaPage = DevExpress.Analytics.Wizard.ChooseAnalyticJsonSchemaPage;
    import IDataSourceInfo = DevExpress.Reporting.Designer.Internal.IDataSourceInfo;
    import AnalyticSpecifyJsonDataSourceSettingsPage = DevExpress.Analytics.Wizard.AnalyticSpecifyJsonDataSourceSettingsPage;
    import ILabelProduct = DevExpress.Reporting.Designer.Wizard.ILabelProduct;
    import IPaperKind = DevExpress.Reporting.Designer.Wizard.IPaperKind;
    import AnalyticSpecifyObjectDataSourceSettingsPage = DevExpress.Analytics.Wizard.AnalyticSpecifyObjectDataSourceSettingsPage;
    import ColorScheme = DevExpress.Reporting.Designer.Wizard.ColorScheme;
    import CustomColorScheme = DevExpress.Reporting.Designer.Wizard.CustomColorScheme;
    import IColorSchemeState = DevExpress.Reporting.Designer.Wizard.IColorSchemeState;
    import IPageSetup = DevExpress.Reporting.Designer.Wizard.IPageSetup;
    import ChooseReportColorSchemePage = DevExpress.Reporting.Designer.Wizard.ChooseReportColorSchemePage;
    import ConfigureReportPageSettingsPage = DevExpress.Reporting.Designer.Wizard.ConfigureReportPageSettingsPage;
    import PreviewPageHelper = DevExpress.Reporting.Designer.Wizard.PreviewPageHelper;
    import SpecifyAnalyticSqlDataSourceSettingsPage = DevExpress.Analytics.Wizard.SpecifyAnalyticSqlDataSourceSettingsPage;
    import ReportViewModel = DevExpress.Reporting.Designer.Controls.ReportViewModel;
    import IDataSourceInfo = DevExpress.Analytics.Internal.IDataSourceInfo;
    import FullscreenWizard = DevExpress.Analytics.Wizard.FullscreenWizard;
    import PageIterator = DevExpress.Analytics.Wizard.PageIterator;
    import StateManager = DevExpress.Analytics.Wizard.StateManager;
    import _WrappedWizardPage = DevExpress.Analytics.Wizard._WrappedWizardPage;
    import MasterDetailRequestModel = DevExpress.Reporting.Designer.Internal.MasterDetailRequestModel;
    import SqlDataSource = DevExpress.Analytics.Data.SqlDataSource;
    import ConfigureAnalyticMasterDetailRelationshipsPage = DevExpress.Analytics.Wizard.ConfigureAnalyticMasterDetailRelationshipsPage;
    import AnalyticMultiQueryConfigurePage = DevExpress.Analytics.Wizard.AnalyticMultiQueryConfigurePage;
    import AnalyticMultiQueryConfigureParametersPage = DevExpress.Analytics.Wizard.AnalyticMultiQueryConfigureParametersPage;
    import IReportTitleState = DevExpress.Reporting.Designer.Wizard.IReportTitleState;
    import MultiQueryDataSourceWizardPageIterator = DevExpress.Analytics.Wizard.MultiQueryDataSourceWizardPageIterator;
    import PopupWizard = DevExpress.Analytics.Wizard.PopupWizard;
    import DataSourceWizard = DevExpress.Analytics.Wizard.DataSourceWizard;
    import FullscreenDataSourceWizard = DevExpress.Analytics.Wizard.FullscreenDataSourceWizard;
    import MultiQueryDataSourceWizard = DevExpress.Analytics.Wizard.MultiQueryDataSourceWizard;
    import FullscreenReportWizard = DevExpress.Reporting.Designer.Wizard.FullscreenReportWizard;
    import ReportWizard = DevExpress.Reporting.Designer.Wizard.ReportWizard;
    import ILegacyReportWizardState = DevExpress.Reporting.Designer.Wizard.ILegacyReportWizardState;
    import LayoutTypeItem = DevExpress.Reporting.Designer.Wizard.LayoutTypeItem;
    import PageOrientationItem = DevExpress.Reporting.Designer.Wizard.PageOrientationItem;
    import ReportStyleItem = DevExpress.Reporting.Designer.Wizard.ReportStyleItem;
    import FieldListProvider = DevExpress.Analytics.Internal.FieldListProvider;
    import DataMemberTreeListController = DevExpress.Analytics.Widgets.Internal.DataMemberTreeListController;
    import LegacyReportRequestModel = DevExpress.Reporting.Designer.Internal.LegacyReportRequestModel;
    export class _ReportWizardOptions extends _DataSourceWizardOptionsBase<DevExpress.Reporting.Designer.Internal.IReportWizardCallbacks> {
        reportTemplates: DevExpress.Reporting.Designer.Utils.IReportWizardTypeItem[];
        searchBoxVisibilityMode: DevExpress.Reporting.Designer.Utils.SearchBoxVisibilityMode;
        callbacks: DevExpress.Reporting.Designer.Internal.IReportWizardCallbacks;
        wizardSettings: DevExpress.Reporting.Designer.Utils.IReportWizardSettings;
        hideDataMemberSubItems: boolean;
    }
    export interface ILabelProduct {
        id: number;
        name: string;
    }
    export interface IPaperKind {
        id: number;
        enumId: number;
        name: string;
        width: number;
        height: number;
        isRollPaper: boolean;
        unit: DevExpress.Reporting.Designer.Wizard.GraphicsUnit;
    }
    export interface ILabelDetails {
        id: number;
        productId: number;
        paperKindId: number;
        name: string;
        width: number;
        height: number;
        hPitch: number;
        vPitch: number;
        topMargin: number;
        leftMargin: number;
        rightMargin: number;
        bottomMargin: number;
        unit: DevExpress.Reporting.Designer.Wizard.GraphicsUnit;
    }
    export enum ReportLayout {
        stepped = 0,
        block = 1,
        outline1 = 2,
        outline2 = 3,
        alignLeft1 = 4,
        alignLeft2 = 5,
        columnar = 6,
        tabular = 7,
        justified = 8
    }
    export class LayoutTypeItem {
        layoutType: DevExpress.Reporting.Designer.Wizard.ReportLayout;
        margin: number;
        constructor(textValue: string, textID: string, layoutType: DevExpress.Reporting.Designer.Wizard.ReportLayout, margin: number);
        text: string;
        get imageClassName(): string;
    }
    export enum PageOrientation {
        Portrait = 0,
        Landscape = 1
    }
    export class PageOrientationItem {
        orientation: PageOrientation;
        constructor(textValue: string, textID: string, orientation: PageOrientation);
        text: string;
    }
    export enum ReportStyle {
        Bold = 0,
        Casual = 1,
        Compact = 2,
        Corporate = 3,
        Formal = 4
    }
    export class ReportStyleItem {
        reportStyle: DevExpress.Reporting.Designer.Wizard.ReportStyle;
        constructor(textDefault: string, textID: string, reportStyle: DevExpress.Reporting.Designer.Wizard.ReportStyle);
        text: string;
        get className(): string;
    }
    export enum ReportType {
        Empty = 3,
        Standard = 0,
        Vertical = 1,
        Label = 2,
        Template = 5,
        CrossTab = 6
    }
    export enum PivotSummaryType {
        Count = 0,
        Sum = 1,
        Min = 2,
        Max = 3,
        Average = 4,
        StdDev = 5,
        StdDevp = 6,
        Var = 7,
        Varp = 8,
        Custom = 9,
        CountDistinct = 10,
        Median = 11,
        Mode = 12
    }
    export enum GraphicsUnit {
        World = 0,
        Display = 1,
        Pixel = 2,
        Point = 3,
        Inch = 4,
        Document = 5,
        Millimeter = 6
    }
    export interface IPageSetup {
        paperKind: string;
        unit: DevExpress.Reporting.Designer.Wizard.GraphicsUnit;
        width: number;
        height: number;
        landscape?: boolean;
        marginLeft: number;
        marginRight: number;
        marginTop: number;
        marginBottom: number;
    }
    export interface ILegacyReportWizardState extends IReportWizardState {
        fields?: Array<DevExpress.Analytics.Utils.IDataMemberInfo>;
        groups?: string[][];
        summaryOptionsColumns?: Array<DevExpress.Analytics.Utils.IDataMemberInfo>;
        summaryOptions?: Array<DevExpress.Reporting.Designer.Internal.ISummaryOptions>;
        ignoreNullValuesForSummary?: boolean;
        dataSource?: string;
        newDataSource?: string;
        fitFieldsToPage?: boolean;
        layout?: DevExpress.Reporting.Designer.Wizard.ReportLayout;
        portrait?: boolean;
        style?: DevExpress.Reporting.Designer.Wizard.ReportStyle;
    }
    export interface IColorSchemeState {
        baseColor?: string;
        name?: string;
    }
    export interface IReportTitleState {
        reportTitle?: string;
    }
    export interface IReportWizardState extends IDataSourceWizardState {
        pageSetup: DevExpress.Reporting.Designer.Wizard.IPageSetup;
        colorScheme: DevExpress.Reporting.Designer.Wizard.IColorSchemeState;
        reportType?: ReportType;
        reportTemplateID?: string;
        labelDetails?: DevExpress.Reporting.Designer.Wizard.ILabelDetails;
        reportTitle?: string;
        dataMember?: string;
        masterDetailInfoCollection?: DevExpress.Reporting.Designer.Internal.IMasterDetailQueryInfo[];
        masterDetailGroups?: any[];
        masterDetailSummaryOptionsColumns?: any;
        ignoreNullValuesForSummary?: boolean;
        dataSource?: string;
        newDataSource?: string;
        masterDetailSummariesInfo?: {
            [key: string]: {
                column: DevExpress.Analytics.Utils.IDataMemberInfo;
                summaryFunctions: number[];
            }[];
        };
        dataMemberPath?: string;
        dataMemberInfo?: DevExpress.Analytics.Utils.IDataMemberInfo;
        crossTabFields?: DevExpress.Analytics.Wizard.Internal.FieldTreeNode[];
        crossTabColumnsFieldInfo?: DevExpress.Reporting.Designer.Internal.ICrossTabGroupFieldInfo[];
        crossTabRowsFieldInfo?: DevExpress.Reporting.Designer.Internal.ICrossTabGroupFieldInfo[];
        crossTabDataFieldInfo?: DevExpress.Reporting.Designer.Internal.ICrossTabDataFieldInfo[];
        customData?: string;
    }
    export const defaultPageSetupState: DevExpress.Reporting.Designer.Wizard.IPageSetup;
    export const defaultReportWizardState: DevExpress.Reporting.Designer.Wizard.IReportWizardState;
    export const LegacyReportWizardPageId: {
        ChooseDataMemberPage: string;
        SelectColumnsPage: string;
        AddGroupingLevelPage: string;
        ChooseSummaryOptionsPage: string;
        ChooseReportLayoutPage: string;
        ChooseReportStylePage: string;
    };
    export const ReportWizardPageId: {
        SelectReportTypePage: string;
        ChooseAvailableDataSourcePage: string;
        SelectLabelTypePage: string;
        CustomizeLabelPage: string;
        SelectDataMembersPage: string;
        AddGroupingLevelPage: string;
        ChooseSummaryOptionsPage: string;
        ConfigureReportPageSettingsPage: string;
        ChooseReportColorSchemePage: string;
        SetReportTitlePage: string;
    };
    export const FullscreenReportWizardPageId: {
        SelectReportTypePage: string;
        SelectDataSourcePage: string;
        SpecifySqlDataSourceSettingsPage: string;
        SpecifyJsonDataSourceSettingsPage: string;
        DefineReportLayoutPage: string;
        DefineCrossTabPage: string;
        SpecifyPageSettingsPage: string;
        SpecifyLabelSettingsPage: string;
    };
    export const FullscreenReportWizardSectionId: {
        ChooseAvailableDataSourcePage: string;
        SelectLabelTypePage: string;
        CustomizeLabelPage: string;
        SelectDataMembersPage_Members: string;
        SelectDataMembersPage_Fields: string;
        SelectSingleDataMemberPage: string;
        AddGroupFieldsPage: string;
        AddSummaryFieldsPage: string;
        ConfigurePageSettingsPage: string;
        SpecifyReportTitlePage: string;
        ChooseDataSourceTypePage: string;
        ChooseJsonSchemaPage: string;
        SpecifyJsonConnectionPage: string;
        ConfigureMasterDetailRelationshipsPage: string;
        ConfigureQueryParametersPage: string;
        ChooseSqlConnectionPage: string;
        ConfigureQueryPage: string;
        ChooseJsonSourcePage: string;
        ConfigureCrossTabColumnsPage: string;
        ConfigureCrossTabRowsPage: string;
        ConfigureCrossTabDataPage: string;
    };
    /// <reference types="jquery" />
    export function _convertToStateDataSource(dataSource: any): string;
    export function _restoreDataSourceFromState(serializedDataSource: any): any;
    export class ChooseAvailableDataSourcePage extends ChooseAvailableItemPage {
        commit(): JQuery.Promise<any, any, any>;
        _getSelectedItem(state: any): any;
        get createNewOperationText(): any;
    }
    export function _registerChooseAvailableDataSourcePage(factory: DevExpress.Analytics.Wizard.PageFactory, reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    /// <reference types="jquery" />
    interface ISelectReportTypePageOptions {
        canCreateDatabound: boolean | (() => boolean);
        showVertical?: boolean;
        reportTemplates?: DevExpress.Reporting.Designer.Utils.IReportWizardTypeItem[];
        searchBoxVisibilityMode?: DevExpress.Reporting.Designer.Utils.SearchBoxVisibilityMode;
    }
    export class SelectReportTypePage extends AnalyticChooseDataSourceTypePage {
        private _options;
        static defaultImageID: string;
        constructor(_options: ISelectReportTypePageOptions);
        getListOptions(): object;
        itemsFilter(item: DevExpress.Reporting.Designer.Utils.IReportWizardTypeItem): boolean;
        canNext(): boolean;
        canFinish(): boolean;
        commit(): JQuery.Promise<any>;
        initialize(state: DevExpress.Reporting.Designer.Wizard.IReportWizardState): JQuery.Promise<any>;
        _IsSelected: (item: DevExpress.Reporting.Designer.Utils.IReportWizardTypeItem) => boolean;
        typeItems: DevExpress.Reporting.Designer.Utils.IReportWizardTypeItem[];
        selectedItem: ko.Observable<DevExpress.Reporting.Designer.Utils.IReportWizardTypeItem>;
        _extendCssClass: (rightPath: string) => string;
        _textToSearch: ko.Observable<string>;
    }
    export class ChooseDataSourceTypePage extends AnalyticChooseDataSourceTypePage {
        constructor(dataSourceWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions);
    }
    export function _registerSelectReportTypePage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, options: ISelectReportTypePageOptions): void;
    export function _registerChooseDataSourceTypePage(factory: DevExpress.Analytics.Wizard.PageFactory, dataSourceWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    export {};
    /// <reference types="jquery" />
    export class SelectDataMembersPage extends WizardPageBase {
        private _fieldListCallBack;
        protected _hideDataMemberSubItems: boolean;
        protected _rootItems: ko.ObservableArray<DevExpress.Analytics.Utils.IDataMemberInfo>;
        private _dataMemberSelectedPath;
        private _fieldSelectedPath;
        private _dataMemberItemsProvider;
        private _fieldMemberItemsProvider;
        private _availableFieldsController;
        private _dataSource;
        private _checkedDataMembers;
        private _checkedFields;
        private initialFullDataMember;
        protected _wrapFieldListCallback(itemsCallback: DevExpress.Reporting.Designer.Internal.IReportWizardFieldsCallback): (IPathRequest: any) => JQueryPromise<DevExpress.Analytics.Utils.IDataMemberInfo[]>;
        protected get dataSourcePath(): string;
        private _showDataSource;
        private getDataMemberSelectedPath;
        private _beginInternal;
        private _afterCheckToggled;
        private _processFields;
        private _processNode;
        private _afterCheckToggledFields;
        private _createMasterDetailTreeNode;
        private _createMasterDetailFirstTabTreeNode;
        private _createMasterDetailLeafTreeNode;
        canNext(): boolean;
        canFinish(): boolean;
        constructor(_fieldListCallBack: DevExpress.Reporting.Designer.Internal.IReportWizardFieldsCallback, _hideDataMemberSubItems?: boolean);
        selectDataMember(dataMemberPath: string): void;
        selectAllDataMembers(): void;
        selectDataField(dataFieldPath: string): void;
        selectDataFields(dataMemberPath: string): void;
        selectAllDataFields(): void;
        _dataMemberFieldListModel: DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
        _fieldMemberFieldListModel: DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
        initialize(state: DevExpress.Reporting.Designer.Wizard.IReportWizardState): JQueryPromise<any>;
        _haveCheckedFields(): boolean;
        commit(): JQuery.Promise<any, any, any>;
        _showFirstLevelDataMembers: ko.Observable<boolean>;
        _multiSelectMode: boolean;
        _selectDataMembersCaption: any;
        _selectDataFieldsCaption: any;
    }
    export function _registerSelectDataMembersPage(factory: DevExpress.Analytics.Wizard.PageFactory, reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions, pageId?: string): void;
    /// <reference types="jquery" />
    export class SelectCrossTabDataMember extends SelectDataMembersPage {
        private _pageRendered;
        private _firstRenderNode;
        private _dragHelperContent;
        private _itemsProvider;
        private _controller;
        private _timeout;
        private _createCrossTabLeafTreeNode;
        private _createCrossTabTreeNode;
        private _afteCheck;
        private _findFirstCheckedField;
        constructor(_fieldListCallBack: DevExpress.Reporting.Designer.Internal.IReportWizardFieldsCallback, _hideDataMemberSubItems?: boolean);
        commit(): JQuery.Promise<any, any, any>;
        _signleFieldMemberFieldListModel: DevExpress.Analytics.Widgets.Internal.ITreeListOptions;
        _title: any;
        _icon: string;
    }
    export class ConfigureCrossTabPage extends WizardPageBase {
        stateName: string;
        itemInfo: DevExpress.Analytics.Utils.ISerializationInfo;
        protected _title: string;
        constructor(stateName: string, itemInfo: DevExpress.Analytics.Utils.ISerializationInfo, title: string, localizationId: string);
        _removeInfo(item: DevExpress.Reporting.Designer.Internal.FieldInfo): void;
        addInfo(fieldName?: string): void;
        setFieldDefaultValue(defaultVal: any, fieldInfo: DevExpress.Reporting.Designer.Internal.FieldInfo): void;
        initialize(state: DevExpress.Reporting.Designer.Wizard.IReportWizardState, stateChanged?: boolean): JQuery.Promise<any, any, any>;
        canFinish(): boolean;
        changeAlways: boolean;
        underCursor: ko.Observable<DevExpress.Analytics.Internal.IHoverInfo> | ko.Computed<DevExpress.Analytics.Internal.IHoverInfo>;
        isDroppable: ko.Computed<boolean>;
        _crossTabFields: ko.ObservableArray<DevExpress.Analytics.Utils.IDataMemberInfo>;
        _template: string;
        fieldInfos: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.FieldInfo>;
        _icon: string;
        _fieldName: any;
        _valueName: any;
    }
    export function _registerConfigureCrossTabPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, pageId: string, title: string, localizationId: string, info: DevExpress.Analytics.Utils.ISerializationInfo): void;
    /// <reference types="jquery" />
    export function _fillTreeQueries(reportTree: any, queries: DevExpress.Reporting.Designer.Internal.IMasterDetailQueryInfo[], level: number, parentDisplayName?: string): any;
    export class AddGroupingLevelPage extends WizardPageBase {
        private _availableColumns;
        private _groupingLevels;
        private _setData;
        private _masterDetailGroups;
        constructor();
        canFinish(): boolean;
        _addNewGroup: () => void;
        _appendFieldsToGroup: () => void;
        _removeGroup: () => void;
        _isCreateGroupEnabled(): boolean;
        _isAppendToGroupEnabled(): boolean;
        _isRemoveGroupEnabled(): boolean;
        _moveUp: () => void;
        _moveDown: () => void;
        _isMoveUpEnabled(): boolean;
        _isMoveDownEnabled(): boolean;
        _fieldDblClick: (field: any) => void;
        _fieldClick: (e: {
            itemData: any;
        }) => void;
        _groupDblClick: (group: any) => void;
        _groupClick: (e: {
            itemData: any;
        }) => void;
        initialize(state: DevExpress.Reporting.Designer.Wizard.IReportWizardState): JQuery.Promise<any, any, any>;
        commit(): JQuery.Promise<any, any, any>;
        _currentPath: ko.Observable<string>;
        _currentFields: ko.Observable<DevExpress.Reporting.Designer.Internal.ListViewModel<string>>;
        _currentGroups: ko.Observable<DevExpress.Reporting.Designer.Internal.ListViewModel<{
            fields: ko.ObservableArray<string>;
        }>>;
        _fieldCaption: any;
        _groupCaption: any;
        _reportTree: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.IMasterDetailReportTree>;
    }
    export function _registerAddGroupingLevelPage(factory: DevExpress.Analytics.Wizard.PageFactory): void;
    /// <reference types="jquery" />
    export interface IGroupFieldDataMemberInfo extends IDataMemberInfo {
        visible?: ko.Observable<boolean>;
    }
    export class _GroupsFieldStore extends Disposable {
        private _onChange;
        dispose(): void;
        dataSource: ko.ObservableArray<IGroupFieldDataMemberInfo>;
        constructor(query: DevExpress.Reporting.Designer.Internal.IMasterDetailReportTree, _onChange: () => void);
        getSelectedFieldsFlat(): IGroupFieldDataMemberInfo[];
        getSelectedFields(): string[][];
        groups: ko.ObservableArray<_GroupField>;
        isCreateGroupEnabled(): boolean;
        path: string;
        addGroupText: () => any;
        displayName: string;
        add(): void;
        remove(index: any): void;
        moveUpDisabled(index: any): boolean;
        moveDownDisabled(index: any): boolean;
        moveup(index: any): void;
        movedown(index: any): void;
    }
    export class _GroupField extends Disposable {
        private _store;
        private _onChange;
        private _updateDataSource;
        constructor(_store: _GroupsFieldStore, _onChange: () => void);
        getOptions(options: any): any;
        value: any;
        fields: ko.ObservableArray<string>;
    }
    export class AddGroupFieldsPage extends WizardPageBase {
        dispose(): void;
        canFinish(): boolean;
        private _mergeGroups;
        initialize(state: DevExpress.Reporting.Designer.Wizard.IReportWizardState): JQuery.Promise<any, any, any>;
        commit(): JQuery.Promise<any, any, any>;
        _reportTree: DevExpress.Reporting.Designer.Internal.IMasterDetailReportTree[];
        _groupInfos: ko.ObservableArray<_GroupsFieldStore>;
    }
    export function _registerAddGroupFieldsPage(factory: DevExpress.Analytics.Wizard.PageFactory): void;
    /// <reference types="jquery" />
    export class ChooseSummaryOptionsPage extends WizardPageBase {
        private _allColumns;
        private _masterDetailColumns;
        private _currentDataMember;
        private _createSummaryInfo;
        private _createNewItemIfNeed;
        private _changeQuery;
        constructor();
        _removeSummaryInfo(info: DevExpress.Reporting.Designer.Internal.SummaryInfo): void;
        canFinish(): boolean;
        _toggleIgnoreNullValues: () => void;
        initialize(state: DevExpress.Reporting.Designer.Wizard.IReportWizardState): JQuery.Promise<any, any, any>;
        commit(): JQuery.Promise<any, any, any>;
        _summaryOptions: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.SummaryOptionsWrapper>;
        ignoreNullValues: ko.Observable<boolean>;
        _template: string;
        _reportTree: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.IMasterDetailReportTree>;
        _currentPath: ko.Observable<string>;
        _availableFields: ko.ObservableArray<any>;
        _displayedFields: {
            [key: string]: ko.ObservableArray<any>;
        };
        _summaryInfos: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.SummaryInfo>;
        _summaryInfoMapByDataMember: {
            [key: string]: DevExpress.Reporting.Designer.Internal.SummaryInfo[];
        };
        _selectFieldToSummaryCaption: any;
        _fieldsCaption: any;
        _summaryFunctionCaption: any;
        _ignoreNullValuesCaption: any;
    }
    export function _registerChooseSummaryOptionsPage(factory: DevExpress.Analytics.Wizard.PageFactory): void;
    /// <reference types="jquery" />
    export class AddSummaryFieldsPage extends WizardPageBase {
        dispose(): void;
        private _fillTreeQueries;
        private _createSummaryInfo;
        private _createNewItemIfNeed;
        private _getParentName;
        private _flat;
        _removeSummaryInfo(info: DevExpress.Reporting.Designer.Internal.SummaryInfoFieldlist): void;
        canFinish(): boolean;
        _toggleIgnoreNullValues: () => void;
        _updateSummaries(flatlist: DevExpress.Reporting.Designer.Internal.ISummaryDataMemberInfo[]): void;
        initialize(state: DevExpress.Reporting.Designer.Wizard.IReportWizardState): JQuery.Promise<any, any, any>;
        commit(): JQuery.Promise<any, any, any>;
        _fieldListProvider: ko.Observable<DevExpress.Analytics.Utils.IItemsProvider>;
        ignoreNullValues: ko.Observable<boolean>;
        _template: string;
        _reportTree: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.ISummaryDataMemberInfo>;
        _availableFieldsCount: ko.Observable<number>;
        _summaryInfos: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.SummaryInfoFieldlist>;
        _selectFieldToSummaryCaption: any;
        _fieldsCaption: any;
        _summaryFunctionCaption: any;
        _ignoreNullValuesCaption: any;
    }
    export function _registerAddSummaryFieldsPage(factory: DevExpress.Analytics.Wizard.PageFactory): void;
    export class DefineReportLayoutPage extends FullscreenWizardPage {
        private _reportWizardOptions;
        constructor(_reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions);
        registerSections(): void;
        _beforeStart(): void;
        getNextSectionId(sectionId: string): string;
    }
    export function _registerDefineReportLayoutPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    /// <reference types="jquery" />
    export class DefineCrossTabPage extends FullscreenWizardPage {
        private _reportWizardOptions;
        constructor(_reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions);
        _showPageDescription(): boolean;
        canNext(): boolean;
        _className: string;
        registerSections(): void;
        getNextSectionId(sectionId: string): string;
        commit(): JQuery.Promise<any, any, any>;
    }
    export function _registerSelectSingleDataMemberPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    export function _registerDefineCrossTabPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    export class SelectDataSourcePage extends FullscreenWizardPage {
        private reportWizardOptions;
        constructor(reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions);
        registerSections(): void;
        getNextSectionId(sectionId: any): string;
    }
    export function _registerSelectDataSourcePage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    /// <reference types="jquery" />
    export class SpecifyFederationDataSourceSettingsPage extends AnalyticSpecifyFederationDataSourceSettingsPage {
        canNext(): boolean;
        initialize(state: any): JQuery.Promise<any, any, any>;
        commit(): JQuery.Promise<any, any, any>;
    }
    export function _registerSpecifyFederationDataSourceSettingsPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, wizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    /// <reference types="jquery" />
    export class ChooseJsonSchemaPage extends ChooseAnalyticJsonSchemaPage {
        private _dataSourceWizardHelper;
        private _dataSourceId;
        constructor(createJsonDataSourceInfo: (dataSource: DevExpress.Analytics.Data.JsonDataSource) => JQueryPromise<DevExpress.Analytics.Internal.IDataSourceInfo>);
        initialize(state: any): JQuery.Promise<any, any, any>;
        commit(): JQuery.Promise<any, any, any>;
    }
    export function _registerChooseJsonSchemaPage(factory: DevExpress.Analytics.Wizard.PageFactory, callbacks: DevExpress.Reporting.Designer.Internal.IReportWizardCallbacks): void;
    export class SpecifyJsonDataSourceSettingsPage extends AnalyticSpecifyJsonDataSourceSettingsPage {
        registerSections(): void;
    }
    export function _registerSpecifyJsonDataSourceSettingsPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, wizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    /// <reference types="jquery" />
    export class CustomizeLabelPage extends WizardPageBase {
        static _CONVERSION_COEEFICIENT: number;
        private _id;
        private _labelWidth;
        private _labelHeight;
        private _horizontalPitch;
        private _verticalPitch;
        private _topMargin;
        private _leftMargin;
        private _rightMargin;
        private _bottomMargin;
        private _getFormattedValueInUnits;
        private _getLabelsCount;
        private _rowsCount;
        private _columnsCount;
        private _pageHeight;
        private _pageWidth;
        constructor();
        canNext(): boolean;
        canFinish(): boolean;
        initialize(labelDetails: DevExpress.Reporting.Designer.Wizard.ILabelDetails): JQueryPromise<{
            labelProducts: DevExpress.Reporting.Designer.Wizard.ILabelProduct[];
            paperKinds: DevExpress.Reporting.Designer.Wizard.IPaperKind[];
            labelDetails: DevExpress.Reporting.Designer.Wizard.ILabelDetails[];
        }>;
        commit(): JQuery.Promise<DevExpress.Reporting.Designer.Wizard.ILabelDetails, any, any>;
        _labelData: {
            labelProducts: DevExpress.Reporting.Designer.Wizard.ILabelProduct[];
            paperKinds: DevExpress.Reporting.Designer.Wizard.IPaperKind[];
            labelDetails: DevExpress.Reporting.Designer.Wizard.ILabelDetails[];
        };
        paperKinds: () => DevExpress.Reporting.Designer.Wizard.IPaperKind[];
        _selectedPaperSize: ko.Observable<DevExpress.Reporting.Designer.Wizard.IPaperKind>;
        unit: ko.Observable<DevExpress.Reporting.Designer.Wizard.GraphicsUnit>;
        _stepUnit: ko.PureComputed<0.1 | 0.01>;
        labelWidth: ko.Computed<number>;
        labelHeight: ko.Computed<number>;
        horizontalPitch: ko.Computed<number>;
        verticalPitch: ko.Computed<number>;
        topMargin: ko.Computed<number>;
        leftMargin: ko.Computed<number>;
        rightMargin: ko.Computed<number>;
        bottomMargin: ko.Computed<number>;
        _labelsCountText: ko.PureComputed<string>;
        _pageSizeText: ko.PureComputed<string>;
        static _getPageSizeText(width: number, height: number, unit: DevExpress.Reporting.Designer.Wizard.GraphicsUnit): string;
        _units: {
            text: any;
            value: DevExpress.Reporting.Designer.Wizard.GraphicsUnit;
        }[];
    }
    export function _registerCustomizeLabelPage(factory: DevExpress.Analytics.Wizard.PageFactory): void;
    /// <reference types="jquery" />
    export class SelectLabelTypePage extends WizardPageBase {
        constructor();
        initialize(state: DevExpress.Reporting.Designer.Wizard.IReportWizardState): JQueryPromise<{
            labelProducts: DevExpress.Reporting.Designer.Wizard.ILabelProduct[];
            paperKinds: DevExpress.Reporting.Designer.Wizard.IPaperKind[];
            labelDetails: DevExpress.Reporting.Designer.Wizard.ILabelDetails[];
        }>;
        canNext(): boolean;
        canFinish(): boolean;
        commit(): JQuery.Promise<{
            labelDetails: DevExpress.Reporting.Designer.Wizard.ILabelDetails;
        }, any, any>;
        _selectedPaperSize: ko.Computed<DevExpress.Reporting.Designer.Wizard.IPaperKind>;
        _labelData: {
            labelProducts: DevExpress.Reporting.Designer.Wizard.ILabelProduct[];
            paperKinds: DevExpress.Reporting.Designer.Wizard.IPaperKind[];
            labelDetails: DevExpress.Reporting.Designer.Wizard.ILabelDetails[];
        };
        _selectedLabelProduct: ko.Observable<DevExpress.Reporting.Designer.Wizard.ILabelProduct>;
        _selectedLabelDetails: ko.Observable<DevExpress.Reporting.Designer.Wizard.ILabelDetails>;
        _labelDetails: ko.Observable<any>;
        _width: ko.PureComputed<string>;
        _height: ko.PureComputed<string>;
        _paperType: ko.PureComputed<string>;
        _pageSizeText: ko.PureComputed<string>;
    }
    export function _registerSelectLabelTypePage(factory: DevExpress.Analytics.Wizard.PageFactory): void;
    export class SpecifyLabelSettingsPage extends FullscreenWizardPage {
        private _reportWizardOptions;
        constructor(_reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions);
        registerSections(): void;
        canNext(): boolean;
        getNextSectionId(sectionId: string): string;
    }
    export function _registerSpecifyLabelSettingsPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    /// <reference types="jquery" />
    export class SpecifyObjectDataSourceSettingsPage extends AnalyticSpecifyObjectDataSourceSettingsPage {
        private _dataSourceId;
        canNext(): boolean;
        initialize(state: any): JQuery.Promise<any, any, any>;
        commit(): JQuery.Promise<any, any, any>;
    }
    export function _registerSpecifyObjectDataSourceSettingsPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, wizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    export class ColorScheme {
        _isCustom: boolean;
        constructor(name: string, localizationId: string, baseColor: string);
        name: string;
        localizationId: string;
        baseColor: string;
        color: string | ko.Observable<string> | ko.Computed<string>;
        displayName: string;
        selected: ko.Observable<boolean> | ko.Computed<boolean>;
    }
    export class CustomColorScheme extends ColorScheme {
        applyColor(): void;
        resetColor(): void;
        constructor(name: string, localizationId: string, baseColor: string);
        editorColor: ko.Observable<string> | ko.Computed<string>;
        color: ko.Observable<string> | ko.Computed<string>;
        popoverVisible: ko.Observable<boolean> | ko.Computed<boolean>;
    }
    /// <reference types="jquery" />
    export class ChooseReportColorSchemePage extends WizardPageBase {
        constructor();
        addColorScheme(name: string, color: string, position?: number): void;
        removeColorScheme(...names: string[]): void;
        removeAllColorSchemes(): void;
        setCustomColor(color: string): void;
        _applyScheme(data: DevExpress.Reporting.Designer.Wizard.ColorScheme): void;
        canFinish(): boolean;
        _scheme: ko.Observable<DevExpress.Reporting.Designer.Wizard.ColorScheme>;
        _customColorScheme: DevExpress.Reporting.Designer.Wizard.CustomColorScheme;
        _lookupData: {
            scheme: DevExpress.Reporting.Designer.Wizard.ColorScheme[];
        };
        initialize(state: DevExpress.Reporting.Designer.Wizard.IColorSchemeState): JQuery.Promise<any, any, any>;
        commit(): JQuery.Promise<any, any, any>;
    }
    export function _applyColorSchemeState(data: DevExpress.Reporting.Designer.Wizard.IColorSchemeState, state: DevExpress.Reporting.Designer.Wizard.IColorSchemeState): void;
    export function _registerChooseReportColorSchemePage(factory: DevExpress.Analytics.Wizard.PageFactory): void;
    /// <reference types="jquery" />
    interface IPageSettings {
        width: ko.Observable<number>;
        height: ko.Observable<number>;
        marginLeft: ko.Observable<number>;
        marginRight: ko.Observable<number>;
        marginTop: ko.Observable<number>;
        marginBottom: ko.Observable<number>;
    }
    export class PreviewPageHelper extends Disposable {
        private cachePagePreviewElement;
        constructor(settings?: IPageSettings);
        updatePageSettings(pageSetup: DevExpress.Reporting.Designer.Wizard.IPageSetup): void;
        width: ko.Observable<number>;
        height: ko.Observable<number>;
        marginLeft: ko.Observable<number>;
        marginRight: ko.Observable<number>;
        marginTop: ko.Observable<number>;
        marginBottom: ko.Observable<number>;
        previewPageWidth: ko.Computed<number>;
        previewPageHeight: ko.Computed<number>;
        previewTopMargin: ko.Computed<number>;
        previewRightMargin: ko.Computed<number>;
        previewBottomMargin: ko.Computed<number>;
        previewLeftMargin: ko.Computed<number>;
        pagePreviewElement: ko.Observable<JQuery<HTMLElement>>;
    }
    export class ConfigureReportPageSettingsPage extends WizardPageBase {
        canFinish(): boolean;
        constructor();
        paperKind: ko.Observable<string>;
        landscape: ko.Observable<boolean>;
        unit: ko.Computed<DevExpress.Reporting.Designer.Wizard.GraphicsUnit>;
        width: ko.Observable<number>;
        height: ko.Observable<number>;
        fixedSize: ko.Computed<boolean>;
        marginLeft: ko.Observable<number>;
        marginRight: ko.Observable<number>;
        marginTop: ko.Observable<number>;
        marginBottom: ko.Observable<number>;
        valueFormat: ko.Computed<string>;
        lookupData: {
            paperKind: {
                value: string;
                displayName: string;
            }[];
            unit: {
                value: DevExpress.Reporting.Designer.Wizard.GraphicsUnit;
                displayName: string;
            }[];
        };
        private _unit;
        previewPageHelper: DevExpress.Reporting.Designer.Wizard.PreviewPageHelper;
        initialize(state: DevExpress.Reporting.Designer.Wizard.IPageSetup): JQuery.Promise<any, any, any>;
        commit(): JQuery.Promise<any, any, any>;
    }
    export function _applyPageSetting(data: DevExpress.Reporting.Designer.Wizard.IPageSetup, state: DevExpress.Reporting.Designer.Wizard.IPageSetup): void;
    export function _registerConfigureReportPageSettingsPage(factory: DevExpress.Analytics.Wizard.PageFactory): void;
    export {};
    /// <reference types="jquery" />
    export class ConfigurePageSettingsPage extends WizardPageBase {
        _configureReportPageSettingsPage: DevExpress.Reporting.Designer.Wizard.ConfigureReportPageSettingsPage;
        _colorSchemePage: DevExpress.Reporting.Designer.Wizard.ChooseReportColorSchemePage;
        _colorSchemePageVisible: boolean;
        dispose(): void;
        addColorScheme(name: string, color: string, position?: number): void;
        removeColorScheme(...names: string[]): void;
        removeAllColorSchemes(): void;
        setCustomColor(color: string): void;
        onChange(callback: any): void;
        canNext(): boolean;
        canFinish(): boolean;
        initialize(state: DevExpress.Reporting.Designer.Wizard.IReportWizardState): JQuery.Promise<any, any, never>;
        commit(): JQuery.Promise<any, any, any>;
    }
    export function _registerConfigureReportPageSettingsSection(factory: DevExpress.Analytics.Wizard.PageFactory): void;
    /// <reference types="jquery" />
    export class SpecifyPageSettingsPage extends FullscreenWizardPage {
        private _reportWizardOptions;
        constructor(_reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions);
        canNext(): boolean;
        canFinish(): boolean;
        registerSections(): void;
        getNextSectionId(sectionId: any): string;
    }
    export function _registerSpecifyPageSettingsPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    export class SpecifyReportTitlePage extends WizardPageBase {
        constructor();
        private _getBrightness;
        private _fillTables;
        initialize(state: any): JQuery.Promise<any, any, any>;
        commit(): JQuery.Promise<any, any, any>;
        _reportTitlePlaceholder(): any;
        _foreColor: ko.Observable<string>;
        _masterDetailInfo: ko.ObservableArray<any>;
        reportTitle: ko.Observable<string> | ko.Computed<string>;
        _reportTitleVisible: boolean;
        _color: ko.Observable<string>;
        _previewPageHelper: DevExpress.Reporting.Designer.Wizard.PreviewPageHelper;
    }
    export function _registerSpecifyReportTitlePage(factory: DevExpress.Analytics.Wizard.PageFactory): void;
    /// <reference types="jquery" />
    export class SpecifySqlDataSourceSettingsPage extends SpecifyAnalyticSqlDataSourceSettingsPage {
        registerSections(): void;
        commit(): JQuery.Promise<any, any, any>;
    }
    export function _registerSpecifySqlDataSourceSettingsPage(factory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, wizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    export function createReportWizardState(reportViewModel?: DevExpress.Reporting.Designer.Controls.ReportViewModel): DevExpress.Reporting.Designer.Wizard.IReportWizardState;
    export class FullscreenReportWizard extends FullscreenWizard {
        private _reportWizardOptions;
        protected _callBeforeFinishHandler(state: any, wizardModel?: any): void;
        protected _callAfterFinishHandler(state: any, result: any): void;
        constructor(pageFactory: DevExpress.Analytics.Wizard.FullscreenWizardPageFactory, _reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions);
        _description(): any;
        initialize(state?: DevExpress.Reporting.Designer.Wizard.IReportWizardState): void;
        _requestModelType: typeof DevExpress.Reporting.Designer.Internal.MasterDetailRequestModel;
        _availableDataSources: ko.Observable<DevExpress.Analytics.Internal.IDataSourceInfo[]> | ko.Computed<DevExpress.Analytics.Internal.IDataSourceInfo[]>;
    }
    export class FullscreenReportWizardPageIterator extends PageIterator<DevExpress.Reporting.Designer.Wizard.IReportWizardState> {
        private _reportWizardOptions;
        constructor(pagesFactory: DevExpress.Analytics.Wizard.PageFactory, stateManager: DevExpress.Analytics.Wizard.StateManager, _onResetPage: (page: DevExpress.Analytics.Wizard._WrappedWizardPage) => void, _reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions);
        getNextPageId(pageId?: string): string;
    }
    export function _registerFullscreenReportWizardPages(factory: DevExpress.Analytics.Wizard.PageFactory, reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    export function _createFullscreenReportWizard(reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): DevExpress.Reporting.Designer.Wizard.FullscreenReportWizard;
    /// <reference types="jquery" />
    export class ConfigureMasterDetailRelationshipsPage extends ConfigureAnalyticMasterDetailRelationshipsPage {
        private _dataSourceWizardHelper;
        constructor(createSqlDataSourceInfo: (dataSource: DevExpress.Analytics.Data.SqlDataSource) => JQueryPromise<DevExpress.Analytics.Internal.IDataSourceInfo>, sqlDataSourceResultSchema: any);
        initialize(state: any): JQueryPromise<DevExpress.Analytics.Data.ResultSet>;
        commit(): JQuery.Promise<any, any, any>;
    }
    export function _registerConfigureMasterDetailRelationshipsPage(factory: DevExpress.Analytics.Wizard.PageFactory, callbacks: DevExpress.Reporting.Designer.Internal.IReportWizardCallbacks): void;
    /// <reference types="jquery" />
    export class MultiQueryConfigurePage extends AnalyticMultiQueryConfigurePage {
        private _dataSourceWizardHelper;
        constructor(reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions);
        _getQueriesCount(): number;
        _canEditQueryParameters(): boolean;
        initialize(state: any): JQueryPromise<any>;
        commit(): JQuery.Promise<any, any, any>;
    }
    export function _registerMultiQueryConfigurePage(factory: DevExpress.Analytics.Wizard.PageFactory, reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    /// <reference types="jquery" />
    export class MultiQueryConfigureParametersPage extends AnalyticMultiQueryConfigureParametersPage {
        private createSqlDataSourceInfo;
        private _dataSourceWizardHelper;
        constructor(createSqlDataSourceInfo: (dataSource: DevExpress.Analytics.Data.SqlDataSource) => JQueryPromise<DevExpress.Analytics.Internal.IDataSourceInfo>, parametersConverters?: any, requestWrapper?: any);
        initialize(state: any): JQueryPromise<any>;
        commit(): JQuery.Promise<any, any, any>;
    }
    export function _registerMultiQueryConfigureParametersPage(factory: DevExpress.Analytics.Wizard.PageFactory, callbacks: DevExpress.Reporting.Designer.Internal.IReportWizardCallbacks): void;
    /// <reference types="jquery" />
    export class SetReportTitlePage extends WizardPageBase {
        initialize(data: DevExpress.Reporting.Designer.Wizard.IReportTitleState): JQuery.Promise<any, any, any>;
        canNext(): boolean;
        canFinish(): boolean;
        commit(): JQuery.Promise<any, any, any>;
        reportTitle: ko.Observable<string>;
    }
    export function _registerSetReportTitlePage(factory: DevExpress.Analytics.Wizard.PageFactory): void;
    export class ReportWizard extends PopupWizard {
        private _reportWizardOptions;
        protected _callBeforeFinishHandler(state: any, wizardModel?: any): void;
        protected _callAfterFinishHandler(state: any, result: any): void;
        constructor(pageFactory: DevExpress.Analytics.Wizard.PageFactory, _reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions);
        initialize(state?: DevExpress.Reporting.Designer.Wizard.IReportWizardState): void;
        start(finishCallback?: (state: DevExpress.Reporting.Designer.Wizard.IReportWizardState) => JQueryPromise<any>): void;
        _requestModelType: typeof DevExpress.Reporting.Designer.Internal.MasterDetailRequestModel;
        title: any;
    }
    export class ReportWizardPageIterator extends MultiQueryDataSourceWizardPageIterator<DevExpress.Reporting.Designer.Wizard.IReportWizardState> {
        private _reportWizardOptions;
        constructor(pagesFactory: DevExpress.Analytics.Wizard.PageFactory, stateManager: DevExpress.Analytics.Wizard.StateManager, _reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions);
        getNextPageId(pageId?: string): string;
    }
    export function _registerCommonReportWizardPages(factory: DevExpress.Analytics.Wizard.PageFactory, reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    export function _registerReportWizardPages(factory: DevExpress.Analytics.Wizard.PageFactory, reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    export function _createReportWizard(reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): DevExpress.Reporting.Designer.Wizard.ReportWizard;
    export type WizardTypeString = "SingleQueryDataSourceWizard" | "DataSourceWizard" | "ReportWizard";
    export type WizardRunType = "NewViaReportWizard" | "DataSourceWizard" | "DesignInReportWizard";
    export type CommandRunType = WizardRunType | "LocalizationCommand";
    export type WizardType = DevExpress.Analytics.Wizard.DataSourceWizard | DevExpress.Analytics.Wizard.FullscreenDataSourceWizard | DevExpress.Reporting.Designer.Wizard.FullscreenReportWizard | DevExpress.Reporting.Designer.Wizard.ReportWizard | DevExpress.Analytics.Wizard.MultiQueryDataSourceWizard;
    /// <reference types="jquery" />
    export class LegacyAddGroupingLevelPage extends WizardPageBase {
        private initialFields;
        fields: DevExpress.Reporting.Designer.Internal.ListViewModel<string>;
        groups: DevExpress.Reporting.Designer.Internal.ListViewModel<{
            fields: ko.ObservableArray<string>;
        }>;
        canFinish(): boolean;
        addNewGroup: () => void;
        appendFieldsToGroup: () => void;
        removeGroup: () => void;
        isCreateGroupEnabled(): boolean;
        isAppendToGroupEnabled(): boolean;
        isRemoveGroupEnabled(): boolean;
        moveUp: () => void;
        moveDown: () => void;
        isMoveUpEnabled(): boolean;
        isMoveDownEnabled(): boolean;
        fieldDblClick: (field: any) => void;
        fieldClick: (e: {
            itemData: any;
        }) => void;
        groupDblClick: (group: any) => void;
        groupClick: (e: {
            itemData: any;
        }) => void;
        initialize(state: DevExpress.Reporting.Designer.Wizard.ILegacyReportWizardState): JQuery.Promise<any, any, any>;
        commit(): JQuery.Promise<{
            groups?: string[][];
            summaryOptionsColumns?: Array<DevExpress.Analytics.Utils.IDataMemberInfo>;
        }, any, any>;
    }
    export function _registerLegacyAddGroupingLevelPage(factory: DevExpress.Analytics.Wizard.PageFactory): void;
    /// <reference types="jquery" />
    export class LegacyChooseReportLayoutPage extends WizardPageBase {
        private _isGroupedReport;
        private _reportLayoutTypes;
        private _groupedReportLayoutsTypes;
        canFinish(): boolean;
        initialize(state: DevExpress.Reporting.Designer.Wizard.ILegacyReportWizardState): JQuery.Promise<any, any, any>;
        commit(): JQuery.Promise<{
            fitFieldsToPage?: boolean;
            layout?: DevExpress.Reporting.Designer.Wizard.ReportLayout;
            portrait?: boolean;
        }, any, any>;
        toggleFitFieldsToPage: () => void;
        selectedLayoutType: ko.Observable<DevExpress.Reporting.Designer.Wizard.LayoutTypeItem>;
        fitFieldsToPage: ko.Observable<boolean>;
        pageOrientationItems: DevExpress.Reporting.Designer.Wizard.PageOrientationItem[];
        selectedPageOrientation: ko.Observable<DevExpress.Reporting.Designer.Wizard.PageOrientationItem>;
        layoutTypeItems: ko.PureComputed<DevExpress.Reporting.Designer.Wizard.LayoutTypeItem[]>;
        layoutTypeItemClick: (item: DevExpress.Reporting.Designer.Wizard.LayoutTypeItem) => void;
        isSelected: (item: DevExpress.Reporting.Designer.Wizard.LayoutTypeItem) => boolean;
    }
    export function _registerLegacyChooseReportLayoutPage(factory: DevExpress.Analytics.Wizard.PageFactory): void;
    /// <reference types="jquery" />
    export class LegacyChooseReportStylePage extends WizardPageBase {
        canFinish(): boolean;
        initialize(state: DevExpress.Reporting.Designer.Wizard.ILegacyReportWizardState): JQuery.Promise<any, any, any>;
        commit(): JQuery.Promise<{
            style?: DevExpress.Reporting.Designer.Wizard.ReportStyle;
        }, any, any>;
        reportStyleItems: DevExpress.Reporting.Designer.Wizard.ReportStyleItem[];
        selectedReportStyle: ko.Observable<DevExpress.Reporting.Designer.Wizard.ReportStyleItem>;
    }
    export function _registerLegacyChooseReportStylePage(factory: DevExpress.Analytics.Wizard.PageFactory): void;
    /// <reference types="jquery" />
    export class LegacyChooseSummaryOptionsPage extends WizardPageBase {
        private _columns;
        canFinish(): boolean;
        initialize(state: DevExpress.Reporting.Designer.Wizard.ILegacyReportWizardState): JQuery.Promise<any, any, any>;
        commit(): JQuery.Promise<{
            summaryOptions?: Array<DevExpress.Reporting.Designer.Internal.ISummaryOptions>;
            ignoreNullValuesForSummary?: boolean;
        }, any, any>;
        summaryOptions: ko.ObservableArray<DevExpress.Reporting.Designer.Internal.SummaryOptionsWrapper>;
        ignoreNullValues: ko.Observable<boolean>;
        toggleIgnoreNullValues: () => void;
    }
    export function _registerLegacyChooseSummaryOptionsPage(factory: DevExpress.Analytics.Wizard.PageFactory): void;
    /// <reference types="jquery" />
    export class LegacySelectColumnsPage extends WizardPageBase {
        private _fieldListsCallback;
        private _selectedPath;
        private _fields;
        constructor(getFieldListItems: DevExpress.Reporting.Designer.Internal.IReportWizardFieldsCallback);
        canFinish(): boolean;
        canNext(): boolean;
        selectedPath(): any;
        reset(): void;
        initialize(state: DevExpress.Reporting.Designer.Wizard.ILegacyReportWizardState): JQuery.Promise<any, any, any>;
        commit(): JQuery.Promise<{
            fields?: Array<DevExpress.Analytics.Utils.IDataMemberInfo>;
        }, any, any>;
        isSelectEnable(): boolean;
        isUnselectEnable(): boolean;
        select: () => void;
        selectAll: () => void;
        unselect: () => void;
        unselectAll: () => void;
        availableFieldDblClick: (field: any) => void;
        availableFieldClick: (e: {
            itemData: any;
        }) => void;
        selectedFieldDblClick: (field: any) => void;
        selectedFieldClick: (e: {
            itemData: any;
        }) => void;
        availableFields: DevExpress.Reporting.Designer.Internal.ListViewModel<IDataMemberInfo>;
        selectedFields: DevExpress.Reporting.Designer.Internal.ListViewModel<IDataMemberInfo>;
    }
    export function _registerLegacySelectColumnsPage(factory: DevExpress.Analytics.Wizard.PageFactory, fieldListItemsCallback: DevExpress.Reporting.Designer.Internal.IReportWizardFieldsCallback): void;
    /// <reference types="jquery" />
    export class LegacyChooseDataMemberPage extends WizardPageBase {
        private _rootItems;
        private _selectedPath;
        private _fieldListCallBack;
        private _createSqlDataSourceInfo;
        private _dataSource;
        private _hideDataMemberSubItems;
        private _wrapFieldListCallback;
        private get dataSourcePath();
        private _beginInternal;
        constructor(reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions);
        canNext(): boolean;
        canFinish(): boolean;
        initialize(state: DevExpress.Reporting.Designer.Wizard.IReportWizardState): JQueryPromise<any>;
        commit(): JQuery.Promise<{
            dataMemberPath?: string;
            dataMemberInfo?: DevExpress.Analytics.Utils.IDataMemberInfo;
        }, any, any>;
        scrollViewHeight: string;
        fieldListModel: {
            itemsProvider: DevExpress.Analytics.Internal.FieldListProvider;
            selectedPath: any;
            treeListController: DevExpress.Analytics.Widgets.Internal.DataMemberTreeListController;
        };
    }
    export function _registerLegacyChooseDataMemberPage(factory: DevExpress.Analytics.Wizard.PageFactory, reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): void;
    export class LegacyReportWizard extends PopupWizard {
        private _reportWizardOptions;
        protected _callBeforeFinishHandler(state: any, wizardModel?: any): void;
        protected _callAfterFinishHandler(state: any, result: any): void;
        constructor(pageFactory: any, _reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions);
        initialize(state?: DevExpress.Reporting.Designer.Wizard.IReportWizardState): void;
        start(finishCallback?: (state: DevExpress.Reporting.Designer.Wizard.IReportWizardState) => JQueryPromise<any>): void;
        _requestModelType: typeof DevExpress.Reporting.Designer.Internal.LegacyReportRequestModel;
        title: any;
    }
    export class LegacyReportWizardPageIterator extends MultiQueryDataSourceWizardPageIterator<DevExpress.Reporting.Designer.Wizard.ILegacyReportWizardState> {
        constructor(pageFactory: DevExpress.Analytics.Wizard.PageFactory, stateManager: DevExpress.Analytics.Wizard.StateManager, reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions);
        getNextPageId(pageId: string): string;
    }
    export function _createLegacyReportWizard(reportWizardOptions: DevExpress.Reporting.Designer.Wizard._ReportWizardOptions): LegacyReportWizard;
}
declare module DevExpress.Reporting.Designer.Controls.PivotGrid.Metadata {
    import IDisplayedValue = DevExpress.Analytics.Utils.IDisplayedValue;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const summaryTypeValues: Array<DevExpress.Analytics.Utils.IDisplayedValue>;
    export const summaryType: DevExpress.Analytics.Utils.ISerializationInfo;
    export const fieldComponentName: DevExpress.Analytics.Utils.ISerializationInfo;
    export const conditions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const field: DevExpress.Analytics.Utils.ISerializationInfo;
    export const customTotalSummaryType: DevExpress.Analytics.Utils.ISerializationInfo;
    export const sortBySummaryInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const sortBySummaryConditionInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const caption: DevExpress.Analytics.Utils.ISerializationInfo;
    export const index: DevExpress.Analytics.Utils.ISerializationInfo;
    export const fieldName: DevExpress.Analytics.Utils.ISerializationInfo;
    export const minWidth: DevExpress.Analytics.Utils.ISerializationInfo;
    export const width: DevExpress.Analytics.Utils.ISerializationInfo;
    export const area: DevExpress.Analytics.Utils.ISerializationInfo;
    export const allowedAreas: DevExpress.Analytics.Utils.ISerializationInfo;
    export const areaIndex: DevExpress.Analytics.Utils.ISerializationInfo;
    export const areaIndexEditable: DevExpress.Analytics.Utils.ISerializationInfo;
    export const unboundType: DevExpress.Analytics.Utils.ISerializationInfo;
    export const unboundFieldName: DevExpress.Analytics.Utils.ISerializationInfo;
    export const unboundExpression: DevExpress.Analytics.Utils.ISerializationInfo;
    export const topValueType: DevExpress.Analytics.Utils.ISerializationInfo;
    export const topValueShowOthers: DevExpress.Analytics.Utils.ISerializationInfo;
    export const topValueCount: DevExpress.Analytics.Utils.ISerializationInfo;
    export const summaryDisplayType: DevExpress.Analytics.Utils.ISerializationInfo;
    export const sortOrder: DevExpress.Analytics.Utils.ISerializationInfo;
    export const sortMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const showNewValues: DevExpress.Analytics.Utils.ISerializationInfo;
    export const runningTotal: DevExpress.Analytics.Utils.ISerializationInfo;
    export const rowValueLineCount: DevExpress.Analytics.Utils.ISerializationInfo;
    export const groupIntervalNumericRange: DevExpress.Analytics.Utils.ISerializationInfo;
    export const groupInterval: DevExpress.Analytics.Utils.ISerializationInfo;
    export const grandTotalText: DevExpress.Analytics.Utils.ISerializationInfo;
    export const expandedInFieldsGroup: DevExpress.Analytics.Utils.ISerializationInfo;
    export const emptyValueText: DevExpress.Analytics.Utils.ISerializationInfo;
    export const emptyCellText: DevExpress.Analytics.Utils.ISerializationInfo;
    export const displayFolder: DevExpress.Analytics.Utils.ISerializationInfo;
    export const columnValueLineCount: DevExpress.Analytics.Utils.ISerializationInfo;
    export const totalsVisibility: DevExpress.Analytics.Utils.ISerializationInfo;
    export const useNativeFormat: DevExpress.Analytics.Utils.ISerializationInfo;
    export const KPIGraphic: DevExpress.Analytics.Utils.ISerializationInfo;
    export const cellFormat: DevExpress.Analytics.Utils.ISerializationInfo;
    export const totalCellFormat: DevExpress.Analytics.Utils.ISerializationInfo;
    export const grandTotalCellFormat: DevExpress.Analytics.Utils.ISerializationInfo;
    export const valueFormat: DevExpress.Analytics.Utils.ISerializationInfo;
    export const totalValueFormat: DevExpress.Analytics.Utils.ISerializationInfo;
    export const appearanceInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const appearancesInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const unboundExpressionMode: DevExpress.Analytics.Utils.ISerializationInfo;
    export const options: DevExpress.Analytics.Utils.ISerializationInfo;
    export const sortBySummary: DevExpress.Analytics.Utils.ISerializationInfo;
    export const pivotGridFieldSerializationsInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesPivotGridField: string[];
    export const pivotGridFieldsSerializable: DevExpress.Analytics.Utils.ISerializationInfo;
}
declare module DevExpress.Reporting.Designer.Controls.PivotGrid {
    import ElementViewModel = DevExpress.Analytics.Elements.ElementViewModel;
    import ISurfaceContext = DevExpress.Analytics.Elements.ISurfaceContext;
    import ModelSerializer = DevExpress.Analytics.Utils.ModelSerializer;
    import ControlType = DevExpress.Reporting.Designer.Internal.ControlType;
    import XRControlSurfaceBase = DevExpress.Reporting.Designer.Controls.XRControlSurfaceBase;
    import SortBySummaryInfo = DevExpress.Reporting.Designer.Controls.PivotGrid.SortBySummaryInfo;
    import IModelSerializer = DevExpress.Analytics.Utils.IModelSerializer;
    import ISerializableModel = DevExpress.Analytics.Utils.ISerializableModel;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import PivotGridFieldViewModel = DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldViewModel;
    export interface IPivotGridFieldFormatInfo {
        formatString: ko.Observable<string>;
        formatType: ko.Observable<string>;
    }
    export interface IPivotGridField {
        area: ko.Observable<string> | ko.Computed<string>;
        areaIndex: ko.Observable<number> | ko.Computed<number>;
    }
    export class PivotGridFieldViewModel extends ElementViewModel<DevExpress.Reporting.Designer.Internal.ControlType> implements IPivotGridField {
        static fieldHeight: number;
        static createNew(parent: any): () => DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldViewModel;
        getFieldType(): string;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        getControlFactory(): DevExpress.Reporting.Designer.Controls.ControlsFactory;
        constructor(model: any, parent: DevExpress.Analytics.Elements.ElementViewModel<ControlType>, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        getPath(propertyName: any): string;
        getDisplayName(): any;
        controlType: DevExpress.Reporting.Designer.Internal.ControlType;
        area: ko.Observable<string> | ko.Computed<string>;
        areaIndex: ko.Observable<number> | ko.Computed<number>;
        areaIndexEditable: ko.Observable<number> | ko.Computed<number>;
        index: ko.Observable<number> | ko.Computed<number>;
        fieldName: ko.Observable<string> | ko.Computed<string>;
        fieldNameEditable: any;
        caption: ko.Observable<string> | ko.Computed<string>;
        summaryType: ko.Observable<string>;
        summaryDisplayType: ko.Observable<string>;
        unboundType: ko.Observable<string>;
        groupInterval: ko.Observable<string>;
        unboundExpression: ko.Observable<string>;
        sortBySummaryInfo: DevExpress.Reporting.Designer.Controls.PivotGrid.SortBySummaryInfo;
        valueFormat: IPivotGridFieldFormatInfo;
        totalValueFormat: IPivotGridFieldFormatInfo;
        cellFormat: IPivotGridFieldFormatInfo;
        totalCellFormat: IPivotGridFieldFormatInfo;
        grandTotalCellFormat: IPivotGridFieldFormatInfo;
    }
    export class PivotGridFieldSurface extends XRControlSurfaceBase<DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldViewModel> implements IPivotGridField {
        constructor(control: DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        minWidth: ko.Computed<number>;
        area: ko.Observable<string> | ko.Computed<string>;
        areaIndex: ko.Observable<number> | ko.Computed<number>;
        positionWidthWithoutZoom: ko.Computed<number>;
    }
    export class SortBySummaryInfoCondition implements ISerializableModel {
        private _fieldsProvider;
        constructor(model: any, fieldsProvider: {
            fieldsAvailableForCondition: () => string[];
        }, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        fieldComponentName: ko.Observable<string> | ko.Computed<string>;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        static createNew(parent: DevExpress.Reporting.Designer.Controls.PivotGrid.SortBySummaryInfo, serializer?: DevExpress.Analytics.Utils.IModelSerializer): SortBySummaryInfoCondition;
    }
    export class SortBySummaryInfo {
        private _field;
        private _pivotGridFields;
        constructor(model: any, field: DevExpress.Reporting.Designer.Controls.PivotGrid.PivotGridFieldViewModel, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        conditions: ko.ObservableArray<SortBySummaryInfoCondition>;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        fieldsAvailableForCondition(): string[];
        static from(model: any, serializer?: DevExpress.Analytics.Utils.IModelSerializer): any;
        static toJSON(viewModel: DevExpress.Reporting.Designer.Controls.PivotGrid.SortBySummaryInfo, serializer?: DevExpress.Analytics.Utils.IModelSerializer, refs?: any): any;
    }
}
declare module DevExpress.Reporting.Designer.Controls.CrossTab.Metadata {
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import parseBool = DevExpress.Analytics.Utils.parseBool;
    import floatFromModel = DevExpress.Analytics.Utils.floatFromModel;
    export const crossTabFieldName: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: string;
    };
    export const crossTabGroupInterval: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: string;
        valuesArray: DevExpress.Analytics.Utils.IDisplayedValue[];
    };
    export const crossTabGroupIntervalNumericRange: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: number;
    };
    export const crossTabSummaryType: any;
    export const crossTabSortBySummaryInfo: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        info: any[];
    };
    export const crossTabDataFieldInfoBase: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const crossTabDataFieldInfo: DevExpress.Analytics.Utils.ISerializationInfo[];
    export const sortOrderdefaultValAscending: any;
    export const crossTabGroupFieldInfoBase: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const crossTabGroupFieldInfo: DevExpress.Analytics.Utils.ISerializationInfo[];
    export const rowFields: DevExpress.Analytics.Utils.ISerializationInfo;
    export const columnFields: DevExpress.Analytics.Utils.ISerializationInfo;
    export const dataFields: DevExpress.Analytics.Utils.ISerializationInfo;
    export const crossTabLayoutOptionsInfo: ({
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: string;
        valuesArray: {
            displayValue: string;
            value: string;
            localizationId: string;
        }[];
        from?: undefined;
    } | {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: boolean;
        from: typeof DevExpress.Analytics.Utils.parseBool;
        valuesArray?: undefined;
    })[];
    export const crossTabLayoutOptions: {
        propertyName: string;
        modelName: string;
        localizationId: string;
        displayName: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        info: ({
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
            defaultVal: string;
            valuesArray: {
                displayValue: string;
                value: string;
                localizationId: string;
            }[];
            from?: undefined;
        } | {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
            defaultVal: boolean;
            from: typeof DevExpress.Analytics.Utils.parseBool;
            valuesArray?: undefined;
        })[];
    };
    export const crossTabPrintOptionsInfo: ({
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: string;
        valuesArray: {
            displayValue: string;
            value: string;
            localizationId: string;
        }[];
        from?: undefined;
    } | {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: number;
        valuesArray?: undefined;
        from?: undefined;
    } | {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: boolean;
        from: typeof DevExpress.Analytics.Utils.parseBool;
        valuesArray?: undefined;
    })[];
    export const crossTabPrintOptions: {
        propertyName: string;
        modelName: string;
        localizationId: string;
        displayName: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        info: ({
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
            defaultVal: string;
            valuesArray: {
                displayValue: string;
                value: string;
                localizationId: string;
            }[];
            from?: undefined;
        } | {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
            defaultVal: number;
            valuesArray?: undefined;
            from?: undefined;
        } | {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            editor: DevExpress.Analytics.Utils.IEditorInfo;
            defaultVal: boolean;
            from: typeof DevExpress.Analytics.Utils.parseBool;
            valuesArray?: undefined;
        })[];
    };
    export const autoSizeMode: DevExpress.Analytics.Utils.IDisplayedValue[];
    export const rowVisible: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: boolean;
        from: typeof DevExpress.Analytics.Utils.parseBool;
    };
    export const columnVisible: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: boolean;
        from: typeof DevExpress.Analytics.Utils.parseBool;
    };
    export const rowAutoHeightMode: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: string;
        valuesArray: DevExpress.Analytics.Utils.IDisplayedValue[];
    };
    export const columnAutoWidthMode: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: string;
        valuesArray: DevExpress.Analytics.Utils.IDisplayedValue[];
    };
    export const crossTabCellOptionsInfo: (DevExpress.Analytics.Utils.ISerializationInfo | {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: string;
    } | {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
        defaultVal: boolean;
        from: typeof DevExpress.Analytics.Utils.parseBool;
    })[];
    export const columnIndex: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        defaultVal: number;
        from: typeof DevExpress.Analytics.Utils.floatFromModel;
        alwaysSerialize: boolean;
        disabled: boolean;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
    };
    export const rowIndex: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        defaultVal: number;
        from: typeof DevExpress.Analytics.Utils.floatFromModel;
        alwaysSerialize: boolean;
        disabled: boolean;
        editor: DevExpress.Analytics.Utils.IEditorInfo;
    };
    export const cellserializtionInfoBase: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const cellserializtionInfo: DevExpress.Analytics.Utils.ISerializationInfoArray;
    export const popularPropertiesCrossTabCell: string[];
    export const crossTabCellWidth: {
        propertyName: string;
        modelName: string;
        localizationId: string;
        defaultVal: number;
        from: typeof DevExpress.Analytics.Utils.floatFromModel;
    };
    export const crossTabColumnDefinitionInfo: ({
        propertyName: string;
        modelName: string;
        localizationId: string;
        defaultVal: number;
        from: typeof DevExpress.Analytics.Utils.floatFromModel;
    } | {
        propertyName: string;
        modelName: string;
        defaultVal: string;
        valuesArray: DevExpress.Analytics.Utils.IDisplayedValue[];
    } | {
        propertyName: string;
        modelName: string;
        defaultVal: boolean;
        from: typeof DevExpress.Analytics.Utils.parseBool;
    })[];
    export const crossTabCellHeight: {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        defaultVal: number;
        from: typeof DevExpress.Analytics.Utils.floatFromModel;
    };
    export const crossTabRowDefinitionInfo: ({
        propertyName: string;
        modelName: string;
        defaultVal: boolean;
        from: typeof DevExpress.Analytics.Utils.parseBool;
    } | {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        defaultVal: number;
        from: typeof DevExpress.Analytics.Utils.floatFromModel;
    } | {
        propertyName: string;
        modelName: string;
        defaultVal: string;
        valuesArray: DevExpress.Analytics.Utils.IDisplayedValue[];
    })[];
    export const rowDefinitions: DevExpress.Analytics.Utils.ISerializationInfo;
    export const columnDefinitions: DevExpress.Analytics.Utils.ISerializationInfo;
}
declare module DevExpress.Reporting.Designer.Localization {
    /// <reference types="jquery" />
    /// <reference types="jquery" />
    interface ITranslationResult {
        name: string;
        texts: string[];
    }
    class TranslationFactory {
        private _services;
        getFirstRegistered(): string;
        getTranslations(texts: string[], destinationLanguage: string): JQuery.Deferred<ITranslationResult[], any, any>;
        translate(name: string, texts: string[], destinationLanguage: string): JQuery.Promise<ITranslationResult, any, any>;
        register(name: string, service: ITranslationService): void;
        unregister(name: string): void;
    }
    export const _translationFactory: TranslationFactory;
    export interface ITranslationService {
        onRequest: (texts: string[], destinationLanguage: string) => JQueryAjaxSettings;
        onResponse: (result: any) => string[];
    }
    export function registerTranslationService(name: string, service: ITranslationService): void;
    export function unregisterTranslationService(name: string): void;
    export {};
}
declare module DevExpress.Reporting.Designer.Controls.CrossTab {
    import SerializableModel = DevExpress.Analytics.Elements.SerializableModel;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import ModelSerializer = DevExpress.Analytics.Utils.ModelSerializer;
    import CrossTabFieldModel = DevExpress.Reporting.Designer.Controls.CrossTabFieldModel;
    import XRCrossTabViewModel = DevExpress.Reporting.Designer.Controls.XRCrossTabViewModel;
    import CellKind = DevExpress.Reporting.Designer.Controls.CrossTab.CellKind;
    import IModelSerializer = DevExpress.Analytics.Utils.IModelSerializer;
    import XRCrossTabCellViewModel = DevExpress.Reporting.Designer.Controls.XRCrossTabCellViewModel;
    import ICrossTabCell = DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
    export enum CornerHeaderDisplayMode {
        None = 0,
        RowFieldNames = 1,
        ColumnFieldNames = 2
    }
    export enum CellKind {
        None = 0,
        Corner = 1,
        RowHeader = 2,
        RowTotalHeader = 3,
        RowTotal = 4,
        ColumnHeader = 5,
        ColumnTotalHeader = 6,
        ColumnTotal = 7,
        Data = 8,
        DataHeader = 9,
        GrandTotal = 10,
        EmptyHeader = 11,
        Empty = 12
    }
    export enum TotalHeaderPosition {
        Inner = 0,
        Outer = 1
    }
    export enum TotalsPosition {
        AfterData = 0,
        BeforeData = 1
    }
    export enum DataFieldLayout {
        InRow = 0,
        InColumn = 1
    }
    export interface ICrossTabCell {
        _columnIndex: ko.Observable<number>;
        _rowIndex: ko.Observable<number>;
        _columnSpan: ko.Observable<number>;
        _rowSpan: ko.Observable<number>;
        kind: ko.Observable<DevExpress.Reporting.Designer.Controls.CrossTab.CellKind>;
        dataLevel?: number;
        rowLevel?: number;
        columnLevel?: number;
        field?: ko.Observable<DevExpress.Reporting.Designer.Controls.CrossTabFieldModel>;
        dependentFields: DevExpress.Reporting.Designer.Controls.CrossTabFieldModel[];
    }
    export class CrossTabCellInfo extends SerializableModel implements ICrossTabCell {
        constructor(model: any, serializer?: DevExpress.Analytics.Utils.ModelSerializer);
        _columnIndex: ko.Observable<number>;
        _rowIndex: ko.Observable<number>;
        _columnSpan: ko.Observable<number>;
        _rowSpan: ko.Observable<number>;
        kind: ko.Observable<DevExpress.Reporting.Designer.Controls.CrossTab.CellKind>;
        field: ko.Observable<DevExpress.Reporting.Designer.Controls.CrossTabFieldModel>;
        dataLevel: number;
        rowLevel: number;
        columnLevel: number;
        dependentFields: DevExpress.Reporting.Designer.Controls.CrossTabFieldModel[];
    }
    export class CellCreator extends Disposable {
        protected crossTab: DevExpress.Reporting.Designer.Controls.XRCrossTabViewModel;
        get rowFieldCount(): number;
        get columnFieldCount(): number;
        get dataFieldCount(): number;
        get rowDataCount(): number;
        get columnDataCount(): number;
        constructor(crossTab: DevExpress.Reporting.Designer.Controls.XRCrossTabViewModel);
        nextRowIndex(cell: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell): number;
        lastRowIndex(cell: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell): number;
        nextColumnIndex(cell: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell): number;
        lastColumnIndex(cell: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell): number;
        setCellKind(cell: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell, kind: DevExpress.Reporting.Designer.Controls.CrossTab.CellKind): void;
        setLevel(cell: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell, dataLevel: number, columnLevel: number, rowLevel: number): void;
        setDataLevel(cell: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell, level: number): void;
        setColumnLevel(cell: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell, level: number): void;
        setRowLevel(cell: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell, level: number): void;
        indexToLevel(index: number, count: number): number;
        setLayout(cell: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell, columnIndex: any, rowIndex: any, columnSpan: any, rowSpan: any): void;
        static createInstance(crossTab: DevExpress.Reporting.Designer.Controls.XRCrossTabViewModel): CellCreator | HorizontalCreator | VerticalCreator;
        create(): any[];
        creator(cellKind: DevExpress.Reporting.Designer.Controls.CrossTab.CellKind): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        createCorners(columnCount: number, rowCount: number): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell[];
        createDataHeaders(): any[];
        createDataHeader(columnIndex: any, rowIndex: any, dataLevel: any, columnLevel?: number, rowLevel?: number): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        createData(): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell[];
        createDataCell(colIndex: number, rowIndex: number, level: number): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        createColumnTotals(startColumnIndex: number, startRowIndex: number, dataCount: number): any[];
        createColumnTotal(columnIndex: number, rowIndex: number, dataLevel: number, columnLevel: number): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        createRowTotals(startColumnIndex: number, startRowIndex: number, dataCount: number): any[];
        createRowTotal(columnIndex: any, rowIndex: any, dataLevel: any, rowLevel: any): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        createGrandTotals(dataItems: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell[], startRowIndex: number, startColumnIndex: number, columnInc: number, rowInc: number): any[];
        createGrandTotal(dataLevel: any, columnLevel: any, rowLevel: any): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        setGrandTotalLayout(cells: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell, inc: number, columnIndex: any, rowIndex: any): void;
        createColumnHeaders(startColumnIndex: number, columnSpan: number, dataCount: number): any[];
        createColumnTotalHeaders(startColumnIndex: number, startRowIndex: number, rowSpan: number, dataCount: number): any[];
        createRowHeaders(startRowIndex: number, rowSpan: number, dataCount: number): any[];
        createRowTotalHeaders(startColumnIndex: number, columnSpan: number, startRowIndex: number, dataCount: number): any[];
        createEmptyHeaders(columnSpan: number): any[];
        createEmptyCells(dataCount: number): any[];
        createEmptyHeader(level: number): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        createEmptyCell(level: number): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        createColumnTotalHeader(level: number): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        createColumnGrandTotalHeader(): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        createRowTotalHeader(level: number): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        createRowGrandTotalHeader(): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        lastCorner: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
    }
    export class HorizontalCreator extends CellCreator {
        get columnDataCount(): number;
        createCorners(columnCount: number, rowCount: number): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell[];
        createDataHeaders(): any[];
        createData(): any[];
        createRowTotals(startColumnIndex: number, startRowIndex: number, dataCount: number): any[];
        createColumnTotals(startColumnIndex: number, startRowIndex: number, dataCount: number): any[];
        createGrandTotals(dataItems: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell[], startRowIndex: number, startColumnIndex: number, columnIndex: number, rowIndex: number): any[];
        createColumnTotal(columnIndex: number, rowIndex: number, dataLevel: number, columnLevel: number): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        createRowTotal(columnIndex: number, rowIndex: number, dataLevel: number, rowLevel: number): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        createEmptyHeaders(columnSpan: number): any[];
    }
    export class VerticalCreator extends CellCreator {
        get rowDataCount(): number;
        createCorners(columnCount: number, rowCount: number): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell[];
        createDataHeaders(): any[];
        createData(): any[];
        createRowTotals(startColumnIndex: number, startRowIndex: number, dataCount: number): any[];
        createColumnTotals(startColumnIndex: number, startRowIndex: number, dataCount: number): any[];
        createColumnTotal(columnIndex: number, rowIndex: number, dataLevel: number, columnLevel: number): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        createRowTotal(columnIndex: number, rowIndex: number, dataLevel: number, rowLevel: number): DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        createGrandTotals(dataItems: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell[], startRowIndex: number, startColumnIndex: number, columnIndex: number, rowIndex: number): any[];
        setGrandTotalLayout(items: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell, inc: number, columnIndex: any, rowIndex: any): void;
        createEmptyCells(dataCount: number): any[];
    }
    export function findcells(cells: DevExpress.Reporting.Designer.Controls.XRCrossTabCellViewModel[], columnIndex?: number, rowIndex?: number): DevExpress.Reporting.Designer.Controls.XRCrossTabCellViewModel[];
    export class CrossTabDefinitionsModel extends SerializableModel {
        constructor(model: any, parent?: DevExpress.Reporting.Designer.Controls.XRCrossTabViewModel, serializer?: DevExpress.Analytics.Utils.IModelSerializer);
        visible: ko.Observable<boolean>;
    }
    export class CrossTabRowDefinitionsModel extends CrossTabDefinitionsModel {
        getInfo(): ({
            propertyName: string;
            modelName: string;
            defaultVal: boolean;
        } | {
            propertyName: string;
            modelName: string;
            displayName: string;
            localizationId: string;
            defaultVal: number;
        } | {
            propertyName: string;
            modelName: string;
            defaultVal: string;
            valuesArray: DevExpress.Analytics.Utils.IDisplayedValue[];
        })[];
        height: ko.Observable<number> | ko.Computed<number>;
        autoHeightMode: ko.Observable<string>;
    }
    export class CrossTabColumnDefinitionsModel extends CrossTabDefinitionsModel {
        getInfo(): ({
            propertyName: string;
            modelName: string;
            localizationId: string;
            defaultVal: number;
        } | {
            propertyName: string;
            modelName: string;
            defaultVal: string;
            valuesArray: DevExpress.Analytics.Utils.IDisplayedValue[];
        } | {
            propertyName: string;
            modelName: string;
            defaultVal: boolean;
        })[];
        width: ko.Observable<number> | ko.Computed<number>;
        autoWidthMode: ko.Observable<string>;
    }
    export class CellMatrixHelper {
        constructor(cells: DevExpress.Reporting.Designer.Controls.XRCrossTabCellViewModel[]);
        findRowCell(i: any, j: any, span?: number): any;
        findColumnCell(i: any, j: any, span?: number): any;
        matrix: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell[][];
        columnCount: number;
        rowCount: number;
    }
    interface IDefenitionFinder {
        cell: DevExpress.Reporting.Designer.Controls.CrossTab.ICrossTabCell;
        defenition: CrossTabDefinitionsModel;
    }
    export class DefenitionUpdater extends Disposable {
        private _columnDefinitions;
        private _rowDefinitions;
        private _serializer;
        constructor(crossTab: DevExpress.Reporting.Designer.Controls.XRCrossTabViewModel);
        findDefinition(array: IDefenitionFinder[], cell: any): IDefenitionFinder;
        update(cells: DevExpress.Reporting.Designer.Controls.XRCrossTabCellViewModel[], width: number, height: number): {
            columnDefs: CrossTabColumnDefinitionsModel[];
            rowDefs: CrossTabRowDefinitionsModel[];
        };
    }
    export {};
}
declare module DevExpress.Reporting.Viewer.Mobile.Internal {
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import PreviewPage = DevExpress.Reporting.Viewer.Internal.PreviewPage;
    import IPreviewPageViewModel = DevExpress.Reporting.Viewer.Internal.IPreviewPageViewModel;
    import IBrickNode = DevExpress.Reporting.Viewer.Utils.IBrickNode;
    import MobileReportPreview = DevExpress.Reporting.Viewer.Mobile.MobileReportPreview;
    import BaseRenderingModel = DevExpress.Analytics.Serializer.Native.BaseRenderingModel;
    import IViewModel = DevExpress.Analytics.Serializer.Native.IViewModel;
    import IMobileReportPreviewViewModel = DevExpress.Reporting.Viewer.Mobile.IMobileReportPreviewViewModel;
    import GalleryModel = DevExpress.Reporting.Viewer.Mobile.Internal.GalleryModel;
    import IAbsolutePosition = DevExpress.Reporting.Viewer.Mobile.Internal.IAbsolutePosition;
    import IGalleryViewModel = DevExpress.Reporting.Viewer.Mobile.Internal.IGalleryViewModel;
    import GalleryItem = DevExpress.Reporting.Viewer.Mobile.Internal.GalleryItem;
    import GalleryItemBlock = DevExpress.Reporting.Viewer.Mobile.Internal.GalleryItemBlock;
    import IGalleryItemViewModel = DevExpress.Reporting.Viewer.Mobile.Internal.IGalleryItemViewModel;
    import OptionChangedEvent = DevExpress.ui.dxGallery.OptionChangedEvent;
    import ISearchViewModel = DevExpress.Reporting.Viewer.Internal.ISearchViewModel;
    import SearchViewModel = DevExpress.Reporting.Viewer.Internal.SearchViewModel;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import IJQueryWrapper = DevExpress.Analytics.Internal.IJQueryWrapper;
    import ValueChangedEvent = DevExpress.ui.dxTextBox.ValueChangedEvent;
    import PreviewParameterHelper = DevExpress.Reporting.Viewer.Parameters.PreviewParameterHelper;
    import IPreviewViewModelBase = DevExpress.Reporting.Viewer.Internal.IPreviewViewModelBase;
    import PreviewDisposableModel = DevExpress.Reporting.Viewer.Internal.PreviewDisposableModel;
    import IMobilePaginatorViewModel = DevExpress.Reporting.Viewer.Mobile.Internal.IMobilePaginatorViewModel;
    import MobilePaginator = DevExpress.Reporting.Viewer.Mobile.Internal.MobilePaginator;
    import IMobileDesignerModel = DevExpress.Reporting.Viewer.Mobile.Internal.IMobileDesignerModel;
    import MobileSearchViewModel = DevExpress.Reporting.Viewer.Mobile.Internal.MobileSearchViewModel;
    import ExportOptionsModel = DevExpress.Reporting.Viewer.Export.ExportOptionsModel;
    import PreviewParametersViewModel = DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel;
    import IPreviewCustomizationHandler = DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler;
    import MobilePreviewModel = DevExpress.Reporting.Viewer.Mobile.Internal.MobilePreviewModel;
    import ValueChangedEvent = DevExpress.ui.dxSelectBox.ValueChangedEvent;
    import HiddenEvent = DevExpress.ui.dxPopup.HiddenEvent;
    import ButtonStyle = ;
    null.ButtonStyle;
    import IDateRangeEditorViewModel = DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorViewModel;
    import IDateRangeEditorItem = DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorItem;
    import DateRangeParemeterPopupModel = DevExpress.Reporting.Viewer.Mobile.Internal.DateRangeParemeterPopupModel;
    import ParametersPopupModel = DevExpress.Reporting.Viewer.Mobile.Internal.ParametersPopupModel;
    import ParametersPopupModelBase = DevExpress.Reporting.Viewer.Mobile.Internal.ParametersPopupModelBase;
    import DateRangeEditor = DevExpress.Reporting.Viewer.Widgets.DateRangeEditor;
    import ObjectProperties = DevExpress.Analytics.Widgets.ObjectProperties;
    import IDateRangeParemeterPopupViewModel = DevExpress.Reporting.Viewer.Mobile.Internal.IDateRangeParemeterPopupViewModel;
    import IDateRangePopupButton = DevExpress.Reporting.Viewer.Mobile.Internal.IDateRangePopupButton;
    import IParametersPopupAction = DevExpress.Reporting.Viewer.Mobile.Internal.IParametersPopupAction;
    import IParametersPopupButton = DevExpress.Reporting.Viewer.Mobile.Internal.IParametersPopupButton;
    import IParametersPopupViewModelBase = DevExpress.Reporting.Viewer.Mobile.Internal.IParametersPopupViewModelBase;
    import ClickEvent = ;
    null.ClickEvent;
    import IPreviewModelBase = DevExpress.Reporting.Viewer.Internal.IPreviewModelBase;
    import IBindingSettings = DevExpress.Reporting.Viewer.Utils.IBindingSettings;
    import dxGallery = DevExpress.ui.dxGallery;
    import ISlideOptions = DevExpress.Reporting.Viewer.Mobile.ISlideOptions;
    import IZoomOptions = DevExpress.Reporting.Viewer.Mobile.IZoomOptions;
    import IMobileSearchViewModel = DevExpress.Reporting.Viewer.Mobile.Internal.IMobileSearchViewModel;
    export interface IMobilePageViewModel extends IPreviewPageViewModel {
        readerMode: boolean;
        hasBricks: boolean;
    }
    export class MobilePreviewPage extends PreviewPage {
        deferredUpdateViewModel(): boolean;
        createViewModel(): IMobilePageViewModel;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<MobilePreviewPage> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<MobilePreviewPage>): void;
        constructor(preview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview, pageIndex: number, processClick?: (target: DevExpress.Reporting.Viewer.Utils.IBrickNode) => void, subscribeToPageLoading?: boolean);
        hasBricks: boolean;
        readerMode: boolean;
        maxZoom: number;
    }
    export interface IGalleryItemBlock {
        repaint?: boolean;
        page: DevExpress.Reporting.Viewer.Internal.PreviewPage | DevExpress.Reporting.Viewer.Internal.IPreviewPageViewModel;
        classSet?: any;
        visible?: boolean;
        position: DevExpress.Reporting.Viewer.Mobile.Internal.IAbsolutePosition;
        reportPreview: DevExpress.Reporting.Viewer.Mobile.IMobileReportPreviewViewModel;
    }
    export interface IGalleryItemBlockViewModel extends IViewModel, IGalleryItemBlock {
        page: DevExpress.Reporting.Viewer.Internal.IPreviewPageViewModel;
        active: boolean;
    }
    export interface IGalleryItemViewModel extends IViewModel {
        blocks: IGalleryItemBlockViewModel[];
        reportPreview: DevExpress.Reporting.Viewer.Mobile.IMobileReportPreviewViewModel;
        gallery: DevExpress.Reporting.Viewer.Mobile.Internal.IGalleryViewModel;
    }
    export class GalleryItemBlock extends BaseRenderingModel<IGalleryItemBlockViewModel> {
        deferredUpdateViewModel(): boolean;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<GalleryItemBlock>): void;
        createViewModel(): IGalleryItemBlockViewModel;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<GalleryItemBlock> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<GalleryItemBlock>): void;
        constructor(options: IGalleryItemBlock);
        repaint?: boolean;
        page: DevExpress.Reporting.Viewer.Internal.PreviewPage;
        classSet?: any;
        visible?: boolean;
        position: DevExpress.Reporting.Viewer.Mobile.Internal.IAbsolutePosition;
        active: boolean;
        preview: DevExpress.Reporting.Viewer.Mobile.IMobileReportPreviewViewModel;
    }
    export class GalleryItem extends BaseRenderingModel<DevExpress.Reporting.Viewer.Mobile.Internal.IGalleryItemViewModel> {
        deferredUpdateViewModel(): boolean;
        createViewModel(): DevExpress.Reporting.Viewer.Mobile.Internal.IGalleryItemViewModel;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<GalleryItem> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<GalleryItem>): void;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<GalleryItem>): void;
        constructor(preview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview, gallery: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryModel);
        blocks: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryItemBlock[];
        realIndex?: number;
        preview: DevExpress.Reporting.Viewer.Mobile.IMobileReportPreviewViewModel;
        gallery: DevExpress.Reporting.Viewer.Mobile.Internal.IGalleryViewModel;
        enabled: boolean;
    }
    export interface IAbsolutePosition {
        left: number;
        top: number;
        height: number;
        width: number;
    }
    export interface IGalleryViewModel extends IViewModel {
        items: DevExpress.Reporting.Viewer.Mobile.Internal.IGalleryItemViewModel[];
        animationEnabled: boolean;
        selectedIndex: number;
        onOptionChanged: (event: DevExpress.ui.dxGallery.OptionChangedEvent) => void;
    }
    export class GalleryModel extends BaseRenderingModel<DevExpress.Reporting.Viewer.Mobile.Internal.IGalleryViewModel> {
        preview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview;
        deferredUpdateViewModel(): boolean;
        private _spacing;
        private _animationTimeout;
        private _currentItemSubscriptionDispose;
        private _createBlock;
        createViewModel(): DevExpress.Reporting.Viewer.Mobile.Internal.IGalleryViewModel;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<GalleryModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<GalleryModel>): void;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<GalleryModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<GalleryModel>): void;
        updateContentSize(): void;
        constructor(preview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview);
        dispose(): void;
        updatePagesVisible(preview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview): void;
        updateCurrentBlock(): void;
        updateContent(preview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview, pagesCount: number): void;
        updateBlockPositions(blocks: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryItemBlock[], visible: boolean): void;
        updateStartBlocks(galleryItem: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryItem, pages: DevExpress.Reporting.Viewer.Internal.PreviewPage[]): number;
        updateLastBlocks(galleryItem: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryItem, pages: DevExpress.Reporting.Viewer.Internal.PreviewPage[]): number;
        updateBlocks(galleryItem: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryItem, pagesCount: number, preview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview, index: number, useAnimation?: boolean): void;
        changePage(preview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview): void;
        repaint: object;
        _repaint: () => void;
        repaintTimeout: ReturnType<typeof setTimeout>;
        contentSize: {
            width: string;
            height: string;
        };
        horizontal: number;
        vertical: number;
        pageCount: number;
        isAnimated: boolean;
        items: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryItem[];
        currentBlockText: string;
        selectedIndexReal: number;
        selectedIndex: number;
        animationEnabled: boolean;
        getSwipeRightEnabled: () => boolean;
        getSwipeLeftEnabled: () => boolean;
    }
    export interface IMobileSearchViewModel extends ISearchViewModel {
        enabled: boolean;
        editorVisible: boolean;
        tapToSearchText: string;
        height: number;
        searchText: string;
        focusEditor: (sender: any, event: any) => void;
        startSearch: () => void;
        onSearchTextChanged: (event: DevExpress.ui.dxSelectBox.ValueChangedEvent) => void;
    }
    export class MobileSearchViewModel extends SearchViewModel {
        gallery: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryModel;
        static maxHeight: number;
        focusEditor(event: any): void;
        private _updateBricks;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<MobileSearchViewModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<MobileSearchViewModel>): void;
        createViewModel(): DevExpress.Reporting.Viewer.Mobile.Internal.IMobileSearchViewModel;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<MobileSearchViewModel> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<MobileSearchViewModel>): void;
        constructor(reportPreview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview, gallery: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryModel);
        updatePagesInBlocks(blocks: Array<DevExpress.Reporting.Viewer.Mobile.Internal.GalleryItemBlock>): void;
        stopSearching(): void;
        startSearch(): void;
        editorVisible: boolean;
        height: number;
        searchPanelVisible: boolean;
        enabled: boolean;
        reportPreview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview;
    }
    export class SearchBarModel extends Disposable {
        private viewModel;
        constructor(viewModel: DevExpress.Reporting.Viewer.Mobile.Internal.MobileSearchViewModel, element: HTMLDivElement, $searchText: DevExpress.Analytics.Internal.IJQueryWrapper);
        dispose(): void;
    }
    export interface IMobilePaginatorViewModel extends IViewModel {
        visible: boolean;
        text: string;
    }
    export class MobilePaginator extends BaseRenderingModel<DevExpress.Reporting.Viewer.Mobile.Internal.IMobilePaginatorViewModel> {
        reportPreview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview;
        gallery: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryModel;
        private _updateVisibility;
        private _updateText;
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<MobilePaginator> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<MobilePaginator>): void;
        createViewModel(): DevExpress.Reporting.Viewer.Mobile.Internal.IMobilePaginatorViewModel;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<any> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<any>): void;
        initialize(element: HTMLElement): void;
        constructor(reportPreview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview, gallery: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryModel);
        visible: boolean;
        text: string;
    }
    export function updatePreviewContentSizeMobile(mobilePreview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview, $root: JQuery<Element>): () => void;
    export const editorTemplates: {
        rangeEditor: {
            header: string;
        };
    };
    export class MobilePreviewParameterHelper extends PreviewParameterHelper {
        getRangeEditor(): {
            header: string;
        };
    }
    export interface IMobilePreviewViewModel extends IPreviewViewModelBase {
        paginator: DevExpress.Reporting.Viewer.Mobile.Internal.IMobilePaginatorViewModel;
        searchModel: DevExpress.Reporting.Viewer.Internal.ISearchViewModel;
    }
    export class MobilePreviewModel extends PreviewDisposableModel {
        deferredUpdateViewModel(): boolean;
        gallery: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryModel;
        paginator: DevExpress.Reporting.Viewer.Mobile.Internal.MobilePaginator;
        availableFormats: Array<{
            text: string;
            format: string;
        }>;
        constructor(options: DevExpress.Reporting.Viewer.Mobile.Internal.IMobileDesignerModel);
        createViewModel(): IMobilePreviewViewModel;
        reportPreviewViewModel: DevExpress.Reporting.Viewer.Mobile.IMobileReportPreviewViewModel;
        reportPreview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview;
        searchModel: DevExpress.Reporting.Viewer.Mobile.Internal.MobileSearchViewModel;
        getViewModel: () => IMobilePreviewViewModel;
    }
    export interface IMobileActionContent {
        name: string;
        data: any;
        dispose?: () => void;
    }
    export interface IMobileAction {
        imageClassName: string;
        imageTemplateName: string;
        clickAction: () => void;
        visible?: boolean;
        content?: IMobileActionContent;
    }
    export interface IMobileActionListViewModel extends IViewModel {
        visible: boolean;
        actions: IMobileAction[];
    }
    export class MobileActionList extends BaseRenderingModel<IMobileActionListViewModel> {
        actions: IMobileAction[];
        constructor(actions: IMobileAction[], reportPreview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview);
        createViewModel(): IMobileActionListViewModel;
        updateViewModel(): void;
        onPropertyChanged(): void;
        dispose(): void;
        visible: boolean;
    }
    export interface IPreviewActionsMobileOptions {
        designerModel: DevExpress.Reporting.Viewer.Mobile.Internal.MobilePreviewModel;
        reportPreview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview;
        exportModel: DevExpress.Reporting.Viewer.Export.ExportOptionsModel;
        parametersModel: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel;
        searchModel: DevExpress.Reporting.Viewer.Mobile.Internal.MobileSearchViewModel;
        exportTypes: {
            text: string;
            format: string;
        }[];
        callbacks: DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler;
    }
    export interface IMobileExportAction {
        visible: boolean;
        items: {
            text: string;
            action: () => void;
        }[];
    }
    export function getPreviewActionsMobile(options: IPreviewActionsMobileOptions): MobileActionList;
    export interface IParametersPopupAction {
        className: string;
        action: (params: any) => void;
        disabled: boolean;
        visible: boolean;
    }
    export interface IParametersPopupButton extends IParametersPopupAction {
        text: string;
        id: "dxrv-mobile-reset" | "dxrv-mobile-cancel" | "dxrv-mobile-submit" | string;
    }
    export interface IParametersPopupViewModelBase extends IViewModel {
        className: string;
        title: string;
        contentTemplate: string;
        model: any;
        visible: boolean;
        showIcons: boolean;
        cancelDisabled: boolean;
        actionButtons: DevExpress.Reporting.Viewer.Mobile.Internal.IParametersPopupButton[];
        actionIcons: DevExpress.Reporting.Viewer.Mobile.Internal.IParametersPopupAction[];
        cacheElementContent: (element: HTMLElement) => void;
        onHidden: (event: DevExpress.ui.dxPopup.HiddenEvent) => void;
    }
    export function createParametersPopupBaseViewModel(this: DevExpress.Reporting.Viewer.Mobile.Internal.ParametersPopupModelBase, base: DevExpress.Analytics.Serializer.Native.IViewModel): DevExpress.Reporting.Viewer.Mobile.Internal.IParametersPopupViewModelBase;
    export function createParametersPopupViewModel(this: DevExpress.Reporting.Viewer.Mobile.Internal.ParametersPopupModel, base: DevExpress.Analytics.Serializer.Native.IViewModel): DevExpress.Reporting.Viewer.Mobile.Internal.IParametersPopupViewModelBase;
    export interface IDateRangeParemeterPopupViewModel extends IParametersPopupViewModelBase {
        startButton: DevExpress.Reporting.Viewer.Mobile.Internal.IDateRangePopupButton;
        endButton: DevExpress.Reporting.Viewer.Mobile.Internal.IDateRangePopupButton;
        textRangeValue: string;
        untilText: string;
        fromText: string;
        selectPeriodPlaceholder: string;
        onTextChanged: (event: DevExpress.ui.dxSelectBox.ValueChangedEvent) => void;
    }
    export interface IDateRangePopupButton {
        text: string;
        focused: boolean;
        stylingMode: null;
        ButtonStyle;
        focusStateEnabled: boolean;
        activeStateEnabled: boolean;
        onClick: () => void;
    }
    export interface IDateRangeEditorMobileViewModel extends IDateRangeEditorViewModel {
        popupModel: DevExpress.Reporting.Viewer.Mobile.Internal.IDateRangeParemeterPopupViewModel;
        items: DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorItem[];
    }
    export function createDateRangeParemeterPopupViewModel(this: DevExpress.Reporting.Viewer.Mobile.Internal.DateRangeParemeterPopupModel, base: DevExpress.Analytics.Serializer.Native.IViewModel): DevExpress.Reporting.Viewer.Mobile.Internal.IDateRangeParemeterPopupViewModel;
    export interface IParamtersPopupFormModel {
        visible: boolean;
        submit?: () => void;
        reset?: () => void;
        cancel?: () => void;
    }
    export class ParametersPopupModelBase extends BaseRenderingModel<DevExpress.Reporting.Viewer.Mobile.Internal.IParametersPopupViewModelBase> {
        _formModel: IParamtersPopupFormModel;
        private _parametersButtonContaner;
        _cancelButton: DevExpress.Reporting.Viewer.Mobile.Internal.IParametersPopupButton;
        _cancelAction: DevExpress.Reporting.Viewer.Mobile.Internal.IParametersPopupAction;
        _submitButton: DevExpress.Reporting.Viewer.Mobile.Internal.IParametersPopupButton;
        _submit: (params: ClickEvent) => void;
        _reset: () => void;
        _cancel: () => void;
        createViewModel(): DevExpress.Reporting.Viewer.Mobile.Internal.IParametersPopupViewModelBase;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<ParametersPopupModelBase>): void;
        onPropertyChanged(): void;
        constructor(_formModel: IParamtersPopupFormModel);
        cacheElementContent(element: HTMLElement): void;
        dispose(): void;
        initVisibilityIcons(): void;
        title: string;
        contentTemplate: string;
        model: any;
        visible: boolean;
        cancelDisabled: boolean;
        showIcons: boolean;
        className: string;
    }
    export class ParametersPopupModel extends ParametersPopupModelBase {
        model: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel;
        private _reportPreview;
        constructor(model: DevExpress.Reporting.Viewer.Parameters.PreviewParametersViewModel, _reportPreview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview);
        createViewModel(): DevExpress.Reporting.Viewer.Mobile.Internal.IParametersPopupViewModelBase;
        objectProperties: DevExpress.Analytics.Widgets.ObjectProperties;
    }
    export class DateRangeParemeterPopupModel extends ParametersPopupModelBase {
        model: DevExpress.Reporting.Viewer.Widgets.DateRangeEditor;
        private _oldStart;
        private _oldEnd;
        constructor(model: DevExpress.Reporting.Viewer.Widgets.DateRangeEditor);
        createViewModel(): DevExpress.Reporting.Viewer.Mobile.Internal.IDateRangeParemeterPopupViewModel;
        setRangeValue(value: DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorItem): void;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs): void;
        startButton: DevExpress.Reporting.Viewer.Mobile.Internal.IDateRangePopupButton;
        endButton: DevExpress.Reporting.Viewer.Mobile.Internal.IDateRangePopupButton;
        editorViewModel: DevExpress.Reporting.Viewer.Widgets.IDateRangeEditorViewModel;
        textRangeValue: string;
        getStringDate: (value: Date) => string;
    }
    export interface IDesignerModelPart {
        id: string;
        templateName: string;
        model: any;
    }
    export interface IMobileDesignerModel extends IPreviewModelBase {
        reportPreview: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview;
        searchModel: DevExpress.Reporting.Viewer.Mobile.Internal.MobileSearchViewModel;
        gallery?: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryModel;
        paginator?: DevExpress.Reporting.Viewer.Mobile.Internal.MobilePaginator;
        availableFormats: {
            text: string;
            format: string;
        }[];
    }
    export function createMobilePreview(bindingSettings: DevExpress.Reporting.Viewer.Utils.IBindingSettings): DevExpress.Reporting.Viewer.Mobile.Internal.MobilePreviewModel;
    export interface BlockItem {
        element: JQuery;
        left: number;
    }
    export interface dxGalleryExtenderType {
        _animationClassName: string;
        blockItems: BlockItem[];
        currentBlockItem: BlockItem;
        gallery: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryModel;
        slideOptions: DevExpress.Reporting.Viewer.Mobile.ISlideOptions;
        nextBlockItem: BlockItem;
        initializeBlockItems: () => void;
        _blockItemsHaveExpired: () => boolean;
        _getNextIndex: (index: number) => number;
        _setSwipeAnimation: (element: BlockItem, difference: any, offset: any, right: boolean) => void;
        _addAnimation: (item: any) => void;
        _restoreDefault: (item: BlockItem) => void;
        _getItem: (index: number, loopTest: boolean) => BlockItem;
        swipeEnabled: boolean;
    }
    export class dxGalleryExtender {
        private _gallery;
        constructor(_gallery: dxGalleryReportPreview);
        extend(element: Element): void;
        private _extendCtor;
        private _extendRepaint;
        private _extend_blockItemsHaveExpired;
        private _extend_swipeStartHandler;
        private _extend_getNextIndex;
        private _extend_setSwipeAnimation;
        private _extend_addAnimation;
        private _extend_restoreDefault;
        private _extend_getItem;
        private _extend_swipeUpdateHandler;
        private _extend_swipeEndHandler;
        private _extend_endSwipe;
    }
    export class dxGalleryReportPreview extends dxGallery implements dxGalleryExtenderType {
        constructor(element: any, options: any);
        _getItem: (index: number, loopTest: boolean) => BlockItem;
        _restoreDefault: (item: BlockItem) => void;
        _addAnimation: (item: any) => void;
        _blockItemsHaveExpired: () => boolean;
        _setSwipeAnimation: (element: BlockItem, difference: any, offset: any, right: boolean) => void;
        _getNextIndex: (index: number) => number;
        _animationClassName: string;
        blockItems: BlockItem[];
        currentBlockItem: BlockItem;
        gallery: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryModel;
        slideOptions: DevExpress.Reporting.Viewer.Mobile.ISlideOptions;
        nextBlockItem: BlockItem;
        initializeBlockItems: () => void;
        swipeEnabled: boolean;
    }
    export const slowdownDisctanceFactor = 2.5;
    export const minScale = 0.92;
    export class EventProcessor extends Disposable {
        element: any;
        slideOptions: DevExpress.Reporting.Viewer.Mobile.ISlideOptions;
        private _direction;
        private _startingPositionX;
        private _startingPositionY;
        private _getFirstPageOffset;
        getDirection(x?: any, y?: any): {
            vertical: boolean;
            horizontal: boolean;
            scrollDown: boolean;
        };
        setPosition(x: any, y: any): void;
        initialize(x: number, y: number): void;
        start(e: JQueryEventObject): void;
        move(e: JQueryEventObject): void;
        end(e: JQueryEventObject): void;
        constructor(element: any, slideOptions: DevExpress.Reporting.Viewer.Mobile.ISlideOptions);
        applySearchAnimation(value: any): void;
        isLeftMove: boolean;
        isRightMove: boolean;
        latestY: number;
        latestX: number;
        $window: any;
        $element: JQuery;
        $gallery: JQuery<Element>;
        $galleryblocks: JQuery<Element>;
        $body: JQuery;
        firstMobilePageOffset: {
            left: number;
            top: number;
        };
    }
    export function initializeMobileZoomBinding(element: HTMLElement, options: DevExpress.Reporting.Viewer.Mobile.IZoomOptions): void;
    export function initializeSlideBinding(element: HTMLElement, options: DevExpress.Reporting.Viewer.Mobile.ISlideOptions): () => void;
    export function initializeMobileSearchBinding(element: HTMLDivElement, viewModel: DevExpress.Reporting.Viewer.Mobile.Internal.IMobileSearchViewModel): () => void;
    export function initializeMobilePaginatorBinding(element: HTMLElement, viewModel: DevExpress.Reporting.Viewer.Mobile.Internal.IMobilePaginatorViewModel): void;
    export {};
}
declare module DevExpress.Reporting.Viewer.Mobile {
    import ArrayPropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs;
    import PropertyChangedEventArgs = DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs;
    import OptionChangedEvent = DevExpress.ui.dxGallery.OptionChangedEvent;
    import SelectionChangedEvent = DevExpress.ui.dxGallery.SelectionChangedEvent;
    import dxScrollViewOptions = DevExpress.ui.dxScrollView.dxScrollViewOptions;
    import IReportPreviewViewModel = DevExpress.Reporting.Viewer.IReportPreviewViewModel;
    import IGalleryViewModel = DevExpress.Reporting.Viewer.Mobile.Internal.IGalleryViewModel;
    import ISlideOptions = DevExpress.Reporting.Viewer.Mobile.ISlideOptions;
    import MobileReportPreview = DevExpress.Reporting.Viewer.Mobile.MobileReportPreview;
    import ReportPreview = DevExpress.Reporting.Viewer.ReportPreview;
    import PreviewRequestWrapper = DevExpress.Reporting.Viewer.Internal.PreviewRequestWrapper;
    import PreviewHandlersHelper = DevExpress.Reporting.Viewer.Internal.PreviewHandlersHelper;
    import IPreviewCustomizationHandler = DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler;
    import IMobileModeSettings = DevExpress.Reporting.Viewer.Utils.IMobileModeSettings;
    import IExportSettings = DevExpress.Reporting.Viewer.Utils.IExportSettings;
    import IBrickNode = DevExpress.Reporting.Viewer.Utils.IBrickNode;
    import MobilePreviewPage = DevExpress.Reporting.Viewer.Mobile.Internal.MobilePreviewPage;
    import ScrollEvent = DevExpress.ui.dxScrollView.ScrollEvent;
    import INumericSize = DevExpress.Analytics.Elements.INumericSize;
    import MobileSearchViewModel = DevExpress.Reporting.Viewer.Mobile.Internal.MobileSearchViewModel;
    import GalleryModel = DevExpress.Reporting.Viewer.Mobile.Internal.GalleryModel;
    import BreadcrumbModel = DevExpress.Reporting.Viewer.Internal.BreadcrumbModel;
    export interface IZoomOptions {
        setZoomUpdating: (newValue: boolean) => void;
        getZoom: () => number;
        setZoom: (newValue: number) => void;
    }
    export interface IScrollViewOptions extends dxScrollViewOptions {
        pushBackValue: string;
    }
    export interface IMobileReportPreviewViewModel extends IReportPreviewViewModel {
        mobileZoomOptions: IZoomOptions;
        zoomUpdating: boolean;
        previewWrapperSizeHeight: number;
        previewWrapperSizeWidth: number;
        surfaceEvents: string;
        galleryEvents: string;
        pageEvents: string;
        slideOptions: DevExpress.Reporting.Viewer.Mobile.ISlideOptions;
        gallery: DevExpress.Reporting.Viewer.Mobile.Internal.IGalleryViewModel;
        topOffset: number;
        scrollViewOptions: IScrollViewOptions;
        onSlide: (event: DevExpress.ui.dxGallery.SelectionChangedEvent) => void;
        onOptionChanged: (event: DevExpress.ui.dxGallery.OptionChangedEvent) => void;
        click: () => void;
    }
    export function createMobileReportPreviewViewModel(this: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview, base: DevExpress.Reporting.Viewer.IReportPreviewViewModel): IMobileReportPreviewViewModel;
    export function updateMobileReportPreviewViewModel(this: DevExpress.Reporting.Viewer.Mobile.MobileReportPreview, args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<MobileReportPreview> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<MobileReportPreview>): void;
    export interface ISlideOptions {
        getDisabled: () => boolean;
        readerMode: boolean;
        animationSettings: IPreviewAnimationSettings;
        getRepaintTimeout: () => ReturnType<typeof setTimeout>;
        setRepaintTimeout: (value: ReturnType<typeof setTimeout>) => void;
        searchPanel: DevExpress.Reporting.Viewer.Mobile.Internal.MobileSearchViewModel;
        getReachedTop: () => boolean;
        getReachedLeft: () => boolean;
        getReachedRight: () => boolean;
        getZoomUpdating: () => boolean;
        setZoomUpdating: (value: boolean) => void;
        getGalleryIsAnimated: () => boolean;
        setAutoFitBy: (value: number) => void;
        getTopOffset: () => number;
        setTopOffset: (value: number) => void;
        getBrickEventsDisabled: () => boolean;
        setBrickEventsDisabled: (value: boolean) => void;
        getSwipeEnabled: () => boolean;
        getScrollAvailable: () => boolean;
    }
    export interface IPreviewAnimationSettings {
        zoomEnabled: boolean;
        swipeEnabled: boolean;
    }
    export class MobileReportPreview extends ReportPreview {
        deferredUpdateViewModel(): boolean;
        private _getSwipeEnabled;
        private _getScrollAvailable;
        constructor(handlerUri?: string, previewRequestWrapper?: DevExpress.Reporting.Viewer.Internal.PreviewRequestWrapper, previewHandlersHelper?: DevExpress.Reporting.Viewer.Internal.PreviewHandlersHelper, callbacks?: DevExpress.Reporting.Viewer.Utils.IPreviewCustomizationHandler, rtl?: boolean, mobileSettings?: DevExpress.Reporting.Viewer.Utils.IMobileModeSettings, breadcrumb?: DevExpress.Reporting.Viewer.Internal.BreadcrumbModel, exportSettings?: DevExpress.Reporting.Viewer.Utils.IExportSettings);
        onPropertyChanged(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<MobileReportPreview>): void;
        createViewModel(): DevExpress.Reporting.Viewer.IReportPreviewViewModel;
        updateViewModel(args: DevExpress.Analytics.Serializer.Native.PropertyChangedEventArgs<MobileReportPreview> | DevExpress.Analytics.Serializer.Native.ArrayPropertyChangedEventArgs<MobileReportPreview>): void;
        setZoomUpdating(newValue: boolean): void;
        createPage(pageIndex: number, processClick?: (target: DevExpress.Reporting.Viewer.Utils.IBrickNode) => void, subscribeToPageLoading?: boolean): DevExpress.Reporting.Viewer.Mobile.Internal.MobilePreviewPage;
        createBrickClickProcessor(cyclePageIndex: number): (brick: DevExpress.Reporting.Viewer.Utils.IBrickNode) => void;
        _hasActiveEditingFields(): boolean;
        showActions(): void;
        onSlide(e: DevExpress.ui.dxGallery.SelectionChangedEvent): void;
        goToPage(pageIndex: number, forcePage?: boolean): void;
        setScrollReached(e: DevExpress.ui.dxScrollView.ScrollEvent): void;
        initializeSlideOptions(searchModel: DevExpress.Reporting.Viewer.Mobile.Internal.MobileSearchViewModel, gallery: DevExpress.Reporting.Viewer.Mobile.Internal.GalleryModel): void;
        slideOptions: DevExpress.Reporting.Viewer.Mobile.ISlideOptions;
        readerMode: boolean;
        animationSettings: IPreviewAnimationSettings;
        pages: DevExpress.Reporting.Viewer.Mobile.Internal.MobilePreviewPage[];
        topOffset: number;
        previewWrapperSize: DevExpress.Analytics.Elements.INumericSize;
        interactionDisabled: boolean;
        availablePages: number[];
        visiblePages: DevExpress.Reporting.Viewer.Mobile.Internal.MobilePreviewPage[];
        searchPanelVisible: boolean;
        actionsVisible: boolean;
        scrollReachedLeft: boolean;
        scrollReachedRight: boolean;
        scrollReachedTop: boolean;
        scrollReachedBottom: boolean;
        zoomUpdating: boolean;
        mobileZoom: number;
        mobileZoomRead: number;
        brickEventsDisabled: boolean;
        scrollAvailable: boolean;
    }
}
declare module DevExpress.Reporting.Designer.Settings {
    import IGlobalSubscribableValue = DevExpress.Analytics.Internal.IGlobalSubscribableValue;
    export interface IPropertyGridSettings {
        QuickActionsVisible: DevExpress.Analytics.Internal.IGlobalSubscribableValue<boolean>;
        TaskGroupVisible: DevExpress.Analytics.Internal.IGlobalSubscribableValue<boolean>;
    }
    export const PropertyGrid: IPropertyGridSettings;
    export const SmartTagsEnabled: DevExpress.Analytics.Internal.IGlobalSubscribableValue<boolean>;
    export const ContextMenusEnabled: DevExpress.Analytics.Internal.IGlobalSubscribableValue<boolean>;
}
declare module DevExpress.Reporting.Designer.Internal.HtmlMarkUp {
    export interface IDiplayNameParameters {
        text: string;
        wordWrap?: boolean;
        fontSize?: number;
        fontUnit?: string;
    }
    export interface IInheritValues {
        fontSize?: number;
        backcolor?: boolean;
    }
    export interface ITag {
        node: Element;
        element: HTMLElement;
        createElement: () => any;
        appendTo: (el: HTMLElement) => void;
        hasChildNodes: boolean;
        setProperties: (parameters?: IDiplayNameParameters, inheritValues?: IInheritValues) => any;
        value?: any;
        inheritValues: IInheritValues;
    }
    export class ValueConverter {
        private _displayNameParameters;
        static ValueAttrName: string;
        private _regExp;
        private _createTag;
        private _parceToXml;
        private _checkValidTag;
        private _createTree;
        constructor(_displayNameParameters: IDiplayNameParameters);
        appendTo(element: HTMLElement): void;
    }
}
declare module DevExpress.Reporting.Designer.Widgets.Internal {
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import ISerializationInfo = DevExpress.Analytics.Utils.ISerializationInfo;
    import ISerializationInfoArray = DevExpress.Analytics.Utils.ISerializationInfoArray;
    import ObjectProperties = DevExpress.Analytics.Widgets.ObjectProperties;
    import XRControlViewModel = DevExpress.Reporting.Designer.Controls.XRControlViewModel;
    import WrappedExpressionOptions = DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions;
    export interface ISummaryOptions {
        ignoreNullValues: ko.Observable<boolean> | ko.Computed<boolean>;
        treatStringsAsNumerics: ko.Observable<boolean> | ko.Computed<boolean>;
        Running: ko.Observable<string> | ko.Computed<string>;
    }
    export class SummaryEditorPopup {
        dispose(): void;
        model: ko.Observable<SummaryEditorModel>;
        grid: DevExpress.Analytics.Widgets.ObjectProperties;
        visible: ko.Observable<boolean>;
        isValid: ko.Computed<boolean>;
        container: (element: HTMLElement) => any;
        buttons: ({
            toolbar: string;
            location: string;
            widget: string;
            options: {
                text: any;
                type: string;
                stylingMode: string;
                onClick: () => void;
                disabled: ko.Computed<boolean>;
            };
        } | {
            toolbar: string;
            location: string;
            widget: string;
            options: {
                text: any;
                type: string;
                stylingMode: string;
                onClick: () => void;
                disabled?: undefined;
            };
        })[];
    }
    export class SummaryEditorModel extends Disposable {
        private _control;
        dispose(): void;
        private _summary;
        private _order;
        private _summaryFunctionValues;
        private _info;
        private _initExpressionValues;
        getInfo(): DevExpress.Analytics.Utils.ISerializationInfoArray;
        constructor(_control: DevExpress.Reporting.Designer.Controls.XRControlViewModel);
        patchSerializationInfo(info: DevExpress.Analytics.Utils.ISerializationInfo): void;
        applyChanges(): void;
        isPropertyDisabled(propertyName: string): boolean;
        isDisabled(): boolean;
        Func: ko.Observable<string>;
        calculate: DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions;
        weight: DevExpress.Reporting.Designer.Internal.WrappedExpressionOptions;
        ignoreNullValues: ko.Observable<boolean> | ko.Computed<boolean>;
        treatStringsAsNumerics: ko.Observable<boolean> | ko.Computed<boolean>;
        Running: ko.Observable<string> | ko.Computed<string>;
    }
}
declare module DevExpress.Reporting.Designer.Controls.RichEdit {
    import EventManager = DevExpress.Analytics.Utils.EventManager;
    import RichEdit = DevExpress.RichEdit.RichEdit;
    import richEditInstanceImported = DevExpress.RichEdit;
    import ISurfaceContext = DevExpress.Analytics.Elements.ISurfaceContext;
    import XRControlSurface = DevExpress.Reporting.Designer.Controls.XRControlSurface;
    import XRRichViewModel = DevExpress.Reporting.Designer.Controls.XRRichViewModel;
    import XRRichController = DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichController;
    import XRRichEditControlModel = DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichEditControlModel;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    export type ToolbarActionType = "ButtonGroup" | "Button" | "ComboBox" | "ColorBox";
    export const ToolbarActionId: {
        ParagraphAlignmentButtonGroup: string;
        HyperlinkButton: string;
        ClearFormattingButton: string;
        FontStyleButtonGroup: string;
        ToggleCaseButton: string;
        FontSizeComboBox: string;
        FontComboBox: string;
        FontColorBox: string;
        BackgroundColorBox: string;
    };
    export const ToolbarGroupId: {
        AlignmentAndFormatting: string;
        FontStyleAndCase: string;
        FontSize: string;
        Font: string;
        FontColor: string;
        BackgroundColor: string;
    };
    export interface IToolbarAction {
        id?: string;
        visible?: boolean;
        template?: string;
        text?: string;
        items?: (IToolbarAction | any)[];
        actionType?: ToolbarActionType;
        action?: (rich: DevExpress.RichEdit.RichEdit, value: any) => void;
        hint?: string;
        icon?: string;
        defaultValue?: any;
        selectionMode?: "multiple" | "single";
    }
    export interface IToolbarGroup {
        id: string;
        visible?: boolean;
        template?: string;
        items: (IToolbarAction | any)[];
        title?: string;
    }
    export interface ICustomizeToolbarActionsEventArgs {
        actions: IToolbarAction[];
        getById: (id: string) => IToolbarGroup | IToolbarAction;
    }
    export interface IRichEditEvents {
        "customizeToolbarActions": ICustomizeToolbarActionsEventArgs;
    }
    export const events: DevExpress.Analytics.Internal.IGlobalSubscribableValue<DevExpress.Analytics.Utils.EventManager<any, IRichEditEvents>>;
    export const getRichEditInstance: () => typeof DevExpress.RichEdit;
    export function setRichEditInstance(instance: any): void;
    export const createRichEdit: DevExpress.Analytics.Internal.IGlobalSubscribableValue<(element: any, options: any) => richEditInstanceImported.RichEdit>;
    export const createRichEditOptions: DevExpress.Analytics.Internal.IGlobalSubscribableValue<() => richEditInstanceImported.Options>;
    export class XRRichModernSurface extends XRControlSurface {
        private _convertReady;
        constructor(control: DevExpress.Reporting.Designer.Controls.XRRichViewModel, context: DevExpress.Analytics.Elements.ISurfaceContext);
        createController(richEdit: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichEditControlModel): void;
        isValid: ko.Observable<boolean>;
        defaultStyleunit: ko.Computed;
        controller: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichController;
        serializedRtf: ko.Observable<string>;
    }
    export {};
    interface IRichEditVirtualScrollItem {
        element: HTMLElement;
        model: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichEditControlModel;
    }
    export class RichEditVirtualScroll extends Disposable {
        private _viewPort;
        dispose(): void;
        items: IRichEditVirtualScrollItem[];
        registerViewPort(viewPort: HTMLElement): void;
        registerRichEditControl(element: HTMLElement, model: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichEditControlModel): void;
        unregisterRichEditControl(element: HTMLElement): void;
        updateRich(item: IRichEditVirtualScrollItem, viewPortRect: ClientRect): void;
        updateRichPosition(): void;
    }
    export {};
}
declare module DevExpress.Reporting.Designer.Controls.RichEdit.Internal {
    import InlineTextEdit = DevExpress.Analytics.Internal.InlineTextEdit;
    import CommandId = DevExpress.RichEdit.CommandId;
    import XRRichTextStreamType = DevExpress.Reporting.Designer.Controls.XRRichTextStreamType;
    import IToolbarAction = DevExpress.Reporting.Designer.Controls.RichEdit.IToolbarAction;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import XRRichEditControlModel = DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichEditControlModel;
    import RichAction = DevExpress.Reporting.Designer.Controls.RichEdit.Internal.RichAction;
    import FontModel = DevExpress.Analytics.Widgets.Internal.FontModel;
    import Interval = DevExpress.RichEdit.Interval;
    import RichEdit = DevExpress.RichEdit.RichEdit;
    import XRRichController = DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichController;
    import InlineRichEditControl = DevExpress.Reporting.Designer.Controls.RichEdit.Internal.InlineRichEditControl;
    import RichEditLoadDispatcher = DevExpress.Reporting.Designer.Controls.RichEdit.Internal.RichEditLoadDispatcher;
    import ToolbarSurface = DevExpress.Reporting.Designer.Controls.RichEdit.Internal.Toolbar.ToolbarSurface;
    import INativeRich = DevExpress.Reporting.Designer.Controls.RichEdit.Internal.INativeRich;
    import IRichLoadData = DevExpress.Reporting.Designer.Controls.RichEdit.Internal.IRichLoadData;
    import Locker = DevExpress.Reporting.Internal.Locker;
    import XRRichModernSurface = DevExpress.Reporting.Designer.Controls.RichEdit.XRRichModernSurface;
    import XRRichViewModel = DevExpress.Reporting.Designer.Controls.XRRichViewModel;
    import RichEditFontModel = DevExpress.Reporting.Designer.Controls.RichEdit.Internal.RichEditFontModel;
    import RichEditPaddingModelWrapper = DevExpress.Reporting.Designer.Controls.RichEdit.Internal.RichEditPaddingModelWrapper;
    import RichLoader = DevExpress.Reporting.Designer.Controls.RichEdit.Internal.RichLoader;
    export class InlineRichEditControl extends InlineTextEdit {
    }
    export interface IToolbarComponent extends IToolbarAction {
        command?: DevExpress.RichEdit.CommandId;
        title?: string;
    }
    export enum RichAction {
        OpenDocument = 0,
        SaveDocument = 1,
        NewDocument = 2
    }
    export interface IRichCore {
        commandManager: any;
        model: any;
        viewManager: any;
    }
    export interface INativeRich {
        core: IRichCore;
    }
    export interface IRichLoadData {
        dataFormat: DevExpress.Reporting.Designer.Controls.XRRichTextStreamType;
        data: string;
        oldText: string;
    }
    interface DispatcherData {
        queueAction: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.RichAction;
        ready: () => void;
        documentConverted: (result: string) => void;
        documentFormat: any;
        base64: any;
        errorCallBack: () => void;
    }
    export class RichEditLoadDispatcher extends Disposable {
        protected richEdit: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichEditControlModel;
        constructor(richEdit: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichEditControlModel);
        process(element: DispatcherData): void;
    }
    export {};
    export class XRRichEditControlModel extends Disposable {
        protected _richEdit: DevExpress.RichEdit.RichEdit;
        private disableCommands;
        _dispatcher: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.RichEditLoadDispatcher;
        _element: HTMLElement;
        _toolbar: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.Toolbar.ToolbarSurface;
        _verticalScrollOffset: number;
        _richHeight: number;
        setRichHeight(value: any): void;
        _elementExists(): boolean;
        className: ko.Computed;
        visible: ko.Subscribable<boolean>;
        getToolbar(): DevExpress.Reporting.Designer.Controls.RichEdit.Internal.Toolbar.ToolbarSurface;
        getRealControl(): DevExpress.RichEdit.RichEdit;
        protected getRealControlNative(): DevExpress.Reporting.Designer.Controls.RichEdit.Internal.INativeRich;
        updateCanvasScroll(): void;
        dispose(): void;
        constructor(element: HTMLElement, inlineControl: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.InlineRichEditControl, selected: ko.Subscribable<boolean>);
        executeCommand(commandId: DevExpress.RichEdit.CommandId, parameter?: any, setFocus?: boolean): void;
        insertHtml(html: any): void;
        createOptions(): any;
        private getFonts;
        private getRichEditFonts;
        protected createToolbar(): void;
        saveDocumentNative(documentFormat: number, onResultReady?: (result: any) => void): void;
        newDocumentNative(onResultReady?: () => void): void;
        openDocumentNative(base64: string, documentFormat: number, onResultReady?: () => void, onError?: () => void): void;
        saveDocument(documentFormat: number, onResultReady?: (result: any) => void): void;
        newDocument(onResultReady?: () => void): void;
        openDocument(base64: string, documentFormat: number, onResultReady?: () => void, onError?: () => void): void;
        changeSize(): void;
        focusChanged(inFocus: boolean): void;
        getText(interval?: DevExpress.RichEdit.Interval): string;
        documentIsEmpty(): boolean;
    }
    export class RichLoader extends Disposable {
        protected richEdit: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichEditControlModel;
        protected loadData: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.IRichLoadData;
        _textConverted: (text: string) => void;
        set textConverted(textConverted: (text: string) => void);
        constructor(richEdit: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichEditControlModel);
        load(loadData: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.IRichLoadData): void;
    }
    export class RichEditPaddingModelWrapper extends Disposable {
        private _richEdit;
        private _paddingModel;
        private _setPaddings;
        constructor(padding: ko.Subscribable<string>, _richEdit: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichEditControlModel);
    }
    export class RichEditFontModel extends FontModel {
        richEdit: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichEditControlModel;
        controller: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichController;
        constructor(value: ko.Observable<string> | ko.Computed<string>, richEdit: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichEditControlModel, foreColor: ko.Observable<string> | ko.Computed<string>, controller: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichController);
        protected applyCommand(commandId: DevExpress.RichEdit.CommandId, parameter?: any): void;
    }
    export class XRRichController extends Disposable {
        element: HTMLElement;
        fontModel: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.RichEditFontModel;
        paddingModel: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.RichEditPaddingModelWrapper;
        surface: DevExpress.Reporting.Designer.Controls.RichEdit.XRRichModernSurface;
        richLoader: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.RichLoader;
        locker: DevExpress.Reporting.Internal.Locker;
        richEdit: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichEditControlModel;
        private _oldValidState;
        get controlModel(): DevExpress.Reporting.Designer.Controls.XRRichViewModel;
        createSubscribtions(): void;
        dispose(): void;
        init(): void;
        constructor(richEdit: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.XRRichEditControlModel, xrRichSurfaceModel: DevExpress.Reporting.Designer.Controls.RichEdit.XRRichModernSurface);
        setRtfString(newRtf: string): void;
        private rtfStringChanged;
        checkValidationState(): boolean;
        onVisibilityChanged(newVisibility: boolean): void;
        onDocumentDataChanged(newDocument: string): void;
    }
}
declare module DevExpress.Reporting.Designer.Controls.RichEdit.Internal.Toolbar {
    import getParentContainer = DevExpress.Analytics.Internal.getParentContainer;
    import Disposable = DevExpress.Analytics.Utils.Disposable;
    import CommandId = DevExpress.RichEdit.CommandId;
    import CommandStateChangedEventArgs = DevExpress.RichEdit.CommandStateChangedEventArgs;
    import RichEdit = DevExpress.RichEdit.RichEdit;
    import Locker = DevExpress.Reporting.Internal.Locker;
    import IToolbarAction = DevExpress.Reporting.Designer.Controls.RichEdit.IToolbarAction;
    import IToolbarGroup = DevExpress.Reporting.Designer.Controls.RichEdit.IToolbarGroup;
    import IToolbarComponent = DevExpress.Reporting.Designer.Controls.RichEdit.Internal.IToolbarComponent;
    export interface IValueConverter {
        toModel: (value: any) => any;
        fromModel: (value: any) => any;
    }
    interface IComponentBase {
        template: string;
        id: string;
        visible: boolean;
        items?: ComponentCommon[];
        _updateStateInternal?(commandIdMap?: Record<number, boolean>): void;
    }
    interface IItem extends IToolbarAction {
        command: DevExpress.RichEdit.CommandId;
        value?: any;
    }
    export interface IOptions extends ICommandOptions {
        visible: ko.Subscribable<boolean>;
        fonts: string[];
    }
    interface ICommandOptions {
        commandManager: any;
        executeCommand: (command: DevExpress.RichEdit.CommandId, params?: any, setFocus?: boolean) => void;
        richEditPublic: DevExpress.RichEdit.RichEdit;
    }
    abstract class ComponentCommon extends Disposable implements IComponentBase {
        protected locker: DevExpress.Reporting.Internal.Locker;
        protected options: ICommandOptions;
        protected abstract updateState(): void;
        protected abstract needUpdateState(commandIdMap: Record<number, boolean>): boolean;
        _updateStateInternal(commandIdMap?: Record<number, boolean>): void;
        protected _executeCommand(value?: any, command?: DevExpress.RichEdit.CommandId): any;
        executeCommand(value?: any, command?: number): void;
        constructor(options: ICommandOptions, info: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.IToolbarComponent);
        unwrapItem(item: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.IToolbarComponent): IItem;
        protected getConverter(): IValueConverter;
        init(info?: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.IToolbarComponent): void;
        protected hasCustomValue(): boolean;
        id: string;
        template: string;
        text: string;
        visible: boolean;
        action: (rich: DevExpress.RichEdit.RichEdit, value: any) => void;
        value: ko.Observable;
        itemKey: string;
    }
    export class CustomComponent extends ComponentCommon {
        protected updateState(): void;
        protected needUpdateState(_commandIdMap: Record<number, boolean>): boolean;
    }
    export class Component extends ComponentCommon {
        private _command;
        protected needUpdateState(commandIdMap: Record<number, boolean>): boolean;
        init(info: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.IToolbarComponent): void;
        protected updateState(): void;
        item: IItem;
    }
    export class ComponentButtonGroup extends ComponentCommon {
        constructor(options: any, info?: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.IToolbarComponent);
        protected needUpdateState(commandIdMap: Record<number, boolean>): boolean;
        init(info: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.IToolbarComponent): void;
        private onSelectItems;
        getCommand(item?: IItem): DevExpress.RichEdit.CommandId;
        protected updateState(): void;
        selectedItems: ko.ObservableArray<IItem>;
        selectionMode: "multiple" | "single";
        itemKey: string;
        items: IItem[];
    }
    export class ComponentButton extends Component {
        constructor(options: any, info: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.IToolbarComponent);
        clickAction(): void;
        icon: string;
        hint: string;
    }
    export class ComponentComboBox extends Component {
        constructor(options: any, info: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.IToolbarComponent);
        protected hasCustomValue(): boolean;
        items: any[];
        validationRules: any[];
        supportCustomValue: boolean;
    }
    export class ComponentFontSizeComboBox extends ComponentComboBox {
        validationRules: {
            type: string;
        }[];
        supportCustomValue: boolean;
    }
    export class ComponentColorPicker extends Component {
        constructor(options: any, info: DevExpress.Reporting.Designer.Controls.RichEdit.Internal.IToolbarComponent);
        protected getConverter(): IValueConverter;
        protected hasCustomValue(): boolean;
    }
    export class ComponentCollection implements IToolbarGroup {
        id: any;
        title: string;
        visible: boolean;
        template: string;
        constructor(id: any, title?: string, visible?: boolean, template?: string);
        showTitle: () => string;
        items: IComponentBase[];
    }
    export class ToolbarSurface extends Disposable {
        private _popover;
        private _getDefaultItems;
        private _initComponentCollection;
        private _initComponents;
        private _extendTemplateOptions;
        constructor(options: IOptions);
        onCommandStateChanged(sender: DevExpress.RichEdit.RichEdit, args: DevExpress.RichEdit.CommandStateChangedEventArgs): void;
        onContentReady: (e: DevExpress.Reporting.ContentReadyEvent) => void;
        getPositionTarget: (element: HTMLElement) => any;
        hideOnOutsideClick: (e: any) => boolean;
        template: string;
        parentClass: string;
        visible: ko.Subscribable<boolean>;
        getPopupContainer: typeof DevExpress.Analytics.Internal.getParentContainer;
        componentCollection: ComponentCollection[];
    }
    export {};
}
