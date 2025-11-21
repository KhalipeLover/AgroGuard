# Modular Data Architecture - Quick Reference Guide 🚀

**For Developers** | **Version**: 2.0.0 | **Last Updated**: November 2, 2025

---

## 📖 **QUICK START**

### All Data is in `/data/`

```typescript
// Import from centralized index
import { fetchFAQ, getFooterData, getLegalContent } from '../data';

// Or import directly
import { fetchFAQ } from '../data/demo-faq';
```

### Pattern: Async Loading

```typescript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function loadData() {
    try {
      setLoading(true);
      const result = await fetchData();
      setData(result);
    } catch (err) {
      setError('Failed to load');
    } finally {
      setLoading(false);
    }
  }
  loadData();
}, []);
```

---

## 📁 **DATA FILES MAP** (27 files)

### Landing Page Content

| File | Purpose | Items | Functions |
|------|---------|-------|-----------|
| `demo-faq.ts` | FAQ questions | 14 Q&A | `fetchFAQ()` |
| `demo-testimonials.ts` | Customer reviews | 6 testimonials | `fetchTestimonials()` |
| `demo-documentation.ts` | Tutorial slides | 6 slides | `fetchDocumentation()` |
| `demo-legal-content.ts` ⭐ | Legal docs | 4 documents | `getLegalContent(type)` |
| `demo-footer.ts` ⭐ | Footer config | 1 config | `getFooterData()` |
| `demo-benefits.ts` | Benefits list | Benefits | `fetchBenefits()` |
| `demo-features.ts` | Features | 6 features | `fetchFeatures()` |
| `demo-use-cases.ts` | Use cases | 6 cases | `fetchUseCases()` |
| `demo-sdg-goals.ts` | SDG goals | 6 goals | `fetchSDGGoals()` |
| `demo-how-it-works.ts` | Process steps | 4 steps | `fetchHowItWorks()` |
| `demo-statistics.ts` | Hero stats | 3 stats | `fetchStatistics()` |
| `demo-roi-recommendations.ts` | ROI data | Recommendations | `fetchROIRecommendation()` |

### Dashboard Data

| File | Purpose | Items | Functions |
|------|---------|-------|-----------|
| `demo-user-sensors.ts` | Sensor data | 4 sensors | `fetchSensorData()` |
| `demo-user-notifications.ts` | Notifications | N notifications | `fetchUserNotifications()` |
| `demo-user-stats.ts` | User stats | Multiple | `fetchQuickStats()` |
| `demo-admin-users-50-unique.ts` | Users | 50 users | `fetchAdminUsers()` |
| `demo-admin-devices-110.ts` | Devices | 110 devices | `fetchAdminDevices()` |
| `demo-admin-stats.ts` | Admin stats | Multiple | `fetchSystemStats()` |

### Real Data (Jawa Timur)

| File | Purpose | Items | Functions |
|------|---------|-------|-----------|
| `demo-jatim-production.ts` | Production | 31 kabupaten | `fetchProductionData()` |
| `demo-jatim-irrigation.ts` | Irrigation | Networks | `fetchIrrigationData()` |
| `demo-jatim-rainfall.ts` | Rainfall | 10 stations | `fetchRainfallData()` |
| `demo-jatim-renewable-energy.ts` | Energy | 5 types | `fetchRenewableEnergyData()` |
| `demo-jatim-water-quality.ts` | Water | 5 stations | `fetchWaterQualityData()` |

### Business Logic

| File | Purpose | Items | Functions |
|------|---------|-------|-----------|
| `demo-plant-thresholds.ts` | Plant data | 5 plants | `fetchPlantThresholds()` |
| `demo-device-pricing.ts` | Pricing | Packages | `calculateDeviceRecommendation()` |
| `demo-leads.ts` | Leads | CRM data | `fetchLeads()` |
| `demo-data-sync.ts` | Sync | Constants | `MASTER_CONSTANTS` |

---

## 🎯 **COMMON TASKS**

### 1. Update FAQ

```typescript
// Edit /data/demo-faq.ts
const faqData: FAQItem[] = [
  {
    question: 'Your question?',
    answer: 'Your answer',
    category: 'General' // or 'Technical', 'Data & Security', 'Support & Pricing'
  }
];
```

### 2. Update Legal Document

