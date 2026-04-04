@echo off
for %%f in (%~dp0..\utnsanmiguel_source\public\proj_*.png) do (
    copy "%%f" "%~dp0public\" /Y >nul
    echo Copied: %%~nxf
)
echo Done.
