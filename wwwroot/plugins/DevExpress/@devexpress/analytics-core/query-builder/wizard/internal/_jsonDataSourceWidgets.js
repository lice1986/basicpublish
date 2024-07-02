﻿/**
* DevExpress Analytics (query-builder\wizard\internal\_jsonDataSourceWidgets.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Editor } from '../../../property-grid/widgets/editor';
import { formatUnicorn, uploadFile } from '../../../property-grid/widgets/internal/_utils';
import { getLocalization, _stringEndsWith } from '../../../property-grid/localization/localization_utils';
import { aceAvailable } from '../../../widgets/ace/_ace-available';
export function getLocalizedValidationErrorMessage(emptyValueErrorMessage, localizedPropertyName, subProperty) {
    const requiredMessageSuffix = emptyValueErrorMessage || getLocalization('The value cannot be empty', 'AnalyticsCoreStringId.ParametersPanel_DateTimeValueValidationError');
    if (!localizedPropertyName)
        return requiredMessageSuffix;
    let propertyNamesPrefix = !subProperty ? localizedPropertyName : formatUnicorn('{0}. {1}', localizedPropertyName, subProperty);
    if (!_stringEndsWith(propertyNamesPrefix, ':'))
        propertyNamesPrefix += ':';
    return formatUnicorn('{0} {1}', propertyNamesPrefix, requiredMessageSuffix);
}
export class JsonStringEditor extends Editor {
    constructor(modelPropertyInfo, level, parentDisabled, textToSearch) {
        super(modelPropertyInfo, level, parentDisabled, textToSearch);
        this.aceEditorHasErrors = ko.observable(false);
        this.aceAvailable = aceAvailable();
        this.editorContainer = ko.observable();
        this.languageHelper = {
            getLanguageMode: () => 'ace/mode/json',
            createCompleters: () => { return []; }
        };
        this.aceOptions = {
            showLineNumbers: false,
            highlightActiveLine: false,
            showPrintMargin: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true
        };
        this.isValid = ko.computed(() => {
            return this._model() && this._model().isValid();
        });
        this.additionalOptions = {
            onChangeAnnotation: (session) => {
                const annotations = session && session.getAnnotations() || [];
                this._model() && this._model().aceEditorHasErrors && this._model().aceEditorHasErrors(annotations.filter(annotation => annotation.type === 'error' || annotation.type === 'warning').length > 0);
            },
            onBlur: () => {
                const editorContainer = this.editorContainer();
                if (editorContainer) {
                    this.value(editorContainer.getValue());
                }
            }
        };
        this.jsonStringValidationRules = [{
                type: 'custom',
                reevaluate: true,
                validationCallback: (options) => { return this.isValid(); },
                get message() {
                    return getLocalizedValidationErrorMessage(getLocalization('The value cannot be empty and should have a valid format.', 'AnalyticsCoreStringId.ValueIsRequiredOrInvalidFormat_Error'), getLocalization('JSON String:', 'DataAccessUIStringId.WizardPageChooseJsonSource_Custom'));
                }
            }];
    }
    b64DecodeUnicode(base64string) {
        const text = atob(base64string);
        const length = text.length;
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            bytes[i] = text.charCodeAt(i);
        }
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    }
    uploadFile(e) {
        if (e && e.event) {
            e.event.stopPropagation();
            e.event.preventDefault();
        }
        uploadFile({
            accept: '.json,.txt'
        }).done((result) => {
            const fileContent = this.b64DecodeUnicode(result.content);
            this.value(fileContent);
        });
    }
    getUploadTitle() {
        return getLocalization('Upload JSON File', 'AnalyticsCoreStringId.UploadJsonFile_Title');
    }
}