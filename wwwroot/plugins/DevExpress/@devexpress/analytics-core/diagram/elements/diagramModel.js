﻿/**
* DevExpress Analytics (diagram\elements\diagramModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DiagramElementBaseViewModel } from './diagramElementBaseViewModel';
import { ModelSerializer } from '../../serializer/serializer';
import { Margins } from '../../core/elements/margins';
import { floatFromModel } from '../../core/utils/parsers';
import { name } from '../metadata';
import { editorTemplates } from '../../property-grid/widgets/editorsInfo';
export class DiagramViewModel extends DiagramElementBaseViewModel {
    constructor(diagramSource) {
        const serializer = new ModelSerializer();
        super(diagramSource, null, serializer);
        this.controlType = 'Diagram';
        this.controls = ko.observableArray();
        this.name('Diagram');
    }
    getInfo() {
        return diagramSerializationsInfo;
    }
}
export const margins = { propertyName: 'margins', modelName: '@Margins', from: Margins.fromString, displayName: 'Margins' };
export const pageWidth = { propertyName: 'pageWidth', modelName: '@PageWidth', defaultVal: 850, from: floatFromModel, displayName: 'Page Width', editor: editorTemplates.getEditor('numeric') };
export const pageHeight = { propertyName: 'pageHeight', modelName: '@PageHeight', defaultVal: 1250, from: floatFromModel, displayName: 'Page Height', editor: editorTemplates.getEditor('numeric') };
export const diagramSerializationsInfo = [name, pageWidth, pageHeight, margins];
