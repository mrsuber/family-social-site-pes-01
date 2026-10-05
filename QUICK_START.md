# SuberFood → Mission Control Integration - Quick Start

## ✅ What's Done

### SuberFood (`~/dev/personal/SuberFood`)
- ✅ Added GPS coordinate fields to database schema (Address & FarmOrder models)
- ✅ Added GPS collection UI to checkout form (automatic + manual)
- ✅ Updated order creation API to save coordinates
- ✅ Created `/api/clients/locations` endpoint to expose client data

### Mission Control (`~/dev/personal/family-social-site-pes-01`)
- ✅ Integrated SuberFood clients into Geographic Operations map
- ✅ Green markers for SuberFood clients
- ✅ Client detail popups with order info
- ✅ Manual refresh button
- ✅ Client counter in map legend

---

## 🚀 Quick Start Commands

### 1. Update SuberFood Database
```bash
cd ~/dev/personal/SuberFood/apps/landing-page

# Run migration (creates new GPS fields)
npx prisma migrate dev --name add_gps_coordinates

# If database not running, start it first then run above
```

### 2. Start SuberFood Server
```bash
cd ~/dev/personal/SuberFood/apps/landing-page
npm run dev
# Runs on http://localhost:3000
```

### 3. Start Mission Control Server
```bash
cd ~/dev/personal/family-social-site-pes-01
npm start
# Runs on your configured port
```

### 4. Test the Integration

**Create Test Order**:
1. Visit: `http://localhost:3000/distribution/farm-products`
2. Add items to cart
3. Go to checkout
4. Fill form + click "Use My Current Location" (or enter manually)
5. Complete order

**View on Map**:
1. Visit: `http://localhost:5000/admin/mission-control`
2. Click "Global Assets & Resources"
3. See green marker on map
4. Click marker → View client details

---

## 📍 Test GPS Coordinates (Cameroon)

Use these for manual testing:

| Location | Latitude | Longitude |
|----------|----------|-----------|
| Buea (HQ) | 4.1527 | 9.2410 |
| Molyko | 4.1580 | 9.2950 |
| Bonduma | 4.1430 | 9.2870 |
| Mile 2 | 4.1330 | 9.2668 |
| Douala | 4.0511 | 9.7679 |

---

## 🔍 Verify API Works

```bash
# Test SuberFood API endpoint
curl http://localhost:3000/api/clients/locations

# Should return JSON with client data
```

---

## 📁 Key Files Changed

**SuberFood**:
- `prisma/schema.prisma` - Added GPS fields
- `src/app/distribution/farm-products/checkout/page.tsx` - GPS UI
- `src/app/api/farm-products/orders/route.ts` - Save coordinates
- `src/app/api/clients/locations/route.ts` - NEW API endpoint

**Mission Control**:
- `client/public/Cameroon-Map.html` - Map integration

---

## 🎯 What You'll See

### Geographic Operations Map:
- 🔴 Red markers = Your operations (HQ, etc.)
- 🔵 Blue markers = Planned operations
- ⚪ Gray markers = Expansion targets
- 🟢 **Green markers = SuberFood clients** ← NEW!

### Map Controls:
- Toggle layers: Operations, Routes, Expansion, **SuberFood Clients**
- **🔄 Refresh Clients** button
- View switcher: Africa, Cameroon, Buea, Survey zones
- Base layer: Dark, Streets, Satellite

### Client Panel Shows:
- Client name, phone, email
- Order number & status (color-coded)
- Order items & prices
- Delivery address
- GPS coordinates
- "Zoom to client" button

---

## ⚠️ Troubleshooting

**Map says "SuberFood API not available"**:
- Check SuberFood server is running: `curl http://localhost:3000/api/clients/locations`
- Verify database has orders with GPS coordinates

**No green markers on map**:
- Create test orders with GPS coordinates first
- Click "🔄 Refresh Clients" button

**GPS button doesn't work**:
- Browser needs location permission
- Must use `localhost` or HTTPS

---

## 📖 Full Documentation

See `SUBERFOOD_INTEGRATION_GUIDE.md` for:
- Detailed implementation breakdown
- Complete testing scenarios
- Production deployment guide
- Security considerations
- Future enhancements roadmap

---

**Status**: ✅ Ready for Testing
**Next**: Run Prisma migration → Create test orders → View on map
