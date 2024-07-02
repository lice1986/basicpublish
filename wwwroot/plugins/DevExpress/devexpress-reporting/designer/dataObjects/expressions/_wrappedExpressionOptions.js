﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\expressions\_wrappedExpressionOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperatorStateMachine } from '@devexpress/analytics-core/analytics-criteria-utils';
import { validateExpression } from '@devexpress/analytics-core/analytics-internal';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { createIDataMemberInfoByName } from '../../internal/_createIDataMemberInfoByName';
export class WrappedExpressionOptions extends Disposable {
    constructor(options, handlers, fieldListProvider, eventName) {
        super();
        this.eventName = eventName;
        this.isValid = ko.observable(true);
        this.warningMessage = ko.observable('');
        this.expression = ko.observable(null);
        this.rootItems = [
            { name: 'Parameters', needPrefix: true },
            { name: 'ReportItems', needPrefix: false, rootPath: 'Root' },
            { name: 'DataSource', needPrefix: false, rootPath: 'Root' },
            { name: 'Arguments', needPrefix: false, rootPath: 'Root' }
        ];
        if (handlers) {
            this._disposables.push(this.value = ko.computed({
                read: () => {
                    return this.expression() && this.expression().expression() || '';
                },
                write: (newVal) => {
                    if (this.expression()) {
                        if (newVal && newVal.trim()) {
                            this.expression().expression(newVal);
                        }
                        else {
                            handlers.removeExpression(this.expression());
                        }
                    }
                    else {
                        if (newVal && newVal.trim())
                            handlers.addExpression(newVal);
                    }
                }
            }));
        }
        else {
            this.value = options.value;
        }
        this.path = options.path;
        this.functions = options.functions;
        this.customizeCategories = options.customizeCategories;
        const specificRootItems = {
            'DataSource': (path) => path === 'DataSource' && ['CurrentRowIndex', 'RowCount', 'CurrentRowHierarchyLevel'].map(name => createIDataMemberInfoByName(name, 'integer')),
            'Arguments': (path) => path === 'Arguments' && ['PageIndex', 'PageCount'].map(name => createIDataMemberInfoByName(name, 'integer'))
        };
        this._disposables.push(ko.computed(() => {
            const unwrappedfieldListProvider = ko.unwrap(fieldListProvider);
            try {
                this.isValid(true);
                this.warningMessage('');
                if (!this.value())
                    return;
                CriteriaOperatorStateMachine.parse(this.value());
                if (unwrappedfieldListProvider) {
                    validateExpression({
                        fieldListProvider: {
                            getItemByPath: (path) => {
                                return unwrappedfieldListProvider.getItemByPath(path, specificRootItems);
                            },
                            getItems: () => void 0
                        },
                        expression: this.value(),
                        path: this.path(),
                        rootItems: this.rootItems.map(x => x.name),
                    }).done((result) => this.warningMessage(result)).fail(() => this.isValid(false));
                }
            }
            catch (_a) {
                this.isValid(false);
            }
        }));
    }
    onHiding(e) { }
    onShowing(e) { }
    onContentReady(e) { }
}
