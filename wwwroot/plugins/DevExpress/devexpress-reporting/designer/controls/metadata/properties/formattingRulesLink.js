﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\formattingRulesLink.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { designerEditorTemplates } from '../../../widgets/editorTemplates';
import { FormattingRule } from '../../properties/formattingrules';
export const formattingRuleLinks = {
    propertyName: 'formattingRuleLinks', modelName: 'FormattingRuleLinks', displayName: 'Formatting Rules', localizationId: 'DevExpress.XtraReports.UI.XRControl.FormattingRules', array: true,
    editor: designerEditorTemplates.getEditor('formattingRule'), addHandler: FormattingRule.createNew,
    displayPropertyName: 'name'
};
