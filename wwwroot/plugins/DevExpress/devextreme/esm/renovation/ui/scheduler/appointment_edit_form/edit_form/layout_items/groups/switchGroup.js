/**
 * DevExtreme (esm/renovation/ui/scheduler/appointment_edit_form/edit_form/layout_items/groups/switchGroup.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    ItemLabels
} from "../const";
import {
    getSwitchLayoutItemConfig
} from "../switch";
export var getSwitchGroupConfig = (allDayEditorTemplate, repeatEditorTemplate, allDayExpr) => ({
    itemType: "group",
    colCountByScreen: {
        lg: 3,
        xs: 3
    },
    colSpan: 2,
    items: [getSwitchLayoutItemConfig(allDayEditorTemplate, allDayExpr, ItemLabels.allDay), getSwitchLayoutItemConfig(repeatEditorTemplate, "repeat", ItemLabels.repeat), {
        itemType: "empty",
        colSpan: 2
    }]
});
