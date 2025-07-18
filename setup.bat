# 📦 Tạo Package Distribution cho User

## 1. Tạo script tự động setup

### setup.bat (Windows)
```batch
@echo off
echo ============================================
echo   CRM Frontend Setup Script
echo ============================================

echo Checking Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker not found! Please install Docker Desktop first.
    echo Download: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo Docker found! Setting up environment...
copy .env.example .env

echo Building and starting frontend...
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

echo ============================================
echo   Setup Complete!
echo ============================================
echo Frontend: http://localhost:5173
echo Backend needed on: http://localhost:3000
echo.
echo Commands:
echo   - View logs: docker-compose logs -f
echo   - Stop: docker-compose down
echo ============================================
pause
```

### setup.sh (Mac/Linux)
```bash
#!/bin/bash

echo "============================================"
echo "   CRM Frontend Setup Script"
echo "============================================"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker not found! Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

echo "Docker found! Setting up environment..."
cp .env.example .env

echo "Building and starting frontend..."
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

echo "============================================"
echo "   Setup Complete!"
echo "============================================"
echo "Frontend: http://localhost:5173"
echo "Backend needed on: http://localhost:3000"
echo ""
echo "Commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop: docker-compose down"
echo "============================================"
```

## 2. Package structure cho distribution

```
crm_fe-distribution/
├── README.md                    # Quick start guide
├── SETUP-GUIDE.md              # Detailed setup guide  
├── setup.bat                   # Windows auto setup
├── setup.sh                    # Mac/Linux auto setup
├── docker-compose.yml          # Docker configuration
├── Dockerfile.dev              # Docker build file
├── .env.example               # Environment template
├── package.json               # Dependencies
├── package-lock.json          # Lock file
├── src/                       # Source code
├── public/                    # Static files
└── troubleshooting.md         # Common issues
```

## 3. User workflow

### Simple workflow:
1. **Download** project zip
2. **Extract** to folder
3. **Run** setup.bat (Windows) hoặc setup.sh (Mac/Linux)
4. **Access** http://localhost:5173

### Manual workflow:
1. Install Docker Desktop
2. Clone/download project
3. Copy `.env.example` to `.env`
4. Run `docker-compose up -d`

## 4. Deployment options

### Option A: GitHub Release
- Create release với zip file
- Include setup scripts
- Add detailed README

### Option B: Docker Hub
- Push image to Docker Hub
- User chỉ cần: `docker run -p 5173:5173 yourusername/crm-fe`

### Option C: One-click installer
- Create executable installer
- Include Docker Desktop check
- Auto setup everything
