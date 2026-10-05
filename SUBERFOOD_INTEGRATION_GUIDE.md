# SuberFood - Mission Control Integration Guide

## Overview
Successfully integrated SuberFood client location tracking with Mission Control's Geographic Operations map. Clients who place orders can now be tracked on the map with their GPS coordinates, order details, and contact information.

---

## What Was Implemented

### 1. SuberFood Project (`~/dev/personal/SuberFood`)

#### Database Schema Changes
**File**: `apps/landing-page/prisma/schema.prisma`

Added GPS coordinate fields to:
- **Address model** (lines 187-188):
  ```prisma
  latitude   Float?
  longitude  Float?
  ```

- **FarmOrder model** (lines 1967-1968):
  ```prisma
  deliveryLatitude     Float?
  deliveryLongitude    Float?
  ```

#### Frontend: Checkout Form Enhancement
**File**: `apps/landing-page/src/app/distribution/farm-products/checkout/page.tsx`

**New Features**:
- Automatic GPS location button using browser's Geolocation API
- Manual latitude/longitude input fields
- Real-time coordinate validation and display
- Visual feedback when location is set

**UI Components Added**:
- "Use My Current Location" button (lines 744-761)
- Manual coordinate entry fields (lines 770-807)
- Location confirmation indicator (lines 810-819)

**State Management**:
- Added GPS coordinates to `deliveryAddress` state (lines 57-58)
- Added loading and error states for GPS operations (lines 62-63)

#### Backend: Order API Update
**File**: `apps/landing-page/src/app/api/farm-products/orders/route.ts`

**Changes** (lines 226-227):
- Now saves `deliveryLatitude` and `deliveryLongitude` to database when creating orders
- Automatically included in order creation payload

#### New API Endpoint: Client Locations
**File**: `apps/landing-page/src/app/api/clients/locations/route.ts` (NEW)

**Endpoint**: `GET /api/clients/locations`

**Returns**:
```json
{
  "success": true,
  "data": [
    {
      "id": "order-id",
      "orderNumber": "FPO-2026-123456",
      "clientName": "John Doe",
      "clientPhone": "+237 6XX XXX XXX",
      "clientEmail": "john@example.com",
      "address": "Street, City, Region",
      "city": "Buea",
      "state": "Southwest",
      "latitude": 4.1527,
      "longitude": 9.2410,
      "orderStatus": "PENDING",
      "totalAmount": 50000,
      "orderDate": "2026-10-05T...",
      "items": [
        {
          "name": "Product Name",
          "quantity": 2,
          "unit": "kg",
          "totalPrice": 25000
        }
      ],
      "source": "SuberFood",
      "category": "farm-products"
    }
  ],
  "total": 15,
  "timestamp": "2026-10-05T..."
}
```

**Features**:
- Filters orders to only include those with valid GPS coordinates
- Returns client info (name, phone, email)
- Includes complete order details
- Returns location coordinates
- Timestamp for cache management

---

### 2. Mission Control Project (`~/dev/personal/family-social-site-pes-01`)

#### Map Integration
**File**: `client/public/Cameroon-Map.html`

**New Features**:

