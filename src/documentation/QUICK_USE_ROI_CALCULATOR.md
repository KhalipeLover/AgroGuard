# Quick Use Guide - ROI Calculator Enhancements

Panduan cepat penggunaan fitur-fitur enhancement ROI Calculator untuk developer dan end-user.

---

## 📖 Table of Contents

- [User Guide](#user-guide)
- [Developer Guide](#developer-guide)
- [Code Examples](#code-examples)
- [Common Use Cases](#common-use-cases)
- [Troubleshooting](#troubleshooting)

---

## User Guide

### How to Use ROI Calculator

#### 1. Input Parameters
```
1. Scroll to "Kalkulator ROI" section on landing page
2. Fill in the form:
   ┌─────────────────────────────────────┐
   │ Lokasi Kabupaten/Kota: [Select]    │
   │ Jenis Tanaman: [Padi ▼]            │
   │ Luas Lahan: [2.5 Ha]               │
   │ Sistem Irigasi: [Manual ▼]         │
   │                                     │
   │ [Hitung ROI]                        │
   └─────────────────────────────────────┘
3. Click "Hitung ROI" button
```

#### 2. View Results
```
Results Panel displays:
┌─────────────────────────────────────┐
│ ROI Summary Card                    │
│ • ROI: 156.32%                      │
│ • Balik Modal: 15.2 bulan           │
├─────────────────────────────────────┤
│ Comparison Cards                    │
│ • Tanpa AGROGUARD vs Dengan         │
├─────────────────────────────────────┤
│ Benefits List                       │
│ ✓ Produktivitas +20%                │
│ ✓ Penghematan Air 30%               │
│ ✓ Penghematan Pupuk 25%             │
│ ✓ Pengurangan Gagal Panen 70%       │
└─────────────────────────────────────┘
```

#### 3. Export to PDF
```
1. Click [PDF] button
2. PDF auto-downloads:
   Filename: AGROGUARD-ROI-Surabaya-1729890234567.pdf
3. Toast notification: "PDF berhasil diunduh!"
```

**PDF Contains**:
- ✅ Header dengan branding AGROGUARD
- ✅ Parameter input lengkap
- ✅ Ringkasan ROI
- ✅ Tabel perbandingan
- ✅ List benefits
- ✅ Footer dengan timestamp

#### 4. Save Calculation
```
1. Click [Save] button
2. Calculation saved to browser
3. Unique ID generated: roi-1729890234567
4. Share dialog opens automatically
5. Toast notification: "Perhitungan berhasil disimpan!"
```

#### 5. Share Results

**Option A: Copy Link**
```
1. Share dialog displays
2. Click copy icon button
3. URL copied to clipboard
4. Toast: "Link berhasil disalin!"
5. Paste link anywhere
```

**Option B: Social Media**
```
WhatsApp Share:
1. Click WhatsApp button
2. WhatsApp opens with pre-filled message:
   "Lihat hasil ROI Calculator AGROGUARD saya: 
    ROI 156.32% dalam 3 tahun!
    https://agroguard.app?calc=roi-123..."
3. Select contact/group
4. Send message

Twitter Share:
1. Click Twitter button
2. Twitter compose opens
3. Edit tweet if needed
4. Post tweet

Facebook Share:
1. Click Facebook button
2. Facebook share dialog opens
3. Add comment if desired
4. Share to timeline
```

#### 6. View Charts
```
Scroll down in results panel to see:

Chart 1: Comparison Bar Chart
┌───────────────────────────────────┐
│ Perbandingan Metrik Utama         │
│                                   │
│ [Bar Chart]                       │
│ • Produksi (ton)                  │
│ • Pendapatan (juta)               │
│ • Biaya Total (juta)              │
│                                   │
│ Legend: ■ Tanpa  ■ Dengan         │
└───────────────────────────────────┘

Chart 2: Savings Pie Chart
┌───────────────────────────────────┐
│ Breakdown Penghematan             │
│                                   │
│      [Pie Chart]                  │
│                                   │
│ • Penghematan Air: 35%            │
│ • Penghematan Pupuk: 30%          │
│ • Pengurangan Gagal Panen: 35%    │
└───────────────────────────────────┘

Hover on bars/slices to see details!
```

---

## Developer Guide

### Installation

No additional setup needed! Dependencies already included:

```json
{
  "dependencies": {
    "jspdf": "latest",
    "jspdf-autotable": "latest",
    "recharts": "latest",
    "sonner@2.0.3": "^2.0.3"
  }
}
```

### Import Component

```typescript
import { ROICalculator } from './components/landing';

// Usage in your page
function LandingPage() {
  return (
    <>
      {/* Other sections */}
      <ROICalculator />
      {/* Other sections */}
    </>
  );
}
```

### Access Saved Calculations

```typescript
// Read from localStorage
const getSavedCalculations = () => {
  try {
    const saved = localStorage.getItem('agroguard-roi-calculations');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error reading calculations:', error);
    return [];
  }
};

// Example usage
const calculations = getSavedCalculations();
console.log(`Total saved: ${calculations.length}`);

// Access specific calculation
calculations.forEach(calc => {
  console.log(`ID: ${calc.id}`);
  console.log(`Timestamp: ${calc.timestamp}`);
  console.log(`Kabupaten: ${calc.inputs.kabupaten}`);
  console.log(`ROI: ${calc.result.roi}%`);
});
```

### Parse Share URL

```typescript
// Get calculation from URL parameters
const getCalculationFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  
  if (params.has('calc')) {
    return {
      id: params.get('calc'),
      kabupaten: params.get('k'),
      tanaman: params.get('t'),
      luas: params.get('l'),
      irigasi: params.get('i')
    };
  }
  
  return null;
};

// Example usage
const urlCalc = getCalculationFromURL();
if (urlCalc) {
  // Pre-fill form with URL parameters
  setSelectedKabupaten(urlCalc.kabupaten);
  setJenisTanaman(urlCalc.tanaman);
  setLuasLahan(urlCalc.luas);
  setSistemIrigasi(urlCalc.irigasi);
  // Trigger calculation
  calculateROI();
}
```

---

## Code Examples

### Custom PDF Export

```typescript
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const exportCustomPDF = (data: CalculationResult) => {
  const doc = new jsPDF();
  
  // Custom header
  doc.setFillColor(59, 148, 94);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('Custom Report', 105, 25, { align: 'center' });
  
  // Add content
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(`ROI: ${data.roi}%`, 20, 60);
  
  // Add table
  autoTable(doc, {
    startY: 80,
    head: [['Metric', 'Value']],
    body: [
      ['ROI', `${data.roi}%`],
      ['Payback', `${data.paybackPeriod} months`]
    ],
    theme: 'grid'
  });
  
  doc.save('custom-report.pdf');
};
```

### Custom Share Function

```typescript
const shareToCustomPlatform = (url: string, text: string) => {
  // LinkedIn
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  window.open(linkedInUrl, '_blank');
  
  // Telegram
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  window.open(telegramUrl, '_blank');
  
  // Email
  const emailUrl = `mailto:?subject=${encodeURIComponent('AGROGUARD ROI Results')}&body=${encodeURIComponent(text + '\n\n' + url)}`;
  window.location.href = emailUrl;
};
```

### Custom Chart Configuration

```typescript
import { BarChart, Bar } from 'recharts';

const CustomChart = ({ data }) => (
  <BarChart data={data} width={500} height={300}>
    <Bar 
      dataKey="value" 
      fill="#3B945E"
      radius={[10, 10, 0, 0]}
      animationDuration={800}
    />
    {/* Customize further */}
  </BarChart>
);
```

---

## Common Use Cases

### Use Case 1: Petani Individual

**Scenario**: Pak Budi ingin tahu berapa keuntungan jika menggunakan AGROGUARD di sawah 3 hektarnya.

**Steps**:
```
1. Buka landing page
2. Scroll ke ROI Calculator
3. Input:
   - Lokasi: Sidoarjo
   - Tanaman: Padi
   - Luas: 3
   - Irigasi: Manual
4. Klik "Hitung ROI"
5. Lihat hasil: ROI 175%, balik modal 13 bulan
6. Klik "PDF" untuk laporan
7. Share ke WhatsApp group petani
```

**Result**: Pak Budi mendapat data konkret untuk pertimbangan investasi.

---

### Use Case 2: Penyuluh Pertanian

**Scenario**: Ibu Siti (penyuluh) ingin presentasi ke kelompok tani tentang manfaat IoT.

**Steps**:
```
1. Buat beberapa simulasi untuk different scenarios:
   - Scenario A: Lahan kecil (0.5 Ha)
   - Scenario B: Lahan sedang (2 Ha)
   - Scenario C: Lahan besar (5 Ha)
2. Save semua hasil
3. Export PDF untuk masing-masing
4. Compile menjadi presentasi
5. Share link ke group WhatsApp kelompok tani
```

**Result**: Data-driven presentation dengan multiple scenarios.

---

### Use Case 3: Investor/Stakeholder

**Scenario**: PT AgriTech ingin evaluate ROI untuk berbagai wilayah.

**Steps**:
```
1. Test calculator untuk 10 kabupaten berbeda
2. Export PDF untuk setiap lokasi
3. Compare ROI across regions
4. Identify high-potential areas
5. Share results ke tim via email/social media
```

**Result**: Regional comparison untuk strategic planning.

---

### Use Case 4: Peneliti/Akademisi

**Scenario**: Mahasiswa penelitian tentang adoption IoT di pertanian.

**Steps**:
```
1. Collect data dari calculator
2. Save calculations untuk berbagai skenario
3. Extract data dari localStorage:
   const data = localStorage.getItem('agroguard-roi-calculations');
   const calculations = JSON.parse(data);
4. Analyze patterns
5. Export charts untuk thesis
```

**Result**: Quantitative data untuk research.

---

## Troubleshooting

### PDF Not Downloading

**Problem**: Klik PDF button tapi tidak download

**Solutions**:
```
1. Check browser permissions
   - Allow downloads in browser settings
   
2. Clear browser cache
   - Ctrl+Shift+Delete
   - Clear cached images and files
   
3. Try different browser
   - Chrome, Firefox, Edge, Safari
   
4. Check console for errors
   - F12 → Console tab
   - Look for jsPDF errors
```

---

### Share Link Not Working

**Problem**: Copy link tapi tidak bisa dibuka

**Solutions**:
```
1. Verify link copied correctly
   - Paste in notepad first
   - Check for complete URL
   
2. Check URL parameters
   - Should have: ?calc=...&k=...&t=...&l=...&i=...
   
3. Try opening in incognito mode
   - Bypass cache issues
   
4. Share via different method
   - Try social media buttons instead
```

---

### Calculation Not Saved

**Problem**: Klik Save tapi tidak tersimpan

**Solutions**:
```
1. Check localStorage availability
   if (typeof(Storage) !== "undefined") {
     console.log("localStorage available");
   }
   
2. Check storage quota
   - Browser might be full
   - Clear some data
   
3. Check browser mode
   - localStorage not available in:
     • Private/Incognito mode
     • Some mobile browsers
   
4. Manual save alternative
   - Export to PDF instead
   - Take screenshot
```

---

### Charts Not Displaying

**Problem**: Grafik tidak muncul atau error

**Solutions**:
```
1. Check data availability
   - Ensure calculation completed
   - Verify result object exists
   
2. Check responsive container
   - Parent must have defined height/width
   
3. Check browser compatibility
   - Recharts needs modern browser
   - Update browser if old
   
4. Check console errors
   - F12 → Console
   - Look for Recharts errors
```

---

### Social Share Not Opening

**Problem**: Klik social button tapi tidak buka

**Solutions**:
```
1. Check popup blocker
   - Allow popups for this site
   
2. Check platform availability
   - WhatsApp Web: Must be logged in
   - Twitter: Must have account
   - Facebook: Must be logged in
   
3. Try manual copy
   - Copy link manually
   - Paste in social media app
   
4. Check network connection
   - Social platforms need internet
```

---

## Performance Tips

### For Faster PDF Generation
```typescript
// Pre-load jsPDF (optional)
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Keep reference
const doc = new jsPDF();
```

### For Smoother Charts
```typescript
// Limit data points
const limitedData = data.slice(0, 10);

// Use memo for expensive calculations
const chartData = useMemo(() => 
  calculateChartData(result), 
  [result]
);
```

### For Better localStorage Management
```typescript
// Clear old calculations (keep last 50)
const manageStorage = () => {
  const saved = localStorage.getItem('agroguard-roi-calculations');
  const calculations = saved ? JSON.parse(saved) : [];
  
  if (calculations.length > 50) {
    const recent = calculations.slice(-50);
    localStorage.setItem('agroguard-roi-calculations', JSON.stringify(recent));
  }
};
```

---

## Best Practices

### For Users
1. ✅ Fill all form fields before calculating
2. ✅ Save important calculations immediately
3. ✅ Export PDF for permanent record
4. ✅ Share results when needed
5. ✅ Test with different scenarios

### For Developers
1. ✅ Handle errors gracefully
2. ✅ Validate user input
3. ✅ Test on multiple browsers
4. ✅ Monitor localStorage usage
5. ✅ Optimize chart performance
6. ✅ Add loading states
7. ✅ Provide user feedback (toasts)

---

## API Reference

### Main Functions

#### `handleExportPDF()`
```typescript
const handleExportPDF = async () => Promise<void>
```
Exports calculation results to PDF.

**Returns**: void  
**Side Effects**: Downloads PDF file  
**Error Handling**: Toast notification on error

---

#### `handleSaveCalculation()`
```typescript
const handleSaveCalculation = () => void
```
Saves calculation to localStorage and generates share URL.

**Returns**: void  
**Side Effects**: 
- Saves to localStorage
- Opens share dialog
- Updates savedId state
- Shows toast notification

---

#### `handleCopyUrl()`
```typescript
const handleCopyUrl = () => void
```
Copies share URL to clipboard.

**Returns**: void  
**Side Effects**: 
- Copies to clipboard
- Shows toast notification

---

#### `handleShare(platform)`
```typescript
const handleShare = (platform: 'whatsapp' | 'twitter' | 'facebook') => void
```
Opens share dialog for social media platform.

**Parameters**:
- `platform`: Social media platform to share to

**Returns**: void  
**Side Effects**: Opens new window with share URL

---

## Data Formats

### CalculationResult Interface
```typescript
interface CalculationResult {
  // Baseline
  baselineProduktivitas: number;
  baselineProduksi: number;
  baselinePendapatan: number;
  baselineBiayaAir: number;
  baselineBiayaPupuk: number;
  baselineGagalPanen: number;
  baselineTotalBiaya: number;
  
  // AGROGUARD
  agroguardProduktivitas: number;
  agroguardProduksi: number;
  agroguardPendapatan: number;
  agroguardBiayaAir: number;
  agroguardBiayaPupuk: number;
  agroguardGagalPanen: number;
  agroguardTotalBiaya: number;
  agroguardBiayaDevice: number;
  
  // Improvements
  peningkatanProduktivitas: number;
  penghematanAir: number;
  penghematanPupuk: number;
  penguranganGagalPanen: number;
  totalPenghematan: number;
  roi: number;
  paybackPeriod: number;
}
```

### SavedCalculation Interface
```typescript
interface SavedCalculation {
  id: string;
  timestamp: string; // ISO format
  inputs: {
    kabupaten: string;
    tanaman: 'padi' | 'jagung' | 'kedelai';
    luas: string;
    irigasi: 'manual' | 'semi' | 'tidak';
  };
  result: CalculationResult;
}
```

---

## Quick Tips

### 💡 Pro Tips for Users
- **Multiple Scenarios**: Hitung untuk berbagai ukuran lahan
- **Compare Regions**: Test berbagai kabupaten untuk best ROI
- **Save Everything**: Save semua hasil untuk reference
- **Share Widely**: Share ke group petani untuk edukasi
- **Print Reports**: PDF bisa langsung diprint

### 💡 Pro Tips for Developers
- **Error Boundaries**: Wrap component in error boundary
- **Loading States**: Always show loading indicators
- **Accessibility**: Ensure keyboard navigation works
- **Mobile First**: Test on mobile devices
- **Performance**: Memo expensive calculations

---

**Last Updated**: October 25, 2025  
**Version**: 1.0  
**Related Docs**: 
- [ROI Calculator Feature](./ROI_CALCULATOR_FEATURE.md)
- [ROI Calculator Enhancements](./ROI_CALCULATOR_ENHANCEMENTS.md)

**Maintained by**: AGROGUARD IoT Team
