﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrTableOfContents.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Size } from '@devexpress/analytics-core/analytics-elements';
import { editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as $ from 'jquery';
import { designerEditorTemplates } from '../../widgets/editorTemplates';
import { accessibleDescription, canPublish, location, rtl, text, textAlignment } from './properties/metadata';
import { commonControlProperties } from './properties/metadataGroups';
import { baseTocLevelSerializationsInfo, tocLevelSerializationsInfo } from './xrTableOfContentsLevel';
const size = { propertyName: 'size', modelName: '@SizeF', from: Size.fromString };
const formattingRuleLinks = {
    propertyName: 'formattingRuleLinks', modelName: 'FormattingRuleLinks'
};
export const tocTitleSerializationsInfo = [text, $.extend({}, textAlignment, { defaultVal: 'TopLeft' })].concat(baseTocLevelSerializationsInfo);
export const tocTitle = { propertyName: 'levelTitle', modelName: 'LevelTitle', displayName: 'Level Title', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContents.LevelTitle', info: tocTitleSerializationsInfo, editor: editorTemplates.getEditor('objecteditor') };
export const tocLevelDefault = { propertyName: 'levelDefault', modelName: 'LevelDefault', displayName: 'Level Default', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContents.LevelDefault', info: tocLevelSerializationsInfo, editor: editorTemplates.getEditor('objecteditor') };
export const maxNestingLevel = { propertyName: 'maxNestingLevel', modelName: '@MaxNestingLevel', defaultVal: 0, displayName: 'Max Nesting Level', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContents.MaxNestingLevel', editor: editorTemplates.getEditor('numeric'), editorOptions: { min: 0 } };
export const tocLevels = {
    propertyName: 'levels',
    modelName: 'Levels',
    displayName: 'Levels', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContents.Levels',
    array: true,
    editor: designerEditorTemplates.getEditor('toclevel'),
    template: '#dxrd-collectionItemWithAccordion'
};
const tocProperties = commonControlProperties.filter((item) => { return item !== canPublish && item != accessibleDescription; });
export const tocSerializationsInfo = [formattingRuleLinks, size, location, tocTitle, tocLevels, tocLevelDefault, maxNestingLevel, rtl].concat(tocProperties);
