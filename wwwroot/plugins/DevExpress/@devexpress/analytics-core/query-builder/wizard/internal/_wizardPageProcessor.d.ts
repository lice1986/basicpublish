﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_wizardPageProcessor.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { StateManager } from '../stateManager';
import { WizardPageSectionIterator, WizardPageSection } from './_wizardPageSectionIterator';
import { EventManager } from '../../../serializer/eventManager';
import { IWizardEvents } from '../wizardEventManager';
import { WizardPageSectionFactory } from './_wizardPageSectionFactory';
import { IDataSourceWizardState } from '../dataSourceWizardState';
import { IWizardPage } from '../pages/IWizardPage';
export declare class WizardPageProcessor extends Disposable {
    pageFactory: WizardPageSectionFactory;
    dispose(): void;
    static __loadingStateFunctionName: string;
    stateManager: StateManager;
    iterator: WizardPageSectionIterator;
    events: EventManager<WizardPageProcessor, IWizardEvents<WizardPageProcessor>>;
    protected _createLoadingState(page: IWizardPage): void;
    protected _createNextAction(page: IWizardPage): void;
    private _loadingTimeout;
    private _changeTimeout;
    protected _loadingState(active: any): void;
    protected _extendedNextAction(): void;
    constructor(pageFactory: WizardPageSectionFactory, _loadingState?: (boolean: any) => void, _nextAction?: () => void);
    private _resetPageById;
    initialize(state: IDataSourceWizardState, createIterator?: (pageFactory: WizardPageSectionFactory, stateManager: StateManager) => WizardPageSectionIterator): void;
    private _canNext;
    private _canFinish;
    private _initPage;
    getPageById(pageId: any): WizardPageSection;
    start(): void;
    finishAction(): JQuery.Promise<any, any, any>;
    private _nextAction;
    sections: WizardPageSection[];
    isLoading: ko.Observable<boolean>;
}
