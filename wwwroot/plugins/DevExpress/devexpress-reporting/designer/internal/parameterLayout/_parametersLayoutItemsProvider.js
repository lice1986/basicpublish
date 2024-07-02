﻿/**
* DevExpress HTML/JS Reporting (designer\internal\parameterLayout\_parametersLayoutItemsProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectExplorerProvider } from '@devexpress/analytics-core/analytics-internal';
import * as $ from 'jquery';
import * as ko from 'knockout';
import { ParameterPanelLayoutItem } from '../../dataObjects/parameters/layoutItems';
const arrayName = 'parameterPanelLayoutItems';
export class ParametersLayoutItemsProvider extends ObjectExplorerProvider {
    constructor(report, member) {
        super([{ model: report, name: 'Report' }], [arrayName], member, null);
        this.getItems = (pathRequest) => {
            const result = $.Deferred();
            if (!pathRequest.fullPath) {
                const resultItems = [];
                this.createArrayItem(report.parameterPanelLayoutItems(), resultItems, `Report.${arrayName}`);
                result.resolve(resultItems);
            }
            else {
                result.resolve(this.getObjectPropertiesForPath(report, pathRequest.fullPath, arrayName));
            }
            return result.promise();
        };
        this.getPathByMember = (model) => {
            if (model instanceof ParameterPanelLayoutItem) {
                return this.getPathByMember(model.parentModel()) + `.${arrayName}.` + model.parentModel().parameterPanelLayoutItems().indexOf(model);
            }
            else {
                return 'Report';
            }
        };
    }
    createArrayItem(currentTarget, result, propertyName) {
        currentTarget.forEach((element, index) => {
            element = ko.unwrap(element);
            result.push({
                name: propertyName ? propertyName + '.' + index.toString() : index.toString(),
                displayName: ko.unwrap(element['name']),
                specifics: element.className(),
                isList: element[arrayName] && ko.unwrap(element[arrayName]).length > 0,
                data: element,
                dragData: {
                    noDragable: false
                }
            });
        });
    }
}