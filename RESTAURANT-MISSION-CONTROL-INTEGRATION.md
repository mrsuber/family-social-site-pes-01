# Restaurant Operations Integration into Mission Control

## Overview
This document outlines how to display restaurant operational data (menu items, inventory, suppliers) as child nodes under the Classical Restaurants department card in Mission Control.

## Current Status
✅ Restaurant data is seeded in database:
- 1 restaurant (Classical Restaurant - Yaounde)
- 12 menu items
- 12 inventory items
- 4 suppliers
- 3 sample orders

❌ Restaurant operational data NOT displayed in Mission Control graph

## Implementation Plan

### 1. Backend Changes

#### A. Update Mission Control Controller (`controllers/missionControlCtrl.js`)

Add restaurant data fetching to the `getDashboardData` method:

```javascript
// After line 9, add:
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const InventoryItem = require('../models/InventoryItem');
const Supplier = require('../models/Supplier');

// In getDashboardData method, after fetching departments (around line 41):
// Add restaurant data fetching
const restaurants = await Restaurant.findAll({
  attributes: ['id', 'name', 'location', 'status', 'departmentId'],
  where: { status: ['active', 'planning'] }
});

// Fetch operational data for each restaurant
const restaurantData = await Promise.all(restaurants.map(async (restaurant) => {
  const [menuItems, inventoryItems, suppliers] = await Promise.all([
    MenuItem.findAll({
      where: { restaurantId: restaurant.id },
      attributes: ['id', 'name', 'category', 'price', 'isAvailable']
    }),
    InventoryItem.findAll({
      where: { restaurantId: restaurant.id },
      attributes: ['id', 'name', 'category', 'currentStock', 'status']
    }),
    Supplier.findAll({
      attributes: ['id', 'name', 'status', 'productsSupplied']
    })
  ]);

  return {
    restaurant,
    menuItems,
    inventoryItems,
    suppliers
  };
}));

// In the response (around line 120), add:
restaurants: restaurantData,
```

### 2. Frontend Changes

#### A. Create Restaurant Resource Node Component

**File:** `client/src/components/admin/missionControl/nodes/RestaurantResourceNode.jsx`

✅ Already created - displays restaurant resources with icons and colors

**CSS additions to `NodeStyles.css`:**

```css
.restaurant-resource-node {
  min-width: 120px;
  padding: 8px;
  border-radius: 8px;
  background: white;
  border: 2px solid;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-size: 12px;
}

.restaurant-resource-node .node-header {
  display: flex;
  align-items: center;
  gap: 6px;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 6px;
  font-weight: 600;
  font-size: 10px;
  text-transform: uppercase;
}

.restaurant-resource-node .node-content {
  padding: 4px 0;
}

.restaurant-resource-node .node-title {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 4px;
  color: #1f2937;
}

.restaurant-resource-node .node-stats {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.restaurant-resource-node .stat-badge {
  background: #e5e7eb;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  color: #6b7280;
}

.restaurant-resource-node .status-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}

.status-active {
  background: #d1fae5;
  color: #065f46;
}

.status-low_stock {
  background: #fed7aa;
  color: #92400e;
}

.status-planning {
  background: #dbeafe;
  color: #1e40af;
}
```

#### B. Update Mission Control Dashboard

**File:** `client/src/components/admin/missionControl/MissionControlDashboard.jsx`

**Changes:**

1. Import the new node (after line 24):
```javascript
import RestaurantResourceNode from './nodes/RestaurantResourceNode';
```

2. Add to nodeTypes object (after line 50):
```javascript
landmark: LandmarkNode,
restaurantResource: RestaurantResourceNode,  // ADD THIS
```

3. Update fetchData to handle restaurant data (after line 606):
```javascript
const { stats, generals, people, departments, assets, incomeStreams, expenses, landmarks, restaurants } = dashboardRes.data.data;
```

4. Store restaurant data in state (add near top with other useState):
```javascript
const [restaurantData, setRestaurantData] = useState([]);
```

5. Set restaurant data (after line 620):
```javascript
setRestaurantData(restaurants || []);
```

6. Pass restaurant data to buildNodeGraph (after line 656):
```javascript
await buildNodeGraph(
  stats,
  generals,
  people,
  assets,
  departments,
  lifeOpsData,
  incomeStreams || [],
  expenses || [],
  landmarks || [],
  restaurants || []  // ADD THIS
);
```

7. Update buildNodeGraph function signature (line 666):
```javascript
const buildNodeGraph = async (
  statsData,
  generalsData,
  peopleData,
  assetsData,
  departmentsData = [],
  lifeOpsData = {},
  incomeStreamsData = [],
  expensesData = [],
  landmarksData = [],
  restaurantsData = []  // ADD THIS
) => {
```

8. Add restaurant nodes logic (after the asset nodes section, around line 1240):

