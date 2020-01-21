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

/**
@example cloud/combiningServices.js

Example of using the 51Degrees geo-location Cloud alongside 51Degrees device detection to determine the country and device for a given longitude, latitude and User-Agent.

This example is available in full on [GitHub](https://github.com/51Degrees/location-node/blob/release/v4.1.0/examples/cloud/combiningServices.js). 
(During the beta period, this repository will be private. 
[Contact us](mailto:support.51degrees.com) to request access) 

To run this example, you will need to create a **resource key**. 
The resource key is used as short-hand to store the particular set of 
properties you are interested in as well as any associated license keys 
that entitle you to increased request limits and/or paid-for properties.

You will also need to install the fiftyone.devicedetection package with
`npm install fiftyone.devicedetection`.

You can create a resource key using the 51Degrees [Configurator](https://configure.51degrees.com).

Firstly require the fiftyone.geolocation and fiftyone.devicedetection modules which contain all of the pipeline specific classes we will be using in this example.

```

const FiftyOneDegreesGeoLocation = require('fiftyone.geolocation');
cont FiftyOneDegreesDeviceDetection = require('fiftyone.devicedetection');

```

Build the geo-location pipeline using the builder that comes with the fiftyone.geolocation module and pass in the desired settings, adding the device detection cloud engine.

```

let pipeline = new FiftyOneDegreesGeoLocation.geoLocationPipelineBuilder({
    "resourceKey": "AQS5HKcyHJbECm6E10g"
})
.add(new FiftyOneDegreesDeviceDetection.deviceDetectionCloud())
.build();

```

Each pipeline has an event emitter attached you can listen to to catch messages. Valid log types are info, debug, warn and error.

```

pipeline.on("error", console.error);

```

A pipeline can create a flowData element which is where evidence is added (for example from a device web request). This evidence is then processed by the pipeline through the flowData's `process()` method (which returns a promise to work with both syncronous and asyncronous pipelines).

Here is an example of a function that gets the country and device from a longitude, latidude and User-Agent. In some cases the country value is not meaningful so instead of returning a default, a .hasValue() check can be made. Please see the failureToMatch example for more information.

```

let getProperties = async function (latitude, longitude, userAgent) {

    // Create a flow data element and process the latitude, longitude
    // and User-Agent.
    let flowData = pipeline.createFlowData();

    // Add the longitude and latitude as evidence
    flowData.evidence.add("location.latitude", latitude);
    flowData.evidence.add("location.longitude", longitude);
    flowData.evidence.add("header.user-agent", userAgent);

    await flowData.process();

    let country = flowData.location.country;
    let isMobile = flowData.location.ismobile;

    if (country.hasValue) {

        console.log(`Country: ${country.value}`);

    } else {

        // Echo out why the value isn't meaningful
        console.log(country.noValueMessage);

    }

    if (isMobile.hasValue) {

        console.log(`IsMobile: ${isMobile.value}`);

    } else {

        // Echo out why the value isn't meaningful
        console.log(isMobile.noValueMessage);

    }

}

```

*/

const FiftyOneDegreesGeoLocation = require((process.env.directory || __dirname) + "/../");
const FiftyOneDegreesDeviceDetection = require('fiftyone.devicedetection');

let pipeline = new FiftyOneDegreesDeviceDetection.deviceDetectionPipelineBuilder({
    "resourceKey": "AQS5HKcyHJbECm6E10g"
})
.add(new FiftyOneDegreesDeviceDetection.deviceDetectionCloud())
.build();

// Logging of errors and other messages. Valid logs types are info, debug, warn, error
pipeline.on("error", console.error);

let getProperties = async function (latitude, longitude, userAgent) {

    // Create a flow data element and process the latitude, longitude
    // and User-Agent.
    let flowData = pipeline.createFlowData();

    // Add the longitude and latitude as evidence
    flowData.evidence.add("location.latitude", latitude);
    flowData.evidence.add("location.longitude", longitude);
    flowData.evidence.add("header.user-agent", userAgent);

    await flowData.process();

    let country = flowData.location.country;
    let isMobile = flowData.location.ismobile;

    if (country.hasValue) {

        console.log(`Which country is the location [${latitude},${longitude}] is in? ${country.value}`);

    } else {

        // Echo out why the value isn't meaningful
        console.log(country.noValueMessage);

    }

    if (isMobile.hasValue) {

        console.log(`Does the User-Agent '${userAgent}' represent a mobile device? ${isMobile.value}`);

    } else {

        // Echo out why the value isn't meaningful
        console.log(isMobile.noValueMessage);

    }
}

let mobileUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C114';

getProperties("51.458048", "-0.9822207999999999", mobileUserAgent);