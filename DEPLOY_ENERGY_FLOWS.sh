#!/bin/bash

# Energy Flows & Focus Heat Map Deployment Script
# Following your exact VPS deployment workflow

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Step 1: Build React Frontend Locally
echo ""
echo "📦 Step 1: Building React frontend..."
cd client
npm run build

# Step 2: Git Commit & Push
echo ""
echo "📝 Step 2: Committing and pushing to GitHub..."
cd ..

# Check what files changed
echo "Changed files:"
git status --short

# Add all changes
git add -A

# Commit with descriptive message
git commit -m "Add Energy Flows and Focus Heat Map to Mission Control

✨ NEW FEATURES:

1. Focus Heat Map Component (Zone 2)
   - Drag-and-drop priority management
   - Three lanes: CRITICAL (red), ACTIVE (amber), ON HOLD (gray)
   - Project cards with progress bars, missing items, action buttons
   - Auto-updates backend when priorities change

2. Energy Flows Component (Zone 4)
   - Time allocation tracking (Camsol SDO, SuberFood, Planning)
   - Auto-adjust and manual override for time management
   - Cash flow visualization (income, expenses, net, runway)
   - Team status tracking (High Commander, Ali, KD)
   - Real-time warnings for at-risk projects

3. Morning Brief Modal
   - Daily priorities with countdown timers
   - Begin day workflow
   - Adjust priorities feature

4. Ali's View
   - Team member perspective
   - Task management with checkboxes
   - Upcoming timeline events
   - Switch between Commander and Ali views

📊 MISSION CONTROL VIEWS NOW INCLUDE:
- Overview (node graph)
- People
- Projects
- Analytics
- Life Operations
- Daily Timetable
- Global Assets & Resources
- Focus Heat Map (NEW)
- Energy Flows (NEW)

🎨 DESIGN:
- Matches reference Cameroon map project
- Dark theme (#0F172A)
- IBM Plex fonts
- Smooth animations and transitions
- Responsive layouts

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
echo ""
echo "⬆️  Pushing to GitHub..."
git push origin master

# Step 3: Pull Changes on VPS
echo ""
echo "📥 Step 3: Pulling changes on VPS..."
ssh -i ~/.ssh/id_ed25519 -p 2222 mohamaduser@76.13.41.99 "cd /home/mohamaduser/family-social && git pull origin master"

# Step 4: Copy Build to VPS (faster than building on server)
echo ""
echo "📤 Step 4: Copying build folder to VPS..."
scp -i ~/.ssh/id_ed25519 -P 2222 -r client/build mohamaduser@76.13.41.99:/home/mohamaduser/family-social/client/

# Step 5: Restart PM2
echo ""
echo "🔄 Step 5: Restarting PM2..."
ssh -i ~/.ssh/id_ed25519 -p 2222 mohamaduser@76.13.41.99 "pm2 restart family-social"

# Step 6: Check Status
echo ""
echo "✅ Step 6: Checking deployment status..."
ssh -i ~/.ssh/id_ed25519 -p 2222 mohamaduser@76.13.41.99 "pm2 list | grep family-social"

# View recent logs
echo ""
echo "📋 Recent logs:"
ssh -i ~/.ssh/id_ed25519 -p 2222 mohamaduser@76.13.41.99 "pm2 logs family-social --lines 20 --nostream"

# Final check
echo ""
echo "🌐 Deployment complete!"
echo ""
echo "🔗 Your app is now live at: https://agent.subercraftex.com"
echo ""
echo "📍 New features added:"
echo "   - Focus Heat Map (Zone 2)"
echo "   - Energy Flows (Zone 4)"
echo "   - Morning Brief Modal"
echo "   - Ali's View"
echo ""
echo "✨ Navigate to Mission Control and click:"
echo "   - 'Focus Heat Map' in sidebar"
echo "   - 'Energy Flows' in sidebar"
echo "   - 'Morning brief' button in header"
echo "   - 'Ali's view' button in header"
echo ""