```typescript
// Edit /data/demo-legal-content.ts
const legalContents = {
  privacy: {
    lastUpdated: 'November 2025', // Update date
    sections: [
      {
        heading: '1. Section Title',
        content: 'Section content',
        listItems: ['Item 1', 'Item 2'] // Optional
      }
    ]
  }
};
```

### 3. Update Footer Links

```typescript
// Edit /data/demo-footer.ts
const footerData = {
  links: {
    product: [
      { label: 'New Link', sectionId: 'new-section' }
    ]
  }
};
```

### 4. Update Contact Info

```typescript
// Edit /data/demo-footer.ts
const footerData = {
  contactInfo: [
    {
      icon: 'Phone', // or 'Mail', 'MapPin'
      label: 'Display Text',
      type: 'Type Name',
      copyText: 'Text to copy'
    }
  ]
};
```

### 5. Add Testimonial

```typescript
// Edit /data/demo-testimonials.ts
const testimonialsData: Testimonial[] = [
  {
    id: '7',
    name: 'Customer Name',
    role: 'Role',
    company: 'Company',
    location: 'Location',
    rating: 5, // 1-5
    testimonial: 'Review text',
    results: [
      { label: 'Metric', value: 'Value' }
    ]
  }
];
```

### 6. Add Documentation Slide

```typescript
// Edit /data/demo-documentation.ts
const documentationData: DocumentationSlide[] = [
  {
    id: 7,
    category: 'Category Name',
    title: 'Slide Title',
    description: 'Description',
    image: 'https://unsplash.com/...',
    categoryColor: 'bg-[#3B945E]',
    tutorialSteps: [
      'Step 1',
      'Step 2'
    ]
  }
];
```

---

## 🔌 **API REFERENCE**

### Legal Content

```typescript
// Get specific legal document
const privacyPolicy = getLegalContent('privacy');
// Returns: { icon, title, description, lastUpdated, sections[] }

// Get all legal types
const types = getAllLegalTypes();
// Returns: ['privacy', 'terms', 'cookies', 'licenses']
```

### Footer Data

```typescript
// Get all footer data
const footer = getFooterData();
// Returns: { brand, links, socialMedia, contactInfo, copyright }

// Get social media only
const social = getSocialMediaLinks();
// Returns: [{ icon, href, label, color }]

// Get contact info only
const contacts = getContactInfo();
// Returns: [{ icon, label, type, copyText, href? }]
```

### FAQ Data

```typescript
// Get all FAQs
const faqs = await fetchFAQ();

// Get by category
const generalFAQs = await fetchFAQByCategory('General');

// Search FAQs
const results = searchFAQ('pricing');

// Get categories
const categories = getFAQCategories();
```

---

## 🎨 **COMPONENT USAGE**

### Legal Dialog

```tsx
import LegalDialog from './components/landing/LegalDialog';

// In your component
<LegalDialog type="privacy">
  <button>Privacy Policy</button>
</LegalDialog>

<LegalDialog type="terms">
  <button>Terms of Service</button>
</LegalDialog>
```

### Footer

```tsx
import Footer from './components/landing/Footer';

// In your page
<Footer />
// That's it! Footer loads all data from /data/
```

### FAQ Section

```tsx
import { FAQSection } from './components/landing';

// With ROI Calculator integration
<FAQSection 
  onNavigateToROI={() => scrollToSection('roi-calculator')}
/>
```

---

## 🛠️ **TYPESCRIPT TYPES**

### Legal Content Types

```typescript
type LegalType = 'privacy' | 'terms' | 'cookies' | 'licenses';

interface LegalContentData {
  icon: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

interface LegalSection {
  heading: string;
  content: string;
  listItems?: string[];
}
```

### Footer Data Types

```typescript
interface FooterData {
  brand: {
    name: string;
    tagline: string;
    description: string;
  };
  links: {
    product: FooterLink[];
    company: FooterLink[];
    support: FooterLink[];
    legal: LegalLink[];
  };
  socialMedia: SocialMedia[];
  contactInfo: ContactInfo[];
  copyright: {
    year: number;
    text: string;
  };
}
```

### FAQ Types

```typescript
interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Technical' | 'Data & Security' | 'Support & Pricing';
}
```

---

## ⚡ **PERFORMANCE TIPS**

### 1. Async Loading

