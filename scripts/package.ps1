param(
  [string]$Version = "1.0.0"
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$source = Join-Path $projectRoot "lvlitup"
$releaseDirectory = Join-Path $projectRoot "releases"
$output = Join-Path $releaseDirectory "lvlitup-$Version-unsigned.xpi"
$zipOutput = Join-Path $releaseDirectory "lvlitup-$Version-unsigned.zip"

New-Item -ItemType Directory -Force -Path $releaseDirectory | Out-Null
Remove-Item -Force -ErrorAction SilentlyContinue $output, $zipOutput
Push-Location $source
try {
  $items = Get-ChildItem -Force | Where-Object { $_.Name -notin @("web-ext-artifacts", "node_modules") }
  Compress-Archive -Path $items.FullName -DestinationPath $zipOutput -CompressionLevel Optimal
  Move-Item -Force $zipOutput $output
}
finally {
  Pop-Location
}

Write-Output "Created $output"
