/**
 * DevExtreme (esm/renovation/ui/scheduler/workspaces/base/date_table/all_day_panel/table.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["addDateTableClass", "addVerticalSizesClassToRows", "bottomVirtualRowHeight", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "tableRef", "topVirtualRowHeight", "viewData", "width"];
import {
    createComponentVNode,
    normalizeProps
} from "inferno";
import {
    InfernoWrapperComponent
} from "@devextreme/runtime/inferno";
import {
    Table
} from "../../table";
import {
    AllDayPanelTableBody
} from "./table_body";
import {
    LayoutProps
} from "../../layout_props";
import {
    DefaultSizes
} from "../../../const";
export var viewFunction = _ref => {
    var {
        allDayPanelData: allDayPanelData,
        emptyTableHeight: emptyTableHeight,
        props: {
            dataCellTemplate: dataCellTemplate,
            tableRef: tableRef,
            viewData: viewData,
            width: width
        }
    } = _ref;
    return createComponentVNode(2, Table, {
        className: "dx-scheduler-all-day-table",
        height: emptyTableHeight,
        width: width,
        tableRef: tableRef,
        children: createComponentVNode(2, AllDayPanelTableBody, {
            viewData: allDayPanelData,
            leftVirtualCellWidth: viewData.leftVirtualCellWidth,
            rightVirtualCellWidth: viewData.rightVirtualCellWidth,
            leftVirtualCellCount: viewData.leftVirtualCellCount,
            rightVirtualCellCount: viewData.rightVirtualCellCount,
            dataCellTemplate: dataCellTemplate
        })
    })
};
export var AllDayTableProps = LayoutProps;
import {
    createReRenderEffect
} from "@devextreme/runtime/inferno";
var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class AllDayTable extends InfernoWrapperComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.__getterCache = {}
    }
    createEffects() {
        return [createReRenderEffect()]
    }
    get allDayPanelData() {
        if (void 0 !== this.__getterCache.allDayPanelData) {
            return this.__getterCache.allDayPanelData
        }
        return this.__getterCache.allDayPanelData = (() => this.props.viewData.groupedData[0].allDayPanel)()
    }
    get emptyTableHeight() {
        return this.allDayPanelData ? void 0 : DefaultSizes.allDayPanelHeight
    }
    get restAttributes() {
        var _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    componentWillUpdate(nextProps, nextState, context) {
        super.componentWillUpdate();
        if (this.props.viewData !== nextProps.viewData) {
            this.__getterCache.allDayPanelData = void 0
        }
    }
    render() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props, {
                dataCellTemplate: getTemplate(props.dataCellTemplate)
            }),
            allDayPanelData: this.allDayPanelData,
            emptyTableHeight: this.emptyTableHeight,
            restAttributes: this.restAttributes
        })
    }
}
AllDayTable.defaultProps = AllDayTableProps;
