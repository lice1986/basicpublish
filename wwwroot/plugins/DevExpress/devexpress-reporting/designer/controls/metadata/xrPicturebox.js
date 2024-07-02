﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrPicturebox.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { extend } from '@devexpress/analytics-core/analytics-internal';
import { Editor, editorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { ImageSource as CommonImageSource } from '../../../common/imageSource';
import { imageAlignment, sizing } from '../../../viewer/editing/editingField';
import { dataBindings } from '../../dataObjects/metadata/dataBinding';
import { ImageEditOptions } from '../properties/editOptions';
import { createPopularBindingInfos } from '../utils/_metaUtils';
import { anchorHorizontal, anchorVertical } from './properties/anchoring';
import { editOptions } from './properties/editOptions';
import { keepTogether } from './properties/metadata';
import { commonControlProperties, navigationGroup, processGroup, sizeLocation } from './properties/metadataGroups';
import { controlScripts } from './properties/scriptMetadata';
import { action } from './properties/action';
export const imageUrl = { propertyName: 'imageUrl', modelName: '@ImageUrl', editor: editorTemplates.getEditor('text'), defaultVal: '', displayName: 'Image Url', localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.ImageUrl' };
export const imageSource = {
    propertyName: 'imageSource',
    modelName: '@ImageSource',
    editor: { header: 'dxrd-image-loadfile', editorType: Editor },
    displayName: 'Image Source',
    localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.ImageSource',
    from: val => ko.observable(CommonImageSource.parse(val)),
    toJsonObject: CommonImageSource.toString,
    defaultVal: null
};
export const imageEditOptions = extend({}, editOptions, {
    propertyName: 'imageEditOptions',
    from: (model, serializer) => new ImageEditOptions(model, serializer)
});
export const useImageMetadata = { propertyName: 'useImageMetadata', modelName: '@UseImageMetadata', displayName: 'Use Image Metadata', localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.UseImageMetadata', editor: editorTemplates.getEditor('bool'), defaultVal: false };
export const pictureBoxSerializationsInfo = [
    imageUrl, imageSource, sizing, imageAlignment, keepTogether, anchorVertical, anchorHorizontal, controlScripts, useImageMetadata,
    action, dataBindings(['Bookmark', 'Image', 'ImageSource', 'ImageUrl', 'NavigateUrl', 'Tag']),
    imageEditOptions
].concat(createPopularBindingInfos({ propertyName: 'ImageUrl', localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.ImageUrl' }), createPopularBindingInfos({ propertyName: 'ImageSource', localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.ImageSource' }), sizeLocation, commonControlProperties, navigationGroup, processGroup);
export const popularPropertiesPicture = ['imageSource', 'popularDataBindingImageSource', 'imageUrl', 'popularDataBindingImageUrl', 'sizing', 'imageAlignment', 'bookmark', 'bookmarkParent'];