# ROI ShareLink - Quick Reference

## 🚀 Quick Start

### Generate ShareLink
```typescript
// User clicks "Simpan & Bagikan" button
// Automatic: calc ID generated, URL created, dialog shown
```

### ShareLink Format
```
https://your-domain.com/?calc=roi-1763458713463&k=KABUPATEN+BANYUWANGI&t=tomat&l=500&i=otomatis-iot
```

## 📋 URL Parameters

| Param | Description | Example | Validation |
|-------|-------------|---------|------------|
| `calc` | Calculation ID | `roi-1763458713463` | Timestamp-based |
| `k` | Kabupaten | `KABUPATEN BANYUWANGI` | String |
| `t` | Plant Type | `tomat` | Enum: tomat, cabai, terong, semangka, melon |
| `l` | Land Size (m²) | `500` | Number, min 1 |
| `i` | Irrigation | `otomatis-iot` | Enum: manual, semi-otomatis, otomatis-iot |

## 🔄 Auto-Restore Flow

1. **Wait for data** (horticultureData loaded) → 
2. **Detect** URL params → 
3. **Validate** all parameters → 
4. **Populate** form → 
5. **Calculate** ROI → 
6. **Scroll** to results

**Timing** (v2.1.1):
- Data loading: Variable (async)
- Form population: Immediate after validation
- Device fetch: Immediate (built-in delay)
- ROI calculation: +800ms (built-in to calculateROI)
- Scroll to results: +1000ms (with retry fallback)

## ✅ Valid Examples

### Example 1: Tomat - Banyuwangi
```
?calc=roi-123&k=KABUPATEN+BANYUWANGI&t=tomat&l=500&i=otomatis-iot
```

### Example 2: Cabai - Malang
```
?calc=roi-456&k=KABUPATEN+MALANG&t=cabai&l=1000&i=semi-otomatis
```

### Example 3: Semangka - Probolinggo
```
?calc=roi-789&k=KABUPATEN+PROBOLINGGO&t=semangka&l=2000&i=manual
```

## ❌ Invalid Examples

### Missing Required Params
```
?calc=roi-123&k=KABUPATEN+MALANG
❌ Missing: t, l, i
```

### Invalid Plant Type
```
?calc=roi-123&k=KABUPATEN+MALANG&t=mangga&l=100&i=manual
❌ Error: "Jenis tanaman tidak valid dalam URL"
```

### Invalid Land Size
```
?calc=roi-123&k=KABUPATEN+MALANG&t=tomat&l=abc&i=manual
❌ Error: "Luas lahan tidak valid dalam URL"
```

## 🐛 Common Issues & Fixes

### Issue 1: ShareLink Not Working
**Symptoms**: URL has params but nothing happens
**Fix (v2.1.1)**: 
- Added data ready check: `horticultureData.length === 0`
- Wait for data to load before processing URL

### Issue 2: Results Cleared Immediately
**Symptoms**: Results flash then disappear
**Fix (v2.1.1)**:
- Modified clear logic: `if (result && urlProcessed)`
- Prevents clearing during auto-population

### Issue 3: Element Not Found for Scroll
**Symptoms**: Console warning about missing element
**Fix (v2.1.1)**:
- Added retry mechanism
- Increased scroll delay to 1000ms

## 🐛 Debugging

### Check URL Processing
```typescript
// In browser console
console.log(new URLSearchParams(window.location.search));
```

### Check Form State
```typescript
// After URL load
selectedKabupaten // Should match 'k' param
jenisTanaman      // Should match 't' param
luasLahan         // Should match 'l' param
sistemIrigasi     // Should match 'i' param
```

### Check Calculation
```typescript
// Should be true after auto-calculate
showResult === true
result !== null
```

## 📱 Share Platforms

### WhatsApp
```typescript
const text = "🌱 Lihat ROI saya: ...";
const url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
```

### Twitter
```typescript
const text = "🌱 Analisis ROI pertanian: ...";
const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${shareUrl}`;
```

### Facebook
```typescript
const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
```

## 🔒 Security Notes

- ✅ All params validated before use
- ✅ No sensitive data in URL
- ✅ XSS prevention via React escaping
- ✅ Type checking for all inputs
- ❌ Don't trust URL params blindly

## ⚡ Performance

- **URL Detection**: 1 render cycle
- **Form Population**: Immediate
- **Auto-Calculate**: ~600ms total
- **Scroll Animation**: 800ms smooth

## 🎨 User Experience

### Success Flow
```
1. User clicks sharelink
2. Toast: "Memuat perhitungan yang dibagikan..."
3. Form auto-populated
4. Calculating animation
5. Results appear
6. Smooth scroll to results
7. ✅ Done!
```

### Error Flow
```
1. User clicks invalid sharelink
2. Toast error: "[specific error message]"
3. Form remains empty
4. User can use calculator normally
5. ✅ Graceful degradation
```

## 🧪 Test Cases

```typescript
// Test 1: Valid sharelink
test('should restore calculation from URL', () => {
  const url = '?calc=roi-123&k=KABUPATEN+BANYUWANGI&t=tomat&l=500&i=otomatis-iot';
  // Expected: form populated, ROI calculated
});

// Test 2: Invalid plant
test('should show error for invalid plant', () => {
  const url = '?calc=roi-123&k=KABUPATEN+MALANG&t=mangga&l=100&i=manual';
  // Expected: error toast, form empty
});

// Test 3: Missing params
test('should ignore incomplete URL', () => {
  const url = '?calc=roi-123&k=KABUPATEN+MALANG';
  // Expected: normal calculator behavior
});
```

## 📊 Monitoring

### Key Metrics
- ShareLink generation rate
- ShareLink open rate
- Auto-calculate success rate
- Error rate by type

### Analytics Events
```typescript
// Track sharelink opened
analytics.track('sharelink_opened', {
  calcId,
  plant,
  location,
  success: true
});

// Track errors
analytics.track('sharelink_error', {
  error: 'invalid_plant',
  url
});
```

## 🔧 Implementation

### File Modified
- `/components/landing/roi-calculator/index.tsx`

### Key Functions
```typescript
// URL detection
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  // ... validation and restoration
}, [loading, urlProcessed, horticultureData]);
```

### State Added
```typescript
const [urlProcessed, setUrlProcessed] = useState(false);
```

## 📚 Related Docs

- `ROI_SHARELINK_URL_RESTORE_COMPLETE.md` - Full documentation
- `ROI_CALCULATOR_MODULAR_COMPLETE.md` - Architecture
- `CLIPBOARD_FIX_SUMMARY.md` - Clipboard utilities

---

**Quick Reference** | v2.1 | ShareLink Feature
