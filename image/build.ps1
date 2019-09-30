# It's easier to keep everything local, change context to image folder.
Invoke-Expression "cd $PSScriptRoot"

$buildCmd = "./packer.exe build ./server.json"
Invoke-Expression $buildCmd

Invoke-Expression "cd .."

