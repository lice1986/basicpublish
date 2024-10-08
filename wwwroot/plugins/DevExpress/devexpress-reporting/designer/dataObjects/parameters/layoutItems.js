﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\layoutItems.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { deserializeArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { controlsFactory } from '../../utils/settings';
import { groupLayoutItemInfo, parameterLayoutItemInfo, separatorLayoutItemInfo } from '../metadata/parameters/layoutItems';
var ParameterPanelLayoutItemTypes;
(function (ParameterPanelLayoutItemTypes) {
    ParameterPanelLayoutItemTypes[ParameterPanelLayoutItemTypes["Parameter"] = 0] = "Parameter";
    ParameterPanelLayoutItemTypes[ParameterPanelLayoutItemTypes["Group"] = 1] = "Group";
    ParameterPanelLayoutItemTypes[ParameterPanelLayoutItemTypes["Separator"] = 2] = "Separator";
})(ParameterPanelLayoutItemTypes || (ParameterPanelLayoutItemTypes = {}));
export class ParameterPanelLayoutItem extends ElementViewModel {
    constructor(model, parent, serializer) {
        super(model, parent, serializer);
        this.name = ko.observable(null);
        const parameterHelper = this.root.parameterHelper;
        parameterHelper && parameterHelper.addParameterPanelLayoutItem(this);
    }
    static createLayoutItem(model, parent, serializer) {
        return new ParameterPanelMapper[model['@LayoutItemType']](model, parent, serializer);
    }
    delete() {
        this.parentModel().parameterPanelLayoutItems.remove(this);
    }
    getControlFactory() {
        return controlsFactory();
    }
    className() {
        return '';
    }
}
export class GroupLayoutItem extends ParameterPanelLayoutItem {
    constructor(model, parent, serializer) {
        super(model, parent, serializer);
        this.layoutItemType(ParameterPanelLayoutItemTypes[ParameterPanelLayoutItemTypes.Group]);
        this.name = this.title;
        this.parameterPanelLayoutItems = deserializeArray(model.Items, (item) => { return ParameterPanelLayoutItem.createLayoutItem(item, this, serializer); });
    }
    getInfo() {
        return groupLayoutItemInfo;
    }
    className() {
        return 'parametergroup';
    }
    isPropertyDisabled(name) {
        return name === 'expanded' && !this.showExpandButton();
    }
}
export class SeparatorLayoutItem extends ParameterPanelLayoutItem {
    constructor() {
        super(...arguments);
        this.layoutItemType = ko.observable(ParameterPanelLayoutItemTypes[ParameterPanelLayoutItemTypes.Separator]);
        this.name = ko.observable(this.layoutItemType());
    }
    getInfo() {
        return separatorLayoutItemInfo;
    }
    className() {
        return 'parameterseparator';
    }
}
export class ParameterLayoutItem extends ParameterPanelLayoutItem {
    constructor(model, parent, serializer, parameter) {
        super(model, parent, serializer);
        this.layoutItemType(ParameterPanelLayoutItemTypes[ParameterPanelLayoutItemTypes.Parameter]);
        parameter = parameter || this.parameter();
        if (model['@Name']) {
            parameter = this.root.parameters().filter(x => x.name === model['@Name'])[0];
        }
        if (parameter) {
            this.parameter(parameter);
            this.name = parameter.parameterName;
            parameter.labelOrientation() === 'Vertical' && this.labelOrientation('Vertical');
            parameter.labelOrientation = this.labelOrientation;
        }
    }
    className() {
        return this.parameter() && this.parameter().specifics;
    }
    getInfo() {
        return parameterLayoutItemInfo;
    }
}
export const ParameterPanelMapper = {
    Group: GroupLayoutItem,
    Separator: SeparatorLayoutItem,
    Parameter: ParameterLayoutItem
};
