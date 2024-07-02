﻿/**
* DevExpress Analytics (query-builder\dataSource\object\objectDataSource.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../../serializer/disposable';
import { IDataSourceBase } from '../sql/sqlDataSource';
import { IObjectDataSourceWizardState } from '../../wizard/dataSourceWizardState';
import { ObjectCtor, ObjectDataMember } from './objectSchema';
export declare class ObjectDataSource extends Disposable implements IDataSourceBase {
    setState(state: IObjectDataSourceWizardState): void;
    name: ko.Observable<string>;
    id: string;
    selectedType: string;
    ctor: ObjectCtor;
    dataMember: ObjectDataMember;
}