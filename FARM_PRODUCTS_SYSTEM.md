# Farm Products Management System - SuberFoods

## Overview

Complete farm products management system for SuberFoods distribution/processing/farming platform with:
- Product catalog management
- Direct image upload (no external hosting required)
- Stock management with automatic status updates
- Bulk and retail pricing
- Admin dashboard for product editing

## Features

### Product Management
- ✅ Create, Read, Update, Delete products
- ✅ SKU-based product identification
- ✅ Multi-category support (Herbs, Grains, Fruits, etc.)
- ✅ Bulk and retail pricing
- ✅ Product images with primary image selection
- ✅ Product status (Active, Inactive, Seasonal, Discontinued)

### Stock Management
- ✅ Real-time stock tracking
- ✅ Automatic stock status (In Stock, Low Stock, Out of Stock)
- ✅ Stock operations (Add, Subtract, Set)
- ✅ Minimum stock alerts
- ✅ Last restocked tracking
- ✅ Stock history notes

### Image Management
- ✅ Multiple images per product
- ✅ Direct file upload (up to 10 images)
- ✅ Primary image selection
- ✅ Image deletion
- ✅ Automatic storage in `/uploads/photos/`

## Installation & Setup

### 1. Database Migration

Run the migration to create the farm_products table:

```bash
node migrations/create_farm_products_table.js
```

Expected output:
```
🔌 Connecting to database...
✅ Database connected
📝 Creating farm_products table...
✅ Farm products table created/updated successfully!
```

### 2. Backend Routes

Farm products routes are registered at `/api/farm-products`:

```javascript
// Already added to server.js
app.use('/api/farm-products', require('./routes/farmProductRoutes'));
```

### 3. Frontend Routes

Add these routes to your React Router configuration:

```javascript
// In your main routing file
import ProductsListPage from './pages/admin/farmProducts/ProductsListPage';
import ProductEditPage from './pages/admin/farmProducts/ProductEditPage';

// Add to your routes
<Route path="/admin/farm-products" element={<ProductsListPage />} />
<Route path="/admin/farm-products/:id" element={<ProductEditPage />} />
```

## API Endpoints

### Products

#### Get All Products
```http
GET /api/farm-products/products
```

**Query Parameters:**
- `category` - Filter by category
- `status` - Filter by status
- `stockStatus` - Filter by stock status
- `search` - Search in name/SKU/description

**Response:**
```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "id": "uuid",
      "sku": "FP-HER-GAR-045",
      "name": "Fresh Garlic",
      "category": "HERBS SPICES",
      "retailPrice": 5500,
      "currentStock": 0,
      "stockStatus": "OUT OF STOCK",
      "status": "ACTIVE",
      ...
    }
  ]
}
```

#### Get Single Product
```http
GET /api/farm-products/products/:id
```

#### Create Product
```http
POST /api/farm-products/products
Content-Type: application/json

{
  "sku": "FP-GRA-RIC-029",
  "name": "African Rice",
  "category": "GRAINS CEREALS",
  "retailPrice": 2000,
  "retailUnit": "kg",
  "bulkPrice": 42000,
  "bulkUnit": "bag",
  "bulkQuantity": 50,
  "minimumStock": 100,
  "status": "ACTIVE"
}
```

#### Update Product
```http
PUT /api/farm-products/products/:id
Content-Type: application/json

{
  "name": "Updated Product Name",
  "retailPrice": 6000,
  ...
}
```

#### Upload Product Images
```http
POST /api/farm-products/products/:id/images
Content-Type: multipart/form-data

FormData:
  images: [File, File, File...]
```

**Example (JavaScript):**
```javascript
const formData = new FormData();
formData.append('images', imageFile1);
formData.append('images', imageFile2);

const response = await axios.post(
  `/api/farm-products/products/${productId}/images`,
  formData,
  {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }
);
```

#### Delete Product Image
```http
DELETE /api/farm-products/products/:id/images
Content-Type: application/json

{
  "imageUrl": "/uploads/photos/image-filename.jpg"
}
```

#### Set Primary Image
```http
PATCH /api/farm-products/products/:id/primary-image
Content-Type: application/json

{
  "imageUrl": "/uploads/photos/image-filename.jpg"
}
```

