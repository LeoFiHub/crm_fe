#!/bin/bash

echo "============================================"
echo "   CRM Frontend Setup Script"
echo "============================================"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ ERROR: Docker not found!"
    echo "📥 Please install Docker first:"
    echo "   - Windows/Mac: https://www.docker.com/products/docker-desktop"
    echo "   - Linux: sudo apt install docker.io docker-compose"
    exit 1
fi

echo "✅ Docker found! Setting up environment..."

# Copy environment file
if [ -f ".env.example" ]; then
    cp .env.example .env
    echo "✅ Environment file created"
else
    echo "⚠️  Warning: .env.example not found"
fi

echo "🔨 Building and starting frontend..."

# Clean up any existing containers
docker-compose down --remove-orphans 2>/dev/null

# Build and start
echo "🏗️  Building Docker image..."
docker-compose build --no-cache

echo "🚀 Starting frontend..."
docker-compose up -d

# Wait a moment for container to start
sleep 3

# Check if container is running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "============================================"
    echo "   🎉 Setup Complete!"
    echo "============================================"
    echo "🌐 Frontend: http://localhost:5173"
    echo "⚙️  Backend needed on: http://localhost:3000"
    echo ""
    echo "📋 Useful commands:"
    echo "   - View logs: docker-compose logs -f"
    echo "   - Stop: docker-compose down"
    echo "   - Restart: docker-compose restart"
    echo "============================================"
else
    echo ""
    echo "❌ Setup failed! Check logs:"
    echo "docker-compose logs"
fi
