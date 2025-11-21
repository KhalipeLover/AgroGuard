# USER CARD LIST - QUICK REFERENCE

## 📋 OVERVIEW

Card-based user list with accordion, search, filter, and sorting for Admin Dashboard.

**Component**: `/components/dashboard/UserCardList.tsx`  
**Status**: ✅ Production Ready

---

## 🚀 USAGE

### **Import**
```tsx
import { UserCardList } from './dashboard';
```

### **Basic Usage**
```tsx
<UserCardList
  users={filteredUsers}
  loading={usersLoading}
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
/>
```

### **Props**

| Prop | Type | Description |
|------|------|-------------|
| `users` | `AdminUser[]` | Array of users to display |
| `loading` | `boolean` | Loading state |
| `searchQuery` | `string` | Current search query |
| `onSearchChange` | `(query: string) => void` | Search callback |

---

## 📊 DATA STRUCTURE

### **AdminUser Interface**

```typescript
interface AdminUser {
  id: string;
  name: string;
  email: string;
  devices: number;
  location: string;
  status: 'active' | 'inactive';
  joinedDate: string;      // ISO date
  lastActive: string;       // ISO date
  phone?: string;
  role?: 'farmer' | 'admin' | 'supervisor';
}
```

### **Example Data**

```typescript
{
  id: '1',
  name: 'Budi Santoso',
  email: 'budi.santoso@petani.id',
  devices: 3,
  location: 'Kabupaten Malang',
  status: 'active',
  joinedDate: '2024-01-15T08:30:00Z',
  lastActive: '2025-11-02T14:23:00Z',
  phone: '+62 812-3456-7890',
  role: 'farmer'
}
```

---

## 🎨 FEATURES

### **1. Search**
- Real-time search
- Searches: name, email, location
- Case-insensitive
- Shows result count

### **2. Filter**
- **All** - Show all users
- **Active** - Active users only
- **Inactive** - Inactive users only

### **3. Sort**
- **Newest** - By join date (desc) ⭐ Default
- **Oldest** - By join date (asc)
- **Name** - Alphabetical (A-Z)
- **Devices** - By device count (desc)

### **4. Accordion Cards**
- Click to expand/collapse
- One card open at a time
- Smooth animations
- Shows detailed info when expanded

---

## 🎯 CARD LAYOUT

### **Header (Collapsed)**
```
[Avatar] Name [Role Badge]
         Email
         Location (desktop only)
         
         [Devices Badge] [Status Badge]
```

### **Content (Expanded)**
```
Divider
├── Email           ├── Joined Date
├── Phone           ├── Last Active
└── Location        └── Total Devices

Divider
[View Profile] [Manage Devices]
```

---

## 💻 CODE EXAMPLES

### **Complete Integration**

```tsx
import { useState, useEffect } from 'react';
import { UserCardList } from './dashboard';
import { fetchAdminUsers, type AdminUser } from '../data';

function AdminDashboard() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAdminUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  // Filter by search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <UserCardList
      users={filteredUsers}
      loading={loading}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );
}
```

### **Custom Styling**

The component uses these utility classes:
```css
glass-card dark:glass-card-dark
border-2 border-white/30 dark:border-white/10
shadow-xl
hover:shadow-lg
transition-all duration-300
```

---

## 🎨 VISUAL ELEMENTS

### **Avatar**
- Gradient circle: `from-[#3B945E] to-[#0077B6]`
- Shows first letter of name
- 48px × 48px

### **Role Badges**
```tsx
{user.role === 'admin' && (
  <Badge className="bg-purple-50 dark:bg-purple-950/30 
    text-purple-700 dark:text-purple-300">
    <Shield className="w-3 h-3 mr-1" />
    Admin
  </Badge>
)}
```

### **Status Badges**
```tsx
// Active
<Badge className="bg-green-500 text-white glow-accent">
  <CheckCircle className="w-3 h-3 mr-1" />
  Active
</Badge>

// Inactive  
<Badge className="bg-gray-500 text-white">
  <XCircle className="w-3 h-3 mr-1" />
  Inactive
</Badge>
```

### **Device Badge**
```tsx
<Badge className="bg-blue-50 dark:bg-blue-950/30 
  text-blue-700 dark:text-blue-300">
  {user.devices} devices
</Badge>
```

---

## 📱 RESPONSIVE BEHAVIOR

### **Mobile (< 640px)**
- Search, filter, sort stack vertically
- Location hidden in card header
- Detail grid: 1 column
- Buttons: Full width

