/**
 * DevExtreme (esm/ui/diagram/diagram.nodes_option.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import ItemsOption from "./diagram.items_option";
class NodesOption extends ItemsOption {
    _getKeyExpr() {
        return this._diagramWidget._createOptionGetter("nodes.keyExpr")
    }
    _getItemsExpr() {
        return this._diagramWidget._createOptionGetter("nodes.itemsExpr")
    }
    _getContainerChildrenExpr() {
        return this._diagramWidget._createOptionGetter("nodes.containerChildrenExpr")
    }
}
export default NodesOption;
