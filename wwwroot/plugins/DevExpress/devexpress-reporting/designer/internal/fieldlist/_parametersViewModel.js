﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_parametersViewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { findFirstItemMatchesCondition, localizeNoneString } from '@devexpress/analytics-core/analytics-internal';
import { Disposable, getLocalization } from '@devexpress/analytics-core/analytics-utils';
import { Parameter } from '../../dataObjects/parameters/parameter';
import { EditParametersDialog } from '../../tools/dialogs/editParametersDialog';
import { AddParameterDialog } from '../../tools/dialogs/parametersDialogs';
export class ParametersViewModel extends Disposable {
    constructor(report) {
        super();
        this.addAction = {
            clickAction: () => {
                return this.add();
            },
            imageClassName: 'dxrd-image-add',
            imageTemplateName: 'dxrd-svg-operations-add',
            text: 'Add parameter',
            displayText: () => getLocalization('Add parameter', 'AnalyticsCoreStringId.FieldListActions_AddParameter')
        };
        this.removeAction = {
            clickAction: (item) => {
                this.remove(item.data);
            },
            imageClassName: 'dxrd-image-recycle-bin',
            imageTemplateName: 'dxrd-svg-operations-recycle_bin',
            text: 'Remove parameter',
            displayText: () => getLocalization('Remove parameter', 'ASPxReportsStringId.ReportDesigner_FieldListActions_RemoveParameter')
        };
        this.editAction = {
            clickAction: (item) => {
                if (item.data instanceof Parameter) {
                    this.edit(item.data);
                }
                else if (item.hasItems) {
                    this.edit(item.items[0].data);
                }
                else {
                    this.edit(undefined);
                }
            },
            imageClassName: 'dxrd-image-edit',
            imageTemplateName: 'dxrd-svg-operations-edit',
            text: 'Edit parameter',
            displayText: () => getLocalization('Edit parameter', 'ASPxReportsStringId.ReportDesigner_FieldListActions_EditParameter')
        };
        this.parameters = report.parameters;
        this.remove = (parameter) => {
            this.parameters.splice(this.parameters.indexOf(parameter), 1);
            report.parameterHelper.removeParameterModel(parameter);
        };
        this.add = () => {
            this._addParametersDialog.show();
        };
        this.edit = (parameter) => {
            this._editParametersDialog.show(parameter);
        };
        this._disposables.push(this._addParametersDialog = new AddParameterDialog(report), this._editParametersDialog = new EditParametersDialog(report));
    }
    getActions(context) {
        const result = [];
        if (context.path.indexOf(Parameter.ParametersRefString) === 0) {
            if (context.pathParts.length === 1) {
                result.push(this.editAction);
                result.push(this.addAction);
            }
            else if (context.pathParts.length === 2) {
                result.push(this.editAction);
                result.push(this.removeAction);
            }
        }
        return result;
    }
    beforeItemsFilled(request, items) {
        if (request.ref !== Parameter.ParametersRefString)
            return false;
        items.push.apply(items, request.fullPath === Parameter.ParametersRefString ? this.parameters.slice(0) : []);
        this.parameters().forEach(parameter => {
            if (parameter.isList && parameter.parameterName() === request.path) {
                items.push.apply(items, parameter.getRangeParameters());
            }
        });
        return true;
    }
    afterItemsFilled(request, items) {
        if (!request.fullPath) {
            const parameters = findFirstItemMatchesCondition(items, item => item.specifics === 'parameters');
            if (parameters)
                parameters.displayName = getLocalization('Parameters', 'DevExpress.XtraReports.UI.XtraReport.Parameters');
            const noneDataSource = !request.fullPath && findFirstItemMatchesCondition(items, item => item.specifics === 'none');
            if (noneDataSource)
                noneDataSource.displayName = localizeNoneString('none');
        }
    }
}
