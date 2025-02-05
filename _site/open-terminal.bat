@echo off
cd /d "%~dp0"
rundll32 url.dll,FileProtocolHandler http://127.0.0.1:4000
call jekyll clean
call jekyll serve
pause
