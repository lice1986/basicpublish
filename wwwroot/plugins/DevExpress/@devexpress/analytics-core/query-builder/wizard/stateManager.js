﻿/**
* DevExpress Analytics (query-builder\wizard\stateManager.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '../../serializer/_utils';
export class StateManager {
    constructor(globalState, pageFactory) {
        this.globalState = globalState;
        this.pageFactory = pageFactory;
        this.defaultState = extend(true, {}, globalState);
    }
    _getPageState(pageId, state = this.globalState) {
        return this.pageFactory.getMetadata(pageId).getState(state);
    }
    setPageState(pageId, data) {
        this.pageFactory.getMetadata(pageId).setState(data, this.getPageState(pageId));
    }
    getPageState(pageId) {
        return this._getPageState(pageId);
    }
    resetPageState(pageId) {
        const defaultState = extend(true, {}, this._getPageState(pageId, this.defaultState));
        this.pageFactory.getMetadata(pageId).resetState(this.getPageState(pageId), defaultState);
    }
    getCurrentState() {
        return this.globalState;
    }
    reset() {
        this.globalState.reset();
    }
}