### **Desktop (≥ 640px)**
- Horizontal controls
- Location visible
- Detail grid: 2 columns  
- Buttons: Side by side

---

## ⚡ PERFORMANCE

### **Efficient Filtering**
```typescript
// 1. Search (from parent)
const filteredUsers = users.filter(/* search */);

// 2. Status (in component)
const filtered = filteredUsers.filter(user => 
  filterStatus === 'all' || user.status === filterStatus
);

// 3. Sort (in component)
const sorted = [...filtered].sort(/* sort logic */);
```

### **Date Formatting**
```typescript
// Standard date
formatDate('2024-01-15T08:30:00Z')
// → "15 Jan 2024"

// Relative time
formatRelativeTime('2025-11-02T14:23:00Z')
// → "23 menit lalu"
// → "5 jam lalu"
// → "3 hari lalu"
```

---

## 🔍 STATES

### **Loading**
Shows 5 skeleton cards matching the layout.

### **Empty**
Shows icon + message:
- With search: "Tidak ditemukan pengguna yang cocok"
- No data: "Belum ada pengguna terdaftar"

### **Loaded**
Shows filteredand sorted user cards with accordion.

---

## 🎯 KEY INTERACTIONS

### **Search**
1. User types in search box
2. Results update immediately
3. Counter shows X of Y users
4. Empty state if no match

### **Filter**
1. User selects status (All/Active/Inactive)
2. List updates immediately
3. Counter updates
4. Maintains search query

### **Sort**
1. User selects sort option
2. List reorders immediately
3. Maintains search and filter
4. Default: Newest first

### **Accordion**
1. User clicks card
2. Card expands with smooth animation
3. Other cards collapse
4. Can close by clicking again

---

## 🎨 ICON MAPPING

| Field | Icon | Color |
|-------|------|-------|
| Email | `Mail` | Green |
| Phone | `Smartphone` | Blue |
| Location | `MapPin` | Yellow |
| Joined | `Calendar` | Green |
| Last Active | `Clock` | Blue |
| Devices | `Smartphone` | Yellow |

---

## ✅ QUICK CHECKLIST

**Implementation**:
- [ ] Import UserCardList
- [ ] Pass users array
- [ ] Handle loading state
- [ ] Manage search query
- [ ] Ensure data has new fields (joinedDate, lastActive, phone, role)

**Data**:
- [ ] All users have joinedDate
- [ ] All users have lastActive
- [ ] Phone numbers formatted
- [ ] Roles assigned

**Testing**:
- [ ] Search works
- [ ] Filter works
- [ ] Sort works
- [ ] Accordion expands
- [ ] Loading shows
- [ ] Empty state shows
- [ ] Responsive on mobile

---

## 🚀 QUICK START

1. **Import Component**
   ```tsx
   import { UserCardList } from './dashboard';
   ```

2. **Prepare Data**
   ```tsx
   const [users, setUsers] = useState<AdminUser[]>([]);
   const [loading, setLoading] = useState(true);
   const [searchQuery, setSearchQuery] = useState('');
   ```

3. **Fetch Users**
   ```tsx
   useEffect(() => {
     fetchAdminUsers()
       .then(setUsers)
       .finally(() => setLoading(false));
   }, []);
   ```

4. **Filter by Search**
   ```tsx
   const filteredUsers = users.filter(user =>
     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
     user.location.toLowerCase().includes(searchQuery.toLowerCase())
   );
   ```

5. **Render Component**
   ```tsx
   <UserCardList
     users={filteredUsers}
     loading={loading}
     searchQuery={searchQuery}
     onSearchChange={setSearchQuery}
   />
   ```

Done! 🎉

---

## 📚 FILES

### **Component**
- `/components/dashboard/UserCardList.tsx`

### **Data**
- `/data/demo-admin-users.ts`

### **Documentation**
- `/documentation/USER_CARD_LIST_IMPLEMENTATION.md` (Full guide)
- `/documentation/USER_CARD_LIST_QUICK_REFERENCE.md` (This file)

### **Export**
- `/components/dashboard/index.ts` (exports UserCardList)

---

## 💡 TIPS

### **Performance**
- Search filtering in parent component
- Status/sort filtering in UserCardList
- Creates new array for sorting (immutable)
- No unnecessary re-renders

### **Accessibility**
- Keyboard navigation works
- Screen reader friendly
- Focus indicators visible
- Semantic HTML

### **Customization**
- Modify colors in avatar gradient
- Change badge styles
- Adjust card spacing
- Customize icons

---

**Version**: 1.0.0  
**Last Updated**: November 2, 2025  
**Status**: ✅ Production Ready
