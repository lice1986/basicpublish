﻿/**
* DevExpress Analytics (core\utils\_designerInitializer.d.ts)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
import { UndoEngine } from '../../undo-engine/undoengine';
import { ISurfaceContext } from '../elements/baseSurface';
import { DesignControlsHelper } from '../internal/_controlsHelper';
import { ICombinedProperty } from '../selection/_combinedObj';
import { SurfaceSelection } from '../selection/_selection';
import { SnapLinesCollector } from '../snapLines/_snapLinesCollector';
import { GroupObject } from '../widgets/propertygrid/_group';
import { ControlsFactory } from './controlsFactory';
import { IDesignerModel } from './_designerCreator';
import { IDesignerPart } from './_utils.designerPart';
export declare function createDesigner(model: ko.Observable | ko.Computed, surface: ko.Observable<ISurfaceContext> | ko.Computed<ISurfaceContext>, controlsFactory: ControlsFactory, groups?: GroupObject, editors?: ISerializationInfoArray, parts?: IDesignerPart[], rtl?: boolean, selection?: SurfaceSelection, designControlsHelper?: DesignControlsHelper, undoEngine?: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, customMerge?: (propertyName: any, controls: any, undoEngine: any) => ICombinedProperty, snapLinesCollector?: SnapLinesCollector, groupLocalizationIDs?: {
    [key: string]: string;
}): IDesignerModel;
