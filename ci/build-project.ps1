param (
    [Parameter(Mandatory=$true)]
    [string]$RepoName
)

$packages = ".";

./node/build-project.ps1 -RepoName $RepoName -Packages $packages

exit $LASTEXITCODE