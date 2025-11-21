# 50 UNIQUE LOCATIONS & 100 DEVICES - IMPLEMENTATION PLAN

## 🎯 OBJECTIVES

1. ✅ **50 Users** with **50 Unique Locations** (Kecamatan level in Jawa Timur)
2. ⏳ **100 Devices** total distributed across 50 users
3. ⏳ **Device Card List** component (like UserCardList with accordion & infinite scroll)
4. ⏳ Connect users to devices properly

---

## ✅ STEP 1: 50 UNIQUE LOCATIONS (COMPLETE)

### **Implementation**

Updated `/data/demo-admin-users.ts` with:
- 50 users with unique Kecamatan-level locations
- Each user has unique location string format: `Kec. [Name], Kab. [Kabupaten]`
- Total devices distributed: 100 (across all users)

### **Device Distribution**

```typescript
// Devices per user (total = 100)
1 device  = 14 users (14 devices)
2 devices = 24 users (48 devices)
3 devices = 12 users (36 devices)
TOTAL     = 50 users (98 devices) ← Need 2 more
```

**Adjusted**:
- 1 device  = 12 users (12 devices)
- 2 devices = 26 users (52 devices)
- 3 devices = 12 users (36 devices)
- **TOTAL   = 50 users (100 devices)** ✅

### **Sample Unique Locations**

| User ID | Name | Location |
|---------|------|----------|
| 1 | Budi Santoso | Kec. Dau, Kab. Malang |
| 2 | Siti Aminah | Kec. Ambulu, Kab. Jember |
| 3 | Ahmad Hidayat | Kec. Wonokromo, Kota Surabaya |
| 4 | Rina Kusuma | Kec. Genteng, Kab. Banyuwangi |
| 5 | Dedi Kurniawan | Kec. Babat, Kab. Lamongan |
| ... | ... | ... (all 50 unique) |

---

## ⏳ STEP 2: 100 DEVICES DATA

### **Device Schema**

```typescript
export interface AdminDevice {
  id: string;              // AGR-XXX-001 format
  deviceId: string;        // Short ID for display
  owner: string;           // User name
  ownerEmail: string;      // User email (for linking)
  location: string;        // Same as user location
  temperature: number;     // 20-35°C
  humidity: number;        // 40-90%
  soilMoisture: number;    // 20-80%
  status: 'online' | 'offline' | 'warning';
  lastSync: string;        // ISO date string
  installDate: string;     // ISO date string
  latitude: number;        // GPS coordinate
  longitude: number;       // GPS coordinate
}
```

### **Device Naming Convention**

```
AGR-[LOCATION_CODE]-[NUMBER]

Examples:
- AGR-MLG-001 (Malang #1)
- AGR-JMB-001 (Jember #1)
- AGR-SBY-001 (Surabaya #1)
```

### **Distribution Strategy**

```typescript
// User dengan 1 device (12 users = 12 devices)
User #3, #8, #10, #14, #22, #26, #30, #34, #39, #43, #46, #50

// User dengan 2 devices (26 users = 52 devices)
User #1, #4, #5, #7, #11, #12, #15, #16, #19, #20, #23, #24, 
     #27, #28, #31, #32, #35, #36, #37, #40, #41, #44, #45, #47, #48

// User dengan 3 devices (12 users = 36 devices)
User #2, #6, #9, #13, #17, #21, #25, #29, #33, #38, #42, #49
```

---

## ⏳ STEP 3: DEVICE CARD LIST COMPONENT

### **Component Structure**

```
/components/dashboard/DeviceCardList.tsx
```

**Features** (Same as UserCardList):
- Card-based layout with accordion
- Search (deviceId, owner, location)
- Filter (status: all/online/offline/warning)
- Sort (newest, oldest, owner, status)
- Infinite scroll (10 devices per load)
- Loading skeletons
- Empty states

### **Card Layout**

