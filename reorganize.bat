@echo off
echo ========================================================
echo          Reorganizing MessHub Project Structure
echo ========================================================
echo.

:: Create directories
echo Creating new directories...
if not exist "frontend" mkdir frontend
if not exist "frontend\src" mkdir frontend\src
if not exist "frontend\src\components" mkdir frontend\src\components
if not exist "frontend\src\components\customer" mkdir frontend\src\components\customer
if not exist "frontend\src\components\seller" mkdir frontend\src\components\seller
if not exist "frontend\src\contexts" mkdir frontend\src\contexts
if not exist "frontend\src\data" mkdir frontend\src\data
if not exist "frontend\src\services" mkdir frontend\src\services
if not exist "database" mkdir database
if not exist "database\models" mkdir database\models

:: Move root configurations to frontend
echo Moving configurations to frontend...
if exist eslint.config.js move eslint.config.js frontend\
if exist index.html move index.html frontend\
if exist postcss.config.js move postcss.config.js frontend\
if exist tailwind.config.js move tailwind.config.js frontend\
if exist tsconfig.json move tsconfig.json frontend\
if exist tsconfig.app.json move tsconfig.app.json frontend\
if exist tsconfig.node.json move tsconfig.node.json frontend\
if exist package.json move package.json frontend\
if exist package-lock.json move package-lock.json frontend\
if exist .gitignore move .gitignore frontend\
if exist .bolt move .bolt frontend\

:: Move src contents to frontend/src
echo Moving source files...
if exist src\App.tsx move src\App.tsx frontend\src\
if exist src\main.tsx move src\main.tsx frontend\src\
if exist src\index.css move src\index.css frontend\src\
if exist src\vite-env.d.ts move src\vite-env.d.ts frontend\src\

if exist src\components\AuthPage.tsx move src\components\AuthPage.tsx frontend\src\components\
if exist src\components\LandingPage.tsx move src\components\LandingPage.tsx frontend\src\components\
if exist src\components\LoadingSpinner.tsx move src\components\LoadingSpinner.tsx frontend\src\components\
if exist src\components\Navbar.tsx move src\components\Navbar.tsx frontend\src\components\

if exist src\components\customer move src\components\customer\* frontend\src\components\customer\
if exist src\components\seller move src\components\seller\* frontend\src\components\seller\
if exist src\contexts move src\contexts\* frontend\src\contexts\
if exist src\data move src\data\* frontend\src\data\
if exist src\services move src\services\* frontend\src\services\

:: Move database items
echo Moving database files...
if exist backend\seed.js move backend\seed.js database\
if exist backend\models\User.js move backend\models\User.js database\models\
if exist backend\models\Mess.js move backend\models\Mess.js database\models\

:: Remove old folders
echo Cleaning up empty directories...
if exist src rmdir /s /q src
if exist backend\models rmdir /s /q backend\models
if exist node_modules rmdir /s /q node_modules

echo.
echo ========================================================
echo Reorganization complete!
echo ========================================================
pause
