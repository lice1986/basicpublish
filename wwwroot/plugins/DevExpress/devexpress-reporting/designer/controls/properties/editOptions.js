﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\editOptions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { Categories } from '../../../common/utils/editingFieldExtensions';
import { EditOptionsEditorNameEditorModel } from '../../widgets/editOptionsEditor';
import { editOptionsSerializationInfo } from '../metadata/properties/editOptionsSerializationInfo';
export class EditOptions {
    constructor(model, serializer) {
        serializer = serializer || new ModelSerializer();
        serializer.deserialize(this, model || {});
    }
    getInfo() {
        return editOptionsSerializationInfo;
    }
    isEmpty() {
        return !this.enabled();
    }
    isPropertyDisabled(name) {
        return name !== 'enabled' && !this.enabled();
    }
}
export class ContainerEditOptions extends EditOptions {
    constructor(model, parent, serializer) {
        super(model || {}, serializer);
        this.parent = parent;
    }
    isPropertyDisabled(name) {
        if (name == 'enabled') {
            return this.parent.controls().length > 0;
        }
        else
            return super.isPropertyDisabled(name);
    }
}
export class CheckEditOptions extends EditOptions {
    constructor(model, serializer) {
        super(model || {}, serializer);
    }
    getInfo() {
        return super.getInfo().concat([
            { propertyName: 'groupId', modelName: '@GroupID', displayName: 'Group ID', localizationId: 'DevExpress.XtraReports.UI.CheckEditOptions.GroupID', defaultVal: '', editor: editorTemplates.getEditor('text') }
        ]);
    }
}
export class ImageEditOptions extends EditOptions {
    constructor(model, serializer) {
        super(model || {}, serializer);
    }
    getInfo() {
        return super.getInfo().concat([
            {
                propertyName: 'editorName', modelName: '@EditorName', displayName: 'Editor Name', localizationId: 'DevExpress.XtraReports.UI.ImageEditOptions.EditorName', defaultVal: '',
                editor: { header: 'dxrd-editOptionsEditorName', editorType: EditOptionsEditorNameEditorModel },
                editorOptions: { acceptCustomValue: true, categories: [Categories.Image()] }
            }
        ]);
    }
}
export class TextEditOptions extends EditOptions {
    constructor(model, serializer) {
        super(model || {}, serializer);
    }
    getInfo() {
        const categories = Categories;
        return super.getInfo().concat([
            {
                propertyName: 'editorName', modelName: '@EditorName', displayName: 'Editor Name', localizationId: 'DevExpress.XtraReports.UI.TextEditOptions.EditorName', defaultVal: '',
                editor: { header: 'dxrd-editOptionsEditorName', editorType: EditOptionsEditorNameEditorModel },
                editorOptions: { acceptCustomValue: true, excludeCategories: [categories.Image()] }
            }
        ]);
    }
}
