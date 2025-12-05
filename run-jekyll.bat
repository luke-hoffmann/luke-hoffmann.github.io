@echo off
setlocal

REM Go to the directory of this .bat file
cd /d "%~dp0"

REM Start Jekyll in a NEW command window and keep that window open
start "" cmd /k "bundle exec jekyll serve --livereload --incremental" 

REM Wait a moment for server to start
timeout /t 3 >nul

REM Open the site in your default browser
start "" "http://127.0.0.1:4000/"

REM Close THIS launcher window
endlocal
exit
