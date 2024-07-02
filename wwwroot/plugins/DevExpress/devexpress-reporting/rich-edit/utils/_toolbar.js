﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_toolbar.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend, getParentContainer } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { PopupComponentBase } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { Locker } from '../../common/utils/_locker';
import { events, ToolbarActionId, ToolbarGroupId } from '../customizeToolbarActions';
import { getRichEditInstance } from '../instance';
class ComponentCommon extends Disposable {
    constructor(options, info) {
        super();
        this.itemKey = 'value';
        this.locker = new Locker();
        this.options = options;
        this.value = ko.observable();
        if (info.template)
            this.template = info.template;
        this.init(info);
    }
    _updateStateInternal(commandIdMap) {
        if (!commandIdMap || this.needUpdateState(commandIdMap))
            this.locker.lock(() => this.updateState());
    }
    _executeCommand(value, command) {
        if (this.locker.isUpdate)
            return;
        if (this.action)
            this.action(this.options.richEditPublic, value);
        else
            this.options.executeCommand(command, this.hasCustomValue() ? this.getConverter().toModel(value) : undefined, true);
        this._updateStateInternal();
    }
    executeCommand(value, command) {
        this._executeCommand(value, command);
    }
    unwrapItem(item) {
        return $.extend({}, item, { command: item.command });
    }
    getConverter() {
        return {
            toModel: (newValue) => newValue,
            fromModel: (newValue) => newValue,
        };
    }
    init(info) {
        if (info) {
            this.id = info.id;
            this.text = info.text;
            this.visible = info.visible === false ? false : true;
            if (info.action)
                this.action = info.action;
        }
    }
    hasCustomValue() {
        return false;
    }
}
export class CustomComponent extends ComponentCommon {
    updateState() { }
    needUpdateState(_commandIdMap) {
        return true;
    }
}
export class Component extends ComponentCommon {
    needUpdateState(commandIdMap) {
        return !!commandIdMap[this._command];
    }
    init(info) {
        super.init(info);
        this.item = this.unwrapItem(info);
        this._command = this.item.command;
        if (this._command && !this.options.richEditPublic.isDisposed) {
            const state = this.options.richEditPublic.getCommandState(this._command);
            if (state.enabled) {
                this.value(this.getConverter().fromModel(state.value));
                this.locker.lock(() => this._updateStateInternal());
            }
        }
        this._disposables.push(this.value.subscribe((value) => this._executeCommand(value, this.item.command)));
    }
    updateState() {
        if (this._command && this.hasCustomValue()) {
            const state = this.options.richEditPublic.getCommandState(this._command);
            if (state.enabled)
                this.value(this.getConverter().fromModel(state.value));
        }
    }
}
export class ComponentButtonGroup extends ComponentCommon {
    constructor(options, info) {
        super(options, info);
        this.itemKey = 'command';
        this.template = this.template || 'dxrd-rich-edit-toolbar-button-group';
    }
    needUpdateState(commandIdMap) {
        return this.items.some(item => !!commandIdMap[this.getCommand(item)]);
    }
    init(info) {
        super.init(info);
        this.selectionMode = info.selectionMode || 'single';
        this.selectedItems = ko.observableArray([]);
        this.items = info.items.map(item => this.unwrapItem(item));
        this._disposables.push(this.selectedItems.subscribe((changes) => {
            this.onSelectItems(changes);
        }, null, 'arrayChange'));
    }
    onSelectItems(changes) {
        changes.forEach((change) => {
            if (this.selectionMode === 'multiple' && change.status === 'deleted' || change.status === 'added') {
                this._executeCommand(change.value.value, change.value.command);
            }
        });
    }
    getCommand(item) {
        return item.command;
    }
    updateState() {
        const selected = [];
        this.items.forEach(item => {
            const command = this.getCommand(item);
            if (item.command === command) {
                const commandState = this.options.richEditPublic.getCommandState(command);
                if (commandState.enabled) {
                    const value = commandState.value;
                    if (!!value)
                        selected.push(item);
                }
            }
        });
        this.selectedItems(selected);
    }
}
export class ComponentButton extends Component {
    constructor(options, info) {
        super(options, info);
        this.icon = info.icon;
        this.hint = info.hint;
        this.template = this.template || 'dxrd-button-with-template';
    }
    clickAction() {
        this._executeCommand(undefined, this.item.command);
    }
}
export class ComponentComboBox extends Component {
    constructor(options, info) {
        super(options, info);
        this.validationRules = [];
        this.supportCustomValue = false;
        this.items = info.items;
        this.template = this.template || 'dxrd-rich-toolbar-combobox';
    }
    hasCustomValue() { return true; }
}
export class ComponentFontSizeComboBox extends ComponentComboBox {
    constructor() {
        super(...arguments);
        this.validationRules = [{ type: 'numeric' }];
        this.supportCustomValue = true;
    }
}
export class ComponentColorPicker extends Component {
    constructor(options, info) {
        super(options, info);
        this.template = this.template || 'dxrd-richEdit-toolbar-colorpicker';
    }
    getConverter() {
        return {
            fromModel: (newValue) => {
                switch (newValue) {
                    case 'Auto':
                    case 'NoColor':
                    case undefined:
                        return this.item.defaultValue;
                    default: {
                        const color = newValue;
                        return `rgb(${[
                            parseInt(color.substr(1, 2), 16),
                            parseInt(color.substr(3, 2), 16),
                            parseInt(color.substr(5, 2), 16)
                        ].join(', ')})`;
                    }
                }
            },
            toModel: (newValue) => newValue
        };
    }
    hasCustomValue() { return true; }
}
export class ComponentCollection {
    constructor(id, title = '', visible = true, template = 'dxrd-rich-edit-toolbar-component-collection') {
        this.id = id;
        this.title = title;
        this.visible = visible;
        this.template = template;
        this.showTitle = () => this.title;
    }
}
export class ToolbarSurface extends Disposable {
    constructor(options) {
        super();
        this._popover = new PopupComponentBase();
        this._getDefaultItems = (fonts) => {
            return [
                {
                    id: ToolbarGroupId.AlignmentAndFormatting,
                    items: [
                        {
                            id: ToolbarActionId.ParagraphAlignmentButtonGroup,
                            actionType: 'ButtonGroup',
                            selectionMode: 'single',
                            _customComponent: 'alignmentButtonGroup',
                            items: [
                                { actionType: 'Button', command: getRichEditInstance().HomeTabCommandId.ToggleParagraphAlignmentLeft, icon: ' dxre-icon-AlignLeft', hint: getLocalization('Align Text Left', 'XtraRichEditStringId.MenuCmd_ParagraphAlignmentLeft') },
                                { actionType: 'Button', command: getRichEditInstance().HomeTabCommandId.ToggleParagraphAlignmentCenter, icon: ' dxre-icon-AlignCenter', hint: getLocalization('Center', 'XtraRichEditStringId.MenuCmd_ParagraphAlignmentCenter') },
                                { actionType: 'Button', command: getRichEditInstance().HomeTabCommandId.ToggleParagraphAlignmentRight, icon: ' dxre-icon-AlignRight', hint: getLocalization('Align Text Right', 'XtraRichEditStringId.MenuCmd_ParagraphAlignmentRight') }
                            ]
                        },
                        {
                            id: ToolbarActionId.HyperlinkButton, actionType: 'Button', command: getRichEditInstance().InsertTabCommandId.ShowHyperlinkDialog, icon: ' dxre-icon-Hyperlink', hint: getLocalization('Hyperlink...', 'XtraRichEditStringId.MenuCmd_Hyperlink'),
                        },
                        {
                            id: ToolbarActionId.ClearFormattingButton, actionType: 'Button', command: getRichEditInstance().HomeTabCommandId.ClearFormatting, icon: ' dxre-icon-ClearFormatting', hint: getLocalization('Clear Formatting', 'XtraRichEditStringId.MenuCmd_ClearFormatting')
                        }
                    ],
                },
                {
                    id: ToolbarGroupId.FontStyleAndCase,
                    items: [
                        {
                            id: ToolbarActionId.FontStyleButtonGroup,
                            actionType: 'ButtonGroup',
                            selectionMode: 'multiple',
                            items: [
                                { actionType: 'Button', command: getRichEditInstance().HomeTabCommandId.ToggleFontBold, icon: ' dxre-icon-Bold', hint: getLocalization('Bold', 'System.Drawing.Font.Bold') },
                                { actionType: 'Button', command: getRichEditInstance().HomeTabCommandId.ToggleFontItalic, icon: ' dxre-icon-Italic', hint: getLocalization('Italic', 'System.Drawing.Font.Italic') },
                                { actionType: 'Button', command: getRichEditInstance().HomeTabCommandId.ToggleFontUnderline, icon: ' dxre-icon-Underline', hint: getLocalization('Underline', 'System.Drawing.Font.Underline') },
                                { actionType: 'Button', command: getRichEditInstance().HomeTabCommandId.ToggleFontStrikeout, icon: ' dxre-icon-Strikeout', hint: getLocalization('Strikeout', 'System.Drawing.Font.Strikeout') }
                            ]
                        },
                        { id: ToolbarActionId.ToggleCaseButton, actionType: 'Button', command: getRichEditInstance().HomeTabCommandId.CapitalizationToggleCase, icon: ' dxre-icon-ChangeTextCase', hint: getLocalization('tOGGLE cASE', 'XtraRichEditStringId.MenuCmd_ToggleTextCase') }
                    ]
                },
                {
                    id: ToolbarGroupId.FontSize,
                    title: getLocalization('Font Size', 'XtraRichEditStringId.MenuCmd_ChangeFontSize'),
                    items: [{ id: ToolbarActionId.FontSizeComboBox, actionType: 'ComboBox', command: getRichEditInstance().HomeTabCommandId.ChangeFontSize, items: [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 26, 28, 36, 48, 72] }],
                },
                {
                    id: ToolbarGroupId.Font,
                    title: getLocalization('Font', 'XtraRichEditStringId.MenuCmd_ChangeFontName'),
                    items: [{ id: ToolbarActionId.FontComboBox, actionType: 'ComboBox', command: getRichEditInstance().HomeTabCommandId.ChangeFontName, items: fonts }],
                },
                {
                    id: ToolbarGroupId.FontColor,
                    title: getLocalization('Font Color', 'XtraRichEditStringId.MenuCmd_ChangeFontColor'),
                    items: [{ id: ToolbarActionId.FontColorBox, actionType: 'ColorBox', command: getRichEditInstance().HomeTabCommandId.ChangeFontForeColor, defaultValue: 'rgb(0, 0, 0)' }],
                },
                {
                    id: ToolbarGroupId.BackgroundColor,
                    title: getLocalization('Background Color', 'DevExpress.XtraReports.UI.XRRichTextBoxBase.BackColor'),
                    items: [{ id: ToolbarActionId.BackgroundColorBox, actionType: 'ColorBox', command: getRichEditInstance().HomeTabCommandId.ChangeFontHighlightColor, defaultValue: 'rgb(255, 255, 255)' }]
                }
            ];
        };
        this.onContentReady = this._popover.onContentReady;
        this.getPositionTarget = (element) => {
            return $.fn.constructor(element).closest('.' + this.parentClass).closest('.dxrd-control')[0];
        };
        this.hideOnOutsideClick = (e) => {
            if (this._popover.hideOnOutsideClick(e)) {
                this.visible(false);
                return false;
            }
            return true;
        };
        this.template = 'dxrd-richedit-toolbar';
        this.parentClass = 'dxrd-rich-surface';
        this.getPopupContainer = getParentContainer;
        this.componentCollection = [];
        this.visible = options.visible;
        const toolbarItems = extend(true, [], this._getDefaultItems(options.fonts));
        const getById = (itemId) => {
            let matchedItem;
            const group = toolbarItems.filter(item => {
                if (matchedItem)
                    return false;
                if (item.id === itemId)
                    return true;
                matchedItem = item.items.filter(x => x.id === itemId)[0];
            })[0];
            return matchedItem || group;
        };
        events().call('customizeToolbarActions', { actions: toolbarItems, getById: getById });
        this.componentCollection = this._initComponentCollection(toolbarItems, options);
        if ((this.componentCollection || []).every(component => !component.visible))
            this.visible = ko.observable(false);
    }
    _initComponentCollection(items, options) {
        return items.map((item) => {
            const component = new ComponentCollection(item.id, item.title, item.visible, item.template);
            component.items = this._initComponents(item.items, options);
            return this._extendTemplateOptions(item, component);
        });
    }
    _initComponents(items, options) {
        return items.map((item) => {
            let component;
            switch (item.actionType) {
                case 'ButtonGroup':
                    component = new ComponentButtonGroup(options, item);
                    break;
                case 'Button':
                    component = new ComponentButton(options, item);
                    break;
                case 'ComboBox':
                    component = item.id === ToolbarActionId.FontSizeComboBox ? new ComponentFontSizeComboBox(options, item) : new ComponentComboBox(options, item);
                    break;
                case 'ColorBox':
                    component = new ComponentColorPicker(options, item);
                    break;
                default:
                    component = new CustomComponent(options, item);
            }
            return this._extendTemplateOptions(item, component);
        });
    }
    _extendTemplateOptions(item, el) {
        if (item.template)
            return extend(true, {}, el, item);
        return el;
    }
    onCommandStateChanged(sender, args) {
        if (args.commands) {
            const commandIdMap = {};
            args.commands.forEach(commandId => commandIdMap[commandId] = true);
            for (const group of this.componentCollection) {
                if (group.items) {
                    for (const item of group.items) {
                        if (item._updateStateInternal) {
                            item._updateStateInternal(commandIdMap);
                        }
                    }
                }
            }
        }
        else
            this.componentCollection.forEach(group => (group.items || []).forEach(item => item._updateStateInternal && item._updateStateInternal()));
    }
}
