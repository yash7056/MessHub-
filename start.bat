@echo off
echo ========================================================
echo                 MessHub Startup Script
echo ========================================================
echo.

:: 1. Check/Install database dependencies
if not exist "database\node_modules\" (
    echo [1/3] Installing database dependencies...
    cd database && npm install && cd ..
) else (
    echo [1/3] Database dependencies already installed.
)

:: 2. Check/Install backend dependencies
if not exist "backend\node_modules\" (
    echo [2/3] Installing backend dependencies...
    cd backend && npm install && cd ..
) else (
    echo [2/3] Backend dependencies already installed.
)

:: 3. Check/Install frontend dependencies
if not exist "frontend\node_modules\" (
    echo [3/3] Installing frontend dependencies...
    cd frontend && npm install && cd ..
) else (
    echo [3/3] Frontend dependencies already installed.
)

echo.
echo ========================================================
echo Setup complete! Starting servers...
echo.
echo * Database seed script can be run inside database/ via: npm run seed
echo * Backend server will run at: http://localhost:5001
echo * Frontend application will run at: http://localhost:5173
echo ========================================================
echo.

:: Start backend dev server in a new command window
start "MessHub Backend Server" cmd /k "cd backend && npm run dev"

:: Start frontend dev server in a new command window
start "MessHub Frontend App" cmd /k "cd frontend && npm run dev"

echo.
echo MessHub has started! Close the newly opened terminal windows to stop the servers.
pause
