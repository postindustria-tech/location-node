# 51Degrees Geo-Location Engines

![51Degrees](https://51degrees.com/img/logo.png?utm_source=github&utm_medium=repository&utm_content=readme_main&utm_campaign=node-open-source "Data rewards the curious") **Pipeline API**

[Developer Documentation](https://51degrees.com/location-node/4.2/index.html?utm_source=github&utm_medium=repository&utm_content=documentation&utm_campaign=node-open-source "developer documentation")

## Introduction

This repository contains the geo-location engines for the Node.js implementation of the Pipeline API.

## Pre-requesites

The Pipeline engines are written in Node.js and target 6 and above.

## Packages
- **geoLocationCloud** - A Node.js engine which retrieves geo-location results by consuming data from the 51Degrees cloud service.
- **geoLocationPipelineBuilder** - Contains the geo-location engine builders.

## Installation

You can either reference the projects in this repository or you can reference the [NPM][npm] packages in your project:

```
npm install fiftyone.geolocation
```

Make sure to select the latest version from [NPM.][npm]

## Examples

Examples can be found in the `examples/` folder. See below for a list of examples.

|Example|Description|Implemtation|
|-------|-----------|------------|
|gettingStarted.js|This example uses geo-location to determine the country from a longitude and latitude.|Cloud|
|combiningServices.js|This example uses geo-location alongside device detection to determine the country and device.|Cloud|
|configureFromFile.js|This example shows how to configure pipeline with geo-location from a configuration file.|Cloud|
|webIntegration.js|This example demonstrates how to get location information from the device that a user is using to access a website.|Cloud|

## Tests

In this repository, there are tests for the examples. 
You will need to install jest to run them:

`npm install jest --global`

To run the tests, then call:

`jest`

## Project documentation

For complete documentation on the Pipeline API and associated engines, see the [51Degrees documentation site][Documentation].

[Documentation]: https://51degrees.com/documentation/index.html
[npm]: https://www.npmjs.com/package/fiftyone.geolocation
