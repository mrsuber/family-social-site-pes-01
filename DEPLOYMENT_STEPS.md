# Energy Flows & Focus Heat Map - Deployment Guide

## Quick Deploy (Automated)

Run the deployment script:

```bash
cd /Users/camsoltechnology/dev/personal/family-social-site-pes-01
./DEPLOY_ENERGY_FLOWS.sh
```

This will automatically:
1. Build React frontend
2. Commit and push to GitHub
3. Pull changes on VPS
4. Copy build folder to VPS
5. Restart PM2
6. Show deployment status

---

## Manual Deployment Steps

### Step 1: Build React Frontend Locally

```bash
cd /Users/camsoltechnology/dev/personal/family-social-site-pes-01
cd client
npm run build
```

### Step 2: Git Commit & Push

```bash
# Go back to project root
cd ..

# Check what files changed
git status

# Add all changes
git add -A

# Commit with descriptive message
git commit -m "Add Energy Flows and Focus Heat Map to Mission Control

✨ NEW FEATURES:

1. Focus Heat Map Component (Zone 2)
   - Drag-and-drop priority management
   - Three lanes: CRITICAL, ACTIVE, ON HOLD
   - Project cards with progress bars

2. Energy Flows Component (Zone 4)
   - Time allocation tracking
   - Cash flow visualization
   - Team status tracking

3. Morning Brief Modal
4. Ali's View

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git push origin master
```

### Step 3: Pull Changes on VPS

```bash
ssh -i ~/.ssh/id_ed25519 -p 2222 mohamaduser@76.13.41.99 "cd /home/mohamaduser/family-social && git pull origin master"
```

### Step 4: Copy Build to VPS (Recommended - Faster)

```bash
scp -i ~/.ssh/id_ed25519 -P 2222 -r /Users/camsoltechnology/dev/personal/family-social-site-pes-01/client/build mohamaduser@76.13.41.99:/home/mohamaduser/family-social/client/
```

**OR** Build on Server (Slower):

```bash
ssh -i ~/.ssh/id_ed25519 -p 2222 mohamaduser@76.13.41.99 "cd /home/mohamaduser/family-social/client && npm run build"
```

### Step 5: Restart PM2

```bash
# Restart the application
ssh -i ~/.ssh/id_ed25519 -p 2222 mohamaduser@76.13.41.99 "pm2 restart family-social"

# Check if it's running
ssh -i ~/.ssh/id_ed25519 -p 2222 mohamaduser@76.13.41.99 "pm2 list | grep family-social"

# View logs to verify
ssh -i ~/.ssh/id_ed25519 -p 2222 mohamaduser@76.13.41.99 "pm2 logs family-social --lines 20 --nostream"
```

### Step 6: Verify Deployment

```bash
# Check server is responding
curl https://agent.subercraftex.com

# Or visit in browser:
# https://agent.subercraftex.com
```

---

## What Was Deployed

### New Components Created

1. **FocusHeatMap.jsx** + **FocusHeatMap.css**
   - Location: `client/src/components/admin/missionControl/`
   - Drag-and-drop priority lanes (CRITICAL, ACTIVE, HOLD)
   - Project cards with progress tracking

2. **EnergyFlows.jsx** + **EnergyFlows.css**
   - Location: `client/src/components/admin/missionControl/`
   - Time allocation tracking (40h/week)
   - Cash flow management (income/expenses)
   - Team status dashboard

3. **MorningBriefModal.jsx** + **MorningBriefModal.css**
   - Daily priorities modal
   - Countdown to deadlines

4. **AliView.jsx** + **AliView.css**
   - Team member view
   - Task management

### Files Modified

- **MissionControlDashboard.jsx**
  - Added imports for all new components
  - Added sidebar menu items
  - Added routing for new views
  - Integrated Morning Brief and Ali's View

### New Sidebar Menu Items

- **Focus Heat Map** (🔥 Fire icon)
- **Energy Flows** (📈 Trending up icon)

### New Header Buttons

- **Morning brief** (☀️ Sun icon)
- **Ali's view** (👤 Person icon)

---

## How to Access New Features

