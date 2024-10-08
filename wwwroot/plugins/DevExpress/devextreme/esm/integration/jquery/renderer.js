/**
 * DevExtreme (esm/integration/jquery/renderer.js)
 * Version: 23.2.5
 * Build date: Mon Mar 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import jQuery from "jquery";
import rendererBase from "../../core/renderer_base";
import useJQueryFn from "./use_jquery";
var useJQuery = useJQueryFn();
if (useJQuery) {
    rendererBase.set(jQuery)
}
