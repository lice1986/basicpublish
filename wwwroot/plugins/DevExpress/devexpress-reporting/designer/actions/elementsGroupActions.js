﻿/**
* DevExpress HTML/JS Reporting (designer\actions\elementsGroupActions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { XRCellsurface } from '../controls/xrCrossTabCell';
import { AlignmentHandler } from './_alignmentHandler';
import { SpaceCommandHandler } from './_spaceCommandHandler';
export class ElementsGroupActions extends BaseActionsProvider {
    constructor(surfaceContext, selectionProvider) {
        super();
        this._selectionProvider = selectionProvider;
        const alignHandler = new AlignmentHandler(selectionProvider, surfaceContext), spaceCommandHandler = new SpaceCommandHandler(selectionProvider, surfaceContext);
        super.initActions([
            {
                text: 'Align Lefts',
                group: () => getLocalization('Alignment', 'ReportStringId.RibbonXRDesign_PageGroup_Alignment'),
                displayText: () => getLocalization('Align Lefts', 'ReportStringId.UD_TTip_AlignLeft'),
                imageClassName: 'dxrd-image-actions-align_lefts',
                imageTemplateName: 'dxrd-svg-actions-align_lefts',
                clickAction: () => { alignHandler.alignLeft(); },
            }, {
                text: 'Align Centers',
                group: () => getLocalization('Alignment', 'ReportStringId.RibbonXRDesign_PageGroup_Alignment'),
                displayText: () => getLocalization('Align Centers', 'ReportStringId.RibbonXRDesign_AlignVerticalCenters_STipTitle'),
                imageClassName: 'dxrd-image-actions-align_centers',
                imageTemplateName: 'dxrd-svg-actions-align_centers',
                clickAction: () => { alignHandler.alignVerticalCenters(); },
            }, {
                text: 'Align Rights',
                group: () => getLocalization('Alignment', 'ReportStringId.RibbonXRDesign_PageGroup_Alignment'),
                displayText: () => getLocalization('Align Rights', 'ReportStringId.RibbonXRDesign_AlignRight_Caption'),
                imageClassName: 'dxrd-image-actions-align_rights',
                imageTemplateName: 'dxrd-svg-actions-align_rights',
                clickAction: () => { alignHandler.alignRight(); },
            }, {
                text: 'Align Tops',
                group: () => getLocalization('Alignment', 'ReportStringId.RibbonXRDesign_PageGroup_Alignment'),
                displayText: () => getLocalization('Align Tops', 'ReportStringId.RibbonXRDesign_AlignTop_Caption'),
                imageClassName: 'dxrd-image-actions-align_tops',
                imageTemplateName: 'dxrd-svg-actions-align_tops',
                clickAction: () => { alignHandler.alignTop(); },
            }, {
                text: 'Align Middles',
                group: () => getLocalization('Alignment', 'ReportStringId.RibbonXRDesign_PageGroup_Alignment'),
                displayText: () => getLocalization('Align Middles', 'ReportStringId.RibbonXRDesign_AlignHorizontalCenters_Caption'),
                imageClassName: 'dxrd-image-actions-align_middles',
                imageTemplateName: 'dxrd-svg-actions-align_middles',
                clickAction: () => { alignHandler.alignHorizontalCenters(); },
            }, {
                text: 'Align Bottoms',
                group: () => getLocalization('Alignment', 'ReportStringId.RibbonXRDesign_PageGroup_Alignment'),
                displayText: () => getLocalization('Align Bottoms', 'ReportStringId.RibbonXRDesign_AlignBottom_Caption'),
                imageClassName: 'dxrd-image-actions-align_bottoms',
                imageTemplateName: 'dxrd-svg-actions-align_bottoms',
                clickAction: () => { alignHandler.alignBottom(); },
            }, {
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                text: 'Size to Control Width',
                displayText: () => getLocalization('Size to Control Width', 'ASPxReportsStringId.ReportDesigner_ElementsAction_SizeToControlWidth'),
                imageClassName: 'dxrd-image-actions-make_same_width',
                imageTemplateName: 'dxrd-svg-actions-make_same_width',
                clickAction: () => { alignHandler.sizeToControlWidth(); },
            }, {
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                text: 'Size to Control Height',
                displayText: () => getLocalization('Size to Control Height', 'ASPxReportsStringId.ReportDesigner_ElementsAction_SizeToControlHeight'),
                imageClassName: 'dxrd-image-actions-make_same_height',
                imageTemplateName: 'dxrd-svg-actions-make_same_height',
                clickAction: () => { alignHandler.sizeToControlHeight(); },
            }, {
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                text: 'Size to Control',
                displayText: () => getLocalization('Size to Control', 'ASPxReportsStringId.ReportDesigner_ElementsAction_SizeToControl'),
                imageClassName: 'dxrd-image-actions-make_same_sizes',
                imageTemplateName: 'dxrd-svg-actions-make_same_sizes',
                clickAction: () => { alignHandler.sizeToControl(); },
            }, {
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                text: 'Make Horizontal Spacing Equal',
                displayText: () => getLocalization('Make Horizontal Spacing Equal', 'ReportStringId.UD_TTip_HorizSpaceMakeEqual'),
                imageClassName: 'dxrd-image-actions-make_horizontal_spacing_equal',
                imageTemplateName: 'dxrd-svg-actions-make_horizontal_spacing_equal',
                clickAction: () => { spaceCommandHandler.horizSpaceMakeEqual(); },
                hasSeparator: true
            }, {
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                text: 'Increase Horizontal Spacing',
                displayText: () => getLocalization('Increase Horizontal Spacing', 'ReportStringId.UD_TTip_HorizSpaceIncrease'),
                imageClassName: 'dxrd-image-actions-increase_horizontal_spacing',
                imageTemplateName: 'dxrd-svg-actions-increase_horizontal_spacing',
                clickAction: () => { spaceCommandHandler.horizSpaceIncrease(); },
            }, {
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                text: 'Decrease Horizontal Spacing',
                displayText: () => getLocalization('Decrease Horizontal Spacing', 'ReportStringId.RibbonXRDesign_HorizSpaceDecrease_Caption'),
                imageClassName: 'dxrd-image-actions-decrease_horizontal_spacing',
                imageTemplateName: 'dxrd-svg-actions-decrease_horizontal_spacing',
                clickAction: () => { spaceCommandHandler.horizSpaceDecrease(); },
            }, {
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                text: 'Remove Horizontal Spacing',
                displayText: () => getLocalization('Remove Horizontal Spacing', 'ReportStringId.RibbonXRDesign_HorizSpaceConcatenate_Caption'),
                imageClassName: 'dxrd-image-actions-remove_horizontal_spacing',
                imageTemplateName: 'dxrd-svg-actions-remove_horizontal_spacing',
                clickAction: () => { spaceCommandHandler.horizSpaceConcatenate(); },
            }, {
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                text: 'Make Vertical Spacing Equal',
                displayText: () => getLocalization('Make Vertical Spacing Equal', 'ReportStringId.RibbonXRDesign_VertSpaceMakeEqual_Caption'),
                imageClassName: 'dxrd-image-actions-make_vertical_spacing_equal',
                imageTemplateName: 'dxrd-svg-actions-make_vertical_spacing_equal',
                clickAction: () => { spaceCommandHandler.vertSpaceMakeEqual(); },
                hasSeparator: true
            }, {
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                text: 'Increase Vertical Spacing',
                displayText: () => getLocalization('Increase Vertical Spacing', 'ReportStringId.RibbonXRDesign_VertSpaceIncrease_STipTitle'),
                imageClassName: 'dxrd-image-actions-increase_vertical_spacing',
                imageTemplateName: 'dxrd-svg-actions-increase_vertical_spacing',
                clickAction: () => { spaceCommandHandler.vertSpaceIncrease(); },
            }, {
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                text: 'Decrease Vertical Spacing',
                displayText: () => getLocalization('Decrease Vertical Spacing', 'ReportStringId.UD_TTip_VertSpaceDecrease'),
                imageClassName: 'dxrd-image-actions-decrease_vertical_spacing',
                imageTemplateName: 'dxrd-svg-actions-decrease_vertical_spacing',
                clickAction: () => { spaceCommandHandler.vertSpaceDecrease(); },
            }, {
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                text: 'Remove Vertical Spacing',
                displayText: () => getLocalization('Remove Vertical Spacing', 'ReportStringId.UD_TTip_VertSpaceConcatenate'),
                imageClassName: 'dxrd-image-actions-remove_vertical_spacing',
                imageTemplateName: 'dxrd-svg-actions-remove_vertical_spacing',
                clickAction: () => { spaceCommandHandler.vertSpaceConcatenate(); },
            }
        ]);
        this.setDisabled = (context) => {
            const isDisabled = this._selectionProvider.selectedItems.some((item) => { return item.locked; });
            this.actions.forEach((action) => {
                action.disabled(isDisabled);
            });
        };
    }
    condition(context) {
        return this._selectionProvider.selectedItems.length > 1 && !this._selectionProvider.selectedItems.some(item => item instanceof XRCellsurface);
    }
}
