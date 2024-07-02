/**
* DevExtreme (data/endpoint_selector.d.ts)
* Version: 23.2.5
* Build date: Mon Mar 11 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * The EndpointSelector is an object for managing OData endpoints in your application.
 */
export default class EndpointSelector {
    constructor(options: any);
    /**
     * Gets an endpoint with a specific key.
     */
    urlFor(key: string): string;
}