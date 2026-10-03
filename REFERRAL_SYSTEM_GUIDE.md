# Referral System with File Upload

## Overview

This referral system allows users to refer others and earn commissions. The system includes:
- Direct file upload for ID verification (no external image hosts needed)
- Referral code generation
- Commission tracking
- Admin verification workflow

## Features

### User Features
1. **File Upload Verification** - Upload ID card and photo directly (no URL required)
2. **Unique Referral Codes** - Each user gets a unique referral code
3. **Track Referrals** - See who you've referred
4. **Commission Dashboard** - View total and available commissions
5. **Verification Status** - Track your verification status in real-time

### Admin Features
1. **Verification Management** - Approve/reject user verifications
2. **Commission Management** - Add/subtract commission amounts
3. **View All Referrals** - See all users in the referral program

## Installation & Setup

### 1. Database Migration

Run the migration to create the referrals table:

```bash
node migrations/create_referrals_table.js
```

Expected output:
```
🔌 Connecting to database...
✅ Database connected
📝 Creating referrals table...
✅ Referrals table created/updated successfully!
```

### 2. Backend Routes

The following API endpoints are available at `/api/referrals`:

**User Routes:**
- `GET /my-referral` - Get referral info for logged-in user
- `POST /submit-verification` - Submit verification with file uploads

**Admin Routes:**
- `GET /admin/all` - Get all referrals
- `GET /admin/pending` - Get pending verifications
- `PATCH /admin/:referralId/approve` - Approve verification
- `PATCH /admin/:referralId/reject` - Reject verification
- `PATCH /admin/:referralId/commission` - Update commission

### 3. Frontend Integration

Import the ReferralDashboard component in your app:

```javascript
import ReferralDashboard from './components/referral/ReferralDashboard';

// Use in a route
<Route path="/referrals" element={<ReferralDashboard />} />
```

## Usage

### For Users

#### Step 1: Submit Verification

1. Navigate to the referrals page
2. Click "Submit Verification"
3. Upload your ID card image (JPG, PNG, etc.)
4. Upload your photo
5. Enter your phone number
6. Click "Submit"

**Important:** Files are uploaded directly - no need to host them elsewhere!

#### Step 2: Wait for Approval

- Status changes to "PENDING REVIEW"
- Admin will review your documents
- You'll be notified when approved

#### Step 3: Share Your Link

Once approved:
1. Copy your unique referral link
2. Share with friends/family
3. Earn commissions when they sign up

### For Admins

#### Approve/Reject Verifications

```javascript
// Approve
PATCH /api/referrals/admin/:referralId/approve

// Reject
PATCH /api/referrals/admin/:referralId/reject
Body: { "reason": "Invalid ID card" }
```

#### Add Commission

```javascript
PATCH /api/referrals/admin/:referralId/commission
Body: {
  "amount": 5000,
  "type": "add"
}
```

## File Upload Configuration

### Supported File Types
- **ID Card:** Images (JPG, PNG, etc.)
- **Photo:** Images (JPG, PNG, etc.)

### File Size Limit
- Maximum: 10MB per file

### Storage Location
- Files are stored in `/uploads/documents/` (ID cards)
- Files are stored in `/uploads/photos/` (photos)

## Database Schema

```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY,
  userId UUID REFERENCES users(id) ON DELETE CASCADE,
  referrerId UUID REFERENCES users(id) ON DELETE SET NULL,
  referralCode VARCHAR(20) UNIQUE NOT NULL,
  verificationStatus ENUM('not_submitted', 'pending', 'approved', 'rejected'),
  idCardUrl VARCHAR(255),
  photoUrl VARCHAR(255),
  phoneNumber VARCHAR(20),
  totalReferrals INTEGER DEFAULT 0,
  activeReferrals INTEGER DEFAULT 0,
  totalCommission DECIMAL(10,2) DEFAULT 0.00,
  availableCommission DECIMAL(10,2) DEFAULT 0.00,
  submittedAt TIMESTAMP,
  verifiedAt TIMESTAMP,
  rejectionReason TEXT,
  notes TEXT,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

## API Examples

### Submit Verification with File Upload

```javascript
const formData = new FormData();
formData.append('idCard', idCardFile);
formData.append('photo', photoFile);
formData.append('phoneNumber', '671234567');

const response = await axios.post(
  '/api/referrals/submit-verification',
  formData,
  {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }
);
```

### Get My Referral Info

```javascript
const response = await axios.get('/api/referrals/my-referral', {
  headers: { Authorization: token }
});

// Response:
{
  success: true,
  data: {
    referral: {
      id: "uuid",
      referralCode: "ABC12345",
      verificationStatus: "approved",
      totalReferrals: 5,
      totalCommission: 25000.00,
      ...
    },
    referrals: [
      {
        id: "uuid",
        User: {
          fullname: "John Doe",
          email: "john@example.com"
        }
      }
    ]
  }
}
```

## Commission Calculation Example

```javascript
// When a referred user makes a purchase of 10,000 XAF
// Commission rate: 10%

const purchaseAmount = 10000;
const commissionRate = 0.10;
const commission = purchaseAmount * commissionRate; // 1000 XAF

// Admin adds commission
PATCH /api/referrals/admin/:referralId/commission
Body: {
  "amount": 1000,
  "type": "add"
}
```

## Verification Statuses

| Status | Description | User Action |
|--------|-------------|-------------|
| `not_submitted` | User hasn't submitted documents | Submit verification |
| `pending` | Documents submitted, awaiting review | Wait for admin approval |
| `approved` | Verified and can earn commissions | Share referral link |
| `rejected` | Documents rejected | Resubmit with correct documents |

## Security Features

1. **File Validation** - Only images up to 10MB accepted
2. **Authentication Required** - All routes require auth token
3. **Unique Referral Codes** - Prevents duplicate codes
4. **Admin-Only Actions** - Verification approval restricted to admins

## Troubleshooting

### Issue: "No file uploaded" error

**Solution:** Ensure you're using `multipart/form-data` content type:
```javascript
headers: {
  'Content-Type': 'multipart/form-data'
}
```

### Issue: "File too large" error

**Solution:** Reduce file size to under 10MB or compress images.

### Issue: Referral code not generated

**Solution:** Referral codes are auto-generated on first access to `/my-referral` endpoint.

## Future Enhancements

- [ ] Email notifications for verification status
- [ ] Commission withdrawal system
- [ ] Referral analytics dashboard
- [ ] Multi-level referral system
- [ ] Automated commission calculation
- [ ] SMS verification for phone numbers
- [ ] Referral leaderboard

## Support

For questions or issues:
1. Check the troubleshooting section
2. Review API examples
3. Contact system administrator

---

**Created:** October 2026
**Last Updated:** October 2026
**Version:** 1.0
