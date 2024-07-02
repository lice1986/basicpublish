﻿/**
* DevExpress Analytics (bundle\_add-analytics-to-bundle.js)
* Version:  23.2.5
* Build date: Mar 12, 2024
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as AnalyticsInternal from '../analytics-internal';
import * as Utils from '../analytics-utils';
import * as WidgetsInternal from '../analytics-widgets-internal';
import * as Widgets from '../analytics-widgets';
import * as WidgetsMetadata from '../analytics-widgets-metadata';
import * as WidgetsFiltering from '../analytics-widgets-filtering';
import * as Criteria from '../analytics-criteria';
import * as CriteriaUtils from '../analytics-criteria-utils';
import * as WidgetsTreeList from '../analytics-widgets-treeList';
import * as Elements from '../analytics-elements';
import * as ElementsMetadata from '../analytics-elements-metadata';
import * as Tools from '../analytics-tools';
import * as Localization from '../analytics-localization';
import * as NativeSerializer from '../analytics-serializer-native';
import * as Ace from '../analytics-widgets-ace';
import '../analytics-resources';
import { version } from '../analytics-version';
export function _addAnalyticsToBundle(bundle) {
    bundle.Analytics = bundle.Analytics || {};
    bundle.Analytics.Internal = AnalyticsInternal;
    bundle.Analytics.Serializer = bundle.Analytics.Serializer || {};
    bundle.Analytics.Serializer.Native = NativeSerializer;
    bundle.Analytics.Utils = Utils;
    bundle.Analytics.Widgets = Widgets;
    bundle.Analytics.Widgets.Ace = Ace;
    bundle.Analytics.Widgets.Metadata = WidgetsMetadata;
    bundle.Analytics.Widgets.Internal = WidgetsInternal;
    bundle.Analytics.Widgets.Filtering = WidgetsFiltering;
    bundle.Analytics.Widgets.TreeList = WidgetsTreeList;
    bundle.Analytics.Criteria = Criteria;
    bundle.Analytics.Criteria.Utils = CriteriaUtils;
    bundle.Analytics.Elements = Elements;
    bundle.Analytics.Elements.Metadata = ElementsMetadata;
    bundle.Analytics.Tools = Tools;
    bundle.Analytics.Localization = Localization;
    bundle.Analytics.VERSION = version;
    return bundle;
}