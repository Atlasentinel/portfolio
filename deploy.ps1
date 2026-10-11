<#
  Déploie le portfolio sur un serveur Docker via SSH.

  Exemples :
    .\deploy.ps1 -Server root@atlasentinel.fr -WithEnv     # premier déploiement
    .\deploy.ps1 -Server root@atlasentinel.fr              # mises à jour

  Voir DEPLOIEMENT.md pour la configuration du serveur.
#>
param(
  [Parameter(Mandatory = $true)] [string] $Server,
  [string] $RemoteDir = "/var/www/portfolio",
  [switch] $WithEnv,
  [switch] $KeepServerData
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

foreach ($cmd in "tar", "scp", "ssh") {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
    throw "Commande '$cmd' introuvable. Elle est fournie avec Windows 10/11 (OpenSSH client)."
  }
}

$archive = Join-Path $env:TEMP "portfolio-deploy.tgz"
$excludes = @("--exclude=node_modules", "--exclude=build", "--exclude=.git", "--exclude=*.log")
if (-not $WithEnv)       { $excludes += "--exclude=backend/.env" }
if ($KeepServerData)     { $excludes += "--exclude=src/data" }

Write-Host "1/3  Préparation de l'archive..." -ForegroundColor Cyan
if (Test-Path $archive) { Remove-Item $archive }
tar -czf $archive @excludes .
if ($LASTEXITCODE -ne 0) { throw "Échec de la création de l'archive" }

Write-Host "2/3  Envoi vers $Server..." -ForegroundColor Cyan
scp $archive "${Server}:/tmp/portfolio-deploy.tgz"
if ($LASTEXITCODE -ne 0) { throw "Échec de l'envoi (scp)" }

Write-Host "3/3  Construction et redémarrage du conteneur..." -ForegroundColor Cyan
$remote = "set -e; mkdir -p $RemoteDir; cd $RemoteDir; tar xzf /tmp/portfolio-deploy.tgz; rm /tmp/portfolio-deploy.tgz; " +
          "if [ ! -f backend/.env ]; then echo 'backend/.env manquant sur le serveur : relance avec -WithEnv'; exit 1; fi; " +
          "docker compose up -d --build; docker compose ps"
ssh $Server $remote
if ($LASTEXITCODE -ne 0) { throw "Échec sur le serveur (voir les messages ci-dessus)" }

Remove-Item $archive
Write-Host "Déploiement terminé." -ForegroundColor Green
