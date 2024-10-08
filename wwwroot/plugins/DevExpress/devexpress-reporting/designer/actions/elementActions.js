﻿/**
* DevExpress HTML/JS Reporting (designer\actions\elementActions.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider, localizeWithUpdateLocalizationMethod } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { BandViewModel } from '../bands/xrBand';
import { XRCrossBandSurface } from '../controls/xrCrossband';
import { XRCellsurface, XRCrossTabCellViewModel } from '../controls/xrCrossTabCell';
import { XRTableCellViewModel } from '../controls/xrTableCell';
import { XRTableRowViewModel } from '../controls/xrTableRow';
import { FitToContainerAction } from './fitToContainerAction';
import { AlignmentHandler } from './_alignmentHandler';
export class ElementActions extends BaseActionsProvider {
    constructor(surfaceContext, selectionProvider) {
        super();
        this._selectionProvider = selectionProvider;
        this._isMultiSelect = ko.observable(false);
        const alignHandler = new AlignmentHandler(selectionProvider, surfaceContext);
        const fitToContainerAction = new FitToContainerAction(selectionProvider.focused);
        super.initActions([
            {
                text: 'Align to Grid',
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                displayText: () => getLocalization('Align to Grid', 'ReportStringId.Cmd_AlignToGrid'),
                imageClassName: 'dxrd-image-actions-align_to_grid',
                imageTemplateName: 'dxrd-svg-actions-align_to_grid',
                clickAction: () => { alignHandler.alignToGrid(); },
                disabled: ko.pureComputed(() => { return this._generalDisabled; }),
            }, {
                text: 'Size to Grid',
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                displayText: () => getLocalization('Size to Grid', 'ReportStringId.UD_Capt_MakeSameSizeSizeToGrid'),
                imageClassName: 'dxrd-image-actions-size_to_grid',
                imageTemplateName: 'dxrd-svg-actions-size_to_grid',
                clickAction: () => { alignHandler.sizeToGrid(); },
                disabled: ko.pureComputed(() => { return this._generalDisabled; }),
            }, {
                text: 'Center Horizontally',
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                displayText: () => getLocalization('Center Horizontally', 'ReportStringId.RibbonXRDesign_CenterHorizontally_STipTitle'),
                imageClassName: 'dxrd-image-actions-center_horizontally',
                imageTemplateName: 'dxrd-svg-actions-center_horizontally',
                hasSeparator: true,
                clickAction: () => { alignHandler.centerHorizontally(); },
                disabled: ko.pureComputed(() => {
                    return this._generalDisabled ||
                        selectionProvider.focused() instanceof XRCrossBandSurface ||
                        (() => {
                            let someParentIsNotBand = false;
                            let someParentNotFocused = false;
                            return selectionProvider.selectedItems.some(x => {
                                if (!x.parent)
                                    return true;
                                if (!someParentIsNotBand)
                                    someParentIsNotBand = !(x.parent.getControlModel() instanceof BandViewModel);
                                if (!someParentNotFocused)
                                    someParentNotFocused = x.parent !== selectionProvider.selectedItems[0].parent;
                                return someParentNotFocused && someParentIsNotBand;
                            });
                        })();
                })
            }, {
                text: 'Center Vertically',
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                displayText: () => getLocalization('Center Vertically', 'ReportStringId.RibbonXRDesign_CenterVertically_STipTitle'),
                imageClassName: 'dxrd-image-actions-center_vertically',
                imageTemplateName: 'dxrd-svg-actions-center_vertically',
                clickAction: () => { alignHandler.centerVertically(); },
                disabled: ko.pureComputed(() => {
                    return this._generalDisabled ||
                        selectionProvider.focused() instanceof XRCrossBandSurface ||
                        selectionProvider.selectedItems.some(x => x.parent !== selectionProvider.selectedItems[0].parent);
                })
            }, {
                text: 'Bring to Front',
                group: () => localizeWithUpdateLocalizationMethod('Arranging') || getLocalization('Arrangement', 'ReportStringId.RibbonXRDesign_PageGroup_Arranging'),
                displayText: () => getLocalization('Bring to Front', 'ReportStringId.Cmd_BringToFront'),
                imageClassName: 'dxrd-image-actions-bring_to_front',
                imageTemplateName: 'dxrd-svg-actions-bring_to_front',
                clickAction: () => { alignHandler.bringToFront(); },
                disabled: ko.pureComputed(() => { return this._generalDisabled || !alignHandler.canChangeZOrder(); }),
            }, {
                text: 'Send to Back',
                group: () => localizeWithUpdateLocalizationMethod('Arranging') || getLocalization('Arrangement', 'ReportStringId.RibbonXRDesign_PageGroup_Arranging'),
                displayText: () => getLocalization('Send to Back', 'ReportStringId.Cmd_SendToBack'),
                imageClassName: 'dxrd-image-actions-send_to_back',
                imageTemplateName: 'dxrd-svg-actions-send_to_back',
                clickAction: () => { alignHandler.sendToBack(); },
                disabled: ko.pureComputed(() => { return this._generalDisabled || !alignHandler.canChangeZOrder(); }),
            }, {
                text: 'Fit Bounds To Container',
                group: () => getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'),
                displayText: () => getLocalization('Fit Bounds To Container', 'ReportStringId.Cmd_FitBoundsToContainer'),
                imageClassName: 'dxrd-image-actions-fit_to_container',
                imageTemplateName: 'dxrd-svg-actions-fit_to_container',
                clickAction: () => { fitToContainerAction.doAction(); },
                hasSeparator: true,
                disabled: ko.pureComputed(() => { return this._generalDisabled || !fitToContainerAction.allowed(); }),
                visible: ko.pureComputed(() => {
                    return !this._isMultiSelect() && fitToContainerAction.visible();
                })
            }
        ]);
        this.setDisabled = (context) => {
            this._generalDisabled = this._selectionProvider.selectedItems.some((item) => { return item.locked; });
        };
    }
    condition(context) {
        this._isMultiSelect(context.controlType === 'multiselect');
        if (this._isMultiSelect())
            return !this._selectionProvider.selectedItems.some(item => item instanceof XRCellsurface);
        return !(context instanceof XRTableCellViewModel || context instanceof XRTableRowViewModel || context instanceof XRCrossTabCellViewModel);
    }
}
