# Focus Heat Map Implementation

## Overview
The Focus Heat Map is now fully integrated into your Mission Control dashboard, matching the reference design from your Cameroon map project.

## What Was Added

### 1. FocusHeatMap Component
**Location:** `/client/src/components/admin/missionControl/FocusHeatMap.jsx`

**Features:**
- **Three Priority Lanes:**
  - 🔴 **CRITICAL** - Red lane for urgent tasks requiring immediate attention
  - 🟡 **ACTIVE** - Amber lane for in-progress, stable tasks
  - ⚫ **ON HOLD** - Gray lane for tasks to resume later

- **Drag & Drop Functionality:**
  - Drag cards between lanes to change priority
  - Automatically updates project status in backend
  - Visual feedback during drag operations

- **Project Cards Display:**
  - Project title and metadata
  - Progress bars with percentage
  - Missing items/blockers
  - Status indicators (✓ On track, etc.)
  - Time allocation (hours per week)
  - Action buttons (Work now, Details, Monitor)

### 2. Card Types

**Critical Cards:**
- Red border with glow effect
- Pulsing indicator
- "Work now" button (red)
- Shows missing items/blockers
- Progress bar

**Active Cards:**
- Amber/orange border
- Status indicator
- "Monitor" and "Details" buttons
- Progress bar (if applicable)

**Hold Cards:**
- Small chip format
- Resume date indicator
- Click to view details
- Can drag to other lanes

### 3. Styling
**Location:** `/client/src/components/admin/missionControl/FocusHeatMap.css`

**Design Features:**
- Dark theme (#0F172A background)
- IBM Plex Sans/Mono fonts
- Smooth animations (pulse, hover, drag)
- Responsive grid layout
- Color-coded priority indicators

### 4. Integration Points

**Sidebar Menu:**
- New "Focus Heat Map" view option
- Fire icon (🔥) for easy identification
- Located after "Global Assets & Resources"

**Data Source:**
- Loads from `/api/projects` endpoint
- Falls back to mock data if backend not ready
- Automatically categorizes by priority/status:
  - `priority: 'critical'` or `status: 'critical'` → Critical lane
  - `status: 'active'` → Active lane
  - `status: 'on_hold'` or `status: 'planning'` → Hold lane

## Mock Data (Default)

The component includes built-in mock data matching your reference design:

**Critical Lane:**
1. SuberFood Platform (70% complete, 12h/week)
   - Missing: Pre-orders, Wallet system, PayWithCamsol
   - 6 days until Ali arrives
   - Due Oct 31

2. Camsol SDO Report (60% complete, 24h/week)
   - Status: ✓ On track
   - Due Oct 20

**Active Lane:**
1. PayWithCamsol
   - Status: Stable
   - Icons integrating

2. SuberCraftex
   - 106 products, low revenue
   - Needs marketing after SuberFood

**Hold Lane:**
1. ProFundra NGO Partnerships (Resume Q1 2027)
2. PayWithCamsol Bank Integration (Resume Q1 2027)
3. SuberCraftex Aggressive Growth (Resume Dec 2026)

## How to Use

### Access the View
1. Navigate to Mission Control
2. Click "Focus Heat Map" in the sidebar (fire icon)
3. View your prioritized projects

### Drag Cards
1. Click and hold any card
2. Drag to a different lane (CRITICAL, ACTIVE, or HOLD)
3. Drop to update priority
4. Backend automatically updates project status

### Take Action
- **Work now** - Start working on critical tasks
- **Monitor** - Check progress on active tasks
- **Details** - View full project details
- Click hold chips to view details

## Backend Requirements

For full functionality, ensure your backend supports:

```javascript
// GET /api/projects
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Project Name",
      "description": "Description",
      "status": "critical" | "active" | "on_hold" | "planning",
      "priority": "critical" | "active",
      "progress": 0-100, // percentage
      // ... other fields
    }
  ]
}

// PUT /api/projects/:id
// Updates project status when dragged between lanes
```

## Customization

### Add More Projects
Edit the `loadMockData()` function in `FocusHeatMap.jsx`:

```javascript
critical: [
  {
    id: 'your-project-id',
    title: 'Your Project Name',
    meta: ['Deadline info', 'Other metadata'],
    pct: 75,
    missing: ['Item 1', 'Item 2'],
    hours: '10h',
    hasMissing: true,
    hasPct: true,
    hasHours: true
  }
]
```

### Customize Colors
Edit `FocusHeatMap.css`:

```css
.critical-card {
  border: 1px solid rgba(239, 68, 68, 0.55); /* Red */
}

.active-card {
  border: 1px solid rgba(245, 158, 11, 0.4); /* Amber */
}
```

### Add Actions
Update `handleWorkNow()` and `handleDetails()` in `FocusHeatMap.jsx` to:
- Open project modals
- Route to project pages
- Start timers
- Log work sessions

## Visual Design Match

The implementation matches your reference design:
- ✅ Same color scheme (red/amber/gray lanes)
- ✅ Same card layouts and spacing
- ✅ Same typography (IBM Plex fonts)
- ✅ Same animations (pulse effect)
- ✅ Same drag-and-drop behavior
- ✅ Same action buttons and styling

## Next Steps

1. **Test the Component:**
   ```bash
   npm start
   # Navigate to Mission Control → Focus Heat Map
   ```

2. **Connect Real Data:**
   - Update your projects API to return proper status fields
   - Remove mock data once backend is ready

3. **Add More Features:**
   - Time tracking integration
   - Progress updates
   - Notifications for overdue tasks
   - Analytics/insights

4. **Integrate with Other Views:**
   - Link "Work now" to time tracking
   - Connect "Details" to project modals
   - Sync with dashboard analytics

## Troubleshooting

**Cards not showing?**
- Check browser console for API errors
- Verify mock data is loading
- Check that component is properly imported

**Drag not working?**
- Ensure `draggable="true"` is set
- Check drag handlers are bound
- Verify browser supports drag events

**Styling issues?**
- Check CSS file is imported
- Verify font imports (IBM Plex)
- Check for CSS conflicts

## Files Modified/Created

✅ Created: `FocusHeatMap.jsx`
✅ Created: `FocusHeatMap.css`
✅ Modified: `MissionControlDashboard.jsx` (imports, sidebar, routing)

Total: 3 files
