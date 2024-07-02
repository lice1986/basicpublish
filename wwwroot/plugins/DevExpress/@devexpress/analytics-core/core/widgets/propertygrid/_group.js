﻿/**
* DevExpress Analytics (core\widgets\propertygrid\_group.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { getLocalization } from '../../../property-grid/localization/localization_utils';
export class Group extends Disposable {
    constructor(name, serializationsInfo, createEditors, collapsed = true, displayName) {
        super();
        this.editors = ko.observableArray([]).extend({ deferred: true });
        this.editorsCreated = ko.observable(false);
        this.editorsRendered = ko.observable(false);
        this._displayName = name;
        this.displayName = displayName || (() => getLocalization(name));
        this._serializationsInfo = serializationsInfo;
        this.collapsed = ko.observable(collapsed);
        if (collapsed) {
            const subscription = this.collapsed.subscribe((newVal) => {
                subscription.dispose();
                this.editorsRendered(true);
            });
            this._disposables.push(subscription);
        }
        this.recreate = () => {
            this.editors(createEditors(serializationsInfo));
            if (this._accessibilityProvider) {
                this.editors().forEach((editor) => {
                    editor.registerAccessibilityProvider(this._accessibilityProvider);
                });
            }
        };
        this.editors(createEditors(serializationsInfo));
        this.visible = ko.computed(() => {
            return this.editors().some(editor => editor._get('visible'));
        });
        this._disposables.push(this.visible);
    }
    resetEditors() {
        this.disposeObservableArray(this.editors);
        this.resetObservableArray(this.editors);
    }
    dispose() {
        super.dispose();
        this.disposeObservableArray(this.editors);
        this.resetObservableArray(this.editors);
    }
    update(viewModel) {
        this._viewModel = viewModel;
        this.editors().forEach((editor) => {
            editor.update(this._viewModel);
        });
    }
    registerAccessibilityProvider(accessibilityProvider) {
        this._accessibilityProvider = accessibilityProvider;
        this.editors().forEach((editor) => {
            editor.registerAccessibilityProvider(accessibilityProvider);
        });
    }
}