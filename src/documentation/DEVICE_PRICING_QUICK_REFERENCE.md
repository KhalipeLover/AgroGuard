# Device Pricing & Recommendation - Quick Reference

## 🚀 Quick Start

### Import & Use
```typescript
import { 
  fetchDeviceRecommendation,
  formatRupiah,
  type DeviceRecommendation 
} from '../data';

// Get recommendation
const recommendation = await fetchDeviceRecommendation(5.5); // 5.5 hectares

console.log(recommendation.jumlahDevice); // 4 devices
console.log(formatRupiah(recommendation.totalDeviceCost)); // Rp 12.000.000
```

## 📊 Device Calculation Logic

### Algorithm
```typescript
if (luasLahan <= 1) {
  jumlahDevice = 1;  // Small plot
} else if (luasLahan <= 5) {
  jumlahDevice = Math.ceil(luasLahan);  // 1 device per hectare
} else if (luasLahan <= 20) {
  jumlahDevice = Math.ceil(luasLahan / 1.5);  // 1 device per 1.5 ha
} else {
  jumlahDevice = Math.ceil(luasLahan / 2);  // 1 device per 2 ha
}
```

### Examples
| Luas Lahan | Devices | Coverage | Package |
|-----------|---------|----------|---------|
| 0.5 ha | 1 | Full | Free |
| 2.0 ha | 2 | Optimal | Starter |
| 5.0 ha | 5 | Optimal | Starter |
| 10.0 ha | 7 | Strategic | Professional |
| 25.0 ha | 13 | Strategic | Professional |

## 💰 Pricing Structure

### Hardware Costs
```typescript
const PRICING = {
  hardwareCostPerDevice: 2500000,      // Rp 2.5M
  installationCostPerDevice: 500000,    // Rp 500K
  totalCostPerDevice: 3000000,          // Rp 3M per device
};
```

### Subscription Packages
```typescript
const packages = [
  {
    name: 'Free',
    maxDevices: 1,
    monthlyPrice: 0,
    features: ['1 Device', 'Real-time monitoring', 'Basic alerts']
  },
  {
    name: 'Starter',
    maxDevices: 5,
    monthlyPrice: 150000,  // Rp 150K/month
    features: ['5 Devices', 'Smart alerts', 'Automation', 'Email support']
  },
  {
    name: 'Professional',
    maxDevices: 20,
    monthlyPrice: 450000,  // Rp 450K/month
    features: ['20 Devices', 'AI analytics', 'API access', '24/7 support']
  },
  {
    name: 'Enterprise',
    maxDevices: 999,
    monthlyPrice: 0,  // Custom pricing
    features: ['Unlimited', 'Full automation', 'White-label', 'SLA']
  }
];
```

## 🔧 Sensors per Device

### Standard Package
```typescript
const sensorsIncluded = [
  {
    name: 'DHT22 Sensor',
    quantity: 1 per device,
    description: 'Temperature & Humidity (±0.5°C accuracy)'
  },
  {
    name: 'Soil Moisture Sensor',
    quantity: 2 per device,
    description: 'Capacitive (0-100% range)'
  },
  {
    name: 'IoT Controller',
    quantity: 1 per device,
    description: 'ESP32 with WiFi'
  },
  {
    name: 'Solar Panel & Battery',
    quantity: 1 per device,
    description: '20W solar + 12V backup'
  },
  {
    name: 'Waterproof Enclosure',
    quantity: 1 per device,
    description: 'IP67 rated'
  }
];
```

### Total per Device
- 1x DHT22
- 2x Soil Moisture
- 1x Controller
- 1x Power System
- 1x Enclosure
= **6 components per device**

## 💡 ROI Calculation

### Savings Calculation
```typescript
// Annual savings per hectare (traditional farming)
const avgWaterCostPerHa = 3000000;      // Rp 3M
const avgFertilizerCostPerHa = 4500000; // Rp 4.5M
const avgLaborCostPerHa = 6000000;      // Rp 6M

// Savings with AGROGUARD
const waterSavings = waterCost * 0.45;      // 45% savings
const fertilizerSavings = fertilizer * 0.30; // 30% savings
const laborSavings = labor * 0.35;          // 35% savings

const totalSavingsPerYear = waterSavings + fertilizerSavings + laborSavings;
```

