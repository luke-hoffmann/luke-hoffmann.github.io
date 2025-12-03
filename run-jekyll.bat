@echo off
setlocal

REM Go to the directory of this .bat file
cd /d "%~dp0"

REM Start Jekyll in a new background process
start "" cmd /c "bundle exec jekyll serve --livereload"

REM Optional: wait a few seconds for the server to boot
timeout /t 5 /nobreak >nul

REM Open the site in your default browser
start "" "http://127.0.0.1:4000/"

REM Keep window open if you want
pause

endlocal