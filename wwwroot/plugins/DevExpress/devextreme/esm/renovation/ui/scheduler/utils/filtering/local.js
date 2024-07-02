/**
 * DevExtreme (esm/renovation/ui/scheduler/utils/filtering/local.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    AppointmentFilterBaseStrategy,
    AppointmentFilterVirtualStrategy
} from "../../../../../__internal/scheduler/appointments/data_provider/m_appointment_filter";
export var getFilterStrategy = (resources, startDayHour, endDayHour, cellDurationInMinutes, showAllDayPanel, supportAllDayRow, firstDayOfWeek, viewType, dateRange, groupCount, loadedResources, isVirtualScrolling, timeZoneCalculator, dataAccessors, viewDataProvider) => {
    var filterOptions = {
        resources: resources,
        startDayHour: startDayHour,
        endDayHour: endDayHour,
        appointmentDuration: cellDurationInMinutes,
        showAllDayPanel: showAllDayPanel,
        supportAllDayRow: supportAllDayRow,
        firstDayOfWeek: firstDayOfWeek,
        viewType: viewType,
        viewDirection: "vertical",
        dateRange: dateRange,
        groupCount: groupCount,
        loadedResources: loadedResources,
        isVirtualScrolling: isVirtualScrolling,
        timeZoneCalculator: timeZoneCalculator,
        dataSource: void 0,
        dataAccessors: dataAccessors,
        viewDataProvider: viewDataProvider
    };
    return isVirtualScrolling ? new AppointmentFilterVirtualStrategy(filterOptions) : new AppointmentFilterBaseStrategy(filterOptions)
};