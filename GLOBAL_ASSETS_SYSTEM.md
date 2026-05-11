# Global Assets & Resources System

## Overview

The Global Assets & Resources system is a strategic geographic tracking tool integrated into Mission Control. It allows you to visualize and manage potential suppliers, manufacturing partners, equipment sources, investors, target markets, and other strategic assets on a world map.

## Purpose

As SuberCraftex expands globally, you need to track:
- **Raw material sources** (e.g., African wear fabrics from Nigeria)
- **Equipment suppliers** (e.g., machinery from USA)
- **Business partners** (e.g., investors and manufacturers in China)
- **Target markets** for expansion
- **Logistics hubs** for supply chain optimization
- **Facility locations** for future offices/warehouses

## Features

### 1. Interactive 3D World Map
- **Pan and zoom** controls for navigation
- **Click anywhere** on the map to add a new marker
- **SVG-based rendering** for smooth scaling at any zoom level
- **Visual markers** color-coded by asset type

### 2. Asset Types
Each marker can be classified as:
- **Supplier** (Raw Material Supplier) - Blue (#3b82f6)
- **Manufacturer** (Manufacturing Partner) - Green (#10b981)
- **Equipment** (Equipment Source) - Orange (#f59e0b)
- **Investor** (Business Partner/Investor) - Purple (#8b5cf6)
- **Market** (Target Market) - Red (#ef4444)
- **Logistics** (Logistics Hub) - Cyan (#06b6d4)
- **Facility** (Facility/Office Location) - Indigo (#6366f1)
- **Other** (Other Strategic Asset) - Gray (#64748b)

### 3. Asset Status Tracking
Track the relationship status with each asset:
- **Potential** - Not yet contacted
- **Contacted** - Initial contact made
- **Negotiating** - In active negotiations
- **Active** - Currently working relationship
- **Completed** - Completed transaction/project
- **Inactive** - No longer active

### 4. Detailed Information
For each marker, track:
- **Name** of the asset/location
- **Type** of asset
- **Country and City**
- **Precise coordinates** (latitude/longitude)
- **Description** of what you'll source/do there
- **Contact information** (email, phone, key person)
- **Strategic notes** for planning

### 5. Search and Filter
- **Search bar** to quickly find assets by name, country, or type
- **Filter by type** to focus on specific categories
- **Filter by country** to see regional concentration

## User Interface

### Left Sidebar Panel
- **Control buttons** for zoom in/out and reset view
- **Search box** for filtering markers
- **Assets list** showing all markers with:
  - Asset name and location
  - Type badge
  - Status indicator
  - Quick edit/delete buttons

### Main Map Canvas
- **Interactive world map** with pan/zoom
- **Visual markers** positioned by coordinates
- **Marker labels** showing asset names
- **Click markers** to view full details

### Info Panel (Right side)
When you select a marker, a detailed panel shows:
- Full asset information
- All tracked details
- Quick close button

### Add/Edit Modal
Full-featured form for adding or editing markers:
- All required and optional fields
- Validation for data integrity
- Auto-populated coordinates when clicking on map

## Technical Implementation

### Frontend Components
**Location:** `client/src/components/admin/missionControl/`

1. **GlobalAssetsMap.jsx**
   - Main component with map visualization
   - Marker management (CRUD operations)
   - Pan/zoom controls
   - Search and filtering

2. **GlobalAssetsMap.css**
   - Dark theme styling matching Mission Control
   - Responsive layout
   - Smooth animations and transitions

### Backend

1. **Model:** `models/GlobalAsset.js`
   - Sequelize model for PostgreSQL
   - UUID primary key
   - Geographic coordinates (decimal latitude/longitude)
   - Relationship to User and General models
   - Timestamps for tracking

2. **Routes:** `routes/globalAssetsRoutes.js`
   - GET `/api/global-assets` - Get all assets
   - GET `/api/global-assets/:id` - Get single asset
   - GET `/api/global-assets/type/:type` - Filter by type
   - GET `/api/global-assets/country/:country` - Filter by country
   - POST `/api/global-assets` - Create new asset
   - PUT `/api/global-assets/:id` - Update asset
   - DELETE `/api/global-assets/:id` - Delete asset

3. **Controller:** `controllers/globalAssetsCtrl.js`
   - Request handlers for all routes
   - Validation logic
   - Error handling
   - User authentication checks

### Database Schema

**Table:** `global_assets`

```sql
CREATE TABLE global_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  description TEXT,
  contact VARCHAR(255),
  notes TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'potential',
  user_id INTEGER NOT NULL REFERENCES users(id),
  general_id UUID REFERENCES generals(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_global_assets_user_id ON global_assets(user_id);
CREATE INDEX idx_global_assets_type ON global_assets(type);
CREATE INDEX idx_global_assets_status ON global_assets(status);
CREATE INDEX idx_global_assets_country ON global_assets(country);
```

## Setup Instructions

### 1. Run Database Migration
```bash
node syncDatabase.js
```

This will create the `global_assets` table in your PostgreSQL database.

### 2. Restart Server
```bash
# Development
npm run dev

# Production
pm2 restart family-social
```

### 3. Access the Feature
1. Navigate to Mission Control: `https://agent.subercraftex.com/admin/missionControl`
2. Click **"Global Assets & Resources"** in the left sidebar
3. Start adding markers by clicking on the map!

## Usage Examples

### Example 1: Nigerian Textile Supplier
```
Name: Lagos Premium Fabrics Ltd
Type: Supplier
Country: Nigeria
City: Lagos
Latitude: 6.5244
Longitude: 3.3792
Description: Source for African print fabrics and premium textiles for fashion line
Contact: contact@lagospremiumfabrics.ng
Status: Potential
Notes: Recommended by Ibrahim. Need to negotiate bulk pricing.
```

### Example 2: USA Machinery Dealer
```
Name: Industrial Machines Inc.
Type: Equipment
Country: United States
City: Detroit
Latitude: 42.3314
Longitude: -83.0458
Description: Embroidery machines and industrial sewing equipment
Contact: sales@industrialmachines.com, +1-555-0123
Status: Contacted
Notes: Quoted $15K for embroidery motor. Negotiating shipping to Cameroon.
```

### Example 3: Chinese Manufacturer
```
Name: Shenzhen Smart Furniture Co.
Type: Manufacturer
Country: China
City: Shenzhen
Latitude: 22.5431
Longitude: 114.0579
Description: Potential manufacturing partner for smart furniture line
Contact: Mr. Wei Zhang, wei@smartfurniture.cn
Status: Negotiating
Notes: Can produce custom designs. MOQ: 500 units. 60-day lead time.
```

## Strategic Use Cases

### Phase 1: Fashion & Textiles (Current)
- Track fabric suppliers across Africa
- Mark equipment sources (embroidery motors, sewing machines)
- Identify potential investors and business partners

### Phase 2-3: Expansion (Years 1-5)
- Map manufacturing facilities for furniture
- Track restaurant location candidates
- Mark logistics hubs for supply chain

### Phase 4-5: Global Operations (Years 5-10)
- International market research and expansion targets
- Strategic facility locations
- Global supply chain optimization

### Phase 6-7: Aerospace (Years 10-25)
- Aerospace component suppliers
- Research facility locations
- Launch site candidates

## Integration with Mission Control

The Global Assets system is fully integrated with Mission Control:
- **Sidebar menu item** with globe icon
- **Consistent dark theme** styling
- **Same authentication** and user context
- **Can associate assets with Generals** for organizational structure

## Future Enhancements

Potential improvements for future development:
1. **Real world map SVG** - Replace simplified continents with detailed country borders
2. **Marker clustering** - Group nearby markers at low zoom levels
3. **Route planning** - Draw lines between markers to plan trips
4. **Photo uploads** - Attach photos to markers
5. **Document attachments** - Store contracts, quotes, etc.
6. **Timeline view** - See assets chronologically
7. **Financial tracking** - Link to expenses and income streams
8. **Notifications** - Reminders for follow-ups
9. **Export functionality** - Generate reports and maps for presentations
10. **Mobile optimization** - Touch-friendly controls

## Maintenance

### Backing Up Data
The `global_assets` table is part of your regular PostgreSQL backup:
```bash
pg_dump -U postgres -d family_social -t global_assets > global_assets_backup.sql
```

### Monitoring
Check the table stats:
```sql
SELECT COUNT(*), type, status
FROM global_assets
WHERE user_id = YOUR_USER_ID
GROUP BY type, status;
```

## Security

- **Authentication required** - All routes protected by auth middleware
- **User isolation** - Each user only sees their own markers
- **Input validation** - All fields validated on backend
- **SQL injection protection** - Sequelize ORM prevents injection attacks

## Performance

- **Indexed queries** - Database indexes on user_id, type, status, country
- **Optimized rendering** - SVG for smooth scaling
- **Lazy loading** - Markers loaded only when needed
- **Efficient updates** - Only modified fields sent to backend

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify database connection
3. Ensure all migrations ran successfully
4. Check server logs for API errors

---

**Built with Vision for SuberCraftex's 30-Year Mission to the Stars** 🚀

*"Every empire needs a map. This is yours."* - High Commander Mohamad Siysinyuy
