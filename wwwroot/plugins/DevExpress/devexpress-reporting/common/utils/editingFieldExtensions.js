﻿/**
* DevExpress HTML/JS Reporting (common\utils\editingFieldExtensions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend, formatDate, parseDate, processTextEditorHotKeys } from '@devexpress/analytics-core/analytics-internal-native';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils-native';
import { ValueEditorHelper } from '@devexpress/analytics-core/analytics-widgets-internal-native';
import { PictureEditMode } from '../../viewer/widgets/pictureEditor/pictureEditMode';
import { PictureEditorActionId } from '../../viewer/widgets/pictureEditor/_pictureEditorTypes';
export const Categories = {
    Image: () => 'Image',
    Numeric: () => 'Numeric',
    DateTime: () => 'Date-Time',
    Letters: () => 'Letters'
};
export const ___isCancelFlag = '___isCancel';
export class EditingFieldExtensions {
    constructor() {
        this._editors = {};
    }
    static instance() {
        if (!EditingFieldExtensions._instance) {
            EditingFieldExtensions._instance = new EditingFieldExtensions();
            EditingFieldExtensions._instance._registerStandartEditors();
        }
        return EditingFieldExtensions._instance;
    }
    _registerStandartEditors() {
        const getLocalizedString = getLocalization;
        EditingFieldExtensions.registerRegExpEditor('Integer', getLocalizedString('Integer', 'PreviewStringId.EditingFieldEditors_Integer'), Categories.Numeric(), /^-?\d*$/, /^-?\d+$/, '0');
        EditingFieldExtensions.registerRegExpEditor('IntegerPositive', getLocalizedString('Integer Positive', 'PreviewStringId.EditingFieldEditors_IntegerPositive'), Categories.Numeric(), /^\d+$/, /^\d+$/, '0');
        EditingFieldExtensions.registerRegExpEditor('FixedPoint', getLocalizedString('Fixed-Point', 'PreviewStringId.EditingFieldEditors_FixedPoint'), Categories.Numeric(), /^-?(\d+([\.,]?\d*)?)?$/, /^-?\d+([\.,]?\d*)?$/, '0');
        EditingFieldExtensions.registerRegExpEditor('FixedPointPositive', getLocalizedString('Fixed-Point Positive', 'PreviewStringId.EditingFieldEditors_FixedPointPositive'), Categories.Numeric(), /^\d+([\.,]?\d*)?$/, /^\d+([\.,]?\d*)?$/, '0');
        const dateEditorOptions = {
            onPreRender: (data, field) => {
                if (!(data.options.value instanceof Date)) {
                    const dateValue = parseDate(data.options.value, false) || new Date(Date.now());
                    data.options.value = dateValue;
                    field._editorValue = dateValue;
                }
            },
            onHideEditor: (field) => {
                field.setEditValue(formatDate(field._editorValue));
            }
        };
        EditingFieldExtensions.registerEditor('Date', getLocalizedString('Date', 'PreviewStringId.EditingFieldEditors_Date'), Categories.DateTime(), dateEditorOptions, 'dxrp-editing-field-datetime');
        EditingFieldExtensions.registerImageEditor({
            name: 'Image',
            displayName: getLocalizedString('Image', 'PreviewStringId.EditingFieldEditors_Image'),
            drawingEnabled: false,
            imageLoadEnabled: true
        });
        EditingFieldExtensions.registerImageEditor({
            name: 'Signature',
            displayName: getLocalizedString('Signature', 'PreviewStringId.EditingFieldEditors_Signature'),
            drawingEnabled: true,
            imageLoadEnabled: false
        });
        EditingFieldExtensions.registerImageEditor({
            name: 'ImageAndSignature',
            displayName: getLocalizedString('Image And Signature', 'PreviewStringId.EditingFieldEditors_ImageAndSignature'),
            drawingEnabled: true,
            imageLoadEnabled: true
        });
        EditingFieldExtensions.registerRegExpEditor('OnlyLatinLetters', getLocalizedString('Only Latin Letters', 'PreviewStringId.EditingFieldEditors_OnlyLatinLetters'), Categories.Letters(), /^[a-zA-Z]*$/, /^[a-zA-Z]*$/, '');
    }
    static enableImageEditorShading() {
        ['Image', 'ImageAndSignature', 'Signature'].forEach(editorType => {
            const editor = EditingFieldExtensions.instance()._editors[editorType];
            extend(true, editor, { options: { registrationOptions: { shadingEnabled: true } } });
        });
    }
    static registerImageEditor(imageRegistrationOptions) {
        imageRegistrationOptions.imageLoadEnabled = imageRegistrationOptions.imageLoadEnabled === undefined ? !imageRegistrationOptions.images : imageRegistrationOptions.imageLoadEnabled;
        imageRegistrationOptions.drawingEnabled = imageRegistrationOptions.drawingEnabled === undefined ? false : imageRegistrationOptions.drawingEnabled;
        let editMode = PictureEditMode.ImageAndSignature;
        if (!imageRegistrationOptions.imageLoadEnabled)
            editMode = PictureEditMode.Signature;
        if (!imageRegistrationOptions.drawingEnabled)
            editMode = PictureEditMode.Image;
        const options = {
            editMode: editMode,
            registrationOptions: imageRegistrationOptions
        };
        options['callbacks'] = {
            customizeActions: (s, actions) => {
                if (imageRegistrationOptions.images) {
                    const imagePickerAction = s.actionsProvider.createImagePickerAction(imageRegistrationOptions.images, imageRegistrationOptions.searchEnabled, (base64) => {
                        s.painter.image = base64;
                        s.painter.refresh();
                    });
                    actions.splice(0, 0, imagePickerAction);
                    if (!imageRegistrationOptions.sizeOptionsEnabled) {
                        const alignmentAction = actions.filter(x => x.id === PictureEditorActionId.Alignment)[0];
                        alignmentAction && actions.splice(actions.indexOf(alignmentAction), 1);
                    }
                }
                if (!imageRegistrationOptions.imageLoadEnabled) {
                    const openFile = actions.filter((x => x.id === PictureEditorActionId.OpenFile))[0];
                    openFile && actions.splice(actions.indexOf(openFile), 1);
                }
                if (imageRegistrationOptions.sizeOptionsEnabled !== undefined && !imageRegistrationOptions.sizeOptionsEnabled) {
                    const alignmentAction = actions.filter(x => x.id === PictureEditorActionId.Alignment)[0];
                    alignmentAction && actions.splice(actions.indexOf(alignmentAction), 1);
                }
                if (imageRegistrationOptions.clearEnabled !== undefined && !imageRegistrationOptions.clearEnabled) {
                    const clearAction = actions.filter(x => x.id === PictureEditorActionId.Clear)[0];
                    clearAction && actions.splice(actions.indexOf(clearAction), 1);
                }
                if (imageRegistrationOptions.customizeActions) {
                    imageRegistrationOptions.customizeActions(s, actions);
                    return;
                }
            }
        };
        EditingFieldExtensions.registerEditor(imageRegistrationOptions.name, imageRegistrationOptions.displayName, Categories.Image(), options, 'dxrp-editing-field-image');
    }
    static registerEditor(name, displayName, category, options, template, validate, defaultVal = '') {
        let initValue;
        const extendOptions = {
            onInitialized: e => {
                if (validate) {
                    ValueEditorHelper.validateWidgetValue(e, validate, defaultVal);
                }
                initValue = e.component.option('value');
            },
            onKeyUp: e => {
                const editor = e.component;
                processTextEditorHotKeys(e.event, {
                    esc: () => {
                        editor[___isCancelFlag] = true;
                        editor.blur();
                        delete editor[___isCancelFlag];
                        editor.option('value', initValue);
                    },
                    ctrlEnter: () => {
                        editor.blur();
                    }
                });
            }
        };
        EditingFieldExtensions.instance()._editors[name] = {
            name: name,
            displayName: displayName,
            category: category,
            options: extend({}, options, extendOptions),
            template: template
        };
    }
    static registerMaskEditor(editorID, displayName, category, mask) {
        EditingFieldExtensions.registerEditor(editorID, displayName, category, { mask: mask });
    }
    static registerRegExpEditor(editorID, displayName, category, regExpEditing, regExpFinal, defaultVal) {
        const validate = (val) => { return regExpFinal.test(val); };
        EditingFieldExtensions.registerEditor(editorID, displayName, category, ValueEditorHelper.getValueEditorOptions(regExpEditing, validate, defaultVal), null, validate, defaultVal);
    }
    static unregisterEditor(editorID) {
        delete EditingFieldExtensions.instance()._editors[editorID];
    }
    categories(excludeCategories = []) {
        const categories = [];
        Object.keys(this._editors).forEach(p => {
            const category = this._editors[p].category;
            if (excludeCategories.indexOf(category) === -1 && categories.indexOf(category) === -1) {
                categories.push(category);
            }
        });
        return categories;
    }
    editors() {
        return Object.keys(this._editors).map(key => this._editors[key]);
    }
    editorsByCategories(categories = []) {
        const editors = [];
        Object.keys(this._editors).forEach(p => {
            if (categories.indexOf(this._editors[p].category) != -1) {
                editors.push(this._editors[p]);
            }
        });
        return editors;
    }
    editor(editorID) {
        return this._editors[editorID];
    }
}
