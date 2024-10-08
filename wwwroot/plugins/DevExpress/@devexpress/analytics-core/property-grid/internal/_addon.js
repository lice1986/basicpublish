﻿/**
* DevExpress Analytics (property-grid\internal\_addon.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseRenderingMultiplatformModel } from '../../serializer/native/models/base.model';
import { koUtils } from '../../core/utils/_koUtils';
export class EditorAddOn extends BaseRenderingMultiplatformModel {
    constructor(editor, popupService, engineType) {
        super(undefined, undefined, engineType);
        this.templateName = null;
        this._editor = editor;
        this._popupService = popupService;
        this.addDisposable(this.createComputedProperty('_actions', () => {
            return (editor.getPopupServiceActions() || []).filter(x => this.actionFilter(x));
        }, [], undefined, true), this.createComputedProperty('visible', () => {
            return this._get('_actions').length > 0;
        }, [], undefined, true), this.createComputedProperty('hint', () => {
            const acc = [];
            this._get('_actions').forEach(x => this._getTitles(x, [], acc));
            return acc.join('\n');
        }, [], undefined, true), this.createComputedProperty('editorMenuButtonCss', () => {
            const editorModel = editor._get('_model');
            return editorModel && editorModel['getActionClassName'] && editorModel['getActionClassName'](editor.name) || '';
        }, [], undefined, true), this.createComputedProperty('imageTemplateName', {
            read: () => {
                if (this._imageTemplateName !== undefined)
                    return this._imageTemplateName;
                const editorModel = editor._get('_model');
                return editorModel && editorModel['getMenuBoxTemplate'] && editorModel['getMenuBoxTemplate'](editor.name) || '';
            },
            write: (value) => {
                this._imageTemplateName = value;
            }
        }, [], undefined, true));
    }
    _updateActions(actions) {
        this._popupService.actions([]);
        if (!actions || !actions.length)
            return;
        actions
            .sort((x, y) => (x.title < y.title ? -1 : x.title > y.title ? 1 : 0))
            .sort((x, y) => (x.weight || 0) - (y.weight || 0));
        this._wrapVisibleItems(actions, this._editor.name).forEach(visibleItem => {
            this._popupService.actions.push(visibleItem);
        });
    }
    _getTitles(item, currentItemPath = [], acc = []) {
        const title = koUtils.unwrap(item.title);
        (item.items || []).forEach(x => {
            const nextPath = title ? currentItemPath.concat([title]) : currentItemPath;
            this._getTitles(x, nextPath, acc);
        });
        const hint = koUtils.unwrap(item.hint);
        if (!hint || !title)
            return;
        const resultTitle = currentItemPath.concat([title]).join('. ');
        acc.push(resultTitle + ':\n' + hint + '\n');
        return acc;
    }
    _wrapVisibleItems(actions, editorName) {
        if (!actions)
            return undefined;
        return actions.map(modelAction => this._wrapActionClick(modelAction, editorName)).filter(x => !!x);
    }
    _wrapActionClick(modelAction, editorName) {
        if (this.actionFilter(modelAction)) {
            return {
                id: modelAction.id,
                items: this._wrapVisibleItems(modelAction.items, editorName),
                innerTemplate: modelAction.innerTemplate,
                itemTemplate: modelAction.itemTemplate,
                action: () => {
                    modelAction.action(editorName);
                    this._popupService.visible(false);
                },
                title: modelAction.title,
                hint: modelAction.hint,
                visible: () => { return true; }
            };
        }
        else {
            return null;
        }
    }
    showPopup(_, element) {
        this._popupService.title(this._editor._get('displayName'));
        this._updateActions(this._editor.getPopupServiceActions());
        this._popupService.target(element);
        this._popupService.visible(true);
    }
    actionFilter(action) {
        return action.visible(this._editor.name);
    }
}
