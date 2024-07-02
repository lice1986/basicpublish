﻿/**
* DevExpress Analytics (serializer\native\deserializationEngine.updateViewModel.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
const chunksTimeoutName = '__viewModel__timeout';
const chunksDictionaryName = '__viewModel__chunks';
export function updateViewModel(model, args) {
    if (model['__viewModel'] && model['updateViewModel']) {
        if (model['deferredUpdateViewModel']()) {
            _updateViewModelWithChunks(model, args);
        }
        else {
            model['updateViewModel'](args);
        }
    }
}
export function _updateViewModelWithChunks(model, args) {
    if (model['__viewModel'] && model['updateViewModel']) {
        model[chunksTimeoutName] && clearTimeout(model[chunksTimeoutName]);
        if (!model[chunksDictionaryName])
            model[chunksDictionaryName] = {};
        if ('added' in args || 'removed' in args) {
            const chunks = Array.isArray(model[chunksDictionaryName][args.propertyName]) ?
                model[chunksDictionaryName][args.propertyName]
                : [];
            model[chunksDictionaryName][args.propertyName] = [...chunks, args];
        }
        else {
            model[chunksDictionaryName][args.propertyName] = args;
        }
        model[chunksTimeoutName] = setTimeout(() => {
            model[chunksDictionaryName] && Object.keys(model[chunksDictionaryName]).forEach((chunkName) => {
                const chunk = model[chunksDictionaryName][chunkName];
                if (Array.isArray(chunk)) {
                    chunk.forEach((args) => model['updateViewModel'](args));
                }
                else {
                    model['updateViewModel'](chunk);
                }
            });
            model[chunksDictionaryName] = {};
        });
    }
}