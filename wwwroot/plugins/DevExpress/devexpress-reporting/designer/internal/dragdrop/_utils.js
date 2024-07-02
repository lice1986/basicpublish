﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_utils.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Size } from '@devexpress/analytics-core/analytics-elements';
import { PathRequest } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import { BandSurface } from '../../bands/xrBand';
import { VerticalBandSurface, VerticalBandViewModel } from '../../bands/xrVerticalBand';
import { Parameter } from '../../dataObjects/parameters/parameter';
import { controlsFactory } from '../../utils/settings';
import { DataBindingMode } from '../_dataBindingMode';
export function selectTreeListItem(item, event) {
    if (!item.isMultiSelected && !item.isSelected && item.toggleSelected)
        item.toggleSelected(item, event);
}
export function getClosestDataMember(control) {
    while (control && !control['dataSource'] && !control['dataMember']) {
        control = control.parentModel();
    }
    return control['dataMember'] && control['dataMember']();
}
export function getExpressionPath(container, pathRequest) {
    const fullPath = pathRequest instanceof PathRequest ? pathRequest.fullPath : pathRequest;
    if (fullPath.indexOf(Parameter.ParametersRefString + '.') === 0) {
        const pathParts = fullPath.split('.');
        return '?' + pathParts[pathParts.length - 1];
    }
    let path = pathRequest instanceof PathRequest ? pathRequest.path : pathRequest;
    const dataMember = getClosestDataMember(container);
    const prefix = dataMember && dataMember + '.';
    path = (prefix && path.indexOf(prefix) === 0) ? path.slice(prefix.length) : path;
    return '[' + path + ']';
}
export function getFirstSurfaceParentByType(target, checkBandsType) {
    return checkBandsType(target) ? target : getFirstSurfaceParentByType(target.parent, checkBandsType);
}
export function getUsefulReportWidth(surface) {
    const report = surface && surface.getControlModel();
    return surface ?
        Size.fromString(((report.pageWidth() - report.margins.left() - report.margins.right()) / (surface.dpi() / 100)).toString() + ', 23') :
        Size.fromString('200, 23');
}
export function createPictureBox(container, bindingPath, dataBindingMode) {
    const newControl = container.createChild($.extend({ '@ControlType': 'XRPictureBox' }, controlsFactory().controlsMap['XRPictureBox'].defaultVal));
    if (dataBindingMode === DataBindingMode.Bindings) {
        const binding = newControl.dataBindings()['findBinding']('ImageSource');
        binding.dataMember(bindingPath);
    }
    else {
        const binding = newControl['expressionObj'].getExpression('ImageSource', 'BeforePrint');
        binding.value(getExpressionPath(container, bindingPath));
    }
    return newControl;
}
export const _checkBandsType = (target) => target instanceof BandSurface || target instanceof VerticalBandSurface;
export function createSimpleControl(controlType, dropTargetControl) {
    return dropTargetControl.createChild($.extend({ '@ControlType': controlType }, controlsFactory().controlsMap[controlType].defaultVal));
}
export function assignBinding(control, container, bindingName, item, dataBindingMode) {
    if (dataBindingMode === DataBindingMode.Bindings) {
        const binding = control.dataBindings()['findBinding'](bindingName);
        if (item.path.indexOf('Parameters.') === -1) {
            binding.dataMember(new PathRequest(item.path).path);
        }
        else {
            binding.dataMember(item.data.name);
            binding.parameter(item.data);
        }
    }
    else {
        const binding = control['expressionObj'].getExpression(bindingName, 'BeforePrint');
        binding.value(getExpressionPath(container, new PathRequest(item.path)));
    }
    return control;
}
export function isList(data) {
    return data.isList === true || data.specifics === 'List' || data.specifics === 'ListSource';
}
function _disableCanGrowProperty(model) {
    if (model.controlType === 'XRTable') {
        model.rows().forEach(row => row.cells().forEach(cell => _disableCanGrowProperty(cell)));
    }
    if (model['canGrow'] && model['canGrow']()) {
        model['canGrow'](false);
    }
}
export function dragDropComponentAdded(model, parent) {
    if (!(parent instanceof VerticalBandViewModel))
        return;
    _disableCanGrowProperty(model);
}