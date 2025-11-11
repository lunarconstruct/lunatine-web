#!/bin/sh

#echo "commit made to lunatine web, pulling to local and rebuilding..."
#cd /home/lunarconstruct/quartz && git pull && npx quartz build && docker compose down && docker compose up -d
#echo "rebuild complete!"

#!/bin/sh

# Load NVM environment variables for this script session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

cd /home/lunarconstruct/quartz || { echo "Failed to change directory!"; exit 1; }
echo "--- Starting lunatine web rebuild at $(date) ---"

echo "1. Pulling latest code..."
git pull origin v4 || { echo "ERROR: Git pull failed! Stopping script."; exit 1; }

echo "2. Building Quartz site..."
# This command should now use Node >= 22 provided by NVM
npx quartz build || { echo "ERROR: Quartz build failed! Stopping script."; exit 1; }

echo "3. Restarting Docker containers..."
docker compose down || { echo "ERROR: Docker down failed! Stopping script."; exit 1; }
docker compose up -d || { echo "ERROR: Docker up failed! Stopping script."; exit 1; }

echo "--- Rebuild and deployment complete! ---"