### Break-Even
```typescript
const breakEvenMonths = Math.ceil(
  initialInvestment / (estimatedSavingsPerYear / 12)
);

// Example: Rp 15M investment / (Rp 6.75M/year ÷ 12) = 27 months
```

## 📱 React Component Usage

### Basic Implementation
```tsx
import { useState, useEffect } from 'react';
import { fetchDeviceRecommendation, formatRupiah } from '../data';

function MyComponent() {
  const [luasLahan, setLuasLahan] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const luas = parseFloat(luasLahan);
    if (luas > 0) {
      setLoading(true);
      fetchDeviceRecommendation(luas)
        .then(setRecommendation)
        .finally(() => setLoading(false));
    }
  }, [luasLahan]);

  if (loading) return <div>Loading...</div>;
  if (!recommendation) return <div>Enter luas lahan</div>;

  return (
    <div>
      <h3>{recommendation.jumlahDevice} Devices Needed</h3>
      <p>Package: {recommendation.recommendedPackage.name}</p>
      <p>Total: {formatRupiah(recommendation.firstYearCost)}</p>
      <p>Break Even: {recommendation.breakEvenMonths} months</p>
    </div>
  );
}
```

### With Full Details
```tsx
{recommendation && (
  <div className="space-y-4">
    {/* Header */}
    <div>
      <h3>Device Recommendation</h3>
      <Badge>{recommendation.recommendedPackage.name}</Badge>
    </div>

    {/* Device Count */}
    <div>
      <span>Jumlah Device:</span>
      <strong>{recommendation.jumlahDevice} Unit</strong>
    </div>

    {/* Pricing */}
    <div>
      <div>Hardware: {formatRupiah(recommendation.totalDeviceCost)}</div>
      <div>Subscription: {formatRupiah(recommendation.monthlySubscription)}/mo</div>
      <div>Total Year 1: {formatRupiah(recommendation.firstYearCost)}</div>
    </div>

    {/* ROI */}
    <div>
      <p>Break Even: <strong>{recommendation.breakEvenMonths} months</strong></p>
      <p>Savings/Year: {formatRupiah(recommendation.estimatedSavingsPerYear)}</p>
    </div>

    {/* Sensors */}
    <details>
      <summary>Sensors Included</summary>
      {recommendation.sensorsIncluded.map(sensor => (
        <div key={sensor.name}>
          <span>{sensor.quantity}x {sensor.name}</span>
          <p>{sensor.description}</p>
        </div>
      ))}
    </details>
  </div>
)}
```

## 🎯 Use Cases

### 1. ROI Calculator Form
```tsx
// Auto-calculate on luas lahan change
useEffect(() => {
  if (luasLahan > 0) {
    fetchDeviceRecommendation(luasLahan).then(setDeviceRecommendation);
  }
}, [luasLahan]);
```

### 2. Device Setup Wizard
```tsx
// Step 1: Input luas lahan
// Step 2: Show device recommendation
// Step 3: Select package
// Step 4: Confirm order
```

### 3. Pricing Page
```tsx
// Display all packages with examples
packages.map(pkg => (
  <PricingCard
    name={pkg.name}
    price={formatRupiah(pkg.monthlyPrice)}
    features={pkg.features}
    maxDevices={pkg.maxDevices}
  />
))
```

### 4. Admin Dashboard
```tsx
// Show device distribution
// Calculate total revenue
// Track break-even progress
```

## 📚 Type Definitions

