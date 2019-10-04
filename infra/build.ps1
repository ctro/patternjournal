# It's easier to keep everything local, change context to image folder.
Invoke-Expression "cd $PSScriptRoot"

$commands = @( 
"./terraform.exe --version",
"./terraform.exe validate",
"./terraform.exe plan"
)

foreach ($command in $commands) {
  Invoke-Expression $command
}

Invoke-Expression "cd .."

