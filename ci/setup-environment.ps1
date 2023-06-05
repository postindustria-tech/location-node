param (
    [Parameter(Mandatory=$true)]
    [string]$RepoName
)
$key = $Options.Keys.TestResourceKey

$globals = @"
{
  "resourceKey": $key,
  "anotherGlobal": "Hello"
}
"@

$env:JEST_GLOBALS = $globals

./node/setup-environment.ps1 -RepoName $RepoName

if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}



