#!/bin/bash

# Navigate to the project directory
cd /home/la_niina_me/release || exit

# Pull the latest changes from the repository
git pull origin main

# Install dependencies
pnpm install

# Build the application
pnpm build

# Restart the PM2 process
pm2 restart release
