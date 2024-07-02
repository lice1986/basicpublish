﻿/**
* DevExpress HTML/JS Reporting (chart\_initializer.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Size } from '@devexpress/analytics-core/analytics-elements';
import { ActionLists, addDisposeCallback, appendStaticContextToRootViewModel, DragHelperContent, FieldListProvider, staticContext } from '@devexpress/analytics-core/analytics-internal';
import { addCultureInfo, getLocalization, TabInfo, TabPanel, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { getTemplate, ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { ChartStructureTreeListController } from './internal/chartStructure/_controller';
import { ChartStructureObjectProvider } from './internal/chartStructure/_provider';
import { legendName } from './internal/meta/_axis';
import { createViewsArray, points, viewBindableSerializationInfo } from './internal/meta/_chart';
import { axisXName, axisYName, paneName } from './internal/meta/_view';
import { editorTemplates } from './internal/_editorTemplates';
import { ChartRequests } from './internal/_requests';
import { chartControlSerializationsInfo, ChartControlViewModel, fakeChartSerializationInfo } from './_control';
import { controlsFactory } from './_controlsFactory';
import { ChartControlSurface } from './_surface';
export const ActionId = {
    Save: 'dxxcd-save'
};
const ChartDesignerElements = {
    Main: 'dx-chart-middlePart',
    Toolbar: 'dxcd-toolbar',
    RightPanel: 'dx-right-panel-lightweight',
    LeftPanel: 'dx-chart-leftPanel'
};
export function registerControls() {
    controlsFactory.registerControl('ChartControl', {
        info: chartControlSerializationsInfo,
        surfaceType: ChartControlSurface,
        type: ChartControlViewModel,
        elementActionsTypes: [],
        isContainer: true,
        nonToolboxItem: true
    });
}
let _chartLimitation = false;
export function _setChartLimitation(chartLimitation) {
    _chartLimitation = chartLimitation;
    viewBindableSerializationInfo.valuesArray = createViewsArray(chartLimitation);
}
function customizeDesignerActions(designerModel, nextCustomizer) {
    const chart = designerModel.model;
    return ((actions) => {
        const save = {
            id: ActionId.Save,
            text: 'Save',
            imageClassName: 'dxrd-image-save',
            imageTemplateName: 'dxrd-svg-menu-save',
            disabled: ko.observable(false),
            visible: true,
            hasSeparator: true,
            hotKey: { ctrlKey: true, keyCode: 'S'.charCodeAt(0) },
            clickAction: () => {
                chart().save();
            }
        };
        actions.splice(0, 0, save);
        nextCustomizer && nextCustomizer(actions);
    });
}
export function updateChartSurfaceContentSize(element, surfaceSize, rtl = false) {
    const $element = $.fn.constructor(element);
    return () => {
        const rightAreaWidth = $element.find('.dxrd-right-panel')[0]['offsetWidth'];
        const leftAreaWidth = $element.find('.dx-chart-left-panel')[0]['offsetWidth'];
        const otherWidth = rightAreaWidth + leftAreaWidth, surfaceWidth = $element.find('.dxcd-designer')[0]['offsetWidth'] - (otherWidth + 5);
        $element.find('.dxrd-surface-wrapper').eq(0).css({
            'right': !rtl ? rightAreaWidth : leftAreaWidth,
            'left': rtl ? rightAreaWidth : leftAreaWidth,
            'width': surfaceWidth
        });
        surfaceSize(surfaceWidth);
    };
}
export function subscribeTreelistArray(chartStructureProvider, array, getPath, subscribeNewItem) {
    return array.subscribe((args) => {
        args.forEach((changeSet) => {
            if (changeSet.status) {
                let selectedPath = '';
                const path = getPath();
                if (changeSet.status === 'deleted') {
                    selectedPath = array().length === 0 ? path.join('.') : [].concat(path, '0').join('.');
                }
                else if (changeSet.status === 'added') {
                    selectedPath = [].concat(path, changeSet.index).join('.');
                    subscribeNewItem && subscribeNewItem(changeSet.value, array, path);
                }
                chartStructureProvider.selectedPath(selectedPath);
            }
        });
    }, null, 'arrayChange');
}
export function getPropertyInfo(serializationsInfo, index, pathComponets) {
    let info = serializationsInfo.filter((info) => { return info.propertyName === pathComponets[index]; })[0];
    if (info && info.info && index++ < pathComponets.length)
        info = getPropertyInfo(info.info, index, pathComponets);
    return info;
}
function wrapSelectedElement(selectedElement, selectedElementInfo, displayName, propertyName = 'element') {
    const object = {};
    object[propertyName] = selectedElement;
    object['owner'] = ko.unwrap(selectedElement)['owner'];
    object['getInfo'] = () => {
        return [$.extend({}, selectedElementInfo, { displayName: displayName, propertyName: propertyName })];
    };
    return object;
}
export function createChartStructure(chart, selectedItem, subscriptions, surface, undoEngine, dragdrophandler) {
    const fakeChart = {
        dataSource: chart.dataSource,
        dataMember: chart.chart.dataContainer.dataMember,
        seriesDataMember: chart.chart.dataContainer.seriesDataMember,
        seriesTemplate: chart.chart.dataContainer.seriesTemplate,
        series: chart.chart.dataContainer.series,
        diagram: ko.computed(() => {
            if (chart.chart.dataContainer.series().length > 0 || !!chart.chart.dataContainer.seriesDataMember()) {
                return chart.chart.diagram();
            }
            return null;
        }),
        titles: chart.chart.titles,
        backImage: chart.chart['backImage'],
        legend: chart.chart['legend'],
        legends: chart.chart.legends,
        emptyChartText: chart.chart['emptyChartText'],
        smallChartText: chart.chart['smallChartText'],
        paletteName: chart.chart['paletteName'],
        getInfo: () => {
            return fakeChartSerializationInfo;
        },
        getPath: (propertyName) => { return chart.getPath(propertyName); },
        isPropertyDisabled: (propertyName) => { return chart.isPropertyDisabled(propertyName); },
        className: () => { return 'chart'; }
    };
    const chartStructureProvider = new ChartStructureObjectProvider(fakeChart, 'Chart', 'DevExpress.XtraReports.UI.XRChart');
    const chartStructureTreeListController = new ChartStructureTreeListController(['chart', 'Chart', 'titles', 'legend', 'legends', 'series', 'diagram', 'indicators',
        'defaultPane', 'panes', 'axisX', 'axisY', 'secondaryAxesX', 'secondaryAxesY', 'constantLines', 'scaleBreaks', 'strips', 'seriesTemplate', 'label', 'points'], ['chart', 'diagram', 'axisX', 'axisY', 'titles', 'indicators', 'legends', 'series', 'panes', 'secondaryAxesX', 'secondaryAxesY', 'seriesTemplate', 'constantLines', 'scaleBreaks', 'strips', 'SeriesViewModel', 'SecondaryAxisViewModel'], (newItem) => {
        let selectedElement = chartStructureProvider.selectedMember();
        if (newItem.data.specifics === 'points') {
            selectedElement = wrapSelectedElement(ko.observableArray(selectedElement), points, newItem.data.displayName, 'points');
        }
        else if (Array.isArray(selectedElement)) {
            selectedElement = wrapSelectedElement(selectedElement, { editor: editorTemplates.getEditor('collection') }, newItem.data.displayName);
        }
        selectedItem(selectedElement);
    }, surface, undoEngine, dragdrophandler);
    const chartStructure = {
        itemsProvider: chartStructureProvider,
        treeListController: chartStructureTreeListController,
        expandRootItems: true,
        selectedPath: chartStructureProvider.selectedPath
    };
    chartStructureProvider.selectedPath('Chart');
    selectedItem(null);
    subscriptions.push(fakeChart.diagram);
    subscriptions.push(subscribeTreelistArray(chartStructureProvider, chart.chart.dataContainer.series, () => ['Chart', 'series']));
    subscriptions.push(subscribeTreelistArray(chartStructureProvider, chart.chart.titles, () => ['Chart', 'titles']));
    subscriptions.push(subscribeTreelistArray(chartStructureProvider, chart.chart.legends, () => ['Chart', 'legends']));
    const diagramSubscriptions = [];
    const subscribeDiagram = (diagram) => {
        diagramSubscriptions.forEach((val) => val.dispose());
        const axisCollectionNames = ['constantLines', 'scaleBreaks', 'strips'];
        const subscribeAxis = (axis, array, path) => {
            axisCollectionNames.forEach((propertyName) => {
                diagramSubscriptions.push(subscribeTreelistArray(chartStructureProvider, axis[propertyName], () => [].concat(path, array.indexOf(axis), propertyName)));
            });
        };
        ['axisX', 'axisY'].forEach(propertyName => {
            if (diagram[propertyName]) {
                axisCollectionNames.forEach(innerPropertyName => {
                    if (diagram[propertyName][innerPropertyName]) {
                        diagramSubscriptions.push(subscribeTreelistArray(chartStructureProvider, diagram[propertyName][innerPropertyName], () => ['Chart', 'diagram', propertyName, innerPropertyName]));
                    }
                });
            }
        });
        ['secondaryAxesX', 'secondaryAxesY'].forEach(propertyName => {
            if (diagram[propertyName]) {
                diagramSubscriptions.push(subscribeTreelistArray(chartStructureProvider, diagram[propertyName], () => ['Chart', 'diagram', propertyName], subscribeAxis));
                const axis = ko.unwrap(diagram[propertyName]);
                for (let i = 0; i < axis.length; i++) {
                    subscribeAxis(axis[i], axis, ['Chart', 'diagram', propertyName]);
                }
            }
        });
        if (diagram.panes) {
            diagramSubscriptions.push(subscribeTreelistArray(chartStructureProvider, diagram.panes, () => ['Chart', 'diagram', 'panes']));
        }
        [].push.apply(subscriptions, diagramSubscriptions);
    };
    subscribeDiagram(chart.chart.diagram());
    chart.chart.diagram.subscribe((newVal) => {
        subscribeDiagram(newVal);
    });
    return chartStructure;
}
function createArrayOfNames(collectionProperty, defaultVal) {
    return ko.computed(() => {
        return (defaultVal && [defaultVal] || []).concat(collectionProperty().map(x => { return x.name(); }));
    });
}
export function createChartDesigner(element, options, applyBindings = true) {
    if (options.localization) {
        addCultureInfo(options.localization);
    }
    options.callbacks.fieldLists = options.callbacks.fieldLists || ChartRequests.fieldListCallback;
    registerControls();
    const chartControlModel = ko.observable(), surface = ko.observable(), dataBindingsProvider = ko.observable(), size = new Size(options.data.width, options.data.height);
    const chartStructure = ko.observable(null);
    const chartSelectedItem = ko.observable(null);
    let subscriptions = [];
    const groups = ko.observableArray();
    let chartSourceSubscription = null;
    const undoModel = ko.observable({});
    const initChartControlModel = (newModel) => {
        surface() && surface()._disposables.forEach((item) => { item.dispose(); });
        subscriptions.forEach((item) => item.dispose());
        subscriptions = [];
        if (newModel) {
            groups(newModel.chart.dataContainer.series().map(x => x.view()['group'] || x['stackedGroup']).filter(x => !!x).map(x => x()));
            chartControlModel(newModel);
            undoModel(newModel);
            surface() && surface()._disposables.forEach((item) => { item.dispose(); });
            surface(new ChartControlSurface(newModel, ko.observable(1), size));
            const fieldListProvider = ko.unwrap(options.fieldListProvider);
            if (!!fieldListProvider) {
                dataBindingsProvider(fieldListProvider);
            }
            else {
                let _chartSources = options.data.dataSource && options.data.dataSource() ? [options.data.dataSource()] : [];
                if (options.data.availableChartDataSources) {
                    _chartSources = options.data.availableChartDataSources().map((x) => {
                        return x.value;
                    });
                }
                const realChartSources = ko.observableArray(_chartSources);
                dataBindingsProvider(new FieldListProvider(options.callbacks.fieldLists, realChartSources));
            }
            newModel.fieldListProvider(dataBindingsProvider());
            designerModel.dragHelperContent = new DragHelperContent(null);
            chartStructure(createChartStructure(newModel, chartSelectedItem, subscriptions, surface, designerModel.undoEngine, designerModel.dragHelperContent));
        }
        designerModel.undoEngine().clearHistory();
    };
    const init = (chartSourceValue) => {
        const newModel = new ChartControlViewModel({
            chartSource: chartSourceValue,
            dataSource: options.data.dataSource,
            callbacks: options.callbacks,
            size: {
                height: ko.observable(options.data.height),
                width: ko.observable(options.data.width),
                isPropertyDisabled: (name) => { return true; }
            }
        });
        initChartControlModel(newModel);
    };
    const undoEngine = new UndoEngine(undoModel, ['viewType'], 'getInfo');
    undoEngine['_disposeUndoEngineSubscriptionsName'] += 'chartdesigner';
    const model = new ObjectProperties(chartSelectedItem);
    model.registerAccessibilityProvider(options.accessibilityProvider);
    const designerModel = {
        model: chartControlModel,
        chartStructure: chartStructure,
        rightPanelHeader: () => getLocalization('Chart Structure', 'ChartDesignerStringIDs.ChartStructureDockPanelTitle'),
        surface: surface,
        undoEngine: ko.observable(undoEngine),
        tabPanel: new TabPanel({
            tabs: [
                new TabInfo({
                    text: 'Properties',
                    template: 'dxrd-propertygridtab',
                    model: model,
                    localizationId: 'AnalyticsCoreStringId.Cmd_Properties'
                })
            ],
            rtl: options.rtl,
            width: 396
        }),
        surfaceSize: ko.observable(0),
        isLoading: ko.observable(true),
        rtl: options.rtl,
        groups: groups,
        applyGroup: (groupName) => {
            if (groups().indexOf(groupName) === -1 && !!groupName) {
                groups.push(groupName);
            }
        }
    };
    appendStaticContextToRootViewModel(designerModel, staticContext);
    if (options.data.chartSource) {
        chartSourceSubscription = options.data.chartSource.subscribe((newValue) => {
            init(newValue);
        });
        init(options.data.chartSource());
    }
    else {
        options.data.chart.subscribe((newVal) => {
            initChartControlModel(newVal);
        });
        initChartControlModel(options.data.chart());
    }
    designerModel.panes = createArrayOfNames(() => {
        const panes = chartControlModel().chart.diagram().panes;
        return panes && panes() || [];
    }, paneName.defaultVal);
    designerModel.legends = createArrayOfNames(() => {
        const legends = chartControlModel().chart.legends;
        return legends && legends() || [];
    }, legendName.defaultVal);
    designerModel.axisX = createArrayOfNames(() => {
        const axisX = chartControlModel().chart.diagram().secondaryAxesX;
        return axisX && axisX() || [];
    }, axisXName.defaultVal);
    designerModel.axisY = createArrayOfNames(() => {
        const axisY = chartControlModel().chart.diagram().secondaryAxesY;
        return axisY && axisY() || [];
    }, axisYName.defaultVal);
    if (options.data.availableChartDataSources) {
        designerModel.chartDataSources = options.data.availableChartDataSources;
    }
    else {
        const displayedChartSources = options.data.dataSource && options.data.dataSource() ? [{ displayName: options.data.dataSource().name, value: options.data.dataSource() }] : [];
        designerModel.chartDataSources = ko.observableArray(displayedChartSources);
    }
    designerModel.rootStyle = 'dxcd-designer dxd-back-primary';
    designerModel.parts = [
        { id: ChartDesignerElements.Main, templateName: ChartDesignerElements.Main, model: designerModel },
        { id: ChartDesignerElements.Toolbar, templateName: ChartDesignerElements.Toolbar, model: designerModel },
        { id: ChartDesignerElements.RightPanel, templateName: ChartDesignerElements.RightPanel, model: designerModel },
        { id: ChartDesignerElements.LeftPanel, templateName: ChartDesignerElements.LeftPanel, model: designerModel }
    ];
    designerModel.dataBindingsProvider = dataBindingsProvider;
    designerModel.actionLists = new ActionLists(surface, null, designerModel.undoEngine, customizeDesignerActions(designerModel, options.callbacks.customizeActions));
    designerModel.isLoading(false);
    if (applyBindings) {
        $.fn.constructor(element).children().remove();
        ko.applyBindings(designerModel, element);
    }
    const updateSurfaceContentSize_ = updateChartSurfaceContentSize(element, designerModel.surfaceSize, designerModel.rtl);
    designerModel.tabPanel.events.on('widthChanged', args => {
        updateSurfaceContentSize_();
    });
    designerModel.subscriptions = subscriptions;
    designerModel.chartSourceSubscription = chartSourceSubscription;
    designerModel.updateSurfaceSize = () => {
        updateSurfaceContentSize_();
    };
    if (applyBindings) {
        designerModel.updateSurfaceSize();
    }
    options.callbacks && options.callbacks.init && options.callbacks.init(designerModel);
    return designerModel;
}
ko.bindingHandlers['dxChartDesigner'] = {
    init: function (element, valueAccessor) {
        const options = ko.unwrap(valueAccessor()) || {};
        $.fn.constructor(element).children().remove();
        const templateHtml = getTemplate('dxrd-designer'), $element = $.fn.constructor(element).append(templateHtml);
        let designerModel = createChartDesigner($element[0], options, false);
        ko.applyBindings(designerModel, $element.children()[0]);
        const visibleSubscription = options.visible.subscribe((val) => {
            if (val)
                designerModel.updateSurfaceSize();
        });
        designerModel.updateSurfaceSize();
        addDisposeCallback(element, function () {
            designerModel.model() && designerModel.model()._disposables.forEach((item) => item.dispose());
            designerModel.subscriptions.forEach((item) => item.dispose());
            designerModel.chartSourceSubscription && designerModel.chartSourceSubscription.dispose();
            designerModel.subscriptions = [];
            visibleSubscription.dispose();
            designerModel = null;
        });
        return { controlsDescendantBindings: true };
    }
};
