﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\parametersDialogs.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend, getParentContainer, getUniqueNameForNamedObjectsArray, StringId } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, getLocalization, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates, ObjectProperties, unwrapEditor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { valueSourceSettingsSerializationInfo } from '../../dataObjects/metadata/parameters/parameter';
import { ParameterLayoutItem } from '../../dataObjects/parameters/layoutItems';
import { Parameter } from '../../dataObjects/parameters/parameter';
import { ParameterExpressionAddOn } from '../../dataObjects/parameters/parameterExpressionAddon';
class SettingsAreaModel {
    constructor(_parameter) {
        this._parameter = _parameter;
        this.valueSourceSettingsType = this._parameter.valueSourceSettingsType;
        this.valueSourceSettings = this._parameter.valueSourceSettings;
    }
    getInfo() {
        return this._parameter.getInfo().reduce((currentInfo, x) => {
            if (x.propertyName === 'valueSourceSettingsType') {
                const info = extend(true, {}, x);
                info.editor = editorTemplates.getEditor('combobox');
                currentInfo.push(info);
            }
            else if (x.propertyName === valueSourceSettingsSerializationInfo.propertyName) {
                const info = extend(true, {}, x);
                info.editor = editorTemplates.getEditor('inplaceObjectEditor');
                currentInfo.push(info);
            }
            return currentInfo;
        }, []);
    }
    isPropertyVisible(propertyName) {
        if (propertyName === 'valueSourceSettings')
            return this.valueSourceSettingsType() !== 'None';
        return true;
    }
}
export class ParametersDialogBase extends Disposable {
    constructor(_currentReport) {
        super();
        this._currentReport = _currentReport;
        this._undoEngine = null;
        this._isSubmited = false;
        this.buttons = [
            this._createButton(getLocalization('OK', StringId.DataAccessBtnOK), () => this.submit(), 'default'),
            this._createButton(getLocalization('Cancel', StringId.DataAccessBtnCancel), () => this.visible(false))
        ];
        this._editableObject = ko.observable(null);
        this._selectedItem = ko.observable(null);
        this._selectedParameter = ko.observable(null);
        this._selectedParameterSettings = ko.observable(null);
        this.visible = ko.observable(false);
        this.container = (element) => getParentContainer(element);
        this._disposables.push(this._propertiesGrid = new ObjectProperties(this._editableObject), this._settingsGrid = new ObjectProperties(this._selectedParameterSettings), this.visible.subscribe((newVal) => !newVal && this.close()), this._selectedItem.subscribe((item) => {
            const parameter = item && this._getParameterFromLayoutItem(item);
            if (parameter) {
                this._editableObject(parameter);
                this._selectedParameterSettings(new SettingsAreaModel(parameter));
            }
            else {
                this._editableObject(item);
                this._selectedParameterSettings(null);
            }
            this._selectedParameter(parameter);
        }));
        this._propertiesGrid.createEditorAddOn = (_editor) => {
            const editor = unwrapEditor(_editor);
            if (this._selectedParameter() && this._selectedParameter().propertyExpressionMapper.getExpressionProperty(editor.name) &&
                editor.name.toLowerCase().indexOf('value') === -1) {
                const addon = new ParameterExpressionAddOn(editor, this._selectedParameter);
                return {
                    data: addon,
                    templateName: 'dx-wizard-menu-box-editorswitch'
                };
            }
        };
    }
    dispose() {
        super.dispose();
        this.selectItem(null);
        this.removeProperties();
    }
    onSubmit() { }
    get undoEngine() {
        if (!this._undoEngine) {
            this._undoEngine = UndoEngine.tryGetUndoEngine(this._currentReport);
        }
        return this._undoEngine;
    }
    _getParameterFromLayoutItem(layoutItem) {
        return layoutItem instanceof ParameterLayoutItem ? layoutItem.parameter() : null;
    }
    _createParameter(parameters = this._currentReport.parameters()) {
        const newName = getUniqueNameForNamedObjectsArray(parameters, 'parameter'), newParameter = new Parameter({ '@Name': newName, '@Description': 'P' + newName.slice(1) }, this._currentReport);
        newParameter._isEditing(true);
        newParameter._showLayoutProperties(true);
        return new ParameterLayoutItem({}, this._currentReport, null, newParameter);
    }
    _createButton(text, action, type = 'normal') {
        return {
            toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                text: text, type: type, stylingMode: 'contained', onClick: action
            }
        };
    }
    selectItem(layoutItem) {
        const previousParameter = this._selectedParameter();
        const parameter = this._getParameterFromLayoutItem(layoutItem);
        if (parameter && previousParameter === parameter)
            return;
        this._selectedItem(layoutItem);
    }
    show(parameter) {
        this.undoEngine.start();
        this._isSubmited = false;
        this._currentReport.parameterHelper.startEditing();
        this._onStart(this._currentReport.parameterHelper.getParameterLayoutItem(parameter));
        this.visible(true);
    }
    _onStart(layoutItem) {
        this.selectItem(layoutItem);
        this._selectedItem.valueHasMutated();
    }
    close() {
        const cancel = !this._isSubmited && this.undoEngine._hasSessionChanges();
        this._currentReport.parameterHelper.endEditing();
        this.undoEngine.end();
        cancel && this.undoEngine.undo(true);
        this.selectItem(null);
    }
    submit() {
        this._isSubmited = true;
        this.onSubmit();
        this.visible(false);
    }
}
export class AddParameterDialog extends ParametersDialogBase {
    constructor() {
        super(...arguments);
        this.popupCss = 'dxrd-parameters-add-dialog';
        this.title = getLocalization('Add Parameter', 'ASPxReportsStringId.ReportDesigner_ParametersDialog_AddParameter');
        this.width = 900;
        this.height = 632;
        this.contentTemplate = 'dxrd-parameter-edit';
    }
    onSubmit() {
        this._currentReport.parameterPanelLayoutItems.push(this._selectedItem());
        this._currentReport.parameters.push(this._selectedParameter());
    }
    _onStart(parameter = this._createParameter()) {
        super._onStart(parameter);
    }
}
