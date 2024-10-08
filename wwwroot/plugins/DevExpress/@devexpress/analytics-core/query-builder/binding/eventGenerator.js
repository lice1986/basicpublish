﻿/**
* DevExpress Analytics (query-builder\binding\eventGenerator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as localization from 'devextreme/localization';
import { loadMessages as analyticLoadMessages } from '../../property-grid/localization/localization';
export class EventGenerator {
    static generateQueryBuilderEvents(fireEvent) {
        const beforeRenderEvent = { publicName: 'BeforeRender', privateName: 'beforeRender' };
        const saveQueryRequestedEvent = { publicName: 'SaveQueryRequested', privateName: 'saveQueryRequested' };
        const customizeActionsEvent = { publicName: 'CustomizeMenuActions', privateName: 'customizeActions' };
        const customizeLocalizationEvent = { publicName: 'CustomizeLocalization', privateName: 'customizeLocalization' };
        const onServerErrorEvent = { publicName: 'OnServerError', 'privateName': 'onServerError' };
        customizeActionsEvent['callback'] = function customizeActions(actions) {
            fireEvent(customizeActionsEvent.publicName, {
                Actions: actions,
                GetById: (actionId) => {
                    return actionId ? actions.filter(function (item) { return actionId === item.id; })[0] : null;
                }
            });
        };
        customizeLocalizationEvent['callback'] = function customizeLocalization(localizationCallbacks) {
            fireEvent(customizeLocalizationEvent.publicName, {
                LoadMessages: (messages) => {
                    if (!messages)
                        return;
                    if (typeof messages.then === 'function') {
                        localizationCallbacks.push(messages);
                    }
                    else {
                        analyticLoadMessages(messages);
                    }
                },
                WidgetLocalization: localization
            });
        };
        onServerErrorEvent['callback'] = function onServerError(args) {
            fireEvent(onServerErrorEvent.publicName, { Error: args });
        };
        beforeRenderEvent['callback'] = function beforeRender(designerModel) {
            fireEvent(beforeRenderEvent.publicName, designerModel);
        };
        saveQueryRequestedEvent['callback'] = function saveQueryRequested(queryModel) {
            fireEvent(saveQueryRequestedEvent.publicName, queryModel);
        };
        return [
            beforeRenderEvent,
            saveQueryRequestedEvent,
            customizeActionsEvent,
            customizeLocalizationEvent,
            onServerErrorEvent
        ];
    }
}
