# Quick Setup Guide: Global Assets & Resources System

## What Was Built

A complete **Global Assets & Resources** tracking system for Mission Control that allows you to:
- **Visualize strategic assets worldwide** on an interactive map
- **Track suppliers, manufacturers, equipment sources, investors, and more**
- **Plan international expansion** for SuberCraftex's growth phases
- **Manage relationships** from potential to active status

## Files Created

### Frontend
1. `client/src/components/admin/missionControl/GlobalAssetsMap.jsx` - Main component
2. `client/src/components/admin/missionControl/GlobalAssetsMap.css` - Styling

### Backend
3. `models/GlobalAsset.js` - Database model
4. `controllers/globalAssetsCtrl.js` - Business logic
5. `routes/globalAssetsRoutes.js` - API endpoints

### Documentation
6. `GLOBAL_ASSETS_SYSTEM.md` - Complete system documentation
7. `PROJECT_COMPREHENSIVE_ANALYSIS.md` - Full project analysis
8. `KEY_FILES_REFERENCE.md` - File navigation guide

### Modified Files
- `client/src/components/admin/missionControl/MissionControlDashboard.jsx` - Added menu item and integration
- `server.js` - Registered new routes
- `syncDatabase.js` - Added GlobalAsset model sync

## Setup Steps

### Step 1: Run Database Migration
```bash
node syncDatabase.js
```

Expected output:
```
🔧 Syncing database tables...

Syncing mission_control_nodes...
✅ Mission control nodes table synced!

Syncing global_assets...
✅ Global assets table synced!

==================================================
✅ All tables synced successfully!
==================================================
```

### Step 2: Install Dependencies (if needed)
The feature uses existing dependencies, but verify you have:
```bash
npm install
cd client && npm install
```

### Step 3: Build Frontend
```bash
cd client
npm run build
cd ..
```

### Step 4: Restart Server

**Development:**
```bash
npm run dev
```

**Production (PM2):**
```bash
pm2 restart family-social
pm2 save
```

### Step 5: Access the Feature

1. Navigate to: `https://agent.subercraftex.com/admin/missionControl`
2. Look for **"Global Assets & Resources"** in the left sidebar (with globe icon 🌍)
3. Click to open the map view
4. Click anywhere on the map to add your first marker!

## Quick Test

Add a test marker:
```
Name: Test Supplier
Type: Supplier
Country: Cameroon
City: Douala
Latitude: 4.0511
Longitude: 9.7679
Status: Potential
Description: Test marker for system verification
```

## Git Commit

Once verified working, commit the changes:

```bash
git add .
git commit -m "Add Global Assets & Resources tracking system to Mission Control

🌍 NEW FEATURE: Geographic Asset Tracking

Features:
- Interactive world map with pan/zoom controls
- Add markers for suppliers, manufacturers, equipment, investors, etc.
- Track status from potential to active
- Search and filter by type/country
- Full CRUD operations with backend API
- Dark theme matching Mission Control

Technical:
- Frontend: GlobalAssetsMap component (React)
- Backend: GlobalAsset model, controller, routes
- Database: global_assets table with indexes
- Integration: Added to Mission Control sidebar

Strategic Use:
- Track raw material sources (Nigerian fabrics)
- Equipment suppliers (USA machinery)
- Business partners (Chinese manufacturers)
- Plan global expansion for SuberCraftex

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

git push origin master
```

## Deployment to Production Server

**SSH into your DigitalOcean server:**
```bash
ssh root@148.230.118.19
cd /root/family-social
```

**Pull latest changes:**
```bash
git pull origin master
```

**Run database migration:**
```bash
node syncDatabase.js
```

**Rebuild frontend:**
```bash
cd client
npm run build
cd ..
```

**Restart PM2:**
```bash
pm2 restart family-social
pm2 save
pm2 list
```

**Verify:**
```bash
pm2 logs family-social --lines 50
```

## Troubleshooting

### Issue: Map not showing
- Check browser console for errors
- Verify GlobalAssetsMap.css is loaded
- Clear browser cache

### Issue: Cannot add markers
- Verify database migration ran successfully
- Check API routes are registered in server.js
- Test API endpoint: `curl -H "Authorization: Bearer YOUR_TOKEN" https://agent.subercraftex.com/api/global-assets`

### Issue: Database errors
- Verify PostgreSQL is running
- Check database connection in config/db.js
- Ensure global_assets table exists: `\dt global_assets`

### Issue: 404 on API calls
- Verify routes are registered in server.js
- Check server logs for startup errors
- Restart server completely

## Example Use Cases

### 1. Nigerian Textile Supplier
Track African fabric sources for your fashion line.

### 2. USA Equipment Dealers
Mark machinery suppliers for embroidery motors and industrial equipment.

### 3. Chinese Manufacturers
Identify potential manufacturing partners for furniture expansion.

### 4. Cameroon Facilities
Mark potential office/warehouse locations in Douala, Yaoundé, Buea.

### 5. Target Markets
Identify countries for market expansion (Nigeria, Ghana, Kenya, etc.).

## Next Steps

After setup is complete:
1. **Add real suppliers** you're currently researching
2. **Track the Samsung S23 source** (250K XAF equipment goal)
3. **Mark African fabric suppliers** for fashion line
4. **Identify manufacturing partners** for Phase 2-3 expansion
5. **Plan international trips** by grouping assets by region

## Support

For detailed information, see:
- `GLOBAL_ASSETS_SYSTEM.md` - Complete system documentation
- `PROJECT_COMPREHENSIVE_ANALYSIS.md` - Full project context

---

**Mission Status:** ✅ READY FOR DEPLOYMENT

**High Commander's Strategic Map:** 🌍 OPERATIONAL

**Path to 800K/Month:** 📍 MARKED ON THE GLOBE
