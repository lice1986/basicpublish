﻿/**
* DevExpress Analytics (core\_metadata.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { editorTemplates } from '../property-grid/widgets/editorsInfo';
export const sizeFake = [
    { propertyName: 'height', displayName: 'Height', localizationId: 'AnalyticsCoreStringId.SizeF.Height', editor: editorTemplates.getEditor('numeric'), editorOptions: { min: 2 } },
    { propertyName: 'width', displayName: 'Width', localizationId: 'AnalyticsCoreStringId.SizeF.Width', editor: editorTemplates.getEditor('numeric'), editorOptions: { min: 2 } }
];
export const locationFake = [
    { propertyName: 'x', displayName: 'X', editor: editorTemplates.getEditor('numeric') },
    { propertyName: 'y', displayName: 'Y', editor: editorTemplates.getEditor('numeric') }
];
