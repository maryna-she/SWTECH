# dev.ps1 - Startet Backend (Spring Boot) und Frontend (Vite) gleichzeitig.
# Verwendung: .\dev.ps1
# Beenden:    Enter  (stoppt beide Prozesse)

$ErrorActionPreference = "Stop"

$ScriptDir   = Split-Path -Parent $MyInvocation.MyCommand.Path
$FrontendDir = Join-Path $ScriptDir "frontend\my-react-app"

# Voraussetzungen pruefen
if (-not (Test-Path "$ScriptDir\mvnw.cmd")) {
    Write-Error "mvnw.cmd nicht gefunden. Bitte das Script aus dem Projektstamm ausfuehren."
    exit 1
}

if (-not (Test-Path $FrontendDir)) {
    Write-Error "Frontend-Verzeichnis nicht gefunden: $FrontendDir"
    exit 1
}

if (-not (Test-Path "$FrontendDir\node_modules")) {
    Write-Host "node_modules fehlen - installiere Abhaengigkeiten..." -ForegroundColor Yellow
    npm install --prefix $FrontendDir
}

# Batch-Dateien fuer die cmd-Fenster schreiben
# (vermeidet && Parsing-Probleme in ArgumentList)
$backendBat  = Join-Path $env:TEMP "dev_backend.bat"
$frontendBat = Join-Path $env:TEMP "dev_frontend.bat"

Set-Content -Path $backendBat -Encoding ASCII -Value @"
@echo off
title Backend
cd /d "$ScriptDir"
mvnw.cmd spring-boot:run
"@

Set-Content -Path $frontendBat -Encoding ASCII -Value @"
@echo off
title Frontend
cd /d "$FrontendDir"
npm run dev
"@

# Prozesse in separaten Fenstern starten
Write-Host "Starte Backend..."  -ForegroundColor Cyan
$backend = Start-Process "cmd.exe" -ArgumentList "/k", $backendBat -PassThru

Write-Host "Starte Frontend..." -ForegroundColor Red
$frontend = Start-Process "cmd.exe" -ArgumentList "/k", $frontendBat -PassThru

Write-Host ""
Write-Host "Backend  laeuft in einem separaten Fenster (PID $($backend.Id))"  -ForegroundColor Cyan
Write-Host "Frontend laeuft in einem separaten Fenster (PID $($frontend.Id))" -ForegroundColor Red
Write-Host ""
Write-Host "Druecke Enter, um beide Prozesse zu beenden..." -ForegroundColor Yellow
Read-Host | Out-Null

# Aufraeumen
Write-Host "Beende Backend und Frontend..." -ForegroundColor Yellow

if (-not $backend.HasExited)  { Stop-Process -Id $backend.Id  -Force }
if (-not $frontend.HasExited) { Stop-Process -Id $frontend.Id -Force }

Remove-Item $backendBat, $frontendBat -ErrorAction SilentlyContinue

Write-Host "Beide Prozesse beendet." -ForegroundColor Green