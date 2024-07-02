﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_objectDataSourceEditor.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getErrorMessage, ShowMessage } from '@devexpress/analytics-core/analytics-internal';
import { getLocalization, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import { DataSourceType, DataSourceWizardPageIterator, ObjectDataSourceWizardPageId, _createDefaultDataSourceWizardState, _restoreObjectDataSourceFromState } from '@devexpress/analytics-core/analytics-wizard';
import * as $ from 'jquery';
import { addDataSourceToReport } from '../internal/_dataUtils';
import { ReportDataSourceService } from '../services/_reportDataSourceService';
import { DataSourceEditorBase } from './_sqlDataSourceEditor';
export class ObjectDataSourceEditParametersIterator extends DataSourceWizardPageIterator {
    getNextPageId(pageId) {
        if (!pageId)
            return ObjectDataSourceWizardPageId.ConfigureParametersPage;
        return super.getNextPageId(pageId);
    }
}
export class ObjectDataSourceEditor extends DataSourceEditorBase {
    constructor() {
        super(...arguments);
        this.editParametersAction = {
            clickAction: (item) => {
                this.editSchema(new PathRequest(item.path).id);
            },
            position: 0,
            imageClassName: 'dx-image-edit',
            imageTemplateName: 'dxrd-svg-operations-edit',
            text: getLocalization('Edit Parameters...', 'AnalyticsCoreStringId.ObjectDSWizard_EditParameters')
        };
    }
    static createObjectDataSourceInfo(objectDataSourceWizard, objectDataSource, base64) {
        const deferred = $.Deferred();
        (base64 ?
            ReportDataSourceService.editObjectDataSourceParameters(objectDataSourceWizard, base64) :
            ReportDataSourceService.getObjectDataSourceBase64(objectDataSourceWizard))
            .done((result) => {
            const ctors = objectDataSourceWizard.ctor;
            const name = objectDataSourceWizard.dataSourceName || 'objectDataSource';
            const dataMembers = objectDataSourceWizard.dataMember;
            const info = {
                base64: result.base64,
                data: {
                    '@ObjectType': 'DevExpress.DataAccess.ObjectBinding.ObjectDataSource',
                    '@Base64': result.base64
                },
                name: name,
                isSupportQueries: result.isSupportQueries,
                isListType: result.isListType,
                id: objectDataSource.id,
                isObjectDataSource: true
            };
            info['hasParams'] = ((ctors && ctors.parameters.length > 0) || (dataMembers && dataMembers.parameters.length > 0));
            deferred.resolve(info);
        }).fail((error) => {
            deferred.reject();
        });
        return deferred.promise();
    }
    applyDataSourceWizardChanges(dataSourceWizardModel) {
        const objectDataSource = _restoreObjectDataSourceFromState(dataSourceWizardModel.objectDataSourceWizard);
        const dataSourceInfo = objectDataSource && this._dsHelper().findDataSourceInfoByName(objectDataSource.name());
        const deferred = $.Deferred();
        ObjectDataSourceEditor.createObjectDataSourceInfo(dataSourceWizardModel.objectDataSourceWizard, objectDataSource, dataSourceInfo && dataSourceInfo.data.base64())
            .done((info) => {
            if (dataSourceInfo) {
                dataSourceInfo.base64 = info.base64;
                dataSourceInfo.data.base64(info.base64);
                deferred.resolve(dataSourceInfo);
            }
            else {
                addDataSourceToReport(this._dsHelper(), this._reportViewModel(), this._undoEngine(), this._itemsProvider(), info);
                deferred.resolve(info);
            }
        })
            .fail((error) => {
            deferred.reject();
        });
        return deferred.promise();
    }
    getActions(context) {
        const result = [];
        if (context.data && context.data['isObjectDataSource'] === true && context.data['hasParams']) {
            result.push(this.editParametersAction);
        }
        return result;
    }
    editSchema(dataSourceID) {
        const dataSourceInfo = this._findDataSource(dataSourceID);
        ReportDataSourceService.objectDataSourceFromBase64(dataSourceInfo.data['base64']()).done(result => {
            const beforeInitEvent = (e) => {
                e.state.dataSourceType = DataSourceType.Object;
            };
            this._wizard.events.addHandler('beforeInitialize', beforeInitEvent);
            this._wizard.initialize(_createDefaultDataSourceWizardState(undefined, undefined, {
                ctor: result.ctor,
                dataMember: result.dataMember,
                selectedType: result.selectedType,
                dataSourceName: dataSourceInfo.name
            }), (factory, stateManager) => new ObjectDataSourceEditParametersIterator(factory, stateManager, this._wizard['_wizardOptions']));
            this._wizard.events.removeHandler('beforeInitialize', beforeInitEvent);
            this._wizard.start();
            this._wizard.isVisible(true);
        }).fail((result) => {
            if (getErrorMessage(result))
                ShowMessage(getErrorMessage(result));
        });
    }
}