#### Update Stock
```http
PATCH /api/farm-products/products/:id/stock
Content-Type: application/json

{
  "quantity": 500,
  "operation": "add",
  "notes": "New shipment from supplier"
}
```

**Operations:**
- `add` - Add stock (new shipment)
- `subtract` - Remove stock (sale/loss)
- `set` - Set exact stock (inventory count)

#### Delete Product
```http
DELETE /api/farm-products/products/:id
```

### Low Stock & Out of Stock

#### Get Low Stock Products
```http
GET /api/farm-products/products/low-stock
```

#### Get Out of Stock Products
```http
GET /api/farm-products/products/out-of-stock
```

### Products by Category
```http
GET /api/farm-products/products/category/:category
```

## Product Categories

- `HERBS SPICES` - Herbs & Spices
- `GRAINS CEREALS` - Grains & Cereals
- `FRUITS FRESH` - Fresh Fruits
- `FRUITS DRIED` - Dried Fruits
- `VEGETABLES` - Vegetables
- `NUTS SEEDS` - Nuts & Seeds
- `OILS FATS` - Oils & Fats
- `PROTEINS MEAT` - Meat Products
- `PROTEINS FISH` - Fish Products
- `DAIRY PRODUCTS` - Dairy
- `BEVERAGES` - Beverages
- `PROCESSED FOODS` - Processed Foods
- `OTHER` - Other

## Usage Workflows

### Adding a New Product

1. Navigate to `/admin/farm-products`
2. Click "Add New Product"
3. Fill in product details:
   - SKU (e.g., FP-HER-GAR-045)
   - Name
   - Category
   - Prices (retail/bulk)
   - Units
   - Initial stock
4. Save product
5. Navigate to product edit page
6. Upload product images
7. Set primary image
8. Product is now live!

### Updating Stock (New Shipment)

1. Navigate to product edit page
2. Scroll to "Stock Management" section
3. Select "Add Stock (New Shipment)"
4. Enter quantity received (e.g., 500 kg)
5. Add notes: "Shipment from ABC Farms - Invoice #123"
6. Click "Update Stock"
7. Stock automatically updates and status changes if needed

### Editing Product Photos

1. Navigate to product edit page
2. View current images
3. To add new images:
   - Click "Choose Files"
   - Select up to 10 images
   - Click "Upload Images"
4. To set primary image:
   - Hover over desired image
   - Click "Set as Primary"
5. To delete image:
   - Hover over image
   - Click "Delete"

### Managing Product Status

**Active Products:**
- Available for sale
- Visible to customers
- Included in inventory

**Inactive Products:**
- Temporarily unavailable
- Not visible to customers
- Preserved in database

**Seasonal Products:**
- Only available during certain seasons
- Can be activated/deactivated seasonally

**Discontinued Products:**
- No longer sold
- Kept for historical records

## Automatic Stock Status

The system automatically updates `stockStatus` based on `currentStock`:

| Condition | Status |
|-----------|--------|
| `currentStock === 0` | OUT OF STOCK |
| `currentStock <= minimumStock` | LOW STOCK |
| `currentStock > minimumStock` | IN STOCK |

This happens automatically on every stock update via the model's `beforeSave` hook.

## Database Schema

