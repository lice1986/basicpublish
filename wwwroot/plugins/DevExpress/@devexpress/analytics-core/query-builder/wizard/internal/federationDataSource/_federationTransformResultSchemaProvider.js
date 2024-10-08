﻿/**
* DevExpress Analytics (query-builder\wizard\internal\federationDataSource\_federationTransformResultSchemaProvider.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { PathRequest } from '../../../../widgets/common/pathRequest';
import { isList } from '../../../../widgets/_utils';
export class TransformResultSchemaProvider {
    constructor(itemsProvider, transformData, currentPath) {
        this.getItems = (path) => {
            const result = $.Deferred();
            if (!currentPath() || path.fullPath.split('.').length > currentPath().split('.').length) {
                return result.resolve([]).promise();
            }
            itemsProvider.getItems(path).done(resultItems => {
                const itemsArray = [];
                const listPath = [];
                resultItems.forEach(item => {
                    const column = transformData().filter(x => x.name == item.name)[0];
                    if (isList(item) && column && column.transform.value()) {
                        listPath.push(column);
                    }
                    else {
                        item.displayName = (column && column.alias) || item.displayName;
                        itemsArray.push(item);
                    }
                });
                if (listPath.length === 0) {
                    result.resolve(itemsArray);
                }
                else {
                    $.when(...listPath.map(x => itemsProvider.getItems(new PathRequest(path.fullPath + '.' + x.name)).always((subNodes) => {
                        subNodes.forEach(element => {
                            const name = (x.alias || x.column) + '_' + element.displayName;
                            element.displayName = name;
                            element.name = name;
                        });
                        result.resolve(subNodes.concat(itemsArray));
                    })));
                }
            });
            return result.promise();
        };
        this.dispose = () => {
            this.getItems = null;
            itemsProvider = null;
        };
    }
}
