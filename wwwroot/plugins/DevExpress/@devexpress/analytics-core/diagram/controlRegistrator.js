﻿/**
* DevExpress Analytics (diagram\controlRegistrator.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { unknownSerializationsInfo, name } from './metadata';
import { ElementViewModel } from '../core/elements/elementViewModel';
import { SurfaceElementBase } from '../core/elements/baseSurface';
import { ConnectorSurface } from './elements/connectors/connectorSurface';
import { diagramElementSerializationInfo } from './elements/diagramElementBaseViewModel';
import { ConnectorViewModel } from './elements/connectors/connectorModel';
import { RoutedConnectorSurface } from './elements/connectors/routedConnectorSurface';
import { RoutedConnectorViewModel } from './elements/connectors/routedConnectorModel';
import { connectionPointSerializationInfo, ConnectionPointViewModel } from './elements/connectors/connectionPointModel';
import { ConnectionPointSurface } from './elements/connectors/connectionPointSurface';
import { diagramSerializationsInfo, DiagramViewModel } from './elements/diagramModel';
import { DiagramSurface } from './elements/diagramSurface';
import { connectingPointSerializationInfo, ConnectingPointViewModel } from './elements/connectingPointModel';
import { ConnectingPointSurface } from './elements/connectingPointSurface';
import { editorTemplates } from '../property-grid/widgets/editorsInfo';
import { DiagramElementSurface } from './elements/diagramElementSurface';
import { DiagramElementViewModel } from './elements/diagramElementViewModel';
import { diagramControlsFactory } from './controlsFactory';
export function registerControls() {
    diagramControlsFactory.registerControl('Unknown', {
        info: unknownSerializationsInfo,
        type: ElementViewModel,
        nonToolboxItem: true,
        surfaceType: SurfaceElementBase
    });
    diagramControlsFactory.registerControl('Connector', {
        info: [
            name,
            { propertyName: 'location', displayName: 'Location', editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'startPoint', modelName: '@StartPoint', link: true },
            { propertyName: 'endPoint', modelName: '@EndPoint', link: true }
        ],
        surfaceType: ConnectorSurface,
        type: ConnectorViewModel,
        elementActionsTypes: [],
        nonToolboxItem: false
    });
    diagramControlsFactory.registerControl('RoutedConnector', {
        info: [
            name,
            { propertyName: 'location', displayName: 'Location', editor: editorTemplates.getEditor('objecteditor') },
            { propertyName: 'startPoint', modelName: '@StartPoint', link: true },
            { propertyName: 'endPoint', modelName: '@EndPoint', link: true }
        ],
        surfaceType: RoutedConnectorSurface,
        type: RoutedConnectorViewModel,
        elementActionsTypes: [],
        nonToolboxItem: false
    });
    diagramControlsFactory.registerControl('ConnectionPoint', {
        info: connectionPointSerializationInfo,
        surfaceType: ConnectionPointSurface,
        type: ConnectionPointViewModel,
        elementActionsTypes: [],
        nonToolboxItem: true
    });
    diagramControlsFactory.registerControl('Diagram', {
        info: diagramSerializationsInfo,
        surfaceType: DiagramSurface,
        popularProperties: ['name'],
        type: DiagramViewModel,
        elementActionsTypes: [],
        isContainer: true,
        nonToolboxItem: true
    });
    diagramControlsFactory.registerControl('DiagramElement', {
        info: diagramElementSerializationInfo,
        defaultVal: {
            '@SizeF': '150,50',
            'ConnectingPoints': {
                'Item1': {
                    '@ControlType': 'ConnectingPoint',
                    '@PercentOffsetX': '1',
                    '@PercentOffsetY': '0.5',
                },
                'Item2': {
                    '@ControlType': 'ConnectingPoint',
                    '@PercentOffsetX': '0.5',
                    '@PercentOffsetY': '1',
                },
                'Item3': {
                    '@ControlType': 'ConnectingPoint',
                    '@PercentOffsetX': '0.5',
                    '@PercentOffsetY': '0',
                },
                'Item4': {
                    '@ControlType': 'ConnectingPoint',
                    '@PercentOffsetX': '0',
                    '@PercentOffsetY': '0.5',
                }
            }
        },
        surfaceType: DiagramElementSurface,
        popularProperties: ['text'],
        type: DiagramElementViewModel,
        elementActionsTypes: [],
        nonToolboxItem: false
    });
    diagramControlsFactory.registerControl('Ellipse', {
        info: diagramElementSerializationInfo,
        defaultVal: {
            '@SizeF': '150,50',
            '@Type': 'Ellipse',
            'ConnectingPoints': {
                'Item1': {
                    '@ControlType': 'ConnectingPoint',
                    '@PercentOffsetX': '1',
                    '@PercentOffsetY': '0.5',
                },
                'Item2': {
                    '@ControlType': 'ConnectingPoint',
                    '@PercentOffsetX': '0.5',
                    '@PercentOffsetY': '1',
                },
                'Item3': {
                    '@ControlType': 'ConnectingPoint',
                    '@PercentOffsetX': '0.5',
                    '@PercentOffsetY': '0',
                },
                'Item4': {
                    '@ControlType': 'ConnectingPoint',
                    '@PercentOffsetX': '0',
                    '@PercentOffsetY': '0.5',
                }
            }
        },
        surfaceType: DiagramElementSurface,
        popularProperties: ['text'],
        type: DiagramElementViewModel,
        elementActionsTypes: [],
        nonToolboxItem: false
    });
    diagramControlsFactory.registerControl('Condition', {
        info: diagramElementSerializationInfo,
        defaultVal: {
            '@SizeF': '150,50',
            '@Type': 'Condition',
            'ConnectingPoints': {
                'Item1': {
                    '@ControlType': 'ConnectingPoint',
                    '@PercentOffsetX': '1',
                    '@PercentOffsetY': '0.5',
                },
                'Item2': {
                    '@ControlType': 'ConnectingPoint',
                    '@PercentOffsetX': '0.5',
                    '@PercentOffsetY': '1',
                },
                'Item3': {
                    '@ControlType': 'ConnectingPoint',
                    '@PercentOffsetX': '0.5',
                    '@PercentOffsetY': '0',
                },
                'Item4': {
                    '@ControlType': 'ConnectingPoint',
                    '@PercentOffsetX': '0',
                    '@PercentOffsetY': '0.5',
                }
            }
        },
        surfaceType: DiagramElementSurface,
        popularProperties: ['text'],
        type: DiagramElementViewModel,
        elementActionsTypes: [],
        nonToolboxItem: false
    });
    diagramControlsFactory.registerControl('ConnectingPoint', {
        info: connectingPointSerializationInfo,
        surfaceType: ConnectingPointSurface,
        type: ConnectingPointViewModel,
        elementActionsTypes: [],
        nonToolboxItem: true
    });
}
