﻿/**
* DevExpress Analytics (serializer\native\templatesEngineTyping.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IObjectPropertiesViewModel, IPropertyGridEditorViewModel } from '../../property-grid/propertygrid';
import { ICollectionEditorViewModel, ICollectionItemWrapperViewModel } from '../../property-grid/widgets/collectioneditor/_editor';
import { IEditorViewModel } from '../../property-grid/widgets/editor';
import { IActionViewModel, ISelectBoxActionViewModel } from '../../widgets/utils';
import { IColorPickerEditorViewModel } from '../../core/widgets/colorPickerEditor';
import { IFieldListEditorViewModel } from '../../core/widgets/fieldListEditor';
import { ITabPanelViewModel } from '../../core/widgets/tabPanel';
export declare type TemplateEngineTypes = {
    'dx-right-panel-lightweight': ITabPanelViewModel;
    'dxrd-right-panel-template-base': ITabPanelViewModel;
    'dxrd-toolbar-tmplt': IActionViewModel[];
    'dxrd-zoom-select-template': ISelectBoxActionViewModel;
    'dx-propertieseditor': IObjectPropertiesViewModel;
    'dx-boolean': IEditorViewModel;
    'dx-boolean-select': IEditorViewModel;
    'dx-numeric': IEditorViewModel;
    'dx-combobox': IEditorViewModel;
    'dx-text': IEditorViewModel;
    'dx-commonCollection': IEditorViewModel;
    'dx-emptyHeader': undefined;
    'dx-objectEditorContent': IPropertyGridEditorViewModel;
    'dxrd-field': IFieldListEditorViewModel;
    'dx-number-editor': IEditorViewModel;
    'dx-collectioneditor': ICollectionEditorViewModel;
    'dxrd-commonCollectionItem': ICollectionItemWrapperViewModel;
    'dx-commonCollectionItem': ICollectionItemWrapperViewModel;
    'dxqb-collectioneditor-template': ICollectionItemWrapperViewModel;
    'dx-jsonwizard-parametercollection': ICollectionItemWrapperViewModel;
    'dxrd-colorpicker': IColorPickerEditorViewModel;
};
