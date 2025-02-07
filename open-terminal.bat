@echo off
cd /d "%~dp0"
call jekyll clean
start "" jekyll serve
timeout /t 5 /nobreak > nul
start "" "http://127.0.0.1:4000"
exit