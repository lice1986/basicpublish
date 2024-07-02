﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressioneditor\reportExpressionEditorWrapper.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getParentContainer } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { PopupEditorBase, ResizeHelper } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { ReportExpressionEditorAdapter } from './reportExpressionEditorAdapter';
export class ReportExpressionEditorWrapper extends PopupEditorBase {
    constructor(control, value) {
        super();
        this.control = control;
        this.value = value;
        this._allProperties = [];
        this.title = () => getLocalization('Expression Editor', 'AnalyticsCoreStringId.ExpressionEditor_ExpressionCaption');
        this.getPopupContainer = getParentContainer;
        this.adapter = ko.observable();
        this.editor = ko.observable();
        this.properties = ko.observable([]);
        const self = this;
        this.resizeHelper = new ResizeHelper({
            onResize: () => this.resizeAceEditor()
        });
        this.buttonItems.push({ toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: getLocalization('Apply', 'StringId.Apply'), type: 'normal', stylingMode: 'contained', onClick: function (sender) { self.apply(sender); } } });
    }
    save(sender) {
        this.apply(sender) && super.save();
    }
    apply(sender) {
        const value = this.editor().getValue();
        if (this.editor().validate(value, sender)) {
            this.editor().save(null);
            this._allProperties.forEach(x => x.value && x.content.value && x.value() !== undefined && x.content.value(x.value()));
            return true;
        }
    }
    onShowing(e) {
        const expressionObj = this.control().expressionObj;
        this._allProperties = [];
        this.properties([]);
        this.createExpressionEditorProperties(expressionObj, this.properties(), this.value);
        this.properties.valueHasMutated();
        this.value() && this.updateExpression(this.value());
        this._undoEngine = UndoEngine.tryGetUndoEngine(this.control());
        this._undoEngine && this._undoEngine.start();
        this.editor().onShowing(e);
        this.editor().initDisplayValue();
    }
    resizeAceEditor() {
        this.editor().resizeAceEditor();
    }
    onHiding(e) {
        this._allProperties.forEach(x => x.content && x.value(x.content.value()));
        this.editor() && this.editor().onHiding(e);
        this._undoEngine && this._undoEngine.end();
        this.adapter() && this.adapter().dispose();
    }
    createExpressionEditorProperties(expressionObj, properties, selected) {
        expressionObj.getInfo().forEach(info => {
            const items = [];
            let expand = false;
            if (info.info)
                expand = this.createExpressionEditorProperties(expressionObj[info.propertyName], items, selected);
            if (info.propertyName === 'Appearance' || info.propertyName === 'Layout') {
                properties.push(...items);
            }
            else {
                const content = !items.length && expressionObj[info.propertyName];
                const property = {
                    displayName: getLocalization(info.displayName, info.localizationId),
                    propertyName: info.propertyName,
                    items: items,
                    templateName: !!items.length ? 'dxrd-expressioneditor-property-accordion' : '',
                    collapsed: ko.observable(!expand),
                    content: content,
                    value: ko.observable(content && content.value()),
                    isSelected: ko.observable(content == selected()),
                    click: () => this.switchExpression(property),
                    isBinded: () => !!property.value() || property.items.some(x => x.isBinded())
                };
                if (!selected()) {
                    property.isSelected(true);
                    selected(property.content);
                }
                if (property.isSelected())
                    this.currentProperty = property;
                properties.push(property);
                this._allProperties.push(property);
            }
        });
        properties.sort((a, b) => a.displayName < b.displayName ? -1 : 1);
        return properties.some(x => x.isSelected() || !x.collapsed());
    }
    switchExpression(property) {
        if (property === this.currentProperty)
            return;
        const value = this.editor().getValue();
        if (this.editor().validate(value)) {
            this.editor().save(null);
            this.currentProperty.isSelected(false);
            this.currentProperty = property;
            this.updateExpression(property.content);
            property.isSelected(true);
            this.editor().initDisplayValue();
        }
    }
    updateExpression(expression) {
        this.adapter() && this.adapter().dispose();
        this.adapter(new ReportExpressionEditorAdapter(ko.observable(expression['serializationInfo'] && expression['serializationInfo']['valuesArray'] || []), ko.observable(Object.assign(Object.assign({}, expression), {
            value: this.currentProperty.value
        }))));
    }
}
