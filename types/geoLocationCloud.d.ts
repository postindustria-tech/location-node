export = GeoLocationCloud;
declare const GeoLocationCloud_base: typeof import("fiftyone.pipeline.cloudrequestengine/types/cloudEngine");
declare class GeoLocationCloud extends GeoLocationCloud_base {
    constructor({ locationProvider }: {
        locationProvider: any;
    }, ...args: any[]);
}
