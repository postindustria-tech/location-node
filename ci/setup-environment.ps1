param (
    [Parameter(Mandatory=$true)]
    [string]$RepoName
)

Push-Location $RepoName
$key = $Options.Keys.TestResourceKey
$packageJSON = @"
{
  "name": "fiftyone.geolocation",
  "version": "1.0.21",
  "description": "Geo-location services for the 51Degrees Pipeline API",
  "main": "index.js",
  "types": "types/index.d.ts",
  "directories": {
    "test": "tests"
  },
  "scripts": {
    "test": "jest --ci --reporters=jest-junit --reporters=default --coverage --coverageReporters=cobertura"
  },
  "contributors": [
    "Filip Hnízdo <filip@octophin.com> (https://octophindigital.com/)",
    "Steve Ballantine <stephen@51degrees.com> (https://51degrees.com)",
    "Ben Shilito <ben@51degrees.com> (https://51degrees.com)",
    "Joseph Dix <joseph@51degrees.com> (https://51degrees.com)"
  ],
  "dependencies": {
    "fiftyone.pipeline.cloudrequestengine": "^4.4.0",
    "fiftyone.pipeline.core": "^4.4.0",
    "fiftyone.pipeline.engines": "^4.4.0",
    "fiftyone.pipeline.engines.fiftyone": "^4.4.0"
  },
  "devDependencies": {
    "@types/node": "^15.12.2",
    "eslint": "^6.8.0",
    "eslint-config-standard": "^14.1.1",
    "eslint-plugin-import": "^2.22.0",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.1",
    "jest": "^27.0.6",
    "jest-expect-message": "^1.0.2",
    "jest-junit": "^9.0.0"
  },
  "license": "EUPL-1.2",
  "bugs": {
    "url": "https://github.com/51Degrees/location-node/issues"
  },
  "jest-junit": {
    "outputName": "test_results.xml"
  },
  "jest": {
    "testRunner": "jest-jasmine2",
    "setupFilesAfterEnv": [
      "./setup.js",
      "jest-expect-message"
    ],
    "globals": {
      "resourceKey": $key
    }
  }
}
"@

New-Item -ItemType File -Path "package.json" -Force | Out-Null
Set-Content -Path "package.json" -Value $packageJSON
Write-Output "Package configuration file created successfully."

Pop-Location

./node/setup-environment.ps1 -RepoName $RepoName

if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}



