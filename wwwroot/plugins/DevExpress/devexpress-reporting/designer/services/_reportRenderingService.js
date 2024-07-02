﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportRenderingService.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PaddingModel } from '@devexpress/analytics-core/analytics-elements';
import { sendRequest } from '@devexpress/analytics-core/analytics-internal';
import { colorToString, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as $ from 'jquery';
import { chartSerializationsInfo } from '../../chart/components/models/_chart';
import { ChartRequests } from '../../chart/internal/_requests';
import { transformNewLineCharacters } from '../../common/utils/_utils';
import { HandlerUri } from '../utils/settings';
export class ReportRenderingService {
    static getChartImage(surface) {
        return ChartRequests.getChartImage(HandlerUri(), new ModelSerializer().serialize(surface._control['chart'], chartSerializationsInfo), surface.contentWidthWithoutZoom(), surface.contentHeightWithoutZoom());
    }
    static getUnknownControlImage(model, scale) {
        return sendRequest(HandlerUri(), 'renderUnknownControl', JSON.stringify({
            layout: JSON.stringify(model),
            scale: scale,
        }));
    }
    static getShapeImage(surface) {
        const _usefulRect = surface.getUsefulRect();
        const params = {
            shapeType: surface._control['Shape']()['shapeType'] && surface._control['Shape']()['shapeType']() || 'Ellipse',
            width: _usefulRect.width,
            lineWidth: surface._control['lineWidth'](),
            fillColor: colorToString(surface._control['fillColor']()),
            lineStyle: surface._control['lineStyle'] && surface._control['lineStyle']() || 'Solid',
            height: _usefulRect.height,
            fillet: surface._control['Shape']()['fillet'] && surface._control['Shape']()['fillet']() || 0,
            numberOfSides: surface._control['Shape']()['numberOfSides'] && surface._control['Shape']()['numberOfSides']() || 3,
            angle: surface._control['angle'] && surface._control['angle']() || 0,
            arrowHeight: surface._control['Shape']()['arrowHeight'] && surface._control['Shape']()['arrowHeight']() || 20,
            arrowWidth: surface._control['Shape']()['arrowWidth'] && surface._control['Shape']()['arrowWidth']() || 20,
            concavity: surface._control['Shape']()['concavity'] && surface._control['Shape']()['concavity']() || 5,
            starPointCount: surface._control['Shape']()['starPointCount'] && surface._control['Shape']()['starPointCount']() || 3,
            horizontalLineWidth: surface._control['Shape']()['horizontalLineWidth'] && surface._control['Shape']()['horizontalLineWidth']() || 10,
            verticalLineWidth: surface._control['Shape']()['verticalLineWidth'] && surface._control['Shape']()['verticalLineWidth']() || 10,
            tipLength: surface._control['Shape']()['tipLength'] && surface._control['Shape']()['tipLength']() || 30,
            tailLength: surface._control['Shape']()['tailLength'] && surface._control['Shape']()['tailLength']() || 30,
            foreColor: colorToString(surface._control['foreColor'] && surface._control['foreColor']() || 'black'),
            stretch: surface._control['stretch'] && surface._control['stretch']() || false,
            padding: surface._control['padding'] && surface._control['padding']() || PaddingModel.defaultVal,
            dpi: surface._control['dpi'] && surface._control['dpi']() || 100
        };
        return sendRequest(HandlerUri(), 'shapeGlyph', JSON.stringify(params));
    }
    static getRichImage(surface, propertyName) {
        return sendRequest(HandlerUri(), 'renderRich', JSON.stringify({
            layout: JSON.stringify($.extend(new ModelSerializer().serialize(surface._control), {
                '@Font': surface._control['font']()
            })),
            scale: surface._context.zoom(),
            text: transformNewLineCharacters(surface._control['textRtf']() || ''),
            rtf: transformNewLineCharacters(surface._control['_rtf']() || ''),
            format: surface._control['format'](),
            base64rtf: surface._control['serializableRtfString'](),
            propertyName: propertyName
        }));
    }
    static getPdfContentData(control) {
        return sendRequest(HandlerUri(), 'renderPdfContent', JSON.stringify({
            sourceBase64: control.source() || '',
            sourceUrl: control.sourceUrl() || '',
            pageRange: control.pageRange() || ''
        }));
    }
}