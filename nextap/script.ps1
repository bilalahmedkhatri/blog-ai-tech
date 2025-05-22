function Show-Tree {
    param(
        [string]$Path = '.',
        [int]$Depth = 2
    )
    Get-ChildItem -Path $Path -Force -Recurse -Depth ($Depth - 1) |
        Where-Object { $_.PSIsContainer } |  # Only folders
        ForEach-Object { $_.FullName.Substring((Resolve-Path $Path).Path.Length) }
}

Show-Tree -Path .\nextap -Depth 2