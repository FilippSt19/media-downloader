param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern("^v?[0-9]+([.-][0-9A-Za-z.-]+)?$")]
    [string]$Version,

    [string]$ResourceGroup = "media-downloader-rg",
    [string]$Registry = "mediadownloaderacr19",
    [string]$BackendApp = "media-downloader-backend",
    [string]$FrontendApp = "media-downloader-frontend",
    [Parameter(Mandatory = $true)]
    [string]$BackendUrl,
    [Parameter(Mandatory = $true)]
    [string]$FrontendUrl
)

$ErrorActionPreference = "Stop"

$Version = $Version.TrimStart("v")
$BackendImage = "$Registry.azurecr.io/backend:v$Version"
$FrontendImage = "$Registry.azurecr.io/frontend:v$Version"
$RevisionSuffix = "v$Version".ToLowerInvariant().Replace(".", "-")

function Invoke-AzureCommand {
    param(
        [string]$Description,
        [scriptblock]$Command
    )

    Write-Host "`n$Description" -ForegroundColor Cyan
    & $Command
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed: $Description"
    }
}

Write-Host "Deployment v$Version" -ForegroundColor Green
Write-Host "Resource group: $ResourceGroup"
Write-Host "Registry: $Registry"

Invoke-AzureCommand "Verifying Azure login" {
    az account show --output none
}

Invoke-AzureCommand "Logging in to Azure Container Registry" {
    az acr login --name $Registry
}

Invoke-AzureCommand "Building and pushing backend image" {
    az acr build --registry $Registry --image "backend:v$Version" .\backend
}

Invoke-AzureCommand "Building and pushing frontend image" {
    az acr build `
        --registry $Registry `
        --image "frontend:v$Version" `
        --build-arg "NEXT_PUBLIC_API_BASE_URL=$BackendUrl" `
        .\frontend
}

Invoke-AzureCommand "Updating backend Container App" {
    az containerapp update `
        --name $BackendApp `
        --resource-group $ResourceGroup `
        --image $BackendImage `
        --revision-suffix $RevisionSuffix `
        --set-env-vars "FRONTEND_URL=$FrontendUrl"
}

Invoke-AzureCommand "Updating frontend Container App" {
    az containerapp update `
        --name $FrontendApp `
        --resource-group $ResourceGroup `
        --image $FrontendImage `
        --revision-suffix $RevisionSuffix
}

Write-Host "`nDeployment completed successfully: v$Version" -ForegroundColor Green
Write-Host "Backend image:  $BackendImage"
Write-Host "Frontend image: $FrontendImage"