# Wishlist Feature for Unauthenticated Users

## Overview
This feature allows users to add products to their wishlist without being authenticated. The wishlist data is stored locally in the browser and can be synced to the database when the user logs in.

## Features

### For Unauthenticated Users
- ✅ Add/remove products to wishlist
- ✅ View wishlist count in navigation
- ✅ Access wishlist page
- ✅ Wishlist persists across browser sessions (localStorage)
- ✅ Automatic sync to Supabase when logging in

### For Authenticated Users
- ✅ All existing Supabase wishlist functionality
- ✅ Local wishlist items are automatically synced upon login
- ✅ No duplicate items are created during sync

## Implementation Details

### 1. Wishlist Store (`src/store/wishlist.store.ts`)
- Uses Zustand with persist middleware for localStorage
- Stores array of product IDs
- Provides functions: `addToWishlist`, `removeFromWishlist`, `isInWishlist`, `clearWishlist`, `getWishlistCount`

### 2. Updated WishlistButton Component
- Detects authentication status
- Uses local store for unauthenticated users
- Uses Supabase for authenticated users
- Seamless transition between both systems

### 3. Wishlist Page
- Shows local wishlist for unauthenticated users
- Shows Supabase wishlist for authenticated users
- Uses `WishlistClient` component for client-side rendering

### 4. Navigation Updates
- Added wishlist icon with count badge
- Shows count for both authenticated and unauthenticated users
- Automatic sync when user logs in

### 5. Sync Functionality
- `syncLocalWishlistToSupabase()` function handles migration
- Prevents duplicate items
- Clears local wishlist after successful sync

## Usage

### Adding to Wishlist
```jsx
// Works for both authenticated and unauthenticated users
<WishlistButton id={product.id} size={30} />
```

### Checking Wishlist Status
```jsx
const { isInWishlist } = useWishlistStore();
const isWishlisted = isInWishlist(productId);
```

### Getting Wishlist Count
```jsx
const { getWishlistCount } = useWishlistStore();
const count = getWishlistCount();
```

## Data Flow

1. **Unauthenticated User**: 
   - Adds item → Local store → localStorage
   - Views wishlist → Local store → Fetch products from Supabase

2. **User Logs In**:
   - Local items → Sync to Supabase → Clear local store
   - Future actions → Direct to Supabase

3. **Authenticated User**:
   - All actions → Direct to Supabase
   - No local storage involvement

## Benefits

- **Better UX**: Users can start building wishlist immediately
- **No Friction**: No forced registration to save items
- **Seamless Transition**: Local items preserved when logging in
- **Performance**: Fast local operations for unauthenticated users
- **Consistency**: Same UI/UX for both user types 