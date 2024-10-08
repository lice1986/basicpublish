﻿/**
* DevExpress Analytics (query-builder\dataSource\federation\federationSource.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '../../../serializer/serializer';
import { Disposable } from '../../../serializer/disposable';
import { extend } from '../../../serializer/_utils';
import { sourceSerializationInfo } from './federationDataSourceMeta';
export class FederationSource extends Disposable {
    constructor(model, serializer, path, sourceName) {
        super();
        serializer = serializer || new ModelSerializer();
        if (path) {
            const pathParts = path.split('.');
            if (pathParts.length > 1) {
                model['@DataMember'] = pathParts.slice(1).join('_');
            }
        }
        if (sourceName) {
            model['@SourceName'] = sourceName;
        }
        serializer.deserialize(this, extend(model, { '@ItemType': 'Source' }));
    }
    getInfo() {
        return sourceSerializationInfo;
    }
    getDataSourceName() {
        return this.hasDataMember() ? this.sourceName().slice(0, this.sourceName().lastIndexOf(this.dataMember()) - 1)
            : this.sourceName();
    }
    getPath() {
        return this.getDataSourceName() + (this.hasDataMember() ? '.' + this.dataMember() : '');
    }
    hasDataMember() {
        return this.dataMember() && this.sourceName().lastIndexOf(this.dataMember()) !== 0;
    }
}
