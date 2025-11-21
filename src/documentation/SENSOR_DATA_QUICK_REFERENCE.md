# Sensor Data Quick Reference

**Quick lookup guide for all sensor data in AGROGUARD IoT**

---

## 📊 **ALL SENSORS OVERVIEW**

### **SensorData Interface:**
```typescript
interface SensorData {
  temperature: number;      // °C
  humidity: number;         // %
  soilMoisture: number;     // %
  lightIntensity: number;   // %
  timestamp?: Date;
}
```

---

## 🌡️ **1. TEMPERATURE (Suhu)**

**Property:** `temperature`  
**Unit:** °C (Celsius)  
**Range:** 15-40°C (demo)  
**Typical:** 28.5°C  
**Icon:** 🌡️ `Thermometer`  
**Color:** Red (`#ef4444`)

**Where Used:**
- ✅ User Dashboard - Real-time card
- ✅ Statistics Tab - Line chart
- ✅ Device tab - Quick stats

**Update:** Every 5 seconds  
**Variation:** ±1°C per update

---

## 💧 **2. HUMIDITY (Kelembapan Udara)**

**Property:** `humidity`  
**Unit:** % (Percentage)  
**Range:** 40-90%  
**Typical:** 65%  
**Icon:** 💧 `Droplets`  
**Color:** Blue (`#3b82f6`)

**Where Used:**
- ✅ User Dashboard - Real-time card
- ✅ Statistics Tab - Line chart
- ✅ Device tab - Quick stats

**Update:** Every 5 seconds  
**Variation:** ±1.5% per update

---

## 🌱 **3. SOIL MOISTURE (Kelembapan Tanah)**

**Property:** `soilMoisture`  
**Unit:** % (Percentage)  
**Range:** 20-80%  
**Typical:** 42%  
**Icon:** 🌱 `Sprout`  
**Color:** Green (`#10b981`)

**Where Used:**
- ✅ User Dashboard - Real-time card
- ✅ Statistics Tab - Line chart
- ✅ Device tab - Quick stats

**Update:** Every 5 seconds  
**Variation:** ±2% per update

---

## ☀️ **4. LIGHT INTENSITY (Intensitas Cahaya)**

**Property:** `lightIntensity`  
**Unit:** % (Percentage)  
**Range:** 50-100% (active), 10-20% (night)  
**Typical:** 78%  
**Icon:** ☀️ `Sun`  
**Color:** Yellow/Orange (`#f59e0b`)

**Where Used:**
- ✅ User Dashboard - Real-time card
- ✅ Statistics Tab - Line chart (day/night cycle)
- ✅ Landing Page - FAQ mention
- ✅ Features - Feature description

**Update:** Every 5 seconds  
**Variation:** ±2.5% per update

**Special Feature:** Day/night cycle in charts
- **Day (6AM-6PM):** 70-90%
- **Night (6PM-6AM):** 10-20%

---

## 📍 **WHERE TO FIND EACH SENSOR**

### **User Dashboard:**
```
┌─────────────────────────────────────────┐
│  Device Tab (Main)                      │
│                                         │
│  ┌──────────┐ ┌──────────┐            │
│  │ 🌡️ 28.5°C │ │ 💧 65%   │            │
│  │ Suhu     │ │ Humidity │            │
│  └──────────┘ └──────────┘            │
│                                         │
│  ┌──────────┐ ┌──────────┐            │
│  │ 🌱 42%   │ │ ☀️ 78%   │            │
│  │ Soil     │ │ Light    │            │
│  └──────────┘ └──────────┘            │
│                                         │
└─────────────────────────────────────────┘
```

### **Statistics Tab:**
```
┌─────────────────────────────────────────┐
│  24-Hour Sensor Chart                   │
│                                         │
│  100│     ╱─╲    ☀️ Light (orange)     │
│     │    ╱   ╲                          │
│   80│  ╱╱     ╲╲  🌡️ Temp (red)        │
│     │ ╱         ╲                       │
│   60│╱           ╲ 💧 Humidity (blue)  │
│     │             ╲╲                    │
│   40│               ╲ 🌱 Soil (green)  │
│     │                ╲                  │
│   20│                 ╲                 │
│     └─────────────────────────────      │
│     0  6  12  18  24 (hours)           │
└─────────────────────────────────────────┘
```

---

## 🎨 **COLOR CODING**

| Sensor | Color | Hex Code | Lucide Icon |
|--------|-------|----------|-------------|
| **Temperature** | Red | `#ef4444` | `Thermometer` |
| **Humidity** | Blue | `#3b82f6` | `Droplets` |
| **Soil Moisture** | Green | `#10b981` | `Sprout` |
| **Light Intensity** | Orange | `#f59e0b` | `Sun` |

---

## 📁 **DATA FILE**

**Location:** `/data/demo-user-sensors.ts`

**Exports:**
- `SensorData` interface
- `initialSensorData` - Initial values
- `fetchSensorData()` - Async fetch function
- `generateUpdatedSensorData()` - Real-time updates

