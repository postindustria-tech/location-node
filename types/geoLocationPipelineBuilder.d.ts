export = GeoLocationPipelineBuilder;
declare const GeoLocationPipelineBuilder_base: typeof import("fiftyone.pipeline.core/types/pipelineBuilder");
declare class GeoLocationPipelineBuilder extends GeoLocationPipelineBuilder_base {
    /**
       * Extension of pipelineBuilder class that allows for the quick generation of a geo-location pipeline. Adds share usage, caching with simple paramater changes
       * @param {Object} options
       * @param {Boolean} options.shareUsage // include share usage element?
       * @param {String} options.resourceKey // resourceKey for cloud
       * @param {String} options.locationProvider // the provider to request data from. Either "fiftyonedegrees" or "digitalelement".
       *
      */
    constructor({ shareUsage, resourceKey, locationProvider, baseURL }: {
        shareUsage: boolean;
        resourceKey: string;
        locationProvider: string;
    }, ...args: any[]);
}
