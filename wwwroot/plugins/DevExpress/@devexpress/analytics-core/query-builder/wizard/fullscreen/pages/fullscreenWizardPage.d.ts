﻿/**
* DevExpress Analytics (query-builder\wizard\fullscreen\pages\fullscreenWizardPage.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IWizardPageStyle, WizardSectionPosition } from '../../internal/_utils';
import { WizardPageSectionFactory } from '../../internal/_wizardPageSectionFactory';
import { WizardPageProcessor } from '../../internal/_wizardPageProcessor';
import { WizardPageSection } from '../../internal/_wizardPageSectionIterator';
import { IWizardPageMetadata } from '../../pages/wizardPageMetadata';
import { StateManager } from '../../stateManager';
import { EventManager } from '../../../../serializer/eventManager';
import { IWizardPage } from '../../pages/IWizardPage';
import { WizardPageBase } from '../../pages/wizardPageBase';
import { IDataSourceWizardState } from '../../dataSourceWizardState';
export interface IBeforeWizardSectionInitializeEventArgs<Sender> extends IWizardSectionEventArgs<Sender> {
    state: any;
}
export interface IWizardSectionEventArgs<Sender> {
    section: IWizardPage;
    sectionId: string;
    page: Sender;
}
export interface IWizardFullscreenPageEvents<Sender> {
    'beforeSectionInitialize': IBeforeWizardSectionInitializeEventArgs<Sender>;
    'afterSectionInitialize': IWizardSectionEventArgs<Sender>;
}
export declare class FullscreenWizardPage extends WizardPageBase {
    dispose(): void;
    private _patchOnChange;
    private _getPageStyle;
    private _sectionsToUnregister;
    private _sectionsToRegister;
    private _sectionPositions;
    private _applyCustomizations;
    protected _setSectionPosition(pageId: string, position?: WizardSectionPosition): void;
    constructor();
    registerSections(): void;
    canNext(): boolean;
    private _sectionCondition;
    canFinish(): boolean;
    setSectionPosition(sectionId: string, position?: WizardSectionPosition): void;
    registerSection(sectionId: string, metadata: IWizardPageMetadata<IWizardPage>): void;
    unregisterSection(sectionId: string): void;
    _loadPanelViewModel(element: HTMLElement): boolean;
    getNextSectionId(sectionId: string): any;
    initialize(state: IDataSourceWizardState, stateChanged?: boolean): JQuery.Promise<any>;
    _beforeStart(): void;
    commit(): JQuery.Promise<any>;
    _getPageDescription(index: number, page: WizardPageSection): string;
    _showPageDescription(page?: WizardPageSection): boolean;
    _initInProgress: ko.Observable<boolean>;
    _defaultMargin: number;
    _parentMarginOffset: number;
    _className: string;
    _sections: WizardPageSection[];
    _pageCss: {
        [key: string]: ko.Observable<IWizardPageStyle>;
    };
    _factory: WizardPageSectionFactory;
    _stateManager: StateManager;
    _sectionsProcessor: WizardPageProcessor;
    events: EventManager<FullscreenWizardPage, IWizardFullscreenPageEvents<FullscreenWizardPage>>;
}
