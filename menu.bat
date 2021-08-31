@echo off
Title lua#0007 Menu
goto :menu
color 05


:menu
color 05
echo. ___________________________________________________________
echo.                 _    _                  
echo.                ( )  ( )                 
echo.                ( )__( )_   _ _ __   ___ 
echo.                (  __  ) ( ) ( '_ \ / _ \
echo.                ( )  ( ) (_) ( (_) (  __/
echo.                (_)  (_)\__, ( .__/ \___)
echo.                          ( )( )          
echo.                          ( )(_)               
echo. ___________________________________________________________
echo.                      Menu Principal
echo. ___________________________________________________________
echo.
echo.             1 - Iniciar Bot           3 - Sair
echo.             2 - Instalar o Bot          
echo.  
echo. ___________________________________________________________
echo.
set /p choice=Digite uma opcao:
if '%choice%'=='1' goto :iniciarbot
if '%choice%'=='2' goto :instalarbot
if '%choice%'=='3' goto :sair

:iniciarbot
cls
echo. ___________________________________________________________
echo.                 _    _                  
echo.                ( )  ( )                 
echo.                ( )__( )_   _ _ __   ___ 
echo.                (  __  ) ( ) ( '_ \ / _ \
echo.                ( )  ( ) (_) ( (_) (  __/
echo.                (_)  (_)\__, ( .__/ \___)
echo.                          ( )( )          
echo.                          ( )(_)               
echo. ___________________________________________________________
node .

pause .

:sair
exit

:instalarbot
npm install
npm install discord.js
npm install mysql