1. **SuberFood Clients Layer** (line 92)
   - New map layer for displaying SuberFood clients
   - Green markers (#10B981) to differentiate from operations

2. **UI Controls** (lines 46-47)
   - "SuberFood Clients" toggle button (green background)
   - "🔄 Refresh Clients" button for manual data refresh

3. **Client Counter** (line 54)
   - Live counter showing number of SuberFood clients on map
   - Updates automatically when data is refreshed

4. **Data Fetching** (lines 111-122)
   - `fetchSuberFoodClients()` - Fetches data from SuberFood API
   - Error handling for API unavailability
   - Console warnings for debugging

5. **Client Markers** (lines 125-139)
   - Green circular markers for each client
   - Hover tooltip showing client name
   - Click to view full details

6. **Client Detail Panel** (lines 141-164)
   - Full client information display
   - Order details and status (color-coded)
   - Item list with quantities and prices
   - Delivery address
   - GPS coordinates
   - "Zoom to client" button

**Color Coding for Order Status**:
- PENDING: Orange (#F59E0B)
- CONFIRMED: Blue (#3B82F6)
- PREPARING: Purple (#8B5CF6)
- OUT_FOR_DELIVERY: Cyan (#06B6D4)
- DELIVERED/COMPLETED: Green (#10B981)
- CANCELLED: Red (#EF4444)

---

## How It Works

### User Flow

1. **Customer Orders** (SuberFood):
   - Customer visits SuberFood farm products checkout
   - Fills delivery address
   - Either:
     - Clicks "Use My Current Location" → Browser requests GPS permission → Coordinates captured
     - OR manually enters latitude/longitude
   - Completes order with GPS coordinates saved

2. **Data Storage**:
   - Order saved to PostgreSQL database
   - `deliveryLatitude` and `deliveryLongitude` stored in `farm_orders` table

3. **API Exposure**:
   - SuberFood API endpoint (`/api/clients/locations`) exposes client data
   - Only returns orders with valid GPS coordinates

4. **Mission Control Display**:
   - Geographic Operations map loads
   - Automatically fetches SuberFood clients on page load
   - Displays green markers at client locations
   - User can click markers to view details
   - Manual refresh available

---

## Testing Instructions

### Prerequisites

1. **SuberFood Database**:
   ```bash
   cd ~/dev/personal/SuberFood/apps/landing-page

   # Start PostgreSQL (if not running)
   # Make sure DATABASE_URL in .env is correct

   # Run migration to add GPS fields
   npx prisma migrate dev --name add_gps_coordinates

   # Generate Prisma client
   npx prisma generate
   ```

2. **Start SuberFood Server**:
   ```bash
   cd ~/dev/personal/SuberFood/apps/landing-page
   npm run dev
   # Should be running on http://localhost:3000
   ```

3. **Start Mission Control Server**:
   ```bash
   cd ~/dev/personal/family-social-site-pes-01
   npm start
   # Should be running on http://localhost:5000 (or your configured port)
   ```

### Test Scenario 1: Create Test Order with GPS

1. Visit SuberFood checkout:
   ```
   http://localhost:3000/distribution/farm-products/checkout
   ```

2. Add items to cart first (browse farm products)

3. Fill checkout form:
   - Name, phone, email
   - Delivery address

4. Test GPS collection:
   - **Option A**: Click "Use My Current Location" → Allow browser permission
   - **Option B**: Manually enter coordinates (e.g., Buea: 4.1527, 9.2410)

5. Complete order

6. Note the order number (e.g., FPO-2026-123456)

### Test Scenario 2: Verify API Endpoint

1. Open browser or use curl:
   ```bash
   curl http://localhost:3000/api/clients/locations
   ```

2. Should return JSON with your test order

3. Verify response includes:
   - ✓ clientName
   - ✓ clientPhone
   - ✓ latitude & longitude
   - ✓ order items
   - ✓ orderStatus

### Test Scenario 3: View on Mission Control Map

1. Log into Mission Control:
   ```
   http://localhost:5000/admin/mission-control
   ```

2. Navigate to "Global Assets & Resources"

3. Scroll to "05 · GEOGRAPHIC OPERATIONS" section

4. You should see:
   - ✓ Your test order as a green marker on the map
   - ✓ "SuberFood Clients 1" in the legend
   - ✓ "SuberFood Clients" button (green) in toolbar

5. Click the green marker → Client details panel should appear

6. Click "🔄 Refresh Clients" → Should reload data

### Test Scenario 4: Multiple Clients

1. Create 2-3 more test orders with different GPS coordinates:
   - Molyko: 4.1580, 9.2950
   - Bonduma: 4.1430, 9.2870
   - Mile 2: 4.1330, 9.2668

2. Refresh Mission Control map

3. Verify all clients appear as green markers

4. Try toggling "SuberFood Clients" button → markers hide/show

---

## Troubleshooting

### Issue: API Returns Empty Data
**Cause**: No orders with GPS coordinates in database

**Solution**:
```sql
-- Check if orders exist
SELECT id, "orderNumber", "deliveryLatitude", "deliveryLongitude"
FROM farm_orders
WHERE "deliveryLatitude" IS NOT NULL;

-- If empty, create test orders via checkout form
```

### Issue: CORS Error in Mission Control
**Cause**: SuberFood API blocking cross-origin requests

**Solution**: Add to SuberFood `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
      ],
    },
  ]
}
```

### Issue: GPS Not Working in Browser
**Cause**: HTTPS required for Geolocation API

**Solution**:
- Use `localhost` (exempt from HTTPS requirement)
- OR enable HTTPS in development:
  ```bash
  # Next.js with HTTPS
  npm run dev -- --https
  ```

### Issue: Map Shows "SuberFood API not available"
**Cause**: SuberFood server not running or wrong URL

**Solution**:
1. Check SuberFood is running: `curl http://localhost:3000/api/clients/locations`
2. Update API URL in `Cameroon-Map.html` line 113 if needed

---

## Production Deployment

### Environment Variables

**SuberFood** (`~/dev/personal/SuberFood/.env`):
```env
DATABASE_URL="postgresql://user:password@localhost:5440/suberfood_db"
NEXTAUTH_URL="https://suberfood.yourdomain.com"
NEXTAUTH_SECRET="your-secret-key"
```

**Mission Control**:
- Update API URL in `Cameroon-Map.html` line 113:
  ```javascript
  const apiUrl = 'https://suberfood.yourdomain.com/api/clients/locations';
  ```

### Security Considerations

1. **API Authentication** (Future):
   - Add API key requirement to `/api/clients/locations`
   - Implement JWT token validation
   - Rate limiting

2. **Data Privacy**:
   - Consider anonymizing client names on map
   - Only show full details to authorized users
   - Add role-based access control

3. **GPS Privacy**:
   - Inform users their location is being collected
   - Add privacy policy link on checkout form
   - Allow users to opt-out of GPS tracking

---

## Future Enhancements

### Phase 1: Delivery Tracking
- [ ] Add delivery driver tracking (real-time GPS)
- [ ] Show route from HQ to client
- [ ] Estimated arrival time

### Phase 2: Analytics
- [ ] Heatmap of customer concentration
- [ ] Most popular delivery zones
- [ ] Distance-based delivery fee calculator

### Phase 3: Multi-Product Integration
- [ ] Add SuberCraftex clients (different color markers)
- [ ] Filter by product category
- [ ] Combined revenue by location

### Phase 4: Mobile Optimization
- [ ] Responsive map for mobile devices
- [ ] Native GPS on mobile app
- [ ] Push notifications for deliveries

---

## API Reference

### SuberFood Client Locations API

**Endpoint**: `GET /api/clients/locations`

**Authentication**: None (currently open)

**Query Parameters**: None (future: `?status=PENDING&limit=50`)

**Response Format**:
```typescript
{
  success: boolean;
  data: Array<{
    id: string;
    orderNumber: string;
    clientName: string;
    clientPhone: string;
    clientEmail?: string;
    address: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    orderStatus: OrderStatus;
    totalAmount: number;
    orderDate: string; // ISO 8601
    items: Array<{
      name: string;
      quantity: number;
      unit: string;
      totalPrice: number;
    }>;
    source: 'SuberFood';
    category: 'farm-products';
  }>;
  total: number;
  timestamp: string; // ISO 8601
}
```

**Order Status Values**:
- PENDING
- CONFIRMED
- PREPARING
- READY_FOR_PICKUP
- OUT_FOR_DELIVERY
- DELIVERED
- COMPLETED
- CANCELLED

**Error Response**:
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Files Modified Summary

### SuberFood Project
```
✓ apps/landing-page/prisma/schema.prisma (added GPS fields)
✓ apps/landing-page/src/app/distribution/farm-products/checkout/page.tsx (GPS UI)
✓ apps/landing-page/src/app/api/farm-products/orders/route.ts (save coordinates)
✓ apps/landing-page/src/app/api/clients/locations/route.ts (NEW - API endpoint)
```

### Mission Control Project
```
✓ client/public/Cameroon-Map.html (map integration)
```

### Documentation
```
✓ SUBERFOOD_INTEGRATION_GUIDE.md (this file)
```

---

## Support & Questions

If you encounter issues:

1. Check console logs in browser (F12 → Console tab)
2. Verify database migration ran successfully
3. Confirm both servers are running
4. Test API endpoint directly with curl/Postman
5. Check CORS headers if cross-origin issues

---

**Generated**: October 5, 2026
**Version**: 1.0
**Status**: ✅ Ready for Testing
**Next Step**: Run Prisma migration and test end-to-end