```javascript
// Add restaurant operational nodes under their departments
restaurantsData.forEach(restaurantItem => {
  const { restaurant, menuItems, inventoryItems, suppliers } = restaurantItem;
  const deptNodeId = `department-${restaurant.departmentId}`;
  const deptPosition = savedPositions?.[deptNodeId];

  if (!deptPosition) return; // Skip if department position not found

  // Create restaurant node
  const restaurantNodeId = `restaurant-${restaurant.id}`;
  newNodes.push({
    id: restaurantNodeId,
    type: 'restaurantResource',
    position: savedPositions?.[restaurantNodeId] || {
      x: (deptPosition.x || 200) - 150,
      y: (deptPosition.y || 500) + 150
    },
    data: {
      label: restaurant.name,
      resourceType: 'restaurant',
      status: restaurant.status,
      location: restaurant.location
    },
  });

  // Connect restaurant to department
  newEdges.push({
    id: `dept-${restaurant.departmentId}-restaurant-${restaurant.id}`,
    source: deptNodeId,
    target: restaurantNodeId,
    type: 'smoothstep',
    style: { stroke: '#f59e0b', strokeWidth: 2 }
  });

  // Add menu items node
  if (menuItems.length > 0) {
    const menuNodeId = `menu-${restaurant.id}`;
    newNodes.push({
      id: menuNodeId,
      type: 'restaurantResource',
      position: savedPositions?.[menuNodeId] || {
        x: (deptPosition.x || 200) - 250,
        y: (deptPosition.y || 500) + 280
      },
      data: {
        label: 'Menu Items',
        resourceType: 'menu',
        count: menuItems.length,
        fullData: menuItems
      },
    });

    newEdges.push({
      id: `restaurant-${restaurant.id}-menu`,
      source: restaurantNodeId,
      target: menuNodeId,
      type: 'smoothstep',
      style: { stroke: '#10b981' }
    });
  }

  // Add inventory node
  if (inventoryItems.length > 0) {
    const invNodeId = `inventory-${restaurant.id}`;
    const lowStock = inventoryItems.filter(i => i.status === 'low_stock').length;

    newNodes.push({
      id: invNodeId,
      type: 'restaurantResource',
      position: savedPositions?.[invNodeId] || {
        x: (deptPosition.x || 200) - 150,
        y: (deptPosition.y || 500) + 280
      },
      data: {
        label: 'Inventory',
        resourceType: 'inventory',
        count: inventoryItems.length,
        status: lowStock > 0 ? 'low_stock' : 'in_stock',
        fullData: inventoryItems
      },
    });

    newEdges.push({
      id: `restaurant-${restaurant.id}-inventory`,
      source: restaurantNodeId,
      target: invNodeId,
      type: 'smoothstep',
      style: { stroke: '#3b82f6' }
    });
  }

  // Add suppliers node
  if (suppliers.length > 0) {
    const suppNodeId = `suppliers-${restaurant.id}`;
    newNodes.push({
      id: suppNodeId,
      type: 'restaurantResource',
      position: savedPositions?.[suppNodeId] || {
        x: (deptPosition.x || 200) - 50,
        y: (deptPosition.y || 500) + 280
      },
      data: {
        label: 'Suppliers',
        resourceType: 'supplier',
        count: suppliers.length,
        fullData: suppliers
      },
    });

    newEdges.push({
      id: `restaurant-${restaurant.id}-suppliers`,
      source: restaurantNodeId,
      target: suppNodeId,
      type: 'smoothstep',
      style: { stroke: '#8b5cf6' }
    });
  }
});
```

## Testing

After implementing these changes:

1. **Build and deploy:**
   ```bash
   cd client && npm run build
   tar -czf build.tar.gz build/
   scp build.tar.gz root@148.230.118.19:/root/family-social/client/
   ssh root@148.230.118.19 "cd /root/family-social/client && rm -rf build && tar -xzf build.tar.gz && rm -f build.tar.gz"
   ```

2. **Navigate to Mission Control:**
   - Go to `/admin/missionControl`
   - Look for the "Classical Restaurants" department card
   - You should see 4 child nodes below it:
     - Restaurant node (orange)
     - Menu Items node (green) - showing "12 items"
     - Inventory node (blue) - showing "12 items"
     - Suppliers node (purple) - showing "4 items"

## Expected Result

The Mission Control graph will show:
```
[SuberFood - Farm & Agriculture]
       ↓
[Classical Restaurants Department]
       ↓
[Classical Restaurant - Yaounde]
   ↙    ↓    ↘
[Menu]  [Inventory]  [Suppliers]
12 items  12 items    4 items
```

## Files Modified

1. ✅ `/controllers/missionControlCtrl.js` - Add restaurant data fetching
2. ✅ `/client/src/components/admin/missionControl/nodes/RestaurantResourceNode.jsx` - Created
3. ✅ `/client/src/components/admin/missionControl/nodes/NodeStyles.css` - Add styles
4. ✅ `/client/src/components/admin/missionControl/MissionControlDashboard.jsx` - Add node rendering logic

## Notes

- All restaurant operational data is already in the database
- The integration follows the existing pattern for People and Assets nodes
- Node positions are saved in localStorage and can be dragged to customize layout
- The implementation is scalable - works with multiple restaurants automatically