**Usage:**
```typescript
import { 
  fetchSensorData, 
  generateUpdatedSensorData,
  type SensorData 
} from '../data';

// Load initial data
const data = await fetchSensorData();

// Generate updates
const updated = generateUpdatedSensorData(currentData);
```

---

## 🔄 **UPDATE MECHANISM**

### **Real-Time Updates (User Dashboard):**
```typescript
useEffect(() => {
  // Update every 5 seconds
  const interval = setInterval(() => {
    setSensorData(prev => generateUpdatedSensorData(prev));
  }, 5000);
  
  return () => clearInterval(interval);
}, []);
```

### **Variation Bounds:**
```typescript
generateUpdatedSensorData(prev: SensorData): SensorData {
  return {
    temperature: prev.temperature + (random ± 1°C),
    humidity: prev.humidity + (random ± 1.5%),
    soilMoisture: prev.soilMoisture + (random ± 2%),
    lightIntensity: prev.lightIntensity + (random ± 2.5%),
    timestamp: new Date()
  };
}
```

---

## 📊 **SENSOR STATUS INTERPRETATION**

### **Temperature:**
| Range | Status | Action |
|-------|--------|--------|
| **< 15°C** | Sangat Dingin | Tambah pemanas |
| **15-20°C** | Dingin | Monitor |
| **20-30°C** | **Optimal** | Pertahankan |
| **30-35°C** | Hangat | Tingkatkan ventilasi |
| **> 35°C** | Panas | Tambah pendingin |

### **Humidity:**
| Range | Status | Action |
|-------|--------|--------|
| **< 40%** | Kering | Tambah humidifier |
| **40-50%** | Rendah | Monitor |
| **50-70%** | **Optimal** | Pertahankan |
| **70-80%** | Tinggi | Monitor |
| **> 80%** | Lembap | Tambah dehumidifier |

### **Soil Moisture:**
| Range | Status | Action |
|-------|--------|--------|
| **< 20%** | Kering | Siram segera |
| **20-30%** | Rendah | Siram |
| **30-60%** | **Optimal** | Pertahankan |
| **60-70%** | Lembap | Monitor |
| **> 70%** | Basah | Kurangi penyiraman |

### **Light Intensity:**
| Range | Status | Action |
|-------|--------|--------|
| **< 30%** | Gelap | Tambah cahaya |
| **30-50%** | Redup | Monitor |
| **50-70%** | Cukup | Pertahankan |
| **70-90%** | **Optimal** | Pertahankan |
| **> 90%** | Sangat Terang | Monitor suhu |

---

## 🎯 **QUICK LOOKUP**

### **Need Temperature Data?**
→ `/data/demo-user-sensors.ts` → `SensorData.temperature`

### **Need Humidity Data?**
→ `/data/demo-user-sensors.ts` → `SensorData.humidity`

### **Need Soil Moisture Data?**
→ `/data/demo-user-sensors.ts` → `SensorData.soilMoisture`

### **Need Light Intensity Data?**
→ `/data/demo-user-sensors.ts` → `SensorData.lightIntensity`

### **Need Real-Time Updates?**
→ `generateUpdatedSensorData(prevData)`

### **Need Historical Chart?**
→ `SensorChart.tsx` → `generateChartData()`

---

## 🔍 **SEARCH KEYWORDS**

**Temperature:**
- "suhu", "temperature", "thermometer", "°C", "celsius"

**Humidity:**
- "kelembapan udara", "humidity", "droplets", "%", "moisture"

**Soil Moisture:**
- "kelembapan tanah", "soil moisture", "sprout", "tanah"

**Light Intensity:**
- "intensitas cahaya", "light intensity", "sun", "lux", "cahaya"

---

## 📈 **RELATED DOCUMENTATION**

- **Full Light Intensity Mapping:** `/documentation/LIGHT_INTENSITY_DATA_MAPPING.md`
- **Data Structure Guide:** `/documentation/DATA_STRUCTURE.md`
- **User Dashboard Guide:** `/documentation/DASHBOARD_MIGRATION_COMPLETE.md`

---

## ✅ **CHECKLIST FOR ADDING NEW SENSOR**

When adding a new sensor to the system:

- [ ] Add property to `SensorData` interface
- [ ] Update `initialSensorData` with default value
- [ ] Add update logic in `generateUpdatedSensorData()`
- [ ] Create card in UserDashboardContent
- [ ] Add line to SensorChart
- [ ] Choose appropriate icon and color
- [ ] Add status interpretation guide
- [ ] Update this documentation
- [ ] Test real-time updates
- [ ] Test chart visualization

---

**Last Updated:** October 26, 2025  
**Sensors:** 4 (Temperature, Humidity, Soil Moisture, Light Intensity)  
**Status:** ✅ All sensors documented and mapped  
**Quick Ref:** Use this guide for rapid sensor data lookup
