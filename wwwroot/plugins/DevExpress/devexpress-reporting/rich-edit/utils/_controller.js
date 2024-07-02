﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_controller.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { Locker } from '../../common/utils/_locker';
import { RichEditFontModel, RichEditPaddingModelWrapper, RichLoader } from './_model';
import * as $ from 'jquery';
import { getRichEditInstance } from '../instance';
export class XRRichController extends Disposable {
    constructor(richEdit, xrRichSurfaceModel) {
        super();
        this.richEdit = richEdit;
        this.surface = xrRichSurfaceModel;
        this.init();
    }
    get controlModel() {
        return this.surface._control;
    }
    createSubscribtions() {
        this._disposables.push(this.controlModel._newDocumentData.subscribe((newData) => {
            this.onDocumentDataChanged(newData && newData.content);
        }));
        this._disposables.push(this.controlModel.serializableRtfString.subscribe((value) => this.rtfStringChanged(value)));
        this._disposables.push(this.richEdit.visible.subscribe(newValue => this.onVisibilityChanged(newValue)));
        this._disposables.push(this.surface._height.subscribe(val => {
            if (!this.richEdit.visible() && this.richEdit._richHeight != null) {
                this.richEdit.setRichHeight(val);
                this.richEdit.updateCanvasScroll();
                setTimeout(() => {
                    this.richEdit.changeSize();
                }, 1);
            }
        }));
    }
    dispose() {
        super.dispose();
        this.richEdit.dispose();
        this.fontModel.dispose();
        this.paddingModel.dispose();
        this.richLoader.dispose();
    }
    init() {
        this.locker = new Locker();
        this.fontModel = new RichEditFontModel(this.controlModel.font, this.richEdit, this.controlModel.foreColor, this);
        this.paddingModel = new RichEditPaddingModelWrapper(this.controlModel.padding, this.richEdit);
        this.richLoader = new RichLoader(this.richEdit);
        this.createSubscribtions();
        if (this.surface.serializedRtf()) {
            this.richEdit.openDocument(this.surface.serializedRtf(), 2, $.noop, () => {
                this.surface.isValid(false);
            });
        }
        else {
            this.rtfStringChanged(this.surface.serializedRtf());
        }
    }
    setRtfString(newRtf) {
        this.locker.lock(() => {
            this.surface.serializedRtf(newRtf);
        });
    }
    rtfStringChanged(newRtfString) {
        if (newRtfString === undefined) {
            const openSaveAction = () => {
                this.richEdit.openDocument(btoa(this.surface._control.name()), getRichEditInstance().DocumentFormat.PlainText, () => {
                    const fontName = this.fontModel.family.peek();
                    const fontSize = this.fontModel.size.peek();
                    const rich = this.richEdit.getRealControl();
                    rich.document.setDefaultCharacterProperties({ fontName, size: fontSize });
                    rich.executeCommand(getRichEditInstance().HomeTabCommandId.ChangeFontName, fontName);
                    rich.executeCommand(getRichEditInstance().HomeTabCommandId.ChangeFontSize, fontSize);
                    rich.history.clear();
                    this.richEdit.saveDocument(2, (result) => this.setRtfString(result));
                });
            };
            if (this.surface._control.name()) {
                openSaveAction();
            }
            else {
                const subcription = this.surface._control.name.subscribe(name => {
                    openSaveAction();
                    subcription.dispose();
                });
            }
        }
        else {
            if (this.locker.isUpdate)
                return;
            this.richEdit.openDocument(newRtfString, 2, $.noop, () => {
                this.surface.isValid(false);
            });
        }
    }
    checkValidationState() {
        if (this.richEdit.documentIsEmpty() && this._oldValidState == false) {
            this.surface.isValid(false);
            return false;
        }
        return true;
    }
    onVisibilityChanged(newVisibility) {
        if (!newVisibility) {
            if (this.checkValidationState())
                this.richEdit.saveDocument(2, (newRtfString) => {
                    this.setRtfString(newRtfString);
                });
        }
        else {
            this._oldValidState = this.surface.isValid();
            this.surface.isValid(true);
            this.richEdit.getRealControl().focus();
        }
        if (this.richEdit)
            this.richEdit.focusChanged(newVisibility);
    }
    onDocumentDataChanged(newDocument) {
        this.richLoader.textConverted = (newText) => {
            if (this.checkValidationState()) {
                this.surface.isValid(true);
                this.setRtfString(newText);
            }
        };
        this.richLoader.load({ data: newDocument, dataFormat: this.controlModel.format(), oldText: this.surface.serializedRtf() });
    }
}