After deployment, navigate to Mission Control:

1. **Focus Heat Map**
   - Click "Focus Heat Map" in sidebar
   - Drag cards between CRITICAL/ACTIVE/HOLD lanes

2. **Energy Flows**
   - Click "Energy Flows" in sidebar
   - View time allocation, cash flow, team status
   - Use "Auto-adjust" or "Manual override" buttons

3. **Morning Brief**
   - Click "Morning brief" button in header
   - See today's priorities
   - Click "Begin day" to start

4. **Ali's View**
   - Click "Ali's view" button in header
   - See operations manager perspective
   - Check tasks, upcoming events

---

## Troubleshooting

### Build Fails
```bash
# Clear node modules and rebuild
cd client
rm -rf node_modules package-lock.json
npm install
npm run build
```

### PM2 Not Restarting
```bash
# Stop and start instead
ssh -i ~/.ssh/id_ed25519 -p 2222 mohamaduser@76.13.41.99 "pm2 stop family-social && pm2 start family-social"

# Or delete and recreate
ssh -i ~/.ssh/id_ed25519 -p 2222 mohamaduser@76.13.41.99 "pm2 delete family-social && pm2 start /home/mohamaduser/family-social/server.js --name family-social"
```

### Check Logs for Errors
```bash
# View live logs
ssh -i ~/.ssh/id_ed25519 -p 2222 mohamaduser@76.13.41.99 "pm2 logs family-social"

# View error logs only
ssh -i ~/.ssh/id_ed25519 -p 2222 mohamaduser@76.13.41.99 "pm2 logs family-social --err"
```

### Frontend Not Updating
```bash
# Clear browser cache and hard refresh
# Chrome/Firefox: Ctrl + Shift + R (Windows) or Cmd + Shift + R (Mac)

# Or clear specific build folder on server
ssh -i ~/.ssh/id_ed25519 -p 2222 mohamaduser@76.13.41.99 "rm -rf /home/mohamaduser/family-social/client/build && mkdir -p /home/mohamaduser/family-social/client/build"

# Then copy build again
scp -i ~/.ssh/id_ed25519 -P 2222 -r client/build mohamaduser@76.13.41.99:/home/mohamaduser/family-social/client/
```

---

## Files Added in This Update

```
client/src/components/admin/missionControl/
├── FocusHeatMap.jsx              (NEW)
├── FocusHeatMap.css              (NEW)
├── EnergyFlows.jsx               (NEW)
├── EnergyFlows.css               (NEW)
├── MorningBriefModal.jsx         (NEW)
├── MorningBriefModal.css         (NEW)
├── AliView.jsx                   (NEW)
├── AliView.css                   (NEW)
└── MissionControlDashboard.jsx   (MODIFIED)

Root directory:
├── DEPLOY_ENERGY_FLOWS.sh        (NEW - deployment script)
├── DEPLOYMENT_STEPS.md           (NEW - this file)
└── FOCUS_HEAT_MAP_IMPLEMENTATION.md (NEW - docs)
```

Total: 11 new files, 1 modified file

---

## Next Steps After Deployment

1. **Test All Features**
   - Navigate to each new view
   - Test drag-and-drop in Focus Heat Map
   - Try auto-adjust in Energy Flows
   - Open Morning Brief modal
   - Switch to Ali's View

2. **Connect Real Data** (Optional)
   - Update backend to provide real project data
   - Add API endpoints for time tracking
   - Connect expense tracking to database

3. **Customize Data** (Optional)
   - Edit mock data in each component
   - Update team members
   - Adjust time allocations
   - Modify cash flow amounts

---

## Support

If you encounter issues:

1. Check PM2 logs: `pm2 logs family-social`
2. Verify build was successful
3. Check browser console for errors
4. Ensure all new files were copied to VPS
5. Try clearing browser cache

---

🎉 **Deployment Complete!**

Your Mission Control now has:
- ✅ Focus Heat Map (Zone 2)
- ✅ Energy Flows (Zone 4)
- ✅ Morning Brief Modal
- ✅ Ali's View

All matching the reference design from your Cameroon map project!
