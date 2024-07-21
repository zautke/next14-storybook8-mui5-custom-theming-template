@echo off
start wt new-tab --title "server" cmd /c "wsl.exe -d trolltyggr -e bash -c 'lx && yarn io'" `
          ; new-tab --title "dev" cmd /c "wsl.exe -d trolltyggr -e bash -c 'lx && yanr dev'" `
          ; new-tab --title "console" cmd /c "wsl.exe -d trolltyggr -e bash -c 'lx'"
