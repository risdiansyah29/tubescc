#!/bin/bash

echo "Starting Deployment..."

# 1. Pull latest changes
# git pull origin main

# 2. Setup Backend
echo "Setting up Backend..."
cd backend
npm install
pm2 restart index.js || pm2 start index.js --name "finance-backend"

# 3. Setup Frontend
echo "Setting up Frontend..."
cd ../frontend
npm install
npm run build

echo "Deployment Finished Successfully!"