```sql
CREATE TABLE farm_products (
  id UUID PRIMARY KEY,
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category ENUM(...) NOT NULL,
  subcategory VARCHAR(255),

  -- Pricing
  retail_price DECIMAL(10,2) NOT NULL,
  bulk_price DECIMAL(10,2),
  wholesale_price DECIMAL(10,2),
  currency VARCHAR DEFAULT 'XAF',

  -- Units
  retail_unit VARCHAR NOT NULL DEFAULT 'kg',
  bulk_unit VARCHAR,
  bulk_quantity DECIMAL(10,2),

  -- Stock
  current_stock DECIMAL(10,2) DEFAULT 0,
  minimum_stock DECIMAL(10,2) DEFAULT 0,
  maximum_stock DECIMAL(10,2),
  reorder_quantity DECIMAL(10,2) DEFAULT 0,

  -- Images
  images TEXT[],
  primary_image TEXT,

  -- Details
  origin VARCHAR,
  farm_source VARCHAR,
  harvest_season VARCHAR,
  shelf_life INTEGER,
  storage_conditions VARCHAR,
  certifications VARCHAR[],
  nutritional_info JSONB,

  -- Status
  status ENUM('ACTIVE', 'INACTIVE', 'SEASONAL', 'DISCONTINUED'),
  stock_status ENUM('IN STOCK', 'LOW STOCK', 'OUT OF STOCK', 'BACKORDERED'),

  -- Metadata
  tags VARCHAR[],
  notes TEXT,
  last_restocked TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Frontend Components

### ProductsListPage
**Path:** `client/src/pages/admin/farmProducts/ProductsListPage.jsx`

**Features:**
- Product list view with images
- Filtering by category/status/stock level
- Search functionality
- View and Delete actions
- Stock status badges
- Responsive grid layout

### ProductEditPage
**Path:** `client/src/pages/admin/farmProducts/ProductEditPage.jsx`

**Features:**
- Product details form
- Image upload with drag-and-drop
- Stock management panel
- Primary image selection
- Stock operation history
- Real-time stock preview

## File Upload Configuration

### Supported File Types
- Images: JPG, JPEG, PNG, GIF, WebP
- Maximum file size: 10MB per image
- Maximum images per upload: 10

### Storage Location
- Files stored in: `/uploads/photos/`
- File naming: `productname-timestamp-random.ext`
- URLs saved as: `/uploads/photos/filename.ext`

## Example: Creating Sample Products

```javascript
// Fresh Garlic
POST /api/farm-products/products
{
  "sku": "FP-HER-GAR-045",
  "name": "Fresh Garlic",
  "category": "HERBS SPICES",
  "retailPrice": 5500,
  "retailUnit": "kg",
  "currentStock": 0,
  "minimumStock": 50,
  "status": "ACTIVE"
}

// African Rice
POST /api/farm-products/products
{
  "sku": "FP-GRA-RIC-029",
  "name": "African Rice",
  "category": "GRAINS CEREALS",
  "retailPrice": 2000,
  "retailUnit": "kg",
  "bulkPrice": 42000,
  "bulkUnit": "bag",
  "bulkQuantity": 50,
  "currentStock": 0,
  "minimumStock": 200,
  "status": "ACTIVE"
}

// Yellow Maize
POST /api/farm-products/products
{
  "sku": "FP-GRA-MAI-028",
  "name": "Yellow Maize (Corn)",
  "category": "GRAINS CEREALS",
  "retailPrice": 1600,
  "retailUnit": "kg",
  "bulkPrice": 28000,
  "bulkUnit": "bag",
  "bulkQuantity": 50,
  "currentStock": 0,
  "minimumStock": 150,
  "status": "ACTIVE"
}
```

## Security Features

1. **Authentication Required** - All routes require valid auth token
2. **File Validation** - Only allowed file types accepted
3. **File Size Limits** - 10MB max per file
4. **Unique SKUs** - Prevents duplicate product codes
5. **Automatic Data Cleanup** - Deletes images when product deleted

## Troubleshooting

### Issue: Images not uploading

**Solution:**
- Check that `/uploads/photos/` directory exists and is writable
- Verify file size is under 10MB
- Ensure file type is an image (jpg, png, etc.)
- Check multer configuration in `middleware/upload.js`

### Issue: Stock status not updating

**Solution:**
- Stock status updates automatically via model hook
- If not updating, check that `beforeSave` hook is registered
- Verify `currentStock` and `minimumStock` values are numbers

### Issue: Product not appearing in list

**Solution:**
- Check product `status` is set to `ACTIVE`
- Verify filters are not hiding the product
- Clear all filters and search again

## Future Enhancements

- [ ] Batch import products from CSV/Excel
- [ ] Product variations (sizes, colors, etc.)
- [ ] Stock movement history/audit trail
- [ ] Supplier management integration
- [ ] Purchase order system
- [ ] Barcode generation and scanning
- [ ] Product analytics and sales reports
- [ ] Price history tracking
- [ ] Automatic reorder suggestions
- [ ] Product expiration tracking
- [ ] Quality control workflows

---

**Created:** October 2026
**Last Updated:** October 2026
**Version:** 1.0
**Platform:** SuberFoods Distribution/Processing/Farming
