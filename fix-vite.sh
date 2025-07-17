#!/bin/bash

# Script để fix Vite version conflict
echo "🔧 Fixing Vite version conflict..."

# Remove node_modules và package-lock.json
rm -rf node_modules package-lock.json

# Install với Vite version cũ hơn
npm install vite@^5.4.0 --save-dev

# Install lại dependencies
npm install

echo "✅ Fixed! Now run: docker-compose build --no-cache && docker-compose up -d"