```typescript
// ✅ Good - Async with loading states
useEffect(() => {
  fetchData().then(setData).finally(() => setLoading(false));
}, []);

// ❌ Bad - Synchronous import
import data from '../data/demo-faq'; // Don't do this
```

### 2. Error Handling

```typescript
// ✅ Good - Comprehensive error handling
try {
  const data = await fetchData();
  setData(data);
} catch (err) {
  setError('Failed to load');
  console.error(err);
}

// ❌ Bad - No error handling
const data = await fetchData(); // Can crash app
```

### 3. Loading States

```typescript
// ✅ Good - Show skeleton loaders
{loading && <SkeletonLoader />}
{error && <ErrorState onRetry={retry} />}
{data && <Content data={data} />}

// ❌ Bad - No loading state
<Content data={data} /> // Flickers on load
```

---

## 🐛 **TROUBLESHOOTING**

### Issue: Data not loading

```typescript
// Check import path
import { fetchFAQ } from '../../data'; // ✅ Correct
import { fetchFAQ } from '../data'; // ❌ Might be wrong level

// Check async/await
const data = await fetchFAQ(); // ✅ Correct
const data = fetchFAQ(); // ❌ Returns Promise, not data
```

### Issue: TypeScript errors

```typescript
// Import types
import { type FAQItem } from '../../data';

// Type your state
const [faqs, setFaqs] = useState<FAQItem[]>([]); // ✅ Correct
const [faqs, setFaqs] = useState([]); // ⚠️ No type safety
```

### Issue: Stale data

```typescript
// Add dependency array
useEffect(() => {
  fetchData();
}, []); // ✅ Runs once

useEffect(() => {
  fetchData();
}); // ❌ Runs every render
```

---

## 📚 **BEST PRACTICES**

### ✅ Do's

```typescript
// ✅ Import from centralized index
import { fetchFAQ } from '../data';

// ✅ Use async/await pattern
const data = await fetchData();

// ✅ Handle loading and error states
{loading && <Skeleton />}
{error && <Error />}

// ✅ Type your data
const [data, setData] = useState<FAQItem[]>([]);

// ✅ Update data files, not components
// Edit /data/demo-faq.ts, not FAQSection.tsx
```

### ❌ Don'ts

```typescript
// ❌ Don't hardcode data in components
const data = [{ question: '...' }]; // Bad

// ❌ Don't skip error handling
const data = await fetchData(); // Can crash

// ❌ Don't forget loading states
<Content data={data} /> // Flickers

// ❌ Don't modify component files for content
// Use /data/ files instead

// ❌ Don't use synchronous imports for data
import data from '../data/demo-faq'; // Bad
```

---

## 🔍 **QUICK SEARCH**

**Need to update...**
- **FAQ?** → Edit `/data/demo-faq.ts`
- **Legal docs?** → Edit `/data/demo-legal-content.ts`
- **Footer?** → Edit `/data/demo-footer.ts`
- **Testimonials?** → Edit `/data/demo-testimonials.ts`
- **Documentation?** → Edit `/data/demo-documentation.ts`
- **Contact info?** → Edit `/data/demo-footer.ts` → `contactInfo`
- **Social media?** → Edit `/data/demo-footer.ts` → `socialMedia`
- **Navigation links?** → Edit `/data/demo-footer.ts` → `links`

**Component not loading?**
- Check import path
- Verify async/await usage
- Check browser console for errors
- Verify data file exports

**Need examples?**
- Check `/documentation/LANDING_PAGE_MODULAR_AUDIT_COMPLETE.md`
- Review existing data files in `/data/`
- Look at component usage in `LandingPage.tsx`

---

## 📖 **FURTHER READING**

- **[Complete Audit](./LANDING_PAGE_MODULAR_AUDIT_COMPLETE.md)** - Full documentation
- **[Final Summary](./LANDING_PAGE_FINAL_SUMMARY.md)** - Executive summary
- **[Verification Checklist](./FINAL_VERIFICATION_CHECKLIST.md)** - Testing guide
- **[Guidelines](./Guidelines.md)** - Design system & best practices

---

**Quick Reference Version**: 1.0  
**Last Updated**: November 2, 2025  
**Status**: Production Ready ✅

---

**Need Help?** Check the full documentation or review example data files in `/data/` 🚀
