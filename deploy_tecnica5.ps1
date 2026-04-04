$ServerIP = "149.50.130.160"
$User = "root"
$KeyPath = "c:\ProyectosGit\consultora\keys\id_ed25519_donweb"
$RemoteBase = "/root/apps"
$App = "tecnica5"
$Source = "c:\ProyectosGit\tecnica5"

Write-Host "Iniciando despliegue de $App..."

# Zip path
$ZipPath = "$env:TEMP\deploy_$App.zip"
if (Test-Path $ZipPath) { Remove-Item $ZipPath }

# Zip files
Write-Host "Comprimiendo..."
$TempDir = "$env:TEMP\stage_$App"
if (Test-Path $TempDir) { Remove-Item $TempDir -Recurse -Force }
New-Item -ItemType Directory -Path $TempDir | Out-Null
# Copy SimuTec project images if available
$SimuTecPublic = Join-Path (Split-Path $Source -Parent) "utnsanmiguel_source\public"
if (Test-Path $SimuTecPublic) {
    Write-Host "Copiando imagenes de SimuTec..."
    Get-ChildItem "$SimuTecPublic\proj_*.png" | ForEach-Object {
        Copy-Item $_.FullName -Destination "$Source\public\" -Force
        Write-Host "  -> $($_.Name)"
    }
}

robocopy $Source $TempDir /E /XD node_modules .git dist build | Out-Null
Compress-Archive -Path "$TempDir\*" -DestinationPath $ZipPath -Force

# Upload
Write-Host "Subiendo..."
scp -o StrictHostKeyChecking=no -i $KeyPath $ZipPath $User@$ServerIP`:$RemoteBase/$App.zip

# Remote deploy
Write-Host "Limpiando TOTALMENTE y reconstruyendo en servidor..."
ssh -o StrictHostKeyChecking=no -i $KeyPath $User@$ServerIP "cd $RemoteBase/$App && docker compose down || true && cd .. && rm -rf $App && mkdir -p $App && cd $App && unzip -o ../$App.zip && docker compose build --no-cache && docker compose up -d --force-recreate"

# Cleanup
Remove-Item $ZipPath
Remove-Item $TempDir -Recurse -Force

Write-Host "Despliegue finalizado!" -ForegroundColor Green
