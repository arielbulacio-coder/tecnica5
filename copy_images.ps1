$src = Join-Path (Split-Path $PSScriptRoot -Parent) "utnsanmiguel_source\public"
$dst = Join-Path $PSScriptRoot "public"
Get-ChildItem "$src\proj_*.png" | ForEach-Object {
    Copy-Item $_.FullName -Destination $dst -Force
    Write-Host "Copied: $($_.Name)"
}
Write-Host "All project images copied successfully."
