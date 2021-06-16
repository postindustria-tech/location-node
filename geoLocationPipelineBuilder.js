/* *********************************************************************
 * This Original Work is copyright of 51 Degrees Mobile Experts Limited.
 * Copyright 2019 51 Degrees Mobile Experts Limited, 5 Charlotte Close,
 * Caversham, Reading, Berkshire, United Kingdom RG4 7BY.
 *
 * This Original Work is licensed under the European Union Public Licence (EUPL)
 * v.1.2 and is subject to its terms as set out below.
 *
 * If a copy of the EUPL was not distributed with this file, You can obtain
 * one at https://opensource.org/licenses/EUPL-1.2.
 *
 * The 'Compatible Licences' set out in the Appendix to the EUPL (as may be
 * amended by the European Commission) shall be deemed incompatible for
 * the purposes of the Work and the provisions of the compatibility
 * clause in Article 5 of the EUPL shall not apply.
 *
 * If using the Work as, or as part of, a network application, by
 * including the attribution notice(s) required under Article 5 of the EUPL
 * in the end user terms of the application under an appropriate heading,
 * such notice(s) shall fulfill the requirements of that article.
 * ********************************************************************* */

const require51 = (requestedPackage) => {
  try {
    return require(__dirname + '/../' + requestedPackage);
  } catch (e) {
    return require(requestedPackage);
  }
};

const GeoLocationCloud = require('./geoLocationCloud');
const CloudRequestEngine = require('fiftyone.pipeline.cloudrequestengine').CloudRequestEngine;
const PipelineBuilder = require('fiftyone.pipeline.core').PipelineBuilder;
const ShareUsageElement = require('fiftyone.pipeline.engines.fiftyone').ShareUsage;

class GeoLocationPipelineBuilder extends PipelineBuilder {
  /**
     * Extension of pipelineBuilder class that allows for the quick generation of a geo-location pipeline. Adds share usage, caching with simple paramater changes
     * @param {Object} options
     * @param {Boolean} options.shareUsage // include share usage element?
     * @param {String} options.resourceKey // resourceKey for cloud
     * @param {String} options.locationProvider // the provider to request data from. Either "fiftyonedegrees" or "digitalelement".
     *
    */
  constructor ({ shareUsage = true, resourceKey = null, locationProvider = 'fiftyonedegrees', baseURL = null }) {
    super(...arguments);

    // Check if share usage enabled and add it to the pipeline if so

    if (shareUsage) {
      this.flowElements.push(new ShareUsageElement());
    }

    // First we need the cloudRequestEngine

    const cloudRequestEngineOptions = { resourceKey: resourceKey };
    if (baseURL !== null) {
      cloudRequestEngineOptions.baseURL = baseURL;
    }

    this.flowElements.push(new CloudRequestEngine(cloudRequestEngineOptions));

    // Then add the cloud geo-location engine

    this.flowElements.push(new GeoLocationCloud({ locationProvider: locationProvider }));
  }
}

module.exports = GeoLocationPipelineBuilder;