### DeviceRecommendation
```typescript
interface DeviceRecommendation {
  luasLahan: number;
  jumlahDevice: number;
  reasoning: string;
  coverage: string;
  
  // Costs
  hardwareCostPerDevice: number;
  installationCostPerDevice: number;
  totalDeviceCost: number;
  
  // Subscription
  recommendedPackage: DevicePackage;
  monthlySubscription: number;
  yearlySubscription: number;
  
  // Sensors
  sensorsIncluded: SensorInfo[];
  
  // Investment
  initialInvestment: number;
  firstYearCost: number;
  
  // ROI
  breakEvenMonths: number;
  estimatedSavingsPerYear: number;
}
```

### DevicePackage
```typescript
interface DevicePackage {
  id: string;
  name: string;
  description: string;
  maxDevices: number;
  monthlyPrice: number;
  features: string[];
  recommended: boolean;
}
```

### SensorInfo
```typescript
interface SensorInfo {
  name: string;
  quantity: number;
  description: string;
}
```

## 🔍 Helper Functions

### Format Currency
```typescript
import { formatRupiah } from '../data';

formatRupiah(3000000)  // "Rp 3.000.000"
formatRupiah(150000)   // "Rp 150.000"
```

### Calculate Manually
```typescript
import { calculateDeviceRecommendation } from '../data';

const rec = calculateDeviceRecommendation(7.5);
console.log(rec.jumlahDevice);  // 5 devices
```

### Get All Packages
```typescript
import { devicePackages } from '../data';

devicePackages.forEach(pkg => {
  console.log(`${pkg.name}: ${pkg.maxDevices} devices`);
});
```

## 🐛 Troubleshooting

### Issue: Recommendation not updating
```typescript
// ❌ Wrong - No dependency
useEffect(() => {
  fetchDeviceRecommendation(luasLahan);
}, []);

// ✅ Correct - Include dependency
useEffect(() => {
  if (luasLahan > 0) {
    fetchDeviceRecommendation(parseFloat(luasLahan))
      .then(setRecommendation);
  }
}, [luasLahan]);
```

### Issue: Invalid luas lahan
```typescript
// Add validation
const luas = parseFloat(luasLahan);
if (isNaN(luas) || luas <= 0) {
  setRecommendation(null);
  return;
}
```

### Issue: Loading state not showing
```typescript
// Track loading state
setLoadingDeviceRec(true);
fetchDeviceRecommendation(luas)
  .then(setRecommendation)
  .finally(() => setLoadingDeviceRec(false));
```

## 📊 Example Calculations

### Small Farm (2 ha)
```
Devices: 2
Hardware: Rp 6.000.000
Subscription: Rp 150.000/month (Starter)
Year 1 Total: Rp 7.800.000
Break Even: ~18 months
Annual Savings: ~Rp 5.200.000
```

### Medium Farm (10 ha)
```
Devices: 7
Hardware: Rp 21.000.000
Subscription: Rp 450.000/month (Professional)
Year 1 Total: Rp 26.400.000
Break Even: ~24 months
Annual Savings: ~Rp 13.000.000
```

### Large Farm (30 ha)
```
Devices: 15
Hardware: Rp 45.000.000
Subscription: Custom (Enterprise)
Year 1 Total: Contact sales
Break Even: ~20-24 months
Annual Savings: ~Rp 39.000.000
```

## ✅ Validation Rules

```typescript
// Luas lahan
min: 0.1 ha
max: unlimited
step: 0.1 ha
type: number

// Device count
min: 1
max: calculated
readonly: true  // Auto-calculated

// Package selection
auto: true  // Based on device count
override: false  // Cannot manually select
```

## 🔗 Related Features

- ROI Calculator: Uses device recommendation for cost calculation
- Device Setup: Shows recommendation during setup
- Admin Dashboard: Tracks device distribution
- Pricing Page: Displays package options
- Lead Management: Includes device count in quotes

## 📝 Notes

- Prices in IDR (Indonesian Rupiah)
- Hardware includes installation
- Subscription billed monthly
- Savings based on average traditional farming costs
- Break-even assumes continuous operation
- ROI calculated over 3 years (6 crop seasons)

---

**Last Updated**: November 2, 2025  
**Version**: 1.0.0  
**Maintained by**: AGROGUARD IoT Team
