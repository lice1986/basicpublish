﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_copyPasteStrategy.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { copyPasteStrategy } from '@devexpress/analytics-core/analytics-internal';
import { StyleModel } from '../controls/properties/style';
import { XRControlViewModel } from '../controls/xrControl';
import { XRCrossTabViewModel } from '../controls/xrCrossTab';
export const reportCopyPasteStrategy = (componentAdded) => ({
    createChild: (pasteTarget, info) => {
        let control = null;
        let parent = pasteTarget;
        if (info['restore']) {
            info['restore']();
            return;
        }
        if (info['@ControlType'] === 'XRCrossBandBox' || info['@ControlType'] === 'XRCrossBandLine') {
            parent = pasteTarget.root;
            control = parent.createChild(info);
        }
        else {
            control = copyPasteStrategy.createChild(parent, info);
            if (control instanceof XRControlViewModel && !info['@Text'] && control.text) {
                control.text('');
            }
        }
        componentAdded && componentAdded({ parent: parent, model: control });
        return control;
    },
    calculateDelta: (selection, pasteTargetSurface, minPoint) => {
        const result = copyPasteStrategy.calculateDelta(selection, pasteTargetSurface, minPoint);
        if (selection.getControlModel().controlType === 'XRCrossBandBox' || selection.getControlModel().controlType === 'XRCrossBandLine') {
            result.y += pasteTargetSurface['absolutePosition'].y();
        }
        return result;
    },
    createSelfRestoringItems(model, serializer) {
        if (model instanceof XRCrossTabViewModel) {
            return model.dependentStyles.map(style => {
                const serializedModel = serializer.serialize(style);
                return {
                    restore: () => (model.root)['styles'] && model.root['styles'].push(new StyleModel(serializedModel, model))
                };
            });
        }
        else
            return [];
    },
    canPaste: (pasteTarget, info) => {
        const pasteTargetSurface = pasteTarget.surface;
        const itemInfos = info['objects'].map(x => pasteTarget.getControlFactory().getControlInfo(pasteTarget.getControlFactory().getControlType(x)));
        return itemInfos.every(x => (!x.canPaste || x.canPaste(pasteTargetSurface)) &&
            (!x.canDrop || x.canDrop(pasteTargetSurface)));
    }
});