```tsx
// Card Header (Collapsed)
┌──────────────────────────────────────────┐
│ [🔷] AGR-MLG-001                        │
│      Owner: Budi Santoso                │
│      📍 Kec. Dau, Kab. Malang           │
│                          [●Online] [▼]  │
└──────────────────────────────────────────┘

// Card Content (Expanded)
┌──────────────────────────────────────────┐
│ ─────────── Divider ─────────────────── │
│                                          │
│ ┌─────────────┬──────────────┐          │
│ │ 🌡️ Temp     │ 💧 Humidity  │          │
│ │ 27.5°C      │ 75%          │          │
│ ├─────────────┼──────────────┤          │
│ │ 💧 Soil     │ 📡 Last Sync │          │
│ │ 65%         │ 2 min ago    │          │
│ ├─────────────┼──────────────┤          │
│ │ 📧 Owner    │ 📅 Install   │          │
│ │ budi@...    │ 15 Jan 2024  │          │
│ └─────────────┴──────────────┘          │
│                                          │
│ ─────────── Divider ─────────────────── │
│ [📊 View Details] [⚙️ Settings]         │
└──────────────────────────────────────────┘
```

---

## ⏳ STEP 4: UPDATE ADMINDASHBOARD

### **Devices Tab Update**

**Before**:
```tsx
<TabsContent value="devices">
  <Table>
    {/* Old table view */}
  </Table>
</TabsContent>
```

**After**:
```tsx
<TabsContent value="devices">
  <DeviceCardList
    devices={filteredDevices}
    loading={devicesLoading}
    searchQuery={deviceSearchQuery}
    onSearchChange={setDeviceSearchQuery}
  />
</TabsContent>
```

---

## 📊 DATA SUMMARY

### **Users**

```
Total Users:        50
Active:             46 (92%)
Inactive:           4 (8%)
Unique Locations:   50 (Kecamatan level)
Total Devices:      100
```

### **Devices**

```
Total Devices:      100
Online:             ~85 (85%)
Offline:            ~12 (12%)
Warning:            ~3 (3%)
Per User Average:   2 devices
```

### **Locations Coverage**

```
Kabupaten/Kota:     ~30 different
Kecamatan:          50 unique
Province:           Jawa Timur
```

---

## 🔄 IMPLEMENTATION STEPS

### **Step 1: Users Update** ✅ DONE

- [x] Create 50 unique locations
- [x] Distribute 100 devices across users
- [x] Update user data file
- [x] Maintain existing fields (phone, role, dates)

### **Step 2: Devices Data** ⏳ IN PROGRESS

- [ ] Create 100 device records
- [ ] Link to user owners (by email)
- [ ] Generate realistic sensor data
- [ ] Add GPS coordinates
- [ ] Add install dates and last sync

### **Step 3: DeviceCardList Component** ⏳ PENDING

- [ ] Create component file
- [ ] Implement card layout
- [ ] Add accordion functionality
- [ ] Add search/filter/sort
- [ ] Add infinite scroll (10 per load)
- [ ] Add loading states
- [ ] Add empty states

### **Step 4: Integration** ⏳ PENDING

- [ ] Update AdminDashboard devices tab
- [ ] Test search functionality
- [ ] Test filter functionality
- [ ] Test sort functionality
- [ ] Test infinite scroll
- [ ] Verify data consistency

### **Step 5: Documentation** ⏳ PENDING

- [ ] Update device data documentation
- [ ] Create DeviceCardList documentation
- [ ] Update quick reference guides
- [ ] Add implementation notes

---

## 🎯 EXPECTED RESULTS

### **User List**

```
Menampilkan 10 dari 50 pengguna
[10 user cards with unique locations]
→ Scroll untuk memuat lebih banyak
→ [Loads 10 more]
...continues to 50
```

### **Device List**

```
Menampilkan 10 dari 100 perangkat
[10 device cards from different owners]
→ Scroll untuk memuat lebih banyak
→ [Loads 10 more]
...continues to 100
```

---

## 📝 NOTES

### **Design Consistency**

- DeviceCardList follows same pattern as UserCardList
- Same glassmorphic styling
- Same accordion behavior
- Same infinite scroll implementation
- Same search/filter/sort UI

### **Data Integrity**

- Device owners match user emails
- Device locations match user locations
- Device counts match user.devices field
- Total devices = 100 exactly

### **Performance**

- Lazy loading (10 items per scroll)
- Efficient filtering and sorting
- Intersection Observer for scroll
- Skeleton loaders for better UX

---

**Status**: Step 1 Complete ✅  
**Next**: Implement 100 devices data  
**Last Updated**: November 2, 2025
